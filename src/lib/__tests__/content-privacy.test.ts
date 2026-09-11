import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { listPlaybooks, listTopics } from "@/lib/library";

/**
 * GitHub Pages serves the build regardless of repository visibility, and `next build` bundles
 * every client module into `out/`. So "attending preferences stay on the device" is not a
 * property of where we intend to put them — it is a property of what never enters the build.
 *
 * This is the mechanical half of that promise. It is deliberately cheap and deliberately blunt:
 * no module that ships may import the attending types, and no real name may reach the published
 * JSON. The other half — never committing a real card as a fixture — is a review rule the
 * migration step in the plan spells out, because no test can see what was never written down.
 */
const ROOT = join(import.meta.dirname, "..", "..");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return entry === "__tests__" ? [] : sourceFiles(full);
    return /\.tsx?$/.test(entry) ? [full] : [];
  });
}

describe("published content carries no attending data", () => {
  it("keeps src/content free of the device-only attending modules", () => {
    for (const file of sourceFiles(join(ROOT, "content"))) {
      const text = readFileSync(file, "utf8");
      const relative = file.slice(ROOT.length + 1);
      expect(text, `${relative} imports device-only attending code`).not.toMatch(/@\/lib\/attending/);
      expect(text, `${relative} mentions attending storage`).not.toMatch(/attendingId|attendingNotes/);
    }
  });

  it("keeps attending fields out of the shipped library and playbook payloads", () => {
    // These two payloads are exactly what `library.json` and `playbooks.json` serialise, so
    // asserting on them is asserting on the published artifacts.
    const shipped = JSON.stringify([listTopics(), listPlaybooks()]);
    expect(shipped).not.toMatch(/attendingId/);
    expect(shipped).not.toMatch(/attendingNotes/);
    expect(shipped).not.toMatch(/preference_snapshot/);
  });
});
