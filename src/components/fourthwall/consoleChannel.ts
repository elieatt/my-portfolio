import { CONSOLE_TEXT } from "@/data/content";

declare global {
  interface Window {
    tune?: (freq?: string) => string;
  }
}

let initialized = false;

export function initConsoleChannel(): void {
  if (initialized) return;
  initialized = true;

  const asciiStyle = "color:#4ade80;font-family:monospace;font-size:12px;";
  const hintStyle = "color:#6b7280;font-family:monospace;font-size:11px;";

  CONSOLE_TEXT.lines.forEach((line) => {
    const isHint = line.trim().startsWith(">") || line.trim() === "";
    console.log(`%c${line}`, isHint ? hintStyle : asciiStyle);
  });

  window.tune = (freq?: string) => {
    if (freq === "hidden") {
      CONSOLE_TEXT.devChannelLines.forEach((line) => {
        console.log(`%c${line}`, asciiStyle);
      });
      return CONSOLE_TEXT.devChannelReturn;
    }
    return CONSOLE_TEXT.unknownFreqReturn;
  };
}
