"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MiniGameProps } from "../types";

export default function SignalLock({ onWin, difficulty }: MiniGameProps) {
  const width = 16 - 10 * difficulty; // band %: 16 (easy) → 6 (hard)
  const start = 50 - width / 2;
  const end = 50 + width / 2;
  const speed = 90 + 90 * difficulty; // percent per second

  const [pos, setPos] = useState(0);
  const [status, setStatus] = useState<"playing" | "miss">("playing");
  const posRef = useRef(0);
  const dirRef = useRef(1);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      let p = posRef.current + dirRef.current * speed * dt;
      if (p >= 100) {
        p = 100;
        dirRef.current = -1;
      } else if (p <= 0) {
        p = 0;
        dirRef.current = 1;
      }
      posRef.current = p;
      setPos(p);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  const lock = useCallback(() => {
    const p = posRef.current;
    if (p >= start && p <= end) {
      onWin();
    } else {
      setStatus("miss");
      setTimeout(() => setStatus("playing"), 400);
    }
  }, [onWin, start, end]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        lock();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lock]);

  return (
    <div className="space-y-4">
      <p className="text-green-600 text-xs tracking-widest">
        LOCK THE SIGNAL // STOP THE MARKER IN THE BAND
      </p>
      <div className="relative h-8 border border-green-800 bg-black overflow-hidden">
        <div
          className="absolute top-0 bottom-0 bg-green-900/50 border-x border-green-600"
          style={{ left: `${start}%`, width: `${width}%` }}
        />
        <div className="absolute top-0 bottom-0 w-0.5 bg-green-300" style={{ left: `${pos}%` }} />
      </div>
      <button
        onClick={lock}
        className={`w-full border py-2 text-sm tracking-widest transition-colors ${
          status === "miss"
            ? "border-red-500 text-red-400"
            : "border-green-600 text-green-400 hover:bg-green-900/30"
        }`}
      >
        {status === "miss" ? "> MISS — TRY AGAIN" : "> LOCK SIGNAL"}
      </button>
    </div>
  );
}
