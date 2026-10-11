import { buildTopic, references, sourced } from "@/content/authoring";
import { SCORE_SVC_SOURCE, CIRSE_SVC_SOURCE, SVC_PACKET_SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
  "id": "block-superior-vena-cava-syndrome-1",
  "type": "summary",
  "heading": "At a glance",
  "text": "Obstruction of the **SVC** causes facial, neck and arm swelling with distended chest-wall veins. Think thoracic malignancy or device-associated thrombosis/stenosis. Most presentations allow prompt investigation; **stridor, altered consciousness or hemodynamic compromise** require emergency assessment. Contrast-enhanced chest CT defines the obstruction and its cause."
}, SCORE_SVC_SOURCE),
  sourced({
  "id": "block-superior-vena-cava-syndrome-2",
  "type": "table",
  "heading": "Recognize the pattern",
  "columns": [
    "Finding",
    "Implication"
  ],
  "rows": [
    [
      "Face and both arms swollen; chest-wall collaterals",
      "Central venous outflow obstruction; collateral development changes the severity"
    ],
    [
      "Lung or mediastinal mass",
      "Lung cancer, lymphoma or another mediastinal tumor"
    ],
    [
      "Pacemaker leads or a long-term central catheter",
      "Thrombus and/or fibrotic stenosis; common benign mechanism"
    ],
    [
      "Rapid progression, stridor, confusion or syncope",
      "Assess airway, cerebral edema and circulation immediately"
    ]
  ]
}, SCORE_SVC_SOURCE),
  sourced({
  "id": "block-superior-vena-cava-syndrome-3",
  "type": "sequence",
  "heading": "Workup",
  "steps": [
    {
      "title": "Define severity",
      "detail": "Head elevation, oxygen as needed and coordinated airway/vascular assessment for severe symptoms; avoid casually sedating a patient with a compressive mediastinal mass."
    },
    {
      "title": "Define anatomy",
      "detail": "Contrast-enhanced CT of the chest evaluates mass, thrombus, narrowing and collaterals. Catheter venography is useful when proceeding to intervention."
    },
    {
      "title": "Obtain tissue",
      "detail": "When stable and malignancy is unconfirmed, obtain the least invasive diagnostic biopsy before tumor-directed treatment. Histology determines systemic therapy and radiation planning."
    }
  ]
}, SCORE_SVC_SOURCE),
  sourced({
  "id": "block-superior-vena-cava-syndrome-4",
  "type": "bullets",
  "heading": "When to consider stenting",
  "items": [
    "Endovascular treatment offers rapid relief for symptomatic obstruction; emergency indications include stridor/airway edema or depressed consciousness from cerebral venous hypertension.",
    "An asymptomatic radiographic stenosis alone is not an indication for primary stenting.",
    "A highly treatment-responsive malignancy is a **relative**, not absolute, reason to favor initial oncologic treatment when symptoms permit. Stenting does not replace treatment of the underlying disease."
  ]
}, CIRSE_SVC_SOURCE),
  sourced({
  "id": "block-superior-vena-cava-syndrome-5",
  "type": "table",
  "heading": "Treat the cause",
  "columns": [
    "Cause",
    "Management principle"
  ],
  "rows": [
    [
      "Malignancy",
      "Histology-directed oncology treatment; add endovascular relief according to severity and goals"
    ],
    [
      "Acute thrombotic obstruction",
      "Anticoagulation if safe; selected thrombus removal with assessment of the residual stenosis"
    ],
    [
      "Device-related disease",
      "Assess whether the device is needed and functional; removal/extraction and reconstruction require a coordinated plan"
    ],
    [
      "Refractory obstruction",
      "Open venous bypass or reconstruction is uncommon and reserved for selected failures"
    ]
  ]
}, SVC_PACKET_SOURCE),
  sourced({
  "id": "block-superior-vena-cava-syndrome-6",
  "type": "warning",
  "heading": "Avoid automatic treatments",
  "tone": "danger",
  "text": "Steroids and diuretics have limited evidence for routine SVC obstruction; use them for a specific indication. Nonthrombotic stenosis alone does not establish a need for indefinite anticoagulation. An **IVC filter cannot protect against upper-extremity or SVC thrombus**."
}, SVC_PACKET_SOURCE),
  sourced({
  "id": "block-superior-vena-cava-syndrome-7",
  "type": "table",
  "heading": "Board answer versus current practice",
  "columns": [
    "Question",
    "Classic teaching",
    "Current interpretation"
  ],
  "rows": [
    [
      "Is every SVC syndrome an emergency?",
      "Immediate radiation",
      "Urgency follows airway, neurologic and hemodynamic severity; obtain tissue first when stable"
    ],
    [
      "Which cancer?",
      "Small cell lung cancer",
      "Lung cancer and lymphoma are key; small cell has a high propensity, while cohort-specific histology frequencies vary"
    ],
    [
      "Chemo-sensitive tumor and a stent",
      "Never stent",
      "Relative concern; severe symptoms may still require rapid endovascular relief"
    ]
  ]
}, SVC_PACKET_SOURCE),
  references("block-superior-vena-cava-syndrome-references", [SCORE_SVC_SOURCE, CIRSE_SVC_SOURCE, SVC_PACKET_SOURCE]),
];

export const superiorVenaCavaSyndromeTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000002870",
  slug: "superior-vena-cava-syndrome",
  title: "Superior Vena Cava Syndrome",
  aliases: ["SVC syndrome", "SVCS", "superior vena cava obstruction", "central venous obstruction"],
  versionId: "00000000-0000-4000-8000-000000002871",
  scoreNodeId: "thoracic-conditions",
  scoreCategory: "SCORE · Thoracic Surgery · Diseases & Conditions",
  tags: ["absite", "score", "venous"],
  sourceId: SCORE_SVC_SOURCE,
  additionalSourceIds: [CIRSE_SVC_SOURCE, SVC_PACKET_SOURCE],
  blocks,
  reviewedAt: "2026-10-10T00:00:00.000Z",
});
