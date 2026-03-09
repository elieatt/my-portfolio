"use client";

import { useEffect, useState } from "react";
import { BOOT_LINES, UI_TEXT } from "@/data/content";
import { useWorldStore } from "@/store/worldStore";

export default function BootSequence() {
  const setBootDone = useWorldStore((s) => s.setBootDone);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setDone(true);
          setBootDone();
        }, 800);
      }, 1000);
      return;
    }

    const line = BOOT_LINES[lineIndex];

    if (charIndex < line.length) {
      const delay = line.startsWith(">") ? 30 : 20;
      const t = setTimeout(() => {
        setCurrentLine((prev) => prev + line[charIndex]);
        setCharIndex((c) => c + 1);
      }, delay);
      return () => clearTimeout(t);
    } else {
      const pause = lineIndex === BOOT_LINES.length - 1 ? 600 : 180;
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setCurrentLine("");
        setCharIndex(0);
        setLineIndex((i) => i + 1);
      }, pause);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex, setBootDone]);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-start justify-start p-4 md:p-8 transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="font-mono text-green-400 text-sm md:text-base max-w-2xl w-full">
        <div className="mb-4 text-green-300 text-xs tracking-widest border-b border-green-900 pb-2">
          {UI_TEXT.titleBanner}
        </div>
        {visibleLines.map((line, i) => (
          <div key={i} className="leading-7">
            <span
              className={
                line.includes("WARNING") || line.includes("CORRUPTION")
                  ? "text-red-400"
                  : line.includes("SUCCESS") || line.includes("READY")
                  ? "text-green-300"
                  : "text-green-400"
              }
            >
              {line}
            </span>
          </div>
        ))}
        {currentLine && (
          <div className="leading-7">
            <span>{currentLine}</span>
            <span className="animate-pulse">█</span>
          </div>
        )}
      </div>
    </div>
  );
}
