export const PORTFOLIO_CONTENT = {
  name: "Elie Attieh",
  role: "Software Engineer",
  summary:
    "2.5+ years of professional experience. Passionate about workflow automation and building efficient, maintainable systems.",
  contact: {
    email: "elieatteah00.mme@gmail.com",
    linkedin: "https://www.linkedin.com/in/elie-attieh/",
    phone: "+963 932851806",
  },
  languages: [
    { name: "Arabic", level: "NATIVE" },
    { name: "English", level: "C1/C2" },
    { name: "German", level: "B1" },
  ],
  education: {
    degree: "B.Sc. Software Engineering",
    university: "Al-Baath University",
    location: "Homs, Syria",
    years: "2018 – 2023",
  },
  experience: [
    {
      id: "wasel",
      company: "Wasel",
      title: "Backend Engineer",
      period: "Aug 2025 – Present",
      location: "Remote – Saudi Arabia",
      highlights: [
        "Backend rebuild of a SaaS platform for legal professionals",
        "Workflow-driven services for case lifecycle & financial management",
        "Multi-tenant architecture for complex, sensitive data",
        "Optimized DB queries and service logic for performance",
      ],
    },
    {
      id: "hnndes",
      company: "Hnndes",
      title: "Backend Engineer",
      period: "Nov 2023 – Aug 2025",
      location: "Homs, Syria",
      highlights: [
        "Built a web-forms automation system from the ground up",
        "Core backend services with Node.js for high performance",
        "RESTful APIs documented with OpenAPI/Swagger",
        "Third-party integrations and event-based pipelines",
      ],
    },
  ],
  skills: {
    backend: ["Node.js", "NestJS", "Express", "TypeScript", "JavaScript", "Go"],
    databases: ["PostgreSQL", "MySQL", "MongoDB"],
    devops: ["AWS", "Docker", "Linux", "Git"],
    architecture: ["OOP", "DDD", "SOLID", "Design Patterns", "Agile"],
    integration: ["REST APIs", "Webhooks", "Background Jobs"],
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
      { level: "CRITICAL" as const, message: "Signal fragmented across 4 nodes" },
      { level: "CRITICAL" as const, message: "Reception strength: 0%" },
      { level: "PENDING" as const, message: "Awaiting receiver authorization" },
    ],
    button: "[ RECEIVE TRANSMISSION ]",
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
  },

  easterEgg: {
    panelHeader: "ENCRYPTED CHANNEL INTERCEPTED",
    closeButton: "[CLOSE CHANNEL ×]",
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
  "> UPTIME: 2.5+ YEARS",
  "> ORIGIN: SYRIA → REMOTE/GLOBAL",
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
