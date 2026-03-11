"use client";

import { useWorldStore } from "@/store/worldStore";
import { ZONES, UI_TEXT } from "@/data/content";

export default function HUD() {
  const integrity = useWorldStore((s) => s.integrity);
  const repairedZones = useWorldStore((s) => s.repairedZones);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 md:px-6 py-3 bg-black/60 backdrop-blur-sm border-b border-green-900/50 font-mono text-xs text-green-400">
        <span className="tracking-widest hidden sm:inline">{UI_TEXT.title}</span>
        <span className="tracking-widest sm:hidden">{UI_TEXT.titleShort}</span>
        <div className="flex items-center gap-2 md:gap-4">
          <span>
            {UI_TEXT.hud.signal}{" "}
            <span
              className={
                integrity === 100
                  ? "text-green-300"
                  : integrity > 50
                  ? "text-yellow-400"
                  : "text-red-400"
              }
            >
              {integrity}%
            </span>
          </span>
          <div className="w-16 md:w-24 h-1.5 bg-green-900/60 rounded overflow-hidden">
            <div
              className="h-full bg-green-400 transition-all duration-700"
              style={{ width: `${integrity}%` }}
            />
          </div>
        </div>
      </div>

      {/* Zone status pills */}
      <div className="flex flex-wrap gap-1.5 px-3 md:px-6 pt-2">
        {ZONES.map((zone) => {
          const repaired = repairedZones.has(zone.id);
          return (
            <div
              key={zone.id}
              className={`text-[10px] font-mono px-2 py-0.5 rounded border tracking-wider transition-all duration-500 ${
                repaired
                  ? "border-green-400 text-green-300 bg-green-900/30"
                  : "border-red-900 text-red-600 bg-black/40"
              }`}
            >
              <span className="hidden sm:inline">{zone.label} </span>
              {repaired ? UI_TEXT.hud.ok : UI_TEXT.hud.err}
            </div>
          );
        })}
      </div>
    </div>
  );
}
