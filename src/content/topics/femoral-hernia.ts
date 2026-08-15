import { buildTopic, references, sourced } from "@/content/authoring";
import { HERNIA_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-fh-summary",
    type: "summary",
    heading: "At a glance",
    text: "A femoral hernia passes below the inguinal ligament into a canal walled by ligament and bone, and that rigidity is the whole story. It is an uncommon hernia with the highest strangulation rate of any, it is disproportionately a hernia of women, and it is diagnosed late because the bulge is small and easy to dismiss. There is no watchful waiting here — diagnosis is the indication for repair.",
  }, SOURCE),
  sourced({
    id: "block-fh-canal",
    type: "table",
    heading: "Boundaries of the femoral canal",
    columns: ["Border", "Structure", "Consequence"],
    rows: [
      ["Anterior", "Inguinal ligament", "The neck lies below the ligament, which is what separates it from an inguinal hernia at the bedside"],
      ["Posterior", "Pectineal ligament, also called Cooper's ligament, over the superior pubic ramus", "The fixed shelf that every femoral repair anchors to"],
      ["Lateral", "Femoral vein", "Sutures placed too far laterally tear the vein, and a plug packed too tightly obstructs it"],
      ["Medial", "Lacunar ligament", "A sharp, unyielding edge that strangles the neck of the sac and sometimes has to be divided to reduce it"],
    ],
  }, SOURCE),
  sourced({
    id: "block-fh-epidemiology",
    type: "bullets",
    heading: "Why it strangulates",
    items: [
      "Femoral hernias make up only a small share of groin hernias but carry the highest risk of incarceration and strangulation of any hernia.",
      "They are several times more common in women than in men, yet the indirect inguinal hernia is still the most common hernia in women.",
      "The canal is bounded by ligament on three sides and bone behind, so a trapped loop of bowel has nowhere to swell.",
      "A large share present for the first time as an emergency, and emergency repair carries a far higher mortality than elective repair.",
      "A Richter hernia, in which only the antimesenteric wall of the bowel is caught, is classically femoral and can perforate without ever obstructing.",
      "An unrecognized femoral defect is a common reason a groin hernia appears to recur soon after an inguinal repair.",
    ],
  }, SOURCE),
  sourced({
    id: "block-fh-decision",
    type: "flow",
    heading: "Managing a suspected femoral hernia",
    nodes: [
      { id: "mass", label: "Groin mass below and lateral to the pubic tubercle" },
      { id: "imaging", label: "Examination not diagnostic, as is common in obese patients and in women" },
      { id: "confirmed", label: "Femoral hernia confirmed" },
      { id: "acute", label: "Tender, irreducible, or obstructed", tone: "caution" },
      { id: "prompt", label: "Prompt elective repair, because observation is not an option", tone: "good" },
      { id: "emergent", label: "Emergent repair with assessment of bowel viability", tone: "caution" },
    ],
    edges: [
      { from: "mass", to: "imaging", label: "clinically ambiguous" },
      { from: "mass", to: "confirmed", label: "clinically clear" },
      { from: "imaging", to: "confirmed", label: "ultrasound or CT resolves it" },
      { from: "confirmed", to: "acute", label: "signs of strangulation" },
      { from: "confirmed", to: "prompt", label: "reducible and not tender" },
      { from: "acute", to: "emergent" },
    ],
  }, SOURCE),
  sourced({
    id: "block-fh-repairs",
    type: "table",
    heading: "Repair options",
    columns: ["Approach", "What it does", "When it is chosen"],
    rows: [
      ["McVay repair", "Sutures the transversus abdominis aponeurosis to Cooper's ligament, obliterating the femoral canal", "The tissue repair of choice when mesh is unwise, as in a contaminated field"],
      ["Open preperitoneal repair", "Enters behind the abdominal wall through a low midline or Pfannenstiel incision and lays mesh across the myopectineal orifice", "Strangulation, where bowel has to be inspected and possibly resected through the same exposure"],
      ["Infrainguinal plug repair", "Places a small plug into the femoral canal from below the inguinal ligament", "A small reducible hernia in a frail patient, feasible under local anesthesia"],
      ["Laparoscopic TEP or TAPP", "Covers the entire myopectineal orifice with one sheet of mesh from behind", "Elective repair, and the preferred route in women because an occult femoral defect is covered without being sought"],
    ],
  }, SOURCE),
  sourced({
    id: "block-fh-warning",
    type: "warning",
    heading: "Diagnosis is the indication",
    text: "The watchful waiting argument that applies to a minimally symptomatic inguinal hernia does not transfer to the femoral canal. The neck is rigid, the strangulation rate is the highest of any hernia, and the penalty for waiting is an emergency operation in an older patient with dead bowel. Repair a femoral hernia when you find it, and repair it promptly even when the patient reports nothing more than a small lump.",
  }, SOURCE),
  sourced({
    id: "block-fh-pearls",
    type: "bullets",
    heading: "Eponyms and traps",
    items: [
      "A De Garengeot hernia contains the appendix inside a femoral sac, and is usually a surprise found at operation rather than a preoperative diagnosis.",
      "The bulge of a femoral hernia sits below and lateral to the pubic tubercle, while an inguinal hernia sits above and medial to it.",
      "The lacunar ligament sometimes has to be divided to reduce an incarcerated sac, and an aberrant obturator artery crossing at that point bleeds hard if it is cut blindly.",
      "Guidelines favor a preperitoneal or laparoscopic approach for any groin hernia in a woman, precisely because a femoral defect is so easily missed from an anterior exposure.",
    ],
  }, SOURCE),
  references("block-fh-references", [SOURCE]),
];

export const femoralHerniaTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000000502",
  versionId: "00000000-0000-4000-8000-000000000512",
  slug: "femoral-hernia",
  title: "Femoral Hernia",
  aliases: ["femoral hernia", "femoral canal", "Cooper ligament", "Cooper's ligament", "pectineal ligament", "lacunar ligament", "De Garengeot", "Richter hernia", "groin hernia in women", "McVay"],
  scoreNodeId: "hernia-conditions",
  scoreCategory: "SCORE · Hernia · Diseases & Conditions",
  tags: ["hernia", "groin", "emergency-general-surgery", "absite", "score"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-14T00:00:00.000Z",
});
