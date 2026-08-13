import { describe, expect, it } from "vitest";
import { searchTopics } from "@/lib/search";
import { demoTopics } from "@/lib/seed";

describe("topic search", () => {
  it("matches aliases with typo tolerance", () => {
    expect(searchTopics("choledochoithiasis", demoTopics)[0]?.slug).toBe("choledocholithiasis");
  });

  it("matches multi-word searches when one token is mistyped", () => {
    expect(searchTopics("common bile dcut", demoTopics)[0]?.slug).toBe("choledocholithiasis");
  });

  it("never includes draft-only topics", () => {
    const draftOnly = { ...demoTopics[0], id: "draft", slug: "secret", title: "Secret Draft", approvedVersion: null };
    expect(searchTopics("secret", [...demoTopics, draftOnly])).toEqual([]);
  });
});
