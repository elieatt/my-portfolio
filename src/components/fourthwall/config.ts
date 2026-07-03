// ─── Experimental feature flag ───────────────────────────────────────────────
// A few fourth-wall touches for visitors who look closer: a styled console
// transmission with a secret `tune("hidden")` command, a tab-title flip when
// the visitor switches away, and a themed 404 page. This is experimental. Set
// to `false` to fully disable it: no console output, no `window.tune`, no
// title flip, and the 404 page falls back to an unthemed page.
//
// To remove entirely: delete this `fourthwall/` folder, delete
// app/not-found.tsx (or replace its themed branch with the plain fallback),
// revert the marked block in app/page.tsx, and remove the CONSOLE_TEXT /
// FOURTHWALL_TEXT / NOT_FOUND_TEXT exports from data/content.ts.
export const FOURTHWALL_ENABLED = true;
