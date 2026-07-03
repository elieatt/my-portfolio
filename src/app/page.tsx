"use client";

import dynamic from "next/dynamic";
import StartScreen from "@/components/ui/StartScreen";
import BootSequence from "@/components/ui/BootSequence";
import HUD from "@/components/ui/HUD";
import RepairFlash from "@/components/ui/RepairFlash";
import CursorTrail from "@/components/ui/CursorTrail";
import GlitchText from "@/components/ui/GlitchText";
import ZonePanel from "@/components/overlays/ZonePanel";
import EasterEggPanel from "@/components/overlays/EasterEggPanel";
import RepairTerminal from "@/components/overlays/RepairTerminal";
import MiniGameHost from "@/components/minigames/MiniGameHost";
import RestorationOverlay from "@/components/innerworld/RestorationOverlay";
import { INNERWORLD_ENABLED } from "@/components/innerworld/config";
import { useInnerWorldStore } from "@/components/innerworld/innerWorldStore";
// Experimental — see components/persistence/config.ts
import MemoryLoader from "@/components/persistence/MemoryLoader";
import { PERSISTENCE_ENABLED } from "@/components/persistence/config";
// Experimental — see components/fourthwall/config.ts
import FourthWall from "@/components/fourthwall/FourthWall";
import { FOURTHWALL_ENABLED } from "@/components/fourthwall/config";
import { useWorldStore } from "@/store/worldStore";
import { UI_TEXT } from "@/data/content";

// Dynamic import — Three.js must not run on SSR
const World = dynamic(() => import("@/components/scene/World"), { ssr: false });
// Experimental — see components/innerworld/config.ts
const InnerWorldView = dynamic(() => import("@/components/innerworld/InnerWorldView"), { ssr: false });

export default function Home() {
  const bootDone = useWorldStore((s) => s.bootDone);
  const gameStarted = useWorldStore((s) => s.gameStarted);
  const innerWorldEnteredRaw = useInnerWorldStore((s) => s.entered);
  const innerWorldEntered = INNERWORLD_ENABLED && innerWorldEnteredRaw;

  return (
    <main className="w-screen h-screen overflow-hidden bg-black relative">
      {/* Experimental — see components/persistence/config.ts */}
      {PERSISTENCE_ENABLED && <MemoryLoader />}
      {/* Experimental — see components/fourthwall/config.ts */}
      {FOURTHWALL_ENABLED && <FourthWall />}
      <CursorTrail />
      <StartScreen />
      {gameStarted && <BootSequence />}
      {bootDone && (
        <>
          {innerWorldEntered ? (
            <InnerWorldView />
          ) : (
            <>
              <HUD />
              <RepairFlash />
              <RepairTerminal />
              <MiniGameHost />
              <ZonePanel />
              <EasterEggPanel />
              <div className="w-full h-full">
                <World />
              </div>
              <GlitchText />
              <div className="fixed bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-green-800 pointer-events-none whitespace-nowrap">
                <span className="hidden md:inline">{UI_TEXT.hints.desktop}</span>
                <span className="md:hidden">{UI_TEXT.hints.mobile}</span>
              </div>
            </>
          )}
          {/* Experimental — see components/innerworld/config.ts */}
          {INNERWORLD_ENABLED && <RestorationOverlay />}
        </>
      )}
    </main>
  );
}
