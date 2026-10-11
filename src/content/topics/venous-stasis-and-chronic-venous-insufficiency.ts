import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  CVI_PACKET_SOURCE as PACKET,
  ESVS_CVD_2022_SOURCE as ESVS,
  EVRA_SOURCE as EVRA,
  FISER_VASCULAR_SOURCE as FISER,
  SCORE_CVI_SOURCE as SCORE,
  SCORE_SWOLLEN_LEG_SOURCE as SCORE_LEG,
  SVS_AVF_AVLS_VARICOSE_2023_SOURCE as SVS,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-cvi-summary",
    type: "summary",
    heading: "At a glance",
    text: "Chronic venous insufficiency is **ambulatory venous hypertension**: failed valves, a blocked outflow, or a weak calf pump leave pressure high when the patient walks. It shows as aching, edema that improves with elevation, **hemosiderin** staining, lipodermatosclerosis, and an ulcer **above the medial malleolus**. Check pulses and an **ABI** before compressing, map reflux and obstruction with **duplex**, and stage it with **CEAP**. Compression is the mainstay; superficial reflux is ablated, and current evidence says do it **early** for an ulcer rather than waiting for compression to fail. For combined superficial and deep disease, plan treatment according to reflux, obstruction and collateral function.",
  }, PACKET),
  sourcedUnits({
    id: "block-cvi-physiology",
    type: "bullets",
    heading: "Why the skin breaks down",
    items: [
      "Three mechanisms: **valve incompetence** (reflux), **outflow obstruction**, and **calf pump failure**. Reflux causes most chronic venous disease, and most of it is superficial.",
      "Pressure transmits through incompetent perforators into the dermal capillaries, red cells leak, and hemosiderin, inflammation, and fibrosis follow: brawny pigmentation, then **lipodermatosclerosis**, then ulcer.",
      "**Post-thrombotic syndrome** is the secondary form: pain, swelling, and skin change after DVT, in 25% to 40% of patients.",
      "About half of acute DVTs recanalize completely within 6 to 9 months; the rest leave scarred, webbed, refluxing veins.",
    ],
  }, [[SCORE, PACKET], [PACKET], [PACKET], [SCORE]]),
  sourcedUnits({
    id: "block-cvi-ceap",
    type: "table",
    heading: "CEAP clinical class",
    columns: ["Class", "Finding"],
    rows: [
      ["C0", "No visible or palpable signs"],
      ["C1", "Telangiectasias or reticular veins"],
      ["C2", "Varicose veins"],
      ["C3", "Edema"],
      ["C4a", "Pigmentation or eczema"],
      ["C4b", "Lipodermatosclerosis or atrophie blanche"],
      ["C5", "Healed venous ulcer"],
      ["C6", "Active venous ulcer"],
    ],
  }, [[SCORE_LEG], [SCORE_LEG], [SCORE_LEG], [SCORE_LEG], [SCORE_LEG], [SCORE_LEG], [SCORE_LEG], [SCORE_LEG]]),
  sourcedUnits({
    id: "block-cvi-ceap-rest",
    type: "bullets",
    heading: "↳ The rest of CEAP",
    items: [
      "**Etiology**: congenital, primary, secondary (post-thrombotic), or none found.",
      "**Anatomy**: superficial, perforator, or deep.",
      "**Pathophysiology**: reflux, obstruction, both, or neither.",
      "A suffix marks the class symptomatic or asymptomatic; the **VCSS** scores severity and tracks response to treatment.",
    ],
  }, [[SCORE_LEG, SCORE], [SCORE_LEG], [SCORE_LEG], [SCORE_LEG, SCORE]]),
  sourcedUnits({
    id: "block-cvi-workup",
    type: "sequence",
    heading: "Workup",
    steps: [
      { title: "Pulses and ABI", detail: "Before any compression. An **ABI under 0.5** contraindicates it; 0.5 to 0.8 calls for reduced or inelastic compression with close follow-up." },
      { title: "Venous duplex", detail: "Patency, old clot, and reflux. Reflux is valve closure slower than **0.5 seconds** in superficial, perforator, tibial, and deep femoral veins, or **1 second** in the femoral and popliteal veins." },
      { title: "Iliac imaging", detail: "CT or MR venography, and **IVUS** at intervention, when swelling or ulcers persist after superficial treatment or the history suggests iliac obstruction." },
    ],
  }, [[PACKET], [SCORE], [SCORE]]),
  sourcedUnits({
    id: "block-cvi-treatment",
    type: "table",
    heading: "Treatment by problem",
    columns: ["Problem", "Treatment"],
    rows: [
      ["Symptoms or edema (C2–C4)", "Compression at **20 to 30 mmHg**, elevation, walking, weight loss, and stopping smoking"],
      ["Active ulcer (C6)", "Compression at **30 to 40 mmHg** or an inelastic wrap such as an **Unna boot**, plus **early ablation** of superficial reflux"],
      ["Superficial axial reflux", "Endovenous thermal or nonthermal **ablation**; stripping where the vein is too tortuous or too superficial"],
      ["Incompetent perforators", "Perforator ablation, stab avulsion, or subfascial endoscopic perforator surgery, after superficial reflux is treated"],
      ["Iliac or caval obstruction", "Venoplasty and **stent** under IVUS; open reconstruction with a vein conduit only when that fails"],
      ["Ulcer that will not heal with compression", "Advanced wound products and biologic adjuncts"],
    ],
  }, [[PACKET, FISER], [PACKET, EVRA], [SCORE, PACKET], [PACKET, SCORE], [SCORE], [SCORE]]),
  sourcedUnits({
    id: "block-cvi-ulcer",
    type: "bullets",
    heading: "Venous ulcers",
    items: [
      "Shallow, irregular, wet, and above and behind the **medial malleolus**, in the gaiter area; arterial ulcers are deep, punched out, painful, and on the toes.",
      "About 90% are caused by valve incompetence.",
      "**EVRA**: ablation within 2 weeks plus compression healed ulcers faster than compression with ablation deferred — a median of 56 against 82 days.",
      "Compression is the most effective treatment for healing an ulcer and for keeping it healed.",
    ],
  }, [[PACKET, FISER], [FISER], [EVRA], [SCORE]]),
  sourced({
    id: "block-cvi-collateral",
    type: "warning",
    tone: "danger",
    heading: "Do not take away the collateral",
    text: "Defer elective saphenous treatment during acute DVT. Chronic deep reflux or obstruction does not automatically prohibit ablation: assess collateral drainage and conduit needs, and plan the order of treatment individually.",
  }, ESVS),
  sourcedUnits({
    id: "block-cvi-splits",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Compression before ablation", "A trial of compression must fail first", "**Not required** for symptomatic axial reflux; ablation is first-line"],
      ["When to ablate under an ulcer", "After the ulcer heals, or if compression fails", "**Early**, alongside compression (EVRA)"],
      ["Unna boot healing", "Cures 90% of ulcers", "A board number the current literature does not corroborate; compression still heals most"],
      ["Stockings to prevent post-thrombotic syndrome", "Do not work (SOX)", "Contested: meta-analyses suggest a modest reduction in mild disease; guidelines still use them for symptoms"],
      ["Ablation against stripping", "Stripping is the operation", "Ablation preferred for recovery; 5-year recurrence is **not significantly different**"],
    ],
  }, [[FISER, SVS], [FISER, EVRA], [FISER, PACKET], [PACKET], [FISER, PACKET]]),
  sourcedUnits({
    id: "block-cvi-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "Bilateral red, warm, woody shins in an afebrile patient: lipodermatosclerosis, not bilateral cellulitis.",
      "Ulcer above the medial malleolus with absent pedal pulses: get an ABI before you wrap it.",
      "Multilevel disease: distinguish deep reflux from outflow obstruction; severe obstruction or a collateral-dependent trunk can change the treatment order.",
      "Brawny edema is hemosiderin in the dermis.",
    ],
  }, [[PACKET], [PACKET], [ESVS], [FISER]]),
  references("block-cvi-references", [ESVS, PACKET, SCORE, SCORE_LEG, EVRA, SVS, FISER]),
];

export const venousStasisAndChronicVenousInsufficiencyTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000002770",
  versionId: "00000000-0000-4000-8000-000000002771",
  slug: "venous-stasis-and-chronic-venous-insufficiency",
  title: "Venous Stasis and Chronic Venous Insufficiency",
  aliases: ["chronic venous insufficiency", "CVI", "venous stasis", "venous insufficiency", "chronic venous disease", "venous ulcer", "venous leg ulcer", "venous stasis ulcer", "stasis dermatitis", "lipodermatosclerosis", "CEAP", "VCSS", "Unna boot", "EVRA", "ambulatory venous hypertension", "SEPS"],
  scoreNodeId: "vascular-venous-conditions",
  scoreCategory: "SCORE · Vascular Venous · Diseases & Conditions",
  tags: ["vascular-venous", "wound", "absite", "score"],
  sourceId: PACKET,
  additionalSourceIds: [ESVS, SCORE, SCORE_LEG, EVRA, SVS, FISER],
  blocks,
  reviewedAt: "2026-10-10T00:00:00.000Z",
});
