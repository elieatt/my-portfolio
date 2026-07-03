"use client";

import { useEffect } from "react";
import { initConsoleChannel } from "./consoleChannel";
import { FOURTHWALL_TEXT } from "@/data/content";

export default function FourthWall() {
  useEffect(() => {
    initConsoleChannel();

    const original = document.title;
    const onVisibilityChange = () => {
      document.title = document.hidden ? FOURTHWALL_TEXT.tabHiddenTitle : original;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.title = original;
    };
  }, []);

  return null;
}
