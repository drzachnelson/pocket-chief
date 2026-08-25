import { buildTopic, references, sourced } from "@/content/authoring";
import { CRITICAL_CARE_CARDIOGENIC_SHOCK_PACKET_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-cardiogenic-summary",
    type: "summary",
    heading: "At a glance",
    text: "Cardiogenic shock is **primary cardiac dysfunction** producing inadequate cardiac output and end-organ hypoperfusion despite adequate preload — the classic \"cold and wet\" triad of ↓ cardiac output, ↑ systemic vascular resistance, and ↑ filling pressures. **Acute MI causes roughly 80% of cases**, and early **culprit-vessel revascularization is the only intervention proven to reduce mortality** in a randomized trial. Current evidence recognizes additional phenotypes beyond the classic picture, and has overturned the reflex use of an IABP or routine VA-ECMO.",
  }, SOURCE),

  sourced({
    id: "block-cardiogenic-pathophysiology",
    type: "bullets",
    heading: "Pathophysiology & phenotypes",
    items: [
      "**Core hemodynamic triad**: ↓ cardiac output/index, ↑ systemic vascular resistance from compensatory adrenergic vasoconstriction, and ↑ filling pressures (↑ PCWP, ↑ CVP).",
      "**The self-perpetuating spiral**: ischemia or myocardial dysfunction → ↓ cardiac output → ↓ coronary and systemic perfusion → neurohormonal activation (catecholamines, renin-angiotensin-aldosterone) → ↑ afterload and ↑ volume → worsening ischemia and pulmonary edema → circulatory collapse.",
      "**HFrEF** (systolic, ejection fraction ≤ 40%): ↓ contractility drives ↓ stroke volume and cardiac output. **HFpEF** (diastolic, ejection fraction ≥ 50%): impaired relaxation and compliance drive ↓ end-diastolic volume and ↓ stroke volume despite a preserved ejection fraction.",
      "**Right-sided heart failure**: the RV cannot overcome pulmonary outflow impedance, producing ↓ forward flow and back-pressure — ↑ CVP, congestive hepatopathy, renal congestion, and lower-extremity edema.",
      "**Cellular level**: a DO₂/VO₂ mismatch drives anaerobic metabolism, lactic acidosis, apoptosis, and necrosis.",
      "**Ranked etiologies**: acute MI is the classic and most common cause (roughly 80% of cases) and the leading cause of in-hospital mortality after AMI, with LV failure predominating. Acute decompensated chronic heart failure now rivals or exceeds AMI as a cause in contemporary registries. Also: mechanical complications of AMI (VSR, papillary muscle rupture, free-wall rupture), RV infarction, arrhythmia, valvular disease, myocarditis, Takotsubo cardiomyopathy, peripartum cardiomyopathy, and post-cardiotomy shock.",
      "**Board-classic versus current evidence**: board teaching frames cardiogenic shock as overwhelmingly AMI-related and \"cold and wet.\" Current evidence recognizes additional phenotypes: euvolemic (\"cold and dry,\" roughly 28% of AMI-related shock), vasodilatory (\"warm and wet,\" SIRS-like with low SVR), normotensive, and RV-predominant shock.",
    ],
  }, SOURCE),

  sourced({
    id: "block-cardiogenic-epidemiology",
    type: "bullets",
    heading: "Epidemiology & surgical risk",
    items: [
      "Cardiogenic shock affects roughly 40,000 to 50,000 people per year in the US and complicates up to roughly 10% of acute MI.",
      "**30-day mortality is roughly 40%; 1-year mortality is roughly 50%** in AMI-related shock despite revascularization.",
      "Up to 18% of noncardiac surgery patients have underlying heart failure. Nonischemic or ischemic heart failure carries roughly a 3-fold higher 30-day postoperative mortality (roughly 9%) versus coronary artery disease alone (roughly 2.9%).",
      "**Decompensated CHF — an S₃ gallop with elevated jugular venous pressure — is the single strongest clinical predictor of postoperative MI and in-hospital death.** Active or decompensated heart failure carries worse risk than compensated heart failure or a history of heart failure alone.",
    ],
  }, SOURCE),

  sourced({
    id: "block-cardiogenic-presentation",
    type: "bullets",
    heading: "Clinical presentation",
    items: [
      "**Framingham-style major signs**: paroxysmal nocturnal dyspnea, orthopnea, elevated jugular venous pressure, pulmonary rales, an S₃ gallop, and cardiomegaly with pulmonary edema on chest X-ray.",
      "**Minor signs**: bilateral lower-extremity edema, nocturnal cough, exertional dyspnea, hepatomegaly, pleural effusion, and tachycardia (heart rate ≥ 120 bpm).",
      "**Shock-specific hypoperfusion signs**: hypotension, cool/clammy/mottled extremities, diaphoresis, delayed capillary refill, oliguria (urine output < 30 mL/h), altered mentation, distended jugular veins, and pulmonary congestion.",
      "**A new harsh holosystolic murmur with a thrill and shock, days after MI, suggests ventricular septal rupture.**",
      "**Acute pulmonary edema with a severe eccentric mitral regurgitation jet 3 to 5 days after an inferior MI suggests papillary muscle rupture.**",
      "**Tamponade with shock and electromechanical dissociation suggests free-wall rupture.**",
    ],
  }, SOURCE),

  sourced({
    id: "block-cardiogenic-diagnosis",
    type: "sequence",
    heading: "Diagnostic sequence & key thresholds",
    steps: [
      { title: "Clinical recognition", detail: "Hypoperfusion in the setting of an at-risk presentation." },
      { title: "ECG", detail: "Identify **STEMI** or ischemia." },
      { title: "Bedside echocardiography", detail: "First-line confirmatory test — assess LV and RV function, wall motion, valves, effusion, and mechanical complications." },
      { title: "Right heart (Swan-Ganz) catheterization", detail: "Reserved for definitive hemodynamics when the diagnosis or phenotype is unclear: cardiac index ≤ 2.2 L/min/m² (≤ 2.0 by the AHA combined-criteria table, or < 1.8 without support), PCWP > 15 mmHg (some texts use > 18), SVR index > 2200 dynes·s·cm⁻⁵, systolic BP < 90 mmHg for > 30 minutes or a need for pressors/inotropes/mechanical support to maintain ≥ 90, cardiac power output (CO × MAP ÷ 451) below 0.6 W as a strong mortality predictor, and a pulmonary artery pulsatility index below 1.0 to 2.0 suggesting RV failure." },
    ],
  }, SOURCE),

  sourced({
    id: "block-cardiogenic-biomarker-pearls",
    type: "bullets",
    heading: "↳ Labs, imaging & biomarker pearls",
    items: [
      "**Classic labs and imaging**: elevated lactate, elevated creatinine, elevated liver enzymes from congestive hepatopathy, metabolic acidosis, and elevated BNP; chest X-ray shows cephalization, Kerley B lines, alveolar edema, and cardiomegaly. Lactate ≥ 2 mmol/L is a biochemical marker of hypoperfusion.",
      "**In RV failure, hepatic congestion impairs lactate clearance**, so lactate can stay elevated despite adequate peripheral resuscitation.",
      "**BNP elevation is not specific** — it also rises with acute RV strain, as in pulmonary embolism.",
      "**VSR versus acute MR on right heart catheterization**: VSR produces an oxygen \"step-up\" from the right atrium to the right ventricle (a left-to-right shunt); acute MR produces giant PCWP v-waves.",
    ],
  }, SOURCE),

  sourced({
    id: "block-cardiogenic-scai-table",
    type: "table",
    heading: "Classification — SCAI SHOCK staging (2022 update)",
    columns: ["Stage", "Label", "Hallmark"],
    rows: [
      ["Stage A", "At risk", "No shock signs; a large MI or heart-failure risk, with normal lactate and perfusion"],
      ["Stage B", "Beginning (\"pre-shock\")", "Hypotension or tachycardia without hypoperfusion; normal lactate"],
      ["Stage C", "Classic", "Hypoperfusion requiring at least one intervention beyond volume; lactate ≥ 2, cardiac index < 2.2, PCWP > 15"],
      ["Stage D", "Deteriorating", "Failing initial therapy, with escalating pressors or mechanical support"],
      ["Stage E", "Extremis", "Cardiovascular collapse, refractory arrest, or ongoing CPR"],
    ],
  }, SOURCE),

  sourced({
    id: "block-cardiogenic-scai-pearls",
    type: "bullets",
    heading: "↳ Staging pearls",
    items: [
      "**Hypoperfusion — lactate, organ dysfunction — not hypotension, separates Stage B from Stage C.**",
      "A higher SCAI stage correlates with higher mortality, and the presence of **cardiac arrest** is an independent risk modifier.",
    ],
  }, SOURCE),

  sourced({
    id: "block-cardiogenic-initial-treatment",
    type: "bullets",
    heading: "Treatment — initial priorities & vasoactive support",
    items: [
      "**Algorithm**: identify and reverse the cause → optimize volume → vasoactive support → mechanical support or electrical therapy → definitive therapy.",
      "**Reverse the cause**: immediate revascularization for AMI-related shock — the only intervention with a randomized-trial mortality benefit — plus decompressing a tension pneumothorax, treating tamponade, and correcting arrhythmia.",
      "**Volume and decongestion**: IV loop diuretics, with ultrafiltration or renal replacement therapy for diuretic-refractory overload.",
      "**Norepinephrine is the preferred first-line vasopressor** — SOAP II showed fewer arrhythmias and lower cardiogenic-shock-subgroup mortality versus dopamine, and OPTIMA-CC showed epinephrine caused more refractory shock than norepinephrine.",
      "**Inodilators**: dobutamine (β1/β2 agonism increasing contractility and causing vasodilation) and milrinone (a PDE-3 inhibitor increasing cAMP, contractility, and lusitropy, with pulmonary and systemic vasodilation); DOREMI found no difference between milrinone and dobutamine on the composite outcome. Milrinone has a long half-life and accumulates in renal dysfunction, so it is preferred when pulmonary hypertension or RV failure is present.",
      "**Avoid a pure vasopressor (phenylephrine) as a sole agent** — reflex bradycardia lowers cardiac output.",
      "**Electrical therapy**: synchronized cardioversion or ACLS protocols for unstable tachyarrhythmias (AF with rapid ventricular response, SVT, VT).",
    ],
  }, SOURCE),

  sourced({
    id: "block-cardiogenic-mechanical-complications-table",
    type: "table",
    heading: "Mechanical complications of AMI (classically 3 to 5 days post-transmural MI)",
    columns: ["Complication", "Timing & clue", "Diagnosis", "Management", "Mortality"],
    rows: [
      ["Papillary muscle rupture (acute MR)", "3–5 days after an inferior or lateral MI; the posteromedial papillary muscle (single RCA supply) is most common", "Echo: severe eccentric MR with a flail or mobile mass", "Emergent mitral valve replacement, with an IABP bridge if needed", "10–40%"],
      ["Ventricular septal rupture (VSR)", "3–5 days, bimodal, also under 24 hours with primary PCI; a harsh holosystolic murmur with a thrill", "Echo shows a left-to-right shunt, with an oxygen step-up from the right atrium to the right ventricle", "Afterload reduction or an IABP bridge, then surgical or percutaneous closure", "30–40%, higher with cardiogenic shock"],
      ["Free-wall rupture", "3–5 days; tamponade physiology with pulseless electrical activity", "Echo shows tamponade", "Immediate surgery", "Over 50%"],
      ["Pseudoaneurysm", "Weeks to years; a contained rupture with a narrow neck (neck-to-sac ratio 0.25–0.5)", "CT or echo", "Urgent repair given a 30–45% rupture risk", "Under 10%"],
    ],
  }, SOURCE),

  sourced({
    id: "block-cardiogenic-revascularization",
    type: "bullets",
    heading: "Revascularization & mechanical circulatory support",
    items: [
      "**Early revascularization (PCI, or CABG if PCI is not feasible) is Class I**, based on the SHOCK trial — no 30-day benefit, but reduced mortality at 6 months and out to 6 years, with a number needed to treat of roughly 8.",
      "**CULPRIT-SHOCK**: culprit-lesion-only PCI beats immediate multivessel PCI (30-day death or renal replacement therapy 45.9% versus 55.4%) — stage non-culprit lesions rather than treating them immediately.",
      "**IABP-SHOCK II showed no 30-day or 6-year mortality benefit**, so routine IABP is not recommended in AMI-related shock (Class III). An IABP remains useful as a bridge for mechanical complications, providing afterload reduction.",
      "**ECLS-SHOCK and ECMO-CS both found routine early VA-ECMO did not reduce 30-day mortality**, and increased bleeding and vascular complications.",
      "**DanGer Shock**: an early microaxial flow pump (Impella CP) in selected STEMI-related shock without anoxic brain injury reduced 180-day mortality (45.8% versus 58.5%, an absolute reduction of 12.7%), at the cost of more bleeding, limb ischemia, and renal replacement therapy — the first mechanical-circulatory-support device trial to show a survival benefit.",
      "**Board-classic versus current evidence**: the board-classic reflex is \"place an IABP for cardiogenic shock.\" Current evidence shows routine IABP has no mortality benefit (IABP-SHOCK II), routine VA-ECMO has no benefit (ECLS-SHOCK), and only selective early Impella (DanGer Shock) and early culprit-only revascularization improve survival.",
    ],
  }, SOURCE),

  sourced({
    id: "block-cardiogenic-flow",
    type: "flow",
    heading: "Initial management algorithm",
    nodes: [
      { id: "recognize", label: "Cardiogenic shock recognized: hypoperfusion despite adequate preload" },
      { id: "reverse", label: "Identify and reverse the cause: revascularize AMI, decompress tamponade, correct arrhythmia" },
      { id: "volume", label: "Optimize volume: diurese if congested" },
      { id: "vasoactive", label: "Vasoactive support: norepinephrine first-line, add an inodilator if needed" },
      { id: "definitive", label: "Continue definitive therapy: revascularization, valve repair, or transplant evaluation", tone: "good" },
      { id: "worsening", label: "Failing initial therapy (SCAI stage C progressing to D)", tone: "caution" },
      { id: "mcs", label: "Escalate to mechanical circulatory support: selective early Impella in appropriate STEMI-related shock", tone: "caution" },
      { id: "extremis", label: "Refractory collapse (SCAI stage E)", tone: "caution" },
    ],
    edges: [
      { from: "recognize", to: "reverse" },
      { from: "reverse", to: "volume" },
      { from: "volume", to: "vasoactive" },
      { from: "vasoactive", to: "definitive", label: "responds to initial therapy" },
      { from: "vasoactive", to: "worsening", label: "inadequate response" },
      { from: "worsening", to: "mcs" },
      { from: "mcs", to: "definitive", label: "stabilizes" },
      { from: "mcs", to: "extremis", label: "continues to deteriorate" },
    ],
  }, SOURCE),

  sourced({
    id: "block-cardiogenic-perioperative",
    type: "bullets",
    heading: "Perioperative heart-failure medication management",
    items: [
      "**Beta-blockers**: continue chronic stable beta-blockade (Class I). **Never initiate a beta-blocker on the day of surgery** (Class III/harm — increased stroke, bradycardia, and death per POISE). If a new indication exists, start more than 7 days preoperatively to allow titration.",
      "**RAAS inhibitors (ACEi/ARB/ARNI)**: continuation is reasonable in HFrEF (Class IIa). In hypertensive patients undergoing elevated-risk surgery, omitting the dose 24 hours preoperatively may reduce intraoperative hypotension (Class IIb); POISE-3 showed no clear outcome difference either way.",
      "**SGLT2 inhibitors**: withhold 3 to 4 days preoperatively (canagliflozin, dapagliflozin, and empagliflozin for at least 3 days; ertugliflozin for at least 4 days) to prevent euglycemic DKA and metabolic acidosis (Class I).",
      "**Diuretics**: hold on the day of surgery during major fluid shifts to avoid hypovolemia and AKI.",
      "Otherwise **continue guideline-directed medical therapy, excluding SGLT2 inhibitors, in compensated heart failure.**",
    ],
  }, SOURCE),

  sourced({
    id: "block-cardiogenic-followup",
    type: "bullets",
    heading: "Follow-up, surveillance & complications",
    items: [
      "**Serial lactate clearance, cardiac power output, and urine output** guide response to therapy and the need for escalation.",
      "**Wean vasoactives to the lowest dose**, and reassess for mechanical-support escalation if the SCAI stage worsens from C to D to E.",
      "**Shock-team, protocolized care at a shock center** improves triage and outcomes.",
      "**Common complications**: multi-organ failure, AKI/renal replacement therapy, congestive hepatopathy, arrhythmia, mechanical-support-related bleeding, limb ischemia, and hemolysis, and, with VA-ECMO, increased LV afterload — consider LV venting (ECPELLA).",
      "**Survivors** transition to guideline-directed medical therapy (ARNI, beta-blocker, MRA, SGLT2 inhibitor) and are considered for an ICD or advanced therapies (LVAD, transplant) based on recovery.",
    ],
  }, SOURCE),

  sourced({
    id: "block-cardiogenic-warning",
    type: "warning",
    tone: "danger",
    heading: "Never start a beta-blocker on the day of surgery",
    text: "Initiating a **beta-blocker** on the day of surgery is Class III/harm — POISE showed **increased stroke, bradycardia, and death**. Continue a patient's existing chronic beta-blockade, but if a new indication arises preoperatively, start it more than 7 days ahead so the dose can be titrated first.",
  }, SOURCE),

  sourced({
    id: "block-cardiogenic-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "**AMI is the #1 cause of cardiogenic shock; early culprit-vessel revascularization is the only RCT-proven mortality-reducing therapy.**",
      "**SHOCK trial**: no 30-day benefit, but a survival benefit from 6 months to 6 years, with a number needed to treat of roughly 8.",
      "**CULPRIT-SHOCK**: culprit-only PCI beats immediate multivessel PCI.",
      "**IABP-SHOCK II was negative, so routine IABP is not recommended (Class III). DanGer Shock was positive** — selective early Impella reduced 180-day mortality by an absolute 12.7%.",
      "**Decompensated CHF (an S₃ gallop with elevated JVP) is the strongest predictor of perioperative MI and death.**",
      "**Never start a beta-blocker on the day of surgery; do continue chronic beta-blockers.**",
      "**Hold SGLT2 inhibitors 3 to 4 days preoperatively** for euglycemic DKA risk.",
      "**A murmur plus shock 3 to 5 days post-MI means echo now.** An oxygen step-up from the right atrium to the right ventricle means VSR; giant PCWP v-waves mean acute MR.",
      "**RV or hepatic congestion causes falsely persistent lactate** despite adequate resuscitation.",
      "**Norepinephrine is the first-line vasopressor; avoid phenylephrine monotherapy.**",
    ],
  }, SOURCE),

  references("block-cardiogenic-references", [SOURCE]),
];

export const cardiacFailureAndCardiogenicShockTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000001901",
  versionId: "00000000-0000-4000-8000-000000001911",
  slug: "cardiac-failure-and-cardiogenic-shock",
  title: "Cardiac Failure and Cardiogenic Shock",
  aliases: ["cardiogenic shock", "heart failure", "HFrEF", "HFpEF", "SCAI SHOCK staging", "SCAI shock stage", "IABP", "intra-aortic balloon pump", "VA-ECMO", "Impella", "DanGer Shock", "IABP-SHOCK II", "ECLS-SHOCK", "CULPRIT-SHOCK", "SHOCK trial", "milrinone", "dobutamine", "norepinephrine", "ventricular septal rupture", "papillary muscle rupture", "free-wall rupture", "cardiac power output", "cold and wet shock"],
  scoreNodeId: "critical-care-conditions",
  scoreCategory: "SCORE · Surgical Critical Care · Diseases & Conditions",
  tags: ["surgical-critical-care", "cardiac", "shock", "absite", "score", "icu"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-25T00:00:00.000Z",
});
