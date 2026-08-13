import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase/server";

export interface OwnerIdentity { id: string; email: string; demo: boolean }

export function isDemoMode() { return !hasSupabaseConfig() || process.env.NEXT_PUBLIC_POCKET_CHIEF_DEMO === "true"; }

export async function requireOwner(): Promise<OwnerIdentity | null> {
  if (isDemoMode()) return { id: "demo-owner", email: process.env.POCKET_CHIEF_OWNER_EMAIL || "owner@pocketchief.local", demo: true };
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const ownerEmail = process.env.POCKET_CHIEF_OWNER_EMAIL?.trim().toLowerCase();
  if (!user?.email || !ownerEmail || user.email.toLowerCase() !== ownerEmail) return null;
  return { id: user.id, email: user.email, demo: false };
}

export async function apiOwner() {
  const owner = await requireOwner();
  if (!owner) return { owner: null, response: Response.json({ error: "Owner authentication required.", code: "UNAUTHORIZED" }, { status: 401 }) };
  return { owner, response: null };
}
