import { buildTopic, references, sourced } from "@/content/authoring";
import { CRITICAL_CARE_HYPOVOLEMIC_SHOCK_PACKET_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-hypovolemic-summary",
    type: "summary",
    heading: "At a glance",
    text: "Hypovolemic shock is inadequate tissue perfusion from **decreased intravascular volume** — hemorrhagic when the loss is blood, non-hemorrhagic when it is plasma or fluid (GI losses, burns, third-spacing). The hemodynamic signature is **↓ preload, ↓ cardiac output, ↑ systemic vascular resistance**, which separates it from distributive (↓SVR) and cardiogenic (↑filling pressures, ↓CO) shock. In trauma, hypotension is **hemorrhagic until proven otherwise**, and the first abnormal vital sign is tachycardia with a narrowing pulse pressure — not hypotension, which does not appear until roughly 30% of blood volume is gone.",
  }, SOURCE),

  sourced({
    id: "block-hypovolemic-pathophysiology",
    type: "bullets",
    heading: "Pathophysiology & compensation",
    items: [
      "**Oxygen dynamics**: volume and hemoglobin loss create a DO₂/VO₂ mismatch, driving anaerobic metabolism, **lactic acidosis**, and an accumulating oxygen debt that resuscitation must repay.",
      "**Compensation**: an adrenergic surge produces peripheral and splanchnic vasoconstriction, shunting blood to the brain and heart.",
      "Prolonged **splanchnic hypoperfusion** injures the gut mucosa; reperfusion then releases DAMPs and inflammatory mediators that can progress to **multi-organ dysfunction syndrome (MODS)**.",
      "**Trauma-induced coagulopathy (TIC)** is an early, endogenous coagulopathy driven by tissue injury plus hypoperfusion with hyperfibrinolysis, and it is worsened iatrogenically by hemodilution, hypothermia, and acidosis.",
    ],
  }, SOURCE),

  sourced({
    id: "block-hypovolemic-biomarkers-etiology",
    type: "bullets",
    heading: "Biomarkers & etiology",
    items: [
      "**Lactate** marks anaerobic metabolism; failure to clear it within 24 hours correlates with increased mortality, and the resuscitation endpoint is **< 2.0 mmol/L**.",
      "**Base deficit** predicts resuscitation need and mortality at triage, but becomes less reliable after prolonged resuscitation because hyperchloremic acidosis from saline confounds it.",
      "**Trauma and hemorrhage are the most common cause of shock in the injured patient.**",
      "- Other hemorrhagic causes: GI hemorrhage, ruptured aneurysm or vascular injury, surgical or obstetric hemorrhage (ectopic pregnancy, postpartum).",
      "- Non-hemorrhagic causes: severe vomiting or diarrhea, high-output fistula, pancreatitis, and **major burns**.",
    ],
  }, SOURCE),

  sourced({
    id: "block-hypovolemic-bleeding-sites",
    type: "bullets",
    heading: "Anatomic bleeding sites — \"blood on the floor and four more\"",
    items: [
      "**Chest** — hemothorax, great-vessel injury.",
      "**Abdomen/peritoneum** — liver, spleen, mesentery.",
      "**Pelvis/retroperitoneum** — venous plexus and internal iliac branches.",
      "**Thigh/long bones** — femur fractures.",
      "**External** (\"the floor\") — scalp, junctional, and extremity wounds.",
    ],
  }, SOURCE),

  sourced({
    id: "block-hypovolemic-presentation",
    type: "bullets",
    heading: "Clinical presentation",
    items: [
      "**Early**: tachycardia, a narrowing pulse pressure (rising diastolic pressure from vasoconstriction), cool/clammy skin, anxiety, mild tachypnea.",
      "**Late/decompensated**: frank hypotension, marked tachycardia, oliguria, confusion progressing to lethargy or coma.",
      "**Red flags**: persistent hypotension after an initial bolus (transient or non-responder), lactate that fails to clear, and ongoing transfusion requirement.",
      "**Board pitfall**: a \"normal\" systolic blood pressure does not exclude Class II shock, because narrowed pulse pressure and tachycardia precede hypotension. Young patients and athletes compensate until sudden collapse, while **beta-blocked and elderly patients may not mount tachycardia**.",
    ],
  }, SOURCE),

  sourced({
    id: "block-hypovolemic-atls-table",
    type: "table",
    heading: "ATLS classes of hemorrhagic shock (70 kg adult)",
    columns: ["Class", "Blood loss", "Heart rate", "Systolic BP", "Pulse pressure", "Urine output", "Mental status"],
    rows: [
      ["Class I", "< 15% (< 750 mL)", "< 100", "Unchanged", "Normal", "> 30 mL/h", "Slightly anxious"],
      ["Class II", "15–30% (750–1500 mL)", "> 100", "Normal", "Narrowed", "20–30 mL/h", "Mildly anxious"],
      ["Class III", "30–40% (1500–2000 mL)", "> 120", "Decreased (< 90)", "Narrowed", "5–15 mL/h", "Anxious or confused"],
      ["Class IV", "> 40% (> 2000 mL)", "> 140", "Markedly decreased", "Narrowed", "Negligible", "Confused or lethargic"],
    ],
  }, SOURCE),

  sourced({
    id: "block-hypovolemic-differential-table",
    type: "table",
    heading: "Trauma shock differential — \"hypotension after trauma is hemorrhagic until proven otherwise\"",
    columns: ["Shock type", "JVD / CVP", "Breath sounds", "Distinguishing clue", "Immediate action"],
    rows: [
      ["Hemorrhagic", "Decreased (flat neck veins)", "Equal bilaterally", "Source found in one of the \"four places,\" FAST positive", "Control bleeding, transfuse blood"],
      ["Tension pneumothorax", "Increased", "Unilateral absent breath sounds, hyperresonant, tracheal deviation", "Obstructive shock from trapped intrathoracic pressure", "Needle or finger thoracostomy before imaging"],
      ["Cardiac tamponade", "Increased (may be absent if hypovolemic)", "Equal bilaterally", "Beck triad, pericardial fluid on FAST", "Pericardiocentesis or thoracotomy"],
      ["Neurogenic", "Decreased", "Equal bilaterally", "Hypotension with relative bradycardia and warm extremities, injury at or above T6", "Vasopressors after volume"],
      ["Blunt cardiac injury / cardiogenic", "Increased", "Equal bilaterally", "Arrhythmia, elevated troponin, wall-motion abnormality", "Inotropes, monitor"],
    ],
  }, SOURCE),

  sourced({
    id: "block-hypovolemic-workup",
    type: "bullets",
    heading: "Diagnosis & workup",
    items: [
      "**First-line**: ABCDE primary survey plus **FAST** (extended eFAST for the chest); FAST identifies free fluid but cannot exclude retroperitoneal or pelvic bleeding.",
      "**Labs**: type and crossmatch, lactate, base deficit, ABG, CBC (initial hemoglobin may be normal in acute hemorrhage), coagulation panel, ionized calcium, and viscoelastic testing (TEG/ROTEM).",
      "**Hemodynamically unstable with a positive FAST** → operating room, no CT.",
      "**Hemodynamically stable or a transient responder** → CT angiography to localize and characterize the source.",
      "**Pelvis**: an AP pelvic X-ray; an unstable pelvic fracture with shock goes to a binder, then OR packing and/or angioembolization.",
      "**POCUS**: a collapsible, under-filled IVC supports hypovolemia.",
    ],
  }, SOURCE),

  sourced({
    id: "block-hypovolemic-dcr-flow",
    type: "flow",
    heading: "Damage-control resuscitation pathway",
    nodes: [
      { id: "recognize", label: "Hemorrhagic shock recognized: trauma, GI, vascular, or obstetric source" },
      { id: "control", label: "Immediate hemorrhage control: direct pressure, tourniquet, junctional packing" },
      { id: "permissive", label: "Permissive hypotensive resuscitation targeting SBP 80 to 90 mmHg" },
      { id: "tbi", label: "Concomitant severe TBI (GCS ≤ 8): raise the target to SBP > 90 to 110 mmHg", tone: "caution" },
      { id: "mtp", label: "Activate the massive transfusion protocol: whole blood, or 1:1:1 plasma, platelets, and RBC" },
      { id: "txa", label: "Tranexamic acid within 3 hours of injury" },
      { id: "sourcecontrol", label: "Definitive hemorrhage control: operating room, angioembolization, or endoscopy" },
      { id: "lethaltriad", label: "Lethal triad persists: acidosis, hypothermia, and coagulopathy", tone: "caution" },
      { id: "dcs", label: "Damage-control surgery: abbreviated laparotomy, packing, temporary abdominal closure", tone: "caution" },
      { id: "definitive", label: "Definitive repair after ICU rewarming and correction", tone: "good" },
    ],
    edges: [
      { from: "recognize", to: "control" },
      { from: "control", to: "permissive" },
      { from: "permissive", to: "mtp", label: "no severe TBI" },
      { from: "permissive", to: "tbi", label: "severe traumatic brain injury present" },
      { from: "mtp", to: "txa" },
      { from: "txa", to: "sourcecontrol" },
      { from: "sourcecontrol", to: "definitive", label: "hemostasis achieved, no lethal triad" },
      { from: "sourcecontrol", to: "lethaltriad", label: "lethal triad emerges" },
      { from: "lethaltriad", to: "dcs" },
      { from: "dcs", to: "definitive", label: "after ICU rewarming and correction" },
    ],
  }, SOURCE),

  sourced({
    id: "block-hypovolemic-resuscitation-detail",
    type: "bullets",
    heading: "↳ Transfusion, calcium & TXA detail",
    items: [
      "**Whole blood** is increasingly the preferred single product where available.",
      "**Component ratio**: 1:1:1 plasma:platelets:RBC — PROPPR showed more hemostasis and fewer 24-hour exsanguination deaths versus 1:1:2, with no difference in 24-hour or 30-day all-cause mortality.",
      "**MTP trigger**: an anticipated need for more than 10 units of RBC per 24 hours, or 4 or more units in 1 hour, or a positive ABC score or shock index.",
      "**Board-classic versus current evidence**: boards still teach strict 1:1:1, but recent guideline data support a plateau at a plasma:RBC ratio of roughly 1:1 to 1:1.5, with diminishing returns beyond 1:1.5.",
      "**Calcium**: citrate in transfused products chelates calcium, producing the \"diamond of death\" hypocalcemia — replace IV calcium after roughly every 2 to 4 units of blood product and keep ionized calcium above 1.1 mmol/L.",
      "**Tranexamic acid (TXA)**: 1 g IV over 10 minutes within 3 hours of injury, then 1 g over 8 hours; CRASH-2 showed roughly a 10% mortality reduction, but harm if given beyond 3 hours.",
      "**Board-classic versus current evidence**: CRASH-2 established near-universal early TXA, but PATCH-Trauma (in mature trauma systems) showed no functional-outcome benefit at 6 months and a dose-dependent thromboembolism signal — the clearest benefit remains in early (under 1 to 2 hours), severely hypotensive patients.",
      "**Viscoelastic-guided therapy (TEG/ROTEM)** targets cryoprecipitate or fibrinogen, platelets, or additional TXA — for example, LY30 above 3% or TEG clot lysis above 10% prompts an antifibrinolytic.",
      "**Non-hemorrhagic hypovolemia**: balanced crystalloid (Lactated Ringer's) first-line; avoid large-volume normal saline, which causes hyperchloremic acidosis. For burns, use LR by the Parkland or modified Brooke formula titrated to urine output. Albumin is an adjunct in burns and after large-volume paracentesis, but should be **avoided in traumatic brain injury**, where the SAFE trial showed increased mortality.",
    ],
  }, SOURCE),

  sourced({
    id: "block-hypovolemic-surgical-hemostasis",
    type: "bullets",
    heading: "↳ Surgical & interventional hemostasis",
    items: [
      "**Damage-control surgery** is triggered by the lethal triad — acidosis (pH < 7.2), hypothermia (< 35°C), and coagulopathy, sometimes with hypocalcemia completing the \"diamond of death\" — not by anatomy. The sequence is abbreviated laparotomy: packing, vascular ligation or shunting, contamination control, then temporary abdominal closure, ICU rewarming and correction, and planned re-exploration.",
      "**Pelvic fracture hemorrhage**: a binder placed over the greater trochanters, followed by preperitoneal packing and/or angioembolization.",
      "**REBOA** provides temporizing aortic occlusion. **Zone 1** (descending thoracic aorta, above the celiac axis) is used for abdominal hemorrhage, and **Zone 3** (infrarenal) for pelvic or junctional hemorrhage; **Zone 2** (paravisceral) is avoided. Deflation should be coordinated with anesthesia to blunt reperfusion washout and the afterload drop.",
      "**Board-classic versus current evidence**: registry and propensity-matched data suggested REBOA might improve survival versus resuscitative thoracotomy in selected shock patients, but the **UK-REBOA randomized trial was stopped for harm** (roughly 87% posterior probability of increased 90-day mortality) — net benefit remains uncertain and center- and selection-dependent.",
      "**GI hemorrhage** is localized by endoscopy or CT angiography; endoscopic therapy and interventional-radiology embolization are first-line, and surgery is reserved for refractory bleeding.",
    ],
  }, SOURCE),

  sourced({
    id: "block-hypovolemic-endpoints",
    type: "bullets",
    heading: "Resuscitation endpoints & complications",
    items: [
      "**Goal-directed endpoints**: heart rate < 90, systolic BP > 90 mmHg, lactate < 2.0 mmol/L with a normalizing base deficit, urine output ≥ 0.5 mL/kg/h in adults (> 1 mL/kg/h in children), SvO₂ 65–75%, normalized TEG/ROTEM, and a POCUS view of an adequately filled IVC without respiratory collapse.",
      "**Complications**: abdominal compartment syndrome (bladder pressure > 20 mmHg with organ dysfunction, requiring decompressive laparotomy), acute kidney injury, ARDS, MODS, coagulopathy, transfusion reactions including TRALI and TACO, citrate-induced hypocalcemia, hyperkalemia, hypothermia, and ischemia-reperfusion injury (especially after aortic occlusion).",
    ],
  }, SOURCE),

  sourced({
    id: "block-hypovolemic-warning",
    type: "warning",
    tone: "danger",
    heading: "Tranexamic acid has a narrow window",
    text: "**Tranexamic acid** only helps within 3 hours of injury; CRASH-2 showed a mortality benefit in that window, but giving it later can increase death. Reflexively dosing TXA on a delayed presentation trades a possible benefit for a real, dose-dependent thromboembolic harm.",
  }, SOURCE),

  sourced({
    id: "block-hypovolemic-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "**↓ CVP + ↓ cardiac output + ↑ SVR = hypovolemic shock.** Contrast: distributive shock has ↓ SVR; cardiogenic shock has ↑ CVP with ↓ CO.",
      "**First sign of shock is tachycardia with a narrowed pulse pressure; hypotension marks roughly 30% loss (Class III).**",
      "**Hypotension after trauma is hemorrhagic until proven otherwise** — if jugular venous distension is present, think tension pneumothorax or tamponade instead.",
      "**A warm, hypotensive, bradycardic trauma patient suggests neurogenic shock** (injury at or above T6).",
      "**Minimize crystalloid; give blood in a 1:1:1 ratio (or whole blood).** The reflex \"2 L crystalloid\" bolus is outdated.",
      "**Replace calcium during massive transfusion** to prevent the \"diamond of death.\"",
      "**Avoid albumin in traumatic brain injury.**",
      "**REBOA**: Zone 1 for the abdomen, Zone 3 for the pelvis; survival benefit is registry-based, and the UK-REBOA randomized trial showed harm.",
    ],
  }, SOURCE),

  references("block-hypovolemic-references", [SOURCE]),
];

export const hypovolemicShockTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000001701",
  versionId: "00000000-0000-4000-8000-000000001711",
  slug: "hypovolemic-shock",
  title: "Hypovolemic Shock",
  aliases: ["hemorrhagic shock", "hypovolemic hemorrhagic shock", "ATLS shock classification", "classes of hemorrhagic shock", "damage control resuscitation", "DCR", "massive transfusion protocol", "MTP", "1:1:1 transfusion", "diamond of death", "lethal triad", "REBOA", "resuscitative endovascular balloon occlusion of the aorta", "tranexamic acid", "TXA", "blood on the floor and four more"],
  scoreNodeId: "critical-care-conditions",
  scoreCategory: "SCORE · Surgical Critical Care · Diseases & Conditions",
  tags: ["surgical-critical-care", "shock", "trauma", "absite", "score", "icu"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-25T00:00:00.000Z",
});
