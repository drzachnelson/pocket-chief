import { buildTopic, references, sourced } from "@/content/authoring";
import { TRAUMA_CARDIAC_INJURY_PACKET_SOURCE as PACKET } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-ci-summary",
    type: "summary",
    heading: "At a glance",
    text: "Cardiac trauma spans penetrating cardiac injury, where the outcome hinges on whether the wound tamponades or exsanguinates into the pleural space, and blunt cardiac injury, a spectrum from silent contusion to free-wall rupture. FAST has replaced the diagnostic pericardial window as the first-line screening test for penetrating injury, but a wound that decompresses into a hemothorax can produce a false-negative FAST, and an unstable patient with a positive FAST goes straight to the operating room — never to the CT scanner. Blunt cardiac injury is screened with ECG and troponin, where a normal pair carries a near-100% negative predictive value. The single biggest practice change in this topic is that a stable patient with a sealed hemopericardium on subxiphoid window no longer needs a mandatory sternotomy — drainage alone is a validated, randomized alternative — though the board-classic answer of mandatory sternotomy is still what many exams expect.",
  }, PACKET),
  sourced({
    id: "block-ci-pathophysiology",
    type: "bullets",
    heading: "Definition and pathophysiology",
    items: [
      "Cardiac trauma is injury to the myocardium, pericardium, valves, coronary arteries, or great-vessel roots from penetrating (stab or gunshot) or blunt (deceleration, direct impact, hydraulic ram) mechanisms.",
      "**Penetrating cardiac injury**: direct chamber laceration leads to hemopericardium, which produces **tamponade** if the pericardial defect is small or sealing, or an **exsanguinating hemothorax** if the wound instead decompresses into the pleural space — this distinction drives the false-negative FAST pitfall.",
      "**Blunt cardiac injury** spans a spectrum from clinically silent myocardial contusion to dysrhythmia to free-wall rupture, via direct precordial impact, deceleration shear at the atriocaval junction, a hydraulic ram effect transmitting force from the abdomen or extremities into the right atrium, or compression between the sternum and spine.",
      "Pericardial anatomy explains the physiology: normal pericardial fluid is up to roughly **30 mL**, and the stiff parietal pericardium cannot acutely stretch, so even small, rapid accumulations spike intrapericardial pressure. The low-pressure right-sided chambers — right atrium and venae cavae — collapse first, and the hemodynamic effect depends on the **rate** of accumulation, not the absolute volume.",
    ],
  }, PACKET),
  sourced({
    id: "block-ci-epidemiology",
    type: "bullets",
    heading: "Etiology and epidemiology",
    items: [
      "Penetrating mechanisms — stab and gunshot wounds — are the classic and leading surgical cause of tamponade in trauma; **gunshot wounds carry markedly worse survival than stab wounds**.",
      "Blunt mechanisms rank motor vehicle collision as most common, followed by falls, blast, and sports (commotio cordis).",
      "Overall penetrating cardiac injury survival is roughly **19%**, with a large share of deaths at the scene; roughly **40%** of those reaching a trauma center survive. Stab wounds carry roughly **27% survival versus roughly 4% for gunshot wounds** to discharge.",
      "The **cardiac box** is bounded by the sternal notch superiorly, the xiphoid tip inferiorly, and the bilateral midclavicular lines laterally; a penetrating wound here carries roughly **15 to 20% risk of cardiac injury**, though injury outside the box is not excluded.",
      "Suspect blunt cardiac injury in high-energy motor vehicle collision, sternal fracture, multiple rib fractures, new arrhythmia after blunt chest trauma, or unexplained hypotension or tachycardia.",
    ],
  }, PACKET),
  sourced({
    id: "block-ci-presentation",
    type: "bullets",
    heading: "Clinical presentation",
    items: [
      "Tamponade's **Beck triad** — hypotension, distended neck veins, and muffled heart sounds — is present as a complete triad in only a minority of patients; jugular venous distention may be absent with concomitant hypovolemia.",
      "**Pulsus paradoxus** (inspiratory systolic blood pressure drop over 10 mmHg) and **Kussmaul sign** (rise in jugular venous pressure with inspiration) support tamponade physiology.",
      "Cardiac herniation or strangulation follows a pericardial tear, typically parallel to the phrenic nerve, causing apical herniation and positional hypotension.",
      "Red flags: shock on admission, traumatic arrest with signs of life, and a transmediastinal trajectory, which raises concern for combined cardiac, great-vessel, and tracheobronchial injury.",
    ],
  }, PACKET),
  sourced({
    id: "block-ci-chamber",
    type: "bullets",
    heading: "Chamber vulnerability",
    items: [
      "The **right ventricle is most commonly injured overall**, in both penetrating and blunt patterns, because it is the most anterior and most exposed chamber; some series report the left ventricle as the most frequently injured single chamber in penetrating injury.",
      "**Right ventricular injury carries the best survival**; multichamber injury and gunshot mechanism carry the worst.",
    ],
  }, PACKET),
  sourced({
    id: "block-ci-diagnostic-flow",
    type: "flow",
    heading: "Unstable versus stable: the diagnostic pathway",
    nodes: [
      { id: "present", label: "Suspected cardiac injury after penetrating or blunt chest trauma" },
      { id: "unstable", label: "Hemodynamically unstable", tone: "caution" },
      { id: "fast", label: "FAST (subxiphoid cardiac plus parasternal views) — first-line, standard of care" },
      { id: "fastpos", label: "Positive FAST plus instability", tone: "caution" },
      { id: "or", label: "Operating room (sternotomy) or resuscitative thoracotomy — never the CT scanner", tone: "caution" },
      { id: "fastnegsuspicion", label: "Negative FAST but suspicion remains high", tone: "caution" },
      { id: "window", label: "Subxiphoid pericardial window or operative exploration" },
      { id: "stable", label: "Hemodynamically stable, penetrating cardiac-box wound" },
      { id: "cxrfast", label: "CXR plus FAST" },
      { id: "mdct", label: "Contrast-enhanced MDCT (64-slice or greater) to define trajectory if FAST is negative" },
    ],
    edges: [
      { from: "present", to: "unstable" },
      { from: "present", to: "stable" },
      { from: "unstable", to: "fast" },
      { from: "fast", to: "fastpos" },
      { from: "fastpos", to: "or" },
      { from: "fast", to: "fastnegsuspicion" },
      { from: "fastnegsuspicion", to: "window" },
      { from: "stable", to: "cxrfast" },
      { from: "cxrfast", to: "mdct" },
    ],
  }, PACKET),
  sourced({
    id: "block-ci-fast-warning",
    type: "warning",
    tone: "danger",
    heading: "A negative FAST does not exclude penetrating cardiac injury",
    text: "A cardiac wound that **decompresses into the pleural space as a hemothorax**, massive subcutaneous emphysema, or poor acoustic windows can all produce a **false-negative FAST**. If suspicion remains high despite a negative FAST, proceed to a subxiphoid pericardial window or operative exploration rather than trusting the negative scan.",
  }, PACKET),
  sourced({
    id: "block-ci-bci-workup",
    type: "bullets",
    heading: "Blunt cardiac injury: workup",
    items: [
      "Obtain an admission **ECG and troponin I** in all suspected blunt cardiac injury; the most common ECG finding is sinus tachycardia, with ST/T changes, new right bundle branch block, AV block, atrial fibrillation, and PVCs or ventricular arrhythmia also seen.",
      "**A normal ECG plus a normal troponin effectively rules out blunt cardiac injury** (combined negative predictive value roughly 100%) — safe to discharge if no other admitting injury requires observation.",
      "If troponin is elevated, manage in a monitored setting with serial troponins; nuclear studies add nothing, and cardiac CT or MRI can help distinguish acute myocardial infarction from blunt cardiac injury.",
      "Echocardiography — transthoracic first-line, transesophageal if windows are poor or the patient is intubated — is indicated for hemodynamic instability, rising troponin, new arrhythmia, or suspected structural injury.",
      "Numeric thresholds are still evolving: conventional troponin I over 0.04 ng/mL or high-sensitivity troponin I over 18 ng/L is used as a screen-positive, but one level-1 center found roughly **40 ng/L optimized accuracy** for clinically significant blunt cardiac injury; board-classic teaching (ECG plus troponin) still stands, and exact high-sensitivity cutoffs are not standardized.",
    ],
  }, PACKET),
  sourced({
    id: "block-ci-ois-table",
    type: "table",
    heading: "AAST Cardiac Organ Injury Scale",
    columns: ["Grade", "Definition"],
    rows: [
      ["I", "Blunt injury with minor ECG changes, or a nonpenetrating pericardial wound without tamponade"],
      ["II", "Blunt injury with heart block or ischemic changes without failure; tangential myocardial wound not extending through the endocardium, no tamponade"],
      ["III", "Sustained arrhythmia or failure; penetrating tangential wound up to but not through the endocardium, with tamponade"],
      ["IV", "Perforation of a chamber; injury with septal rupture, valvular incompetence, or coronary occlusion"],
      ["V", "Proximal coronary artery injury; left ventricular perforation; right atrial, right ventricular, or left atrial perforation"],
      ["VI", "Blunt avulsion of the heart; multichamber penetrating injury with over 50% chamber tissue loss"],
    ],
  }, PACKET),
  sourced({
    id: "block-ci-prognosis",
    type: "bullets",
    heading: "Prognostic pearls by grade",
    items: [
      "Higher organ injury scale grade tracks higher mortality: roughly **75% for grade V and roughly 100% for grade VI**, which is near-uniformly fatal.",
      "**Sinus rhythm when the pericardium is opened predicts survival**; the presence of tamponade by itself does **not** predict outcome.",
    ],
  }, PACKET),
  sourced({
    id: "block-ci-rt",
    type: "bullets",
    heading: "Resuscitative thoracotomy: indications and outcomes",
    items: [
      "Indications (WTA): **penetrating torso trauma with under 15 minutes of CPR**, **blunt trauma with under 10 minutes of CPR** (under 5 minutes for penetrating neck or extremity trauma), and profound refractory shock (SBP under 60 mmHg) or arrest with signs of life.",
      "Objectives: release tamponade, control intrathoracic hemorrhage, perform open cardiac massage, cross-clamp the aorta, and achieve hilar control for bronchovenous air embolism.",
      "**Salvageability is defined as SBP over 70 mmHg** after the procedure, with or without cross-clamp.",
      "Outcomes: roughly **15% survival overall for penetrating injury**, roughly **35% for a penetrating cardiac wound arriving in shock**, and roughly **2% for blunt trauma** — near-futile. Prehospital resuscitative thoracotomy for isolated tamponade can yield neurologically intact survival if performed within minutes; exsanguination survival is roughly 1.6%, and combined tamponade plus exsanguination approaches futility.",
    ],
  }, PACKET),
  sourced({
    id: "block-ci-incisions",
    type: "table",
    heading: "Operative approach: incisions",
    columns: ["Incision", "Best exposure", "Use"],
    rows: [
      ["Left anterolateral thoracotomy (5th ICS)", "Lateral LV, descending aorta, left hilum", "Resuscitative thoracotomy or in extremis; extend to clamshell for bilateral access"],
      ["Median sternotomy", "RA, RV, ascending aorta, arch, arch vessels", "Definitive repair of a known cardiac injury or a positive window in a stable OR patient; poor for the posterior mediastinum or descending aorta"],
    ],
  }, PACKET),
  sourced({
    id: "block-ci-repair-steps",
    type: "sequence",
    heading: "Repair technique",
    steps: [
      { title: "Achieve temporary control", detail: "Digital pressure, Foley balloon tamponade, or skin staples; avoid inflow-occlusion pitfalls." },
      { title: "Suture adjacent to a coronary artery correctly", detail: "Pass horizontal mattress sutures deep to (underneath) the vessel to avoid ligating or strangulating it." },
      { title: "Screen for occult structural injury", detail: "Palpate for a thrill suggesting a traumatic VSD or valve avulsion, and obtain postoperative echocardiography." },
      { title: "Manage a coronary artery injury", detail: "For LAD or left-main injury, the highest-risk vessels, obtain angiography and proceed to PCI or CABG as indicated." },
    ],
  }, PACKET),
  sourced({
    id: "block-ci-pericardial-window",
    type: "bullets",
    heading: "Pericardial window options",
    items: [
      "Subxiphoid (classic), transdiaphragmatic (during laparotomy), and laparoscopic transdiaphragmatic in stable penetrating thoracoabdominal wounds; leave the pericardial or central-tendon defect open.",
    ],
  }, PACKET),
  sourced({
    id: "block-ci-sternotomy-board-note",
    type: "prose",
    heading: "Board answer versus current practice: sternotomy versus drainage",
    text: "Board-classic teaching mandates a sternotomy for any hemopericardium. The landmark **Nicol and Navsaria randomized trial (Ann Surg, 2014)** tested this directly: in hemodynamically stable patients with hemopericardium confirmed at a subxiphoid window and no active bleeding, drainage and washout alone was as safe as sternotomy — **93% of the sternotomy group had no injury or a sealed tangential wound**, and the drainage group had a shorter ICU and hospital stay with no increase in mortality. Current evidence supports drainage alone in selected stable patients with a sealed injury; the mandatory-sternotomy answer is still what many exams expect.",
  }, PACKET),
  sourced({
    id: "block-ci-fast-board-note",
    type: "prose",
    heading: "Board answer versus current practice: pericardial window versus FAST",
    text: "The diagnostic subxiphoid pericardial window was once the standard screening step for suspected cardiac injury. **FAST has since supplanted it as the first-line, standard-of-care screening test**, reserving the window for cases where FAST is negative but suspicion remains high, or for the diagnostic step itself when FAST is unavailable.",
  }, PACKET),
  sourced({
    id: "block-ci-complications",
    type: "bullets",
    heading: "Complications and management",
    items: [
      "**Post-pericardiotomy syndrome or traumatic pericarditis**: fever, pleuritic pain, and a friction rub, with diffuse ST elevation and PR depression (PR elevation in aVR) on ECG — treat with NSAIDs, with or without colchicine or steroids.",
      "A ventricular aneurysm needs operative repair given rupture and heart-failure risk; an intracardiac mural thrombus needs anticoagulation; suppurative pericarditis needs surgical drainage.",
      "Systemic air embolism — air visible in the coronaries at thoracotomy — is managed with Trendelenburg and left lateral decubitus positioning, aspirating air from the LV or aortic root, hilar clamping, and 100% oxygen.",
    ],
  }, PACKET),
  sourced({
    id: "block-ci-followup",
    type: "bullets",
    heading: "Follow-up, surveillance, and disposition",
    items: [
      "Blunt cardiac injury disposition: a normal ECG and troponin need no further workup; nonspecific ECG changes get roughly **12 hours of telemetry**; a significant arrhythmia or new block gets **24 to 48 hours of telemetry plus echocardiography**.",
      "Post-repair surveillance includes echocardiography before discharge and at follow-up, watching for delayed VSD or ASD, valvular incompetence, ventricular aneurysm, and mural thrombus.",
    ],
  }, PACKET),
  sourced({
    id: "block-ci-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "**Unstable plus positive FAST means the operating room or thoracotomy, not CT** — an unstable patient never goes to the scanner.",
      "**Normal ECG plus normal troponin rules out blunt cardiac injury** (combined negative predictive value roughly 100%); sinus tachycardia is the most common ECG finding.",
      "A laceration adjacent to a coronary artery is repaired with mattress sutures passed **under** the artery, never around it.",
      "Resuscitative thoracotomy survival is roughly **35% for a penetrating cardiac wound in shock versus roughly 2% for blunt trauma** — blunt arrest is near-futile.",
    ],
  }, PACKET),
  references("block-ci-references", [PACKET]),
];

export const cardiacInjuryTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000001235",
  versionId: "00000000-0000-4000-8000-000000001245",
  slug: "cardiac-injury",
  title: "Cardiac Injury",
  aliases: ["cardiac trauma", "penetrating cardiac injury", "blunt cardiac injury", "BCI", "myocardial contusion", "cardiac tamponade", "Beck triad", "pulsus paradoxus", "cardiac box", "AAST cardiac organ injury scale", "cardiac OIS", "resuscitative thoracotomy", "hemopericardium", "pericardial window", "subxiphoid window", "traumatic VSD", "post-pericardiotomy syndrome", "commotio cordis", "cardiac herniation", "coronary artery injury", "FAST cardiac"],
  scoreNodeId: "trauma-conditions",
  scoreCategory: "SCORE · Trauma · Diseases & Conditions",
  tags: ["trauma", "thoracic-trauma", "cardiac", "absite", "score"],
  sourceId: PACKET,
  blocks,
  reviewedAt: "2026-08-21T00:00:00.000Z",
});
