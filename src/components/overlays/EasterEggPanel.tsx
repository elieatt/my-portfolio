"use client";

import { useState, useEffect } from "react";
import { useWorldStore } from "@/store/worldStore";
import { EASTER_EGG_LINES, UI_TEXT } from "@/data/content";

const LINES = EASTER_EGG_LINES;

export default function EasterEggPanel() {
  const easterEggFound = useWorldStore((s) => s.easterEggFound);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!easterEggFound) return;
    setVisibleLines([]);
    let cancelled = false;
    let t: ReturnType<typeof setTimeout>;
    let i = 0;

    const next = () => {
      if (cancelled || i >= LINES.length) return;
      const line = LINES[i]; // capture before incrementing
      i++;
      setVisibleLines((prev) => [...prev, line]);
      t = setTimeout(next, i <= 4 ? 400 : 120);
    };

    t = setTimeout(next, 200);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [easterEggFound]);

  if (!easterEggFound || dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md border border-purple-700/60 bg-black/95 p-6 font-mono text-sm">
        {/* Corner decorations */}
        <span className="absolute top-0 left-0 text-purple-800 text-xs leading-none">┌</span>
        <span className="absolute top-0 right-0 text-purple-800 text-xs leading-none">┐</span>
        <span className="absolute bottom-0 left-0 text-purple-800 text-xs leading-none">└</span>
        <span className="absolute bottom-0 right-0 text-purple-800 text-xs leading-none">┘</span>

        <div className="text-purple-400 text-xs tracking-widest mb-4 border-b border-purple-900/50 pb-2">
          {UI_TEXT.easterEgg.panelHeader}
        </div>

        <div className="space-y-1 min-h-[16rem]">
          {visibleLines.map((line, i) => (
            <div
              key={i}
              className={
                line.startsWith(">")
                  ? "text-purple-500 text-xs"
                  : line.startsWith("  ")
                  ? "text-green-300 pl-2"
                  : "text-transparent select-none"
              }
            >
              {line || "\u00a0"}
            </div>
          ))}
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="mt-6 text-xs text-purple-800 hover:text-purple-400 tracking-widest transition-colors"
        >
          {UI_TEXT.easterEgg.closeButton}
        </button>
      </div>
    </div>
  );
}
