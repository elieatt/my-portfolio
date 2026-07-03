import { create } from "zustand";
import type { ZoneId } from "@/data/content";

interface WorldState {
  gameStarted: boolean;
  bootDone: boolean;
  repairedZones: Set<ZoneId>;
  activeZone: ZoneId | null;
  integrity: number; // 0-100
  glitching: boolean;
  glitchHeading: string;
  glitchLabel: string;
  easterEggFound: boolean;
  lastRepaired: ZoneId | null;
  pendingRepair: ZoneId | null;

  startGame: () => void;
  setBootDone: () => void;
  resetGame: () => void;
  repairZone: (id: ZoneId) => void;
  clearLastRepaired: () => void;
  setActiveZone: (id: ZoneId | null) => void;
  findEasterEgg: () => void;
  setGlitch: (active: boolean, heading?: string, label?: string) => void;
  openRepairTerminal: (id: ZoneId) => void;
  closeRepairTerminal: () => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  gameStarted: false,
  bootDone: false,
  repairedZones: new Set(),
  activeZone: null,
  integrity: 0,
  glitching: false,
  glitchHeading: "",
  glitchLabel: "",
  easterEggFound: false,
  lastRepaired: null,
  pendingRepair: null,

  startGame: () => set({ gameStarted: true }),
  setBootDone: () => set({ bootDone: true }),
  resetGame: () =>
    set({
      gameStarted: false,
      bootDone: false,
      repairedZones: new Set(),
      activeZone: null,
      integrity: 0,
      glitching: false,
      glitchHeading: "",
      glitchLabel: "",
      easterEggFound: false,
      lastRepaired: null,
      pendingRepair: null,
    }),

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
  setGlitch: (active, heading = "", label = "") =>
    set({ glitching: active, glitchHeading: heading, glitchLabel: label }),
  openRepairTerminal: (id) => set({ pendingRepair: id }),
  closeRepairTerminal: () => set({ pendingRepair: null }),
}));
