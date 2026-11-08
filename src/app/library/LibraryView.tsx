"use client";

import { useMemo, useState } from "react";
import {
  Brain, Sigma, Cpu, Sparkles, HeartPulse, Search, ExternalLink, Unlock, Library,
  FileText, Rocket, X, BookMarked,
} from "lucide-react";
import { literaturePapers, literatureUpdated, type LiteraturePaper } from "@/lib/literature-papers";
import { literatureThemes, literatureTopics, type LiteratureTheme } from "@/lib/literature-topics";
import { groupPublications, aiApplications } from "@/lib/deepmathai-data";

const THEME_ICONS = { neuro: Brain, optim: Sigma, ml: Cpu, generative: Sparkles, medical: HeartPulse };

function publicationLink(p: { doi?: string; url?: string }) {
  return p.doi?.startsWith("10.") ? `https://doi.org/${p.doi}` : p.url;
}

function authorLine(p: LiteraturePaper) {
  const shown = p.authors.slice(0, 3).join(", ");
  return p.authorCount > 3 ? `${shown} et al.` : shown;
}

function PaperItem({ p }: { p: LiteraturePaper }) {
  const doiUrl = `https://doi.org/${p.doi}`;
  return (
    <li className={`group rounded-xl border p-4 transition-colors ${p.deepmathai
      ? "border-teal-400/30 bg-teal-500/[0.06] hover:border-teal-400/50"
      : "border-white/[0.06] bg-white/[0.025] hover:border-blue-500/25 hover:bg-white/[0.04]"}`}>
      <a href={doiUrl} target="_blank" rel="noopener noreferrer"
        className="font-semibold text-white leading-snug hover:text-blue-300 transition-colors">
        {p.title}
      </a>
      <p className="mt-1 text-sm text-gray-400">{authorLine(p)} · {p.year}</p>
      <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
        <span className="italic text-blue-300/90">{p.journal}</span>
        <span className={`px-2 py-0.5 rounded-full font-semibold border ${p.quartile === "Q1"
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
          : "bg-sky-500/10 text-sky-400 border-sky-500/25"}`}>{p.quartile}</span>
        {p.openAccess && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold border bg-amber-500/10 text-amber-300 border-amber-500/25">
            <Unlock size={11} /> Open access
          </span>
        )}
        {p.deepmathai && (
          <span className="px-2 py-0.5 rounded-full font-semibold border bg-teal-500/15 text-teal-300 border-teal-400/30">DeepMathAI</span>
        )}
        <span className="ml-auto flex items-center gap-3">
          {p.openAccessUrl && (
            <a href={p.openAccessUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-amber-300 hover:text-amber-200">
              {p.openAccessLabel ?? "Free version"} <ExternalLink size={11} />
            </a>
          )}
          <a href={doiUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-teal-400 hover:text-teal-300">
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

export default function LibraryView() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("all");
  const [oaOnly, setOaOnly] = useState(false);
  const [q1Only, setQ1Only] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return literaturePapers.filter(p =>
      (theme === "all" || p.theme === theme) &&
      (!oaOnly || p.openAccess) &&
      (!q1Only || p.quartile === "Q1") &&
      (!q || `${p.title} ${p.authors.join(" ")} ${p.journal} ${p.group ?? ""}`.toLowerCase().includes(q)));
  }, [query, theme, oaOnly, q1Only]);

  const total = literaturePapers.length;
  const openCount = literaturePapers.filter(p => p.openAccess).length;
  const q1Count = literaturePapers.filter(p => p.quartile === "Q1").length;
  const updated = new Date(literatureUpdated + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const filtering = query || theme !== "all" || oaOnly || q1Only;

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Header */}
      <section className="pt-16 pb-10 lg:pt-20 text-center">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">
            <Library size={16} /> Research Library
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">The literature behind our research</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A curated reading list of recent Q1–Q2 journal articles that connect to DeepMathAI&apos;s research themes — from
            neurodynamic optimization to medical AI. Every entry links to the publisher&apos;s page, and to a free version where one exists.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-8">
            {[
              [total, "Articles", "text-white"],
              [literatureTopics.length, "Topics", "text-blue-400"],
              [q1Count, "Q1 journals", "text-emerald-400"],
              [openCount, "Open access", "text-amber-300"],
            ].map(([n, label, color]) => (
              <div key={label as string} className="text-center">
                <div className={`text-3xl font-extrabold ${color}`}>{n}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-6">Updated {updated}</p>
        </div>
      </section>

      {/* Filters */}
      <div className="md:sticky md:top-16 z-30 bg-[#0a1628]/95 backdrop-blur-md border-y border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 py-3 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <label className="relative flex-1 min-w-[14rem]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search title, author or journal"
                className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/60" />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"><X size={16} /></button>
              )}
            </label>
            {[[oaOnly, setOaOnly, "Open access only"], [q1Only, setQ1Only, "Q1 only"]].map(([on, set, label]) => (
              <button key={label as string} onClick={() => (set as (v: boolean) => void)(!on)} aria-pressed={on as boolean}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold border transition-colors ${on
                  ? "bg-blue-500/20 border-blue-400/50 text-blue-200"
                  : "bg-white/[0.03] border-white/[0.1] text-gray-400 hover:text-white"}`}>
                {label as string}
              </button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mb-1">
            {[{ key: "all", title: "All themes" }, ...literatureThemes].map(t => {
              const n = t.key === "all" ? total : literaturePapers.filter(p => p.theme === t.key).length;
              return (
                <button key={t.key} onClick={() => setTheme(t.key)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${theme === t.key
                    ? "bg-gradient-to-r from-blue-500/30 to-teal-500/25 border-teal-400/50 text-white"
                    : "bg-white/[0.03] border-white/[0.08] text-gray-400 hover:text-white"}`}>
                  {t.title} <span className="text-xs opacity-60">{n}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Themes */}
      <div className="mx-auto max-w-6xl px-4 lg:px-8 py-10 space-y-14">
        {filtering && (
          <p className="text-sm text-gray-400">
            Showing <b className="text-white">{filtered.length}</b> of {total} articles
            <button onClick={() => { setQuery(""); setTheme("all"); setOaOnly(false); setQ1Only(false); }}
              className="ml-3 text-teal-400 hover:text-teal-300 font-semibold">Clear filters</button>
          </p>
        )}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <BookMarked size={36} className="mx-auto mb-3 text-gray-600" />
            No articles match these filters.
          </div>
        )}

        {literatureThemes.map(th => {
          const papers = filtered.filter(p => p.theme === th.key);
          if (!papers.length) return null;
          const Icon = THEME_ICONS[th.icon];
          return (
            <section key={th.key} id={`theme-${th.key}`} className="scroll-mt-48">
              <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-blue-500/[0.08] via-white/[0.02] to-teal-500/[0.06] p-6 lg:p-7 mb-8">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-500/15 text-blue-300 flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <h2 className="text-2xl font-extrabold tracking-tight">{th.title}</h2>
                      <span className="text-sm text-gray-500">{papers.length} article{papers.length > 1 ? "s" : ""}</span>
                    </div>
                    <p className="mt-2 text-gray-400 leading-relaxed">{th.description}</p>
                  </div>
                </div>
                <OurWork theme={th} />
              </div>

              <div className="space-y-10">
                {literatureTopics.filter(t => t.theme === th.key).map(topic => {
                  const tp = papers.filter(p => p.topic === topic.key);
                  if (!tp.length) return null;
                  const groups = [...new Set(tp.map(p => p.group ?? ""))].sort((a, b) => (a ? 1 : 0) - (b ? 1 : 0));
                  return (
                    <div key={topic.key}>
                      <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-4">
                        <span className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-400 to-teal-400" />
                        {topic.title}
                        <span className="text-sm font-normal text-gray-500">{tp.length}</span>
                      </h3>
                      {groups.map(g => (
                        <div key={g || "main"} className={g ? "mt-6" : ""}>
                          {g && <h4 className="text-sm font-semibold text-blue-300/90 mb-3">{g}</h4>}
                          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {tp.filter(p => (p.group ?? "") === g).map(p => <PaperItem key={p.doi} p={p} />)}
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

        <p className="pt-6 border-t border-white/[0.06] text-xs text-gray-500 leading-relaxed">
          Curated by the DeepMathAI Research Group from Scopus Q1–Q2 journals (quartiles from SJR). Bibliographic data and
          open-access links from <a href="https://openalex.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white underline">OpenAlex</a>.
          Links lead to the publishers and to open repositories such as arXiv; this site does not host the articles, and some
          publisher pages require a subscription.
        </p>
      </div>
    </div>
  );
}
