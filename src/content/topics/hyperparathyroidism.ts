import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  HYPERPARATHYROIDISM_PACKET_SOURCE as PACKET,
  SCORE_HYPERPARATHYROIDISM_SOURCE as SCORE,
  FISER_PARATHYROID_SOURCE as FISER,
  PHPT_WORKSHOP_2022_SOURCE as WORKSHOP,
  AAES_PHPT_2016_SOURCE as AAES,
  KDIGO_CKD_MBD_2017_SOURCE as KDIGO,
  ATA_MTC_2015_SOURCE as MTC,
  ENDOCRINE_SOCIETY_HYPERCALCEMIA_SOURCE as HCM,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Educational draft: clinical sign-off is tracked in the unmerged batch PR.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-hp-summary", type: "summary", heading: "At a glance",
    text: "Interpret **PTH together with calcium**. Primary hyperparathyroidism (PHPT) is autonomous secretion; secondary HPT is compensatory secretion; tertiary HPT is autonomy after prolonged secondary disease. Establish the biochemical diagnosis, exclude familial hypocalciuric hypercalcemia (FHH), assess renal/skeletal injury, then localize only for operative planning. Negative localization does not invalidate a surgical indication. Parathyroidectomy is the only curative treatment for PHPT.",
  }, PACKET),
  sourced({
    id: "block-hp-physiology", type: "bullets", heading: "Calcium regulation and histology",
    items: [
      "Chief cells secrete PTH; chief and oxyphil cells are the principal parathyroid cell types. Calcium binding to chief-cell CaSR suppresses PTH secretion.",
      "PTH raises calcium by stimulating bone resorption, increasing renal calcium reabsorption and promoting renal 1α-hydroxylation of vitamin D, which increases intestinal calcium absorption.",
      "PTH promotes renal phosphate wasting; PHPT often has low/normal phosphate. In CKD, impaired phosphate clearance can override this pattern, so phosphate may remain high.",
      "Renal secondary HPT reflects phosphate retention, impaired calcitriol production and altered calcium balance. Treating a number without addressing these drivers misses the mechanism.",
    ],
  }, SCORE),
  sourced({
    id: "block-hp-anatomy", type: "table", heading: "Embryology predicts the search for a missing gland",
    columns: ["Pair", "Derivation / nerve relation", "Expected and ectopic locations"],
    rows: [
      ["Superior parathyroids", "Fourth pharyngeal pouch; dorsal/posterolateral to RLN.", "Relatively constant posterior thyroid region; ectopic glands may lie in the tracheoesophageal groove, retroesophageal space or carotid sheath."],
      ["Inferior parathyroids", "Third pouch with thymus; ventral/anteromedial to RLN.", "Longer migration makes location more variable: thyrothymic ligament/thymus, anterior mediastinum or undescended high/submandibular position."],
      ["Blood supply / gland count", "Usually inferior thyroid artery branches supply both pairs.", "Preserve vascular pedicles and remember supernumerary/ectopic glands; an assumption of exactly four glands can miss disease."],
    ],
  }, PACKET),
  sourced({
    id: "block-hp-etiology", type: "bullets", heading: "Primary disease and inherited risk",
    items: [
      "SCORE estimates a single adenoma in approximately 85% of PHPT and multigland disease in about 15%; carcinoma is rare, below 1%. Sporadic disease predominates and is more common in women in the fifth–seventh decades.",
      "Many patients are discovered through incidental hypercalcemia. Classic consequences include nephrolithiasis, nephrocalcinosis, bone loss and fractures; osteitis fibrosa cystica/brown tumors indicate severe skeletal disease.",
      "Fatigue, mood/cognitive complaints, constipation/reflux, weakness and myalgia are nonspecific; do not assume every such symptom is caused by PHPT or guaranteed to resolve after surgery.",
    ],
  }, SCORE),
  sourced({
    id: "block-hp-syndromes", type: "table", heading: "Hereditary patterns that change the plan",
    columns: ["Setting", "Implication"],
    rows: [
      ["MEN1 / MENIN", "Multigland disease is common; PHPT is often the first manifestation. Operative planning differs from a sporadic focused adenoma excision."],
      ["MEN2A / RET", "Evaluate for pheochromocytoma and treat it before neck surgery when present; consider associated medullary thyroid disease."],
      ["CDC73 / hyperparathyroidism–jaw tumor syndrome", "Raises concern for carcinoma and affects genetic counseling and surgical planning."],
      ["Young age, multigland disease or family history", "The Fifth Workshop considers genetic evaluation below age 30, with multigland disease and/or family/syndromic history. AAES specifically recommends counseling for age <40 **with multigland disease**; a flat age-40 cutoff overstates that recommendation."],
    ],
  }, PACKET),
  sourced({
    id: "block-hp-patterns", type: "table", heading: "Separate primary, secondary, tertiary and familial disease",
    columns: ["Pattern", "Calcium / PTH / phosphate", "Context and trap"],
    rows: [
      ["Primary HPT", "High calcium; high or inappropriately normal PTH; phosphate often low/normal.", "Urine calcium is variable. A PTH within the laboratory range is inappropriate when hypercalcemia should suppress it."],
      ["Secondary HPT in CKD", "Calcium often low/normal, PTH high, phosphate often high.", "Renal osteodystrophy, fractures, pruritus, weakness, calciphylaxis and vascular/soft-tissue calcification may occur."],
      ["Secondary HPT from deficiency / malabsorption", "Calcium low/normal, PTH high; phosphate may be low/normal.", "Assess vitamin D, intake, malabsorption and renal calcium losses before diagnosing normocalcemic primary disease."],
      ["Tertiary HPT", "High or sometimes normal calcium with autonomous high PTH; phosphate depends on renal/transplant function.", "Prolonged renal secondary disease, before or after transplant, with multigland autonomy; persistence soon after transplant can still improve."],
      ["FHH", "Usually mild lifelong hypercalcemia, normal/mildly high PTH and relatively low urine calcium.", "Autosomal dominant CaSR-pathway disease: CASR, GNA11 or AP2S1. Routine parathyroidectomy is generally noncurative."],
    ],
  }, PACKET),
  sourced({
    id: "block-hp-diagnosis", type: "sequence", heading: "Biochemical diagnosis before localization",
    steps: [
      { title: "Confirm calcium with PTH", detail: "Measure albumin-adjusted total calcium, or ionized calcium when appropriate, with intact PTH, phosphorus, creatinine and 25-OH vitamin D. Hypercalcemic PHPT requires elevated calcium with elevated/inappropriately normal PTH on two occasions at least 2 weeks apart." },
      { title: "Evaluate mimics and secondary drivers", detail: "Review lithium/thiazides, vitamin-D deficiency, CKD, intake and malabsorption. A suppressed PTH in hypercalcemia redirects evaluation toward non-PTH causes, including malignancy; do not localize a parathyroid lesion as a substitute for diagnosis." },
      { title: "Assess skeletal disease", detail: "Obtain DXA at lumbar spine, hip and distal one-third radius and assess for vertebral fracture. Cortical bone loss is important even with a less abnormal lumbar measurement." },
      { title: "Assess renal disease", detail: "Obtain creatinine clearance/eGFR, 24-hour urine calcium/creatinine and imaging for nephrolithiasis/nephrocalcinosis. Silent stones can establish organ involvement." },
    ],
  }, WORKSHOP),
  sourced({
    id: "block-hp-fhh", type: "warning", heading: "CCCR is probabilistic, not an absolute FHH exclusion", tone: "pearl",
    text: "**CCCR = (urine calcium × serum creatinine) / (serum calcium × urine creatinine)** using compatible units. A value <0.01 favors FHH; 0.01–0.02 overlaps; >0.02 favors PHPT but does not exclude FHH. The Fifth Workshop reports up to 20% of PHPT below 0.01 and up to 10% of FHH above 0.02. Lithium, thiazides, CKD and vitamin-D deficiency confound urine calcium. Lifelong hypercalcemia, young age or family history increases suspicion; pursue genetic evaluation when FHH remains plausible before a potentially noncurative operation.",
  }, WORKSHOP),
  sourced({
    id: "block-hp-normocalcemic", type: "prose", heading: "Normocalcemic PHPT is a diagnosis of exclusion",
    text: "Require persistently elevated PTH with repeatedly normal adjusted total **and ionized** calcium over 3–6 months after excluding secondary causes, including CKD, vitamin-D deficiency, inadequate intake/malabsorption, renal calcium loss and relevant drugs. The Fifth Workshop cannot recommend universal surgical criteria for normocalcemic PHPT because data are limited. Recurrent stones or progressive bone loss merit expert assessment; they do not justify automatically importing every hypercalcemic criterion without confirming the diagnosis.",
  }, WORKSHOP),
  sourced({
    id: "block-hp-indications", type: "table", heading: "2022 PHPT surgical indications: any one is sufficient",
    columns: ["Domain", "Threshold / indication"],
    rows: [
      ["Symptomatic disease", "Offer surgery for attributable overt renal/skeletal disease unless contraindicated; patient preference can also support surgery in suitable asymptomatic patients."],
      ["Age", "**<50 years**; age alone is sufficient."],
      ["Serum calcium", "**>1.0 mg/dL above the upper limit of normal**. Exactly +1.0 does not meet this inequality."],
      ["Skeleton", "Vertebral fracture on imaging or **T-score ≤−2.5** at an assessed site. Younger adults require age-appropriate BMD interpretation and already meet the age criterion."],
      ["Renal function", "eGFR or creatinine clearance **<60 mL/min**."],
      ["Renal imaging", "Nephrolithiasis or nephrocalcinosis, including silent findings."],
      ["Urinary calcium", "**>250 mg/day in women or >300 mg/day in men**. Preserve the sex-specific values and strict inequalities."],
    ],
  }, WORKSHOP),
  sourced({
    id: "block-hp-cutoff-example", type: "prose", heading: "↳ Apply each threshold separately",
    text: "A teaching example with age 45, calcium 11.2 mg/dL at an upper limit of 10.2 and T-score −2.7 meets age and skeletal criteria, **not** the calcium criterion. Complete the biochemical/FHH evaluation before localization and surgery. A criterion supports referral and shared operative selection; it does not replace diagnostic confirmation.",
  }, PACKET),
  sourced({
    id: "block-hp-localization", type: "bullets", heading: "Localize once surgery is selected",
    items: [
      "Neck ultrasound identifies candidate glands and coexisting thyroid disease. Sestamibi, often with SPECT/CT, exploits delayed retention; multigland disease is less reliably localized.",
      "4D-CT uses enhancement/washout to identify lesions and can be useful when initial studies disagree, for reoperation or according to local expertise. Balance contrast/radiation with renal function and context.",
      "Selective venous PTH sampling is invasive rescue localization for selected difficult cases, particularly before reoperation, rather than routine initial testing.",
      "Nonlocalizing imaging does not preclude an operation by an experienced surgeon. Avoid routine preoperative parathyroid needle biopsy, especially when carcinoma is possible.",
    ],
  }, AAES),
  sourced({
    id: "block-hp-operation", type: "table", heading: "Match the operation to the disease pattern",
    columns: ["Setting", "Operative strategy"],
    rows: [
      ["Localized sporadic adenoma", "Focused parathyroidectomy with reliable intraoperative PTH monitoring is appropriate; do not routinely inspect every gland solely to prove normality when localization and biochemical response are convincing."],
      ["Multigland disease / discordant studies", "Bilateral exploration is appropriate for suspected multigland disease, nonlocalizing/discordant studies or inadequate biochemical response. Remove abnormal glands while preserving viable normal tissue."],
      ["Hyperplasia", "Subtotal resection or total resection with autograft are options; recurrence and permanent hypoparathyroidism tradeoffs depend on disease context. Preserve or autotransplant devascularized normal tissue."],
      ["Difficult or recurrent disease", "Use an experienced reoperative team, prior records and detailed localization; the risk profile exceeds that of an initial focused adenoma operation."],
    ],
  }, AAES),
  sourced({
    id: "block-hp-men-operative", type: "bullets", heading: "Syndromic and ectopic operative pivots",
    items: [
      "MEN1 commonly needs multigland management, often subtotal parathyroidectomy with transcervical thymectomy; a sporadic focused-adenoma approach can leave disease behind.",
      "If an inferior gland is missing, examine the thyrothymic tract/thymus; a superior gland may be retroesophageal or in the tracheoesophageal groove. A gland missed at the first operation may still be in its usual position.",
      "Frozen section or ex-vivo aspirate PTH confirms that tissue is parathyroid; it does not reliably distinguish adenoma from hyperplasia. Avoid indiscriminate biopsies of normal glands.",
    ],
  }, PACKET),
  sourced({
    id: "block-hp-men2a", type: "prose", heading: "↳ MEN2A: enlarged-gland selection",
    text: "ATA medullary guidance recommends removing visibly enlarged glands in MEN2A-associated HPT. If all four are enlarged, subtotal resection or total resection with heterotopic autograft is an option. This is not an instruction to remove all normal-appearing glands during every MEN2A neck operation; evaluate and treat pheochromocytoma first when present.",
  }, MTC),
  sourced({
    id: "block-hp-iopth", type: "prose", heading: "Intraoperative PTH: agree on the protocol",
    text: "Use the highest pre-incision/pre-excision baseline for the conventional Miami comparison and reassess at 10 minutes after excision. The supplied disease guide writes **>50%** decline; the registered 2025 diagnostic meta-analysis describes **≥50%**. An exactly 50% result therefore needs the chosen local protocol rather than silent interchange of inequalities. Some protocols also require a normal final value or later sample. An inadequate drop prompts reassessment/further exploration; intraoperative response is not the same as durable biochemical cure. Detailed criteria are compared in the parathyroidectomy playbook.",
  }, PACKET),
  sourced({
    id: "block-hp-observation", type: "table", heading: "When surgery is deferred",
    columns: ["Goal", "Monitoring / treatment"],
    rows: [
      ["Detect progression", "Calcium, 25-OH vitamin D and renal function annually; three-site DXA every 1–2 years, with vertebral/renal imaging and urine testing when indicated."],
      ["Maintain nutrition", "Maintain ordinary recommended calcium intake rather than restricting calcium. Replete vitamin D cautiously with monitoring."],
      ["Lower calcium", "Cinacalcet can control calcium but does not improve BMD; it is a control strategy when surgery is unsuitable or deferred, not a cure."],
      ["Improve BMD", "Bisphosphonate or denosumab may improve BMD. The chronic-PHPT evidence differs from acute antiresorptive treatment of hypercalcemia; do not infer these drugs treat gland autonomy."],
      ["Address both targets", "Selected patients may need cinacalcet plus an antiresorptive, with monitoring and agent-specific precautions."],
      ["Reconsider surgery", "A new stone, low-trauma fracture, BMD decline to ≤−2.5, sustained calcium >1 mg/dL above ULN or significant renal deterioration warrants reassessment."],
    ],
  }, WORKSHOP),
  sourced({
    id: "block-hp-evidence-limits", type: "prose", heading: "Biochemical cure does not guarantee every proposed long-term benefit",
    text: "Surgery corrects PHPT and usually improves BMD. The supplied long-term mild-PHPT trials and renal observational studies do not consistently show survival, fracture, cardiovascular-event or eGFR-preservation benefits. Such outcomes and nonspecific symptoms should be counseled separately from biochemical cure. Unverified 2026 reviews questioning criteria do not replace the current Fifth Workshop thresholds.",
  }, PACKET),
  sourced({
    id: "block-hp-pregnancy", type: "bullets", heading: "PHPT in pregnancy",
    items: [
      "Hydrate and monitor mild disease with coordinated endocrine/obstetric care. The Fifth Workshop has an internal threshold discrepancy: summary 12.4 considers second-trimester surgery at calcium >11.0 mg/dL, whereas its pregnancy-panel item 4 uses >1 mg/dL above the laboratory upper limit of normal. These are not equivalent for every laboratory; interpret with pregnancy-appropriate calcium assessment, symptoms and specialist review rather than silently substituting one cutoff.",
      "Limit preoperative localization to ultrasound. Avoid bisphosphonates/denosumab in this setting; cinacalcet evidence is limited.",
      "If surgery is deferred, monitor the neonate for hypocalcemia and plan definitive maternal treatment after delivery before another pregnancy.",
    ],
  }, WORKSHOP),
  sourced({
    id: "block-hp-renal-medical", type: "bullets", heading: "Renal secondary HPT: correct the drivers first",
    items: [
      "In nondialysis CKD, evaluate progressively rising/persistently high PTH for modifiable factors including phosphate excess, hypocalcemia and vitamin-D deficiency. Routine calcitriol/analogs are not advised for all adults with CKD G3a–G5; reserve them for selected severe/progressive disease.",
      "For CKD G5D requiring PTH lowering, KDIGO supports calcimimetics, calcitriol/vitamin-D analogs or a combination of those classes, tailored to calcium/phosphate status.",
      "KDIGO's dialysis PTH range is approximately **2–9 times the assay upper limit of normal**; marked changes within that range can still warrant treatment adjustment.",
      "For CKD G3a–G5D with severe HPT failing medical/pharmacologic treatment, KDIGO supports parathyroidectomy. It gives **no universal numeric PTH surgical cutoff**.",
    ],
  }, KDIGO),
  sourced({
    id: "block-hp-renal-practice", type: "bullets", heading: "Renal operative selection and preparation",
    items: [
      "Coordinate phosphate intake/binders, vitamin-D status, dialysis calcium and calcimimetic therapy with nephrology. Sevelamer is available as hydrochloride or carbonate; oral cinacalcet and IV etelcalcetide are alternative calcimimetics, not a routine combination with each other.",
      "Refractory bone pain/fractures, myalgia/weakness, pruritus, calciphylaxis, severe extraskeletal calcification or uncontrolled calcium/phosphate abnormalities favor surgical referral. The whole trajectory matters more than a single PTH measurement.",
      "Expect multigland disease and plan bilateral exploration, often with cervical thymectomy for ectopic/supernumerary glands. Subtotal resection or total resection with autograft balances recurrence and permanent hypocalcemia; transplant plans influence selection.",
      "Optimize comorbidities and vitamin-D status, assess concomitant thyroid disease/ectopic glands and anticipate hungry bone. Exact graft and resection choices require disease-specific operative planning.",
      "Potential cardiovascular or survival advantages in supplied observational studies are associations, not randomized proof; avoid promising a survival benefit from surgery or cinacalcet.",
    ],
  }, PACKET),
  sourced({
    id: "block-hp-tertiary", type: "prose", heading: "Tertiary HPT: autonomy and transplant timing",
    text: "Persistent autonomous multigland disease after prolonged renal secondary HPT can occur before or after transplantation. Subtotal parathyroidectomy or total resection with autograft can provide definitive control; cinacalcet can control hypercalcemia when surgery is deferred. Vitamin D and antiresorptives address selected deficiencies/bone loss, not autonomy. Some posttransplant HPT improves over time. SCORE's six-month diagnostic framing and approximately 12-month surgical consideration are context, not mandatory biologic definitions or a reason to delay treatment of severe disease. Conflicting graft-outcome/timing cohorts require joint transplant, nephrology and endocrine-surgery judgment.",
  }, PACKET),
  sourced({
    id: "block-hp-carcinoma", type: "warning", heading: "Suspected parathyroid carcinoma: keep the capsule intact", tone: "danger",
    text: "Severe hypercalcemia, markedly high PTH, a palpable firm mass or RLN palsy raises concern for carcinoma. Avoid preoperative needle biopsy. When suspicious intraoperatively, completely resect without capsule rupture, including adherent tissues as necessary; this may require en-bloc ipsilateral thyroid resection. **Do not perform prophylactic central or lateral neck dissection** solely for parathyroid carcinoma. Histologic invasion establishes malignancy; follow calcium/PTH long term because recurrence and uncontrolled hypercalcemia are major threats.",
  }, AAES),
  sourced({
    id: "block-hp-crisis", type: "warning", heading: "Hypercalcemic crisis: resuscitate, then treat the cause", tone: "danger",
    text: "Severe symptomatic hypercalcemia, commonly around or above 14 mg/dL, can cause dehydration, AKI, confusion and short-QT/arrhythmia. Obtain ECG, PTH, renal function and cause assessment; PHPT, carcinoma and malignancy are major considerations. Begin isotonic IV volume repletion tailored to cardiac/renal reserve. Do not give routine loop diuretics before repletion; use them for volume overload when indicated. Stabilized PTH-mediated crisis often warrants urgent definitive parathyroidectomy during the same admission.",
  }, PACKET),
  sourced({
    id: "block-hp-crisis-adjuncts", type: "prose", heading: "↳ Calcium-lowering bridges and evidence limits",
    text: "For severe hypercalcemia of malignancy, the Endocrine Society suggests calcitonin plus an IV bisphosphonate or denosumab; limit calcitonin to 48–72 hours because of tachyphylaxis. This is malignancy guidance, not a PHPT-crisis trial. Applying these bridges to PTH-mediated crisis requires cause-specific judgment, renal/product review and monitoring; it does not replace definitive treatment of an autonomous gland.",
  }, HCM),
  sourced({
    id: "block-hp-crisis-rescue", type: "prose", heading: "↳ Refractory crisis",
    text: "Selected refractory cases or those with severe renal failure may require low-calcium dialysis. Avoid IV phosphate as a calcium-lowering maneuver because of precipitation and renal/hypocalcemic injury. Tailor any oral phosphate to documented deficiency. Severe hypercalcemia plus a firm mass or very high PTH also changes operative planning toward an intact-capsule carcinoma resection.",
  }, PACKET),
  sourced({
    id: "block-hp-postop", type: "table", heading: "Postoperative complications and rescue",
    columns: ["Problem", "Recognition and response"],
    rows: [
      ["Neck hematoma", "Swelling/pressure with airway compromise is an emergency: open skin and strap closure promptly, evacuate, secure the airway and return to OR; do not wait for imaging in a threatened airway."],
      ["Hungry bone", "Low calcium with low phosphate/magnesium and preserved/high PTH after abrupt correction of high turnover; risk rises with severe bone disease, high PTH/alkaline phosphatase and renal HPT. Replace calcium and active vitamin D with close monitoring; correct magnesium."],
      ["Hypoparathyroidism", "Low calcium with low PTH, often high phosphate, favors inadequate gland function rather than bone hunger. Treat with calcium/calcitriol; monitored IV calcium is required for tetany, significant QT prolongation or severe symptoms."],
      ["RLN injury", "Unilateral dysfunction causes hoarseness/aspiration and needs laryngeal assessment. Bilateral dysfunction can cause stridor and requires airway rescue."],
      ["Persistent / recurrent hypercalcemia", "Reconfirm the diagnosis and exclude FHH/secondary contributors; review operative and pathology records and localize before higher-risk reoperation. Missed gland or multigland disease is common; forearm-graft recurrence can be assessed with bilateral arm PTH sampling."],
    ],
  }, PACKET),
  sourced({
    id: "block-hp-cure", type: "prose", heading: "Cure, persistence and recurrence",
    text: "Assess early calcium and symptoms, then establish durable follow-up. AAES defines cure of hypercalcemic PHPT as normal calcium homeostasis lasting **at least 6 months**. Failure to achieve normocalcemia within 6 months is persistent disease; hypercalcemia after a normocalcemic interval beyond 6 months is recurrent. An elevated PTH with normal calcium warrants evaluation for secondary causes rather than immediate labeling as operative failure. Normocalcemic PHPT has a different cure assessment, including PTH normalization. Continue appropriate skeletal and biochemical surveillance.",
  }, AAES),
  sourcedUnits({
    id: "block-hp-board-split", type: "table", heading: "Board answer versus current practice",
    columns: ["Issue", "Older / supplied teaching", "Current interpretation"],
    rows: [
      ["FHH exclusion", "SCORE uses >0.01 and the packet's old correction uses >0.02 as rule-out values.", "CCCR ranges overlap; neither cutoff absolutely excludes FHH. Integrate history, confounders and genetics."],
      ["Urinary calcium", "Older Fourth Workshop teaching uses >400 mg/day.", "Fifth Workshop uses >250 mg/day in women and >300 mg/day in men."],
      ["Normocalcemic surgery", "Fiser imports the same indications as hypercalcemic PHPT; SCORE names recurrent stones/ongoing bone loss.", "Fifth Workshop finds insufficient evidence for universal normocalcemic surgical criteria; individualize after excluding secondary causes."],
      ["Renal PTH threshold", "SCORE lists >800–1,000 pg/mL or >9× ULN; older KDOQI uses >800 with refractory calcium/phosphate abnormalities.", "KDIGO's 2–9× range is a dialysis target, not a numeric operative mandate; severe medically refractory HPT supports surgery."],
      ["Carcinoma lymph nodes", "Fiser includes routine central dissection with en-bloc resection.", "AAES advises against prophylactic central/lateral dissection; preserve intact complete tumor resection and address clinically involved disease."],
      ["Other board clues", "Fiser gives chloride:phosphate >33 and calls FHH a PTH-receptor defect.", "The ratio is a historical clue, not a modern diagnostic criterion; FHH is a CaSR-pathway disorder."],
      ["Secondary-HPT causes", "SCORE groups lithium/thiazides and a mixed congenital/metabolic list under secondary disease.", "Lithium/thiazides need evaluation as PTH-dependent hypercalcemia mimics. DiGeorge classically causes deficient parathyroid function; the unusual list is unresolved and should not drive a clinical algorithm."],
    ],
  }, [[SCORE, PACKET, WORKSHOP], [PACKET, WORKSHOP], [FISER, SCORE, WORKSHOP], [SCORE, PACKET, KDIGO], [FISER, AAES], [FISER, PACKET, WORKSHOP], [SCORE, PACKET, WORKSHOP]]),
  references("block-hp-references", [PACKET, SCORE, FISER, WORKSHOP, AAES, KDIGO, MTC, HCM]),
];

export const hyperparathyroidismTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000008620",
  versionId: "00000000-0000-4000-8000-000000008621",
  slug: "hyperparathyroidism",
  title: "Hyperparathyroidism",
  aliases: ["primary hyperparathyroidism", "secondary hyperparathyroidism", "tertiary hyperparathyroidism", "normocalcemic primary hyperparathyroidism", "familial hypocalciuric hypercalcemia", "parathyroid adenoma", "parathyroid hyperplasia", "parathyroid carcinoma", "hypercalcemic crisis", "hungry bone syndrome", "calcium creatinine clearance ratio"],
  scoreNodeId: "endocrine-conditions",
  scoreCategory: "SCORE · Endocrine · Diseases & Conditions",
  tags: ["endocrine", "parathyroid", "calcium"],
  sourceId: PACKET,
  additionalSourceIds: [SCORE, FISER, WORKSHOP, AAES, KDIGO, MTC, HCM],
  blocks,
  reviewedAt: "2026-11-15T00:00:00.000Z",
});
