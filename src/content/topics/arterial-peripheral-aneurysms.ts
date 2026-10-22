import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  FISER_VASCULAR_SOURCE as FISER,
  PERIPHERAL_ARTERIAL_ANEURYSMS_OE_SOURCE as OE,
  SCORE_AAA_DISEASE_SOURCE as SCORE_AAA,
  SCORE_PERIPHERAL_ARTERIAL_ANEURYSMS_SOURCE as SCORE,
  SVS_POPLITEAL_ANEURYSM_2022_SOURCE as SVS,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Desktop/Pocket Chief/Inbox/2026-10-14-arterial-peripheral-aneurysms/1-packet.md (S1 SCORE Peripheral Arterial
// Aneurysms, S2 Fiser chapter 27), checked against the folder's OpenEvidence document, which is built around the 2022 SVS
// popliteal aneurysm guideline. Operative detail lives in the companion Peripheral Aneurysms Repair topic.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-paa-summary",
    type: "summary",
    heading: "At a glance",
    text: "Peripheral arterial aneurysms are focal dilations of arteries outside the aorta. More than **90%** occur in the femoral and popliteal arteries, and popliteal aneurysms alone make up about **70%**. Unlike aortic aneurysms, they threaten the limb through **thrombosis and distal embolization** rather than rupture, and they travel with other aneurysms: about 80% of affected patients have multiple aneurysms, so finding one mandates imaging of the aortoiliac tree and the contralateral limb. Small, asymptomatic aneurysms without mural thrombus are watched with duplex surveillance; large, symptomatic or thrombus-containing aneurysms are repaired, classically by open bypass with aneurysm exclusion. Visceral (splanchnic) arterial aneurysms are a separate SCORE topic and are not covered here.",
  }, SCORE),

  sourcedUnits({
    id: "block-paa-true-false",
    type: "bullets",
    heading: "True versus false aneurysms",
    items: [
      "A **true** aneurysm involves all three layers of the arterial wall: intima, media and adventitia.",
      "A **false** aneurysm (pseudoaneurysm) is extraluminal blood contained by surrounding tissue as a pseudocapsule that does not contain the full arterial wall.",
      "True aneurysms form when degradation of the media and adventitia outpaces production of wall-strengthening tissue, with inflammatory, immunologic, genetic and mechanical factors all contributing.",
      "An aneurysm is usually defined as a focal dilation at least **1.5 times** the diameter of the adjacent normal artery.",
      "Iatrogenic pseudoaneurysms follow inadequate hemostasis after needle puncture or catheter removal, most often at the femoral, radial and brachial access sites.",
      "Pseudoaneurysms from injection of illicit drugs most often involve the femoral and brachial arteries, because those vessels are easy to reach.",
      "Peripheral aneurysms from trauma, vasculitis or infection (mycotic aneurysms) can arise in any artery but are rare.",
    ],
  }, [[SCORE], [SCORE], [SCORE], [OE], [SCORE], [SCORE], [SCORE]]),

  sourced({
    id: "block-paa-epidemiology",
    type: "bullets",
    heading: "Epidemiology and the aneurysm-association rule",
    items: [
      "Femoral and popliteal aneurysms together account for more than 90% of peripheral aneurysms.",
      "Popliteal artery aneurysms are the most common, at about 70% of all peripheral aneurysms.",
      "Femoral aneurysms involve the common femoral artery in 57%, the superficial femoral in 26% and the deep femoral in 17%.",
      "About **80%** of patients with a femoral or popliteal aneurysm have multiple aneurysms.",
      "Between 7% and 10% of patients with an abdominal aortic aneurysm also have a femoral or popliteal aneurysm.",
      "Any patient with a femoral or popliteal aneurysm should have the **aortoiliac tree and the contralateral limb** assessed for more aneurysms.",
      "Risk factors include smoking, hypertension, male sex, advanced age and **arteriomegaly**.",
      "Peripheral arterial aneurysms are uncommon, with a much lower incidence than abdominal aortic aneurysms.",
    ],
  }, SCORE),

  sourced({
    id: "block-paa-presentation",
    type: "bullets",
    heading: "Presentation and diagnosis",
    items: [
      "**Thromboembolism** is the most common symptomatic presentation and can cause limb-threatening ischemia.",
      "Limb-threatening ischemia from thrombosis or embolization may be the first symptom of any lower extremity arterial aneurysm.",
      "Symptomatic patients may also have localized pain or tenderness over the aneurysm.",
      "Compression of adjacent structures can produce neuropathic pain or leg edema.",
      "Localized symptoms are comparatively uncommon with popliteal aneurysms.",
      "**Duplex ultrasonography** accurately diagnoses femoral and popliteal aneurysms and can also search the aortoiliac segment and the contralateral limb.",
      "CT angiography is useful for operative planning but is not a screening tool, because it needs intravenous contrast and radiation.",
      "Catheter angiography shows only the intraluminal diameter, so it can understate an aneurysm that contains mural thrombus.",
      "A groin mass that mimics a femoral aneurysm may be a hematoma, femoral hernia, lipoma, lymphocele or lymphadenopathy.",
      "A popliteal mass that mimics a popliteal aneurysm may be a Baker cyst, lymphadenopathy or a popliteal venous aneurysm.",
    ],
  }, SCORE),

  sourced({
    id: "block-paa-thresholds",
    type: "table",
    heading: "Size thresholds and site-specific management",
    columns: ["Site and scenario", "When observation is appropriate", "Preferred treatment"],
    rows: [
      ["Popliteal artery aneurysm", "Under **2.0 cm** without mural thrombus: duplex surveillance every 6 to 12 months", "Open bypass with great saphenous vein plus proximal and distal ligation, or stent-graft exclusion when at least 2 cm of normal artery is available on each side"],
      ["Common femoral artery aneurysm", "Under **2.5 cm** without mural thrombus: duplex surveillance", "Open resection with an interposition prosthetic bypass graft"],
      ["Femoral pseudoaneurysm after arterial access", "Not the default, because pseudoaneurysms are treated to prevent growth and bleeding", "Ultrasound-guided thrombin injection into the sac, unless the pedicle is short and wide or open repair is otherwise required"],
    ],
  }, SCORE),

  sourcedUnits({
    id: "block-paa-flow",
    type: "flow",
    heading: "From suspected aneurysm to disposition",
    nodes: [
      { id: "start", label: "Pulsatile groin or popliteal mass, limb ischemia, or an aneurysm found on imaging" },
      { id: "duplex", label: "Duplex confirms the aneurysm and measures its size and mural thrombus" },
      { id: "screen", label: "Survey the aortoiliac tree and the contralateral limb for more aneurysms" },
      { id: "ischemia", label: "Acute limb ischemia from thrombosis: catheter-directed thrombolysis can restore patency before definitive repair, in a limb viable enough to wait", tone: "caution" },
      { id: "small", label: "Small, no mural thrombus: duplex surveillance every 6 to 12 months", tone: "good" },
      { id: "repair", label: "Large, symptomatic or thrombus-containing: open or endovascular repair" },
    ],
    edges: [
      { from: "start", to: "duplex" },
      { from: "duplex", to: "screen" },
      { from: "screen", to: "ischemia", label: "The limb is acutely ischemic" },
      { from: "screen", to: "small", label: "Small and asymptomatic" },
      { from: "screen", to: "repair", label: "Large or symptomatic" },
      { from: "ischemia", to: "repair" },
    ],
  }, [[SCORE], [SCORE], [SCORE], [SCORE, SVS, OE], [SCORE], [SCORE], [SCORE], [SCORE], [SCORE]]),

  sourced({
    id: "block-paa-open",
    type: "sequence",
    heading: "Open repair of a popliteal aneurysm, in outline",
    steps: [
      { title: "Bypass with vein", detail: "From the superficial femoral artery to the distal popliteal or proximal tibial artery, with great saphenous vein the preferred conduit when available." },
      { title: "Ligate the aneurysm", detail: "Once the bypass is in, ligate the aneurysm proximally and distally so it cannot thromboembolize." },
      { title: "Open the sac when it compresses", detail: "For a large aneurysm causing neurovascular compression, open the sac after vascular control and ligate the geniculate arteries from inside." },
      { title: "Surveil the graft", detail: "Regular duplex ultrasonography and ankle-brachial index checks." },
    ],
  }, SCORE),

  sourced({
    id: "block-paa-fiser",
    type: "bullets",
    heading: "Fiser's board facts",
    items: [
      "Above the inguinal ligament, **rupture** is the most common complication of an aneurysm; below it, **embolization and thrombosis** are.",
      "Popliteal aneurysms rarely rupture; their danger is embolization or thrombosis with limb ischemia.",
      "Half of popliteal aneurysms are bilateral and half of affected patients have another aneurysm elsewhere, so obtain an abdominal and pelvic CT.",
      "Untreated, about **25%** of popliteal aneurysms produce a complication that requires amputation.",
      "Fiser keys popliteal repair for symptoms, size over 2 cm or mycotic infection, by exclusion with a vein bypass graft, avoiding PTFE below the knee.",
      "Fiser keys femoral repair above 3.5 cm by resection with an interposition graft, avoiding covered stents across joint lines because they kink.",
      "The femoral artery is the most common site of pseudoaneurysm, which typically follows a percutaneous intervention or a suture-line disruption.",
      "A pseudoaneurysm at a suture line months to years after surgery suggests **graft infection**.",
    ],
  }, FISER),

  sourcedUnits({
    id: "block-paa-splits",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Covered stent for a popliteal aneurysm", "Fiser: not recommended unless the patient cannot have open surgery; the expected answer is exclusion with a vein bypass", "SCORE accepts stent-graft exclusion with favorable anatomy (2 cm of normal artery each side, no extensive tortuosity, not extremely large) and antiplatelet therapy afterward; the SVS suggests open repair with vein when life expectancy is 5 years or more and endovascular repair when it is shorter"],
      ["Popliteal repair threshold", "Fiser and SCORE: over 2 cm, or any symptoms", "SVS 2022: repair at 20 mm or more, defer to 30 mm in selected high-risk patients without thrombus, and consider repair under 20 mm with thrombus, embolism or poor runoff"],
      ["Femoral repair threshold", "Fiser: over 3.5 cm", "SCORE observes femoral aneurysms only under 2.5 cm; contemporary natural-history data saw no acute complications at 3.5 cm or less. No single threshold covers 2.5 to 3.5 cm, so know both numbers"],
      ["Post-access pseudoaneurysm", "Fiser: ultrasound-guided compression with thrombin injection", "SCORE: ultrasound-guided thrombin injection, with compression not part of the description"],
      ["How often a popliteal aneurysm travels with an AAA", "Fiser: half have another aneurysm somewhere; the SCORE AAA module: 62% have an AAA", "The SVS meta-analysis: about one-third, with a contralateral popliteal aneurysm in about half"],
      ["Surveillance of a small popliteal aneurysm", "SCORE: duplex every 6 to 12 months", "SVS 2022: annual examination and duplex of diameter, thrombus and runoff, and repeat screening of the other leg and the aorta every 5 years"],
    ],
  }, [[FISER, SCORE, SVS], [FISER, SCORE, SVS, OE], [FISER, SCORE, OE], [FISER, SCORE], [FISER, SCORE_AAA, SVS, OE], [SCORE, SVS, OE]]),

  sourced({
    id: "block-paa-repair-pointer",
    type: "prose",
    heading: "↳ The operation",
    text: "Medial versus posterior approach, stent-graft limits, pseudoaneurysm repair and the thrombosed popliteal aneurysm pathway are in [[Peripheral Aneurysms Repair]].",
  }, SCORE),

  references("block-paa-references", [SCORE, FISER, OE, SVS, SCORE_AAA]),
];

export const arterialPeripheralAneurysmsTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000005020",
  versionId: "00000000-0000-4000-8000-000000005021",
  slug: "arterial-peripheral-aneurysms",
  title: "Arterial Peripheral Aneurysms",
  aliases: ["peripheral aneurysm", "peripheral arterial aneurysm", "peripheral artery aneurysm", "popliteal aneurysm", "popliteal artery aneurysm", "PAA", "femoral aneurysm", "femoral artery aneurysm", "common femoral artery aneurysm", "CFA aneurysm", "femoral pseudoaneurysm", "iatrogenic pseudoaneurysm", "pulsatile groin mass", "pulsatile popliteal mass", "arteriomegaly"],
  scoreNodeId: "arterial-conditions",
  scoreCategory: "SCORE · Arterial Disease · Diseases & Conditions",
  tags: ["arterial-disease", "vascular", "aneurysm", "popliteal", "femoral", "pseudoaneurysm", "acute-limb-ischemia", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [FISER, OE, SVS, SCORE_AAA],
  blocks,
  reviewedAt: "2026-10-22T00:00:00.000Z",
});
