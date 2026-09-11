import { describe, expect, it } from "vitest";
import { getPlaybookBySlug, listPlaybooks, listTaxonomy, listTopics, searchPlaybookLibrary } from "@/lib/library";
import { buildLinkIndex, createLinkScope, parseInline } from "@/lib/inline";
import { factualUnits } from "@/lib/editorial";
import { taxonomy } from "@/lib/seed";

describe("playbook library", () => {
  it("lists the authored playbooks", () => {
    const playbooks = listPlaybooks();
    expect(playbooks.length).toBeGreaterThan(0);
    expect(playbooks.map((playbook) => playbook.slug)).toContain("temporal-artery-biopsy");
  });

  it("resolves a playbook by slug and returns null for an unknown one", () => {
    expect(getPlaybookBySlug("temporal-artery-biopsy")?.title).toBe("Temporal Artery Biopsy");
    expect(getPlaybookBySlug("not-a-playbook")).toBeNull();
  });

  it("finds a playbook by alias, and tolerates a typo", () => {
    expect(searchPlaybookLibrary("TAB").map((playbook) => playbook.slug)).toContain("temporal-artery-biopsy");
    expect(searchPlaybookLibrary("temporal artry biopsy").map((playbook) => playbook.slug)).toContain("temporal-artery-biopsy");
  });

  it("matches on body text, not only on identity", () => {
    expect(searchPlaybookLibrary("Pitanguy").map((playbook) => playbook.slug)).toContain("temporal-artery-biopsy");
  });

  it("returns everything for an empty query, unranked", () => {
    expect(searchPlaybookLibrary("")).toHaveLength(listPlaybooks().length);
  });

  it("leaves the SCORE taxonomy untouched", () => {
    // Playbooks are organized by specialty and approach. The moment one acquires a taxonomy node
    // the single-root assertion in library.test.ts and the ordered-sections list in
    // taxonomy.test.ts both break — those two tests are the tripwire, and this is the statement
    // of intent behind them.
    expect(listTaxonomy()).toEqual(taxonomy);
    for (const playbook of listPlaybooks()) expect(playbook).not.toHaveProperty("scoreNodeId");
  });

  it("cross-links only into topics a reviewer has signed off on", () => {
    // Playbooks render against the topic link index, and topic aliases are domain-specific.
    // "skip lesions" is a legitimate Crohn alias and means something else entirely in giant
    // cell arteritis — the first draft of the biopsy guide silently linked a vasculitis
    // sentence to the Crohn topic. An auto-link is a clinical claim about relatedness, so new
    // ones fail here until someone looks at them rather than surfacing in the browser.
    const expected: Record<string, string[]> = {
      // Reviewed and kept: the anatomy and the hostile-neck factor genuinely belong to those
      // topics. Rejected on review: "a fast one" reached the FAST exam, and "skip lesions"
      // reached Crohn disease. Both were reworded rather than accepted.
      "carotid-endarterectomy-bovine-patch": [
        "common facial vein -> neck-injuries-management",
        "recurrent laryngeal nerve -> neck-injuries-management",
        "tracheostomy -> airway-access-intubation-and-surgical-airways",
      ],
      "femoropopliteal-bypass": [
        "Compartment syndrome -> fasciotomy",
        "Fasciotomy -> fasciotomy",
        "Rhabdomyolysis -> fasciotomy",
        "fasciotomy -> fasciotomy",
        "four-compartment fasciotomy -> fasciotomy",
      ],
      "temporal-artery-biopsy": [],
    };
    const entries = buildLinkIndex(listTopics());
    for (const playbook of listPlaybooks()) {
      const linked = new Set<string>();
      for (const block of playbook.blocks) {
        const scope = createLinkScope(entries, playbook.slug);
        for (const unit of factualUnits(block)) {
          for (const piece of parseInline(unit, scope)) if (piece.slug) linked.add(`${piece.text} -> ${piece.slug}`);
        }
      }
      expect([...linked].sort(), playbook.slug).toEqual(expected[playbook.slug] ?? []);
    }
  });
});
