"use client";

import { useEffect, useRef, useState } from "react";
import type { MiniGameProps } from "../types";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function makeCode(len: number) {
  return Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join("");
}

export default function CodeEntry({ onWin, difficulty }: MiniGameProps) {
  const length = 5 + Math.round(3 * difficulty); // 5 → 8
  const [code] = useState(() => makeCode(length));
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toUpperCase() === code) {
      onWin();
    } else {
      setError(true);
      setValue("");
      setTimeout(() => setError(false), 400);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-green-600 text-xs tracking-widest">ENTER THE ACCESS CODE</p>
      <p className="text-center text-2xl tracking-[0.35em] text-green-300 select-none">{code}</p>
      <form onSubmit={submit} className="flex items-center gap-2 border-t border-green-900 pt-2">
        <span className="text-green-600 select-none">&gt;</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={length}
          spellCheck={false}
          autoComplete="off"
          className={`flex-1 bg-transparent outline-none text-sm uppercase tracking-widest ${
            error ? "text-red-400" : "text-green-400"
          }`}
        />
      </form>
      {error && <p className="text-red-400 text-xs tracking-widest">MISMATCH // RETRY</p>}
    </div>
  );
}
