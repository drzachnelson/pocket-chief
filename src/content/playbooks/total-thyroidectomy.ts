import { buildPlaybook, references, sourced } from "@/content/authoring";
import { ATA_THYROID_2025_SOURCE as ATA, TOTAL_THYROIDECTOMY_PLAYBOOK_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-thyroid-summary",
    type: "summary",
    heading: "At a glance",
    text: "Total thyroidectomy is capsular dissection done twice. Everything that goes wrong goes wrong at four places: the superior pedicle, where mass ligation costs the external laryngeal nerve; the inferior thyroid artery, where trunk ligation costs the parathyroids; Berry's ligament, where blind clamping costs the recurrent laryngeal nerve; and the moment before crossing to the second side, where an unrecognized first-side injury becomes a tracheostomy.",
  }, SOURCE),

  sourced({
    id: "block-thyroid-stage-warning",
    type: "warning",
    heading: "Confirm the first nerve before you start the second side",
    tone: "danger",
    text: "Stimulate the vagus or the proximal recurrent laryngeal nerve at the end of the first lobectomy. If the signal is lost, stage the operation and defer the contralateral lobe — bilateral paralysis means airway obstruction and tracheostomy, and most loss-of-signal injuries are transient and recover. An intact signal has a negative predictive value near 99 per cent for normal postoperative function.",
  }, SOURCE),

  sourced({
    id: "block-thyroid-indications",
    type: "bullets",
    heading: "When total thyroidectomy is the right operation",
    items: [
      "Primary tumour larger than 4 cm.",
      "Gross extrathyroidal extension.",
      "Clinically apparent nodal metastases or distant metastases.",
      "Bilateral disease.",
      "Poorly differentiated or high-grade differentiated carcinoma.",
      "Prior head and neck radiation, as a consideration rather than a requirement.",
      "Benign indications: compressive or substernal multinodular goitre, Graves disease when radioiodine and antithyroid drugs are unsuitable, and any goitre compromising airway or oesophagus.",
    ],
  }, ATA),

  sourced({
    id: "block-thyroid-lobectomy",
    type: "prose",
    heading: "↳ When lobectomy is preferred instead",
    text: "For unilateral cancer of 4 cm or less that is clinically node-negative and without extrathyroidal extension, lobectomy is preferred or an acceptable alternative. Total thyroidectomy in that group is elective, chosen to enable radioiodine, to make thyroglobulin-based follow-up interpretable, or to address suspicious contralateral nodularity. Active surveillance remains an option for low-risk papillary microcarcinoma. Roughly 11 to 34 per cent of lobectomies eventually need completion.",
  }, ATA),

  sourced({
    id: "block-thyroid-risk",
    type: "table",
    heading: "The trade-off to quantify at consent",
    columns: ["Complication", "Risk relative to lobectomy", "What it means at the bedside"],
    rows: [
      ["Transient recurrent nerve injury", "Relative risk 1.7", "Hoarse or breathy voice that usually recovers over weeks to months"],
      ["Permanent recurrent nerve injury", "Relative risk 1.9", "Persistent dysphonia and aspiration risk; may need medialization"],
      ["Transient hypocalcaemia", "Relative risk 10.7", "The dominant early problem — perioral numbness, tetany, readmission"],
      ["Permanent hypoparathyroidism", "Relative risk 3.2", "Lifelong calcium and calcitriol, sometimes parathyroid hormone replacement"],
      ["Neck haematoma", "Relative risk 2.6", "Airway emergency in the first twelve hours"],
      ["Bilateral nerve injury", "A risk unique to operating on both sides", "Airway obstruction at extubation requiring tracheostomy"],
    ],
  }, ATA),

  sourced({
    id: "block-thyroid-volume",
    type: "prose",
    heading: "↳ Volume matters more than the consent form admits",
    text: "These rates are surgeon-dependent, not fixed. A high-volume surgeon's total thyroidectomy complication rate of about 14.5 per cent still exceeds their own lobectomy rate, and a low-volume surgeon's reaches roughly 24 per cent. The choice of operation and the choice of surgeon are the same decision.",
  }, SOURCE),

  sourced({
    id: "block-thyroid-workup",
    type: "bullets",
    heading: "Preoperative workup",
    items: [
      "High-resolution ultrasound of the thyroid and of the central and lateral nodal compartments is mandatory, not optional.",
      "Contrast-enhanced CT or MRI for large tumours, suspected extrathyroidal extension, bulky or lateral nodal disease, or aggressive histology — iodinated contrast does not meaningfully delay radioiodine.",
      "Laryngoscopic assessment of cord mobility, especially with dysphonia, prior neck or nerve surgery, or invasive central disease. Knowing the baseline is what makes an intraoperative finding interpretable.",
      "Screen for hereditary risk. In suspected hereditary medullary carcinoma check plasma metanephrines, calcium and parathyroid hormone to exclude a phaeochromocytoma before operating on the neck.",
    ],
  }, SOURCE),

  sourced({
    id: "block-thyroid-setup",
    type: "bullets",
    heading: "Anaesthesia and setup",
    items: [
      "General endotracheal anaesthesia. Where neuromonitoring is planned, use an electromyographic tube and confirm electrode-to-cord position with videolaryngoscopy.",
      "Supine and semi-Fowler at 15 to 20 degrees of reverse Trendelenburg to reduce venous congestion, with a shoulder roll and neck extension, arms tucked. Re-confirm tube position after final positioning.",
      "Prep from the mentum to the sternal notch and upper chest, laterally to the anterior borders of both sternocleidomastoids.",
      "Antibiotic prophylaxis is not indicated — this is a clean case and neither meta-analysis nor propensity-matched cohorts show any reduction in surgical site infection.",
      "Routine pharmacologic venous thromboembolism prophylaxis is not warranted either: the thrombotic risk of roughly 0.16 per cent is far below the bleeding risk. Reserve it for selected high-risk patients.",
      "Keep systolic pressure below 180 mmHg and plan a smooth emergence with dexmedetomidine or intravenous lidocaine — coughing and retching raise venous pressure and cause haematoma.",
      "Give multimodal antiemetic prophylaxis for the same reason: retching is a haematoma risk factor, not just a comfort issue.",
    ],
  }, SOURCE),

  sourced({
    id: "block-thyroid-rln",
    type: "bullets",
    heading: "The recurrent laryngeal nerve",
    items: [
      "It ascends in the tracheo-oesophageal groove and enters the larynx deep to the inferior constrictor, always posterior to the cricothyroid joint — the single most constant landmark in the operation.",
      "The right nerve recurs around the subclavian artery and runs a more oblique, anterolateral course; the left loops the aortic arch and ascends more vertically and deeper in the groove.",
      "Its relationship to the inferior thyroid artery is genuinely variable — anterior, posterior, or between branches. Do not use the artery to predict it.",
      "Extralaryngeal branching occurs in 20 to 65 per cent. The anterior branch carries the bulk of the motor fibres and hugs the capsule, so a large posterior branch must never be mistaken for the whole trunk.",
      "A nonrecurrent nerve occurs in under 1 per cent, always on the right, always with an aberrant retro-oesophageal subclavian artery — suspect it from the preoperative CT.",
    ],
  }, SOURCE),

  sourced({
    id: "block-thyroid-ebsln",
    type: "prose",
    heading: "↳ The external branch of the superior laryngeal nerve",
    text: "It runs deep and parallel to the superior thyroid artery to innervate cricothyroid, which sets pitch and projection, and it travels through the sternothyroid-laryngeal triangle where superior pole dissection happens. Cernea type 1 crosses more than 1 cm above the upper pole in about 60 per cent, type 2a within 1 cm in about 17 per cent, and type 2b below the upper pole in about 20 per cent. Types 2a and 2b are the ones that get injured.",
  }, SOURCE),

  sourced({
    id: "block-thyroid-parathyroid-anatomy",
    type: "bullets",
    heading: "↳ Parathyroids, Berry's ligament and Zuckerkandl's tubercle",
    items: [
      "Superior glands are the more constant pair, sitting near the cricothyroid junction posterior to the recurrent nerve, close to the tubercle of Zuckerkandl.",
      "Inferior glands are variable, usually near the thyrothymic ligament and the lower pole.",
      "Both are supplied chiefly by the inferior thyroid artery, which is why that artery is ligated on the thyroid capsule at its tertiary branches and never at its trunk.",
      "The recurrent nerve lies immediately lateral to Berry's ligament, and occasionally pierces it, as it enters the larynx — a classic site of both injury and troublesome bleeding.",
      "The tubercle of Zuckerkandl points to two things at once: the nerve's entry point and the superior parathyroid.",
    ],
  }, SOURCE),

  sourced({
    id: "block-thyroid-borders",
    type: "bullets",
    heading: "↳ Safe dissection borders",
    items: [
      "Stay on the thyroid capsule, ligating vessels at their tertiary branches where they meet the gland.",
      "Stay off the inferior thyroid artery trunk, off the nerve in the tracheo-oesophageal groove, off the external laryngeal nerve along the superior pedicle, and off the parathyroid vascular pedicles.",
      "At the superior pole, open the avascular space between the upper pole and cricothyroid and ligate the pedicle branches individually on the capsule.",
      "At Berry's ligament, divide meticulously under direct vision of the nerve — never blindly clamp.",
    ],
  }, SOURCE),

  sourced({
    id: "block-thyroid-flow",
    type: "flow",
    heading: "Operative flow",
    nodes: [
      { id: "incision", label: "Kocher incision and subplatysmal flaps", tone: "default" },
      { id: "midline", label: "Divide the median raphe, retract the straps", tone: "default" },
      { id: "mobilize", label: "Rotate the lobe, divide the middle thyroid vein", tone: "default" },
      { id: "superior", label: "Superior pole on the capsule, sparing the external branch", tone: "default" },
      { id: "identify", label: "Identify the recurrent nerve and superior parathyroid", tone: "default" },
      { id: "capsular", label: "Capsular dissection, parathyroids preserved in situ", tone: "default" },
      { id: "devasc", label: "Parathyroid devascularized?", tone: "default" },
      { id: "autograft", label: "Frozen section, then autotransplant into muscle", tone: "caution" },
      { id: "berry", label: "Divide Berry's ligament under direct vision", tone: "default" },
      { id: "isthmus", label: "Isthmus and pyramidal lobe off the trachea", tone: "default" },
      { id: "stimulate", label: "Signal intact after the first side?", tone: "default" },
      { id: "stage", label: "Stage the operation, defer the second side", tone: "caution" },
      { id: "second", label: "Repeat on the contralateral lobe", tone: "default" },
      { id: "closure", label: "Valsalva, loose strap closure, no pressure dressing", tone: "good" },
    ],
    edges: [
      { from: "incision", to: "midline" },
      { from: "midline", to: "mobilize" },
      { from: "mobilize", to: "superior" },
      { from: "superior", to: "identify" },
      { from: "identify", to: "capsular" },
      { from: "capsular", to: "devasc" },
      { from: "devasc", to: "autograft", label: "Yes" },
      { from: "devasc", to: "berry", label: "No" },
      { from: "autograft", to: "berry" },
      { from: "berry", to: "isthmus" },
      { from: "isthmus", to: "stimulate" },
      { from: "stimulate", to: "second", label: "Yes" },
      { from: "stimulate", to: "stage", label: "No" },
      { from: "second", to: "closure" },
      { from: "stage", to: "closure" },
    ],
  }, SOURCE),

  sourced({
    id: "block-thyroid-technique",
    type: "sequence",
    heading: "Step by step",
    steps: [
      { title: "Incision and flaps", detail: "Transverse Kocher incision about two fingerbreadths above the sternal notch, in a skin crease; raise subplatysmal flaps to the thyroid notch above and the sternal notch below. The pitfall is raising flaps too superficially, which tears the anterior jugular veins and leaves troublesome venous ooze for the rest of the case." },
      { title: "Midline exposure", detail: "Divide the median raphe between the strap muscles and retract them laterally, dividing or retracting sternothyroid if it is bulky. The pitfall is straying off the midline, which bleeds and obscures every plane below it." },
      { title: "Mobilize the lobe", detail: "Rotate the lobe medially and ligate the middle thyroid vein to open the tracheo-oesophageal groove. The pitfall is excessive medial traction, which stretches the recurrent nerve before it has been seen." },
      { title: "Superior pole", detail: "Open the avascular sternothyroid-laryngeal triangle, then skeletonize and individually ligate the superior pedicle branches on the capsule, low and close to the gland. Stimulation maps the external laryngeal nerve in 94 to 98 per cent of cases against as little as 18 to 34 per cent by sight alone. The pitfall is mass ligation of the pedicle, which costs pitch and leaves a fatiguing voice." },
      { title: "Identify the nerve and the superior parathyroid", detail: "Find the recurrent nerve by a lateral, inferior or superior approach, using the tubercle of Zuckerkandl and the cricothyroid joint as guides, then trace it to its laryngeal entry while anticipating branching. Preserve the superior parathyroid with its pedicle in situ. The pitfall is ligating the inferior thyroid artery trunk, which devascularizes the parathyroids and brings the dissection dangerously close to the nerve." },
      { title: "Capsular dissection", detail: "Dissect on the true capsule, sweeping the parathyroids and their vessels laterally, and take the inferior thyroid artery only at its tertiary capsular branches. Near-infrared autofluorescence, where available, improves parathyroid identification and reduces hypocalcaemia. The pitfall is a devascularized or inadvertently removed gland — confirm it on frozen section and autotransplant, because routine sacrifice increases transient hypoparathyroidism with no long-term benefit." },
      { title: "Berry's ligament", detail: "Divide it sharply under direct vision of the nerve, which lies lateral to it and sometimes runs through it. The pitfall is blind clamping here, which is a leading cause of permanent nerve injury and of brisk bleeding at the worst possible moment." },
      { title: "Isthmus and first-side completion", detail: "Divide the isthmus off the trachea and take the pyramidal lobe and Delphian node, then stimulate before going anywhere near the second side. The pitfall is proceeding after an unrecognized first-side injury, which converts a recoverable problem into a tracheostomy." },
      { title: "Contralateral lobe", detail: "Repeat the mobilization, superior pole, nerve identification, capsular dissection and Berry's ligament sequence on the other side, with the same discipline and no shortcuts because the first side went well." },
      { title: "Haemostasis and closure", detail: "Valsalva to 30 to 40 cmH2O to test haemostasis and irrigate. Energy vessel sealants shorten the operation and are associated with lower haematoma rates than conventional ligation. Avoid routine drains — they do not reduce bleeding and they prolong stay. Close the strap midline loosely so a haematoma can decompress, then platysma and skin, and use a minimal dressing so a haematoma is visible early." },
    ],
  }, SOURCE),

  sourced({
    id: "block-thyroid-variants",
    type: "table",
    heading: "Variant approaches",
    columns: ["Approach", "Key steps", "Indications", "Cautions", "Advantages"],
    rows: [
      ["Conventional transcervical", "Kocher incision with capsular dissection", "The standard for every indication, and the only sensible choice for large goitre or invasive disease", "None", "Broadest exposure with direct nerve and parathyroid control"],
      ["Energy-device haemostasis", "Vessel sealing in place of ligature", "Most cases", "Thermal spread near the recurrent nerve", "Shorter operative time and a lower haematoma rate"],
      ["Remote access, transaxillary or transoral", "Remote incision with endoscopic capsular dissection", "Selected small, low-risk or benign disease where cosmesis drives the choice", "Large goitre, invasive cancer, bulky nodal disease", "No cervical scar, and better views of the external laryngeal nerve in some series"],
      ["Lobectomy with planned completion", "Unilateral resection, completion only if pathology demands it", "Low-risk unilateral disease of 4 cm or less, clinically node-negative", "Bilateral or high-risk disease", "Materially lower complication rate for the majority who never need completion"],
    ],
  }, SOURCE),

  sourced({
    id: "block-thyroid-conflicts",
    type: "warning",
    heading: "Where the evidence disagrees",
    tone: "pearl",
    text: "Two live splits. Neuromonitoring: a Cochrane review of five randomized trials found no significant reduction in permanent nerve paralysis, 0.7 against 0.9 per cent, while larger meta-analyses and registries do show a reduction, concentrated in cancer, total and reoperative surgery — so the honest position is that it helps most where the risk is highest and proves least where the event rate is lowest. Calcium supplementation: routine supplementation and selective parathyroid-hormone-guided supplementation both have randomized support and coexist as accepted strategies, so follow the institutional protocol rather than arguing the point.",
  }, SOURCE),

  sourced({
    id: "block-thyroid-scenarios",
    type: "bullets",
    heading: "Special scenarios",
    items: [
      "Loss of signal on the first side: stage the operation. A dexamethasone protocol has been reported to improve intraoperative return of signal, but staging is the decision that protects the airway.",
      "Cancer involving the nerve with normal preoperative function: resect all gross tumour and preserve the nerve intact.",
      "Cancer encasing an already paralysed nerve: sacrifice it for a complete resection and reconstruct — primary anastomosis preferred, otherwise ansa cervicalis transfer or vocal fold medialization.",
      "Nonrecurrent nerve on the right: suspect it when the preoperative CT shows a retro-oesophageal subclavian artery, because the nerve comes straight off the vagus and is easily divided before it is recognized.",
      "Reoperative field, Graves disease, or a large substernal goitre: higher nerve injury and haematoma risk. Identify the nerve in unscarred territory, low in the groove or high near the laryngeal entry, and work toward the scar.",
      "Parathyroid autotransplantation: confirm the tissue on frozen section, exclude cancer, mince it, and implant into sternocleidomastoid or strap muscle.",
    ],
  }, SOURCE),

  sourced({
    id: "block-thyroid-protection",
    type: "table",
    heading: "Critical structure protection",
    columns: ["Structure", "Landmark and course", "Deficit if injured", "Prevention pearl"],
    rows: [
      ["Recurrent laryngeal nerve", "Tracheo-oesophageal groove, always posterior to the cricothyroid joint, lateral to Berry's ligament", "Unilateral: hoarse breathy voice and aspiration. Bilateral: airway obstruction needing tracheostomy", "Visual identification remains the gold standard; divide Berry's ligament under vision and stimulate before crossing sides"],
      ["Anterior branch of the recurrent nerve", "Hugs the capsule near the laryngeal entry", "Vocal cord palsy despite an apparently intact trunk", "Identify the anterior branch first and never mistake a large posterior branch for the whole nerve"],
      ["External branch of the superior laryngeal nerve", "Deep and parallel to the superior thyroid artery at the upper pole", "Loss of pitch, vocal fatigue, a weak projecting voice", "Ligate pedicle branches individually on the capsule; stimulation raises identification to 94 to 98 per cent"],
      ["Internal branch of the superior laryngeal nerve", "Deep to the superior thyroid artery toward the thyrohyoid membrane", "Supraglottic anaesthesia and aspiration", "At risk only with proximal superior artery ligation — stay distal, on the capsule"],
      ["Superior parathyroid gland", "Near the cricothyroid junction, posterior to the nerve, at the tubercle of Zuckerkandl", "Hypoparathyroidism and hypocalcaemia", "Preserve in situ on its inferior thyroid artery capsular branch; autotransplant only if devascularized"],
      ["Inferior parathyroid gland", "Lower pole and thyrothymic ligament, variable position", "Hypoparathyroidism", "Take only tertiary capsular branches, never the arterial trunk; autofluorescence helps when available"],
    ],
  }, SOURCE),

  sourced({
    id: "block-thyroid-haematoma",
    type: "warning",
    heading: "Neck haematoma: open the wound before you intubate",
    tone: "danger",
    text: "Incidence is roughly 0.4 to 1.5 per cent, with about 64 per cent presenting within six hours and 89 per cent within twelve. Rapid tense anterior swelling, tightness, dysphagia and dysphonia come before stridor. If it is obstructing, open skin, platysma and strap sutures at the bedside and evacuate the clot — decompression comes first because the laryngeal and pharyngeal oedema makes intubation difficult, and cricothyroidotomy is the last resort. Then go to theatre for controlled evacuation with an experienced operator managing the airway.",
  }, SOURCE),

  sourced({
    id: "block-thyroid-haematoma-risk",
    type: "bullets",
    heading: "↳ Who bleeds",
    items: [
      "Male sex, hypertension and obesity.",
      "Antiplatelet or anticoagulant use — and these patients stay at elevated risk even when the drug was correctly held, so extend monitoring rather than assuming the hold fixed it.",
      "Graves disease and large goitre.",
      "Reoperative or otherwise extensive surgery.",
    ],
  }, SOURCE),

  sourced({
    id: "block-thyroid-hypocalcaemia",
    type: "bullets",
    heading: "Hypocalcaemia and hypoparathyroidism",
    items: [
      "The most common complication: biochemical hypocalcaemia in up to 40 per cent, typically reaching its nadir at 48 to 72 hours.",
      "Early postoperative parathyroid hormone is the best predictor. A level below 15 pg/mL signals impending hypocalcaemia; a level at or above 15 measured at least 20 minutes after the operation generally makes intensive monitoring unnecessary.",
      "Treat with oral calcium carbonate 500 to 1250 mg two or three times daily, routinely or guided by the hormone level, adding calcitriol 0.5 to 1.0 micrograms daily when the level is low.",
      "Use calcium citrate rather than carbonate in patients on proton pump inhibitors, with achlorhydria, or after malabsorptive bariatric surgery — carbonate needs acid to dissolve.",
      "Severe or symptomatic disease with tetany, laryngospasm, arrhythmia or seizure needs intravenous calcium gluconate with cardiac monitoring; check and replete magnesium at the same time.",
      "Refractory chronic hypoparathyroidism may warrant hormone replacement — palopegteriparatide is approved for adults.",
    ],
  }, SOURCE),

  sourced({
    id: "block-thyroid-other-complications",
    type: "bullets",
    heading: "↳ The rest of the complication list",
    items: [
      "Bilateral recurrent nerve injury: stridor and airway compromise at extubation, needing reintubation and often tracheostomy. Prevented by the stimulate-then-stage discipline, not by rescuing it afterwards.",
      "Tracheomalacia after a long-standing large goitre: watch for collapse after extubation.",
      "Surgical site infection: rare in a clean case, and not a reason to give routine prophylaxis.",
    ],
  }, SOURCE),

  references("block-thyroid-references", [SOURCE, ATA]),
];

export const totalThyroidectomyPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000005",
  slug: "total-thyroidectomy",
  title: "Total Thyroidectomy",
  aliases: ["Thyroidectomy", "Completion thyroidectomy", "Thyroid lobectomy", "Total thyroid resection"],
  procedureId: "total_thyroidectomy",
  approach: "open",
  specialty: "Endocrine",
  tags: ["endocrine", "thyroid", "head and neck", "oncology"],
  sourceId: SOURCE,
  additionalSourceIds: [ATA],
  blocks,
  reviewedAt: "2026-09-13T00:00:00.000Z",
});
