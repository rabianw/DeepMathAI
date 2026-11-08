import type { Metadata } from "next";
import LibraryView from "./LibraryView";

export const metadata: Metadata = {
  title: "Research Library | DeepMathAI",
  description:
    "A curated reading list of recent Q1–Q2 journal articles connected to DeepMathAI's research — neurodynamic optimization, optimization theory, machine learning, generative models and medical AI — with links to each publisher and to free open-access versions.",
  alternates: { canonical: "/library" },
};

export default function LibraryPage() {
  return <LibraryView />;
}
