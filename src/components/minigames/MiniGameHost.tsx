"use client";

import { useMiniGameStore } from "./miniGameStore";
import { renderGame } from "./registry";
import BossGame from "./games/BossGame";

export default function MiniGameHost() {
  const active = useMiniGameStore((s) => s.active);
  const index = useMiniGameStore((s) => s.index);
  const boss = useMiniGameStore((s) => s.boss);
  const difficulty = useMiniGameStore((s) => s.difficulty);
  const win = useMiniGameStore((s) => s.win);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-sm">
      <div
        className={`font-mono bg-black border w-full max-w-md mx-4 p-5 space-y-4 ${
          boss ? "border-red-700" : "border-green-800"
        }`}
      >
        <div className="flex items-center justify-between border-b border-green-900 pb-2">
          <span
            className={`text-xs tracking-widest ${boss ? "text-red-500 font-bold" : "text-green-600"}`}
          >
            {boss ? "FINAL CALIBRATION" : "SIGNAL CALIBRATION"}
          </span>
          <span className="text-xs text-green-800 tracking-widest">v0.0.1</span>
        </div>
        {boss ? <BossGame onWin={win} difficulty={1} /> : renderGame(index, win, difficulty)}
        <p className="text-green-900 text-[10px] tracking-widest text-center pt-1">
          COMPLETE TO LOCK THE SIGNAL
        </p>
      </div>
    </div>
  );
}
