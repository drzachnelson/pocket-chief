import { buildTopic, references, sourced } from "@/content/authoring";
import { TRAUMA_ESCHAROTOMY_PACKET_SOURCE as PACKET } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-escharotomy-summary",
    type: "summary",
    heading: "At a glance",
    text: "Escharotomy is the emergent decompressive incision through non-viable, unyielding full-thickness burn eschar — down to, but not through, subcutaneous fat — that relieves elevated subeschar tissue pressure and restores distal perfusion and ventilation. The \"why\" is mechanical: full-thickness eschar is noncompliant, and as resuscitation drives predictable interstitial edema into the tissue beneath a shell that cannot stretch, that eschar behaves like a tourniquet — subdermal pressure rises, capillary perfusion is impaired, and unrelieved pressure produces the ischemic necrosis of **burn-induced compartment syndrome (BICS)**. The need tracks the burn: deep circumferential or near-circumferential full-thickness thermal burns of the extremities are the most common driver, followed by the trunk, the neck, the digits, and rarely the face.",
  }, PACKET),
  sourced({
    id: "block-escharotomy-vs-fasciotomy",
    type: "table",
    heading: "Escharotomy versus fasciotomy",
    columns: ["Dimension", "Escharotomy", "Fasciotomy"],
    rows: [
      ["What it opens", "Eschar only, down to — but not into — subcutaneous fat", "The deep investing fascia of the muscle compartments"],
      ["What it treats", "The external eschar \"tourniquet\" compressing the tissue beneath it", "True intramuscular compartment syndrome, when eschar release alone is insufficient"],
      ["Classic indication", "Circumferential or near-circumferential full-thickness burn producing burn-induced compartment syndrome", "High-voltage electrical injury (**≥1000 V**), blast injury, associated fractures, or prolonged limb ischemia and reperfusion"],
    ],
  }, PACKET),
  sourced({
    id: "block-escharotomy-risk-factors",
    type: "bullets",
    heading: "Who needs decompression",
    items: [
      "Suspect burn-induced compartment syndrome with a circumferential or near-circumferential full-thickness burn, a total body surface area burn of **30 percent** or more, **10 percent** or more full-thickness burn, or a patient receiving large-volume fluid resuscitation, since the edema from resuscitation is the driver.",
      "Risk tracks anatomy in the order **extremities, then trunk, then neck, then digits**.",
      "High-voltage electrical injury is a special population: deep muscle destruction can occur under near-normal-appearing skin, so think fasciotomy, not just escharotomy.",
    ],
  }, PACKET),
  sourced({
    id: "block-escharotomy-presentation",
    type: "bullets",
    heading: "Clinical presentation",
    items: [
      "Extremity BICS presents with tense, woody compartments beneath circumferential eschar, a decreased or absent arterial Doppler signal, sluggish capillary refill, pain, coolness or poikilothermia, and progressive paresthesia.",
      "The 6 Ps — pain, pallor, paresthesia, paralysis, pulselessness, and poikilothermia — apply, but **pulselessness and paralysis are late findings** that can signal irreversible damage.",
      "Circumferential or bilateral anterior torso burns restrict chest wall compliance, producing rising peak inspiratory or airway pressures, hypoventilation, and worsening gas exchange.",
      "Eschar and edema at the neck can compromise the airway and trachea.",
      "Left untreated, extremity ischemia progresses to muscle or limb necrosis and amputation, and torso restriction progresses to atelectasis, pneumonia, and ventilatory failure.",
    ],
  }, PACKET),
  sourced({
    id: "block-escharotomy-thresholds",
    type: "table",
    heading: "Thresholds for decompression",
    columns: ["Parameter", "Threshold or finding", "Action"],
    rows: [
      ["Physical exam", "Firm, tense compartments under circumferential eschar", "**Most reliable trigger** — decompress during resuscitation"],
      ["Compartment (absolute) pressure", "**Above 30 mmHg**", "Supports decompression, interpreted cautiously in burns"],
      ["Delta pressure", "**Within 30 mmHg of diastolic blood pressure**, or under 30 mmHg for more than 2 hours", "Supports decompression"],
      ["Peak airway pressure", "Progressive rise with a circumferential torso burn", "**Torso escharotomy**"],
      ["Bladder (intra-abdominal) pressure", "**20 to 30 mmHg or higher** with oliguria or hypotension", "Abdominal compartment syndrome — decompress"],
    ],
  }, PACKET),
  sourced({
    id: "block-escharotomy-diagnosis",
    type: "bullets",
    heading: "Diagnosis at the bedside",
    items: [
      "The clinical exam is the primary and most reliable trigger — tight, non-compressible compartments under circumferential eschar during active resuscitation — and decompression should not wait for a lost pulse or a motor or sensory deficit.",
      "Handheld Doppler of the distal arteries and serial exams are the standard adjuncts; loss of the Doppler signal is concerning.",
      "Classic wick-catheter data show a poor correlation between intramuscular pressure and Doppler pulses in burns, because marked subcutaneous edema makes absolute pressure readings less reliable — clinical judgment dominates.",
      "Myoglobinuria has insufficient sensitivity and specificity to diagnose compartment syndrome, per **AAOS 2025** guidance, and should not be used as a standalone diagnostic test after electrical injury.",
    ],
  }, PACKET),
  sourced({
    id: "block-escharotomy-timing-torso",
    type: "bullets",
    heading: "Timing, setting, and torso technique",
    items: [
      "Perform emergently, typically within the first **4 to 6 hours** as resuscitation-driven edema peaks.",
      "This is a clean, not sterile, procedure commonly done bedside in the burn or trauma bay.",
      "Electrocautery is the preferred instrument, for simultaneous hemostasis; a scalpel is the alternative.",
      "Full-thickness burn is theoretically insensate, but the incision crosses viable tissue and causes pain and anxiety, so aggressive analgesia and sedation are required.",
      "Torso release uses bilateral **anterior axillary line** incisions joined by a transverse **costal-margin** (or clavicular) crossbar incision in a grid pattern, to restore chest wall excursion.",
    ],
  }, PACKET),
  sourced({
    id: "block-escharotomy-technique",
    type: "sequence",
    heading: "Extremity and digital release technique",
    steps: [
      { title: "Position and plan the incisions", detail: "Position and cleanse the limb, then plan mid-medial and mid-lateral longitudinal incisions." },
      { title: "Incise through eschar only", detail: "Cut through the eschar until the tissue gapes and separates, stopping before entering subcutaneous fat or deep fascia." },
      { title: "Extend across joints", detail: "Carry the incision across joints with attention to release, dividing any residual fibrous \"waists.\"" },
      { title: "Protect the named nerves", detail: "Avoid the ulnar nerve at the elbow, the peroneal nerve and fibular head at the knee, and the neurovascular bundles at the ankle." },
      { title: "Release the digits along the mid-axial line", detail: "Incise over the compartment defined by Grayson's (volar) and Cleland's (dorsal) ligaments, protecting the digital neurovascular bundle." },
      { title: "Achieve hemostasis and dress", detail: "Obtain hemostasis, dress with topical antimicrobial, and elevate the limb." },
    ],
  }, PACKET),
  sourced({
    id: "block-escharotomy-endpoints",
    type: "bullets",
    heading: "Endpoints of adequate release",
    items: [
      "Adequate release shows more than **1 cm** of separation along the full length of the incision, a palpably soft compartment, return of the Doppler signal, and improved capillary refill, color, and temperature.",
      "Reassess perfusion and compartment tension serially after release, and reintervene, extend the incisions, or convert to fasciotomy if signs persist.",
      "Escalate to fasciotomy for high-voltage electrical injury, associated fractures, blast injury, or persistent compartment syndrome despite an adequate escharotomy.",
      "Escharotomy wounds are not primarily closed; they are excised and autografted later along with the rest of the burn wound.",
    ],
  }, PACKET),
  sourced({
    id: "block-escharotomy-board-vs-practice",
    type: "prose",
    heading: "Board answer versus current practice",
    text: "The textbook trigger for decompression is a compartment pressure above **30 mmHg**, or a delta pressure within **30 mmHg** of diastolic blood pressure — and that is still the number to give on an exam. In practice, marked subcutaneous edema in a burn makes absolute pressure readings less reliable, and classic wick-catheter data show a poor correlation between intramuscular pressure and the presence of a Doppler pulse, so clinical exam — not a number — drives the decision to decompress. A parallel split exists on technique: enzymatic escharotomy with bromelain-based debridement (NexoBrid/anacaulase) is FDA-approved for eschar removal in deep partial- and full-thickness thermal burns, and observational data show roughly a **60 percent** reduction in compartment pressure within **1 hour**, with normalization below **30 mmHg**, reducing the need for surgical escharotomy in selected patients. Surgical escharotomy remains the gold standard, especially for total body surface area burns above **15 percent** and for critically burned patients; enzymatic debridement is contraindicated or insufficient for established compartment syndrome, for blast or electrical injuries that need fasciotomy, and for large surfaces.",
  }, PACKET),
  sourced({
    id: "block-escharotomy-complications",
    type: "table",
    heading: "Complications and management",
    columns: ["Complication", "Management"],
    rows: [
      ["Bleeding", "Minimized by staying within avascular eschar; control with cautery."],
      ["Nerve or vessel injury", "Avoid deep dissection and respect the landmark nerves."],
      ["Inadequate release", "Deepen or extend the incisions and divide fibrous bands."],
      ["Rhabdomyolysis or myoglobinuria", "Aggressive IV hydration with or without urine alkalinization, targeting a urine output of **75 to 100 mL/h**."],
      ["Infection", "Escharotomy does not raise the burn's baseline infection risk; continue standard wound care and topical antimicrobials."],
      ["Scarring", "Hypertrophic or retracting scars form along the incision lines."],
    ],
  }, PACKET),
  references("block-escharotomy-references", [PACKET]),
];

export const escharotomyTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000001216",
  versionId: "00000000-0000-4000-8000-000000001226",
  slug: "escharotomy",
  title: "Escharotomy",
  aliases: ["burn escharotomy", "burn eschar", "burn-induced compartment syndrome", "BICS", "circumferential burn", "chest escharotomy", "digital escharotomy", "Grayson's ligament", "Cleland's ligament", "bromelain", "torso escharotomy", "extremity escharotomy", "compartment syndrome", "burn compartment syndrome", "NexoBrid", "anacaulase", "enzymatic escharotomy", "escharotomy incisions", "decompressive incision", "ulnar nerve", "peroneal nerve"],
  scoreNodeId: "trauma-procedures",
  scoreCategory: "SCORE · Trauma · Operations & Procedures",
  tags: ["trauma", "burns", "operative-technique", "compartment-syndrome", "absite", "score", "emergency"],
  sourceId: PACKET,
  blocks,
  reviewedAt: "2026-08-18T00:00:00.000Z",
});
