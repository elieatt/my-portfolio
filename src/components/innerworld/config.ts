// ─── Experimental feature flag ───────────────────────────────────────────────
// At 100% reception, the visitor can enter a second "inside the signal" 3D
// scene where portfolio content floats as artifacts. This is experimental.
// Set to `false` to fully disable it: the restoration overlay and the HUD's
// enter button never appear, and the app behaves exactly as before this
// feature existed.
//
// To remove entirely: delete this `innerworld/` folder, revert the marked
// blocks in app/page.tsx and components/ui/HUD.tsx, and remove the
// INNER_WORLD_TEXT export from data/content.ts.
export const INNERWORLD_ENABLED = true;
