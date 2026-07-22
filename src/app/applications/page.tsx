import type { Metadata } from "next";
import Link from "next/link";
import { aiApplications, groupPublications } from "@/lib/deepmathai-data";
import {
  Rocket,
  Eye,
  Layers,
  Upload,
  BarChart3,
  ExternalLink,
  FileText,
  AlertTriangle,
  Brain,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Cpu,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Applications | DeepMathAI",
  description:
    "Deployed AI applications built from DeepMathAI research — including the Glaucoma Multi-View Screening system for opportunistic glaucoma assessment from retinal fundus images.",
};

function getFeatureIcon(iconName: string, size: number = 22) {
  switch (iconName) {
    case "upload": return <Upload size={size} />;
    case "layers": return <Layers size={size} />;
    case "eye": return <Eye size={size} />;
    case "chart": return <BarChart3 size={size} />;
    default: return <Sparkles size={size} />;
  }
}

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-[#0a1628] to-teal-900/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <Rocket size={14} />
            <span>From Theory to Deployment</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-6">
            AI{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-teal-400 bg-clip-text text-transparent">
              Applications
            </span>
          </h1>
          <p className="text-lg text-blue-200/80 max-w-3xl mx-auto font-light">
            Every DeepMathAI application starts as a peer-reviewed publication. We turn our
            mathematically grounded models into transparent, explainable tools that anyone can use.
          </p>
        </div>
      </section>

      {/* ── Application Showcase ─────────────────────── */}
      <section className="py-16 bg-[#0c1a30]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {aiApplications.map((app) => {
            const paper = groupPublications.find((p) => p.id === app.publicationId);
            return (
              <div
                key={app.id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-3xl overflow-hidden"
              >
                {/* Header */}
                <div className="p-8 lg:p-12 border-b border-white/[0.06]">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: `${app.color}15`, color: app.color }}
                        >
                          {app.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {app.status}
                        </span>
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
                        {app.name}
                      </h2>
                      <p className="text-blue-200/80 text-lg font-light max-w-2xl">{app.tagline}</p>
                    </div>
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5"
                    >
                      <Rocket size={18} />
                      Launch App
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                {/* Body */}
                <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Description + models */}
                  <div className="lg:col-span-1">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-4">
                      How It Works
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-8">{app.description}</p>

                    <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-teal-400 mb-4">
                      <Cpu size={14} />
                      Models
                    </h4>
                    <ul className="space-y-2 mb-8">
                      {app.models.map((model, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                          <CheckCircle size={14} className="shrink-0 mt-0.5 text-teal-400" />
                          <span>{model}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Features */}
                  <div className="lg:col-span-2">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-4">
                      Key Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {app.features.map((feature, i) => (
                        <div
                          key={i}
                          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-blue-500/30 transition-colors"
                        >
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                            style={{ backgroundColor: `${app.color}15`, color: app.color }}
                          >
                            {getFeatureIcon(feature.iconName)}
                          </div>
                          <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Paper link */}
                    <div className="bg-blue-500/[0.06] border border-blue-500/20 rounded-2xl p-6 mb-6">
                      <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">
                        <FileText size={14} />
                        Published Research
                      </h4>
                      <p className="text-white font-semibold mb-1">
                        {paper ? paper.title : app.name}
                      </p>
                      <p className="text-sm text-gray-400 mb-4">{app.paperCitation}</p>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={app.paperUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                        >
                          Read the Paper (DOI)
                          <ExternalLink size={13} />
                        </a>
                        <Link
                          href="/publications"
                          className="inline-flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 font-semibold transition-colors"
                        >
                          All Publications
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    {app.disclaimer && (
                      <div className="flex items-start gap-3 bg-amber-500/[0.06] border border-amber-500/20 rounded-2xl p-5">
                        <AlertTriangle size={18} className="shrink-0 mt-0.5 text-amber-400" />
                        <p className="text-sm text-amber-200/80 leading-relaxed">
                          <span className="font-semibold text-amber-300">Important limitation: </span>
                          {app.disclaimer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* More coming */}
          <div className="mt-10 bg-white/[0.02] border border-dashed border-white/[0.1] rounded-3xl p-10 text-center">
            <Brain size={32} className="text-blue-400/60 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">More Applications in Development</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Upcoming tools from our research pipeline include opportunistic osteoporosis assessment
              from lumbar spine MRI, diabetic retinopathy screening, and renewable-energy optimization
              systems. Follow our{" "}
              <Link href="/publications" className="text-blue-400 hover:text-blue-300 font-semibold">
                publications
              </Link>{" "}
              to see what&apos;s next.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-[#0c1a30] to-[#0a1628]">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Research You Can Actually Use
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Interested in collaborating on deployable, explainable AI for healthcare or energy?
            DeepMathAI welcomes research partnerships and pilot deployments.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5"
            >
              Contact the Team
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.06] border border-white/[0.1] rounded-xl text-white font-semibold hover:bg-white/[0.1] transition-all"
            >
              Explore Research Areas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
