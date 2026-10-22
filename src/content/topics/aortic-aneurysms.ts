import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  ACC_AHA_AORTIC_2022_SOURCE as ACC_AHA,
  AORTIC_ANEURYSMS_OE_SOURCE as OE,
  FISER_VASCULAR_SOURCE as FISER,
  SCORE_AAA_DISEASE_SOURCE as SCORE,
  SCORE_ARTERIAL_SOURCE as SCORE_REPAIR,
  SVS_AAA_2018_SOURCE as SVS,
  USPSTF_AAA_SOURCE as USPSTF,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Desktop/Pocket Chief/Inbox/2026-10-14-aortic-aneurysms/1-packet.md (S1 SCORE Abdominal Aortic Aneurysms,
// S2 SCORE Abdominal and Aortoiliac Aneurysm Repair, S3 Fiser chapter 27), checked against the folder's OpenEvidence document.
// The packet's EVAR step sequence, endoleak table and ischemic colitis warning are not repeated here: they duplicate the
// published Abdominal & Aortoiliac Aneurysm Repair topic, which this disease topic links to instead.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-aa-summary",
    type: "summary",
    heading: "At a glance",
    text: "An aneurysm is an arterial dilation of at least 50% above baseline diameter, and an aorta measuring **3 cm** or more is considered aneurysmal. True aneurysms involve all three layers of the arterial wall, whereas false aneurysms (pseudoaneurysms) involve the adventitia only. Most abdominal aortic aneurysms are degenerative (atherosclerotic) **fusiform** aneurysms driven by high metalloproteinase levels in the aortic media, and tobacco use is the single biggest risk factor. Most non-ruptured aneurysms are asymptomatic and found incidentally, so management hinges on diameter-based surveillance, repair at defined size or growth thresholds, and emergent repair when rupture occurs.",
  }, SCORE),

  sourced({
    id: "block-aa-risk",
    type: "bullets",
    heading: "Who gets one, and what makes it rupture",
    items: [
      "Age is the most significant risk factor, and risk increases after age 65 years.",
      "Smoking is the biggest **modifiable** risk factor, and risk increases 12-fold over 35 pack-years.",
      "A family history of AAA increases an individual's risk by 20%.",
      "Abdominal aortic aneurysms are more common in males and in White populations.",
      "The 12-month rupture risk rises with diameter, from 0.3% at 3.0 to 3.9 cm to more than 30% above 7 cm.",
      "Females rupture at smaller diameters than males.",
      "Saccular aneurysms rupture at smaller diameters than fusiform aneurysms.",
      "Continued tobacco use is associated with a higher rupture risk and faster aneurysm growth.",
      "Iliac artery aneurysms are present in 10% to 25% of patients with an AAA.",
      "Patients with a popliteal artery aneurysm have a 62% chance of an associated AAA, by the SCORE module's figure.",
    ],
  }, SCORE),

  sourcedUnits({
    id: "block-aa-oe-pearls",
    type: "bullets",
    heading: "↳ Two associations the exam likes",
    items: [
      "**Diabetes** is inversely associated with AAA, even though it accelerates atherosclerosis elsewhere.",
      "Trials of early repair for 4.0 to 5.4 cm aneurysms (UK Small Aneurysm, ADAM, CAESAR, PIVOTAL) showed no benefit over surveillance, so an asymptomatic aneurysm below threshold is watched, not fixed.",
    ],
  }, [[OE], [OE]]),

  sourced({
    id: "block-aa-diagnosis",
    type: "bullets",
    heading: "Finding it: examination, screening and imaging",
    items: [
      "Physical examination detects only 30% of aneurysms measuring 3 to 3.9 cm, 50% of those measuring 4 to 4.9 cm, and 75% of those larger than 5 cm.",
      "**Blue toe syndrome** from atheroembolization of mural thrombus can be the presenting sign.",
      "The Society for Vascular Surgery recommends one-time ultrasound screening for males and females aged **65 to 75** with a history of tobacco use.",
      "Ultrasound is the preferred screening and surveillance study because it has good sensitivity and specificity without radiation exposure.",
      "Computed tomography angiography is the preferred study for operative planning because it details aneurysm anatomy, thrombus, calcification and concomitant occlusive disease.",
    ],
  }, SCORE),

  sourced({
    id: "block-aa-surveillance",
    type: "table",
    heading: "Ultrasound surveillance by diameter",
    columns: ["Aneurysm diameter", "Re-image with ultrasound at"],
    rows: [
      ["2.5 to 2.9 cm", "10 years"],
      ["3.0 to 3.9 cm", "3 years"],
      ["4.0 to 4.9 cm in males", "12 months"],
      ["4.5 to 4.9 cm in females", "6 months"],
      ["5.0 to 5.4 cm", "6 months"],
    ],
  }, SCORE),

  sourced({
    id: "block-aa-indications",
    type: "bullets",
    heading: "When to repair, and EVAR or open",
    items: [
      "Elective repair is indicated at a diameter of **5.5 cm** or more in men and **5.0 cm** or more in women.",
      "Repair is indicated when an aneurysm grows at least 0.5 cm within 6 months or more than 1.0 cm within 1 year.",
      "Every **symptomatic** aneurysm is repaired urgently, because symptomatic aneurysms carry a high rupture risk.",
      "Saccular aneurysms can be considered for repair at any size, because their rupture risk exceeds that of fusiform aneurysms.",
      "An isolated asymptomatic iliac artery aneurysm is repaired at **3.5 cm** or larger.",
      "An iliac artery aneurysm of 2.0 cm or larger is repaired when a concomitant AAA is already undergoing repair.",
      "A mycotic (infected) aneurysm requires repair combined with appropriate antimicrobial therapy.",
      "EVAR requires an aortic neck at least 10 to 15 mm long, a neck diameter of 18 to 32 mm, and neck angulation under 60 degrees.",
      "EVAR requires femoral or iliac access vessels at least 6 to 8 mm in diameter to accommodate the delivery system.",
      "EVAR is favored for older or high-risk patients because its early surgical mortality is about one-third that of open repair.",
      "Open repair is preferred for younger, lower-risk patients because it is more durable despite a higher immediate procedural risk.",
      "The survival advantage of EVAR diminishes over time, and EVAR and open mortality converge after 5 to 8 years.",
      "Thirty-day mortality is 3% to 8% for open repair and 1% to 2% for EVAR.",
      "Five-year reintervention rates are 20% to 30% after EVAR and only 2% to 5% after open repair.",
      "EVAR surveillance uses CT angiography at 1 month, 6 months and 1 year, then annual duplex ultrasound indefinitely if there is no endoleak or sac enlargement.",
      "Connective tissue disorders such as Marfan or Ehlers-Danlos syndrome may require repair at smaller diameters and usually require open repair rather than EVAR.",
    ],
  }, SCORE_REPAIR),

  sourcedUnits({
    id: "block-aa-rupture",
    type: "flow",
    heading: "Ruptured AAA: resuscitation to definitive repair",
    nodes: [
      { id: "start", label: "Ruptured AAA: abdominal or back pain with hypotension" },
      { id: "resuscitate", label: "Permissive hypotension (systolic 80 to 100 mm Hg, as low as tolerated while mentating), uncrossmatched blood, massive transfusion, anticoagulant reversal", tone: "caution" },
      { id: "cta", label: "CT angiography of the chest, abdomen and pelvis to confirm rupture and plan repair", tone: "caution" },
      { id: "control", label: "Proximal control: supraceliac balloon occlusion from the femoral artery, or a clamp above the rupture" },
      { id: "evar", label: "EVAR when anatomy allows: faster hemorrhage control and better early outcomes", tone: "good" },
      { id: "open", label: "Open repair when anatomy is unsuitable or endovascular resources are unavailable" },
    ],
    edges: [
      { from: "start", to: "resuscitate", label: "Resuscitate and mobilize the operating room on recognition" },
      { from: "resuscitate", to: "cta", label: "Hemodynamics tolerate the scanner" },
      { from: "resuscitate", to: "control", label: "Too unstable to scan: straight to the operating room" },
      { from: "cta", to: "control", label: "Imaging sets the route to proximal control and the repair" },
      { from: "control", to: "evar", label: "Suitable neck" },
      { from: "control", to: "open", label: "Unsuitable anatomy" },
    ],
  }, [[SCORE_REPAIR], [SCORE_REPAIR, FISER], [SCORE_REPAIR, SCORE], [SCORE_REPAIR], [SCORE_REPAIR], [SCORE_REPAIR], [SCORE_REPAIR], [SCORE_REPAIR, SCORE], [SCORE], [SCORE_REPAIR], [SCORE_REPAIR], [SCORE_REPAIR]]),

  sourcedUnits({
    id: "block-aa-splits",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Surveillance at 3.0 to 3.9 cm", "Fiser: duplex yearly", "SCORE and the SVS: re-image at 3 years; the 2022 ACC/AHA guideline also says every 3 years"],
      ["Surveillance at 4.0 to 4.9 cm", "Fiser: every 6 months for 4.0 to 4.5 cm", "SCORE and the SVS: 12 months in males and 6 months for 4.5 to 4.9 cm in females; ACC/AHA: annually for men at 4.0 to 4.9 cm and women at 4.0 to 4.4 cm, every 6 months for women at 4.5 cm or more"],
      ["Repair threshold", "Fiser: 5.5 cm in men, 5.0 cm in women or at high rupture risk", "No divergence: SCORE and ACC/AHA key the same thresholds"],
      ["Elective repair mortality", "Fiser: a single figure of about 5%", "SCORE: 3% to 8% for open repair and 1% to 2% for EVAR at 30 days"],
      ["Permissive hypotension in rupture", "Fiser and the SCORE repair module: systolic 80 to 100 mm Hg", "The 2018 SVS guideline: systolic 70 to 90 mm Hg while the patient remains conscious"],
      ["How long EVAR's survival advantage lasts", "SCORE: converges with open repair after 5 to 8 years", "The OpenEvidence document places the convergence at about 2 to 3 years, with more late reintervention and rupture after EVAR; EVAR stays first-line for suitable anatomy either way"],
      ["Who is screened", "SCORE (SVS): males and females aged 65 to 75 with any tobacco history", "USPSTF: men aged 65 to 75 who ever smoked; evidence insufficient for women who ever smoked, and against screening women who never smoked"],
    ],
  }, [[FISER, SCORE, ACC_AHA], [FISER, SCORE, ACC_AHA], [FISER, SCORE, ACC_AHA], [FISER, SCORE_REPAIR], [FISER, SCORE_REPAIR, SVS, OE], [SCORE_REPAIR, OE], [SCORE, USPSTF]]),

  sourced({
    id: "block-aa-repair-pointer",
    type: "prose",
    heading: "↳ The operation",
    text: "EVAR and open technique, endoleak types and their management, ischemic colitis and the other complications of repair, and surveillance after repair are in [[Abdominal & Aortoiliac Aneurysm Repair]].",
  }, SCORE_REPAIR),

  references("block-aa-references", [SCORE, SCORE_REPAIR, FISER, OE, ACC_AHA, SVS, USPSTF]),
];

export const aorticAneurysmsTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000004820",
  versionId: "00000000-0000-4000-8000-000000004821",
  slug: "aortic-aneurysms",
  title: "Aortic Aneurysms",
  aliases: ["AAA", "abdominal aortic aneurysm", "aortic aneurysm", "AAA screening", "AAA surveillance", "infrarenal aneurysm", "juxtarenal aneurysm", "pararenal aneurysm", "suprarenal aneurysm", "saccular aneurysm", "fusiform aneurysm", "AAA rupture risk"],
  scoreNodeId: "arterial-conditions",
  scoreCategory: "SCORE · Arterial Disease · Diseases & Conditions",
  tags: ["arterial-disease", "vascular", "aneurysm", "aortic-aneurysm", "surveillance", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [SCORE_REPAIR, FISER, OE, ACC_AHA, SVS, USPSTF],
  blocks,
  reviewedAt: "2026-10-22T00:00:00.000Z",
});
