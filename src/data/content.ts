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
  title: "ERROR_404: WORLD NOT FOUND",
  titleShort: "ERR_404",
  titleBanner: "ERROR_404: WORLD NOT FOUND — v0.0.1",

  startScreen: {
    alert: "⚠ SYSTEM FAILURE DETECTED ⚠",
    heading: "ERROR_404",
    subheading: "WORLD NOT FOUND",
    statusLines: [
      { level: "CRITICAL" as const, message: "Reality subsystem offline" },
      { level: "CRITICAL" as const, message: "World integrity at 0%" },
      { level: "PENDING" as const, message: "Awaiting operator authorization" },
    ],
    button: "[ INITIATE REPAIR SEQUENCE ]",
    footer: "v0.0.1 — EMERGENCY REPAIR TERMINAL",
  },

  hints: {
    desktop: "DRAG TO ORBIT · SCROLL TO ZOOM · CLICK OBJECTS TO REPAIR",
    mobile: "DRAG TO ORBIT · PINCH TO ZOOM · TAP TO REPAIR",
  },

  zoneLabels: {
    origin: {
      restored: "[ORIGIN — RESTORED]",
      repairing: "[REPAIRING...]",
      broken: "[ORIGIN — CLICK TO REPAIR]",
    },
    workshop: {
      restored: "[WORKSHOP — RESTORED]",
      repairing: "[REPAIRING...]",
      broken: "[WORKSHOP — CLICK TO REPAIR]",
    },
    grid: {
      restored: "[THE GRID — RESTORED]",
      repairing: "[REPAIRING...]",
      broken: "[THE GRID — CLICK TO REPAIR]",
    },
    signal: {
      restored: "[SIGNAL — RESTORED]",
      repairing: "[REPAIRING...]",
      broken: "[SIGNAL — CLICK TO REPAIR]",
    },
  },

  easterEgg: {
    panelHeader: "SECRET TRANSMISSION INTERCEPTED",
    closeButton: "[CLOSE TRANSMISSION ×]",
  },
};

export const RESTORATION_LINES = [
  "> ALL ZONES REPAIRED",
  "> RECALIBRATING WORLD MATRIX...",
  "> WORLD INTEGRITY: 100%",
  "> REALITY SUBSYSTEM ONLINE",
  "",
  "  The broken world is whole again.",
  "  Four systems. One engineer.",
  "  This is what I build.",
  "",
  "> PORTFOLIO TRANSMISSION COMPLETE",
  "> — E.A.",
];

export const EASTER_EGG_LINES = [
  "> UNKNOWN SIGNAL DETECTED",
  "> TRIANGULATING SOURCE...",
  "> COORDINATES: 0, -4.2, 0",
  "> TRANSMISSION DECRYPTED:",
  "",
  "  You looked beneath the broken world.",
  "  Most people only fix what's visible.",
  "  You dug deeper.",
  "",
  "  That's the kind of engineer I am.",
  "",
  "> — E.A.",
  "> [ARTIFACT COLLECTED]",
];

export const BOOT_LINES = [
  "> INITIALIZING SYSTEM...",
  "> SCANNING ENTITY: ELIE ATTIEH",
  "> ROLE DETECTED: SOFTWARE ENGINEER",
  "> UPTIME: 2.5+ YEARS",
  "> ORIGIN: SYRIA → REMOTE/GLOBAL",
  "> WARNING: WORLD CORRUPTION DETECTED",
  "> INTEGRITY: 0%",
  "> INITIATING REPAIR SEQUENCE...",
  "> AWAITING USER INPUT",
];

export const ZONES = [
  { id: "origin", label: "ORIGIN", description: "About" },
  { id: "workshop", label: "WORKSHOP", description: "Experience" },
  { id: "grid", label: "THE GRID", description: "Skills" },
  { id: "signal", label: "THE SIGNAL", description: "Contact" },
] as const;

export type ZoneId = (typeof ZONES)[number]["id"];
