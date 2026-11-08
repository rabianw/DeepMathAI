// Weekly update of the Research Library: add recent articles on each topic from journals already in the library.
//
//   node scripts/update-literature.mjs [--dry-run] [--days 90] [--per-topic 2]
//
// For each topic, OpenAlex is searched by title. Only articles from journals that already appear in the library
// in the same theme (so their Scopus quartile is known: the group's Q1–Q2 lists) are accepted, newest first, skipping DOIs already
// listed. Nothing is ever removed. Run by .github/workflows/update-library.yml.
import { openAlex, readPapers, writePapers, enrich, groupDois, fillSummaries, WORK_FIELDS } from "./literature-lib.mjs";

// Title searches per topic (OpenAlex search syntax: quotes for phrases, AND / OR).
const TOPIC_QUERIES = {
  "11": '"gradient neural network" OR "gradient-based neural network" OR "zeroing neural network"',
  "12": '"primal-dual neural network" OR "Lagrangian neural network"',
  "13": '"projection neural network" OR "proximal neurodynamic"',
  "14": '("predefined-time" OR "fixed-time" OR "prescribed-time") AND (neurodynamic OR (("neural network" OR "neural networks") AND (optimization OR solving OR equation OR equations OR "variational inequality")))',
  "15": '(distributed OR collaborative OR "multi-agent") AND neurodynamic',
  "16": '"complementarity problem" OR "complementarity problems" OR "complementarity function"',
  "17": 'neurodynamic AND (sparse OR "support vector" OR "feature selection" OR clustering OR "matrix factorization" OR "machine learning" OR "deep learning")',
  "18": '"Hessian-driven damping" OR "inertial dynamics" OR "inertial dynamical system"',
  "21": '("second-order cone" OR "circular cone") AND (complementarity OR optimization OR programming OR problems OR "variational inequality")',
  "22": '"absolute value equation" OR "absolute value equations"',
  "23": '"smoothing method" OR "smoothing approach" OR "smoothing function" OR "smoothing algorithm" OR "smoothing technique" OR ((nonsmooth OR "non-smooth") AND (optimization OR minimization OR "proximal"))',
  "25": '("multiobjective optimization" OR "multi-objective optimization" OR "vector optimization" OR "multiobjective programming" OR "interval-valued") AND ("optimality conditions" OR "Mond-Weir" OR "Wolfe" OR "necessary conditions" OR "sufficient conditions" OR "efficient solutions")',
  "26": '"semidefinite programming" OR "semidefinite program" OR "semidefinite programs"',
  "27": '("optimality conditions" OR "Karush-Kuhn-Tucker" OR KKT) AND (nonsmooth OR nonconvex OR robust)',
  "31": '"twin support vector" OR "pinball loss" OR "twin SVM"',
  "32": '("multi-view" OR multiview) AND ("support vector" OR "random vector functional link" OR classification)',
  "33": '"random vector functional link"',
  "34": '("bilevel optimization" OR minimax OR "saddle point" OR "variational inequality") AND (learning OR "neural network" OR "neural networks")',
  "41": '("generative adversarial network" OR "generative adversarial networks") AND (medical OR MRI OR CT OR "computed tomography" OR radiology OR clinical)',
  "42": '("diffusion model" OR "diffusion models") AND ("inverse problem" OR "inverse problems" OR "MRI reconstruction" OR "CT reconstruction" OR "image reconstruction" OR "medical image")',
  "43": '("diffusion model" OR "diffusion models" OR "diffusion prior") AND ("image restoration" OR deblurring OR denoising OR "super-resolution")',
  "44": '("positron emission tomography" OR PET) AND (reconstruction OR denoising OR "low-count" OR "low-dose")',
  "51": '("vertebral fracture" OR "vertebral fractures") AND ("deep learning" OR radiomics OR "machine learning")',
  "52": 'osteoporosis AND ("deep learning" OR "machine learning" OR radiomics) AND (radiograph OR radiographs OR "X-ray" OR CT OR MRI OR "bone mineral density" OR DXA OR opportunistic)',
};

const arg = (name, dflt) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : dflt; };
const DRY = process.argv.includes("--dry-run");
const DAYS = +arg("--days", 90), PER_TOPIC = +arg("--per-topic", 2);
const today = new Date().toISOString().slice(0, 10);
const since = new Date(Date.now() - DAYS * 864e5).toISOString().slice(0, 10);

const { papers, updated } = readPapers();
const have = new Set(papers.map(p => p.doi));
const journals = new Map();                       // source id -> { journal name, quartile } from the curated lists
const themeSources = {};                          // theme -> journals that appear in that theme's curated lists
for (const p of papers) {
  if (!p.source) continue;
  if (!journals.has(p.source)) journals.set(p.source, { journal: p.journal, quartile: p.quartile });
  (themeSources[p.theme] ??= new Set()).add(p.source);
}
const topicTheme = Object.fromEntries(papers.map(p => [p.topic, p.theme]));
const ours = groupDois();

const added = [];
for (const [topic, query] of Object.entries(TOPIC_QUERIES)) {
  const found = [];
  const sources = [...(themeSources[topicTheme[topic]] ?? [])];
  for (let i = 0; i < sources.length; i += 50) {          // OpenAlex allows a limited number of OR values per filter
    const r = await openAlex("https://api.openalex.org/works?per-page=25&sort=publication_date:desc"
      + `&select=${WORK_FIELDS},type`
      + `&filter=${encodeURIComponent(`title.search:${query}`)},type:article,from_publication_date:${since},to_publication_date:${today}`
      + `,primary_location.source.id:${sources.slice(i, i + 50).join("|")}`);
    found.push(...r.results);
  }
  found.sort((a, b) => b.publication_date.localeCompare(a.publication_date));
  let n = 0;
  for (const w of found) {
    const doi = w.doi?.replace("https://doi.org/", "").toLowerCase();
    if (!doi || have.has(doi) || n >= PER_TOPIC) continue;
    const j = journals.get(w.primary_location.source.id.split("/").pop());
    const p = enrich({ doi, title: w.title.replace(/<[^>]+>/g, "").trim(), authors: [], authorCount: 0, year: w.publication_year,
      journal: j.journal, quartile: j.quartile, theme: topicTheme[topic], topic, added: today }, w, ours);
    papers.push(p); have.add(doi); added.push(p); n++;
  }
}

for (const p of added) console.log(`+ [${p.topic}] ${p.title} (${p.authors[0] ?? "?"}, ${p.year}) — ${p.journal}, ${p.quartile} — doi:${p.doi}`);
console.log(`${added.length} new article(s) since ${since}${DRY ? " (dry run, nothing written)" : ""}`);
if (DRY) process.exit(0);
const summarized = await fillSummaries(papers);          // new articles, plus any earlier ones still without a summary
console.log(`${summarized} summary(ies) added · ${papers.filter(p => !p.summary).length} article(s) still without one`);
if (added.length || summarized) writePapers(papers, added.length && today > (updated ?? "") ? today : updated);
