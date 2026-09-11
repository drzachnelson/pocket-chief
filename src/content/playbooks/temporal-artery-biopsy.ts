import { buildPlaybook, references, sourced } from "@/content/authoring";
import { TEMPORAL_ARTERY_BIOPSY_PLAYBOOK_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-tab-summary",
    type: "summary",
    heading: "At a glance",
    text: "Superficial temporal artery biopsy confirms cranial giant cell arteritis histologically. The two decisions that change outcomes are made before the knife: **start high-dose glucocorticoids immediately** rather than waiting for tissue, and take the segment from the **parietal branch**, outside the facial-nerve danger zone.",
  }, SOURCE),

  sourced({
    id: "block-tab-timing",
    type: "warning",
    heading: "Do not delay steroids for the biopsy",
    tone: "danger",
    text: "Start high-dose glucocorticoids as soon as suspicion is moderate to high, especially with any visual symptom, because untreated giant cell arteritis causes irreversible blindness. Histologic changes persist for weeks, so treatment does not erase the diagnosis — the biopsy result never gates the treatment.",
  }, SOURCE),

  sourced({
    id: "block-tab-indications",
    type: "bullets",
    heading: "Indications",
    items: [
      "Suspected cranial giant cell arteritis in a patient aged 50 or older with new headache, scalp or temporal tenderness, jaw claudication, visual symptoms, or polymyalgia rheumatica with a raised ESR or CRP.",
      "Tissue diagnosis is needed to justify prolonged glucocorticoids with or without a steroid-sparing biologic.",
      "Local color-duplex ultrasound expertise is limited — the situation the 2021 ACR guideline had in view when it favoured biopsy.",
      "Relative cautions: uncorrected coagulopathy, active scalp infection at the site, prior ipsilateral superficial temporal artery ligation, or an artery serving as a critical collateral.",
      "Anticoagulation is not an established risk factor for facial nerve injury and is not by itself a contraindication; manage it on bleeding risk alone.",
    ],
  }, SOURCE),

  sourced({
    id: "block-tab-yield",
    type: "bullets",
    heading: "Diagnostic yield",
    items: [
      "Sensitivity is roughly 68 to 77 per cent; specificity approaches 100 per cent.",
      "Reported false-negative rates range from 9 to 61 per cent, driven by skip lesions, short specimens and prior steroid exposure.",
      "A negative biopsy does not exclude the disease — biopsy-negative giant cell arteritis is reported in up to about 40 per cent.",
      "Take a single side first; reserve bilateral biopsy for symptoms that do not lateralise, or a negative result with persistent suspicion.",
      "Harvest more than 1 cm, because the arteritis is focal and segmental; many authors target 2 to 3 cm to offset skip lesions and fixation shrinkage.",
    ],
  }, SOURCE),

  sourced({
    id: "block-tab-setup",
    type: "bullets",
    heading: "Anaesthesia and setup",
    items: [
      "Local infiltration with lidocaine and epinephrine is standard, and the case is usually office-based; reserve sedation or general anaesthesia for a patient who cannot cooperate.",
      "Inject around the planned arterial segment rather than into it, and keep the needle superficial to stay out of the facial-nerve plane.",
      "Position supine with the head turned to expose the temple; slight reverse Trendelenburg reduces venous ooze.",
      "Mark the artery and Pitanguy's line before prepping — tragus to a point 1.5 to 2 cm above the lateral eyebrow. Doppler mapping helps when the pulse cannot be felt.",
      "Drape to expose the tragus, the lateral orbital rim and the hairline so the landmarks stay visible.",
      "Antibiotic and venous thromboembolism prophylaxis are not routinely indicated for this short, clean scalp procedure.",
      "Have bipolar cautery, fine ties or clips for both arterial ends, and a formalin container ready before starting.",
    ],
  }, SOURCE),

  sourced({
    id: "block-tab-anatomy",
    type: "bullets",
    heading: "Anatomy and landmarks",
    items: [
      "The superficial temporal artery is the terminal branch of the external carotid, emerging anterior to the tragus and crossing the zygomatic root.",
      "It divides 1 to 4 cm above the arch into a frontal branch running anterosuperiorly and a parietal branch running posterosuperiorly into the hairline.",
      "- The frontal branch is the traditional target because it is superficial and palpable, but it runs through the facial-nerve danger zone.",
      "- The parietal branch is increasingly preferred precisely because it lies outside that zone.",
      "The artery runs within the subcutaneous and superficial temporal fascia — that plane is where to look for it.",
      "The temporal branch of the facial nerve runs within or deep to the temporoparietal fascia to supply frontalis and orbicularis oculi.",
      "- Below Pitanguy's line the nerve and the frontal artery are separated only by the superficial temporal fascia.",
      "- Injury causes brow ptosis, frontalis palsy or lagophthalmos, which may be permanent.",
      "The auriculotemporal nerve accompanies the artery near the tragus; injuring it causes temporal scalp numbness that is usually transient.",
      "When the artery is not palpable it reliably crosses about 10 to 15 mm above the helix root and 5 to 10 mm anterior to a coronal incision.",
      "Incisions placed more than 35 mm from the orbital rim, or above the brow, carry a lower rate of facial nerve injury.",
    ],
  }, SOURCE),

  sourced({
    id: "block-tab-flow",
    type: "flow",
    heading: "Operative flow",
    nodes: [
      { id: "mark", label: "Mark artery and Pitanguy's line", tone: "default" },
      { id: "palpable", label: "Pulse palpable?", tone: "default" },
      { id: "doppler", label: "Doppler map the course", tone: "caution" },
      { id: "incise", label: "Incise over the marked segment", tone: "default" },
      { id: "isolate", label: "Isolate on the adventitia", tone: "default" },
      { id: "length", label: "Segment 1 cm or longer?", tone: "default" },
      { id: "extend", label: "Extend the harvest", tone: "caution" },
      { id: "ligate", label: "Ligate both ends and excise", tone: "default" },
      { id: "close", label: "Layered closure, specimen to formalin", tone: "good" },
    ],
    edges: [
      { from: "mark", to: "palpable" },
      { from: "palpable", to: "incise", label: "Yes" },
      { from: "palpable", to: "doppler", label: "No" },
      { from: "doppler", to: "incise" },
      { from: "incise", to: "isolate" },
      { from: "isolate", to: "length" },
      { from: "length", to: "ligate", label: "Yes" },
      { from: "length", to: "extend", label: "No" },
      { from: "extend", to: "ligate" },
      { from: "ligate", to: "close" },
    ],
  }, SOURCE),

  sourced({
    id: "block-tab-technique",
    type: "sequence",
    heading: "Step by step",
    steps: [
      { title: "Mark and anaesthetise", detail: "Confirm the course by palpation or Doppler and mark a segment long enough to yield 2 to 3 cm. Mark Pitanguy's line. Infiltrate superficially around the segment. Prefer the parietal branch or a hairline site outside the danger zone. The pitfall is planning the incision inside the danger zone, which is what most trainees default to." },
      { title: "Incise", detail: "Open skin and subcutaneous tissue along the marked line with a 15 blade. A zig-zag incision behind the hairline improves both exposure and the scar and tends to yield a longer specimen. The pitfall is heavy electrocautery in hair-bearing scalp, which damages follicles and causes alopecia." },
      { title: "Identify and isolate the artery", detail: "Dissect within the superficial temporal fascia to find the glistening vessel and free it circumferentially on the adventitia. The pitfall is straying deep to the temporoparietal fascia in the danger zone, or mistaking a large vein or the auriculotemporal nerve for the artery — confirm a pulsatile arterial wall." },
      { title: "Ligate and excise", detail: "Tie or clip both ends, control the side branches, then excise the intervening segment sharply and measure it. The pitfall is an under-length specimen, which is a leading cause of false negatives, or failing to secure both ends, which causes a scalp haematoma." },
      { title: "Close in layers", detail: "Confirm haemostasis, then close the superficial temporal fascia and the skin as separate layers. The pitfall is single-layer closure of a vascular scalp wound, which invites haematoma and a poor scar." },
      { title: "Hand off the specimen", detail: "Place it in formalin and request serial sectioning at multiple levels. Preserve enough length that the laboratory can section either longitudinally or transversely, because practice differs and the orientation is still disputed." },
    ],
  }, SOURCE),

  sourced({
    id: "block-tab-variants",
    type: "table",
    heading: "Variant approaches",
    columns: ["Approach", "Where it goes", "Best for", "Watch out for"],
    rows: [
      ["Frontal branch", "Preauricular or pretrichial incision over the palpable frontal vessel", "A palpable anterior branch with anteriorly localised symptoms", "Sits inside the facial-nerve danger zone and leaves a visible facial scar"],
      ["Parietal branch", "Within the hairline, behind the danger zone", "Protecting the facial nerve; the better teaching case", "May need Doppler mapping first"],
      ["Zig-zag hairline", "Marked behind the temporal hairline, closed in layers", "Maximising both specimen length and cosmesis", "Needs more dissection planning than a straight line"],
      ["Gillies incision", "About 2.5 cm superoanterior to the helix, inside the hair", "A concealed scar", "Cadaveric work finds the vessel inconsistently by this route"],
      ["Coronal flap", "Subgaleal plane through the loose areolar tissue", "A non-palpable vessel, or exposure already being raised for another reason", "Far more dissection than an isolated biopsy warrants"],
      ["Colour-duplex ultrasound", "No incision — looks for the halo sign", "First-line testing where the expertise exists", "Operator dependent, and sensitivity falls quickly once steroids start"],
    ],
  }, SOURCE),

  sourced({
    id: "block-tab-protection",
    type: "table",
    heading: "Critical structure protection",
    columns: ["Structure", "Where it runs", "Deficit if injured", "How to protect it"],
    rows: [
      ["Temporal branch of facial nerve", "Within or deep to the temporoparietal fascia, below Pitanguy's line", "Brow ptosis, frontalis palsy, lagophthalmos — sometimes permanent", "Biopsy the parietal branch, keep the dissection superficial and hug the vessel"],
      ["Superficial temporal artery ends", "Superficial temporal fascia; back-bleeds from both cut ends", "Scalp haematoma, and rarely skin necrosis", "Tie or clip both ends securely before leaving"],
      ["Auriculotemporal nerve", "Alongside the artery near the tragus", "Numb temporal scalp, usually temporary", "Stay on the vessel and avoid wide dissection at the tragus"],
      ["Hair follicles", "Throughout the hair-bearing scalp", "Alopecia and a poor scar", "Minimise cautery and run the incision parallel to the hair"],
      ["Collateral scalp circulation", "Anastomoses across the scalp", "Skin necrosis where the artery was a critical collateral", "Assess prior carotid or external carotid disease and avoid extensive bilateral ligation"],
    ],
  }, SOURCE),

  sourced({
    id: "block-tab-scenarios",
    type: "bullets",
    heading: "Special scenarios",
    items: [
      "Non-palpable artery: map with Doppler or ultrasound first and be more vigilant about the facial nerve, not less.",
      "Negative unilateral biopsy with persistent suspicion: biopsy the other side and add large-vessel imaging for extracranial disease.",
      "Already more than two weeks into steroids: proceed anyway, because the histologic changes can persist.",
      "Scarred field or prior ligation: pick another branch or side, and consider ultrasound first rather than dissecting a devascularised plane.",
      "Brisk bleeding: apply direct pressure, isolate and tie both ends, and never cauterise blindly deep in the danger zone.",
    ],
  }, SOURCE),

  sourced({
    id: "block-tab-complications",
    type: "bullets",
    heading: "Complications",
    items: [
      "Facial nerve palsy affecting the frontal branch occurred in about 16 per cent in one prospective series; roughly 58 per cent recovered over a mean of 4.4 months, and some did not.",
      "- Document the motor examination, protect the cornea, and refer on if it persists.",
      "Wound infection occurs in about 2.7 per cent and usually settles with local care.",
      "Haematoma responds to compression; evacuate it if it is expanding.",
      "Scalp necrosis is rare and more likely where the artery was a critical collateral.",
      "An unsightly scar or patch of alopecia is largely preventable with a hairline incision, layered closure and restrained cautery.",
    ],
  }, SOURCE),

  sourced({
    id: "block-tab-conflicts",
    type: "warning",
    heading: "Where the evidence disagrees",
    tone: "pearl",
    text: "Three genuine splits, worth knowing before quoting a number. The 2021 US guideline favours biopsy first while EULAR and prospective data favour ultrasound first, and which is right is centre-dependent. Most authors ask for more than 1 cm, but at least one series argues a carefully sectioned 5 mm specimen suffices when selection is good. Emerging data favour longitudinal sectioning for higher yield, while transverse sectioning at multiple levels remains the convention.",
  }, SOURCE),

  references("block-tab-references", [SOURCE]),
];

export const temporalArteryBiopsyPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000001",
  slug: "temporal-artery-biopsy",
  title: "Temporal Artery Biopsy",
  aliases: ["TAB", "Superficial temporal artery biopsy", "Giant cell arteritis biopsy"],
  procedureId: "temporal_artery_biopsy",
  approach: "open",
  specialty: "Vascular",
  tags: ["vascular", "biopsy", "giant cell arteritis", "head and neck"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-09-10T00:00:00.000Z",
});
