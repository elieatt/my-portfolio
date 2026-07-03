"use client";

import { useState } from "react";
import type { MiniGameProps } from "../types";

export default function FrequencyTune({ onWin, difficulty }: MiniGameProps) {
  const tol = Math.round(5 - 3 * difficulty); // ±5 → ±2
  const [target] = useState(() => 10 + Math.floor(Math.random() * 80));
  const [value, setValue] = useState(50);
  const [error, setError] = useState(false);

  const diff = Math.abs(value - target);
  const strength = Math.max(0, 100 - diff * 3);

  const lock = () => {
    if (diff <= tol) {
      onWin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 400);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-green-600 text-xs tracking-widest">TUNE TO THE CARRIER FREQUENCY</p>
      <div className="h-3 border border-green-800 bg-black">
        <div
          className="h-full bg-green-500 transition-[width] duration-75"
          style={{ width: `${strength}%` }}
        />
      </div>
      <p className="text-center text-green-400 text-sm tracking-widest">SIGNAL {Math.round(strength)}%</p>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-green-500"
      />
      <button
        onClick={lock}
        className={`w-full border py-2 text-sm tracking-widest transition-colors ${
          error ? "border-red-500 text-red-400" : "border-green-600 text-green-400 hover:bg-green-900/30"
        }`}
      >
        {error ? "> WEAK SIGNAL — ADJUST" : "> LOCK FREQUENCY"}
      </button>
    </div>
  );
}
