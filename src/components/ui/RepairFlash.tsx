"use client";

import { useEffect, useState } from "react";
import { useWorldStore } from "@/store/worldStore";
import type { ZoneId } from "@/data/content";

// Flash colors are brightened/shifted relative to zone colors for equal perceived luminance
const ZONE_COLORS: Record<ZoneId, string> = {
  origin:   "#00ffcc", // cyan
  workshop: "#ff9933", // orange
  grid:     "#33ddff", // sky-blue  — shifted toward cyan for more luminance
  signal:   "#ff44ff", // magenta   — shifted red+blue for ~3× more luminance than purple
};

const ZONE_OPACITY: Record<ZoneId, number> = {
  origin:   0.50,
  workshop: 0.50,
  grid:     0.60,
  signal:   0.65,
};

export default function RepairFlash() {
  const lastRepaired = useWorldStore((s) => s.lastRepaired);
  const clearLastRepaired = useWorldStore((s) => s.clearLastRepaired);
  const [opacity, setOpacity] = useState(0);

  // Derived — no state needed
  const color   = lastRepaired ? ZONE_COLORS[lastRepaired]   : "#00ff88";
  const peakOp  = lastRepaired ? ZONE_OPACITY[lastRepaired]  : 0.5;

  useEffect(() => {
    if (!lastRepaired) return;
    const t0 = setTimeout(() => setOpacity(peakOp), 0);  // async — avoids synchronous setState in effect
    const t1 = setTimeout(() => setOpacity(0), 80);
    const t2 = setTimeout(clearLastRepaired, 400);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, [lastRepaired, peakOp, clearLastRepaired]);

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{
        background: color,
        opacity,
        transition: opacity === 0 ? "opacity 320ms ease-out" : "opacity 40ms ease-in",
      }}
    />
  );
}
