import { describe, expect, it } from "vitest";
import { taxonomyDescendantIds, taxonomyParentIsValid } from "@/lib/taxonomy";

const nodes = [
  { id: "root", title: "Root", slug: "root", order: 0 },
  { id: "child", title: "Child", slug: "child", parentId: "root", order: 1 },
  { id: "grandchild", title: "Grandchild", slug: "grandchild", parentId: "child", order: 2 },
];

describe("taxonomy integrity", () => {
  it("finds descendants and rejects cyclic parents", () => {
    expect([...taxonomyDescendantIds("root", nodes)]).toEqual(["child", "grandchild"]);
    expect(taxonomyParentIsValid("root", "grandchild", nodes)).toBe(false);
    expect(taxonomyParentIsValid("child", "root", nodes)).toBe(true);
  });
});
