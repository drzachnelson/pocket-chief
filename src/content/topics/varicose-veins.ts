import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  AVF_SVS_EHIT_2021_SOURCE as EHIT,
  ESVS_CVD_2022_SOURCE as ESVS,
  FISER_VASCULAR_SOURCE as FISER,
  SCORE_CVI_SOURCE as SCORE_CVI,
  SCORE_VARICOSE_SOURCE as SCORE,
  SVS_AVF_AVLS_VARICOSE_2023_SOURCE as SVS,
  VARICOSE_PACKET_SOURCE as PACKET,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourcedUnits({
    id: "block-varicose-summary",
    type: "summary",
    heading: "At a glance",
    text: "Varicose veins are dilated, tortuous superficial veins, **CEAP C2**, commonly associated with saphenous reflux. Examine pulses and map superficial reflux and deep venous disease with **duplex**. Acute DVT defers elective ablation; chronic deep obstruction requires collateral and outflow assessment rather than a blanket prohibition. Symptomatic axial reflux can proceed to **endovenous ablation** without a mandatory compression trial. Treat tributaries with phlebectomy or sclerotherapy. Early postablation duplex is selective for symptoms or high risk; treat ARTE/EHIT by severity.",
  }, [[PACKET, SVS, ESVS]]),
  sourcedUnits({
    id: "block-varicose-anatomy",
    type: "bullets",
    heading: "Anatomy that decides the procedure",
    items: [
      "**Great saphenous vein**: from the dorsum of the foot, anterior to the medial malleolus, up the medial leg to the saphenofemoral junction at the fossa ovalis. The **saphenous nerve** runs with it below the knee.",
      "**Small saphenous vein**: behind the lateral malleolus, up the posterior calf to the saphenopopliteal junction. The **sural nerve** runs with it in the calf.",
      "Variants: anterior and posterior accessory saphenous veins and a thigh extension of the small saphenous vein; duplicated femoral or popliteal veins in the deep system.",
      "Perforators connect superficial and deep veins in the thigh and calf; competent valves direct flow toward the deep system.",
      "Risk factors: family history, pregnancies, prolonged standing, obesity, smoking, and inactivity.",
    ],
  }, [[PACKET, SCORE], [PACKET, SCORE], [SCORE], [SCORE, PACKET], [SCORE, FISER]]),
  sourcedUnits({
    id: "block-varicose-workup",
    type: "bullets",
    heading: "Evaluation",
    items: [
      "History: duration, prior DVT or thrombophilia, pregnancies, occupation, compression use, and family history. Examination: pulses, skin, the distribution of the veins, and any tender, thrombosed segment.",
      "**Duplex**: patency, anatomy, and reflux — valve closure longer than **0.5 seconds** in superficial and perforator veins, **1 second** in the femoral and popliteal veins.",
      "Grade the leg with CEAP and track severity with the VCSS.",
      "Diminished pulses mean an ABI before any compression.",
    ],
  }, [[SCORE], [SCORE_CVI, PACKET], [SCORE], [PACKET]]),
  sourcedUnits({
    id: "block-varicose-treatment",
    type: "table",
    heading: "Treatment by vein",
    columns: ["Target", "Treatment", "Notes"],
    rows: [
      ["Great or small saphenous reflux", "**Thermal ablation** (radiofrequency or laser) under tumescent anesthesia; nonthermal options are cyanoacrylate glue, mechanochemical ablation, and polidocanol microfoam", "Thermal catheter tip about 2 to 3 cm below the saphenofemoral junction; glue about 5 cm"],
      ["Same, when ablation does not suit", "High ligation and stripping", "Very tortuous or very superficial trunks"],
      ["Varicose tributaries", "Ambulatory **phlebectomy** through stab incisions, or ultrasound-guided foam sclerotherapy", "Often combined with truncal ablation"],
      ["Telangiectasias and reticular veins", "**Sclerotherapy**", "Cosmetic; no duplex reflux required"],
      ["Patient who declines a procedure", "Compression at 20 to 30 mmHg, elevation, walking, weight loss", "Reasonable choice, not a required step"],
    ],
  }, [[SCORE, PACKET], [SCORE, PACKET], [SCORE, PACKET], [SCORE], [PACKET, SVS]]),
  sourced({
    id: "block-varicose-contraindications",
    type: "warning",
    tone: "danger",
    heading: "When not to ablate",
    text: "Defer elective ablation during **acute DVT**. With chronic deep obstruction, determine whether the saphenous vein is an essential collateral or needed conduit; deep disease is not an automatic prohibition. Also defer for **acute** superficial thrombosis (a past episode is an indication, not a contraindication), immobility, pregnancy, active infection, and significant arterial insufficiency pending vascular assessment. An ABI under 0.5 is a major warning against standard compression.",
  }, ESVS),
  sourcedUnits({
    id: "block-varicose-complications",
    type: "table",
    heading: "Complications",
    columns: ["Procedure", "Complications"],
    rows: [
      ["Ablation or stripping", "Hematoma, infection, DVT, and **saphenous** or **sural** nerve injury; skin burns after thermal ablation"],
      ["Phlebectomy", "Matting telangiectasias, blistering, and a missed varix"],
      ["Sclerotherapy", "Skin or fat necrosis, hyperpigmentation, allergy, and toxicity at large doses"],
    ],
  }, [[SCORE], [SCORE], [SCORE]]),
  sourcedUnits({
    id: "block-varicose-ehit",
    type: "table",
    heading: "↳ Clot at the junction after thermal ablation (EHIT)",
    columns: ["Class", "Duplex finding", "Management"],
    rows: [
      ["I", "Thrombus up to the junction, not into the deep vein", "No treatment"],
      ["II", "Into the deep vein, under 50% of its lumen", "Weekly duplex surveillance; consider antiplatelet or anticoagulation in selected high-risk patients"],
      ["III", "Over 50% of the deep lumen without complete occlusion", "**Therapeutic anticoagulation**, with duplex until retraction; antiplatelet alone is inadequate"],
      ["IV", "Occlusive deep vein thrombus", "Treat as an acute DVT"],
    ],
  }, [[EHIT], [EHIT], [SVS], [EHIT]]),
  sourcedUnits({
    id: "block-varicose-splits",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Before treating symptomatic saphenous reflux", "Compression must fail first", "**No trial required**; ablation is recommended over long-term stockings"],
      ["Operation for saphenous reflux", "High ligation and stripping", "Endovenous ablation first; stripping in selected anatomy"],
      ["Recurrence, ablation against stripping", "14.3% against 20.9% (SCORE)", "No clear difference in pooled trials; one 10-year series favors surgery at the groin"],
      ["Thrombus extension after ablation", "Anticoagulate any extension", "Manage by EHIT class"],
      ["First-line for varicose veins", "Sclerotherapy (Fiser)", "Sclerotherapy for tributaries and spider veins; ablation for truncal reflux"],
    ],
  }, [[FISER, SVS], [FISER, SCORE], [SCORE, PACKET], [PACKET, EHIT], [FISER, SCORE]]),
  sourcedUnits({
    id: "block-varicose-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "Varicose veins and a DVT on the preoperative duplex: do not strip or ablate.",
      "Numbness over the lateral foot after small saphenous ablation: **sural** nerve.",
      "Numbness along the medial calf after great saphenous treatment below the knee: **saphenous** nerve.",
      "Recurrent thrombophlebitis or bleeding from a varicose vein is an indication to treat the reflux.",
    ],
  }, [[FISER, PACKET], [SCORE, PACKET], [SCORE, PACKET], [PACKET]]),
  references("block-varicose-references", [ESVS, PACKET, SCORE, SCORE_CVI, SVS, EHIT, FISER]),
];

export const varicoseVeinsTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000002820",
  versionId: "00000000-0000-4000-8000-000000002821",
  slug: "varicose-veins",
  title: "Varicose Veins",
  aliases: ["varicose vein", "varicosities", "great saphenous vein reflux", "saphenous reflux", "spider veins", "telangiectasias", "vein sclerotherapy", "ambulatory phlebectomy", "stab phlebectomy", "high ligation and stripping", "vein stripping", "EHIT", "endothermal heat-induced thrombosis", "VenaSeal", "cyanoacrylate closure"],
  scoreNodeId: "vascular-venous-conditions",
  scoreCategory: "SCORE · Vascular Venous · Diseases & Conditions",
  tags: ["vascular-venous", "absite", "score"],
  sourceId: PACKET,
  additionalSourceIds: [ESVS, SCORE, SCORE_CVI, SVS, EHIT, FISER],
  blocks,
  reviewedAt: "2026-10-10T00:00:00.000Z",
});
