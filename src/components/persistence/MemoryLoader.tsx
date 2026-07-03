"use client";

import { useEffect } from "react";
import { useWorldStore } from "@/store/worldStore";
import { useInnerWorldStore } from "@/components/innerworld/innerWorldStore";
import { useTraceStore } from "@/components/trace/traceStore";
import { useMemoryStore } from "./memoryStore";
import { loadSignalMemory, saveSignalMemory, type SignalMemoryV1 } from "./signalMemory";
import type { ZoneId } from "@/data/content";

const DAY_MS = 24 * 60 * 60 * 1000;

// Guards against React StrictMode's double-invoke of effects in dev, and
// against re-hydrating on client navigation back to "/".
let hydrated = false;

// Last snapshot written to storage this session — lets the change-listener
// below skip redundant writes without triggering re-renders.
let lastWritten: SignalMemoryV1 | null = null;

function currentPersistedFields() {
  const world = useWorldStore.getState();
  const inner = useInnerWorldStore.getState();
  const trace = useTraceStore.getState();
  return {
    zones: Array.from(world.repairedZones) as ZoneId[],
    easterEggFound: world.easterEggFound,
    cinematicShown: inner.cinematicShown,
    traceDone: trace.traceDone,
  };
}

function sameZones(a: ZoneId[], b: ZoneId[]) {
  return a.length === b.length && a.every((z) => b.includes(z));
}

export default function MemoryLoader() {
  useEffect(() => {
    if (hydrated) return;
    hydrated = true;

    const existing = loadSignalMemory();
    const now = new Date();

    if (existing) {
      const last = new Date(existing.lastVisit);
      const daysAgo = Number.isNaN(last.getTime())
        ? 0
        : Math.max(0, Math.floor((now.getTime() - last.getTime()) / DAY_MS));
      const savedIntegrity = Math.round((existing.zones.length / 4) * 100);

      if (existing.zones.length > 0) {
        useWorldStore.setState({
          repairedZones: new Set(existing.zones),
          integrity: savedIntegrity,
          // lastRepaired intentionally left null — restoring must not fire RepairFlash.
        });
        useInnerWorldStore.setState({ cinematicShown: existing.cinematicShown });
        useTraceStore.setState({ traceDone: existing.traceDone });

        useMemoryStore.getState().setLoaded({
          visitCount: existing.visitCount + 1,
          daysAgo,
          prevEasterEggFound: existing.easterEggFound,
          savedIntegrity,
        });
      }

      const updated: SignalMemoryV1 = {
        ...existing,
        visitCount: existing.visitCount + 1,
        lastVisit: now.toISOString(),
      };
      lastWritten = updated;
      saveSignalMemory(updated);
    } else {
      const fresh: SignalMemoryV1 = {
        v: 1,
        zones: [],
        easterEggFound: false,
        cinematicShown: false,
        traceDone: false,
        visitCount: 1,
        lastVisit: now.toISOString(),
      };
      lastWritten = fresh;
      saveSignalMemory(fresh);
    }

    // Persist on every relevant state change. Skips writes while nothing
    // meaningful has happened yet, so a reset (clearSignalMemory) isn't
    // immediately undone by a stray re-save of empty state.
    const persist = () => {
      const fields = currentPersistedFields();
      if (
        fields.zones.length === 0 &&
        !fields.easterEggFound &&
        !fields.cinematicShown &&
        !fields.traceDone
      ) {
        return;
      }

      const base = lastWritten;
      const next: SignalMemoryV1 = {
        v: 1,
        ...fields,
        visitCount: base?.visitCount ?? 1,
        lastVisit: base?.lastVisit ?? now.toISOString(),
      };

      if (
        base &&
        sameZones(base.zones, next.zones) &&
        base.easterEggFound === next.easterEggFound &&
        base.cinematicShown === next.cinematicShown &&
        base.traceDone === next.traceDone
      ) {
        return; // identical — skip the write
      }

      lastWritten = next;
      saveSignalMemory(next);
    };

    const unsubWorld = useWorldStore.subscribe(persist);
    const unsubInner = useInnerWorldStore.subscribe(persist);
    const unsubTrace = useTraceStore.subscribe(persist);

    return () => {
      unsubWorld();
      unsubInner();
      unsubTrace();
    };
  }, []);

  return null;
}
