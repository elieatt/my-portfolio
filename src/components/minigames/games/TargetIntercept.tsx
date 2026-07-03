"use client";

import { useState } from "react";
import type { MiniGameProps } from "../types";

function rndPos() {
  return { x: 8 + Math.random() * 84, y: 8 + Math.random() * 84 };
}

export default function TargetIntercept({ onWin, difficulty }: MiniGameProps) {
  const total = 5 + Math.round(4 * difficulty); // 5 → 9
  const size = Math.round(28 - 10 * difficulty); // px: bigger (easy) → smaller (hard)
  const [pos, setPos] = useState(rndPos);
  const [hits, setHits] = useState(0);

  const hit = () => {
    const n = hits + 1;
    setHits(n);
    if (n >= total) {
      onWin();
    } else {
      setPos(rndPos());
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-green-600 text-xs tracking-widest">
        INTERCEPT THE SIGNALS ({hits}/{total})
      </p>
      <div className="relative h-52 border border-green-800 bg-black overflow-hidden">
        <button
          onClick={hit}
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: size, height: size }}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/80 border border-green-300 hover:bg-green-400"
          aria-label="target"
        />
      </div>
    </div>
  );
}
