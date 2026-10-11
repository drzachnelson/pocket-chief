import { buildTopic, references, sourcedUnits } from "@/content/authoring";
import {
  ACAS_SOURCE as ACAS,
  CMS_CAROTID_STENTING_2023_SOURCE as CMS,
  CREST2_SOURCE as CREST2,
  CREST_SOURCE as CREST,
  DE_BORST_TCAR_2023_SOURCE as DE_BORST,
  ENROUTE_LABELING_SOURCE as ENROUTE,
  FISER_VASCULAR_SOURCE as FISER,
  NASCET_SOURCE as NASCET,
  SCORE_CAROTID_DISEASE_SOURCE as SCORE_DISEASE,
  SCORE_CAROTID_PROCEDURES_SOURCE as SCORE,
  SVS_CAROTID_2022_SOURCE as SVS,
  TCAR_ANESTHESIA_2020_SOURCE as ANESTHESIA,
  VQI_TCAR_VS_TFCAS_2019_SOURCE as VQI,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourcedUnits({
    id: "block-pcas-summary",
    type: "summary",
    heading: "At a glance",
    text: "Three operations treat a carotid bifurcation stenosis. **Carotid endarterectomy** (CEA) clamps the arteries and removes the plaque through a neck incision. **Transfemoral** carotid stenting (TF-CAS) works from the groin, across the aortic arch, behind a distal filter. **TCAR** stents through a small cutdown on the proximal common carotid while flow in the internal carotid is reversed into the femoral vein through a filter. CEA remains first-line; stenting is chosen when the neck or the patient makes open surgery hazardous.",
  }, [[SCORE, SVS]]),

  sourcedUnits({
    id: "block-pcas-compare",
    type: "table",
    heading: "Three procedures side by side",
    columns: ["Feature", "Endarterectomy", "TCAR", "Transfemoral stenting"],
    rows: [
      ["Access", "Neck incision along sternocleidomastoid, centered on the bifurcation", "Small cutdown on the proximal common carotid with direct puncture", "Percutaneous common femoral artery, then across the arch"],
      ["Brain protection", "Clamping, with a shunt routinely or when monitoring demands it", "Flow reversal: internal carotid blood runs backward through a filter into the femoral vein", "A distal embolic protection device beyond the lesion"],
      ["Aortic arch", "Not entered", "Avoided by design", "Manipulated — a main source of its embolic strokes"],
      ["Main hazards", "Cranial nerve injury, neck hematoma, myocardial infarction", "Neck and groin hematoma on heparin and dual antiplatelets; needs common carotid anatomy that fits the device", "More periprocedural stroke than endarterectomy"],
      ["Evidence base", "Randomized trials: NASCET, ACAS, CREST, CREST-2", "Registries and single-arm studies; no randomized trial yet", "Randomized trials: CREST, CREST-2"],
    ],
  }, [[SCORE, DE_BORST], [SCORE], [DE_BORST], [FISER, ANESTHESIA, ENROUTE, CREST], [NASCET, ACAS, CREST, CREST2, DE_BORST]]),

  sourcedUnits({
    id: "block-pcas-selection",
    type: "bullets",
    heading: "When to stent instead",
    items: [
      "A hostile neck: prior endarterectomy, radical neck dissection or neck irradiation, or a tracheostomy.",
      "A lesion or bifurcation too high to expose safely.",
      "Contralateral vocal cord paralysis.",
      "High medical risk, particularly severe cardiac disease.",
      "When stenting a high-surgical-risk patient, SVS prefers TCAR to the transfemoral route.",
      "Favor endarterectomy for most recently symptomatic patients and for older patients: in CREST, stenting carried more periprocedural stroke and fared worse above roughly age 70.",
    ],
  }, [[SCORE, FISER], [SCORE], [SCORE], [SCORE, FISER], [SVS], [CREST, DE_BORST]]),

  sourcedUnits({
    id: "block-pcas-cea-steps",
    type: "sequence",
    heading: "Endarterectomy, step by step",
    steps: [
      { title: "Position", detail: "Neck extended over a gel roll between the shoulder blades, head turned away, endotracheal tube taped to the opposite side. Expose the mandibular angle, trachea, sternal notch and earlobe." },
      { title: "Incision", detail: "Along the anterior border of sternocleidomastoid, centered on the bifurcation by pulse or ultrasound; divide platysma and retract the muscle laterally." },
      { title: "Divide the facial vein", detail: "The common facial vein crosses the bifurcation into the internal jugular and can routinely be divided safely; then retract the jugular laterally." },
      { title: "Control", detail: "Loop the proximal common carotid, the external, and the internal carotid where it is free of disease. Handle the bulb only as much as clamping requires, and treat bradycardia from bulb manipulation with local lidocaine. Identify the vagus so it is not clamped, and divide the ansa cervicalis to free the hypoglossal nerve if more height is needed." },
      { title: "Heparin and clamp", detail: "Heparin 100 units/kg to an activated clotting time over 250 seconds. Clamp in **ICE** order — internal, common, external — so debris loosened by the dissection cannot go to the brain." },
      { title: "Shunt if needed", detail: "Place the distal end gently in the disease-free internal carotid, secure it with a Silastic loop or clamp, flush and back-bleed, then seat it in the common carotid; confirm flow with a handheld Doppler." },
      { title: "Endarterectomy", detail: "Arteriotomy from the common carotid across the bulb onto the internal. Develop the plane between plaque and media with a Freer or Penfield elevator, evert the plaque out of the external carotid, transect it sharply proximally, and feather it off distally. Tack a loose distal flap with 7-0 polypropylene: a good distal endpoint is the most important technical point." },
      { title: "Patch", detail: "Sew a patch of Dacron, PTFE, bovine pericardium or vein with 6-0 polypropylene. Before it is complete, back-bleed the internal and external carotids and flush the common to clear debris and air." },
      { title: "Restore flow", detail: "Release in reverse order — external, common, then internal — and check the endpoint with Doppler, or with completion duplex or angiography for more certainty." },
    ],
  }, [[SCORE], [SCORE], [SCORE, FISER], [SCORE], [SCORE], [SCORE], [SCORE, FISER], [SCORE], [SCORE]]),

  sourcedUnits({
    id: "block-pcas-monitoring",
    type: "bullets",
    heading: "↳ Monitoring and shunting",
    items: [
      "Under general anesthesia, monitor with EEG and somatosensory evoked potentials, stump pressure, cerebral oximetry or transcranial Doppler.",
      "Under a cervical block with sedation, the awake patient squeezes a toy in the contralateral hand and keeps talking.",
      "A 3-minute test clamp of the internal carotid shows whether the brain tolerates it.",
      "Shunt for slurred speech, a lost grip, a stump pressure under 50 mm Hg, or EEG or evoked potentials falling below half of baseline.",
      "Fiser adds a tight or occluded contralateral carotid as a reason to shunt.",
      "Some surgeons shunt every patient (routine shunting) rather than selectively.",
    ],
  }, [[SCORE], [SCORE], [SCORE], [SCORE], [FISER], [SCORE]]),

  sourcedUnits({
    id: "block-pcas-closure",
    type: "bullets",
    heading: "↳ Patch, eversion or primary closure",
    items: [
      "Patch closure of any material beats primary closure, particularly in women and in a small internal carotid.",
      "**Eversion** endarterectomy transects the internal carotid obliquely at the bulb, rolls the wall back off the plaque, and reattaches it end to end; it suits short, focal lesions and a tortuous, redundant internal carotid.",
      "Completion Doppler can detect a distal endpoint problem, but completion duplex or angiography is more definitive about retained plaque.",
    ],
  }, [[SVS], [SCORE], [SCORE]]),

  sourcedUnits({
    id: "block-pcas-nerves",
    type: "table",
    heading: "Cranial nerves at risk",
    columns: ["Nerve", "Where it is", "Deficit"],
    rows: [
      ["Vagus and its recurrent laryngeal branch", "Within the carotid sheath; injured by clamping", "Hoarseness, usually transient — Fiser's most common cranial nerve injury"],
      ["Hypoglossal", "Courses medially above the bifurcation, joined by the ansa cervicalis", "Tongue deviates toward the injured side, with trouble speaking and chewing"],
      ["Marginal mandibular branch of the facial nerve", "At the angle of the jaw, injured by retractors", "Ipsilateral lower-lip droop and an uneven smile"],
      ["Glossopharyngeal", "Deep to the posterior belly of digastric; at risk only in a very high dissection", "Difficulty swallowing"],
      ["Ansa cervicalis", "Draped over the front of the carotid", "Strap-muscle denervation without a serious deficit"],
    ],
  }, [[FISER, SCORE], [FISER, SCORE], [FISER, SCORE], [FISER], [FISER, SCORE]]),

  sourcedUnits({
    id: "block-pcas-complications",
    type: "table",
    heading: "Complications and the response",
    columns: ["Problem", "Recognize", "Response"],
    rows: [
      ["New deficit in the OR or recovery room", "Contralateral weakness or numbness", "Straight back to the OR: heparinize, regain control, open the center of the patch, remove thrombus and fix the technical defect. If the internal carotid will not back-bleed, pass a #2 or #3 Fogarty gently and not too far, or a carotid-cavernous fistula can result"],
      ["New deficit on the floor", "Any later change in neurologic status", "Immediate CT angiography of the head and neck, then treat what it shows"],
      ["Neck hematoma", "Bleeding from the wound or a swelling incision", "Low threshold to return to the OR before the airway is compromised"],
      ["Hyperperfusion syndrome", "Severe ipsilateral headache, seizures, intracranial hemorrhage", "Blood-pressure control and seizure treatment; neurosurgical decompression for a large bleed"],
      ["Post-endarterectomy hypertension", "About 20%, from carotid body injury", "Nitroprusside, to protect the suture line"],
      ["Myocardial infarction", "The leading non-stroke cause of morbidity and death after endarterectomy", "Cardiac risk stratification before operating"],
      ["Patch infection", "Cellulitis, a hematoma, or months later a draining sinus; usually Staphylococcus epidermidis or aureus", "Antibiotics, excise the patch, replace it with saphenous vein, and add a muscle flap if grossly purulent"],
      ["Pseudoaneurysm", "A pulsatile, bleeding neck mass", "Prep and drape before intubating, then repair"],
    ],
  }, [[SCORE], [SCORE], [SCORE], [SCORE], [FISER], [FISER, SCORE], [SCORE], [FISER]]),

  sourcedUnits({
    id: "block-pcas-surveillance",
    type: "bullets",
    heading: "Surveillance and restenosis",
    items: [
      "Duplex at 1, 6 and 12 months, then yearly.",
      "Restenosis on the first duplex is residual disease — usually an incomplete internal carotid endarterectomy, a technical problem.",
      "Restenosis at 12 to 18 months is intimal hyperplasia.",
      "Restenosis many years later (SCORE says more than a decade) is recurrent atherosclerosis.",
      "Fiser's keyed restenosis rate after endarterectomy is 15%.",
    ],
  }, [[SCORE], [SCORE], [SCORE], [SCORE], [FISER]]),

  sourcedUnits({
    id: "block-pcas-surveillance-split",
    type: "prose",
    heading: "↳ Two SCORE modules, two schedules",
    text: "The procedures module schedules duplex at 1, 6 and 12 months and then yearly; the carotid disease module says every 6 months for the first two years. Both front-load imaging to catch early technical restenosis. The procedures module is the one written for postoperative follow-up, so its schedule is the one given above.",
  }, [[SCORE, SCORE_DISEASE]]),

  sourcedUnits({
    id: "block-pcas-tcar",
    type: "bullets",
    heading: "TCAR in brief",
    items: [
      "The common carotid is clamped below a short arterial sheath; femoral venous pressure is lower than carotid pressure, so internal carotid blood runs backward through a filter into the femoral vein while the lesion is crossed and stented.",
      "Anatomy required: a common carotid of at least 6 mm, a bifurcation at least 5 cm above the clavicle, and usable femoral venous access.",
      "Not for a patient who cannot take antiplatelet or anticoagulant therapy, has an unresolved bleeding disorder, or has severe disease of the ipsilateral common carotid.",
      "FDA-approved in 2015 for high-surgical-risk patients, with every case entered in the Vascular Quality Initiative registry; the label widened to standard-risk patients in 2022.",
      "In that registry, in-hospital stroke or death was 1.6% after TCAR against 3.1% after transfemoral stenting.",
    ],
  }, [[ANESTHESIA, SCORE], [ENROUTE], [ENROUTE], [DE_BORST], [VQI]]),

  sourcedUnits({
    id: "block-pcas-splits",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Who gets a stent", "High-risk patients: prior endarterectomy, heavy comorbidity, neck irradiation or dissection (Fiser)", "Medicare has covered standard-risk patients since 2023; endarterectomy stays first choice for most recently symptomatic patients"],
      ["How good is TCAR", "Fewer strokes than transfemoral stenting, thanks to flow reversal (Fiser)", "Registry and single-arm data only, with no randomized comparison against endarterectomy or transfemoral stenting; registry in-hospital endpoints understate 30-day risk by 20 to 25%"],
      ["The hostile-neck list in the SCORE module", "Printed under \"CEA should be considered\"", "Read it as reasons to stent: each makes open exposure or a second nerve injury more dangerous"],
      ["Asymptomatic revascularization", "Endarterectomy for 70% or more", "CREST-2: stenting beat intensive medical therapy alone and endarterectomy did not reach significance; the two procedures were not compared head to head"],
    ],
  }, [[FISER, CMS, DE_BORST], [FISER, DE_BORST, VQI], [SCORE, FISER], [FISER, CREST2]]),

  references("block-pcas-references", [SCORE, SCORE_DISEASE, FISER, SVS, NASCET, ACAS, CREST, CREST2, CMS, ENROUTE, DE_BORST, VQI, ANESTHESIA]),
];

export const proceduresForCarotidArteryStenosisTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000004070",
  versionId: "00000000-0000-4000-8000-000000004071",
  slug: "procedures-for-carotid-artery-stenosis",
  title: "Procedures for Carotid Artery Stenosis",
  aliases: ["carotid endarterectomy", "eversion endarterectomy", "carotid patch angioplasty", "carotid artery stenting", "carotid stenting", "transfemoral carotid stenting", "TF-CAS", "TCAR", "transcarotid artery revascularization", "flow reversal", "ICE clamp order", "cerebral hyperperfusion syndrome", "hyperperfusion syndrome", "post-endarterectomy hypertension", "carotid restenosis", "CREST trial"],
  scoreNodeId: "arterial-procedures",
  scoreCategory: "SCORE · Arterial Disease · Operations & Procedures",
  tags: ["arterial-disease", "vascular", "carotid", "operative-technique", "endovascular", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [SCORE_DISEASE, FISER, SVS, NASCET, ACAS, CREST, CREST2, CMS, ENROUTE, DE_BORST, VQI, ANESTHESIA],
  blocks,
  reviewedAt: "2026-10-11T00:00:00.000Z",
});
