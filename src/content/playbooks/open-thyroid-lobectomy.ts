import { buildPlaybook, references, sourced } from "@/content/authoring";
import {
  OPEN_THYROID_LOBECTOMY_PLAYBOOK_SOURCE as SOURCE,
  SCORE_THYROIDECTOMY_SOURCE as SCORE,
  ATA_THYROID_2025_SOURCE as ATA,
  FISER_THYROID_SOURCE as FISER,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const sourceIds = [SOURCE, SCORE, ATA, FISER];
const blocks: TopicBlock[] = [
  sourced({ id: "block-otl-summary", type: "summary", heading: "At a glance", text: "Adult conventional transcervical lobectomy with isthmusectomy: expose the recurrent laryngeal nerve (RLN), preserve all its branches and the parathyroid vascular pedicles, then release Berry under direct vision without sustained medial-rotation traction. Consent for the possibility of later completion before the first operation. Disease selection and oncologic follow-up belong with the thyroid nodule, thyroid cancer and hyperthyroidism topics." }, SOURCE),
  sourced({ id: "block-otl-danger", type: "warning", heading: "Berry is a visibility and traction problem", tone: "danger", text: "Bleeding beside the distal RLN is not an invitation to clamp or cauterize blindly. Release traction, apply pressure, restore exposure and control individual vessels with the nerve visible. A satisfactory monitor response supplements visual identification; it does not make unseen tissue safe to divide." }, SOURCE),
  sourced({ id: "block-otl-selection", type: "bullets", heading: "Choose the operation and consent", items: [
    "Lobectomy may diagnose an indeterminate unilateral nodule, treat appropriately selected unilateral cancer, relieve unilateral benign compression, or treat a solitary toxic adenoma after thyroid-function optimization. Graves disease and bilateral toxic or compressive disease generally need a bilateral operation instead.",
    "Discuss voice change, aspiration, bleeding with airway compromise, scar, later hypothyroidism, possible conversion and possible completion after final pathology. Total thyroidectomy adds bilateral nerve and parathyroid risk; later completion makes preservation during the first operation consequential.",
    "A first unilateral operation usually preserves calcium regulation through the opposite glands. Do not promise zero observed hypocalcemia, especially with prior contralateral or parathyroid surgery. Thyroid replacement may still be required after lobectomy; thyroiditis, antibodies and a higher baseline TSH increase that risk.",
    "Selected low-risk microcarcinoma can be observed, and selected benign nodules can undergo ablation. Establish that surgery serves the patient's disease and preferences before choosing an incision. Remote-access operations have different selection, equipment and exposure requirements and are outside this open technique.",
  ] }, SOURCE),
  sourced({ id: "block-otl-cancer-extent", type: "prose", heading: "Cancer extent: agree on the next decision", text: "ATA 2025 supports lobectomy when surgery is chosen for unilateral low-risk differentiated cancer ≤2 cm, without gross extrathyroidal extension or clinical metastases, unless another indication favors bilateral surgery. Lobectomy may also be preferred for selected >2–4 cm tumors. Larger, invasive or clinically metastatic disease generally calls for total thyroidectomy. Reassess final pathology and nerve function before completion; a preoperative conversion discussion does not justify contralateral surgery after first-side nerve dysfunction." }, ATA),
  sourced({ id: "block-otl-workup", type: "bullets", heading: "Preoperative checks", items: [
    "Review cytology, laterality, symptoms and thyroid ultrasound. In malignancy assess central and lateral nodal basins. Add contrast CT/MRI when bulky nodes, suspected aerodigestive invasion or substernal disease exceeds ultrasound's field; anticipate the airway implications of compression.",
    "Check TSH and additional thyroid-function tests as indicated. Treat uncontrolled hyperthyroidism and significant hypothyroidism before elective surgery. Screen calcium and/or PTH for coexisting hyperparathyroidism; obtain prior operation/pathology reports when the neck has been operated on.",
    "Document baseline voice. Obtain laryngeal examination with voice abnormality, prior neck/upper-chest nerve-risk surgery, or invasive/bulky disease; confirm operated-side cord function before completion. A normal speaking voice does not prove normal cord motion.",
    "Plan antithrombotic interruption with the prescribing team using the indication, agent, renal function and bleeding risk. The supplied guide's fixed interruption intervals are institutional examples, not universal orders.",
  ] }, SOURCE),
  sourced({ id: "block-otl-setup", type: "bullets", heading: "Setup and monitoring", items: [
    "Mark a transverse neck crease before extension. Use general endotracheal anesthesia, a supported head and gentle extension with a shoulder roll as tolerated; keep both sides accessible. Prep chin to upper chest and beyond both sternocleidomastoids. Avoid hyperextension in cervical spine disease.",
    "If monitoring, position the EMG tube correctly and coordinate neuromuscular blockade. Establish pre-dissection vagal and RLN baselines, then obtain post-resection RLN/vagal responses. The supplied sequence is L1 → V1 → R1 → resection → R2 → V2 → L2, with pre/post laryngeal examination. Use the local equipment protocol; an amplitude warning alone is not confirmed loss of signal.",
    "Routine clean thyroid surgery generally does not require antibiotic prophylaxis. Use mechanical VTE prevention and individualize pharmacologic prophylaxis. Plan analgesia, antiemesis and smooth emergence to limit retching, coughing and hypertension; no single blood-pressure target fits every patient.",
    "Incision length, early isthmus division, upper strap division, clips versus ties versus sealer, Valsalva testing and suture materials are exposure or surgeon preferences. They do not replace nerve identification, capsular dissection and hemostasis.",
  ] }, SOURCE),
  sourced({ id: "block-otl-anatomy", type: "table", heading: "Protective anatomy", columns: ["Structure", "Landmark", "Protection / failure mode"], rows: [
    ["RLN and distal branches", "Right loops under the subclavian artery; left under the aortic arch. The groove, inferior thyroid artery and Zuckerkandl tubercle orient the search, but none guarantees position.", "Trace to laryngeal entry behind the cricothyroid joint; preserve every branch. Use cold dissection immediately beside nerve and minimize traction/thermal spread. Unilateral injury causes voice/swallow dysfunction; bilateral injury threatens the airway."],
    ["Berry and Zuckerkandl", "Berry attaches thyroid to cricoid/upper trachea; the tubercle can cover or displace the nerve.", "Identify nerve to entry before releasing ligament. Small controlled divisions with relaxed traction prevent a stretched nerve from being pulled into a clamp or energy device."],
    ["Nonrecurrent nerve", "Usually a right-sided transverse vagus-to-larynx course associated with an aberrant subclavian artery.", "Review cross-sectional vascular anatomy when available; investigate an absent expected nerve or unusual monitoring pattern. Treat transverse bands as possible nerve rather than dividing them on appearance."],
    ["EBSLN", "Near superior thyroid vessels in the sternothyroid–inferior-constrictor/cricothyroid space; a low Cernea type 2 crossing is vulnerable.", "Identify or stimulate when feasible, and divide individual vessels close to capsule. It supplies cricothyroid: injury impairs pitch, projection and vocal endurance."],
    ["Parathyroids and inferior thyroid artery", "Superior gland: fourth pouch, usually posterior/dorsal to RLN. Inferior: third pouch with thymus, usually ventral near lower pole/thyrothymic ligament.", "Sweep glands from capsule on their terminal vascular pedicles; divide thyroid branches medial to glands rather than the artery trunk. Preserve perfusion for any future completion operation."],
    ["Middle vein / carotid sheath", "Short middle thyroid vein enters IJV; carotid, jugular and vagus form the lateral boundary.", "Control the vein before forceful rotation. Retract sheath gently; avoid avulsion and energy against its contents."],
    ["Trachea and esophagus", "Pretracheal plane medially; esophagus posteromedial, particularly exposed on the left.", "Stay capsular and avoid thermal application to airway/esophagus. Suspected injury requires recognition and repair, not blind reinforcement with cautery."],
  ] }, SOURCE),
  sourced({ id: "block-otl-borders", type: "prose", heading: "Dissection borders", text: "Anteriorly, enter the midline raphe and sternothyroid–capsule plane, preserving anterior jugular veins. Superiorly, develop the medial avascular cricothyroid space and remain low on capsular vessels. Laterally, use the areolar plane medial to the carotid sheath. Posteriorly, remain capsular and avoid unseen groove fat, nerve branches and parathyroid pedicles. Inferiorly, respect the thyrothymic ligament and thoracic inlet; do not chase a deep vessel toward the innominate vessels without exposure." }, SOURCE),
  sourced({ id: "block-otl-technique", type: "sequence", heading: "Exposure to specimen", steps: [
    { title: "Incision and flaps", detail: "Open the marked transverse crease, divide platysma and raise subplatysmal flaps toward thyroid cartilage and sternal notch/clavicular heads. Stay superficial to anterior jugular veins; an excessively superficial flap risks skin injury and a deep flap causes venous bleeding." },
    { title: "Open straps and expose midline", detail: "Split the avascular median raphe and sweep sternothyroid off the capsule. Identify trachea below the isthmus and cricoid/cricothyroid above it. Extend exposure rather than applying force to a large lobe; superior strap division or early isthmus division are selected exposure options." },
    { title: "Baseline and lateral mobilization", detail: "If monitored, obtain the vagal baseline before dissection. Gently retract lobe medially and sheath laterally. Control short middle thyroid veins near gland under vision before stronger rotation; avoid avulsion from the jugular." },
    { title: "Superior pole", detail: "Use inferolateral traction and open the medial cricothyroid space. Protect the EBSLN and cricothyroid, then divide skeletonized upper-pole vessels individually against capsule. Avoid a high mass ligature and preserve the posterior superior parathyroid/pedicle." },
    { title: "Find the RLN before deep inferior work", detail: "Identify the nerve using an appropriate lateral, inferior or superior approach. Follow it toward the constant laryngeal entry and identify all branches; a tubercle or artery crossing is a clue, not proof. Keep rotation gentle, dissection parallel to nerve and energy away from its surface." },
    { title: "Inferior pole and parathyroids", detail: "Recognize the inferior gland and preserve it on its pedicle. Control capsular lower-pole veins and thyroid arterial branches, preserving the inferior thyroid artery trunk and terminal gland vessels. No unseen posterior/deep vessel division before the nerve is identified." },
    { title: "Release Berry", detail: "Relax traction with the nerve visible to entry; divide small ligament/vessel bundles precisely. Pressure and restored exposure precede treatment of bleeding. In severe inflammatory adherence, the supplied operative guide describes a small secured remnant at nerve entry as a selected safety compromise; judge oncologic adequacy separately." },
    { title: "Lobe and isthmus", detail: "Lift the specimen from the trachea in the pretracheal plane, divide the isthmus at the contralateral junction and secure its edge. Address identified pyramidal tissue as appropriate to planned extent; orient the specimen and avoid unnecessary contralateral dissection or tracheal cautery." },
  ] }, SOURCE),
  sourced({ id: "block-otl-sequence-split", type: "warning", heading: "Source disagreement: inferior-pole sequence", tone: "pearl", text: "The supplied guide places some lower-pole work before formal RLN identification, while SCORE places inferior-vessel ligation after seeing the nerve. Superficial capsular mobilization is different from a deep posterior bite: preserve the dependency that no tissue beside the groove or Berry is divided without knowing the nerve's position." }, SOURCE),
  sourced({ id: "block-otl-final-checks", type: "sequence", heading: "Final checks and closure", steps: [
    { title: "Inspect tissue and preserve function", detail: "Inspect the specimen for inadvertently removed parathyroid tissue and reassess glands left in situ. Confirm suspected parathyroid identity before autotransplanting nonviable tissue; mince it into a muscle pocket, commonly SCM, and mark/close the pocket for future identification." },
    { title: "Confirm nerve and hemostasis", detail: "Reassess the RLN/vagus response if monitored and document function before considering the opposite side. Irrigate and inspect the whole bed with relaxed traction. A chosen Valsalva maneuver or topical agent is an adjunct to secure vessel control." },
    { title: "Close without hiding the neck", detail: "Approximate straps, platysma and skin in layers without a constricting dressing. Use selected suture materials rather than treating a single published closure recipe as mandatory. Ensure the handoff includes airway, voice, bleeding concerns and the emergency decompression plan." },
  ] }, SOURCE),
  sourced({ id: "block-otl-drain", type: "warning", heading: "A drain does not prevent hematoma", tone: "pearl", text: "Do not place a drain routinely: it has not shown a hematoma-prevention benefit after thyroidectomy. Selective drainage can be considered for particular operative concerns, but it cannot exclude a deep clot or substitute for observation and urgent decompression." }, ATA),
  sourced({ id: "block-otl-bailout", type: "table", heading: "Bailouts and difficult cases", columns: ["Finding", "Response"], rows: [
    ["Possible monitoring signal loss", "Stop traction/energy; check tube contact, leads, stimulation and anesthetic blockade. Map the nerve and distinguish technical failure from a true lesion. Reassess after a pause. Numeric amplitudes and recovery intervals depend on the monitoring protocol, not a universal rule."],
    ["Confirmed first-side dysfunction", "Avoid extending the operation to the opposite lobe until function and the need for staging have been reassessed. Do not use 'complete the lobectomy' to justify unsafe ipsilateral maneuvers beside an injured nerve."],
    ["Unexpected invasion / suspicious nodes", "Reassess extent under the consented oncologic plan and confirm first-side nerve function before any contralateral operation. Targeted frozen section can answer selected questions; it cannot establish follicular carcinoma without permanent assessment of capsular/vascular invasion."],
    ["Transection or tumor-involved nerve", "Recognize injury promptly and seek experienced repair/reconstruction assessment. A functioning tumor-involved nerve versus a preoperatively paralyzed encased nerve requires different oncologic judgment. Avoid an automatic bilateral operation after recognized injury."],
    ["Substernal gland or dense thyroiditis", "Use preoperative cross-sectional imaging and sufficient exposure. A superior nerve-entry approach may help when the lower pole is inaccessible. Avoid forceful blind delivery; the need for thoracic access or a safety remnant is an individualized decision."],
    ["Completion / reoperation", "Review prior reports, parathyroid status and laryngoscopy. An unscarred lateral strap–SCM or inferior nerve approach may help. Added nerve/parathyroid risk is real even when aggregate staged outcomes resemble upfront total thyroidectomy."],
    ["Tracheal / esophageal entry", "Recognize and repair the injury, often with muscle buttress, and tailor drainage and postoperative airway/leak observation with experienced assistance."],
  ] }, SOURCE),
  sourced({ id: "block-otl-hematoma", type: "warning", heading: "Neck hematoma: act before stridor", tone: "danger", text: "Neck tightness, swelling, dysphagia, voice change, anxiety or respiratory deterioration may precede late airway obstruction. Call surgical/anesthesia/airway help, give oxygen and sit the patient up. With threatened airway or rapidly expanding compressive hematoma, immediately open the skin, platysma and strap closure and evacuate the deep clot at bedside; opening skin alone is inadequate. Prepare definitive airway rescue and urgent operative hemostasis. Do not delay decompression for imaging or transport." }, SCORE),
  sourced({ id: "block-otl-postop", type: "bullets", heading: "Recovery and follow-up", items: [
    "Observe the neck, breathing, voice and swallow. Stridor without a hematoma still requires urgent airway assessment for edema or cord dysfunction. New dysphonia or aspiration warrants laryngeal examination and early voice/swallow specialist involvement; unilateral palsy may be subtle.",
    "Unexpected hypocalcemia after a first lobectomy requires assessment of calcium/PTH and prior thyroid/parathyroid surgery. Do not automatically apply a total-thyroidectomy supplementation regimen to every first unilateral operation.",
    "Same-day discharge is appropriate only in selected patients after adequate observation, with reliable support, explicit hematoma warning signs and an emergency return plan. Reoperation, large/substernal disease or intraoperative concerns can justify longer observation.",
    "Review final pathology and discuss whether completion is indicated; document operated-side cord function first. Check TSH around 6–8 weeks and follow through the first year because hypothyroidism can emerge later. Cancer surveillance uses risk-adapted neck ultrasound; thyroglobulin is harder to interpret with a remaining lobe.",
  ] }, SOURCE),
  sourced({ id: "block-otl-traps", type: "bullets", heading: "Board and operative traps", items: [
    "EBSLN supplies cricothyroid, not cricopharyngeus: the latter term in the SCORE thyroidectomy extract is an error. Right RLN recurrence is around the subclavian, not the innominate artery; do not propagate the Fiser extraction's wording.",
    "Older Fiser teaching favors total thyroidectomy for differentiated cancer >1 cm. Current ATA selection permits lobectomy in appropriately selected low-risk disease; do not turn the older board rule into today's blanket operative indication.",
    "Preserve every RLN branch and each parathyroid's blood supply; a normal opposite lobe can conceal the functional consequences of first-side gland damage until completion.",
    "Normal voice, a monitoring response and an empty drain are each incomplete reassurance. Direct anatomy, laryngeal assessment when indicated and clinical airway observation answer different questions.",
  ] }, SOURCE),
  references("block-otl-references", sourceIds),
];

export const openThyroidLobectomyPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000025",
  slug: "open-thyroid-lobectomy",
  title: "Open Thyroid Lobectomy",
  aliases: ["Open thyroid lobectomy and isthmusectomy", "Hemithyroidectomy", "Thyroid lobectomy open"],
  procedureId: "thyroid_lobectomy",
  approach: "open",
  specialty: "Endocrine",
  tags: ["endocrine", "thyroid", "operative anatomy", "recurrent laryngeal nerve"],
  sourceId: SOURCE,
  additionalSourceIds: sourceIds.filter((id) => id !== SOURCE),
  relatedTopicSlugs: ["thyroid-nodule", "thyroid-cancer", "hyperthyroidism", "thyroiditis"],
  blocks,
  reviewedAt: "2026-11-15T00:00:00.000Z",
});
