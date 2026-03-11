"use client";

import { useEffect, useRef, useState } from "react";
import { useWorldStore } from "@/store/worldStore";
import { UI_TEXT } from "@/data/content";
import type { ZoneId } from "@/data/content";

const COMMAND = (id: ZoneId) => `tune ${id}`;
const TYPEWRITER_MS = 45;

type Line = { text: string; variant: "dim" | "normal" | "error" | "success" };

export default function RepairTerminal() {
  const pendingRepair = useWorldStore((s) => s.pendingRepair);
  const repairZone = useWorldStore((s) => s.repairZone);
  const closeRepairTerminal = useWorldStore((s) => s.closeRepairTerminal);
  const integrity = useWorldStore((s) => s.integrity);

  useEffect(() => {
    if (integrity >= 100) closeRepairTerminal();
  }, [integrity, closeRepairTerminal]);

  const [isMobile, setIsMobile] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMobile(navigator.maxTouchPoints > 0 || "ontouchstart" in window);
  }, []);

  // Reset state each time a zone opens
  useEffect(() => {
    if (!pendingRepair) return;
    setInput("");
    setLines([
      {
        text: `> ZONE OFFLINE: ${pendingRepair.toUpperCase()}`,
        variant: "dim",
      },
      { text: `> AUTHORIZED COMMAND: tune ${pendingRepair}`, variant: "dim" },
    ]);
    setTypewriterText("");
    setTypewriterDone(false);
    setConfirmed(false);
    if (!isMobile) setTimeout(() => inputRef.current?.focus(), 80);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingRepair]);

  // Mobile typewriter effect
  useEffect(() => {
    if (!pendingRepair || !isMobile || typewriterDone) return;
    const cmd = COMMAND(pendingRepair);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTypewriterText(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(id);
        setTypewriterDone(true);
      }
    }, TYPEWRITER_MS);
    return () => clearInterval(id);
  }, [pendingRepair, isMobile, typewriterDone]);

  if (!pendingRepair) return null;

  const execute = () => {
    if (confirmed) return;
    const zoneId = pendingRepair; // capture before async
    setConfirmed(true);

    closeRepairTerminal(); // frame 1: terminal gone
    setTimeout(() => repairZone(zoneId), 300); // frame 2: flash fires on clear screen
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    if (trimmed === COMMAND(pendingRepair)) {
      setLines((prev) => [
        ...prev,
        { text: `> ${trimmed}`, variant: "normal" },
        { text: UI_TEXT.repairTerminal.executing, variant: "success" },
      ]);
      execute();
    } else {
      setLines((prev) => [
        ...prev,
        { text: `> ${trimmed}`, variant: "normal" },
        {
          text: UI_TEXT.repairTerminal.errorMsg(pendingRepair),
          variant: "error",
        },
      ]);
      setInput("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={closeRepairTerminal}
    >
      <div
        className="font-mono text-green-400 bg-black border border-green-800 w-full max-w-md mx-4 p-4 space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-green-900 pb-2">
          <span className="text-xs text-green-600 tracking-widest">
            {UI_TEXT.repairTerminal.header}
          </span>
          <button
            onClick={closeRepairTerminal}
            className="text-green-700 hover:text-green-400 text-sm px-1"
            aria-label="Cancel"
          >
            {UI_TEXT.repairTerminal.cancel}
          </button>
        </div>

        {/* Output lines */}
        <div className="space-y-1 text-sm min-h-[3rem]">
          {lines.map((l, i) => (
            <div
              key={i}
              className={
                l.variant === "error"
                  ? "text-red-400"
                  : l.variant === "success"
                    ? "text-green-300"
                    : l.variant === "dim"
                      ? "text-green-700"
                      : "text-green-400"
              }
            >
              {l.text}
            </div>
          ))}
        </div>

        {/* Desktop — typed input */}
        {!isMobile && !confirmed && (
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-green-900 pt-2"
          >
            <span className="text-green-600 select-none">&gt;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-green-400 caret-green-400 text-sm"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
            />
          </form>
        )}

        {/* Mobile — typewriter + execute button */}
        {isMobile && !confirmed && (
          <div className="border-t border-green-900 pt-2 space-y-3">
            <div className="text-sm text-green-400">
              &gt; {typewriterText}
              {!typewriterDone && <span className="animate-pulse">█</span>}
            </div>
            {typewriterDone && (
              <button
                onClick={execute}
                className="w-full border border-green-600 text-green-400 py-2 text-sm tracking-widest hover:bg-green-900/30 active:bg-green-900/50 transition-colors"
              >
                {UI_TEXT.repairTerminal.executeBtn}
              </button>
            )}
          </div>
        )}

        {/* Confirmed state */}
        {confirmed && (
          <div className="border-t border-green-900 pt-2 text-green-300 text-sm animate-pulse">
            {UI_TEXT.repairTerminal.initiated}
          </div>
        )}
      </div>
    </div>
  );
}
