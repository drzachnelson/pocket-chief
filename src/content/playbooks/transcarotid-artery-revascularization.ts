import { buildPlaybook, references, sourcedUnits } from "@/content/authoring";
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
  TCAR_PLAYBOOK_OE_SOURCE as OE,
  TCAR_TECHNIQUE_2017_SOURCE as TECHNIQUE,
  TCAR_VS_CEA_STANDARD_RISK_2023_SOURCE as LIANG,
  VQI_TCAR_CEA_TFCAS_2022_SOURCE as COLUMBO,
  VQI_TCAR_VS_TFCAS_2019_SOURCE as VQI,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourcedUnits({
    id: "block-tcar-summary",
    type: "summary",
    heading: "At a glance",
    text: "TCAR stents the carotid bifurcation through a small cutdown on the proximal common carotid while blood in the internal carotid runs **backward** through a filter into the femoral vein. Debris loosened by crossing, ballooning and stenting goes to the filter rather than the brain, and the aortic arch is never touched. ENROUTE is the only FDA-approved transcarotid flow-reversal system. Three things are settled before the incision: anatomy that fits the device, a patient on dual antiplatelet therapy, and a blood pressure high enough to keep flow reversed.",
  }, [[SCORE, TECHNIQUE, ENROUTE, HEMODYNAMICS, OE]]),

  sourcedUnits({
    id: "block-tcar-antiplatelets",
    type: "warning",
    tone: "danger",
    heading: "Antiplatelets are part of the operation",
    text: "A patient who cannot take dual antiplatelet therapy or intraprocedural anticoagulation is not a candidate. In ROADSTER 2, stroke was 1.9% across everyone enrolled but 0.6% among patients treated per protocol, and the investigators credited protocol adherence and periprocedural antiplatelet therapy. Confirm aspirin and clopidogrel are on board before the patient comes to the room.",
  }, [[ENROUTE, OE, ROADSTER2]]),

  sourcedUnits({
    id: "block-tcar-selection",
    type: "bullets",
    heading: "Who it is for",
    items: [
      "Symptomatic stenosis of 50% or more within 6 months, or asymptomatic stenosis of 70% or more with a life expectancy of at least 3 to 5 years and a perioperative stroke or death risk under 3%. The ROADSTER trials required 80% or more for asymptomatic patients.",
      "Anatomic high risk for endarterectomy: prior neck radiation, prior endarterectomy with restenosis, a hostile neck, a bifurcation at or above C2, contralateral laryngeal nerve palsy, a tracheostomy, or contralateral carotid occlusion. Registry data favor TCAR over endarterectomy for the irradiated neck and the contralateral occlusion.",
      "Physiologic high risk: severe or multivessel coronary disease, myocardial infarction within 6 months, ejection fraction under 35%, severe heart failure or COPD, or age 75 or older — though several of these do not independently predict a worse endarterectomy.",
      "SVS prefers TCAR to both endarterectomy and transfemoral stenting in high-surgical-risk patients.",
      "A diseased or difficult aortic arch: about half the strokes after transfemoral stenting are contralateral, which implicates the arch TCAR avoids.",
      "Standard-risk patients are now within the device label (2022) and Medicare coverage (2023), with documented shared decision-making.",
      "Recently symptomatic patients: endarterectomy stays first choice, and in the TCAR Surveillance Project a recent stroke carried 2.8 times the odds of in-hospital stroke or death of an asymptomatic patient.",
    ],
  }, [[SVS, OE, ROADSTER2], [SCORE, OE], [OE], [SVS], [DE_BORST, OE], [DE_BORST, CMS], [DE_BORST]]),

  sourcedUnits({
    id: "block-tcar-contraindications",
    type: "bullets",
    heading: "↳ Do not do TCAR for",
    items: [
      "A chronically occluded internal carotid.",
      "Fresh, mobile thrombus in the common or internal carotid.",
      "A patient who cannot take antiplatelet or anticoagulant therapy, or has an unresolved bleeding disorder.",
      "Heavy circumferential calcification, plaque or thrombus at the planned common carotid puncture site.",
    ],
  }, [[OE], [OE], [ENROUTE, OE], [ENROUTE, OE]]),

  sourcedUnits({
    id: "block-tcar-timing",
    type: "bullets",
    heading: "↳ Timing after an event",
    items: [
      "Once neurologically stable, ideally within 2 weeks: the benefit falls quickly with delay and is largely lost after 12 weeks.",
      "Avoid the first 48 hours after a completed stroke because of hemorrhagic transformation; a multicenter cohort did best at 3 to 14 days, with worse 30-day outcomes and more deaths when treated at 0 to 2 days.",
      "Delay after a hemorrhagic stroke.",
    ],
  }, [[OE], [OE], [OE]]),

  sourcedUnits({
    id: "block-tcar-anatomy",
    type: "table",
    heading: "Anatomic screen on CTA or duplex",
    columns: ["Check", "Requirement", "Why it matters"],
    rows: [
      ["Common carotid diameter", "At least 6 mm at the access site", "Must accept the 8F arterial sheath"],
      ["Clavicle to bifurcation", "At least 5 cm", "Room for the sheath to sit below the bifurcation; straight-line CTA underestimates a tortuous common carotid, so confirm with centerline CTA or neck-extended duplex before calling it short"],
      ["Common carotid at the puncture site", "Free of significant or circumferential calcification and plaque", "Severe ipsilateral common carotid disease is a labeled contraindication"],
      ["Depth of the common carotid", "Depth-to-landing-zone ratio under 1:2", "SVS advises against TCAR when the depth exceeds the landing-zone length"],
      ["Internal carotid", "Reference diameter 4 to 9 mm", "The stent sizing range; one review puts the lower bound at 6 mm, so size to the stents available"],
      ["Femoral vein", "Usable access for an 8F sheath", "The return limb of the reversal circuit"],
      ["Collateral circulation", "Review contralateral carotid and posterior disease", "Severe disease there may limit cerebral flow during reversal; contralateral occlusion makes intolerance more likely"],
      ["Calcification and tortuosity", "Assess on CTA", "About two-thirds to 72% of carotids selected for revascularization meet the criteria"],
    ],
  }, [[ENROUTE, OE], [ENROUTE, OE], [ENROUTE, OE], [OE], [ENROUTE, OE], [ENROUTE, ANESTHESIA], [ENROUTE, OE], [DE_BORST, OE]]),

  sourcedUnits({
    id: "block-tcar-preparation",
    type: "bullets",
    heading: "Medical preparation",
    items: [
      "Aspirin and clopidogrel started at least 48 hours ahead, or a same-day load of aspirin 325 to 650 mg and clopidogrel 300 to 600 mg at least 4 to 6 hours before; ticagrelor or prasugrel for a clopidogrel nonresponder.",
      "A high-intensity statin, started or continued.",
      "Continue beta-blockade and optimize the heart: myocardial infarction is the leading non-stroke cause of perioperative morbidity.",
      "Baseline laryngoscopy after prior neck surgery or radiation, or when a contralateral nerve injury is a concern.",
    ],
  }, [[OE], [OE], [OE], [OE]]),

  sourcedUnits({
    id: "block-tcar-setup",
    type: "bullets",
    heading: "Set-up",
    items: [
      "Local or regional anesthesia with monitored care allows an awake neurologic check (contralateral grip, speech) during clamping and reversal; general anesthesia needs EEG or evoked-potential monitoring.",
      "Supine with a shoulder roll, neck slightly extended and turned away; prep the neck and a common femoral vein site, contralateral in ROADSTER 3. Put the C-arm at the head of the bed for oblique views of the bifurcation and the intracranial runoff.",
      "Radial arterial line: hypotension or bradycardia weakens flow reversal.",
      "Normotension for access; during reversal, raise mean pressure to about 100 mm Hg (systolic 140 to 160) to recruit collateral flow across the circle of Willis, with phenylephrine ready.",
      "Atropine 0.5 to 1 mg drawn up; prophylactic atropine 0.5 mg before balloon inflation reduces bradycardia during carotid stenting.",
    ],
  }, [[ANESTHESIA, OE], [TECHNIQUE, OE], [TECHNIQUE, HEMODYNAMICS], [HEMODYNAMICS, OE], [HEMODYNAMICS, OE]]),

  sourcedUnits({
    id: "block-tcar-anatomy-borders",
    type: "bullets",
    heading: "Anatomy and safe borders",
    items: [
      "Incision: 2 to 4 cm, transverse or longitudinal, one fingerbreadth above the clavicle between the sternal and clavicular heads of sternocleidomastoid.",
      "In the carotid sheath the common carotid is medial, the internal jugular lateral, and the vagus posterolateral between them — the nerve most at risk during circumferential dissection, injured in about 0.3 to 1.5% of cases, fewer than after endarterectomy.",
      "Stay on the anterior adventitia of the common carotid and expose only about 2.5 to 3 cm, enough for the sheath and a control loop. Going higher brings the hypoglossal nerve and the plaque into the field.",
      "Deep at the thoracic inlet lie the pleural dome and, on the left, the thoracic duct; keep the dissection superficial and above the clavicle.",
    ],
  }, [[OE], [OE, SCORE], [OE], [OE]]),

  sourcedUnits({
    id: "block-tcar-steps",
    type: "sequence",
    heading: "Step by step",
    steps: [
      { title: "Venous return sheath", detail: "Ultrasound-guided micropuncture of the common femoral vein, medial to the artery below the inguinal ligament. Confirm venous position before upsizing, then place the 8F venous return sheath and flush it." },
      { title: "Expose the common carotid", detail: "Open the carotid sheath between the heads of sternocleidomastoid, protect the vagus, and mobilize a short proximal segment. Encircle it with a Silastic loop or umbilical tape in a Rummel tourniquet, or have an atraumatic clamp ready." },
      { title: "Heparinize", detail: "Unfractionated heparin, commonly 75 to 100 units/kg, before the puncture, to an activated clotting time of 250 to 300 seconds; recheck about every 30 minutes. Bivalirudin is an alternative." },
      { title: "Puncture", detail: "Place a 5-0 or 6-0 polypropylene purse-string on the anterior common carotid. Gentle traction on the loop steadies the artery against a back-wall puncture. Puncture within the purse-string with a micropuncture needle angled cephalad, advance the microwire and a microsheath about 1.5 to 2 cm, confirm pulsatile backflow, and road-map the bifurcation and lesion in an oblique view." },
      { title: "Arterial sheath", detail: "When the external carotid is open, pass the 0.035-inch wire into it for purchase; keep the wire short of the lesion only when the bifurcation or external carotid is diseased, because stopping short roughly doubles dissection of the common carotid. Advance the 8F arterial sheath to its 2.5 cm stopper, tip 1.5 to 2 cm below the bifurcation, confirmed in two projections." },
      { title: "Reverse flow", detail: "Connect the arterial and venous sheaths through the flow controller and in-line filter, de-airing the whole circuit. Raise mean pressure to about 100 mm Hg, cinch the loop or clamp the common carotid below the sheath, set the controller to high flow, and confirm pulsatile retrograde flow into the filter." },
      { title: "Cross and predilate", detail: "Cross the stenosis with a soft 0.014-inch wire parked in the distal cervical or petrous internal carotid. Predilate only a pinhole or heavily calcified lesion, with a 2 to 4 mm balloon, under continuous high-flow reversal." },
      { title: "Stent and post-dilate", detail: "Deploy the self-expanding nitinol stent across the lesion with margins on both sides, its proximal end clear of the sheath. Post-dilate only for significant residual stenosis, about 1:1 to the normal distal internal carotid, after warning anesthesia about bradycardia; 20 to 30% residual is better than an aggressive dilation." },
      { title: "Restore antegrade flow", detail: "Keep high-flow reversal for 1 to 2 minutes after the last balloon, then turn the controller off, close the arterial stopcock and release the common carotid. Vasopressors can usually be weaned soon after." },
      { title: "Completion angiogram", detail: "Confirm stent expansion and apposition, no dissection or flap, and preserved intracranial runoff in oblique views." },
      { title: "Remove the sheaths and close", detail: "With proximal control ready, withdraw the arterial sheath, allow a brief bleed-back and tie the purse-string, or repair with pledgeted 6-0 polypropylene. Give protamine, which reduces hematomas needing re-exploration; confirm hemostasis and Doppler signals; remove the venous sheath with compression and close the neck in layers." },
    ],
  }, [[OE, ENROUTE], [OE, TECHNIQUE], [OE, ENROUTE], [OE, TECHNIQUE], [OE, TECHNIQUE, ENROUTE], [OE, ANESTHESIA, HEMODYNAMICS], [OE, TECHNIQUE], [OE, HEMODYNAMICS], [OE, ANESTHESIA], [OE, TECHNIQUE], [OE, ANESTHESIA]]),

  sourcedUnits({
    id: "block-tcar-intolerance",
    type: "bullets",
    heading: "↳ If reversal is not tolerated",
    items: [
      "Signs: a new deficit in the awake patient or EEG slowing.",
      "Raise the pressure first: reversal depends on collateral inflow across the circle of Willis, driven by the gradient between the carotid and the femoral vein.",
      "If it persists, drop the controller to low flow or briefly off, shorten the reversal time and stent quickly, keeping high flow for the riskiest moments.",
      "Conversion to general anesthesia is rarely needed — about 1 in 8 intolerant patients in ROADSTER.",
    ],
  }, [[OE], [HEMODYNAMICS, OE], [OE], [OE]]),

  sourcedUnits({
    id: "block-tcar-bailout",
    type: "bullets",
    heading: "↳ Bailout",
    items: [
      "Dissection of the common carotid is the most feared access complication, about 1.2%, and usually happens during sheath insertion: stent across the entry, tamponade it with a prolonged low-pressure balloon, or convert to an open repair. Never force a wire or sheath.",
      "Air in the circuit: clamp the arterial limb of the circuit at once, and do not release the common carotid until the sheath has been aspirated clear.",
      "Sheath and stent: keep the sheath tip at least about 1.5 cm below the bifurcation, and land the stent's proximal end outside it.",
      "Irradiated or redo neck: the planes are scarred, so stay on the anterior common carotid, and expect a longer landing zone on duplex than on straight-line CTA.",
    ],
  }, [[OE], [OE], [OE], [OE]]),

  sourcedUnits({
    id: "block-tcar-after",
    type: "bullets",
    heading: "After the procedure",
    items: [
      "A new deficit in recovery means stent thrombosis, embolism or an intracranial occlusion until proven otherwise: straight back to the hybrid suite for duplex or angiography, then thrombectomy, angioplasty or open exploration. Confirm dual antiplatelet therapy and anticoagulation status.",
      "An expanding neck hematoma with airway compromise: open the incision at the bedside, secure the airway, then return to the OR.",
      "Hyperperfusion syndrome is rare after TCAR, about 0.18%, similar to endarterectomy, but intracranial hemorrhage carries a case-fatality over 50%. Image with CT or CT perfusion, bring systolic pressure to 150 mm Hg or less with labetalol then nicardipine or clevidipine, and hold antithrombotics if it bleeds.",
      "Hyperperfusion risk factors: a prior TIA or stroke, urgent intervention, treating a near-occlusion, and needing intravenous antihypertensives after surgery.",
      "Keep systolic pressure under about 140 mm Hg without letting it fall low; bradycardia and hypotension after carotid stenting can last 12 to 24 hours.",
      "Dual antiplatelet therapy for at least 30 days, then a single agent for life; ROADSTER 2 tied its best results to protocol adherence and periprocedural antiplatelet therapy.",
      "Duplex within 30 days, at 6 months, then yearly.",
    ],
  }, [[OE], [OE, ANESTHESIA], [OE], [OE], [OE, HEMODYNAMICS], [OE, ROADSTER2], [OE]]),

  sourcedUnits({
    id: "block-tcar-outcomes",
    type: "table",
    heading: "Outcomes",
    columns: ["Study", "Design", "Result"],
    rows: [
      ["ROADSTER (2015)", "Pivotal single-arm trial in high-surgical-risk patients", "30-day stroke 1.4% by intention to treat, 0.7% per protocol"],
      ["ROADSTER 2 (2020)", "Post-approval registry: 692 high-risk patients, 81% of operators new to TCAR", "Intention to treat: stroke 1.9%, stroke or death 2.3%. Per protocol: stroke 0.6%, stroke or death 0.8%"],
      ["Schermerhorn (2019)", "Vascular Quality Initiative, 3,286 propensity-matched pairs against transfemoral stenting", "In-hospital stroke or death 1.6% against 3.1%; stroke 1.3% against 2.4%"],
      ["Columbo (2022)", "Vascular Quality Initiative: 21,234 TCAR, 82,737 endarterectomy and 14,595 transfemoral stenting", "Perioperative stroke or death 2.0%, 1.7% and 3.7%; TCAR and endarterectomy equal at 1 year"],
      ["Liang (2023)", "Vascular Quality Initiative, standard-risk patients, against endarterectomy", "Composite 3.0% against 2.6%, not different; 1-year ipsilateral stroke 1.6% against 1.1%"],
      ["What is missing", "No randomized trial against endarterectomy or transfemoral stenting", "Registry in-hospital endpoints understate 30-day risk by 20 to 25%, and most data are company-sponsored"],
    ],
  }, [[ROADSTER], [ROADSTER2], [VQI], [COLUMBO], [LIANG], [DE_BORST]]),

  references("block-tcar-references", [OE, TECHNIQUE, SCORE, ENROUTE, HEMODYNAMICS, ANESTHESIA, ROADSTER, ROADSTER2, VQI, COLUMBO, LIANG, DE_BORST, SVS, CMS]),
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
  sourceId: OE,
  additionalSourceIds: [TECHNIQUE, SCORE, ENROUTE, HEMODYNAMICS, ANESTHESIA, ROADSTER, ROADSTER2, VQI, COLUMBO, LIANG, DE_BORST, SVS, CMS],
  relatedTopicSlugs: ["procedures-for-carotid-artery-stenosis", "carotid-artery-disease"],
  blocks,
  reviewedAt: "2026-10-11T00:00:00.000Z",
});
