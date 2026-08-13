import { describe, expect, it } from "vitest";
import { resolveDataMode } from "@/lib/auth";

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
});
