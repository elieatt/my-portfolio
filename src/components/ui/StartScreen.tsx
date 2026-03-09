"use client";

import { useState } from "react";
import { useWorldStore } from "@/store/worldStore";
import { UI_TEXT } from "@/data/content";

export default function StartScreen() {
  const startGame = useWorldStore((s) => s.startGame);
  const gameStarted = useWorldStore((s) => s.gameStarted);
  const [fading, setFading] = useState(false);

  if (gameStarted) return null;

  const handleStart = () => {
    setFading(true);
    setTimeout(() => startGame(), 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-opacity duration-600 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,80,0.015) 2px, rgba(0,255,80,0.015) 4px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-lg">
        {/* Title */}
        <div className="font-mono">
          <div className="text-red-500 text-xs tracking-widest mb-2 animate-pulse">
            {UI_TEXT.startScreen.alert}
          </div>
          <h1 className="text-green-400 text-2xl sm:text-3xl font-bold tracking-widest leading-tight">
            {UI_TEXT.startScreen.heading}
          </h1>
          <h2 className="text-green-600 text-sm sm:text-base tracking-widest mt-1">
            {UI_TEXT.startScreen.subheading}
          </h2>
        </div>

        {/* Status block */}
        <div className="font-mono text-xs text-green-700 border border-green-900 rounded px-4 py-3 w-full text-left space-y-1">
          {UI_TEXT.startScreen.statusLines.map((s, i) => (
            <div key={i}>
              <span className={s.level === "CRITICAL" ? "text-red-500" : "text-yellow-600"}>
                {s.level}
              </span>{" "}
              — {s.message}
            </div>
          ))}
        </div>

        {/* Start button */}
        <button
          onClick={handleStart}
          className="font-mono text-sm sm:text-base border border-green-500 text-green-400 px-8 py-3 rounded tracking-widest hover:bg-green-950 hover:text-green-300 hover:border-green-400 active:scale-95 transition-all duration-150 cursor-pointer"
          style={{
            boxShadow: "0 0 12px rgba(0,255,80,0.15), inset 0 0 12px rgba(0,255,80,0.05)",
          }}
        >
          {UI_TEXT.startScreen.button}
        </button>

        <p className="font-mono text-green-900 text-xs tracking-wider">
          {UI_TEXT.startScreen.footer}
        </p>
      </div>
    </div>
  );
}
