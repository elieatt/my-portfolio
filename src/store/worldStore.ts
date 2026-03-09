import { create } from "zustand";
import type { ZoneId } from "@/data/content";

interface WorldState {
  gameStarted: boolean;
  bootDone: boolean;
  repairedZones: Set<ZoneId>;
  activeZone: ZoneId | null;
  integrity: number; // 0-100
  easterEggFound: boolean;
  lastRepaired: ZoneId | null;

  startGame: () => void;
  setBootDone: () => void;
  repairZone: (id: ZoneId) => void;
  clearLastRepaired: () => void;
  setActiveZone: (id: ZoneId | null) => void;
  findEasterEgg: () => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  gameStarted: false,
  bootDone: false,
  repairedZones: new Set(),
  activeZone: null,
  integrity: 0,
  easterEggFound: false,
  lastRepaired: null,

  startGame: () => set({ gameStarted: true }),
  setBootDone: () => set({ bootDone: true }),

  repairZone: (id) =>
    set((state) => {
      const next = new Set(state.repairedZones);
      next.add(id);
      return {
        repairedZones: next,
        integrity: Math.round((next.size / 4) * 100),
        lastRepaired: id,
      };
    }),

  clearLastRepaired: () => set({ lastRepaired: null }),
  setActiveZone: (id) => set({ activeZone: id }),
  findEasterEgg: () => set({ easterEggFound: true }),
}));
