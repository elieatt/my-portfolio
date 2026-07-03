import { create } from "zustand";
import type { PostMeta } from "@/lib/blog";

// Isolated store for the experimental inner-world layer. Kept separate from
// worldStore so the feature can be removed without touching core state.
export type ActiveArtifact =
  | { kind: "post"; post: PostMeta }
  | { kind: "project"; id: string }
  | { kind: "experience"; id: string }
  | { kind: "contact" }
  | null;

interface InnerWorldState {
  entered: boolean;
  cinematicShown: boolean;
  activeArtifact: ActiveArtifact;
  enter: () => void;
  exit: () => void;
  markCinematicShown: () => void;
  setActiveArtifact: (a: ActiveArtifact) => void;
}

export const useInnerWorldStore = create<InnerWorldState>((set) => ({
  entered: false,
  cinematicShown: false,
  activeArtifact: null,
  enter: () => set({ entered: true }),
  exit: () => set({ entered: false, activeArtifact: null }),
  markCinematicShown: () => set({ cinematicShown: true }),
  setActiveArtifact: (a) => set({ activeArtifact: a }),
}));
