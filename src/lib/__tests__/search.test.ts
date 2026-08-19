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

  // The probe has to be words no topic contains: the guard under test is the
  // `word.length >= 3` condition on prefix matching, so each token here begins
  // with a short body word ("a", "to") that would otherwise carry it. Remove the
  // guard and this query matches every topic in the library. The previous probe,
  // "acute wound", stopped isolating the guard once the trauma section landed --
  // fasciotomy contains both words outright, and matched them legitimately.
  it("does not let one- or two-letter words in body text carry a token match", () => {
    expect(searchTopics("asparagus toboggan", demoTopics)).toEqual([]);
  });

  it("still ranks the right topic when a body word is a genuine prefix", () => {
    expect(searchTopics("phyllodes", demoTopics)[0]?.slug).toBe("fibroadenoma-vs-phyllodes-tumor");
  });

  it("never includes draft-only topics", () => {
    const draftOnly = { ...demoTopics[0], id: "draft", slug: "secret", title: "Secret Draft", approvedVersion: null };
    // Asserts the draft is absent rather than that nothing matched: seeded
    // content legitimately contains words this query prefixes ("secretase").
    expect(searchTopics("secret", [...demoTopics, draftOnly]).map((topic) => topic.slug)).not.toContain("secret");
  });
});
