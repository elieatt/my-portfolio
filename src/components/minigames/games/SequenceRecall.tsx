"use client";

import { useCallback, useEffect, useState } from "react";
import type { MiniGameProps } from "../types";

const ARROWS = ["↑", "↓", "←", "→"] as const;
type Arrow = (typeof ARROWS)[number];

function randomSeq(length: number): Arrow[] {
  return Array.from({ length }, () => ARROWS[Math.floor(Math.random() * ARROWS.length)]);
}

export default function SequenceRecall({ onWin, difficulty }: MiniGameProps) {
  const length = 4 + Math.round(3 * difficulty); // 4 → 7
  const [seq, setSeq] = useState<Arrow[]>(() => randomSeq(length));
  const [phase, setPhase] = useState<"show" | "input">("show");
  const [showIndex, setShowIndex] = useState(0);
  const [input, setInput] = useState<Arrow[]>([]);
  const [wrong, setWrong] = useState(false);

  // Play the sequence back, one step at a time.
  useEffect(() => {
    if (phase !== "show") return;
    setShowIndex(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      if (i > seq.length) {
        clearInterval(id);
        setShowIndex(-1);
        setPhase("input");
      } else {
        setShowIndex(i - 1);
      }
    }, 600);
    return () => clearInterval(id);
  }, [phase, seq]);

  const press = useCallback(
    (a: Arrow) => {
      if (phase !== "input") return;
      if (seq[input.length] !== a) {
        // Wrong — flash and restart with a new sequence.
        setWrong(true);
        setInput([]);
        setTimeout(() => {
          setWrong(false);
          setSeq(randomSeq(length));
          setPhase("show");
        }, 500);
        return;
      }
      const next = [...input, a];
      setInput(next);
      if (next.length === seq.length) onWin();
    },
    [phase, seq, input, onWin, length]
  );

  useEffect(() => {
    const map: Record<string, Arrow> = {
      ArrowUp: "↑",
      ArrowDown: "↓",
      ArrowLeft: "←",
      ArrowRight: "→",
    };
    const onKey = (e: KeyboardEvent) => {
      const a = map[e.key];
      if (a) {
        e.preventDefault();
        press(a);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  return (
    <div className="space-y-4">
      <p className="text-green-600 text-xs tracking-widest">
        {phase === "show" ? "MEMORIZE THE SEQUENCE" : "REPEAT THE SEQUENCE"}
      </p>
      <div className="flex justify-center gap-3 h-10 items-center text-2xl text-green-300 flex-wrap">
        {phase === "show"
          ? seq.map((a, i) => (
              <span key={i} className={i === showIndex ? "opacity-100" : "opacity-20"}>
                {a}
              </span>
            ))
          : seq.map((_, i) => (
              <span key={i} className={i < input.length ? "text-green-300" : "text-green-900"}>
                {i < input.length ? input[i] : "•"}
              </span>
            ))}
      </div>
      <div className={`grid grid-cols-4 gap-2 ${wrong ? "opacity-50" : ""}`}>
        {ARROWS.map((a) => (
          <button
            key={a}
            onClick={() => press(a)}
            disabled={phase !== "input"}
            className="border border-green-700 text-green-400 py-2 text-lg hover:bg-green-900/30 disabled:opacity-30 transition-colors"
          >
            {a}
          </button>
        ))}
      </div>
      {wrong && (
        <p className="text-red-400 text-xs tracking-widest text-center">WRONG // RESTARTING</p>
      )}
    </div>
  );
}
