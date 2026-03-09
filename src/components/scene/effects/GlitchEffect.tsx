"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  EffectComposer,
  Glitch,
  Bloom,
  Noise,
  Vignette,
  ChromaticAberration,
  BrightnessContrast,
} from "@react-three/postprocessing";
import { GlitchMode, BlendFunction } from "postprocessing";
import { Vector2 } from "three";

type GlitchType = "tear" | "split" | "static";
const GLITCH_TYPES: GlitchType[] = ["tear", "split", "static"];
import { useWorldStore } from "@/store/worldStore";

// ─── Audio setup ────────────────────────────────────────────────────────────

function createAudioGraph() {
  const ctx = new AudioContext();

  // Master gain
  const master = ctx.createGain();
  master.gain.value = 0.7;
  master.connect(ctx.destination);

  // Music filter (for interruptions)
  const musicFilter = ctx.createBiquadFilter();
  musicFilter.type = "lowpass";
  musicFilter.frequency.value = 20000;
  musicFilter.connect(master);

  // Music gain (for stutters)
  const musicGain = ctx.createGain();
  musicGain.gain.value = 1;
  musicGain.connect(musicFilter);

  return { ctx, master, musicFilter, musicGain };
}

// ─── Hook ───────────────────────────────────────────────────────────────────

function useGlitchAudio(
  integrity: number,
  onGlitch: (durationSec: number) => void,
) {
  const graphRef = useRef<ReturnType<typeof createAudioGraph> | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  // Init audio graph + HTML audio element (streams — no waiting for full download)
  const ensureReady = useCallback(() => {
    if (graphRef.current) return graphRef.current;
    const graph = createAudioGraph();
    graphRef.current = graph;

    const el = new Audio("/audio/deep-space.mp3");
    el.loop = true;
    el.preload = "none"; // don't preload — stream on play
    audioElRef.current = el;

    const src = graph.ctx.createMediaElementSource(el);
    src.connect(graph.musicGain);

    return graph;
  }, []);

  // Start music on mount — the start screen button already gave us a user gesture,
  // so the page has sticky activation and AudioContext can be created freely.
  useEffect(() => {
    if (startedRef.current) return;
    const graph = ensureReady();
    if (graph.ctx.state === "suspended") graph.ctx.resume();
    if (audioElRef.current && !startedRef.current) {
      audioElRef.current.play().catch(() => {});
      startedRef.current = true;
    }
  }, [ensureReady]);

  // Fade music volume with integrity
  useEffect(() => {
    const g = graphRef.current;
    if (!g) return;
    const target = 0.5 + (integrity / 100) * 0.3;
    g.master.gain.linearRampToValueAtTime(target, g.ctx.currentTime + 1.5);
  }, [integrity]);

  // Music interruption in sync with visual glitch
  const interrupt = useCallback(
    (durationSec: number) => {
      const g = graphRef.current;
      if (!g || integrity >= 100) return;
      const { ctx, musicGain, musicFilter } = g;
      const now = ctx.currentTime;

      // Stutter the music gain
      musicGain.gain.cancelScheduledValues(now);
      musicGain.gain.setValueAtTime(0, now);
      musicGain.gain.setValueAtTime(1, now + 0.04);
      musicGain.gain.setValueAtTime(0, now + 0.07);
      musicGain.gain.setValueAtTime(1, now + durationSec);

      // Slam the filter down then recover
      musicFilter.frequency.cancelScheduledValues(now);
      musicFilter.frequency.setValueAtTime(300 + Math.random() * 400, now);
      musicFilter.frequency.linearRampToValueAtTime(20000, now + durationSec);

      onGlitch(durationSec);
    },
    [integrity, onGlitch],
  );

  return { interrupt };
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function GlitchEffect() {
  const integrity = useWorldStore((s) => s.integrity);
  const [glitchActive, setGlitchActive] = useState(false);
  const [glitchType, setGlitchType] = useState<GlitchType>("tear");
  const glitchActiveRef = useRef(false);

  const { interrupt } = useGlitchAudio(integrity, () => {});

  // Our own glitch scheduler — drives both visual + audio in lockstep
  useEffect(() => {
    if (integrity >= 100) return;

    let cancelled = false;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      const delay = 4000 + Math.random() * 2000; // ~8–10s between glitches
      t1 = setTimeout(() => {
        if (cancelled) return;

        const durationMs = 500 + Math.random() * 380; // 500ms–880ms
        const durationSec = durationMs / 1000;

        const type = GLITCH_TYPES[Math.floor(Math.random() * GLITCH_TYPES.length)];
        setGlitchType(type);
        glitchActiveRef.current = true;
        setGlitchActive(true);
        interrupt(durationSec);

        t2 = setTimeout(() => {
          if (cancelled) return;
          glitchActiveRef.current = false;
          setGlitchActive(false);
          scheduleNext();
        }, durationMs);
      }, delay);
    };

    scheduleNext();
    return () => {
      cancelled = true;
      clearTimeout(t1);
      clearTimeout(t2);
      glitchActiveRef.current = false;
      setGlitchActive(false);
    };
  }, [integrity, interrupt]);

  const s = Math.max(0.01, (100 - integrity) / 100); // 0→1 as world breaks

  // Per-type intensities (only active during a glitch)
  const isTear   = glitchActive && glitchType === "tear";
  const isSplit  = glitchActive && glitchType === "split";
  const isStatic = glitchActive && glitchType === "static";

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={glitchActive ? 1.2 + s * 0.8 : 0.4}
        luminanceThreshold={0.3}
        luminanceSmoothing={0.9}
        resolutionScale={0.5}
      />

      {/* TEAR — heavy horizontal image displacement */}
      <Glitch
        delay={new Vector2(0, 0)}
        duration={new Vector2(0.15, 0.6)}
        strength={new Vector2(
          isTear ? s * 1.2 : isStatic ? s * 0.4 : s * 0.15,
          isTear ? s * 2.4 : isStatic ? s * 0.8 : s * 0.3,
        )}
        mode={GlitchMode.CONSTANT_WILD}
        active={glitchActive}
        ratio={0.85}
      />

      {/* SPLIT — RGB channel separation */}
      <ChromaticAberration
        offset={
          isSplit
            ? new Vector2(s * 0.04, s * 0.04)
            : new Vector2(0.0005, 0.0005)
        }
        radialModulation={isSplit}
        modulationOffset={0.5}
      />

      {/* STATIC — noise burst */}
      <Noise
        opacity={isStatic ? 0.55 * s : 0.04 * s}
        blendFunction={isStatic ? BlendFunction.SCREEN : BlendFunction.ADD}
      />

      {/* STATIC — brightness flash */}
      <BrightnessContrast
        brightness={isStatic ? 0.35 : 0}
        contrast={isTear ? 0.2 : 0}
      />

      <Vignette
        eskil={false}
        offset={glitchActive ? 0.05 : 0.1}
        darkness={glitchActive ? 0.5 : 0.8}
      />
    </EffectComposer>
  );
}
