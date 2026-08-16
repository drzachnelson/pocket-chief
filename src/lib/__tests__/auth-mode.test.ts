import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { resolveDataMode } from "@/lib/auth";
import { dataMode } from "@/lib/data-mode";
import { proxy } from "@/proxy";

const supabase = vi.hoisted(() => ({ createServerClient: vi.fn(), getUser: vi.fn(), signOut: vi.fn() }));
vi.mock("@supabase/ssr", () => ({
  createServerClient: (...args: unknown[]) => { supabase.createServerClient(...args); return { auth: { getUser: supabase.getUser, signOut: supabase.signOut } }; },
}));

function stubEnv({ nodeEnv, demoFlag, config }: { nodeEnv: string; demoFlag?: string; config?: boolean }) {
  vi.stubEnv("NODE_ENV", nodeEnv);
  vi.stubEnv("POCKET_CHIEF_DEMO", demoFlag);
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", config ? "https://project.supabase.co" : undefined);
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", config ? "anon-key" : undefined);
  vi.stubEnv("POCKET_CHIEF_OWNER_EMAIL", config ? "owner@example.com" : undefined);
}

beforeEach(() => { supabase.getUser.mockResolvedValue({ data: { user: null } }); });
afterEach(() => { vi.unstubAllEnvs(); vi.clearAllMocks(); });

describe("data mode", () => {
  it("allows demo only when explicitly enabled outside production", () => {
    expect(resolveDataMode({ nodeEnv: "development", demoFlag: "true", hasConfig: false })).toBe("demo");
    expect(resolveDataMode({ nodeEnv: "production", demoFlag: "true", hasConfig: false })).toBe("misconfigured");
  });

  it("fails closed when Supabase is missing", () => {
    expect(resolveDataMode({ nodeEnv: "development", demoFlag: undefined, hasConfig: false })).toBe("misconfigured");
    expect(resolveDataMode({ nodeEnv: "production", demoFlag: undefined, hasConfig: false })).toBe("misconfigured");
  });

  it("uses Supabase when configured", () => {
    expect(resolveDataMode({ nodeEnv: "production", demoFlag: undefined, hasConfig: true })).toBe("supabase");
  });

  it("lets configuration beat the demo flag when both are present", () => {
    expect(resolveDataMode({ nodeEnv: "development", demoFlag: "true", hasConfig: true })).toBe("supabase");
    stubEnv({ nodeEnv: "development", demoFlag: "true", config: true });
    expect(dataMode()).toBe("supabase");
  });

  it("treats a missing owner email as unconfigured rather than Supabase", () => {
    stubEnv({ nodeEnv: "production", config: true });
    vi.stubEnv("POCKET_CHIEF_OWNER_EMAIL", undefined);
    expect(dataMode()).toBe("misconfigured");
  });
});

describe("proxy data mode", () => {
  it("enforces the owner check when the demo flag and Supabase config are both set", async () => {
    stubEnv({ nodeEnv: "development", demoFlag: "true", config: true });
    const response = await proxy(new NextRequest("https://pocket.test/library"));
    expect(dataMode()).toBe("supabase");
    expect(supabase.createServerClient).toHaveBeenCalledOnce();
    expect(response.headers.get("location")).toContain("/auth/sign-in");
  });

  it("passes requests through only when the resolver says demo", async () => {
    stubEnv({ nodeEnv: "development", demoFlag: "true" });
    const response = await proxy(new NextRequest("https://pocket.test/library"));
    expect(dataMode()).toBe("demo");
    expect(supabase.createServerClient).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });

  it("serves the owner when the session email matches", async () => {
    stubEnv({ nodeEnv: "production", demoFlag: "true", config: true });
    supabase.getUser.mockResolvedValue({ data: { user: { email: "Owner@Example.com" } } });
    const response = await proxy(new NextRequest("https://pocket.test/library"));
    expect(response.headers.get("location")).toBeNull();
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex, nofollow, noarchive");
  });

  it("fails closed on an incomplete configuration", async () => {
    stubEnv({ nodeEnv: "production" });
    const page = await proxy(new NextRequest("https://pocket.test/library"));
    expect(page.headers.get("location")).toContain("/configuration-error");
    const api = await proxy(new NextRequest("https://pocket.test/api/library"));
    expect(api.status).toBe(503);
    await expect(api.json()).resolves.toMatchObject({ code: "CONFIGURATION_REQUIRED" });
    const signIn = await proxy(new NextRequest("https://pocket.test/auth/sign-in"));
    expect(signIn.headers.get("location")).toBeNull();
  });
});
