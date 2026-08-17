import { buildTopic, references, sourced } from "@/content/authoring";
import { GENERAL_ABDOMEN_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-ap-summary",
    type: "summary",
    heading: "At a glance",
    text: "Sort acute abdominal pain by whether the patient needs an operation now, not by working down the differential. **Peritonitis** on examination, free air, evisceration, or instability from intra-abdominal hemorrhage go straight to the operating room. Everyone else gets a directed workup, and in a stable adult that means **CT of the abdomen and pelvis** with IV contrast.",
  }, SOURCE),
  sourced({
    id: "block-ap-pathophys",
    type: "bullets",
    heading: "Visceral, somatic, referred",
    items: [
      "**Visceral pain** travels on unmyelinated C fibers in the splanchnic nerves, responds to stretch, distension, and ischemia, and is dull, crampy, and poorly localized to the midline.",
      "**Somatic pain** travels on myelinated A-delta fibers in the parietal peritoneum and is sharp, severe, and localized to the point of irritation.",
      "Visceral pain localizes by **embryologic origin**",
      "- Foregut to the epigastrium",
      "- Midgut to the periumbilical region",
      "- Hindgut to the suprapubic region",
      "Migration from a vague periumbilical ache to sharp right lower quadrant pain is visceral pain becoming somatic — the classic **appendicitis** history.",
      "Diaphragmatic irritation refers to the shoulder through C3 to C5, the **Kehr sign**.",
    ],
  }, SOURCE),
  sourced({
    id: "block-ap-triage",
    type: "flow",
    heading: "Triage the acute abdomen",
    nodes: [
      { id: "pain", label: "Acute abdominal pain" },
      { id: "surgical", label: "Peritonitis, free air, evisceration, or hemorrhagic instability", tone: "caution" },
      { id: "stable", label: "Stable adult with undifferentiated pain" },
      { id: "repro", label: "Reproductive-age woman" },
      { id: "cirrhotic", label: "Cirrhotic with ascites" },
      { id: "or", label: "Laparotomy now — imaging must not delay source control", tone: "caution" },
      { id: "ct", label: "CT abdomen and pelvis with IV contrast", tone: "good" },
      { id: "pelvic", label: "Beta-hCG first, then pelvic ultrasound", tone: "good" },
      { id: "tap", label: "Diagnostic paracentesis for cell count and culture", tone: "good" },
    ],
    edges: [
      { from: "pain", to: "surgical", label: "surgical abdomen" },
      { from: "pain", to: "stable", label: "hemodynamically stable" },
      { from: "pain", to: "repro", label: "always ask" },
      { from: "pain", to: "cirrhotic", label: "new pain or fever" },
      { from: "surgical", to: "or" },
      { from: "stable", to: "ct" },
      { from: "repro", to: "pelvic" },
      { from: "cirrhotic", to: "tap" },
    ],
  }, SOURCE),
  sourced({
    id: "block-ap-quadrants",
    type: "table",
    heading: "Localize by quadrant",
    columns: ["Region", "Common causes", "Do not miss"],
    rows: [
      ["Right upper quadrant", "Acute cholecystitis, ascending cholangitis, hepatitis", "**Perforated peptic ulcer**, hepatic abscess, right lower lobe pneumonia"],
      ["Left upper quadrant", "Gastric ulcer, pancreatitis, splenic infarct", "**Splenic rupture**, referred cardiac pain"],
      ["Right lower quadrant", "Appendicitis, Crohn ileitis, cecal diverticulitis", "**Ectopic pregnancy**, ovarian torsion, ruptured tubo-ovarian abscess"],
      ["Left lower quadrant", "Sigmoid diverticulitis, ischemic colitis", "**Sigmoid volvulus**, incarcerated hernia"],
      ["Diffuse or periumbilical", "Gastroenteritis, early appendicitis, small bowel obstruction", "**Mesenteric ischemia**, ruptured abdominal aortic aneurysm"],
    ],
  }, SOURCE),
  sourced({
    id: "block-ap-peritonitis",
    type: "table",
    heading: "Spontaneous versus secondary peritonitis",
    columns: ["Feature", "Spontaneous bacterial peritonitis", "Secondary bacterial peritonitis"],
    rows: [
      ["Setting", "**Cirrhotic ascites** with no perforation", "**Perforated** or necrotic viscus"],
      ["Ascitic fluid", "Neutrophils **above 250** per cubic millimeter", "Neutrophils above 250 plus **glucose under 50**, protein above 1 g/dL, or LDH above the serum level"],
      ["Organisms", "**Monomicrobial** — E coli most often, then Streptococcus and Klebsiella", "**Polymicrobial** — Bacteroides fragilis, E coli, and Enterococcus"],
      ["Antibiotics", "**Third-generation cephalosporin**, with albumin to protect renal function", "**Broad-spectrum** coverage alongside source control"],
      ["Operation", "**Not indicated** and harmful", "**Urgent laparotomy** for source control"],
    ],
  }, SOURCE),
  sourced({
    id: "block-ap-warning",
    type: "warning",
    tone: "danger",
    heading: "Imaging never precedes the operating room in a surgical abdomen",
    text: "**Peritonitis** on examination, free intraperitoneal air, evisceration, or hemodynamic instability from intra-abdominal hemorrhage are themselves the indication to operate. A confirmatory scan in that patient only **delays source control**.",
  }, SOURCE),
  sourced({
    id: "block-ap-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "Pain out of proportion to a benign abdominal examination is **acute mesenteric ischemia** until proven otherwise.",
      "Elderly, diabetic, immunosuppressed, and steroid-treated patients **blunt peritoneal signs** and present late with an unimpressive examination.",
      "Back or flank pain with hypotension in an older patient is a ruptured **[[abdominal aortic aneurysm]]** until excluded.",
      "**Serial examinations** by the same examiner outperform any single examination in undifferentiated pain.",
      "**Analgesia** does not mask the diagnosis and should not be withheld while the workup proceeds.",
    ],
  }, SOURCE),
  references("block-ap-references", [SOURCE]),
];

export const abdominalPainTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000000401",
  versionId: "00000000-0000-4000-8000-000000000411",
  slug: "abdominal-pain",
  title: "Abdominal Pain",
  aliases: ["acute abdomen", "surgical abdomen", "peritonitis", "visceral pain", "somatic pain", "spontaneous bacterial peritonitis", "SBP"],
  scoreNodeId: "abdomen-conditions",
  scoreCategory: "SCORE · General Abdomen · Diseases & Conditions",
  tags: ["general-abdomen", "acute-abdomen", "peritonitis", "absite", "score"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-13T00:00:00.000Z",
});
