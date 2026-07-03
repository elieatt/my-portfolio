// ─── Experimental feature flag ───────────────────────────────────────────────
// Mini-games play after the correct `tune <node>` command, before the zone is
// repaired. This is experimental. Set to `false` to fully disable it: repairs
// then happen instantly again with no gameplay change.
//
// To remove entirely: delete this `minigames/` folder, revert the guarded block
// in RepairTerminal.tsx (execute()), and remove the <MiniGameHost /> mount in
// app/page.tsx.
export const MINIGAMES_ENABLED = true;

// Number of registered mini-games (see registry.tsx). Used to pick one at random.
export const GAME_COUNT = 10;
