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
      //
      // The six operative playbooks added 2026-09-13 were reviewed the same way. Rejected and
      // reworded in the playbook: "duodenojejunal junction" and "detorsion" reached the
      // paediatric malrotation pair from a splenic-flexure takedown and an adult caecal
      // volvulus, "high ligation" reached paediatric sac ligation from a vascular one,
      // "mesh repair" and "onlay" reached groin and abdominal-wall repair from a parastomal
      // and a Lichtenstein one, "midline hernia" reached the primary umbilical/epigastric
      // topic from a concomitant incisional defect, "ascites" reached the cirrhotic umbilical
      // hernia from a chylous leak, and "watchful waiting" reached the inguinal hernia trials
      // from a postoperative-imaging threshold.
      //
      // Two were instead narrowed at the source, because the alias was a bare modality rather
      // than a term belonging to that topic's domain — the pattern that had "damage control"
      // stolen from trauma laparotomy. "CT angiography" was removed from neck trauma, which
      // keeps the domain-specific "CTA neck"; "indocyanine green" and "ICG" were removed from
      // the Ladd procedure, which keeps "bowel viability". Between them they had captured
      // postoperative-bleeding and perfusion-assessment sentences in four playbooks.
      "carotid-endarterectomy-bovine-patch": [
        "common facial vein -> neck-injuries-management",
        "recurrent laryngeal nerve -> neck-injuries-management",
        "tracheostomy -> airway-access-intubation-and-surgical-airways",
      ],
      "colostomy-takedown-with-parastomal-hernia-repair": [
        "Duodenal injury -> gastrointestinal-tract-injury-repair",
        "Keyhole mesh -> ventral-and-incisional-hernia",
        "Mesh infection -> abdominal-wall-reconstruction",
        "Parastomal hernia -> ventral-and-incisional-hernia",
        "Retrorectus -> abdominal-wall-reconstruction",
        "Splenic injury -> splenic-injury",
        "Sugarbaker -> ventral-and-incisional-hernia",
        "abdominal wall reconstruction -> abdominal-wall-reconstruction",
        "incisional hernia -> ventral-and-incisional-hernia",
        "inferior mesenteric artery -> abdominal-and-aortoiliac-aneurysm-repair",
        "parastomal hernia -> ventral-and-incisional-hernia",
        "peritonitis -> abdominal-pain",
        "rectal stump -> ulcerative-colitis",
        "splenectomy -> splenectomy-and-splenorrhaphy",
        "sublay mesh -> abdominal-wall-reconstruction",
        "transversus abdominis release -> abdominal-wall-reconstruction",
      ],
      "femoropopliteal-bypass": [
        "Compartment syndrome -> fasciotomy",
        "Fasciotomy -> fasciotomy",
        "Rhabdomyolysis -> fasciotomy",
        "fasciotomy -> fasciotomy",
        "four-compartment fasciotomy -> fasciotomy",
      ],
      // "volvulus" is kept deliberately: adult caecal volvulus and the malrotation spectrum
      // share the failure of right-colon peritoneal fixation, so the jump informs the reader.
      // Its sibling "detorsion" was not, because Ladd's procedure is a different operation.
      "right-hemicolectomy": [
        "pancreatic fistula -> splenectomy-and-splenorrhaphy",
        "peritonitis -> abdominal-pain",
        "volvulus -> malrotation",
      ],
      "robotic-cholecystectomy": [
        "Bile leak -> hepatic-injury-packing-repair-and-resection",
        "bile leak -> hepatic-injury-packing-repair-and-resection",
        "biloma -> hepatic-injury-packing-repair-and-resection",
        "choledocholithiasis -> choledocholithiasis",
        "incisional hernia -> ventral-and-incisional-hernia",
      ],
      "robotic-tapp-inguinal-hernia-repair": [
        "Cooper's ligament -> femoral-hernia",
        "Corona mortis -> groin-hernia-repair",
        "Femoral hernia -> femoral-hernia",
        "Lichtenstein -> groin-hernia-repair",
        "TAPP -> groin-hernia-repair",
        "Triangle of Doom -> groin-hernia-repair",
        "Watchful waiting -> inguinal-hernia",
        "corona mortis -> groin-hernia-repair",
        "iliopubic tract -> groin-hernia-repair",
        "inguinal hernia -> inguinal-hernia",
        "internal ring -> inguinal-hernia",
        "myopectineal orifice -> groin-hernia-repair",
        "peritonitis -> abdominal-pain",
        "triangle of Doom -> groin-hernia-repair",
        "triangle of Pain -> groin-hernia-repair",
      ],
      "simple-mastectomy-with-sentinel-node-biopsy": [
        "proximal and distal control -> vascular-exposure-principles",
      ],
      "temporal-artery-biopsy": [],
      "total-thyroidectomy": [
        "Recurrent laryngeal nerve -> neck-injuries-management",
        "cricothyroidotomy -> airway-access-intubation-and-surgical-airways",
        "recurrent laryngeal nerve -> neck-injuries-management",
        "tracheostomy -> airway-access-intubation-and-surgical-airways",
      ],
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

  it("does not match a playbook on anatomy from a different operation", () => {
    // Search is the cheapest detector of copy-paste between guides. "Control the common carotid
    // up to the inguinal ligament" survived review in the femoropopliteal draft and only
    // surfaced because searching "carotid" returned the leg bypass.
    //
    // Asserted as absences, not exact result sets: "carotid" legitimately matches the temporal
    // artery guide, because the superficial temporal artery is a branch of the external carotid.
    const slugs = (query: string) => searchPlaybookLibrary(query).map((playbook) => playbook.slug);
    expect(slugs("carotid")).not.toContain("femoropopliteal-bypass");
    expect(slugs("saphenous")).not.toContain("carotid-endarterectomy-bovine-patch");
    expect(slugs("saphenous")).not.toContain("temporal-artery-biopsy");
    expect(slugs("Pitanguy")).toEqual(["temporal-artery-biopsy"]);

    // Same detector, stated positively, for the six added 2026-09-13. Each of these names a
    // landmark only one operation works around, so a second slug in any of these results means
    // a paragraph was carried across from another guide.
    expect(slugs("myopectineal")).toEqual(["robotic-tapp-inguinal-hernia-repair"]);
    expect(slugs("corona mortis")).toEqual(["robotic-tapp-inguinal-hernia-repair"]);
    expect(slugs("Zuckerkandl")).toEqual(["total-thyroidectomy"]);
    expect(slugs("clavipectoral")).toEqual(["simple-mastectomy-with-sentinel-node-biopsy"]);
    expect(slugs("intercostobrachial")).toEqual(["simple-mastectomy-with-sentinel-node-biopsy"]);
    expect(slugs("node of Lund")).toEqual(["robotic-cholecystectomy"]);
    expect(slugs("Toldt")).toEqual(["right-hemicolectomy"]);
    expect(slugs("Henle")).toEqual(["right-hemicolectomy"]);
    expect(slugs("Sugarbaker")).toEqual(["colostomy-takedown-with-parastomal-hernia-repair"]);
  });
});
