import { researchPillars, deepMathAIInfo } from "@/lib/deepmathai-data";
import {
  Zap, Brain, Shield, Activity, ChevronRight, ArrowRight,
  Cpu, Sun, Wind, Eye, Stethoscope, BarChart3,
} from "lucide-react";
import Link from "next/link";

function getPillarIcon(iconName: string, size: number = 32) {
  switch (iconName) {
    case "zap": return <Zap size={size} />;
    case "brain": return <Brain size={size} />;
    case "shield": return <Shield size={size} />;
    case "activity": return <Activity size={size} />;
    default: return <Brain size={size} />;
  }
}

const applicationDomains = [
  {
    title: "Medical Imaging AI",
    description: "Glaucoma detection, diabetic retinopathy, bone density prediction from MRI/CT/X-ray",
    icon: Eye,
    color: "#ef4444",
  },
  {
    title: "Renewable Energy",
    description: "Wind turbine control systems, solar energy optimization, microgrid development",
    icon: Sun,
    color: "#f59e0b",
  },
  {
    title: "Smart Grid Systems",
    description: "Automatic control systems, generator monitoring, energy management platforms",
    icon: Wind,
    color: "#14b8a6",
  },
  {
    title: "Healthcare Analytics",
    description: "Brain data analysis, neurological disease assessment, health prediction models",
    icon: Stethoscope,
    color: "#8b5cf6",
  },
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Header */}
      <section className="py-16 lg:py-20 text-center">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">Research Focus</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Research Areas
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Four interconnected research pillars bridging mathematical foundations with real-world AI applications.
          </p>
        </div>
      </section>

      {/* ── Framework Diagram ────────────────────────── */}
      <section className="pb-16">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 lg:p-12">
            <h3 className="text-lg font-bold text-white mb-8 text-center">Research Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {/* Foundation */}
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Cpu size={24} className="text-blue-400" />
                </div>
                <h4 className="font-bold text-blue-300 mb-2">Mathematical Foundations</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Optimization Theory, Approximation, Dynamical Systems, Geometry of Neural Networks
                </p>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center">
                <div className="hidden md:flex flex-col items-center gap-2">
                  <ArrowRight size={32} className="text-gray-600" />
                  <span className="text-xs text-gray-600">builds</span>
                </div>
                <div className="md:hidden">
                  <div className="w-px h-8 bg-gray-700 mx-auto" />
                </div>
              </div>

              {/* Models */}
              <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Brain size={24} className="text-purple-400" />
                </div>
                <h4 className="font-bold text-purple-300 mb-2">Models & Algorithms</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Provable DL Architectures, High-dim Optimization, Explainable AI Tools
                </p>
              </div>
            </div>

            <div className="flex justify-center my-6">
              <div className="w-px h-8 bg-gray-700" />
            </div>

            {/* Impact */}
            <div className="bg-teal-500/5 border border-teal-500/20 rounded-2xl p-6 max-w-md mx-auto text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <BarChart3 size={24} className="text-teal-400" />
              </div>
              <h4 className="font-bold text-teal-300 mb-2">Collaboration & Impact</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                International Publications (Q1-Q2), Open-source Tools, Junior Researcher Development, Real-world Deployments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Research Pillars ─────────────────────────── */}
      <section className="py-16 bg-[#0c1a30]">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-4">Four Research Pillars</h2>
          </div>

          <div className="space-y-8">
            {researchPillars.map((pillar, index) => (
              <div
                key={pillar.id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.1] transition-colors"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Left accent */}
                  <div
                    className="lg:w-2 w-full h-2 lg:h-auto shrink-0"
                    style={{ backgroundColor: pillar.color }}
                  />

                  <div className="p-8 flex-1">
                    <div className="flex items-start gap-5">
                      <div
                        className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${pillar.color}15`, color: pillar.color }}
                      >
                        {getPillarIcon(pillar.iconName, 32)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: pillar.color }}>
                            Pillar {index + 1}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{pillar.title}</h3>
                        <p className="text-gray-400 mb-5 leading-relaxed">{pillar.description}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {pillar.details.map((detail, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                              <ChevronRight size={14} className="shrink-0 mt-0.5" style={{ color: pillar.color }} />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Domains ──────────────────────── */}
      <section className="py-20 bg-[#0a1628]">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-400 mb-3">Application Domains</p>
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Real-World Impact Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {applicationDomains.map((domain, i) => {
              const Icon = domain.icon;
              return (
                <div
                  key={i}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center hover:border-white/[0.12] transition-colors"
                >
                  <div
                    className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${domain.color}15`, color: domain.color }}
                  >
                    <Icon size={28} />
                  </div>
                  <h4 className="font-bold text-white mb-2">{domain.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{domain.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Keywords ─────────────────────────────────── */}
      <section className="py-16 bg-[#0c1a30]">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">Keywords</p>
          <div className="flex flex-wrap justify-center gap-3">
            {deepMathAIInfo.keywords.map((keyword, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-gray-300"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
