import { buildTopic, references, sourced } from "@/content/authoring";
import { GENERAL_ABDOMEN_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-desmoid-summary",
    type: "summary",
    heading: "At a glance",
    text: "Desmoids are histologically benign, **locally aggressive** fibroblastic tumors that never metastasize but recur relentlessly. The exam still rewards **wide local excision** with sulindac and tamoxifen for unresectable disease; current practice starts with **active surveillance**, because a substantial share of these tumors arrest or regress without any treatment.",
  }, SOURCE),
  sourced({
    id: "block-desmoid-pathology",
    type: "bullets",
    heading: "Pathology and genetics",
    items: [
      "Monoclonal fibroblastic and myofibroblastic proliferation arising from **musculoaponeurotic fascia**, with no capsule and no mitotic atypia.",
      "**Locally invasive** with a high local recurrence rate, but no capacity for distant metastasis.",
      "Sporadic desmoids carry somatic **CTNNB1** mutations that drive nuclear beta-catenin accumulation.",
      "Familial desmoids arise from a germline **APC** mutation — the same defect behind familial adenomatous polyposis and Gardner syndrome.",
      "After prophylactic colectomy, desmoid disease becomes a **leading cause of death** in familial adenomatous polyposis.",
    ],
  }, SOURCE),
  sourced({
    id: "block-desmoid-sites",
    type: "table",
    heading: "Three anatomic patterns",
    columns: ["Site", "Typical patient", "Surgical consideration"],
    rows: [
      ["Abdominal wall", "Young woman during or shortly after pregnancy, or at a prior incision", "**Resection is feasible**; plan for mesh reconstruction of the defect"],
      ["Intra-abdominal or mesenteric", "Gardner syndrome, often years after colectomy", "Encasement of the **mesenteric root** contraindicates resection — short bowel syndrome is the greater harm"],
      ["Extra-abdominal", "Shoulder girdle, chest wall, or extremity", "Favor **function preservation**; morbid resection is rarely justified"],
    ],
  }, SOURCE),
  sourced({
    id: "block-desmoid-flow",
    type: "flow",
    heading: "How treatment escalates",
    nodes: [
      { id: "biopsy", label: "Biopsy-proven desmoid tumor" },
      { id: "stable", label: "Asymptomatic or radiographically stable", tone: "good" },
      { id: "progressive", label: "Progressive growth or symptomatic disease", tone: "caution" },
      { id: "surveillance", label: "Active surveillance with serial MRI", tone: "good" },
      { id: "systemic", label: "Systemic therapy", tone: "caution" },
      { id: "resect", label: "Resection, reserved for abdominal wall disease clearable without crippling loss", tone: "caution" },
    ],
    edges: [
      { from: "biopsy", to: "stable", label: "no threat to structure or function" },
      { from: "biopsy", to: "progressive", label: "growth, pain, or obstruction" },
      { from: "stable", to: "surveillance" },
      { from: "progressive", to: "systemic" },
      { from: "systemic", to: "resect", label: "systemic therapy fails and the site permits" },
    ],
  }, SOURCE),
  sourced({
    id: "block-desmoid-currency",
    type: "prose",
    heading: "Board answer versus current practice",
    text: "Older review sources — and most question banks — key **wide local excision** with 1 cm margins for an abdominal wall desmoid, and sulindac plus tamoxifen for unresectable disease. Contemporary practice is **surveillance first**, because many desmoids arrest or regress untreated, and systemic therapy has moved to **nirogacestat**, a gamma-secretase inhibitor approved in 2023, alongside sorafenib and low-dose methotrexate with vinblastine. Answer the exam with the first and treat the patient with the second.",
  }, SOURCE),
  sourced({
    id: "block-desmoid-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "Desmoids **do not metastasize**; local recurrence, not distant disease, is the enemy.",
      "**Gardner syndrome** is familial adenomatous polyposis plus desmoids, osteomas, epidermoid cysts, and dental abnormalities.",
      "Trauma, prior incisions, and radiation are recognized **precipitating sites**.",
      "A **positive margin** after resection does not by itself mandate re-excision, because margin status correlates poorly with recurrence.",
    ],
  }, SOURCE),
  sourced({
    id: "block-desmoid-warning",
    type: "warning",
    tone: "danger",
    heading: "A mesenteric root desmoid is not a surgical target",
    text: "Attempted resection of a desmoid encasing the root of the small bowel mesentery trades a slow-growing tumor for **short bowel syndrome**. **Systemic therapy** is the answer, and the same logic applies to any lesion whose clearance would cost the patient more function than the tumor will.",
  }, SOURCE),
  references("block-desmoid-references", [SOURCE]),
];

export const desmoidTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000000403",
  versionId: "00000000-0000-4000-8000-000000000413",
  slug: "desmoid-tumors-and-fibromatoses",
  title: "Desmoid Tumors & Fibromatoses",
  aliases: ["desmoid", "fibromatosis", "aggressive fibromatosis", "Gardner syndrome", "APC", "CTNNB1", "nirogacestat"],
  scoreNodeId: "abdomen-conditions",
  scoreCategory: "SCORE · General Abdomen · Diseases & Conditions",
  tags: ["general-abdomen", "soft-tissue", "fap", "absite", "score"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-13T00:00:00.000Z",
});
