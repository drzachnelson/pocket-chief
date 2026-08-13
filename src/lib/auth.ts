import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase/server";

export interface OwnerIdentity { id: string; email: string; demo: boolean }

export type DataMode = "demo" | "supabase" | "misconfigured";

export function resolveDataMode({ nodeEnv, demoFlag, hasConfig }: { nodeEnv: string | undefined; demoFlag: string | undefined; hasConfig: boolean }): DataMode {
  if (nodeEnv === "test") return "demo";
  if (hasConfig) return "supabase";
  if (nodeEnv !== "production" && demoFlag === "true") return "demo";
  return "misconfigured";
}

export function dataMode() {
  return resolveDataMode({ nodeEnv: process.env.NODE_ENV, demoFlag: process.env.POCKET_CHIEF_DEMO, hasConfig: hasSupabaseConfig() });
}

export function isDemoMode() { return dataMode() === "demo"; }

export async function requireOwner(): Promise<OwnerIdentity | null> {
  if (isDemoMode()) return { id: "demo-owner", email: process.env.POCKET_CHIEF_OWNER_EMAIL || "owner@pocketchief.local", demo: true };
  if (dataMode() === "misconfigured") return null;
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
