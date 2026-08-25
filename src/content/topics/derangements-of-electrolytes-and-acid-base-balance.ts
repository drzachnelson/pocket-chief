import { buildTopic, references, sourced } from "@/content/authoring";
import { CRITICAL_CARE_FLUID_ACID_BASE_PACKET_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-electrolytes-summary",
    type: "summary",
    heading: "At a glance",
    text: "Fluid and electrolyte management rests on knowing where water sits — **two-thirds intracellular, one-third extracellular** — and on a short list of numeric thresholds that drive resuscitation, repletion, and acid-base correction. Board-classic teaching pairs specific fluids to specific losses, but current critical-care evidence favors **balanced crystalloids over normal saline** as the default resuscitation fluid, with saline reserved for specific exceptions.",
  }, SOURCE),

  sourced({
    id: "block-electrolytes-compartments",
    type: "bullets",
    heading: "Body fluid compartments",
    items: [
      "**Total body water (TBW)**: 50–60% of body weight — use 0.6 for males and 0.5 for females, lower in obesity and higher in infants.",
      "**Intracellular fluid (ICF)**: two-thirds of TBW, roughly 40% of body weight. Principal cation: potassium, roughly 140–150 mEq/L.",
      "**Extracellular fluid (ECF)**: one-third of TBW, roughly 20% of body weight. Principal cation: sodium, roughly 140 mEq/L.",
      "**Interstitial fluid**: three-quarters of ECF, roughly 15% of body weight — the site of \"third-space\" sequestration.",
      "**Plasma**: one-quarter of ECF, roughly 5% of body weight. Total blood volume is roughly 7% of body weight — about 5 L in a 70 kg adult, and 80 mL/kg in pediatrics.",
      "**Serum osmolality** = 2 × [Na⁺] + (glucose ÷ 18) + (BUN ÷ 2.8); normal range 280–295 mOsm/kg.",
    ],
  }, SOURCE),

  sourced({
    id: "block-electrolytes-crystalloid-table",
    type: "table",
    heading: "Crystalloid compositions",
    columns: ["Solution", "Na⁺ (mEq/L)", "Cl⁻ (mEq/L)", "K⁺ (mEq/L)", "Ca²⁺ (mEq/L)", "Buffer & notes"],
    rows: [
      ["0.9% normal saline", "154", "154 (matches Na⁺ — the source of hyperchloremic acidosis)", "0", "None", "No buffer; pH ≈ 5.5"],
      ["Lactated Ringer's", "130", "109", "4", "2.7", "28 mEq/L lactate buffer; pH ≈ 6.5"],
      ["3% hypertonic saline", "513", "513 (matches Na⁺)", "0", "None", "No buffer"],
    ],
  }, SOURCE),

  sourced({
    id: "block-electrolytes-maintenance",
    type: "bullets",
    heading: "Maintenance fluids & daily requirements",
    items: [
      "**Maintenance (4-2-1 rule)**: 4 mL/kg/h for the first 10 kg, 2 mL/kg/h for the next 10 kg, and 1 mL/kg/h for each kilogram over 20. Adult shortcut: weight in kg plus 40 equals mL/h.",
      "**Daily electrolyte requirements**: sodium 1–2 mEq/kg/day; potassium 0.5–1 mEq/kg/day.",
      "**Postoperative IV fluids**: Lactated Ringer's intraoperatively and for the first 24 hours, then D5 half-normal saline with 20 mEq KCl. Maintenance fluid should contain glucose in the postoperative period until oral intake resumes — the roughly 150 g/day of dextrose stimulates insulin and spares protein catabolism.",
      "**Insensible losses**: roughly 10 mL/kg/day, three-quarters through the skin and one-quarter respiratory; increased by an open abdomen, fever, burns, and mechanical ventilation.",
      "**GI replacement, cc-for-cc**: gastric or NG tube losses replace with 0.9% saline plus 10 mEq KCl per liter; biliary, pancreatic, and duodenal losses are high in bicarbonate and replace with Lactated Ringer's (or D5W with bicarbonate); diarrhea and lower-GI fistula losses are high in potassium and bicarbonate and replace with Lactated Ringer's plus potassium.",
      "**Board-classic versus current evidence — balanced crystalloid versus normal saline**: board-classic teaching pairs specific fluids to specific losses. Current critical-care evidence favors balanced crystalloids (Lactated Ringer's or Plasma-Lyte) over 0.9% saline as the default resuscitation fluid — the SMART trial (n = 15,802) showed a lower composite of death, renal replacement therapy, or persistent renal dysfunction (14.3% versus 15.4%) with balanced fluids, and the 2026 Surviving Sepsis Campaign now suggests balanced crystalloids over saline. **Exception: use 0.9% saline in traumatic brain injury**, where balanced solutions are relatively hypotonic and risk cerebral edema (a harm signal in BaSICS), and in hyponatremic or alkalotic patients.",
    ],
  }, SOURCE),

  sourced({
    id: "block-electrolytes-formulas",
    type: "bullets",
    heading: "Fluid deficit & resuscitation formulas",
    items: [
      "**Free water deficit (L)** = TBW × ([Na⁺] ÷ 140 − 1).",
      "**Sodium deficit (mEq)** = 0.6 × lean body weight (kg) × (120 − [Na⁺]).",
      "**Parkland burn formula**: 4 mL × kg × %TBSA (second degree or greater) of Lactated Ringer's over 24 hours from the time of injury — half over the first 8 hours, half over the next 16 hours — titrated to a urine output of 0.5 mL/kg/h in adults.",
    ],
  }, SOURCE),

  sourced({
    id: "block-electrolytes-sodium",
    type: "bullets",
    heading: "Sodium disorders",
    items: [
      "**Hyponatremia (Na⁺ < 135)**",
      "- **Pseudohyponatremia** from severe hyperglycemia or hyperlipidemia: correct by adding roughly 2 mEq/L of sodium for every 100 mg/dL of glucose above 100 (or a 1.6 correction factor).",
      "- **SIADH (euvolemic)**: urine osmolality exceeds serum osmolality, with a high urine sodium. Treat with fluid restriction (500–1000 mL/day), oral urea, or vaptans. **Board pearl: 0.9% saline can worsen SIADH.**",
      "- **Severe or symptomatic (seizure, coma)**: 3% saline 100–150 mL bolus, repeated up to 2–3 times, targeting a rise of 4–6 mEq/L in the first 1–2 hours to reverse cerebral edema.",
      "- **Chronic correction limits**: no more than 10–12 mEq/L per 24 hours and no more than 18 mEq/L per 48 hours; no more than 8 mEq/L per 24 hours in patients at high risk of osmotic demyelination syndrome (alcoholism, malnutrition, liver disease, hypokalemia, or a starting sodium ≤ 105) to prevent osmotic demyelination syndrome (central pontine myelinolysis).",
      "- **Board-classic versus current evidence — correction rate**: classic teaching rigidly caps correction to prevent osmotic demyelination syndrome. A 2025 meta-analysis of 16 cohort studies found slower correction associated with higher in-hospital mortality, without a correspondingly large increase in osmotic demyelination syndrome, which stays rare even with rapid correction. Guidelines still endorse the traditional caps, so answer the conservative limits on the boards while recognizing the evolving evidence.",
      "**Hypernatremia (Na⁺ > 145)**",
      "- **Diabetes insipidus**: high serum osmolality with an inappropriately dilute urine. Treat with free water or D5W, plus DDAVP for central diabetes insipidus.",
      "- **Correction rate**: no more than 0.5 mEq/L/h, and a maximum of roughly 10–12 mEq/L/day, to prevent cerebral edema.",
    ],
  }, SOURCE),

  sourced({
    id: "block-electrolytes-potassium",
    type: "bullets",
    heading: "Potassium disorders",
    items: [
      "**Hyperkalemia (K⁺ > 5.0)**",
      "- **ECG progression**: peaked T waves → PR prolongation → QRS widening → sine wave or ventricular fibrillation.",
      "- **Membrane stabilization**: IV calcium gluconate or calcium chloride — the first drug given when ECG changes are present or potassium is ≥ 6.5.",
      "- **Intracellular shift**: regular insulin 10 units with D50, plus nebulized albuterol (synergistic with insulin), with sodium bicarbonate offering limited or uncertain benefit, mainly if the patient is acidotic.",
      "- **Elimination**: a loop diuretic, sodium zirconium cyclosilicate or patiromer, or hemodialysis for definitive removal.",
      "- **Watch for insulin-induced hypoglycemia**, especially in non-diabetic patients with a low baseline glucose.",
      "- **Board-classic versus current evidence — Kayexalate and calcium**: sodium polystyrene sulfonate (Kayexalate) is no longer recommended for acute hyperkalemia given questionable efficacy and GI necrosis risk; sodium zirconium cyclosilicate and patiromer are the preferred binders. No randomized trial proves a clinical-outcome benefit from IV calcium, but it remains standard of care and should not be withheld.",
      "**Hypokalemia (K⁺ < 3.5)**",
      "- **ECG findings**: flat or absent T waves, ST depression, U waves, and a prolonged QT progressing to torsades.",
      "- **Check and replete magnesium first** — hypomagnesemia causes refractory hypokalemia.",
      "- **Repletion rate**: peripheral, up to 10–20 mEq/h (with telemetry above 10 mEq/h); central, up to 40 mEq/h. Rule of thumb: 40 mEq raises serum potassium by roughly 0.4 mEq/L.",
    ],
  }, SOURCE),

  sourced({
    id: "block-electrolytes-calcium",
    type: "bullets",
    heading: "Calcium disorders",
    items: [
      "**Corrected calcium** = total calcium + 0.8 × (4.0 − albumin).",
      "**Hypercalcemia (> 10.5)**",
      "- **Etiology**: the outpatient most common cause is primary hyperparathyroidism (a solitary adenoma more often than hyperplasia); the inpatient most common cause is malignancy, via PTHrP from breast or squamous lung cancer more often than osteolytic lesions.",
      "- **Symptoms**: \"stones, bones, abdominal groans, and psychiatric overtones,\" plus a shortened QT interval.",
      "- **Treatment sequence**: isotonic saline, a 1–2 L bolus then 200–500 mL/h targeting a urine output of 100–150 mL/h, which lowers calcium roughly 1–1.5 mg/dL per 24 hours; a loop diuretic only after euvolemia is achieved, not routinely; calcitonin 4–8 U/kg every 6–12 hours for the fastest onset (4–6 hours), with tachyphylaxis after 48 hours; zoledronic acid 4 mg IV over 15 minutes as the preferred bisphosphonate, with onset in 24–72 hours and normalization in 80–90% of patients, given concurrently with hydration; denosumab for bisphosphonate-refractory hypercalcemia of malignancy or a GFR under 30; and glucocorticoids for vitamin D- or 1,25-mediated hypercalcemia, as in lymphoma or granulomatous disease.",
      "- **Board pearl: avoid Lactated Ringer's**, which contains calcium.",
      "**Hypocalcemia (< 8.4)**",
      "- **Symptoms**: perioral numbness first, hyperreflexia, a prolonged QT, Chvostek sign (facial tap), and Trousseau sign (carpopedal spasm with a BP cuff).",
      "- **Etiology**: post-thyroidectomy or post-parathyroidectomy parathyroid injury, pancreatitis, and massive transfusion from citrate binding.",
      "- **Treatment**: IV calcium gluconate; give calcium roughly every 3–4 units of blood in a massive transfusion.",
    ],
  }, SOURCE),

  sourced({
    id: "block-electrolytes-refeeding",
    type: "bullets",
    heading: "Phosphate, magnesium & refeeding syndrome",
    items: [
      "**Pathophysiology**: in malnourished patients, refeeding triggers an insulin surge that drives phosphate, magnesium, and potassium intracellularly.",
      "**Presentation**: severe hypophosphatemia, hypomagnesemia, and hypokalemia can cause failure to wean from the ventilator (diaphragmatic weakness), arrhythmia, and encephalopathy; thiamine depletion can produce Wernicke's encephalopathy.",
      "**Management**: start \"low and slow\" — 100–150 g of dextrose or 10–20 kcal/kg for the first 24 hours, advancing roughly one-third of the goal every 1–2 days. Check potassium, magnesium, and phosphate before feeding, and monitor every 12 hours for 3 days in high-risk patients, delaying or holding calorie advancement if any is severely low. Give thiamine 100 mg before feeding — or before any dextrose-containing IV fluid — and continue for 5–7 days. Prophylactic electrolyte dosing: potassium 2–4, phosphate 0.3–0.6, and magnesium 0.2–0.4 mmol/kg/day.",
    ],
  }, SOURCE),

  sourced({
    id: "block-electrolytes-acidbase-table",
    type: "table",
    heading: "Acid-base disorders (normal: pH 7.35–7.45, PCO₂ 40, HCO₃⁻ 24)",
    columns: ["Disorder", "pH", "PCO₂", "HCO₃⁻", "Compensation"],
    rows: [
      ["Metabolic acidosis", "↓ (acidemic)", "↓ (compensatory)", "↓ (primary disorder)", "Hyperventilation, minutes: Winter's formula PCO₂ = 1.5 × HCO₃⁻ + 8 ± 2"],
      ["Metabolic alkalosis", "↑ (alkalemic)", "↑ (compensatory)", "↑ (primary disorder)", "Hypoventilation, minutes"],
      ["Respiratory acidosis", "↓ (acidemic)", "↑ (primary disorder)", "↑ (compensatory)", "Renal HCO₃⁻ retention, hours to days"],
      ["Respiratory alkalosis", "↑ (alkalemic)", "↓ (primary disorder)", "↓ (compensatory)", "Renal HCO₃⁻ excretion, hours to days"],
    ],
  }, SOURCE),

  sourced({
    id: "block-electrolytes-acidbase-detail",
    type: "bullets",
    heading: "↳ Acid-base disorders in detail",
    items: [
      "**Anion gap** = Na⁺ − (Cl⁻ + HCO₃⁻), normal 8–16.",
      "**High anion gap — MUDPILES**: methanol, uremia, DKA, paraldehyde, isoniazid or iron, lactic acidosis from tissue hypoperfusion (the most common cause in surgery), ethylene glycol, and salicylates.",
      "**Resuscitation for high-anion-gap acidosis**: restore perfusion, transfuse in a 1:1:1 ratio for hemorrhagic shock, minimize excess non-buffered crystalloid, and maintain pH above 7.20.",
      "**Non-anion-gap (hyperchloremic) acidosis**: lower GI losses (diarrhea, a high-output ileostomy, a pancreatic or small-bowel fistula), acetazolamide, rapid 0.9% saline administration, and an ileal conduit.",
      "**Metabolic alkalosis** is a contraction alkalosis with acid and chloride depletion. Upper GI losses — NG suction, emesis, pyloric stenosis — produce a hypochloremic, hypokalemic metabolic alkalosis with paradoxical aciduria, because aldosterone drives hydrogen and potassium loss to retain sodium and volume. Treat with 0.9% saline, since replacing chloride is critical, plus potassium chloride — one of the specific indications where saline is preferred.",
      "**Respiratory acidosis** comes from alveolar hypoventilation — opioids, splinting, chest wall injury, pneumothorax, or hemothorax. Treat by increasing minute ventilation, giving naloxone, or placing a chest tube. Acute compensation: ΔpH = (PCO₂ − 40) × 0.08; chronic compensation uses a factor of 0.03.",
      "**Respiratory alkalosis** comes from hyperventilation — pain, anxiety, sepsis, or altitude.",
    ],
  }, SOURCE),

  sourced({
    id: "block-electrolytes-resuscitation-endpoints",
    type: "bullets",
    heading: "Resuscitation endpoints & transfusion",
    items: [
      "**Endpoints**: urine output ≥ 0.5 mL/kg/h in adults (> 1 mL/kg/h in children, > 2 mL/kg/h in infants under 6 months); MAP > 65; heart rate < 100; lactate clearance to below 2.0 mmol/L; and a normalizing base deficit.",
      "**Oxyhemoglobin curve**: a right shift, increasing oxygen unloading, comes from increased CO₂, temperature, and 2,3-DPG, and decreased pH (the Bohr effect). A left shift, increasing hemoglobin's affinity for oxygen, comes from alkalosis, hypothermia, decreased 2,3-DPG, and carbon monoxide.",
      "**Massive transfusion protocol**: a 1:1:1 ratio of pRBC, FFP, and platelets — the PROPPR trial showed no difference in 24-hour or 30-day mortality versus a 1:1:2 ratio, but more hemostasis (86% versus 78%) and fewer exsanguination deaths (9.2% versus 14.6%), making it the standard of care.",
      "**Tranexamic acid**: 1 g IV over 10 minutes within 3 hours of injury, then 1 g over 8 hours.",
    ],
  }, SOURCE),

  sourced({
    id: "block-electrolytes-warning",
    type: "warning",
    tone: "danger",
    heading: "Failure to wean plus malnutrition means think refeeding",
    text: "A malnourished patient who is newly started on tube feeds and cannot wean from the ventilator has **refeeding hypophosphatemia** until proven otherwise. The insulin surge from feeding drives **phosphate, magnesium, and potassium** intracellularly, and diaphragmatic weakness from hypophosphatemia is a common, under-recognized cause of failure to wean.",
  }, SOURCE),

  sourced({
    id: "block-electrolytes-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "**NG suction or vomiting → think hypochloremic, hypokalemic metabolic alkalosis with paradoxical aciduria.**",
      "**Refractory hypokalemia → check magnesium.**",
      "**Hyperkalemia with ECG changes → IV calcium first.**",
      "**Post-thyroidectomy perioral tingling → hypocalcemia — check Chvostek and Trousseau signs.**",
      "**Inpatient hypercalcemia → malignancy (PTHrP); outpatient hypercalcemia → primary hyperparathyroidism.**",
      "**Hypercalcemia: avoid Lactated Ringer's, which has calcium. Hyponatremia, alkalosis, or TBI: use normal saline, not a balanced fluid.**",
      "**Failure to wean, malnourished, new tube feeds → refeeding hypophosphatemia.**",
      "**Board-classic versus current, in short**: Kayexalate is out — use sodium zirconium cyclosilicate or patiromer; balanced crystalloids are preferred over normal saline except in traumatic brain injury; and rapid hyponatremia correction may lower mortality, but the boards still want the conservative correction limits.",
    ],
  }, SOURCE),

  references("block-electrolytes-references", [SOURCE]),
];

export const derangementsOfElectrolytesAndAcidBaseBalanceTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000001601",
  versionId: "00000000-0000-4000-8000-000000001611",
  slug: "derangements-of-electrolytes-and-acid-base-balance",
  title: "Derangements of Electrolytes and Acid-Base Balance",
  aliases: ["fluid and electrolyte disorders", "acid-base disorders", "hyponatremia", "hypernatremia", "hyperkalemia", "hypokalemia", "hypercalcemia", "hypocalcemia", "refeeding syndrome", "anion gap", "MUDPILES", "metabolic acidosis", "metabolic alkalosis", "respiratory acidosis", "respiratory alkalosis", "Parkland formula", "free water deficit", "osmotic demyelination syndrome", "central pontine myelinolysis", "SIADH", "diabetes insipidus"],
  scoreNodeId: "critical-care-conditions",
  scoreCategory: "SCORE · Surgical Critical Care · Diseases & Conditions",
  tags: ["surgical-critical-care", "fluids", "electrolytes", "acid-base", "absite", "score", "icu"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-25T00:00:00.000Z",
});
