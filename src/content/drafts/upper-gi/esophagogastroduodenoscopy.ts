import { buildDraftTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  SCORE_PEPTIC_ULCER_SOURCE,
  FISER_STOMACH_SOURCE,
  SCORE_UPPER_GI_BLEEDING_SOURCE,
  SCORE_EGD_SOURCE,
  ESGE_ULCER_BLEEDING_2026_SOURCE,
  ACG_UGIB_2021_SOURCE,
  ACG_CAG_ANTITHROMBOTICS_2022_SOURCE,
  MULTISOCIETY_GLP1_2024_SOURCE,
  FISER_ESOPHAGUS_SOURCE
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Converted from docs/study-guides/upper-gi/esophagogastroduodenoscopy.md. Clinical approval remains pending.
const blocks: TopicBlock[] = [
  sourcedUnits({
  "type": "summary",
  "heading": "At a glance",
  "text": "EGD examines the esophagus, stomach, and duodenum and can diagnose, obtain tissue, and treat during the same procedure. **A useful examination combines safe access, systematic inspection, accurate landmarks, targeted therapy, and a recovery/follow-up plan.** In bleeding, restore physiology and make the airway plan before instrumentation. Afterward, new pain, tachycardia, respiratory changes, or peritoneal signs must not be dismissed as routine insufflation discomfort.",
  "id": "upper-gi-esophagogastroduodenoscopy-01"
}, [[SCORE_UPPER_GI_BLEEDING_SOURCE, SCORE_EGD_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "Indications and what EGD can accomplish",
  "columns": [
    "Problem",
    "Role of EGD"
  ],
  "rows": [
    [
      "UGIB or unexplained iron-deficiency anemia",
      "Locate a lesion, assess stigmata, biopsy when appropriate, and obtain hemostasis; anemia evaluation may also require colonoscopy."
    ],
    [
      "Dysphagia, reflux complications, persistent vomiting",
      "Define mucosal/structural disease and obtain tissue; selected strictures can be dilated."
    ],
    [
      "Suspected ulcer or neoplasm",
      "Visualize, biopsy, document location and plan pathology/healing follow-up."
    ],
    [
      "Foreign body or food impaction",
      "Diagnostic/therapeutic access; object and location determine urgency and technique."
    ],
    [
      "Varices",
      "Identify and treat selected bleeding/at-risk lesions, typically with banding for esophageal varices in the appropriate pathway."
    ],
    [
      "Nutritional access or altered anatomy",
      "PEG planning/placement or assessment of a reconstruction, with anatomy-specific caution."
    ],
    [
      "Surveillance or caustic injury",
      "An indication-specific examination rather than an automatic schedule inferred from this general procedure guide."
    ]
  ],
  "id": "upper-gi-esophagogastroduodenoscopy-02"
}, [[SCORE_EGD_SOURCE], [SCORE_EGD_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_EGD_SOURCE], [SCORE_EGD_SOURCE, FISER_ESOPHAGUS_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, SCORE_EGD_SOURCE], [SCORE_EGD_SOURCE], [SCORE_EGD_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Indications and what EGD can accomplish",
  "text": "The module's broad suggestion to screen all asymptomatic reflux/sleeve patients is not adopted as universal screening advice. The indication needs disease-specific guidance, risk context, and an explicit surveillance plan.",
  "id": "upper-gi-esophagogastroduodenoscopy-03"
}, SCORE_EGD_SOURCE),
  sourced({
  "type": "prose",
  "heading": "Contraindications are tied to the planned intervention",
  "text": "Known/suspected perforation, inability to tolerate the intended sedation, severe physiologic instability, uncorrected coagulopathy/thrombocytopenia, and recent foregut surgery require reassessment of indication, technique, and setting. Diagnostic EGD/biopsy and therapeutic dilation/hemostasis have different bleeding/perforation risks. A suspected perforation is not a reason for an unplanned diagnostic insufflation exam, although expert endoscopy can itself be a selected perforation therapy.",
  "id": "upper-gi-esophagogastroduodenoscopy-04"
}, SCORE_EGD_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Contraindications are tied to the planned intervention",
  "text": "**Avoid blanket rules:** coagulopathy is an important risk assessment, not an instruction to delay all lifesaving hemorrhage control until an arbitrary normal INR. Recent anastomoses and connective-tissue disorders need extra caution. The module's phrase “Whipple disease” in a list of operations is an apparent terminology error, likely referring to pancreaticoduodenectomy; do not propagate it as a contraindicating disease.",
  "id": "upper-gi-esophagogastroduodenoscopy-05"
}, [[SCORE_EGD_SOURCE, ESGE_ULCER_BLEEDING_2026_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "Landmarks and orientation",
  "columns": [
    "Segment",
    "What to identify"
  ],
  "rows": [
    [
      "Oropharynx and inlet",
      "Epiglottis, vocal cords, pyriform region and the esophageal inlet; enter under vision and recognize a possible diverticular opening."
    ],
    [
      "Proximal esophagus",
      "UES near 15–18 cm from incisors; this region can be difficult to evaluate and is vulnerable to instrumentation injury."
    ],
    [
      "Esophageal body",
      "Smooth pale/pink squamous mucosa; note erosions, rings, webs, strictures, varices, ulcers and diverticula."
    ],
    [
      "Z-line",
      "Squamocolumnar mucosal junction; **not automatically identical to the anatomic GE junction or diaphragmatic pinch**."
    ],
    [
      "Anatomic GE junction",
      "Proximal extent of gastric folds; compare with the diaphragmatic pinch when assessing a hiatal hernia."
    ],
    [
      "Stomach",
      "Rugal body, incisura separating body/antrum, smoother antrum, pylorus; retroflex to inspect cardia/fundus."
    ],
    [
      "Duodenal bulb and D2",
      "Inspect bulb for ulceration; the descending duodenum has circumferential folds and the medial ampullary region."
    ]
  ],
  "id": "upper-gi-esophagogastroduodenoscopy-06"
}, [[SCORE_EGD_SOURCE], [SCORE_EGD_SOURCE, FISER_ESOPHAGUS_SOURCE], [SCORE_EGD_SOURCE], [FISER_STOMACH_SOURCE, SCORE_EGD_SOURCE], [FISER_STOMACH_SOURCE, SCORE_EGD_SOURCE], [SCORE_EGD_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, SCORE_EGD_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Landmarks and orientation",
  "text": "The source's clock-face orientation is position-dependent; use landmarks rather than assuming a fixed view after rotation. Fiser gives a typical distal esophageal distance around 40–42 cm, but measurements vary. Record measured landmarks rather than forcing the examination to fit a nominal distance.",
  "id": "upper-gi-esophagogastroduodenoscopy-07"
}, [[SCORE_EGD_SOURCE, FISER_ESOPHAGUS_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Landmarks and orientation",
  "text": "Foreign bodies may lodge at the UES, the aortic/bronchial crossing, or the distal sphincter/diaphragmatic region. The size and shape of an object also affect pyloric passage. These are localization clues; a dedicated retrieval guideline is still needed for object-specific urgency and technique.",
  "id": "upper-gi-esophagogastroduodenoscopy-08"
}, [[SCORE_EGD_SOURCE, FISER_ESOPHAGUS_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "Preprocedure readiness",
  "text": "Confirm the question, intended diagnostic/therapeutic scope, relevant prior surgery and reports, consent, allergies, medication exposure, airway/sedation history, aspiration risk, and availability of the equipment and expertise needed for the planned intervention. Previous reconstruction changes what can be reached and how much force is safe.",
  "id": "upper-gi-esophagogastroduodenoscopy-09"
}, SCORE_EGD_SOURCE),
  sourced({
  "type": "prose",
  "heading": "↳ Preprocedure readiness",
  "text": "Selected patients may tolerate unsedated examination using a small-caliber scope and topical anesthesia. Diagnostic and uncomplicated therapeutic examinations often use moderate sedation, while patient risk, procedural complexity and airway needs may justify deeper anesthesia. The team must match the setting and rescue capability to the intended sedation rather than assuming every EGD needs the same regimen.",
  "id": "upper-gi-esophagogastroduodenoscopy-10"
}, SCORE_EGD_SOURCE),
  sourced({
  "type": "prose",
  "heading": "↳ Preprocedure readiness",
  "text": "Select laboratory testing using the clinical problem: active bleeding/anemia may require CBC and coagulation studies; renal/hepatic/metabolic disease may require chemistry testing; pregnancy and cardiopulmonary evaluation are indication-specific. Routine laboratory panels, chest films and ECGs are not required for every uncomplicated diagnostic procedure.",
  "id": "upper-gi-esophagogastroduodenoscopy-11"
}, SCORE_EGD_SOURCE),
  sourced({
  "type": "prose",
  "heading": "↳ Preprocedure readiness",
  "text": "Healthy elective fasting intervals in SCORE are **2 hours for clear liquids, 6 for a light meal, and 8 after a heavy meal**. These are not proof of an empty stomach with obstruction, gastroparesis or active bleeding. Assess the actual aspiration risk and urgency with anesthesia.",
  "id": "upper-gi-esophagogastroduodenoscopy-12"
}, SCORE_EGD_SOURCE),
  sourced({
  "type": "prose",
  "heading": "↳ Preprocedure readiness",
  "text": "**Current GLP-1 context:** the 2024 multisociety guidance permits most patients to continue treatment before elective procedures; those at higher GI/emptying risk may need a 24-hour liquid diet, an adjusted anesthesia plan or individualized delay. Do not turn this into a blanket stop-drug rule. The complete current local anesthesia protocol should govern implementation.",
  "id": "upper-gi-esophagogastroduodenoscopy-13"
}, MULTISOCIETY_GLP1_2024_SOURCE),
  sourced({
  "type": "prose",
  "heading": "Antithrombotics and antibiotic decisions",
  "text": "Diagnostic EGD with/without mucosal biopsy is a low-bleeding-risk category in the module. Dilation, variceal ligation and PEG placement carry higher procedural risk. Balance the intended intervention against thrombotic risk, especially a recent coronary stent; involve the managing clinician before interrupting an essential antiplatelet agent.",
  "id": "upper-gi-esophagogastroduodenoscopy-14"
}, SCORE_EGD_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Antithrombotics and antibiotic decisions",
  "text": "ACG-CAG's elective guidance distinguishes dual antiplatelet therapy, aspirin monotherapy, warfarin and DOACs rather than providing one “hold blood thinners” rule. Do not copy the module's clopidogrel/prasugrel/ticagrelor intervals into a universal stop/restart order without confirming agent, procedure and cardiovascular context. Acute bleeding has a separate medication pathway.",
  "id": "upper-gi-esophagogastroduodenoscopy-15"
}, [[SCORE_EGD_SOURCE, ACG_CAG_ANTITHROMBOTICS_2022_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Antithrombotics and antibiotic decisions",
  "text": "Routine diagnostic EGD does not generally need antibiotic prophylaxis. PEG placement and cirrhosis with acute bleeding are important indication-specific exceptions. A prosthetic joint, pacemaker, cardiac stent or prosthetic valve alone is not a routine reason to add antibiotics for a standard diagnostic EGD. Severe neutropenia/high-bacteremia-risk procedures need individualized assessment.",
  "id": "upper-gi-esophagogastroduodenoscopy-16"
}, SCORE_EGD_SOURCE),
  sourced({
  "type": "prose",
  "heading": "↳ Antithrombotics and antibiotic decisions",
  "text": "The source includes other endoscopic procedures (ERCP/EUS) in its antibiotic list; these are not interchangeable with EGD. Its broad ascites-only and vascular-graft-age wording needs current procedure-specific verification before becoming an order.",
  "id": "upper-gi-esophagogastroduodenoscopy-17"
}, SCORE_EGD_SOURCE),
  sourcedUnits({
  "type": "sequence",
  "heading": "Safe examination sequence",
  "steps": [
    {
      "title": "Position and monitor",
      "detail": "Left lateral position is typical; use appropriate sedation, pulse oximetry, BP/ECG monitoring, and capnography according to the sedation setting. Assess airway risk before entry."
    },
    {
      "title": "Pass the inlet under direct vision",
      "detail": "Advance over the tongue, recognize laryngeal anatomy, and enter the esophageal lumen gently. Avoid blind force against resistance or a diverticular pouch."
    },
    {
      "title": "Inspect the esophagus",
      "detail": "Describe mucosa, narrowing, rings, tears, varices and masses; record Z-line, GE-junction and diaphragmatic landmarks rather than collapsing them into one label."
    },
    {
      "title": "Clear and inspect the stomach",
      "detail": "Suction fluid/blood/retained material, use enough insufflation to see without unnecessary overdistension, and inspect the body, incisura and antrum."
    },
    {
      "title": "Retroflex",
      "detail": "Inspect the cardia, fundus and proximal stomach systematically; a forward view alone misses relevant proximal surfaces."
    },
    {
      "title": "Traverse the pylorus under vision",
      "detail": "Inspect the bulb, then D2; further D3 inspection is described in SCORE when feasible. Recognize the medial ampullary region without assuming a routine forward-view exam gives an ERCP-quality papillary assessment."
    },
    {
      "title": "Withdraw deliberately",
      "detail": "Reinspect, obtain indicated labeled samples, document findings/therapy and remove excess gas to reduce discomfort."
    }
  ],
  "id": "upper-gi-esophagogastroduodenoscopy-18"
}, [[SCORE_EGD_SOURCE], [SCORE_EGD_SOURCE], [SCORE_EGD_SOURCE], [SCORE_EGD_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, SCORE_EGD_SOURCE], [SCORE_EGD_SOURCE], [SCORE_EGD_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Safe examination sequence",
  "text": "In active hemorrhage, complete inspection must be balanced against airway, hemodynamic and visualization limits. Document what was not seen and why rather than describing an incomplete examination as normal.",
  "id": "upper-gi-esophagogastroduodenoscopy-19"
}, SCORE_EGD_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "Biopsy and therapy decisions",
  "text": "Biopsy suspicious mucosal lesions and gastric ulcers when appropriate; record the site for each specimen and reconcile the pathology with the visual finding. A nonspecific “gastric biopsy” label can make a targeted abnormality impossible to follow. In the esophagus, the channel's parallel approach to the wall may require deliberate tip positioning to obtain tissue safely.",
  "id": "upper-gi-esophagogastroduodenoscopy-20"
}, [[SCORE_PEPTIC_ULCER_SOURCE, SCORE_EGD_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "↳ Biopsy and therapy decisions",
  "columns": [
    "Finding",
    "Decision"
  ],
  "rows": [
    [
      "Actively bleeding ulcer or visible vessel",
      "Use lesion-directed hemostasis and the [[Upper Gastrointestinal Bleeding]]; epinephrine alone is inadequate definitive therapy."
    ],
    [
      "Adherent clot",
      "Follow the updated [[Upper Gastrointestinal Bleeding]]; removal requires ability to control the underlying lesion."
    ],
    [
      "Esophageal varix in the bleeding pathway",
      "Band ligation with appropriate vasoactive/antibiotic treatment, not ulcer cautery."
    ],
    [
      "Suspicious gastric ulcer/mass",
      "Tissue diagnosis and a documented pathology/follow-up plan."
    ],
    [
      "Stricture or foreign body",
      "Reassess whether the planned technique, airway and equipment match the lesion; technical dilation/retrieval protocols need dedicated source guidance."
    ]
  ],
  "id": "upper-gi-esophagogastroduodenoscopy-21"
}, [[ACG_UGIB_2021_SOURCE], [ESGE_ULCER_BLEEDING_2026_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_EGD_SOURCE], [SCORE_EGD_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Biopsy and therapy decisions",
  "text": "Do not thermal-ablate an indeterminate lesion merely because small lesions can be treated through the channel. Histology, depth and lesion-specific oncologic criteria determine whether biopsy, resection, ablation or referral is appropriate; the supplied general module is not an oncologic resection protocol.",
  "id": "upper-gi-esophagogastroduodenoscopy-22"
}, SCORE_EGD_SOURCE),
  sourced({
  "type": "prose",
  "heading": "Troubleshoot a poor view",
  "text": "Blood/clot or retained contents may require irrigation, suction, a larger/dual-channel scope, retrieval devices, patient repositioning, or an appropriately selected preprocedure prokinetic. Excess mucus/bubbles may be cleared with irrigation and selected agents such as simethicone. Wait out transient hypermotility when reasonable; equipment setup should be understood before an urgent examination.",
  "id": "upper-gi-esophagogastroduodenoscopy-23"
}, SCORE_EGD_SOURCE),
  sourced({
  "type": "prose",
  "heading": "↳ Troubleshoot a poor view",
  "text": "Altered anatomy, a J-shaped stomach, or looping may improve with reduced insufflation, patient repositioning or external pressure. Persistent resistance is a reason to reassess the view and anatomy, not to increase blind force. If safe visualization cannot be obtained, state the limit and arrange the next diagnostic/hemostatic step.",
  "id": "upper-gi-esophagogastroduodenoscopy-24"
}, SCORE_EGD_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "Complications and rescue",
  "text": "Dental/oropharyngeal trauma, bleeding, perforation and sedation/airway events are important risks; tissue injury and stricture can follow selected interventions. New significant abdominal/chest pain, tachycardia, dyspnea, neck crepitus or peritoneal findings after EGD require evaluation for perforation or another complication. Not every perforation produces obvious pneumoperitoneum.",
  "id": "upper-gi-esophagogastroduodenoscopy-25"
}, [[SCORE_EGD_SOURCE, FISER_ESOPHAGUS_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Complications and rescue",
  "text": "For a stable patient with suspected duodenal perforation, CT/appropriate contrast imaging can define the defect and contamination. Selected small contained injuries may be managed with bowel rest, antibiotics, drainage and/or expert endoscopic closure. **Instability, a large defect, or uncontrolled contamination requires urgent surgical source-control assessment.** Repair/resection depends on location and tissue; pancreatoduodenectomy is an exceptional rescue consideration, not the default after EGD.",
  "id": "upper-gi-esophagogastroduodenoscopy-26"
}, SCORE_EGD_SOURCE),
  sourced({
  "type": "prose",
  "heading": "↳ Complications and rescue",
  "text": "When a complication is recognized, document the intervention, physiology and contamination assessment and involve the appropriate endoscopic/surgical team promptly. The full dose/route/timing of sedation reversal, aspiration management, anticoagulant reversal and post-perforation care is outside the supplied EGD module and remains a protocol gap.",
  "id": "upper-gi-esophagogastroduodenoscopy-27"
}, SCORE_EGD_SOURCE),
  sourced({
  "type": "prose",
  "heading": "Recovery and follow-up",
  "text": "Continue observation appropriate to the sedation and intervention; reassess new pain, bleeding and respiratory symptoms before discharge. The report should identify extent of examination, landmarks, findings, specimen sites, hemostasis/other therapy, complications, limitations, medication plan, and responsibility for pathology follow-up. This is an editorial handoff checklist built from the procedural and decision-making objectives.",
  "id": "upper-gi-esophagogastroduodenoscopy-28"
}, SCORE_EGD_SOURCE),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Recovery and follow-up",
  "text": "For gastric ulcers, arrange pathology review and healing/malignancy follow-up. For H. pylori, use the [[Peptic Ulcer Disease]]. For ulcer hemorrhage, use the [[Upper Gastrointestinal Bleeding]]. A completed scope is not the end of management.",
  "id": "upper-gi-esophagogastroduodenoscopy-29"
}, [[SCORE_PEPTIC_ULCER_SOURCE, ACG_UGIB_2021_SOURCE]]),
  sourcedUnits({
  "type": "bullets",
  "heading": "Board pearls",
  "items": [
    "**Z-line, proximal gastric folds and diaphragmatic pinch are separate landmarks.**",
    "The cardia/fundus need retroflexed inspection.",
    "Diagnostic biopsy risk is different from dilation, ligation or PEG risk.",
    "Protect the airway selectively in major bleeding; do not intubate every UGIB automatically.",
    "Document biopsy sites and close the pathology loop.",
    "New pain/tachycardia after instrumentation raises a perforation concern even without free air."
  ],
  "id": "upper-gi-esophagogastroduodenoscopy-30"
}, [[FISER_STOMACH_SOURCE, SCORE_EGD_SOURCE], [SCORE_EGD_SOURCE], [SCORE_EGD_SOURCE], [ESGE_ULCER_BLEEDING_2026_SOURCE], [SCORE_EGD_SOURCE], [SCORE_EGD_SOURCE, FISER_ESOPHAGUS_SOURCE]]),
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
      "Coagulopathy",
      "The source lists uncorrected coagulopathy as a contraindication.",
      "Assess intervention-specific risk; do not delay lifesaving hemorrhage control solely to meet an arbitrary INR threshold."
    ],
    [
      "Endoscopic junctions",
      "A nominal Z-line distance can be mistaken for a fixed GE junction.",
      "Record the Z-line, proximal gastric folds and diaphragmatic pinch separately, especially with a hiatal hernia."
    ]
  ],
  "id": "upper-gi-esophagogastroduodenoscopy-31"
}, [[SCORE_EGD_SOURCE, ESGE_ULCER_BLEEDING_2026_SOURCE], [SCORE_EGD_SOURCE, FISER_STOMACH_SOURCE]]),
  references("upper-gi-esophagogastroduodenoscopy-references", [SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE, SCORE_UPPER_GI_BLEEDING_SOURCE, SCORE_EGD_SOURCE, ESGE_ULCER_BLEEDING_2026_SOURCE, ACG_UGIB_2021_SOURCE, ACG_CAG_ANTITHROMBOTICS_2022_SOURCE, MULTISOCIETY_GLP1_2024_SOURCE, FISER_ESOPHAGUS_SOURCE]),
];

export const esophagogastroduodenoscopyDraft = buildDraftTopic({
  "id": "00000000-0000-4000-8000-000000004725",
  "versionId": "00000000-0000-4000-8000-000000004735",
  "slug": "esophagogastroduodenoscopy",
  "title": "Esophagogastroduodenoscopy",
  "aliases": [
    "EGD",
    "upper GI endoscopy",
    "upper endoscopic examination"
  ],
  "scoreNodeId": "endoscopy-procedures",
  "scoreCategory": "SCORE · Endoscopy · Operations & Procedures",
  "tags": [
    "upper-gi",
    "absite",
    "score",
    "clinical-review-pending"
  ],
  "sourceId": SCORE_EGD_SOURCE,
  "additionalSourceIds": [
    SCORE_PEPTIC_ULCER_SOURCE,
    FISER_STOMACH_SOURCE,
    SCORE_UPPER_GI_BLEEDING_SOURCE,
    ESGE_ULCER_BLEEDING_2026_SOURCE,
    ACG_UGIB_2021_SOURCE,
    ACG_CAG_ANTITHROMBOTICS_2022_SOURCE,
    MULTISOCIETY_GLP1_2024_SOURCE,
    FISER_ESOPHAGUS_SOURCE
  ],
  "blocks": blocks,
  "createdAt": "2026-10-22T00:00:00.000Z",
  "warnings": [
    "Draft — pending Zach's clinical review",
    "**Clinical approval pending.** Neither procedural competency nor sedation/device competence was assessed.",
    "Source anatomy is qualified: gastric clock-face orientation changes; duodenal folds are not a stand-alone bulb identifier; Z-line, GE junction and diaphragm can diverge.",
    "The source's broad asymptomatic reflux/sleeve screening, blanket coagulopathy contraindication, “Whipple disease” operation wording, EUS-cyst/ascites/graft-related antibiotic advice and universal antiplatelet holds require context or further source-specific review.",
    "**Needs further support:** current detailed sedation/capnography and discharge criteria, ASA/agent-specific fasting/GLP-1 implementation, drug-specific antithrombotic holds, lesion-specific foreign-body/dilation/oncologic therapy and full iatrogenic-perforation protocols. The July 2026 ESGE sedation update was identified on the society index but not reviewed in full.",
    "No generic 0.1% perforation estimate is adopted for every diagnostic and therapeutic EGD. Source images/videos remain unreviewed; no matching endoscopy question-bank notes were supplied."
  ]
});
