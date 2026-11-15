import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  HYPERTHYROIDISM_PACKET_SOURCE as PACKET,
  SCORE_HYPERTHYROIDISM_SOURCE as SCORE,
  FISER_THYROID_SOURCE as FISER,
  ATA_HYPERTHYROIDISM_2016_SOURCE as ATA,
  ATA_PREGNANCY_THYROID_2026_SOURCE as PREGNANCY,
  USPSTF_THYROID_SCREENING_SOURCE as USPSTF,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Educational draft: clinical sign-off is tracked in the unmerged batch PR.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-ht-summary", type: "summary", heading: "At a glance",
    text: "**Thyrotoxicosis** means excess thyroid-hormone action; **hyperthyroidism** means excess glandular synthesis and secretion. Graves disease, toxic multinodular goiter and toxic adenoma can benefit from synthesis blockade, radioiodine or surgery. Destructive thyroiditis leaks stored hormone and usually needs symptom control rather than thionamides. Establish the mechanism before choosing definitive treatment; recent iodine exposure can suppress uptake even in synthesis-driven disease.",
  }, PACKET),
  sourced({
    id: "block-ht-physiology", type: "bullets", heading: "Physiology and iodine effects",
    items: [
      "Pituitary TSH stimulates iodide uptake, synthesis and storage; T4/T3 provide negative feedback. Thyroid peroxidase organifies iodide and couples iodotyrosines: DIT + DIT makes T4, DIT + MIT makes T3. Hormone is stored on thyroglobulin in colloid.",
      "T4 is the main secretory product. Most circulating T3 comes from peripheral T4 conversion; T3 is more active and shorter-lived. More than 99% of circulating thyroid hormone is protein-bound, chiefly to TBG; pregnancy and estrogen alter binding and total-hormone interpretation.",
      "**Jod–Basedow:** iodine fuels autonomous hormone synthesis. **Wolff–Chaikoff:** a large iodide load acutely inhibits organification/release; escape limits sustained treatment. Amiodarone can cause either hyperthyroidism or hypothyroidism.",
      "C cells produce calcitonin, which has a different role from follicular-cell T4/T3 production.",
    ],
  }, PACKET),
  sourced({
    id: "block-ht-causes", type: "table", heading: "Recognize the cause",
    columns: ["Cause", "Mechanism and clues", "Typical uptake"],
    rows: [
      ["Graves disease", "TSH-receptor-stimulating IgG (TRAb/TSI); diffuse goiter/bruit, orbitopathy, pretibial myxedema and sometimes acropachy. More common in women; smoking increases eye-disease risk.", "Diffuse increased uptake."],
      ["Toxic multinodular goiter / Plummer disease", "Autonomous foci in a longstanding goiter, often in older adults; iodine/contrast may precipitate overt disease. Compression or substernal extension matters for treatment.", "Patchy heterogeneous uptake."],
      ["Toxic adenoma", "A single autonomous nodule, often with a somatic activating TSH-receptor mutation; surrounding thyroid is suppressed.", "Focal hot nodule with suppressed remainder."],
      ["Destructive thyroiditis", "Painful postviral de Quervain, painless/postpartum, early Hashimoto or type-2 amiodarone thyroiditis; stored-hormone release.", "Low uptake unless interpretation is confounded."],
      ["Exogenous hormone", "Usually no goiter; low thyroglobulin favors factitious hormone use, interpreted with assay/antibody limitations.", "Suppressed thyroid uptake."],
      ["Uncommon mechanisms", "hCG-mediated gestational disease or trophoblastic tumor, struma ovarii, or a TSH-secreting pituitary tumor. Nonsuppressed TSH with high hormones requires evaluation outside the usual primary-thyroid pathway.", "Cause-dependent; avoid a generic Graves algorithm."],
    ],
  }, PACKET),
  sourced({
    id: "block-ht-presentation", type: "bullets", heading: "History and examination",
    items: [
      "Ask about weight loss despite appetite, heat intolerance/sweating, palpitations, anxiety, insomnia, tremor, weakness, menstrual changes and visual symptoms. Examine pulse/rhythm, reflexes, proximal strength and thyroid size.",
      "Atrial fibrillation, high-output heart failure and osteoporosis are consequential presentations. Older patients may have apathetic disease with weight loss or AF and few adrenergic signs.",
      "Lid lag/retraction can be adrenergic and nonspecific; proptosis, chemosis, diplopia, pretibial myxedema and acropachy favor Graves.",
      "Assess tracheal deviation, dysphagia, dyspnea, positional choking, substernal extension and Pemberton sign. Compression changes the definitive treatment choice.",
    ],
  }, PACKET),
  sourced({
    id: "block-ht-diagnosis", type: "sequence", heading: "Confirm biochemistry, then mechanism",
    steps: [
      { title: "Measure TSH, free T4 and total T3", detail: "Suppressed TSH with high FT4 and/or T3 is overt disease; normal FT4 with high T3 is T3 toxicosis. Suppressed TSH with normal FT4/T3 is subclinical hyperthyroidism. TSH can remain suppressed for months after starting treatment; follow FT4/T3 early." },
      { title: "Establish the etiology", detail: "TRAb/TSI supports Graves. If the cause is uncertain, use antibodies, uptake/scintigraphy or Doppler according to context and resources. Anti-TPO supports autoimmunity but is not specific for Graves." },
      { title: "Choose imaging deliberately", detail: "I-123 or Tc-99m pertechnetate is used diagnostically; Tc is trapped but not organified. I-131 is therapeutic rather than the routine diagnostic isotope. Do not perform radionuclide scans in pregnancy." },
      { title: "Evaluate nodules and compression", detail: "Ultrasound assesses nodules and nodes. Hot nodules rarely require FNA; cold nodules require ultrasound risk/size assessment rather than automatic biopsy. Noncontrast CT can define substernal extension; unnecessary iodine contrast can worsen autonomous disease and delay RAI." },
    ],
  }, ATA),
  sourced({
    id: "block-ht-low-uptake", type: "warning", heading: "Low uptake is not synonymous with destruction", tone: "pearl",
    text: "Contrast, kelp and amiodarone can suppress uptake despite new hormone synthesis. In amiodarone thyrotoxicosis, type 1 is iodine-driven synthesis, type 2 is destruction, and mixed disease occurs. Interpret uptake with iodine exposure, antibodies, nodules and Doppler. Thionamides do not treat ordinary destructive thyroiditis, but the same shortcut would undertreat type-1 disease.",
  }, ATA),
  sourced({
    id: "block-ht-subclinical", type: "table", heading: "Persistent subclinical hyperthyroidism: ATA treatment thresholds",
    columns: ["Clinical group", "TSH <0.1 mU/L", "TSH low but ≥0.1 mU/L"],
    rows: [
      ["Age ≥65 years", "Treat.", "Consider treatment."],
      ["Age <65 with heart disease, osteoporosis or symptoms", "Treat; also treat cardiac-risk patients and postmenopausal women without estrogen/bisphosphonate protection.", "Consider treatment for heart disease, osteoporosis or symptoms."],
      ["Age <65, asymptomatic and without major risks", "Consider treatment; evidence is weaker.", "Observe rather than routinely treat."],
    ],
  }, ATA),
  sourced({
    id: "block-ht-screening", type: "prose", heading: "Screening differs from treating established disease",
    text: "The USPSTF finds insufficient evidence to determine the balance of benefits and harms of screening asymptomatic, nonpregnant adults for thyroid dysfunction (I statement). This is not a recommendation against evaluating symptoms or treating confirmed high-risk disease.",
  }, USPSTF),
  sourced({
    id: "block-ht-subclinical-confirmation", type: "prose", heading: "↳ Confirm persistence",
    text: "Exclude transient illness/drug effects and confirm persistently low TSH, generally over 3–6 months, before committing to long-term treatment. Earlier reassessment is appropriate when cardiac or other risk is high. AF, fracture and cardiovascular associations inform treatment thresholds, but hard-outcome treatment evidence remains limited.",
  }, ATA),
  sourced({
    id: "block-ht-drugs", type: "table", heading: "Symptom control and synthesis blockade",
    columns: ["Treatment", "Adult starting framework", "Mechanism / caution"],
    rows: [
      ["Propranolol", "10–40 mg orally 3–4 times daily, titrated to response.", "Controls adrenergic symptoms while hormone falls; higher doses reduce conversion. Asthma and decompensated/low-output heart failure require caution; titratable esmolol may be useful under monitored care."],
      ["Methimazole", "FT4 1–1.5× ULN: 5–10 mg/day; 1.5–2×: 10–20 mg/day; 2–3×: 30–40 mg/day orally. Individualize for T3, gland size and symptoms; maintenance often 5–10 mg/day.", "Inhibits TPO organification/coupling; generally preferred outside early pregnancy or storm-specific selection."],
      ["Propylthiouracil", "Usually 50–150 mg orally three times daily initially; storm uses a separate regimen.", "Blocks synthesis and peripheral T4-to-T3 conversion. Severe hepatotoxicity limits use; early pregnancy and classic storm treatment are important exceptions to routine MMI preference."],
    ],
  }, ATA),
  sourced({
    id: "block-ht-atd-safety", type: "warning", heading: "Fever or sore throat on a thionamide", tone: "danger",
    text: "Obtain a baseline CBC/differential and liver profile and teach symptom-triggered action. **Fever or pharyngitis → stop the drug and obtain an urgent CBC/differential.** After agranulocytosis or another major reaction, do not simply switch between PTU and MMI. Jaundice, dark urine or other hepatotoxicity symptoms require urgent assessment. Mild isolated rash may be managed differently from a major reaction. PTU can cause severe hepatocellular injury; MMI can cause cholestatic injury. A blanket liver-test cutoff with automatic cross-switch is unsafe.",
  }, ATA),
  sourced({
    id: "block-ht-atd-course", type: "bullets", heading: "Monitoring, remission and relapse",
    items: [
      "Follow FT4/T3 after starting therapy and adjust to response; TSH alone is misleading early. Reduce the dose after control and space testing once stable.",
      "A conventional Graves course is 12–18 months; consider withdrawal when TSH and TRAb normalize. Persistent TRAb predicts relapse and informs continued therapy or definitive treatment.",
      "Long-term low-dose MMI is an option for selected patients who prefer it, including after relapse, rather than an automatic requirement for ablation or surgery.",
      "Toxic multinodular goiter and toxic adenoma generally do not remit after stopping ATDs. Use ATDs as a bridge or continued control when definitive treatment is unsuitable.",
    ],
  }, ATA),
  sourced({
    id: "block-ht-definitive", type: "table", heading: "Choose definitive treatment by disease and context",
    columns: ["Option", "Best fit", "Tradeoffs"],
    rows: [
      ["Graves: antithyroid drug", "Mild disease, small gland, pregnancy, patient preference, high operative risk or active eye disease.", "Requires biochemical follow-up; relapse and serious drug toxicity remain possible."],
      ["Graves: radioiodine", "Appropriate patient seeking definitive nonsurgical treatment, able to follow radiation precautions, without pregnancy/lactation or significant active orbitopathy.", "Control is delayed; may transiently worsen disease and can worsen orbitopathy. Hypothyroidism is an intended common outcome."],
      ["Graves: total / near-total thyroidectomy", "Large/compressive goiter, suspicious/malignant nodule, significant eye disease, near-term pregnancy plans, coexisting HPT, severe/refractory disease or preference.", "Rapid definitive control after preparation, but lifelong replacement and bleeding, nerve and parathyroid risks; use an experienced high-volume surgeon."],
      ["Toxic multinodular goiter", "RAI or total/near-total thyroidectomy; surgery is especially useful for compression, substernal extension, suspicious nodules or need for rapid control.", "ATDs control but do not cure autonomy. RAI does not rapidly relieve major compression."],
      ["Solitary toxic adenoma", "Ipsilateral lobectomy or RAI; evaluate the contralateral gland before choosing extent.", "Lobectomy removes the autonomous focus; subsequent hypothyroidism remains possible. Ablation selection depends on size, anatomy and expertise."],
    ],
  }, ATA),
  sourced({
    id: "block-ht-rai-eye", type: "bullets", heading: "Radioiodine and orbitopathy precautions",
    items: [
      "Avoid RAI in pregnancy and lactation. Delay conception at least 6 months after treatment and until thyroid function is stable.",
      "Smoking increases Graves orbitopathy risk and warrants cessation; it is not an absolute RAI contraindication. Active moderate–severe orbitopathy generally favors ATD or surgery; selected mild disease/risk factors may need glucocorticoid prophylaxis with RAI.",
      "When MMI is used around RAI, stop 2–3 days before and consider restarting 3–7 days afterward in patients at risk from worsening thyrotoxicosis. Follow hormone levels closely.",
      "Children are not subject to a blanket RAI ban: avoid below age 5; selected older children can receive it. MMI is generally initial drug therapy; avoid routine PTU in children because of liver toxicity.",
    ],
  }, ATA),
  sourced({
    id: "block-ht-surgery-preparation", type: "sequence", heading: "Prepare for thyroidectomy",
    steps: [
      { title: "Control hormones and cardiovascular stress", detail: "Render euthyroid with ATD, with beta-blockade as needed. Assess AF/heart failure and anesthetic risk; urgent surgery without full biochemical control needs experienced endocrine, surgical and anesthesia coordination." },
      { title: "Assess voice and calcium risk", detail: "Review prior neck/upper-chest surgery and voice change; perform laryngeal examination when indicated. Assess calcium and 25-OH vitamin D and replete deficiency; selected patients may benefit from calcitriol." },
      { title: "Use iodide for Graves", detail: "For 10 days immediately before surgery, ATA lists SSKI 1–2 drops (0.05–0.1 mL; 50 mg iodide/drop) or Lugol solution 5–7 drops (0.25–0.35 mL; 8 mg iodide/drop), orally three times daily. Verify the actual product concentration. This reduces vascularity; drops are not interchangeable." },
      { title: "Handle exceptions deliberately", detail: "Do not routinely give preoperative iodide for toxic multinodular goiter or adenoma, where it may fuel synthesis. If urgent Graves surgery or ATD intolerance prevents usual preparation, beta-blockade, iodide, glucocorticoid and sometimes cholestyramine can be used with expert monitoring." },
    ],
  }, ATA),
  sourced({
    id: "block-ht-operative-anatomy", type: "table", heading: "Operative anatomy and protection",
    columns: ["Structure", "Landmark and consequence"],
    rows: [
      ["Recurrent laryngeal nerve", "Right loops around the subclavian artery; left around the aortic arch. Visually identify the nerve near the tracheoesophageal groove and Berry ligament; injury causes cord dysfunction. A nonrecurrent right nerve may accompany an aberrant right subclavian artery."],
      ["External superior laryngeal branch", "Near the superior pedicle; supplies cricothyroid. Take superior branches individually close to the capsule to protect pitch and projection."],
      ["Parathyroid glands", "Superior: fourth pouch, dorsal/posterolateral to RLN. Inferior: third pouch with thymus, ventral/anteromedial and more variable. Preserve glands and vascular pedicles; divide terminal arterial branches on the capsule."],
      ["Vascular variants", "Superior thyroid artery comes from the external carotid; inferior from the thyrocervical trunk. A thyroid ima can approach the isthmus from below. Middle vein division permits medialization."],
    ],
  }, PACKET),
  sourced({
    id: "block-ht-operation", type: "prose", heading: "Extent and essential operative sequence",
    text: "For Graves, total/near-total thyroidectomy is favored over subtotal resection to minimize recurrence. Collar exposure and strap separation are followed by lobe mobilization, capsular superior-pole control, RLN identification, careful Berry division and preservation of parathyroid blood supply. Confirm suspected devascularized parathyroid tissue before autotransplantation. Nerve monitoring can inform second-side decisions but does not replace visual identification. Routine drains do not prevent a dangerous neck hematoma; detailed exposure and nerve technique are covered in the thyroid surgery playbooks.",
  }, PACKET),
  sourced({
    id: "block-ht-storm-recognition", type: "warning", heading: "Thyroid storm is a clinical emergency", tone: "danger",
    text: "Suspect storm with fever, marked tachycardia/AF, heart failure, CNS disturbance and GI/hepatic dysfunction in a thyrotoxic patient, often after infection, ATD withdrawal, iodine exposure or unprepared surgery. Hormone concentration does not distinguish storm; do not delay treatment for laboratory confirmation. BWPS ≥45 strongly supports storm, 25–44 requires clinical judgment and <25 makes it less likely. Scores supplement the assessment rather than replace it.",
  }, ATA),
  sourced({
    id: "block-ht-storm-treatment", type: "table", heading: "Storm: ICU treatment in parallel, with iodine after thionamide",
    columns: ["Target", "ATA adult regimen", "Sequence / caution"],
    rows: [
      ["Adrenergic excess", "Propranolol 60–80 mg orally every 4 hours, or titrated esmolol infusion.", "Assess perfusion and cardiac reserve first. Rapid blockade can precipitate collapse in low-output/decompensated failure; monitored titration is essential."],
      ["New synthesis", "PTU 500–1,000 mg oral/NG loading dose, then 250 mg every 4 hours; MMI 60–80 mg/day is an alternative.", "PTU also reduces conversion; hepatotoxicity can change selection. Use a feasible formulation with pharmacy/endocrine input."],
      ["Hormone release", "SSKI 5 drops (0.25 mL; 250 mg) orally every 6 hours at the ATA concentration.", "Wait **at least 1 hour after thionamide** to avoid feeding new synthesis. Lugol is an alternative with product-specific dosing."],
      ["Conversion / adrenal support", "Hydrocortisone 300 mg IV loading dose, then 100 mg IV every 8 hours.", "Give promptly; steroids and resuscitation need not wait for completion of the thionamide–iodine sequence."],
      ["Systemic decompensation and trigger", "Cooling, acetaminophen, oxygen, appropriate fluid/glucose/electrolyte support and treatment of infection or another trigger.", "Avoid aspirin because it can increase free hormone. Consider cholestyramine as an adjunct; refractory disease may require plasma exchange and expert rescue thyroidectomy."],
    ],
  }, ATA),
  sourced({
    id: "block-ht-pregnancy", type: "bullets", heading: "Pregnancy: 2026 ATA decisions",
    items: [
      "Gestational transient thyrotoxicosis is hCG-mediated, often accompanies hyperemesis, lacks Graves antibodies/eye findings and usually resolves as hCG falls. Use supportive care rather than ATDs for ordinary transient gestational disease.",
      "Treat overt Graves when indicated, using the lowest effective dose and targeting maternal FT4 at or just above the pregnancy-specific upper limit to avoid fetal hypothyroidism/goiter. Test TSH/FT4 every 2–4 weeks during treatment.",
      "Prefer PTU during early pregnancy, particularly the organogenesis/embryopathy window; promptly review MMI when pregnancy is confirmed. If switching, the MMI:PTU dose ratio is approximately 1:20.",
      "**After 16 weeks, ATA 2026 cannot recommend a preferred ATD:** continued PTU versus switching to MMI balances hepatotoxicity, embryopathy timing and destabilization from switching. A mandatory switch overstates the current guidance.",
      "Check TRAb/TSI early. High antibodies, especially >3× ULN, require fetal/neonatal planning even after prior definitive maternal treatment. Antibodies can persist after neonatal ATD exposure clears.",
      "ATD intolerance, refractory disease or inability to maintain treatment may require second-trimester thyroidectomy. I-131 is contraindicated in pregnancy.",
    ],
  }, PREGNANCY),
  sourced({
    id: "block-ht-trab-schedule", type: "prose", heading: "↳ Antibody and fetal surveillance: ATA 2026",
    text: "Check TRAb/TSI in the first trimester for active or past Graves disease. For women off ATDs with antibodies >3× ULN, repeat at 18–22 and 30–34 weeks; persistent elevation warrants fetal thyroid ultrasound from 18–20 weeks, generally monthly. In euthyroid women off ATDs with antibodies <3× ULN, antibody/fetal-hyperthyroidism follow-up may stop, while maternal thyroid-function follow-up continues. Continued maternal ATD treatment independently warrants fetal thyroid ultrasound regardless of antibody level, because the fetus is also at risk of treatment-related hypothyroidism.",
  }, PREGNANCY),
  sourced({
    id: "block-ht-lactation", type: "table", heading: "Lactation: drug treatment and isotope precautions differ",
    columns: ["Intervention", "2026 ATA guidance"],
    rows: [
      ["Antithyroid drug", "MMI is generally preferred. Studies support MMI up to 20 mg/day; PTU data are more robust through 450 mg/day, with limited data through 750 mg/day. These are evidence limits, not interchangeable dose targets."],
      ["Diagnostic scintigraphy", "Only for a strict indication with nuclear-medicine coordination: interrupt breastfeeding and express/discard milk for 3–4 days after I-123 (some advise up to 7 days), or 36 hours after Tc-pertechnetate."],
      ["I-131 treatment", "Do not administer during lactation. Discuss waiting at least 3 months after cessation if treatment is required; never resume breastfeeding that child after I-131."],
      ["Postpartum thyrotoxicosis", "Separate Graves relapse, which may require ATD, from destructive postpartum thyroiditis, which usually needs phase-specific symptom control/replacement."],
    ],
  }, PREGNANCY),
  sourcedUnits({
    id: "block-ht-board-split", type: "table", heading: "Board answer versus current practice",
    columns: ["Issue", "Supplied board teaching", "Clinical interpretation"],
    rows: [
      ["Etiologic proportions", "SCORE gives Graves 70%, toxic multinodular goiter 25% and toxic adenoma 5%; Fiser gives Graves about 80%.", "Retain these as board-source proportions; age, iodine sufficiency and the population studied alter the distribution."],
      ["Diagnostic isotope", "SCORE names I-125 and Fiser emphasizes I-131 scanning.", "Use I-123 or Tc-pertechnetate for routine diagnostic scintigraphy; I-131 is principally therapeutic."],
      ["Nodular autonomy", "SCORE/Fiser emphasize surgery and lower RAI effectiveness.", "ATA accepts surgery or RAI; compression, substernal extension, suspicious nodule and rapid control favor surgery."],
      ["Graves extent / iodide", "Fiser includes subtotal resection and 14 days of Lugol.", "ATA favors total/near-total and a 10-day immediate preoperative iodide course; subtotal risks recurrent disease and iodide can escape."],
      ["RAI exclusions", "SCORE gives blanket exclusions for smokers and children.", "Smoking is a risk modifier; pediatric age and orbitopathy severity guide selection. Pregnancy and lactation remain contraindications to treatment."],
    ],
  }, [[SCORE, FISER, PACKET], [SCORE, FISER, ATA], [SCORE, FISER, ATA], [FISER, ATA], [SCORE, ATA]]),
  sourced({
    id: "block-ht-followup", type: "table", heading: "Follow-up and postoperative rescue",
    columns: ["Situation", "Action"],
    rows: [
      ["After total thyroidectomy", "Start levothyroxine, commonly around 1.6 mcg/kg/day in a healthy adult with lower initial dosing for older/cardiac patients; reassess TSH at about 6–8 weeks."],
      ["After RAI", "Check FT4/T3 at 4–6-week intervals initially and anticipate hypothyroidism. Persistent disease at 6 months may require retreatment."],
      ["After ATD withdrawal", "Continue biochemical monitoring for relapse, especially with persistent antibodies or recurrent symptoms."],
      ["Tense swollen neck, stridor", "Threatened airway from hematoma: immediately open skin and strap closure, evacuate, secure airway and return to OR. Do not wait for imaging."],
      ["Soft neck, postextubation stridor", "Consider bilateral RLN dysfunction: airway rescue and laryngoscopy; reintubation or tracheostomy may be necessary."],
      ["Tingling, tetany or QT prolongation", "Check calcium/PTH and magnesium; oral calcium/calcitriol for appropriate cases, monitored IV calcium for severe/symptomatic hypocalcemia. Hypocalcemia often appears on postoperative days 1–2."],
      ["Hoarseness or loss of pitch", "RLN injury causes cord dysfunction/aspiration; EBSLN injury causes pitch/projection loss. Examine the larynx and arrange voice/swallow care."],
    ],
  }, PACKET),
  references("block-ht-references", [PACKET, SCORE, FISER, ATA, PREGNANCY, USPSTF]),
];

export const hyperthyroidismTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000008720",
  versionId: "00000000-0000-4000-8000-000000008721",
  slug: "hyperthyroidism",
  title: "Hyperthyroidism",
  aliases: ["Graves disease", "Graves hyperthyroidism", "thyrotoxicosis", "thyroid storm", "toxic multinodular goiter", "Plummer disease", "toxic thyroid adenoma", "subclinical hyperthyroidism", "Jod-Basedow", "Burch-Wartofsky score"],
  scoreNodeId: "endocrine-conditions",
  scoreCategory: "SCORE · Endocrine · Diseases & Conditions",
  tags: ["endocrine", "thyroid", "thyroid storm"],
  sourceId: PACKET,
  additionalSourceIds: [SCORE, FISER, ATA, PREGNANCY, USPSTF],
  blocks,
  reviewedAt: "2026-11-15T00:00:00.000Z",
});
