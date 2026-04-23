import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Supabase client for server-side data fetching (Astro frontmatter)
 * and client-side form submissions (feedback widget).
 *
 * Returns null when credentials are not configured so the site
 * degrades gracefully to static content.
 */
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
