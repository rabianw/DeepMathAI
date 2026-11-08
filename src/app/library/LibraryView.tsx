"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Brain, Sigma, Cpu, Sparkles, HeartPulse, Search, ExternalLink, Unlock, Library,
  FileText, Rocket, X, BookMarked, LayoutList, CalendarArrowDown, ChevronDown,
} from "lucide-react";
import { literaturePapers, literatureUpdated, type LiteraturePaper } from "@/lib/literature-papers";
import { literatureThemes, literatureTopics, type LiteratureTheme } from "@/lib/literature-topics";
import { groupPublications, aiApplications } from "@/lib/deepmathai-data";

// ─── Theme colours (full class strings so Tailwind keeps them) ──────────
const THEME_STYLE = {
  neuro: {
    Icon: Brain, text: "text-violet-300", dot: "bg-violet-400", tile: "bg-violet-500/15 text-violet-300",
    edge: "border-l-violet-400", bar: "from-violet-400 to-fuchsia-400", glow: "from-violet-500/[0.14]",
    on: "bg-violet-500/20 border-violet-400/60 text-white", ring: "ring-2 ring-violet-400/70", chip: "border-violet-400/30 text-violet-200 bg-violet-500/10",
  },
  optim: {
    Icon: Sigma, text: "text-sky-300", dot: "bg-sky-400", tile: "bg-sky-500/15 text-sky-300",
    edge: "border-l-sky-400", bar: "from-sky-400 to-cyan-300", glow: "from-sky-500/[0.14]",
    on: "bg-sky-500/20 border-sky-400/60 text-white", ring: "ring-2 ring-sky-400/70", chip: "border-sky-400/30 text-sky-200 bg-sky-500/10",
  },
  ml: {
    Icon: Cpu, text: "text-emerald-300", dot: "bg-emerald-400", tile: "bg-emerald-500/15 text-emerald-300",
    edge: "border-l-emerald-400", bar: "from-emerald-400 to-teal-300", glow: "from-emerald-500/[0.14]",
    on: "bg-emerald-500/20 border-emerald-400/60 text-white", ring: "ring-2 ring-emerald-400/70", chip: "border-emerald-400/30 text-emerald-200 bg-emerald-500/10",
  },
  generative: {
    Icon: Sparkles, text: "text-amber-300", dot: "bg-amber-400", tile: "bg-amber-500/15 text-amber-300",
    edge: "border-l-amber-400", bar: "from-amber-400 to-orange-400", glow: "from-amber-500/[0.14]",
    on: "bg-amber-500/20 border-amber-400/60 text-white", ring: "ring-2 ring-amber-400/70", chip: "border-amber-400/30 text-amber-200 bg-amber-500/10",
  },
  medical: {
    Icon: HeartPulse, text: "text-rose-300", dot: "bg-rose-400", tile: "bg-rose-500/15 text-rose-300",
    edge: "border-l-rose-400", bar: "from-rose-400 to-pink-400", glow: "from-rose-500/[0.14]",
    on: "bg-rose-500/20 border-rose-400/60 text-white", ring: "ring-2 ring-rose-400/70", chip: "border-rose-400/30 text-rose-200 bg-rose-500/10",
  },
} as const;

const themeOf = (key: string) => literatureThemes.find(t => t.key === key)!;
const styleOf = (themeKey: string) => THEME_STYLE[themeOf(themeKey).icon];
const topicTitle = (key: string) => literatureTopics.find(t => t.key === key)?.title ?? "";

// ─── Search: every word must match; common abbreviations expand ──────────
const SYNONYMS: Record<string, string[]> = {
  svm: ["support vector"], svms: ["support vector"], tsvm: ["twin support vector", "twin svm"],
  nn: ["neural network"], nns: ["neural network"], gnn: ["gradient neural network"], znn: ["zeroing neural"],
  pnn: ["projection neural"], ave: ["absolute value equation"], aves: ["absolute value equation"],
  vi: ["variational inequalit"], vis: ["variational inequalit"], qvi: ["quasi variational"],
  ncp: ["complementarity"], lcp: ["complementarity"], soc: ["second order cone"], socp: ["second order cone"],
  sdp: ["semidefinite"], rvfl: ["random vector functional link"], gan: ["generative adversarial"],
  gans: ["generative adversarial"], pet: ["positron emission"], mri: ["magnetic resonance"],
  ct: ["computed tomography"], ml: ["machine learning"], dl: ["deep learning"], ai: ["artificial intelligence"],
  kkt: ["karush"], ode: ["differential equation", "dynamical system"], admm: ["alternating direction"],
  multiview: ["multi view"], bilevel: ["bi level"],
};

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[-‐‑–—/]/g, " ");
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Short words must match whole words ("pet" must not hit "competitive"); longer ones may match word stems.
const pattern = (alt: string) => {
  const body = alt.split(" ").map(esc).join("[\\s\\-‐‑–—/]+");
  return alt.length <= 3 ? `\\b${body}\\b` : body;
};

function buildQuery(q: string) {
  const words = norm(q).split(/\s+/).filter(Boolean);
  const groups = words.map(w => [w, ...(SYNONYMS[w] ?? [])].map(a => new RegExp(pattern(a), "i")));
  const all = words.flatMap(w => [w, ...(SYNONYMS[w] ?? [])]).filter(a => a.length > 1);
  const highlight = all.length ? new RegExp(`(${all.map(pattern).join("|")})`, "gi") : null;
  return { groups, highlight };
}

function haystack(p: LiteraturePaper) {
  return norm([p.title, p.authors.join(" "), p.journal, p.group ?? "", topicTitle(p.topic), themeOf(p.theme).title, p.summary ?? ""].join(" "));
}

function Highlight({ text, re }: { text: string; re: RegExp | null }) {
  if (!re) return <>{text}</>;
  const parts = text.split(re);
  return <>{parts.map((s, i) => i % 2 ? <mark key={i} className="bg-yellow-300/25 text-inherit rounded-sm px-0.5">{s}</mark> : s)}</>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────
const NEW_SINCE = new Date(new Date(literatureUpdated + "T00:00:00").getTime() - 30 * 864e5).toISOString().slice(0, 10);
const isNew = (p: LiteraturePaper) => !!p.added && p.added >= NEW_SINCE;

function authorLine(p: LiteraturePaper) {
  const shown = p.authors.slice(0, 3).join(", ");
  return p.authorCount > 3 ? `${shown} et al.` : shown;
}

function publicationLink(p: { doi?: string; url?: string }) {
  return p.doi?.startsWith("10.") ? `https://doi.org/${p.doi}` : p.url;
}

const QUICK_SEARCHES = ["SVM", "Neurodynamic", "Absolute value equations", "Second-order cone", "Diffusion models", "Osteoporosis", "Hessian-driven damping"];

// ─── Paper card ───────────────────────────────────────────────────────────
function PaperCard({ p, re, showSummary, showTopic }: { p: LiteraturePaper; re: RegExp | null; showSummary: boolean; showTopic: boolean }) {
  const [open, setOpen] = useState(false);
  const st = styleOf(p.theme);
  const doiUrl = `https://doi.org/${p.doi}`;
  const long = (p.summary?.length ?? 0) > 200;
  return (
    <li className={`flex flex-col rounded-xl border border-white/[0.07] border-l-[3px] ${st.edge} p-4 lg:p-5 transition-colors ${p.deepmathai
      ? "bg-teal-500/[0.07] hover:bg-teal-500/[0.1]" : "bg-white/[0.025] hover:bg-white/[0.045]"}`}>
      <div className="flex items-center gap-2 mb-2 text-[11px] font-semibold uppercase tracking-wider">
        {showTopic && <span className={st.text}>{topicTitle(p.topic)}</span>}
        <span className="ml-auto flex items-center gap-1.5 normal-case tracking-normal">
          {isNew(p) && <span className="px-2 py-0.5 rounded-full border bg-blue-500/15 text-blue-300 border-blue-400/30">New</span>}
          {p.deepmathai && <span className="px-2 py-0.5 rounded-full border bg-teal-500/15 text-teal-300 border-teal-400/30">DeepMathAI</span>}
          <span className="text-gray-500 font-medium">{p.year}</span>
        </span>
      </div>

      <a href={doiUrl} target="_blank" rel="noopener noreferrer"
        className="font-semibold text-[15px] text-white leading-snug hover:text-blue-300 transition-colors">
        <Highlight text={p.title} re={re} />
      </a>
      <p className="mt-1 text-sm text-gray-400"><Highlight text={authorLine(p)} re={re} /></p>

      {showSummary && p.summary && (
        <div className="mt-3 rounded-lg bg-black/20 px-3 py-2.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">
            {p.summarySource === "tldr" ? "TL;DR" : "From the abstract"}
          </p>
          <p className={`text-sm text-gray-300 leading-relaxed ${open || !long ? "" : "line-clamp-3"}`}>
            <Highlight text={p.summary} re={re} />
          </p>
          {long && (
            <button onClick={() => setOpen(!open)} className="mt-1 text-xs font-semibold text-blue-300 hover:text-blue-200">
              {open ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      )}
      {showSummary && !p.summary && (
        <p className="mt-3 rounded-lg border border-dashed border-white/[0.08] px-3 py-2.5 text-xs text-gray-500">
          No summary yet — the abstract is on the publisher&apos;s page (DOI).
        </p>
      )}

      <div className="mt-auto pt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="italic text-blue-200/80"><Highlight text={p.journal} re={re} /></span>
        <span className={`px-2 py-0.5 rounded-full font-semibold border ${p.quartile === "Q1"
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25" : "bg-sky-500/10 text-sky-400 border-sky-500/25"}`}>{p.quartile}</span>
        {p.openAccess && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold border bg-amber-500/10 text-amber-300 border-amber-500/25">
            <Unlock size={11} /> Open access
          </span>
        )}
        <span className="ml-auto flex items-center gap-2">
          {p.openAccessUrl && (
            <a href={p.openAccessUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 transition-colors">
              {p.openAccessLabel ?? "Free version"} <ExternalLink size={11} />
            </a>
          )}
          <a href={doiUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 transition-colors">
            DOI <ExternalLink size={11} />
          </a>
        </span>
      </div>
    </li>
  );
}

function OurWork({ theme }: { theme: LiteratureTheme }) {
  const pubs = theme.ourPublications.map(id => groupPublications.find(p => p.id === id)).filter(Boolean) as typeof groupPublications;
  const apps = theme.ourApps.map(id => aiApplications.find(a => a.id === id)).filter(Boolean) as typeof aiApplications;
  if (!pubs.length && !apps.length) return null;
  return (
    <div className="mt-5 pt-4 border-t border-white/[0.08]">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-teal-400 mb-2.5">DeepMathAI work in this area</p>
      <div className="flex flex-wrap gap-2">
        {pubs.map(p => (
          <a key={p.id} href={publicationLink(p)} target="_blank" rel="noopener noreferrer" title={p.title}
            className="inline-flex items-center gap-1.5 max-w-full px-3 py-1.5 rounded-lg text-xs text-gray-300 bg-white/[0.04] border border-white/[0.08] hover:border-teal-400/40 hover:text-white transition-colors">
            <FileText size={12} className="shrink-0 text-teal-400" />
            <span className="truncate max-w-[22rem]">{p.title}</span>
            <span className="shrink-0 text-gray-500">{p.year}</span>
          </a>
        ))}
        {apps.map(a => (
          <a key={a.id} href={a.url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-200 bg-blue-500/10 border border-blue-500/25 hover:border-blue-400/50 hover:text-white transition-colors">
            <Rocket size={12} className="shrink-0" />{a.name}
          </a>
        ))}
      </div>
    </div>
  );
}

function Toggle({ on, set, children }: { on: boolean; set: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <button onClick={() => set(!on)} aria-pressed={on}
      className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${on
        ? "bg-blue-500/20 border-blue-400/50 text-blue-100" : "bg-white/[0.03] border-white/[0.1] text-gray-400 hover:text-white"}`}>
      {children}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function LibraryView() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("all");
  const [topic, setTopic] = useState("all");
  const [oaOnly, setOaOnly] = useState(false);
  const [q1Only, setQ1Only] = useState(false);
  const [newOnly, setNewOnly] = useState(false);
  const [sort, setSort] = useState<"topic" | "newest">("topic");
  const [showSummary, setShowSummary] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // "/" focuses the search box
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !(e.target instanceof HTMLInputElement)) { e.preventDefault(); searchRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const { groups, highlight } = useMemo(() => buildQuery(query), [query]);
  const filtered = useMemo(() => literaturePapers.filter(p =>
    (theme === "all" || p.theme === theme) &&
    (topic === "all" || p.topic === topic) &&
    (!oaOnly || p.openAccess) && (!q1Only || p.quartile === "Q1") && (!newOnly || isNew(p)) &&
    (!groups.length || (h => groups.every(alts => alts.some(re => re.test(h))))(haystack(p)))),
  [theme, topic, oaOnly, q1Only, newOnly, groups]);

  const total = literaturePapers.length;
  const countIn = (themeKey: string) => literaturePapers.filter(p => p.theme === themeKey).length;
  const openCount = literaturePapers.filter(p => p.openAccess).length;
  const q1Count = literaturePapers.filter(p => p.quartile === "Q1").length;
  const newCount = literaturePapers.filter(isNew).length;
  const updated = new Date(literatureUpdated + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const filtering = !!query || theme !== "all" || topic !== "all" || oaOnly || q1Only || newOnly;
  const clearAll = () => { setQuery(""); setTheme("all"); setTopic("all"); setOaOnly(false); setQ1Only(false); setNewOnly(false); };
  const pickTheme = (k: string) => { setTheme(theme === k ? "all" : k); setTopic("all"); resultsRef.current?.scrollIntoView({ behavior: "smooth" }); };
  const quickSearch = (q: string) => { setQuery(q); setTheme("all"); setTopic("all"); resultsRef.current?.scrollIntoView({ behavior: "smooth" }); };

  const newest = [...filtered].sort((a, b) => b.year - a.year || (b.added ?? "").localeCompare(a.added ?? "") || a.title.localeCompare(b.title));
  const grid = "grid grid-cols-1 lg:grid-cols-2 gap-3";

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Header */}
      <section className="relative overflow-hidden pt-14 pb-10 lg:pt-20">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">
            <Library size={16} /> Research Library
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">The literature behind our research</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Recent Q1–Q2 journal articles connected to DeepMathAI&apos;s research, with a short summary of each and links to
            the publisher and to free versions.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2.5 text-sm">
            {[[total, "articles", "text-white"], [literatureTopics.length, "topics", "text-blue-300"],
              [q1Count, "in Q1 journals", "text-emerald-300"], [openCount, "open access", "text-amber-300"]].map(([n, label, c]) => (
              <span key={label as string} className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-400">
                <b className={`${c} font-bold`}>{n}</b> {label}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Popular searches:{" "}
            {QUICK_SEARCHES.map(q => (
              <button key={q} onClick={() => quickSearch(q)}
                className="mx-1 my-1 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-gray-300 hover:text-white hover:border-blue-400/40 transition-colors">
                {q}
              </button>
            ))}
          </p>
        </div>
      </section>

      {/* Browse by theme */}
      <section className="mx-auto max-w-6xl px-4 lg:px-8 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {literatureThemes.map(t => {
            const st = THEME_STYLE[t.icon];
            const on = theme === t.key;
            return (
              <button key={t.key} onClick={() => pickTheme(t.key)} aria-pressed={on}
                className={`group relative text-left rounded-2xl border border-white/[0.08] p-4 bg-gradient-to-br ${st.glow} to-transparent transition-all hover:-translate-y-0.5 hover:border-white/20 ${on ? st.ring : ""}`}>
                <span className={`absolute inset-x-4 top-0 h-[3px] rounded-b-full bg-gradient-to-r ${st.bar}`} />
                <span className={`inline-flex w-10 h-10 rounded-xl items-center justify-center ${st.tile}`}><st.Icon size={20} /></span>
                <span className="block mt-3 font-bold leading-snug text-white">{t.title}</span>
                <span className={`block mt-1 text-sm ${st.text}`}>{countIn(t.key)} articles</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Search + filters */}
      <div ref={resultsRef} className="scroll-mt-16 md:sticky md:top-16 z-30 bg-[#0a1628]/95 backdrop-blur-md border-y border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 py-3 space-y-3">
          <label className="relative block">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input ref={searchRef} value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search titles, authors, journals and summaries — e.g. SVM, projection neural network, osteoporosis"
              className="w-full h-12 pl-11 pr-20 rounded-xl bg-white/[0.06] border border-white/[0.12] text-[15px] text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/70 focus:bg-white/[0.08]" />
            {query ? (
              <button onClick={() => setQuery("")} aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white"><X size={18} /></button>
            ) : (
              <kbd className="hidden md:block absolute right-3.5 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md border border-white/15 text-xs text-gray-500">/</kbd>
            )}
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex gap-1.5 overflow-x-auto max-w-full">
              <button onClick={() => { setTheme("all"); setTopic("all"); }}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${theme === "all"
                  ? "bg-white/10 border-white/25 text-white" : "bg-white/[0.03] border-white/[0.08] text-gray-400 hover:text-white"}`}>
                All <span className="opacity-60">{total}</span>
              </button>
              {literatureThemes.map(t => {
                const st = THEME_STYLE[t.icon];
                return (
                  <button key={t.key} onClick={() => { setTheme(theme === t.key ? "all" : t.key); setTopic("all"); }}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${theme === t.key
                      ? st.on : "bg-white/[0.03] border-white/[0.08] text-gray-400 hover:text-white"}`}>
                    <span className={`w-2 h-2 rounded-full ${st.dot}`} />{t.title}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
              <Toggle on={oaOnly} set={setOaOnly}>Open access</Toggle>
              <Toggle on={q1Only} set={setQ1Only}>Q1</Toggle>
              {newCount > 0 && <Toggle on={newOnly} set={setNewOnly}>New</Toggle>}
              <Toggle on={showSummary} set={setShowSummary}>Summaries</Toggle>
              <div className="flex rounded-lg border border-white/[0.1] overflow-hidden" role="group" aria-label="Sort">
                {([["topic", "By topic", LayoutList], ["newest", "Newest", CalendarArrowDown]] as const).map(([k, label, Ic]) => (
                  <button key={k} onClick={() => setSort(k)} aria-pressed={sort === k}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold transition-colors ${sort === k
                      ? "bg-blue-500/20 text-blue-100" : "bg-white/[0.03] text-gray-400 hover:text-white"}`}>
                    <Ic size={14} />{label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {theme !== "all" && (
            <div className="flex gap-1.5 overflow-x-auto pb-0.5">
              {literatureTopics.filter(t => t.theme === theme).map(t => {
                const n = literaturePapers.filter(p => p.topic === t.key).length;
                const on = topic === t.key;
                return (
                  <button key={t.key} onClick={() => setTopic(on ? "all" : t.key)}
                    className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${on
                      ? styleOf(theme).on : `${styleOf(theme).chip} hover:text-white`}`}>
                    {t.title} <span className="opacity-60">{n}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-6xl px-4 lg:px-8 py-8">
        <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-gray-400">
          <span><b className="text-white">{filtered.length}</b> of {total} articles</span>
          {filtering && <button onClick={clearAll} className="font-semibold text-teal-400 hover:text-teal-300">Clear all filters</button>}
          <span className="ml-auto text-xs text-gray-500">Updated {updated} · new articles added weekly</span>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <BookMarked size={36} className="mx-auto mb-3 text-gray-600" />
            <p>No articles match{query && <> &ldquo;{query}&rdquo;</>}.</p>
            <p className="mt-3 text-sm">Try:{" "}
              {QUICK_SEARCHES.slice(0, 4).map(q => (
                <button key={q} onClick={() => quickSearch(q)} className="mx-1 text-blue-300 hover:text-blue-200 underline underline-offset-2">{q}</button>
              ))}
            </p>
          </div>
        )}

        {sort === "newest" ? (
          <ul className={grid}>
            {newest.map(p => <PaperCard key={p.doi} p={p} re={highlight} showSummary={showSummary} showTopic />)}
          </ul>
        ) : (
          <div className="space-y-14">
            {literatureThemes.map(th => {
              const papers = filtered.filter(p => p.theme === th.key);
              if (!papers.length) return null;
              const st = THEME_STYLE[th.icon];
              return (
                <section key={th.key} id={`theme-${th.key}`} className="scroll-mt-56">
                  <div className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br ${st.glow} via-white/[0.02] to-transparent p-6 lg:p-7 mb-7`}>
                    <span className={`absolute left-0 inset-y-0 w-1 bg-gradient-to-b ${st.bar}`} />
                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${st.tile}`}><st.Icon size={24} /></div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          <h2 className="text-2xl font-extrabold tracking-tight">{th.title}</h2>
                          <span className={`text-sm font-semibold ${st.text}`}>{papers.length} article{papers.length > 1 ? "s" : ""}</span>
                        </div>
                        <p className="mt-2 text-gray-400 leading-relaxed">{th.description}</p>
                      </div>
                    </div>
                    {!filtering && <OurWork theme={th} />}
                  </div>

                  <div className="space-y-10">
                    {literatureTopics.filter(t => t.theme === th.key).map(tp => {
                      const items = papers.filter(p => p.topic === tp.key);
                      if (!items.length) return null;
                      const subgroups = [...new Set(items.map(p => p.group ?? ""))].sort((a, b) => (a ? 1 : 0) - (b ? 1 : 0));
                      return (
                        <div key={tp.key}>
                          <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-4">
                            <span className={`w-1.5 h-6 rounded-full bg-gradient-to-b ${st.bar}`} />
                            {tp.title}
                            <span className={`text-sm font-semibold ${st.text}`}>{items.length}</span>
                          </h3>
                          {subgroups.map(g => (
                            <div key={g || "main"} className={g ? "mt-6" : ""}>
                              {g && <h4 className={`flex items-center gap-2 text-sm font-semibold mb-3 ${st.text}`}><ChevronDown size={14} />{g}</h4>}
                              <ul className={grid}>
                                {items.filter(p => (p.group ?? "") === g).map(p => (
                                  <PaperCard key={p.doi} p={p} re={highlight} showSummary={showSummary} showTopic={false} />
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        <p className="mt-14 pt-6 border-t border-white/[0.06] text-xs text-gray-500 leading-relaxed">
          Curated by the DeepMathAI Research Group from Scopus Q1–Q2 journals (quartiles from SJR); every week, recent articles
          on each topic from the same journals are added automatically and marked New. Bibliographic data and open-access links
          from <a href="https://openalex.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white underline">OpenAlex</a>.
          Summaries are either an AI-generated TL;DR from{" "}
          <a href="https://www.semanticscholar.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white underline">Semantic Scholar</a>{" "}
          or the opening sentences of the article&apos;s abstract. Links lead to the publishers and to open repositories such as
          arXiv; this site does not host the articles, and some publisher pages require a subscription.
        </p>
      </div>
    </div>
  );
}
