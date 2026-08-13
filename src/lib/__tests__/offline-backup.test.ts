import { describe, expect, it } from "vitest";
import { shouldReplaceCachedTopic } from "@/lib/offline";
import { buildBackupManifest, topicToMarkdown } from "@/lib/backup";
import { choledocholithiasisTopic } from "@/lib/seed";

describe("offline cache and backup", () => {
  it("replaces stale topic versions only", () => {
    expect(shouldReplaceCachedTopic(2, 3)).toBe(true);
    expect(shouldReplaceCachedTopic(3, 3)).toBe(false);
  });

  it("exports a portable manifest and readable Markdown", () => {
    const manifest = buildBackupManifest([choledocholithiasisTopic], [], []);
    expect(manifest.format).toBe("pocket-chief-backup");
    expect(manifest.topics).toHaveLength(1);
    expect(topicToMarkdown(choledocholithiasisTopic)).toContain("# Choledocholithiasis");
  });
});
