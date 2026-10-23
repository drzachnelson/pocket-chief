import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  SCORE_PEPTIC_ULCER_SOURCE,
  FISER_STOMACH_SOURCE,
  SCORE_GASTRODUODENAL_PERFORATION_SOURCE,
  SCORE_UPPER_GI_BLEEDING_SOURCE,
  SCORE_STRESS_GASTRITIS_SOURCE,
  SCORE_EGD_SOURCE,
  ESGE_ULCER_BLEEDING_2026_SOURCE,
  ACG_UGIB_2021_SOURCE,
  ACG_CAG_ANTITHROMBOTICS_2022_SOURCE,
  FISER_ESOPHAGUS_SOURCE,
  BAVENO_VARICEAL_CONSENSUS_SOURCE,
  NASOGASTRIC_ASPIRATE_2004_SOURCE
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Converted from docs/study-guides/upper-gi/upper-gastrointestinal-bleeding.md. Per-topic sign-off items: docs/study-guides/upper-gi/review.md.
const blocks: TopicBlock[] = [
  sourcedUnits({
  "type": "summary",
  "heading": "At a glance",
  "text": "**Resuscitate, identify the cause, achieve hemostasis, then prevent recurrence.** Hematemesis and melena suggest an upper source; brisk upper bleeding may also produce hematochezia. Peptic ulcers, erosions, varices, tears, and vascular lesions require different definitive treatments. Recurrent or persistent bleeding after initial hemostasis is a major failure signal. Do not let a normal early hemoglobin, temporary cessation of visible bleeding, or an arbitrary blood-unit threshold postpone escalation in shock.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-01"
}, [[FISER_STOMACH_SOURCE, SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "Anatomy that directs localization",
  "text": "UGIB conventionally arises proximal to the ligament of Treitz; swallowed blood can mimic a GI source. The stomach's cardia and fundus require retroflexed inspection, the body has prominent rugae, and the pylorus separates the distal stomach from the bulb. Endoscopy must inspect beyond the first lesion if the field and physiology allow.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-02"
}, [[FISER_STOMACH_SOURCE, SCORE_UPPER_GI_BLEEDING_SOURCE, SCORE_EGD_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Anatomy that directs localization",
  "text": "Posterior duodenal ulcers can erode the **gastroduodenal artery**. Lesser-curve gastric ulcers relate to gastric arterial supply. These anatomic relationships guide embolization and operative control when endoscopic treatment fails. Gastric-ulcer hemostasis also needs a biopsy/pathology plan.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-03"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "Use the history to anticipate the lesion",
  "columns": [
    "Clue",
    "Important possibilities"
  ],
  "rows": [
    [
      "H. pylori, NSAIDs, prior ulcer",
      "Gastric or duodenal ulcer."
    ],
    [
      "Retching followed by hematemesis",
      "Mallory–Weiss mucosal tear near the GE junction; many stop spontaneously, persistent bleeding can be treated endoscopically."
    ],
    [
      "Cirrhosis/portal hypertension",
      "Varices and portal-hypertensive sources; an ulcer remains possible."
    ],
    [
      "Prior gastric bypass or gastrojejunostomy",
      "Marginal ulcer at the gastroenteric anastomosis."
    ],
    [
      "Prior aortic graft/aneurysm repair",
      "**Aortoenteric fistula** is a life-threatening diagnosis requiring urgent vascular assessment."
    ],
    [
      "Small mucosal defect with major arterial hemorrhage",
      "Dieulafoy lesion; the lesion may be near the proximal stomach/GE junction."
    ],
    [
      "Abnormal vascular mucosa",
      "Angiodysplasia; renal/cardiac disease may be associated."
    ],
    [
      "Weight loss, mass, nonhealing ulcer",
      "Adenocarcinoma or another neoplasm, including GIST."
    ],
    [
      "Critical illness, shock, burns, sepsis",
      "Stress-related mucosal disease or an ordinary gastroduodenal ulcer; do not diagnose by ICU location alone."
    ]
  ],
  "id": "upper-gi-upper-gastrointestinal-bleeding-04"
}, [[SCORE_UPPER_GI_BLEEDING_SOURCE], [FISER_ESOPHAGUS_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE], [SCORE_PEPTIC_ULCER_SOURCE, SCORE_UPPER_GI_BLEEDING_SOURCE], [SCORE_STRESS_GASTRITIS_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Use the history to anticipate the lesion",
  "text": "Source percentages vary by population and do not replace the differential. An anticoagulant can increase severity without explaining the underlying lesion.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-05"
}, SCORE_UPPER_GI_BLEEDING_SOURCE),
  sourcedUnits({
  "type": "sequence",
  "heading": "Resuscitation before localization",
  "steps": [
    {
      "title": "Step 1",
      "detail": "Assess airway, breathing, perfusion, mental status, ongoing emesis, and aspiration risk. Obtain help for major hemorrhage and a monitored/ICU setting when indicated."
    },
    {
      "title": "Step 2",
      "detail": "Obtain two functional large-bore IVs, type/crossmatch, CBC, chemistry, coagulation studies, and reassess hemodynamics while giving appropriate fluids/blood."
    },
    {
      "title": "Step 3",
      "detail": "In a hemodynamically stable hospitalized patient, ACG suggests a restrictive red-cell transfusion threshold of **7 g/dL**. Active exsanguination and important cardiovascular disease require individualized assessment rather than waiting for that laboratory threshold."
    },
    {
      "title": "Step 4",
      "detail": "Review NSAIDs, aspirin, P2Y12 inhibitors, warfarin/DOACs, liver disease, prior operations, and prior bleeding. Make a medication/reversal plan according to severity, last dose and thrombotic risk."
    }
  ],
  "id": "upper-gi-upper-gastrointestinal-bleeding-06"
}, [[SCORE_UPPER_GI_BLEEDING_SOURCE], [FISER_STOMACH_SOURCE, SCORE_UPPER_GI_BLEEDING_SOURCE], [ACG_UGIB_2021_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_CAG_ANTITHROMBOTICS_2022_SOURCE]]),
  sourcedUnits({
  "type": "warning",
  "heading": "↳ Resuscitation before localization",
  "text": "**Current-practice correction:** routine prophylactic intubation and routine NG aspiration/lavage are not recommended for every UGIB. Select airway protection for ongoing hematemesis or inability to protect the airway. A negative or bilious aspirate is not an exclusion test for an upper lesion; do not let it overrule the clinical/endoscopic workup.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-07"
}, [[SCORE_UPPER_GI_BLEEDING_SOURCE, ESGE_ULCER_BLEEDING_2026_SOURCE, NASOGASTRIC_ASPIRATE_2004_SOURCE]]),
  sourcedUnits({
  "type": "table",
  "heading": "Risk tools answer different questions",
  "columns": [
    "Tool",
    "Inputs/role",
    "How to use it"
  ],
  "rows": [
    [
      "Glasgow–Blatchford",
      "BUN, hemoglobin, blood pressure, pulse, melena, syncope, hepatic disease and heart failure.",
      "Pre-endoscopic intervention-risk assessment; ACG identifies **0–1** as a very-low-risk range that may permit outpatient care with follow-up."
    ],
    [
      "Modified Glasgow–Blatchford",
      "The module lists BUN, hemoglobin, systolic blood pressure and pulse.",
      "Recognize the pared-down inputs; do not automatically apply a standard-GBS discharge threshold to a modified score. No separate calculator is implemented."
    ],
    [
      "Rockall",
      "Age, shock, comorbidities, diagnosis and endoscopic stigmata.",
      "Adds endoscopic information; do not use a completed endoscopic score before obtaining its required data."
    ],
    [
      "AIMS65",
      "Albumin, INR, mental status, low systolic BP and age.",
      "Mortality-risk context; it is not interchangeable with a hemostasis or discharge rule."
    ]
  ],
  "id": "upper-gi-upper-gastrointestinal-bleeding-08"
}, [[SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Risk tools answer different questions",
  "text": "Instability, ongoing bleeding, unsafe follow-up, or another admission indication overrides a superficially reassuring number. Scores support clinical assessment; they do not resuscitate or localize a bleed.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-09"
}, [[SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "Choose the test that can change treatment",
  "text": "EGD is the main diagnostic/therapeutic test and does not require active bleeding to recognize an ulcer or recent stigmata. ACG suggests endoscopy **within 24 hours** for admitted/observed UGIB after initial management. The 2026 ESGE update cautions against reflexively rushing every ulcer bleed into a ≤6/≤12-hour examination before resuscitation; persistent instability is a separate escalation problem.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-10"
}, [[SCORE_UPPER_GI_BLEEDING_SOURCE, ESGE_ULCER_BLEEDING_2026_SOURCE, ACG_UGIB_2021_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Choose the test that can change treatment",
  "text": "CTA may help when endoscopy is unavailable, nondiagnostic, or cannot define ongoing hemorrhage. Catheter angiography can diagnose and embolize; tagged-red-cell imaging is diagnostic rather than hemostatic and may be considered for slower/intermittent bleeding in an appropriate pathway. Capsule assessment belongs after unrevealing upper/lower studies when small-bowel bleeding is suspected, not ahead of resuscitation for an overt major upper bleed.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-11"
}, [[FISER_STOMACH_SOURCE, SCORE_UPPER_GI_BLEEDING_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Choose the test that can change treatment",
  "text": "The local module combines CTA and tagged-RBC detection thresholds, even though they are distinct methods. No exact mL/min cutoff is used to choose treatment here. Provocative angiography can precipitate major bleeding and is a selected specialist technique, not a routine rescue branch.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-12"
}, SCORE_UPPER_GI_BLEEDING_SOURCE),
  sourcedUnits({
  "type": "table",
  "heading": "Forrest classification and treatment implications",
  "columns": [
    "Class",
    "Endoscopic finding",
    "Management implication"
  ],
  "rows": [
    [
      "Ia",
      "Spurting",
      "High-risk lesion: endoscopic hemostasis."
    ],
    [
      "Ib",
      "Active oozing",
      "High-risk lesion: endoscopic hemostasis."
    ],
    [
      "IIa",
      "Nonbleeding visible vessel",
      "Treat despite absence of active bleeding."
    ],
    [
      "IIb",
      "Adherent clot",
      "**ESGE 2026 conditionally suggests clot removal and treatment of underlying stigmata by an endoscopist capable of managing provoked bleeding.** ACG 2021 did not resolve the resistant-clot question."
    ],
    [
      "IIc",
      "Flat pigmented spot",
      "Low-risk stigmata; endoscopic hemostasis generally not required."
    ],
    [
      "III",
      "Clean base",
      "Low-risk stigmata; clinical context determines disposition."
    ]
  ],
  "id": "upper-gi-upper-gastrointestinal-bleeding-13"
}, [[SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE], [ESGE_ULCER_BLEEDING_2026_SOURCE, ACG_UGIB_2021_SOURCE], [ESGE_ULCER_BLEEDING_2026_SOURCE], [ESGE_ULCER_BLEEDING_2026_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Forrest classification and treatment implications",
  "text": "Exact historical rebleeding percentages differ between SCORE and Fiser and depend on whether patients received treatment. Learn the high-risk versus low-risk categories rather than treating a textbook percentage as a post-treatment forecast.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-14"
}, [[FISER_STOMACH_SOURCE, SCORE_UPPER_GI_BLEEDING_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "Endoscopic hemostasis and acid suppression",
  "text": "The lesion determines the tool: clips or contact thermal treatment for ulcer vessels, banding for esophageal varices, and selected thermal/mechanical approaches for other lesions. **Epinephrine must not be the sole definitive ulcer-hemostasis modality**; combine it with an appropriate second treatment if used. A visible vessel is not “safe” because it is not currently spurting.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-15"
}, [[SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Endoscopic hemostasis and acid suppression",
  "text": "After successful hemostasis of a high-risk ulcer, ACG recommends high-dose PPI, continuously or intermittently, for **three days**, followed by twice-daily oral PPI through **two weeks after endoscopy**. Further treatment is tailored to ulcer healing and ongoing risk. Pre-endoscopic erythromycin is suggested to improve gastric clearance/visualization in selected bleeding patients.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-16"
}, ACG_UGIB_2021_SOURCE),
  sourced({
  "type": "prose",
  "heading": "↳ Endoscopic hemostasis and acid suppression",
  "text": "**2026 options:** over-the-scope clips are a conditional alternative for selected high-risk lesions; topical hemostatic agents are rescue options rather than routine first-line monotherapy for high-risk ulcer stigmata. Specialized availability and expertise matter.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-17"
}, ESGE_ULCER_BLEEDING_2026_SOURCE),
  sourcedUnits({
  "type": "sequence",
  "heading": "Rescue after persistent or recurrent bleeding",
  "steps": [
    {
      "title": "Reassess and resuscitate",
      "detail": "Recurrent hematemesis, worsening perfusion, falling hemoglobin or renewed transfusion needs demand renewed assessment."
    },
    {
      "title": "Repeat therapeutic EGD for recurrent ulcer bleeding",
      "detail": "when appropriate; an initial successful procedure does not make repeat endoscopy futile."
    },
    {
      "title": "Escalate to transarterial embolization",
      "detail": "when endoscopic control fails and the patient/resource setting permits."
    },
    {
      "title": "Operate when bleeding cannot be controlled and timely embolization is unavailable, unsuccessful, or unsuitable for the physiology",
      "detail": "Ongoing shock needs immediate coordination among surgery, GI, anesthesia, and IR rather than serial delays."
    }
  ],
  "id": "upper-gi-upper-gastrointestinal-bleeding-18"
}, [[FISER_STOMACH_SOURCE, SCORE_UPPER_GI_BLEEDING_SOURCE], [FISER_STOMACH_SOURCE, ACG_UGIB_2021_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, ESGE_ULCER_BLEEDING_2026_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Rescue after persistent or recurrent bleeding",
  "text": "The historical requirement for four to six units in 24 hours is a severity clue, not a mandatory waiting period. Likewise, a large ulcer is a high-risk feature, not an isolated automatic substitute for evaluating resuscitation and available hemostasis.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-19"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "Operative control of a bleeding posterior duodenal ulcer",
  "text": "Expose through an anterior longitudinal duodenotomy, identify the posterior ulcer/vessel, and obtain **three-point control**: proximal and distal GDA control plus the transverse pancreatic branch. Protect the posterior common bile duct while placing sutures. Close the duodenotomy transversely when appropriate to preserve the lumen.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-20"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Operative control of a bleeding posterior duodenal ulcer",
  "text": "Assess the need for added acid reduction separately; severe instability favors hemostasis over a prolonged definitive ulcer operation. For a bleeding gastric ulcer, tissue diagnosis matters: oversewing or wedge excision may be a damage-control strategy, with definitive resection selected according to location, physiology, and malignancy assessment.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-21"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "Variceal bleeding is a different branch",
  "text": "With suspected variceal hemorrhage, begin vasoactive therapy promptly and give antibiotic prophylaxis for cirrhosis with UGIB from admission; combine this with endoscopic therapy, typically band ligation for esophageal varices. After resuscitation, the consensus target is endoscopy within **12 hours**. Failure may require TIPS; balloon tamponade is a temporary bridge with airway/complication considerations, not definitive therapy.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-22"
}, [[SCORE_UPPER_GI_BLEEDING_SOURCE, BAVENO_VARICEAL_CONSENSUS_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "↳ Variceal bleeding is a different branch",
  "text": "The full Baveno VIII 2026 article was not accessible in this session. Indexed primary passages confirmed continued emphasis on early vasoactive treatment and endoscopy after resuscitation; detailed 2026 early-TIPS criteria or gastric-varix interventions are not inferred. Cirrhosis does not prove a variceal source; complete the diagnostic examination.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-23"
}, [[SCORE_UPPER_GI_BLEEDING_SOURCE, BAVENO_VARICEAL_CONSENSUS_SOURCE]]),
  sourcedUnits({
  "type": "prose",
  "heading": "Medication and recurrence plan",
  "text": "Identify and treat H. pylori and confirm eradication using the [[Peptic Ulcer Disease]]. Reconsider ulcerogenic drugs, arrange gastric-ulcer pathology/healing follow-up, and define ongoing acid protection when exposures must continue.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-24"
}, [[SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE]]),
  sourced({
  "type": "prose",
  "heading": "↳ Medication and recurrence plan",
  "text": "For aspirin used for **cardiovascular secondary prevention**, ACG-CAG suggests against holding it; if interrupted, resume on the day endoscopic hemostasis is confirmed. Anticoagulant reversal and P2Y12 interruption/resumption require individual severity/thrombotic-risk assessment; the guide does not prescribe one blanket restart day.",
  "id": "upper-gi-upper-gastrointestinal-bleeding-25"
}, ACG_CAG_ANTITHROMBOTICS_2022_SOURCE),
  sourcedUnits({
  "type": "bullets",
  "heading": "Board pearls",
  "items": [
    "A brisk upper bleed can cause hematochezia.",
    "**Posterior duodenal ulcer → GDA; third ligature → transverse pancreatic branch.**",
    "Forrest IIa needs treatment even when it is not actively bleeding.",
    "Rebleeding after successful ulcer therapy often merits **repeat EGD**, then embolization or surgery if control fails.",
    "Prior aortic surgery plus UGIB raises the aortoenteric-fistula alarm.",
    "The variceal branch needs vasoactive medication and antibiotics in addition to endoscopic hemostasis."
  ],
  "id": "upper-gi-upper-gastrointestinal-bleeding-26"
}, [[FISER_STOMACH_SOURCE], [FISER_STOMACH_SOURCE], [ACG_UGIB_2021_SOURCE], [FISER_STOMACH_SOURCE, ACG_UGIB_2021_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, BAVENO_VARICEAL_CONSENSUS_SOURCE]]),
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
      "Negative or bilious NG aspirate",
      "The local module treats bilious output as ruling out an upper source.",
      "Negative aspiration cannot exclude an upper lesion; ESGE does not recommend routine lavage."
    ],
    [
      "Forrest IIb adherent clot",
      "ACG 2021 could not resolve the resistant-adherent-clot treatment question.",
      "ESGE 2026 conditionally suggests removal and treatment when the endoscopist can safely control provoked bleeding."
    ]
  ],
  "id": "upper-gi-upper-gastrointestinal-bleeding-27"
}, [[SCORE_UPPER_GI_BLEEDING_SOURCE, ESGE_ULCER_BLEEDING_2026_SOURCE, NASOGASTRIC_ASPIRATE_2004_SOURCE], [ACG_UGIB_2021_SOURCE, ESGE_ULCER_BLEEDING_2026_SOURCE]]),
  sourcedUnits({
  "type": "flow",
  "heading": "Recurrent ulcer bleeding: escalation",
  "nodes": [
    {
      "id": "rebleed",
      "label": "Recurrent ulcer bleeding after initial hemostasis"
    },
    {
      "id": "resus",
      "label": "Reassess and resuscitate; coordinate GI, surgery and IR"
    },
    {
      "id": "repeat",
      "label": "Repeat therapeutic endoscopy when appropriate"
    },
    {
      "id": "controlled",
      "label": "Hemostasis: PPI and cause-specific recurrence prevention"
    },
    {
      "id": "failed",
      "label": "Endoscopic control fails"
    },
    {
      "id": "tae",
      "label": "Transarterial embolization when feasible"
    },
    {
      "id": "surgery",
      "label": "Surgery when timely embolization is unavailable, unsuitable or unsuccessful"
    }
  ],
  "edges": [
    {
      "to": "resus",
      "from": "rebleed"
    },
    {
      "to": "repeat",
      "from": "resus"
    },
    {
      "to": "controlled",
      "from": "repeat"
    },
    {
      "to": "failed",
      "from": "repeat"
    },
    {
      "to": "tae",
      "from": "failed"
    },
    {
      "to": "surgery",
      "from": "failed"
    },
    {
      "to": "surgery",
      "from": "tae",
      "label": "Unsuccessful or unsuitable"
    },
    {
      "from": "tae",
      "to": "controlled",
      "label": "Hemostasis achieved"
    }
  ],
  "id": "upper-gi-upper-gastrointestinal-bleeding-28"
}, [[SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE], [SCORE_UPPER_GI_BLEEDING_SOURCE, ACG_UGIB_2021_SOURCE]]),
  references("upper-gi-upper-gastrointestinal-bleeding-references", [SCORE_PEPTIC_ULCER_SOURCE, FISER_STOMACH_SOURCE, SCORE_GASTRODUODENAL_PERFORATION_SOURCE, SCORE_UPPER_GI_BLEEDING_SOURCE, SCORE_STRESS_GASTRITIS_SOURCE, SCORE_EGD_SOURCE, ESGE_ULCER_BLEEDING_2026_SOURCE, ACG_UGIB_2021_SOURCE, ACG_CAG_ANTITHROMBOTICS_2022_SOURCE, FISER_ESOPHAGUS_SOURCE, BAVENO_VARICEAL_CONSENSUS_SOURCE, NASOGASTRIC_ASPIRATE_2004_SOURCE]),
];

export const upperGastrointestinalBleedingTopic = buildTopic({
  "id": "00000000-0000-4000-8000-000000004723",
  "versionId": "00000000-0000-4000-8000-000000004733",
  "slug": "upper-gastrointestinal-bleeding",
  "title": "Upper Gastrointestinal Bleeding",
  "aliases": [
    "UGIB",
    "upper GI hemorrhage",
    "Forrest classification",
    "bleeding duodenal ulcer"
  ],
  "scoreNodeId": "stomach-conditions",
  "scoreCategory": "SCORE · Stomach · Diseases & Conditions",
  "tags": [
    "upper-gi",
    "absite",
    "score"
  ],
  "sourceId": SCORE_UPPER_GI_BLEEDING_SOURCE,
  "additionalSourceIds": [
    SCORE_PEPTIC_ULCER_SOURCE,
    FISER_STOMACH_SOURCE,
    SCORE_GASTRODUODENAL_PERFORATION_SOURCE,
    SCORE_STRESS_GASTRITIS_SOURCE,
    SCORE_EGD_SOURCE,
    ESGE_ULCER_BLEEDING_2026_SOURCE,
    ACG_UGIB_2021_SOURCE,
    ACG_CAG_ANTITHROMBOTICS_2022_SOURCE,
    FISER_ESOPHAGUS_SOURCE,
    BAVENO_VARICEAL_CONSENSUS_SOURCE,
    NASOGASTRIC_ASPIRATE_2004_SOURCE
  ],
  "blocks": blocks,
  "reviewedAt": "2026-10-22T00:00:00.000Z"
});
