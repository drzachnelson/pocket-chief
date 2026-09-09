import { describe, expect, it } from "vitest";
import { shouldReplaceCachedTopic } from "@/lib/offline";

describe("offline cache versioning", () => {
  it("replaces stale topic versions only", () => {
    expect(shouldReplaceCachedTopic(undefined, 1)).toBe(true);
    expect(shouldReplaceCachedTopic(2, 3)).toBe(true);
    expect(shouldReplaceCachedTopic(3, 3)).toBe(false);
    expect(shouldReplaceCachedTopic(4, 3)).toBe(false);
  });
});
