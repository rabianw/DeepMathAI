// Add the group's reading-list Markdown files to the Research Library (src/lib/literature-papers.ts).
//
//   node scripts/build-literature.mjs <reading-list.md> [more.md ...]
//
// Each list has "## <theme>/<topic>" headings, optional "### <group>" headings and entries like
//   - [x] **<status>**: <Title> (<First author>, <Year>). *<Journal>*, Q1. [doi:<doi>](https://doi.org/<doi>)
// Only public bibliographic data is kept: download status, local file names and access notes are dropped.
// Authors, journal ids and open-access links come from OpenAlex. Lists are merged into the existing file by DOI.
import fs from "node:fs";
import path from "node:path";
import { openAlex, readPapers, writePapers, enrich, groupDois, WORK_FIELDS } from "./literature-lib.mjs";

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
      const raw = h3[1].trim();
      group = GROUP_LABELS[raw] ?? raw;
      if (!GROUP_LABELS[raw]) console.warn(`! no English label for group "${raw}" — add it to GROUP_LABELS`);
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

const files = process.argv.slice(2);
if (!files.length) { console.error("usage: node scripts/build-literature.mjs <reading-list.md> [...]"); process.exit(1); }

const { papers: existing, updated: prevUpdated } = readPapers();
const byDoi = new Map(existing.map(p => [p.doi, p]));
const before = byDoi.size;
for (const f of files) for (const p of parse(f)) {
  const old = byDoi.get(p.doi);
  byDoi.set(p.doi, old ? { ...old, ...p, authors: old.authors, authorCount: old.authorCount, group: p.group ?? old.group } : p);
}

const ours = groupDois();
const dois = [...byDoi.keys()];
let matched = 0;
for (let i = 0; i < dois.length; i += 40) {
  const batch = dois.slice(i, i + 40);
  const r = await openAlex(`https://api.openalex.org/works?per-page=50&select=${WORK_FIELDS}&filter=doi:`
    + batch.map(d => encodeURIComponent("https://doi.org/" + d)).join("|"));
  for (const w of r.results) {
    const p = byDoi.get(w.doi.replace("https://doi.org/", "").toLowerCase());
    if (p) { enrich(p, w, ours); matched++; }
  }
}

const papers = [...byDoi.values()];
const dates = files.map(f => path.basename(f).match(/\d{4}-\d{2}-\d{2}/)?.[0]).filter(Boolean);
const updated = [...dates, prevUpdated].filter(Boolean).sort().at(-1) ?? new Date().toISOString().slice(0, 10);
writePapers(papers, updated);
console.log(`papers: ${papers.length} (${papers.length - before} new) · OpenAlex matched ${matched}/${papers.length} · `
  + `open access ${papers.filter(p => p.openAccess).length} · DeepMathAI ${papers.filter(p => p.deepmathai).length} · updated ${updated}`);
