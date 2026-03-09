"use client";

import { useWorldStore } from "@/store/worldStore";
import { PORTFOLIO_CONTENT } from "@/data/content";

export default function ZonePanel() {
  const activeZone = useWorldStore((s) => s.activeZone);
  const repairedZones = useWorldStore((s) => s.repairedZones);
  const setActiveZone = useWorldStore((s) => s.setActiveZone);

  if (!activeZone || !repairedZones.has(activeZone)) return null;

  return (
    <div className="
      fixed z-40 font-mono text-green-400 bg-black/90 backdrop-blur-md
      border-green-900/60 overflow-y-auto
      bottom-0 left-0 right-0 max-h-[65vh] border-t
      md:bottom-auto md:top-0 md:left-auto md:right-0 md:w-80 md:max-h-none md:h-full md:border-t-0 md:border-l
    ">
      {/* Drag handle — mobile only */}
      <div className="flex justify-center pt-3 pb-1 md:hidden">
        <div className="w-10 h-1 rounded-full bg-green-900" />
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between px-4 md:px-6 py-2 md:pt-6 border-b border-green-900/40 md:border-none">
        <span className="text-xs text-green-600 tracking-widest uppercase">
          {activeZone}_ZONE
        </span>
        <button
          onClick={() => setActiveZone(null)}
          className="text-green-700 hover:text-green-400 tracking-widest p-2 -mr-2 text-sm"
          aria-label="Close"
        >
          [×]
        </button>
      </div>

      <div className="p-4 md:p-6 md:pt-2">

        {activeZone === "origin" && <OriginContent />}
        {activeZone === "workshop" && <WorkshopContent />}
        {activeZone === "grid" && <GridContent />}
        {activeZone === "signal" && <SignalContent />}
      </div>
    </div>
  );
}

function OriginContent() {
  const { name, role, summary, education, languages } = PORTFOLIO_CONTENT;
  return (
    <div className="space-y-4 text-sm">
      <div className="text-green-300 text-base font-bold tracking-widest">{name}</div>
      <div className="text-yellow-400 tracking-wider">{role}</div>
      <div className="text-green-600 border-t border-green-900 pt-3 leading-relaxed">{summary}</div>
      <div className="border-t border-green-900 pt-3">
        <div className="text-green-600 text-xs mb-2">[EDUCATION]</div>
        <div>{education.degree}</div>
        <div className="text-green-600">{education.university}</div>
        <div className="text-green-700 text-xs">{education.years}</div>
      </div>
      <div className="border-t border-green-900 pt-3">
        <div className="text-green-600 text-xs mb-2">[LANGUAGES]</div>
        {languages.map((l) => (
          <div key={l.name} className="flex justify-between">
            <span>{l.name}</span>
            <span className="text-green-600">{l.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkshopContent() {
  const { experience } = PORTFOLIO_CONTENT;
  return (
    <div className="space-y-6 text-sm">
      <div className="text-green-300 text-xs tracking-widest">[EXPERIENCE LOG]</div>
      {experience.map((job) => (
        <div key={job.id} className="border border-green-900/60 p-3 space-y-2">
          <div className="text-green-300 font-bold">{job.company}</div>
          <div className="text-yellow-400 text-xs">{job.title}</div>
          <div className="text-green-700 text-xs">{job.period} · {job.location}</div>
          <ul className="space-y-1 pt-1">
            {job.highlights.map((h, i) => (
              <li key={i} className="text-green-600 leading-relaxed">
                <span className="text-green-800 mr-1">›</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function GridContent() {
  const { skills } = PORTFOLIO_CONTENT;
  return (
    <div className="space-y-4 text-sm">
      <div className="text-green-300 text-xs tracking-widest">[SKILL MATRIX]</div>
      {Object.entries(skills).map(([cat, list]) => (
        <div key={cat} className="border-t border-green-900 pt-3">
          <div className="text-green-600 text-xs mb-2 uppercase tracking-wider">{cat}</div>
          <div className="flex flex-wrap gap-1.5">
            {list.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 text-xs border border-green-800 text-green-400 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SignalContent() {
  const { contact } = PORTFOLIO_CONTENT;
  return (
    <div className="space-y-4 text-sm">
      <div className="text-green-300 text-xs tracking-widest">[SIGNAL ESTABLISHED]</div>
      <div className="space-y-3 pt-2">
        <div>
          <div className="text-green-700 text-xs">EMAIL</div>
          <a href={`mailto:${contact.email}`} className="text-green-400 hover:text-green-200 underline underline-offset-2">
            {contact.email}
          </a>
        </div>
        <div>
          <div className="text-green-700 text-xs">LINKEDIN</div>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-200 underline underline-offset-2 break-all"
          >
            {contact.linkedin.replace("https://", "")}
          </a>
        </div>
        <div>
          <div className="text-green-700 text-xs">PHONE</div>
          <span>{contact.phone}</span>
        </div>
      </div>
    </div>
  );
}
