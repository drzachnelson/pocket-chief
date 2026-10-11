import { buildPlaybook, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  CMS_CAROTID_STENTING_2023_SOURCE as CMS,
  DE_BORST_TCAR_2023_SOURCE as DE_BORST,
  ENROUTE_LABELING_SOURCE as ENROUTE,
  ROADSTER2_SOURCE as ROADSTER2,
  ROADSTER_SOURCE as ROADSTER,
  SCORE_CAROTID_PROCEDURES_SOURCE as SCORE,
  SVS_CAROTID_2022_SOURCE as SVS,
  TCAR_ANESTHESIA_2020_SOURCE as ANESTHESIA,
  TCAR_HEMODYNAMICS_2018_SOURCE as HEMODYNAMICS,
  TCAR_TECHNIQUE_2017_SOURCE as TECHNIQUE,
  VQI_TCAR_VS_TFCAS_2019_SOURCE as VQI,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourcedUnits({
    id: "block-tcar-summary",
    type: "summary",
    heading: "At a glance",
    text: "TCAR stents the carotid bifurcation through a small cutdown on the proximal common carotid while blood in the internal carotid runs **backward** through a filter into the femoral vein. Debris loosened by crossing, ballooning and stenting goes to the filter rather than the brain, and the aortic arch is never touched. Three things are settled before the incision: anatomy that fits the device, a patient on dual antiplatelet therapy, and a blood pressure high enough to keep flow reversed.",
  }, [[SCORE, TECHNIQUE, ENROUTE, HEMODYNAMICS]]),

  sourcedUnits({
    id: "block-tcar-antiplatelets",
    type: "warning",
    tone: "danger",
    heading: "Antiplatelets are part of the operation",
    text: "A patient who cannot take antiplatelet or anticoagulant therapy is not a candidate. In ROADSTER 2, stroke was 1.9% across everyone enrolled but 0.6% among patients treated per protocol, and the investigators credited protocol adherence and periprocedural antiplatelet therapy. Confirm dual antiplatelet therapy is on board before the patient comes to the room.",
  }, [[ENROUTE, ROADSTER2]]),

  sourcedUnits({
    id: "block-tcar-selection",
    type: "bullets",
    heading: "Who it is for",
    items: [
      "A hostile neck for endarterectomy: prior endarterectomy, radical neck dissection, irradiation, a tracheostomy, contralateral vocal cord paralysis, or a lesion too high to expose.",
      "High physiologic risk: SVS prefers TCAR to both endarterectomy and transfemoral stenting in high-surgical-risk patients.",
      "A diseased or difficult aortic arch, since TCAR avoids the arch manipulation behind transfemoral embolic strokes.",
      "Standard-risk patients are now within the device label (2022) and Medicare coverage (2023), with documented shared decision-making.",
      "Recently symptomatic patients: endarterectomy stays first choice, and in the TCAR Surveillance Project a recent stroke carried 2.8 times the odds of in-hospital stroke or death of an asymptomatic patient.",
    ],
  }, [[SCORE], [SVS], [DE_BORST], [DE_BORST, CMS], [DE_BORST]]),

  sourcedUnits({
    id: "block-tcar-anatomy",
    type: "table",
    heading: "Anatomic screen on CTA or duplex",
    columns: ["Check", "Requirement", "Why it matters"],
    rows: [
      ["Common carotid diameter", "At least 6 mm", "Must accept the 8F arterial sheath"],
      ["Clavicle to bifurcation", "At least 5 cm", "Room for the sheath, inserted 2.5 cm, to sit below the bifurcation"],
      ["Common carotid at the puncture site", "Free of severe disease", "Severe ipsilateral common carotid disease is a labeled contraindication"],
      ["Internal carotid", "Reference diameter 4 to 9 mm", "The stent sizing range"],
      ["Femoral vein", "Usable access for an 8F sheath", "The return limb of the reversal circuit"],
      ["Collateral circulation", "Review contralateral carotid and posterior disease", "Severe disease there may limit cerebral flow during reversal"],
      ["Calcification and tortuosity", "Assess on CTA", "Up to a third of patients are anatomically unsuitable, often for these reasons"],
    ],
  }, [[ENROUTE], [ENROUTE, TECHNIQUE], [ENROUTE], [ENROUTE], [ENROUTE, ANESTHESIA], [ENROUTE], [DE_BORST]]),

  sourcedUnits({
    id: "block-tcar-setup",
    type: "bullets",
    heading: "Set-up",
    items: [
      "General anesthesia, a regional block, or monitored anesthesia care are all used.",
      "Position as for endarterectomy with the head turned away, and put the C-arm at the head of the bed so oblique views of the bifurcation and the intracranial runoff are possible.",
      "Radial arterial line: hypotension or bradycardia weakens flow reversal.",
      "Hold systolic pressure at 140 to 160 mm Hg during reversal to recruit collateral flow across the circle of Willis.",
      "Have atropine or glycopyrrolate drawn up; prophylactic atropine 0.5 mg before balloon inflation reduces bradycardia during carotid stenting.",
    ],
  }, [[ANESTHESIA], [TECHNIQUE], [TECHNIQUE, HEMODYNAMICS], [HEMODYNAMICS], [HEMODYNAMICS]]),

  sourcedUnits({
    id: "block-tcar-steps",
    type: "sequence",
    heading: "Step by step",
    steps: [
      { title: "Venous return sheath", detail: "Place the 8F venous return sheath in the femoral vein." },
      { title: "Expose the common carotid", detail: "A short incision low in the neck over the proximal common carotid. Open the carotid sheath, keep the internal jugular lateral and the vagus out of the clamp, and pass an umbilical tape around the artery well below the bifurcation." },
      { title: "Heparinize", detail: "Full systemic heparin before the artery is punctured." },
      { title: "Puncture", detail: "Gentle traction on the tape steadies the artery and prevents a back-wall puncture. Advance the micropuncture wire 2 to 3 cm and the microsheath 1.5 to 2 cm, confirm pulsatile backflow, and shoot an oblique angiogram to map the bifurcation and the lesion." },
      { title: "Arterial sheath", detail: "Pass the supplied 0.035-inch wire toward the bifurcation without engaging the lesion, advance the arterial sheath to its 2.5 cm stopper, and confirm the tip in two projections." },
      { title: "Reverse flow", detail: "Connect the arterial and venous sheaths through the filtered flow controller and clamp the common carotid below the sheath. Femoral venous pressure is lower than carotid pressure, so internal carotid blood runs backward through the filter. Keep systolic pressure at 140 to 160 mm Hg." },
      { title: "Cross, dilate and stent", detail: "Under reversal, cross the lesion with a wire, predilate (reversal allows a generous predilation), and deploy the stent. Expect bradycardia and hypotension as the balloon and stent stretch the carotid sinus." },
      { title: "Restore antegrade flow", detail: "Release the common carotid clamp; vasopressors can usually be weaned soon after." },
      { title: "Completion angiogram", detail: "Image the stented bifurcation and the intracranial runoff in oblique views." },
      { title: "Remove the sheaths", detail: "Remove the arterial sheath and repair the puncture, then the venous sheath, and check the neck and groin for hematoma in a patient who is heparinized and on two antiplatelet agents." },
    ],
  }, [[ENROUTE, ANESTHESIA], [SCORE, TECHNIQUE], [ENROUTE], [TECHNIQUE], [TECHNIQUE, ENROUTE], [ANESTHESIA, HEMODYNAMICS], [TECHNIQUE, HEMODYNAMICS], [ANESTHESIA], [TECHNIQUE], [ANESTHESIA, SCORE]]),

  sourced({
    id: "block-tcar-intolerance",
    type: "prose",
    heading: "↳ If reversal is not tolerated",
    text: "Flow reversal depends on collateral inflow across the circle of Willis, driven by the pressure difference between the carotid and the femoral vein. Raise systolic pressure into the 140 to 160 mm Hg range first. Severe contralateral carotid or posterior circulation disease limits that collateral supply, which is why it belongs in the preoperative anatomic review.",
  }, HEMODYNAMICS),

  sourcedUnits({
    id: "block-tcar-after",
    type: "bullets",
    heading: "After the procedure",
    items: [
      "Bradycardia and hypotension after carotid stenting can last 12 to 24 hours.",
      "Watch the neck and groin for hematoma.",
      "Keep both antiplatelet agents going; ROADSTER 2 tied its best results to protocol adherence and periprocedural antiplatelet therapy.",
      "Complications to look for: bleeding, infection, cranial nerve injury, myocardial ischemia, stroke and death.",
    ],
  }, [[HEMODYNAMICS], [ANESTHESIA], [ROADSTER2], [ANESTHESIA]]),

  sourcedUnits({
    id: "block-tcar-outcomes",
    type: "table",
    heading: "Outcomes",
    columns: ["Study", "Design", "Result"],
    rows: [
      ["ROADSTER (2015)", "Pivotal single-arm trial in high-surgical-risk patients", "30-day stroke 1.4% by intention to treat, 0.7% per protocol"],
      ["ROADSTER 2 (2020)", "Post-approval registry: 692 high-risk patients, 81% of operators new to TCAR", "Intention to treat: stroke 1.9%, stroke or death 2.3%. Per protocol: stroke 0.6%, stroke or death 0.8%"],
      ["Vascular Quality Initiative (2019)", "3,286 propensity-matched pairs against transfemoral stenting", "In-hospital stroke or death 1.6% against 3.1%; stroke 1.3% against 2.4%"],
      ["What is missing", "No randomized trial against endarterectomy or transfemoral stenting", "Registry in-hospital endpoints understate 30-day risk by 20 to 25%, and most data are company-sponsored"],
    ],
  }, [[ROADSTER], [ROADSTER2], [VQI], [DE_BORST]]),

  references("block-tcar-references", [TECHNIQUE, SCORE, ENROUTE, HEMODYNAMICS, ANESTHESIA, ROADSTER, ROADSTER2, VQI, DE_BORST, SVS, CMS]),
];

export const transcarotidArteryRevascularizationPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000016",
  slug: "transcarotid-artery-revascularization",
  title: "Transcarotid Artery Revascularization",
  aliases: ["TCAR", "Transcarotid stenting", "Flow reversal", "ENROUTE"],
  procedureId: "transcarotid_artery_revascularization",
  approach: "endovascular",
  specialty: "Vascular",
  tags: ["vascular", "carotid", "stroke prevention", "endovascular", "head and neck"],
  sourceId: TECHNIQUE,
  additionalSourceIds: [SCORE, ENROUTE, HEMODYNAMICS, ANESTHESIA, ROADSTER, ROADSTER2, VQI, DE_BORST, SVS, CMS],
  relatedTopicSlugs: ["procedures-for-carotid-artery-stenosis", "carotid-artery-disease"],
  blocks,
  reviewedAt: "2026-10-11T00:00:00.000Z",
});
