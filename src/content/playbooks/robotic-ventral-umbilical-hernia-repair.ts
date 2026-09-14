import { buildPlaybook, references, sourced } from "@/content/authoring";
import {
  EHS_AHS_UMBILICAL_2020_SOURCE as EHS,
  ROBOTIC_VENTRAL_HERNIA_PLAYBOOK_SOURCE as SOURCE,
  SAGES_HERNIA_PROPHYLAXIS_2016_SOURCE as SAGES,
  WSES_EMERGENCY_HERNIA_SOURCE as WSES,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-rvhr-summary",
    type: "summary",
    heading: "At a glance",
    text: "One robotic platform, three genuinely different operations: intraperitoneal onlay with the defect closed, transabdominal preperitoneal, and retromuscular repair by robotic Rives-Stoppa or eTEP. The choice is a choice of plane, and the plane decides the mesh. What the robot reliably buys is intraoperative: dependable fascial closure and extraperitoneal mesh placement in cases where laparoscopy would have bridged or converted. What it does not buy, on randomized data, is a better recovery.",
  }, SOURCE),

  sourced({
    id: "block-rvhr-lateral-limit-warning",
    type: "warning",
    heading: "The lateral limit is absolute",
    tone: "danger",
    text: "Retrorectus dissection stops medial to the **linea semilunaris**. Under insufflation the segmental neurovascular bundles stand up off the posterior lamina of the internal oblique just medial to it — the lamppost sign — and they are the stopping point, not a landmark to dissect past. Carrying the plane lateral to them denervates the rectus and produces a permanent lateral bulge or a frank lateral hernia, neither of which can be repaired back to normal. When transversus abdominis release is required, the muscle is divided **medial** to the bundles, which are preserved.",
  }, SOURCE),

  sourced({
    id: "block-rvhr-indications",
    type: "bullets",
    heading: "Indications and defect-size framework",
    items: [
      "Repair is indicated for a symptomatic hernia, and urgently for one that is incarcerated or strangulated.",
      "Asymptomatic hernias may be observed. In a Dutch observation cohort of umbilical and epigastric hernias, roughly 4 per cent came to emergency repair within five years.",
      "Fascial defect width sorts the operation: small is 0 to 2 cm, medium 2 to 4 cm, large above 4 cm.",
      "- Small defects are well served by an open repair with mesh; the robot is generally reserved for medium or large defects, recurrent disease, or a concomitant diastasis or multiple defects that favour a retromuscular approach.",
      "- Medium and large defects are where minimally invasive repair earns its place, because it lowers wound complications and the platform makes reliable defect closure and extraperitoneal mesh placement achievable.",
      "For women, defer elective umbilical repair until childbearing is complete.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rvhr-mesh-guideline",
    type: "prose",
    heading: "↳ What the guideline actually recommends",
    text: "Mesh is recommended for essentially all umbilical hernia repairs to reduce recurrence, with suture-only repair reserved for defects under 1 cm. The recommended construct is a flat permanent mesh in the preperitoneal space with the defect closed above it, and the suggested overlap is graded rather than fixed: 2 cm for the smallest defects and 3 cm for medium ones.",
  }, EHS),

  sourced({
    id: "block-rvhr-evidence",
    type: "warning",
    heading: "Board answer versus current practice: does the robot earn its time?",
    tone: "pearl",
    text: "The keyed answer is that robotic and laparoscopic ventral hernia repair are equivalent and the robot costs time — and the randomized data support it. PROVE-IT found no difference in 30-day pain, satisfaction or complications, at 146 against 94 minutes. A network meta-analysis of 34 trials and 3,779 patients found no difference in recurrence, seroma or haematoma across open, laparoscopic and robotic repair, with roughly 49 minutes added by the robot and open repair more cost-effective but carrying the higher wound-infection risk. The practice answer is narrower and worth holding separately: at two years the Dhanani trial reported recurrence in 4 per cent of robotic against 13 per cent of laparoscopic repairs, a difference that did not reach significance in a trial not powered for it. Registry data put the robot's advantage where that signal would come from — fewer conversions, fewer bowel injuries, and defect closure and extraperitoneal mesh placement that actually happen. A 2026 network meta-analysis concluded there is no single superior technique, which is the honest summary.",
  }, SOURCE),

  sourced({
    id: "block-rvhr-contraindications",
    type: "bullets",
    heading: "Contraindications and cautions",
    items: [
      "Inability to tolerate pneumoperitoneum or general anaesthesia.",
      "A hostile abdomen that precludes safe access.",
      "Active contamination, or strangulated bowel that will need resection — these favour an open repair with suture or biologic mesh.",
      "Cirrhosis with ascites: control the ascites first with paracentesis and albumin, considering TIPS, and expect most reports to favour a primary repair rather than mesh in the emergency setting.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rvhr-optimization",
    type: "prose",
    heading: "Preoperative optimization, and its limits",
    text: "Elective repair should be optimized, and the commonly cited targets are smoking cessation for at least four weeks, HbA1c below 8 per cent — some centres hold to 7.2 — and body mass index thresholds that vary with hernia complexity, with elective repair discouraged above a BMI of 50 without a weight-loss intervention. None of these is universally validated, and they cut both ways: rigid cut-offs create access disparities and the delay itself risks an emergency presentation. The excess wound risk that motivates the BMI thresholds appears specific to open repair and may not transfer to a robotic one. Imaging follows the same logic — a CT of the abdomen and pelvis is preferred for larger, complex or recurrent hernias, where it defines defect size, contents, loss of domain, prior mesh and body composition, rather than ordered reflexively for a small primary umbilical hernia.",
  }, SOURCE),

  sourced({
    id: "block-rvhr-emergency-timing",
    type: "prose",
    heading: "↳ When it cannot wait",
    text: "Repair is emergent when strangulation is suspected. Systemic inflammatory response, contrast CT findings, and a rising lactate, creatine kinase or D-dimer are the markers that predict it.",
  }, WSES),

  sourced({
    id: "block-rvhr-setup",
    type: "bullets",
    heading: "Anaesthesia and setup",
    items: [
      "General anaesthesia with full neuromuscular blockade, supine. For retrorectus or eTEP work one arm is typically tucked, and a slight contralateral tilt improves exposure for lateral and incisional defects.",
      "Decompress the bladder with a Foley or a straight catheter before any lower-abdominal port goes in.",
      "Insufflate to 10 to 15 mmHg for transperitoneal work. The retrorectus and preperitoneal spaces are insufflated separately, often up to 15 to 20 mmHg to develop the plane.",
      "Step the pressure down to 4 to 8 mmHg before fascial closure — closing at working pressure adds tension the repair does not need.",
      "Risk-stratify for venous thromboembolism by Caprini or CHEST criteria: mechanical prophylaxis for essentially everyone, chemoprophylaxis with low molecular weight or subcutaneous heparin for moderate and high risk. Enhanced-recovery consensus supports heparin 5000 units preoperatively and enoxaparin 40 mg daily afterwards in normal renal function, and extended-duration prophylaxis deserves consideration after component separation or transversus abdominis release, where rates run above routine repair.",
      "Use multimodal analgesia. The extraperitoneal approaches, and minimizing or omitting mechanical fixation, are themselves analgesic decisions.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rvhr-antibiotics",
    type: "prose",
    heading: "↳ Antibiotic prophylaxis",
    text: "A single dose of a first-generation cephalosporin — cefazolin — within 60 minutes of incision for prosthetic repair. Add vancomycin, within 120 minutes, for known MRSA colonization, and substitute clindamycin or vancomycin for a beta-lactam allergy. Read the strength of this with its provenance: the evidence base is open repair, and surgical site infection in modern robotic retromuscular series runs under 5 per cent.",
  }, SAGES),

  sourced({
    id: "block-rvhr-anatomy",
    type: "bullets",
    heading: "Anatomy and landmarks",
    items: [
      "The anterolateral wall layers, superficial to deep: skin and subcutaneous fat, anterior rectus sheath, rectus abdominis, posterior rectus sheath, transversalis fascia, preperitoneal fat, peritoneum. The three flat muscles — external oblique, internal oblique and transversus abdominis — contribute the sheath laterally.",
      "**Linea alba**: the midline raphe and the target of anterior fascial reconstruction. Losing it during crossover is how an iatrogenic incision into the anterior sheath, and a new hernia, get made.",
      "**Linea semilunaris**: the lateral border of the rectus sheath and the lateral limit of retrorectus dissection.",
      "**Arcuate line of Douglas**: below it there is no posterior sheath, only transversalis fascia and peritoneum, and the preperitoneal plane carries caudally toward the space of Retzius.",
      "**Falciform and umbilical ligaments**: crossover in eTEP passes superficial to them, which is what keeps the peritoneum intact.",
      "**Neurovascular bundles**: the segmental T7 to T12 intercostal nerves and their perforators enter the rectus posterolaterally near the semilunar line, and the superior and inferior epigastric vessels run within and behind the muscle.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rvhr-borders",
    type: "bullets",
    heading: "↳ Safe dissection borders",
    items: [
      "Stay on the posterior rectus sheath in a retromuscular repair, hug the anterior sheath and the diastatic midline when taking down the sac, and keep a clean preperitoneal plane in rTAPP.",
      "Stay off everything lateral to the linea semilunaris, which is where the bundles live.",
      "Stay off the anterior rectus sheath during crossover — identify the midline along its full length first.",
      "Keep energy away from the sac. Bowel may sit immediately deep to a thin peritoneal or posterior sheath layer, so assume it is there.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rvhr-flow",
    type: "flow",
    heading: "Operative flow: retromuscular eTEP Rives-Stoppa",
    nodes: [
      { id: "access", label: "Access and port placement", tone: "default" },
      { id: "dock", label: "Dock the robot", tone: "default" },
      { id: "ipsi", label: "Dissect the ipsilateral retrorectus space", tone: "default" },
      { id: "midline", label: "Midline identified along its full length?", tone: "default" },
      { id: "define", label: "Define it before going further", tone: "caution" },
      { id: "cross", label: "Cross over superficial to the falciform, preserving the peritoneal bridge", tone: "caution" },
      { id: "sac", label: "Reduce the sac and close posterior defects", tone: "default" },
      { id: "lower", label: "Drop the pressure to 4 to 8 mmHg", tone: "default" },
      { id: "closure", label: "Reconstruct the midline with running barbed suture", tone: "default" },
      { id: "mesh", label: "Deploy flat mesh with at least 5 cm overlap", tone: "default" },
      { id: "desufflate", label: "Stepwise desufflation, smoothing the mesh flat", tone: "default" },
      { id: "exit", label: "Undock and close", tone: "good" },
    ],
    edges: [
      { from: "access", to: "dock" },
      { from: "dock", to: "ipsi" },
      { from: "ipsi", to: "midline" },
      { from: "midline", to: "define", label: "No" },
      { from: "midline", to: "cross", label: "Yes" },
      { from: "define", to: "cross" },
      { from: "cross", to: "sac" },
      { from: "sac", to: "lower" },
      { from: "lower", to: "closure" },
      { from: "closure", to: "mesh" },
      { from: "mesh", to: "desufflate" },
      { from: "desufflate", to: "exit" },
    ],
  }, SOURCE),

  sourced({
    id: "block-rvhr-technique",
    type: "sequence",
    heading: "Step by step",
    steps: [
      { title: "Access", detail: "For the transperitoneal variants, enter with an optical trocar in an upper quadrant or at Palmer's point and insufflate to 10 to 15 mmHg. For eTEP, enter the retrorectus space directly with an optical trocar placed subcostally in the mid-rectus and pneumo-dissect the space. Mapping the linea semilunaris with ultrasound beforehand helps keep that entry off the lateral edge. The pitfall is peritoneal entry during eTEP access, which collapses the working space — place a 5 mm intraperitoneal port, desufflate the abdomen, and the retrorectus space comes back." },
      { title: "Ports and docking", detail: "Three robotic 8 mm trocars, sometimes a fourth, with one upsized to 12 mm for mesh and suture. Space them 6 to 8 cm apart and at least 2 cm off the costal margin and the anterior superior iliac spine. Retromuscular work wants them along or just inside the semilunar line; preperitoneal and release work wants a contralateral vertical line. The pitfall is spacing: too far apart and the instruments collide at the top and bottom of the field, too close and triangulation disappears." },
      { title: "Adhesiolysis and reduction", detail: "Lyse sharply and bluntly with minimal energy and reduce the sac contents. Open an incisional sac and inspect what is in it before any energy is applied. The pitfall is thermal injury to bowel adherent to the sac, which is why the cautery bursts stay short and low-wattage." },
      { title: "Develop the plane", detail: "For rIPOM+, stay intraperitoneal and clear 5 cm circumferentially around the defect. For rTAPP, incise the peritoneum, raise a preperitoneal flap and expose the defect. For a retromuscular repair, incise the posterior rectus sheath just medial to the semilunar line, develop the space out to that line, then cross the midline superficial to the falciform and umbilical ligaments into the contralateral space, preserving a peritoneal bridge. The pitfall is crossing over before the midline has been identified along its length, which cuts the anterior sheath and creates the hernia you came to fix." },
      { title: "Close the posterior layer and the defect", detail: "Close peritoneal and posterior sheath defects with absorbable barbed suture, 2-0 or 3-0. Then reconstruct the midline with a running 0 barbed suture at a reduced pressure of 4 to 8 mmHg, taking bites and travel of roughly 8 to 10 mm; a corset technique distributes the tension and keeps the fascia from tearing. In an eTEP without a myofascial release the posterior sheath is often deliberately left unapproximated, relying on the peritoneal bridge, because forcing it closed buys tension and a route to internal herniation." },
      { title: "Mesh and fixation", detail: "Extraperitoneal planes take an uncoated macroporous polypropylene or polyester mesh, which ingrows in a well-vascularized bed and never sees bowel. An intraperitoneal position takes a barrier-coated or composite mesh. Overlap is at least 5 cm circumferentially beyond the defect, and multiple defects are summed rather than treated separately for that calculation. Retromuscular mesh usually needs minimal or no fixation — the space and the intra-abdominal pressure hold it, and leaving fixation out reduces pain. Intraperitoneal and preperitoneal mesh is secured with a circumferential running barbed absorbable suture, with or without transfascial sutures. The pitfall is a barbed suture tail left loose in the abdomen, which causes small bowel obstruction." },
      { title: "Closure", detail: "Desufflate in steps, from 15 to 8 to 4 to 2 mmHg, smoothing the mesh flat as the pressure falls so it does not wrinkle or shift. A retromuscular drain is selective, for large dissections and transversus abdominis release, and comes out when output falls below about 30 mL a day. Close fascial incisions over 10 mm, close skin with absorbable suture, and send the patient out in a binder with activity restrictions." },
    ],
  }, SOURCE),

  sourced({
    id: "block-rvhr-fixation-evidence",
    type: "warning",
    heading: "↳ Fixation: the evidence does not converge",
    tone: "pearl",
    text: "Do not read the fixation literature as settled. A randomized trial of tack devices was stopped early when one mesh and tack combination recurred at 20 per cent against none in the other. In umbilical hernia, a randomized comparison of fibrin glue against tacks found more recurrence with glue, 26 against 6 per cent, a difference that did not reach significance and that tracked defect size more strongly than it tracked the fixation method. The usable conclusion is that the size of the defect and the overlap of the mesh outrank the choice of fixation device, and that a retromuscular repair sidesteps the question by needing almost none.",
  }, SOURCE),

  sourced({
    id: "block-rvhr-variants",
    type: "table",
    heading: "Variant approaches",
    columns: ["Approach", "Mesh plane and key steps", "Best for", "Cautions", "Advantage"],
    rows: [
      ["rIPOM+", "Coated mesh intraperitoneal, defect closed, circumferential suture fixation", "Smaller defects, a hostile retrorectus plane, unsalvageable peritoneum", "Commits the patient to intraperitoneal mesh at any future operation", "Technically the simplest robotic option, with reliable defect closure"],
      ["rTAPP", "Peritoneal flap raised, preperitoneal mesh, flap closed over it", "Small to medium umbilical and midline defects", "Needs an intact peritoneal flap to work", "Keeps the mesh extraperitoneal for a modest dissection"],
      ["Robotic Rives-Stoppa", "Retromuscular mesh, posterior sheath entered medially", "Medium midline defects, and diastasis", "Needs enough retrorectus width to reach the overlap", "Extraperitoneal plane, minimal fixation, less pain"],
      ["eTEP", "Direct retrorectus entry with crossover into both retromuscular spaces", "Midline primary and incisional defects, diastasis, avoiding the peritoneum", "Learning-curve dependent, with anterior sheath injury the early-crossover failure", "Large mesh without peritoneal violation, and low conversion"],
      ["Robotic transversus abdominis release", "Posterior component separation with wide retromuscular mesh", "Large or wide defects, loss of domain, lateral and flank hernias", "Higher venous thromboembolism risk, and unnecessary for a small defect", "Makes tension-free closure of a large defect possible"],
      ["Robotic endoscopic onlay", "Subcutaneous onlay mesh over a plicated diastasis and the defect", "Diastasis recti alongside a small ventral hernia", "The onlay position has historically carried more infection", "Treats the diastasis and the cosmetic complaint together"],
    ],
  }, SOURCE),

  sourced({
    id: "block-rvhr-protection",
    type: "table",
    heading: "Critical structure protection",
    columns: ["Structure", "Where it is", "Consequence of injury", "How to protect it"],
    rows: [
      ["Rectus neurovascular bundles", "Entering posterolaterally at the semilunar line, standing up as lampposts under insufflation", "Rectus denervation and atrophy, then lateral bulge", "Stop the dissection medial to them; in a release, divide transversus medial to them"],
      ["Superior and inferior epigastric vessels", "Within and behind the rectus, medial to the bundles", "Haemorrhage and rectus sheath haematoma", "Identify and preserve them through the retromuscular dissection"],
      ["Linea semilunaris", "The lateral border of the rectus sheath", "Iatrogenic lateral hernia and denervation", "Treat it as the absolute lateral limit of dissection"],
      ["Anterior rectus sheath", "The midline, obscured at the moment of crossover", "A new iatrogenic ventral hernia", "Identify the midline fully, and dissect the ipsilateral space first"],
      ["Small bowel", "Immediately deep to the peritoneum and posterior sheath", "Enterotomy, delayed perforation, fistula", "Short low-energy bursts, separate the layers, and assume bowel is beneath"],
      ["Bladder", "The space of Retzius, on any caudal dissection", "Cystotomy", "Decompress it before starting and dissect the preperitoneal plane deliberately"],
    ],
  }, SOURCE),

  sourced({
    id: "block-rvhr-scenarios",
    type: "bullets",
    heading: "Special scenarios",
    items: [
      "Incarcerated without strangulation: a robotic repair is increasingly reasonable with careful reduction, adhesiolysis and at least 5 cm of overlap, provided the field stays uncontaminated. Open repair remains preferable when resection looks likely.",
      "Strangulation, resection or contamination: go open, deal with the bowel first, and close primarily or use a biologic or absorbable mesh. The sicker the patient, the simpler the repair.",
      "Reoperative field with prior mesh: read the old operative notes, get a CT to define what mesh is where and how much domain is lost, and pick the plane around dense adhesions rather than discovering them.",
      "Loss of domain: add a transversus abdominis release, and consider preoperative botulinum toxin or progressive pneumoperitoneum. Flank and transplant hernias under tension take a heavyweight polypropylene.",
      "Cirrhosis with ascites: optimize first, favour a primary repair over mesh in an emergency, and convert an emergent operation into a semi-urgent one whenever that is safe.",
      "Bailout: if the extraperitoneal plane is lost or the peritoneum is widely violated, salvage with an intraperitoneal coated mesh. If progress is not safe, convert to open.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rvhr-complications",
    type: "bullets",
    heading: "Complications and emergency response",
    items: [
      "Enterotomy during adhesiolysis: repair it primarily, and reconsider synthetic mesh or stage the repair if contamination is gross rather than limited.",
      "Loss of the working space in eTEP: place a 5 mm intraperitoneal port, desufflate the abdomen, and re-establish the retrorectus space.",
      "Seroma, the commonest complication at roughly 4 to 5 per cent: manage it conservatively and aspirate only for symptoms or persistence. Closing the defect rather than bridging it is what reduces seroma in the first place.",
      "Rectus sheath haematoma: it can bring the patient back for readmission or transfusion, and occasionally for drainage.",
      "Early small bowel obstruction after an intraperitoneal or preperitoneal repair: think of an exposed or loose barbed suture and keep the threshold for imaging and re-exploration low.",
      "Surgical site and mesh infection, 1 to 8 per cent overall and 1 to 2 per cent with minimally invasive repair: culture, target the antibiotics, drain collections percutaneously, and use negative-pressure therapy on an open wound. Uncontrolled diabetes, obesity, smoking, steroids, an intraoperative bowel injury and an onlay position are the risk factors.",
      "Recurrence: it comes from inadequate overlap, missed defects and a closure under too much tension — at least 5 cm of overlap and a securely reconstructed midline are what prevent it.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rvhr-salvage",
    type: "prose",
    heading: "↳ Salvage or explant an infected mesh",
    text: "The material and the position decide this, not the severity of the infection. Macroporous polypropylene was salvaged in about 65 per cent of cases overall and 72 per cent when it sat extraperitoneally, managed with drainage and negative-pressure therapy. Composite, PTFE, multifilament polyester, microporous polypropylene and any intraperitoneal mesh nearly always come out. Closing the defect after explant lowers the recurrence that follows.",
  }, SOURCE),

  references("block-rvhr-references", [SOURCE, EHS, SAGES, WSES]),
];

export const roboticVentralUmbilicalHerniaRepairPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000010",
  slug: "robotic-ventral-umbilical-hernia-repair",
  title: "Robotic Ventral & Umbilical Hernia Repair",
  aliases: ["rIPOM", "eTEP", "robotic ventral hernia repair", "robotic umbilical hernia repair", "robotic Rives-Stoppa", "TARM", "extended totally extraperitoneal repair", "robotic hernia mesh repair"],
  procedureId: "robotic_ventral_umbilical_hernia_repair",
  approach: "robotic",
  specialty: "Hernia",
  tags: ["hernia", "ventral", "umbilical", "incisional", "robotic", "minimally invasive", "mesh"],
  sourceId: SOURCE,
  additionalSourceIds: [EHS, SAGES, WSES],
  relatedTopicSlugs: ["umbilical-and-epigastric-hernia", "ventral-and-incisional-hernia", "abdominal-wall-reconstruction"],
  blocks,
  reviewedAt: "2026-09-13T00:00:00.000Z",
});
