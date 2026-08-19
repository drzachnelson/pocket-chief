import { buildTopic, references, sourced } from "@/content/authoring";
import { TRAUMA_NECK_PACKET_SOURCE as PACKET } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-neck-op-summary",
    type: "summary",
    heading: "At a glance",
    text: "Once a neck injury declares itself — a hard sign, a positive CTA, or a wound that is already open on the table — the operation is built around exposure first, then organ-specific repair. Zone I needs sternotomy or thoracotomy for proximal vascular control, Zone II opens through an anterior sternocleidomastoid incision with the common facial vein as the landmark to the carotid bifurcation, and Zone III demands digastric division and mandibular subluxation to reach the distal internal carotid at the skull base. Once exposed, **revascularization is preferred over ligation** for the carotid, laryngotracheal injuries get a single-layer repair that preserves segmental blood supply, and pharyngoesophageal injuries get a two-layer closure buttressed with muscle and wide drainage. The recurring theme across every repair territory is protecting the structure next to the one you just fixed — muscle interposition between adjacent tracheal and esophageal repairs, cuff overinflation and the Utley maneuver for a tracheoinnominate fistula — because a technically sound repair still fails if its neighbor is not protected too.",
  }, PACKET),
  sourced({
    id: "block-neck-op-positioning",
    type: "bullets",
    heading: "Positioning and preparation",
    items: [
      "Position the patient supine with a shoulder roll and the head turned away from the injured side.",
      "Prep chin-to-mid-thigh, bedline-to-bedline, anticipating that the same operation may require sternotomy, thoracotomy, or saphenous vein harvest.",
    ],
  }, PACKET),
  sourced({
    id: "block-neck-op-exposure-table",
    type: "table",
    heading: "Operative exposure by approach",
    columns: ["Approach", "Zone", "What it exposes"],
    rows: [
      ["Median sternotomy ± supraclavicular/claviculectomy", "Zone I", "Innominate artery, proximal right and left common carotid arteries, and the innominate vein"],
      ["Left anterolateral thoracotomy", "Zone I", "Proximal left subclavian artery origin"],
      ["Supraclavicular incision", "Zone I", "Right or distal subclavian vessels"],
      ["Anterior sternocleidomastoid incision", "Zone II", "Carotid bifurcation, reached by dividing the platysma, retracting the SCM laterally, and ligating the common facial vein"],
      ["Collar incision", "Zone II", "Bilateral neck injuries or the trachea, when wide exposure is needed"],
      ["High sternocleidomastoid incision with digastric division ± mandibular subluxation", "Zone III", "Distal internal carotid artery control at the skull base"],
    ],
  }, PACKET),
  sourced({
    id: "block-neck-op-carotid-vascular",
    type: "bullets",
    heading: "Carotid and vascular repair",
    items: [
      "**Revascularization is preferred over ligation** for carotid injury — repair carries lower mortality (**8.7 percent** vs. **19.7 percent** for ligation), though stroke rates are similar between the two.",
      "**Avulsion or transection is the strongest predictor of stroke** in penetrating carotid injury.",
      "The external carotid artery can be ligated safely; common or internal carotid ligation carries a historical stroke risk of roughly **20 percent** and should be avoided.",
      "Repair internal jugular vein injuries with lateral venorrhaphy — unilateral ligation is tolerated, but never ligate the internal jugular vein bilaterally.",
      "Manage vertebral artery injury with endovascular embolization, bone-wax packing of the transverse foramen, or ligation; unilateral occlusion is usually tolerated when the contralateral vessel is intact.",
      "Avoid PTFE graft material in a contaminated field.",
    ],
  }, PACKET),
  sourced({
    id: "block-neck-op-carotid-flow",
    type: "flow",
    heading: "Carotid decision: repair versus ligation",
    nodes: [
      { id: "assess", label: "Carotid artery injury: assess neurologic status and feasibility of repair", tone: "default" },
      { id: "repair-path", label: "Neurologically intact or salvageable, and repair is technically feasible", tone: "good" },
      { id: "ligation-path", label: "Comatose or neurologically devastated, or repair is not technically feasible", tone: "caution" },
      { id: "small-defect", label: "Small arterial defect", tone: "default" },
      { id: "large-defect", label: "Larger arterial defect", tone: "default" },
      { id: "primary-repair", label: "Primary repair or autologous vein patch", tone: "good" },
      { id: "vein-interposition", label: "Reversed saphenous vein interposition graft from the contralateral thigh", tone: "good" },
      { id: "ligation", label: "Ligate — external carotid freely, common or internal carotid only as a last resort", tone: "caution" },
    ],
    edges: [
      { from: "assess", to: "repair-path" },
      { from: "assess", to: "ligation-path" },
      { from: "repair-path", to: "small-defect" },
      { from: "repair-path", to: "large-defect" },
      { from: "small-defect", to: "primary-repair" },
      { from: "large-defect", to: "vein-interposition" },
      { from: "ligation-path", to: "ligation" },
    ],
  }, PACKET),
  sourced({
    id: "block-neck-op-shunting-board-vs-practice",
    type: "prose",
    heading: "Board answer versus current practice: temporary intraluminal shunting",
    text: "The board-classic answer favors **temporary intraluminal shunting** for damage control in carotid injury when definitive repair must be delayed. A recent systematic review, however, found that temporary shunting followed by delayed revascularization was associated with roughly **100 percent** stroke or death — a notable caution against relying on this classic teaching in current practice. Know the classic answer for the exam, but recognize that current evidence argues against routine delayed shunting.",
  }, PACKET),
  sourced({
    id: "block-neck-op-laryngotracheal",
    type: "bullets",
    heading: "Laryngotracheal repair",
    items: [
      "Repair the trachea or larynx in a single layer using **3-0 absorbable monofilament** (PDS or Maxon), with minimal debridement and minimal mobilization to preserve segmental blood supply.",
      "Place a protective tracheostomy for crush injury, a circumferential laceration involving more than **1/3** of the lumen, or extensive mucosal loss, and position it below and separate from the repair.",
      "Interpose vascularized strap muscle between adjacent tracheal and esophageal repairs to prevent a tracheoesophageal fistula.",
    ],
  }, PACKET),
  sourced({
    id: "block-neck-op-pharyngoesophageal",
    type: "bullets",
    heading: "Pharyngoesophageal repair",
    items: [
      "Approach the cervical esophagus through a left anterior sternocleidomastoid incision, and place a nasogastric tube or endoscope intraoperatively to help identify the injury.",
      "Perform a longitudinal myotomy to expose the full mucosal defect — the mucosal injury typically extends beyond the muscular tear.",
      "Close in two layers (absorbable inner layer, permanent or long-acting outer layer), buttress the repair with a muscle flap, and always place closed-suction drains — the leak rate is roughly **20 percent**.",
      "Selective nonoperative management is safe in stable patients with contained or no extravasation and no sepsis, especially for oropharyngeal and high hypopharyngeal injuries; most distal cervical esophageal injuries still require exploration.",
      "For destructive or delayed (**>48 hours**) injuries, or thoracic-level injuries, manage with wide drainage, with or without exclusion and diversion — spit fistula, distal ligation, gastrostomy, and feeding jejunostomy.",
    ],
  }, PACKET),
  sourced({
    id: "block-neck-op-glandular-nerve",
    type: "bullets",
    heading: "Glandular, lymphatic, and nerve injuries",
    items: [
      "Repair a left Zone I thoracic duct injury with mass suture ligation and a drain.",
      "Unilateral recurrent laryngeal nerve injury causes hoarseness; bilateral injury causes stridor or airway obstruction requiring tracheostomy.",
      "Spinal accessory nerve (CN XI) injury in the posterior triangle causes shoulder droop; hypoglossal nerve (CN XII) injury causes tongue deviation toward the injured side; vagus nerve injury in the carotid sheath causes hoarseness and dysphagia; marginal mandibular nerve injury causes lip droop.",
    ],
  }, PACKET),
  sourced({
    id: "block-neck-op-tracheoinnominate-warning",
    type: "warning",
    heading: "Tracheoinnominate fistula",
    text: "A sentinel bleed from a tracheostomy site is tracheoinnominate fistula until proven otherwise. Overinflate the tracheostomy cuff first to tamponade the bleed, then apply digital compression of the innominate artery against the manubrium — the **Utley maneuver** — while mobilizing to the operating room for sternotomy. Definitive control is innominate artery ligation and resection **without a prosthetic graft**, buttressed with muscle interposition.",
    tone: "danger",
  }, PACKET),
  sourced({
    id: "block-neck-op-complications",
    type: "bullets",
    heading: "Postoperative complications",
    items: [
      "An expanding hematoma or new stridor after neck surgery is decompressed by opening the incision at the bedside to release the airway.",
      "Manage an esophageal leak with a water-soluble esophagram, NPO status, nutrition support, and adequate drainage — most cervical leaks close spontaneously.",
    ],
  }, PACKET),
  references("block-neck-op-references", [PACKET]),
];

export const neckInjuriesManagementTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000001218",
  versionId: "00000000-0000-4000-8000-000000001228",
  slug: "neck-injuries-management",
  title: "Neck Injuries Management",
  aliases: ["neck exploration", "neck injury repair", "carotid injury repair", "carotid ligation", "carotid shunt", "common facial vein", "sternocleidomastoid incision", "median sternotomy", "mandibular subluxation", "digastric division", "internal jugular vein injury", "venorrhaphy", "vertebral artery injury", "laryngotracheal repair", "tracheal repair", "protective tracheostomy", "pharyngoesophageal injury", "esophageal repair", "cervical esophagus", "muscle flap buttress", "thoracic duct injury", "recurrent laryngeal nerve", "tracheoinnominate fistula", "Utley maneuver", "spit fistula"],
  scoreNodeId: "trauma-procedures",
  scoreCategory: "SCORE · Trauma · Operations & Procedures",
  tags: ["trauma", "neck", "vascular", "operative-technique", "airway", "absite", "score"],
  sourceId: PACKET,
  blocks,
  reviewedAt: "2026-08-19T00:00:00.000Z",
});
