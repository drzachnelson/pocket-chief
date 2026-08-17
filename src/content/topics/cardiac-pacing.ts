import { buildTopic, references, sourced } from "@/content/authoring";
import { CARDIAC_PACING_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-pacing-summary",
    type: "summary",
    heading: "At a glance",
    text: "Temporary cardiac pacing provides urgent electrical rate support and rhythm control for life-threatening bradyarrhythmias, complete heart blocks, and postcardiotomy conduction disturbances. Modalities include noninvasive **transcutaneous pacing** (emergent bridging), invasive **transvenous pacing** (right internal jugular vein access preferred for direct RV apex/septal positioning), and **epicardial pacing** during open cardiac surgery. Prompt correction of electrolytes and careful management of sensitivity thresholds prevent catastrophic failure to capture, oversensing-induced asystole, and lethal undersensing (**R-on-T**) arrhythmias.",
  }, SOURCE),

  sourced({
    id: "block-pacing-indications",
    type: "bullets",
    heading: "Indications & contraindications",
    items: [
      "**Indications**",
      "- **Symptomatic bradycardia**: hemodynamically unstable bradyarrhythmias unresponsive to atropine or medical therapy (e.g., high-grade AV block, severe sinus node dysfunction)",
      "- **Acute myocardial ischemia/infarction**: conduction abnormalities or refractory bradyarrhythmias associated with acute coronary ischemia or infarction",
      "- **Cardiogenic shock**: inadequate cardiac output and systemic hypoperfusion driven or exacerbated by bradycardia",
      "- **Postcardiotomy**: management of transient postoperative AV conduction blocks or prevention and suppression of tachyarrhythmias via overdrive pacing",
      "**Contraindications**",
      "- **Absolute**: none in emergent, life-threatening hemodynamic instability",
      "- **Relative — prosthetic tricuspid valve**: mechanical tricuspid valves carry severe risk of lead entrapment, valve damage, and lead dislodgement",
      "- **Relative — coagulopathy / anticoagulation**: severe systemic coagulopathy, therapeutic anticoagulation, or antiplatelet therapy increases the risk of vascular complications, hematoma, and hemopericardium/cardiac tamponade during transvenous access",
    ],
  }, SOURCE),

  sourced({
    id: "block-pacing-anatomy-approaches",
    type: "bullets",
    heading: "Operative anatomy & technical approaches",
    items: [
      "**Noninvasive transcutaneous pacing**",
      "- **Vector**: pacing pads must bridge the cardiac vector across the myocardium to achieve adequate electrical and mechanical capture",
      "- **Anterior-lateral placement**: anterior pad placed over the right parasternal / mid-sternal area (right pectoralis major); lateral pad placed in the left 5th to 6th intercostal space along the midclavicular line (cardiac apex)",
      "- **Anterior-posterior placement**: anterior pad positioned directly over the cardiac apex/precordium; posterior pad positioned infrascapular, inferomedial to the tip of the left scapula",
      "**Transvenous pacing**",
      "- **Vascular access**",
      "-- **Right internal jugular vein (RIJ)** is the preferred site due to its direct, straight-line anatomical pathway through the superior vena cava into the right atrium and right ventricle",
      "-- **Subclavian vein** is an alternative but carries higher risk of pneumothorax",
      "-- **Femoral vein** is a secondary choice due to higher infection/DVT risk and restriction of patient mobilization",
      "- **Sheath & lead placement**: advanced through a **9 Fr introducer sheath** under continuous ECG monitoring (standard) ± fluoroscopy or echocardiography/ultrasound; optimal lead tip location is the **RV apex or RV interventricular septum** to ensure stable endocardial contact and lower capture thresholds",
      "**Invasive epicardial pacing**: placed directly during open cardiac procedures; pacing wires are fixed to the epicardium of the atrium, ventricle, or both and brought out percutaneously through the subxiphoid or anterior abdominal/chest wall based on underlying rhythm defects and surgeon preference.",
    ],
  }, SOURCE),

  sourced({
    id: "block-pacing-preop-prep",
    type: "sequence",
    heading: "Preoperative preparation & optimization protocol",
    steps: [
      { title: "Vascular & pad site verification", detail: "Transcutaneous: confirm clean, dry skin contact without hair interference and avoid placing pads directly over **implanted hardware (PPM/ICD)**. Transvenous: assess central venous patency and target vascular anatomy with **bedside ultrasound**." },
      { title: "Electrolyte & acid-base correction", detail: "Correct **potassium, magnesium, calcium**, and systemic pH; electrolyte and acid-base abnormalities elevate stimulation thresholds and provoke lethal arrhythmias." },
      { title: "Equipment & generator verification", detail: "Test pacing **generator battery charge**, secure cable connections, test lead integrity, and confirm proper grounding." },
      { title: "Resuscitation readiness & monitoring", detail: "Establish continuous **multilead ECG** and arterial line/pulse oximetry monitoring; keep emergency ACLS drugs and a **defibrillator** immediately at the bedside." },
    ],
  }, SOURCE),

  sourced({
    id: "block-pacing-naspe-table",
    type: "table",
    heading: "NASPE / NBG pacing nomenclature positions",
    columns: ["Position", "Category", "Code Letters", "Description & Clinical Function"],
    rows: [
      ["Position I", "**Chamber paced**", "A (Atrium), V (Ventricle), D (Dual: A+V), O (None)", "Identifies where the electrical pacing impulse is delivered"],
      ["Position II", "**Chamber sensed**", "A (Atrium), V (Ventricle), D (Dual: A+V), O (Asynchronous)", "Identifies which chamber intrinsic electrical activity is monitored"],
      ["Position III", "**Response to sensing**", "I (Inhibited), T (Triggered), D (Dual: T+I), O (None)", "I: Sensed beat blocks pacing output; T: Sensed beat triggers pacing output; O: Ignores intrinsic activity (fixed rate)"],
      ["Position IV", "**Rate modulation**", "R (Rate adaptive), O (None)", "Adjusts pacing rate based on metabolic or physiological demand"],
      ["Position V", "**Multisite pacing**", "A, V, D, O", "Bi-atrial or bi-ventricular pacing (rarely used in temporary setups)"],
    ],
  }, SOURCE),

  sourced({
    id: "block-pacing-modes",
    type: "bullets",
    heading: "↳ Common pacing modes & clinical applications",
    items: [
      "**VVI** (ventricular paced, ventricular sensed, inhibited): most common temporary backup mode for AV nodal block or slow ventricular response in atrial fibrillation; inhibited by intrinsic QRS complexes.",
      "**AAI** (atrial paced, atrial sensed, inhibited): indicated for isolated sinus node dysfunction with intact AV nodal conduction; maintains physiologic ventricular activation.",
      "**DDD** (dual-chamber paced, dual sensed, dual response): restores physiologic atrioventricular synchrony and preserves the **atrial kick** (~15–30% boost in cardiac output).",
      "**VOO / DOO** (asynchronous pacing): fires at a programmed fixed rate regardless of native cardiac rhythm; utilized intraoperatively during electrocautery use to prevent inappropriate inhibition from electrical artifact.",
    ],
  }, SOURCE),

  sourced({
    id: "block-pacing-troubleshooting-table",
    type: "table",
    heading: "Pacemaker malfunction troubleshooting matrix",
    columns: ["Malfunction", "ECG & Clinical Finding", "Underlying Mechanism", "Corrective Action"],
    rows: [
      ["Undersensing", "Pacing spikes occur inappropriately on top of native P waves or QRS complexes (**R-on-T hazard**)", "Pacer sensitivity is set **too low** (millivolt [mV] number is too high; sensing fence is too high)", "**Increase sensitivity** (decrease the mV threshold); reposition dislodged lead"],
      ["Oversensing", "Pacer inappropriately **inhibited**; pauses or missing pacing spikes in the presence of bradycardia", "Pacer detects **non-cardiac signals** (myopotentials, P/T-wave crosstalk, electrocautery) as native QRS", "**Decrease sensitivity** (increase the mV threshold); eliminate electrical interference/crosstalk"],
      ["Failure to capture", "Pacing spikes are visible on ECG, but are **not followed** by an evoked P wave or widened QRS complex", "Output (milliamps [mA]) is **below myocardial threshold**; lead dislodgement; ischemia or electrolyte derangement at tip", "**Increase output (mA)**; correct acidosis/hyperkalemia; check cable connections; reposition lead"],
      ["Failure to fire", "**Complete absence** of pacing spikes despite heart rate dropping below programmed lower rate limit", "**Battery depletion**; broken lead; disconnected pacing cable; extreme oversensing", "**Replace generator/battery**; secure cable connections; switch to asynchronous mode (VOO/DOO)"],
    ],
  }, SOURCE),

  sourced({
    id: "block-pacing-complications",
    type: "bullets",
    heading: "Complications & critical management",
    items: [
      "**Central venous access complications**: vascular injury, hematoma, or arterial puncture managed with direct compression, endovascular management, or surgical repair if non-compressible.",
      "**Pneumothorax / hemothorax**: risk associated with subclavian access; obtain post-procedure upright CXR and treat clinically significant collections with **tube thoracostomy**.",
      "**Cardiac perforation & tamponade**",
      "- **Mechanism**: penetration of the thin-walled RV apex by a stiff transvenous pacing lead",
      "- **Presentation**: sudden loss of capture, pacing failure, hypotension, elevated CVP, pulsus paradoxus, or electrical alternans",
      "- **Diagnosis & management**: emergent transthoracic echocardiogram (TTE/FAST) demonstrating pericardial effusion; immediate pericardiocentesis, followed by emergent sternotomy and cardiac repair if rapid accumulation or hemodynamic collapse occurs",
      "**Pacer-induced arrhythmias**",
      "- **Mechanism**: mechanical irritation of the endocardium or pacing spike falling during the vulnerable repolarization phase (R-on-T phenomenon inducing VT/VF)",
      "- **Management**: ensure synchronous demand sensing (fix undersensing immediately); pharmacologic therapy or cardioversion/defibrillation per ACLS protocols; overdrive pacing or lead repositioning away from irritable myocardium",
    ],
  }, SOURCE),

  sourced({
    id: "block-pacing-warning",
    type: "warning",
    tone: "danger",
    heading: "Undersensing and the lethal R-on-T hazard",
    text: "When pacer sensitivity is set **too low** (i.e., the mV threshold is set too high), the pacemaker fails to detect native QRS complexes and fires asynchronously. A pacing stimulus landing on the vulnerable **T-wave repolarization phase** can immediately trigger lethal ventricular tachycardia or ventricular fibrillation. Always correct undersensing urgently by **decreasing the mV threshold**.",
  }, SOURCE),

  references("block-pacing-references", [SOURCE]),
];

export const cardiacPacingTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000000801",
  versionId: "00000000-0000-4000-8000-000000000811",
  slug: "cardiac-pacing",
  title: "Cardiac Pacing",
  aliases: ["Temporary Cardiac Pacing", "transvenous pacing", "transcutaneous pacing", "epicardial pacing", "pacemaker troubleshooting", "pacer malfunction", "NASPE nomenclature", "VVI pacing", "DDD pacing"],
  scoreNodeId: "critical-care-procedures",
  scoreCategory: "SCORE · Surgical Critical Care · Operations & Procedures",
  tags: ["surgical-critical-care", "cardiac", "pacing", "absite", "score", "icu", "procedures"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-16T00:00:00.000Z",
});
