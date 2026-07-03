import { create } from "zustand";

// Isolated store for the experimental source-trace layer. Kept separate from
// worldStore/innerWorldStore so the feature can be removed without touching
// either.
interface TraceState {
  open: boolean;
  traceDone: boolean;
  openTrace: () => void;
  closeTrace: () => void;
  markTraceDone: () => void;
}

export const useTraceStore = create<TraceState>((set) => ({
  open: false,
  traceDone: false,
  openTrace: () => set({ open: true }),
  closeTrace: () => set({ open: false }),
  markTraceDone: () => set({ traceDone: true }),
}));
