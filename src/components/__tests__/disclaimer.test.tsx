import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Disclaimer } from "@/components/disclaimer";

const src = join(import.meta.dirname, "..", "..");
const files = (dir: string): string[] => readdirSync(dir).flatMap((name) => { const path = join(dir, name); return statSync(path).isDirectory() ? (name === "__tests__" ? [] : files(path)) : /\.tsx?$/.test(name) ? [path] : []; });
const using = (needle: string) => files(src).filter((file) => readFileSync(file, "utf8").includes(needle)).map((file) => relative(src, file)).sort();

describe("the disclaimer line", () => {
  it("is a plain paragraph, not a landmark", () => {
    render(<Disclaimer />);
    expect(screen.getByText("Educational reference only. Not patient-specific guidance.").tagName).toBe("P");
    expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();
  });

  // Home, Saved, Settings, the indexes and search results render none of this, so they cannot show the line.
  it("has one copy of its text, drawn only by the reader end, which only the two reader pages render", () => {
    expect(using("Educational reference only")).toEqual(["components/disclaimer.tsx"]);
    expect(using("<Disclaimer")).toEqual(["components/reader-end.tsx"]);
    expect(using("<ReaderEnd")).toEqual(["app/playbooks/[slug]/page.tsx", "app/topics/[slug]/page.tsx"]);
  });
});
