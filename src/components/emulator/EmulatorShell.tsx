"use client";

import { useEffect, useRef, useState } from "react";
import { loadV86 } from "./loadV86";
import type { V86Instance } from "./types";
import { EMULATOR_TEXT } from "@/data/content";

type Status = "connecting" | "online" | "error";

const BIOS_URL = "/emulator/seabios.bin";
const VGA_BIOS_URL = "/emulator/vgabios.bin";
const CDROM_URL = "/emulator/linux.iso";
const WASM_URL = "/emulator/v86.wasm";
// Fallback in case the "emulator-ready" event name isn't what this build fires —
// the real proof of "online" is the boot text in the screen regardless.
const ONLINE_FALLBACK_MS = 6000;

export default function EmulatorShell() {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<V86Instance | null>(null);
  const [status, setStatus] = useState<Status>("connecting");
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

    const touchTimer = setTimeout(() => {
      if (!cancelled) setIsTouch(navigator.maxTouchPoints > 0);
    }, 0);

    loadV86()
      .then((V86) => {
        if (cancelled || !containerRef.current) return;

        const instance = new V86({
          screen_container: containerRef.current,
          bios: { url: BIOS_URL },
          vga_bios: { url: VGA_BIOS_URL },
          cdrom: { url: CDROM_URL },
          wasm_path: WASM_URL,
          autostart: true,
        });
        instanceRef.current = instance;

        try {
          instance.add_listener("emulator-ready", () => {
            if (!cancelled) setStatus("online");
          });
        } catch {
          // Event name unsupported by this build — the fallback timer covers it.
        }

        fallbackTimer = setTimeout(() => {
          if (!cancelled) setStatus("online");
        }, ONLINE_FALLBACK_MS);
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      clearTimeout(touchTimer);
      if (fallbackTimer) clearTimeout(fallbackTimer);
      const instance = instanceRef.current;
      if (instance) {
        instance.keyboard_set_enabled(false);
        instance.destroy().catch(() => {});
        instanceRef.current = null;
      }
    };
  }, []);

  const handleReset = () => {
    instanceRef.current?.restart();
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
      <p className="font-mono text-xs tracking-widest text-green-600">
        {status === "error"
          ? EMULATOR_TEXT.loadError
          : status === "online"
            ? EMULATOR_TEXT.statusOnline
            : EMULATOR_TEXT.statusBooting}
      </p>

      {isTouch && status !== "error" && (
        <p className="font-mono text-[10px] tracking-widest text-yellow-600">
          {EMULATOR_TEXT.mobileWarning}
        </p>
      )}

      {/*
        v86 expects screen_container to already hold its two rendering layers
        (text-mode div + hidden canvas for graphics mode) with this exact
        inline styling — this is copied from v86's own examples/basic.html.
        Without the monospace font + matching line-height, the text-mode
        character grid renders using inherited page styles instead, which
        squashes the block cursor down to a flat dash.
      */}
      <div
        ref={containerRef}
        className="w-full border border-green-900 bg-black overflow-hidden"
        style={{ minHeight: "400px" }}
      >
        <div style={{ whiteSpace: "pre", font: "14px monospace", lineHeight: "14px" }} />
        <canvas style={{ display: "none" }} />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleReset}
          disabled={status !== "online"}
          className="font-mono text-xs border border-green-900 text-green-700 px-4 py-2 tracking-widest hover:border-green-700 hover:text-green-500 disabled:opacity-30 disabled:hover:border-green-900 disabled:hover:text-green-700 transition-colors"
        >
          {EMULATOR_TEXT.reset}
        </button>
      </div>
    </div>
  );
}
