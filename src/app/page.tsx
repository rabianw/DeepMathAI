import Link from "next/link";
import {
  deepMathAIInfo,
  groupStats,
  researchPillars,
  teamMembers,
  internationalNetwork,
  aiApplications,
} from "@/lib/deepmathai-data";
import { getImageUrl } from "@/lib/cloudinary";

import {
  Zap,
  Brain,
  Shield,
  Activity,
  Users,
  Globe,
  Map as MapIcon,
  FileText,
  ArrowRight,
  BookOpen,
  Award,
  Banknote,
  ChevronRight,
  Rocket,
  ExternalLink,
} from "lucide-react";

function getPillarIcon(iconName: string, size: number = 28) {
  switch (iconName) {
    case "zap": return <Zap size={size} />;
    case "brain": return <Brain size={size} />;
    case "shield": return <Shield size={size} />;
    case "activity": return <Activity size={size} />;
    default: return <Brain size={size} />;
  }
}

export default function DeepMathAIPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* ── Hero Section ─────────────────────────────── */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-[#0a1628] to-teal-900/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-10">
            <Globe size={14} />
            <span>Frontier Research and Innovation Cluster — Naresuan University</span>
          </div>

          {/* Logo + Title — Integrated Layout */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 mb-6">
            {/* Brain Icon */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl scale-110" />
              <img
                src={getImageUrl("/images/deepmathai-brain-light.png")}
                alt="DeepMathAI Brain Icon"
                className="relative w-28 h-28 lg:w-36 lg:h-36 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              />
            </div>

            {/* Title Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-2">
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-teal-400 bg-clip-text text-transparent">
                  DeepMathAI
                </span>
              </h1>
              <p className="text-sm lg:text-base font-semibold uppercase tracking-[0.2em] text-blue-400/60">
                Research Group · Naresuan University
              </p>
            </div>
          </div>

          <p className="text-lg lg:text-xl text-blue-200/80 max-w-3xl mx-auto mb-3 font-light">
            {deepMathAIInfo.tagline}
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-12">
            Interdisciplinary Research Group on Deep Mathematical Modeling for Machine Learning and Artificial Intelligence
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            {[
              { icon: Users, value: `${groupStats.researchers}`, label: "Core Researchers" },
              { icon: Globe, value: `${groupStats.internationalPartners}`, label: "Int'l Partners" },
              { icon: FileText, value: `${groupStats.targetPapersPerYear}+`, label: "Papers/Year" },
              { icon: Banknote, value: groupStats.externalFunding, label: "External Funding" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 backdrop-blur-sm hover:border-blue-500/30 transition-colors"
              >
                <stat.icon size={20} className="text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5"
            >
              <Users size={18} />
              Meet the Team
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.06] border border-white/[0.1] rounded-xl text-white font-semibold hover:bg-white/[0.1] transition-all"
            >
              <BookOpen size={18} />
              View Research
            </Link>
          </div>
        </div>
      </section>
      {/* ── Featured AI Application ──────────────────── */}
      <section className="relative py-20 lg:py-24 bg-[#0c1a30] overflow-hidden">
        {/* ambient glows */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          {aiApplications.slice(0, 1).map((app) => (
            <div key={app.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* ── Left: copy ── */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-teal-500/10 border border-teal-500/25 text-teal-300 text-sm font-semibold mb-6 animate-app-shimmer">
                  <Rocket size={14} />
                  <span>Featured Application · Try It Now</span>
                </div>

                <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-white mb-5 leading-tight">
                  Glaucoma{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    Multi-View
                  </span>{" "}
                  Screening
                </h2>

                <p className="text-lg text-blue-200/80 font-light mb-6 leading-relaxed">
                  Upload a retinal fundus photograph — our multi-view AI fuses the full image with an
                  automatically localized optic-disc crop and returns an explainable screening result
                  in seconds.
                </p>

                {/* mini feature chips */}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {["EfficientNetV2 ensemble", "Grad-CAM explainability", "Batch screening", "Free to use"].map((chip) => (
                    <span
                      key={chip}
                      className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-sm text-gray-300"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl text-white text-lg font-bold hover:shadow-lg hover:shadow-teal-500/30 transition-all hover:-translate-y-0.5 animate-app-glow"
                  >
                    <Rocket size={20} />
                    Launch App
                    <ExternalLink size={15} />
                  </a>
                  <Link
                    href="/applications"
                    className="inline-flex items-center gap-2 px-6 py-4 bg-white/[0.06] border border-white/[0.1] rounded-xl text-white font-semibold hover:bg-white/[0.1] transition-all"
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <p className="text-xs text-gray-500">
                  Published in Applied Sciences (MDPI), 2026 · Decision-support tool — not a medical diagnosis
                </p>
              </div>

              {/* ── Right: animated fundus visual ── */}
              <div className="relative animate-app-float">
                {/* gradient frame */}
                <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-blue-500/60 via-teal-400/40 to-blue-500/60 animate-app-shimmer">
                  <div className="relative rounded-3xl overflow-hidden bg-[#0a1628]">
                    <img
                      src={getImageUrl("/publications/pub5_graphical_abstract")}
                      alt="Glaucoma Multi-View Screening — fundus images with optic disc localization"
                      className="w-full h-auto block"
                    />
                    {/* scanning beam */}
                    <div className="absolute left-0 w-full h-16 pointer-events-none animate-app-scan bg-gradient-to-b from-transparent via-teal-400/25 to-transparent border-b border-teal-300/60" />
                    {/* soft vignette to blend with bg */}
                    <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-3xl" />
                  </div>
                </div>

                {/* floating chip: live status */}
                <div className="absolute -top-4 -right-3 lg:-right-6 animate-app-float-delayed">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0a1628]/95 border border-emerald-500/30 shadow-xl shadow-emerald-500/10 backdrop-blur">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-app-ping" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-sm font-bold text-emerald-300">Live · AI Screening</span>
                  </div>
                </div>

                {/* floating chip: prediction */}
                <div className="absolute -bottom-5 -left-3 lg:-left-6 animate-app-float-delayed">
                  <div className="px-5 py-3 rounded-2xl bg-[#0a1628]/95 border border-blue-500/30 shadow-xl shadow-blue-500/10 backdrop-blur">
                    <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-0.5">Multi-view prediction</p>
                    <p className="text-sm font-bold text-white">
                      Glaucoma suspected · <span className="text-teal-400">Grad-CAM ready</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* ── More applications (compact) ── */}
          {aiApplications.length > 1 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">More from our lab</h3>
                <Link
                  href="/applications"
                  className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  View all applications
                  <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {aiApplications.slice(1).map((app) => (
                  <div
                    key={app.id}
                    className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: `${app.color}15`, color: app.color }}
                      >
                        {app.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {app.status}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{app.name}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed mb-5">{app.tagline}.</p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                      >
                        <Rocket size={14} />
                        Launch App
                        <ExternalLink size={12} />
                      </a>
                      <Link
                        href="/applications"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] border border-white/[0.1] rounded-lg text-white text-sm font-semibold hover:bg-white/[0.1] transition-all"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Vision Section ───────────────────────────── */}
      <section className="py-20 bg-[#0c1a30]">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-400 mb-3">Our Vision</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
              Bridging Mathematics & AI
            </h2>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 lg:p-12 backdrop-blur-sm">
            <p className="text-gray-300 leading-relaxed text-lg">
              DeepMathAI is founded on the belief that truly advanced AI technology must be built on a solid
              mathematical foundation. In the era of Big Data and highly complex deep learning models, we focus
              on creating new theoretical knowledge alongside developing practically applicable models —
              transparent, explainable, and generalizable across diverse, large-scale datasets.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg mt-6">
              Our multi-disciplinary team integrates expertise from pure mathematics, applied mathematics, statistics,
              computer science, and engineering to develop AI models that are not just powerful, but provably correct,
              interpretable, and deployable in real-world settings including healthcare and energy systems.
            </p>
          </div>
        </div>
      </section>

      {/* ── Research Pillars ─────────────────────────── */}
      <section className="py-20 bg-[#0a1628]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">Research Focus</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Four Research Pillars
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our research integrates mathematical foundations with cutting-edge AI development across four interconnected areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchPillars.map((pillar) => (
              <div
                key={pillar.id}
                className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-blue-500/30 transition-all hover:bg-white/[0.05]"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${pillar.color}15`, color: pillar.color }}
                >
                  {getPillarIcon(pillar.iconName)}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{pillar.description}</p>
                <ul className="space-y-2">
                  {pillar.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <ChevronRight size={14} className="shrink-0 mt-0.5" style={{ color: pillar.color }} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Preview ─────────────────────────────── */}
      <section className="py-20 bg-[#0c1a30]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-400 mb-3">Our People</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Multi-Disciplinary Team
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {teamMembers.length} core researchers from {new Set(teamMembers.map((m) => m.department)).size} departments,
              supported by {internationalNetwork.length} international collaborators.
            </p>
          </div>

          {/* Core Team Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 text-center hover:border-blue-500/20 transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500/20 to-teal-500/20 flex items-center justify-center text-xl font-bold text-blue-300">
                  {member.nameEn.charAt(0)}{member.nameEn.split(" ").pop()?.charAt(0)}
                </div>
                <h4 className="text-sm font-bold text-white leading-tight">{member.nameEn}</h4>
                <p className="text-xs text-gray-500 mt-1">{member.title}</p>
                {member.hIndexScopus && (
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs">
                    h-index: {member.hIndexScopus}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* International Partners */}
          <h3 className="text-center text-lg font-bold text-white mb-6">
            <Globe size={18} className="inline mr-2 text-teal-400" />
            International Research Network
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {internationalNetwork.map((partner) => (
              <div
                key={partner.id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 text-center hover:border-teal-500/20 transition-colors"
              >
                <div className="text-3xl mb-2">{partner.countryFlag}</div>
                <h4 className="text-sm font-bold text-white">{partner.nameEn}</h4>
                <p className="text-xs text-gray-500 mt-1">{partner.institution}</p>
                <p className="text-xs text-teal-400 mt-1">{partner.country}</p>
                {partner.hIndexScopus && (
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-xs">
                    h-index: {partner.hIndexScopus}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              View Full Team Details
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Keywords ─────────────────────────────────── */}
      <section className="py-16 bg-[#0a1628]">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">Research Keywords</p>
          <div className="flex flex-wrap justify-center gap-3">
            {deepMathAIInfo.keywords.map((keyword, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-gray-300 hover:border-blue-500/30 hover:text-blue-300 transition-colors cursor-default"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Footer ───────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-[#0a1628] to-[#0c1a30]">
        <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <Award size={40} className="text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Towards a National Center of Excellence
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            DeepMathAI aims to become the leading &ldquo;Mathematical AI&rdquo; research group in Thailand —
            producing transparent, trustworthy, and deployable AI with strong theoretical foundations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5"
            >
              <MapIcon size={18} />
              View 3-Year Roadmap
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.06] border border-white/[0.1] rounded-xl text-white font-semibold hover:bg-white/[0.1] transition-all"
            >
              Explore Research Areas
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
