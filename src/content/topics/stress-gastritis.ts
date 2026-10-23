import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  SCORE_PEPTIC_ULCER_SOURCE,
  FISER_STOMACH_SOURCE,
  SCORE_GASTRODUODENAL_PERFORATION_SOURCE,
  SCORE_UPPER_GI_BLEEDING_SOURCE,
  SCORE_STRESS_GASTRITIS_SOURCE,
  SCORE_EGD_SOURCE,
  SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE,
  ACG_UGIB_2021_SOURCE
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Converted from docs/study-guides/upper-gi/stress-gastritis.md. Per-topic sign-off items: docs/study-guides/upper-gi/review.md.
const blocks: TopicBlock[] = [
  sourcedUnits({
  "type": "summary",
  "heading": "At a glance",
  "text": "Stress-related mucosal disease follows major physiologic illness and impaired gastric mucosal defense. **Mucosal injury is common in critical illness; clinically important bleeding is much less common.** Restore perfusion and provide appropriate enteral nutrition, assess bleeding risk, and use prophylaxis when indicated. Once significant bleeding occurs, treat it as UGIB rather than assuming a prophylactic dose of acid suppression is sufficient.",
  "id": "upper-gi-stress-gastritis-01"
}, [[FISER_STOMACH_SOURCE, SCORE_STRESS_GASTRITIS_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "Mechanism and classic associations",
  "text": "Reduced mucosal blood flow, mucus, and bicarbonate weaken the barrier against luminal acid. Hypoxia, shock, sepsis, trauma, and organ failure therefore promote injury even without a primary hypersecretory disorder. Head injury may additionally increase acid stimulation. “Stress” here means critical physiologic illness, not ordinary psychological stress.",
  "id": "upper-gi-stress-gastritis-02"
}, SCORE_STRESS_GASTRITIS_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Mechanism and classic associations",
  "text": "**Cushing ulcer** is the classic head-injury association; **Curling ulcer** is associated with major burns, classically duodenal. These associations help recognize the source context but do not substitute for evaluating the lesion or the patient's actual bleeding risk.",
  "id": "upper-gi-stress-gastritis-03"
}, [[FISER_STOMACH_SOURCE, SCORE_STRESS_GASTRITIS_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "Risk factors: source teaching versus prophylaxis decisions",
  "columns": [
    "Context",
    "Interpretation"
  ],
  "rows": [
    [
      "Shock, hypotension, sepsis, organ failure",
      "Impaired perfusion and mucosal defense are central mechanisms."
    ],
    [
      "Coagulopathy",
      "A major listed risk factor; worsens the consequence of mucosal injury."
    ],
    [
      "Prolonged ventilation, classically >48 hours",
      "A familiar board-source risk factor; current guidance does not establish ventilation alone as sufficient."
    ],
    [
      "Neurocritical illness",
      "A separate prophylaxis population in the contemporary guidance."
    ],
    [
      "Major burns, major trauma, transfusion burden, hepatic/renal dysfunction",
      "Important clinical context from SCORE; assess the complete illness rather than giving prophylaxis to everyone with one historical association."
    ],
    [
      "Prior ulcer/bleeding, H. pylori, smoking or ulcerogenic drugs",
      "May signal ordinary peptic disease in addition to stress injury."
    ]
  ],
  "id": "upper-gi-stress-gastritis-04"
}, [[SCORE_STRESS_GASTRITIS_SOURCE], [SCORE_STRESS_GASTRITIS_SOURCE], [SCORE_STRESS_GASTRITIS_SOURCE, SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE], [SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE], [SCORE_STRESS_GASTRITIS_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_STRESS_GASTRITIS_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Risk factors: source teaching versus prophylaxis decisions",
  "text": "The local source's incidence ranges and burn/transfusion cutoffs are historical teaching context, not a validated bedside calculator. Keep the distinction between **visible/occult blood**, **overt bleeding**, and **bleeding with physiologic or transfusion consequences**.",
  "id": "upper-gi-stress-gastritis-05"
}, [[SCORE_STRESS_GASTRITIS_SOURCE, SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "Prevention pathway",
  "text": "**Current-practice addition, SCCM/ASHP 2024:** consider critically ill adults with **coagulopathy, shock, or chronic liver disease** at risk. Use a **PPI or H2-receptor antagonist** at a low-dose prophylactic regimen; enteral or IV administration is acceptable. Provide enteral nutrition when appropriate. Enteral feeding does not remove the prophylaxis indication in a patient who remains high risk; avoid routine prophylaxis in enterally fed low-risk patients. Neurocritical patients are a separate conditional indication. Stop stress prophylaxis when the relevant risk resolves and reconcile it before ICU transfer, preserving another genuine treatment indication if present. Mechanical ventilation alone has insufficient evidence as an independent trigger.",
  "id": "upper-gi-stress-gastritis-06"
}, SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE),
  sourced({
  "type": "prose",
  "heading": "↳ Prevention pathway",
  "text": "This pathway should be documented as a daily indication: why prophylaxis is needed now, which agent/route is appropriate, and what would allow it to stop. Do not turn an ICU standing order into indefinite outpatient acid suppression.",
  "id": "upper-gi-stress-gastritis-07"
}, SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE),
  sourcedUnits({
  "type": "table",
  "heading": "Compare prevention tools",
  "columns": [
    "Tool",
    "Mechanism/use",
    "Important distinction"
  ],
  "rows": [
    [
      "Enteral nutrition",
      "Supports mucosal protection and reduces stress-ulcer risk.",
      "A prevention measure, not treatment of an uncontrolled bleed."
    ],
    [
      "PPI",
      "Inhibits parietal H+/K+-ATPase.",
      "Prophylaxis and post-hemostasis high-dose treatment are different regimens."
    ],
    [
      "H2 blocker",
      "Reduces histamine-mediated parietal stimulation.",
      "A contemporary first-line prophylaxis option alongside PPI."
    ],
    [
      "Sucralfate",
      "Coats/protects mucosa.",
      "Listed in the source; it is not the guideline's preferred first-line class."
    ],
    [
      "Antacids",
      "Neutralize acid already in the lumen.",
      "Do not confuse neutralization with definitive hemostasis."
    ],
    [
      "Prostanoids",
      "Reduce acid stimulation/protective imbalance in source teaching.",
      "Listed mechanism, not a default ICU prophylaxis prescription."
    ]
  ],
  "id": "upper-gi-stress-gastritis-08"
}, [[SCORE_STRESS_GASTRITIS_SOURCE], [SCORE_STRESS_GASTRITIS_SOURCE, SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE, ACG_UGIB_2021_SOURCE], [SCORE_STRESS_GASTRITIS_SOURCE, SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE], [SCORE_STRESS_GASTRITIS_SOURCE, SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE], [SCORE_STRESS_GASTRITIS_SOURCE], [SCORE_STRESS_GASTRITIS_SOURCE, SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Compare prevention tools",
  "text": "Exact prophylaxis doses and renal adjustments must follow the selected drug and local formulary. The guideline defines low-dose ceilings, but this guide does not substitute a single dose for the full drug-specific assessment.",
  "id": "upper-gi-stress-gastritis-09"
}, SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "Recognize clinically important bleeding",
  "text": "Presentation ranges from no symptoms or a small amount of blood in a gastric tube to hematemesis, anemia, or hemodynamic compromise. A declining hemoglobin warrants a broader bleeding/illness assessment; stress gastritis is not established by a positive stool test or the fact that a patient is in the ICU.",
  "id": "upper-gi-stress-gastritis-10"
}, [[SCORE_UPPER_GI_BLEEDING_SOURCE, SCORE_STRESS_GASTRITIS_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Recognize clinically important bleeding",
  "text": "For overt or consequential bleeding, assess perfusion, airway/aspiration risk, transfusion requirements, medication exposures, and other upper sources. Use the [[Upper Gastrointestinal Bleeding]]. A prophylaxis indication should not distract from a new ordinary ulcer, varix, tear, or postoperative source.",
  "id": "upper-gi-stress-gastritis-11"
}, [[SCORE_UPPER_GI_BLEEDING_SOURCE, SCORE_STRESS_GASTRITIS_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "Endoscopy and histology",
  "text": "Early stress lesions may appear within the first day as multiple shallow erosions, focal erythema and hemorrhage, often beginning in the fundus and progressing distally. Later lesions can show organized clot/exudate and a healing-mucosa appearance. Fiser describes clinical stress gastritis several days after the precipitating event, which need not contradict earlier microscopic/endoscopic injury.",
  "id": "upper-gi-stress-gastritis-12"
}, [[FISER_STOMACH_SOURCE, SCORE_STRESS_GASTRITIS_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Endoscopy and histology",
  "text": "Endoscopy identifies the mucosal pattern and can treat a focal bleeding point. If tissue is obtained, SCORE describes friability, coagulation necrosis and lymphocyte infiltration of the lamina propria. Its wording “endoscopy with biopsy is required” is not adopted as a requirement to biopsy every actively bleeding erosion; the question is whether tissue would change diagnosis and can be sampled safely. Barium studies are not the diagnostic pathway for acute mucosal bleeding.",
  "id": "upper-gi-stress-gastritis-13"
}, [[SCORE_STRESS_GASTRITIS_SOURCE, SCORE_EGD_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "Classification: keep two systems separate",
  "text": "Stress injury is often diffuse and superficial. The **modified Johnson classification** instead describes gastric peptic-ulcer location and acid association; it does not grade stress-injury severity. This SCORE objective is covered by the inspected [[Peptic Ulcer Disease]], including types I–V. The actual Johnson figure embedded in the source export was not inspected.",
  "id": "upper-gi-stress-gastritis-14"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE, SCORE_STRESS_GASTRITIS_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "Treatment after a bleed and the rare operation",
  "text": "Manage significant bleeding with resuscitation, diagnostic/therapeutic EGD, and lesion-directed hemostasis where feasible. Focal cautery may help a discrete point; diffuse injury may not provide one target. Correct the precipitating perfusion/critical-illness problem and use treatment-level acid suppression according to the bleeding findings.",
  "id": "upper-gi-stress-gastritis-15"
}, [[FISER_STOMACH_SOURCE, SCORE_UPPER_GI_BLEEDING_SOURCE, SCORE_STRESS_GASTRITIS_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Treatment after a bleed and the rare operation",
  "text": "If bleeding persists or recurs, reassess for an alternative focal source and escalate through the [[Upper Gastrointestinal Bleeding]]. Surgery is reserved for failure of control, instability/ongoing transfusion consequences, or perforation. A [[Gastroduodenal Perforation Repair]] needs source control; a prophylaxis drug does not close a defect.",
  "id": "upper-gi-stress-gastritis-16"
}, [[SCORE_GASTRODUODENAL_PERFORATION_SOURCE, SCORE_UPPER_GI_BLEEDING_SOURCE, SCORE_STRESS_GASTRITIS_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Treatment after a bleed and the rare operation",
  "text": "The supplied stress module delegates operative choice to the ulcer/bleeding procedures. It does not establish one mandatory operation for diffuse hemorrhagic gastritis, and no total-gastrectomy rule is invented here.",
  "id": "upper-gi-stress-gastritis-17"
}, SCORE_STRESS_GASTRITIS_SOURCE),
  sourcedUnits({
  "type": "bullets",
  "heading": "Board pearls",
  "items": [
    "**Mucosal hypoperfusion and failed defense** are central to stress injury.",
    "Cushing: head injury; Curling: burns.",
    "The older ventilation >48-hour trigger is a board-source association; current prophylaxis considers the complete risk context.",
    "Enteral nutrition and appropriate acid prophylaxis are prevention measures; established hemorrhage needs a hemostasis pathway.",
    "A Johnson ulcer type is not a stress-gastritis grade.",
    "Reconcile the prophylaxis indication when critical-illness risk resolves."
  ],
  "id": "upper-gi-stress-gastritis-18"
}, [[SCORE_STRESS_GASTRITIS_SOURCE], [FISER_STOMACH_SOURCE], [SCORE_STRESS_GASTRITIS_SOURCE, SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE], [SCORE_STRESS_GASTRITIS_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_STRESS_GASTRITIS_SOURCE], [SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE]]),
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
      "Mechanical ventilation alone",
      "SCORE lists ventilation longer than 48 hours as a classic risk factor.",
      "SCCM/ASHP finds insufficient evidence for ventilation alone as an independent prophylaxis trigger."
    ],
    [
      "Prophylaxis continuation",
      "Historical ICU risk lists can encourage prolonged routine acid suppression.",
      "Reassess the indication and stop stress prophylaxis when its risk resolves, preserving a separate treatment indication if present."
    ]
  ],
  "id": "upper-gi-stress-gastritis-19"
}, [[SCORE_STRESS_GASTRITIS_SOURCE, SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE], [SCORE_STRESS_GASTRITIS_SOURCE, SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE]]),
  sourced({
  "type": "flow",
  "heading": "Stress prophylaxis: start and stop",
  "nodes": [
    {
      "id": "risk",
      "label": "Assess stress-bleeding risk in critical illness"
    },
    {
      "id": "high",
      "label": "Coagulopathy, shock or chronic liver disease"
    },
    {
      "id": "neuro",
      "label": "Neurocritical care: conditional prophylaxis indication"
    },
    {
      "id": "low",
      "label": "Enterally fed and low risk"
    },
    {
      "id": "give",
      "label": "PPI or H2 blocker prophylaxis; enteral nutrition when appropriate"
    },
    {
      "id": "avoid",
      "label": "Avoid routine stress prophylaxis"
    },
    {
      "id": "review",
      "label": "Reassess risk and any separate treatment indication"
    },
    {
      "id": "stop",
      "label": "Stop stress prophylaxis when its risk resolves"
    },
    {
      "id": "continue",
      "label": "Risk persists: continue indicated prophylaxis and reassess"
    }
  ],
  "edges": [
    {
      "to": "high",
      "from": "risk"
    },
    {
      "to": "neuro",
      "from": "risk"
    },
    {
      "to": "low",
      "from": "risk"
    },
    {
      "to": "give",
      "from": "high"
    },
    {
      "to": "give",
      "from": "neuro"
    },
    {
      "to": "avoid",
      "from": "low"
    },
    {
      "to": "review",
      "from": "give"
    },
    {
      "to": "stop",
      "from": "review",
      "label": "Risk resolved"
    },
    {
      "from": "review",
      "to": "continue",
      "label": "Risk persists"
    }
  ],
  "id": "upper-gi-stress-gastritis-20"
}, SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE),
  references("upper-gi-stress-gastritis-references", [SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE, SCORE_UPPER_GI_BLEEDING_SOURCE, SCORE_STRESS_GASTRITIS_SOURCE, SCORE_EGD_SOURCE, SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE, ACG_UGIB_2021_SOURCE]),
];

export const stressGastritisTopic = buildTopic({
  "id": "00000000-0000-4000-8000-000000004724",
  "versionId": "00000000-0000-4000-8000-000000004734",
  "slug": "stress-gastritis",
  "title": "Stress Gastritis",
  "aliases": [
    "stress-related mucosal disease",
    "stress ulcer prophylaxis",
    "Cushing ulcer",
    "Curling ulcer"
  ],
  "scoreNodeId": "stomach-conditions",
  "scoreCategory": "SCORE · Stomach · Diseases & Conditions",
  "tags": [
    "upper-gi",
    "absite",
    "score"
  ],
  "sourceId": SCORE_STRESS_GASTRITIS_SOURCE,
  "additionalSourceIds": [
    SCORE_PEPTIC_ULCER_SOURCE,
    FISER_STOMACH_SOURCE,
    SCORE_GASTRODUODENAL_PERFORATION_SOURCE,
    SCORE_UPPER_GI_BLEEDING_SOURCE,
    SCORE_EGD_SOURCE,
    SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE,
    ACG_UGIB_2021_SOURCE
  ],
  "blocks": blocks,
  "reviewedAt": "2026-10-22T00:00:00.000Z"
});
