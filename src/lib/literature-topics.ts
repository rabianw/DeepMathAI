// ─── Research Library: themes and topics ─────────────
// Hand-written. The paper list itself is generated into literature-papers.ts by
// scripts/build-literature.mjs from the group's reading lists.

export interface LiteratureTheme {
  key: string;            // folder prefix in the reading lists, e.g. "10"
  title: string;
  description: string;
  icon: "neuro" | "optim" | "ml" | "generative" | "medical";
  // DeepMathAI work in this theme, by id in groupPublications / aiApplications
  ourPublications: string[];
  ourApps: string[];
}

export interface LiteratureTopic {
  key: string;            // folder number in the reading lists, e.g. "11"
  theme: string;          // LiteratureTheme.key
  title: string;
}

export const literatureThemes: LiteratureTheme[] = [
  {
    key: "10",
    title: "Neurodynamic Optimization",
    description:
      "Recurrent and gradient neural networks whose dynamics solve optimization, equilibrium and matrix-equation problems — with fixed- and predefined-time convergence, distributed and collaborative variants, and applications to machine-learning models.",
    icon: "neuro",
    ourPublications: ["pub-10", "pub-1", "pub-2", "pub-9"],
    ourApps: [],
  },
  {
    key: "20",
    title: "Optimization Theory",
    description:
      "Cone programming, absolute value equations, smoothing of nonsmooth problems, multiobjective and semidefinite optimization, and the optimality conditions behind them.",
    icon: "optim",
    ourPublications: ["pub-3", "pub-4", "pub-7", "pub-2026-sym-1793"],
    ourApps: [],
  },
  {
    key: "30",
    title: "Machine Learning",
    description:
      "Support vector machines and twin SVMs with robust losses, multi-view learning, random vector functional link networks, and the optimization methods used to train machine-learning and deep-learning models.",
    icon: "ml",
    ourPublications: ["pub-8", "pub-9", "pub-5"],
    ourApps: [],
  },
  {
    key: "40",
    title: "Generative Models & Inverse Problems",
    description:
      "GANs and diffusion models for medical imaging, image restoration and deblurring, and stochastic optimization for PET reconstruction.",
    icon: "generative",
    ourPublications: ["pub-7", "pub-2026-sym-1793"],
    ourApps: ["app-qmg-rid-explorer"],
  },
  {
    key: "50",
    title: "Medical AI",
    description:
      "Deep learning and radiomics for vertebral fractures and osteoporosis screening from CT, MRI and radiographs.",
    icon: "medical",
    ourPublications: ["pub-osteoporosis-diag", "pub-5"],
    ourApps: ["app-vcf-mri2bmd", "app-glaucoma-multiview", "app-fundus-screening-assistant"],
  },
];

export const literatureTopics: LiteratureTopic[] = [
  { key: "11", theme: "10", title: "Gradient neural networks" },
  { key: "12", theme: "10", title: "Primal–dual neural networks" },
  { key: "13", theme: "10", title: "Projection neural networks" },
  { key: "14", theme: "10", title: "Fixed- and predefined-time convergence" },
  { key: "15", theme: "10", title: "Distributed and multi-agent optimization" },
  { key: "16", theme: "10", title: "Complementarity and merit functions" },
  { key: "17", theme: "10", title: "Neurodynamics for machine-learning models" },
  { key: "18", theme: "10", title: "Inertial dynamics and ODE methods" },
  { key: "21", theme: "20", title: "Second-order and circular cones" },
  { key: "22", theme: "20", title: "Absolute value equations" },
  { key: "23", theme: "20", title: "Smoothing and nonsmooth optimization" },
  { key: "25", theme: "20", title: "Multiobjective optimization" },
  { key: "26", theme: "20", title: "Semidefinite programming" },
  { key: "27", theme: "20", title: "Convex analysis and optimality conditions" },
  { key: "31", theme: "30", title: "SVMs, twin SVMs and loss functions" },
  { key: "32", theme: "30", title: "Multi-view learning" },
  { key: "33", theme: "30", title: "Random vector functional link and ensembles" },
  { key: "34", theme: "30", title: "Optimization for machine learning" },
  { key: "41", theme: "40", title: "Generative adversarial networks" },
  { key: "42", theme: "40", title: "Diffusion models" },
  { key: "43", theme: "40", title: "Image restoration" },
  { key: "44", theme: "40", title: "PET reconstruction and stochastic optimization" },
  { key: "51", theme: "50", title: "Spine and vertebral fractures" },
  { key: "52", theme: "50", title: "Osteoporosis" },
];
