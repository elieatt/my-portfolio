"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MiniGameProps } from "../types";

export default function ReactionTap({ onWin, difficulty }: MiniGameProps) {
  const need = 1 + Math.round(2 * difficulty); // 1 → 3 successful reactions
  const [state, setState] = useState<"wait" | "ready" | "early">("wait");
  const [hits, setHits] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const schedule = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const delay = 900 + Math.random() * 2200;
    timerRef.current = setTimeout(() => setState("ready"), delay);
  }, []);

  useEffect(() => {
    schedule();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [schedule]);

  const tap = () => {
    if (state === "ready") {
      const n = hits + 1;
      setHits(n);
      if (n >= need) {
        onWin();
      } else {
        setState("wait");
        schedule();
      }
    } else if (state === "wait") {
      setState("early");
      if (timerRef.current) clearTimeout(timerRef.current);
      setTimeout(() => {
        setState("wait");
        schedule();
      }, 700);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-green-600 text-xs tracking-widest">
        WAIT FOR THE SIGNAL, THEN TAP ({hits}/{need})
      </p>
      <button
        onClick={tap}
        className={`w-full h-28 border text-sm tracking-widest transition-colors ${
          state === "ready"
            ? "border-green-400 bg-green-900/40 text-green-200"
            : state === "early"
              ? "border-red-500 text-red-400"
              : "border-green-900 text-green-800"
        }`}
      >
        {state === "ready" ? "TAP NOW" : state === "early" ? "TOO EARLY // WAIT..." : "STAND BY..."}
      </button>
    </div>
  );
}
