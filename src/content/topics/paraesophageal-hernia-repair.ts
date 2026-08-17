import { buildTopic, references, sourced } from "@/content/authoring";
import { PARAESOPHAGEAL_HERNIA_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-peh-summary",
    type: "summary",
    heading: "At a glance",
    text: "Paraesophageal hernia (PEH) repair addresses true anatomical herniation of the gastric fundus and abdominal viscera through the diaphragmatic hiatus (**Types II–IV**), distinct from simple sliding hiatal hernias (Type I). Key surgical tenets include **complete hernia sac excision**, mobilization of at least **2.5 to 3.0 cm** of intra-abdominal esophagus, tension-free crural reapproximation (with selective mesh buttressing), and calibration of a floppy antireflux fundoplication over a **56F–60F** bougie. Emergent presentations with acute gastric volvulus, strangulation, or **Borchardt triad** require prompt NGT decompression and urgent operative intervention.",
  }, SOURCE),

  sourced({
    id: "block-peh-classification-table",
    type: "table",
    heading: "Hiatal hernia classification (Types I–IV)",
    columns: ["Type", "Hernia Name / Class", "Anatomic Definition & GE Junction Position", "Clinical Significance"],
    rows: [
      ["Type I", "**Sliding hernia** (most common, >90%)", "Displacement of the gastroesophageal (GE) junction **superiorly** into the posterior mediastinum/thoracic cavity", "Primarily associated with **GERD**; managed medically unless refractory or complicated"],
      ["Type II", "**True paraesophageal hernia**", "Herniation of gastric fundus alongside esophagus into mediastinum; GE junction remains in **normal intra-abdominal position**", "Risk of volvulus, strangulation, and **Cameron ulcers**; mechanical obstructive symptoms predominate"],
      ["Type III", "**Mixed hiatal hernia**", "Herniation of **both** the GE junction and gastric fundus into the posterior mediastinum", "**Most common** complex paraesophageal hernia; combines reflux and obstructive mechanical symptoms"],
      ["Type IV", "**Complex / giant hernia**", "Intrathoracic herniation of the stomach along with **other abdominal viscera** (e.g., colon, spleen, small bowel, omentum)", "Large hiatal defect; high operative complexity, requires extensive sac mobilization ± **gastropexy**"],
    ],
  }, SOURCE),

  sourced({
    id: "block-peh-indications",
    type: "bullets",
    heading: "Surgical indications & management nuances",
    items: [
      "**Elective indications**",
      "- **Esophageal manifestations**",
      "-- Dysphagia",
      "-- Chest pain",
      "-- Postprandial fullness",
      "-- Early satiety",
      "-- Regurgitation",
      "-- Chronic aspiration",
      "- **Reflux complications**",
      "-- Severe esophagitis (Los Angeles Grade C/D)",
      "-- Peptic strictures",
      "-- Barrett esophagus",
      "- **Anemia**: iron deficiency anemia secondary to mechanical trauma and mucosal ischemia at the diaphragmatic hiatus (Cameron ulcers)",
      "- **Medical failure**: intolerance, inadequate response to medical acid suppression, or patient preference to avoid lifelong pharmacotherapy",
      "**Emergent / urgent indications**",
      "- Acute gastric volvulus (typically organoaxial along the GE junction–pyloric axis)",
      "- Acute incarceration",
      "- Strangulation",
      "- Mechanical gastric outlet obstruction",
      "- Ischemia or perforation",
      "**Watchful waiting nuance**: asymptomatic or minimally symptomatic elderly patients with prohibitive cardiopulmonary comorbidities can be managed safely with watchful waiting.",
      "**Severe concomitant obesity** (bariatric nuance): in morbidly obese patients (BMI ≥ 35 kg/m², or BMI ≥ 30 kg/m² with Type 2 Diabetes), primary hiatal hernia repair combined with **Roux-en-Y gastric bypass (RYGB)** is the preferred antireflux intervention due to lower recurrence and superior symptom resolution.",
    ],
  }, SOURCE),

  sourced({
    id: "block-peh-emergent-presentation",
    type: "bullets",
    heading: "Emergent presentation & Borchardt triad",
    items: [
      "**Borchardt triad** (acute gastric volvulus)",
      "- Severe acute epigastric or retrosternal chest pain",
      "- Violent retching without productive emesis",
      "- Inability to pass a nasogastric tube",
      "**Associated acute symptoms**: severe dysphagia, postprandial vomiting, tachypnea, tachycardia, and signs of septic or hypovolemic shock if strangulation or perforation occurs.",
      "**Volvulus axis**: gastric volvulus in PEH is typically **organoaxial** (stomach rotates along the GE junction–pylorus long axis), producing a closed-loop obstruction and progressive ischemic necrosis.",
    ],
  }, SOURCE),

  sourced({
    id: "block-peh-emergent-flow",
    type: "flow",
    heading: "↳ Decision flow: emergent PEH & acute volvulus workup",
    nodes: [
      { id: "suspect", label: "Suspected incarcerated PEH or acute gastric volvulus" },
      { id: "cxr", label: "1. Upright chest / abdominal X-ray: retrocardiac air-fluid level, large intrathoracic stomach bubble, or pneumoperitoneum" },
      { id: "ct", label: "2. Urgent contrast-enhanced CT (chest/abdomen): defines hernia anatomy, transition point, gastric wall thickening/ischemia, volvulus, pneumomediastinum" },
      { id: "ngt", label: "3. Nasogastric tube (NGT) decompression: decompresses stomach, relieves tension, prevents aspiration, and temporizes patient", tone: "good" },
      { id: "explore", label: "4. Urgent EGD / emergency surgical exploration: EGD assesses mucosal viability; proceed directly to OR if peritonitis, strangulation, or persistent volvulus", tone: "caution" },
    ],
    edges: [
      { from: "suspect", to: "cxr", label: "Initial radiograph" },
      { from: "cxr", to: "ct", label: "Cross-sectional imaging" },
      { from: "ct", to: "ngt", label: "Decompression" },
      { from: "ngt", to: "explore", label: "Operative intervention" },
    ],
  }, SOURCE),

  sourced({
    id: "block-peh-traction-warning",
    type: "warning",
    tone: "danger",
    heading: "Never exert direct traction on the friable gastric wall",
    text: "Incarcerated or volvulated gastric tissue is frequently ischemic, edematous, and extremely **friable**. During reduction and mobilization, always exert gentle downward traction on the **hernia sac** and surrounding perigastric tissue rather than pulling directly on the friable gastric wall to avoid **catastrophic iatrogenic perforation**.",
  }, SOURCE),

  sourced({
    id: "block-peh-workup-table",
    type: "table",
    heading: "Elective preoperative diagnostic workup",
    columns: ["Diagnostic Modality", "Primary Diagnostic Objective", "Key Pathologic Findings"],
    rows: [
      ["Barium Esophagram (Upper GI Series)", "Defines **structural anatomy**, GE junction location, size of hernia, and rules out volvulus", "**Gastric rugae** superior to the diaphragm, intrathoracic GE junction, dynamic reflux, epiphrenic diverticula"],
      ["Upper Endoscopy (EGD)", "Direct **mucosal visualization** and structural / neoplastic evaluation", "Incisor-to-GE junction vs diaphragmatic hiatus measurement, **Los Angeles grade A–D** esophagitis, Hill grade (1–4) flap valve, Barrett esophagus biopsy"],
      ["High-Resolution Manometry (HRM)", "Assesses **esophageal peristalsis** and rules out primary motility disorders", "Evaluates LES resting and relaxation pressures; identifies **ineffective esophageal motility** (IEM) or achalasia (mandating partial rather than full wrap)"],
      ["Ambulatory pH Testing", "Quantifies pathologic distal esophageal **acid exposure** (if indicated)", "**DeMeester score > 14.72** (>4.5% of time with pH < 4) confirms pathologic GERD (not required if LA Grade C/D esophagitis or Barrett esophagus is present)"],
      ["Gastric Emptying Study", "Evaluates for **delayed gastric emptying** and vagal neuropathy", "Gastric retention **> 60% at 2 hours** or **> 10% at 4 hours** confirms gastroparesis"],
    ],
  }, SOURCE),

  sourced({
    id: "block-peh-les-physiology",
    type: "bullets",
    heading: "Lower esophageal sphincter physiology & barrier dynamics",
    items: [
      "Normal lower esophageal sphincter (LES) length is **2 to 4 cm**.",
      "Antireflux competence requires an overall **LES length ≥ 2 cm** and an **intra-abdominal length ≥ 1 to 2 cm** anchored in positive intra-abdominal pressure.",
      "Normal resting LES pressure is **10 to 35 mm Hg** (manometric baseline < 26 mm Hg). A resting pressure **< 6 mm Hg** is diagnostic of an incompetent barrier.",
      "During normal swallowing/deglutition, LES relaxation drops to a **nadir of 0 mm Hg** to permit unimpeded esophageal bolus transit.",
    ],
  }, SOURCE),

  sourced({
    id: "block-peh-operative-anatomy",
    type: "bullets",
    heading: "Key operative anatomy & neurovascular landmarks",
    items: [
      "**Diaphragmatic crura & hiatus**: formed by the muscular right crus (split into anterior and posterior limbs) and left crus, creating the hiatal sling around the esophagus.",
      "**Phrenoesophageal ligament (Laimer membrane)**: an extension of transversalis and endothoracic fascia securing the distal esophagus to the diaphragmatic hiatus; incised circumferentially to enter the posterior mediastinum.",
      "**Anterior (left) vagus nerve**: traverses the anterior esophageal surface, giving off hepatic branches to the gastrohepatic ligament before continuing as the anterior nerve of Latarjet.",
      "**Posterior (right) vagus nerve**: traverses the posterior esophageal surface, giving off the celiac branch and the criminal nerve of Grassi to the posterior gastric fundus.",
      "**Vascular landmarks**",
      "- **Replaced left hepatic artery**: arises from the left gastric artery and traverses the pars flaccida of the gastrohepatic ligament; must be preserved during exposure",
      "- **Short gastric vessels**: run within the gastrosplenic ligament; divided superiorly to mobilize the gastric fundus completely for an untwisted, floppy wrap",
    ],
  }, SOURCE),

  sourced({
    id: "block-peh-laparoscopic-sequence",
    type: "sequence",
    heading: "Laparoscopic / robotic PEH repair: step-by-step technique",
    steps: [
      { title: "1. Setup & exposure", detail: "Place patient in supine split-leg/modified lithotomy position with steep **Reverse Trendelenburg**; place subxiphoid liver retractor to elevate the left hepatic lobe." },
      { title: "2. Gastrohepatic dissection", detail: "Incise the **pars flaccida** (inspecting for an accessory/replaced left hepatic artery) and identify the right crural margin." },
      { title: "3. Sac mobilization & hernia reduction", detail: "Dissect the hernia sac off the mediastinum and crura using downward traction on the **sac**, not the stomach; resect/excise the hernia sac **completely** to prevent fluid collection and recurrence." },
      { title: "4. Short gastric vessel division", detail: "Divide gastrosplenic attachments and short gastric vessels to mobilize the gastric fundus completely for a **tension-free fundoplication**." },
      { title: "5. Circumferential esophageal mobilization", detail: "Dissect distal esophagus into posterior mediastinum, encircle with Penrose drain, identify and preserve anterior/posterior vagi, and obtain **≥ 2.5 to 3.0 cm** of tension-free intra-abdominal length (**Collis gastroplasty** if foreshortened)." },
      { title: "6. Crural hiatal closure", detail: "Reapproximate crural pillars posterior to esophagus using **interrupted, pledgeted nonabsorbable sutures** (e.g., 2-0 Ethibond/Prolene) at low pneumoperitoneum, leaving ~1.5 cm space (loosely fitting a **56F–60F** bougie); selective mesh buttress for large/weak defects." },
      { title: "7. Antireflux fundoplication & completion EGD", detail: "Perform retroesophageal **shoeshine maneuver** with mobile fundus; place 56F–60F bougie; construct short (1.5–2.0 cm) floppy wrap (**Nissen 360° for normal motility, Toupet 270° for IEM**, Dor anterior for myotomy); perform intraoperative EGD to confirm wrap symmetry and exclude perforation." },
    ],
  }, SOURCE),

  sourced({
    id: "block-peh-open-sequence",
    type: "sequence",
    heading: "Open transabdominal approach (revisional / emergency)",
    steps: [
      { title: "1. Gastric decompression", detail: "Decompress the distended stomach via **NGT** prior to incision." },
      { title: "2. Laparotomy incision", detail: "Perform an **upper midline laparotomy** incision with appropriate self-retaining retractor exposure." },
      { title: "3. Visceral reduction", detail: "Gently reduce displaced abdominal organs into the peritoneal cavity **without avulsing** visceral capsules or friable gastric wall." },
      { title: "4. Sac excision & vagal preservation", detail: "Incise the phrenoesophageal membrane, clear crural borders, **excise the hernia sac**, and identify and preserve anterior and posterior vagi." },
      { title: "5. Esophageal mobilization & crural repair", detail: "Mobilize the distal esophagus to achieve **> 2.5 cm** intra-abdominal length; close crura with interrupted permanent sutures." },
      { title: "6. Fundic mobilization & wrap calibration", detail: "Divide short gastric vessels, calibrate over a **56F–60F** bougie, and construct a short, floppy Nissen or partial wrap." },
    ],
  }, SOURCE),

  sourced({
    id: "block-peh-gastrostomy-indications",
    type: "bullets",
    heading: "Selective use of gastrostomy (G-tube) & gastropexy",
    items: [
      "**Frail / high-risk patients**: provides rapid fixation and decompression in patients unable to tolerate prolonged dissection or formal fundoplication.",
      "**Emergency volvulus / strangulation**: anterior gastropexy provides immediate **detorsion and anatomical fixation** to the anterior abdominal wall.",
      "**Large Type IV defect tethering**: mechanically tethers the stomach to the anterior abdominal wall following extensive reduction to reduce recurrence risk.",
      "**Decompression / feeding adjunct**: used as a decompressing or enteral feeding adjunct in patients undergoing complex lengthening (Collis gastroplasty) or esophagectomy.",
    ],
  }, SOURCE),

  sourced({
    id: "block-peh-complications-table",
    type: "table",
    heading: "Postoperative complications & evidence-based management",
    columns: ["Complication", "Incidence & Clinical Manifestations", "Underlying Mechanism", "Evidence-Based Management Strategy"],
    rows: [
      ["Capnothorax / Pneumothorax", "**0% to 1.5%**; elevated airway pressure, ETCO₂ rise, hypotension, bulging diaphragm", "**Pleural breach** during mediastinal dissection; CO₂ diffusion into pleural space", "Reduce pneumoperitoneum, add PEEP; insert **tube thoracostomy** if pleura is lacerated or tension physiology fails to resolve"],
      ["Esophageal or Gastric Perforation", "**0% to 4%**; tachycardia, fever, subcutaneous emphysema, peritonitis, purulent drain output", "Direct thermal injury, **excessive traction** on friable gastric wall, or bougie trauma", "Early (<24h): **primary 2-layer repair** with tissue buttress and drainage; Contained: NPO, IV antibiotics, covered esophageal stent"],
      ["Acute Hemorrhage (Splenic / Short Gastrics)", "Uncommon; intraoperative or immediate postop hypotension, falling hematocrit, hemoperitoneum", "**Capsular avulsion** of spleen or short gastric vessel retraction during mobilization", "Direct pressure, topical hemostatics, suture ligation, or **splenectomy** if bleeding is refractory"],
      ["Persistent Postoperative Dysphagia", "Common early (<1 wk); severe if persistent **>1 wk** with solid/liquid dysphagia", "Tissue edema, **excessively tight crural closure** (<1.5 cm space), or tight/twisted fundoplication", "Early (<1 wk): conservative liquid diet; Late (>1 wk): barium esophagram, **serial bougie dilation**; re-exploration if wrap is twisted"],
      ["Hernia Recurrence & Slipped Wrap", "Variable (higher without mesh); recurrent heartburn, regurgitation, dysphagia, chest pain", "**Inadequate esophageal length** (<2.5 cm), crural breakdown, or violent postop retching", "Evaluation with barium swallow, EGD, and manometry; surgical **re-repair** at a high-volume foregut center"],
      ["Post-Vagotomy Gas Bloat / Diarrhea", "Abdominal distension, **inability to belch**, postprandial fullness, explosive watery diarrhea", "Iatrogenic **vagal injury** or altered gastric receptive relaxation and pyloric dysfunction", "Dietary modifications (small frequent meals), promotility agents, and **bile acid sequestrants** (cholestyramine)"],
    ],
  }, SOURCE),

  sourced({
    id: "block-peh-outcomes-guidelines",
    type: "bullets",
    heading: "SAGES guidelines, long-term outcomes, & revisional quality metrics",
    items: [
      "**Long-term satisfaction (>5 years)**: patient satisfaction ranges between **80% and 96%** with marked improvement in quality of life.",
      "**Objective acid normalization**: normalization of distal esophageal acid exposure occurs in **88% to 94%** of patients on postop pH monitoring.",
      "**Symptom control durability**: symptomatic GERD control wanes over extended follow-up (approximately **90% at 3 years to 67% at 7 years**).",
      "**Revisional surgery risks**: revisional procedures carry significantly longer operative times, higher conversion rates to open surgery, and increased 30-day morbidity and mortality.",
      "**High-volume center referral**: complex recurrences or slipped wraps should be managed at high-volume foregut centers.",
      "**Revisional satisfaction metrics**: favorable patient satisfaction (**89% at 18 months**) is achieved following revisional surgery when planned with repeat barium swallow, EGD, and manometry.",
    ],
  }, SOURCE),

  references("block-peh-references", [SOURCE]),
];

export const paraesophagealHerniaRepairTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000000901",
  versionId: "00000000-0000-4000-8000-000000000911",
  slug: "paraesophageal-hernia-repair",
  title: "Paraesophageal Hernia Repair",
  aliases: [
    "paraesophageal hernia",
    "PEH repair",
    "hiatal hernia repair",
    "hiatal hernia",
    "Nissen fundoplication",
    "Toupet fundoplication",
    "Borchardt triad",
    "gastric volvulus",
    "Cameron ulcers",
    "Collis gastroplasty",
  ],
  scoreNodeId: "esophagus-procedures",
  scoreCategory: "SCORE · Esophagus · Operations & Procedures",
  tags: ["esophagus", "hernia", "foregut", "score", "absite", "procedures", "antireflux"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-16T00:00:00.000Z",
});
