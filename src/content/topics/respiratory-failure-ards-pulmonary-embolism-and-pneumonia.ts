import { buildTopic, references, sourced } from "@/content/authoring";
import { CRITICAL_CARE_RESPIRATORY_FAILURE_PACKET_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-respfailure-summary",
    type: "summary",
    heading: "At a glance",
    text: "This module spans four related critical-care pulmonary problems: respiratory failure fundamentals, **ARDS**, **pulmonary embolism**, and **pneumonia**. The single highest-yield oxygenation distinction is that **shunt does not correct with 100% FiO₂, while V/Q mismatch does**. In ARDS, **hyaline membranes are pathognomonic**, and **driving pressure under 15 cmH₂O** is the strongest ventilator-associated mortality mediator. In PE, hemodynamic instability — not anatomy alone — drives the decision to thrombolyse.",
  }, SOURCE),

  sourced({
    id: "block-respfailure-mechanisms",
    type: "bullets",
    heading: "Respiratory failure: definitions, types & mechanisms of hypoxemia",
    items: [
      "**Respiratory failure** is the inability of the respiratory system to meet oxygenation, ventilation, or metabolic demand.",
      "**Type 1 (hypoxemic)**: PaO₂ < 60 mmHg — the most common perioperative form, driven by shunt and V/Q mismatch.",
      "**Type 2 (hypercapnic)**: PaCO₂ > 50 mmHg without chronic compensation, driven by hypoventilation and dead space.",
      "**Type 3 (perioperative)** is atelectasis-related; **Type 4** is shock or hypoperfusion — classic ICU teaching subtypes.",
      "**V/Q mismatch** is the most common cause of hypoxemia overall.",
      "**Shunt (V/Q → 0)**: perfused but unventilated alveoli, as in atelectasis, ARDS, pneumonia, or a mucus plug. The classic distinction: shunt hypoxemia does not correct with 100% FiO₂.",
      "**Hypoventilation** raises PaCO₂, corrects with supplemental oxygen, and has a normal A–a gradient.",
      "**Diffusion impairment**: alveolar-capillary membrane disease.",
      "**Low inspired oxygen or low mixed venous oxygen.**",
      "**Dead space (V/Q → ∞)**: ventilated but unperfused, as in PE, excess PEEP, or shock — it primarily raises PaCO₂.",
    ],
  }, SOURCE),

  sourced({
    id: "block-respfailure-preop",
    type: "bullets",
    heading: "Preoperative optimization & indications for intubation",
    items: [
      "**Functional threshold**: the ability to climb 2 flights of stairs — roughly 4 METs — indicates acceptable risk.",
      "**Smoking cessation**: ideally 4 to 8 weeks preoperatively; cessation under 4 weeks can transiently increase secretions, a board-classic caveat.",
      "**OSA screening**: the STOP-Bang questionnaire; continue CPAP perioperatively.",
      "**COPD or asthma**: continue inhaled bronchodilators on the day of surgery; give stress-dose steroids if the patient took systemic steroids within the prior 6 months; favor regional or neuraxial anesthesia.",
      "**Best predictors of postoperative pulmonary complications**: an upper abdominal or thoracic incision, low albumin (< 3.5 g/dL), functional dependence, COPD, and age.",
      "**Indications for intubation — memorize the five**: failure to protect the airway (loss of reflexes, GCS depression); oxygenation failure refractory to noninvasive support; ventilation failure (progressive hypercapnic acidosis); inability to clear secretions or maintain pulmonary toilet; and an anticipated clinical course, or the need to decrease myocardial work in shock.",
      "**HFNC, CPAP, and BiPAP** can prevent reintubation, but should not delay intubation in a deteriorating patient.",
    ],
  }, SOURCE),

  sourced({
    id: "block-respfailure-berlin-table",
    type: "table",
    heading: "ARDS — the Berlin definition (all four required)",
    columns: ["Criterion", "Requirement"],
    rows: [
      ["Timing", "Within 1 week of a known insult, or new or worsening respiratory symptoms"],
      ["Imaging", "Bilateral opacities not fully explained by effusion, collapse, or nodules"],
      ["Origin of edema", "Not fully explained by cardiac failure or fluid overload — echo if no risk factor is present"],
      ["Oxygenation", "PaO₂/FiO₂ measured on PEEP ≥ 5 cmH₂O"],
    ],
  }, SOURCE),

  sourced({
    id: "block-respfailure-ards-pathophys",
    type: "bullets",
    heading: "↳ ARDS severity, pathophysiology & triggers",
    items: [
      "**Severity strata, with validated mortality**: mild, 200 < P/F ≤ 300, mortality 27%; moderate, 100 < P/F ≤ 200, mortality 32%; severe, P/F ≤ 100, mortality 45%.",
      "**Board-classic versus current**: the AECC term \"acute lung injury\" and the PAWP ≤ 18 mmHg requirement were removed in the 2012 Berlin definition. A 2023 \"New Global Definition\" adds an SpO₂/FiO₂ ≤ 315 criterion, high-flow nasal oxygen ≥ 30 L/min, and lung ultrasound — but Berlin remains the board-classic answer.",
      "**Exudative phase (days 0–7)**: capillary leak, proteinaceous edema, and hyaline membranes — pathognomonic — with neutrophil-driven injury.",
      "**Proliferative phase (days 7–14)**: type II pneumocyte proliferation and myofibroblasts.",
      "**Fibrotic phase (beyond 14 days)**: collagen deposition and honeycombing.",
      "**Most common triggers**: pneumonia (direct) and extrapulmonary sepsis (indirect) are the leading causes, along with aspiration, trauma, pancreatitis, massive transfusion or TRALI, and burns.",
    ],
  }, SOURCE),

  sourced({
    id: "block-respfailure-ards-ventilation",
    type: "bullets",
    heading: "↳ ARDS management: ventilation & PEEP",
    items: [
      "**Lung-protective ventilation (ARDSNet/ARMA trial)** is the cornerstone: a tidal volume of 4–8 mL/kg predicted body weight, targeting roughly 6 mL/kg — the 2024 ATS and 2023 ESICM guidelines both state the range as 4–8 mL/kg PBW, while board-classic ARMA teaching is \"6 mL/kg.\"",
      "**Plateau pressure < 30 cmH₂O.**",
      "**Permissive hypercapnia**, tolerating a pH ≥ 7.20.",
      "**Driving pressure (plateau pressure minus PEEP) < 15 cmH₂O** is the strongest physiologic mortality mediator.",
      "**ARMA reduced mortality from roughly 40% to roughly 31%**, comparing 6 versus 12 mL/kg.",
      "**PEEP**: use higher PEEP without routine recruitment maneuvers in moderate-to-severe ARDS; prolonged recruitment maneuvers are not recommended, since they may cause harm.",
    ],
  }, SOURCE),

  sourced({
    id: "block-respfailure-ards-adjuncts",
    type: "bullets",
    heading: "↳ ARDS management: prone positioning, adjuncts & prognosis",
    items: [
      "**Prone positioning (PROSEVA trial)**: indicated for P/F < 150 with FiO₂ ≥ 0.6 and PEEP ≥ 5, applied for at least 16 hours per day and started early — within roughly 36 hours. Mortality: 28-day 16.0% versus 32.8%, and 90-day 23.6% versus 41.0%.",
      "**Neuromuscular blockade**: short-term use for severe ARDS or ventilator dyssynchrony; current guidance favors intermittent boluses over a continuous infusion.",
      "**Corticosteroids**: a 2024 SCCM focused update found corticosteroids probably reduce 28-day mortality (relative risk 0.82), favors a longer course (beyond 7 days), and removed the prior P/F < 200 qualifier. DEXA-ARDS used dexamethasone 20 mg daily for 5 days then 10 mg for 5 days, reducing 60-day mortality from 36% to 21% and adding more ventilator-free days — corticosteroids are now standard of care in COVID-19 ARDS.",
      "**Refractory hypoxemia rescue**: inhaled pulmonary vasodilators (inhaled nitric oxide or inhaled epoprostenol) improve oxygenation without a mortality benefit; VV-ECMO is reserved for selected severe ARDS.",
      "**Not recommended**: high-frequency oscillatory ventilation (a strong recommendation against — it may increase mortality), beta-2 agonists, statins, and surfactant, none of which show benefit.",
      "**Prognosis**: overall mortality is roughly 30–45%, depending on severity. Long-term survivors face ICU-acquired weakness (critical illness polyneuropathy or myopathy), cognitive impairment, and PTSD.",
    ],
  }, SOURCE),

  sourced({
    id: "block-respfailure-pe-pathophys",
    type: "bullets",
    heading: "Pulmonary embolism: definition, pathophysiology & risk stratification",
    items: [
      "**Pulmonary embolism** is occlusion of the pulmonary arterial bed, most often by thrombus, but also by fat, air, tumor, or amniotic fluid.",
      "**Hypoxemia mechanisms**: dead space (V/Q → ∞) plus surfactant loss and atelectasis causing shunt.",
      "**Hemodynamics**: an acute rise in pulmonary vascular resistance increases RV afterload, causing RV dilation and septal bowing — RV failure is the leading cause of death from PE.",
      "**Virchow triad**: stasis, endothelial injury, and hypercoagulability.",
      "**High-risk PE definition**: a systolic BP under 90 mmHg (or a drop over 40 mmHg) for more than 15 minutes, or shock, or cardiac arrest — not attributable to arrhythmia, hypovolemia, or sepsis.",
      "**PESI and sPESI** stratify 30-day mortality and identify candidates for outpatient management.",
      "**Current update — a 2026 AHA/ACC guideline** introduces a five-category scheme (A through E): Category A is asymptomatic and dischargeable, B is low-severity, C has elevated biomarkers or RV dysfunction, D is incipient cardiopulmonary failure, and E is persistent hypotension or shock. The same guideline recommends LMWH over unfractionated heparin, DOACs over vitamin K antagonists, and PE Response Teams (PERT).",
    ],
  }, SOURCE),

  sourced({
    id: "block-respfailure-pe-risk-table",
    type: "table",
    heading: "↳ PE risk stratification (2019 ESC, board-classic)",
    columns: ["Risk category", "Systolic BP", "RV dysfunction & troponin pattern"],
    rows: [
      ["High-risk (massive)", "< 90 mmHg, shock, or arrest", "RV dysfunction and troponin status do not change the high-risk classification"],
      ["Intermediate-high", "≥ 90 mmHg", "Both RV dysfunction present and troponin elevated"],
      ["Intermediate-low", "≥ 90 mmHg", "Either RV dysfunction present or troponin elevated, but not both"],
      ["Low-risk", "≥ 90 mmHg", "Neither RV dysfunction nor troponin elevation present"],
    ],
  }, SOURCE),

  sourced({
    id: "block-respfailure-pe-flow",
    type: "flow",
    heading: "PE diagnosis & initial treatment",
    nodes: [
      { id: "suspect", label: "Pulmonary embolism suspected" },
      { id: "unstable", label: "Hemodynamically unstable or cannot travel for imaging", tone: "caution" },
      { id: "stable", label: "Hemodynamically stable", tone: "good" },
      { id: "echo", label: "Bedside echo shows acute RV strain: McConnell sign, D-shaped LV", tone: "caution" },
      { id: "presumptive", label: "Treat presumptively for PE", tone: "caution" },
      { id: "wells", label: "Clinical probability by Wells score or gestalt" },
      { id: "ddimer", label: "D-dimer, age-adjusted cutoff above age 50" },
      { id: "ctpa", label: "CT pulmonary angiography confirms the diagnosis" },
      { id: "anticoag", label: "Anticoagulation, with a DOAC preferred", tone: "good" },
      { id: "highrisk", label: "High-risk PE: SBP < 90 mmHg, shock, or arrest", tone: "caution" },
      { id: "thromb", label: "Systemic thrombolysis", tone: "caution" },
    ],
    edges: [
      { from: "suspect", to: "unstable" },
      { from: "suspect", to: "stable" },
      { from: "unstable", to: "echo" },
      { from: "echo", to: "presumptive" },
      { from: "stable", to: "wells" },
      { from: "wells", to: "ddimer", label: "low or intermediate probability" },
      { from: "ddimer", to: "ctpa", label: "D-dimer positive, or high probability" },
      { from: "ctpa", to: "anticoag", label: "low or intermediate-risk PE confirmed" },
      { from: "ctpa", to: "highrisk", label: "hemodynamic instability develops" },
      { from: "presumptive", to: "highrisk", label: "if unstable" },
      { from: "highrisk", to: "thromb" },
    ],
  }, SOURCE),

  sourced({
    id: "block-respfailure-pe-treatment",
    type: "bullets",
    heading: "↳ PE treatment detail",
    items: [
      "**Stable (low or intermediate risk)**: anticoagulation, with a DOAC preferred — apixaban and rivaroxaban do not require a parenteral lead-in, while dabigatran and edoxaban require at least 5 days of heparin first.",
      "**High-risk or massive PE**: systemic thrombolysis — alteplase 100 mg over 2 hours, or weight-based tenecteplase — with an absolute mortality reduction of roughly 1.6%, at a cost of roughly 10% major hemorrhage and 2–3% intracranial hemorrhage.",
      "**If thrombolysis is contraindicated or fails**: catheter-directed therapy or surgical embolectomy, whose mortality has historically been roughly 26%, formerly as high as 59%.",
      "**IVC filter**: only if anticoagulation is contraindicated, or for recurrent PE despite therapeutic anticoagulation.",
      "**Duration**: provoked (reversible-risk) PE gets 3 months of anticoagulation; unprovoked PE or persistent risk gets extended anticoagulation.",
      "**Board-classic versus current**: for submassive (intermediate-risk) PE, routine systemic thrombolysis is not recommended — PEITHO showed reduced decompensation but increased major and intracranial bleeding. Reserve advanced therapy for clinical deterioration.",
    ],
  }, SOURCE),

  sourced({
    id: "block-respfailure-pneumonia-definitions",
    type: "bullets",
    heading: "Pneumonia: definitions & microbiology",
    items: [
      "**CAP**: acquired outside a healthcare setting.",
      "**HAP**: pneumonia developing 48 hours or more after admission, not ventilator-associated.",
      "**VAP**: pneumonia developing 48 to 72 hours or more after endotracheal intubation.",
      "**Current update**: the 2016 IDSA/ATS guideline eliminated the \"healthcare-associated pneumonia (HCAP)\" category — a common board update point.",
      "**CAP microbiology**: Streptococcus pneumoniae is the most common bacterial cause; also atypicals (Mycoplasma, Legionella, Chlamydia) and respiratory viruses.",
      "**HAP/VAP microbiology**: aerobic gram-negative rods (Pseudomonas aeruginosa, Klebsiella, E. coli, Acinetobacter, Enterobacter) and Staphylococcus aureus, including MRSA.",
    ],
  }, SOURCE),

  sourced({
    id: "block-respfailure-pneumonia-treatment",
    type: "bullets",
    heading: "↳ Pneumonia diagnosis, empiric treatment & VAP prevention",
    items: [
      "**Clinical diagnosis**: a new infiltrate with fever or leukocytosis, purulent secretions, and worsening oxygenation.",
      "**Obtain lower respiratory cultures before starting antibiotics**, but do not delay empiric therapy to get them.",
      "**IDSA/ATS suggests noninvasive semiquantitative cultures** over invasive quantitative sampling (BAL or protected specimen brush) for VAP.",
      "**Cover MRSA** (vancomycin or linezolid) if MRSA risk factors are present, or if unit MRSA prevalence exceeds 10–20%.",
      "**Double antipseudomonal coverage** only with MDR risk factors or high unit resistance; otherwise a single agent is adequate if over 90% of gram-negatives are susceptible on the local antibiogram.",
      "**Base the empiric regimen on the local antibiogram.**",
      "**Duration**: 7 days for most HAP/VAP — a shorter course reduces resistance, and the board-classic 14 to 21 days is outdated.",
      "**De-escalate** based on culture results.",
      "**VAP prevention bundle**: head-of-bed elevation to 30–45°, a daily sedation vacation with a spontaneous breathing trial, subglottic secretion drainage, an ETT cuff pressure of 20–30 cmH₂O, early mobilization, minimizing circuit changes, and oral care with chlorhexidine, though its benefit is increasingly debated.",
    ],
  }, SOURCE),

  sourced({
    id: "block-respfailure-pressure-table",
    type: "table",
    heading: "Mechanical ventilation: peak versus plateau pressure troubleshooting",
    columns: ["Finding", "Pathology", "Action"],
    rows: [
      ["Increased peak pressure, normal plateau (high resistance)", "Bronchospasm, mucus plug, ETT kink or biting, secretions", "Bronchodilator, suction, bronchoscopy, bite block"],
      ["Increased peak and plateau pressure (low compliance)", "ARDS, pneumonia, pneumothorax, mainstem intubation, abdominal compartment syndrome", "Decrease tidal volume, chest tube, reposition the ETT, check bladder pressure"],
      ["Normal peak and plateau pressure with hypoxemia", "Pulmonary embolism", "CTPA or echo, then anticoagulate"],
    ],
  }, SOURCE),

  sourced({
    id: "block-respfailure-weaning",
    type: "bullets",
    heading: "↳ Auto-PEEP & weaning/extubation readiness",
    items: [
      "**Auto-PEEP (intrinsic PEEP)**: incomplete exhalation traps air, as in COPD or a high respiratory rate; measure it with an end-expiratory hold.",
      "**Consequences**: decreased venous return, hypotension, and barotrauma.",
      "**Emergency management**: disconnect the patient from the ventilator to allow full exhalation, then decrease the respiratory rate and tidal volume and increase the expiratory time (a lower I:E ratio).",
      "**Weaning and extubation readiness**: the cause of respiratory failure is resolving; the patient is awake, follows commands, and has an intact cough and gag reflex with manageable secretions.",
      "**Ventilator settings before a trial**: FiO₂ ≤ 40–50%, PEEP ≤ 5–8 cmH₂O.",
      "**Rapid shallow breathing index (respiratory rate divided by tidal volume in liters) < 105** is the best single predictor of successful extubation.",
      "**Negative inspiratory force more negative than −20 to −30 cmH₂O.**",
      "**Pass a spontaneous breathing trial**, lasting 30 to 120 minutes.",
    ],
  }, SOURCE),

  sourced({
    id: "block-respfailure-dyshemoglobinemia-table",
    type: "table",
    heading: "Dyshemoglobinemias & cellular hypoxia",
    columns: ["Toxin", "Mechanism", "Pulse oximetry", "Treatment"],
    rows: [
      ["Carbon monoxide", "250 times hemoglobin's affinity for CO versus O₂; left-shifts the oxyhemoglobin curve", "Falsely normal or high", "100% oxygen; hyperbaric oxygen if HbCO > 25% or with neurologic, cardiac, or pregnancy involvement"],
      ["Methemoglobinemia", "Iron oxidized to Fe³⁺ — from benzocaine, dapsone, or nitrites", "Reads roughly 85% regardless of the true saturation", "Methylene blue 1–2 mg/kg IV"],
      ["Cyanide", "Inhibits cytochrome oxidase", "Normal PaO₂", "Hydroxocobalamin, with or without sodium thiosulfate"],
    ],
  }, SOURCE),

  sourced({
    id: "block-respfailure-warning",
    type: "warning",
    tone: "danger",
    heading: "Submassive PE does not get routine thrombolysis",
    text: "Routine **systemic thrombolysis** for submassive (intermediate-risk) pulmonary embolism is not recommended. **PEITHO** showed it reduces hemodynamic decompensation but increases **major and intracranial bleeding** without a mortality benefit — reserve advanced therapy for a patient who actually deteriorates.",
  }, SOURCE),

  sourced({
    id: "block-respfailure-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "**Shunt does not correct with 100% FiO₂; V/Q mismatch does** — the single highest-yield oxygenation distinction.",
      "**Hyaline membranes are pathognomonic of diffuse alveolar damage and ARDS.**",
      "**PROSEVA**: prone positioning for at least 16 hours a day, for a P/F under 150, gives a mortality benefit; **HFOV is harmful — do not choose it.**",
      "**Driving pressure under 15 cmH₂O** is the strongest ventilator-associated mortality mediator.",
      "**Pattern recognition**: a sudden drop in end-tidal CO₂ intraoperatively plus hypotension and tachycardia suggests massive PE; increased peak pressure with a normal plateau suggests an airway resistance problem (bronchospasm or a mucus plug); hypoxemia with a normal peak and plateau pressure suggests PE.",
      "**Systemic thrombolysis for PE is only for hemodynamic instability (SBP under 90)** — not routinely for submassive PE.",
      "**HAP and VAP get a 7-day antibiotic course**; cover MRSA if unit prevalence exceeds 10–20%.",
      "**HCAP has been abolished** (2016 IDSA/ATS) — do not use the term.",
      "**Guideline-versus-classic flags**: tidal volume is now stated as 4–8 mL/kg predicted body weight, not strictly 6; the corticosteroid P/F under 200 qualifier was removed in 2024; and PE is now stratified by the 2026 AHA/ACC five-category (A–E) scheme, with LMWH preferred over UFH and DOACs preferred over warfarin.",
    ],
  }, SOURCE),

  references("block-respfailure-references", [SOURCE]),
];

export const respiratoryFailureArdsPulmonaryEmbolismAndPneumoniaTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000001801",
  versionId: "00000000-0000-4000-8000-000000001811",
  slug: "respiratory-failure-ards-pulmonary-embolism-and-pneumonia",
  title: "Respiratory Failure: ARDS, Pulmonary Embolism, and Pneumonia",
  aliases: ["ARDS", "acute respiratory distress syndrome", "Berlin definition", "pulmonary embolism", "PE", "submassive PE", "CAP", "community-acquired pneumonia", "HAP", "hospital-acquired pneumonia", "VAP", "ventilator-associated pneumonia", "driving pressure", "PROSEVA", "prone positioning", "auto-PEEP", "intrinsic PEEP", "RSBI", "rapid shallow breathing index", "spontaneous breathing trial", "PERT", "PE response team"],
  scoreNodeId: "critical-care-conditions",
  scoreCategory: "SCORE · Surgical Critical Care · Diseases & Conditions",
  tags: ["surgical-critical-care", "pulmonary", "ARDS", "absite", "score", "icu"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-25T00:00:00.000Z",
});
