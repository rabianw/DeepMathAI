// Build src/lib/literature-papers.ts (Research Library) from the group's reading-list Markdown files.
//
//   node scripts/build-literature.mjs <reading-list.md> [more.md ...]
//
// Each list has "## <theme>/<topic>" headings, optional "### <group>" headings and entries like
//   - [x] **<status>**: <Title> (<First author>, <Year>). *<Journal>*, Q1. [doi:<doi>](https://doi.org/<doi>)
// Only public bibliographic data is kept: download status, local file names and access notes are dropped.
// Authors and open-access links come from OpenAlex. New lists are merged into the existing file by DOI.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "../src/lib/literature-papers.ts");
const GROUP_DATA = path.resolve(import.meta.dirname, "../src/lib/deepmathai-data.ts");
const START = "/* BEGIN DATA */", END = "/* END DATA */";

// "### ..." group headings in the lists are written in Thai; show them in English on the site.
const GROUP_LABELS = {
  "Neurodynamic / collaborative neurodynamic optimization ใน ML": "Collaborative neurodynamic optimization in machine learning",
  "Neurodynamic สำหรับ sparse recovery และ low-rank": "Sparse recovery and low-rank problems",
  "Bilevel optimization และการเลือก hyperparameter": "Bilevel optimization and hyperparameter selection",
  "Minimax, saddle point และ VI ใน adversarial learning": "Minimax, saddle points and variational inequalities in adversarial learning",
  "SOCP / SDP ใน SVM, feature selection และ clustering": "SOCP and SDP for SVMs, feature selection and clustering",
  "Nonsmooth / smoothing ในการ train neural network": "Nonsmooth and smoothing methods for training neural networks",
  "Dynamical system / gradient flow ของการ train deep learning": "Dynamical systems and gradient flows of deep-learning training",
  "Multiobjective optimization ใน deep learning": "Multiobjective optimization in deep learning",
  "Deep learning สำหรับแก้ปัญหา optimization (AVE, VI)": "Deep learning for solving optimization problems (AVE, VI)",
};

const ENTRY = /^- \[[ x]\] \*\*.+?\*\*: (.+) \(([^()]+), (\d{4})\)\. \*(.+?)\*, (Q\d)\. \[doi:([^\]]+)\]/;

function cleanTitle(t) {
  return t.replace(/\$\$2\^n\$\$/g, "2ⁿ").replace(/\$\$(.+?)\$\$/g, "$1").trim();
}

function parse(file) {
  const out = [];
  let theme = null, topic = null, group = null;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const h2 = line.match(/^## (\d{2})_[^/]+\/(\d{2})_/);
    if (h2) { [theme, topic, group] = [h2[1], h2[2], null]; continue; }
    const h3 = line.match(/^### (.+)$/);
    if (h3) {
      group = GROUP_LABELS[h3[1].trim()] ?? h3[1].trim();
      if (!GROUP_LABELS[h3[1].trim()]) console.warn(`! no English label for group "${h3[1].trim()}"`);
      continue;
    }
    const m = line.match(ENTRY);
    if (!m || !topic) continue;
    const [, title, firstAuthor, year, journal, quartile, doi] = m;
    out.push({ doi: doi.toLowerCase(), title: cleanTitle(title), authors: [firstAuthor], authorCount: 1, year: +year,
      journal, quartile, theme, topic, ...(group ? { group } : {}) });
  }
  return out;
}

function readExisting() {
  if (!fs.existsSync(OUT)) return [];
  const s = fs.readFileSync(OUT, "utf8");
  return JSON.parse(s.slice(s.indexOf(START) + START.length, s.indexOf(END)));
}

async function openAlex(dois) {
  const found = new Map();
  for (let i = 0; i < dois.length; i += 40) {
    const batch = dois.slice(i, i + 40);
    const url = "https://api.openalex.org/works?per-page=50&select=doi,authorships,open_access,best_oa_location&filter=doi:"
      + batch.map(d => encodeURIComponent("https://doi.org/" + d)).join("|");
    const r = await fetch(url, { headers: { "User-Agent": "deepmathai-research-library" } });
    if (!r.ok) throw new Error(`OpenAlex ${r.status}`);
    for (const w of (await r.json()).results) found.set(w.doi.replace("https://doi.org/", "").toLowerCase(), w);
  }
  return found;
}

function openAccessLink(w) {
  if (!w?.open_access?.is_oa) return {};
  const loc = w.best_oa_location || {};
  const landing = loc.landing_page_url || "";
  if (!landing || landing.includes("doi.org/")) return { openAccess: true };     // free on the publisher's own page
  const src = loc.source?.display_name || "";
  const label = /arxiv/i.test(src + landing) ? "arXiv" : /pubmed|ncbi/i.test(src + landing) ? "PubMed Central" : "Free version";
  return { openAccess: true, openAccessUrl: landing.replace(/^http:/, "https:"), openAccessLabel: label };
}

const files = process.argv.slice(2);
if (!files.length) { console.error("usage: node scripts/build-literature.mjs <reading-list.md> [...]"); process.exit(1); }

const byDoi = new Map(readExisting().map(p => [p.doi, p]));
const before = byDoi.size;
for (const f of files) for (const p of parse(f)) {
  const old = byDoi.get(p.doi);
  byDoi.set(p.doi, old ? { ...old, ...p, authors: old.authors, authorCount: old.authorCount, group: p.group ?? old.group } : p);
}

const meta = await openAlex([...byDoi.keys()]);
const groupDois = new Set([...fs.readFileSync(GROUP_DATA, "utf8").matchAll(/doi: "(10\.[^"]+)"/g)].map(m => m[1].toLowerCase()));
let missing = 0;
for (const p of byDoi.values()) {
  const w = meta.get(p.doi);
  if (!w) { missing++; continue; }
  const names = w.authorships.map(a => a.author?.display_name).filter(Boolean);
  if (names.length) { p.authors = names.slice(0, 4); p.authorCount = names.length; }
  delete p.openAccess; delete p.openAccessUrl; delete p.openAccessLabel;
  Object.assign(p, openAccessLink(w));
  p.deepmathai = groupDois.has(p.doi) || names.some(n => /wangkeeree/i.test(n)) || undefined;
  if (!p.deepmathai) delete p.deepmathai;
}

const papers = [...byDoi.values()].sort((a, b) => a.topic.localeCompare(b.topic) || (a.group ?? "").localeCompare(b.group ?? "") || b.year - a.year || a.title.localeCompare(b.title));
const dates = files.map(f => path.basename(f).match(/\d{4}-\d{2}-\d{2}/)?.[0]).filter(Boolean).sort();
const prev = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8").match(/literatureUpdated = "([\d-]+)"/)?.[1] : null;
const updated = [dates.at(-1), prev].filter(Boolean).sort().at(-1) ?? new Date().toISOString().slice(0, 10);

fs.writeFileSync(OUT, `// Generated by scripts/build-literature.mjs — do not edit by hand; re-run the script with the new reading list.
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
  openAccess?: boolean;
  openAccessUrl?: string;   // free copy outside the publisher (arXiv, PMC, repository)
  openAccessLabel?: string;
  deepmathai?: boolean;     // authored by the group
}

export const literatureUpdated = "${updated}";

export const literaturePapers: LiteraturePaper[] = ${START}${JSON.stringify(papers, null, 1)}${END};
`);
console.log(`papers: ${papers.length} (${papers.length - before} new) · OpenAlex matched ${byDoi.size - missing}/${byDoi.size} · open access ${papers.filter(p => p.openAccess).length} · DeepMathAI ${papers.filter(p => p.deepmathai).length} · updated ${updated}`);
