import { buildTopic, references, sourced } from "@/content/authoring";
import {
  ACG_GERD_2022_SOURCE,
  ANTIREFLUX_PROCEDURES_PACKET_SOURCE as PACKET,
  SAGES_GERD_2021_SOURCE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-arp-summary",
    type: "summary",
    heading: "At a glance",
    text: "Antireflux procedures mechanically rebuild the barrier at the gastroesophageal junction, for **objectively proven GERD** or for the anatomic complications of a hiatal hernia. The workup before any wrap is fixed: endoscopy, manometry, pH monitoring unless reflux is already proven, and usually a barium study. The highest-yield controversy is wrap selection — the board answer tailors the wrap to manometry, while current trials and guidelines do not. Obesity changes the operation, magnetic sphincter augmentation has narrow candidacy, and post-fundoplication dysphagia has a timeline worth memorizing.",
  }, PACKET),

  sourced({
    id: "block-arp-workup",
    type: "sequence",
    heading: "Mandatory workup before a wrap",
    steps: [
      { title: "EGD", detail: "Grades esophagitis, excludes Barrett and malignancy, maps the hernia, and assesses the Hill flap valve." },
      { title: "High-resolution manometry", detail: "Mandatory before any wrap: excludes **achalasia** and **absent contractility**, the true contraindications, and defines peristalsis." },
      { title: "Ambulatory pH or pH-impedance monitoring", detail: "Off antisecretory therapy, unless endoscopy already proves GERD. **Acid exposure time over 6%** is conclusive; on prolonged wireless monitoring, 2 or more days over 6% is diagnostic." },
      { title: "Barium esophagram", detail: "Usually obtained to define hernia anatomy and esophageal length." },
    ],
  }, PACKET),

  sourced({
    id: "block-arp-indications",
    type: "bullets",
    heading: "Indications and contraindications",
    items: [
      "Indicated for objective GERD plus any of: **LA grade C or D** esophagitis, a large hiatal hernia, PPI intolerance or a wish to stop medication, or persistent troublesome symptoms with a positive symptom-reflux association.",
      "Best candidates have typical symptoms, a good PPI response, objective reflux, and a hiatal hernia; **regurgitation** responds best, and extraesophageal symptoms respond less reliably.",
      "Before surgery for PPI-refractory symptoms, reconfirm that the symptoms are actually reflux.",
      "**Absolute contraindications**: esophageal outlet obstruction such as achalasia, inability to tolerate general anesthesia, uncorrectable coagulopathy.",
      "**Relative contraindications**: prior upper abdominal surgery, BMI over 35, esophageal dysmotility, normal acid exposure, atypical symptoms, PPI non-response.",
    ],
  }, PACKET),

  sourced({
    id: "block-arp-wraps",
    type: "table",
    heading: "Fundoplication options",
    columns: ["Procedure", "Wrap", "Primary use", "Trade-off"],
    rows: [
      ["**Nissen**", "360° posterior, complete", "Severe GERD: LA C or D, long-segment Barrett, aspiration", "Best reflux control and durability; more early dysphagia and gas-bloat"],
      ["**Toupet**", "270° posterior, partial", "GERD with dysmotility, or a patient prioritizing low dysphagia", "Preserves esophageal clearance"],
      ["**Dor**", "About 180° anterior, partial", "After Heller myotomy; buttressing a mucosal tear", "Safe in achalasia and dysmotility"],
      ["**Belsey Mark IV**", "About 240° transthoracic", "Complex or revisional foregut surgery needing thoracotomy", "Largely historical"],
      ["**Hill repair**", "Posterior gastropexy to the median arcuate ligament", "Recreates the angle of His", "Rarely performed"],
    ],
  }, PACKET),

  sourced({
    id: "block-arp-wrap-split",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Wrap in ineffective esophageal motility", "Nissen is contraindicated; tailor to manometry and use a Toupet", "Ineffective motility is only a relative contraindication: small RCTs and cohorts show no durable dysphagia difference, and the partial-wrap advantage fades by about 36 months"],
      ["Skipping pH testing", "Only with LA grade C or D esophagitis or biopsy-proven Barrett", "LA grade B or higher also confirms GERD (Lyon 2.0)"],
      ["Acid exposure cutoff", "Over 4.5% of time at pH under 4, or DeMeester over 14.72", "Acid exposure time over 6%; DeMeester remains in surgical papers but Lyon 2.0 dropped it"],
      ["Obese GERD patient", "BMI 35 or more: Roux-en-Y gastric bypass, never Nissen", "Bypass or fundoplication are both acceptable above 35, with bypass favored above 50 or with severe comorbidity"],
    ],
  }, PACKET),

  sourced({
    id: "block-arp-wrap-sages",
    type: "prose",
    heading: "↳ What the guideline actually says about wrap choice",
    text: "The SAGES guideline suggests surgery over medical management for chronic or refractory GERD, and once surgery is chosen it leaves **partial or complete fundoplication to shared decision-making** and patient values rather than favoring either. It likewise accepts dividing or not dividing the short gastrics.",
  }, SAGES_GERD_2021_SOURCE),

  sourced({
    id: "block-arp-true-contra",
    type: "warning",
    tone: "danger",
    heading: "What genuinely forbids a complete wrap",
    text: "**Absent contractility** (for example end-stage scleroderma) or **achalasia**. Here use a partial wrap — Toupet or Dor — or no wrap. Isolated ineffective motility is not on this list.",
  }, PACKET),

  sourced({
    id: "block-arp-nissen-steps",
    type: "sequence",
    heading: "Laparoscopic Nissen: key steps",
    steps: [
      { title: "Divide the pars flaccida", detail: "Look for and **preserve a replaced or accessory left hepatic artery** from the left gastric; ligating it risks left lobe ischemia." },
      { title: "Open the phrenoesophageal ligament", detail: "Expose both crura." },
      { title: "Create the retroesophageal window", detail: "Above the median arcuate ligament, protecting the **posterior vagus**." },
      { title: "Divide the short gastrics", detail: "Fully mobilize the fundus." },
      { title: "Mobilize the mediastinal esophagus", detail: "Obtain **2.5 to 3 cm** of tension-free intra-abdominal esophagus; if that fails after maximal mobilization, add a Collis gastroplasty." },
      { title: "Close the crura posteriorly", detail: "Interrupted nonabsorbable sutures, snug enough to admit a 5-mm instrument beside the bougie-filled esophagus." },
      { title: "Build the wrap", detail: "Shoeshine maneuver, then a **floppy, short (1.5 to 2 cm) wrap over a 56 to 60 Fr bougie** with 3 nonabsorbable seromuscular sutures." },
    ],
  }, PACKET),

  sourced({
    id: "block-arp-collis",
    type: "bullets",
    heading: "↳ Collis gastroplasty",
    items: [
      "Indicated for a **true short esophagus**: under 2.5 to 3 cm of intra-abdominal esophagus despite maximal mediastinal mobilization.",
      "A linear stapler fired along the lesser curve beside a bougie creates a **neoesophagus**, and the wrap goes around it.",
    ],
  }, PACKET),

  sourced({
    id: "block-arp-msa",
    type: "bullets",
    heading: "Magnetic sphincter augmentation (LINX)",
    items: [
      "A ring of magnetic titanium beads around the GE junction augments the sphincter while preserving the ability to **belch and vomit**.",
      "Ideal candidate: objective GERD, regurgitation-predominant, **normal motility**, and a small or no hiatal hernia.",
      "Contraindications: allergy to nickel, titanium, stainless steel, or ferrous materials; Barrett esophagus; LA grade C or D esophagitis; absent or ineffective peristalsis, which is needed to open the ring; BMI over 35.",
      "**MRI is limited to 1.5 Tesla.**",
      "About 85% are off PPIs at 5 years; device erosion is about 0.3% at 4 years; gas-bloat is less common than after fundoplication.",
    ],
  }, ACG_GERD_2022_SOURCE),

  sourced({
    id: "block-arp-endoscopic",
    type: "bullets",
    heading: "↳ Endoscopic options",
    items: [
      "**Transoral incisionless fundoplication** suits troublesome regurgitation or heartburn without LA grade C or D esophagitis and without a hiatal hernia over 2 cm.",
      "**Stretta** radiofrequency has inconsistent data and is not recommended as an alternative to medical or surgical therapy.",
    ],
  }, ACG_GERD_2022_SOURCE),

  sourced({
    id: "block-arp-obesity",
    type: "bullets",
    heading: "Obesity and GERD",
    items: [
      "Fundoplication fails more often at BMI 35 or more; **Roux-en-Y gastric bypass** is the generally preferred antireflux operation, because it removes acid-producing stomach from the pouch, diverts bile, and produces weight loss.",
      "Bypass durability for reflux is debated: one Swedish cohort found reflux recurred in about 49% within 2 years.",
      "**Sleeve gastrectomy worsens GERD** and is never the antireflux answer.",
    ],
  }, PACKET),

  sourced({
    id: "block-arp-peh",
    type: "bullets",
    heading: "Paraesophageal hernia: the four principles",
    items: [
      "**Excise the entire sac.**",
      "**Reduce all viscera** into the abdomen.",
      "**Close the crura without tension**, posteriorly, with interrupted nonabsorbable sutures.",
      "**Add a fundoplication**, which anchors the stomach and controls postoperative reflux.",
      "Use mesh selectively — when the crura will not approximate without tension, or with a hiatal surface area over 5.6 cm² — and never encircle the esophagus with it; routine mesh does not lower recurrence, and nonabsorbable mesh adds morbidity.",
    ],
  }, PACKET),

  sourced({
    id: "block-arp-dysphagia",
    type: "flow",
    heading: "Dysphagia after fundoplication",
    nodes: [
      { id: "dys", label: "Dysphagia after fundoplication" },
      { id: "saliva", label: "Cannot swallow saliva: tight or twisted wrap, urgent return to the OR", tone: "caution" },
      { id: "early", label: "Under 1 to 2 weeks: usually edema; soft or liquid diet and wait", tone: "good" },
      { id: "late", label: "Over 6 weeks: barium, EGD, and manometry" },
      { id: "dilate", label: "Intact wrap: endoscopic dilation", tone: "good" },
      { id: "revise", label: "Slipped, twisted, herniated, or disrupted wrap: revision at a foregut center", tone: "caution" },
    ],
    edges: [
      { from: "dys", to: "saliva", label: "Any time" },
      { from: "dys", to: "early", label: "Early" },
      { from: "dys", to: "late", label: "Persistent" },
      { from: "late", to: "dilate", label: "Normal anatomy" },
      { from: "late", to: "revise", label: "Abnormal anatomy" },
    ],
  }, PACKET),

  sourced({
    id: "block-arp-complications",
    type: "bullets",
    heading: "Other complications and aftercare",
    items: [
      "**Capnothorax**: rising end-tidal CO2 and airway pressure with desaturation. Lower the pneumoperitoneum, raise PEEP, and decompress across the hiatus; place a chest tube only for lung injury or persistent instability.",
      "**Esophageal or gastric perforation**: confirm with intraoperative endoscopy and a bubble test, then a two-layer repair buttressed by a Dor or Toupet wrap or omentum, with a drain.",
      "**Gas-bloat** and inability to vomit are more common after a 360° wrap; up to about 46% report some gas-bloat at 10 years. Manage with diet changes, no carbonation or straws, simethicone, and prokinetics.",
      "Recurrence after fundoplication reaches about **20% at 10 years**, and up to about 7% need complex revision.",
      "Give scheduled antiemetics, because retching disrupts the wrap; advance from clear liquids on day 1 to 2 to a soft diet for 4 to 6 weeks, avoiding bread, carbonation, tough meat, and fibrous produce.",
    ],
  }, PACKET),

  sourced({
    id: "block-arp-mnemonics",
    type: "bullets",
    heading: "Mnemonics",
    items: [
      "**I Can't Stop Puking**: intrinsic sphincter, crura, sling fibers, phrenoesophageal membrane — the four parts of the barrier.",
      "**6-2-1, the sphincter's done**: pressure under 6 mmHg, length under 2 cm, intra-abdominal length under 1 cm.",
      "**Scope it, Squeeze it, Sample the acid, Show the anatomy**: EGD, manometry, pH study, barium.",
      "**360 Full, 270 Rear, 180 Front**: Nissen, Toupet, Dor.",
      "**2.5 to 3, or Collis for thee**: the esophageal length rule.",
      "**LINX likes it Little, Lively, and Light**: small hernia, normal motility, mild disease.",
      "**Early is Edema, Saliva is Surgery, Late is Look**: post-fundoplication dysphagia.",
      "**Gas up, pressures up: PEEP up, pneumo down**: capnothorax.",
    ],
  }, PACKET),

  references("block-arp-references", [PACKET, SAGES_GERD_2021_SOURCE, ACG_GERD_2022_SOURCE]),
];

export const antirefluxProceduresTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000004450",
  versionId: "00000000-0000-4000-8000-000000004451",
  slug: "antireflux-procedures",
  title: "Antireflux Procedures",
  aliases: [
    "antireflux surgery",
    "fundoplication",
    "Nissen fundoplication",
    "Toupet fundoplication",
    "Dor fundoplication",
    "Belsey Mark IV",
    "Hill repair",
    "Collis gastroplasty",
    "magnetic sphincter augmentation",
    "LINX",
    "transoral incisionless fundoplication",
    "TIF",
    "Stretta",
    "gas-bloat syndrome",
    "capnothorax",
  ],
  scoreNodeId: "esophagus-procedures",
  scoreCategory: "SCORE · Esophagus · Operations & Procedures",
  tags: ["esophagus", "foregut", "gerd", "antireflux", "score", "absite", "procedures"],
  sourceId: PACKET,
  additionalSourceIds: [SAGES_GERD_2021_SOURCE, ACG_GERD_2022_SOURCE],
  blocks,
  reviewedAt: "2026-10-21T00:00:00.000Z",
});
