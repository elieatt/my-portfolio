"use client";

import { useEffect, useState } from "react";
import { useWorldStore } from "@/store/worldStore";
import type { ZoneId } from "@/data/content";

const ZONE_COLORS: Record<ZoneId, string> = {
  origin:   "#00ffcc",
  workshop: "#ff8800",
  grid:     "#00ccff",
  signal:   "#cc00ff",
};

export default function RepairFlash() {
  const lastRepaired = useWorldStore((s) => s.lastRepaired);
  const clearLastRepaired = useWorldStore((s) => s.clearLastRepaired);
  const [opacity, setOpacity] = useState(0);
  const [color, setColor] = useState("#00ff88");

  useEffect(() => {
    if (!lastRepaired) return;
    setColor(ZONE_COLORS[lastRepaired]);
    // Flash in then fade out
    setOpacity(0.5);
    const t1 = setTimeout(() => setOpacity(0), 80);
    const t2 = setTimeout(clearLastRepaired, 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [lastRepaired, clearLastRepaired]);

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
