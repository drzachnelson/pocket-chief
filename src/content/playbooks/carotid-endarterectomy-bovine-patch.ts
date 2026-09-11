import { buildPlaybook, references, sourced, sourcedUnits } from "@/content/authoring";
import { CEA_BOVINE_PATCH_PLAYBOOK_SOURCE as SOURCE, SVS_CAROTID_2022_SOURCE as SVS } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-cea-summary",
    type: "summary",
    heading: "At a glance",
    text: "Carotid endarterectomy removes the bifurcation plaque and closes the artery with a **bovine pericardial patch**. Two things decide the result: selecting a patient whose stroke risk without surgery exceeds the operative risk, and dissecting on the arterial adventitia so the cranial nerves are never in the field.",
  }, SOURCE),

  sourcedUnits({
    id: "block-cea-selection",
    type: "bullets",
    heading: "Who to operate on",
    items: [
      "Symptomatic 70 to 99 per cent stenosis within six months of a transient ischaemic attack, amaurosis fugax or non-disabling stroke: recommended.",
      "Symptomatic 50 to 69 per cent: reasonable, provided perioperative stroke or death risk is under 6 per cent.",
      "Symptomatic under 50 per cent: not recommended.",
      "Asymptomatic 70 per cent or greater: reasonable in a selected patient with a life expectancy of three to five years and perioperative risk under 3 per cent.",
      "Complete internal carotid occlusion is not an indication — manage it medically.",
      "Best medical therapy applies to everyone regardless of the operative decision: antiplatelet, high-intensity statin, blood-pressure and glycaemic control, smoking cessation.",
    ],
  }, [[SOURCE], [SOURCE], [SOURCE], [SVS], [SOURCE], [SOURCE]]),

  sourcedUnits({
    id: "block-cea-timing",
    type: "bullets",
    heading: "Timing after a neurologic event",
    items: [
      "For a stable non-disabling stroke, revascularize once the patient is neurologically stable after 48 hours and within 14 days of symptom onset.",
      "Benefit is greatest inside two weeks; for severe stenosis it persists to roughly twelve weeks, while for moderate stenosis it is largely gone after fourteen days.",
      "Surgery inside 48 hours may carry higher procedural risk, and a haemorrhagic stroke should be allowed to stabilise first.",
      "With bilateral disease, operate the more stenotic or symptomatic side first and stage the other.",
      "Assess the vocal cords before a contralateral operation, so an occult recurrent or vagus injury is not compounded into bilateral palsy.",
    ],
  }, [[SVS], [SOURCE], [SOURCE], [SOURCE], [SVS]]),

  sourced({
    id: "block-cea-alternatives",
    type: "warning",
    heading: "When to choose stenting instead",
    tone: "mnemonic",
    text: "A hostile neck moves the decision away from open surgery: a high bifurcation, previous neck irradiation, previous radical neck dissection, a tracheostomy, or a redo field. Myocardial infarction is the leading non-stroke cause of perioperative death here, so optimise cardiac therapy first — about one patient in five has some cardiovascular instability around the operation.",
  }, SOURCE),

  sourced({
    id: "block-cea-anatomy",
    type: "bullets",
    heading: "Anatomy and landmarks",
    items: [
      "The anterior border of sternocleidomastoid is the incision landmark; the mastoid process and the sternoclavicular joint bound the exposure above and below.",
      "Confirm the height of the bifurcation on preoperative imaging against the mandibular angle — a high bifurcation predicts a difficult distal exposure.",
      "Within the carotid sheath the common carotid lies medial, the internal jugular vein lateral, and the vagus nerve classically posterolateral between them.",
      "- Verify where the vagus actually is before passing a loop or applying a clamp; a non-recurrent laryngeal nerve is a rare but real anomaly.",
      "The common facial vein crosses the bifurcation anteriorly into the jugular and is the gatekeeper — dividing it opens the plane.",
      "The internal carotid is posterolateral and has no cervical branches; the external is anteromedial and gives the superior thyroid artery first.",
      "The carotid bulb sits in the crotch of the bifurcation and carries the baroreceptor.",
      "The hypoglossal nerve crosses superficial to the internal and external carotids about 1 to 2 cm above the bifurcation, tethered by the ansa cervicalis.",
      "The marginal mandibular branch of the facial nerve runs deep to platysma just below the mandibular ramus.",
      "The glossopharyngeal nerve lies deep to the posterior belly of digastric and is only at risk during very high exposure.",
    ],
  }, SOURCE),

  sourced({
    id: "block-cea-borders",
    type: "bullets",
    heading: "↳ Safe dissection borders",
    items: [
      "Prep from the mastoid above to the manubrium below, with the mandibular angle anterosuperiorly and trapezius behind; prep a thigh if vein might be needed.",
      "Superficially, stay on the anterior border of sternocleidomastoid and leave the greater auricular and transverse cervical nerves intact.",
      "Deep, follow the anterior border of the jugular vein — it leads to the common facial vein and then straight into the sheath.",
      "Encircle the common carotid proximally in a relatively disease-free segment, which is the safest control point.",
      "Control the internal carotid at least 1 cm beyond the palpable distal plaque, on the vessel wall itself, before clamping.",
      "For a high bifurcation, mobilise sternocleidomastoid, divide the ansa cervicalis to lift the hypoglossal nerve, and divide the posterior belly of digastric; avoid deep unguided cautery near the glossopharyngeal nerve.",
    ],
  }, SOURCE),

  sourced({
    id: "block-cea-anaesthesia",
    type: "bullets",
    heading: "Anaesthesia, positioning and monitoring",
    items: [
      "Supine with the neck slightly extended, head turned away, and a shoulder roll on the operative side.",
      "General endotracheal and regional cervical plexus block are both acceptable — neither shows a stroke or death advantage.",
      "Under general anaesthesia, monitor with EEG with or without somatosensory evoked potentials, stump pressure, or near-infrared spectroscopy; combining EEG and evoked potentials raises sensitivity for clamp ischaemia.",
      "Under regional anaesthesia the awake neurologic examination is the monitor — contralateral grip and speech, continuously.",
      "No single monitoring or shunting strategy has been shown superior to the others.",
      "Keep mean arterial pressure at or above baseline, aiming roughly 20 per cent higher during the cross-clamp, to favour collateral perfusion.",
      "Antibiotics within 60 minutes of incision; sequential compression devices for venous thromboembolism prophylaxis.",
    ],
  }, SOURCE),

  sourced({
    id: "block-cea-flow",
    type: "flow",
    heading: "Clamp and shunt decision",
    nodes: [
      { id: "isolate", label: "Isolate common, internal and external carotid", tone: "default" },
      { id: "heparin", label: "Heparinise and wait", tone: "default" },
      { id: "clamp", label: "Clamp internal, then common, then external", tone: "default" },
      { id: "assess", label: "Tolerating the clamp?", tone: "default" },
      { id: "shunt", label: "Place a shunt, distal limb first", tone: "caution" },
      { id: "endarterectomy", label: "Arteriotomy and endarterectomy", tone: "default" },
      { id: "patch", label: "Bovine pericardial patch angioplasty", tone: "default" },
      { id: "flush", label: "Back-bleed, forward-bleed, flush", tone: "caution" },
      { id: "restore", label: "Unclamp external, then common, then internal", tone: "good" },
    ],
    edges: [
      { from: "isolate", to: "heparin" },
      { from: "heparin", to: "clamp" },
      { from: "clamp", to: "assess" },
      { from: "assess", to: "endarterectomy", label: "Yes" },
      { from: "assess", to: "shunt", label: "No" },
      { from: "shunt", to: "endarterectomy" },
      { from: "endarterectomy", to: "patch" },
      { from: "patch", to: "flush" },
      { from: "flush", to: "restore" },
    ],
  }, SOURCE),

  sourced({
    id: "block-cea-technique",
    type: "sequence",
    heading: "Step by step",
    steps: [
      { title: "Incision and platysma", detail: "Longitudinal incision along the anterior border of sternocleidomastoid from below the mandibular angle towards the sternoclavicular junction, or a transverse skin-crease incision. Divide platysma. Keep the upper end posterior to protect the marginal mandibular nerve and never curve anteriorly under the jaw." },
      { title: "Expose the sheath", detail: "Retract sternocleidomastoid laterally, preserve the greater auricular and transverse cervical nerves in the superficial plane, and develop the plane along the anterior border of the jugular vein." },
      { title: "Divide the common facial vein", detail: "Identify it crossing the bifurcation, double-ligate with 3-0 silk and divide. Take multiple tributaries individually and never mistake the jugular itself for a facial branch." },
      { title: "Isolate the vessels", detail: "Loop the common carotid proximally, the external distally, control the superior thyroid artery, and encircle the internal at least 1 cm beyond the plaque. Confirm the vagus before looping, divide the ansa cervicalis if the hypoglossal needs mobilising, and handle the bulb gently. For reflex bradycardia, infiltrate the crotch with 1 per cent lidocaine." },
      { title: "Heparinise and clamp", detail: "Give intravenous heparin, commonly 5,000 units or 75 to 100 units per kilogram. Clamp the internal carotid first, then the common, then the external — internal first minimises embolisation of debris loosened during the dissection." },
      { title: "Decide on a shunt", detail: "Shunt for a stump pressure below roughly 40 to 50 mmHg, a significant EEG or evoked-potential change, an awake deterioration, or a contralateral occlusion. Flush all air, insert the internal limb first, then the common, de-air, and confirm flow by Doppler. Secure with Silastic loops, never crushing silk ties, and do not over-inflate a balloon." },
      { title: "Arteriotomy and endarterectomy", detail: "Open the anterolateral common carotid proximal to the plaque with an 11 blade and extend across the bifurcation into the internal carotid beyond the plaque with Potts scissors. Develop the plane in the outer media, transect the plaque proximally, evert and core the external orifice, and feather the distal endpoint into adherent intima. Tack a mobile distal flap with interrupted double-armed 7-0 polypropylene tied on the adventitia, then irrigate and remove every loose strand of media." },
      { title: "Patch angioplasty", detail: "Cut the bovine pericardium to an ellipse matching the arteriotomy with a gentle taper at the internal carotid apex so it does not narrow. Anchor double-armed 6-0 polypropylene at each end and run both sides to the midpoint, passing outside-to-in on the patch and inside-to-out on the artery to appose the intima." },
      { title: "De-air before the last stitch", detail: "Back-bleed the internal carotid, forward-bleed the common, back-bleed the external, and flush the lumen with heparinised saline. If a shunt was used, remove it just before closing the final gap." },
      { title: "Restore flow and close", detail: "Unclamp the external first, then the common, then the internal about ten seconds later, so debris and air flush into the external circulation rather than the brain. Assess with continuous-wave Doppler or duplex to exclude a residual flap or stenosis, confirm haemostasis, consider a drain, and close platysma and skin." },
    ],
  }, SOURCE),

  sourcedUnits({
    id: "block-cea-patch-choice",
    type: "bullets",
    heading: "Why bovine pericardium",
    items: [
      "In a Vascular Quality Initiative analysis of 70,987 endarterectomies it was the most-used patch, with the lowest one-year restenosis and lower rates of postoperative neurologic events and return to theatre than polytetrafluoroethylene or primary closure.",
      "It reaches suture-line haemostasis faster than either polytetrafluoroethylene or Dacron, around three minutes against five, and has good ten-year durability in large series.",
      "Cochrane data note a signal towards more long-term occlusion or restenosis beyond one year against polytetrafluoroethylene in some trials, so duplex surveillance is still warranted.",
      "Patch angioplasty of any material beats primary closure, particularly in women and in a small internal carotid.",
    ],
  }, [[SOURCE], [SVS], [SOURCE], [SVS]]),

  sourced({
    id: "block-cea-nerves",
    type: "table",
    heading: "Cranial nerve protection",
    columns: ["Nerve", "Course", "Deficit if injured", "How to protect it"],
    rows: [
      ["Vagus and recurrent laryngeal", "Posterolateral in the carotid sheath", "Hoarseness, cord paralysis, weak cough", "Identify it before looping or clamping and dissect on the arterial wall"],
      ["Hypoglossal", "Superficial to the arteries, 1 to 2 cm above the bifurcation", "Tongue deviates to the injured side, dysarthria, dysphagia", "Divide the ansa cervicalis to mobilise it and retract gently"],
      ["Marginal mandibular", "Deep to platysma below the mandibular ramus", "Lower lip droop and an asymmetric smile", "Keep the incision posterior and inferior to the jaw, and avoid heavy superior traction"],
      ["Glossopharyngeal", "Deep to the posterior belly of digastric", "Severe dysphagia and loss of the gag reflex", "Dissect carefully up high and never cauterise blindly there"],
      ["Superior laryngeal", "Near the superior thyroid artery", "Voice fatigue and loss of high pitch", "Ligate the superior thyroid precisely on the vessel"],
      ["Greater auricular", "Over the surface of sternocleidomastoid", "Numb earlobe and jaw angle", "Leave it in the superficial plane"],
      ["Carotid sinus nerve", "Adventitia of the bifurcation crotch", "Reflex bradycardia and hypotension", "Infiltrate the crotch with 1 per cent lidocaine"],
    ],
  }, SOURCE),

  sourced({
    id: "block-cea-nerve-rates",
    type: "prose",
    heading: "↳ How often it happens",
    text: "Protocolised examination finds cranial nerve injury in roughly 5 to 11 per cent, but permanent deficit in under 1 per cent, and the hypoglossal and the vagus are the two most often affected. An operation lasting more than two hours, and re-exploration, both carry higher rates — which is the argument for a clean, unhurried dissection rather than a quick one.",
  }, SOURCE),

  sourced({
    id: "block-cea-complications",
    type: "bullets",
    heading: "Complications and what to do",
    items: [
      "A new deficit in recovery is thromboembolic from a technical defect until proven otherwise: return to theatre, re-open, evacuate clot, correct the defect and re-patch. Do not wait for outside imaging.",
      "An expanding neck haematoma threatens the airway. Open the incision at the bedside to decompress, secure the airway, then explore formally.",
      "Post-endarterectomy hypertension comes from baroreflex disruption and risks suture-line disruption, haematoma and hyperperfusion; control it with intravenous nicardipine, labetalol or nitroprusside.",
      "Post-endarterectomy hypotension is treated with fluid and a short-acting vasopressor to avoid watershed hypoperfusion.",
      "Cerebral hyperperfusion syndrome is rare at roughly 0.18 per cent but carries high mortality — severe ipsilateral headache, seizures, possible haemorrhage. Blood-pressure lability, recent ipsilateral stroke, contralateral severe stenosis and female sex all raise the risk.",
      "Beyond thirty days, restenosis, patch infection and pseudoaneurysm all warrant duplex surveillance and a workup for any pulsatile mass.",
    ],
  }, SOURCE),

  sourced({
    id: "block-cea-eversion",
    type: "prose",
    heading: "Alternative: eversion endarterectomy",
    text: "Eversion transects the internal carotid obliquely at the bulb, removes the plaque by everting the wall, and re-anastomoses directly — no prosthetic patch at all. Periprocedural stroke and death are comparable to conventional patch repair. It suits extensively diseased common or external carotid poorly, and is a worse fit for a very high lesion, a redo patch case, or a plan to shunt routinely.",
  }, SOURCE),

  references("block-cea-references", [SOURCE, SVS]),
];

export const carotidEndarterectomyBovinePatchPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000002",
  slug: "carotid-endarterectomy-bovine-patch",
  title: "Carotid Endarterectomy with Bovine Pericardial Patch",
  aliases: ["CEA", "Carotid endarterectomy", "Patch angioplasty", "Bovine pericardial patch"],
  procedureId: "carotid_endarterectomy_bovine_patch",
  approach: "open",
  specialty: "Vascular",
  tags: ["vascular", "carotid", "stroke prevention", "head and neck"],
  sourceId: SOURCE,
  additionalSourceIds: [SVS],
  blocks,
  reviewedAt: "2026-09-10T00:00:00.000Z",
});
