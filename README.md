# TRANSMISSION FROM: ELIE ATTIEH

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

An interactive 3D portfolio — you're receiving a transmission broadcast across 4 signal nodes.


## Concept

The transmission arrives fragmented at 0% reception. Four signal nodes are offline. The visitor tunes each node via a terminal command, progressively strengthening the signal and unlocking portfolio content — about, experience, skills, and contact.

Full reception unlocks a hidden encrypted channel.

## Tech Stack

- **Next.js 16** — App Router, SSR-safe dynamic imports
- **React Three Fiber** — 3D scene rendering
- **Three.js** — Geometry, materials, lighting
- **@react-three/drei** — OrbitControls, Stars, Text, Float, Line
- **@react-three/postprocessing** — Bloom, Glitch, ChromaticAberration, Noise, Vignette
- **Zustand** — Global state (signal strength, nodes, hidden channel)
- **Web Audio API** — Procedural background music with glitch interruptions
- **Tailwind CSS v4** — UI styling

## Features

- Boot sequence terminal on load
- 4 signal nodes in a cross layout (Origin, Workshop, Grid, Signal)
- Terminal command interaction to tune each node (`tune <node>`)
- 3 randomized glitch types: Tear, Split, Static — scale with signal loss
- Background ambient music with glitch-sync audio interruptions
- Tune flash effect (node-colored screen flash on lock)
- 100% reception cinematic sequence
- Hidden encrypted channel easter egg (visible only at full reception)
- Cursor pixel trail
- Fully responsive — mobile typewriter + tap, desktop typed commands
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
    overlays/       # ZonePanel, EasterEggPanel, RestorationCinematic, RepairTerminal
  data/             # content.ts — all text, portfolio data, UI strings
  store/            # Zustand world state
public/
  audio/            # Background music
```

## Deploy

Optimized for [Vercel](https://vercel.com). Push to GitHub and import the repo.

---

*Built and vibe-coded by Elie Attieh*
