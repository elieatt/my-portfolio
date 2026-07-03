// ─── Experimental feature flag ───────────────────────────────────────────────
// /receiver boots a real emulated x86 machine (v86, WASM) running a small real
// Linux, entirely client-side. This is experimental and heavyweight (~9MB of
// vendored assets in public/emulator/, loaded ONLY on that route). Set to
// `false` to fully disable it: the StartScreen link disappears and /receiver
// shows a themed "channel offline" note without fetching any emulator assets.
//
// To remove entirely: delete this `emulator/` folder, delete
// `src/app/receiver/`, delete `public/emulator/`, revert the marked block in
// components/ui/StartScreen.tsx, and remove the EMULATOR_TEXT export and the
// "/receiver" line in CONSOLE_TEXT.devChannelLines from data/content.ts.
export const EMULATOR_ENABLED = true;
