import { buildPlaybook, references, sourced } from "@/content/authoring";
import {
  ROBOTIC_CHOLECYSTECTOMY_PLAYBOOK_SOURCE as SOURCE,
  SAGES_SAFE_CHOLECYSTECTOMY_SOURCE as SAGES,
  WSES_ACUTE_CALCULOUS_CHOLECYSTITIS_2020_SOURCE as WSES,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-robochole-summary",
    type: "summary",
    heading: "At a glance",
    text: "Bile duct injury is caused by anatomic misperception, not by the instrument holding the hook. The robot buys magnified 3D vision, wristed dissection in an inflamed plane, and a third arm that replaces the assistant — it buys nothing at all in the way of permission to skip the critical view of safety. Every safety obligation of a laparoscopic cholecystectomy survives the platform change intact.",
  }, SOURCE),

  sourced({
    id: "block-robochole-evidence",
    type: "warning",
    heading: "The injury data are genuinely contested",
    tone: "danger",
    text: "Two bodies of evidence point opposite ways and neither is dismissible. National Medicare analyses found the robotic approach associated with roughly threefold higher bile duct injury requiring operative repair, 0.7 against 0.2 per cent, from 2010 to 2019, with about a twofold difference persisting through 2020 to 2023. Against that, a severity-adjusted 23,513-patient health-system study found lower adjusted odds of injury in acute cholecystitis, odds ratio 0.29, alongside lower conversion, readmission and mortality, and a single-centre costing study found no robotic injuries at all. The practical reading: the platform does not prevent bile duct injury and may not forgive the habits that cause it.",
  }, SOURCE),

  sourced({
    id: "block-robochole-indications",
    type: "bullets",
    heading: "Indications — unchanged by the platform",
    items: [
      "Symptomatic cholelithiasis, biliary colic, chronic cholecystitis.",
      "Acute cholecystitis, operated early rather than at an interval.",
      "Gallstone pancreatitis, on the same admission or at an interval.",
      "Symptomatic gallbladder polyps and biliary dyskinesia.",
      "Porcelain gallbladder, for the malignancy risk.",
    ],
  }, SOURCE),

  sourced({
    id: "block-robochole-timing",
    type: "prose",
    heading: "↳ Timing in acute cholecystitis",
    text: "Operate as soon as possible rather than waiting for the inflammation to settle: the WSES position is early laparoscopic cholecystectomy, preferably within 7 days of hospital admission and within 10 days of symptom onset. Where a cholecystostomy tube was placed because the patient was unfit, plan an interval cholecystectomy once they are optimized.",
  }, WSES),

  sourced({
    id: "block-robochole-selection",
    type: "bullets",
    heading: "↳ Who benefits most from the robotic approach",
    items: [
      "Class 3 obesity, where visualization and ergonomics degrade fastest laparoscopically.",
      "Severe cholecystitis, complex or aberrant anatomy.",
      "Extensive prior abdominal surgery requiring adhesiolysis.",
      "Cirrhosis with portal hypertension.",
      "Cholecystoenteric fistula, a prior cholecystostomy tube, or a previously aborted cholecystectomy.",
      "Limited cardiopulmonary reserve, because the platform tolerates lower insufflation pressures.",
    ],
  }, SOURCE),

  sourced({
    id: "block-robochole-contraindications",
    type: "bullets",
    heading: "↳ When not to proceed",
    items: [
      "Suspected gallbladder carcinoma requiring an oncologic resection — do not do a routine cholecystectomy.",
      "Inability to tolerate pneumoperitoneum or general anaesthesia, or uncorrected coagulopathy.",
      "At-risk conditions such as a scleroatrophic gallbladder or Mirizzi syndrome demand an exhaustive preoperative workup before the risk-benefit balance is settled.",
      "When the critical view cannot be achieved in a hostile field, the correct move is a bailout or finishing by a safe method — not forcing the dissection.",
      "Single-port specific: a higher port-site hernia rate than multiport repair in several series, and moderate-to-severe acute cholecystitis was an exclusion in the largest single-port safety series.",
    ],
  }, SOURCE),

  sourced({
    id: "block-robochole-workup",
    type: "bullets",
    heading: "Imaging and risk stratification",
    items: [
      "Right upper quadrant ultrasound first: wall thickening, pericholecystic fluid, stones, duct diameter.",
      "Magnetic resonance cholangiopancreatography, endoscopic cholangiography, or an intraoperative cholangiogram where choledocholithiasis is suspected — a dilated duct, abnormal liver tests, or prior pancreatitis.",
      "Grade acute cholecystitis with the Tokyo criteria preoperatively and with the Parkland system intraoperatively; both higher grades predict a difficult operation and a higher injury risk.",
      "The CholeS score predicts operative time for an elective case and helps scheduling, but is not for emergency or planned open operations.",
    ],
  }, SOURCE),

  sourced({
    id: "block-robochole-setup",
    type: "bullets",
    heading: "Anaesthesia and setup",
    items: [
      "General endotracheal anaesthesia with full relaxation, an orogastric tube to decompress the stomach, and a urinary catheter for a prolonged case or an anticipated large-stone extraction.",
      "Supine with arms tucked as the platform requires, secured to the table for tilt.",
      "Reverse Trendelenburg 10 to 20 degrees with slight lateral tilt drops the colon and duodenum away from the porta and lets liver and omentum fall clear.",
      "Prep nipples to pubis and flank to flank, so conversion to open and a low extraction incision are both available.",
      "A single preoperative dose of a first-generation cephalosporin within 60 minutes of incision. Routine antibiotics are not required for an uncomplicated elective case but are standard for acute or complicated disease.",
      "Mechanical venous thromboembolism prophylaxis for everyone, with pharmacologic prophylaxis added on individual risk assessment.",
      "Keep laparoscopic clip appliers and instruments at the bedside — a docked robot delays any rapid response, so anticipate what you might need before you need it.",
    ],
  }, SOURCE),

  sourced({
    id: "block-robochole-icg",
    type: "prose",
    heading: "↳ Indocyanine green fluorescence",
    text: "Near-infrared cholangiography is integrated on most robotic platforms and genuinely helps identify biliary anatomy when the view is uncertain. It is a promising adjunct rather than an established one — routine use to reduce bile duct injury is not yet formally recommended, and it does not substitute for the critical view.",
  }, WSES),

  sourced({
    id: "block-robochole-triangle",
    type: "bullets",
    heading: "The hepatocystic triangle",
    items: [
      "Borders: the common hepatic duct medially, the cystic duct caudally, and the inferior edge of the liver superiorly.",
      "Contents: the cystic artery, the cystic lymph node of Lund, and connective and fatty tissue. The right hepatic artery may loop into this space.",
      "The cystic artery typically lies just deep and posterior to the node of Lund, which is why the node is a landmark rather than an obstacle.",
      "This is not Calot's original triangle, which had the cystic artery as its superior border. The modern hepatocystic triangle is the space the operation actually works in.",
    ],
  }, SOURCE),

  sourced({
    id: "block-robochole-bsafe",
    type: "bullets",
    heading: "↳ B-SAFE: the five landmarks to find before dividing anything",
    items: [
      "Bile duct — the common duct itself, running toward the liver rather than the gallbladder.",
      "Sulcus of Rouvière, also called the fissure of Gans, whose plane separates a generally safe anterior zone from a dangerous posterior one. Keep the dissection ventral to it.",
      "Artery — the hepatic arterial pulsation at the hepatoduodenal ligament.",
      "Fissure — the umbilical fissure, marking the left hepatic artery and the plane of the left lobe.",
      "Enteric structures — the duodenum, sitting inferomedially and closer than it looks.",
    ],
  }, SAGES),

  sourced({
    id: "block-robochole-cvs",
    type: "bullets",
    heading: "↳ The critical view of safety: all three, every time",
    items: [
      "The hepatocystic triangle is cleared of all fat and fibrous tissue — note that the common bile duct itself need not be exposed to satisfy this.",
      "The lower one-third of the gallbladder is separated off the cystic plate.",
      "Only two structures are seen entering the gallbladder: the cystic duct and the cystic artery.",
    ],
  }, SAGES),

  sourced({
    id: "block-robochole-borders",
    type: "bullets",
    heading: "↳ Safe dissection borders",
    items: [
      "Stay on the gallbladder wall and the cystic plate, keeping the dissection high on the gallbladder and infundibulum and hugging the organ.",
      "Stay off the common hepatic and common bile ducts, off the porta hepatis, and off any tubular structure running toward the liver rather than toward the gallbladder.",
      "Leave the node of Lund intact: it protects the proximal cystic artery and keeps the dissection out of the trapezoid where the common hepatic duct, right hepatic duct and right hepatic artery all live.",
      "Expect variation. Vascular variants occur in roughly 25 per cent of cases, and when a third structure appears it is most often an arterial variant such as a double or aberrant cystic artery. Reconcile it against the critical view rather than assuming standard anatomy.",
    ],
  }, SOURCE),

  sourced({
    id: "block-robochole-flow",
    type: "flow",
    heading: "Operative flow",
    nodes: [
      { id: "access", label: "Access, ports, dock, inspect", tone: "default" },
      { id: "retract", label: "Fundus cephalad, infundibulum lateral", tone: "default" },
      { id: "dissect", label: "Open the hepatocystic triangle low and laterally", tone: "default" },
      { id: "cvs", label: "Critical view achieved?", tone: "default" },
      { id: "adjunct", label: "Add fluorescence or a cholangiogram", tone: "caution" },
      { id: "hostile", label: "Field still hostile after the adjunct?", tone: "default" },
      { id: "bailout", label: "Subtotal cholecystectomy or convert", tone: "caution" },
      { id: "pause", label: "Momentary pause before clipping", tone: "default" },
      { id: "divide", label: "Clip and divide the cystic duct and artery", tone: "default" },
      { id: "plate", label: "Take the gallbladder off the cystic plate", tone: "default" },
      { id: "extract", label: "Bag, extract, retrieve spilled stones, close fascia", tone: "good" },
    ],
    edges: [
      { from: "access", to: "retract" },
      { from: "retract", to: "dissect" },
      { from: "dissect", to: "cvs" },
      { from: "cvs", to: "pause", label: "Yes" },
      { from: "cvs", to: "adjunct", label: "No" },
      { from: "adjunct", to: "hostile" },
      { from: "hostile", to: "bailout", label: "Yes" },
      { from: "hostile", to: "pause", label: "No" },
      { from: "pause", to: "divide" },
      { from: "divide", to: "plate" },
      { from: "plate", to: "extract" },
      { from: "bailout", to: "extract" },
    ],
  }, SOURCE),

  sourced({
    id: "block-robochole-technique",
    type: "sequence",
    heading: "Step by step",
    steps: [
      { title: "Access and port placement", detail: "Umbilical entry by open Hasson or Veress with a 12 mm port for the camera and assistant, then three 8 mm robotic trocars under direct vision — typically two in the right hemiabdomen and one in the left upper quadrant, though layouts differ by platform. Space ports at least 8 cm apart to reduce external arm clash, and target the operative field before docking. The pitfall is a trocar injury to viscera or vessels: confirm no iatrogenic injury on camera insertion before going further." },
      { title: "Exposure", detail: "Retract the fundus cephalad toward the right shoulder and the infundibulum laterally and inferolaterally to open the triangle, alternating anterior and posterior infundibular traction to expose both peritoneal leaves. On a multiport robot the third arm holds the fundus, which removes the assistant from the equation. The pitfall is over-cephalad traction on the infundibulum, which aligns the cystic duct with the common duct and tents the common duct up into the position of the cystic — a classic injury mechanism." },
      { title: "Open the hepatocystic triangle", detail: "Divide the anterior then posterior peritoneum low on the gallbladder, dissecting bluntly and in graded fashion with a monopolar hook or wristed instruments. Identify the node of Lund, knowing the cystic artery lies just behind it, and start laterally where it is safest. The pitfall is the robot's absent haptic feedback — judge tension by sight alone, or avulse the cystic artery and tear the gallbladder." },
      { title: "Achieve and confirm the critical view", detail: "Clear all fat and fibrous tissue, expose the lower third of the cystic plate, and confirm that exactly two structures enter the gallbladder, viewing from both anterior and posterior. Take a deliberate pause before any clip goes on. The pitfall is declaring the critical view in the face of unrecognized aberrant anatomy: fewer or more than two structures means stop and reassess, not proceed carefully." },
      { title: "Clip and divide", detail: "Two clips on the stay side and one on the gallbladder side of both the cystic duct and the cystic artery, then divide. Milk the cystic duct for stones before clipping, skeletonize before clipping, and leave an adequate stump. The pitfall is clipping across a wide or short cystic duct, or across part of the common duct — if the duct is too wide for a clip, use an endoloop or a suture ligature." },
      { title: "Take the gallbladder and close", detail: "Dissect off the cystic plate with cautery, secure haemostasis in the liver bed, bag the gallbladder and extract it through the umbilical port, then irrigate and retrieve any spilled stones and bile, because retained stones form intra-abdominal abscesses. The pitfall is leaving a fascial defect at the extraction site: close the fascia at the 12 mm port and at any enlarged port." },
    ],
  }, SOURCE),

  sourced({
    id: "block-robochole-singleport",
    type: "bullets",
    heading: "The single-port variation",
    items: [
      "A transumbilical incision of roughly 2 to 2.5 cm takes a single multichannel port carrying a flexible 3D scope and three double-jointed wristed instruments, all operator-controlled with no assistant needed for traction.",
      "The dissection sequence and the critical view requirements are identical to the multiport operation.",
      "The umbilical incision doubles as the extraction site, which helps with a stone-laden gallbladder.",
      "A series of more than 600 cases reported consistently shorter operative time and length of stay than multiport or single-site robotic surgery, with a mean operative time of 56 against 80 minutes.",
    ],
  }, SOURCE),

  sourced({
    id: "block-robochole-variants",
    type: "table",
    heading: "Variant approaches",
    columns: ["Approach", "Key steps", "Indications", "Cautions", "Advantages"],
    rows: [
      ["Multiport robotic", "Four ports, robot arms both retract and dissect, critical view, clip and divide", "Standard robotic case; obesity, inflamed or adhesive fields", "Cost, longer operative time, and the unresolved injury signal", "Wristed 3D dissection with low conversion"],
      ["Single-port robotic", "One umbilical port with three wristed instruments and a flexible scope", "Elective benign disease where cosmesis matters", "Higher port-site hernia in some data; severe acute disease often excluded", "Shortest operative time and stay, less early pain, one hidden scar"],
      ["Robotic single-site", "Curved cannulae with two working arms and no wrist", "Selected elective cases", "No wristed articulation and difficult docking; largely superseded", "Less pain than a single-incision laparoscopic approach"],
      ["Multiport laparoscopic", "Four laparoscopic ports with the critical view", "The reference standard for all comers", "None specific", "Lowest cost and the lowest bile duct injury rate in national data"],
      ["Single-incision laparoscopic", "One umbilical multichannel port with straight instruments", "Cosmesis", "Steep learning curve and a higher hernia rate", "A single scar"],
      ["Artery-first", "Divide a conclusively identified cystic artery before the full critical view", "A short or high cystic artery preventing a safe view", "Only when the artery is conclusively identified", "Enables exposure in anatomy that otherwise blocks it"],
    ],
  }, SOURCE),

  sourced({
    id: "block-robochole-scenarios",
    type: "bullets",
    heading: "Special scenarios",
    items: [
      "Severely inflamed gallbladder or Mirizzi syndrome: start lateral and blunt, anchor on the node of Lund and the sulcus of Rouvière, and use fluorescence or cholangiography liberally. If the critical view will not come, bail out to a fenestrating or reconstituting subtotal cholecystectomy rather than forcing the dissection.",
      "Large stone or porcelain gallbladder: retraction is the real problem — push the gallbladder ventrolaterally using the stone itself rather than grasping the fundus, consider early cystic artery division to straighten the infundibulum, and plan a Pfannenstiel extraction for a large specimen.",
      "Reoperative or hostile anatomy after prior pancreatic or upper gastrointestinal surgery: diagnostic laparoscopy first to exclude occult disease, then meticulous adhesiolysis before any biliary dissection. Recurrent inflammation may have obliterated the cystic artery entirely.",
      "Suspected bile duct injury during the operation: stop, obtain a cholangiogram, and involve or refer to a hepatobiliary surgeon. Do not attempt a definitive repair without that expertise.",
    ],
  }, SOURCE),

  sourced({
    id: "block-robochole-sages-steps",
    type: "bullets",
    heading: "↳ The six-step safety framework, which is platform-independent",
    items: [
      "Use the critical view of safety.",
      "Anticipate aberrant anatomy rather than assuming it is standard.",
      "Use cholangiography and other imaging liberally.",
      "Pause before dividing any ductal structure.",
      "Recognize the danger zone, stop, and finish by a safe method if needed.",
      "Get help from another surgeon in difficult conditions.",
    ],
  }, SAGES),

  sourced({
    id: "block-robochole-protection",
    type: "table",
    heading: "Critical structure protection",
    columns: ["Structure", "Landmark and course", "Complication if injured", "Prevention pearl"],
    rows: [
      ["Common bile and hepatic ducts", "Medial border of the hepatocystic triangle, running toward the liver not the gallbladder", "Major bile duct injury, stricture, and a hepaticojejunostomy", "Divide nothing until the critical view is achieved, and avoid the cephalad traction that tents the duct"],
      ["Right hepatic artery", "May loop as a caterpillar hump into the triangle behind the node of Lund", "Haemorrhage, hepatic ischaemia, and an associated duct injury", "Leave the node of Lund intact and confirm that any artery enters the gallbladder"],
      ["Cystic artery and its posterior branch", "Deep to the node of Lund, anterior to the cystic duct", "Bleeding that obscures the field, then misperception, then duct injury", "Skeletonize it, confirm it enters the gallbladder, and look for a second branch"],
      ["Subvesical and accessory right hepatic ducts", "Crossing the cystic plate, with variant insertions in about 7.4 per cent", "Postoperative bile leak", "Cauterize the cystic plate carefully and image when uncertain"],
      ["Duodenum and hepatic flexure", "Enteric structures inferomedial to the gallbladder", "Thermal or mechanical perforation", "Use reverse Trendelenburg and tilt to drop the viscera, and keep cautery controlled"],
    ],
  }, SOURCE),

  sourced({
    id: "block-robochole-pitfalls",
    type: "bullets",
    heading: "Intraoperative pitfalls",
    items: [
      "Mistaking the common duct for the cystic duct is the dominant injury mechanism: enforce the critical view, pause before clipping, image when anatomy is unclear, and when in doubt do not divide.",
      "Cystic artery bleeding: never clip or cauterize blindly near the porta. Apply pressure, restore exposure, then clip precisely — and remember you are judging tension by vision alone.",
      "Losing the critical view in inflammation: convert to a subtotal cholecystectomy or to open. Conversion is a sound decision, not a failure.",
      "Gallbladder perforation with spilled stones: suction the bile and retrieve every stone with a bag and irrigation, or accept a future abscess.",
      "Major haemorrhage with the robot docked: be ready to undock rapidly and convert, with open and laparoscopic instruments immediately available.",
    ],
  }, SOURCE),

  sourced({
    id: "block-robochole-postop",
    type: "bullets",
    heading: "↳ Postoperative emergencies",
    items: [
      "Bile leak or biloma from the cystic stump or a duct of Luschka: right upper quadrant pain, fever and bilious drain output — check liver tests and image, then treat with endoscopic sphincterotomy with or without a stent, and percutaneous drainage of the collection.",
      "Major bile duct injury recognized after the fact as jaundice, sepsis or biloma: resuscitate, control sepsis, drain collections and image, then refer to a hepatobiliary surgeon, because a Roux-en-Y hepaticojejunostomy is often required.",
      "Retained common duct stone or postoperative pancreatitis: liver tests, lipase and imaging, then endoscopic stone extraction.",
      "Postoperative haemorrhage from a slipped cystic artery clip: resuscitate, type and cross, follow serial haemoglobin, then CT angiography with embolization or reoperation.",
      "Port-site or incisional hernia, higher after single-incision and single-port than multiport surgery: prevent by closing the fascia at extraction and 12 mm sites, and repair electively.",
      "Surgical site infection or a retained-stone abscess: examine and image, then antibiotics and percutaneous drainage.",
    ],
  }, SOURCE),

  references("block-robochole-references", [SOURCE, SAGES, WSES]),
];

export const roboticCholecystectomyPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000007",
  slug: "robotic-cholecystectomy",
  title: "Robotic Cholecystectomy",
  aliases: ["Robotic chole", "Single-port cholecystectomy", "Cholecystectomy", "Critical view of safety"],
  procedureId: "robotic_cholecystectomy",
  approach: "robotic",
  specialty: "Hepatobiliary",
  tags: ["hepatobiliary", "gallbladder", "robotic", "minimally invasive", "bile duct injury"],
  sourceId: SOURCE,
  additionalSourceIds: [SAGES, WSES],
  relatedTopicSlugs: ["choledocholithiasis"],
  blocks,
  reviewedAt: "2026-09-13T00:00:00.000Z",
});
