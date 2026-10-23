import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  SCORE_PEPTIC_ULCER_SOURCE,
  FISER_STOMACH_SOURCE,
  SCORE_GASTRODUODENAL_PERFORATION_SOURCE,
  SCORE_VAGOTOMY_SOURCE,
  SCORE_EGD_SOURCE,
  WSES_PEPTIC_ULCER_2020_SOURCE
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Converted from docs/study-guides/upper-gi/gastroduodenal-perforation-repair.md. Per-topic sign-off items: docs/study-guides/upper-gi/review.md.
const blocks: TopicBlock[] = [
  sourcedUnits({
  "type": "summary",
  "heading": "At a glance",
  "text": "**Physiology, contamination, ulcer site, and tissue quality determine the operation.** Resuscitate and treat sepsis while arranging source control. A small anterior duodenal defect often permits a limited closure/omental repair. A gastric ulcer needs malignancy assessment. A large friable duodenal defect may require a more complex reconstruction or decompressive strategy. Definitive acid-reducing surgery is a selective addition for a stable patient, not the first objective in shock.",
  "id": "upper-gi-gastroduodenal-perforation-repair-01"
}, [[FISER_STOMACH_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "Protective anatomy",
  "columns": [
    "Structure",
    "Why it changes the repair"
  ],
  "rows": [
    [
      "Lesser curvature",
      "Right/left gastric vessels; ulcer excision must preserve an adequate perfused remnant."
    ],
    [
      "Greater curvature and fundus",
      "Gastroepiploic and short-gastric supply; preserve blood supply when mobilizing stomach or omentum."
    ],
    [
      "Duodenal vascular arcade",
      "Superior pancreaticoduodenal supply from the GDA and inferior supply from the SMA; inflow is interconnected."
    ],
    [
      "Posterior duodenum, bile duct, ampulla",
      "Resection or deep sutures in inflamed tissue risk duct/ampullary injury; identify the ampulla before a major duodenal resection."
    ],
    [
      "Hiatus and vagal trunks",
      "Left vagus anterior, right posterior; relevant if an acid-reducing procedure is being considered."
    ]
  ],
  "id": "upper-gi-gastroduodenal-perforation-repair-02"
}, [[SCORE_GASTRODUODENAL_PERFORATION_SOURCE], [SCORE_GASTRODUODENAL_PERFORATION_SOURCE], [SCORE_GASTRODUODENAL_PERFORATION_SOURCE], [FISER_STOMACH_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE], [SCORE_GASTRODUODENAL_PERFORATION_SOURCE, SCORE_VAGOTOMY_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Protective anatomy",
  "text": "Most duodenal ulcers occur in the first portion: **anterior ulcers tend to perforate; posterior ulcers tend to bleed.** Gastric perforations often involve the anterior lesser-curve region. Posterior leakage may be contained in the lesser sac.",
  "id": "upper-gi-gastroduodenal-perforation-repair-03"
}, [[FISER_STOMACH_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "Causes and presentation",
  "text": "H. pylori and NSAIDs are major drivers; review smoking, steroids, recurrent ulcer history, acid hypersecretion, and possible malignancy. A repaired hole is not a completed treatment plan if the underlying ulcer cause remains.",
  "id": "upper-gi-gastroduodenal-perforation-repair-04"
}, SCORE_GASTRODUODENAL_PERFORATION_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Causes and presentation",
  "text": "Sudden severe epigastric pain may progress to generalized peritonitis, fever, and tachycardia. Pain may be localized with a contained leak or referred toward the shoulder/subphrenic region. Older, immunosuppressed, or already hospitalized patients may have less dramatic symptoms; deterioration and peritoneal signs matter more than a classic story.",
  "id": "upper-gi-gastroduodenal-perforation-repair-05"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "Establish the diagnosis without delaying source control",
  "text": "CT is more sensitive than a plain film for a small perforation and can show extraluminal air, free/contained fluid, wall thickening, or a defect. An upright chest film may identify subdiaphragmatic air, but absence of free air does not exclude perforation. Water-soluble contrast imaging can help assess a suspected sealed leak when the initial study is inconclusive and the patient is stable.",
  "id": "upper-gi-gastroduodenal-perforation-repair-06"
}, [[SCORE_GASTRODUODENAL_PERFORATION_SOURCE, WSES_PEPTIC_ULCER_2020_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Establish the diagnosis without delaying source control",
  "text": "**Do not make a deteriorating patient wait for an elaborate localization study.** Diffuse peritonitis, sepsis, free spillage, and hemodynamic instability are operative triggers. The goal is timely source control with simultaneous resuscitation.",
  "id": "upper-gi-gastroduodenal-perforation-repair-07"
}, SCORE_GASTRODUODENAL_PERFORATION_SOURCE),
  sourcedUnits({
  "type": "sequence",
  "heading": "Resuscitation and preparation",
  "steps": [
    {
      "title": "Step 1",
      "detail": "Keep NPO; obtain IV access, correct volume depletion and electrolyte abnormalities, and monitor hemodynamics. Vomiting and reduced intake commonly leave substantial deficits."
    },
    {
      "title": "Step 2",
      "detail": "Give IV PPI and broad-spectrum antibacterial treatment covering enteric gram-negative organisms and anaerobes; account for local resistance and clinical context."
    },
    {
      "title": "Step 3",
      "detail": "Arrange gastric decompression and operative access while evaluating the safest approach. A severely unstable patient needs an operation that can achieve control promptly."
    },
    {
      "title": "Step 4",
      "detail": "Do not add routine empiric antifungal treatment solely because this is a perforated ulcer. Consider it selectively for high-risk patients or microbiologic findings. This differs from the unqualified yeast coverage in the supplied Fiser text."
    }
  ],
  "id": "upper-gi-gastroduodenal-perforation-repair-08"
}, [[SCORE_GASTRODUODENAL_PERFORATION_SOURCE], [SCORE_GASTRODUODENAL_PERFORATION_SOURCE], [SCORE_GASTRODUODENAL_PERFORATION_SOURCE], [SCORE_GASTRODUODENAL_PERFORATION_SOURCE, WSES_PEPTIC_ULCER_2020_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Resuscitation and preparation",
  "text": "The precise drug, dose, renal adjustment, and duration are not standardized by this guide. After adequate source control, WSES suggests a short antibacterial course of approximately **3–5 days**, with reassessment if infection persists.",
  "id": "upper-gi-gastroduodenal-perforation-repair-09"
}, WSES_PEPTIC_ULCER_2020_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "Who can be observed without an operation",
  "text": "Nonoperative care is an exception for a stable, nonperitonitic patient with a demonstrably sealed/contained perforation and no active contrast extravasation. It requires bowel rest, IV fluids, PPI, antibiotics, serial examination and monitoring, and immediate ability to operate if the condition worsens. A contained collection on one scan is not enough if physiology is deteriorating.",
  "id": "upper-gi-gastroduodenal-perforation-repair-10"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Who can be observed without an operation",
  "text": "**Failure signals:** worsening pain or peritonitis, instability, sepsis, or ongoing leakage. Escalate to operative source control rather than merely extending fasting. The supplied text acknowledges no formal reimaging schedule; its proposed 2–7-day fasting interval is expert practice, not a universal rule.",
  "id": "upper-gi-gastroduodenal-perforation-repair-11"
}, SCORE_GASTRODUODENAL_PERFORATION_SOURCE),
  sourcedUnits({
  "type": "table",
  "heading": "Choose the repair by site size and tissue",
  "columns": [
    "Finding",
    "Practical operative direction"
  ],
  "rows": [
    [
      "Small duodenal defect with usable surrounding tissue",
      "Primary repair with or without omental reinforcement, chosen by tissue quality; avoid sutures that tear through the edge."
    ],
    [
      "Large/friable duodenal defect, approximately 2 cm or greater",
      "Tailor repair or reconstruction; evaluate ampulla, duodenal viability, decompression, and feeding access. A patch is not automatically durable."
    ],
    [
      "Gastric ulcer in an unstable patient",
      "Limited closure/omental repair or wedge excision for source control, with malignancy sampling when safe."
    ],
    [
      "Large gastric ulcer or repair that would narrow pylorus/GE junction",
      "Formal resection/reconstruction may be required if physiology permits."
    ],
    [
      "Stable patient with genuinely refractory high-acid disease",
      "Consider added acid reduction after evaluating the specific indication and operative burden."
    ]
  ],
  "id": "upper-gi-gastroduodenal-perforation-repair-12"
}, [[SCORE_GASTRODUODENAL_PERFORATION_SOURCE, WSES_PEPTIC_ULCER_2020_SOURCE], [SCORE_GASTRODUODENAL_PERFORATION_SOURCE, WSES_PEPTIC_ULCER_2020_SOURCE], [SCORE_GASTRODUODENAL_PERFORATION_SOURCE], [SCORE_GASTRODUODENAL_PERFORATION_SOURCE], [SCORE_GASTRODUODENAL_PERFORATION_SOURCE, SCORE_VAGOTOMY_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Choose the repair by site size and tissue",
  "text": "The source's small/large categories leave the exact 2-cm boundary imprecise. Size is a warning about failure risk, not a substitute for examining tissue, contamination, anatomy, and physiology.",
  "id": "upper-gi-gastroduodenal-perforation-repair-13"
}, SCORE_GASTRODUODENAL_PERFORATION_SOURCE),
  sourced({
  "type": "sequence",
  "heading": "Small duodenal perforation: operative sequence",
  "steps": [
    {
      "title": "Expose and identify the defect",
      "detail": "Assess site, contamination, adjacent tissue, and whether the presumed duodenal ulcer is actually gastric or a different lesion."
    },
    {
      "title": "Assess closure quality",
      "detail": "Friable edges can split with suturing; avoid enlarging the opening through repeated attempts at a tight primary closure."
    },
    {
      "title": "Bring vascularized omentum without tension",
      "detail": "Use a viable tongue to cover/reinforce the defect, securing sutures in tissue that can hold. Primary closure before patching is selective, not compulsory."
    },
    {
      "title": "Address contamination and decompression",
      "detail": "Irrigate, consider drains according to defect/repair risk, and decompress the stomach. SCORE describes wide drainage; routine drainage for every low-risk repair is not established by the supplied comparison evidence."
    },
    {
      "title": "Plan enteral access when needed",
      "detail": "A large or complex repair may justify feeding jejunostomy; the source's broad advice to obtain access is individualized rather than an instruction to place a tube in every small repair."
    }
  ],
  "id": "upper-gi-gastroduodenal-perforation-repair-14"
}, SCORE_GASTRODUODENAL_PERFORATION_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Small duodenal perforation: operative sequence",
  "text": "**Name the construction, not just the eponym.** The PUD module distinguishes a free omental Graham plug from a pedicled modified Graham repair, while the procedure module calls a vascularized tongue a Graham patch. Describe primary closure versus patch-only, tissue viability, and fixation in the operative reasoning.",
  "id": "upper-gi-gastroduodenal-perforation-repair-15"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "Large duodenal defects and difficult rescue",
  "text": "Available options include an omental/falciform plug, a jejunal serosal patch, resection with reconstruction, or diversion/decompression. None is a universal next step. The ampulla and inflamed duodenal stump make aggressive resection hazardous; stabilize the patient and choose a repair that the tissue can support.",
  "id": "upper-gi-gastroduodenal-perforation-repair-16"
}, SCORE_GASTRODUODENAL_PERFORATION_SOURCE),
  sourced({
  "type": "table",
  "heading": "↳ Large duodenal defects and difficult rescue",
  "columns": [
    "Technique",
    "Purpose and limitation"
  ],
  "rows": [
    [
      "Jejunal serosal patch, often called Thal patch",
      "Cover a duodenal defect with an adjacent jejunal serosal surface; requires an appropriate local anatomy and viable tissue."
    ],
    [
      "Triple-tube approach",
      "Gastrostomy and retrograde jejunostomy decompress; antegrade jejunostomy feeds. This is a selected protection strategy, not routine repair."
    ],
    [
      "Gastrojejunostomy with/without pyloric exclusion",
      "Diverts flow away from a difficult duodenal repair; exclusion is temporary."
    ],
    [
      "Resection/reconstruction",
      "May be necessary when local repair is unsuitable; balance disease removal against duct injury, stump leak, and physiologic cost."
    ]
  ],
  "id": "upper-gi-gastroduodenal-perforation-repair-17"
}, SCORE_GASTRODUODENAL_PERFORATION_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Large duodenal defects and difficult rescue",
  "text": "A patient in shock may need an abbreviated source-control operation. A definitive ulcer operation or elaborate reconstruction should not be added merely to satisfy a historical procedure label.",
  "id": "upper-gi-gastroduodenal-perforation-repair-18"
}, [[SCORE_GASTRODUODENAL_PERFORATION_SOURCE, WSES_PEPTIC_ULCER_2020_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "Gastric perforation and reconstruction",
  "text": "**Malignancy assessment is essential.** Obtain ulcer tissue when safe, review the pathology, and arrange interval endoscopic evaluation if definitive sampling was not possible or results are uncertain. A patch that stops contamination does not rule out gastric cancer.",
  "id": "upper-gi-gastroduodenal-perforation-repair-19"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Gastric perforation and reconstruction",
  "text": "Distal ulcers may permit antrectomy. Billroth I restores gastroduodenal continuity, Billroth II uses a gastrojejunostomy, and Roux-en-Y is another reconstructive option. Duodenal fibrosis/inflammation can prevent a safe Billroth I. Proximal ulcers near the GE junction may make wedge excision deforming and sometimes require more extensive individualized reconstruction.",
  "id": "upper-gi-gastroduodenal-perforation-repair-20"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Gastric perforation and reconstruction",
  "text": "Do not convert “gastric ulcer needs biopsy” into “every unstable patient needs immediate oncologic gastrectomy.” Control contamination, preserve viable anatomy, and stage additional treatment according to physiology and pathology.",
  "id": "upper-gi-gastroduodenal-perforation-repair-21"
}, SCORE_GASTRODUODENAL_PERFORATION_SOURCE),
  sourced({
  "type": "prose",
  "heading": "Postoperative assessment and leak rescue",
  "text": "Initial care includes decompression/bowel rest as indicated, IV PPI, treatment of contamination, and reassessment of fluid/electrolyte and nutritional needs. Follow the clinical course and any drain output. SCORE describes contrast CT or an upper GI study before oral intake as an option; the guide does not impose a universal imaging or feeding day.",
  "id": "upper-gi-gastroduodenal-perforation-repair-22"
}, SCORE_GASTRODUODENAL_PERFORATION_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Postoperative assessment and leak rescue",
  "text": "New tachycardia, fever, pain/peritonitis, intolerance of intake, or suspicious drain output should prompt evaluation for leak, bleeding, or uncontrolled infection. The exact CT/drainage/reoperation algorithm requires a contemporary complication-specific source and is flagged rather than inferred from the chapter's complication list.",
  "id": "upper-gi-gastroduodenal-perforation-repair-23"
}, [[SCORE_GASTRODUODENAL_PERFORATION_SOURCE, SCORE_EGD_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Postoperative assessment and leak rescue",
  "text": "Review all operative pathology. Treat H. pylori with the [[Peptic Ulcer Disease]], stop avoidable NSAIDs, and address nicotine use. Consider ongoing acid protection when the ulcerogenic exposure cannot be removed. Recurrent disease warrants evaluation for persistent H. pylori, NSAIDs, malignancy, or hypersecretion.",
  "id": "upper-gi-gastroduodenal-perforation-repair-24"
}, SCORE_GASTRODUODENAL_PERFORATION_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "Late consequences worth anticipating",
  "text": "After resection or vagotomy, consider dumping, delayed emptying, diarrhea, alkaline reflux, nutritional deficiencies, marginal ulceration, and afferent-loop problems. The exact reconstruction predicts the complication: keep the operative anatomy in the handoff, rather than describing every procedure as a “partial gastrectomy.” The [[Peptic Ulcer Disease]] and [[Vagotomy and Drainage]] provide the differential.",
  "id": "upper-gi-gastroduodenal-perforation-repair-25"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourcedUnits({
  "type": "bullets",
  "heading": "Board pearls",
  "items": [
    "**No free air does not exclude perforation.** CT is more informative for a small defect.",
    "Nonoperative management requires a sealed leak **and** stable physiology without peritonitis.",
    "Gastric perforation needs a malignancy plan; duodenal repair needs an ampullary/bile-duct safety plan.",
    "Omental-patch names vary across the supplied modules. Describe what is done.",
    "Prior PPI use alone does not mandate a vagotomy during an emergency repair.",
    "For a giant duodenal ulcer, the next decision is safe source control and anatomy, not simply a larger patch."
  ],
  "id": "upper-gi-gastroduodenal-perforation-repair-26"
}, [[SCORE_GASTRODUODENAL_PERFORATION_SOURCE], [SCORE_GASTRODUODENAL_PERFORATION_SOURCE], [SCORE_GASTRODUODENAL_PERFORATION_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE], [FISER_STOMACH_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE], [SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "Board answer versus current practice",
  "columns": [
    "Question",
    "Supplied board-source teaching",
    "Current practice or source correction"
  ],
  "rows": [
    [
      "Antifungal coverage",
      "Fiser lists yeast coverage during initial treatment.",
      "SCORE/WSES reserve empiric antifungals for selected high-risk circumstances rather than every perforation."
    ],
    [
      "Added acid surgery",
      "Fiser links prior PPI treatment with a need for acid-reducing surgery.",
      "The procedure module limits added acid reduction to selected stable patients with an appropriate ulcer indication."
    ]
  ],
  "id": "upper-gi-gastroduodenal-perforation-repair-27"
}, [[FISER_STOMACH_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE, WSES_PEPTIC_ULCER_2020_SOURCE], [FISER_STOMACH_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourced({
  "type": "flow",
  "heading": "Perforation: physiology before reconstruction",
  "nodes": [
    {
      "id": "suspect",
      "label": "Suspected gastroduodenal perforation"
    },
    {
      "id": "prepare",
      "label": "Resuscitate, NPO, IV PPI and broad-spectrum antibiotics"
    },
    {
      "id": "emergency",
      "label": "Instability, peritonitis, sepsis or free spillage"
    },
    {
      "id": "operate",
      "label": "Prompt operative source control"
    },
    {
      "id": "contained",
      "label": "Stable, nonperitonitic and sealed leak without extravasation"
    },
    {
      "id": "observe",
      "label": "Selected nonoperative care with close monitoring and ability to operate"
    },
    {
      "id": "worse",
      "label": "Clinical deterioration or ongoing leak"
    },
    {
      "id": "healed",
      "label": "Improves with a sealed leak: reassess feeding and treat the ulcer cause"
    }
  ],
  "edges": [
    {
      "to": "prepare",
      "from": "suspect"
    },
    {
      "to": "emergency",
      "from": "prepare"
    },
    {
      "to": "contained",
      "from": "prepare"
    },
    {
      "to": "operate",
      "from": "emergency"
    },
    {
      "to": "observe",
      "from": "contained"
    },
    {
      "to": "worse",
      "from": "observe",
      "label": "Deteriorates"
    },
    {
      "to": "operate",
      "from": "worse"
    },
    {
      "from": "observe",
      "to": "healed",
      "label": "Improves"
    }
  ],
  "id": "upper-gi-gastroduodenal-perforation-repair-28"
}, SCORE_GASTRODUODENAL_PERFORATION_SOURCE),
  references("upper-gi-gastroduodenal-perforation-repair-references", [SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE, SCORE_VAGOTOMY_SOURCE, SCORE_EGD_SOURCE, WSES_PEPTIC_ULCER_2020_SOURCE]),
];

export const gastroduodenalPerforationRepairTopic = buildTopic({
  "id": "00000000-0000-4000-8000-000000004721",
  "versionId": "00000000-0000-4000-8000-000000004731",
  "slug": "gastroduodenal-perforation-repair",
  "title": "Gastroduodenal Perforation Repair",
  "aliases": [
    "perforated peptic ulcer repair",
    "Graham patch",
    "modified Graham patch",
    "Thal patch"
  ],
  "scoreNodeId": "stomach-procedures",
  "scoreCategory": "SCORE · Stomach · Operations & Procedures",
  "tags": [
    "upper-gi",
    "absite",
    "score"
  ],
  "sourceId": SCORE_GASTRODUODENAL_PERFORATION_SOURCE,
  "additionalSourceIds": [
    SCORE_PEPTIC_ULCER_SOURCE,
    FISER_STOMACH_SOURCE,
    SCORE_VAGOTOMY_SOURCE,
    SCORE_EGD_SOURCE,
    WSES_PEPTIC_ULCER_2020_SOURCE
  ],
  "blocks": blocks,
  "reviewedAt": "2026-10-22T00:00:00.000Z"
});
