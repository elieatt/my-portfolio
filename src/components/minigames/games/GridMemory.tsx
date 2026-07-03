"use client";

import { useEffect, useState } from "react";
import type { MiniGameProps } from "../types";

const SIZE = 9;
function makePattern(lit: number): number[] {
  const s = new Set<number>();
  while (s.size < lit) s.add(Math.floor(Math.random() * SIZE));
  return [...s];
}

export default function GridMemory({ onWin, difficulty }: MiniGameProps) {
  const lit = 3 + Math.round(2 * difficulty); // 3 → 5 cells
  const showMs = 1300 - 500 * difficulty; // shown for 1300 → 800 ms
  const [pattern, setPattern] = useState<number[]>(() => makePattern(lit));
  const [phase, setPhase] = useState<"show" | "input">("show");
  const [selected, setSelected] = useState<number[]>([]);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    if (phase !== "show") return;
    const id = setTimeout(() => setPhase("input"), showMs);
    return () => clearTimeout(id);
  }, [phase, pattern, showMs]);

  const click = (i: number) => {
    if (phase !== "input" || selected.includes(i)) return;
    if (!pattern.includes(i)) {
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
        setSelected([]);
        setPattern(makePattern(lit));
        setPhase("show");
      }, 500);
      return;
    }
    const next = [...selected, i];
    setSelected(next);
    if (next.length === pattern.length) onWin();
  };

  return (
    <div className="space-y-4">
      <p className="text-green-600 text-xs tracking-widest">
        {phase === "show" ? "MEMORIZE THE NODES" : "REACTIVATE THE NODES"}
      </p>
      <div className={`grid grid-cols-3 gap-2 ${wrong ? "opacity-50" : ""}`}>
        {Array.from({ length: SIZE }, (_, i) => {
          const on = phase === "show" ? pattern.includes(i) : selected.includes(i);
          return (
            <button
              key={i}
              onClick={() => click(i)}
              disabled={phase !== "input"}
              className={`aspect-square border transition-colors ${
                on ? "bg-green-500/70 border-green-300" : "border-green-800 hover:bg-green-900/30"
              }`}
            />
          );
        })}
      </div>
      {wrong && <p className="text-red-400 text-xs tracking-widest text-center">WRONG NODE // RESET</p>}
    </div>
  );
}
