import { buildTopic, references, sourced } from "@/content/authoring";
import { TRAUMA_HEPATIC_PACKET_SOURCE as PACKET } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-hepatic-summary",
    type: "summary",
    heading: "At a glance",
    text: "The liver is the **most commonly injured abdominal solid organ** in both blunt and penetrating trauma, and hemorrhage control turns on a single anatomic fact: roughly **75 to 80 percent** of hepatic blood flow arrives through the low-pressure, high-volume portal vein and **20 to 25 percent** through the high-pressure hepatic artery. That dual supply is why the **Pringle maneuver** — occluding both inflow structures at the porta hepatis — both diagnoses and controls inflow bleeding, while bleeding from the retrohepatic IVC or hepatic veins continues right through it. Hemodynamic stability, not the CT grade, is the fork in the algorithm: a stable patient earns a dual-phase CT that can trigger angioembolization for a vascular blush, while instability or peritonitis goes straight to the operating room regardless of grade. This topic covers the anatomy that drives operative decisions, the 2018 AAST liver injury scale, nonoperative management, and the operative escalation from perihepatic packing through Pringle, hepatotomy, and resectional debridement, including lethal-zone management of juxtahepatic venous injury.",
  }, PACKET),
  sourced({
    id: "block-hepatic-pathophysiology",
    type: "bullets",
    heading: "Pathophysiology and blood supply",
    items: [
      "Death from hepatic injury is driven by **exsanguination early** and **sepsis or hepatic necrosis late**.",
      "The dual blood supply explains the hemorrhage-control strategy: roughly **75 to 80 percent** of inflow is portal venous (low-pressure, high-volume) and **20 to 25 percent** is hepatic arterial (high-pressure); the **Pringle maneuver**, which occludes both, diagnoses and controls inflow bleeding but does not touch retrohepatic IVC or hepatic vein bleeding.",
      "The common or proper hepatic artery can be ligated when necessary because the **gastroduodenal artery** provides retrograde collateral flow; the **portal vein must be repaired**, not ligated, since it has no comparable collateral.",
      "**Blunt** injury results from deceleration and shear along fixed points such as the hepatic veins and ligaments, most often injuring the **posterior right lobe (roughly 80 percent)**; **penetrating** injury causes a direct tract laceration with or without cavitation.",
    ],
  }, PACKET),
  sourced({
    id: "block-hepatic-most-injured",
    type: "prose",
    heading: "Liver or spleen: which organ is injured most often",
    text: "Two of the supplied packets answer this differently, and the disagreement is worth keeping rather than resolving. This packet calls the liver the **most commonly injured abdominal solid organ in both blunt and penetrating trauma**; the splenic packet calls the spleen the **most commonly injured solid organ in blunt abdominal trauma**. They are almost certainly counting different denominators. The spleen claim is the classic blunt-mechanism teaching and is the answer a question about **blunt** abdominal trauma is asking for. The liver claim pools blunt with penetrating, where the liver\u2019s size and anterior position make it the organ most often in the tract of a wound, and it reflects contemporary registry series in which the liver leads overall. The practical reading: name the **spleen** when the question specifies blunt trauma, name the **liver** when the question is about penetrating trauma or about all mechanisms together, and treat any source that states one without naming the mechanism as incomplete.",
  }, PACKET),
  sourced({
    id: "block-hepatic-anatomy",
    type: "bullets",
    heading: "Anatomy and surgical landmarks",
    items: [
      "In the hepatoduodenal ligament, the **common bile duct** lies anterolateral, the **proper hepatic artery** anteromedial, and the **portal vein** posterior; this trio is exactly what the Pringle maneuver clamps.",
      "**Cantlie's line** runs from the gallbladder fossa to the IVC and divides the functional right and left hemiliver along the plane of the middle hepatic vein.",
      "The right, middle, and left hepatic veins drain into the IVC, with the middle and left sharing a common trunk in roughly **80 percent** of people; the caudate lobe (segment I) drains directly into the retrohepatic IVC through short veins.",
      "Arterial variants matter when bleeding persists despite a Pringle maneuver: a **replaced right hepatic artery off the SMA** occurs in roughly **10 to 20 percent** of patients and runs posterolateral to the common bile duct, and a **replaced left hepatic artery off the left gastric artery** runs in the gastrohepatic ligament.",
      "Full exposure for packing or repair requires dividing the **falciform, coronary, and triangular ligaments** to mobilize and deliver the dome.",
    ],
  }, PACKET),
  sourced({
    id: "block-hepatic-diagnosis",
    type: "bullets",
    heading: "Clinical presentation and diagnostic triage",
    items: [
      "Hemodynamics, not the CT grade, drive the management algorithm.",
      "**e-FAST** is the first-line bedside screen, checking Morrison's pouch (hepatorenal), the splenorenal space, the pelvis, and the pericardium; it is operator-dependent, misses the retroperitoneum, and does not localize the bleeding source.",
      "**CT of the abdomen and pelvis with IV contrast**, obtained in both arterial and portal venous phases, is the gold standard in the hemodynamically stable patient: it defines laceration depth, hematoma, pseudoaneurysm or AV fistula, and active contrast extravasation — the **blush** that triggers angioembolization.",
      "An unstable patient or a non-responder to resuscitation goes to the operating room regardless of grade.",
    ],
  }, PACKET),
  sourced({
    id: "block-hepatic-triage-flow",
    type: "flow",
    heading: "Stability-driven triage: NOM, angioembolization, or laparotomy",
    nodes: [
      { id: "present", label: "Suspected hepatic injury after blunt or penetrating trauma" },
      { id: "unstable", label: "Hemodynamically unstable or non-responder", tone: "caution" },
      { id: "or", label: "Laparotomy, regardless of grade", tone: "caution" },
      { id: "stable", label: "Hemodynamically stable" },
      { id: "ct", label: "Dual-phase IV-contrast CT (arterial and portal venous)" },
      { id: "blush", label: "Active extravasation, pseudoaneurysm, or AV fistula (\"blush\")", tone: "caution" },
      { id: "noblush", label: "No vascular injury on CT" },
      { id: "ae", label: "Angioembolization", tone: "good" },
      { id: "nom", label: "Continue nonoperative management with serial monitoring", tone: "good" },
    ],
    edges: [
      { from: "present", to: "unstable", label: "unstable or non-responder" },
      { from: "present", to: "stable", label: "stable" },
      { from: "unstable", to: "or" },
      { from: "stable", to: "ct" },
      { from: "ct", to: "blush" },
      { from: "ct", to: "noblush" },
      { from: "blush", to: "ae", label: "stable or transient responder" },
      { from: "noblush", to: "nom" },
    ],
  }, PACKET),
  sourced({
    id: "block-hepatic-aast-context",
    type: "prose",
    heading: "AAST liver injury scale, 2018 revision",
    text: "The pivotal change in the 2018 revision is that vascular injury — pseudoaneurysm, AV fistula, or active bleeding — is now incorporated directly into the grade from CT rather than assessed only at operation, which upgrades many injuries that would have been graded lower under the older scale.",
  }, PACKET),
  sourced({
    id: "block-hepatic-aast-table",
    type: "table",
    heading: "AAST liver injury grading",
    columns: ["Grade", "Hematoma", "Laceration / Vascular"],
    rows: [
      ["I", "Subcapsular <10% surface", "Capsular tear <1 cm depth"],
      ["II", "Subcapsular 10 to 50%; intraparenchymal <10 cm", "1 to 3 cm depth, <10 cm length"],
      ["III", "Subcapsular >50% or ruptured/expanding; intraparenchymal >10 cm or expanding", ">3 cm depth; any vascular injury or active bleed contained within the parenchyma"],
      ["IV", "—", "Parenchymal disruption 25 to 75% of a lobe or 1 to 3 Couinaud segments; active bleeding beyond the parenchyma into the peritoneum"],
      ["V", "—", ">75% of a lobe or >3 segments; juxtahepatic venous injury (retrohepatic IVC or central hepatic veins)"],
      ["VI", "—", "Hepatic avulsion (lethal)"],
    ],
  }, PACKET),
  sourced({
    id: "block-hepatic-aast-distribution",
    type: "bullets",
    heading: "Grade distribution",
    items: [
      "Roughly **60 percent** of hepatic injuries are grade I to II, about **20 percent** are grade III, about **15 percent** are grade IV, and about **5 percent** are grade V.",
      "Grade IV and V injuries together make up roughly **12 to 20 percent** of hepatic injuries.",
    ],
  }, PACKET),
  sourced({
    id: "block-hepatic-nom",
    type: "bullets",
    heading: "Nonoperative management",
    items: [
      "Nonoperative management is the **standard of care for all hemodynamically stable patients**, whatever the blunt-injury grade, including grade IV and V, as long as no other indication for laparotomy exists; success is roughly **85 to 90 percent** or higher.",
      "Requirements include serial abdominal exams, serial hemoglobin/hematocrit checks, a monitored or ICU setting for high-grade injuries, and immediate access to the operating room, angiography, and blood products.",
      "Angioembolization is indicated for a stable or transient responder with an arterial blush, pseudoaneurysm, or AV fistula on CT, and for delayed or secondary hemorrhage.",
      "Failure signals are hemodynamic deterioration, peritonitis, and an ongoing transfusion requirement.",
      "Older teaching emphasized grade-based operative thresholds and strict, prolonged bed rest; current practice is physiology-driven, and nonoperative management succeeds even in grade IV and V injuries as long as the patient stays stable.",
    ],
  }, PACKET),
  sourced({
    id: "block-hepatic-operative-indications",
    type: "bullets",
    heading: "Indications for operation",
    items: [
      "Operative indications are hemodynamic instability or non-response to resuscitation, peritonitis, evisceration, impalement, or a concomitant injury that itself requires laparotomy.",
      "Peitzman's **\"6 P's\"** strategy frames the operative sequence: **Push, Pack, Pringle, Put back, Phone, Pivot**.",
    ],
  }, PACKET),
  sourced({
    id: "block-hepatic-operative-sequence",
    type: "sequence",
    heading: "Operative escalation: packing through resection",
    steps: [
      {
        title: "Exposure and perihepatic packing",
        detail: "Perform a midline laparotomy, eviscerate, and evacuate the hemoperitoneum, packing all four quadrants and dividing the falciform ligament to reach the dome. Place pads above the dome (subphrenic) and below it (subhepatic) to reapproximate the fractured parenchyma into its native position and tamponade the bleeding — the safest and most successful method for a juxtahepatic venous injury. Never pack inside a laceration itself; doing so widens the fracture and worsens deep venous or biliary injury.",
      },
      {
        title: "Pringle maneuver",
        detail: "Place an atraumatic clamp or Rummel tourniquet across the hepatoduodenal ligament. Tolerable ischemia is roughly **15 to 20 minutes** at normothermia, with intermittent release extending that tolerance. If bleeding stops, the source is inflow (hepatic artery or portal vein); if bleeding continues despite the clamp, suspect a retrohepatic IVC or hepatic vein injury, or an aberrant hepatic artery.",
      },
      {
        title: "Hepatotomy with selective ligation",
        detail: "For superficial bleeding, use manual compression, electrocautery, argon beam, topical hemostatics or fibrin sealant, omental packing, or simple suture. For deep bleeding, perform hepatotomy or finger fracture to expose and selectively suture-ligate or clip the bleeding vessels and bile radicles, then pack the dead space with a vascularized omental flap. Repair the hepatic artery when possible, or ligate it selectively; if the right or common hepatic artery is ligated, add a cholecystectomy to prevent gallbladder necrosis. Repair the portal vein primarily rather than ligating it — ligation risks liver necrosis and massive bowel edema and is a last resort reserved for an intact hepatic artery.",
      },
      {
        title: "Resectional debridement",
        detail: "Prefer non-anatomic resectional debridement of devitalized tissue, especially in a damage-control operation. Avoid formal anatomic lobectomy at the index operation; reserve it for a staged operation by an experienced surgeon addressing a large devitalized region, since performing it emergently carries a high mortality.",
      },
    ],
  }, PACKET),
  sourced({
    id: "block-hepatic-retrohepatic",
    type: "bullets",
    heading: "Retrohepatic IVC and juxtahepatic venous injury",
    items: [
      "This is the \"lethal zone\": options are **tamponade with packing** (the least risky and preferred approach), **direct repair with or without vascular isolation**, or **lobar resection**.",
      "**Total hepatic vascular isolation** combines supraceliac aortic control (or REBOA) with a Pringle maneuver, an infrahepatic IVC clamp above the renal veins, and a suprahepatic IVC clamp.",
      "The **atriocaval (Schrock) shunt** was historically described for this injury but is rarely used today given its dismal survival; damage-control packing is favored instead.",
    ],
  }, PACKET),
  sourced({
    id: "block-hepatic-pringle-warning",
    type: "warning",
    heading: "Pringle does not control retrohepatic bleeding",
    tone: "danger",
    text: "The Pringle maneuver occludes the hepatic artery and portal vein at the porta hepatis, so it stops inflow bleeding but does nothing for the retrohepatic IVC or hepatic veins. If hemorrhage continues despite an adequately placed Pringle clamp, stop assuming an inflow source and think **retrohepatic IVC or hepatic vein injury**, or an aberrant hepatic artery arising outside the clamped pedicle.",
  }, PACKET),
  sourced({
    id: "block-hepatic-schrock-prose",
    type: "prose",
    heading: "Board answer versus current practice",
    text: "The **atriocaval (Schrock) shunt** remains a keyed board answer for juxtahepatic venous injury — a tube shunted through the right atrium into the infrahepatic IVC to control retrohepatic bleeding while the injury is repaired. In current practice it is rarely performed and carries dismal survival; damage-control packing, with or without total hepatic vascular isolation, is the modern standard for this injury. Know the shunt for the exam, but expect packing to be the answer that reflects what is actually done in the operating room.",
  }, PACKET),
  sourced({
    id: "block-hepatic-damage-control",
    type: "bullets",
    heading: "Damage control and closure",
    items: [
      "Triggers for a damage-control strategy are the **lethal triad** — hypothermia, acidosis, and coagulopathy — together with a massive transfusion requirement greater than **10 units** and an inability to close the abdomen.",
      "The sequence is rapid hemostasis (pack), control contamination (staple or ligate bowel without anastomosis), temporary abdominal closure (negative-pressure or a Barker-type closure), ICU resuscitation (rewarm, transfuse in a **1:1:1** ratio, correct ionized calcium), then planned re-exploration at **24 to 48 hours** for definitive repair, drain placement, and fascial closure, with a goal of closure within roughly **7 days**.",
      "Watch for abdominal compartment syndrome: intra-abdominal hypertension is a bladder pressure of **12 mmHg** or higher, and abdominal compartment syndrome is **20 mmHg** or higher plus new organ dysfunction — the trigger for decompressive laparotomy.",
    ],
  }, PACKET),
  sourced({
    id: "block-hepatic-complications",
    type: "bullets",
    heading: "Follow-up, surveillance, and complications",
    items: [
      "Complication rates rise steeply with grade: roughly **1 percent** at grade III, **21 percent** at grade IV, and **63 percent** at grade V.",
      "**Bile leak or biloma** is the most common complication; a small, asymptomatic collection is observed, while an enlarging, symptomatic, or infected collection needs percutaneous drainage, adding ERCP with sphincterotomy or stenting for a persistent high-output leak. **HIDA scan** is near **100 percent** sensitive and specific for a leak.",
      "Delayed or secondary hemorrhage and pseudoaneurysm are managed with angioembolization as first-line therapy; treat even an asymptomatic pseudoaneurysm given its rupture risk.",
      "**Hemobilia** presents with the **Quincke triad** of GI bleeding, right upper quadrant pain, and jaundice, and is managed with angiography and embolization; a bilio-venous fistula is managed with ERCP.",
      "**Hepatic necrosis or abscess** is most common after main hepatic artery embolization and after packing a high-grade injury; an abscess needs percutaneous drainage and culture-directed antibiotics, while necrosis is managed conservatively unless infected. Segmental (selective) angioembolization causes fewer liver-related complications than main hepatic artery embolization.",
    ],
  }, PACKET),
  references("block-hepatic-references", [PACKET]),
];

export const hepaticInjuryTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000001212",
  versionId: "00000000-0000-4000-8000-000000001222",
  slug: "hepatic-injury-packing-repair-and-resection",
  title: "Hepatic Injury: Packing, Repair, and Resection",
  aliases: ["liver trauma", "hepatic trauma", "liver injury", "traumatic liver injury", "perihepatic packing", "liver packing", "Pringle maneuver", "Pringle", "hepatotomy", "finger fracture", "hepatorrhaphy", "resectional debridement", "hepatic lobectomy", "atriocaval shunt", "Schrock shunt", "juxtahepatic venous injury", "retrohepatic IVC", "damage control laparotomy", "angioembolization", "bile leak", "biloma", "hemobilia", "AAST liver injury scale", "omental packing", "Pearls of the liver"],
  scoreNodeId: "trauma-procedures",
  scoreCategory: "SCORE · Trauma · Operations & Procedures",
  tags: ["trauma", "liver", "hepatic-injury", "operative-technique", "damage-control", "absite", "score"],
  sourceId: PACKET,
  blocks,
  reviewedAt: "2026-08-18T00:00:00.000Z",
});
