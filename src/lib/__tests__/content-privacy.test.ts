import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { listPlaybooks, listTopics } from "@/lib/library";

/**
 * GitHub Pages serves the build regardless of repository visibility, and `next build` bundles
 * every client module into `out/`. So "nothing private reaches the build" is not a property of
 * where we intend to put data — it is a property of what never enters the build.
 *
 * The attending-preference feature was removed on 2026-11-11. The owner's notes stay in the
 * `pocket-chief-attendings` IndexedDB database on their device, unread: the app must never open,
 * migrate or delete it again, and no stored record may appear in the published files. This is
 * the mechanical half of that promise, deliberately cheap and blunt.
 */
const ROOT = join(import.meta.dirname, "..", "..");

/** Only the text the browser actually receives: HTML, JS and JSON. */
function builtFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return builtFiles(full);
    return /\.(html|js|json|txt)$/.test(entry) ? [full] : [];
  });
}

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return entry === "__tests__" ? [] : sourceFiles(full);
    return /\.tsx?$/.test(entry) ? [full] : [];
  });
}

describe("published content carries no attending data", () => {
  it("never names the old attending database in shipped source", () => {
    for (const file of sourceFiles(ROOT)) {
      expect(readFileSync(file, "utf8"), `${file.slice(ROOT.length + 1)} touches the removed attending database`).not.toMatch(/pocket-chief-attendings/);
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

describe("the published build carries no attending data", () => {
  // `next build` bundles every client module into out/, and Pages serves that regardless of
  // repository visibility — so this is the only check that looks at what actually ships.
  // Skipped when out/ is absent, so the unit suite does not depend on a build; CI runs a build
  // first, and the deploy workflow gates on it too.
  const out = join(ROOT, "..", "out");
  const built = existsSync(out);

  it.skipIf(!built)("ships no stored attending record", () => {
    const files = builtFiles(out);
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      const relative = file.slice(out.length + 1);
      // Field *names* appear in the bundled component code, which is expected and harmless.
      // A stored record is what must never be here, and every one carries a createdAt beside
      // an attendingId.
      expect(text, `${relative} looks like it embeds a stored attending note`).not.toMatch(/"attendingId"\s*:/);
      expect(text, `${relative} looks like it embeds an attending backup`).not.toMatch(/pocket-chief-attending"\s*,\s*"version"/);
      expect(text, `${relative} opens the removed attending database`).not.toMatch(/pocket-chief-attendings/);
    }
  });
});
