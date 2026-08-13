import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase/server";

export async function POST() {
  if (hasSupabaseConfig()) { try { const supabase = await createSupabaseServerClient(); await supabase.auth.signOut(); } catch { /* Clear client caches even if the network is unavailable. */ } }
  return Response.json({ ok: true }, { headers: { "Clear-Site-Data": '"cache", "storage"', "Cache-Control": "no-store" } });
}
