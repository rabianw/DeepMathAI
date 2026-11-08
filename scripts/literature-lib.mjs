// Shared helpers for the Research Library scripts (build-literature.mjs, update-literature.mjs).
import fs from "node:fs";
import path from "node:path";

export const OUT = path.resolve(import.meta.dirname, "../src/lib/literature-papers.ts");
const GROUP_DATA = path.resolve(import.meta.dirname, "../src/lib/deepmathai-data.ts");
const START = "/* BEGIN DATA */", END = "/* END DATA */";
const HEADERS = { headers: { "User-Agent": "deepmathai-research-library" } };

// OpenAlex needs a free API key (https://openalex.org/settings/api); without one, requests share a tiny daily
// budget per IP address, which GitHub Actions runners exhaust. Locally: OPENALEX_API_KEY=... node scripts/...
const API_KEY = process.env.OPENALEX_API_KEY;
if (!API_KEY) console.warn("! OPENALEX_API_KEY is not set: OpenAlex will rate-limit these requests (see scripts/literature-lib.mjs).");

export async function openAlex(url) {
  const full = API_KEY ? `${url}${url.includes("?") ? "&" : "?"}api_key=${encodeURIComponent(API_KEY)}` : url;
  for (let attempt = 1; ; attempt++) {
    const r = await fetch(full, HEADERS);
    if (r.ok) return r.json();
    if (r.status === 429 && (!API_KEY || attempt >= 3)) {
      throw new Error(`OpenAlex daily limit reached (429)${API_KEY ? "" : " — set OPENALEX_API_KEY (free key: https://openalex.org/settings/api)"}`);
    }
    if (attempt >= 3) throw new Error(`OpenAlex ${r.status}: ${url}`);
    await new Promise(res => setTimeout(res, 2000 * attempt));
  }
}

export function readPapers() {
  if (!fs.existsSync(OUT)) return { papers: [], updated: null };
  const s = fs.readFileSync(OUT, "utf8");
  return {
    papers: JSON.parse(s.slice(s.indexOf(START) + START.length, s.indexOf(END))),
    updated: s.match(/literatureUpdated = "([\d-]+)"/)?.[1] ?? null,
  };
}

export function groupDois() {
  return new Set([...fs.readFileSync(GROUP_DATA, "utf8").matchAll(/doi: "(10\.[^"]+)"/g)].map(m => m[1].toLowerCase()));
}

export const WORK_FIELDS = "doi,title,publication_year,publication_date,authorships,open_access,best_oa_location,primary_location";

// Fill authors, open-access link, journal source id and the DeepMathAI flag from an OpenAlex work.
export function enrich(p, w, ourDois) {
  const names = w.authorships.map(a => a.author?.display_name).filter(Boolean);
  if (names.length) { p.authors = names.slice(0, 4); p.authorCount = names.length; }
  const src = w.primary_location?.source?.id?.split("/").pop();
  if (src) p.source = src;
  delete p.openAccess; delete p.openAccessUrl; delete p.openAccessLabel;
  if (w.open_access?.is_oa) {
    p.openAccess = true;
    const loc = w.best_oa_location || {};
    const landing = loc.landing_page_url || "";
    if (landing && !landing.includes("doi.org/")) {                 // free copy outside the publisher's page
      const where = (loc.source?.display_name || "") + landing;
      p.openAccessUrl = landing.replace(/^http:/, "https:");
      p.openAccessLabel = /arxiv/i.test(where) ? "arXiv" : /pubmed|ncbi/i.test(where) ? "PubMed Central" : "Free version";
    }
  }
  // DeepMathAI badge only for papers on the Publications page — not every paper by a team member is group output.
  delete p.deepmathai;
  if (ourDois.has(p.doi)) p.deepmathai = true;
  return p;
}

// ─── Short summaries ───────────────────────────────
// Semantic Scholar's TLDR (one AI-generated sentence) when it exists; otherwise the opening sentences of the
// article's abstract (Semantic Scholar, Crossref or OpenAlex), so nothing is written that the authors did not say.

function cleanAbstract(a) {
  a = a.replace(/<[^>]+>/g, " ").replace(/\$\$?([^$]+?)\$\$?/g, "$1").replace(/\s+/g, " ").trim();   // drop LaTeX $…$ markers
  if (a.startsWith("•")) {                       // Elsevier "highlights" bullets come first: keep the text after the last one
    const last = a.slice(a.lastIndexOf("•") + 1);
    const first = last.match(/^[^.!?]*[.!?]\s+/);
    a = first ? last.slice(first[0].length) : last;
  }
  return a.replace(/^\s*(abstract|summary|background|purpose|objectives?|introduction|aims?)\s*[:.]?\s*/i, "").trim();
}

function openingSentences(a, max = 320) {
  const sentences = a.match(/[^.!?]+(?:[.!?](?!\d)(?=\s+[A-Z(]|$))?/g) || [a];
  let out = "";
  for (const s of sentences) {
    if (out && (out + s).length > max) break;
    out += s;
  }
  out = out.trim();
  return out.length > max + 40 ? out.slice(0, max).replace(/\s+\S*$/, "") + "…" : out;
}

function fromInverted(inv) {
  if (!inv) return "";
  const words = [];
  for (const [w, pos] of Object.entries(inv)) for (const i of pos) words[i] = w;
  return words.join(" ");
}

async function semanticScholar(dois) {
  const out = new Map();
  for (let i = 0; i < dois.length; i += 400) {
    const ids = dois.slice(i, i + 400);
    for (let attempt = 0; attempt < 8; attempt++) {                // shared public rate limit: back off and retry
      const r = await fetch("https://api.semanticscholar.org/graph/v1/paper/batch?fields=tldr,abstract", {
        method: "POST", headers: { "Content-Type": "application/json", "User-Agent": "deepmathai-research-library" },
        body: JSON.stringify({ ids: ids.map(d => "DOI:" + d) }),
      });
      if (r.ok) { (await r.json()).forEach((d, j) => d && out.set(ids[j], d)); break; }
      if (r.status !== 429) break;
      await new Promise(res => setTimeout(res, 4000 * (attempt + 1)));
    }
  }
  return out;
}

export async function fillSummaries(papers) {
  const missing = papers.filter(p => !p.summary);
  if (!missing.length) return 0;
  const abstracts = new Map();
  const s2 = await semanticScholar(missing.map(p => p.doi)).catch(() => new Map());
  for (const p of missing) {
    const d = s2.get(p.doi);
    if (d?.tldr?.text) { p.summary = d.tldr.text.trim(); p.summarySource = "tldr"; }
    else if (d?.abstract) abstracts.set(p.doi, d.abstract);
  }
  let rest = missing.filter(p => !p.summary && !abstracts.has(p.doi));
  try {                                                             // OpenAlex abstracts (needs the API key)
    for (let i = 0; i < rest.length; i += 40) {
      const r = await openAlex(`https://api.openalex.org/works?per-page=50&select=doi,abstract_inverted_index&filter=doi:`
        + rest.slice(i, i + 40).map(p => encodeURIComponent("https://doi.org/" + p.doi)).join("|"));
      for (const w of r.results) {
        const a = fromInverted(w.abstract_inverted_index);
        if (a) abstracts.set(w.doi.replace("https://doi.org/", "").toLowerCase(), a);
      }
    }
  } catch (e) { console.warn(`! OpenAlex abstracts skipped: ${e.message}`); }
  rest = rest.filter(p => !abstracts.has(p.doi));
  for (const p of rest) {                                           // Crossref (Springer, T&F and others deposit abstracts)
    const r = await fetch(`https://api.crossref.org/works/${encodeURIComponent(p.doi)}`, HEADERS).catch(() => null);
    const a = r?.ok ? (await r.json()).message.abstract : "";
    if (a) abstracts.set(p.doi, a);
  }
  let n = 0;
  for (const p of missing) {
    if (p.summary) { n++; continue; }
    const a = abstracts.has(p.doi) ? openingSentences(cleanAbstract(abstracts.get(p.doi))) : "";
    if (a.length > 40) { p.summary = a; p.summarySource = "abstract"; n++; }
  }
  return n;
}

export function writePapers(papers, updated) {
  papers.sort((a, b) => a.topic.localeCompare(b.topic) || (a.group ?? "").localeCompare(b.group ?? "")
    || b.year - a.year || a.title.localeCompare(b.title));
  fs.writeFileSync(OUT, `// Generated by scripts/build-literature.mjs and scripts/update-literature.mjs — do not edit by hand.
// Bibliographic data and open-access links: the group's reading lists + OpenAlex (https://openalex.org).

export interface LiteraturePaper {
  doi: string;
  title: string;
  authors: string[];        // first authors (up to 4)
  authorCount: number;
  year: number;
  journal: string;
  quartile: string;         // Scopus quartile (SJR)
  theme: string;            // LiteratureTheme.key
  topic: string;            // LiteratureTopic.key
  group?: string;           // sub-heading within a topic
  source?: string;          // OpenAlex journal id
  openAccess?: boolean;
  openAccessUrl?: string;   // free copy outside the publisher (arXiv, PMC, repository)
  openAccessLabel?: string;
  deepmathai?: boolean;     // on the DeepMathAI Publications page
  added?: string;           // date added by the weekly update (YYYY-MM-DD)
  summary?: string;         // one-sentence TLDR, or the opening sentences of the abstract
  summarySource?: "tldr" | "abstract";
}

export const literatureUpdated = "${updated}";

export const literaturePapers: LiteraturePaper[] = ${START}${JSON.stringify(papers, null, 1)}${END};
`);
}
