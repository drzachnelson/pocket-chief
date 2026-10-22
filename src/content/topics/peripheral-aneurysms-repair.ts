import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  FISER_VASCULAR_SOURCE as FISER,
  PERIPHERAL_ANEURYSMS_REPAIR_OE_SOURCE as OE,
  SCORE_PERIPHERAL_ANEURYSMS_REPAIR_SOURCE as SCORE,
  SCORE_PERIPHERAL_ARTERIAL_ANEURYSMS_SOURCE as SCORE_DISEASE,
  SVS_POPLITEAL_ANEURYSM_2022_SOURCE as SVS,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Desktop/Pocket Chief/Inbox/2026-10-14-peripheral-aneurysms-repair/1-packet.md (S1 SCORE Peripheral Aneurysms
// Repair, S2 SCORE Peripheral Arterial Aneurysms, S3 Fiser chapter 27), checked against the folder's OpenEvidence document.
// The packet's 14-bullet disease-basics block is cut to the four facts that change the operation; the rest is in
// Arterial Peripheral Aneurysms, which this topic links to.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-par-summary",
    type: "summary",
    heading: "At a glance",
    text: "Peripheral aneurysm repair is the open and endovascular treatment of true and false aneurysms of the limb arteries, dominated by femoral and popliteal lesions that threaten the limb through **thromboembolism** rather than rupture. Repair is indicated for asymptomatic femoral aneurysms larger than **2.5 cm** and asymptomatic popliteal aneurysms larger than **2.0 cm**, and for any symptomatic, thrombosed, infected or embolizing lesion. Open repair excludes the aneurysm and restores inline flow with an interposition graft or a ligation-and-bypass, using **great saphenous vein** as the preferred conduit below the groin. A stent graft can exclude a popliteal aneurysm only when the anatomy provides adequate landing zones, and an acute catheter-related pseudoaneurysm is usually cured with ultrasound-guided thrombin injection instead of an operation.",
  }, SCORE),

  sourced({
    id: "block-par-basics",
    type: "bullets",
    heading: "The disease facts that shape the operation",
    items: [
      "A true aneurysm involves all three layers of the arterial wall; a pseudoaneurysm is extraluminal blood held by a pseudocapsule that lacks them.",
      "About 80% of patients with a femoral or popliteal aneurysm have multiple aneurysms, so the contralateral limb and the aortoiliac tree are both assessed before repair.",
      "Thromboembolism is the most common symptomatic presentation, and limb-threatening ischemia can be the very first symptom.",
      "Catheter angiography shows only the intraluminal diameter and can underestimate an aneurysm lined with mural thrombus.",
    ],
  }, SCORE_DISEASE),

  sourced({
    id: "block-par-triggers",
    type: "table",
    heading: "Repair triggers and preferred repair by lesion",
    columns: ["Lesion", "When to act", "Preferred repair"],
    rows: [
      ["Asymptomatic common femoral artery aneurysm", "Generally once it exceeds 2.5 cm", "Exclusion with an interposition graft, preserving outflow to both the superficial and deep femoral arteries"],
      ["Asymptomatic popliteal artery aneurysm", "Generally once it exceeds 2.0 cm", "Ligation and exclusion with a bypass, great saphenous vein the preferred conduit"],
      ["Acute catheter-related femoral pseudoaneurysm", "Treat to prevent growth and bleeding; most uncomplicated lesions qualify for injection", "**Ultrasound-guided thrombin injection** into the sac as the best initial treatment"],
      ["Pseudoaneurysm with ischemia or skin compromise", "Open repair when it causes limb ischemia or threatens the overlying skin", "Proximal and distal control, then direct suture repair, or patch angioplasty with autogenous tissue when the defect is extensive"],
      ["Infected pseudoaneurysm with virulent infection", "Source control is mandatory, because infected tissue and graft cannot be sterilized in place", "Ligate the artery, excise infected tissue or graft, and revascularize extra-anatomically through a clean field if needed"],
    ],
  }, SCORE),

  sourced({
    id: "block-par-medial",
    type: "sequence",
    heading: "Medial approach: ligation and bypass for popliteal aneurysm",
    steps: [
      { title: "Harvest the conduit", detail: "Take the great saphenous vein first, because autogenous vein is the preferred conduit." },
      { title: "Expose normal artery", detail: "Dissect normal artery proximal and distal to the diseased popliteal segment so both anastomoses land in healthy vessel." },
      { title: "Construct the bypass", detail: "Sew the vein from the inflow artery to the distal popliteal or proximal tibial artery beyond the aneurysm." },
      { title: "Ligate and exclude", detail: "Ligate the aneurysm proximally and distally once the bypass is in, so it can no longer thromboembolize." },
      { title: "Confirm the result", detail: "Compare baseline and immediate postoperative vascular examinations so distal embolization or a graft problem is caught at once." },
    ],
  }, SCORE),

  sourced({
    id: "block-par-approach",
    type: "bullets",
    heading: "Choosing the approach, and the anatomy",
    items: [
      "The **medial** approach suits disease extending proximal or distal to the popliteal artery, because exposure of the femoral and tibial vessels is not limited.",
      "The **posterior** approach uses a lazy-S incision over the popliteal fossa, opens the sac and ligates the geniculate collaterals from inside before an interposition graft is sewn in.",
      "The posterior approach suits large aneurysms compressing adjacent structures, but it significantly limits exposure of the femoral artery proximally and the tibial arteries distally.",
      "Reserve the posterior approach for aneurysms confined to the popliteal fossa that cause compressive symptoms.",
      "An opened femoral aneurysm sac does not need to be resected, because adhesions to nearby structures make resection hazardous.",
      "A femoral aneurysm involving the bifurcation needs reconstruction: a bypass to one branch with a jump graft to the other, transposition of one branch, or femoral bifurcation advancement.",
      "The femoral triangle is bounded by the inguinal ligament, the sartorius laterally and the adductor longus medially, with the femoral nerve lateral to the artery and the femoral vein medial.",
      "In the diamond-shaped popliteal fossa the structures run medial to lateral as the popliteal artery, popliteal vein, tibial nerve and common fibular nerve (the common peroneal).",
      "Endovascular exclusion needs at least **2 cm** of normal artery proximal and distal to the aneurysm as landing zones.",
      "It also needs the absence of extensive tortuosity and an aneurysm that is not extremely large.",
    ],
  }, SCORE),

  sourcedUnits({
    id: "block-par-ali",
    type: "flow",
    heading: "Acute limb ischemia from a thrombosed popliteal aneurysm",
    nodes: [
      { id: "presentation", label: "Acute limb ischemia from thrombosis of a popliteal artery aneurysm" },
      { id: "assess", label: "Examine sensation and motor function, and grade the limb by Rutherford class" },
      { id: "nonviable", label: "Rutherford III, irreversible: primary amputation", tone: "caution" },
      { id: "threatened", label: "Threatened: sensation or motor function lost (Rutherford IIb)", tone: "caution" },
      { id: "operatingroom", label: "Heparin and straight to the operating room for thrombectomy, clearing the tibials; no time for infusion lysis" },
      { id: "viable", label: "Not threatened: sensation and motor function intact (Rutherford I or IIa)", tone: "good" },
      { id: "thrombolysis", label: "Angiography with catheter-directed thrombolysis to restore patency and clear the runoff" },
      { id: "definitive", label: "Definitive exclusion of the aneurysm with a vein bypass graft; lysis alone is never the definitive treatment" },
    ],
    edges: [
      { from: "presentation", to: "assess" },
      { from: "assess", to: "nonviable", label: "Profound sensory loss and paralysis" },
      { from: "assess", to: "threatened", label: "Sensory or motor loss" },
      { from: "assess", to: "viable", label: "Sensation and motor function preserved" },
      { from: "threatened", to: "operatingroom" },
      { from: "operatingroom", to: "definitive" },
      { from: "viable", to: "thrombolysis", label: "Runoff occluded" },
      { from: "viable", to: "definitive", label: "Runoff already open: no lysis, reconstruct now" },
      { from: "thrombolysis", to: "definitive" },
    ],
  }, [[FISER, SCORE_DISEASE], [FISER, SVS, OE], [SVS, OE], [FISER, SVS, OE], [FISER, SVS, OE], [FISER, SVS, OE], [FISER, SCORE_DISEASE], [SCORE_DISEASE, SVS, OE], [SVS, OE], [FISER], [FISER], [SVS, OE], [SVS, OE]]),

  sourced({
    id: "block-par-complications",
    type: "warning",
    heading: "Complications that change management",
    tone: "danger",
    text: "Distal embolization with acute limb ischemia can occur during open dissection or endovascular wire manipulation, which is why baseline and immediate postoperative vascular examinations are mandatory. Extrinsic compression or kinking can thrombose the graft, and an insidious **graft infection** declares itself as an anastomotic pseudoaneurysm or unexplained fluid around the graft rather than frank sepsis. General complications include cardiopulmonary compromise, wound infection, deep venous thrombosis with pulmonary embolism, and urinary tract infection.",
  }, SCORE),

  sourcedUnits({
    id: "block-par-splits",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Femoral repair threshold", "Fiser: over 3.5 cm, by resection and interposition graft", "SCORE: asymptomatic femoral aneurysms over 2.5 cm; contemporary natural-history data saw no acute complications at 3.5 cm or less. Know both numbers"],
      ["Covered stent for a popliteal aneurysm", "Fiser: not recommended unless the patient cannot have open surgery, because stents across joint lines kink", "SCORE: acceptable with 2 cm of normal landing zone each side and no extensive tortuosity; the SVS prefers open repair with vein for good-risk patients, especially with poor runoff"],
      ["Popliteal size threshold", "Over 2 cm, the stakes being Fiser's 25% risk of an amputation-level complication untreated", "SVS 2022 keeps 20 mm as the default, defers to 30 mm in selected high-risk patients without thrombus, and repairs smaller aneurysms with thrombus or poor runoff"],
      ["Medial or posterior", "SCORE: posterior only for aneurysms confined to the fossa with compressive symptoms", "After medial ligation the sac can stay perfused through geniculate collaterals and keep expanding; observational data favor the posterior approach for exclusion and patency, without a randomized trial"],
      ["Thrombolysis for the thrombosed aneurysm", "Lyse the no-runoff thrombosed aneurysm, then bypass", "Selective: only for a viable or marginally threatened limb with occluded runoff; a IIb limb goes to the operating room, and lysis is an adjunct, not the definitive repair"],
      ["Conduit", "Fiser: vein bypass, avoiding PTFE below the knee", "Vein first remains the rule; PTFE is an accepted alternative when no adequate vein exists, particularly for a short posterior interposition graft"],
    ],
  }, [[FISER, SCORE, OE], [FISER, SCORE, SVS], [FISER, SVS, OE], [SCORE, OE], [FISER, SVS, OE], [FISER, OE]]),

  sourcedUnits({
    id: "block-par-surveillance",
    type: "bullets",
    heading: "Surveillance after repair or observation",
    items: [
      "Small femoral aneurysms under 2.5 cm and small popliteal aneurysms under 2.0 cm without mural thrombus can be observed instead of repaired.",
      "Surveillance of a small peripheral aneurysm uses duplex ultrasonography every 6 to 12 months to watch for enlargement.",
      "After a bypass graft, surveil with regular duplex ultrasonography and ankle-brachial index measurement.",
      "The SVS schedule after repair is examination, ankle-brachial index and duplex at 3, 6 and 12 months, then annually, measuring the sac diameter each time.",
      "Antiplatelet therapy may be beneficial after endovascular repair of a popliteal aneurysm.",
      "Every patient with a peripheral aneurysm should know the symptoms of limb threat and have access to immediate care.",
    ],
  }, [[SCORE_DISEASE], [SCORE_DISEASE], [SCORE_DISEASE], [SVS, OE], [SCORE_DISEASE], [SCORE_DISEASE]]),

  sourced({
    id: "block-par-disease-pointer",
    type: "prose",
    heading: "↳ The disease",
    text: "Epidemiology, presentation, mimics, observation thresholds and the board-versus-current disagreements on the disease itself are in [[Arterial Peripheral Aneurysms]].",
  }, SCORE_DISEASE),

  references("block-par-references", [SCORE, SCORE_DISEASE, FISER, OE, SVS]),
];

export const peripheralAneurysmsRepairTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000005120",
  versionId: "00000000-0000-4000-8000-000000005121",
  slug: "peripheral-aneurysms-repair",
  title: "Peripheral Aneurysms Repair",
  aliases: ["peripheral aneurysm repair", "popliteal aneurysm repair", "popliteal artery aneurysm repair", "femoral aneurysm repair", "ligation and bypass", "aneurysm exclusion bypass", "medial approach popliteal aneurysm", "posterior approach popliteal aneurysm", "popliteal stent graft", "stent graft exclusion", "ultrasound-guided thrombin injection", "UGTI", "thrombin injection", "pseudoaneurysm repair", "infected pseudoaneurysm", "thrombosed popliteal aneurysm"],
  scoreNodeId: "arterial-procedures",
  scoreCategory: "SCORE · Arterial Disease · Operations & Procedures",
  tags: ["arterial-disease", "vascular", "aneurysm", "popliteal", "femoral", "pseudoaneurysm", "operative-technique", "endovascular", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [SCORE_DISEASE, FISER, OE, SVS],
  blocks,
  reviewedAt: "2026-10-22T00:00:00.000Z",
});
