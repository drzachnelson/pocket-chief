import { buildTopic, references, sourced } from "@/content/authoring";
import { GENERAL_ABDOMEN_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-rsh-summary",
    type: "summary",
    heading: "At a glance",
    text: "A rectus sheath hematoma is an abdominal wall bleed masquerading as an intra-abdominal one, and the examination finding that separates them is a mass that stays palpable and tender while the rectus contracts. CT confirms it, most stop bleeding on their own, and the escalation runs from conservative care to angioembolization to operation.",
  }, SOURCE),
  sourced({
    id: "block-rsh-etiology",
    type: "bullets",
    heading: "Etiology and risk",
    items: [
      "Rupture of the superior or inferior epigastric artery, or a direct tear of the rectus abdominis muscle.",
      "Precipitants include blunt trauma, violent coughing, sudden exertion, pregnancy, and injections into the abdominal wall.",
      "Systemic anticoagulation with warfarin, low molecular weight heparin, or a direct oral anticoagulant is the dominant modern risk factor.",
      "Inferior epigastric bleeding below the arcuate line produces the large and dangerous hematomas.",
    ],
  }, SOURCE),
  sourced({
    id: "block-rsh-arcuate",
    type: "table",
    heading: "The arcuate line changes everything",
    columns: ["Feature", "Above the arcuate line", "Below the arcuate line"],
    rows: [
      ["Posterior sheath", "Present, from the internal oblique and transversus aponeuroses", "Absent — every aponeurosis passes anteriorly"],
      ["Behind the muscle", "Aponeurotic layer", "Transversalis fascia and peritoneum only"],
      ["Usual vessel", "Superior epigastric artery", "Inferior epigastric artery"],
      ["Containment", "Contained and unilateral", "Crosses the midline into the space of Retzius and retroperitoneum"],
      ["Consequence", "Self-limited in most patients", "Large-volume blood loss and shock"],
    ],
  }, SOURCE),
  sourced({
    id: "block-rsh-escalation",
    type: "flow",
    heading: "Escalation ladder",
    nodes: [
      { id: "confirmed", label: "Rectus sheath hematoma confirmed on CT" },
      { id: "stable", label: "Stable, hematoma not expanding", tone: "good" },
      { id: "unstable", label: "Expanding hematoma, falling hematocrit, or instability", tone: "caution" },
      { id: "conservative", label: "Rest, analgesia, ice, and reversal of anticoagulation", tone: "good" },
      { id: "embolize", label: "Transcatheter embolization of the epigastric artery", tone: "caution" },
      { id: "operate", label: "Operative evacuation and vessel ligation", tone: "caution" },
    ],
    edges: [
      { from: "confirmed", to: "stable", label: "hemodynamically stable" },
      { from: "confirmed", to: "unstable", label: "active bleeding" },
      { from: "stable", to: "conservative" },
      { from: "unstable", to: "embolize" },
      { from: "embolize", to: "operate", label: "embolization fails or compartment syndrome develops" },
    ],
  }, SOURCE),
  sourced({
    id: "block-rsh-berchtold",
    type: "table",
    heading: "Berchtold typing",
    columns: ["Type", "Extent", "Management"],
    rows: [
      ["Type I", "Intramuscular and unilateral, without fascial dissection", "Outpatient conservative care"],
      ["Type II", "Intramuscular with blood between muscle and transversalis fascia", "Admit for serial hematocrit; transfusion sometimes needed"],
      ["Type III", "Blood below the transversalis fascia into the peritoneum and prevesical space", "Admit, transfuse, and hold a low threshold for embolization"],
    ],
  }, SOURCE),
  sourced({
    id: "block-rsh-signs",
    type: "bullets",
    heading: "Examination signs",
    items: [
      "Fothergill sign: the tender mass stays palpable and fixed when the patient tenses the rectus, while an intra-abdominal mass becomes harder to feel.",
      "Carnett sign: pain that increases with abdominal wall contraction points to an abdominal wall source rather than a visceral one.",
      "Cullen sign: periumbilical ecchymosis from blood tracking along the falciform ligament, a late and nonspecific finding.",
    ],
  }, SOURCE),
  sourced({
    id: "block-rsh-warning",
    type: "warning",
    heading: "The reflex to operate is usually wrong",
    text: "Most rectus sheath hematomas stop with rest and correction of anticoagulation, and opening the sheath releases the tamponade that is controlling the bleed. Reserve the operation for failed embolization, ongoing hemorrhage, or abdominal compartment syndrome.",
  }, SOURCE),
  references("block-rsh-references", [SOURCE]),
];

export const rectusSheathHematomaTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000000402",
  versionId: "00000000-0000-4000-8000-000000000412",
  slug: "rectus-sheath-hematoma",
  title: "Rectus Sheath Hematoma",
  aliases: ["RSH", "Fothergill sign", "Carnett sign", "epigastric artery bleed", "abdominal wall hematoma", "arcuate line"],
  scoreNodeId: "abdomen-conditions",
  scoreCategory: "SCORE · General Abdomen · Diseases & Conditions",
  tags: ["general-abdomen", "abdominal-wall", "anticoagulation", "absite", "score"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-13T00:00:00.000Z",
});
