import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database";

let browserClient: SupabaseClient<Database> | null = null;

export function getSupabaseConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  };
}

export function isSupabaseConfigured() {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey);
}

export function getSupabaseClient() {
  const { url, anonKey } = getSupabaseConfig();

  if (!url || !anonKey) {
    throw new Error("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  if (!browserClient) {
    browserClient = createClient<Database>(url, anonKey);
  }

  return browserClient;
}
