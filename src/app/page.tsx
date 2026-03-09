"use client";

import dynamic from "next/dynamic";
import StartScreen from "@/components/ui/StartScreen";
import BootSequence from "@/components/ui/BootSequence";
import HUD from "@/components/ui/HUD";
import RepairFlash from "@/components/ui/RepairFlash";
import CursorTrail from "@/components/ui/CursorTrail";
import ZonePanel from "@/components/overlays/ZonePanel";
import EasterEggPanel from "@/components/overlays/EasterEggPanel";
import RestorationCinematic from "@/components/overlays/RestorationCinematic";
import { useWorldStore } from "@/store/worldStore";
import { UI_TEXT } from "@/data/content";

// Dynamic import — Three.js must not run on SSR
const World = dynamic(() => import("@/components/scene/World"), { ssr: false });

export default function Home() {
  const bootDone = useWorldStore((s) => s.bootDone);
  const gameStarted = useWorldStore((s) => s.gameStarted);

  return (
    <main className="w-screen h-screen overflow-hidden bg-black relative">
      <CursorTrail />
      <StartScreen />
      {gameStarted && <BootSequence />}
      {bootDone && (
        <>
          <HUD />
          <RepairFlash />
          <RestorationCinematic />
          <ZonePanel />
          <EasterEggPanel />
          <div className="w-full h-full">
            <World />
          </div>
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-green-800 pointer-events-none whitespace-nowrap">
            <span className="hidden md:inline">{UI_TEXT.hints.desktop}</span>
            <span className="md:hidden">{UI_TEXT.hints.mobile}</span>
          </div>
        </>
      )}
    </main>
  );
}
