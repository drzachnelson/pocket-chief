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
      // Venous batch: reviewed anatomic and clinical destinations. Pleural air/bleeding
      // was reworded in the rib guide because the bare terms reached the trauma FAST topic.
      "ivc-filter-placement-and-retrieval": ["cavogram -> vena-cava-filter-insertion"],
      "first-rib-resection-for-venous-thoracic-outlet-syndrome": [
        "UEDVT -> deep-venous-thrombosis",
        "thoracic duct injury -> neck-injuries-management",
        "upper-extremity DVT -> deep-venous-thrombosis",
      ],
      "open-venous-thrombectomy": [
        "fasciotomy -> fasciotomy",
        "iliofemoral DVT -> deep-venous-thrombosis",
      ],
      "endovenous-ablation": [
        "proximal DVT -> deep-venous-thrombosis",
        "superficial thrombophlebitis -> thrombophlebitis",
        "varicosities -> varicose-veins",
      ],
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
        // Added with the two carotid topics 2026-10-11: each names the same operation or its complications.
        "Carotid endarterectomy -> procedures-for-carotid-artery-stenosis",
        "Cerebral hyperperfusion syndrome -> procedures-for-carotid-artery-stenosis",
        "Post-endarterectomy hypertension -> procedures-for-carotid-artery-stenosis",
        "amaurosis fugax -> carotid-artery-disease",
        "common facial vein -> neck-injuries-management",
        "recurrent laryngeal nerve -> neck-injuries-management",
        "tracheostomy -> airway-access-intubation-and-surgical-airways",
      ],
      // Reviewed 2026-10-11. "ROADSTER" was dropped from the procedures topic's aliases instead of
      // pinned here: that topic never discusses the trial, so the link promised content it lacks.
      // Rewritten against the OpenEvidence guide 2026-10-11. "heart failure" is kept: it is a physiologic
      // high-risk criterion and names the same condition. Rejected and reworded: "carotid; duplex" reached
      // the carotid duplex alias across a semicolon in the redo-neck bullet. Accepted October 12: "arterial line"
      // for the radial monitoring line. Reworded: "clamp the arterial line" meant the circuit's arterial limb.
      "transcarotid-artery-revascularization": [
        "Hyperperfusion syndrome -> procedures-for-carotid-artery-stenosis",
        "TCAR -> procedures-for-carotid-artery-stenosis",
        "arterial line -> vascular-access",
        "carotid stenting -> procedures-for-carotid-artery-stenosis",
        "flow reversal -> procedures-for-carotid-artery-stenosis",
        "flow-reversal -> procedures-for-carotid-artery-stenosis",
        "heart failure -> cardiac-failure-and-cardiogenic-shock",
        "tracheostomy -> airway-access-intubation-and-surgical-airways",
      ],
      "colostomy-takedown-with-parastomal-hernia-repair": [
        "Duodenal injury -> gastrointestinal-tract-injury-repair",
        "Keyhole mesh -> ventral-and-incisional-hernia",
        "Marginal artery of Drummond -> colostomy-and-colostomy-closure",
        "Mesh infection -> abdominal-wall-reconstruction",
        "Parastomal hernia -> ventral-and-incisional-hernia",
        "Retrorectus -> abdominal-wall-reconstruction",
        "Splenic injury -> splenic-injury",
        "Sugarbaker -> ventral-and-incisional-hernia",
        "abdominal wall reconstruction -> abdominal-wall-reconstruction",
        "arc of Riolan -> colostomy-and-colostomy-closure",
        "incisional hernia -> ventral-and-incisional-hernia",
        "inferior mesenteric artery -> abdominal-and-aortoiliac-aneurysm-repair",
        "loop ileostomy -> ileostomy-and-ileostomy-closure",
        "marginal artery of Drummond -> colostomy-and-colostomy-closure",
        "parastomal hernia -> ventral-and-incisional-hernia",
        "peritonitis -> abdominal-pain",
        "rectal stump -> total-and-subtotal-colectomy",
        "small bowel obstruction -> small-intestinal-obstruction",
        "splenectomy -> splenectomy-and-splenorrhaphy",
        "sublay mesh -> abdominal-wall-reconstruction",
        "transversus abdominis release -> abdominal-wall-reconstruction",
      ],
      // The aortic cluster's playbooks, reviewed 2026-10-22. Every destination is the topic a reader of that line would
      // want; "arterial line" follows the October 12 acceptance. Reworded instead: "Prone positioning" reached ARDS.
      "open-popliteal-aneurysm-repair": [
        "Compartment syndrome -> fasciotomy",
        "Fasciotomy -> fasciotomy",
        "Rutherford -> fasciotomy",
        "abdominal aortic aneurysm -> aortic-aneurysms",
        "acute limb ischemia -> acute-limb-ischemia",
        "arterial line -> vascular-access",
        "atrial fibrillation -> common-cardiac-arrhythmias",
        "compartment pressure -> fasciotomy",
        "deep vein thrombosis -> deep-venous-thrombosis",
        "delta pressure -> fasciotomy",
        "fasciotomy -> fasciotomy",
        "four-compartment fasciotomy -> fasciotomy",
        "hyperkalemia -> derangements-of-electrolytes-and-acid-base-balance",
        "metabolic acidosis -> derangements-of-electrolytes-and-acid-base-balance",
        "popliteal aneurysm -> arterial-peripheral-aneurysms",
        "renal failure -> renal-failure",
        "reperfusion injury -> fasciotomy",
        "rhabdomyolysis -> fasciotomy",
        "thrombosed popliteal aneurysm -> peripheral-aneurysms-repair",
      ],
      "femoropopliteal-bypass": [
        "Compartment syndrome -> fasciotomy",
        "Fasciotomy -> fasciotomy",
        // Added with the aortic aneurysm cluster 2026-10-22: the bullet names popliteal aneurysm as the pathology
        // being bypassed, and the disease topic is where its thresholds and approach choice live.
        "Popliteal aneurysm -> arterial-peripheral-aneurysms",
        "Rhabdomyolysis -> fasciotomy",
        // Added with the DVT topic 2026-10-10: late leg swelling after bypass is worked up for exactly this.
        "deep vein thrombosis -> deep-venous-thrombosis",
        "fasciotomy -> fasciotomy",
        "four-compartment fasciotomy -> fasciotomy",
      ],
      // The open Whipple guide added 2026-10-04 was reviewed the same way. "Kocher maneuver" is kept:
      // abdominal exploration describes the same manoeuvre. Rejected and reworded in the playbook:
      // "ligament of Treitz" reached malrotation from a jejunal division, the same false positive as
      // "duodenojejunal junction" before it, and "bile leak" reached hepatic trauma from a
      // hepaticojejunostomy leak, which is managed nothing like a liver-injury leak.
      //
      // Two aliases were narrowed at the source instead, both bare terms rather than domain ones:
      // "venorrhaphy" left neck injuries, which keeps "internal jugular vein injury", and
      // "pancreatic fistula" left splenectomy for the pancreaticoduodenectomy topic, which defines
      // and grades it. That moves the right hemicolectomy's pancreatic-head row with it.
      "open-pancreaticoduodenectomy": [
        // Kept: the biliary limb of the reconstruction is a hepaticojejunostomy, and its technique lives there.
        "Hepaticojejunostomy -> choledochoenteric-anastomosis",
        "Kocher maneuver -> abdominal-exploration",
        "MAPLE-PD -> pancreaticoduodenectomy",
        "Pancreaticojejunostomy -> pancreaticoduodenectomy",
        "SMA margin -> pancreaticoduodenectomy",
        "Whipple -> pancreaticoduodenectomy",
        "hepaticojejunostomy -> choledochoenteric-anastomosis",
        // Kept: hepatic artery injury and a biliary-enteric anastomosis are listed postoperative causes there.
        "liver abscess -> hepatic-abscess",
        "pancreatic fistula -> pancreaticoduodenectomy",
        "pancreaticoduodenectomy -> pancreaticoduodenectomy",
        "pancreaticojejunostomy -> pancreaticoduodenectomy",
        "pancreatoduodenectomy -> pancreaticoduodenectomy",
        // Kept: the replaced hepatic arteries are dissected in the hepatoduodenal ligament here, and
        // Hepatic Resection is where their anatomy and frequency live.
        "replaced left hepatic artery -> hepatic-resection",
        "replaced right hepatic artery -> hepatic-resection",
      ],
      // Call Problems I (2026-10-23): bare "volvulus" no longer reaches Malrotation. That alias was
      // narrowed to "midgut volvulus" once Colonic Volvulus and Obstruction arrived, because it was also
      // catching gastric and sigmoid volvulus. "detorsion" stays unlinked: Ladd's procedure is a different operation.
      "right-hemicolectomy": [
        "Pancreatitis -> acute-pancreatitis",
        "appendicitis -> appendicitis",
        "pancreatic fistula -> pancreaticoduodenectomy",
        "peritonitis -> abdominal-pain",
        "small bowel obstruction -> small-intestinal-obstruction",
      ],
      "robotic-cholecystectomy": [
        "Acute cholecystitis -> symptomatic-gallstones-and-cholecystitis",
        "Bile duct injury -> iatrogenic-bile-duct-injury",
        "Cirrhosis -> cirrhosis-and-portal-hypertension",
        "Gallstone pancreatitis -> acute-pancreatitis",
        "Mirizzi syndrome -> benign-biliary-obstruction",
        "Roux-en-Y hepaticojejunostomy -> choledochoenteric-anastomosis",
        "acute cholecystitis -> symptomatic-gallstones-and-cholecystitis",
        "bile duct injury -> iatrogenic-bile-duct-injury",
        "biliary colic -> symptomatic-gallstones-and-cholecystitis",
        "choledocholithiasis -> choledocholithiasis",
        "cholelithiasis -> symptomatic-gallstones-and-cholecystitis",
        "critical view of safety -> iatrogenic-bile-duct-injury",
        "duct of Luschka -> iatrogenic-bile-duct-injury",
        "hepaticojejunostomy -> choledochoenteric-anastomosis",
        "hepatocystic triangle -> iatrogenic-bile-duct-injury",
        "incisional hernia -> ventral-and-incisional-hernia",
        "laparoscopic cholecystectomy -> symptomatic-gallstones-and-cholecystitis",
        "pancreatitis -> acute-pancreatitis",
        "portal hypertension -> cirrhosis-and-portal-hypertension",
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
        "mechanical prophylaxis -> prophylaxis-of-venous-thromboembolism",
        "myopectineal orifice -> groin-hernia-repair",
        "peritonitis -> abdominal-pain",
        "triangle of Doom -> groin-hernia-repair",
        "triangle of Pain -> groin-hernia-repair",
      ],
      // The robotic ventral/umbilical guide added 2026-09-13 was reviewed the same way, and it
      // links more widely than the others because the three abdominal-wall topics genuinely own
      // its vocabulary. Rejected and reworded in the playbook: "TAPP" reached groin hernia repair
      // from a ventral port-placement sentence, "mesh repair" reached it again from the cirrhotic
      // emergency scenario, and "watchful waiting" reached the inguinal hernia trials from a
      // Dutch umbilical observation cohort — the same false positive caught once before.
      //
      // "arcuate line" is kept although it resolves to rectus sheath haematoma rather than to
      // abdominal wall reconstruction, which lists it too: the sentence states the exact
      // anatomical fact the haematoma topic turns on, that there is no posterior sheath below
      // the line. "semilunar line" is kept for the same reason — an iatrogenic lateral hernia
      // at that border is a Spigelian hernia, which is what the unusual-hernias topic covers.
      // "onlay" is kept here though it was rejected from the mastectomy-era review: there it was
      // an anterior inguinal onlay, here it is the mesh position abdominal wall reconstruction
      // owns.
      "robotic-ventral-umbilical-hernia-repair": [
        "Arcuate line -> rectus-sheath-hematoma",
        "Cirrhosis -> cirrhosis-and-portal-hypertension",
        "Diastasis recti -> umbilical-and-epigastric-hernia",
        "Linea alba -> umbilical-and-epigastric-hernia",
        "Loss of domain -> ventral-and-incisional-hernia",
        "Retrorectus -> abdominal-wall-reconstruction",
        "Rives-Stoppa -> abdominal-wall-reconstruction",
        "ascites -> cirrhosis-and-portal-hypertension",
        "component separation -> abdominal-wall-reconstruction",
        "loss of domain -> ventral-and-incisional-hernia",
        "mechanical prophylaxis -> prophylaxis-of-venous-thromboembolism",
        "mesh infection -> abdominal-wall-reconstruction",
        "onlay -> abdominal-wall-reconstruction",
        "preoperative botulinum toxin -> ventral-and-incisional-hernia",
        "progressive pneumoperitoneum -> ventral-and-incisional-hernia",
        "retrorectus -> abdominal-wall-reconstruction",
        "semilunar line -> unusual-hernias",
        "small bowel obstruction -> small-intestinal-obstruction",
        "transversus abdominis release -> abdominal-wall-reconstruction",
        "umbilical hernia -> umbilical-and-epigastric-hernia",
        "ventral hernia -> ventral-and-incisional-hernia",
      ],
      // Reviewed 2026-10-22 with the aortic cluster. Reworded instead: "find the vein fast" reached the FAST exam,
      // the same false positive as "a fast one" before it.
      "saphenous-vein-harvest": [
        "VTE prophylaxis -> prophylaxis-of-venous-thromboembolism",
        "arterial line -> vascular-access",
        "lymphedema -> evaluation-of-a-swollen-leg",
        "proximal and distal control -> vascular-exposure-principles",
        "thrombophlebitis -> thrombophlebitis",
        "varicosities -> varicose-veins",
      ],
      // Reviewed 2026-10-30 with the pancreatic tail cluster. Reworded instead: "chronic pancreatitis" reached Acute
      // Pancreatitis. "left-sided portal hypertension" is claimed by the tail mass topic so it stops reaching cirrhosis.
      "robotic-distal-pancreatectomy": [
        "IPMN -> pancreatic-tail-mass",
        "ISGPS -> pancreaticoduodenectomy",
        "RAMPS -> pancreatic-tail-mass",
        "biochemical leak -> pancreaticoduodenectomy",
        "branch-duct IPMN -> pancreatic-tail-mass",
        "cyst fluid CEA -> pancreatic-tail-mass",
        "left-sided portal hypertension -> pancreatic-tail-mass",
        "main-duct IPMN -> pancreatic-tail-mass",
        "mucinous cystic neoplasm -> pancreatic-tail-mass",
        "pancreatoduodenectomy -> pancreaticoduodenectomy",
        "serous cystadenoma -> pancreatic-tail-mass",
        "splenectomy -> splenectomy-and-splenorrhaphy",
        "splenic mobilization -> splenectomy-and-splenorrhaphy",
        "worrisome features -> pancreatic-tail-mass",
      ],
      // HIPEC / pseudomyxoma batch, reviewed 2026-11-01. Every destination names the same stoma, electrolyte,
      // prophylaxis or vessel the line is about; the IMA, peritonitis and rectal stump rows follow the colostomy pins.
      "open-low-anterior-resection": [
        "Stoma necrosis -> ileostomy-and-ileostomy-closure",
        "VTE prophylaxis -> prophylaxis-of-venous-thromboembolism",
        "colostomy -> colostomy-and-colostomy-closure",
        "hyponatremia -> derangements-of-electrolytes-and-acid-base-balance",
        "ileostomy -> ileostomy-and-ileostomy-closure",
        "inferior mesenteric artery -> abdominal-and-aortoiliac-aneurysm-repair",
        "loop colostomy -> colostomy-and-colostomy-closure",
        "loop ileostomy -> ileostomy-and-ileostomy-closure",
        "peritonitis -> abdominal-pain",
        "rectal stump -> total-and-subtotal-colectomy",
      ],
      // Reworded instead: "prone jackknife" reached hemorrhoid procedures, and "stoma necrosis" reached the ileostomy topic
      // from an end colostomy.
      "open-abdominoperineal-resection": [
        "End colostomy -> colostomy-and-colostomy-closure",
        "colostomy -> colostomy-and-colostomy-closure",
        "end colostomy -> colostomy-and-colostomy-closure",
        "inferior mesenteric artery -> abdominal-and-aortoiliac-aneurysm-repair",
        "perineal hernia -> unusual-hernias",
      ],
      "simple-mastectomy-with-sentinel-node-biopsy": [
        "intermittent pneumatic compression -> prophylaxis-of-venous-thromboembolism",
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
    // The transaxillary rib exposure also protects this nerve in the axilla.
    expect(slugs("intercostobrachial")).toEqual(["first-rib-resection-for-venous-thoracic-outlet-syndrome", "simple-mastectomy-with-sentinel-node-biopsy"]);
    expect(slugs("node of Lund")).toEqual(["robotic-cholecystectomy"]);
    // The white line of Toldt is taken down on the left for a rectal resection as on the right for a colectomy.
    expect(slugs("Toldt")).toEqual(["open-abdominoperineal-resection", "open-low-anterior-resection", "right-hemicolectomy"]);
    // Henle's gastrocolic trunk is genuinely on both operations' path — divided to reach the inferior
    // pancreatic neck in a Whipple, and to reach the middle colic root in a right colectomy.
    expect(slugs("Henle")).toEqual(["open-pancreaticoduodenectomy", "right-hemicolectomy"]);
    expect(slugs("Sugarbaker")).toEqual(["colostomy-takedown-with-parastomal-hernia-repair"]);
    expect(slugs("lamppost")).toEqual(["robotic-ventral-umbilical-hernia-repair"]);
    expect(slugs("eTEP")).toEqual(["robotic-ventral-umbilical-hernia-repair"]);
    expect(slugs("linea semilunaris")).toEqual(["robotic-ventral-umbilical-hernia-repair"]);
    expect(slugs("median arcuate")).toEqual(["open-pancreaticoduodenectomy"]);
    expect(slugs("Blumgart")).toEqual(["open-pancreaticoduodenectomy"]);
  });
});
