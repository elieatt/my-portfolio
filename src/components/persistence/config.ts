// ─── Experimental feature flag ───────────────────────────────────────────────
// The transmission remembers returning visitors: repaired zones and progress
// flags are saved to localStorage, and the boot sequence greets a returning
// receiver differently. This is experimental. Set to `false` to fully disable
// it: nothing is read from or written to localStorage, and the app behaves
// exactly as before this feature existed.
//
// To remove entirely: delete this `persistence/` folder, revert the marked
// blocks in app/page.tsx, components/ui/BootSequence.tsx, and
// components/ui/HUD.tsx, remove the `easterEggFoundBefore` line from
// components/trace/SourceTrace.tsx (Feature A), and remove the
// RETURN_BOOT_LINES export from data/content.ts.
export const PERSISTENCE_ENABLED = true;
