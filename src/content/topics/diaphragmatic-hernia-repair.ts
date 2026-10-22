import { buildTopic, references, sourced } from "@/content/authoring";
import { CDH_EURO_2015_SOURCE, DIAPHRAGMATIC_HERNIA_PACKET_SOURCE as PACKET } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-dhr-summary",
    type: "summary",
    heading: "At a glance",
    text: "A diaphragmatic hernia is abdominal contents in the chest through a congenital, traumatic, or iatrogenic defect. In the newborn the defect is not what kills: **pulmonary hypoplasia** and **persistent pulmonary hypertension** are, so congenital repair waits for physiologic stabilization. In the adult the exam turns on three things — Bochdalek versus Morgagni anatomy, the traumatic defect that never heals and presents late with strangulation, and eventration, which is an intact elevated diaphragm with no hole and no sac that gets plicated rather than repaired. Acute diaphragm injury itself lives in the chest wall and pleura trauma topic; this topic covers the hernia and its repair.",
  }, PACKET),

  sourced({
    id: "block-dhr-anatomy",
    type: "bullets",
    heading: "Embryology and anatomy",
    items: [
      "Congenital hernia results from failed fusion of the **pleuroperitoneal membranes** with the **septum transversum** and dorsal mesentery around the 8th week of gestation.",
      "Traumatic defects are enlarged by the **pleuroperitoneal pressure gradient** (positive abdominal, negative thoracic), which draws viscera cephalad; they do not heal spontaneously.",
      "**T8**: inferior vena cava, through the central tendon, with branches of the right phrenic nerve.",
      "**T10**: esophagus, with the vagi.",
      "**T12**: aorta, with the thoracic duct and azygos vein.",
      "The **phrenic nerve (C3 to C5)** supplies all diaphragmatic motor function; protect its branches in every repair and plication.",
      "The hiatal (sliding) hernia is the most common diaphragmatic hernia in adults and has its own topic; among congenital defects **Bochdalek accounts for about 85 to 95%** and **Morgagni about 2 to 4%**.",
    ],
  }, PACKET),

  sourced({
    id: "block-dhr-types",
    type: "table",
    heading: "Bochdalek, Morgagni, and central defects",
    columns: ["Type", "Location", "Side", "Contents and notes"],
    rows: [
      ["**Bochdalek**", "Posterolateral, failed closure of the pleuroperitoneal canal", "About 85% left, 10% right, 5% bilateral", "Bowel, stomach, spleen; the liver protects the right side; presents in the newborn"],
      ["**Morgagni**", "Anteromedial retrosternal, through the sternocostal trigone (right side is the foramen of Morgagni, left side the space of Larrey)", "About 90% right", "Omentum, transverse colon, liver; a sac is usually present; often found incidentally in adults"],
      ["**Central**", "Central tendon", "Midline", "Rare, about 2 to 5%; stomach"],
    ],
  }, PACKET),

  sourced({
    id: "block-dhr-presentation",
    type: "bullets",
    heading: "Presentation",
    items: [
      "**Bochdalek in the newborn**: immediate respiratory distress, a **scaphoid abdomen**, bowel sounds in the chest, and heart sounds shifted to the contralateral side.",
      "**Morgagni**: usually asymptomatic, found as a retrosternal or cardiophrenic-angle mass; adults carry a higher incarceration risk than infants. **34 to 50%** have associated anomalies, classically **Down syndrome** and congenital heart disease.",
      "**Chronic traumatic hernia**: presents months to years after injury with vague respiratory symptoms, chronic pain, obstruction, incarceration, or strangulation.",
      "The posttraumatic course runs **acute, latent, then obstructive**; delayed or missed diagnosis carries roughly **10-fold higher mortality**.",
      "Vomiting, bowel obstruction, sepsis, or respiratory compromise after prior thoracoabdominal trauma is a strangulated chronic hernia until proven otherwise.",
    ],
  }, PACKET),

  sourced({
    id: "block-dhr-imaging",
    type: "bullets",
    heading: "Diagnosis",
    items: [
      "**Chest radiograph first**: gas or a gastric bubble in the hemithorax, an elevated or obscured hemidiaphragm, mediastinal shift. A **nasogastric tube coiled in the left chest** is pathognomonic.",
      "**Contrast CT** of chest and abdomen with coronal and sagittal reconstructions is the confirmatory test in the stable trauma patient.",
      "**Collar sign**: waist-like constriction of the herniated viscus at the defect; on the right the liver forms a hump or mushroom.",
      "**Dependent viscera sign**: the herniated organ falls against the posterior ribs with no diaphragm between them.",
      "**Dangling diaphragm** and direct discontinuity of the muscle complete the CT signs; all are specific and only moderately sensitive.",
      "**Right-sided injuries are the ones missed**, because the liver plugs the defect.",
      "Penetrating thoracoabdominal wound with negative or equivocal imaging: **diagnostic laparoscopy or thoracoscopy**, ideally within 24 hours.",
      "Congenital hernia: about two-thirds are found on prenatal ultrasound at 22 to 24 weeks; prognosis rests on the **observed-to-expected lung-to-head ratio** and liver position.",
      "Eventration: the fluoroscopic **sniff test** shows paradoxical motion.",
    ],
  }, PACKET),

  sourced({
    id: "block-dhr-grading",
    type: "bullets",
    heading: "↳ Grading",
    items: [
      "**CDH Study Group grades A to D** by defect size: type A and some B close primarily; larger B to D need a patch or muscle flap.",
      "**AAST diaphragm injury scale**: I contusion, II laceration under 2 cm, III laceration 2 to 10 cm, IV laceration over 10 cm with tissue loss up to 25 cm², V tissue loss over 25 cm².",
    ],
  }, PACKET),

  sourced({
    id: "block-dhr-neonatal-sequence",
    type: "sequence",
    heading: "Congenital hernia: stabilize, then repair",
    steps: [
      { title: "Intubate immediately", detail: "Never bag-mask ventilate: it inflates the herniated bowel and worsens lung compression and mediastinal shift." },
      { title: "Decompress the stomach", detail: "Orogastric or nasogastric tube to suction right away." },
      { title: "Ventilate gently", detail: "Permissive hypercapnia with peak inspiratory pressure held at **25 cm H2O** or below; high-frequency oscillation as rescue." },
      { title: "Treat pulmonary hypertension", detail: "Inhaled nitric oxide, milrinone, sildenafil, and inotropes guided by echocardiography." },
      { title: "Escalate to ECMO if refractory", detail: "For hypoxemia, hypercapnia, or circulatory failure despite maximal support." },
      { title: "Repair after stabilization", detail: "Generally within **24 to 72 hours**, once pulmonary vascular resistance falls and pulmonary hypertension is at most mild to moderate. It is not an emergency." },
    ],
  }, PACKET),

  sourced({
    id: "block-dhr-bvm-warning",
    type: "warning",
    tone: "danger",
    heading: "No bag-mask ventilation in a suspected CDH",
    text: "A newborn in respiratory distress with a **scaphoid abdomen** has a Bochdalek hernia until proven otherwise. Bag-mask ventilation fills the herniated bowel with air and makes the lung compression worse — **intubate** and place a gastric tube.",
  }, PACKET),

  sourced({
    id: "block-dhr-ecmo",
    type: "bullets",
    heading: "↳ ECMO in congenital hernia",
    items: [
      "Inability to keep **preductal saturation above 85%** or postductal saturation above 70%.",
      "**Oxygenation index of 40 or more** for at least 3 hours.",
      "Rising PaCO2 with **pH below 7.15** despite optimized ventilation.",
      "Refractory systemic hypotension with inadequate oxygen delivery despite fluids and inotropes.",
    ],
  }, CDH_EURO_2015_SOURCE),

  sourced({
    id: "block-dhr-ecmo-contra",
    type: "bullets",
    heading: "↳ ECMO contraindications",
    items: [
      "Weight under about **1.7 to 2 kg**.",
      "Gestational age under about **32 to 34 weeks**.",
      "Lethal or major chromosomal anomalies, or complex single-ventricle heart disease.",
      "**Grade III or higher intracranial hemorrhage** is an absolute contraindication.",
    ],
  }, PACKET),

  sourced({
    id: "block-dhr-congenital-repair",
    type: "bullets",
    heading: "Congenital repair technique",
    items: [
      "**Bochdalek**: open transabdominal subcostal repair (about 91% of open cases) or thoracoscopic repair; reduce the viscera, excise any sac, and close primarily with heavy nonabsorbable interrupted or mattress sutures.",
      "Large or tense Bochdalek defects need an **ePTFE patch** or a muscle flap.",
      "**Morgagni**: **laparoscopic transabdominal repair** is the procedure of choice — reduce omentum and colon, excise the sac, close primarily with nonabsorbable suture, and add mesh if the closure is under tension.",
      "Recurrence is higher after patch and after thoracoscopic repair.",
    ],
  }, PACKET),

  sourced({
    id: "block-dhr-traumatic-repair",
    type: "bullets",
    heading: "Traumatic hernia repair",
    items: [
      "Repair an acute rupture as soon as the patient's condition allows, because of incarceration and strangulation risk.",
      "Reduce the viscera, debride the edges to healthy muscle, and close primarily with slowly absorbable or nonabsorbable monofilament; figure-of-eight, horizontal mattress, and running techniques perform the same.",
      "**Mesh** for a defect **over 5 cm**, for an area over roughly 20 to 30 cm², or whenever tension-free primary closure is impossible; it is rarely needed acutely.",
      "**ePTFE** is preferred against viscera to limit adhesion, erosion, and fistula; use biologic or resorbable mesh in a contaminated field.",
      "**Always place a chest tube** after diaphragm repair or whenever the pleura is entered; evacuate pleural air before tying the last suture.",
      "Laparoscopic repair can produce a **tension pneumothorax** through the defect as the abdomen is insufflated.",
      "Give antibiotic prophylaxis for penetrating injury and any operative exploration.",
    ],
  }, PACKET),

  sourced({
    id: "block-dhr-splits",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Approach to traumatic hernia", "Acute through the abdomen (laparotomy for associated injuries); chronic through the chest (thoracotomy for dense adhesions)", "Laparoscopy for the stable acute injury and VATS for selected chronic hernias, with open surgery for instability, major associated injury, or complex defects"],
      ["Timing of CDH repair", "Delayed repair after stabilization", "Waiting until the oxygenation index is about 9.4 or less helps survival, further delay only adds ventilator days; early repair on ECMO, within the first week, may help the sickest infants"],
    ],
  }, PACKET),

  sourced({
    id: "block-dhr-source-splits",
    type: "table",
    heading: "↳ Where the supplied sources disagree",
    columns: ["Question", "This packet", "Trauma packet"],
    rows: [
      ["Left-sided share of blunt injury", "About 65 to 75%, range 50 to 80%", "Roughly 80%"],
      ["CT for blunt injury", "Pooled sensitivity about 0.80, specificity about 0.98", "Misses nearly half of blunt injuries"],
    ],
  }, PACKET),

  sourced({
    id: "block-dhr-source-splits-note",
    type: "prose",
    text: "Both disagreements are about what was counted. Older series counted injuries found at operation or autopsy, which inflates left-sided injuries and CT misses; a recent meta-analysis of modern multidetector CT reports better sensitivity. Either way the exam answer does not change: a negative CT does not exclude a small penetrating tear, and the left side is still the usual side.",
  }, PACKET),

  sourced({
    id: "block-dhr-eventration",
    type: "bullets",
    heading: "Eventration and plication",
    items: [
      "**Eventration** is abnormal elevation of an **intact, continuous** diaphragm from congenital muscular hypoplasia or acquired phrenic nerve injury (cardiac surgery, birth trauma, C3 to C5 injury). There is **no defect and no sac**.",
      "Observe the asymptomatic patient; plicate only for refractory dyspnea, orthopnea, reduced lung volumes, failure to wean, or recurrent infection.",
      "**Paradoxical motion** with mediastinal shift predicts benefit; a completely immobile diaphragm does not. In children, a dome above the 6th posterior rib predicts benefit.",
      "**Plication** imbricates the diaphragm with rows of heavy nonabsorbable sutures — no resection, no mesh — by thoracotomy, VATS, or laparoscopy.",
      "Dyspnea improves in about **97%**; VATS matches open correction with less pain and a shorter stay (about 4.5 versus 7 days), and pediatric recurrence is about 7%.",
    ],
  }, PACKET),

  sourced({
    id: "block-dhr-outcomes",
    type: "bullets",
    heading: "Outcomes and complications",
    items: [
      "Congenital hernia occurs in about **1 in 2,000 to 5,000 live births**; mortality ranges from 10 to 90% with defect size, liver position, associated anomalies, and center experience.",
      "Long-term CDH follow-up is multidisciplinary: pulmonary function, neurodevelopment and hearing, scoliosis and chest wall, feeding and reflux, and recurrence.",
      "Traumatic repair carries **18 to 40% mortality** and 40 to 60% morbidity, driven mostly by associated injuries.",
      "Repair-specific complications are **empyema**, subphrenic abscess, dehiscence or recurrence, and hemidiaphragm paralysis from phrenic injury.",
      "Reoperate for symptomatic recurrence, obstruction, or incarceration.",
    ],
  }, PACKET),

  sourced({
    id: "block-dhr-mnemonics",
    type: "bullets",
    heading: "Mnemonics",
    items: [
      "**I 8, 10 Eggs At 12**: IVC at T8, esophagus at T10, aorta at T12.",
      "**C3, 4, 5 keep the diaphragm alive**: the phrenic nerve is the whole motor supply.",
      "**Bochdalek is Back, Big, Baby, Left; Morgagni is Middle, Modest, Mostly Right, Mature.**",
      "**No Bag, Add a Tube, Gentle Lungs, Pressure First, Patch Later**: the neonatal sequence.",
      "**Acute is Abdomen, Chronic is Chest**: the board approach to traumatic hernia.",
      "**The Liver Lies**: right-sided injuries hide behind the liver.",
      "**Entire, Elevated, No Hole, No Sac: Plicate, Don't Patch.**",
      "**Moves Wrong, Fix It; Moves None, Leave It**: paradoxical motion predicts benefit from plication.",
    ],
  }, PACKET),

  references("block-dhr-references", [PACKET, CDH_EURO_2015_SOURCE]),
];

export const diaphragmaticHerniaRepairTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000004420",
  versionId: "00000000-0000-4000-8000-000000004421",
  slug: "diaphragmatic-hernia-repair",
  title: "Diaphragmatic Hernia Repair",
  aliases: [
    "diaphragmatic hernia",
    "Bochdalek hernia",
    "Morgagni hernia",
    "foramen of Morgagni",
    "space of Larrey",
    "congenital diaphragmatic hernia",
    "CDH",
    "chronic traumatic diaphragmatic hernia",
    "delayed diaphragmatic hernia",
    "diaphragmatic eventration",
    "eventration",
    "diaphragmatic plication",
    "sniff test",
    "collar sign",
    "dependent viscera sign",
  ],
  scoreNodeId: "hernia-procedures",
  scoreCategory: "SCORE · Hernia · Operations & Procedures",
  tags: ["hernia", "diaphragm", "pediatric", "trauma", "score", "absite", "procedures"],
  sourceId: PACKET,
  additionalSourceIds: [CDH_EURO_2015_SOURCE],
  blocks,
  reviewedAt: "2026-10-21T00:00:00.000Z",
});
