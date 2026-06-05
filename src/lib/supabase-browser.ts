import { createBrowserClient } from "@supabase/ssr";

export function getSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASAE_URL!,
    process.env.NEXT_PUBLIC_SUPABASAE_PUBLISHABLE_KEY!
  );
}
