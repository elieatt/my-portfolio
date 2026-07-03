import type { V86Constructor } from "./types";

const SCRIPT_SRC = "/emulator/libv86.js";

let loadPromise: Promise<V86Constructor> | null = null;

// Injects the vendored v86 script tag once (module-level guard covers
// StrictMode double-invoke and repeated mounts) and resolves with the global
// V86 constructor it exposes.
export function loadV86(): Promise<V86Constructor> {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    if (window.V86) {
      resolve(window.V86);
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    const script = existing ?? document.createElement("script");

    const onLoad = () => {
      if (window.V86) resolve(window.V86);
      else reject(new Error("v86 script loaded but did not expose window.V86"));
    };
    const onError = () => reject(new Error("Failed to load v86 emulator script"));

    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });

    if (!existing) {
      script.src = SCRIPT_SRC;
      document.body.appendChild(script);
    }
  });

  return loadPromise;
}
