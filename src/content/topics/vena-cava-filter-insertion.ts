import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  ACR_SIR_SPR_IVC_FILTER_2021_SOURCE as ACR,
  SIR_IVC_FILTER_2020_SOURCE as SIR_PRIMARY,
  IVC_FILTER_DECISION_ANALYSIS_SOURCE as MODEL,
  AHA_ACC_PE_GUIDELINE_2026_SOURCE as AHA,
  FISER_HEMATOLOGY_SOURCE as FISER_HEME,
  SCORE_VENA_CAVA_FILTER_SOURCE as SCORE,
  SIR_IVC_FILTER_GUIDELINE_JAMA_2021_SOURCE as SIR,
  VENA_CAVA_FILTER_PACKET_SOURCE as PACKET,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-vcf-summary",
    type: "summary",
    heading: "At a glance",
    text: "An IVC filter catches emboli from the legs and pelvis; it does **not** treat the clot. It is indicated for documented **proximal DVT or PE** when anticoagulation is contraindicated or major bleeding prevents treatment. Recurrent events require confirmation and reassessment of anticoagulation; filter use is selective. Place a **retrievable** filter **infrarenal**, apex just below the lowest renal vein, after a cavogram has mapped the renal veins, measured the cava, and excluded duplication. Restart anticoagulation as soon as it is safe and **retrieve** the filter once the indication has passed, because complications accumulate with dwell time.",
  }, SIR_PRIMARY),
  sourced({
    id: "block-vcf-not-treatment",
    type: "warning",
    tone: "danger",
    heading: "A filter is not anticoagulation",
    text: "Filters reduce PE by about half but raise later **DVT** by about 70%, with **no mortality benefit** in randomized trials. Adding a filter to a patient who can be anticoagulated helps nothing (PREPIC2). The plan for every filter therefore includes restarting anticoagulation the moment the contraindication resolves, and a date to take the filter out.",
  }, AHA),
  sourcedUnits({
    id: "block-vcf-indications",
    type: "table",
    heading: "Who gets a filter",
    columns: ["Tier", "Situation", "Evidence"],
    rows: [
      ["Indicated", "Documented VTE with a **contraindication** to anticoagulation: active bleeding, recent intracranial hemorrhage or neurosurgery, major trauma", "The one indication every guideline agrees on"],
      ["Indicated after a complication", "Major bleeding on therapeutic anticoagulation", "Accepted"],
      ["Selected recurrence", "Objectively confirmed recurrent PE despite optimal treatment; address adherence, dose, interactions and other causes first", "2026 PE guidance allows selected use; SIR 2020 advises against routine use for recurrent VTE"],
      ["Relative", "Free-floating iliocaval thrombus, limited cardiopulmonary reserve or pulmonary hypertension, adjunct to thrombolysis or thrombectomy, renal cell carcinoma with caval extension, poor compliance", "Low-level; individualize"],
      ["Not routinely", "VTE in a patient who **can** be anticoagulated; prophylaxis in trauma or before surgery without VTE", "SIR recommends against"],
    ],
  }, [[SCORE, FISER_HEME], [SCORE], [SIR_PRIMARY, AHA], [SCORE], [SIR_PRIMARY]]),
  sourcedUnits({
    id: "block-vcf-contraindications",
    type: "bullets",
    heading: "↳ Contraindications",
    items: [
      "A **chronically occluded** cava, no available landing zone, or no route to the cava.",
      "Anomalies or extrinsic compression that prevent wall apposition, and a cava wider than the device is rated for.",
    ],
  }, [[SCORE], [SCORE, ACR]]),
  sourcedUnits({
    id: "block-vcf-anatomy",
    type: "table",
    heading: "Where it goes",
    columns: ["Anatomy", "Frequency", "Filter plan"],
    rows: [
      ["Normal right-sided IVC", "About 96%; about 23 mm wide; renal veins at L1–L2", "**Infrarenal**, apex just below the lowest renal vein"],
      ["Duplicated IVC", "0.2% to 0.3%; the left cava drains into the left renal vein", "A filter in **each** infrarenal cava, or one **suprarenal** filter"],
      ["Left-sided IVC (transposition)", "0.2% to 0.5%", "Recognize it before access; deploy in the left infrarenal cava"],
      ["Retroaortic or circumaortic left renal vein", "Retroaortic about 3%; circumaortic 1.6% to 14%", "Find the **lowest** renal inflow on the venogram and stay below it"],
      ["Pregnancy, gonadal vein thrombosis, or clot at or above the renal veins", "Situational", "**Suprarenal** filter"],
      ["Megacava over 30 mm", "Uncommon", "**Bird's Nest** filter (rated to 40 mm) or a filter in each common iliac vein"],
      ["IVC agenesis or chronic occlusion", "Rare", "No filter"],
    ],
  }, [[SCORE, PACKET], [SCORE, PACKET], [SCORE], [SCORE, PACKET], [SCORE, ACR], [SCORE, PACKET], [SCORE, PACKET]]),
  sourcedUnits({
    id: "block-vcf-placement",
    type: "sequence",
    heading: "Placement",
    steps: [
      { title: "Access", detail: "Ultrasound-guided, local anesthesia. Choose **right common femoral or right internal jugular** access according to patency, thrombus and the device delivery system." },
      { title: "Wire and marking catheter", detail: "Seldinger technique under fluoroscopy, sequential dilation, and a radiopaque marking catheter in the cava." },
      { title: "Cavogram", detail: "Map the renal veins, measure the caval diameter, and rule out a duplicated IVC at the iliocaval confluence if there is no prior CT." },
      { title: "Deploy", detail: "Filter apex just below the lowest renal vein; release under fluoroscopy according to the device instructions. Diameter limits and deployment mechanics vary by system." },
      { title: "Completion cavogram", detail: "Assess expansion, wall apposition, tilt and position. Reposition only if the device permits recapture; a fully released filter may require a planned retrieval." },
      { title: "Hemostasis", detail: "Remove the sheath and hold manual pressure." },
    ],
  }, [[SCORE, PACKET], [SCORE], [SCORE], [SCORE, PACKET], [PACKET], [SCORE]]),
  sourcedUnits({
    id: "block-vcf-retrieval",
    type: "bullets",
    heading: "Retrieval",
    items: [
      "Retrieve once anticoagulation is running and PE risk is low — **as soon as possible**, because retrieval gets harder the longer the filter stays.",
      "The **29 to 54 days** figure is a decision-model estimate after transient PE risk has passed, not a universal deadline. Track every retrievable filter and reassess early.",
      "Image the filter first for integrity, strut penetration, and trapped clot; clot filling more than about a quarter of the cone defers retrieval.",
      "Anticoagulation does **not** need to be reversed before retrieval.",
      "Technique: **internal jugular** access, snare the apical hook, advance the sheath over the filter until the tines release, then confirm on fluoroscopy and inspect the filter for every tine.",
    ],
  }, [[SCORE], [MODEL], [SCORE, PACKET], [PACKET], [SCORE, PACKET]]),
  sourcedUnits({
    id: "block-vcf-complications",
    type: "table",
    heading: "Complications",
    columns: ["Complication", "Clue", "Management"],
    rows: [
      ["Access injury", "Hematoma, arterial puncture, AV fistula, pneumothorax or air embolism from jugular access", "Prevent with ultrasound guidance"],
      ["Tilt or malposition", "Tilt over 15 degrees, or deployment in a renal or iliac vein", "Reposition if permitted; otherwise plan device-specific retrieval"],
      ["Caval thrombosis", "Bilateral leg swelling or phlegmasia after a filter", "Anticoagulation, with or without catheter-directed lysis"],
      ["Migration or fracture", "Fragment in the right heart or pulmonary artery", "Endovascular or open retrieval; prevent with early removal"],
      ["Caval wall penetration", "Usually incidental on CT; occasionally duodenal bleeding, aortocaval fistula, or back pain", "**Observe** if asymptomatic; remove for erosion into a neighboring structure"],
    ],
  }, [[SCORE, PACKET], [PACKET, SCORE], [PACKET], [SCORE, PACKET], [SCORE, PACKET]]),
  sourcedUnits({
    id: "block-vcf-splits",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Free-floating iliocaval thrombus", "An indication for a filter", "**Unproven** if the patient can be anticoagulated"],
      ["High-risk trauma without VTE", "Prophylactic filter", "SIR recommends **against** routine prophylactic filters"],
      ["Patient on therapeutic anticoagulation", "Add a filter for extra protection", "**No filter** — PREPIC2 showed no reduction in recurrent PE"],
      ["Which device", "Permanent filters were standard", "**Retrievable** by default; permanent only for a lasting contraindication"],
    ],
  }, [[SCORE, SIR], [SCORE, SIR], [PACKET, AHA], [SCORE, AHA]]),
  sourcedUnits({
    id: "block-vcf-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "PE despite a filter: evaluate upper-body or above-filter thrombus, collateral bypass, and filter thrombosis, malposition or breakthrough embolization.",
      "Duplicated IVC: one filter on the right leaves the left system unprotected.",
      "Pregnant with iliocaval clot and no anticoagulation: **suprarenal** filter.",
      "Arm DVT from a catheter: anticoagulate or remove the line; an IVC filter cannot catch it.",
      "Incidental asymptomatic strut penetration: assess symptoms, organ involvement, ongoing filter need and retrieval risk; it does not automatically mandate emergency removal.",
    ],
  }, [[FISER_HEME], [SCORE, PACKET], [SCORE, ACR], [PACKET, FISER_HEME], [PACKET]]),
  references("block-vcf-references", [SIR_PRIMARY, MODEL, PACKET, SCORE, ACR, SIR, AHA, FISER_HEME]),
];

export const venaCavaFilterInsertionTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000002620",
  versionId: "00000000-0000-4000-8000-000000002621",
  slug: "vena-cava-filter-insertion",
  title: "Vena Cava Filter Insertion",
  aliases: ["IVC filter", "vena cava filter", "inferior vena cava filter", "IVC filter placement", "IVC filter retrieval", "retrievable IVC filter", "suprarenal IVC filter", "Bird's Nest filter", "megacava", "duplicated IVC", "cavogram", "PREPIC", "PREPIC2"],
  scoreNodeId: "vascular-venous-procedures",
  scoreCategory: "SCORE · Vascular Venous · Operations & Procedures",
  tags: ["vascular-venous", "vte", "endovascular", "absite", "score"],
  sourceId: PACKET,
  additionalSourceIds: [SIR_PRIMARY, MODEL, SCORE, ACR, SIR, AHA, FISER_HEME],
  blocks,
  reviewedAt: "2026-10-10T00:00:00.000Z",
});
