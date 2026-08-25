import { buildTopic, references, sourced } from "@/content/authoring";
import { VASCULAR_EXPOSURE_PRINCIPLES_PACKET_SOURCE as PACKET } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-vep-summary",
    type: "summary",
    heading: "At a glance",
    text: "Vascular exposure has one rule that outranks every other detail: get **proximal and distal control** of the target vessel before opening it or entering a contained hematoma. Proximal control stops inflow and exsanguination; distal control stops back-bleeding and, just as important, stops debris from embolizing distally into a 'trash foot.' Trauma teaching puts proximal control first because bleeding has to stop; elective atherosclerotic surgery often reverses the order, clamping the diseased outflow vessel first to keep plaque debris from embolizing forward — know both framings, because a question can ask for either one. Ischemic time matters too: warm limb ischemia becomes irreversible at roughly **6 hours**, though the dedicated acute limb ischemia literature narrows that to a **4-to-6-hour** window — either way, this is the clock that drives urgent shunting and revascularization.",
  }, PACKET),
  sourced({
    id: "block-vep-clamp-warning",
    type: "warning",
    heading: "Clamp only soft, disease-free wall",
    tone: "danger",
    text: "Clamping across heavily calcified plaque fractures the intima, dissects the vessel, or showers embolic debris downstream. Choose the clamp site by feel and by imaging, not by convenience, and accept a less convenient exposure over a clamp placed on hard plaque.",
  }, PACKET),
  sourced({
    id: "block-vep-checklist",
    type: "bullets",
    heading: "The vascular control checklist",
    items: [
      "Dissect **sharply along the vessel's long axis**, and spread instruments **perpendicular** to that axis so a tethered side branch is exposed rather than avulsed.",
      "Identify and isolate every branch before it is needed, encircling each with a vessel loop.",
      "Give **systemic heparin** and confirm timing with anesthesia — the classic target is an activated clotting time above **250 seconds**, at a dose of roughly **80 to 100 units per kilogram**.",
      "Establish **proximal and distal control before the arteriotomy** — this is the answer to nearly every 'next step in exposure' question.",
    ],
  }, PACKET),
  sourced({
    id: "block-vep-anatomy",
    type: "table",
    heading: "Essential operative vascular anatomy",
    columns: ["Segment", "Key branches and relationships", "Testable point"],
    rows: [
      ["Common carotid artery to its bifurcation", "The internal carotid artery has no branches in the neck; the external carotid artery's first branch is the superior thyroid artery", "That branching pattern is how the two are told apart intraoperatively"],
      ["Common femoral artery", "Gives off the profunda femoris posterolaterally and continues as the superficial femoral artery", "The profunda is the critical collateral inflow to the leg, and its branches arise medially and laterally — dissect strictly on the anterior surface"],
      ["Infrarenal aorta, proximal to distal", "The celiac trunk, then the superior mesenteric artery, then the paired renal arteries, then the inferior mesenteric artery", "Sacrificing the inferior mesenteric artery risks ischemic colitis; the marginal artery of Drummond and the arc of Riolan are the collaterals that can compensate"],
    ],
  }, PACKET),
  sourced({
    id: "block-vep-hostile",
    type: "table",
    heading: "Anatomy that argues for an alternative approach",
    columns: ["Territory", "Favors the alternative when", "Why"],
    rows: [
      ["Carotid bifurcation", "The lesion sits above C2, extends below the clavicle, or the neck has been irradiated, dissected for a radical neck dissection, has a tracheostomy, or is a reoperative field", "Open exposure becomes hazardous, favoring carotid stenting or transcarotid artery revascularization over open endarterectomy"],
      ["Infrarenal aorta", "A hostile abdomen, extensive adhesions, prior radiation, an inflammatory aneurysm, a horseshoe kidney, or the need for a suprarenal or juxtarenal clamp", "A left flank retroperitoneal approach avoids the hostile peritoneal field; a transperitoneal approach still gives faster, wider access and reaches the right renal and iliac vessels better"],
    ],
  }, PACKET),
  sourced({
    id: "block-vep-hostile-neck-evidence",
    type: "prose",
    heading: "↳ Board-classic vs. evidence: the 'hostile neck' rationale",
    text: "Registry data from the Vascular Study Group of New England — a large, real-world cohort of carotid endarterectomies — found that prior ipsilateral carotid endarterectomy and prior cervical radiation did not independently raise the risk of cranial nerve injury. The 'hostile neck' reasoning for favoring stenting or transcarotid revascularization over open surgery in those settings is real for other reasons, exposure difficulty chief among them, but its attribution to cranial nerve injury specifically is weaker than it is classically taught.",
  }, PACKET),
  sourced({
    id: "block-vep-cfa-exposure",
    type: "sequence",
    heading: "Common femoral artery: open exposure",
    steps: [
      { title: "Incision", detail: "A vertical incision over the palpable pulse, or over the midpoint between the anterior superior iliac spine and the pubic symphysis when the pulse is absent, using Doppler to mark the vessel." },
      { title: "Proximal and distal exposure", detail: "Expose the common femoral artery proximally to the inguinal ligament and distally past the superficial femoral and profunda femoris bifurcation." },
      { title: "Dissection plane", detail: "Dissect on the anterior surface only, since the branches arise medially and laterally, then encircle the common femoral, superficial femoral, and profunda femoris arteries individually." },
    ],
  }, PACKET),
  sourced({
    id: "block-vep-percutaneous",
    type: "bullets",
    heading: "Percutaneous common femoral access",
    items: [
      "Puncture over the **medial or central femoral head**, which provides a bony backstop for manual compression at the end of the case.",
      "A puncture **too high**, above the inguinal ligament in the external iliac artery, risks a **retroperitoneal hematoma**; a puncture **too low**, into the superficial femoral or profunda femoris artery, risks a **pseudoaneurysm** or an **arteriovenous fistula**.",
      "**Ultrasound-guided micropuncture**, using a 21-gauge needle and a 0.018-inch wire, reduces the number of attempts, venipuncture, and hematoma.",
    ],
  }, PACKET),
  sourced({
    id: "block-vep-carotid-exposure",
    type: "sequence",
    heading: "Carotid bifurcation exposure",
    steps: [
      { title: "Incision", detail: "Incise along the anterior border of the sternocleidomastoid muscle, then divide the platysma and open the carotid sheath." },
      { title: "Exposing the bifurcation", detail: "Ligate and divide the common facial vein to retract the internal jugular vein laterally and bring the bifurcation into view." },
      { title: "Handling the carotid bulb", detail: "Minimize manipulation of the carotid bulb to avoid embolization and reflex bradycardia; treat bradycardia by infiltrating 1% lidocaine into the carotid sinus." },
    ],
  }, PACKET),
  sourced({
    id: "block-vep-cranial-nerves",
    type: "table",
    heading: "Cranial nerves at risk in carotid exposure",
    columns: ["Nerve", "Injury deficit", "Exposure pitfall"],
    rows: [
      ["Vagus (cranial nerve X)", "Vocal cord paralysis and hoarseness", "Runs posterolateral within the carotid sheath — avoid clamping it together with the common carotid artery"],
      ["Hypoglossal (cranial nerve XII)", "Ipsilateral tongue deviation and dysarthria", "Crosses the internal and external carotid arteries distally; divide the ansa cervicalis for superior mobilization"],
      ["Marginal mandibular branch of the facial nerve", "Ipsilateral lower-lip droop", "Injured by submandibular retraction near the angle of the jaw"],
      ["Spinal accessory (cranial nerve XI)", "Shoulder droop and trapezius weakness", "Injured by aggressive superolateral retraction of the sternocleidomastoid"],
      ["External branch of the superior laryngeal nerve", "Voice fatigue and loss of high pitch", "Runs near the superior thyroid artery"],
    ],
  }, PACKET),
  sourced({
    id: "block-vep-nerve-evidence",
    type: "prose",
    heading: "↳ Board answer versus current practice: which cranial nerve is hurt most often",
    text: "Classic teaching names the hypoglossal nerve as the most commonly injured cranial nerve in carotid exposure, and the Society for Vascular Surgery guideline lists it first. The largest meta-analysis assembled on the question, pooling 20,860 carotid endarterectomies, instead found the **vagus nerve** injured most often, at **3.99 percent**, against **3.79 percent** for the hypoglossal. Know both answers, and keep in view that more than 99 percent of these injuries are transient regardless of which nerve is hurt.",
  }, PACKET),
  sourced({
    id: "block-vep-adjuncts",
    type: "bullets",
    heading: "Adjuncts that mitigate distal ischemia during clamping",
    items: [
      "Monitor for cerebral ischemia during carotid cross-clamping with **EEG, somatosensory evoked potentials, cerebral oximetry, stump pressure, transcranial Doppler, or an awake neurologic exam**; if ischemia appears, place a **temporary intraluminal shunt** — a Pruitt-Inahara or Javid shunt — from the common to the internal carotid artery.",
      "In trauma and damage-control surgery, a **temporary intraluminal shunt** restores perfusion to a limb while definitive repair is deferred.",
      "Thoracoabdominal aortic repair adds **left heart (atrial-femoral) bypass**, cold visceral and renal perfusion, and **cerebrospinal fluid drainage** to prevent paraplegia, since spinal cord perfusion pressure equals mean arterial pressure minus cerebrospinal fluid pressure.",
    ],
  }, PACKET),
  sourced({
    id: "block-vep-complications",
    type: "table",
    heading: "Complications by exposure",
    columns: ["Complication", "Exposure setting", "Management"],
    rows: [
      ["Perioperative stroke", "Carotid", "Immediate re-exploration or angiographic thrombectomy"],
      ["Cerebral hyperperfusion syndrome", "Carotid — presents as headache, seizure, or intracranial hemorrhage", "Strict blood pressure control"],
      ["Expanding neck hematoma", "Carotid", "An airway emergency — open the wound at the bedside"],
      ["Ischemic colitis", "Open aortic — from inferior mesenteric or hypogastric compromise", "Watch for early bloody diarrhea"],
      ["Acute kidney injury after aortic repair", "Open aortic", "Usually follows a suprarenal clamp"],
      ["Groin hematoma, lymphocele, or wound infection", "Open femoral", "Local wound care, with drainage or exploration as needed"],
      ["Hematoma or pseudoaneurysm", "Percutaneous femoral", "Compression, or thrombin injection for a pseudoaneurysm"],
      ["Arteriovenous fistula", "Percutaneous femoral", "From a through-and-through puncture"],
      ["Retroperitoneal hematoma", "Percutaneous femoral — a high stick, above the inguinal ligament", "Presents as occult shock with no external swelling"],
    ],
  }, PACKET),
  sourced({
    id: "block-vep-crest",
    type: "bullets",
    heading: "CREST: carotid stenting versus endarterectomy",
    items: [
      "The composite primary endpoint — periprocedural stroke, myocardial infarction, or death, plus ipsilateral stroke to 4 years — showed **no significant difference**: **7.2 percent** with stenting against **6.8 percent** with endarterectomy.",
      "Periprocedural stroke was **higher with stenting** (4.1 versus 2.3 percent), and periprocedural myocardial infarction was **higher with endarterectomy** (2.3 versus 1.1 percent).",
      "An **age interaction** emerged: stenting performed better under about **70 years**, and endarterectomy performed better beyond it.",
      "Ten-year follow-up data showed **no significant difference** in the primary endpoint or in postprocedural ipsilateral stroke.",
    ],
  }, PACKET),
  sourced({
    id: "block-vep-evar-table",
    type: "table",
    heading: "EVAR versus open repair for abdominal aortic aneurysm",
    columns: ["Dimension", "Endovascular repair", "Open repair"],
    rows: [
      ["Thirty-day mortality", "Lower — roughly 0.5 to 1.7 percent", "Higher — roughly 3.0 to 4.7 percent"],
      ["Length of stay", "Shorter, around 2 days", "Longer, around 7 days"],
      ["Survival curves", "Converge with open repair by 2 to 3 years, per EVAR-1, DREAM, and OVER", "Converge with endovascular repair over that same interval"],
      ["Surveillance burden", "Lifelong, with higher reintervention, endoleak, and late rupture risk", "Comparatively light after the early postoperative period"],
    ],
  }, PACKET),
  sourced({
    id: "block-vep-evar-evidence",
    type: "prose",
    heading: "↳ Board answer versus current practice: EVAR's long-term durability",
    text: "Boards teach that EVAR and open repair carry equivalent long-term survival, and randomized evidence through several years supports that. A 2025 reconstructed individual-patient-data meta-analysis of more than 26,000 patients complicates that teaching: open repair showed a late survival advantage emerging after about **11 months**, and better freedom from reintervention out to **168 months**, while EVAR's advantage was confined to roughly its first **11 months**. The 2022 ACC/AHA guideline makes the same point in softer language, noting that EVAR's early benefit dissipates over time against a higher risk of late rupture.",
  }, PACKET),
  sourced({
    id: "block-vep-surveillance",
    type: "bullets",
    heading: "Post-repair surveillance",
    items: [
      "After **EVAR**, obtain a baseline CT at **1 month**; if there is no endoleak or sac growth, continue with **annual duplex ultrasound** and cross-sectional CT or MRI every **5 years** — the historic 6-month scan can be dropped once the 1-month study is normal.",
      "After **open repair**, obtain CT or MRI within the first year, then every **5 years**, watching for a para-anastomotic or new aneurysm.",
      "**VQI quality metrics** to know: a first- or second-generation cephalosporin within **60 minutes** of incision, and a target length of stay around **postoperative day 2** for EVAR or endarterectomy and around **postoperative day 7** for open aneurysm repair.",
    ],
  }, PACKET),
  sourced({
    id: "block-vep-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "**Proximal and distal control before arteriotomy** is the answer to nearly every 'next step in exposure' question on this topic.",
      "The **internal carotid artery has no branches in the neck**; the external carotid artery's first branch, the **superior thyroid artery**, is how the two are told apart intraoperatively.",
      "A percutaneous common femoral stick goes **over the femoral head** — too high risks a retroperitoneal bleed that can present as occult shock, too low risks a pseudoaneurysm or arteriovenous fistula.",
      "If a neurologic change appears on carotid clamping, the answer is a **temporary intraluminal shunt** — a Pruitt-Inahara or Javid shunt.",
      "**Cerebrospinal fluid drainage** prevents paraplegia in thoracoabdominal aortic repair because spinal cord perfusion pressure equals mean arterial pressure minus cerebrospinal fluid pressure.",
    ],
  }, PACKET),
  references("block-vep-references", [PACKET]),
];

export const vascularExposurePrinciplesTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000001411",
  versionId: "00000000-0000-4000-8000-000000001421",
  slug: "vascular-exposure-principles",
  title: "Vascular Exposure Principles",
  aliases: ["vascular exposure", "proximal and distal control", "vessel exposure", "CFA exposure", "carotid exposure", "carotid cranial nerve injury", "CREST trial", "EVAR vs open repair", "temporary intraluminal shunt", "Pruitt-Inahara shunt", "percutaneous femoral access", "VQI"],
  scoreNodeId: "vascular-access-procedures",
  scoreCategory: "SCORE · Vascular Access · Operations & Procedures",
  tags: ["vascular-access", "vascular", "operative-technique", "exposure", "absite", "score"],
  sourceId: PACKET,
  reviewedAt: "2026-08-25T00:00:00.000Z",
  blocks,
});
