// ─── Experimental feature flag ───────────────────────────────────────────────
// Inside the inner world, the central core can be clicked to trace the signal
// to its source — Elie's story, ending in a way to make contact. This is
// experimental. Set to `false` to fully disable it: the core has no label or
// click handler, and the app behaves exactly as before this feature existed.
//
// To remove entirely: delete this `trace/` folder, revert the marked blocks in
// components/innerworld/InnerWorld.tsx and InnerWorldView.tsx, and remove the
// TRACE_TEXT / SOURCE_TRACE_LINES / SOURCE_TRACE_BONUS_LINE exports from
// data/content.ts.
export const TRACE_ENABLED = true;
