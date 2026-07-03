// Minimal typings for the vendored v86 global (public/emulator/libv86.js),
// covering only the API surface this feature actually uses. Verified against
// v86's own v86.d.ts (github.com/copy/v86) — the full interface is much
// larger; we only declare what we call.
export interface V86Image {
  url: string;
}

export interface V86Options {
  screen_container: HTMLElement;
  bios: V86Image;
  vga_bios: V86Image;
  cdrom?: V86Image;
  wasm_path?: string;
  memory_size?: number;
  vga_memory_size?: number;
  autostart?: boolean;
  disable_mouse?: boolean;
}

export interface V86Instance {
  destroy(): Promise<void>;
  restart(): void;
  keyboard_set_enabled(enabled: boolean): void;
  create_file(file: string, data: Uint8Array): Promise<void>;
  add_listener<T = unknown>(event: string, listener: (arg: T) => void): void;
}

export type V86Constructor = new (options: V86Options) => V86Instance;

declare global {
  interface Window {
    V86?: V86Constructor;
  }
}
