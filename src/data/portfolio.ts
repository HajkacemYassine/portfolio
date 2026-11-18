// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Yassine Hajkacem",
  role: "Full-Stack & AI Developer",
  tagline: "RAG, Agents & Web Apps",
  location: "Sfax, Tunisia",
  intro:
    "I build full-stack web apps and AI-powered tools — from RAG pipelines and LangChain agents to clean React interfaces and solid REST APIs.",
  about: [
    "I'm an IT student specializing in Information Systems Development at ISET Sfax, with three internships behind me building real products for real teams.",
    "Most recently I built SAV-IA at Platana: an after-sales platform where a RAG engine and four cooperating LangChain agents diagnose household appliance failures and suggest spare parts. Before that I shipped an ERP stock module with Symfony and Angular, and e-commerce apps with React and PHP.",
    "I like working across the whole stack — designing the database, writing the API, and polishing the UI — and I'm especially interested in putting LLMs to practical use.",
  ],
  email: "yassinehajkacem191@gmail.com",
  github: "https://github.com/HajkacemYassine",
  linkedin: "https://www.linkedin.com/in/yassine-hajkacem-2a5128266/",
  cv: "/Yassine_Hajkacem_CV.pdf",
  // Photo shown on the ID badge. Put the image in /public and set e.g. "/avatar.jpg".
  // Leave empty to show the "YH" monogram instead.
  photo: "/avatar.jpg",
};

// "What I am" checklist on the back of the ID badge.
export const badgeFacts = [
  { title: "Full-Stack Developer", detail: "React · Angular · FastAPI · Django" },
  { title: "AI builder", detail: "RAG · LangChain agents · SAV-IA" },
  { title: "Back-end & APIs", detail: "REST · PostgreSQL · Docker · n8n" },
  { title: "IT undergrad", detail: "ISET Sfax · Info. Systems · 2027" },
  { title: "3 internships", detail: "Platana · REF IT · ASM" },
];

export const stats = [
  { value: "3", label: "Internships" },
  { value: "7", label: "Projects built" },
  { value: "4", label: "Languages spoken" },
];

export type Experience = {
  role: string;
  company: string;
  place: string;
  period: string;
  points: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    role: "AI & Full-Stack Developer Intern",
    company: "Platana",
    place: "Sfax, Tunisia",
    period: "Jun – Jul 2026",
    points: [
      "Built SAV-IA, an AI after-sales platform that automates household appliance failure diagnosis.",
      "Designed a RAG engine with Qdrant, Google embeddings and semantic search over technical documentation.",
      "Orchestrated 4 LangChain agents (NLP, RAG, spare parts, repairability) producing structured diagnoses.",
      "Developed the FastAPI back-end (9 PostgreSQL tables, Alembic migrations, email notifications) and a React/TypeScript front-end with Client, Technician and Admin spaces.",
    ],
    tech: ["FastAPI", "React", "TypeScript", "PostgreSQL", "Qdrant", "LangChain", "Groq", "Docker"],
  },
  {
    role: "ERP Developer Intern",
    company: "REF IT",
    place: "Sfax, Tunisia",
    period: "Jan – Feb 2026",
    points: [
      "Developed the stock management module of a complete ERP system.",
      "Built the back-end with Symfony (PHP) and the front-end with Angular and TypeScript.",
      "Implemented stock entry/exit tracking, restocking alerts and dynamic dashboards.",
    ],
    tech: ["Symfony", "Angular", "TypeScript", "SQL", "REST API"],
  },
  {
    role: "Web Developer Intern",
    company: "ASM",
    place: "Sfax, Tunisia",
    period: "Jan – Feb 2025",
    points: [
      "Built an e-commerce website with cart, product management and an admin interface.",
      "Developed a full-stack app with a React front-end and a PHP REST API back-end.",
    ],
    tech: ["React", "PHP", "JavaScript", "SQL"],
  },
];

export type Project = {
  title: string;
  subtitle: string;
  year: string;
  description: string;
  highlights: string[];
  tech: string[];
  repo?: string;
  demo?: string;
  featured?: boolean;
  // Which mini mock UI to draw in the project panel (see ProjectPreview.tsx).
  preview?: "sav" | "expense" | "erp" | "blood" | "risk" | "shop";
};

export const projects: Project[] = [
  {
    title: "SAV-IA",
    subtitle: "AI after-sales diagnosis platform",
    year: "2026",
    description:
      "Customers describe an appliance problem; a RAG engine and four orchestrated LangChain agents return probable causes, recommended spare parts and a repairability verdict.",
    highlights: [
      "RAG over technical docs with Qdrant + Google embeddings",
      "4 cooperating agents: NLP, RAG, spare parts, repairability",
      "Client, Technician and Admin interfaces",
    ],
    tech: ["FastAPI", "React", "TypeScript", "PostgreSQL", "Qdrant", "LangChain", "Llama 3.3 70B", "Docker"],
    repo: "https://github.com/HajkacemYassine/sav-ia",
    featured: true,
    preview: "sav",
  },
  {
    title: "ExpenseSnap",
    subtitle: "AI receipt scanner automated with n8n",
    year: "2026",
    description:
      "Snap a receipt and a vision AI model reads it: merchant, date, amount and category are extracted, reviewed in the app, then saved to Google Sheets. All the back-end logic runs in n8n workflows, with no custom server.",
    highlights: [
      "Receipt photo → structured JSON via a vision AI model",
      "3 n8n webhooks: analyze, save, monthly history",
      "Review form with validation, low-confidence warning and alerts above 100 TND",
    ],
    tech: ["n8n", "Vision AI", "Google Sheets", "REST API", "Flutter"],
    preview: "expense",
  },
  {
    title: "ERP Stock Module",
    subtitle: "Inventory management for an ERP",
    year: "2026",
    description:
      "Stock entries and exits, restocking alerts and live dashboards, built as one module of a larger ERP.",
    highlights: ["Symfony REST back-end", "Angular dashboards", "Relational SQL schema"],
    tech: ["Symfony", "Angular", "TypeScript", "SQL"],
    repo: "https://github.com/HajkacemYassine/Erp-Project",
    preview: "erp",
  },
  {
    title: "BloodDonation",
    subtitle: "Connecting donors and hospitals",
    year: "2026",
    description:
      "A platform where hospitals post urgent blood requests and matching donors get notified in real time.",
    highlights: ["Django REST API", "Donor profiles & urgent requests", "Real-time notifications"],
    tech: ["Django", "Python", "React"],
    repo: "https://github.com/HajkacemYassine/Projet-Django",
    preview: "blood",
  },
  {
    title: "Construction Risk Prediction",
    subtitle: "Machine Learning hackathon",
    year: "2026",
    description:
      "Predicting risk levels on construction sites from safety data, presented to a panel of experts.",
    highlights: ["Data cleaning & preprocessing", "Random Forest and XGBoost classifiers", "Results visualization"],
    tech: ["Python", "Random Forest", "XGBoost"],
    preview: "risk",
  },
  {
    title: "E-Commerce Store",
    subtitle: "ASP.NET Core MVC",
    year: "2025 – 2026",
    description:
      "An online store with catalog, cart, payments, order management and an admin monitoring dashboard.",
    highlights: ["MVC with Entity Framework", "Secure authentication", "Admin dashboard"],
    tech: ["ASP.NET Core", "Entity Framework", "SQL Server"],
    preview: "shop",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "PHP", "C", "SQL", "HTML/CSS"] },
  { group: "Front-End", items: ["React", "Angular", "HTML5", "CSS3"] },
  { group: "Mobile", items: ["Flutter", "Dart"] },
  { group: "Back-End", items: ["FastAPI", "Django", "Symfony", "ASP.NET Core", "Entity Framework", "REST APIs"] },
  { group: "AI / ML", items: ["LangChain", "RAG", "LLMs (Groq, Llama)", "Embeddings", "Semantic search", "Random Forest", "XGBoost"] },
  { group: "Data", items: ["PostgreSQL", "MySQL", "SQL Server", "Qdrant", "Alembic"] },
  { group: "Tools", items: ["Git", "GitHub", "Docker", "n8n", "Postman"] },
];

export const education = [
  {
    degree: "Bachelor's in Information Technology",
    detail: "Information Systems Development",
    school: "ISET Sfax",
    period: "2024 – 2027",
  },
  {
    degree: "Technical Sciences Baccalaureate",
    detail: "Honors: Good",
    school: "Lycée Hédi Souissi, Nasria",
    period: "2024",
  },
];

export const languages = ["Arabic (native)", "French", "English", "Spanish"];

export const activities = [
  "Active member of IEEE, MTC and First Skills Club",
  "Former AIESEC Thyna member — Outgoing Global Talent, helping students land international internships",
];
