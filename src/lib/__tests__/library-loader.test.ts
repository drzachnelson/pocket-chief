import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useLoader } from "@/lib/library-client";

vi.mock("@/lib/offline", () => ({}));

function deferred<T>() {
  let resolve!: (value: T) => void; let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

describe("useLoader", () => {
  it("is loading until the read settles, then ready with its data", async () => {
    const pending = deferred<string>();
    const read = vi.fn(() => pending.promise);
    const { result } = renderHook(() => useLoader(read));
    expect(result.current).toMatchObject({ loading: true, failed: false, ready: false, retrying: false });
    expect(result.current.data).toBeUndefined();
    await act(async () => { pending.resolve("rows"); });
    expect(result.current).toMatchObject({ loading: false, failed: false, ready: true, data: "rows" });
    expect(read).toHaveBeenCalledTimes(1);
  });

  it("reports a rejected read as failed, with no data", async () => {
    const { result } = renderHook(() => useLoader(() => Promise.reject(new Error("offline"))));
    await waitFor(() => expect(result.current.failed).toBe(true));
    expect(result.current).toMatchObject({ loading: false, failed: true, ready: false, retrying: false });
    expect(result.current.data).toBeUndefined();
  });

  it("keeps a failed read failed, and marks it retrying, until the retry settles", async () => {
    const again = deferred<string>();
    const read = vi.fn().mockRejectedValueOnce(new Error("offline")).mockImplementationOnce(() => again.promise);
    const { result } = renderHook(() => useLoader(read));
    await waitFor(() => expect(result.current.failed).toBe(true));
    act(() => result.current.retry());
    expect(result.current).toMatchObject({ loading: false, failed: true, ready: false, retrying: true });
    await act(async () => { again.resolve("rows"); });
    expect(result.current).toMatchObject({ failed: false, ready: true, data: "rows", retrying: false });
    expect(read).toHaveBeenCalledTimes(2);
  });

  it("stops retrying and stays failed when the retry fails too", async () => {
    const read = vi.fn().mockRejectedValue(new Error("offline"));
    const { result } = renderHook(() => useLoader(read));
    await waitFor(() => expect(result.current.failed).toBe(true));
    await act(async () => { result.current.retry(); });
    expect(result.current).toMatchObject({ failed: true, retrying: false });
    expect(read).toHaveBeenCalledTimes(2);
  });

  it("drops a result that arrives after the read was replaced", async () => {
    const slow = deferred<string>();
    const { result, rerender } = renderHook(({ read }) => useLoader(read), { initialProps: { read: () => slow.promise } });
    rerender({ read: () => Promise.resolve("new") });
    await waitFor(() => expect(result.current.data).toBe("new"));
    await act(async () => { slow.resolve("old"); });
    expect(result.current.data).toBe("new");
  });

  it("ignores a result that lands after unmount", async () => {
    const pending = deferred<string>();
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const { unmount } = renderHook(() => useLoader(() => pending.promise));
    unmount();
    await act(async () => { pending.resolve("late"); });
    expect(errors).not.toHaveBeenCalled();
    errors.mockRestore();
  });
});
