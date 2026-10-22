import { buildTopic, references, sourced } from "@/content/authoring";
import { HIATAL_HERNIA_PACKET_SOURCE as PACKET, STYLOPOULOS_PEH_2002_SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-hh-summary",
    type: "summary",
    heading: "At a glance",
    text: "A hiatal hernia is stomach, and sometimes other viscera, pushed through the esophageal hiatus into the posterior mediastinum. The type decides the problem: a **sliding (Type I)** hernia separates the sphincter from the crura and causes reflux, while **paraesophageal (Types II to IV)** hernias are a mechanical problem that obstructs, twists, bleeds, and strangulates. Asymptomatic sliding hernias are left alone. Symptomatic paraesophageal hernias are repaired, and whether to repair the asymptomatic one is the topic's live controversy. The operation itself is in the paraesophageal hernia repair topic.",
  }, PACKET),

  sourced({
    id: "block-hh-mechanism",
    type: "bullets",
    heading: "Mechanism",
    items: [
      "The hiatus widens and the **phrenoesophageal membrane** attenuates with age; that membrane normally anchors the gastroesophageal junction in the abdomen.",
      "In a **sliding hernia** the GE junction rises above the diaphragm, separating the lower esophageal sphincter from the crural diaphragm, which degrades the antireflux barrier and drives **GERD**.",
      "In a **paraesophageal hernia** the fundus and body herniate on lax gastrosplenic and gastrocolic ligaments, which drives obstruction, gastric volvulus, and ischemia.",
      "Contributors are age, raised intra-abdominal pressure (central obesity, chronic cough, straining, heavy lifting), and prior hiatal or foregut operations.",
    ],
  }, PACKET),

  sourced({
    id: "block-hh-types",
    type: "table",
    heading: "Types I to IV",
    columns: ["Type", "Name", "GE junction", "What herniates", "Dominant problem"],
    rows: [
      ["**I**", "Sliding, about 90 to 95% of all hiatal hernias", "Above the diaphragm", "Cardia and GE junction only", "**GERD**; gastric volvulus risk very low"],
      ["**II**", "True (rolling) paraesophageal, rare", "**Normal, intra-abdominal**", "Fundus alongside the esophagus", "Mechanical; high gastric volvulus risk"],
      ["**III**", "Mixed paraesophageal, about 90% of those repaired", "Above the diaphragm", "GE junction and fundus", "Reflux and mechanical; high gastric volvulus risk"],
      ["**IV**", "Complex paraesophageal", "Above the diaphragm", "Stomach plus another organ (colon, omentum, spleen, small bowel, pancreas)", "Multi-organ mechanical; highest gastric volvulus risk"],
    ],
  }, PACKET),

  sourced({
    id: "block-hh-classification-notes",
    type: "bullets",
    heading: "↳ Classification notes",
    items: [
      "Types II to IV together are **paraesophageal hernias**, about 5 to 10% of hiatal hernias in most series and up to about 15% in some; quote a range, not one number.",
      "**Giant hiatal hernia** has no single definition: commonly 30% or more of the stomach in the chest, by some definitions 50%; repair is generally advised once more than 30% has herniated.",
      "The **Hill classification** (I to IV) is a separate endoscopic grading of the gastroesophageal flap valve on retroflexion — not the anatomic types.",
    ],
  }, PACKET),

  sourced({
    id: "block-hh-presentation",
    type: "bullets",
    heading: "Presentation",
    items: [
      "**Type I**: heartburn, regurgitation, water brash, dysphagia.",
      "**Types II to IV**: postprandial fullness, early satiety, epigastric or substernal chest pain, dysphagia, retching, and **dyspnea or exercise intolerance** from intrathoracic gastric compression.",
      "Suspect a paraesophageal hernia in an elderly patient, especially a woman, with postprandial chest pain, early satiety, dyspnea, or unexplained iron-deficiency anemia.",
      "Hiatal hernias are common — estimates run from roughly 10 to 50% of adults — and rise with age and obesity.",
    ],
  }, PACKET),

  sourced({
    id: "block-hh-cameron",
    type: "warning",
    tone: "pearl",
    heading: "Cameron lesions",
    text: "Unexplained chronic **iron-deficiency anemia** with a large hiatal hernia means **Cameron lesions**: linear erosions on the gastric folds where the diaphragm pinches them, from mechanical trauma and local ischemia. They are a classic cause of obscure GI bleeding and are often missed on the first EGD. Treat with a PPI and iron; **repair the hernia** when the anemia is refractory or recurs.",
  }, PACKET),

  sourced({
    id: "block-hh-borchardt",
    type: "warning",
    tone: "danger",
    heading: "Borchardt triad means acute gastric volvulus",
    text: "Severe sudden epigastric pain and distension, **violent retching without vomiting**, and **inability to pass a nasogastric tube** — present in about 70% of acute cases. Gangrene develops in roughly 5 to 28%, so suspected strangulation means an **urgent operation**. If the tube does pass, decompression can bridge to it.",
  }, PACKET),

  sourced({
    id: "block-hh-volvulus",
    type: "table",
    heading: "Gastric volvulus",
    columns: ["Axis", "Rotation", "Frequency", "Association", "Behavior"],
    rows: [
      ["**Organoaxial volvulus**", "Long axis, GE junction to pylorus", "About two-thirds", "Paraesophageal hernia; adults", "Higher risk of **strangulation and ischemia**"],
      ["**Mesenteroaxial volvulus**", "Short axis, antrum over body", "About one-third", "Usually no diaphragmatic defect; children", "Often incomplete or intermittent, with outlet obstruction"],
    ],
  }, PACKET),

  sourced({
    id: "block-hh-volvulus-definition",
    type: "prose",
    text: "Gastric volvulus means rotation of **180 degrees or more**; less than that is gastric malposition, often an incidental finding.",
  }, PACKET),

  sourced({
    id: "block-hh-workup",
    type: "sequence",
    heading: "Workup: anatomy, mucosa, motility",
    steps: [
      { title: "Barium esophagram", detail: "First-line anatomic test: GE junction position, hernia size, axis of any rotation, stricture, transit. Use water-soluble contrast first if perforation is possible." },
      { title: "EGD", detail: "Mucosa: Cameron lesions, esophagitis, Barrett esophagus; measures the GE junction-to-hiatus distance." },
      { title: "High-resolution manometry", detail: "Excludes **achalasia**, which mimics reflux and is worsened by a wrap; **absent contractility** contraindicates a complete fundoplication. Recommended before any antireflux procedure." },
      { title: "CT chest and abdomen", detail: "For strangulation, gastric volvulus, perforation, or complex Type IV anatomy." },
    ],
  }, PACKET),

  sourced({
    id: "block-hh-indications",
    type: "bullets",
    heading: "Who gets repaired",
    items: [
      "**Asymptomatic Type I: no repair.** Operate on a sliding hernia only for medically refractory GERD or complications (severe esophagitis, stricture, Barrett, Cameron anemia).",
      "**Symptomatic Types II to IV: repair.** Urgent or emergent for gastric volvulus, obstruction, bleeding with instability, ischemia, or strangulation.",
      "Before calling a paraesophageal hernia asymptomatic, ask about dyspnea, exercise intolerance, and anemia — many patients attribute them to age.",
      "Elective repair carries about **0.6% operative mortality** against about 4.5% nonelective, and up to 6.7% emergent, with textbook-outcome rates falling from 88% to 47%.",
    ],
  }, PACKET),

  sourced({
    id: "block-hh-classic-peh",
    type: "prose",
    heading: "Board answer versus current practice: the asymptomatic paraesophageal hernia",
    text: "Older teaching repaired every paraesophageal hernia to prevent fatal gastric volvulus. A 2002 Markov analysis then found emergency-surgery mortality overestimated (**5.4%, not 17%**), an annual risk of needing emergency surgery of about **1.1%**, and observation the better strategy in **83%** of patients — the board answer for a minimally symptomatic hernia ever since.",
  }, STYLOPOULOS_PEH_2002_SOURCE),

  sourced({
    id: "block-hh-current-peh",
    type: "prose",
    text: "The pendulum has swung back toward repair in fit patients. A 2024 updated Markov analysis found elective laparoscopic repair increases life expectancy over observation in healthy patients aged 40 to 90. The 2023 EAES rapid guideline conditionally suggests surgery for asymptomatic or minimally symptomatic Types II to IV with at least half the stomach in the chest, but **strongly recommends conservative management in frail patients**. The 2024 SAGES guideline relies on shared decision-making on very low-certainty evidence. If the question asks for the classic answer, it is observation; if it describes a fit patient under current guidelines, offer elective repair.",
  }, PACKET),

  sourced({
    id: "block-hh-recurrence",
    type: "bullets",
    heading: "After repair",
    items: [
      "Radiographic recurrence after large-hernia repair reaches about **40% at 5 years**, though most recurrences are small and asymptomatic.",
      "Evaluate symptomatic recurrence with barium swallow and EGD, adding manometry as needed; reoperate only for severe symptoms or wrap failure.",
    ],
  }, PACKET),

  sourced({
    id: "block-hh-mnemonics",
    type: "bullets",
    heading: "Mnemonics",
    items: [
      "**1 Slides, 2 Rolls, 3 Does Both, 4 Brings Friends**: the four types.",
      "**The 3 P's: Pain, Puking that isn't, Pipe that won't pass**: Borchardt triad.",
      "**O is Long, Older, and Occludes; M is Short, Smaller, and Stops the Outlet**: the two gastric volvulus axes.",
      "**Cameron is Crushed at the Crura, Causing Chronic Anemia.**",
      "**Stylopoulos Said Watch; DeMeester Says Repair the Fit; Frail, Forget It**: the asymptomatic hernia eras.",
      "**Elective Under 1, Emergency Around 5 to 7**: the mortality gap that argues for elective repair.",
      "**30 in the Chest is Giant**: the giant hernia threshold.",
    ],
  }, PACKET),

  references("block-hh-references", [PACKET, STYLOPOULOS_PEH_2002_SOURCE]),
];

export const hiatalHerniasTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000004430",
  versionId: "00000000-0000-4000-8000-000000004431",
  slug: "hiatal-hernias",
  title: "Hiatal Hernias",
  aliases: [
    "hiatal hernia",
    "sliding hiatal hernia",
    "type I hiatal hernia",
    "giant hiatal hernia",
    "Borchardt triad",
    "gastric volvulus",
    "organoaxial volvulus",
    "mesenteroaxial volvulus",
    "Cameron lesions",
    "Cameron ulcers",
    "Hill classification",
    "asymptomatic paraesophageal hernia",
  ],
  scoreNodeId: "esophagus-conditions",
  scoreCategory: "SCORE · Esophagus · Diseases & Conditions",
  tags: ["esophagus", "hernia", "foregut", "score", "absite"],
  sourceId: PACKET,
  additionalSourceIds: [STYLOPOULOS_PEH_2002_SOURCE],
  blocks,
  reviewedAt: "2026-10-21T00:00:00.000Z",
});
