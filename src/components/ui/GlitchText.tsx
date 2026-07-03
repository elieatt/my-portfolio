"use client";

import { useWorldStore } from "@/store/worldStore";

export default function GlitchText() {
  const glitching = useWorldStore((s) => s.glitching);
  const heading = useWorldStore((s) => s.glitchHeading);
  const label = useWorldStore((s) => s.glitchLabel);

  if (!glitching) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
      <div className="glitch-flicker text-center font-mono select-none">
        <p className="text-red-500 text-lg md:text-2xl font-bold tracking-[0.35em]">
          {heading}
        </p>
        <p className="mt-2 text-red-400/80 text-[10px] md:text-xs tracking-widest uppercase">
          {label}
        </p>
      </div>
    </div>
  );
}
