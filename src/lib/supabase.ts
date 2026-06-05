import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASAE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASAE_PUBLISHABLE_KEY!;

export const supabase = createClient(url, key);
