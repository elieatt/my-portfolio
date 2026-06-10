export const PORTFOLIO_CONTENT = {
  name: "Elie Attieh",
  role: "Software Engineer",
  summary:
    "3+ years of experience building productive backend systems. Self-directed execution of complete development cycles across different stacks and domains — high willingness to learn new technologies quickly.",
  contact: {
    email: "elieatteah00.mme@gmail.com",
    linkedin: "https://www.linkedin.com/in/elie-attieh/",
    phone: "+49 176 11524309",
    github: "https://github.com/elieatt/",
  },
  languages: [
    { name: "Arabic", level: "NATIVE" },
    { name: "English", level: "C1" },
    { name: "German", level: "B1 — actively improving" },
  ],
  education: {
    degree: "B.Sc. Software Engineering",
    years: "2018 – 2023",
  },
  experience: [
    {
      id: "wasel",
      company: "Wasel",
      title: "Backend Engineer",
      period: "Aug 2025 – Apr 2026",
      location: "Remote",
      highlights: [
        "Backend re-development of a comprehensive Legal SaaS platform (case management, finances, calendar, team collaboration)",
        "Self-directed implementation of core modules: financial features, authentication, scheduling, file management, and reporting",
        "Designed financial data models through reverse engineering and direct collaboration with the Product Owner",
      ],
      stack: ["Node.js", "NestJS", "PostgreSQL", "Prisma", "Docker", "Redis"],
    },
    {
      id: "hnndes",
      company: "Hnndes",
      title: "Backend Engineer",
      period: "Nov 2023 – Aug 2025",
      location: "Remote",
      highlights: [
        "Built a SaaS form automation platform from scratch: architecture, API development, and testing",
        "Developed an integration engine routing incoming submissions to external platforms (Slack, Discord, Telegram, Google Sheets) based on custom rules",
        "Integrated LLM-based spam detection into the submission pipeline",
      ],
      stack: ["Node.js", "NestJS", "PostgreSQL", "AWS", "Docker", "Redis"],
    },
  ],
  projects: [
    {
      id: "magic-transporters",
      name: "Magic Transporters API",
      url: "https://github.com/elieatt/magic-transporters",
      highlights: [
        "TypeScript REST API with SOLID architecture, Dependency Injection (Tsyringe), and full Swagger documentation",
        "Dockerized with Docker Compose; DTOs with class-validator for clean input handling",
      ],
      stack: ["TypeScript", "Express", "MongoDB", "Docker", "Swagger", "Tsyringe"],
    },
    {
      id: "library-management",
      name: "Library Management System",
      url: "https://github.com/elieatt/library-management-system",
      highlights: [
        "Spring Boot REST API (Java) — deliberately built outside the primary stack to demonstrate adaptability",
        "AOP logging, response caching, unit tests for all controllers and services, full Docker Compose setup",
      ],
      stack: ["Java", "Spring Boot", "Docker", "H2", "Gradle"],
    },
  ],
  skills: {
    languages: ["TypeScript", "JavaScript", "Java", "Python", "Go"],
    frameworks: ["NestJS", "Express", "Spring Boot", "Next.js"],
    databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
    infrastructure: ["Docker", "AWS", "Linux", "Git"],
    tools: ["BullMQ", "Jest", "Swagger/OpenAPI", "GitHub CI/CD", "Postman"],
  },
};

export const UI_TEXT = {
  title: "TRANSMISSION FROM: ELIE ATTIEH",
  titleShort: "TX:EA",
  titleBanner: "TRANSMISSION FROM: ELIE ATTIEH — v0.0.1",

  startScreen: {
    alert: "⚠ INCOMING TRANSMISSION DETECTED ⚠",
    heading: "TRANSMISSION",
    subheading: "FROM: ELIE ATTIEH",
    statusLines: [
      {
        level: "CRITICAL" as const,
        message: "Signal fragmented across 4 nodes",
      },
      { level: "CRITICAL" as const, message: "Reception strength: 0%" },
      { level: "PENDING" as const, message: "Awaiting receiver authorization" },
    ],
    button: "[ RECEIVE TRANSMISSION ]",
    plainView: "[ PLAIN VIEW ]",
    blog: "[ BLOG ]",
    footer: "v0.0.1 — SIGNAL RECEIVER TERMINAL",
  },

  hints: {
    desktop: "DRAG TO ORBIT · SCROLL TO ZOOM · CLICK NODES TO TUNE",
    mobile: "DRAG TO ORBIT · PINCH TO ZOOM · TAP NODES TO TUNE",
  },

  zoneLabels: {
    origin: {
      restored: "[ORIGIN — SIGNAL LOCKED]",
      broken: "[ORIGIN — CLICK TO TUNE]",
    },
    workshop: {
      restored: "[WORKSHOP — SIGNAL LOCKED]",
      broken: "[WORKSHOP — CLICK TO TUNE]",
    },
    grid: {
      restored: "[THE GRID — SIGNAL LOCKED]",
      broken: "[THE GRID — CLICK TO TUNE]",
    },
    signal: {
      restored: "[SIGNAL — LOCKED]",
      broken: "[SIGNAL — CLICK TO TUNE]",
    },
  },

  repairTerminal: {
    header: "TUNING TERMINAL",
    cancel: "[×]",
    executeBtn: "[ LOCK SIGNAL ]",
    executing: "> LOCKING SIGNAL...",
    initiated: "> CHANNEL ESTABLISHED...",
    errorMsg: (zone: string) => `> ERROR: unknown command. Try: tune ${zone}`,
  },

  hud: {
    signal: "SIG:",
    ok: "[RX]",
    err: "[--]",
    exit: "[ EXIT ]",
  },

  easterEgg: {
    panelHeader: "ENCRYPTED CHANNEL INTERCEPTED",
    closeButton: "[CLOSE CHANNEL ×]",
  },

  nav: {
    backToTransmission: "← BACK TO TRANSMISSION",
    backToLog: "← BACK TO LOG",
    backToTransmissionShort: "← TRANSMISSION",
    blogLink: "BLOG →",
  },
};

export const RESTORATION_LINES = [
  "> ALL NODES TUNED",
  "> RECONSTRUCTING FULL SIGNAL...",
  "> RECEPTION STRENGTH: 100%",
  "> TRANSMISSION CHANNEL STABLE",
  "",
  "  You received the full transmission.",
  "  Four nodes. One engineer.",
  "  This is what I build.",
  "",
  "> TRANSMISSION COMPLETE",
  "> — E.A.",
];

export const EASTER_EGG_LINES = [
  "> ENCRYPTED CHANNEL DETECTED",
  "> TRIANGULATING FREQUENCY...",
  "> COORDINATES: 0, -4.2, 0",
  "> DECRYPTING...",
  "",
  "  You listened past the noise.",
  "  Most people tune into what's obvious.",
  "  You found the hidden frequency.",
  "",
  "  That's the kind of engineer I am.",
  "",
  "> — E.A.",
  "> [FREQUENCY LOGGED]",
];

export const BOOT_LINES = [
  "> SIGNAL RECEIVER ONLINE...",
  "> SCANNING FREQUENCY BANDS...",
  "> SOURCE IDENTIFIED: ELIE ATTIEH",
  "> ROLE: SOFTWARE ENGINEER",
  "> UPTIME: 3+ YEARS",
  "> ORIGIN: SYRIA → GERMANY",
  "> WARNING: SIGNAL FRAGMENTED ACROSS 4 NODES",
  "> RECEPTION STRENGTH: 0%",
  "> AWAITING TUNING SEQUENCE...",
];

export const ZONES = [
  { id: "origin", label: "ORIGIN", description: "About" },
  { id: "workshop", label: "WORKSHOP", description: "Experience" },
  { id: "grid", label: "THE GRID", description: "Skills" },
  { id: "signal", label: "THE SIGNAL", description: "Contact" },
] as const;

export type ZoneId = (typeof ZONES)[number]["id"];

export const BLOG_TEXT = {
  layout: {
    title: "Writing — Elie Attieh",
    description:
      "Posts and notes from Elie Attieh — backend engineering, architecture, and more.",
  },
  listing: {
    heading: "WRITING",
    postCount: (n: number) => `${n} POST${n !== 1 ? "S" : ""}`,
    empty: "> NO POSTS YET.",
    footer: "////",
  },
  post: {
    datePrefix: "//",
    titleTemplate: (title: string) => `${title} — Elie Attieh`,
  },
  card: {
    readLink: "[ READ → ]",
  },
};
