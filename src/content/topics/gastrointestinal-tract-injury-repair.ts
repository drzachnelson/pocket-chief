import { buildTopic, references, sourced } from "@/content/authoring";
import { TRAUMA_GI_PACKET_SOURCE as PACKET } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-gi-summary",
    type: "summary",
    heading: "At a glance",
    text: "This topic starts where trauma laparotomy leaves off — hemorrhage controlled, contamination controlled, the bowel run end to end — and covers what happens next: diagnosing and repairing an injury in each segment of the gastrointestinal tract, from stomach to rectum. One decision governs every segment before any of the technical detail matters, which is whether the patient's physiology can tolerate a **definitive repair or anastomosis** right now, or whether the safer move is to staple or ligate the bowel ends closed, leave the gut in discontinuity, and come back within **24 hours** once resuscitation has caught up. Everything below — the duodenal grading ladder, the colon's repair-versus-diversion decision, stapled-versus-hand-sewn technique, and antibiotic duration — assumes that first call has already been made correctly.",
  }, PACKET),
  sourced({
    id: "block-gi-damage-control",
    type: "bullets",
    heading: "Damage control: staple and leave, or repair now",
    items: [
      "Hypothermia — board-classic teaching cites a core temperature of **35°C or below**, while the most-cited contemporary threshold, from the Roberts appropriateness study and the AAST/ACS damage-control resuscitation protocol, is **34°C or below**.",
      "Acidosis — a pH at or below **7.2** and/or a base deficit worse than **−14**.",
      "Coagulopathy — clinical, meaning blood that will not clot on the field, or laboratory, meaning an INR above **1.5**.",
      "Resuscitation burden — more than **10 units** of packed red cells with ongoing hemorrhage.",
      "Combined major vascular and enteric injury, inability to close the fascia without tension, or a developing abdominal compartment syndrome.",
      "Once any of these is met, the enteric principle is damage control: control contamination by **stapling or suturing** the bowel ends closed, construct **no anastomosis**, place a temporary abdominal closure, and return within **24 hours** to complete reconstruction as physiology allows.",
    ],
  }, PACKET),
  sourced({
    id: "block-gi-segment-table",
    type: "table",
    heading: "Stomach, small bowel, and rectal injury",
    columns: ["Segment", "Diagnostic pitfall or classification", "Repair"],
    rows: [
      ["Stomach", "Any anterior penetrating wound mandates opening the gastrocolic ligament to inspect the posterior wall and the underlying pancreas.", "Two-layer primary repair — inner running absorbable layer, outer Lembert seromuscular layer; stapled wedge resection for debridement; partial or total gastrectomy with delayed reconstruction for a destructive injury."],
      ["Small bowel (jejunum/ileum)", "Run the entire bowel from the ligament of Treitz to the ileocecal valve, inspecting both the mesenteric and antimesenteric borders.", "Under 50 percent circumference and non-destructive: primary transverse repair, rated WSES GRADE High. At or above 50 percent circumference, multiple adjacent tears, or mesenteric devascularization: segmental resection with anastomosis."],
      ["Rectum, intraperitoneal", "Manage like a colon injury — the peritonealized rectum behaves the same way surgically.", "Primary repair or resection with anastomosis; diversion has not been shown to improve outcomes at this level."],
      ["Rectum, extraperitoneal, non-destructive", "Below the peritoneal reflection and out of direct reach for inspection in most cases.", "Proximal fecal diversion, an EAST conditional recommendation; small transanally accessible defects may be repaired directly."],
    ],
  }, PACKET),
  sourced({
    id: "block-gi-duodenum-ladder",
    type: "sequence",
    heading: "Duodenal injury: the AAST grade ladder",
    steps: [
      { title: "AAST/WSES grade I: hematoma or partial-thickness injury", detail: "Nonoperative management — nasogastric decompression and nutritional support. Operate only if the obstruction fails to resolve; board-classic teaching quotes roughly **3 weeks**, while current WSES guidance calls for operative management if the obstruction persists beyond **14 days**." },
      { title: "AAST grade II: laceration under 50 percent circumference", detail: "Debride nonviable tissue and close transversely in two layers, then buttress with an omental patch." },
      { title: "AAST grade III", detail: "Primary tension-free repair whenever technically possible, **regardless of grade** — WSES Grade of Recommendation 2B and the dominant theme of recent literature. If repair is not feasible, segmental resection with an end-to-end duodenoduodenostomy or a Roux-en-Y duodenojejunostomy." },
      { title: "AAST grade IV–V: ampullary or combined pancreaticoduodenal injury", detail: "Unstable patient: damage control — staple or suture the injury closed, drain widely, and pack. Stable patient with a non-reconstructible injury: staged trauma pancreaticoduodenectomy (Whipple procedure), performed by an experienced surgeon." },
      { title: "Ancillary procedures", detail: "Pyloric exclusion with or without gastrojejunostomy, and biliary diversion — WSES guidance is to consider these in WSES class III or higher (AAST grade III–V), not routinely." },
    ],
  }, PACKET),
  sourced({
    id: "block-gi-duodenum-pearls",
    type: "bullets",
    heading: "Duodenal injury: pearls",
    items: [
      "Blood supply follows embryology: **D1 and D2** are supplied by the celiac axis through the superior pancreaticoduodenal artery; **D3 and D4** are supplied by the SMA through the inferior pancreaticoduodenal artery.",
      "Inspect the ampulla directly in any medial-wall D2 injury — this is where an ampullary injury gets missed.",
      "Drain widely with external drains rather than a duodenostomy tube, which carries its own fistula risk.",
      "Decompress the stomach with a nasogastric tube passed trans-pylorically.",
      "A delay of more than **24 hours** to diagnosis sharply raises morbidity and mortality; overall mortality for duodenal injury runs about **17 percent**, and duodenal fistula is its most common complication.",
    ],
  }, PACKET),
  sourced({
    id: "block-gi-duodenum-board-vs-current",
    type: "prose",
    heading: "Board answer versus current practice: duodenal reconstruction",
    text: "Board-classic teaching for a severe duodenal injury reaches for the complex adjuncts — **pyloric exclusion, triple-tube decompression**, or a formal duodenal diversion — and on an exam, naming one of these for a high-grade injury is the expected answer. Current data point the other way: primary repair should be attempted **whenever technically possible, regardless of grade**, because the complex reconstructive options carry higher complication rates and are best reserved for injuries that truly cannot be repaired primarily. Both are true at once — know the classic adjuncts by name for the test, and know that contemporary practice reaches for them less often than the boards imply.",
  }, PACKET),
  sourced({
    id: "block-gi-colon-flow",
    type: "flow",
    heading: "Colon injury: repair or diversion",
    nodes: [
      { id: "injury", label: "Colon injury identified after the bowel has been run and hemorrhage is controlled" },
      { id: "nondestructive", label: "Non-destructive — under 50 percent circumference" },
      { id: "destructive", label: "Destructive — 50 percent or more circumference, or a devascularized segment" },
      { id: "primary", label: "Primary repair", tone: "good" },
      { id: "physiology", label: "Assess physiology: stable versus persistent instability, profound shock, severe comorbidity, severe loss of domain, or damage control" },
      { id: "resection", label: "Resection with primary anastomosis", tone: "good" },
      { id: "diversion", label: "Colostomy or Hartmann procedure", tone: "caution" },
    ],
    edges: [
      { from: "injury", to: "nondestructive", label: "AAST grade I–II" },
      { from: "injury", to: "destructive", label: "AAST grade III or higher" },
      { from: "nondestructive", to: "primary" },
      { from: "destructive", to: "physiology" },
      { from: "physiology", to: "resection", label: "stable, adequate reserve" },
      { from: "physiology", to: "diversion", label: "unstable, profound shock, severe comorbidity, severe loss of domain, or damage control" },
    ],
  }, PACKET),
  sourced({
    id: "block-gi-colon-detail",
    type: "bullets",
    heading: "Colon injury: what the data show",
    items: [
      "Non-destructive colon injury (AAST grade I–II, under 50 percent circumference): recent EAST multicenter data show primary repair carries fewer infectious complications and a shorter length of stay than resection with anastomosis.",
      "Destructive colon injury (50 percent or more circumference, or a devascularized segment): resection with primary anastomosis is standard for most patients — meta-analysis and TQIP data support liberal use of anastomosis, reserving fecal diversion for the critically ill or damage-control patient, in whom the leak rate rises to roughly **16.7 percent**.",
      "Colostomy or a Hartmann procedure is reserved for persistent hemodynamic instability, profound shock, severe comorbidity, severe loss of domain, or damage control.",
      "Concomitant severe pancreatic injury was historically taught as a contraindication to colonic anastomosis. Recent propensity-matched TQIP data found primary anastomosis was **not** associated with increased surgical site infection or reoperation even with an associated severe pancreatic injury — classic teaching and the emerging data diverge here.",
    ],
  }, PACKET),
  sourced({
    id: "block-gi-rectal-adjuncts",
    type: "warning",
    tone: "danger",
    heading: "Extraperitoneal rectal injury: retired adjuncts",
    text: "Presacral drainage and distal rectal washout are **no longer recommended** for extraperitoneal rectal injury. Both are independently associated with roughly a **threefold increase** in abdominal complications, and EAST conditionally recommends against each of them. The classic Burch and Feliciano triad — colostomy plus presacral drainage plus rectal washout — is now largely obsolete in civilian practice; **diversion alone** is the current standard. Know the historical triad by name, because it remains a recognizable exam distractor, but do not reach for the drain or the washout at the table.",
  }, PACKET),
  sourced({
    id: "block-gi-anastomosis-technique",
    type: "prose",
    heading: "Stapled versus hand-sewn anastomosis",
    text: "Neither stapled nor hand-sewn anastomosis has proven superior after traumatic bowel injury, and the evidence base is unusually strong on this point: WSES rates it **GRADE High** that neither technique is superior, leaving the choice individualized to patient and surgeon. A 2024 meta-analysis (Le et al.) found no difference in anastomotic leak or composite complications between the two approaches. Some retrospective series and Western Trauma Association data have historically favored a hand-sewn repair, but the AAST prospective multi-institutional study found that anastomotic technique was **not** an independent predictor of outcome — an open abdomen and the degree of contamination were.",
  }, PACKET),
  sourced({
    id: "block-gi-antibiotics",
    type: "bullets",
    heading: "Antibiotic duration",
    items: [
      "Traumatic bowel perforation operated on within **12 hours** of injury: the Surgical Infection Society recommends **24 hours or less** of antibiotics (Grade 1-A) — the single highest-yield point here, and it differs from the number most people reflexively quote from STOP-IT.",
      "Established intra-abdominal infection with adequate source control — for example a delayed presentation or gross contamination: the STOP-IT trial found a fixed course of roughly **4 days** (96 hours or less) equivalent to longer symptom-guided therapy for the composite outcome (**21.8 percent versus 22.3 percent**).",
      "Critically ill patients in whom source control has been achieved: the 2024 Surgical Infection Society update suggests up to **8 days** is reasonable (Grade 2-B).",
    ],
  }, PACKET),
  sourced({
    id: "block-gi-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "A seatbelt sign with a **Chance fracture** (T10–L2) should raise suspicion for hollow viscus perforation and mesenteric shear — a classic if-you-see-this-think-that pairing.",
      "If a Pringle maneuver fails to stop liver bleeding, the source is the **retrohepatic vena cava or a hepatic vein**, not the portal triad.",
      "Any anterior penetrating gastric wound requires opening the lesser sac to inspect the posterior wall.",
      "Duodenal injury diagnosed more than **24 hours** after the injury carries a sharply higher fistula and mortality risk — duodenal fistula is the most common complication of a missed or delayed repair.",
      "An extraperitoneal rectal injury calls for diversion — **not** a presacral drain and **not** a rectal washout, both of which are independent risk factors for complications.",
      "A destructive colon injury in a stable patient is resected and anastomosed, not diverted — reserve colostomy for the unstable patient or the one who has undergone damage control.",
      "A traumatic bowel perforation repaired within the early window needs only **24 hours** of antibiotics.",
      "Once damage control is committed to, the job is contamination control only — no anastomosis, a temporary closure, and a return within **24 hours**.",
    ],
  }, PACKET),
  references("block-gi-references", [PACKET]),
];

export const gastrointestinalTractInjuryRepairTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000001213",
  versionId: "00000000-0000-4000-8000-000000001223",
  slug: "gastrointestinal-tract-injury-repair",
  title: "Gastrointestinal Tract Injury Repair",
  aliases: ["GI tract injury", "gastrointestinal trauma", "bowel injury repair", "damage control laparotomy", "staple and leave", "duodenal injury", "AAST duodenal grade", "pyloric exclusion", "trauma pancreaticoduodenectomy", "colon injury repair", "destructive colon injury", "primary anastomosis in trauma", "Hartmann procedure", "extraperitoneal rectal injury", "presacral drainage", "rectal washout", "STOP-IT trial", "stapled versus hand-sewn anastomosis", "gastric injury repair", "small bowel injury repair", "WSES bowel injury guidelines", "hollow viscus injury", "Whipple for trauma", "duodenoduodenostomy", "Roux-en-Y duodenojejunostomy"],
  scoreNodeId: "trauma-procedures",
  scoreCategory: "SCORE · Trauma · Operations & Procedures",
  tags: ["trauma", "bowel-injury", "operative-technique", "damage-control", "absite", "score"],
  sourceId: PACKET,
  blocks,
  reviewedAt: "2026-08-18T00:00:00.000Z",
});
