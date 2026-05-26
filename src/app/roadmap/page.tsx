import { roadmapData } from "@/lib/deepmathai-data";
import {
  Target, Calendar, TrendingUp, CheckCircle2,
  FileText, Globe, Users, Banknote, Code,
} from "lucide-react";

function getKpiIcon(label: string) {
  if (label.includes("Paper")) return <FileText size={14} />;
  if (label.includes("International")) return <Globe size={14} />;
  if (label.includes("Junior") || label.includes("Researcher")) return <Users size={14} />;
  if (label.includes("Funding")) return <Banknote size={14} />;
  if (label.includes("Open") || label.includes("Tool")) return <Code size={14} />;
  return <Target size={14} />;
}

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Header */}
      <section className="py-16 lg:py-20 text-center">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">Strategic Plan</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            3-Year Roadmap
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From foundation building to field deployment — our pathway to becoming a National Center of Excellence in Mathematical AI.
          </p>
        </div>
      </section>

      {/* ── Summary KPIs ─────────────────────────────── */}
      <section className="pb-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8">
            <h3 className="text-center text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
              3-Year Cumulative Targets
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              {[
                { label: "Q1-Q2 Papers", value: "≥30", icon: FileText, color: "text-blue-400" },
                { label: "Int'l Co-authored", value: "≥15", icon: Globe, color: "text-teal-400" },
                { label: "Junior Researchers", value: "≥10", icon: Users, color: "text-purple-400" },
                { label: "External Grants", value: "≥3", icon: Banknote, color: "text-amber-400" },
                { label: "Open-source Tools", value: "≥5", icon: Code, color: "text-emerald-400" },
              ].map((item, i) => (
                <div key={i} className="p-4">
                  <item.icon size={20} className={`${item.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-white">{item.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────── */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500 opacity-30" />

            <div className="space-y-16">
              {roadmapData.map((year, yearIndex) => {
                const colors = [
                  { bg: "from-blue-500 to-blue-600", text: "text-blue-400", border: "border-blue-500/30", badgeBg: "bg-blue-500/15" },
                  { bg: "from-purple-500 to-purple-600", text: "text-purple-400", border: "border-purple-500/30", badgeBg: "bg-purple-500/15" },
                  { bg: "from-teal-500 to-teal-600", text: "text-teal-400", border: "border-teal-500/30", badgeBg: "bg-teal-500/15" },
                ][yearIndex];

                return (
                  <div key={year.year} className="relative pl-16 lg:pl-20">
                    {/* Year Circle */}
                    <div
                      className={`absolute left-0 w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg`}
                    >
                      <Calendar size={24} className="text-white" />
                    </div>

                    {/* Year Content */}
                    <div className={`bg-white/[0.03] border ${colors.border} rounded-2xl p-6 lg:p-8`}>
                      {/* Year Header */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`text-3xl font-black ${colors.text}`}>{year.year}</span>
                        <span className="text-sm text-gray-500">(พ.ศ. {year.thaiYear})</span>
                        <span className={`px-3 py-1 rounded-full ${colors.badgeBg} ${colors.text} text-xs font-semibold border ${colors.border}`}>
                          Year {yearIndex + 1}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">{year.title}</h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">{year.description}</p>

                      {/* Milestones */}
                      <div className="mb-6">
                        <h4 className={`text-sm font-bold uppercase tracking-wider ${colors.text} mb-3`}>Key Milestones</h4>
                        <ul className="space-y-2">
                          {year.milestones.map((milestone, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                              <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${colors.text}`} />
                              <span>{milestone}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* KPIs */}
                      <div>
                        <h4 className={`text-sm font-bold uppercase tracking-wider ${colors.text} mb-3`}>KPI Targets</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                          {year.kpis.map((kpi, i) => (
                            <div
                              key={i}
                              className={`bg-white/[0.03] border ${colors.border} rounded-xl p-3 text-center`}
                            >
                              <div className={`${colors.text} flex justify-center mb-1`}>
                                {getKpiIcon(kpi.label)}
                              </div>
                              <div className="text-lg font-bold text-white">{kpi.target}</div>
                              <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{kpi.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Budget Summary ───────────────────────────── */}
      <section className="py-20 bg-[#0c1a30]">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-3">Budget</p>
            <h2 className="text-3xl font-extrabold text-white mb-4">Annual Budget: ฿500,000</h2>
            <p className="text-gray-400">3-Year Total: ฿1,500,000 (Frontier Research and Innovation Cluster Grant)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Publication & Registration Fees", amount: "฿90,000", pct: "18%" },
              { label: "Travel, Accommodation & Per Diem", amount: "฿220,000", pct: "44%" },
              { label: "AI Commercial Services (GPT, Claude, Gemini)", amount: "฿80,000", pct: "16%" },
              { label: "International Conference Co-hosting", amount: "฿50,000", pct: "10%" },
              { label: "Speaker Fees & Workshop Catering", amount: "฿28,000", pct: "6%" },
              { label: "Student Assistants, OT & Materials", amount: "฿32,000", pct: "6%" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm text-gray-300">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.pct} of annual budget</p>
                </div>
                <span className="text-sm font-bold text-amber-400">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Goal ─────────────────────────────────────── */}
      <section className="py-20 bg-[#0a1628]">
        <div className="mx-auto max-w-3xl px-4 lg:px-8 text-center">
          <TrendingUp size={40} className="text-teal-400 mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Towards National Center of Excellence
          </h2>
          <p className="text-gray-400 leading-relaxed">
            By Year 3, DeepMathAI aims to establish itself as the leading Mathematical AI research group in Thailand
            — with 30+ Q1-Q2 publications, 10+ developed junior researchers, field-tested AI models in healthcare
            and energy, and a roadmap to upgrade to a National Center of Excellence.
          </p>
        </div>
      </section>
    </div>
  );
}
