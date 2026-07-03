"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { EMULATOR_TEXT } from "@/data/content";
import { EMULATOR_ENABLED } from "@/components/emulator/config";

// Dynamic import — the v86 emulator must never run on SSR and must never be
// fetched on any other route.
const EmulatorShell = dynamic(() => import("@/components/emulator/EmulatorShell"), {
  ssr: false,
});

function OfflineNote() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 px-6 text-center font-mono">
      <p className="text-red-500 text-xs tracking-widest">{EMULATOR_TEXT.offline.title}</p>
      <p className="text-green-700 text-xs tracking-widest">{EMULATOR_TEXT.offline.body}</p>
      <Link
        href="/"
        className="border border-green-900 text-green-700 px-6 py-2 text-xs tracking-widest hover:border-green-700 hover:text-green-500 transition-colors"
      >
        {EMULATOR_TEXT.backHome}
      </Link>
    </div>
  );
}

export default function ReceiverPage() {
  if (!EMULATOR_ENABLED) return <OfflineNote />;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center px-4 py-8 md:py-12 font-mono">
      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,80,0.015) 2px, rgba(0,255,80,0.015) 4px)",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-6">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-green-400 text-xs sm:text-sm tracking-widest">
            {EMULATOR_TEXT.pageTitle}
          </h1>
          <Link
            href="/"
            className="text-green-800 hover:text-green-500 text-xs tracking-widest transition-colors"
          >
            {EMULATOR_TEXT.powerOff}
          </Link>
        </div>

        <EmulatorShell />
      </div>
    </div>
  );
}
