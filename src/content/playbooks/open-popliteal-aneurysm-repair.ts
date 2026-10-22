import { buildPlaybook, references, sourced, sourcedUnits } from "@/content/authoring";
import {
  ACC_AHA_PAD_2024_SOURCE as ACC,
  ESC_ESVS_PAD_2024_SOURCE as ESC,
  OPEN_PAA_REPAIR_PLAYBOOK_SOURCE as SOURCE,
  SVS_POPLITEAL_ANEURYSM_2022_SOURCE as SVS,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

// Source: open-paa-repair-ali-pocket-chief-playbook.docx, supplied October 22, 2026 (attending quick-reference).
// Default is the medial approach with reversed great saphenous vein bypass and proximal and distal ligation; the
// posterior approach is a variant. The document's own evidence conflicts (conduit, approach, lysis) are kept as conflicts.
const blocks: TopicBlock[] = [
  sourced({
    id: "block-paar-summary",
    type: "summary",
    heading: "At a glance",
    text: "A thrombosed popliteal aneurysm with acute limb ischemia is a limb-threatening emergency, and the runoff is usually already gone: silent embolization has often left **no patent tibiopedal target**. The Rutherford grade decides the first move (lysis to recruit a target, straight to the operating room, or primary amputation), and the operation that follows is a **medial reversed saphenous vein bypass** with Fogarty clearance of inflow and outflow and proximal and distal **ligation** of the aneurysm. Plan the fasciotomy before you start.",
  }, SOURCE),

  sourcedUnits({
    id: "block-paar-rutherford",
    type: "table",
    heading: "First move by Rutherford grade",
    columns: ["Grade", "Limb", "What to do"],
    rows: [
      ["I or IIa", "Viable or marginally threatened, with severely obstructed tibiopedal runoff", "Catheter-directed thrombolysis or pharmacomechanical therapy to restore an outflow target, then prompt definitive repair; lysis restores a target, it does not treat the aneurysm"],
      ["I or IIa, runoff open", "Isolated aneurysm thrombosis with good inflow and a usable outflow target", "No lysis; go straight to reconstruction"],
      ["IIb", "Immediately threatened: motor deficit, rest pain, sensory loss", "Cannot tolerate infusion lysis; urgent surgical (or endovascular) repair with adjunctive thromboembolectomy or pharmacomechanical thrombectomy to maximize outflow"],
      ["III", "Nonviable: profound sensory loss, paralysis, no arterial or venous Doppler signal", "Primary amputation; some borderline IIb or III limbs still merit an attempt at revascularization"],
    ],
  }, [[SOURCE, SVS], [SOURCE, SVS], [SOURCE, SVS, ACC], [SOURCE, SVS]]),

  sourcedUnits({
    id: "block-paar-indications",
    type: "bullets",
    heading: "Preoperative essentials",
    items: [
      "Untreated, a thrombosed popliteal aneurysm carries an amputation rate near 15%, and muscle and nerve tolerate only about 4 to 6 hours of ischemia.",
      "Duplex and CT angiography define the aneurysm, thrombus burden and runoff, and angiography is often obtained in the room; imaging must not delay revascularization of an immediately threatened limb.",
      "Screen for a contralateral popliteal aneurysm (about half) and an abdominal aortic aneurysm (about one-third).",
      "Start therapeutic heparin on recognition to limit clot propagation.",
      "Open repair is preferred for a good-risk patient with life expectancy of 5 years or more and adequate saphenous vein, and specifically over endovascular repair when tibial runoff is poor.",
      "A covered stent graft, with or without thromboaspiration, suits diminished life expectancy, prohibitive operative risk or no usable vein, at the cost of more reintervention and lower primary patency.",
      "For context, elective repair is indicated at 20 mm or more (deferrable to 30 mm in selected high-risk patients without thrombus), for smaller aneurysms with thrombus and embolism or poor runoff, and for any symptomatic aneurysm.",
    ],
  }, [[SOURCE, ESC], [SOURCE, ESC], [SOURCE, SVS], [SOURCE, ACC], [SOURCE, SVS], [SOURCE, SVS], [SOURCE, SVS]]),

  sourced({
    id: "block-paar-setup",
    type: "bullets",
    heading: "Anesthesia and setup",
    items: [
      "General anesthesia is typical, because the case may extend to embolectomy, on-table lysis and fasciotomy; regional is acceptable.",
      "Supine with the hip externally rotated and the knee gently flexed in a frog-leg position over a bump, which exposes the popliteal artery and the ipsilateral saphenous vein together.",
      "Prep circumferentially from groin to foot with the foot in the field for pedal signals, and prep the other leg if its vein may be needed.",
      "Adequate IV access, an arterial line if the patient is tenuous, a urinary catheter, and blood typed and crossed for a large or ruptured aneurysm.",
      "Cefazolin within 60 minutes of incision, vancomycin or clindamycin for beta-lactam allergy or MRSA, stopped within 24 hours; chlorhexidine skin preparation lowers surgical site infection.",
      "Systemic heparin before clamping, commonly a 5,000-unit bolus; ACT-guided dosing (about 100 units per kilogram, target ACT 200 to 250 seconds, redose under 200) reduces thromboembolic complications.",
      "Expect reperfusion washout after a long ischemic time: follow potassium, pH and creatine kinase, and hydrate aggressively for rhabdomyolysis.",
    ],
  }, SOURCE),

  sourced({
    id: "block-paar-anatomy",
    type: "bullets",
    heading: "Anatomy and safe planes",
    items: [
      "The popliteal artery continues the superficial femoral artery through the adductor hiatus and ends below the knee as the anterior tibial artery and the tibioperoneal trunk.",
      "Above the knee, incise along the anterior border of sartorius in the groove with vastus medialis, retract sartorius posteriorly, and open the deep fascia behind the femur to enter the fossa. The saphenous vein runs in the subcutaneous plane; preserve it.",
      "Below the knee, incise a fingerbreadth behind the posteromedial edge of the tibia, divide the crural fascia and reflect gastrocnemius and soleus off the tibia to reach the distal popliteal artery and tibioperoneal trunk.",
      "Connecting the two incisions for full exposure means dividing the pes anserinus (sartorius, gracilis, semitendinosus).",
      "From superficial to deep the order is tibial nerve, popliteal vein, then artery deepest against the femur and capsule; dissect superficial to deep and control the vein to reach the artery.",
      "Once in the bundle, stay on the arterial adventitia. The medial approach bypasses and ligates the aneurysm without dissecting the sac, which spares the vein and nerves and limits embolization.",
    ],
  }, SOURCE),

  sourced({
    id: "block-paar-flow",
    type: "flow",
    heading: "Operative flow",
    nodes: [
      { id: "heparin", label: "Systemic heparin" },
      { id: "proximal", label: "Above-knee popliteal or distal superficial femoral exposure and control" },
      { id: "distal", label: "Below-knee popliteal or tibioperoneal trunk exposure and control" },
      { id: "vein", label: "Harvest and prepare reversed great saphenous vein", tone: "good" },
      { id: "fogarty", label: "Fogarty thromboembolectomy of inflow and outflow", tone: "caution" },
      { id: "prox-anast", label: "Proximal anastomosis" },
      { id: "tunnel", label: "Tunnel the graft" },
      { id: "dist-anast", label: "Distal anastomosis and restore flow" },
      { id: "ligate", label: "Ligate the native artery proximal and distal to the aneurysm" },
      { id: "completion", label: "Completion angiogram and pedal Doppler", tone: "caution" },
      { id: "fasciotomy", label: "Fasciotomy decision, then close", tone: "good" },
    ],
    edges: [
      { from: "heparin", to: "proximal" },
      { from: "proximal", to: "distal" },
      { from: "distal", to: "vein" },
      { from: "vein", to: "fogarty" },
      { from: "fogarty", to: "prox-anast" },
      { from: "prox-anast", to: "tunnel" },
      { from: "tunnel", to: "dist-anast" },
      { from: "dist-anast", to: "ligate" },
      { from: "ligate", to: "completion" },
      { from: "completion", to: "fasciotomy" },
    ],
  }, SOURCE),

  sourced({
    id: "block-paar-steps",
    type: "sequence",
    heading: "Step by step (medial approach, vein bypass)",
    steps: [
      { title: "Proximal exposure and control", detail: "Expose the distal superficial femoral or above-knee popliteal artery between vastus medialis and sartorius and loop it, using the back of the femur to find the fossa. Get proximal control before touching thrombus, and do not injure or accidentally take the vein you need as conduit." },
      { title: "Distal exposure and control", detail: "Expose the below-knee popliteal artery or tibioperoneal trunk a fingerbreadth behind the tibia and loop the artery, vein and nerve separately. Choose the most proximal non-aneurysmal, non-diseased target with the best runoff, which may be the trunk or a tibial vessel; the traps are the tibial nerve and a diseased landing zone." },
      { title: "Prepare the conduit", detail: "Harvest single-segment great saphenous vein (adequate means larger than 3 mm, free of stenosis and synechiae), reverse it or use it non-reversed or in situ by preference, and spatulate both ends. Take more length than you think so it does not kink with the knee extended." },
      { title: "Thromboembolectomy", detail: "After heparin, pass a Fogarty balloon (commonly 3 to 4 French for popliteal and tibial vessels) proximally and distally until inflow and backflow are good. Treat residual tibial clot on angiography with low-dose on-table thrombolysis; aim for at least one patent tibial outflow. Do not over-inflate the balloon." },
      { title: "Proximal anastomosis", detail: "End-to-side to healthy artery with running 5-0 polypropylene, then pressurize the graft to set length before tunneling. Avoid purse-stringing the heel or toe." },
      { title: "Tunnel and distal anastomosis", detail: "Tunnel anatomically and sew end-to-side with running 6-0 polypropylene over a longitudinal arteriotomy lengthened with Potts scissors, with a generously spatulated graft. Check for tension and twist in the tunnel." },
      { title: "Exclude the aneurysm", detail: "Ligate the native popliteal artery just beyond the proximal anastomosis and just before the distal one. Sac obliteration is desirable but often hard; incomplete exclusion leaves a pressurized sac that can grow or rupture later." },
      { title: "Completion assessment", detail: "Completion angiography, ideally in a hybrid room, for graft patency and tibiopedal runoff, with on-table lysis for residual clot and pedal Doppler confirmation. Vasospasm responds to papaverine, warming and time; never accept poor runoff or an unexamined distal anastomosis." },
      { title: "Fasciotomy and closure", detail: "Decide on fasciotomy before closing; the thresholds are in the emergencies block below." },
    ],
  }, SOURCE),

  sourcedUnits({
    id: "block-paar-variants",
    type: "table",
    heading: "Approach and conduit options",
    columns: ["Option", "Key steps", "Best for", "Caution"],
    rows: [
      ["Medial vein bypass with ligation (default)", "Bypass around the sac, ligate proximal and distal", "Most aneurysms; the supine ALI patient; good risk with adequate vein", "No adequate vein; the sac may stay perfused"],
      ["Posterior approach with aneurysmorrhaphy", "Prone, lazy-S incision, open the sac, oversew the geniculate branches, interposition graft", "Large or compressive aneurysms that need decompression; rupture", "Turning an unstable or multiply injured patient prone is risky; nerves and vein at risk during sac dissection"],
      ["Prosthetic (ePTFE) bypass", "As medial, with prosthetic conduit", "No adequate vein", "Worse long-term patency and limb salvage than vein; good size match through the posterior route"],
      ["Covered stent graft with thromboaspiration", "Femoral access, aspiration of tibial outflow, then endograft exclusion", "High operative risk, limited life expectancy, no vein, adequate landing zones", "Below-knee disease, single-vessel runoff, short landing zones, covering the sural branches; more reintervention and limb events at a year"],
      ["Endoaneurysmorrhaphy or interposition", "Open or excise the sac and sew in a tube graft end to end", "Selected degenerated or ruptured sacs", "More bleeding and wound morbidity with a large sac"],
    ],
  }, [[SOURCE, SVS], [SOURCE, SVS], [SOURCE, SVS], [SOURCE], [SOURCE]]),

  sourced({
    id: "block-paar-conflict",
    type: "warning",
    heading: "The evidence disagrees on conduit and approach",
    tone: "mnemonic",
    text: "On **conduit**, contemporary registry data favor vein: a 2026 VQI analysis found vein grafts lowered one-year major adverse limb events or death against endovascular repair (HR 0.57) and against prosthetic (HR 0.75), with the benefit holding in the acute limb ischemia subgroup, and two 2026 meta-analyses favored autologous vein for patency and limb salvage. A 2026 single-center series found limb events comparable across approaches and argued that size and thrombus burden alone should not dictate the choice. On **approach**, the medial bypass leaves the sac in place, and up to a third of medially bypassed sacs keep flowing through geniculate or sural branches, some growing or rupturing years later; the posterior approach excludes the sac completely but rests on fewer reported cases. Certainty is low, with no adequately powered randomized trial, so surgeons keep real latitude here.",
  }, SOURCE),

  sourced({
    id: "block-paar-scenarios",
    type: "bullets",
    heading: "Special scenarios",
    items: [
      "No tibial target: on-table or preprocedural lysis or pharmacomechanical thrombectomy to recruit one; if none can be established, amputation may be needed.",
      "Single-vessel runoff is acceptable, because brisk flow in one tibial vessel can perfuse the limb, and open repair tolerates poor runoff better than endovascular repair.",
      "Borderline IIb or III limb: revascularization may still be attempted in a severe case that does not fully meet grade III criteria.",
      "Reoperative field: an old medial bypass with a perfused, degenerating sac can present with rupture years later; repair by posterior endoaneurysmorrhaphy with an interposition graft, using a tourniquet and a drain, and consider intraoperative cultures.",
      "Ruptured large aneurysm: proximal control before entering the sac, tourniquet control, and preparation for massive blood loss.",
      "Concurrent knee dislocation or other skeletal instability: a temporary shunt restores flow during fixation.",
    ],
  }, SOURCE),

  sourced({
    id: "block-paar-structures",
    type: "table",
    heading: "Critical structure protection",
    columns: ["Structure", "Where it runs", "Cost of injury", "How to protect it"],
    rows: [
      ["Tibial nerve", "Most superficial and posterior in the fossa", "Loss of plantar flexion and plantar sensation", "Dissect superficial to deep and loop it before working on the artery"],
      ["Common fibular nerve", "Around the fibular neck laterally; at risk in the posterior approach", "Foot drop and dorsolateral sensory loss", "Favor the medial approach and avoid aggressive lateral dissection of the sac"],
      ["Popliteal vein", "Between nerve and artery, often adherent", "Hemorrhage and deep vein thrombosis", "Encircle and control it before reaching the artery"],
      ["Great saphenous vein", "Subcutaneous, medial thigh and calf", "Loss of the best conduit", "Identify and keep it during exposure; take the other leg's vein if needed"],
      ["Geniculate and sural branches", "Off the native popliteal, feeding the sac", "Persistent sac perfusion, late growth or rupture", "Oversew them in the posterior approach, or ligate tightly proximal and distal"],
      ["Tibial runoff", "Anterior tibial artery and tibioperoneal trunk below the knee", "Early graft thrombosis and limb loss", "Fogarty clearance, completion angiography, at least one tibial target"],
      ["Pes anserinus", "Posteromedial tendon insertions", "Only divided on purpose", "Divide it deliberately, and only to connect the incisions"],
    ],
  }, SOURCE),

  sourcedUnits({
    id: "block-paar-emergencies",
    type: "bullets",
    heading: "Complications and emergencies",
    items: [
      "Poor thrombus clearance or runoff: repeat Fogarty passes, on-table lysis or pharmacomechanical or aspiration thrombectomy, confirmed on completion angiography.",
      "Graft kink, twist or length error: pressurize after the proximal anastomosis to set length, and re-tunnel a twisted graft.",
      "**Compartment syndrome** after reperfusion is the dominant postoperative emergency, almost always in the lower leg: pain out of proportion, tense compartments, sensorimotor change and a rising creatine kinase.",
      "Pressure thresholds are an absolute compartment pressure over 30 mm Hg or a delta pressure (diastolic minus compartment) under 30 mm Hg.",
      "Clinical compartment syndrome means an immediate **four-compartment fasciotomy**; prophylactic fasciotomy at revascularization is reasonable for a threatened but salvageable limb or a prolonged, severe ischemic time.",
      "Treat reperfusion injury: hyperkalemia, metabolic acidosis and myoglobinuria, with aggressive hydration; creatine kinase and myoglobin predict amputation, renal failure and death.",
      "Early graft thrombosis (up to about 20% within 6 months of lower-extremity bypass) means urgent re-exploration, thrombectomy or redo bypass.",
      "Anastomotic bleeding is a return to the operating room, balanced against therapeutic heparin.",
    ],
  }, [[SOURCE, ESC], [SOURCE], [SOURCE, ACC], [SOURCE], [SOURCE, ACC], [SOURCE, ESC], [SOURCE], [SOURCE]]),

  sourcedUnits({
    id: "block-paar-antithrombotic",
    type: "bullets",
    heading: "Antithrombotic plan",
    items: [
      "Continue full-dose heparin after revascularization, then move to an oral regimen once the cause (embolic or in situ thrombosis) is clear.",
      "After a vein bypass, long-term single antiplatelet therapy; a vitamin K antagonist may be considered for an autologous vein infrainguinal bypass.",
      "After a prosthetic or below-knee bypass, consider dual antiplatelet therapy.",
      "Low-dose rivaroxaban 2.5 mg twice daily with aspirin, started within 10 days of revascularization in a patient not on another anticoagulant or a planned P2Y12 inhibitor, reduced cardiac and limb events at the cost of more bleeding; exclude high bleeding risk.",
      "Avoid triple therapy; if full anticoagulation is needed, for atrial fibrillation for example, add a single antiplatelet only.",
    ],
  }, [[SOURCE], [SOURCE], [SOURCE], [SOURCE, ACC], [SOURCE, ACC]]),

  references("block-paar-references", [SOURCE, SVS, ACC, ESC]),
];

export const openPoplitealAneurysmRepairPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000017",
  slug: "open-popliteal-aneurysm-repair",
  title: "Open Popliteal Artery Aneurysm Repair with Thrombectomy for Acute Limb Ischemia",
  aliases: ["Open PAA repair", "Thrombosed popliteal aneurysm bypass", "Popliteal aneurysm ligation and bypass", "Medial popliteal aneurysm bypass"],
  procedureId: "open_popliteal_aneurysm_repair_ali",
  approach: "open",
  specialty: "Vascular",
  tags: ["vascular", "bypass", "aneurysm", "acute limb ischemia", "limb salvage"],
  sourceId: SOURCE,
  additionalSourceIds: [SVS, ACC, ESC],
  relatedTopicSlugs: ["peripheral-aneurysms-repair", "arterial-peripheral-aneurysms", "acute-limb-ischemia", "fasciotomy"],
  blocks,
  reviewedAt: "2026-10-22T00:00:00.000Z",
});
