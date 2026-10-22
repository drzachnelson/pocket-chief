import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  ACC_AHA_AORTIC_2022_SOURCE as ACC_AHA,
  AORTIC_DISSECTION_OE_SOURCE as OE,
  FISER_VASCULAR_SOURCE as FISER,
  SCORE_AORTIC_DISSECTION_SOURCE as SCORE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Packet: ~/Desktop/Pocket Chief/Inbox/2026-10-14-acute-aortic-dissection/1-packet.md (S1 SCORE Acute Aortic Dissection,
// S2 Fiser chapter 27), checked against the folder's OpenEvidence document. Statements the packet flagged as beyond its
// sources cite the OpenEvidence document, and the 2022 ACC/AHA guideline where its published summary was checked directly.
const blocks: TopicBlock[] = [
  sourcedUnits({
    id: "block-aad-summary",
    type: "summary",
    heading: "At a glance",
    text: "Acute aortic dissection begins when a transverse **intimal tear** lets surging blood cleave the intima and part of the media away from the adventitia, creating a **false lumen** in a wall weakened by cystic medial degeneration and long-standing hypertension. Any dissection involving the ascending aorta is a **Stanford type A** dissection and a surgical emergency; a dissection sparing the ascending aorta is **Stanford type B** and is managed with ICU **impulse control** unless rupture or malperfusion makes it complicated. Impulse control targets a heart rate near 60 and a systolic pressure of 100 to 120 mm Hg to reduce the force and frequency of aortic pulsation that propagate the flap. By timing, a dissection is acute within 14 days, subacute from 15 to 90 days, and chronic after 90 days.",
  }, [[SCORE, OE]]),

  sourced({
    id: "block-aad-risk",
    type: "bullets",
    heading: "Risk factors and predisposing conditions",
    items: [
      "Long-standing hypertension predisposes to acute aortic dissection and contributes to propagation of the dissection plane.",
      "Tobacco use is a recognized risk factor.",
      "Cocaine exposure can precipitate dissection.",
      "Pregnancy is a recognized risk factor.",
      "A bicuspid aortic valve predisposes to dissection.",
      "Coarctation of the aorta predisposes to dissection.",
      "**Marfan**, **Loeys-Dietz** and **Ehlers-Danlos** syndromes are the syndromic conditions that predispose to aortic dissection.",
      "Cystic medial degeneration weakens the aortic wall through focal loss of elastic fibers and increased glycoprotein deposition.",
      "Altered transforming growth factor-beta signaling in aortic smooth muscle cells contributes to dissection.",
      "Nonsyndromic familial gene alterations can predispose to thoracic aortic dissection and aneurysm without a recognizable clinical syndrome.",
    ],
  }, SCORE),

  sourced({
    id: "block-aad-classification",
    type: "table",
    heading: "Stanford and DeBakey classification",
    columns: ["System and type", "Anatomic extent", "Treatment implication"],
    rows: [
      ["Stanford type A", "Involves the ascending aorta, whatever its distal extent", "Emergent open surgical repair"],
      ["Stanford type B", "Does not involve the ascending aorta", "Initial medical therapy unless rupture or malperfusion supervenes"],
      ["DeBakey type I", "The entire aorta, from the ascending aorta to the bifurcation", "Managed as Stanford type A, because the ascending aorta is involved"],
      ["DeBakey type II", "Only the ascending aorta", "Managed as Stanford type A, with emergent repair"],
      ["DeBakey type IIIa", "Only the descending thoracic aorta", "Managed as Stanford type B"],
      ["DeBakey type IIIb", "The entire postarch aorta, from the descending thoracic aorta to the bifurcation", "Managed as Stanford type B, with close surveillance for visceral involvement"],
    ],
  }, SCORE),

  sourced({
    id: "block-aad-fiser",
    type: "bullets",
    heading: "Presentation and diagnosis: the board pearls",
    items: [
      "Dissection classically presents with **tearing** chest pain that can radiate to the back.",
      "Dissection can mimic myocardial infarction, so it must be excluded before antithrombotic therapy is committed to.",
      "Unequal pulses or unequal blood pressures in the upper extremities support the diagnosis.",
      "Fiser keys that 95% of patients have severe hypertension at presentation.",
      "A chest radiograph is usually normal, although the mediastinum may appear widened.",
      "Contrast-enhanced CT of the chest is the diagnostic test Fiser keys.",
      "The dissection plane lies within the **medial** layer of the vessel wall.",
      "Fiser keys aortic insufficiency in 70% of dissections, from annular dilatation or a sheared aortic valve cusp.",
      "Most dissections start in the ascending aorta.",
      "Death from ascending dissection usually results from cardiac failure due to aortic insufficiency, pericardial tamponade, or rupture.",
    ],
  }, FISER),

  sourced({
    id: "block-aad-triage",
    type: "flow",
    heading: "Emergency triage by Stanford type and complication status",
    nodes: [
      { id: "presentation", label: "CT angiography of the chest, abdomen and pelvis confirms acute dissection in a monitored patient" },
      { id: "ascending", label: "Ascending aorta involved: Stanford type A" },
      { id: "descending", label: "Ascending aorta spared: Stanford type B" },
      { id: "complicated", label: "Complicated type B: threatened or confirmed rupture, or malperfusion of a downstream bed", tone: "caution" },
      { id: "uncomplicated", label: "Uncomplicated type B: no rupture and no malperfusion" },
      { id: "surgery", label: "Emergent open repair replaces the ascending aorta and restores aortic valve position and function", tone: "good" },
      { id: "tevar", label: "TEVAR covers the proximal entry tear and restores true-lumen diameter and patency", tone: "good" },
      { id: "medical", label: "ICU impulse control: systolic 100 to 120 mm Hg, heart rate near 60", tone: "good" },
    ],
    edges: [
      { from: "presentation", to: "ascending", label: "Flap extends into the ascending aorta" },
      { from: "presentation", to: "descending", label: "Flap spares the ascending aorta" },
      { from: "ascending", to: "surgery", label: "A surgical emergency from the moment it is recognized" },
      { from: "descending", to: "complicated", label: "A bed loses perfusion or the aorta threatens to rupture" },
      { from: "descending", to: "uncomplicated", label: "Every bed perfused and the aorta intact" },
      { from: "complicated", to: "tevar", label: "Cover the most proximal entry tear" },
      { from: "uncomplicated", to: "medical", label: "Beta blockade in the ICU" },
    ],
  }, SCORE),

  sourcedUnits({
    id: "block-aad-impulse",
    type: "sequence",
    heading: "Impulse control: rate first, pressure second",
    steps: [
      { title: "Admit to the ICU", detail: "Continuous monitoring of blood pressure, renal function and limb perfusion." },
      { title: "Beta-block first with esmolol", detail: "A short-acting beta-blocker decreases the frequency and force of aortic pulsation and limits further dissection." },
      { title: "Reach the heart rate target", detail: "Bring the heart rate to near 60 before adding a vasodilator." },
      { title: "Reach the systolic target", detail: "Lower the systolic pressure to 100 to 120 mm Hg once rate control is established." },
      { title: "Add afterload reduction second", detail: "Nicardipine or nitroprusside lowers pressure without raising aortic shear stress, because the beta-blocker has already blunted reflex tachycardia." },
      { title: "Substitute when beta-blockers are contraindicated", detail: "A non-dihydropyridine calcium channel blocker such as **diltiazem** provides rate and pressure control." },
      { title: "Control pain", detail: "Adequate analgesia blunts the pain-driven sympathetic surges that raise pressure and wall stress." },
      { title: "Reassess for malperfusion", detail: "Serial abdominal examinations, renal function and lower-extremity perfusion checks catch evolving malperfusion before it becomes irreversible." },
    ],
  }, [[SCORE], [SCORE], [SCORE], [SCORE], [SCORE, ACC_AHA], [SCORE, ACC_AHA, OE], [OE], [SCORE]]),

  sourced({
    id: "block-aad-complications",
    type: "table",
    heading: "Complications that change management",
    columns: ["Territory or event", "What the dissection does", "Required response"],
    rows: [
      ["Pericardial tamponade", "A type A dissection bleeds into the pericardium", "Emergent open surgical repair"],
      ["Aortic valve", "A type A dissection distorts the valve and causes acute aortic insufficiency", "Emergent repair that restores valve position and function"],
      ["Coronary arteries", "A type A dissection extends into a coronary ostium and causes coronary malperfusion", "Emergent open surgical repair"],
      ["Cerebral circulation", "A type B dissection with malperfusion causes stroke", "Urgent intervention on the type B dissection"],
      ["Visceral circulation", "A type B dissection with malperfusion causes visceral ischemia and metabolic acidosis", "Urgent intervention, usually TEVAR"],
      ["Lower extremity", "A type B dissection with malperfusion causes limb ischemia", "Urgent intervention, with adjunctive bypass if perfusion is not restored"],
      ["Aortic rupture", "Threatened or confirmed rupture of a type B dissection, which can present as a left hemothorax", "Urgent repair, usually TEVAR covering the proximal entry tear"],
    ],
  }, SCORE),

  sourced({
    id: "block-aad-warning",
    type: "warning",
    heading: "Malperfusion can develop in any bed, and late aneurysm is the long-term threat",
    tone: "danger",
    text: "Type A dissections kill through **pericardial tamponade**, acute aortic valve insufficiency and coronary malperfusion, so ascending involvement mandates immediate operative repair rather than prolonged medical stabilization. A type B dissection can malperfuse any involved or downstream bed: follow serial abdominal examinations and **metabolic acidosis** for mesenteric ischemia, serial renal function for renal malperfusion, and serial lower-extremity examinations for limb ischemia. On CT angiography the false lumen is generally the **larger** lumen, because it is contained only by adventitia while the true lumen is compressed; branch supply varies, but the true lumen most often feeds the celiac axis, superior mesenteric artery and right renal artery, and the false lumen most often the left renal artery. Every survivor needs lifelong blood pressure control and regular cross-sectional imaging, because late aneurysmal degeneration of the dissected aorta can rupture if it is not corrected.",
  }, SCORE),

  sourcedUnits({
    id: "block-aad-splits",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Drug order", "Fiser: IV beta-blocker such as esmolol plus nitroprusside", "Beta-blockade is established before any vasodilator, so reflex tachycardia cannot raise aortic shear stress"],
      ["Heart rate and pressure targets", "SCORE: heart rate near 60 and systolic 100 to 120 mm Hg", "ACC/AHA 2022: heart rate 60 to 80 and systolic under 120 mm Hg, or the lowest that keeps end organs perfused; same principle, different numbers"],
      ["Complicated type B", "Fiser: endograft or open repair through a left thoracotomy as equal options, or flap fenestration for ischemia", "SCORE: nearly all indicated type B repairs are now TEVAR; ACC/AHA prefers endovascular over open repair for rupture, with open surgery and fenestration for selected anatomy or failed TEVAR"],
      ["Uncomplicated type B", "Medical therapy; operate only for ischemia or contained rupture", "Medical therapy remains the initial management, and pre-emptive TEVAR in the subacute window is considered for selected high-risk anatomy (INSTEAD-XL), an evolving indication"],
      ["Surveillance", "Fiser: lifetime MRI, with 30% eventually forming an aneurysm that needs surgery", "SCORE: CT angiography for late aneurysmal degeneration, with no rate given; MRA is an alternative for follow-up"],
      ["Blood pressure at presentation", "Fiser: 95% are severely hypertensive", "Hypotension in a type A dissection signals tamponade, rupture or severe aortic insufficiency and is ominous, so a normal or low pressure must not delay the diagnosis"],
      ["Aortic insufficiency", "Fiser: present in 70% of dissections", "SCORE lists acute aortic insufficiency as a type A complication without a rate"],
    ],
  }, [[FISER, SCORE, ACC_AHA], [SCORE, ACC_AHA], [FISER, SCORE, ACC_AHA], [FISER, SCORE, ACC_AHA, OE], [FISER, SCORE, OE], [FISER, OE], [FISER, SCORE]]),

  references("block-aad-references", [SCORE, FISER, OE, ACC_AHA]),
];

export const acuteAorticDissectionTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000004920",
  versionId: "00000000-0000-4000-8000-000000004921",
  slug: "acute-aortic-dissection",
  title: "Acute Aortic Dissection",
  aliases: ["aortic dissection", "AAD", "Stanford type A", "Stanford type B", "type A dissection", "type B dissection", "DeBakey type I", "DeBakey type II", "DeBakey type III", "DeBakey classification", "Stanford classification", "dissecting aortic aneurysm", "dissection flap", "aortic false lumen", "malperfusion syndrome", "impulse control", "anti-impulse therapy", "TEVAR for dissection", "complicated type B dissection", "tearing chest pain"],
  scoreNodeId: "arterial-conditions",
  scoreCategory: "SCORE · Arterial Disease · Diseases & Conditions",
  tags: ["arterial-disease", "vascular", "aorta", "aortic-dissection", "tevar", "malperfusion", "surgical-emergency", "absite", "score"],
  sourceId: SCORE,
  additionalSourceIds: [FISER, OE, ACC_AHA],
  blocks,
  reviewedAt: "2026-10-22T00:00:00.000Z",
});
