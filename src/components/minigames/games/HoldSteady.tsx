"use client";

import { useEffect, useRef, useState } from "react";
import type { MiniGameProps } from "../types";

export default function HoldSteady({ onWin, difficulty }: MiniGameProps) {
  const fill = 55 - 20 * difficulty; // charge per second
  const drain = 60 + 40 * difficulty; // decay per second when released
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const holdingRef = useRef(false);
  const wonRef = useRef(false);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      let p = progressRef.current + (holdingRef.current ? dt * fill : -dt * drain);
      if (p < 0) p = 0;
      if (p >= 100) {
        p = 100;
        if (!wonRef.current) {
          wonRef.current = true;
          onWin();
        }
      }
      progressRef.current = p;
      setProgress(p);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [onWin, fill, drain]);

  const down = () => {
    holdingRef.current = true;
  };
  const up = () => {
    holdingRef.current = false;
  };

  return (
    <div className="space-y-4">
      <p className="text-green-600 text-xs tracking-widest">HOLD TO CHARGE THE RELAY</p>
      <div className="h-4 border border-green-800 bg-black">
        <div className="h-full bg-green-500" style={{ width: `${progress}%` }} />
      </div>
      <button
        onMouseDown={down}
        onMouseUp={up}
        onMouseLeave={up}
        onTouchStart={down}
        onTouchEnd={up}
        className="w-full border border-green-600 text-green-400 py-3 text-sm tracking-widest hover:bg-green-900/30 select-none"
      >
        HOLD
      </button>
    </div>
  );
}
