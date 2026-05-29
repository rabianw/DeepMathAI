"use client";

import { useState } from "react";
import { Calendar, MapPin, Users, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "../../lib/cloudinary";

const activities = [
  {
    id: "act-amm-cna-2026",
    title: "Annual Meeting in Mathematics 2026 (AMM 2026) & Conference in Number Theory and Applications 2026 (CNA 2026)",
    date: "May 28 - 30, 2026",
    location: "Avani Khon Kaen Hotel & Convention Centre",
    description:
      "DeepMathAI research group participated in the Annual Meeting in Mathematics 2026 (AMM 2026) and Conference in Number Theory and Applications 2026 (CNA 2026), held in conjunction with The International Session on Nonlinear and Convex Analysis.",
    type: "Conference",
    images: [
      getImageUrl("/IMG_2362_to9psx.jpg"),
      getImageUrl("/IMG_2383_qhtlqo.jpg"),
      getImageUrl("/IMG_2369_fd2crg.jpg"),
      getImageUrl("/IMG_0889_lccso5.jpg"),
      getImageUrl("/IMG_0882_e3u50u.jpg"),
      getImageUrl("/IMG_2415_ztps5y.jpg"),
      getImageUrl("/IMG_2408_rzwpjb.jpg"),
      getImageUrl("/IMG_2414_kef9ji.jpg"),
      getImageUrl("/IMG_2417_fa7vjc.jpg"),
      getImageUrl("/IMG_2431_fnjcyg.jpg"),
      getImageUrl("/IMG_2422_b94mvt.jpg"),
    ],
  },
  {
    id: "act-voices-2026",
    title: "Workshop/Seminar: Voices from the Global Research Community — Inspiration and Experience",
    date: "May 13, 2026",
    location: "Room SC2-112, Department of Mathematics, Faculty of Science, Naresuan University",
    description:
      "Featured Professor Dr. Poom Kumam, International Researcher & Distinguished Scholar recognized as the Top Mathematician in Thailand. The seminar provided students, researchers, and academics with valuable insights into international research experiences and new perspectives on academic research.",
    speaker: "Prof. Dr. Poom Kumam",
    type: "Workshop",
    images: [
      getImageUrl("/images/news/voices-global-research-2026/group.jpg"),
      getImageUrl("/images/news/voices-global-research-2026/seminar_room.jpg"),
      getImageUrl("/images/news/voices-global-research-2026/audience.jpg"),
      getImageUrl("/images/news/voices-global-research-2026/presentation.jpg"),
    ],
    posterImage: getImageUrl("/images/news/voices-global-research-2026/poster.jpg"),
  },
  {
    id: "act-icoml-cantho-2026",
    title: "Invited Keynote & Research Seminar at Can Tho University, Vietnam",
    date: "June 15, 2026",
    location: "School of Education, Can Tho University, Vietnam",
    description:
      "Prof. Rabian Wangkeeree delivered a keynote speech at the International Conference on Optimization and Machine Learning (ICOML) 2026. The talk focused on novel approaches in solving Support Vector Machines with Epigraph Reformulated Generalized Pinball Loss Function. This visit also strengthened the research collaboration with Prof. Lam Quoc Anh, a key member of the DeepMathAI international network.",
    speaker: "Prof. Dr. Rabian Wangkeeree",
    type: "Conference",
    images: [
      getImageUrl("/images/seminars/cantho2026_1.jpg"),
      getImageUrl("/images/seminars/cantho2026_2.jpg"),
      getImageUrl("/images/seminars/cantho2026_3.jpg"),
    ],
  },
  {
    id: "act-lam-set-optimization-2025",
    title: "Seminar: Unification of Semicontinuities and Applications in Analyzing Stability for Set Optimization Problems",
    date: "December 4, 2025",
    location: "Room SC2-112, Department of Mathematics, Faculty of Science, Naresuan University",
    description:
      "Special research seminar by Prof. Lam Quoc Anh from Can Tho University, Vietnam. The talk covered the unification of semicontinuities and its applications in analyzing stability for set optimization problems. This seminar was organized as part of the DeepMathAI international research network activities, featuring an introduction to set optimization problems and in-depth discussion on vector optimization with set-valued objective maps.",
    speaker: "Prof. Dr. Lam Quoc Anh",
    type: "Seminar",
    images: [
      getImageUrl("/images/seminars/lam_set_optimization_2025/presentation1.jpg"),
      getImageUrl("/images/seminars/lam_set_optimization_2025/presentation2.jpg"),
      getImageUrl("/images/seminars/lam_set_optimization_2025/group.jpg"),
    ],
    posterImage: getImageUrl("/images/seminars/lam_set_optimization_2025/poster.jpg"),
  },
];

function getTypeBadge(type: string) {
  switch (type) {
    case "Workshop": return "bg-blue-500/15 text-blue-400 border-blue-500/30";
    case "Training": return "bg-teal-500/15 text-teal-400 border-teal-500/30";
    case "Seminar": return "bg-purple-500/15 text-purple-400 border-purple-500/30";
    case "Conference": return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    default: return "bg-gray-500/15 text-gray-400 border-gray-500/30";
  }
}

export default function ActivitiesPage() {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  function openLightbox(images: string[], index: number) {
    setLightbox({ images, index });
  }

  function closeLightbox() {
    setLightbox(null);
  }

  function goNext() {
    if (!lightbox) return;
    setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.images.length });
  }

  function goPrev() {
    if (!lightbox) return;
    setLightbox({
      ...lightbox,
      index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length,
    });
  }

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Header */}
      <section className="py-16 lg:py-20 text-center">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">Events & Outreach</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Activities
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Workshops, seminars, training programs, and international conferences organized by DeepMathAI.
          </p>
        </div>
      </section>

      {/* ── Activities List ──────────────────────────── */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="space-y-8">
            {activities.map((activity) => {
              // Collect all clickable images for this activity
              const allImages = [
                ...activity.images,
                ...("posterImage" in activity && activity.posterImage ? [activity.posterImage] : []),
              ];

              return (
                <div
                  key={activity.id}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-blue-500/20 transition-colors"
                >
                  {/* Activity Content */}
                  <div className="p-6 lg:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeBadge(activity.type)}`}>
                        {activity.type}
                      </span>
                      {activity.date.includes("Planned") && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
                          Upcoming
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 leading-snug">{activity.title}</h3>

                    {"speaker" in activity && activity.speaker && (
                      <p className="text-blue-400 font-medium mb-3 flex items-center gap-2">
                        <Users size={14} />
                        Speaker: {activity.speaker}
                      </p>
                    )}

                    <p className="text-gray-400 leading-relaxed mb-4">{activity.description}</p>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{activity.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        <span>{activity.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Photo Gallery */}
                  {activity.images.length > 0 && (
                    <div className="border-t border-white/[0.06] p-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {activity.images.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => openLightbox(allImages, i)}
                            className="aspect-video rounded-xl overflow-hidden bg-white/[0.02] cursor-zoom-in group"
                          >
                            <img
                              src={img}
                              alt={`${activity.title} - Photo ${i + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Poster */}
                  {"posterImage" in activity && activity.posterImage && (
                    <div className="border-t border-white/[0.06] p-4">
                      <button
                        onClick={() => openLightbox(allImages, activity.images.length)}
                        className="max-w-sm mx-auto block rounded-xl overflow-hidden cursor-zoom-in group"
                      >
                        <img
                          src={activity.posterImage}
                          alt={`${activity.title} - Poster`}
                          className="w-full h-auto rounded-xl group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Lightbox Modal ────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-sm text-gray-400 font-medium">
            {lightbox.index + 1} / {lightbox.images.length}
          </div>

          {/* Prev button */}
          {lightbox.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.images[lightbox.index]}
              alt={`Photo ${lightbox.index + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Next button */}
          {lightbox.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
