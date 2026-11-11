import { describe, expect, it } from "vitest";
import { isReaderPath, normalizePath } from "@/lib/pathname";

describe("normalizePath", () => {
  it.each([["/", "/"], ["/topics", "/topics"], ["/topics/", "/topics"], ["/topics/neck-trauma/", "/topics/neck-trauma"], ["/topics/neck-trauma//", "/topics/neck-trauma"]])("%s becomes %s", (input, expected) => {
    expect(normalizePath(input)).toBe(expected);
  });
});

describe("isReaderPath", () => {
  it.each(["/topics/neck-trauma", "/topics/neck-trauma/", "/playbooks/temporal-artery-biopsy", "/playbooks/temporal-artery-biopsy/"])("%s is a reader page", (path) => {
    expect(isReaderPath(path)).toBe(true);
  });

  it.each(["/", "/topics", "/topics/", "/playbooks", "/playbooks/", "/saved/", "/settings/", "/topics/trauma/neck-trauma/", "/search/"])("%s is not", (path) => {
    expect(isReaderPath(path)).toBe(false);
  });
});
