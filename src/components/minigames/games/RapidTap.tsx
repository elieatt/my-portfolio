"use client";

import { useEffect, useRef, useState } from "react";
import type { MiniGameProps } from "../types";

export default function RapidTap({ onWin, difficulty }: MiniGameProps) {
  const goal = 12 + Math.round(13 * difficulty); // 12 → 25 taps
  const duration = 5 - 1.5 * difficulty; // 5 → 3.5 seconds
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(duration);
  const startRef = useRef(0);
  const countRef = useRef(0);
  const wonRef = useRef(false);

  useEffect(() => {
    startRef.current = performance.now();
    let raf = 0;
    const loop = (t: number) => {
      const remaining = duration - (t - startRef.current) / 1000;
      if (remaining <= 0 && !wonRef.current) {
        // Ran out of time — reset the round.
        startRef.current = t;
        countRef.current = 0;
        setCount(0);
        setTime(duration);
      } else {
        setTime(Math.max(0, remaining));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  const tap = () => {
    if (wonRef.current) return;
    const n = countRef.current + 1;
    countRef.current = n;
    setCount(n);
    if (n >= goal) {
      wonRef.current = true;
      onWin();
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-green-600 text-xs tracking-widest">
        BOOST THE SIGNAL — {goal} TAPS BEFORE TIME RUNS OUT ({count}/{goal})
      </p>
      <div className="h-3 border border-green-800 bg-black">
        <div className="h-full bg-green-500" style={{ width: `${(time / duration) * 100}%` }} />
      </div>
      <button
        onClick={tap}
        className="w-full border border-green-600 text-green-400 py-4 text-sm tracking-widest hover:bg-green-900/30 active:bg-green-900/50 select-none"
      >
        TAP
      </button>
    </div>
  );
}
