import { buildTopic, references, sourced } from "@/content/authoring";
import { CRITICAL_CARE_ARRHYTHMIAS_PACKET_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-arrhythmia-summary",
    type: "summary",
    heading: "At a glance",
    text: "A cardiac arrhythmia is any disturbance of rate, rhythm, or conduction from abnormal impulse **formation** (automaticity or triggered activity) or abnormal impulse **propagation** (re-entry). The single most common perioperative arrhythmia is **new-onset postoperative atrial fibrillation (POAF)**, and the single highest-yield rule is that a **regular wide-complex tachycardia is ventricular tachycardia until proven otherwise**, especially with structural heart disease.",
  }, SOURCE),

  sourced({
    id: "block-arrhythmia-pathophysiology",
    type: "bullets",
    heading: "Pathophysiology & conduction hierarchy",
    items: [
      "**Re-entry** requires two pathways with differing conduction velocity and refractoriness plus unidirectional block — the mechanism behind AVNRT, AVRT, atrial flutter, and most monomorphic VT.",
      "**SA node**: primary pacemaker, upper right atrium at the SVC junction; intrinsic rate 60–100 bpm.",
      "**AV node**: floor of the right atrium, the only normal electrical connection to the ventricles; junctional escape rate 40–60 bpm.",
      "**Bundle of His → right/left bundle branches → Purkinje fibers**: ventricular escape rate 20–40 bpm — wide, slow, and unreliable.",
      "**Narrow QRS (< 120 ms)** implies a supraventricular origin, using the His-Purkinje system.",
      "**Wide QRS (> 120 ms)** implies a ventricular origin, or SVT with aberrancy or pre-excitation — **assume VT until proven otherwise**, especially with structural heart disease.",
      "**Mobitz I (nodal) block** is generally benign; **Mobitz II (infranodal) block** is unstable and can progress to complete block without warning.",
    ],
  }, SOURCE),

  sourced({
    id: "block-arrhythmia-epidemiology",
    type: "bullets",
    heading: "Epidemiology, risk factors & common perioperative etiologies",
    items: [
      "**Atrial fibrillation is the most common sustained arrhythmia.** POAF incidence is highest after valve surgery (40–50%) and up to roughly 25% after cardiac surgery, and is lower but still clinically important after major noncardiac surgery.",
      "**Highest-yield perioperative risk factors**: advancing age, pre-existing AF or structural heart disease, heart failure, valvular disease, thoracic, cardiac, or esophageal surgery, sepsis/SIRS, volume overload, electrolyte shifts, adrenergic surge, and abrupt beta-blocker withdrawal.",
      "**Suspect malignant ventricular arrhythmia** in patients with prior MI, cardiomyopathy, reduced ejection fraction, long QT, or electrolyte depletion.",
      "**Ranked perioperative etiologies**: new-onset postoperative atrial fibrillation is the most common; also sinus tachycardia from pain, hypovolemia or hemorrhage, fever or sepsis, hypoxia, or anemia; and electrolyte derangement (potassium, magnesium), myocardial ischemia, PE, hyperthyroidism, and drug effects.",
    ],
  }, SOURCE),

  sourced({
    id: "block-arrhythmia-presentation",
    type: "bullets",
    heading: "Clinical presentation",
    items: [
      "**Spectrum**: asymptomatic → palpitations, dyspnea, chest pain, presyncope or syncope → hemodynamic collapse.",
      "**Hemodynamic instability (ACLS trigger)**: hypotension, acutely altered mental status, signs of shock, ischemic chest pain, or acute heart failure. Confirm the arrhythmia is causing the instability rather than being a response to another process, such as sepsis or hemorrhage, before cardioverting.",
      "**Sawtooth flutter waves** with an atrial rate near 300 bpm and typical 2:1 block give a ventricular rate near 150 bpm.",
      "An **irregularly irregular** rhythm with absent P waves defines atrial fibrillation.",
      "**Cannon A waves** with AV dissociation suggest complete heart block or VT.",
      "**Twisting-around-baseline polymorphic VT** is torsades de pointes.",
    ],
  }, SOURCE),

  sourced({
    id: "block-arrhythmia-diagnosis",
    type: "bullets",
    heading: "Diagnosis & workup",
    items: [
      "**First-line**: 12-lead ECG for rate, regularity, QRS width, and P-wave relationship, plus continuous telemetry.",
      "**Adjuncts**: a BMP with magnesium and phosphate, serial troponin, CBC, TSH, ABG/lactate, CXR, and TTE (ejection fraction, wall motion, valve and atrial size) once the patient is stabilized.",
      "**Key numeric thresholds**: normal PR is 120–200 ms, with PR > 200 ms defining first-degree block; QRS ≥ 120 ms is wide; QTc > 500 ms markedly increases torsades risk; and any ventricular arrhythmia should be repleted to potassium > 4.0 mEq/L and magnesium > 2.0 mg/dL.",
      "**Exclude reversible causes** — ischemia, drugs, hyperkalemia, hypothyroidism, vagal tone — before labeling a bradyarrhythmia as needing a permanent device.",
    ],
  }, SOURCE),

  sourced({
    id: "block-arrhythmia-classification",
    type: "bullets",
    heading: "Classification",
    items: [
      "**Narrow-complex tachycardias** — current ACLS teaching prefers this term over the imprecise \"SVT.\" Regular: sinus tachycardia, atrial flutter, AVNRT, AVRT, atrial tachycardia. Irregular: atrial fibrillation, multifocal atrial tachycardia, atrial flutter with variable block.",
      "**Wide-complex tachycardias**: monomorphic VT, polymorphic VT/torsades, VF, SVT with aberrancy, and pre-excited (WPW) AF.",
      "**AV block**: first degree; second degree Mobitz I (Wenckebach, nodal); second degree Mobitz II (infranodal); high-grade; and third degree (complete).",
    ],
  }, SOURCE),

  sourced({
    id: "block-arrhythmia-stroke-risk-table",
    type: "table",
    heading: "AF stroke-risk staging tools",
    columns: ["Scheme", "Issuing body", "What it scores"],
    rows: [
      ["CHA₂DS₂-VASc", "ACC/AHA", "CHF, hypertension, age ≥ 75 (2 points), diabetes, prior stroke/TIA/thromboembolism (2 points), vascular disease, age 65–74, and female sex"],
      ["CHA₂DS₂-VA", "2024 ESC", "The identical scheme, but it omits sex as a scoring factor"],
    ],
  }, SOURCE),

  sourced({
    id: "block-arrhythmia-narrow-treatment",
    type: "bullets",
    heading: "Treatment — narrow-complex tachycardia",
    items: [
      "**Sinus tachycardia**: treat the underlying cause; there is no rhythm-specific drug.",
      "**Regular, stable AVNRT/AVRT**: vagal maneuvers first (a modified Valsalva with a leg raise is most effective), then IV adenosine 6 mg followed by 12 mg, then AV-nodal blockers (diltiazem/verapamil or a beta-blocker). Conversion success is 80–98%.",
      "**Unstable narrow-complex tachycardia with a pulse**: synchronized cardioversion.",
      "**Adenosine cautions**: severe bronchospasm in asthma, an exaggerated response after transplant, and avoiding AV-nodal blockade in pre-excited (WPW) AF, where procainamide or cardioversion is used instead.",
    ],
  }, SOURCE),

  sourced({
    id: "block-arrhythmia-af-treatment",
    type: "bullets",
    heading: "Treatment — atrial fibrillation & flutter (stable)",
    items: [
      "**Rate control is the usual first-line perioperative strategy**, since spontaneous reversion is common: a beta-blocker (metoprolol or esmolol) or a non-dihydropyridine calcium-channel blocker (diltiazem or verapamil); amiodarone if hypotensive or in heart failure; digoxin as an adjunct.",
      "**Landiolol (Rapiblyk)**, an ultra-short-acting IV beta-blocker, was FDA-approved in November 2024 for short-term ventricular rate reduction in supraventricular tachycardias including AF and flutter.",
      "**Rate target**: lenient control at < 110 bpm is non-inferior to strict control at < 80 bpm (RACE II).",
      "**Rhythm control**: synchronized cardioversion or antiarrhythmics if the arrhythmia is refractory, symptomatic, or hemodynamically compromising.",
      "**Cardioversion and anticoagulation rule**: if AF duration is > 48 hours or unknown, either give ≥ 3 weeks of therapeutic anticoagulation before cardioversion plus ≥ 4 weeks after, or use TEE to exclude a left atrial appendage thrombus before cardioversion and anticoagulate ≥ 4 weeks after.",
      "**Unstable AF or flutter**: urgent synchronized cardioversion.",
    ],
  }, SOURCE),

  sourced({
    id: "block-arrhythmia-anticoagulation",
    type: "bullets",
    heading: "Anticoagulation for AF — a major board-classic versus current update",
    items: [
      "**CHADS₂ is obsolete for this decision** — current guidelines use CHA₂DS₂-VASc (ACC/AHA) or CHA₂DS₂-VA (2024 ESC).",
      "**ACC/AHA thresholds**: oral anticoagulation is recommended (Class 1) when estimated annual stroke risk is ≥ 2% — roughly a CHA₂DS₂-VASc score of ≥ 2 in men or ≥ 3 in women — and reasonable (Class 2a) at 1–2% per year (score of 1 in men, 2 in women). Female sex is a risk modifier, not a standalone factor.",
      "**ESC**: oral anticoagulation is recommended for a CHA₂DS₂-VA score ≥ 2, and considered at a score of 1.",
      "**DOACs are preferred over warfarin** for AF, except with mechanical valves or moderate-to-severe rheumatic mitral stenosis, where warfarin is required.",
      "**POAF after noncardiac surgery** carries a stroke and mortality risk comparable to non-surgical AF. The 2024 perioperative guideline gives postoperative anticoagulation a Class 2a recommendation after weighing bleeding risk, plus a Class 1 recommendation for outpatient follow-up to survey for recurrence. After cardiac surgery, anticoagulate for 60 days when bleeding-safe, then reassess.",
    ],
  }, SOURCE),

  sourced({
    id: "block-arrhythmia-wide-treatment",
    type: "bullets",
    heading: "Treatment — wide-complex tachycardia",
    items: [
      "**Stable monomorphic VT**: IV procainamide (often preferred), amiodarone, or sotalol.",
      "**Unstable VT with a pulse**: synchronized cardioversion.",
      "**Pulseless VT / VF**: immediate unsynchronized defibrillation plus high-quality CPR and epinephrine 1 mg every 3 to 5 minutes; amiodarone (300 mg, then 150 mg) or lidocaine for shock-refractory VF/pVT — the 2018 update restored lidocaine as a co-equal option.",
      "**Torsades**: IV magnesium sulfate 1 to 2 g, stop QT-prolonging drugs, correct potassium and magnesium, overdrive pacing or isoproterenol, and defibrillate if pulseless.",
    ],
  }, SOURCE),

  sourced({
    id: "block-arrhythmia-tachy-flow",
    type: "flow",
    heading: "Tachyarrhythmia decision flow",
    nodes: [
      { id: "identified", label: "Tachyarrhythmia identified on ECG or telemetry" },
      { id: "pulseless", label: "Pulseless VT or VF", tone: "caution" },
      { id: "unstable", label: "Unstable: hypotension, altered mental status, shock, ischemic chest pain, or acute heart failure", tone: "caution" },
      { id: "stable", label: "Hemodynamically stable", tone: "good" },
      { id: "narrow", label: "Narrow QRS (< 120 ms)" },
      { id: "wide", label: "Wide QRS (> 120 ms): assume VT until proven otherwise", tone: "caution" },
      { id: "defib", label: "Immediate unsynchronized defibrillation plus high-quality CPR", tone: "caution" },
      { id: "cardiovert", label: "Synchronized cardioversion", tone: "caution" },
      { id: "vagal", label: "Vagal maneuvers, then IV adenosine" },
      { id: "procainamide", label: "IV procainamide, amiodarone, or sotalol" },
    ],
    edges: [
      { from: "identified", to: "pulseless", label: "no pulse" },
      { from: "identified", to: "unstable", label: "pulse present, signs of instability" },
      { from: "identified", to: "stable", label: "pulse present, hemodynamically stable" },
      { from: "pulseless", to: "defib" },
      { from: "unstable", to: "cardiovert", label: "narrow or wide complex with a pulse" },
      { from: "stable", to: "narrow" },
      { from: "stable", to: "wide" },
      { from: "narrow", to: "vagal" },
      { from: "wide", to: "procainamide" },
    ],
  }, SOURCE),

  sourced({
    id: "block-arrhythmia-brady-treatment",
    type: "bullets",
    heading: "Bradyarrhythmias, AV block & definitive procedures",
    items: [
      "**Symptomatic bradycardia**: atropine 1 mg (up to 3 mg), then transcutaneous pacing and/or a dopamine or epinephrine infusion, then transvenous pacing.",
      "**Atropine is often ineffective in Mobitz II or complete (infranodal) block** and may paradoxically worsen it — proceed to pacing instead.",
      "**Permanent pacemaker, Class I regardless of symptoms**: acquired Mobitz II, high-grade, or third-degree AV block not due to a reversible cause. Mobitz I and first-degree block are paced only if symptomatic.",
      "**Catheter ablation** is used for drug-refractory AVNRT/AVRT (curative), typical flutter (cavotricuspid isthmus), and AF (pulmonary vein isolation) — first-line for symptomatic paroxysmal AF in selected patients.",
      "**Cox-Maze procedure**: a surgical transmural atrial lesion set for refractory AF, often performed concomitantly with cardiac surgery, with or without left atrial appendage exclusion.",
      "**Outcomes**: vagal or pharmacologic termination of regular narrow-complex tachycardia succeeds 80–98% of the time; typical atrial flutter ablation has greater than 90% acute success; and POAF is associated with roughly a 62% higher early stroke risk and 44% higher early mortality risk within 30 days versus no POAF.",
    ],
  }, SOURCE),

  sourced({
    id: "block-arrhythmia-followup",
    type: "bullets",
    heading: "Follow-up, surveillance & pacing modes",
    items: [
      "**POAF after noncardiac surgery** recurs in roughly 39% of patients by 5 years; outpatient follow-up within 3 to 6 months with ambulatory or event monitoring is recommended for thromboembolic risk stratification.",
      "**Complications**: thromboembolic stroke from AF or flutter, tachycardia-induced cardiomyopathy, hemodynamic collapse, proarrhythmia from antiarrhythmics, bradycardia or asystole from AV block, and bleeding from anticoagulation.",
      "**Pacing modes**: dual-chamber pacing is preferred in AV block because it carries a lower AF risk; avoid unnecessary RV pacing.",
    ],
  }, SOURCE),

  sourced({
    id: "block-arrhythmia-warning",
    type: "warning",
    tone: "danger",
    heading: "Never AV-nodal-block a pre-excited AF",
    text: "Giving an **AV-nodal blocker** — adenosine, a calcium-channel blocker, a beta-blocker, or digoxin — in **pre-excited (WPW) AF** removes the AV node's protective filtering and lets the accessory pathway conduct unchecked, risking degeneration to ventricular fibrillation. Use **procainamide**, or cardioversion if the patient is unstable.",
  }, SOURCE),

  sourced({
    id: "block-arrhythmia-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "**CHADS₂ has been replaced by CHA₂DS₂-VASc / CHA₂DS₂-VA.** A question still using CHADS₂ for the anticoagulation decision is out of date.",
      "**Atrial flutter with a ventricular rate near 150 suggests 2:1 block**, with an atrial rate near 300.",
      "**A regular wide-complex tachycardia in a patient with a prior MI is VT until proven otherwise.**",
      "**Never give an AV-nodal blocker in pre-excited (WPW) AF** — use procainamide or cardioversion.",
      "**Polymorphic VT with a long QT is torsades — treat with IV magnesium.**",
      "**Mobitz II or complete heart block gets a permanent pacemaker regardless of symptoms; Mobitz I is paced only if symptomatic.**",
      "**Synchronized cardioversion** is for unstable rhythms with a pulse; **unsynchronized defibrillation** is for VF and pulseless or polymorphic VT.",
      "**New POAF is not benign and self-limited** — treat triggers, consider anticoagulation, and arrange follow-up, since it independently raises stroke and mortality risk.",
      "**Lenient rate control (< 110 bpm)** is non-inferior to strict control (< 80 bpm) in AF without heart failure.",
      "**Shock-refractory VF/pVT**: amiodarone or lidocaine are co-equal options.",
      "**AF present more than 48 hours before cardioversion** needs 3 weeks of anticoagulation before and 4 weeks after, or TEE-guided cardioversion.",
    ],
  }, SOURCE),

  references("block-arrhythmia-references", [SOURCE]),
];

export const commonCardiacArrhythmiasTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000001501",
  versionId: "00000000-0000-4000-8000-000000001511",
  slug: "common-cardiac-arrhythmias",
  title: "Common Cardiac Arrhythmias",
  aliases: ["cardiac arrhythmia", "atrial fibrillation", "AF", "AFib", "atrial flutter", "POAF", "postoperative atrial fibrillation", "AVNRT", "AVRT", "WPW", "Wolff-Parkinson-White", "CHA2DS2-VASc", "CHA2DS2-VA", "torsades de pointes", "AV block", "Mobitz I", "Mobitz II", "complete heart block", "ventricular tachycardia", "ventricular fibrillation", "narrow-complex tachycardia", "wide-complex tachycardia", "Cox-Maze"],
  scoreNodeId: "critical-care-conditions",
  scoreCategory: "SCORE · Surgical Critical Care · Diseases & Conditions",
  tags: ["surgical-critical-care", "cardiac", "arrhythmia", "absite", "score", "icu"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-25T00:00:00.000Z",
});
