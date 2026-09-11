import { buildPlaybook, references, sourced, sourcedUnits } from "@/content/authoring";
import { ACC_AHA_PAD_2024_SOURCE as ACC, ESC_ESVS_PAD_2024_SOURCE as ESC, FEMPOP_BYPASS_PLAYBOOK_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-fp-summary",
    type: "summary",
    heading: "At a glance",
    text: "The single most outcome-determining decision in a femoropopliteal bypass is the conduit. **Single-segment great saphenous vein** beats prosthetic for any popliteal target, and the gap widens the further distal you go and the worse the runoff. Everything else — the anastomoses, the tunnel, the antithrombotic — is downstream of getting that one right.",
  }, SOURCE),

  sourcedUnits({
    id: "block-fp-indications",
    type: "bullets",
    heading: "Who to operate on",
    items: [
      "Two clinical groups only: lifestyle-limiting claudication that has not responded to medical therapy and a structured exercise trial, and chronic limb-threatening ischaemia — rest pain, a non-healing ulcer, or gangrene.",
      "For claudication that has responded adequately to medical therapy and exercise, revascularization is rated no benefit. Surgery is for the inadequate responders.",
      "Endovascular therapy is first line for functionally limiting claudication; open bypass is the reasonable alternative when the anatomy favours it and perioperative risk is acceptable.",
      "The European position is endovascular-first for femoropopliteal occlusions under 25 cm, reserving vein bypass for long or complex lesions.",
      "Whenever endovascular therapy goes first, preserve the landing zones a future bypass would need.",
      "Haemodynamically significant aortoiliac inflow disease must be fixed before or with the bypass — roughly 40 per cent of femoropopliteal cases need inflow treatment.",
    ],
  }, [[SOURCE], [ACC], [ACC], [ESC], [SOURCE], [ESC]]),

  sourced({
    id: "block-fp-trials",
    type: "warning",
    heading: "BEST-CLI and BASIL-2 genuinely disagree",
    tone: "mnemonic",
    text: "In limb-threatening ischaemia with an adequate saphenous vein, BEST-CLI found surgical bypass reduced major adverse limb events or death against endovascular therapy; where the vein was inadequate the two were similar. BASIL-2, working at infrapopliteal targets, favoured endovascular therapy for amputation-free survival, driven by fewer deaths. The trials disagree by anatomic level and by conduit availability, which is why this decision belongs to a multidisciplinary team rather than a rule.",
  }, SOURCE),

  sourcedUnits({
    id: "block-fp-conduit",
    type: "bullets",
    heading: "Assessing the conduit",
    items: [
      "Preoperative duplex vein mapping is essential, not optional.",
      "An adequate great saphenous vein is generally 3 to 3.5 mm or larger, compressible, non-varicose and without wall thickening.",
      "Between 20 and 40 per cent of candidates do not have one — BEST-CLI used a 3 mm vein to define adequacy.",
      "Small calibre predicts early failure, so measure rather than eyeball it.",
      "Define the anatomy and the runoff with duplex, CT or MR angiography, or catheter angiography before committing to a target.",
      "Use prosthetic conduit, typically 6 to 8 mm and often externally supported, only when adequate vein is absent.",
    ],
  }, [[ESC], [ESC], [ESC], [SOURCE], [SOURCE], [ACC]]),

  sourced({
    id: "block-fp-setup",
    type: "bullets",
    heading: "Anaesthesia and setup",
    items: [
      "General or regional anaesthesia are both acceptable.",
      "Supine, with the hip slightly externally rotated and the knee flexed into a frog-leg position for medial thigh and popliteal access. Pad every pressure point.",
      "Prep circumferentially from the lower abdomen and both groins to the foot, and include the other leg if its vein or a crossover inflow might be needed.",
      "Put the foot in a clear sterile bag so perfusion can be checked without breaking the field.",
      "Weight-based antibiotics within 60 minutes of incision, venous thromboembolism prophylaxis per protocol, sterile urinary catheter.",
      "Systemic heparin before clamping, commonly 80 to 100 units per kilogram or a fixed 5,000-unit bolus titrated to activated clotting time. This reflects standard practice rather than a guideline-fixed dose.",
      "Avoid hypotension after reperfusion — perfusion pressure is what keeps a fresh graft open.",
    ],
  }, SOURCE),

  sourced({
    id: "block-fp-anatomy",
    type: "bullets",
    heading: "Anatomy and safe planes",
    items: [
      "The common femoral artery enters at the mid-inguinal point, midway between the anterior superior iliac spine and the pubic tubercle, and divides into the superficial femoral and profunda femoris.",
      "Preserving profunda inflow is critical — it is the dominant collateral bed if the graft ever fails.",
      "The superficial femoral artery becomes the popliteal artery at the adductor hiatus, running through the adductor canal with the saphenous nerve.",
      "The popliteal artery lies deepest in the fossa, gives the genicular collaterals, and divides at the lower border of popliteus into the anterior tibial artery and the tibioperoneal trunk.",
      "- That usual pattern holds in about 92.6 per cent of limbs; trifurcation occurs in roughly 2.4 per cent, and high or anomalous origins should be anticipated on imaging.",
      "- Normal diameter is about 5 to 9 mm.",
      "Above the knee, approach medially between sartorius retracted posteriorly and vastus medialis; stay on the artery in its fat pad, with the vein just deep to it.",
      "Below the knee, incise medially about 1 cm behind the tibial margin. After the deep crural fascia is opened and medial gastrocnemius retracted, the order from superficial to deep is tibial nerve, then vein, then artery deepest and nearest bone.",
      "- Dissect directly on the arterial adventitia and stay off the adherent, often duplicated, popliteal vein.",
      "The great saphenous vein and the saphenous nerve run together in the subcutaneous plane of the medial calf — protect the nerve during both exposure and harvest.",
    ],
  }, SOURCE),

  sourced({
    id: "block-fp-flow",
    type: "flow",
    heading: "Operative flow",
    nodes: [
      { id: "inflow", label: "Expose common, superficial and profunda femoral", tone: "default" },
      { id: "vein", label: "Adequate saphenous vein on mapping?", tone: "default" },
      { id: "harvest", label: "Harvest and prepare the vein", tone: "good" },
      { id: "prosthetic", label: "Select prosthetic conduit", tone: "caution" },
      { id: "target", label: "Expose the popliteal target", tone: "default" },
      { id: "tunnel", label: "Create an anatomic tunnel", tone: "default" },
      { id: "heparin", label: "Systemic heparin", tone: "default" },
      { id: "proximal", label: "Proximal anastomosis to common femoral", tone: "default" },
      { id: "tension", label: "Pass the graft, set length with the knee extended", tone: "caution" },
      { id: "distal", label: "Distal anastomosis to popliteal", tone: "default" },
      { id: "completion", label: "Completion imaging and pedal Doppler", tone: "default" },
      { id: "close", label: "Layered closure over an obliterated groin", tone: "good" },
    ],
    edges: [
      { from: "inflow", to: "vein" },
      { from: "vein", to: "harvest", label: "Yes" },
      { from: "vein", to: "prosthetic", label: "No" },
      { from: "harvest", to: "target" },
      { from: "prosthetic", to: "target" },
      { from: "target", to: "tunnel" },
      { from: "tunnel", to: "heparin" },
      { from: "heparin", to: "proximal" },
      { from: "proximal", to: "tension" },
      { from: "tension", to: "distal" },
      { from: "distal", to: "completion" },
      { from: "completion", to: "close" },
    ],
  }, SOURCE),

  sourced({
    id: "block-fp-technique",
    type: "sequence",
    heading: "Step by step",
    steps: [
      { title: "Expose the inflow", detail: "Vertical groin incision over the femoral pulse at the mid-inguinal point. Expose the common, superficial and profunda femoral arteries and encircle them. Control the common carotid up to the inguinal ligament and identify the bifurcation. Ligate crossing lymphatics rather than cauterising them, and protect the profunda origin — it is the collateral bed if the graft fails." },
      { title: "Prepare the conduit", detail: "Harvest the saphenous vein open, by skip incisions or endoscopically, ligating tributaries. Distend gently with heparinised solution and mark the axis so it cannot twist. Reversed and in-situ non-reversed configurations are both acceptable. Axial rotation and size mismatch are avoidable technical causes of early failure." },
      { title: "Expose the distal target", detail: "Above the knee, a medial lower-thigh incision in the groove between sartorius and vastus medialis, opening the deep fascia and mobilising about 2 cm of artery. Below the knee, a 10 to 12 cm medial incision 1 cm behind the tibia, protecting the saphenous vein and nerve, opening the deep crural fascia, retracting medial gastrocnemius and dividing arching soleus fibres as needed. The pitfalls are the adherent popliteal vein and the tibial nerve." },
      { title: "Tunnel", detail: "Create an anatomic subsartorial tunnel above the knee, or a subfascial trans-popliteal one between the gastrocnemius heads below, using a dedicated tunneller and marking it with a Penrose. A non-anatomic or tight tunnel kinks or compresses the graft; verify the axial marker line runs straight." },
      { title: "Heparinise and do the proximal anastomosis", detail: "Give systemic heparin, clamp the three femoral vessels, make a longitudinal common femoral arteriotomy extending onto the superficial or profunda origin if a profundaplasty is needed, spatulate the graft, and sew end-to-side with running 5-0 or 6-0 polypropylene. Flush inflow and outflow and irrigate the lumen before the suture line is complete." },
      { title: "Pass the graft and do the distal anastomosis", detail: "Pass the distended graft with its marker straight, then extend the knee fully to set length and tension before transecting — too long and it kinks on extension, too short and it tents the anastomosis. Clamp, make a longitudinal popliteal arteriotomy, and sew a spatulated end-to-side anastomosis with 5-0 or 6-0 polypropylene." },
      { title: "Assess and close", detail: "Completion angiography or duplex to confirm the lie, the anastomoses and the runoff, plus pedal Doppler signals. Close in layers, obliterating dead space in the groin. Never close over an unaddressed technical defect — completion imaging is the last chance to correct an anastomotic stenosis, retained thrombus or a distal flap." },
    ],
  }, SOURCE),

  sourced({
    id: "block-fp-variants",
    type: "table",
    heading: "Conduit and target options",
    columns: ["Option", "What it involves", "Best for", "Caution"],
    rows: [
      ["Reversed vein", "Distend and reverse, no valvulotomy", "A good-calibre vein that tolerates the size difference", "Marked proximal-to-distal mismatch"],
      ["In-situ or non-reversed vein", "Valvulotomy, better size matching along the graft", "A tapered vein or a distal target", "Valvulotome injury to the vein"],
      ["Prosthetic", "6 to 8 mm, often ring-supported, with or without heparin bonding", "No adequate vein, especially an above-knee target", "Poor patency below the knee and a worse infection if it does occur"],
      ["Above-knee target", "Shorter graft and a simpler exposure", "A patent above-knee segment with decent runoff", "Only works if that segment is not itself diseased"],
      ["Below-knee target", "Infrageniculate anastomosis", "A diseased above-knee segment, for limb salvage", "Prosthetic conduit here performs badly"],
      ["Endovascular", "Angioplasty, stent or drug-coated balloon", "Shorter femoropopliteal lesions", "Long calcified occlusions, or no landing zone"],
    ],
  }, SOURCE),

  sourced({
    id: "block-fp-patency",
    type: "prose",
    heading: "↳ What to expect at five years",
    text: "Roughly 77 per cent primary patency for above-knee vein against about 50 per cent for above-knee prosthetic; about 67 per cent for below-knee vein; and for femoro-infrapopliteal grafts about 74 per cent for vein against about 18 per cent for prosthetic. A blanket claim of 75 per cent is accurate only for above-knee vein and badly overstates everything else.",
  }, SOURCE),

  sourced({
    id: "block-fp-structures",
    type: "table",
    heading: "Critical structure protection",
    columns: ["Structure", "Where it runs", "Cost of injury", "How to protect it"],
    rows: [
      ["Profunda femoris artery", "Posterolateral at the femoral bifurcation", "Loses the dominant collateral if the graft fails", "Preserve the origin and do a profundaplasty if it is diseased"],
      ["Saphenous nerve", "With the artery in the adductor canal, with the vein in the medial calf", "Medial leg and foot dysaesthesia", "Stay on the artery in the canal and harvest carefully in the subcutaneous plane"],
      ["Popliteal vein", "Adherent to the artery, often duplicated", "Troublesome venous bleeding", "Sharp dissection on the arterial adventitia — do not strip it off the vein"],
      ["Tibial nerve", "Most superficial structure in the below-knee fossa", "Motor and sensory deficit in the foot", "Identify and retract it before dissecting deep"],
      ["Common peroneal (fibular) nerve", "Along the biceps femoris tendon laterally", "Foot drop", "Avoid heavy lateral retraction"],
      ["Genicular collaterals", "Around the knee off the popliteal artery", "Loses collateral flow", "Mobilise the artery only as far as the anastomosis needs"],
      ["Femoral lymphatics", "Crossing the subcutaneous groin", "Lymphocele, lymph leak, wound infection", "Ligate them rather than cauterising"],
    ],
  }, SOURCE),

  sourced({
    id: "block-fp-scenarios",
    type: "bullets",
    heading: "Special scenarios",
    items: [
      "No adequate saphenous vein: spliced arm or lesser saphenous vein, cryopreserved allograft, or prosthetic. A heparin-bonded series reported about 58 per cent five-year primary patency, worse below the knee and with poor runoff.",
      "Hostile or reoperative groin: consider an oblique incision, proximal control at the external iliac or distal superficial femoral, or alternative inflow. Scarred, lymphatic-laden fields raise the wound-complication rate.",
      "Popliteal aneurysm as the pathology: choose medial exclusion-bypass or a posterior direct approach by extent, with proximal disease favouring the medial route.",
      "Acute limb ischaemia or prolonged ischaemia before revascularization: anticipate reperfusion syndrome and plan a fasciotomy.",
    ],
  }, SOURCE),

  sourcedUnits({
    id: "block-fp-complications",
    type: "bullets",
    heading: "Complications and emergencies",
    items: [
      "Early graft thrombosis inside thirty days, and up to about 20 per cent within six months: check pulses and Doppler at the bedside, get a duplex, and return to theatre for thrombectomy or revision — most early failures are technical.",
      "Compartment syndrome after reperfusion: a tense calf, pain on passive stretch and a rising creatine kinase. Measure pressures and perform an immediate four-compartment fasciotomy.",
      "Fasciotomy after revascularization for acute limb ischaemia is a class 1 recommendation, and prophylactic fasciotomy is reasonable for a threatened but salvageable limb.",
      "The thresholds differ between sources: ACC/AHA decides on clinical category, while other statements use a six-hour ischaemia rule. Delayed fasciotomy is associated with far higher amputation rates.",
      "Rhabdomyolysis with myoglobinuric kidney injury and hyperkalaemia: aggressive fluids, treat the potassium, and follow creatine kinase and renal function.",
      "Wound and graft infection: vein grafts carry higher wound infection and reoperation rates, but a prosthetic graft infection is the more catastrophic event. Meticulous groin closure and lymphatic ligation reduce both.",
      "Late graft stenosis beyond thirty days comes from neointimal hyperplasia and progressive atherosclerosis — put vein grafts on duplex surveillance to catch a correctable stenosis before it occludes.",
      "Late leg swelling: duplex to exclude deep vein thrombosis and anticoagulate if it is confirmed.",
    ],
  }, [[SOURCE], [SOURCE], [ACC], [SOURCE], [ACC], [SOURCE], [SOURCE], [SOURCE]]),

  sourcedUnits({
    id: "block-fp-antithrombotic",
    type: "bullets",
    heading: "Antithrombotic regimen",
    items: [
      "Baseline after any bypass: a single antiplatelet — aspirin 75 to 100 mg daily, or clopidogrel 75 mg daily.",
      "At low bleeding risk, aspirin plus rivaroxaban 2.5 mg twice daily reduces major adverse cardiac and limb events.",
      "High-bleeding-risk patients — prior stroke or intracranial haemorrhage, recent gastrointestinal bleeding — were excluded from that trial and should not receive the combination.",
      "For a prosthetic below-knee bypass, aspirin plus clopidogrel for one year is suggested.",
      "A vitamin K antagonist may improve vein-graft patency but increases bleeding, dual antiplatelet therapy has not been shown to improve graft patency, and full-intensity anticoagulation added to antiplatelet therapy for peripheral arterial disease generally offers no benefit and more bleeding.",
      "Triple therapy is not recommended.",
    ],
  }, [[SOURCE], [ACC], [SOURCE], [ACC], [SOURCE], [SOURCE]]),

  references("block-fp-references", [SOURCE, ACC, ESC]),
];

export const femoropoplitealBypassPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000003",
  slug: "femoropopliteal-bypass",
  title: "Femoropopliteal Bypass",
  aliases: ["Fem-pop bypass", "Femoral-popliteal bypass", "Lower extremity bypass"],
  procedureId: "femoropopliteal_bypass",
  approach: "open",
  specialty: "Vascular",
  tags: ["vascular", "bypass", "peripheral artery disease", "limb salvage"],
  sourceId: SOURCE,
  additionalSourceIds: [ACC, ESC],
  blocks,
  reviewedAt: "2026-09-10T00:00:00.000Z",
});
