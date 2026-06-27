// DeepMathAI Research Group Data
// Source: (Revised)-แบบฟอร์มข้อเสนอโครงการFRandICluster-เวลา1756.docx

import { getImageUrl } from "./cloudinary";

export interface TeamMember {
  id: string;
  name: string;
  nameEn: string;
  title: string;
  department: string;
  faculty: string;
  institution: string;
  email: string;
  phone?: string;
  expertise: string[];
  hIndexGoogle?: number;
  hIndexScopus?: number;
  citationScopus?: number;
  role: "PI" | "Co-PI" | "Early-Career" | "International" | "National";
  responsibility: string; // percentage
  avatarUrl?: string;
  scopusUrl?: string;
  country?: string;
  countryFlag?: string;
}

export interface ResearchPillar {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  details: string[];
  iconName: string;
  color: string;
}

export interface RoadmapYear {
  year: number;
  thaiYear: number;
  title: string;
  description: string;
  milestones: string[];
  kpis: { label: string; target: string }[];
}

export interface GroupStats {
  researchers: number;
  internationalPartners: number;
  targetPapersPerYear: number;
  externalFunding: string;
  totalFunding3Years: string;
}

// ─── Group Info ─────────────────────────────────────
export const deepMathAIInfo = {
  nameTh: "DeepMathAI : กลุ่มวิจัยสหสาขาด้านแบบจำลองคณิตศาสตร์เชิงลึก เพื่อการเรียนรู้ของเครื่องและปัญญาประดิษฐ์",
  nameEn: "DeepMathAI : Interdisciplinary Research Group on Deep Mathematical Modeling for Machine Learning and Artificial Intelligence",
  shortName: "DeepMathAI",
  tagline: "Deep Mathematical Modeling for Machine Learning & AI",
  institution: "Naresuan University",
  fundingType: "Frontier Research and Innovation Clusters",
  fundingYear: "2569 (2026)",
  keywords: [
    "Mathematical Modeling", "Optimization", "Machine Learning",
    "Artificial Intelligence", "Deep Learning", "Mathematical Programming",
    "Numerical Analysis", "Explainable Models", "Big Data",
    "Sensitivity Analysis", "Theory-based Machine Learning"
  ],
};

// ─── Impact Stats ───────────────────────────────────
export const groupStats: GroupStats = {
  researchers: 7,
  internationalPartners: 4,
  targetPapersPerYear: 10,
  externalFunding: "฿22.96M",
  totalFunding3Years: "฿1.5M",
};

// ─── Team Members ───────────────────────────────────
export const teamMembers: TeamMember[] = [
  {
    id: "tm-rabian",
    name: "ศาสตราจารย์ ดร.ระเบียน วังคีรี",
    nameEn: "Prof. Dr. Rabian Wangkeeree",
    title: "Professor",
    department: "Department of Mathematics",
    faculty: "Faculty of Science",
    institution: "Naresuan University",
    email: "rabianw@nu.ac.th",
    phone: "086-397-7096",
    expertise: [
      "Optimization Algorithms", "Machine Learning", "Deep Learning",
      "Artificial Intelligence", "Approximation Theory", "Fixed Point Iteration"
    ],
    hIndexGoogle: 17,
    hIndexScopus: 16,
    citationScopus: 846,
    role: "PI",
    responsibility: "16%",
    avatarUrl: getImageUrl("/images/team/rabian"),
    scopusUrl: "https://www.scopus.com/authid/detail.uri?authorId=9335162000",
  },
  {
    id: "tm-chatchai",
    name: "รองศาสตราจารย์ ดร.ฉัตรชัย ศิริสัมพันธ์วงษ์",
    nameEn: "Assoc. Prof. Dr. Chatchai Sirisamphanwong",
    title: "Associate Professor",
    department: "Department of Physics",
    faculty: "Faculty of Science",
    institution: "Naresuan University",
    email: "chatchaisi@nu.ac.th",
    phone: "055-96-3512",
    expertise: ["Renewable Energy"],
    hIndexGoogle: 14,
    hIndexScopus: 13,
    citationScopus: 587,
    role: "Co-PI",
    responsibility: "14%",
    avatarUrl: getImageUrl("/images/team/chatchai"),
    scopusUrl: "https://www.scopus.com/authid/detail.uri?authorId=56118339100",
  },
  {
    id: "tm-rattanaporn",
    name: "รองศาสตราจารย์ ดร.รัตนาพร วังคีรี",
    nameEn: "Assoc. Prof. Dr. Rattanaporn Wangkeeree",
    title: "Associate Professor",
    department: "Department of Mathematics",
    faculty: "Faculty of Science",
    institution: "Naresuan University",
    email: "rattanapornw@nu.ac.th",
    phone: "081-457-9509",
    expertise: [
      "Approximation Theory", "Fixed Point Iteration",
      "Optimization Algorithms", "Machine Learning", "Artificial Intelligence"
    ],
    hIndexGoogle: 9,
    hIndexScopus: 7,
    citationScopus: 123,
    role: "Co-PI",
    responsibility: "14%",
    avatarUrl: getImageUrl("/images/team/rattanaporn"),
    scopusUrl: "https://www.scopus.com/authid/detail.uri?authorId=24281874800",
  },
  {
    id: "tm-kasamsuk",
    name: "รองศาสตราจารย์ ดร.เกษมสุข อุงจิตต์ตระกูล",
    nameEn: "Assoc. Prof. Dr. Kasamsuk Ungchittrakool",
    title: "Associate Professor",
    department: "Department of Mathematics",
    faculty: "Faculty of Science",
    institution: "Naresuan University",
    email: "kasamsuku@nu.ac.th",
    phone: "083-877-0075",
    expertise: [
      "Optimization Algorithms", "Fixed Point Theory",
      "Approximation Theory", "Variational Inequality",
      "Image Processing", "Image Restoration", "Image Deblurring"
    ],
    hIndexGoogle: 9,
    hIndexScopus: 8,
    citationScopus: 351,
    role: "Co-PI",
    responsibility: "14%",
    avatarUrl: getImageUrl("/images/team/kasamsuk"),
  },
  {
    id: "tm-kotchaporn",
    name: "ผู้ช่วยศาสตราจารย์ ดร.กชพร การุณ",
    nameEn: "Asst. Prof. Dr. Kotchaporn Karoon",
    title: "Assistant Professor",
    department: "Department of Mathematics",
    faculty: "Faculty of Science",
    institution: "Naresuan University",
    email: "kotchapornk@nu.ac.th",
    expertise: [
      "Statistical Process Control", "Time Series Analysis", "Fixed Point Theory"
    ],
    hIndexGoogle: 7,
    hIndexScopus: 7,
    citationScopus: 66,
    role: "Co-PI",
    responsibility: "14%",
    avatarUrl: getImageUrl("/images/team/kotchaporn"),
  },
  {
    id: "tm-limpapat",
    name: "ดร.ลิมปพัทธ์ บุษบัน",
    nameEn: "Dr. Limpapat Bussaban",
    title: "Lecturer",
    department: "Department of Computer Science",
    faculty: "Faculty of Science",
    institution: "Naresuan University",
    email: "limpapatb@nu.ac.th",
    phone: "081-872-3440",
    expertise: [
      "Deep Learning", "AI", "Fixed Point Theory",
      "Optimization", "Image Processing"
    ],
    hIndexGoogle: 6,
    hIndexScopus: 5,
    citationScopus: 105,
    role: "Early-Career",
    responsibility: "14%",
    avatarUrl: getImageUrl("/images/team/limpapat"),
  },
  {
    id: "tm-rataporn",
    name: "ดร.รัฐพร เงินมีศรี",
    nameEn: "Dr. Rataporn Ngoenmeesri",
    title: "Lecturer",
    department: "Faculty of Science",
    faculty: "Faculty of Science",
    institution: "Naresuan University",
    email: "ratapornn@nu.ac.th",
    phone: "055-96-3131",
    expertise: ["Renewable Energy"],
    hIndexGoogle: undefined,
    hIndexScopus: 4,
    citationScopus: 54,
    role: "Early-Career",
    responsibility: "14%",
    avatarUrl: undefined,
  },
];

// ─── International Network ──────────────────────────
export const internationalNetwork: TeamMember[] = [
  {
    id: "int-lam",
    name: "Prof. Lam Quoc Anh",
    nameEn: "Prof. Lam Quoc Anh",
    title: "Professor",
    department: "Department of Mathematics",
    faculty: "Teacher College",
    institution: "Can Tho University",
    email: "quocanh@ctu.edu.vn",
    expertise: [
      "Sensitivity Analysis", "Optimization",
      "Multiobjective Optimization", "Mathematical Programming"
    ],
    hIndexGoogle: 22,
    hIndexScopus: 20,
    citationScopus: 1268,
    role: "International",
    responsibility: "Advisor",
    country: "Vietnam",
    countryFlag: "🇻🇳",
    avatarUrl: getImageUrl("/images/team/Lam-Anh-2"),
  },
  {
    id: "int-bagdasar",
    name: "Prof. Ovidiu Bagdasar",
    nameEn: "Prof. Ovidiu Bagdasar",
    title: "Professor",
    department: "Electronics, Computing and Mathematics",
    faculty: "",
    institution: "University of Derby",
    email: "o.bagdasar@derby.ac.uk",
    expertise: [
      "Optimization", "Computational Mathematics",
      "Mathematical Modelling", "Number Theory"
    ],
    hIndexGoogle: undefined,
    hIndexScopus: 14,
    citationScopus: 801,
    role: "International",
    responsibility: "Advisor",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    avatarUrl: getImageUrl("/images/team/ovidue"),
  },
  {
    id: "int-chen",
    name: "Prof. Jein-Shan Chen",
    nameEn: "Prof. Jein-Shan Chen",
    title: "Professor",
    department: "Mathematics Department",
    faculty: "",
    institution: "National Taiwan Normal University",
    email: "jschen@math.ntnu.edu.tw",
    expertise: [
      "Continuous Optimization", "Nonsmooth Analysis",
      "Operations Research", "Multiobjective Optimization"
    ],
    hIndexGoogle: undefined,
    hIndexScopus: 20,
    citationScopus: 1474,
    role: "International",
    responsibility: "Advisor",
    country: "Taiwan",
    countryFlag: "🇹🇼",
    avatarUrl: getImageUrl("/images/team/chen"),
  },
  {
    id: "int-lee",
    name: "Prof. Gue Myung Lee",
    nameEn: "Prof. Gue Myung Lee",
    title: "Professor",
    department: "Department of Applied Mathematics",
    faculty: "",
    institution: "Pukyong National University",
    email: "gmlee@pknu.ac.kr",
    expertise: [
      "Sensitivity Analysis", "Nonlinear Optimization",
      "Multiobjective Optimization", "Mathematical Programming"
    ],
    hIndexGoogle: undefined,
    hIndexScopus: 26,
    citationScopus: 2156,
    role: "International",
    responsibility: "Advisor",
    country: "South Korea",
    countryFlag: "🇰🇷",
    avatarUrl: getImageUrl("/images/team/lee"),
  },
  {
    id: "int-nazemi",
    name: "Prof. Alireza Nazemi",
    nameEn: "Prof. Alireza Nazemi",
    title: "Professor",
    department: "Department of Applied Mathematics",
    faculty: "",
    institution: "Shahrood University of Technology",
    email: "a_nazemi@shahroodut.ac.ir",
    expertise: [
      "Convex Optimization", "Neural Networks",
      "Optimal Control", "Fractional Order Systems"
    ],
    hIndexGoogle: 27,
    hIndexScopus: undefined,
    citationScopus: 2235,
    role: "International",
    responsibility: "Advisor",
    country: "Iran",
    countryFlag: "🇮🇷",
    avatarUrl: getImageUrl("/images/team/Alireza"),
  },
  {
    id: "int-yirga",
    name: "Dr. Yirga Abebe Belay",
    nameEn: "Dr. Yirga Abebe Belay",
    title: "Lecturer",
    department: "Department of Mathematics",
    faculty: "",
    institution: "Aksum University",
    email: "yirga2006@gmail.com",
    expertise: ["Mathematics", "Optimization"],
    role: "International",
    responsibility: "Collaborator",
    country: "Ethiopia",
    countryFlag: "🇪🇹",
  },
];

// ─── National Network ───────────────────────────────
export const nationalNetwork: TeamMember[] = [
  {
    id: "nat-pakkapon",
    name: "รองศาสตราจารย์ ดร.ภัคพล ปรีชาศิลป์",
    nameEn: "Assoc. Prof. Dr. Pakkapon Preechasilp",
    title: "Associate Professor",
    department: "Department of Mathematics",
    faculty: "Faculty of Science and Technology",
    institution: "Pibulsongkram Rajabhat University",
    email: "",
    expertise: ["Mathematics", "Optimization"],
    role: "National",
    responsibility: "Collaborator",
    country: "Thailand",
    countryFlag: "🇹🇭",
  },
  {
    id: "nat-vipavee",
    name: "ดร.วิภาวี ดำมินเศก",
    nameEn: "Dr. Vipavee Damminsed",
    title: "Lecturer",
    department: "Department of Mathematics",
    faculty: "Faculty of Science",
    institution: "Kasetsart University, Sriracha Campus",
    email: "",
    expertise: ["Mathematics", "Optimization"],
    role: "National",
    responsibility: "Collaborator",
    country: "Thailand",
    countryFlag: "🇹🇭",
  },
  {
    id: "nat-nutt",
    name: "ดร.ณัฐ ธนะนิมิตร",
    nameEn: "Nutt Tananimit",
    title: "Lecturer",
    department: "Department of Mathematics Education",
    faculty: "",
    institution: "Walailak University",
    email: "nutt.ta@wu.ac.th",
    expertise: ["Mathematics", "Optimization"],
    role: "National",
    responsibility: "Collaborator",
    country: "Thailand",
    countryFlag: "🇹🇭",
  },
  {
    id: "nat-thanatporn",
    name: "ดร.ธนธรณ์ เกรซ",
    nameEn: "Thanatporn Grace",
    title: "Lecturer",
    department: "Department of Mathematics Education",
    faculty: "",
    institution: "Walailak University",
    email: "thanatporn.gr@wu.ac.th",
    expertise: ["Mathematics", "Optimization"],
    role: "National",
    responsibility: "Collaborator",
    country: "Thailand",
    countryFlag: "🇹🇭",
  },
  {
    id: "nat-panatda",
    name: "ดร.ปนัดดา บุญมั่น",
    nameEn: "Panatda Boonman",
    title: "Lecturer",
    department: "Mathematics",
    faculty: "Faculty of Science and Technology",
    institution: "Rajamangala University of Technology Suvarnabhumi",
    email: "panatdaw@hotmail.com",
    expertise: ["Mathematics", "Optimization"],
    role: "National",
    responsibility: "Collaborator",
    country: "Thailand",
    countryFlag: "🇹🇭",
  }
];


// ─── Research Pillars ───────────────────────────────
export const researchPillars: ResearchPillar[] = [
  {
    id: "pillar-optimization",
    title: "High-Performance Optimization Algorithms",
    shortTitle: "Optimization",
    description: "Developing large-scale optimization algorithms for training complex models on medical and engineering data.",
    details: [
      "Nonconvex & large-scale optimization for deep learning",
      "Stochastic optimization with convergence guarantees",
      "SVM with novel loss functions (Generalized Pinball, Rescaled)",
      "Neurodynamic neural network methods",
    ],
    iconName: "zap",
    color: "#3b82f6",
  },
  {
    id: "pillar-deep-learning",
    title: "Provable Deep Learning Architectures",
    shortTitle: "Deep Learning",
    description: "Designing new deep learning architectures with provable mathematical properties — convergence, stability, and generalization bounds.",
    details: [
      "Mathematically-grounded deep architectures",
      "Convergence and stability proofs for DL models",
      "Generalization bounds for medical imaging models",
      "Geometry of neural networks and kernel methods",
    ],
    iconName: "brain",
    color: "#8b5cf6",
  },
  {
    id: "pillar-explainable",
    title: "Explainable & Trustworthy AI",
    shortTitle: "Explainable AI",
    description: "Making AI transparent and interpretable using mathematical tools — differential geometry, spectral theory, and information geometry.",
    details: [
      "Spectral graph theory for model interpretability",
      "Information geometry for understanding neural networks",
      "Model cards and reproducibility standards",
      "Auditable and deployable AI systems",
    ],
    iconName: "shield",
    color: "#14b8a6",
  },
  {
    id: "pillar-applications",
    title: "Real-World Applications: Medical & Energy AI",
    shortTitle: "Applications",
    description: "Applying mathematical AI to real problems — medical imaging diagnosis, renewable energy systems, and smart grid optimization.",
    details: [
      "Glaucoma detection from retinal fundus images",
      "Bone mineral density prediction from MRI/CT/X-ray",
      "Diabetic retinopathy recognition",
      "Wind turbine control and solar energy optimization",
      "Smart grid and microgrid system analysis",
    ],
    iconName: "activity",
    color: "#f59e0b",
  },
];

// ─── 3-Year Roadmap ─────────────────────────────────
export const roadmapData: RoadmapYear[] = [
  {
    year: 2026,
    thaiYear: 2569,
    title: "Foundation & Prototype",
    description: "Establish the research group, define thematic areas, build initial prototypes, and set up the mentoring system.",
    milestones: [
      "Select core researchers and establish Advisory Board",
      "Define 3-year research plan and thematic areas",
      "Develop mathematical models and algorithm prototypes (≥2)",
      "Set up mentoring system for junior researchers",
      "Submit ≥10 Q1-Q2 journal articles",
      "Establish ≥3 international collaboration agreements",
    ],
    kpis: [
      { label: "Q1-Q2 Papers", target: "≥10" },
      { label: "International Co-authored", target: "≥5" },
      { label: "Junior Researcher Papers", target: "≥3" },
      { label: "External Funding", target: "฿3M" },
      { label: "Open-source Tools", target: "2 units" },
    ],
  },
  {
    year: 2027,
    thaiYear: 2570,
    title: "Deep Research & Real-World Testing",
    description: "Conduct in-depth research on optimization and deep learning, test models with real-world data, and expand international network.",
    milestones: [
      "Advanced research in optimization and deep learning models",
      "Test model performance with real-world data (medical/energy)",
      "Publish open-source tools and annotated datasets (≥3)",
      "Host international seminar and researcher exchange",
      "Submit international joint research grant",
      "Develop pilot projects in ≥2 application domains",
    ],
    kpis: [
      { label: "Q1-Q2 Papers", target: "≥10" },
      { label: "International Co-authored", target: "≥5" },
      { label: "Junior Researcher Papers", target: "≥3" },
      { label: "External Funding", target: "฿3M" },
      { label: "Open-source Tools", target: "2 units" },
    ],
  },
  {
    year: 2028,
    thaiYear: 2571,
    title: "Field Deployment & Center of Excellence",
    description: "Deploy AI models in healthcare and energy sectors, publish open research platform, and plan upgrade to national Center of Excellence.",
    milestones: [
      "Deploy pilot AI solutions in hospitals and energy facilities",
      "Complete open research platform (benchmark/testbed)",
      "Host international conference on Mathematical AI",
      "Publish comprehensive impact report",
      "Submit plan for upgrade to National Center of Excellence",
      "Total: ≥30 Q1-Q2 papers, ≥10 junior researchers developed",
    ],
    kpis: [
      { label: "Q1-Q2 Papers", target: "≥10" },
      { label: "International Co-authored", target: "≥5" },
      { label: "Junior Researcher Papers", target: "≥4" },
      { label: "External Funding", target: "฿3M" },
      { label: "Open-source Tools", target: "1 unit" },
    ],
  },
];

// ─── Funded Projects ────────────────────────────────
export const fundedProjects = [
  {
    id: "fp-1",
    title: "Beyond Coding: Upskilling in Mathematics, Programming for Data Science and Machine Learning",
    fundingBody: "PMU-B (บพค.)",
    amount: "฿1,500,000",
    pi: "Prof. Dr. Rabian Wangkeeree",
    period: "2024",
  },
  {
    id: "fp-2",
    title: "Advanced SVM Methods Powered by CNN Techniques for Medical Imaging: Classification and Detection of Red Aberrations in Retina for Diabetic Retinopathy Recognition",
    fundingBody: "NRCT (วช.)",
    amount: "฿1,500,000",
    pi: "Prof. Dr. Rabian Wangkeeree",
    period: "Apr 2024 – Apr 2027",
  },
  {
    id: "fp-3",
    title: "Hybrid Approximation Algorithms for Fixed Point and Split Zero Problems with Applications to Image Processing",
    fundingBody: "TSRI (กองทุน ววน.)",
    amount: "฿1,470,000",
    pi: "Assoc. Prof. Dr. Kasamsuk Ungchittrakool",
    period: "Mar 2023 – Mar 2026",
  },
  {
    id: "fp-4",
    title: "Generative AI for Synthetic Data Generation",
    fundingBody: "Enov8 Ltd., Australia",
    amount: "฿1,158,474 (48,000 AUD)",
    pi: "Dr. Limpapat Bussaban",
    period: "Feb 2024 – Jan 2026",
  },
  {
    id: "fp-5",
    title: "Si Chang Island Microgrid Development Feasibility Study",
    fundingBody: "PEA (การไฟฟ้าส่วนภูมิภาค)",
    amount: "฿5,790,000",
    pi: "Assoc. Prof. Dr. Chatchai Sirisamphanwong",
    period: "Mar 2023 – Nov 2023",
  },
  {
    id: "fp-6",
    title: "Solar Floating Phase 1 — Sri Trang Agro-Industry",
    fundingBody: "Sri Trang Agro-Industry PCL",
    amount: "฿3,456,000",
    pi: "Assoc. Prof. Dr. Chatchai Sirisamphanwong",
    period: "Oct 2023 – Apr 2024",
  },
];

// ─── Group Publications ─────────────────────────────
export interface GroupPublication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  url?: string;
  volume?: string;
  status: "Published" | "Accepted" | "In Press";
  category: "Optimization" | "Deep Learning" | "Medical AI" | "Applied Math";
  description?: string;
  graphicalAbstract?: string;
}

export const groupPublications: GroupPublication[] = [
  {
    id: "pub-1",
    title: "A Projection Recurrent Neural Network Method for Solving Absolute Value Equations Associated with Second-Order Cones",
    authors: "Wangkeeree, R., Wangkeeree, R., Nazemi, A., Belay, Y.A., & Ungchittrakool, K.",
    journal: "Journal of Computational and Applied Mathematics (Elsevier)",
    volume: "Vol. 485, 15 October 2026, 117567",
    year: 2026,
    doi: "10.1016/j.cam.2026.117567",
    status: "Published",
    category: "Optimization",
    description: "This paper proposes a projection recurrent neural network for solving absolute value equations (AVE) constrained within second-order cones. The network is proven to be globally convergent to the exact solution using Lyapunov stability theory, offering a continuous-time dynamical approach that outperforms classical iterative solvers.",
    graphicalAbstract: getImageUrl("/publications/pub1_graphical_abstract"),
  },
  {
    id: "pub-2",
    title: "A Projection Neural Network With Delays and Optimization Approaches for Solving Absolute Value Equations",
    authors: "Prathom, K., Wangkeeree, R., Belay, Y.A., & Hongsri, A.",
    journal: "IEEE Access",
    volume: "Vol. 14, pp. 50141–50155, March 2026",
    year: 2026,
    doi: "10.1109/ACCESS.2026.3679347",
    status: "Published",
    category: "Optimization",
    description: "A novel projection neural network incorporating time delays is developed to solve absolute value equations. The delay dynamics capture real-world computational latencies, and the model is combined with optimization techniques to ensure global stability. Experiments demonstrate superior convergence speed compared to delay-free counterparts.",
    graphicalAbstract: getImageUrl("/publications/pub2_graphical_abstract"),
  },
  {
    id: "pub-3",
    title: "A relaxed iterative method for approximating solutions of pseudomonotone hierarchical variational inequality problems in Hilbert spaces",
    authors: "Gebremeskel, K.G., Tewele, T.G., Wangkeeree, R., Belay, Y.A., & Meche, T.H.",
    journal: "The Journal of Analysis (Springer)",
    volume: "08 May 2026",
    year: 2026,
    doi: "10.1007/s41478-026-01096-8",
    status: "Published",
    category: "Applied Math",
    description: "This work introduces a relaxed iterative algorithm for solving hierarchical variational inequality problems in infinite-dimensional Hilbert spaces under pseudomonotonicity assumptions. Weak and strong convergence theorems are rigorously established, with numerical experiments validating the theoretical results.",
    graphicalAbstract: getImageUrl("/publications/pub3_graphical_abstract"),
  },
  {
    id: "pub-4",
    title: "Continuity and Lipschitz Properties of Approximate Weak Solution Maps via Nonlinear Scalarization",
    authors: "Preechasilp, P., & Wangkeeree, R.",
    journal: "Carpathian Journal of Mathematics",
    volume: "Issue 4/2026 — Special Issue: AMC-2025",
    year: 2026,
    status: "Accepted",
    category: "Applied Math",
    description: "This paper investigates the stability of solution maps for approximate weak vector optimization problems. Using a nonlinear scalarization technique, Hölder continuity and Lipschitz properties of the solution maps are derived under parametric perturbations, contributing to the theoretical foundations of robust optimization.",
    graphicalAbstract: getImageUrl("/publications/pub4_graphical_abstract"),
  },
  {
    id: "pub-5",
    title: "Multi-view machine learning with an optic disc localization for glaucoma diagnosis",
    authors: "Siying, P., Muangphara, T., Photun, A., Suppalap, S., Klinsuwan, T., Phruancharoen, C., Treeyawedkul, S., Chira-adisai, T., Supattanawong, Y., & Wangkeeree, R.",
    journal: "Applied Sciences (MDPI)",
    volume: "Vol. 16, Issue 7, 3158",
    year: 2026,
    doi: "10.3390/app16073158",
    status: "Published",
    category: "Medical AI",
    description: "An AI-powered glaucoma screening system that combines optic disc localization with multi-view machine learning. The model fuses features from multiple retinal fundus image perspectives to achieve robust classification of glaucoma vs. normal cases, offering a clinically applicable diagnostic tool validated on real patient data.",
    graphicalAbstract: getImageUrl("/publications/pub5_graphical_abstract"),
  },
  {
    id: "pub-6",
    title: "A Halpern Method for Solving Perturbed Double Inertial Krasnoselskii-Mann Iterations with Applications to Image Restoration Problems",
    authors: "Rattanaporn Wangkeeree, Rabian Wangkeeree, Yirga Abebe Belay, Kasamsuk Ungchittrakool, Purit Thammasiri, and Pakkaporn Preechasilp",
    journal: "Bangmod International Journal of Mathematical & Computational Science",
    volume: "Vol. 11 (2025)",
    year: 2025,
    url: "https://bangmodjmcs.com/index.php/bangmodmcs/article/view/209",
    status: "Published",
    category: "Applied Math",
    description: "A Halpern-type iterative scheme enhanced with double inertial terms and perturbation tolerance is proposed for finding fixed points in Banach spaces. The method achieves accelerated convergence and is applied successfully to signal denoising and image restoration benchmarks, demonstrating practical utility alongside strong theoretical guarantees.",
    graphicalAbstract: getImageUrl("/publications/pub6_graphical_abstract"),
  },
  {
    id: "pub-7",
    title: "Inertial Forward–Backward–Forward Algorithm with Moving Point Projection for Monotone Inclusions and Image Restoration",
    authors: "Thammasiri, P., Berinde, V., Plubtieng, S., Ungchittrakool, K., & Wangkeeree, R.",
    journal: "Symmetry (MDPI)",
    volume: "Vol. 18, Issue 5, 782",
    year: 2026,
    doi: "10.3390/sym18050782",
    status: "Published",
    category: "Applied Math",
    description: "A three-step inertial Forward–Backward–Forward (FBF) splitting algorithm with a moving projection operator is introduced for solving monotone inclusion problems. The inertial extrapolation significantly accelerates convergence. Applications to image restoration under various noise models confirm the method's competitive performance against state-of-the-art algorithms.",
    graphicalAbstract: getImageUrl("/publications/pub7_graphical_abstract"),
  },
  {
    id: "pub-8",
    title: "Multi-view Laplacian twin support vector machine with pinball loss function",
    authors: "Damminsed, V., & Wangkeeree, R.",
    journal: "Carpathian Journal of Mathematics",
    year: 2026,
    url: "https://www.carpathian.cunbm.utcluj.ro/all-issues-archive/",
    status: "Accepted",
    category: "Optimization",
    description: "This paper presents a Multi-view Laplacian Twin SVM that integrates pinball loss for improved robustness to noise and outliers. The Laplacian graph regularization captures geometric structure across multiple data views, while the twin hyperplane formulation reduces computational complexity. The model achieves state-of-the-art classification accuracy on benchmark datasets.",
    graphicalAbstract: getImageUrl("/publications/pub8_graphical_abstract"),
  },
  {
    id: "pub-9",
    title: "Compact Gradient-Based Neural Network for Stochastic Support Vector Regression with Probabilistic Constraints",
    authors: "Tananimit, N., Grace, T., Belay, Y. A., & Wangkeeree, R.",
    journal: "Journal of Nonlinear and Variational Analysis",
    year: 2026,
    url: "https://jnva.biemdas.com/archives/category/volume-10-issue-4",
    doi: "JNVA-2026042701",
    status: "Accepted",
    category: "Optimization",
    description: "A compact gradient-based neural network is designed to solve stochastic support vector regression (SSVR) with probabilistic constraints. Using a smoothed Fischer–Burmeister function, the nonsmooth KKT conditions are reformulated, yielding a numerically stable gradient flow. The proposed architecture achieves a 25% reduction in network complexity with faster training times while outperforming standard SVR implementations on UCI benchmarks.",
    graphicalAbstract: getImageUrl("/publications/pub9_graphical_abstract"),
  },
];
