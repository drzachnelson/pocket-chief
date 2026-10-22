import { buildTopic, references, sourced } from "@/content/authoring";
import {
  ACG_BARRETT_2022_SOURCE,
  GERD_BARRETT_PACKET_SOURCE as PACKET,
  LYON_CONSENSUS_2_SOURCE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-gerd-summary",
    type: "summary",
    heading: "At a glance",
    text: "**GERD** is reflux of gastric contents causing troublesome symptoms or mucosal injury. **Barrett esophagus** replaces the distal squamous lining with **intestinal metaplasia containing goblet cells**, and it is the precursor of esophageal adenocarcinoma. The surgeon's questions are diagnostic and oncologic: when reflux is objectively proven, who needs a scope, how often a Barrett segment is surveilled, and when dysplasia goes to endoscopic eradication instead of esophagectomy. The Lyon Consensus 2.0 changed the numbers in 2024, so several board answers now diverge from current practice. The operations themselves are in the antireflux procedures topic.",
  }, PACKET),

  sourced({
    id: "block-gerd-barrier",
    type: "bullets",
    heading: "The antireflux barrier",
    items: [
      "**Intrinsic lower esophageal sphincter**: tonically contracted distal smooth muscle.",
      "**Sling fibers of the cardia**: accentuate the **angle of His**.",
      "**Crural diaphragm**: the hiatus, formed mostly by the **right crus** at **T10**, acts as an extrinsic sphincter during raised abdominal pressure. The aortic hiatus is T12.",
      "**Phrenoesophageal ligament**: keeps the distal esophagus in the abdomen. It is the membrane of Laimer-Bertelli — distinct from **Laimer's triangle**, the hypopharyngeal site of Zenker diverticulum.",
    ],
  }, PACKET),

  sourced({
    id: "block-gerd-mechanisms",
    type: "bullets",
    heading: "↳ Why reflux happens",
    items: [
      "**Transient LES relaxations**: vagally mediated, triggered by gastric distension, and the dominant mechanism when resting sphincter tone is normal.",
      "**Hypotensive sphincter**: chronically low resting pressure allows passive reflux.",
      "**Anatomic disruption**: lost intra-abdominal length or a hiatal hernia separates the crura from the sphincter.",
      "A defective sphincter has resting pressure **under 6 mmHg**, total length under 2 cm, or intra-abdominal length under 1 cm; normal resting pressure is about 10 to 35 mmHg.",
      "Sphincter tone falls with supine position, obesity, pregnancy and progesterone, **scleroderma**, calcium channel blockers, nitrates, anticholinergics, fatty food, chocolate, peppermint, caffeine, and alcohol.",
    ],
  }, PACKET),

  sourced({
    id: "block-gerd-epi",
    type: "bullets",
    heading: "Epidemiology and presentation",
    items: [
      "GERD affects roughly **15 to 20%** of Western adults at any given time; up to about two-thirds report reflux symptoms at some point in life.",
      "Typical symptoms are heartburn, regurgitation, and a sour taste; extraesophageal ones are chronic cough, hoarseness, asthma, dental erosion, and globus.",
      "Complications progress from erosive esophagitis to peptic stricture, Barrett metaplasia, and adenocarcinoma.",
      "Barrett is found in about 5 to 15% of chronic GERD patients and 1 to 2% of the general adult population.",
      "Nondysplastic Barrett carries a classically quoted **30- to 60-fold relative risk** of adenocarcinoma but an absolute progression risk of only about **0.2 to 0.5% per year**.",
    ],
  }, PACKET),

  sourced({
    id: "block-gerd-alarm",
    type: "warning",
    tone: "danger",
    heading: "Alarm symptoms go straight to EGD",
    text: "**Dysphagia, odynophagia, weight loss, GI bleeding or anemia, and recurrent vomiting** — or new dyspepsia after 60 — mandate prompt endoscopy rather than an empiric PPI trial.",
  }, PACKET),

  sourced({
    id: "block-gerd-dx-flow",
    type: "flow",
    heading: "Diagnostic logic",
    nodes: [
      { id: "sx", label: "Reflux symptoms" },
      { id: "ppi", label: "No alarm features: empiric PPI trial, diagnostic and therapeutic", tone: "good" },
      { id: "egd", label: "Alarm or refractory symptoms: EGD" },
      { id: "conclusive", label: "LA grade B, C, or D esophagitis, long-segment Barrett, or peptic stricture: GERD confirmed, no pH study needed", tone: "good" },
      { id: "ph", label: "Normal or equivocal EGD: ambulatory pH or pH-impedance monitoring off PPI" },
      { id: "hrm", label: "Before any antireflux operation: high-resolution manometry to exclude achalasia", tone: "caution" },
    ],
    edges: [
      { from: "sx", to: "ppi", label: "No alarm features" },
      { from: "sx", to: "egd", label: "Alarm features" },
      { from: "ppi", to: "egd", label: "Refractory" },
      { from: "egd", to: "conclusive", label: "Severe disease" },
      { from: "egd", to: "ph", label: "Normal or equivocal" },
      { from: "conclusive", to: "hrm", label: "Surgery planned" },
      { from: "ph", to: "hrm", label: "Pathologic reflux, surgery planned" },
    ],
  }, PACKET),

  sourced({
    id: "block-gerd-lyon",
    type: "bullets",
    heading: "Lyon Consensus 2.0 thresholds",
    items: [
      "**Acid exposure time over 6%** is conclusive for GERD; under 4% is normal; 4 to 6% is inconclusive and needs adjunctive evidence.",
      "**LA grade B, C, or D** esophagitis, long-segment Barrett, or a peptic stricture on endoscopy is conclusive for GERD.",
      "Adjunctive evidence includes low mean nocturnal baseline impedance and a low post-reflux swallow-induced peristaltic wave index.",
      "The composite **DeMeester score** was not incorporated; acid exposure time is the primary metric.",
    ],
  }, LYON_CONSENSUS_2_SOURCE),

  sourced({
    id: "block-gerd-splits",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Pathologic acid exposure", "DeMeester score over 14.72; pH under 4 for over 4.5% of the time", "Acid exposure time over 6% (Lyon 2.0), which also predicts surgical outcome better"],
      ["Endoscopy conclusive for GERD", "LA grade C or D, long-segment Barrett, stricture", "LA grade B now counts as well"],
      ["Barrett cancer risk", "30- to 60-fold relative risk", "About 0.2 to 0.5% absolute risk per year, which justifies longer surveillance intervals"],
      ["High-grade dysplasia", "Esophagectomy", "Endoscopic eradication; esophagectomy for T1b or endoscopically unresectable disease"],
      ["Does fundoplication prevent cancer?", "Older teaching held that surgery could regress Barrett", "No: it controls symptoms and heals esophagitis, and surveillance continues for life"],
    ],
  }, PACKET),

  sourced({
    id: "block-gerd-other-workup",
    type: "bullets",
    heading: "Other workup",
    items: [
      "**Barium esophagram** maps hernia type and size, GE junction position, stricture, and diverticula; it is insensitive for mucosal disease.",
      "**Gastric emptying scintigraphy** for suspected gastroparesis: over **10% retention at 4 hours** (or over 60% at 2 hours) is abnormal.",
    ],
  }, PACKET),

  sourced({
    id: "block-gerd-la",
    type: "table",
    heading: "Los Angeles classification of esophagitis",
    columns: ["Grade", "Mucosal breaks"],
    rows: [
      ["A", "5 mm or less, not crossing fold tops"],
      ["B", "Over 5 mm, not crossing fold tops"],
      ["C", "Bridging the tops of 2 or more folds, under 75% of the circumference"],
      ["D", "75% or more of the circumference"],
    ],
  }, PACKET),

  sourced({
    id: "block-gerd-prague",
    type: "bullets",
    heading: "↳ Describing a Barrett segment",
    items: [
      "**Prague C and M criteria**: C is the circumferential extent and M the maximal extent, in centimeters.",
      "**Short-segment** Barrett is under 3 cm; **long-segment** is 3 cm or more.",
    ],
  }, PACKET),

  sourced({
    id: "block-gerd-medical",
    type: "bullets",
    heading: "Medical management and the move to surgery",
    items: [
      "Weight loss is the highest-yield lifestyle change; also elevate the head of the bed, avoid meals within 3 hours of lying down, and avoid triggers.",
      "**PPI once daily, 30 to 60 minutes before the first meal**, for 8 weeks heals esophagitis and relieves symptoms.",
      "Surgery is indicated for objectively confirmed reflux that is PPI-refractory, for patients unable or unwilling to stay on PPIs, for regurgitation-predominant disease, for a large symptomatic hernia, and for complications.",
      "**Achalasia or a major motility disorder** on manometry contraindicates fundoplication.",
    ],
  }, PACKET),

  sourced({
    id: "block-gerd-unconfirmed-warning",
    type: "warning",
    tone: "danger",
    heading: "Do not wrap unconfirmed reflux",
    text: "Operating on \"refractory heartburn\" without **objective proof of reflux** is a classic cause of fundoplication failure. Confirm GERD by endoscopy or pH monitoring, and exclude achalasia by manometry, before every antireflux operation.",
  }, PACKET),

  sourced({
    id: "block-gerd-screening",
    type: "bullets",
    heading: "Barrett screening",
    items: [
      "A single screening endoscopy is suggested for **chronic GERD plus 3 or more risk factors**: male sex, age over 50, White race, tobacco smoking, obesity, and a first-degree relative with Barrett or esophageal adenocarcinoma.",
      "Do not repeat screening after a negative initial endoscopy.",
      "A swallowable nonendoscopic device paired with a biomarker is an acceptable alternative to endoscopy for screening.",
      "**Every diagnosis of dysplasia**, low- or high-grade, must be confirmed by a second expert GI pathologist before acting on it.",
    ],
  }, ACG_BARRETT_2022_SOURCE),

  sourced({
    id: "block-gerd-seattle",
    type: "bullets",
    heading: "Seattle protocol biopsies",
    items: [
      "Nondysplastic Barrett: four-quadrant biopsies **every 2 cm**, plus targeted biopsy of any nodule or irregularity.",
      "Known or suspected dysplasia: four-quadrant biopsies **every 1 cm**.",
    ],
  }, PACKET),

  sourced({
    id: "block-gerd-surveillance",
    type: "table",
    heading: "Barrett management by histology",
    columns: ["Histology", "Management", "Surveillance"],
    rows: [
      ["Nondysplastic", "PPI", "EGD every 3 to 5 years"],
      ["Indefinite for dysplasia", "Optimize the PPI and repeat", "Repeat EGD in 3 to 6 months"],
      ["Low-grade dysplasia", "**Endoscopic eradication preferred**; close surveillance is the alternative", "If surveilled, EGD every 6 to 12 months"],
      ["High-grade dysplasia", "**Endoscopic eradication**: resection of visible lesions, ablation of the flat segment", "Post-eradication schedule"],
      ["T1a adenocarcinoma", "Endoscopic resection with or without ablation, if well or moderately differentiated without lymphovascular invasion", "Post-eradication schedule after resection"],
      ["T1b adenocarcinoma", "**Esophagectomy**, for the high nodal risk", "Oncologic follow-up"],
    ],
  }, PACKET),

  sourced({
    id: "block-gerd-post-eradication",
    type: "bullets",
    heading: "↳ After complete eradication of intestinal metaplasia",
    items: [
      "Baseline high-grade dysplasia or T1a: EGD at **3, 6, and 12 months, then annually**.",
      "Baseline low-grade dysplasia: EGD at **1 and 3 years**.",
      "Ablation is durable but recurrence happens, so surveillance continues.",
    ],
  }, PACKET),

  sourced({
    id: "block-gerd-cancer-warning",
    type: "warning",
    tone: "danger",
    heading: "A wrap is not cancer prevention",
    text: "Antireflux surgery and PPIs control symptoms and heal esophagitis but do **not reliably regress Barrett** or remove adenocarcinoma risk. Never choose fundoplication as a cancer-prevention strategy; **lifelong surveillance** by dysplasia grade continues whether or not the patient was operated on.",
  }, PACKET),

  sourced({
    id: "block-gerd-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "Normal sphincter tone with pathologic reflux: think **transient LES relaxations**.",
      "Scleroderma: aperistaltic esophagus with an incompetent sphincter.",
      "Obese GERD patient (BMI 35 or more): the board answer is **Roux-en-Y gastric bypass**, never sleeve gastrectomy.",
      "Feeding access in a patient who may later need esophagectomy: feeding jejunostomy, not PEG, to preserve the gastric conduit.",
    ],
  }, PACKET),

  sourced({
    id: "block-gerd-mnemonics",
    type: "bullets",
    heading: "Mnemonics",
    items: [
      "**The 3 T's: Transient, Tired, Torn Apart**: the three reflux mechanisms.",
      "**CAN't Keep It Closed**: calcium channel blockers, anticholinergics, nitrates loosen the sphincter.",
      "**DOW-BV Demands a Scope**: dysphagia, odynophagia, weight loss, bleeding, vomiting.",
      "**A Little, B Bigger, C Connecting, D Dominating**: the LA grades.",
      "**4 is the floor, 6 is for sure**: Lyon 2.0 acid exposure time.",
      "**C is Circle, M is Max**: Prague criteria.",
      "**4 Quadrants, Every 2; Every 1 If It's Bad**: Seattle protocol.",
      "**A is Endoscopic, B is Big Surgery**: T1a versus T1b.",
      "**Dysplasia Demands a Double-Check**: second expert pathologist.",
      "**A Wrap Fixes Flux, Not Fate**: fundoplication does not prevent cancer.",
    ],
  }, PACKET),

  references("block-gerd-references", [PACKET, LYON_CONSENSUS_2_SOURCE, ACG_BARRETT_2022_SOURCE]),
];

export const gastroesophagealRefluxAndBarrettEsophagusTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000004440",
  versionId: "00000000-0000-4000-8000-000000004441",
  slug: "gastroesophageal-reflux-and-barrett-esophagus",
  title: "Gastroesophageal Reflux and Barrett Esophagus",
  aliases: [
    "GERD",
    "gastroesophageal reflux",
    "gastroesophageal reflux disease",
    "reflux esophagitis",
    "Barrett esophagus",
    "Barrett's esophagus",
    "Lyon Consensus",
    "acid exposure time",
    "DeMeester score",
    "LA classification",
    "Los Angeles classification",
    "Prague criteria",
    "Seattle protocol",
    "transient LES relaxations",
    "TLESR",
  ],
  scoreNodeId: "esophagus-conditions",
  scoreCategory: "SCORE · Esophagus · Diseases & Conditions",
  tags: ["esophagus", "foregut", "gerd", "barrett", "score", "absite"],
  sourceId: PACKET,
  additionalSourceIds: [LYON_CONSENSUS_2_SOURCE, ACG_BARRETT_2022_SOURCE],
  blocks,
  reviewedAt: "2026-10-21T00:00:00.000Z",
});
