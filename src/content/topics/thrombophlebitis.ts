import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  CALISTO_SOURCE as CALISTO,
  FISER_VASCULAR_SOURCE as FISER,
  SCORE_THROMBOPHLEBITIS_SOURCE as SCORE,
  SVS_AVF_AVLS_VARICOSE_2023_SOURCE as SVS,
  THROMBOPHLEBITIS_PACKET_SOURCE as PACKET,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-tp-summary",
    type: "summary",
    heading: "At a glance",
    text: "Superficial thrombophlebitis is a **tender, red, palpable cord** along a superficial vein, most often the great saphenous and often a varicose one. It is not as benign as its reputation: about a quarter of patients have a **DVT** at presentation, so every leg cord gets a **duplex**. What happens next depends on how long the clot is and how close it sits to the deep system — a short below-knee segment gets symptom care, a segment **5 cm or longer** gets **fondaparinux** for 45 days, and clot **within 3 cm** of the saphenofemoral junction is treated as a DVT. A purulent vein at an old IV site is a different disease: pull the line, give antibiotics, and **excise the vein** if sepsis persists.",
  }, PACKET),
  sourcedUnits({
    id: "block-tp-recognition",
    type: "bullets",
    heading: "Recognition",
    items: [
      "Warm, indurated, tender cord along the course of a vein; the great saphenous is involved more often than the small saphenous.",
      "**Varicose veins** thrombose more readily than normal ones. Other risks: hypercoagulability, pregnancy, obesity, smoking, immobility, trauma, age, and prior DVT or thrombophlebitis.",
      "Concomitant DVT: about **25%** in pooled data, with older series ranging from 6% to 53%. A history of thrombophlebitis raises the risk of later DVT.",
      "Cellulitis spreads diffusely without a cord; DVT swells the whole calf or leg without one.",
      "Routine **thrombophilia testing is not indicated**.",
    ],
  }, [[SCORE, PACKET], [SCORE], [PACKET, SCORE], [PACKET], [SCORE]]),
  sourced({
    id: "block-tp-duplex",
    type: "warning",
    tone: "danger",
    heading: "Duplex every leg cord",
    text: "Warm compresses and NSAIDs without imaging is the classic error. The duplex measures the clot's length and its distance from the saphenofemoral or saphenopopliteal junction, which decide treatment, and it finds the DVT that a quarter of these patients already have.",
  }, PACKET),
  sourcedUnits({
    id: "block-tp-management",
    type: "table",
    heading: "Treatment by length and location",
    columns: ["Duplex finding", "Treatment"],
    rows: [
      ["Low-risk short segment, under 5 cm, away from the deep junction", "Symptom care and clinical/duplex follow-up; proximity, prior VTE, cancer or other high-risk features may justify anticoagulation despite short length"],
      ["**5 cm or longer** and more than 3 cm from the junction", "**Fondaparinux 2.5 mg** daily for **45 days**; rivaroxaban 10 mg daily is the alternative (SURPRISE)"],
      ["Within **3 cm** of the saphenofemoral or saphenopopliteal junction", "**Therapeutic** anticoagulation, as for a DVT: at least 6 weeks per SVS, at least 3 months per NCCN"],
      ["Extension into a deep vein", "Treat as DVT"],
      ["Suppurative, at an IV or PICC site", "Remove the catheter, cultures, and broad-spectrum antibiotics covering staphylococci and gram-negative rods; **excise** the vein for persistent purulence or sepsis"],
    ],
  }, [[PACKET, SCORE], [CALISTO, SCORE], [SVS, PACKET], [SCORE], [SCORE, FISER]]),
  sourcedUnits({
    id: "block-tp-suppurative",
    type: "bullets",
    heading: "↳ Suppurative thrombophlebitis",
    items: [
      "Pus in the vein: erythema over the IV site, a cord, fluctuance, fever, and leukocytosis.",
      "**Staphylococcus aureus** is the most common organism; Pseudomonas, Klebsiella, Enterococcus, Fusobacterium, and Candida also occur.",
      "Failure of line removal and antibiotics is the indication for **excision of the entire involved segment**.",
      "A PICC-associated superficial clot without infection does not mandate removal if the line is needed and the patient is anticoagulated.",
    ],
  }, [[SCORE, FISER], [SCORE, FISER], [SCORE, FISER], [PACKET]]),
  sourcedUnits({
    id: "block-tp-eponyms",
    type: "bullets",
    heading: "Eponyms that point elsewhere",
    items: [
      "**Trousseau syndrome**: recurrent migratory thrombophlebitis — look for an occult adenocarcinoma, classically **pancreatic**.",
      "**Mondor disease**: thrombophlebitis of the thoracoepigastric vein on the chest wall, associated with breast cancer, hypercoagulability, or vasculitis.",
      "Prevention at IV sites: avoid or dilute irritating infusions, keep tubing changes sterile, and rotate peripheral sites; catheter damage to the endothelium starts it.",
    ],
  }, [[SCORE, FISER], [SCORE], [SCORE]]),
  sourcedUnits({
    id: "block-tp-splits",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Saphenous thrombophlebitis 5 cm or longer", "NSAIDs, warm compresses, and ambulation", "**Fondaparinux** 2.5 mg for 45 days; NSAIDs relieve symptoms but do not prevent VTE"],
      ["Clot near the saphenofemoral junction", "High saphenous ligation, with or without stripping", "**Therapeutic anticoagulation**; ligation is the exception"],
      ["Comparator in SURPRISE", "The SCORE module says enoxaparin in one sentence", "The trial compared rivaroxaban with **fondaparinux**"],
      ["How often to change a peripheral IV", "Every 3 days (SCORE)", "CDC: no more often than every 72 to 96 hours in adults"],
    ],
  }, [[FISER, CALISTO], [SCORE, PACKET], [SCORE], [SCORE, PACKET]]),
  sourcedUnits({
    id: "block-tp-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "Tender cord on the thigh: duplex first, because the next step depends on length and distance from the junction.",
      "Red, fluctuant forearm vein at an old IV site with fever despite antibiotics: **excise the vein**.",
      "Recurrent migrating cords: search for pancreatic cancer.",
      "Acute superficial or deep thrombosis is a contraindication to elective saphenous ablation or stripping.",
    ],
  }, [[PACKET], [SCORE, FISER], [FISER], [PACKET]]),
  references("block-tp-references", [PACKET, SCORE, CALISTO, SVS, FISER]),
];

export const thrombophlebitisTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000002720",
  versionId: "00000000-0000-4000-8000-000000002721",
  slug: "thrombophlebitis",
  title: "Thrombophlebitis",
  aliases: ["superficial thrombophlebitis", "superficial vein thrombosis", "superficial venous thrombosis", "suppurative thrombophlebitis", "septic thrombophlebitis", "migratory thrombophlebitis", "Trousseau syndrome", "Mondor disease", "CALISTO", "SURPRISE trial"],
  scoreNodeId: "vascular-venous-conditions",
  scoreCategory: "SCORE · Vascular Venous · Diseases & Conditions",
  tags: ["vascular-venous", "vte", "anticoagulation", "absite", "score"],
  sourceId: PACKET,
  additionalSourceIds: [SCORE, CALISTO, SVS, FISER],
  blocks,
  reviewedAt: "2026-10-10T00:00:00.000Z",
});
