import { buildTopic, references, sourced } from "@/content/authoring";
import { SCORE_VTE_PROPHYLAXIS_SOURCE, CHEST_SURGICAL_PROPHYLAXIS_2012_SOURCE, ASH_SURGICAL_PROPHYLAXIS_2019_SOURCE, VTE_PROPHYLAXIS_PACKET_SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
  "id": "block-prophylaxis-of-venous-thromboembolism-1",
  "type": "summary",
  "heading": "At a glance",
  "text": "Assess **VTE risk and bleeding risk separately**, then choose ambulation, intermittent pneumatic compression (IPC), pharmacologic prophylaxis or a combination. Reassess as mobility and bleeding risk change. Major abdominopelvic cancer surgery is the classic setting for **four weeks of postoperative prophylaxis**; this is not four extra weeks after discharge."
}, SCORE_VTE_PROPHYLAXIS_SOURCE),
  sourced({
  "id": "block-prophylaxis-of-venous-thromboembolism-2",
  "type": "table",
  "heading": "Caprini: general and abdominal-pelvic surgery",
  "columns": [
    "Score",
    "Risk band",
    "If bleeding risk is acceptable"
  ],
  "rows": [
    [
      "0",
      "Very low",
      "Early ambulation"
    ],
    [
      "1–2",
      "Low",
      "IPC preferred"
    ],
    [
      "3–4",
      "Moderate",
      "LMWH, low-dose UFH or IPC"
    ],
    [
      "5 or more",
      "High",
      "LMWH or low-dose UFH; add mechanical prophylaxis when feasible"
    ]
  ]
}, CHEST_SURGICAL_PROPHYLAXIS_2012_SOURCE),
  sourced({
  "id": "block-prophylaxis-of-venous-thromboembolism-3",
  "type": "warning",
  "heading": "High bleeding risk changes the plan",
  "tone": "danger",
  "text": "For moderate/high VTE risk with active bleeding or severe consequences from bleeding, use **IPC** until pharmacologic prophylaxis becomes safe. Reassess daily. A prophylactic IVC filter is not a substitute."
}, CHEST_SURGICAL_PROPHYLAXIS_2012_SOURCE),
  sourced({
  "id": "block-prophylaxis-of-venous-thromboembolism-4",
  "type": "bullets",
  "heading": "Major general surgery",
  "items": [
    "ASH favors pharmacologic prophylaxis with **LMWH or UFH** for major general surgery when the balance of bleeding and thrombosis permits.",
    "Procedure-specific exceptions matter; do not apply the same rule indiscriminately to low-risk laparoscopic procedures, neurosurgery and major abdominal surgery.",
    "Mechanical methods reduce stasis; ensure the devices are worn and working. Early mobilization complements the selected prophylaxis."
  ]
}, ASH_SURGICAL_PROPHYLAXIS_2019_SOURCE),
  sourced({
  "id": "block-prophylaxis-of-venous-thromboembolism-5",
  "type": "bullets",
  "heading": "Drug and catheter checks",
  "items": [
    "Renal impairment can cause LMWH accumulation: use the product’s renal adjustment or an appropriate alternative such as UFH; obesity also requires an institution-specific dosing plan.",
    "Check platelet count and a history of HIT; suspected HIT requires avoidance of heparins and a separate diagnostic/treatment pathway.",
    "Neuraxial insertion, removal and restarting anticoagulants each have timing requirements. They depend on agent, prophylactic versus therapeutic dose, renal function and catheter status. Confirm the current anesthesia protocol; **12 hours is not a universal rule**."
  ]
}, VTE_PROPHYLAXIS_PACKET_SOURCE),
  sourced({
  "id": "block-prophylaxis-of-venous-thromboembolism-6",
  "type": "prose",
  "heading": "Extended prophylaxis",
  "text": "For high-risk abdominal/pelvic cancer surgery, CHEST recommends about **28 days in total after surgery** with LMWH. Discharge planning includes the remaining course, administration teaching and bleeding review. Other operations and very high-risk patients need individualized decisions; a high Caprini score alone does not establish one universal duration."
}, CHEST_SURGICAL_PROPHYLAXIS_2012_SOURCE),
  sourced({
  "id": "block-prophylaxis-of-venous-thromboembolism-7",
  "type": "table",
  "heading": "Board answer versus current practice",
  "columns": [
    "Question",
    "Classic shortcut",
    "Use the context"
  ],
  "rows": [
    [
      "Aspirin prevents postoperative VTE",
      "An alternative to heparin",
      "Orthopedic fracture/arthroplasty evidence does not establish aspirin as standard major general-surgery prophylaxis"
    ],
    [
      "Every high-risk discharge",
      "28 days after discharge",
      "The classic cancer-surgery course totals four weeks from surgery; other extended courses are individualized"
    ],
    [
      "An epidural and prophylaxis",
      "Wait 12 hours",
      "Agent, dose, renal function and catheter timing all matter"
    ]
  ]
}, VTE_PROPHYLAXIS_PACKET_SOURCE),
  sourced({
  "id": "block-prophylaxis-of-venous-thromboembolism-8",
  "type": "bullets",
  "heading": "High-yield checks",
  "items": [
    "Prior VTE, cancer, immobility, trauma, obesity and a prolonged operation increase concern; use the specified risk model rather than a remembered label.",
    "New unilateral swelling or unexplained hypoxemia calls for diagnostic evaluation, not simply increasing prophylactic dosing.",
    "Prophylaxis reduces risk but does not eliminate DVT or PE."
  ]
}, SCORE_VTE_PROPHYLAXIS_SOURCE),
  references("block-prophylaxis-of-venous-thromboembolism-references", [SCORE_VTE_PROPHYLAXIS_SOURCE, CHEST_SURGICAL_PROPHYLAXIS_2012_SOURCE, ASH_SURGICAL_PROPHYLAXIS_2019_SOURCE, VTE_PROPHYLAXIS_PACKET_SOURCE]),
];

export const prophylaxisOfVenousThromboembolismTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000002970",
  slug: "prophylaxis-of-venous-thromboembolism",
  title: "Prophylaxis of Venous Thromboembolism",
  aliases: ["VTE prophylaxis", "DVT prophylaxis", "perioperative thromboprophylaxis", "Caprini score", "mechanical prophylaxis", "intermittent pneumatic compression", "extended VTE prophylaxis"],
  versionId: "00000000-0000-4000-8000-000000002971",
  scoreNodeId: "perioperative-care",
  scoreCategory: "SCORE · Preoperative Evaluation and Perioperative Care",
  tags: ["absite", "score", "venous"],
  sourceId: SCORE_VTE_PROPHYLAXIS_SOURCE,
  additionalSourceIds: [CHEST_SURGICAL_PROPHYLAXIS_2012_SOURCE, ASH_SURGICAL_PROPHYLAXIS_2019_SOURCE, VTE_PROPHYLAXIS_PACKET_SOURCE],
  blocks,
  reviewedAt: "2026-10-10T00:00:00.000Z",
});
