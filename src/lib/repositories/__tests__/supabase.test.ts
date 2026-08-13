import { afterEach, describe, expect, it, vi } from "vitest";

const rpcMock = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: vi.fn(async () => ({ rpc: rpcMock })),
}));

afterEach(() => { rpcMock.mockClear(); vi.restoreAllMocks(); });

describe("SupabaseRepository.create", () => {
  it("fails soft, retries the launch-topic seed after a failure, then memoizes on success", async () => {
    rpcMock.mockResolvedValueOnce({ error: { message: "hash mismatch" } }).mockResolvedValue({ error: null });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const { SupabaseRepository } = await import("@/lib/repositories/supabase");
    await expect(SupabaseRepository.create()).resolves.toBeInstanceOf(SupabaseRepository);
    await expect(SupabaseRepository.create()).resolves.toBeInstanceOf(SupabaseRepository);
    await expect(SupabaseRepository.create()).resolves.toBeInstanceOf(SupabaseRepository);
    expect(rpcMock).toHaveBeenCalledTimes(2);
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });
});
