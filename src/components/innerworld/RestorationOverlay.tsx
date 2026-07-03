"use client";

import { useEffect, useState } from "react";
import { useWorldStore } from "@/store/worldStore";
import { useInnerWorldStore } from "./innerWorldStore";
import { RESTORATION_LINES, INNER_WORLD_TEXT } from "@/data/content";
import { INNERWORLD_ENABLED } from "./config";

const START_DELAY_MS = 1500;
const CHAR_DELAY_MS = 28;
const LINE_PAUSE_MS = 160;

export default function RestorationOverlay() {
  const integrity = useWorldStore((s) => s.integrity);
  const setActiveZone = useWorldStore((s) => s.setActiveZone);
  const cinematicShown = useInnerWorldStore((s) => s.cinematicShown);
  const markCinematicShown = useInnerWorldStore((s) => s.markCinematicShown);
  const enterInnerWorld = useInnerWorldStore((s) => s.enter);

  const [armed, setArmed] = useState(false);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  // Arm the overlay ~1.5s after reaching 100% reception (once per session).
  useEffect(() => {
    if (!INNERWORLD_ENABLED || integrity < 100 || cinematicShown || armed) return;
    const t = setTimeout(() => setArmed(true), START_DELAY_MS);
    return () => clearTimeout(t);
  }, [integrity, cinematicShown, armed]);

  // Typewriter through RESTORATION_LINES once armed.
  useEffect(() => {
    if (!armed || typingDone) return;

    if (lineIndex >= RESTORATION_LINES.length) {
      const t = setTimeout(() => setTypingDone(true), 0); // async — avoids sync setState in effect
      return () => clearTimeout(t);
    }

    const line = RESTORATION_LINES[lineIndex];
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
  }, [armed, typingDone, lineIndex, charIndex]);

  if (!INNERWORLD_ENABLED || !armed || cinematicShown) return null;

  const stay = () => markCinematicShown();
  const enter = () => {
    setActiveZone(null);
    markCinematicShown();
    enterInnerWorld();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4 md:p-8">
      <div className="font-mono text-green-400 text-sm md:text-base max-w-xl w-full space-y-6">
        <div>
          {visibleLines.map((line, i) => (
            <div key={i} className="leading-7">
              {line || " "}
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
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={enter}
              className="flex-1 border border-green-600 text-green-400 py-2 text-sm tracking-widest hover:bg-green-900/30 transition-colors"
            >
              {INNER_WORLD_TEXT.restorationOverlay.enterButton}
            </button>
            <button
              onClick={stay}
              className="flex-1 border border-green-900 text-green-700 py-2 text-sm tracking-widest hover:text-green-400 hover:border-green-700 transition-colors"
            >
              {INNER_WORLD_TEXT.restorationOverlay.stayButton}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
