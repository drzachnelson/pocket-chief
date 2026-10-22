import { buildPlaybook, references, sourced } from "@/content/authoring";
import { SAPHENOUS_VEIN_HARVEST_PLAYBOOK_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Source: saphenous-vein-harvest-pocket-chief-playbook.docx, supplied October 22, 2026 (attending quick-reference).
// Default is open (conventional) harvest, with no-touch and endoscopic variants. The document's unresolved conflicts
// (storage solution; open against endoscopic harvest, which differ between CABG and leg bypass) are kept as conflicts.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-gsv-summary",
    type: "summary",
    heading: "At a glance",
    text: "The great saphenous vein is the most used bypass conduit in the world: more than 90% of CABG operations use at least one saphenous vein graft, and it is the autologous conduit for leg bypass and urgent trauma reconstruction. Harvest is about two things: a **conduit that still has its endothelium**, which means gentle handling, low distension pressure and branches tied a safe cuff off the wall, and a **leg that heals**, which means incising directly over a mapped vein and staying off the saphenous nerve below the knee. Open harvest is the default here; no-touch and endoscopic harvest are variants, and the evidence on which is best genuinely splits.",
  }, SOURCE),

  sourced({
    id: "block-gsv-hierarchy",
    type: "bullets",
    heading: "Indications and where the vein ranks",
    items: [
      "In CABG the left internal mammary artery to the LAD is a class 1 recommendation for survival.",
      "A radial artery is recommended over a saphenous vein graft (class 1) for the second most important non-LAD target; patients under 75, women and those with preserved renal function benefit most.",
      "When a vein graft is used, European guidance gives no-touch harvest a class IIa recommendation, and US guidance calls it best practice in patients at low risk of wound complications.",
      "The vein can be harvested at the same time as the mammary takedown to shorten the case.",
      "Prefer radial or bilateral mammary arterial grafting in suitable younger patients, and endoscopic over open harvest when leg-wound complications matter most and an experienced harvester is available.",
    ],
  }, SOURCE),

  sourced({
    id: "block-gsv-avoid",
    type: "bullets",
    heading: "Which leg, and who is at risk",
    items: [
      "Avoid a limb with prior stripping or saphenectomy, symptomatic varicosities or thrombophlebitis, a small or sclerotic vein on duplex, or active infection or ulceration.",
      "Severe peripheral arterial disease or lymphedema in the donor leg is a relative contraindication, because it raises wound complications.",
      "Map the vein with ultrasound before or at the start of the case for patency, caliber, depth and course, and mark directly over it so the skin flaps stay small.",
      "Diabetes, obesity, peripheral arterial disease, female sex and smoking raise harvest-site morbidity and the risk of chronic saphenous neuralgia.",
    ],
  }, SOURCE),

  sourced({
    id: "block-gsv-setup",
    type: "bullets",
    heading: "Setup and infection bundle",
    items: [
      "Supine, donor leg externally rotated and slightly flexed in a frog-leg position with the knee supported, exposing the whole medial leg and thigh.",
      "Prep and drape circumferentially from just above the medial malleolus to the groin, including the saphenofemoral junction; both legs are often prepped for extra length.",
      "Lines and monitoring follow the index operation (for CABG, the arterial line, central access and TEE), not the harvest.",
      "Weight-based cefazolin or cefuroxime within 60 minutes of incision, for no longer than 48 hours, redosed for cases over 4 hours or heavy blood loss.",
      "For beta-lactam allergy or MRSA, vancomycin with added gram-negative cover such as an aminoglycoside; vancomycin is not the sole agent.",
      "Intranasal mupirocin and chlorhexidine for Staphylococcus aureus carriers, and empirically when carrier status is unknown.",
      "Clip, do not shave, close to the time of surgery; keep the patient warm and the glucose controlled.",
      "VTE prophylaxis follows the cardiac-surgery protocol: mechanical during the case, pharmacologic afterward once bleeding risk allows.",
      "For endoscopic harvest, give 5,000 units of heparin before the incision to prevent intraluminal clot.",
    ],
  }, SOURCE),

  sourced({
    id: "block-gsv-anatomy",
    type: "bullets",
    heading: "Anatomy and safe planes",
    items: [
      "The vein rises from the medial dorsal venous arch, passes **anterior to the medial malleolus**, follows the medial border of the tibia, crosses the knee a hand's breadth behind the medial edge of the patella, and climbs the medial thigh to join the common femoral vein at the saphenofemoral junction.",
      "In the thigh it lies in the saphenous compartment, between the saphenous fascia superficially and the deep muscular fascia.",
      "Junctional tributaries are the superficial circumflex iliac, superficial epigastric and external pudendal veins, plus the anterior and posterior accessory saphenous veins.",
      "The **saphenous nerve** leaves the adductor canal and runs beside the vein below the knee, growing more adherent toward the ankle; it lies anterior to the vein in about 60% of limbs and splits around it in about 40%.",
      "Nerve and vein cross in about 73% of limbs, typically 5 to 29 cm above the malleolus, and share a tight common sheath distally in about 86%.",
      "Stay on the vein adventitia inside the saphenous compartment; dissecting outside the saphenous fascia raises big flaps and wound problems.",
      "Stay off the nerve below the knee: limit distal harvest and dissect close to the vein.",
      "At the junction, see the anterior wall of the common femoral vein before you tie, so you neither narrow the deep vein nor leave a long blind stump, and spare the groin lymphatics.",
    ],
  }, SOURCE),

  sourced({
    id: "block-gsv-flow",
    type: "flow",
    heading: "Operative flow (open harvest)",
    nodes: [
      { id: "map", label: "Map and mark the vein with ultrasound" },
      { id: "incise", label: "Longitudinal incision directly over the vein" },
      { id: "expose", label: "Dissect down to the vein and loop it" },
      { id: "branches", label: "Ligate and divide side branches a safe cuff off the wall" },
      { id: "heparin", label: "Heparinize" },
      { id: "divide", label: "Divide at the junction and distally", tone: "caution" },
      { id: "flush", label: "Gentle flush and leak check, under 100 mm Hg", tone: "caution" },
      { id: "store", label: "Store in preservation solution" },
      { id: "close", label: "Close the leg", tone: "good" },
    ],
    edges: [
      { from: "map", to: "incise" },
      { from: "incise", to: "expose" },
      { from: "expose", to: "branches" },
      { from: "branches", to: "heparin" },
      { from: "heparin", to: "divide" },
      { from: "divide", to: "flush" },
      { from: "flush", to: "store" },
      { from: "store", to: "close" },
    ],
  }, SOURCE),

  sourced({
    id: "block-gsv-steps",
    type: "sequence",
    heading: "Step by step (open harvest)",
    steps: [
      { title: "Map and incise", detail: "Mark the vein with ultrasound from the junction down and incise longitudinally right over it, extending distally for length. Starting at the junction confirms you have the right vessel. An off-axis incision forces wide flaps and invites breakdown." },
      { title: "Expose and mobilize", detail: "Use a Weitlaner retractor and sharp dissection with judicious cautery to reach the vein, and pass a vessel loop for atraumatic handling. Stay on the adventitia. Do not discard a vein that looks small in situ; its true caliber shows only after gentle pressurization. Grasping or stretching the wall strips endothelium and sets up early failure." },
      { title: "Control side branches", detail: "Ligate and divide tributaries with 3-0 to 5-0 silk ties or titanium clips on both sides, leaving a safe cuff off the main wall (about 0.5 cm in the no-touch technique). Tied too close, a branch narrows the lumen; tied too far, the stump can leak or dilate under arterial pressure." },
      { title: "Divide at both ends", detail: "After systemic heparin, pass a right angle around the vein at the junction, double-ligate the stump with nonabsorbable suture flush with, but not narrowing, the common femoral vein, and divide; then ligate and divide the distal end. Too close strictures the deep vein; too long leaves a thrombogenic blind pouch." },
      { title: "Prepare, leak-test and store", detail: "Cannulate the distal end, flush gently, and repair any leak or missed branch. Keep distension pressure under 100 mm Hg and store cold, at about 4 degrees C. Forcing pressures of 400 mm Hg or more to break spasm is a central, avoidable cause of endothelial injury and early graft failure." },
      { title: "Close", detail: "Secure hemostasis, close and apply a compressive dressing or stocking. Two-layer closure and distal-to-proximal dissection are independent risk factors for chronic saphenous neuralgia, so dissect proximal to distal and avoid unnecessary deep sutures." },
    ],
  }, SOURCE),

  sourced({
    id: "block-gsv-storage",
    type: "warning",
    heading: "Storage solution: unresolved, so the options are listed",
    tone: "mnemonic",
    text: "**Normal saline** is traditional but impairs endothelial function even after a short storage time. **Heparinized autologous whole blood** preserves endothelial and contractile function better than saline in several studies. In **PREVENT IV**, buffered saline was associated with substantially lower one-year vein-graft failure than both saline and blood. **DuraGraft**, a buffered glutathione, ascorbic acid and L-arginine solution, reduced ischemia-induced endothelial apoptosis against saline within 2 hours in vitro and is the only clinically approved vein-graft storage solution. Beyond roughly 2 to 4 hours of ischemia the endothelium degrades whatever the solution. The studies point different ways; none of these is settled as the answer.",
  }, SOURCE),

  sourced({
    id: "block-gsv-variants",
    type: "table",
    heading: "Harvest techniques",
    columns: ["Technique", "Key steps", "Best for", "Caution"],
    rows: [
      ["Open continuous", "One long incision over the whole course, direct vision", "Any center; low cost and low skill threshold", "The highest wound morbidity of the open options"],
      ["Skip or bridging", "Several short incisions with skin bridges, tunneled dissection", "Shorter wounds while staying open; similar patency, fewer wound complications", "Forcing the bridges can tear the vein"],
      ["Microincision", "Two or three 1.5 to 2 cm incisions, vein hook and clips", "A minimally invasive open option with patency similar to conventional", "Needs practice and special hooks"],
      ["No-touch (pedicled)", "Vein taken with its surrounding fat and vasa vasorum, branches tied about 0.5 cm off the wall, no manual distension", "Optimizing graft patency; class IIa in Europe", "The highest leg-wound complication rate"],
      ["Endoscopic", "2 to 3 cm incision near the knee, CO2 insufflation at about 4 L per minute and at most 15 mm Hg, endoscopic dissection and branch cautery, retrieval through a helper incision", "Fewer wound infections, less pain, shorter stay; the dominant US CABG technique", "Operator-dependent; stretch or avulsion injury and CO2 embolism"],
    ],
  }, SOURCE),

  sourced({
    id: "block-gsv-open-vs-evh",
    type: "table",
    heading: "↳ Open against endoscopic harvest: the evidence splits by operation",
    columns: ["Setting", "What the evidence shows"],
    rows: [
      ["CABG", "REGROUP (1,150 patients) found no difference in major adverse cardiac events at about 2.8 years with expert harvesters, while PREVENT IV and a VEST III post hoc analysis found better vein-graft patency and less intimal hyperplasia after open harvest"],
      ["Lower-extremity bypass", "Endoscopic harvest lowers wound complications but is associated with lower primary patency (HR about 1.32), a gap that narrows in more recent and more experienced series"],
      ["Across randomized trials", "No-touch is favored over conventional open harvest when an open technique is used, and endoscopic harvest is best for the wound"],
    ],
  }, SOURCE),

  sourced({
    id: "block-gsv-scenarios",
    type: "bullets",
    heading: "Special scenarios",
    items: [
      "Small or already harvested vein: switch to the other leg's saphenous, the small saphenous vein or an arterial conduit, but reassess caliber after gentle pressurization before abandoning a segment.",
      "High wound-risk donor leg (obese, diabetic, arterial disease): favor endoscopic, skip or microincision harvest, remembering that no-touch carries the most wound complications.",
      "Redo or scarred field: map with ultrasound to avoid old scars and perforators, and start in virgin planes proximally.",
      "Urgent trauma reconstruction: locate the vein quickly with ultrasound at the saphenofemoral junction.",
      "CO2 embolism during endoscopic harvest: stop insufflation, desufflate the tunnel, Trendelenburg and left lateral decubitus, hemodynamic support and 100% oxygen.",
      "Junction or deep vein injury: proximal and distal control, then primary repair of the common femoral vein with fine monofilament without narrowing it.",
    ],
  }, SOURCE),

  sourced({
    id: "block-gsv-structures",
    type: "table",
    heading: "Critical structure protection",
    columns: ["Structure", "Where it runs", "Cost of injury", "How to protect it"],
    rows: [
      ["Saphenous nerve", "Adherent to the vein below the knee; crosses it 5 to 29 cm above the malleolus; common sheath distally", "Saphenous neuralgia or medial leg numbness, chronic in about 15%", "Limit below-knee harvest, dissect close to the vein, go proximal to distal, avoid two-layer closure"],
      ["Common femoral vein at the junction", "Where the saphenous vein joins, medial to the femoral artery", "Deep vein stenosis or thrombosis if narrowed; embolism from a stump clot", "See its anterior wall, ligate flush without narrowing, and leave no long stump"],
      ["The conduit itself", "Thin-walled and prone to spasm", "Endothelial loss, early thrombosis and failure", "No-touch handling, distension under 100 mm Hg, branches tied a safe cuff off the wall, prompt storage"],
      ["Groin lymphatics", "Dense around the junction", "Lymphocele, lymph leak, lymphedema", "Ligate rather than cauterize lymphatic tissue near the junction"],
      ["Skin flaps", "Subcutaneous tissue over the vein", "Flap necrosis, dehiscence, infection", "Incise over the mapped vein, avoid undermining, retract gently"],
    ],
  }, SOURCE),

  sourced({
    id: "block-gsv-complications",
    type: "bullets",
    heading: "Complications",
    items: [
      "Harvest-site infection or dehiscence, more frequent after open than endoscopic harvest: inspect, culture, open and debride collections and start empiric antibiotics, then tailor antibiotics and use negative-pressure therapy or delayed closure as needed.",
      "Hematoma: compress and correct coagulopathy, and evacuate an expanding one.",
      "Chronic saphenous neuralgia, clinically significant in about 15%, more likely with younger age, female sex, higher BMI, diabetes, distal-to-proximal dissection and two-layer closure; most patients have no lasting quality-of-life impact.",
      "Lymphocele or lymphedema: conservative care and aspiration if symptomatic, prevented by careful handling of groin lymphatics.",
      "Vein-graft failure is the conduit's known limitation: one-year patency of roughly 81% to 98% falls to about 55% to 60% at 10 years, and antiplatelet and statin therapy are central to keeping grafts open.",
    ],
  }, SOURCE),

  references("block-gsv-references", [SOURCE]),
];

export const saphenousVeinHarvestPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000018",
  slug: "saphenous-vein-harvest",
  title: "Saphenous Vein Harvest",
  aliases: ["GSV harvest", "Great saphenous vein harvest", "Vein harvest", "Endoscopic vein harvest", "EVH", "No-touch vein harvest"],
  procedureId: "saphenous_vein_harvest",
  approach: "open",
  specialty: "Vascular",
  tags: ["vascular", "cardiac", "conduit", "bypass", "vein harvest"],
  sourceId: SOURCE,
  relatedTopicSlugs: ["peripheral-aneurysms-repair", "vascular-exposure-principles"],
  blocks,
  reviewedAt: "2026-10-22T00:00:00.000Z",
});
