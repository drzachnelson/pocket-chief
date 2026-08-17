import { buildTopic, references, sourced } from "@/content/authoring";
import { RENAL_ARTERY_DISEASE_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-rad-summary",
    type: "summary",
    heading: "At a glance",
    text: "Renal artery stenosis (RAS) is a correctable etiology of secondary hypertension (<5% of all hypertension cases) and ischemic nephropathy. **Atherosclerosis** causes >90% of cases (predominantly older men, involving the proximal 1/3 and aortic ostium, treated with angioplasty and stenting), whereas **fibromuscular dysplasia (FMD)** accounts for ~10% (young women, involving the distal 2/3 and branches with a '**string of beads**' appearance, treated with balloon angioplasty alone). Unilateral disease produces renin-dependent euvolemic hypertension, while bilateral or solitary kidney stenosis causes volume-dependent hypertension and flash pulmonary edema (**Pickering syndrome**). Renal artery duplex ultrasound is the first-line screening modality (**PSV > 180 cm/s or RAR > 3.5**), and revascularization is indicated for severe refractory hypertension, progressive ischemic nephropathy, or recurrent flash pulmonary edema.",
  }, SOURCE),

  sourced({
    id: "block-rad-etiologies-table",
    type: "table",
    heading: "Atherosclerotic RAS versus fibromuscular dysplasia",
    columns: ["Feature", "Atherosclerotic RAS (>90%)", "Fibromuscular Dysplasia (FMD, ~10%)"],
    rows: [
      ["Demographics", "Older males (>50 years old)", "Young females (<50 years old, typically <30)"],
      ["Anatomic location", "Proximal 1/3 and aortic ostium", "Distal 2/3 and main arterial branches"],
      ["Lesion morphology", "Single contiguous eccentric/ostial plaque", "Alternating stenosis and dilation ('**string of beads**' in medial fibroplasia)"],
      ["First-line revascularization", "Percutaneous balloon angioplasty + **stenting**", "Percutaneous transluminal balloon angioplasty (PTA) **alone** (no stent)"],
      ["Stenting rationale", "Mandatory due to high elastic recoil of ostial aortic plaques", "Contraindicated/avoided in young elastic arteries due to vessel reactivity"],
      ["Blood pressure cure rate", "Low cure rate (~5%), though ~80% show marked improvement", "High cure rate (up to 50% achieving complete normotension)"],
    ],
  }, SOURCE),

  sourced({
    id: "block-rad-raas-cascade",
    type: "sequence",
    heading: "Pathophysiology: The RAAS biochemical cascade",
    steps: [
      { title: "Perfusion trigger", detail: "Hemodynamically significant stenosis decreases perfusion pressure and wall stretch at the **afferent arteriole**." },
      { title: "Renin secretion", detail: "**Juxtaglomerular (JG) cells** in the afferent arteriole sense decreased perfusion and secrete the enzyme renin." },
      { title: "Angiotensin I cleavage", detail: "Renin cleaves circulating **angiotensinogen** (synthesized by the liver) to produce the decapeptide angiotensin I." },
      { title: "Angiotensin II conversion", detail: "**Angiotensin-converting enzyme (ACE)**, predominantly in pulmonary vascular endothelium, cleaves angiotensin I into the active octapeptide angiotensin II." },
      { title: "Direct vasoconstriction", detail: "Angiotensin II acts as a potent smooth muscle vasoconstrictor on systemic and renal arterioles (**efferent > afferent**, preserving GFR in the short term)." },
      { title: "Aldosterone secretion", detail: "Angiotensin II stimulates the **zona glomerulosa** of the adrenal cortex to synthesize and secrete aldosterone." },
      { title: "Volume expansion", detail: "Aldosterone stimulates **sodium and water reabsorption** in the distal tubules and collecting ducts in exchange for potassium and hydrogen, producing extracellular volume expansion." },
    ],
  }, SOURCE),

  sourced({
    id: "block-rad-hemodynamics-table",
    type: "table",
    heading: "Hemodynamics: Unilateral versus bilateral or solitary disease",
    columns: ["Characteristic", "Unilateral Renal Artery Stenosis", "Bilateral RAS / Solitary Kidney RAS"],
    rows: [
      ["Primary pathophysiology", "**Renin-dependent** hypertension", "**Volume-dependent** hypertension"],
      ["Contralateral kidney function", "Intact and exposed to high systemic pressure; compensates with pressure natriuresis", "Absent or stenosed; unable to excrete volume or sodium load"],
      ["Systemic volume state", "Euvolemic (counterbalanced by contralateral pressure natriuresis)", "Volume-expanded (hypervolemic)"],
      ["Plasma renin activity", "**Elevated** (secreted by ischemic stenotic kidney)", "**Low or Normal** (suppressed by systemic volume overload via negative feedback)"],
      ["Clinical presentation", "Asymptomatic severe hypertension, refractory high blood pressure", "Medically refractory hypertension, progressive azotemia, Flash Pulmonary Edema (**Pickering syndrome**)"],
    ],
  }, SOURCE),

  sourced({
    id: "block-rad-high-risk-bullets",
    type: "bullets",
    heading: "High-risk clinical presentations warranting workup",
    items: [
      "**Early-onset hypertension**: Severe hypertension presenting at age **<30 years** (classically young females -> suspect fibromuscular dysplasia).",
      "**Accelerated or late-onset hypertension**: New-onset or worsening severe hypertension at age **>50 years** with known coronary, carotid, or peripheral arterial disease or AAA.",
      "**Medically refractory hypertension**: Uncontrolled blood pressure despite **≥3 antihypertensive medications** of different classes at maximal doses (including a diuretic).",
      "**Unexplained renal insufficiency**: Progressive azotemia, asymmetric renal atrophy, or an acute rise in serum creatinine **≥30%** after starting an ACE inhibitor or ARB.",
      "**Flash pulmonary edema (Pickering syndrome)**: Recurrent, unexplained acute pulmonary edema in the setting of preserved left ventricular ejection fraction.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rad-diagnostic-flow",
    type: "flow",
    heading: "Diagnostic evaluation pathway",
    nodes: [
      { id: "suspect", label: "Suspected Renovascular Hypertension (High-Risk Clinical Features)" },
      { id: "duplex", label: "First-Line Screening: Renal Artery Duplex Ultrasound" },
      { id: "normal-duplex", label: "Normal Duplex (PSV < 180 cm/s & RAR < 3.5)", tone: "good" },
      { id: "med-rx", label: "Continue Aggressive Medical Therapy & Surveillance", tone: "good" },
      { id: "positive-duplex", label: "Positive Duplex (PSV > 180 cm/s OR RAR > 3.5)", tone: "caution" },
      { id: "cross-sectional", label: "Cross-Sectional Anatomical Roadmapping (CTA or MRA)" },
      { id: "dsa-intervention", label: "Digital Subtraction Angiography (DSA) + Catheter Intervention", tone: "caution" },
    ],
    edges: [
      { from: "suspect", to: "duplex" },
      { from: "duplex", to: "normal-duplex", label: "negative" },
      { from: "duplex", to: "positive-duplex", label: "stenosis ≥ 60%" },
      { from: "normal-duplex", to: "med-rx" },
      { from: "positive-duplex", to: "cross-sectional" },
      { from: "cross-sectional", to: "dsa-intervention", label: "revascularization candidate" },
    ],
  }, SOURCE),

  sourced({
    id: "block-rad-imaging-modalities-table",
    type: "table",
    heading: "Diagnostic imaging modalities comparison",
    columns: ["Modality", "Diagnostic Criteria & Findings", "Key Advantages", "Limitations & Risks"],
    rows: [
      ["Renal Artery Duplex Ultrasound", "**PSV > 180 cm/s** at stenosis, **RAR (Renal:Aorta Ratio) > 3.5**, renal asymmetry > 1.5 cm or bipolar length < 6 to 8 cm", "Noninvasive, low cost, no ionizing radiation, no nephrotoxic contrast; evaluates parenchymal resistive index (RI)", "Highly operator-dependent; visualization frequently obscured by bowel gas or morbid obesity"],
      ["Computed Tomography Angiography (CTA)", "Proximal ostial luminal narrowing, aortic wall calcification, identification of accessory renal arteries", "Rapid acquisition, widely available, high spatial resolution with 3D vascular reconstruction", "Risk of iodinated contrast-induced nephropathy (CIN); ionizing radiation exposure"],
      ["Magnetic Resonance Angiography (MRA)", "Visualizes arterial lumen and flow voids without iodinated contrast", "No iodinated contrast or ionizing radiation; excellent soft-tissue and anatomical characterization", "Expensive, motion-sensitive artifacts, risk of **Nephrogenic Systemic Fibrosis (NSF)** with gadolinium when GFR < 30 mL/min"],
      ["Digital Subtraction Angiography (DSA)", "Atherosclerosis: ostial/proximal narrowing; FMD: '**string of beads**'; Dissection: intimal flap", "**Gold standard** anatomical imaging; enables simultaneous therapeutic endovascular intervention", "Invasive arterial puncture; risks access-site hematoma, pseudoaneurysm, cholesterol atheroembolization, and dissection"],
    ],
  }, SOURCE),

  sourced({
    id: "block-rad-indications-table",
    type: "table",
    heading: "Indications and contraindications for revascularization",
    columns: ["Category", "Clinical & Anatomic Criteria", "Management Action"],
    rows: [
      ["Hemodynamically significant stenosis", "**≥60% to 70%** luminal diameter reduction or significant translesional pressure gradient", "Prerequisite for all revascularization interventions"],
      ["Refractory hypertension", "Uncontrolled blood pressure despite ≥3 maximal-dose antihypertensive medications (including diuretic)", "Indication for renal revascularization"],
      ["Ischemic nephropathy", "Progressive loss of renal function and declining GFR attributable to hypoperfusion", "Indication for renal revascularization"],
      ["Flash pulmonary edema", "Recurrent unexplained flash pulmonary edema or refractory heart failure in bilateral/solitary RAS", "Urgent indication for renal revascularization"],
      ["Distal branch / pediatric disease", "Stenoses involving distal parenchymal branch points, multiple small accessory vessels, or pediatric patients", "**Contraindication to endovascular stenting**; consider open surgical repair"],
      ["Non-viable / atrophic kidney", "Renal length **<6 cm**, cortical thickness **<1 cm**, or resistive index (RI) **>0.80**", "**Contraindication to revascularization**; perform nephrectomy if causing refractory renin-mediated hypertension"],
    ],
  }, SOURCE),

  sourced({
    id: "block-rad-nonviable-warning",
    type: "warning",
    heading: "Do not attempt revascularization on a non-viable atrophic kidney",
    text: "An atrophic kidney measuring < 6 cm in bipolar length with marked cortical thinning (< 1 cm) or a high Doppler resistive index (RI > 0.80) has suffered irreversible parenchymal sclerosis and will not recover filtration function upon revascularization. Attempting angioplasty or bypass subjects the patient to operative morbidity without renal benefit; if the non-functioning kidney continues to drive life-threatening renin-mediated hypertension, unilateral nephrectomy is the keyed definitive treatment.",
  }, SOURCE),

  sourced({
    id: "block-rad-revasc-flow",
    type: "flow",
    heading: "Choosing the revascularization modality",
    nodes: [
      { id: "candidate", label: "Patient Meets Indications for Renal Revascularization" },
      { id: "endo", label: "Endovascular Intervention (First-Line Therapy)" },
      { id: "open", label: "Open Surgical Revascularization (Distal Branch / Failed Endo / Concomitant Aortic Surgery)" },
      { id: "aras-endo", label: "Atherosclerotic RAS: Balloon Angioplasty + Balloon-Expandable Stent", tone: "good" },
      { id: "fmd-endo", label: "Fibromuscular Dysplasia: Percutaneous Balloon Angioplasty (PTA) ALONE", tone: "good" },
      { id: "anatomic-open", label: "Anatomic Reconstruction: Aortorenal Bypass (SVG/PTFE) or Transaortic Endarterectomy" },
      { id: "extra-open", label: "Extra-Anatomic Bypass (Hostile/Porcelain Aorta): Hepatorenal (Right) or Splenorenal (Left)" },
    ],
    edges: [
      { from: "candidate", to: "endo", label: "favorable anatomy" },
      { from: "candidate", to: "open", label: "complex/failed endo/aortic surgery" },
      { from: "endo", to: "aras-endo", label: "atherosclerosis" },
      { from: "endo", to: "fmd-endo", label: "FMD" },
      { from: "open", to: "anatomic-open", label: "normal infrarenal aorta" },
      { from: "open", to: "extra-open", label: "hostile / calcified aorta" },
    ],
  }, SOURCE),

  sourced({
    id: "block-rad-surgical-techniques",
    type: "bullets",
    heading: "Open surgical revascularization techniques",
    items: [
      "**Aortorenal bypass**: interposition graft using reversed saphenous vein (SVG) or prosthetic PTFE/Dacron from infrarenal aorta to renal artery; the gold-standard anatomic bypass.",
      "**Transaortic renal thromboendarterectomy**: indicated for bilateral ostial atherosclerotic lesions; performed via longitudinal or transverse aortotomy during pararenal/suprarenal aortic cross-clamping.",
      "**Hepatorenal bypass**: extra-anatomic bypass from the common hepatic or gastroduodenal artery to the right renal artery; indicated when the infrarenal aorta is hostile, heavily calcified ('porcelain'), or infected.",
      "**Splenorenal bypass**: extra-anatomic bypass from the splenic artery to the left renal artery; preserves splenic viability via short gastric collaterals without requiring splenectomy.",
      "**Iliorenal / mesenterorenal bypass**: alternative extra-anatomic bypass options utilizing common/external iliac or superior mesenteric arteries as inflow sources.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rad-outcomes-table",
    type: "table",
    heading: "Clinical outcomes and complication metrics",
    columns: ["Metric", "Endovascular Stenting", "Open Surgical Revascularization"],
    rows: [
      ["Blood pressure response", "Blood pressure improvement in ~80%; complete cure in ~5% (higher in FMD, up to 50%)", "Blood pressure improvement or cure in 80% to 90%; higher long-term durability"],
      ["Renal function stabilization", "Stabilization or improvement of GFR in ~70% of ischemic nephropathy patients", "Stabilization of renal function in 70% to 80%"],
      ["5-year patency rates", "Primary patency: 74% to 79%; Secondary patency: 85% to 98%", "Primary patency > 90% at 5 years"],
      ["Restenosis rate", "1.5% to 25% at 6 months (primarily driven by myointimal hyperplasia)", "<5% to 10% over long-term follow-up"],
      ["Procedural morbidity", "5.6% (puncture site hematoma, pseudoaneurysm, contrast nephropathy)", "Isolated renal repair: 15.0%; Combined aortorenal reconstruction: 23.0%"],
      ["Perioperative mortality", "0.0%", "Isolated renal repair: 9.1%; Combined aortorenal reconstruction: 8.1%"],
    ],
  }, SOURCE),

  sourced({
    id: "block-rad-surveillance-protocol",
    type: "sequence",
    heading: "Postoperative duplex surveillance and restenosis protocol",
    steps: [
      { title: "1. Modality Selection", detail: "Renal artery duplex ultrasound is the gold-standard surveillance tool: reproducible, noninvasive, and avoids nephrotoxic iodinated contrast." },
      { title: "2. Baseline Scan", detail: "Obtain a baseline renal duplex ultrasound at the initial postoperative check (within 1 month) to establish baseline velocity thresholds." },
      { title: "3. Short-Term Surveillance", detail: "Perform repeat renal duplex ultrasound examinations every 6 months for the first 2 years." },
      { title: "4. Long-Term Surveillance", detail: "Perform annual renal duplex ultrasound examinations thereafter to assess for late graft failure or disease progression." },
      { title: "5. Restenosis Management", detail: "Restenosis is driven by myointimal hyperplasia; reintervention (repeat PTA, cutting balloon, or drug-coated balloon) is indicated only if recurrent stenosis is accompanied by clinical relapse (loss of BP control or declining GFR)." },
    ],
  }, SOURCE),

  sourced({
    id: "block-rad-board-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "**Juxtaglomerular apparatus**: located in the media of the afferent arteriole; releases renin in response to decreased renal perfusion pressure or decreased stretch.",
      "**Atherosclerosis versus FMD distribution**: atherosclerosis involves the proximal 1/3 and aortic ostium in older men; FMD involves the distal 2/3 and main branches in young women.",
      "**FMD histologic subtypes**: medial fibroplasia accounts for 85% of cases and produces the classic 'string of beads' pattern with alternating stenosis and aneurysmal mural thinning; intimal and adventitial fibroplasia account for the remainder.",
      "**Endovascular treatment rule**: atherosclerotic RAS requires angioplasty with **stenting** (due to ostial elastic recoil); FMD requires balloon angioplasty (PTA) **alone**, without stenting.",
      "**Duplex velocity thresholds**: peak systolic velocity (PSV) > 180 cm/s or renal-to-aortic ratio (RAR) > 3.5 defines hemodynamically significant (≥60%) renal artery stenosis.",
      "**Contraindications to stenting**: lesions involving distal parenchymal branches, multiple tiny accessory renal arteries, and pediatric patients (due to ongoing vessel growth).",
      "**Atrophic kidney thresholds**: renal length < 6 cm with cortical thinning (< 1 cm) and resistive index > 0.80 denotes non-viability; do not revascularize, perform nephrectomy for refractory renin-mediated hypertension.",
      "**Extra-anatomic splanchnic routing**: right renal artery reconstruction uses hepatorenal bypass; left renal artery reconstruction uses splenorenal bypass (spleen survives on short gastric collaterals).",
      "**Anatomic relationship**: the right renal artery runs posterior to the inferior vena cava (IVC); the left renal vein crosses anterior to the aorta below the SMA and can be ligated near the IVC in emergencies due to gonadal/adrenal collaterals.",
      "**Recurrent stenosis mechanism**: post-intervention restenosis is mediated by myointimal hyperplasia, monitored via serial duplex ultrasound every 6 months for 2 years, then annually.",
    ],
  }, SOURCE),

  references("block-rad-references", [SOURCE]),
];

export const renalArteryDiseaseTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000001001",
  versionId: "00000000-0000-4000-8000-000000001011",
  slug: "renal-artery-disease",
  title: "Renal Artery Disease",
  aliases: [
    "RAS",
    "renal artery stenosis",
    "renovascular hypertension",
    "fibromuscular dysplasia",
    "FMD",
    "atherosclerotic renal artery stenosis",
    "ARAS",
    "Pickering syndrome",
    "flash pulmonary edema",
    "string of beads",
    "renal duplex",
    "renal artery stenting",
    "renin angiotensin aldosterone",
    "RAAS",
    "splenorenal bypass",
    "hepatorenal bypass",
    "aortorenal bypass",
  ],
  scoreNodeId: "arterial-conditions",
  scoreCategory: "SCORE · Arterial Disease · Diseases & Conditions",
  tags: ["arterial-disease", "vascular", "renovascular-hypertension", "absite", "score", "endovascular"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-16T00:00:00.000Z",
});
