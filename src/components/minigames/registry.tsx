import type { ReactNode } from "react";
import SignalLock from "./games/SignalLock";
import SequenceRecall from "./games/SequenceRecall";
import CodeEntry from "./games/CodeEntry";
import ReactionTap from "./games/ReactionTap";
import FrequencyTune from "./games/FrequencyTune";
import HoldSteady from "./games/HoldSteady";
import TargetIntercept from "./games/TargetIntercept";
import GridMemory from "./games/GridMemory";
import RapidTap from "./games/RapidTap";
import OddOneOut from "./games/OddOneOut";

// Register a new mini-game by adding a case below and bumping GAME_COUNT in config.ts.
export function renderGame(index: number, onWin: () => void, difficulty: number): ReactNode {
  const p = { onWin, difficulty };
  switch (index) {
    case 1:
      return <SequenceRecall {...p} />;
    case 2:
      return <CodeEntry {...p} />;
    case 3:
      return <ReactionTap {...p} />;
    case 4:
      return <FrequencyTune {...p} />;
    case 5:
      return <HoldSteady {...p} />;
    case 6:
      return <TargetIntercept {...p} />;
    case 7:
      return <GridMemory {...p} />;
    case 8:
      return <RapidTap {...p} />;
    case 9:
      return <OddOneOut {...p} />;
    case 0:
    default:
      return <SignalLock {...p} />;
  }
}
