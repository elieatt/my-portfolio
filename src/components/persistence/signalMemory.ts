import { ZONES } from "@/data/content";
import type { ZoneId } from "@/data/content";

const STORAGE_KEY = "tx-ea-signal-memory-v1";
const KNOWN_ZONE_IDS: Set<string> = new Set(ZONES.map((z) => z.id));

export interface SignalMemoryV1 {
  v: 1;
  zones: ZoneId[];
  easterEggFound: boolean;
  cinematicShown: boolean;
  traceDone: boolean;
  visitCount: number;
  lastVisit: string;
}

function isKnownZoneId(z: unknown): z is ZoneId {
  return typeof z === "string" && KNOWN_ZONE_IDS.has(z);
}

function isValid(data: unknown): data is SignalMemoryV1 {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  if (d.v !== 1) return false;
  if (!Array.isArray(d.zones) || !d.zones.every(isKnownZoneId)) return false;
  if (typeof d.easterEggFound !== "boolean") return false;
  if (typeof d.cinematicShown !== "boolean") return false;
  if (typeof d.traceDone !== "boolean") return false;
  if (typeof d.visitCount !== "number") return false;
  if (typeof d.lastVisit !== "string") return false;
  return true;
}

export function loadSignalMemory(): SignalMemoryV1 | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveSignalMemory(data: SignalMemoryV1): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Quota exceeded or private-mode write failure — silently skip.
  }
}

export function clearSignalMemory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
}
