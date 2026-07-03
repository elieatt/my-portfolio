import { create } from "zustand";

// Meta store for the experimental persistence layer. Everything components
// need to READ at render time, precomputed once by MemoryLoader on mount.
interface MemoryState {
  restored: boolean;
  visitCount: number;
  daysAgo: number;
  prevEasterEggFound: boolean;
  savedIntegrity: number;
  setLoaded: (data: {
    visitCount: number;
    daysAgo: number;
    prevEasterEggFound: boolean;
    savedIntegrity: number;
  }) => void;
  reset: () => void;
}

export const useMemoryStore = create<MemoryState>((set) => ({
  restored: false,
  visitCount: 0,
  daysAgo: 0,
  prevEasterEggFound: false,
  savedIntegrity: 0,
  setLoaded: (data) => set({ restored: true, ...data }),
  reset: () =>
    set({ restored: false, visitCount: 0, daysAgo: 0, prevEasterEggFound: false, savedIntegrity: 0 }),
}));
