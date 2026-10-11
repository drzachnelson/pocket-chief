import { buildTopic, references, sourcedUnits } from "@/content/authoring";
import {
  ACAS_SOURCE as ACAS,
  CAROTID_DISEASE_OE_SOURCE as OE_DISEASE,
  CAROTID_PROCEDURES_OE_SOURCE as OE,
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
  TCAR_VS_CEA_STANDARD_RISK_2023_SOURCE as LIANG,
  VQI_TCAR_CEA_TFCAS_2022_SOURCE as COLUMBO,
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
      ["Registry stroke or death", "1.7% perioperatively", "2.0% perioperatively, no different from endarterectomy at 1 year", "3.7% perioperatively, and more at 1 year"],
      ["Evidence base", "Randomized trials: NASCET, ACAS, CREST, CREST-2", "Registries and single-arm studies; no randomized trial yet", "Randomized trials: CREST, CREST-2"],
    ],
  }, [[SCORE, DE_BORST], [SCORE], [DE_BORST], [FISER, ANESTHESIA, ENROUTE, CREST], [COLUMBO], [NASCET, ACAS, CREST, CREST2, DE_BORST]]),

  sourcedUnits({
    id: "block-pcas-selection",
    type: "bullets",
    heading: "When to stent instead",
    items: [
      "A hostile neck: prior endarterectomy with restenosis, radical neck dissection or neck irradiation, or a tracheostomy.",
      "A lesion too high (above C2) or too low (below the clavicle) to expose safely.",
      "Contralateral vocal cord paralysis.",
      "High medical risk, particularly severe cardiac disease.",
      "When stenting a high-surgical-risk patient, SVS prefers TCAR to the transfemoral route.",
      "Favor endarterectomy for most recently symptomatic patients and for patients over about 70: in CREST, stenting carried more periprocedural stroke, and that risk rises with age, in women, and when stenting is done within a week of symptoms.",
    ],
  }, [[SCORE, FISER, OE_DISEASE], [SCORE, OE_DISEASE], [SCORE], [SCORE, FISER], [SVS], [CREST, DE_BORST, OE_DISEASE]]),

  sourcedUnits({
    id: "block-pcas-cea-steps",
    type: "sequence",
    heading: "Endarterectomy, step by step",
    steps: [
      { title: "Position", detail: "Neck extended over a gel roll between the shoulder blades, head turned away, endotracheal tube taped to the opposite side. Expose the mandibular angle, trachea, sternal notch and earlobe." },
      { title: "Incision", detail: "Along the anterior border of sternocleidomastoid, centered on the bifurcation by pulse or ultrasound; divide platysma and retract the muscle laterally." },
      { title: "Divide the facial vein", detail: "The common facial vein crosses the bifurcation into the internal jugular and can routinely be divided safely; then retract the jugular laterally." },
      { title: "Control", detail: "Loop the proximal common carotid, the external, and the internal carotid where it is free of disease. Handle the bulb only as much as clamping requires, and treat bradycardia from bulb manipulation with local lidocaine. Identify the vagus so it is not clamped, and divide the ansa cervicalis to free the hypoglossal nerve if more height is needed." },
      { title: "High exposure", detail: "For a lesion above C2, divide the posterior belly of digastric and the stylopharyngeus and remove the styloid process; mandibular subluxation needs nasotracheal intubation planned in advance, ideally with otolaryngology." },
      { title: "Heparin and clamp", detail: "Heparin 100 units/kg to an activated clotting time over 250 seconds. Clamp in **ICE** order — internal, common, external — so debris loosened by the dissection cannot go to the brain." },
      { title: "Shunt if needed", detail: "Place the distal end of a Pruitt-Inahara or Javid shunt gently in the disease-free internal carotid, secure it with a Silastic loop or clamp, flush and back-bleed, then seat it in the common carotid; confirm flow with a handheld Doppler." },
      { title: "Endarterectomy", detail: "Arteriotomy from the common carotid across the bulb onto the internal. Develop the plane between plaque and media with a Freer or Penfield elevator, removing the intima and inner media, evert the plaque out of the external carotid, transect it sharply proximally, and feather it off distally. Tack a loose distal flap with 7-0 polypropylene: a good distal endpoint is the most important technical point." },
      { title: "Patch", detail: "Sew a patch of bovine pericardium, Dacron, PTFE or saphenous vein with 6-0 polypropylene; avoid a cephalic vein patch, which can blow out. Before it is complete, back-bleed the internal and external carotids and flush the common to clear debris and air." },
      { title: "Restore flow", detail: "Release in reverse order — external, common, then internal — and check the endpoint with Doppler, or with completion duplex or angiography for more certainty." },
    ],
  }, [[SCORE], [SCORE], [SCORE, FISER], [SCORE], [SCORE], [SCORE], [SCORE, OE_DISEASE], [SCORE, FISER, OE], [SCORE, OE_DISEASE], [SCORE]]),

  sourcedUnits({
    id: "block-pcas-monitoring",
    type: "bullets",
    heading: "↳ Monitoring and shunting",
    items: [
      "Under general anesthesia, monitor with EEG and somatosensory evoked potentials, stump pressure, cerebral oximetry or transcranial Doppler.",
      "Under a cervical block with sedation, the awake patient squeezes a toy in the contralateral hand and keeps talking.",
      "A 3-minute test clamp of the internal carotid shows whether the brain tolerates it.",
      "SCORE's shunt triggers: slurred speech, a lost grip, a stump pressure under 50 mm Hg, or EEG or evoked potentials falling below half of baseline.",
      "Fiser adds a tight or occluded contralateral carotid as a reason to shunt.",
      "Routine and selective shunting are both accepted; no monitoring method has been shown to be superior or to improve outcome on its own.",
    ],
  }, [[SCORE], [SCORE], [SCORE], [SCORE], [FISER], [SCORE, OE]]),

  sourcedUnits({
    id: "block-pcas-closure",
    type: "bullets",
    heading: "↳ Patch, eversion or primary closure",
    items: [
      "Patch closure or eversion beats primary closure, with less perioperative thrombosis, less perioperative and late stroke, and less restenosis — particularly in women and in an internal carotid of 4 mm or less.",
      "No patch material is clearly better than another.",
      "**Eversion** endarterectomy transects the internal carotid obliquely at the bulb, rolls the wall back off the plaque, and reattaches it end to end. It suits short, focal lesions and a tortuous, redundant internal carotid, avoids a prosthetic patch, and makes shunting harder.",
      "Completion Doppler can detect a distal endpoint problem, but completion duplex or angiography is more definitive about retained plaque.",
    ],
  }, [[SVS, OE], [OE], [SCORE, OE], [SCORE]]),

  sourcedUnits({
    id: "block-pcas-nerves",
    type: "table",
    heading: "Cranial nerves at risk",
    columns: ["Nerve", "Where it is", "Deficit"],
    rows: [
      ["Vagus and its recurrent laryngeal branch", "Within the carotid sheath, posterolateral between the artery and the jugular; injured by clamping", "Hoarseness and a weak cough, usually transient"],
      ["Hypoglossal", "Crosses the distal internal and external carotids above the bifurcation, joined by the ansa cervicalis", "Tongue deviates toward the injured side, with trouble speaking and chewing"],
      ["Marginal mandibular branch of the facial nerve", "At the angle of the jaw, injured by retractors", "Ipsilateral lower-lip droop and an uneven smile"],
      ["Glossopharyngeal", "Deep to the posterior belly of digastric; at risk only in a very high dissection", "Severe dysphagia and a lost gag reflex"],
      ["Spinal accessory", "Lateral, under aggressive sternocleidomastoid retraction", "Shoulder droop and trapezius weakness"],
      ["Sympathetic chain", "Posteromedial to the carotid sheath", "Horner syndrome: ptosis, miosis, anhidrosis"],
      ["Ansa cervicalis", "Draped over the front of the carotid", "Strap-muscle denervation without a serious deficit"],
    ],
  }, [[FISER, SCORE, OE], [FISER, SCORE, OE], [FISER, SCORE], [FISER, OE], [OE], [OE], [FISER, SCORE]]),

  sourcedUnits({
    id: "block-pcas-nerve-rates",
    type: "prose",
    heading: "↳ Which nerve is hurt most often",
    text: "Fiser keys the **vagus** as the most common cranial nerve injury, and the largest pooled meta-analysis agrees, at 3.99% against 3.79% for the hypoglossal. The SVS implementation document lists the hypoglossal first, and some texts teach it as the classic answer. Overall injury runs about 5 to 7% (4.7% in CREST), and permanent deficit is under 1%.",
  }, [[FISER, OE]]),

  sourcedUnits({
    id: "block-pcas-complications",
    type: "table",
    heading: "Complications and the response",
    columns: ["Problem", "Recognize", "Response"],
    rows: [
      ["New deficit in the OR or recovery room", "Contralateral weakness or numbness; thrombus at the endarterectomy site is found in most re-explorations", "Straight back to the OR without waiting for imaging: heparinize, regain control, open the center of the patch, remove thrombus and fix the technical defect. If the internal carotid will not back-bleed, pass a #2 or #3 Fogarty gently and not too far, or a carotid-cavernous fistula can result"],
      ["New deficit on the floor", "Any later change in neurologic status", "Immediate CT angiography of the head and neck to separate hemorrhage, a large infarct and occlusion, then treat what it shows"],
      ["Neck hematoma", "Bleeding from the wound or a swelling incision", "Low threshold to return to the OR; with stridor or respiratory distress, open the incision at the bedside first"],
      ["Hyperperfusion syndrome", "Severe ipsilateral headache, seizures, intracranial hemorrhage; about 0.18% after endarterectomy and 1 to 2% after stenting, with mortality from 38% to over 50% once it bleeds", "Strict blood-pressure control, systolic under about 140 to 150 mm Hg with labetalol or nicardipine; seizure treatment; hold antithrombotics for hemorrhage and decompress a large bleed"],
      ["Post-endarterectomy hypertension", "About 20%, from carotid body and baroreceptor injury", "Nitroprusside or another titratable agent, to protect the suture line"],
      ["Myocardial infarction", "The leading non-stroke cause of morbidity and death after endarterectomy", "Cardiac risk stratification before operating; endarterectomy is an intermediate-risk procedure"],
      ["Patch infection", "Cellulitis, a hematoma, or months later a draining sinus; usually Staphylococcus epidermidis or aureus", "Antibiotics, excise the patch, replace it with saphenous vein, and add a muscle flap if grossly purulent"],
      ["Pseudoaneurysm", "A pulsatile, bleeding neck mass", "Prep and drape before intubating, then repair"],
    ],
  }, [[SCORE, OE], [SCORE, OE], [SCORE, OE], [SCORE, OE, OE_DISEASE], [FISER, OE], [FISER, SCORE, OE_DISEASE], [SCORE], [FISER]]),

  sourcedUnits({
    id: "block-pcas-surveillance",
    type: "bullets",
    heading: "Surveillance and restenosis",
    items: [
      "Duplex at 1, 6 and 12 months, then yearly; most uncomplicated patients go home on the first postoperative day.",
      "Restenosis within 30 days or on the first duplex is a technical error — residual plaque or a retained flap.",
      "Restenosis within about 2 years, peaking at 6 to 18 months, is neointimal hyperplasia: smooth, low embolic risk, usually observed unless near-occlusive or symptomatic.",
      "Restenosis after 2 to 3 years is recurrent atherosclerosis, treated like a new lesion.",
      "Risk factors: female sex, smoking, young age at the first operation, diabetes, hyperlipidemia and primary closure.",
      "Stenting is often preferred for recurrent stenosis: the field is scarred, redo endarterectomy injures more nerves, and stroke or death rates are similar.",
      "Fiser's keyed restenosis rate after endarterectomy is 15%.",
    ],
  }, [[SCORE, OE], [SCORE, OE], [SCORE, OE], [OE], [OE], [OE], [FISER]]),

  sourcedUnits({
    id: "block-pcas-surveillance-split",
    type: "prose",
    heading: "↳ Three schedules for the same follow-up",
    text: "The SCORE procedures module schedules duplex at 1, 6 and 12 months and then yearly; the SCORE disease module says every 6 months for the first two years; the SVS perioperative care guide says 1 month, 6 months, then yearly. All three front-load imaging to catch early technical restenosis, and the procedures module's schedule is the one given above.",
  }, [[SCORE, SCORE_DISEASE, OE]]),

  sourcedUnits({
    id: "block-pcas-tcar",
    type: "bullets",
    heading: "TCAR in brief",
    items: [
      "The common carotid is clamped below a short arterial sheath; femoral venous pressure is lower than carotid pressure, so internal carotid blood runs backward through a filter into the femoral vein while the lesion is crossed and stented.",
      "Anatomy required: a common carotid of at least 6 mm, a bifurcation at least 5 cm above the clavicle, and usable femoral venous access.",
      "Not for a patient who cannot take antiplatelet or anticoagulant therapy, has an unresolved bleeding disorder, or has severe disease of the ipsilateral common carotid.",
      "FDA-approved in 2015 for high-surgical-risk patients, with every case entered in the Vascular Quality Initiative registry; the label widened to standard-risk patients in 2022.",
      "Against transfemoral stenting in that registry, in-hospital stroke or death was 1.6% against 3.1%. TCAR now accounts for about three-quarters of US carotid stenting.",
      "Against endarterectomy in standard-risk patients: 30-day stroke, death or myocardial infarction or 1-year ipsilateral stroke 3.0% against 2.6%, not significantly different, though 1-year ipsilateral stroke alone was higher after TCAR (1.6% against 1.1%). TCAR causes fewer cranial nerve injuries.",
    ],
  }, [[ANESTHESIA, SCORE], [ENROUTE], [ENROUTE], [DE_BORST], [VQI, OE_DISEASE], [LIANG, OE_DISEASE]]),

  sourcedUnits({
    id: "block-pcas-splits",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Who gets a stent", "High-risk patients: prior endarterectomy, heavy comorbidity, neck irradiation or dissection (Fiser)", "Medicare has covered standard-risk patients since 2023; endarterectomy stays first choice for most recently symptomatic patients"],
      ["How good is TCAR", "Fewer strokes than transfemoral stenting, thanks to flow reversal (Fiser)", "Registry and single-arm data only, with no randomized comparison against endarterectomy or transfemoral stenting; registry in-hospital endpoints understate 30-day risk by 20 to 25%"],
      ["Stump pressure that triggers a shunt", "Under 50 mm Hg (SCORE, Fiser)", "Published selective-shunting thresholds run from 40 to 50 mm Hg, and some series use lower; treat it as a range"],
      ["Late restenosis from recurrent atherosclerosis", "More than a decade after endarterectomy (SCORE)", "After 2 to 3 years"],
      ["The hostile-neck list in the SCORE module", "Printed under \"CEA should be considered\"", "Read it as reasons to stent: each makes open exposure or a second nerve injury more dangerous"],
      ["Asymptomatic revascularization", "Endarterectomy for 70% or more", "CREST-2: stenting beat intensive medical therapy alone and endarterectomy did not reach significance; the two procedures were not compared head to head"],
    ],
  }, [[FISER, CMS, DE_BORST], [FISER, DE_BORST, VQI], [SCORE, FISER, OE], [SCORE, OE], [SCORE, FISER], [FISER, CREST2]]),

  references("block-pcas-references", [SCORE, OE, SCORE_DISEASE, OE_DISEASE, FISER, SVS, NASCET, ACAS, CREST, CREST2, CMS, ENROUTE, DE_BORST, VQI, COLUMBO, LIANG, ANESTHESIA]),
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
  additionalSourceIds: [OE, SCORE_DISEASE, OE_DISEASE, FISER, SVS, NASCET, ACAS, CREST, CREST2, CMS, ENROUTE, DE_BORST, VQI, COLUMBO, LIANG, ANESTHESIA],
  blocks,
  reviewedAt: "2026-10-11T00:00:00.000Z",
});
