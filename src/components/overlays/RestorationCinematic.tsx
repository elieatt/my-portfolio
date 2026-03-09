"use client";

import { useEffect, useState } from "react";
import { useWorldStore } from "@/store/worldStore";
import { RESTORATION_LINES } from "@/data/content";

export default function RestorationCinematic() {
  const integrity = useWorldStore((s) => s.integrity);
  const [triggered, setTriggered] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showClose, setShowClose] = useState(false);

  useEffect(() => {
    if (integrity < 100 || triggered) return;
    setTriggered(true);

    let i = 0;
    let cancelled = false;
    let t: ReturnType<typeof setTimeout>;

    const next = () => {
      if (cancelled || i >= RESTORATION_LINES.length) {
        if (!cancelled) t = setTimeout(() => setShowClose(true), 600);
        return;
      }
      const line = RESTORATION_LINES[i++];
      setVisibleLines((prev) => [...prev, line]);
      t = setTimeout(next, i <= 4 ? 480 : 160);
    };

    t = setTimeout(next, 400);
    return () => { cancelled = true; clearTimeout(t); };
  }, [integrity, triggered]);

  if (!triggered || dismissed) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm cursor-pointer"
      onClick={() => setDismissed(true)}
    >
      {/* Stop click-through on inner content area */}
      <div
        className="font-mono max-w-lg w-full px-6 md:px-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-green-300 text-xs tracking-widest mb-6 border-b border-green-800 pb-2 flex items-center justify-between">
          <span>SYSTEM RESTORATION COMPLETE</span>
          <button
            onClick={() => setDismissed(true)}
            className="text-green-800 hover:text-green-400 tracking-widest transition-colors duration-150 cursor-pointer ml-4"
          >
            [×]
          </button>
        </div>

        {/* Typewriter lines */}
        <div className="space-y-1.5">
          {visibleLines.map((line, i) => (
            <div
              key={i}
              className={
                line.startsWith(">")
                  ? "text-green-500 text-sm"
                  : line === ""
                  ? "h-3"
                  : "text-green-300 text-sm pl-2"
              }
            >
              {line || "\u00a0"}
            </div>
          ))}
        </div>

        {/* Continue button — appears after last line */}
        {showClose && (
          <button
            onClick={() => setDismissed(true)}
            className="mt-8 text-xs text-green-800 hover:text-green-400 tracking-widest transition-colors duration-200 cursor-pointer"
          >
            [ CONTINUE → ]
          </button>
        )}
      </div>
    </div>
  );
}
