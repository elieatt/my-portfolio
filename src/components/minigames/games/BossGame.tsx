"use client";

import { useCallback, useRef, useState } from "react";
import type { MiniGameProps } from "../types";
import SignalLock from "./SignalLock";
import SequenceRecall from "./SequenceRecall";
import RapidTap from "./RapidTap";

const STAGES = 3;

// The final node: a 3-stage gauntlet at max difficulty. Clear all three in a
// row (precision → memory → speed) to lock the last signal.
export default function BossGame({ onWin }: MiniGameProps) {
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);

  const advance = useCallback(() => {
    const next = stageRef.current + 1;
    stageRef.current = next;
    if (next >= STAGES) onWin();
    else setStage(next);
  }, [onWin]);

  return (
    <div className="space-y-4">
      <p className="text-red-500 text-xs tracking-widest font-bold">
        FINAL CALIBRATION // STAGE {Math.min(stage + 1, STAGES)}/{STAGES}
      </p>
      {stage === 0 && <SignalLock onWin={advance} difficulty={1} />}
      {stage === 1 && <SequenceRecall onWin={advance} difficulty={1} />}
      {stage === 2 && <RapidTap onWin={advance} difficulty={1} />}
    </div>
  );
}
