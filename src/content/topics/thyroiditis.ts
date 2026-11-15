import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  THYROIDITIS_PACKET_SOURCE as PACKET,
  SCORE_THYROIDITIS_SOURCE as SCORE,
  FISER_THYROID_SOURCE as FISER,
  ATA_HYPERTHYROIDISM_2016_SOURCE as ATA,
  ATA_PREGNANCY_THYROID_2026_SOURCE as PREGNANCY,
  ESE_ICI_ENDOCRINE_2022_SOURCE as ESE,
  GULDVOG_HASHIMOTO_2019_SOURCE as GULDVOG,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Educational draft: clinical sign-off is tracked in the unmerged batch PR.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-ti-summary", type: "summary", heading: "At a glance",
    text: "Thyroiditis includes autoimmune, destructive, infectious, drug-related and fibrosing disease. **Destructive thyrotoxicosis releases stored hormone rather than making excess new hormone**: uptake is usually low, thyroglobulin elevated, and a thyrotoxic phase lasting weeks may be followed by hypothyroidism and recovery. Thionamides usually do not help. Surgery is selective: abscess/source control, refractory amiodarone disease, compressive or suspicious Hashimoto disease, or biopsy/decompression for Riedel disease.",
  }, PACKET),
  sourced({
    id: "block-ti-entities", type: "table", heading: "Recognize the inflammatory pattern",
    columns: ["Entity", "Presentation / mechanism", "Function and expected course"],
    rows: [
      ["Hashimoto / chronic lymphocytic", "Painless firm or rubbery gland; autoimmune lymphocytic injury, often with other autoimmune disease or family history.", "Euthyroid or hypothyroid; transient hashitoxicosis can occur. Progression to permanent hypothyroidism is not universal."],
      ["Subacute granulomatous / de Quervain", "Painful tender gland, often 2–8 weeks after URI, with pain radiating to jaw/ear or migrating across the gland; elevated ESR/CRP.", "Usually thyrotoxic → hypothyroid → recovery, often within 12 months; some develop permanent hypothyroidism or relapse."],
      ["Painless / silent", "Sporadic autoimmune destruction without pain or viral prodrome; sometimes drug-associated.", "Thyrotoxic and/or hypothyroid phases; recovery is common, but permanent hypothyroidism is possible."],
      ["Postpartum", "Immune rebound within 12 months after delivery, miscarriage or abortion; thyroid autoimmunity increases risk.", "Either phase may occur alone. Thyrotoxicosis typically occurs at 1–6 months; hypothyroidism commonly at 4–8 months."],
      ["Acute suppurative", "Severe focal pain, fever, erythema/fluctuance, leukocytosis or toxicity; pediatric torticollis may occur. Consider a pyriform sinus fistula.", "Usually euthyroid; occasional destructive thyrotoxicosis. Persistent structural source can cause recurrence."],
      ["Riedel fibrosing", "Woody fixed gland with invasive fibrosis, sometimes part of IgG4-related disease; may be painful and cause dysphagia, stridor or RLN dysfunction.", "Often euthyroid but hypothyroidism and hypoparathyroidism can occur. Requires tissue diagnosis and selective decompression."],
    ],
  }, PACKET),
  sourced({
    id: "block-ti-other-causes", type: "bullets", heading: "Preceding events and disease context",
    items: [
      "Ask about lithium, amiodarone, interferon, tyrosine-kinase inhibitors and immune checkpoint inhibitors, as well as recent radiation, manipulation, pregnancy and iodinated contrast.",
      "Pain favors de Quervain, infection, radiation or palpation thyroiditis, but pain alone does not establish etiology. Riedel disease can also hurt.",
      "Hashimoto is a leading cause of hypothyroidism in iodine-sufficient regions; iodine deficiency remains a major global cause. A positive antibody test alone is not thyroid dysfunction.",
      "Hashimoto may coexist with type-1 diabetes, celiac disease or vitiligo. A new discrete nodule needs its own ultrasound-based assessment rather than being dismissed as inflammation.",
    ],
  }, PACKET),
  sourced({
    id: "block-ti-antibodies", type: "prose", heading: "Antibodies support the diagnosis, not the functional state",
    text: "SCORE reports anti-TPO antibodies in about 90% of autoimmune thyroiditis and thyroid antibodies in about 10% of the US population. Some antibody-positive people have normal thyroid function. Measure TSH/FT4 rather than equating antibody positivity with a need for hormone treatment. All palpable thyroid nodules warrant ultrasound.",
  }, SCORE),
  sourced({
    id: "block-ti-workup", type: "sequence", heading: "Workup: function, mechanism, then targeted imaging",
    steps: [
      { title: "Establish the functional state", detail: "Start with TSH; add FT4 and total T3 when thyrotoxicosis is suspected. Use TRAb/TSI when Graves is possible. Anti-TPO supports autoimmunity but can be positive in Graves and does not alone separate postpartum thyroiditis from Graves." },
      { title: "Look for destructive release", detail: "High thyroglobulin supports destruction; low thyroglobulin favors exogenous hormone, subject to assay/antibody limitations. ESR/CRP elevation supports painful subacute disease. A total T3 (ng/dL):total T4 (mcg/dL) ratio <20 favors destruction and >20 synthesis, but is a contextual clue rather than a definitive test." },
      { title: "Use uptake or Doppler if uncertainty remains", detail: "Graves is usually diffusely hypervascular/high uptake; destructive thyroiditis usually has low uptake/flow. I-123 or Tc-pertechnetate are diagnostic tracers. Recent iodine loading or amiodarone can suppress uptake despite synthesis, and amiodarone confounds T3:T4 interpretation." },
      { title: "Reserve tissue for the question it answers", detail: "Typical de Quervain disease does not need routine FNA. Aspirate suspected abscess for cytology and cultures; biopsy woody fixed disease or a suspicious mass. Ultrasound/CT is guided by focal lesions, deep infection or compression." },
    ],
  }, PACKET),
  sourced({
    id: "block-ti-imaging-tissue", type: "table", heading: "When imaging or tissue changes management",
    columns: ["Finding", "Next diagnostic step"],
    rows: [
      ["Typical painful subacute disease", "US may show hypoechoic low-flow patches but is not always necessary. High fever, marked WBC elevation, focal fluctuance or atypical course warrants aspiration to exclude infection."],
      ["Abscess / deep infection", "US and, if needed, contrast CT define extent; aspirate for bacterial culture and selected mycobacterial/fungal studies. Airway/sepsis urgency overrides elective thyroid workup."],
      ["Woody infiltrative Riedel pattern", "Obtain adequate core or open/incisional tissue as needed; assess fibrosis/IgG4 features and exclude anaplastic carcinoma or lymphoma. FNA alone may be inadequate."],
      ["Rapidly enlarging Hashimoto-associated mass", "Core biopsy with flow cytometry is particularly useful for lymphoma; do not assume inflammatory growth. Evaluate the airway first if stridor or dyspnea is present."],
      ["Recurrent left pediatric infection", "After acute inflammation resolves, assess for pyriform sinus fistula with contrast swallow or targeted CT and endoscopic confirmation; acute edema can conceal the tract."],
    ],
  }, PACKET),
  sourced({
    id: "block-ti-airway", type: "warning", heading: "Stridor or rapidly progressive enlargement", tone: "danger",
    text: "Prioritize airway assessment and stabilization before an elective scan or biopsy. Fever, erythema, fluctuance and marked leukocytosis favor suppuration; rapid firm enlargement in Hashimoto raises lymphoma concern. A poor steroid response should prompt reassessment for infection, malignancy or another diagnosis; it does not categorically exclude subacute thyroiditis.",
  }, PACKET),
  sourced({
    id: "block-ti-hashimoto", type: "bullets", heading: "Hashimoto: replace hormone and select surgery carefully",
    items: [
      "Treat overt hypothyroidism with levothyroxine. The supplied adult framework is about 1.6 mcg/kg/day in a healthy younger adult, with a lower start such as 25–50 mcg/day in older/cardiac patients and subsequent titration.",
      "Recheck TSH about 6–8 weeks after a dose change and periodically once stable. Reassess new nodules or rapid gland enlargement with ultrasound and appropriate tissue sampling.",
      "Surgery is reasonable for compression/large goiter, suspicious or indeterminate nodules, or selected difficult hormone fluctuations. Treat hypothyroidism and assess symptoms before attributing all persistent fatigue to the thyroid.",
      "Symptom-driven thyroidectomy in an already euthyroid patient requires particularly careful counseling: the evidence comes from selected populations and must be weighed against nerve injury, hypoparathyroidism and lifelong replacement.",
    ],
  }, PACKET),
  sourced({
    id: "block-ti-hashimoto-trial", type: "prose", heading: "Selected euthyroid Hashimoto trial: what it establishes",
    text: "Guldvog's open-label randomized trial enrolled 150 replacement-treated euthyroid patients with persistent symptoms and anti-TPO >1,000 IU/mL. At 18 months, general-health scores improved from 38 to 64 in the thyroidectomy group, and antibodies declined substantially. The study lacked a sham operation and applies to that highly selected population. The abstract supports symptom improvement in selected patients; it does not establish routine surgery for antibody positivity or verify the supplied five-year outcomes.",
  }, GULDVOG),
  sourced({
    id: "block-ti-subacute", type: "sequence", heading: "Painful subacute thyroiditis: anti-inflammatory treatment",
    steps: [
      { title: "Relieve adrenergic symptoms", detail: "Use a beta-blocker when appropriate. Thionamides do not help ordinary destructive release; antibiotics, radioiodine and thyroidectomy are not routine treatment." },
      { title: "Begin an NSAID for mild pain", detail: "Use an appropriate anti-inflammatory dose, considering renal, GI and cardiovascular risks. Escalate for moderate–severe pain or inadequate response over several days." },
      { title: "Use a response-guided steroid course when needed", detail: "ATA describes prednisone 40 mg orally daily for 1–2 weeks, followed by a taper over 2–4 weeks or longer according to symptoms. Relapse can occur during taper; reassess the diagnosis if response is atypical." },
      { title: "Monitor the hypothyroid phase", detail: "Temporary levothyroxine may be useful when symptomatic or trying to conceive. Reassess after about 3–6 months and attempt withdrawal when appropriate to establish recovery." },
    ],
  }, ATA),
  sourced({
    id: "block-ti-subacute-course", type: "prose", heading: "↳ Recovery and recurrence",
    text: "Most patients recover, but ATA describes permanent hypothyroidism in roughly 5–15% after subacute disease and 10–20% after painless disease. Recurrence and steroid-taper relapse occur. Observational differences between NSAID- and steroid-treated groups do not establish that steroids prevent permanent hypothyroidism. Rare destructive thyroiditis can produce severe thyrotoxicosis or storm, so systemic deterioration merits urgent reassessment.",
  }, ATA),
  sourced({
    id: "block-ti-postpartum", type: "bullets", heading: "Painless and postpartum thyroiditis: treat the phase",
    items: [
      "Postpartum thyroiditis may produce a thyrotoxic phase, a hypothyroid phase or both. TPO antibodies increase risk but do not distinguish it from postpartum Graves; use TRAb/TSI, clinical findings and Doppler when needed.",
      "In the thyrotoxic phase, use the lowest effective short-term beta-blocker for symptoms. Do not give ATDs for ordinary destructive postpartum thyroiditis.",
      "In the hypothyroid phase, consider levothyroxine for symptoms, pregnancy plans and the breastfeeding context. If untreated, check thyroid function every 4–8 weeks until recovery or persistent hypothyroidism is clear.",
      "If replacement was started, reassess the need and consider taper around 1 year postpartum when another pregnancy is not planned soon. Future-pregnancy recurrence can be high, around 70%, and permanent hypothyroidism remains possible; continue long-term thyroid-function follow-up.",
      "Levothyroxine given to an antibody-positive euthyroid pregnant woman does not reliably prevent postpartum thyroiditis.",
    ],
  }, PREGNANCY),
  sourced({
    id: "block-ti-lactation", type: "warning", heading: "Diagnostic lactation precautions differ from I-131 treatment", tone: "pearl",
    text: "Do not perform radionuclide testing during pregnancy. During lactation, a strict diagnostic indication may justify I-123 or Tc-pertechnetate with nuclear-medicine coordination: stop breastfeeding and express/discard milk for 3–4 days after I-123 (some advise up to 7 days) or 36 hours after Tc-pertechnetate. I-131 therapy is contraindicated during lactation; consider waiting at least 3 months after cessation if required, and never resume breastfeeding that child after treatment.",
  }, PREGNANCY),
  sourced({
    id: "block-ti-suppuration", type: "sequence", heading: "Acute suppurative thyroiditis: source control",
    steps: [
      { title: "Stabilize airway and sepsis", detail: "Begin appropriate IV antibiotics covering likely staphylococci, streptococci and oral flora/anaerobes, then tailor to cultures and local resistance. Consider atypical pathogens in an immunocompromised host; do not automatically give antifungal treatment to every such patient." },
      { title: "Aspirate and drain", detail: "Ultrasound-guided aspiration supplies cytology/culture and can provide drainage. Escalate to incision/drainage or selected thyroid resection for failed aspiration, progressive infection, inaccessible collection or concerning tissue. Antibiotic duration follows organism, extent, response and source control rather than a single cohort median." },
      { title: "Identify a structural source after resolution", detail: "Recurrent or left-sided pediatric disease strongly suggests a third/fourth-pouch pyriform sinus fistula. Endoscopic closure/ablation or tract excision, sometimes with partial/hemithyroidectomy, reduces recurrence. Not every adult abscess is fistulous." },
      { title: "Confirm recovery", detail: "Repeat clinical/imaging assessment as indicated and follow thyroid function after the acute episode. A destructive thyrotoxic phase needs symptom control rather than routine ATD." },
    ],
  }, PACKET),
  sourced({
    id: "block-ti-ait", type: "table", heading: "Amiodarone thyrotoxicosis: synthesis, destruction or both",
    columns: ["Pattern", "Clues", "Initial treatment framework"],
    rows: [
      ["Type 1", "Iodine-fueled synthesis in a nodular or latent-Graves gland; Doppler often shows increased vascularity. Uptake may be low because of iodine loading.", "MMI, often 40 mg orally daily initially, adjusted to response; the iodine-loaded gland can be relatively resistant. Specialized adjuncts depend on availability."],
      ["Type 2", "Destructive toxicity, often in a previously normal gland; little Doppler flow and very low uptake.", "Prednisone-equivalent 40 mg orally daily for 2–4 weeks, then taper over about 2–3 months by response."],
      ["Mixed / uncertain", "No single uptake or biochemical measure reliably separates all cases; deteriorating cardiac status increases urgency.", "MMI plus glucocorticoid when subtype is uncertain, disease unstable or monotherapy fails; coordinate endocrine and cardiac care."],
    ],
  }, ATA),
  sourced({
    id: "block-ti-ait-surgery", type: "warning", heading: "Refractory amiodarone disease can require early surgery", tone: "danger",
    text: "Decide whether to stop amiodarone jointly with cardiology/endocrinology; essential arrhythmia treatment may need to continue. Low uptake/iodine loading often makes immediate RAI impractical. Persistent thyrotoxicosis despite aggressive MMI/glucocorticoid treatment, worsening ventricular function or uncontrolled arrhythmia warrants experienced thyroid-surgery assessment before profound debilitation. A blanket 'thyroiditis never needs surgery' rule is wrong in this setting. Monitor thyroid function before and during amiodarone therapy.",
  }, ATA),
  sourced({
    id: "block-ti-ici", type: "bullets", heading: "Immune checkpoint inhibitor thyroiditis",
    items: [
      "Most ICI-related thyrotoxicosis is transient destructive thyroiditis and can evolve to hypothyroidism. Persistent thyrotoxicosis requires evaluation for Graves or another synthesis-driven cause.",
      "Mild biochemical disease can be observed; ESE recommends TSH/FT4 every 3–6 weeks in the early phase, with frequency adjusted to the trajectory. Use short-term beta-blockade for symptoms; ordinary destructive disease does not need ATD, RAI or surgery as first-line treatment.",
      "Routine high-dose glucocorticoids are not indicated for ordinary ICI thyroiditis; severe thyrotoxicosis or severe eye disease is a specialist exception.",
      "Overt primary hypothyroidism generally needs levothyroxine. Exclude or treat concurrent adrenal insufficiency/hypophysitis before replacement when suspected, to avoid adrenal crisis; a low FT4 with inappropriately low/normal TSH requires a central-disease assessment.",
      "Endocrine toxicity does not automatically require permanent ICI discontinuation. Coordinate the oncology decision with severity and other toxicities and continue thyroid monitoring even after ICI cessation.",
    ],
  }, ESE),
  sourced({
    id: "block-ti-riedel", type: "bullets", heading: "Riedel: tissue diagnosis and limited decompression",
    items: [
      "Dense extracapsular fibrosis can mimic anaplastic carcinoma or lymphoma and entrap the trachea, nerves and parathyroids. Obtain adequate tissue; IgG4-rich plasma cells/obliterative phlebitis can support an IgG4-related process.",
      "Glucocorticoids are used for active inflammatory disease. Tamoxifen or selected immunosuppressive/biologic therapy may be considered for refractory disease under specialist care; precise regimens are not standardized by the supplied evidence.",
      "Replace thyroid hormone if hypothyroid. Assess for associated retroperitoneal, mediastinal, orbital or biliary fibrosis/sclerosing cholangitis.",
      "Surgery is usually diagnostic or decompressive: isthmusectomy/limited resection may relieve pressure, and tracheostomy or other airway intervention may be necessary. Avoid reflex total thyroidectomy through obliterated planes because RLN and parathyroid injury risk is high.",
    ],
  }, PACKET),
  sourced({
    id: "block-ti-lymphoma", type: "warning", heading: "Hashimoto with a rapidly growing mass: assess for lymphoma", tone: "danger",
    text: "Hashimoto is associated with an increased relative risk of thyroid lymphoma, but most patients never develop it. Rapid growth, compressive symptoms or nodes require tissue diagnosis, usually core biopsy with flow cytometry after airway assessment. Diffuse large B-cell lymphoma is more common than MALT lymphoma. Treatment is hematology-directed chemoimmunotherapy and/or radiation according to subtype and stage; surgery is usually for diagnosis or airway rescue, rather than routine curative thyroidectomy. Reported papillary-cancer associations are vulnerable to selection bias and do not justify prophylactic thyroidectomy for Hashimoto.",
  }, PACKET),
  sourcedUnits({
    id: "block-ti-board-split", type: "table", heading: "Board answer versus current practice",
    columns: ["Issue", "Board-source wording", "Interpretation for decisions"],
    rows: [
      ["No ATD in silent/postpartum disease", "SCORE says there is no excess thyroid hormone.", "There is excess circulating hormone during thyrotoxicosis, but no excess synthesis; ATDs therefore do not address the mechanism."],
      ["Hashimoto / thyroid nodules", "SCORE calls Hashimoto the commonest cause of thyroid nodules.", "Benign colloid/hyperplastic nodular disease remains important; assess discrete nodules by ultrasound rather than attributing every nodule to Hashimoto."],
      ["Persistent painful thyroiditis", "Fiser includes lobectomy to exclude cancer and total thyroidectomy for persistent inflammation.", "Typical de Quervain disease is medical. Atypical focal findings need reassessment/tissue; persistent pain alone is not an automatic thyroidectomy indication."],
      ["Riedel airway symptoms", "Fiser emphasizes isthmectomy or tracheostomy.", "Retain limited diagnostic/decompressive surgery and airway protection; aggressive total resection may be hazardous in fibrotic planes."],
    ],
  }, [[SCORE, ATA], [SCORE, PACKET], [FISER, ATA], [FISER, PACKET]]),
  sourced({
    id: "block-ti-pivots", type: "bullets", heading: "Decision pivots and follow-up",
    items: [
      "Post-URI pain with elevated ESR and no sepsis: symptom control/NSAID, then steroid if needed; high fever, fluctuance or atypical response redirects evaluation toward infection or malignancy.",
      "Postpartum thyrotoxicosis followed by fatigue: check the current phase. Positive TRAb, eye disease or high Doppler flow favors Graves and can change treatment to ATD.",
      "Recurrent left pediatric abscess: control acute infection, then find and treat a fistula. Repeated drainage without source evaluation leaves recurrence risk.",
      "Follow thyroid function after apparent recovery; silent, subacute and postpartum disease can leave permanent hypothyroidism. Do not infer recovery or relapse from symptoms alone.",
      "Smoking cessation is appropriate counseling, but the supplied SCORE claim that smoking/iodine insufficiency directly causes thyroiditis was not independently established here; avoid converting it into a causal rule.",
    ],
  }, PACKET),
  references("block-ti-references", [PACKET, SCORE, FISER, ATA, PREGNANCY, ESE, GULDVOG]),
];

export const thyroiditisTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000008820",
  versionId: "00000000-0000-4000-8000-000000008821",
  slug: "thyroiditis",
  title: "Thyroiditis",
  aliases: ["Hashimoto thyroiditis", "Hashimoto disease", "chronic lymphocytic thyroiditis", "de Quervain thyroiditis", "subacute granulomatous thyroiditis", "painless thyroiditis", "silent thyroiditis", "postpartum thyroiditis", "Riedel thyroiditis", "acute suppurative thyroiditis", "amiodarone-induced thyrotoxicosis", "checkpoint inhibitor thyroiditis", "hashitoxicosis"],
  scoreNodeId: "endocrine-conditions",
  scoreCategory: "SCORE · Endocrine · Diseases & Conditions",
  tags: ["endocrine", "thyroid", "thyroiditis"],
  sourceId: PACKET,
  additionalSourceIds: [SCORE, FISER, ATA, PREGNANCY, ESE, GULDVOG],
  blocks,
  reviewedAt: "2026-11-15T00:00:00.000Z",
});
