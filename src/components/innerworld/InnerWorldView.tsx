"use client";

import dynamic from "next/dynamic";
import { useWorldStore } from "@/store/worldStore";
import { useInnerWorldStore } from "./innerWorldStore";
import { useInnerPosts } from "./useInnerPosts";
import InnerPanel from "./InnerPanel";
import { INNER_WORLD_TEXT } from "@/data/content";
// Experimental — see components/trace/config.ts
import SourceTrace from "@/components/trace/SourceTrace";
import { TRACE_ENABLED } from "@/components/trace/config";

// Dynamic import — Three.js must not run on SSR
const InnerWorld = dynamic(() => import("./InnerWorld"), { ssr: false });

export default function InnerWorldView() {
  const exit = useInnerWorldStore((s) => s.exit);
  const setActiveZone = useWorldStore((s) => s.setActiveZone);
  const { posts, loading } = useInnerPosts();

  const handleExit = () => {
    setActiveZone(null);
    exit();
  };

  return (
    <div className="innerworld-fade-in fixed inset-0 z-30 bg-black">
      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div className="flex items-center justify-between px-3 md:px-6 py-3 bg-black/60 backdrop-blur-sm border-b border-cyan-900/50 font-mono text-xs text-cyan-300">
          <span className="tracking-widest">{INNER_WORLD_TEXT.topBar.title}</span>
          <button
            onClick={handleExit}
            className="pointer-events-auto text-cyan-700 hover:text-cyan-300 tracking-widest transition-colors duration-150"
          >
            {INNER_WORLD_TEXT.topBar.returnButton}
          </button>
        </div>
        {loading && (
          <div className="px-3 md:px-6 pt-2 text-[10px] text-cyan-800 tracking-widest">
            {INNER_WORLD_TEXT.artifacts.loadingPosts}
          </div>
        )}
      </div>
      <div className="w-full h-full">
        <InnerWorld posts={posts} />
      </div>
      <InnerPanel />
      {TRACE_ENABLED && <SourceTrace />}
    </div>
  );
}
