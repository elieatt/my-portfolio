# ERROR_404: WORLD NOT FOUND

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

An interactive 3D portfolio built as a broken world that needs to be repaired.


## Concept

The world starts corrupted at 0% integrity. Four zones are offline. The visitor must click each zone to repair it, progressively restoring the world and revealing portfolio content — about, experience, skills, and contact.

Fully repairing the world unlocks a hidden easter egg.

## Tech Stack

- **Next.js 16** — App Router, SSR-safe dynamic imports
- **React Three Fiber** — 3D scene rendering
- **Three.js** — Geometry, materials, lighting
- **@react-three/drei** — OrbitControls, Stars, Text, Float, Line
- **@react-three/postprocessing** — Bloom, Glitch, ChromaticAberration, Noise, Vignette
- **Zustand** — Global state (integrity, zones, easter egg)
- **Web Audio API** — Procedural background music with glitch interruptions
- **Tailwind CSS v4** — UI styling

## Features

- Boot sequence terminal on load
- 4 repairable zones in a cross layout (Origin, Workshop, Grid, Signal)
- 3 randomized glitch types: Tear, Split, Static — scale with world corruption
- Background ambient music with glitch-sync audio interruptions
- Repair flash effect (zone-colored screen flash on repair)
- 100% restoration cinematic sequence
- Hidden artifact easter egg (visible only at full integrity)
- Cursor pixel trail
- Fully responsive — mobile camera zoom, touch-friendly UI
- GPU-optimized: DPR cap, no shadows, postprocessing MSAA disabled

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/              # Next.js app router
  components/
    scene/          # R3F 3D world, zones, effects
    ui/             # HUD, BootSequence, StartScreen
    overlays/       # ZonePanel, EasterEggPanel, RestorationCinematic
  data/             # content.ts — all text, portfolio data, UI strings
  store/            # Zustand world state
public/
  audio/            # Background music
```

## Deploy

Optimized for [Vercel](https://vercel.com). Push to GitHub and import the repo.

---

*Built and vibe-coded by Elie Attieh*
