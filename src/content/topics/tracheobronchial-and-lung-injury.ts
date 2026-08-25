import { buildTopic, references, sourced } from "@/content/authoring";
import { TRAUMA_TRACHEOBRONCHIAL_LUNG_PACKET_SOURCE as PACKET } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-tbl-summary",
    type: "summary",
    heading: "At a glance",
    text: "Pulmonary contusion, tracheobronchial injury, and lung parenchymal injury sit on one spectrum of energy transferred into the chest, and each has its own diagnostic trap. Pulmonary contusion frequently is not visible on the initial chest x-ray and blossoms over 24 to 48 hours, so a clean early film does not clear the lung. Tracheobronchial injury is rare but lethal, announced by a classic triad of dyspnea, subcutaneous emphysema, and hemoptysis, and confirmed by bronchoscopy rather than imaging. Lung parenchymal injury is managed by climbing a lung-sparing operative ladder — oversewing and wedge resection before tractotomy, tractotomy before anatomic resection, and anatomic resection before the last resort of pneumonectomy, which carries a mortality approaching 50 to 100% from acute right-heart failure. Board-classic teaching drives management by absolute numbers in several places where current evidence weights physiology instead, and this topic flags each split explicitly.",
  }, PACKET),
  sourced({
    id: "block-tbl-pc-pathophysiology",
    type: "bullets",
    heading: "Pulmonary contusion: pathophysiology and timing",
    items: [
      "Pulmonary contusion is alveolar hemorrhage and parenchymal destruction from direct kinetic energy transfer through the chest wall into the lung, **without laceration**.",
      "High-yield timing point: contusion frequently is **not visible on the initial CXR** and evolves or blossoms over **24 to 48 hours**; opacification already present on the initial film signals a high-energy mechanism and a shorter time to acute respiratory failure.",
      "Pathophysiologic cascade: parenchymal hemorrhage leads to alveolar edema and collapse, which reduces pulmonary compliance; perfusion of nonaerated lung creates a right-to-left intrapulmonary shunt and progressive hypoxemia, while increased work of breathing drives CO2 retention and respiratory acidosis.",
      "Contused lung is exquisitely fluid-sensitive, and inflammatory mediator release can drive SIRS, ARDS, and multi-system organ failure — resuscitate to adequate perfusion, then meticulously avoid excess fluid rather than restricting it dogmatically.",
    ],
  }, PACKET),
  sourced({
    id: "block-tbl-tbi-mechanism",
    type: "bullets",
    heading: "Tracheobronchial injury: mechanism and anatomy",
    items: [
      "Classic teaching: **over 80 to 90% of blunt traumatic disruptions occur within roughly 2.5 cm (1 inch) of the carina**; the supplied module instead states within 1 cm of the carina — know both figures.",
      "Blunt mechanism most often injures the mainstem bronchi, and the **right mainstem bronchus is the most frequently injured segment** in blunt trauma.",
      "Post-intubation (iatrogenic) tracheobronchial injury is classically a **longitudinal laceration of the membranous (posterior) trachea** in the middle or distal third.",
    ],
  }, PACKET),
  sourced({
    id: "block-tbl-epidemiology",
    type: "bullets",
    heading: "Epidemiology and risk factors",
    items: [
      "Pulmonary contusion is the most common blunt intrathoracic parenchymal injury, strongly associated with flail chest, rib fractures, a high injury severity score, and polytrauma; in one series roughly **2% of trauma admissions carried a contusion diagnosis and roughly 25% developed respiratory insufficiency**.",
      "Tracheobronchial injury is rare but carries **high prehospital mortality** — many patients die at the scene before reaching care.",
      "Suspect tracheobronchial injury in high-energy deceleration or crush chest trauma, penetrating neck or mediastinal wounds, and post-intubation or post-tracheostomy patients with sudden subcutaneous emphysema.",
    ],
  }, PACKET),
  sourced({
    id: "block-tbl-pc-presentation",
    type: "bullets",
    heading: "Pulmonary contusion: clinical presentation",
    items: [
      "Dyspnea, hypoxemia, hemoptysis, and tachypnea, with radiographic opacity evolving over 24 to 48 hours.",
      "Untreated or severe contusion progresses to worsening hypoxemia and ARDS.",
    ],
  }, PACKET),
  sourced({
    id: "block-tbl-tbi-presentation",
    type: "bullets",
    heading: "Tracheobronchial injury: the classic triad and its signs",
    items: [
      "The classic triad is **dyspnea, subcutaneous emphysema, and hemoptysis**.",
      "Extensive or progressive subcutaneous emphysema, with or without pneumomediastinum.",
      "A large, continuous air leak — persistent bubbling in the chest-drain chamber — and failure of the collapsed lung to re-expand despite a well-placed, functioning chest tube.",
      "The **\"fallen lung\" sign** — the lung collapsing dependently or laterally away from the hilum — is pathognomonic for complete bronchial transection.",
      "In intubated patients: a high cuff air leak, an over-inflated or herniating cuff on CT, or rising ventilatory resistance.",
    ],
  }, PACKET),
  sourced({
    id: "block-tbl-pc-diagnosis",
    type: "bullets",
    heading: "Pulmonary contusion: diagnosis",
    items: [
      "CXR is first-line but insensitive early; CT chest is most sensitive and defines the extent of injury.",
      "Current-evidence caveat: CT-only contusions may have **limited clinical significance and risk overtreatment**.",
    ],
  }, PACKET),
  sourced({
    id: "block-tbl-tbi-diagnosis",
    type: "bullets",
    heading: "Tracheobronchial injury: diagnosis",
    items: [
      "CT chest may suggest injury via peribronchial air, the fallen-lung sign, or a cuff abnormality; MinIP reconstructions aid detection.",
      "**Bronchoscopy, flexible or rigid, is the diagnostic gold standard** — it visualizes mucosal disruption, depth, length, and circumferential extent, and confirms an airway distal to the injury.",
    ],
  }, PACKET),
  sourced({
    id: "block-tbl-airway-warning",
    type: "warning",
    tone: "danger",
    heading: "Do not blindly intubate a suspected tracheobronchial injury",
    text: "**Blind rapid-sequence intubation is hazardous** in suspected tracheobronchial injury — it risks completing a partial transection or creating a false lumen. The preferred approach is **awake fiberoptic intubation**, advancing the tube past the injury under direct vision. For a unilateral bronchial injury, selectively intubate the uninjured mainstem with a single-lumen tube, and **avoid double-lumen tubes**, which risk extending the tear.",
  }, PACKET),
  sourced({
    id: "block-tbl-classification",
    type: "bullets",
    heading: "Classification: the operative-versus-nonoperative dividing line",
    items: [
      "The **Cardillo classification** grades post-intubation tracheal injuries from Level I to IIIB by depth and mediastinal or esophageal involvement, and is increasingly used to select conservative versus operative management.",
    ],
  }, PACKET),
  sourced({
    id: "block-tbl-severity-table",
    type: "table",
    heading: "Minor versus major tracheobronchial injury",
    columns: ["Feature", "Minor / nonoperative candidate", "Major / operative"],
    rows: [
      ["Circumference", "Tear under 1/3 (roughly under 4 cm)", "Tear over 1/3 circumference"],
      ["Margins and tissue", "Well-opposed, no tissue loss", "Tissue loss, wide gap, devitalized"],
      ["Ventilation", "Not ventilator-dependent", "Needs mechanical ventilation not deliverable past the injury"],
      ["Air leak", "Controlled by chest tube, lung expands", "Massive leak, lung will not expand"],
      ["Associated injury", "None", "Esophageal or vascular injury, persistent pneumothorax"],
    ],
  }, PACKET),
  sourced({
    id: "block-tbl-pc-management",
    type: "bullets",
    heading: "Pulmonary contusion: management",
    items: [
      "Supplemental oxygen to maintain oxygenation, avoiding hyperoxia.",
      "Aggressive multimodal analgesia — epidural preferred in severe flail chest — plus chest physiotherapy and pulmonary toilet to prevent pneumonia and atelectasis.",
      "**Selective, not obligatory, mechanical ventilation**: do not intubate solely to stabilize the chest wall; use PEEP or CPAP, and consider NIV, which can avert intubation.",
      "**Do not use steroids for pulmonary contusion.** Routine prophylactic antibiotics are not indicated for isolated contusion.",
      "VV-ECMO is an option for refractory hypoxemia, with reported survival of roughly **68%**.",
    ],
  }, PACKET),
  sourced({
    id: "block-tbl-hemothorax",
    type: "bullets",
    heading: "Massive and retained hemothorax",
    items: [
      "Massive hemothorax goes to emergent thoracotomy; classic triggers are **at least 1500 mL immediate output, or over 200 mL/hour for 3 to 4 hours, or an ongoing transfusion requirement** (WSES-AAST: over 1500 mL or over 200 mL/hour for 3 hours).",
      "Roughly **85% of hemothoraces are managed by tube thoracostomy alone**, with roughly 10 to 15% needing surgery.",
      "Retained hemothorax goes to **early VATS evacuation, not a second chest tube**; a retained clot over 300 to 500 mL on CT warrants VATS within roughly 72 hours, ideally under 3.9 days, to prevent trapped lung, fibrothorax, and post-traumatic empyema.",
    ],
  }, PACKET),
  sourced({
    id: "block-tbl-tbi-management",
    type: "bullets",
    heading: "Tracheobronchial injury: management",
    items: [
      "**Secure the airway first**, bronchoscopy-guided.",
      "Surgical repair is indicated for large ruptures, a significant or persistent air leak, a lung that will not expand, an associated esophageal or vascular injury, or a persistent pneumothorax despite drainage.",
      "**Early primary repair, ideally within 24 hours, minimizes stenosis and fistula.**",
      "Conservative management suits small tears (under 1/3 circumference) that are well-opposed, with a controlled air leak, effective ventilation, and no esophageal injury or sepsis, with outcomes comparable to surgery in selected patients.",
      "Endobronchial stenting is a growing minimally invasive option, including for poor surgical candidates.",
    ],
  }, PACKET),
  sourced({
    id: "block-tbl-exposure",
    type: "bullets",
    heading: "Operative exposure by location",
    items: [
      "Cervical trachea: transverse collar incision roughly 2 cm above the sternal notch.",
      "Trachea, right mainstem, and proximal left mainstem: **right posterolateral thoracotomy (4th intercostal space)**, which avoids the aortic arch.",
      "Distal left mainstem or distal left bronchial tree: left posterolateral thoracotomy.",
      "Cervical access, with or without a T-incision, can reach even the main bronchi in selected iatrogenic cases with low morbidity.",
    ],
  }, PACKET),
  sourced({
    id: "block-tbl-airway-repair",
    type: "bullets",
    heading: "Airway reconstruction principles",
    items: [
      "**Preserve segmental lateral blood supply** — limit dissection and mobilization.",
      "Debride only nonviable or crushed cartilage back to healthy mucosa.",
      "Tension-free, single-layer, interrupted anastomosis with absorbable monofilament (for example, 3-0 PDS), with knots tied **extraluminal**.",
      "**Buttress the suture line with viable pedicled tissue** — intercostal muscle, pleura, or pericardium — essential when there is a concomitant esophageal injury, to prevent fistula.",
      "A protective tracheostomy is used for severe crush, extensive mucosal loss, large lacerations, or anticipated prolonged ventilation, placed through a separate distal ring and **never through the repair**.",
    ],
  }, PACKET),
  sourced({
    id: "block-tbl-lung-ladder",
    type: "sequence",
    heading: "Lung parenchymal injury: the lung-sparing operative ladder",
    steps: [
      { title: "Oversew or wedge resection", detail: "For a peripheral laceration: stapled wedge resection across healthy tissue, or pneumonorrhaphy (oversewing); inspect and oversew bleeders and leaks." },
      { title: "Pulmonary tractotomy", detail: "For a deep through-and-through tract: pass a stapler through the tract, unroof it, then directly ligate bleeding vessels and bronchioles with selective vascular ligation." },
      { title: "Damage-control hilar control if exsanguinating", detail: "Hilar clamping with a non-crushing vascular clamp, or a hilar twist (180-degree rotation) around the pedicle; both cause acute right-ventricular strain and hypoxia and should be used only briefly during resuscitation." },
      { title: "Definitive resection for non-reconstructible destruction", detail: "Nonanatomic or anatomic resection; lobectomy is preferred over pneumonectomy, and lung-sparing surgery is associated with improved survival versus major resection." },
      { title: "Pneumonectomy as a last resort", detail: "Avoid trauma pneumonectomy where possible — reported mortality approaches 50 to 100% from acute right-ventricular failure." },
    ],
  }, PACKET),
  sourced({
    id: "block-tbl-thoracotomy-board-note",
    type: "prose",
    heading: "Board answer versus current practice: chest-tube volume triggers",
    text: "Board-classic teaching leans on absolute chest-tube volume numbers — 1500 mL immediately, or 200 mL/hour — to trigger thoracotomy. Current guidelines, including WSES-AAST and Western Trauma, stress **patient physiology and hemodynamics over the absolute volume** as the true operative trigger. Know the numbers for the exam, but recognize that a deteriorating patient does not need to wait for them.",
  }, PACKET),
  sourced({
    id: "block-tbl-operative-board-note",
    type: "prose",
    heading: "Board answer versus current practice: tracheobronchial injury management",
    text: "Board-classic teaching treats tracheobronchial disruption as automatically operative. Modern evidence supports **conservative management for small, well-opposed, adequately ventilated tears**, with outcomes comparable to surgery in selected patients, and an expanding role for **endobronchial stenting**, including in poor surgical candidates. Separately, classic emphasis on CT sensitivity for pulmonary contusion is tempered by evidence that CT-only contusions may be clinically minor and risk overtreatment.",
  }, PACKET),
  sourced({
    id: "block-tbl-followup",
    type: "bullets",
    heading: "Follow-up, surveillance, and complications",
    items: [
      "Pulmonary contusion: serial imaging for resolution, watching for pneumonia, ARDS, and empyema; pulmonary function testing for extensive injury, plus early mobilization and rehabilitation.",
      "Tracheobronchial injury: serial bronchoscopy to confirm mucosal healing and detect granulation tissue and late luminal stenosis, the dominant delayed complications.",
      "Retained hemothorax complications are trapped lung or fibrothorax and post-traumatic empyema, in up to roughly 25% of cases; prophylactic antibiotics on admission reduce empyema, and early VATS resolves roughly 87%.",
      "Standard chest-tube algorithm: suction at −20 mmHg for 24 hours, then CXR; if resolved, water seal for 6 hours, then repeat CXR, then pull the tube if there is no reaccumulation or air leak. If opacity persists at 24 hours, obtain a non-contrast CT and proceed to VATS within 48 to 72 hours for a significant retained clot.",
    ],
  }, PACKET),
  sourced({
    id: "block-tbl-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "Pulmonary contusion **blossoms over 24 to 48 hours** and is often invisible on the first CXR — an opacity already present on arrival means a worse injury and faster respiratory failure.",
      "Subcutaneous emphysema, hemoptysis, a persistent large air leak, and a lung that will not re-expand despite a good chest tube together mean **think tracheobronchial disruption, get bronchoscopy**.",
      "**Awake fiberoptic intubation past the injury, not blind RSI**; avoid double-lumen tubes.",
      "Climb the ladder: pneumonorrhaphy, then wedge resection, then tractotomy, then lobectomy, and pneumonectomy only as a last resort — **it kills via acute right-heart failure**.",
    ],
  }, PACKET),
  references("block-tbl-references", [PACKET]),
];

export const tracheobronchialAndLungInjuryTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000001234",
  versionId: "00000000-0000-4000-8000-000000001244",
  slug: "tracheobronchial-and-lung-injury",
  title: "Tracheobronchial and Lung Injury",
  aliases: ["pulmonary contusion", "tracheobronchial injury", "bronchial transection", "fallen lung sign", "Cardillo classification", "pulmonary tractotomy", "pneumonorrhaphy", "trauma pneumonectomy", "lung laceration", "lung parenchymal injury", "awake fiberoptic intubation", "double-lumen tube", "bronchoscopy trauma", "airway reconstruction", "tracheal repair", "bronchial repair", "hilar clamping", "hilar twist", "VV-ECMO", "endobronchial stenting"],
  scoreNodeId: "trauma-conditions",
  scoreCategory: "SCORE · Trauma · Diseases & Conditions",
  tags: ["trauma", "thoracic-trauma", "airway", "lung-injury", "absite", "score"],
  sourceId: PACKET,
  blocks,
  reviewedAt: "2026-08-21T00:00:00.000Z",
});
