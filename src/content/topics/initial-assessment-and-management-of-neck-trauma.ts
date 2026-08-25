import { buildTopic, references, sourced } from "@/content/authoring";
import { TRAUMA_NECK_PACKET_SOURCE as PACKET } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-neck-assess-summary",
    type: "summary",
    heading: "At a glance",
    text: "Penetrating neck trauma is triaged first by the physical exam, not by which anatomic zone is hit. **Hard signs** — active or pulsatile bleeding, an expanding hematoma, an absent pulse, a bruit or thrill, an evolving stroke, shock, air bubbling from the wound, massive hemoptysis or hematemesis, stridor, or progressive subcutaneous emphysema — go straight to the operating room or to airway control, with no imaging first. Everything short of that gets a multidetector CT angiogram, the so-called **\"no-zone\" approach**, because CTA now reliably answers the workup question that used to require mandatory operative exploration of Zone II. Blunt trauma carries its own hidden threat: **blunt cerebrovascular injury (BCVI)** of the carotid or vertebral artery, which is silent at presentation in most patients and is caught only by screening high-risk mechanisms and cervical spine or skull-base fracture patterns with CTA. This topic covers the zone anatomy that still frames exposure planning, the hard-versus-soft-sign triage, the vascular and aerodigestive workup, and BCVI screening, grading, and treatment.",
  }, PACKET),
  sourced({
    id: "block-neck-assess-zones-table",
    type: "table",
    heading: "Zones of the neck",
    columns: ["Zone", "Boundaries", "Key structures", "Exposure"],
    rows: [
      ["Zone I", "Clavicle/sternal notch to the **cricoid**", "Great vessels, subclavian and vertebral arteries, aortic arch branches, trachea, esophagus, thoracic duct, lung apices", "Median sternotomy with or without a supraclavicular extension or claviculectomy; a \"trap-door\" incision for the proximal left subclavian"],
      ["Zone II", "**Cricoid to the angle of the mandible**", "Carotid bifurcation, internal jugular vein, vertebral artery, larynx, trachea, pharynx, esophagus, vagus and recurrent laryngeal nerves", "Anterior sternocleidomastoid incision; a collar incision for bilateral or tracheal injury"],
      ["Zone III", "Angle of the mandible to the **skull base**", "Distal internal carotid artery, vertebral artery, pharynx, cranial nerves IX through XII", "High sternocleidomastoid incision with digastric division, **mandibular subluxation or osteotomy**, and styloidectomy"],
    ],
  }, PACKET),
  sourced({
    id: "block-neck-assess-triangles",
    type: "bullets",
    heading: "Anterior and posterior triangle contents",
    items: [
      "The **anterior triangle** contains the carotid sheath (common, internal, and external carotid arteries, internal jugular vein, vagus nerve), the larynx, trachea, esophagus, and thyroid.",
      "The **posterior triangle** contains the spinal accessory nerve (cranial nerve XI), the brachial plexus, the external jugular vein, and the subclavian vessels.",
    ],
  }, PACKET),
  sourced({
    id: "block-neck-assess-signs",
    type: "bullets",
    heading: "Hard signs and soft signs",
    items: [
      "Hard signs — active pulsatile bleeding, an expanding or pulsatile hematoma, an absent carotid pulse, a bruit or thrill, an evolving stroke, shock, air bubbling from the wound (a \"sucking wound\"), massive hemoptysis or hematemesis, stridor or airway compromise, or extensive or progressive subcutaneous emphysema — mean immediate operating room or airway control.",
      "Soft signs — a nonexpanding stable hematoma, minor hemoptysis, mild hematemesis, dysphonia, dysphagia or odynophagia, minor subcutaneous air, proximity to vital structures, or a non-progressive focal neurologic deficit — mean CTA and selective workup.",
    ],
  }, PACKET),
  sourced({
    id: "block-neck-assess-triage-flow",
    type: "flow",
    heading: "Hard-sign versus soft-sign triage",
    nodes: [
      { id: "present", label: "Neck injury with possible vascular or aerodigestive involvement" },
      { id: "hard", label: "Hard sign present", tone: "caution" },
      { id: "soft", label: "No hard sign (soft sign or asymptomatic)" },
      { id: "or", label: "Immediate operating room or urgent airway control, no imaging first", tone: "caution" },
      { id: "cta", label: "Multidetector CT angiography, all zones (the \"no-zone\" approach)" },
      { id: "pos", label: "CTA positive for vascular or aerodigestive injury", tone: "caution" },
      { id: "neg", label: "CTA negative", tone: "good" },
      { id: "selective", label: "Selective operative, endovascular, or endoscopic management", tone: "caution" },
      { id: "observation", label: "Observation with serial exams", tone: "good" },
    ],
    edges: [
      { from: "present", to: "hard", label: "hard sign" },
      { from: "present", to: "soft", label: "no hard sign" },
      { from: "hard", to: "or" },
      { from: "soft", to: "cta" },
      { from: "cta", to: "pos", label: "positive" },
      { from: "cta", to: "neg", label: "negative" },
      { from: "pos", to: "selective" },
      { from: "neg", to: "observation" },
    ],
  }, PACKET),
  sourced({
    id: "block-neck-assess-airway",
    type: "bullets",
    heading: "Airway principles",
    items: [
      "Secure a definitive airway early when there is an expanding hematoma, massive subcutaneous emphysema, or a laryngeal fracture — airway distortion progresses rapidly.",
      "With suspected laryngotracheal disruption, confirm the ability to bag-mask ventilate before giving a paralytic; neuromuscular blockade can precipitate complete airway collapse. Fiberoptic bronchoscopy in the operating room both diagnoses the injury and secures an airway distal to it.",
      "Perform cricothyroidotomy when oral intubation fails, then convert to a formal tracheostomy in the operating room to avoid subglottic stenosis.",
      "Avoid nasotracheal intubation when a basilar skull fracture is suspected.",
    ],
  }, PACKET),
  sourced({
    id: "block-neck-assess-no-probe-warning",
    type: "warning",
    tone: "danger",
    heading: "Do not probe or clamp in the trauma bay",
    text: "Blind wound probing or clamping is **contraindicated in the trauma bay** — either one risks dislodging a tamponading clot and turning a stable airway or hemorrhage into an unstable one.",
  }, PACKET),
  sourced({
    id: "block-neck-assess-workup",
    type: "bullets",
    heading: "Diagnosis and workup",
    items: [
      "In a hemodynamically stable patient with no hard signs, **multidetector CT angiography (MDCTA) is first-line for all zones** — the \"no-zone\" approach. CTA sensitivity for vascular injury is **83 to 100 percent** with a negative predictive value of **90 to 100 percent**, and combined with the exam it reliably spares negative explorations. For Zone I, extend the field of view through the thoracic inlet and mediastinum.",
      "Reserve catheter angiography (digital subtraction angiography) for an equivocal CTA with high clinical suspicion, or when endovascular therapy is planned; routine confirmatory DSA does not change management and adds complications.",
    ],
  }, PACKET),
  sourced({
    id: "block-neck-assess-zone2-classic-current",
    type: "prose",
    heading: "Board answer versus current practice: zone-based exploration",
    text: "Board-classic teaching holds that all Zone II injuries require **mandatory operative exploration**, with angiography reserved for Zones I and III. The current standard is **no-zone, selective management**: physical exam plus CTA drives the decision regardless of which zone is injured. This shift away from mandatory exploration avoids the historical **roughly 45 percent negative-exploration rate**. Know the classic answer for boards, but expect current practice to be selective.",
  }, PACKET),
  sourced({
    id: "block-neck-assess-aerodigestive",
    type: "bullets",
    heading: "Aerodigestive workup",
    items: [
      "CTA has lower sensitivity for aerodigestive injury than for vascular injury, so a negative CTA does not clear the esophagus or airway.",
      "For the esophagus: CT esophagography sensitivity and specificity approach **100 percent** in recent data; classic teaching combines esophagography with esophagoscopy for a combined sensitivity of roughly **100 percent**. Give water-soluble contrast first to avoid barium-induced mediastinitis, then thin barium if the study is equivocal. Esophagogastroduodenoscopy outperforms fluoroscopic esophagography for esophageal injury.",
      "For the airway: obtain flexible or rigid bronchoscopy for unexplained mediastinal air, a persistent pneumothorax, a large air leak, or hemoptysis.",
    ],
  }, PACKET),
  sourced({
    id: "block-neck-assess-bcvi-overview",
    type: "bullets",
    heading: "Blunt cerebrovascular injury: incidence and risk",
    items: [
      "BCVI occurs in **1 to 3 percent** of blunt trauma overall, rising to **2.7 to 7.6 percent** among patients screened with CTA. Untreated, carotid injury carries mortality up to **38 percent** and vertebral injury up to **18 percent**.",
      "A cervical spine fracture is the single most predictive factor for BCVI, with the greatest risk to the vertebral artery; subluxation is the highest-risk cervical spine injury pattern.",
    ],
  }, PACKET),
  sourced({
    id: "block-neck-assess-bcvi-screening",
    type: "bullets",
    heading: "BCVI screening criteria (Denver / Expanded Denver / Memphis)",
    items: [
      "High-energy mechanism of injury (hyperextension, flexion, or rotation).",
      "Cervical spine fracture, especially C1 through C3, a fracture through the transverse foramen, or subluxation.",
      "Le Fort II or III facial fracture.",
      "Basilar skull fracture involving the carotid canal or petrous bone.",
      "Diffuse axonal injury with a Glasgow Coma Scale score below **6**.",
      "Near-hanging mechanism with anoxic injury.",
      "A cervical bruit or thrill in a patient **under 50 years** of age, where a bruit is far more likely to mean injury than atherosclerosis.",
      "Expanding cervical hematoma.",
      "Arterial epistaxis.",
      "A focal neurologic deficit unexplained by CT of the head.",
      "Horner syndrome.",
      "Even with strict Denver or Memphis criteria applied, **20 to 30 percent of BCVIs are missed**; many centers now use liberalized or universal CTA screening in blunt trauma, and CTA is the recommended screening modality.",
    ],
  }, PACKET),
  sourced({
    id: "block-neck-assess-biffl-table",
    type: "table",
    heading: "Biffl / Denver grading and management",
    columns: ["Grade", "Finding", "Management"],
    rows: [
      ["I", "Intimal irregularity, **less than 25 percent** narrowing", "Antithrombotic therapy (aspirin preferred)"],
      ["II", "Dissection or hematoma with **more than 25 percent** narrowing, or intraluminal thrombus", "Antithrombotic therapy; **EAST recommends against routine stenting**"],
      ["III", "Pseudoaneurysm", "Antithrombotic therapy, with stenting if enlarging or symptomatic"],
      ["IV", "Complete occlusion", "Antithrombotic therapy; **no revascularization if stroke is already completed**"],
      ["V", "Transection with active extravasation", "Emergent surgery or endovascular therapy (covered stent or embolization)"],
    ],
  }, PACKET),
  sourced({
    id: "block-neck-assess-bcvi-agent-classic-current",
    type: "prose",
    heading: "Board answer versus current practice: the antithrombotic agent",
    text: "Classic teaching favors a **heparin infusion** (goal PTT 40 to 50 seconds, no bolus) as first-line BCVI treatment. Current evidence favors **antiplatelet therapy (aspirin)** instead, which carries both a lower stroke rate and a lower bleeding rate than anticoagulation in meta-analysis. The practical takeaway either way: any antithrombotic beats none.",
  }, PACKET),
  sourced({
    id: "block-neck-assess-bcvi-timing",
    type: "bullets",
    heading: "BCVI treatment: timing and duration",
    items: [
      "Initiate antithrombotic therapy as soon as traumatic brain injury or hemorrhage is stable, ideally within **24 hours**.",
      "Treat for **3 to 6 months**, with follow-up CTA at roughly **7 days** to catch early progression and at roughly **3 months** to confirm healing.",
    ],
  }, PACKET),
  sourced({
    id: "block-neck-assess-pearls",
    type: "bullets",
    heading: "Board pearls: zones, no-zone, BCVI, and esophageal workup",
    items: [
      "**Zone II** is the most common site of neck injury (roughly **47 percent**) and the most surgically accessible.",
      "No-zone, CTA-based selective management is the current standard — mandatory Zone II exploration is outdated board teaching.",
      "Aspirin is now preferred over heparin for BCVI (lower stroke and lower bleeding rates); classic teaching still cites heparin with a PTT goal of 40 to 50 seconds.",
      "A cervical spine fracture is the strongest BCVI predictor, subluxation is the highest-risk pattern, and Denver/Memphis criteria still miss 20 to 30 percent of injuries.",
      "Air bubbling from a neck wound or an evolving stroke is a hard sign — go to the operating room, do not stop for imaging.",
      "For esophageal workup, give water-soluble contrast first, then barium; CT esophagography is emerging as a single high-sensitivity test.",
    ],
  }, PACKET),
  references("block-neck-assess-references", [PACKET]),
];

export const neckTraumaAssessmentTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000001217",
  versionId: "00000000-0000-4000-8000-000000001227",
  slug: "initial-assessment-and-management-of-neck-trauma",
  title: "Initial Assessment and Management of Neck Trauma",
  aliases: ["neck trauma", "penetrating neck injury", "penetrating neck trauma", "cervical trauma", "neck zones", "Zone I", "Zone II", "Zone III", "no-zone", "no-zone approach", "hard signs", "soft signs", "BCVI", "blunt cerebrovascular injury", "Biffl grade", "Biffl scale", "Denver criteria", "Expanded Denver criteria", "Memphis criteria", "carotid dissection", "vertebral artery injury", "CTA neck", "CT angiography", "esophagography", "laryngotracheal injury", "subcutaneous emphysema"],
  scoreNodeId: "trauma-conditions",
  scoreCategory: "SCORE · Trauma · Diseases & Conditions",
  tags: ["trauma", "neck", "vascular", "bcvi", "diagnostics", "absite", "score"],
  sourceId: PACKET,
  blocks,
  reviewedAt: "2026-08-19T00:00:00.000Z",
});
