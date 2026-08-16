// The single source of truth for demo vs. Supabase. Kept free of imports so the proxy can share it
// without pulling `next/headers` into the proxy bundle — duplicating the condition is what let the
// proxy and the repository disagree and serve an unauthenticated empty library.

export type DataMode = "demo" | "supabase" | "misconfigured";

// Private config wins over POCKET_CHIEF_DEMO: the demo flag only describes a machine that has no
// project to talk to. Half-configuring one and setting the flag must not skip the owner check.
export function resolveDataMode({ nodeEnv, demoFlag, hasConfig }: { nodeEnv: string | undefined; demoFlag: string | undefined; hasConfig: boolean }): DataMode {
  if (nodeEnv === "test") return "demo";
  if (hasConfig) return "supabase";
  if (nodeEnv !== "production" && demoFlag === "true") return "demo";
  return "misconfigured";
}

// The owner email is part of the configuration, not an extra: without it no session can ever match.
export function hasPrivateConfig() { return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.POCKET_CHIEF_OWNER_EMAIL); }

export function dataMode(): DataMode {
  return resolveDataMode({ nodeEnv: process.env.NODE_ENV, demoFlag: process.env.POCKET_CHIEF_DEMO, hasConfig: hasPrivateConfig() });
}

export function isDemoMode() { return dataMode() === "demo"; }
