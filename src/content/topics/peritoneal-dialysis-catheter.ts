import { buildTopic, references, sourced } from "@/content/authoring";
import { GENERAL_ABDOMEN_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-pd-summary",
    type: "summary",
    heading: "At a glance",
    text: "Two things decide whether a peritoneal dialysis catheter works: the tip sits deep in the pelvis and the deep cuff sits inside the rectus. Two things decide whether it survives: cloudy effluent is treated with intraperitoneal antibiotics, and fungal, tuberculous, enteric, or refractory peritonitis means the catheter comes out.",
  }, SOURCE),
  sourced({
    id: "block-pd-technique",
    type: "sequence",
    heading: "Insertion technique",
    steps: [
      { title: "Choose the exit site", detail: "Mark away from the belt line and skin folds, with the tunnel directed downward or laterally." },
      { title: "Enter the peritoneum", detail: "Open, laparoscopic, or percutaneous access; laparoscopy allows adhesiolysis and omentopexy in the same setting." },
      { title: "Seat the tip", detail: "Place the coiled tip deep in the true pelvis — the rectovesical pouch in men, the pouch of Douglas in women." },
      { title: "Bury the deep cuff", detail: "Position the deep cuff within the rectus muscle or fascia to anchor the catheter and prevent pericatheter leak." },
      { title: "Position the superficial cuff", detail: "Leave the superficial cuff in subcutaneous tissue about 2 cm from the exit site to resist tunnel infection." },
      { title: "Test before closing", detail: "Instill and drain fluid to confirm brisk flow while the patient is still on the table." },
    ],
  }, SOURCE),
  sourced({
    id: "block-pd-complications",
    type: "table",
    heading: "Sort the complication",
    columns: ["Problem", "Clue", "Management"],
    rows: [
      ["Poor inflow or outflow", "Sluggish drainage, usually early after placement", "Plain abdominal radiograph for tip position; fluoroscopic or laparoscopic repositioning with omentopexy or partial omentectomy"],
      ["Pericatheter leak", "Dialysate at the exit site without infection", "Rest the catheter, reduce dwell volumes, and confirm the deep cuff lies within the rectus"],
      ["Exit site or tunnel infection", "Purulence or induration along the tunnel with clear effluent", "Topical and systemic antibiotics; remove for tunnel involvement that fails therapy"],
      ["Peritonitis", "Cloudy effluent with abdominal pain and fever", "Intraperitoneal antibiotics with a prolonged dwell"],
      ["Hernia or hydrocele", "Bulge that worsens as dwell volume rises", "Repair, with temporary reduction of dwell volume"],
    ],
  }, SOURCE),
  sourced({
    id: "block-pd-flow",
    type: "flow",
    heading: "Cloudy effluent pathway",
    nodes: [
      { id: "cloudy", label: "Cloudy peritoneal effluent with abdominal pain" },
      { id: "confirmed", label: "Cell count above 100 per microliter with over 50 percent neutrophils", tone: "caution" },
      { id: "negative", label: "Cell count below threshold", tone: "good" },
      { id: "alternative", label: "Look for chemical irritation, hemoperitoneum, or eosinophilic peritonitis", tone: "good" },
      { id: "empiric", label: "Empiric intraperitoneal vancomycin with gentamicin or a third-generation cephalosporin", tone: "caution" },
      { id: "improving", label: "Improved by 48 to 72 hours — finish a 14 to 21 day course", tone: "good" },
      { id: "remove", label: "Remove the catheter — refractory beyond 4 to 5 days, or fungal, tuberculous, or enteric organisms", tone: "caution" },
    ],
    edges: [
      { from: "cloudy", to: "confirmed", label: "peritonitis confirmed" },
      { from: "cloudy", to: "negative", label: "no neutrophil predominance" },
      { from: "negative", to: "alternative" },
      { from: "confirmed", to: "empiric" },
      { from: "empiric", to: "improving", label: "responds" },
      { from: "empiric", to: "remove", label: "fails or wrong organism" },
    ],
  }, SOURCE),
  sourced({
    id: "block-pd-peritonitis",
    type: "bullets",
    heading: "Peritonitis facts",
    items: [
      "Diagnosis needs effluent white cells above 100 per microliter with more than 50 percent neutrophils, plus symptoms or a positive culture.",
      "Staphylococcus epidermidis is the most common organism overall, reflecting touch contamination, followed by Staphylococcus aureus, gram-negative rods, and Candida.",
      "Intraperitoneal dosing reaches far higher local concentrations than intravenous dosing and is first-line.",
      "Mixed enteric growth suggests a perforated viscus and calls for imaging and an operation, not more antibiotics.",
    ],
  }, SOURCE),
  sourced({
    id: "block-pd-removal",
    type: "bullets",
    heading: "Absolute indications for catheter removal",
    items: [
      "Refractory bacterial peritonitis that fails appropriate intraperitoneal antibiotics after 4 to 5 days.",
      "Fungal peritonitis of any severity.",
      "Tuberculous peritonitis.",
      "Refractory Pseudomonas peritonitis.",
      "Enteric or fecal peritonitis, which signals bowel perforation and mandates laparotomy.",
      "Relapsing peritonitis with the same organism after an adequate course.",
    ],
  }, SOURCE),
  sourced({
    id: "block-pd-warning",
    type: "warning",
    heading: "Mixed enteric growth is a perforation until proven otherwise",
    text: "Cloudy effluent growing several enteric organisms is not ordinary touch-contamination peritonitis. Antibiotics alone treat the symptom; that patient needs cross-sectional imaging and an operation.",
  }, SOURCE),
  references("block-pd-references", [SOURCE]),
];

export const peritonealDialysisCatheterTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000000406",
  versionId: "00000000-0000-4000-8000-000000000416",
  slug: "peritoneal-dialysis-catheter-insertion",
  title: "Peritoneal Dialysis Catheter Insertion",
  aliases: ["PD catheter", "Tenckhoff catheter", "peritoneal dialysis", "PD peritonitis", "catheter migration", "omental wrap"],
  scoreNodeId: "abdomen-procedures",
  scoreCategory: "SCORE · General Abdomen · Operations & Procedures",
  tags: ["general-abdomen", "dialysis-access", "esrd", "absite", "score"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-13T00:00:00.000Z",
});
