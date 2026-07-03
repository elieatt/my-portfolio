"use client";

import { useState } from "react";
import type { MiniGameProps } from "../types";

const SYMBOLS = ["◇", "○", "△", "□", "▽", "◁"];

function makeRound(count: number) {
  const shuffled = [...SYMBOLS].sort(() => Math.random() - 0.5);
  return {
    base: shuffled[0],
    odd: shuffled[1],
    oddIndex: Math.floor(Math.random() * count),
  };
}

export default function OddOneOut({ onWin, difficulty }: MiniGameProps) {
  const count = 12 + Math.round(8 * difficulty); // 12 → 20 cells
  const [round, setRound] = useState(() => makeRound(count));
  const [wrong, setWrong] = useState(false);

  const click = (i: number) => {
    if (i === round.oddIndex) {
      onWin();
    } else {
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
        setRound(makeRound(count));
      }, 400);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-green-600 text-xs tracking-widest">FIND THE CORRUPTED NODE</p>
      <div className={`grid grid-cols-4 gap-2 ${wrong ? "opacity-50" : ""}`}>
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            onClick={() => click(i)}
            className="aspect-square border border-green-800 text-green-400 text-xl hover:bg-green-900/30"
          >
            {i === round.oddIndex ? round.odd : round.base}
          </button>
        ))}
      </div>
      {wrong && (
        <p className="text-red-400 text-xs tracking-widest text-center">CLEAN NODE // KEEP LOOKING</p>
      )}
    </div>
  );
}
