import { create } from "zustand";
import { GAME_COUNT } from "./config";

// Isolated store for the experimental mini-game layer. Kept separate from
// worldStore so the feature can be removed without touching core state.
interface MiniGameState {
  active: boolean;
  index: number;
  used: number[];
  boss: boolean;
  difficulty: number;
  onWin: (() => void) | null;
  // level: how many nodes are already tuned (0-3). Drives difficulty, and the
  // final node (level 3) launches the boss gauntlet instead of a random game.
  start: (onWin: () => void, level: number) => void;
  win: () => void;
  cancel: () => void;
}

export const useMiniGameStore = create<MiniGameState>((set, get) => ({
  active: false,
  index: 0,
  used: [],
  boss: false,
  difficulty: 0,
  onWin: null,
  start: (onWin, level) =>
    set((state) => {
      const difficulty = Math.min(1, Math.max(0, level / 3));

      // Final node → boss gauntlet.
      if (level >= 3) {
        return { active: true, boss: true, difficulty, onWin };
      }

      // Otherwise a random game that hasn't been shown yet this cycle.
      const all = Array.from({ length: GAME_COUNT }, (_, i) => i);
      const remaining = all.filter((i) => !state.used.includes(i));
      const pool = remaining.length > 0 ? remaining : all;
      const index = pool[Math.floor(Math.random() * pool.length)];
      const used = remaining.length > 0 ? [...state.used, index] : [index];
      return { active: true, boss: false, difficulty, index, used, onWin };
    }),
  win: () => {
    get().onWin?.();
    set({ active: false, boss: false, onWin: null });
  },
  cancel: () => set({ active: false, boss: false, onWin: null }),
}));
