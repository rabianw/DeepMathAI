"use client";

import {
  teamMembers,
  internationalNetwork,
  nationalNetwork,
} from "@/lib/deepmathai-data";
import {
  Mail,
  Globe,
  Award,
  BookOpen,
  GraduationCap,
} from "lucide-react";

function getRoleBadge(role: string) {
  switch (role) {
    case "PI":
      return { label: "Principal Investigator", color: "bg-amber-500/15 text-amber-400 border-amber-500/30" };
    case "Co-PI":
      return { label: "Co-Investigator", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" };
    case "Early-Career":
      return { label: "Early-Career Researcher", color: "bg-teal-500/15 text-teal-400 border-teal-500/30" };
    default:
      return { label: role, color: "bg-gray-500/15 text-gray-400 border-gray-500/30" };
  }
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Header */}
      <section className="py-16 lg:py-20 text-center">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">Our People</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Team & Network
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A multi-disciplinary team from Mathematics, Physics, Computer Science, and Engineering —
            supported by a global research network.
          </p>
        </div>
      </section>

      {/* ── Core Team ────────────────────────────────── */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <GraduationCap size={24} className="text-blue-400" />
            Core Research Team
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {teamMembers.map((member) => {
              const badge = getRoleBadge(member.role);
              return (
                <div
                  key={member.id}
                  className={`bg-white/[0.03] border rounded-2xl p-6 lg:p-8 hover:bg-white/[0.05] transition-all ${
                    member.role === "PI" ? "border-amber-500/20" : "border-white/[0.06]"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Avatar */}
                    <div className="shrink-0 flex flex-col items-center lg:items-start">
                      {member.avatarUrl ? (
                        <img
                          src={member.avatarUrl}
                          alt={member.nameEn}
                          className={`w-20 h-20 rounded-2xl object-cover border-2 ${
                            member.role === "PI" ? "border-amber-500/40" : "border-blue-500/30"
                          }`}
                          onError={(e) => {
                            // Fallback to initials if image fails to load
                            const target = e.currentTarget;
                            target.style.display = "none";
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                          member.role === "PI"
                            ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-300"
                            : "bg-gradient-to-br from-blue-500/20 to-teal-500/20 text-blue-300"
                        }`}
                        style={{ display: member.avatarUrl ? "none" : "flex" }}
                      >
                        {member.nameEn.charAt(0)}{member.nameEn.split(" ").pop()?.charAt(0)}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{member.nameEn}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>

                      <p className="text-sm text-gray-400 mb-1">{member.name}</p>
                      <p className="text-sm text-blue-400 mb-4">
                        {member.department}, {member.faculty} — {member.institution}
                      </p>

                      {/* Expertise Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.expertise.map((exp, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs text-gray-300"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>

                      {/* Metrics & Contact */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        {member.hIndexScopus && (
                          <div className="flex items-center gap-1.5">
                            <Award size={14} className="text-blue-400" />
                            {member.scopusUrl ? (
                              <a href={member.scopusUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                                <span>h-index (Scopus): <strong className="text-white">{member.hIndexScopus}</strong></span>
                              </a>
                            ) : (
                              <span>h-index (Scopus): <strong className="text-white">{member.hIndexScopus}</strong></span>
                            )}
                          </div>
                        )}
                        {member.citationScopus && (
                          <div className="flex items-center gap-1.5">
                            <BookOpen size={14} className="text-blue-400" />
                            <span>Citations: <strong className="text-white">{member.citationScopus.toLocaleString()}</strong></span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Mail size={14} className="text-teal-400" />
                          <a href={`mailto:${member.email}`} className="text-teal-400 hover:text-teal-300 transition-colors">
                            {member.email}
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── National Network ─────────────────────────── */}
      <section className="py-20 bg-[#0c1a30]">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
            <Globe size={24} className="text-teal-400" />
            National Research Network
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl">
            Collaborators from leading universities across Thailand, supporting joint publications and research projects.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nationalNetwork.map((partner) => (
              <div
                key={partner.id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-teal-500/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 relative">
                    {partner.avatarUrl ? (
                      <img
                        src={partner.avatarUrl}
                        alt={partner.nameEn}
                        className="w-14 h-14 rounded-xl object-cover border border-teal-500/30"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-teal-500/10 flex items-center justify-center text-2xl">
                        {partner.countryFlag}
                      </div>
                    )}
                    <span className="absolute -bottom-1 -right-1 text-lg">{partner.countryFlag}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{partner.nameEn}</h3>
                    <p className="text-sm text-teal-400 mb-1">{partner.institution}</p>
                    <p className="text-sm text-gray-500 mb-3">{partner.country}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {partner.expertise.slice(0, 4).map((exp, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs text-gray-400"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      {partner.hIndexScopus && (
                        <span>h-index: <strong className="text-white">{partner.hIndexScopus}</strong></span>
                      )}
                      {partner.citationScopus && (
                        <span>Citations: <strong className="text-white">{partner.citationScopus.toLocaleString()}</strong></span>
                      )}
                      {partner.email && (
                        <a
                          href={`mailto:${partner.email}`}
                          className="flex items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors"
                        >
                          <Mail size={12} />
                          {partner.email}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── International Network ────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
            <Globe size={24} className="text-teal-400" />
            International Research Network
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl">
            Collaborators from leading universities across Asia and Europe, supporting joint publications,
            grant applications, and researcher exchange programs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {internationalNetwork.map((partner) => (
              <div
                key={partner.id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-teal-500/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 relative">
                    {partner.avatarUrl ? (
                      <img
                        src={partner.avatarUrl}
                        alt={partner.nameEn}
                        className="w-14 h-14 rounded-xl object-cover border border-teal-500/30"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-teal-500/10 flex items-center justify-center text-2xl">
                        {partner.countryFlag}
                      </div>
                    )}
                    <span className="absolute -bottom-1 -right-1 text-lg">{partner.countryFlag}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{partner.nameEn}</h3>
                    <p className="text-sm text-teal-400 mb-1">{partner.institution}</p>
                    <p className="text-sm text-gray-500 mb-3">{partner.country}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {partner.expertise.slice(0, 4).map((exp, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs text-gray-400"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      {partner.hIndexScopus && (
                        <span>h-index: <strong className="text-white">{partner.hIndexScopus}</strong></span>
                      )}
                      {partner.citationScopus && (
                        <span>Citations: <strong className="text-white">{partner.citationScopus.toLocaleString()}</strong></span>
                      )}
                      <a
                        href={`mailto:${partner.email}`}
                        className="flex items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors"
                      >
                        <Mail size={12} />
                        {partner.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
