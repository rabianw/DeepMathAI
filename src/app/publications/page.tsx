import { groupPublications } from "@/lib/deepmathai-data";
import { BookOpen, ExternalLink, CheckCircle, Clock } from "lucide-react";

function getStatusBadge(status: string) {
  switch (status) {
    case "Published":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "Accepted":
      return "bg-blue-500/15 text-blue-400 border-blue-500/30";
    case "In Press":
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    default:
      return "bg-gray-500/15 text-gray-400 border-gray-500/30";
  }
}

function getCategoryBadge(category: string) {
  switch (category) {
    case "Optimization":
      return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "Deep Learning":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "Medical AI":
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    case "Applied Math":
      return "bg-teal-500/10 text-teal-400 border-teal-500/20";
    default:
      return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  }
}

export default function PublicationsPage() {
  const published = groupPublications.filter((p) => p.status === "Published");
  const accepted = groupPublications.filter((p) => p.status === "Accepted" || p.status === "In Press");

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Header */}
      <section className="py-16 lg:py-20 text-center">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">Research Output</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Publications
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Peer-reviewed journal articles by DeepMathAI research group members.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-emerald-400">{published.length}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Published</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-extrabold text-blue-400">{accepted.length}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Accepted</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white">{groupPublications.length}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Total</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Published ─────────────────────────────────── */}
      <section className="pb-12">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle size={20} className="text-emerald-400" />
            Published Articles
          </h2>
          <div className="space-y-4">
            {published.map((pub) => (
              <article
                key={pub.id}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-blue-500/20 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(pub.status)}`}>
                    {pub.status}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryBadge(pub.category)}`}>
                    {pub.category}
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">{pub.year}</span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug mb-2">{pub.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{pub.authors}</p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                  <div className="flex items-center gap-1.5 text-blue-400">
                    <BookOpen size={13} />
                    <span className="font-medium">{pub.journal}</span>
                  </div>
                  {pub.volume && (
                    <span className="text-gray-500">{pub.volume}</span>
                  )}
                </div>

                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    <ExternalLink size={12} />
                    DOI: {pub.doi}
                  </a>
                )}
                {!pub.doi && pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    <ExternalLink size={12} />
                    View Article
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accepted / In Press ────────────────────────── */}
      {accepted.length > 0 && (
        <section className="pb-20">
          <div className="mx-auto max-w-5xl px-4 lg:px-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Clock size={20} className="text-blue-400" />
              Accepted / In Press
            </h2>
            <div className="space-y-4">
              {accepted.map((pub) => (
                <article
                  key={pub.id}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-blue-500/20 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(pub.status)}`}>
                      {pub.status}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryBadge(pub.category)}`}>
                      {pub.category}
                    </span>
                    <span className="text-xs text-gray-500 ml-auto">{pub.year}</span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug mb-2">{pub.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{pub.authors}</p>

                  <div className="flex items-center gap-1.5 text-sm text-blue-400">
                    <BookOpen size={13} />
                    <span className="font-medium">{pub.journal}</span>
                  </div>
                  {pub.volume && (
                    <p className="text-sm text-gray-500 mt-1">{pub.volume}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
