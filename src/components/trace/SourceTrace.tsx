"use client";

import { useEffect, useMemo, useState } from "react";
import { useWorldStore } from "@/store/worldStore";
import { useTraceStore } from "./traceStore";
// Coupled to the persistence module for the "found in a past session" check —
// if persistence/ is removed, drop this import and `bonus` uses only the
// current-session flag below.
import { useMemoryStore } from "@/components/persistence/memoryStore";
import {
  SOURCE_TRACE_LINES,
  SOURCE_TRACE_BONUS_LINE,
  TRACE_TEXT,
  PORTFOLIO_CONTENT,
} from "@/data/content";

const CHAR_DELAY_MS = 30;
const LINE_PAUSE_MS = 200;
const SOURCE_LOCATED_MARKER = "> SOURCE LOCATED.";

export default function SourceTrace() {
  const open = useTraceStore((s) => s.open);
  const closeTrace = useTraceStore((s) => s.closeTrace);
  const markTraceDone = useTraceStore((s) => s.markTraceDone);
  const easterEggFoundNow = useWorldStore((s) => s.easterEggFound);
  const easterEggFoundBefore = useMemoryStore((s) => s.prevEasterEggFound);

  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  const bonus = easterEggFoundNow || easterEggFoundBefore;

  const lines = useMemo(() => {
    if (!bonus) return SOURCE_TRACE_LINES;
    const idx = SOURCE_TRACE_LINES.indexOf(SOURCE_LOCATED_MARKER);
    if (idx === -1) return SOURCE_TRACE_LINES;
    return [
      ...SOURCE_TRACE_LINES.slice(0, idx + 1),
      SOURCE_TRACE_BONUS_LINE,
      ...SOURCE_TRACE_LINES.slice(idx + 1),
    ];
  }, [bonus]);

  // Typewriter through `lines`, only while open.
  useEffect(() => {
    if (!open || typingDone) return;

    if (lineIndex >= lines.length) {
      const t = setTimeout(() => {
        setTypingDone(true);
        markTraceDone();
      }, 0); // async — avoids sync setState in effect
      return () => clearTimeout(t);
    }

    const line = lines[lineIndex];
    if (charIndex < line.length) {
      const t = setTimeout(() => {
        setCurrentLine((prev) => prev + line[charIndex]);
        setCharIndex((c) => c + 1);
      }, CHAR_DELAY_MS);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setVisibleLines((prev) => [...prev, line]);
      setCurrentLine("");
      setCharIndex(0);
      setLineIndex((i) => i + 1);
    }, LINE_PAUSE_MS);
    return () => clearTimeout(t);
  }, [open, typingDone, lineIndex, charIndex, lines, markTraceDone]);

  if (!open) return null;

  const { contact } = PORTFOLIO_CONTENT;
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(TRACE_TEXT.emailSubject)}`;

  const handleClose = () => {
    closeTrace();
    setVisibleLines([]);
    setCurrentLine("");
    setLineIndex(0);
    setCharIndex(0);
    setTypingDone(false);
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black flex items-center justify-center p-4 md:p-8">
      <div className="font-mono text-cyan-300 text-sm md:text-base max-w-xl w-full space-y-6">
        <div>
          {visibleLines.map((line, i) => (
            <div key={i} className="leading-7">
              {line || " "}
            </div>
          ))}
          {!typingDone && (
            <div className="leading-7">
              <span>{currentLine}</span>
              <span className="animate-pulse">█</span>
            </div>
          )}
        </div>
        {typingDone && (
          <div className="space-y-3 pt-2">
            <a
              href={mailto}
              className="block text-center border border-cyan-500 text-cyan-300 py-2 text-sm tracking-widest hover:bg-cyan-900/30 transition-colors"
            >
              {TRACE_TEXT.makeContact}
            </a>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center border border-cyan-900 text-cyan-600 py-2 text-xs tracking-widest hover:text-cyan-300 hover:border-cyan-700 transition-colors"
              >
                {TRACE_TEXT.linkedinLabel}
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center border border-cyan-900 text-cyan-600 py-2 text-xs tracking-widest hover:text-cyan-300 hover:border-cyan-700 transition-colors"
              >
                {TRACE_TEXT.githubLabel}
              </a>
            </div>
            <button
              onClick={handleClose}
              className="w-full text-center text-cyan-800 hover:text-cyan-400 py-2 text-xs tracking-widest transition-colors"
            >
              {TRACE_TEXT.closeChannel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
