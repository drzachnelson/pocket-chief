import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  ACAS_SOURCE as ACAS,
  CAROTID_DISEASE_OE_SOURCE as OE,
  CAROTID_PROCEDURES_OE_SOURCE as OE_PROCEDURES,
  CMS_CAROTID_STENTING_2023_SOURCE as CMS,
  CREST2_SOURCE as CREST2,
  ESVS_CAROTID_2023_SOURCE as ESVS,
  FISER_VASCULAR_SOURCE as FISER,
  NASCET_SOURCE as NASCET,
  SCORE_CAROTID_DISEASE_SOURCE as SCORE,
  SVS_CAROTID_2022_SOURCE as SVS,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourcedUnits({
    id: "block-cad-summary",
    type: "summary",
    heading: "At a glance",
    text: "Carotid atherosclerosis forms at the **bifurcation** and proximal internal carotid and causes stroke mostly by **embolization**. Management turns on two questions: has the patient had symptoms in that territory, and how tight is the stenosis on duplex confirmed by axial imaging. Everyone gets best medical therapy. Symptomatic 50 to 99% stenosis is revascularized, usually by carotid endarterectomy, ideally **within 2 weeks**; asymptomatic 70% or greater is revascularized only when life expectancy and operative risk justify it.",
  }, [[SCORE, FISER]]),

  sourcedUnits({
    id: "block-cad-pathophysiology",
    type: "bullets",
    heading: "Why the bifurcation, and who gets it",
    items: [
      "Low shear stress at the bifurcation prolongs contact between plasma and the vessel wall, and that stasis drives plaque at the bifurcation and proximal internal carotid.",
      "Most cerebral ischemic events are **embolic** from unstable plaque in the internal carotid rather than thrombotic; the heart is the second most common embolic source, and a severe stenosis can also cause low-flow ischemia.",
      "Plaque features raise stroke risk independent of the percent stenosis: echolucency, ulceration, intraplaque hemorrhage on MRI, and spontaneous embolization on transcranial Doppler.",
      "Extracranial carotid disease causes roughly 10% of ischemic strokes in contemporary series (SCORE gives 20%), and only 15% of strokes are preceded by a TIA.",
      "Risk factors: age, male sex, smoking, hypertension, diabetes, hypercholesterolemia, coronary artery disease and peripheral artery disease.",
      "Hypertension is the most important risk factor for stroke, the fifth leading cause of death in the United States.",
      "The carotids carry about 85% of the brain's blood flow.",
      "Atherosclerosis is by far the most common cause; others are fibromuscular dysplasia, dissection, radiation arteriopathy, and Takayasu or giant cell arteritis.",
    ],
  }, [[SCORE], [FISER, OE], [OE_PROCEDURES], [OE, SCORE], [SCORE, OE], [FISER], [FISER], [OE, OE_PROCEDURES]]),

  sourcedUnits({
    id: "block-cad-territories",
    type: "table",
    heading: "Symptoms by territory",
    columns: ["Territory", "Symptoms"],
    rows: [
      ["Ophthalmic artery, the first branch of the internal carotid", "**Amaurosis fugax**: transient monocular blindness, a shade coming down over one eye; Hollenhorst plaques on fundoscopy"],
      ["Middle cerebral artery, the most commonly diseased intracranial artery", "Contralateral face and arm weakness and sensory loss, with aphasia when the dominant hemisphere is involved"],
      ["Anterior cerebral artery", "Contralateral leg-predominant weakness and abulia; Fiser lists mental status changes, release signs and slowing"],
      ["Posterior circulation (vertebrobasilar)", "Vertigo, tinnitus, diplopia, drop attacks and incoordination — not a carotid problem"],
    ],
  }, [[FISER, SCORE], [FISER, OE], [OE, FISER], [FISER]]),

  sourcedUnits({
    id: "block-cad-symptomatic",
    type: "bullets",
    heading: "↳ What counts as symptomatic",
    items: [
      "**Symptomatic** means amaurosis fugax, a TIA or a non-disabling stroke in the territory of the stenosis within the past 6 months.",
      "A TIA resolves within 24 hours and a stroke lasts longer, though an infarct on imaging makes it a stroke whatever the duration.",
      "Aphasia is impaired understanding or use of spoken language; dysarthria is a motor speech disorder from weak or paralyzed speech muscles.",
      "After a first event with severe stenosis, recurrent stroke can reach 7.5% within a month, which is why symptomatic disease is treated urgently.",
      "Asymptomatic disease carries an annual stroke risk of 1% or less overall, and about 1.6% a year when the stenosis is over 70%.",
    ],
  }, [[OE, OE_PROCEDURES], [SCORE, OE], [SCORE], [SCORE], [SCORE]]),

  sourcedUnits({
    id: "block-cad-duplex",
    type: "table",
    heading: "Grading stenosis on duplex",
    columns: ["Stenosis", "ICA peak systolic velocity", "ICA end-diastolic velocity", "ICA/CCA velocity ratio", "Plaque"],
    rows: [
      ["Normal", "Under 125 cm/s", "Under 40 cm/s", "Under 2.0", "None"],
      ["Under 50%", "Under 125 cm/s", "Under 40 cm/s", "Under 2.0", "Visible, narrowing the lumen by less than half"],
      ["50 to 69%", "125 to 230 cm/s", "40 to 100 cm/s", "2.0 to 4.0", "Narrowing the lumen by more than half"],
      ["70 to 99%", "Over 230 cm/s", "Over 100 cm/s", "Over 4.0", "Narrowing the lumen by more than 70%"],
      ["Near-occlusion", "High, low or undetectable", "Variable", "Not reliable", "A string sign: trickle flow through a collapsed distal ICA"],
      ["Total occlusion", "No detectable flow", "None", "Not applicable", "Lumen filled"],
    ],
  }, [[FISER], [FISER], [FISER], [FISER], [OE], [OE]]),

  sourcedUnits({
    id: "block-cad-duplex-reading",
    type: "bullets",
    heading: "↳ Reading the duplex",
    items: [
      "Peak systolic velocity is the primary parameter; end-diastolic velocity and the ratio support it and limit over-calling.",
      "An end-diastolic velocity over about 140 cm/s suggests 80% or greater, the threshold some surgeons use for asymptomatic intervention.",
      "Trials measured stenosis by the **NASCET** method: the residual lumen against the normal distal ICA. The ECST method compares it with the estimated bulb and reads higher — 70% by NASCET is about 82% by ECST.",
      "A **near-occlusion** is its own category, with no clear benefit from revascularization despite looking severe.",
    ],
  }, [[OE], [OE, OE_PROCEDURES], [OE, OE_PROCEDURES], [OE, OE_PROCEDURES]]),

  sourced({
    id: "block-cad-waveforms",
    type: "bullets",
    heading: "↳ Waveform and branch pearls",
    items: [
      "The internal carotid feeds a low-resistance bed, so its flow continues forward through diastole.",
      "The external carotid feeds a high-resistance bed and is triphasic: forward, reversed, then forward again.",
      "First branch of the internal carotid: the ophthalmic artery. First branch of the external carotid: the superior thyroid artery.",
      "The ophthalmic and internal maxillary arteries connect the internal and external carotid systems, so an occluded internal carotid can still fill retrogradely through the orbit.",
    ],
  }, FISER),

  sourcedUnits({
    id: "block-cad-imaging",
    type: "table",
    heading: "Imaging after the duplex",
    columns: ["Study", "Use it for", "Limits"],
    rows: [
      ["Carotid duplex", "The first test: grades stenosis by velocity, screens a bruit, and needs no contrast or radiation", "Confirm with CTA or MRA before revascularizing"],
      ["Noncontrast head CT", "Excludes hemorrhage or a large established infarct before any intervention", "Less sensitive than MRI for early ischemia"],
      ["CT angiography from the arch to the vertex", "Degree of stenosis, calcification, height of the bifurcation, tandem lesions and arch anatomy; preferred over MRA when calcification is heavy", "Contrast and radiation"],
      ["MRI and MR angiography", "Sensitive and specific for the cause of a stroke", "Overestimates stenosis, shows calcium poorly, and takes too long when thrombolysis is being decided"],
      ["Catheter angiography", "The historical gold standard and the basis of the NASCET measurement", "Invasive; now kept for discordant noninvasive studies or the time of stenting"],
      ["ECG and echocardiogram", "A cardiac embolic source, especially with bilateral symptoms or stenosis under 50%", "Add chest CTA if aortic dissection or an ascending aneurysm is suspected"],
    ],
  }, [[SCORE], [SCORE, OE], [SCORE, OE_PROCEDURES], [SCORE], [OE, OE_PROCEDURES], [SCORE, OE]]),

  sourcedUnits({
    id: "block-cad-decision",
    type: "flow",
    heading: "Who gets revascularized",
    nodes: [
      { id: "graded", label: "Stenosis graded on duplex and confirmed on CTA or MRA", tone: "default" },
      { id: "symptoms", label: "Amaurosis fugax, TIA or stroke in that carotid territory within 6 months?", tone: "default" },
      { id: "symptomatic", label: "Symptomatic: how tight?", tone: "default" },
      { id: "sym-severe", label: "50 to 99%: revascularize, ideally within 2 weeks", tone: "good" },
      { id: "sym-mild", label: "Under 50%: best medical therapy, no revascularization", tone: "default" },
      { id: "occluded", label: "Occluded or near-occluded: medical therapy only", tone: "caution" },
      { id: "asymptomatic", label: "Asymptomatic: how tight?", tone: "default" },
      { id: "asym-severe", label: "70 to 99%: consider revascularization if life expectancy is at least 3 to 5 years and operative stroke or death risk is under 3%", tone: "caution" },
      { id: "asym-mild", label: "Under 70%: best medical therapy, duplex again in 1 year", tone: "default" },
    ],
    edges: [
      { from: "graded", to: "symptoms" },
      { from: "symptoms", to: "symptomatic", label: "Yes" },
      { from: "symptoms", to: "asymptomatic", label: "No" },
      { from: "symptomatic", to: "sym-severe", label: "50 to 99%" },
      { from: "symptomatic", to: "sym-mild", label: "Under 50%" },
      { from: "symptomatic", to: "occluded", label: "Occluded" },
      { from: "asymptomatic", to: "asym-severe", label: "70 to 99%" },
      { from: "asymptomatic", to: "asym-mild", label: "Under 70%" },
      { from: "asymptomatic", to: "occluded", label: "Occluded" },
    ],
  }, [
    [SCORE], [SCORE, OE], [SCORE], [SCORE, NASCET], [FISER], [FISER, OE], [SCORE], [SVS, OE], [SCORE, FISER],
    [SCORE], [SCORE], [SCORE], [FISER], [FISER], [SCORE], [SCORE], [FISER],
  ]),

  sourcedUnits({
    id: "block-cad-medical",
    type: "bullets",
    heading: "Best medical therapy, for everyone",
    items: [
      "Blood pressure at or under 140/90, glycemic control, and smoking cessation.",
      "A high-intensity statin, with an LDL target under 70 mg/dL after a symptomatic event.",
      "Antiplatelet therapy with aspirin, adding clopidogrel for high-risk patients.",
      "After a minor stroke or TIA, short-course dual antiplatelet therapy — aspirin with clopidogrel for 3 weeks to 3 months, or with ticagrelor for 30 days — then a single agent.",
      "Aspirin or clopidogrel plus a statin before and after any revascularization.",
      "Medical therapy alone for symptomatic stenosis under 50% and asymptomatic stenosis under 70%.",
      "Modern intensive medical therapy is a strong comparator: in CREST-2 the medical-only groups had 5.3% and 6.0% events over 4 years.",
    ],
  }, [[OE_PROCEDURES, SCORE], [OE, OE_PROCEDURES], [SCORE], [OE_PROCEDURES], [SCORE], [FISER, OE], [CREST2]]),

  sourcedUnits({
    id: "block-cad-timing",
    type: "bullets",
    heading: "Timing and sequence",
    items: [
      "Symptomatic patients: revascularize once neurologically stable, after 48 hours and within 14 days of the event. Benefit is greatest inside 2 weeks and largely gone after 12 weeks.",
      "Crescendo TIAs or stroke in evolution with 50% or greater stenosis: urgent endarterectomy, preferably within 24 hours.",
      "Delay for a large infarct (more than a third of the middle cerebral territory), parenchymal hemorrhage, a persisting major deficit or impaired consciousness.",
      "After thrombolysis, early endarterectomy is reasonable with rapid recovery, an infarct under a third of the middle cerebral territory, and no hemorrhage or edema.",
      "Bilateral disease: repair the tighter side first; if both are equally tight, the dominant or symptomatic side first.",
      "Symptomatic 50 to 99% stenosis with coronary disease needing CABG: SVS suggests endarterectomy before or together with the bypass.",
      "Before revascularizing: duplex plus a corroborating CTA or MRA, cardiac risk stratification, and an otolaryngology look at the cords if the voice is hoarse or a contralateral endarterectomy has been done.",
    ],
  }, [[SCORE, ESVS, OE, OE_PROCEDURES], [FISER, OE], [OE_PROCEDURES], [OE], [FISER, OE], [OE], [SCORE]]),

  sourcedUnits({
    id: "block-cad-occlusion",
    type: "warning",
    tone: "danger",
    heading: "An occluded internal carotid is not repaired",
    text: "Revascularizing an **occluded** internal carotid brings no benefit, and extracranial-to-intracranial bypass does not prevent stroke either. Treat it medically; for an acute occlusion, heparin or clopidogrel limits clot propagation.",
  }, [[FISER, OE_PROCEDURES]]),

  sourcedUnits({
    id: "block-cad-trials",
    type: "table",
    heading: "Trials behind the thresholds",
    columns: ["Trial", "Who", "Result"],
    rows: [
      ["NASCET (1991, 1998)", "Symptomatic stenosis", "70 to 99%: 2-year ipsilateral stroke 26% with medical therapy against 9% with endarterectomy, a number needed to treat of about 6. 50 to 69%: 5-year 22.2% against 15.7%, a number needed to treat of about 22 and little benefit in women. Under 50%: no benefit"],
      ["ACAS (1995)", "Asymptomatic stenosis of 60% or more", "5-year ipsilateral stroke 11.0% with medical therapy against 5.1% with endarterectomy, about 1% a year"],
      ["ACST", "Asymptomatic severe stenosis", "10-year stroke or perioperative death 17.9% with medical therapy against 13.4% with endarterectomy"],
      ["CREST-2 (2025)", "Asymptomatic stenosis of 70% or more, on intensive medical therapy", "Stenting lowered the composite to 2.8% against 6.0% (P = 0.02); endarterectomy, 3.7% against 5.3%, did not reach significance (P = 0.24)"],
    ],
  }, [[NASCET, OE_PROCEDURES], [ACAS], [OE_PROCEDURES], [CREST2]]),

  sourcedUnits({
    id: "block-cad-splits",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Asymptomatic stenosis of 70% or more", "Endarterectomy (ACAS; Fiser's repair threshold)", "Selective: CREST-2 showed a benefit from stenting but not endarterectomy over intensive medical therapy, and ESVS reserves intervention for patients with higher-risk features such as silent infarction, progression or intraplaque hemorrhage"],
      ["The asymptomatic threshold itself", "70%, often credited to ACAS", "ACAS showed benefit at 60% or more; 70% is the SVS intervention threshold — a classic trap"],
      ["Timing after a non-disabling ischemic stroke", "Wait 10 to 14 days (Fiser); older teaching waited 4 to 6 weeks", "After 48 hours and within 14 days of the event, once the patient is neurologically stable"],
      ["Timing after a hemorrhagic stroke", "Wait 6 to 8 weeks (Fiser)", "Delay is set by hemorrhage, infarct size, the deficit and consciousness rather than a fixed interval"],
      ["Life expectancy for asymptomatic intervention", "SCORE: over 2 years, against over 5 years for symptomatic patients", "SVS 2022: at least 3 to 5 years with perioperative stroke or death under 3%; ESVS 2023: over 5 years"],
      ["Share of ischemic strokes from carotid disease", "About 20% (SCORE)", "Roughly 10% in contemporary series"],
      ["Who gets a stent", "High-risk patients only (Fiser)", "Since October 2023 Medicare covers stenting at standard surgical risk, symptomatic 50% or asymptomatic 70%, after documented shared decision-making"],
    ],
  }, [[FISER, ACAS, CREST2, ESVS], [FISER, ACAS, OE_PROCEDURES], [FISER, ESVS, SVS, OE], [FISER, OE_PROCEDURES], [SCORE, SVS, ESVS, OE], [SCORE, OE], [FISER, CMS]]),

  sourcedUnits({
    id: "block-cad-carotid-body",
    type: "bullets",
    heading: "Carotid body tumor",
    items: [
      "A painless, pulsatile bifurcation mass that moves side to side but not up and down, arising from neural-crest chemoreceptor tissue.",
      "It splays the internal and external carotids — the lyre sign on angiography.",
      "Extremely vascular, and a minority secrete catecholamines.",
      "All are resected, with preoperative embolization for large or hypervascular tumors; the Shamblin classification (I to III) grades carotid encasement and operative difficulty.",
    ],
  }, [[OE, FISER], [OE], [FISER, OE], [FISER, OE]]),

  references("block-cad-references", [SCORE, OE, OE_PROCEDURES, FISER, ESVS, SVS, NASCET, ACAS, CREST2, CMS]),
];

export const carotidArteryDiseaseTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000004020",
  versionId: "00000000-0000-4000-8000-000000004021",
  slug: "carotid-artery-disease",
  title: "Carotid Artery Disease",
  aliases: ["carotid stenosis", "carotid artery stenosis", "internal carotid artery stenosis", "symptomatic carotid stenosis", "asymptomatic carotid stenosis", "extracranial carotid disease", "cerebrovascular disease", "amaurosis fugax", "Hollenhorst plaque", "carotid duplex", "carotid duplex criteria", "carotid near-occlusion", "NASCET method", "carotid bruit", "crescendo TIA", "carotid body tumor", "Shamblin classification", "lyre sign", "NASCET", "ACAS", "ACST", "CREST-2"],
  scoreNodeId: "arterial-conditions",
  scoreCategory: "SCORE · Arterial Disease · Diseases & Conditions",
  tags: ["arterial-disease", "vascular", "carotid", "stroke", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [OE, OE_PROCEDURES, FISER, ESVS, SVS, NASCET, ACAS, CREST2, CMS],
  blocks,
  reviewedAt: "2026-10-11T00:00:00.000Z",
});
