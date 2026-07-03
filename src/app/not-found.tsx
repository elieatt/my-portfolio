"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NOT_FOUND_TEXT } from "@/data/content";
import { FOURTHWALL_ENABLED } from "@/components/fourthwall/config";

function PlainFallback() {
  return (
    <div style={{ padding: "4rem", fontFamily: "sans-serif" }}>
      <h1>{NOT_FOUND_TEXT.plainFallbackTitle}</h1>
      <Link href="/">{NOT_FOUND_TEXT.plainFallbackHome}</Link>
    </div>
  );
}

export default function NotFound() {
  const pathname = usePathname();

  if (!FOURTHWALL_ENABLED) return <PlainFallback />;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,80,0.015) 2px, rgba(0,255,80,0.015) 4px)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center max-w-lg font-mono">
        <div className="text-red-500 text-xs tracking-widest animate-pulse">
          {NOT_FOUND_TEXT.alert}
        </div>
        <div className="text-green-700 text-xs border border-green-900 rounded px-4 py-3 w-full text-left space-y-1">
          {NOT_FOUND_TEXT.lines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
          <div>
            {NOT_FOUND_TEXT.scannedPrefix} {pathname}
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 w-full">
          <Link
            href="/"
            className="font-mono text-sm border border-green-500 text-green-400 px-8 py-3 rounded tracking-widest hover:bg-green-950 hover:text-green-300 hover:border-green-400 transition-all duration-150 w-full max-w-xs text-center"
          >
            {NOT_FOUND_TEXT.homeButton}
          </Link>
          <Link
            href="/blog"
            className="font-mono text-xs border border-green-900 text-green-800 px-8 py-2 rounded tracking-widest hover:border-green-700 hover:text-green-600 transition-all duration-150 w-full max-w-xs text-center"
          >
            {NOT_FOUND_TEXT.blogButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
