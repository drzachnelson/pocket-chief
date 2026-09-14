import { buildPlaybook, references, sourced } from "@/content/authoring";
import {
  ASCO_ASTRO_AXILLA_2025_SOURCE as ASCO,
  MASTECTOMY_SLNB_PLAYBOOK_SOURCE as SOURCE,
  NCCN_BREAST_V6_2026_SOURCE as NCCN,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-mastectomy-summary",
    type: "summary",
    heading: "At a glance",
    text: "Total mastectomy removes all breast parenchyma including the nipple-areolar complex, closed flat, with no en bloc axillary dissection. Sentinel node biopsy is added to stage a clinically node-negative axilla. Two technical judgements carry the operation: a flap plane at roughly 5 to 10 mm that takes all the gland without stranding the subdermal plexus, and an axillary dissection that finds the sentinel nodes without sacrificing the intercostobrachial nerve.",
  }, SOURCE),

  sourced({
    id: "block-mastectomy-indications",
    type: "bullets",
    heading: "Indications for mastectomy over breast conservation",
    items: [
      "Multicentric disease, diffuse malignant-appearing microcalcifications, or margins that cannot be cleared with acceptable cosmesis.",
      "A contraindication to whole-breast radiation: prior chest wall or breast radiotherapy, active connective tissue disease involving skin, or first- and second-trimester pregnancy.",
      "Inflammatory breast cancer, after neoadjuvant systemic therapy.",
      "An unfavourable tumour-to-breast ratio, or an informed patient preference.",
      "Risk reduction for a pathogenic variant such as BRCA1 or BRCA2.",
    ],
  }, SOURCE),

  sourced({
    id: "block-mastectomy-slnb-indications",
    type: "bullets",
    heading: "↳ When to add a sentinel node biopsy",
    items: [
      "Clinically node-negative invasive breast cancer — sentinel biopsy is the preferred method of axillary staging.",
      "Ductal carcinoma in situ undergoing mastectomy, because an invasive focus found on final pathology can no longer be sentinel-mapped once the breast is gone.",
      "Circumstances where it may be offered after discussion: multicentric node-negative tumours, male breast cancer, pregnancy, obesity, larger clinically node-negative tumours, and prior breast or axillary surgery.",
      "It should not be offered for ductal carcinoma in situ treated by breast conservation, nor solely to evaluate internal mammary nodes.",
    ],
  }, ASCO),

  sourced({
    id: "block-mastectomy-omission",
    type: "prose",
    heading: "↳ When the axilla can be left alone",
    text: "Omission may be considered in postmenopausal patients over 50 with small clinically and sonographically node-negative tumours that are hormone receptor positive, HER2 negative, grade 1 or 2, and destined for endocrine therapy — the SOUND and INSEMA position — with caution in lobular histology. The caveat matters here: both trials enrolled predominantly breast conservation patients, so extrapolating omission to a mastectomy is not directly validated.",
  }, SOURCE),

  sourced({
    id: "block-mastectomy-contraindications",
    type: "bullets",
    heading: "Contraindications and mapping cautions",
    items: [
      "Clinically or biopsy-proven node-positive disease not converted by neoadjuvant therapy warrants axillary dissection, not sentinel biopsy alone.",
      "Blue dye mapping is contraindicated in pregnancy; technetium-labelled sulfur colloid is estimated safe but warrants shared decision-making, and breast milk is discarded for 24 hours after radiocolloid.",
      "Methylene blue causes skin necrosis if injected dermally, and serotonin toxicity in a patient on serotonergic drugs.",
      "If a biopsy-proven positive node was clipped, every effort should be made to remove that clipped node at the operation.",
      "Perform the sentinel biopsy and the mastectomy in the same setting.",
    ],
  }, SOURCE),

  sourced({
    id: "block-mastectomy-setup",
    type: "bullets",
    heading: "Anaesthesia and setup",
    items: [
      "General endotracheal anaesthesia. Regional adjuncts — pectoral, serratus plane or paravertebral blocks — reduce acute pain, but cover the axilla incompletely because the intercostobrachial and brachial plexus cutaneous branches are variably missed.",
      "Avoid sustained neuromuscular blockade during the axillary dissection if nerve stimulation of the long thoracic or thoracodorsal nerves is anticipated.",
      "Supine with the ipsilateral arm abducted 75 to 90 degrees on an arm board and the flank slightly bumped. Allow the arm to be adducted into the field. Avoid hyperabduction, which stretches the brachial plexus.",
      "Prep from mid-neck and clavicle down to the costal margin, across the sternum medially and out to the posterior axillary line, including the arm circumferentially if it must be repositioned.",
      "Mark the breast borders — clavicle, sternum, inframammary fold, latissimus — before the incision, while the landmarks are still obvious.",
      "Venous thromboembolism prophylaxis is risk-based: intermittent pneumatic compression for everyone, with low molecular weight heparin preferred over unfractionated heparin for higher-risk patients unless renal function forbids it.",
      "Extended four-week prophylaxis is a recommendation for major abdominal and pelvic cancer surgery and not for breast surgery — do not carry it across.",
    ],
  }, SOURCE),

  sourced({
    id: "block-mastectomy-antibiotics",
    type: "prose",
    heading: "↳ A gap the source is honest about",
    text: "A non-reconstructed mastectomy is a clean case and a single weight-based preoperative dose of a first-generation cephalosporin within 60 minutes of incision is standard surgical prophylaxis practice. The supplied playbook states plainly that it found no breast-specific antibiotic regimen in the guideline literature it reviewed, and defers to institutional protocol. That admission is worth preserving rather than dressing up as a recommendation.",
  }, SOURCE),

  sourced({
    id: "block-mastectomy-anatomy",
    type: "bullets",
    heading: "Anatomy: the borders that define the resection",
    items: [
      "Superior border: the clavicle.",
      "Medial border: the lateral sternal edge.",
      "Inferior border: the rectus sheath and inframammary fold.",
      "Lateral border: the anterior border of latissimus dorsi.",
      "The breast sits on pectoralis major fascia, tethered to dermis by Cooper's ligaments, which are divided as the flaps come up.",
      "The axillary tail of Spence runs into the lower axilla and is the commonest site of retained parenchyma.",
    ],
  }, SOURCE),

  sourced({
    id: "block-mastectomy-plane",
    type: "prose",
    heading: "↳ The flap plane, and why its thickness is a decision",
    text: "The correct plane is the avascular interface between subcutaneous fat and breast parenchyma — the superficial layer of the superficial fascia. Flaps left around 5 to 10 mm thick keep the subdermal plexus alive while still clearing gland. Too thin and the flap necroses; too thick and parenchyma stays behind, which is not rare — residual glandular tissue has been found in up to 76 per cent of flaps when they are deliberately sampled. Deep to the parenchyma, take the pectoral fascia with the specimen unless it is being preserved for a prepectoral reconstruction.",
  }, SOURCE),

  sourced({
    id: "block-mastectomy-axilla",
    type: "bullets",
    heading: "↳ Axillary orientation and the structures to stay off",
    items: [
      "Nodal levels are defined by pectoralis minor: level I lateral to it, level II deep to it, level III medial to it, with Rotter's nodes between pectoralis major and minor.",
      "Entry for a sentinel biopsy is through the clavipectoral fascia, deep to the hair-bearing axillary skin.",
      "Axillary vein: the superior border of dissection. Clear only its anteroinferior surface — circumferential stripping increases lymphoedema.",
      "Long thoracic nerve: runs vertically on serratus anterior against the chest wall; injury gives a winged scapula.",
      "Thoracodorsal bundle: runs on subscapularis toward latissimus, the deep lateral structure in the field.",
      "Intercostobrachial nerve: the lateral cutaneous branch of the second and sometimes third intercostal nerve, crossing the axilla transversely to the medial upper arm. It is the most commonly injured nerve in axillary surgery and the most anatomically variable, arising from the second space in about 90 per cent.",
      "Medial and lateral pectoral nerves supply the pectoral muscles and are preserved to avoid atrophy.",
      "Variant anatomy — thoracodorsal course, duplicated axillary veins, intercostobrachial branching — occurs in roughly 59 per cent of axillae, so identify before dividing.",
    ],
  }, SOURCE),

  sourced({
    id: "block-mastectomy-flow",
    type: "flow",
    heading: "Operative flow",
    nodes: [
      { id: "inject", label: "Inject the mapping agent and massage", tone: "default" },
      { id: "axilla", label: "Axillary incision through the clavipectoral fascia", tone: "default" },
      { id: "found", label: "Hot, blue or palpably abnormal node found?", tone: "default" },
      { id: "retrieve", label: "Retrieve all qualifying nodes, check residual counts", tone: "default" },
      { id: "alnd", label: "Convert to level I and II dissection", tone: "caution" },
      { id: "incision", label: "Elliptical incision around the nipple and biopsy scar", tone: "default" },
      { id: "flaps", label: "Raise flaps to the anatomic borders", tone: "default" },
      { id: "detach", label: "Take the breast off the pectoral fascia", tone: "default" },
      { id: "orient", label: "Orient the specimen, secure haemostasis", tone: "default" },
      { id: "close", label: "Drain, quilting sutures, flat subcuticular closure", tone: "good" },
    ],
    edges: [
      { from: "inject", to: "axilla" },
      { from: "axilla", to: "found" },
      { from: "found", to: "retrieve", label: "Yes" },
      { from: "found", to: "alnd", label: "No" },
      { from: "retrieve", to: "incision" },
      { from: "alnd", to: "incision" },
      { from: "incision", to: "flaps" },
      { from: "flaps", to: "detach" },
      { from: "detach", to: "orient" },
      { from: "orient", to: "close" },
    ],
  }, SOURCE),

  sourced({
    id: "block-mastectomy-technique",
    type: "sequence",
    heading: "Step by step",
    steps: [
      { title: "Lymphatic mapping", detail: "Radiocolloid is injected preoperatively in nuclear medicine and blue dye 5 to 10 minutes before the axillary incision; periareolar or subareolar injection is preferred for rapid uptake, and massaging the breast promotes transit. Indocyanine green fluorescence and superparamagnetic iron oxide are validated alternatives, the latter injectable days beforehand, which is useful when a sentinel biopsy may be deferred pending final pathology. The pitfall is dermal methylene blue causing skin necrosis, and a deep-only injection near a tumour abutting the axilla masking the signal by shine-through." },
      { title: "Sentinel node retrieval", detail: "Transverse incision in the hair-bearing axilla below the hairline, posterior and parallel to the lateral border of pectoralis major, through subcutaneous tissue and clavipectoral fascia. A sentinel node is any node that is hot, blue, or palpably abnormal — retrieve all of them, typically one to five, then check that the bed retains less than 10 per cent of the hottest node's counts. The pitfall is the intercostobrachial nerve crossing this field transversely: identify and preserve it. Keep the axillary incision separate from the mastectomy incision to avoid a contour deformity." },
      { title: "Mastectomy incision", detail: "An elliptical transverse or slightly oblique incision encompassing the nipple-areolar complex and any prior biopsy scar, excised en bloc, planned so the closure will be flat and tension-free. The pitfall is over-resecting skin and compromising closure, or under-resecting and leaving scar or parenchyma behind." },
      { title: "Flap elevation", detail: "Raise superior and inferior flaps in the subcutaneous-parenchymal plane with electrocautery, an ultrasonic device or scalpel, using double-pronged skin hooks rather than heavy retractors that crush the flap. Hold roughly 5 to 10 mm of thickness and carry the dissection to clavicle, sternal edge, inframammary fold and latissimus. The pitfall is buttonholing a thin flap, or chasing the plane too superficially and leaving gland — divide Cooper's ligaments, not the dermis." },
      { title: "Detach the breast", detail: "Elevate the breast off pectoralis major taking the pectoral fascia with it, working medial to lateral or superior to inferior, and include the axillary tail. The pitfall is a brisk medial internal mammary perforator that retracts into the intercostal space — secure it before it goes." },
      { title: "Orient and secure haemostasis", detail: "Mark the specimen for superior and lateral before it leaves the field, irrigate, and achieve meticulous haemostasis across the whole flap and chest wall surface. The pitfall is accepting imperfect haemostasis: it is the leading modifiable cause of haematoma and it feeds seroma." },
      { title: "Drain, fix the flaps, close", detail: "Place a closed-suction drain through a separate stab incision into the mastectomy gutter. Quilting sutures approximating the flaps to pectoral muscle reduce seroma. Close deep dermis with absorbable suture and skin with a running subcuticular suture for a flat result. The pitfall is dimpling the skin with the fixation sutures, or closing under tension." },
    ],
  }, SOURCE),

  sourced({
    id: "block-mastectomy-variants",
    type: "table",
    heading: "Variant operations",
    columns: ["Variant", "Key technical difference", "Indications", "Cautions", "Advantages"],
    rows: [
      ["Simple mastectomy with flat closure", "Nipple removed, no axillary dissection, closed flat", "The standard when reconstruction is not chosen", "None specific", "Simplest operation with complete parenchymal clearance"],
      ["Skin-sparing mastectomy", "Skin envelope preserved, nipple-areolar complex removed", "Immediate reconstruction planned", "Inflammatory cancer or skin involvement", "Materially better reconstructive cosmesis"],
      ["Nipple-sparing mastectomy", "Skin and nipple preserved, retroareolar margin sampled", "Reconstruction with a favourable tumour-to-nipple distance, and risk reduction", "Subareolar tumour involvement, and higher necrosis through a periareolar incision", "Best cosmesis, accepting that residual retroareolar duct tissue remains"],
      ["Modified radical mastectomy", "Adds en bloc level I and II axillary dissection", "Node-positive disease requiring dissection", "Not for a node-negative axilla that a sentinel biopsy can stage", "Regional control where dissection is genuinely indicated"],
      ["Alternative tracers", "Fluorescence or magnetic mapping instead of radiocolloid and dye", "Avoiding nuclear medicine logistics, or a delayed sentinel biopsy", "Device availability, and iron oxide artefact on later MRI", "Non-inferior identification with more workflow flexibility"],
    ],
  }, SOURCE),

  sourced({
    id: "block-mastectomy-tracer-conflict",
    type: "warning",
    heading: "Board answer versus current practice: dual tracer",
    tone: "pearl",
    text: "The keyed answer is dual tracer, and international consensus still favours it. The nuance the evidence adds is narrower than it is usually quoted: blue dye alone is inferior, but a large meta-analysis found no significant difference in false-negative rate between radioisotope alone and radioisotope plus dye. That is why many surgeons omit the dye when the axillary signal is strong, and avoid the dye reactions entirely. Dual tracer remains the answer whenever the axilla is high-stakes — after neoadjuvant therapy in particular.",
  }, SOURCE),

  sourced({
    id: "block-mastectomy-scenarios",
    type: "bullets",
    heading: "Special scenarios",
    items: [
      "Positive sentinel node in a mastectomy: with one or two positive nodes and no dissection, chest wall radiation should include the undissected axilla at risk. Trials supporting omission of dissection inform this, but ASCO recommends dissection followed by post-mastectomy radiation for three or more positive nodes — an area of evolving and non-uniform practice that belongs in a tumour board.",
      "Sentinel node not identified: proceed to a level I and II dissection for staging.",
      "Ductal carcinoma in situ or risk-reducing mastectomy: perform the sentinel biopsy, or place a retention tracer for a delayed one, because an occult invasive focus cannot be mapped afterwards.",
      "Node-positive at diagnosis and converted by systemic therapy: sentinel biopsy alone carries a false-negative rate above 10 per cent — mitigate with dual tracer, at least three sentinel nodes, and removal of the clipped node.",
      "Large, ptotic, or previously irradiated chest wall: expect poor flap perfusion, consider intraoperative perfusion assessment, and lower the threshold for delayed reconstruction.",
      "Uncontrolled axillary vein bleeding: direct digital pressure, proximal and distal control, fine vascular suture repair, and vascular backup for a major venous injury. Never clamp blindly near the brachial plexus.",
    ],
  }, SOURCE),

  sourced({
    id: "block-mastectomy-protection",
    type: "table",
    heading: "Critical structure protection",
    columns: ["Structure", "Landmark and course", "Deficit if injured", "Prevention pearl"],
    rows: [
      ["Long thoracic nerve", "Vertical on serratus anterior, against the chest wall", "Winged scapula and shoulder dysfunction", "Keep it on the chest wall and do not sweep tissue medial to it away from the wall"],
      ["Thoracodorsal bundle", "On subscapularis, running to latissimus, deep and lateral", "Latissimus weakness, and bleeding", "Identify it before dividing lateral tissue and preserve it unless grossly involved"],
      ["Intercostobrachial nerve", "Second and sometimes third intercostal, transversely across the axilla to the medial arm", "Medial arm numbness and post-mastectomy pain syndrome", "Actively look for it and preserve it, expecting high anatomic variability"],
      ["Axillary vein", "Superior border of the dissection", "Haemorrhage, and lymphoedema if it is stripped", "Clear only the anteroinferior surface, never circumferentially"],
      ["Medial and lateral pectoral nerves", "Running to the pectoral muscles", "Pectoral atrophy", "Preserve them during any medial retraction"],
      ["Subdermal plexus of the skin flap", "Within the subcutaneous-parenchymal plane", "Flap necrosis and dehiscence", "Hold flaps at 5 to 10 mm and retract gently with skin hooks"],
    ],
  }, SOURCE),

  sourced({
    id: "block-mastectomy-complications",
    type: "bullets",
    heading: "Complications",
    items: [
      "Seroma is the commonest — historical rates near 47 per cent, contemporary rates around 10 to 14 per cent, rising with more nodes removed, higher body mass index and longer operative time. Observe small collections, aspirate tense or symptomatic ones in clinic, and prevent with flap fixation and drainage.",
      "Mastectomy flap necrosis affects roughly 6 per cent and is managed by debridement with secondary closure or wound care.",
      "Haematoma is uncommon at around 2.5 per cent or less, but an expanding tense collection with haemodynamic change or flap compromise needs prompt return to theatre.",
      "Surgical site infection and cellulitis are treated with antibiotics, draining an abscess if one has formed.",
      "Lymphoedema is substantially lower after sentinel biopsy than after dissection: pooled prevalence around 5.9 to 7.5 per cent against 16.5 to 24.6 per cent, with a lifetime risk near 1.4 per cent when fewer than five nodes come out. Measure both arms at baseline in at-risk patients and refer early, because stages 0 and 1 are reversible.",
      "Post-mastectomy pain syndrome and intercostobrachial neuralgia are reduced by preserving the nerve and treated with multimodal neuropathic agents.",
    ],
  }, SOURCE),

  sourced({
    id: "block-mastectomy-emergencies",
    type: "bullets",
    heading: "↳ Emergencies: bedside action, then definitive care",
    items: [
      "Blue dye anaphylaxis: stop the agent, give 100 per cent oxygen, intramuscular adrenaline, intravenous fluids, antihistamine and steroid, support the airway, then monitor in intensive care.",
      "Expanding haematoma threatening the airway, the flap, or haemodynamic stability: open the wound at the bedside to decompress if it is life- or flap-threatening, then urgent evacuation and haemostasis in theatre.",
      "Impending full-thickness flap necrosis: offload tension, start wound care, and get early surgical review for debridement or reconstruction.",
      "Methylene blue given to a patient on serotonergic drugs: watch for serotonin toxicity, discontinue the offending agents and support.",
    ],
  }, SOURCE),

  references("block-mastectomy-references", [SOURCE, NCCN, ASCO]),
];

export const simpleMastectomyWithSentinelNodeBiopsyPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000006",
  slug: "simple-mastectomy-with-sentinel-node-biopsy",
  title: "Simple Mastectomy with Sentinel Node Biopsy",
  aliases: ["SLNB", "Sentinel lymph node biopsy", "Total mastectomy", "Simple mastectomy", "Mastectomy with sentinel node biopsy"],
  procedureId: "simple_mastectomy_sentinel_node_biopsy",
  approach: "open",
  specialty: "Breast",
  tags: ["breast", "oncology", "mastectomy", "axilla", "sentinel node"],
  sourceId: SOURCE,
  additionalSourceIds: [NCCN, ASCO],
  relatedTopicSlugs: ["percutaneous-breast-biopsy-and-cyst-aspiration", "fibroadenoma-vs-phyllodes-tumor"],
  blocks,
  reviewedAt: "2026-09-13T00:00:00.000Z",
});
