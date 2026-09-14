import { buildPlaybook, references, sourced } from "@/content/authoring";
import {
  ASCRS_OSTOMY_2022_SOURCE as ASCRS,
  ASCRS_SAGES_ERAS_2023_SOURCE as ERAS,
  COLOSTOMY_TAKEDOWN_PLAYBOOK_SOURCE as SOURCE,
} from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-takedown-summary",
    type: "summary",
    heading: "At a glance",
    text: "Reversing the stoma is itself the most effective repair of a parastomal hernia, because it removes the fascial defect that functioning bowel passes through. The operation is therefore two operations joined: a colorectal anastomosis that has to be tension-free and well perfused, and an abdominal wall reconstruction that has to be reinforced rather than merely sutured. When the patient is a reversal candidate, takedown with trephine repair beats in-situ mesh reinforcement with the stoma left in place.",
  }, SOURCE),

  sourced({
    id: "block-takedown-indications",
    type: "bullets",
    heading: "Indications and patient selection",
    items: [
      "Fit for a high-risk colorectal anastomosis, with a usable rectal stump and no distal obstruction or recurrent unresectable malignancy. Only about 40 per cent of end colostomies are ever reversed.",
      "A symptomatic parastomal hernia in someone who is not a reversal candidate is instead an indication for in-situ mesh reinforcement — pain, bulge, appliance failure, recurrent obstruction.",
      "Incarceration with obstruction, or strangulation, is a surgical emergency rather than an elective indication.",
      "Advanced age, high ASA class and significant comorbidity are independently and negatively associated with successful reversal, and should drive selection rather than be discovered afterwards.",
      "Local malignant recurrence or dense malignant adhesions can make reversal technically impossible even when the physiologic risk is acceptable.",
      "Hostile abdomen, frozen pelvis, or a short or inaccessible rectal stump: plan for an open or transanal-assisted approach from the start.",
    ],
  }, SOURCE),

  sourced({
    id: "block-takedown-workup",
    type: "bullets",
    heading: "↳ Workup and timing",
    items: [
      "CT of abdomen and pelvis to define hernia contents and defect size, any concomitant midline incisional hernia, the remaining colon, and the stump length.",
      "Endoscopy with or without a water-soluble contrast enema of the rectal stump to exclude recurrence or stricture and to gauge stump length before committing.",
      "Stratify venous thromboembolism risk and surgical site infection risk — body mass index and peristomal skin disease both matter — preoperatively.",
      "Timing has no consensus. Reversal is commonly performed around 3 to 6 months after the index operation to let inflammation and adhesions mature, and mean intervals of about 8 months are reported.",
      "For loop-stoma closure the picture differs: early and late closure have similar major-complication and leak rates, but early closure is contraindicated after a high-risk anastomosis such as an ileal pouch or a coloanal join with coloplasty, where an interim trial was stopped for excess complications.",
      "Performance by a colorectal rather than an acute care surgeon is associated with lower leak risk; elevated body mass index and male sex raise it.",
    ],
  }, SOURCE),

  sourced({
    id: "block-takedown-setup",
    type: "bullets",
    heading: "Anaesthesia and setup",
    items: [
      "General anaesthesia in modified lithotomy, so the circular stapler and the rectal stump are both reachable transanally. Tuck the arms if a minimally invasive approach is planned.",
      "Prep widely from nipples to pubis and out to the table.",
      "Isolate the stoma before prepping the field: suture the mucosa closed and cover it with an adhesive drape or iodine-soaked gauze. Contamination control starts here, not at closure.",
      "Consider preoperative ureteric stents where a difficult pelvic or retroperitoneal dissection is anticipated.",
      "Goal-directed euvolaemia, active warming, opioid-sparing multimodal analgesia, and early catheter removal.",
    ],
  }, SOURCE),

  sourced({
    id: "block-takedown-prophylaxis",
    type: "bullets",
    heading: "↳ Antimicrobial and thromboembolic prophylaxis",
    items: [
      "Cefazolin 2 g intravenously, or 3 g above 120 kg, plus metronidazole 500 mg within 60 minutes of incision, redosed for a long case or significant blood loss.",
      "Pharmacologic prophylaxis with low molecular weight or low-dose unfractionated heparin plus mechanical compression for moderate-to-high-risk colorectal patients without a high bleeding risk; preoperative heparin with compression before induction is typical.",
      "Extended 28-day prophylaxis after a high-risk cancer resection. Low molecular weight heparin has the strongest evidence and rivaroxaban is a validated oral alternative.",
    ],
  }, ERAS),

  sourced({
    id: "block-takedown-bowel-prep",
    type: "warning",
    heading: "Bowel preparation: the two continents disagree",
    tone: "pearl",
    text: "North American guidance recommends mechanical bowel preparation combined with oral antibiotics, reporting surgical site infection of 7.2 against 16.0 per cent versus mechanical preparation alone, with neomycin and metronidazole the afternoon and evening before as a common regimen. European enhanced-recovery societies lean toward no mechanical preparation, treating oral antibiotics alone as acceptable — and the Cochrane review supports both halves of that: combined preparation beats mechanical preparation alone, but differs little from oral antibiotics alone. Institutional protocol governs; what is not defensible is mechanical preparation without oral antibiotics.",
  }, SOURCE),

  sourced({
    id: "block-takedown-anatomy",
    type: "bullets",
    heading: "Anatomy: perfusion, the ureter and the pelvis",
    items: [
      "The inferior mesenteric artery gives the left colic, which feeds the marginal artery of Drummond and the arc of Riolan supplying the descending and sigmoid colon. Reaching the pelvis may require a proximal ligation of the inferior mesenteric or left colic vessels while preserving the marginal artery.",
      "Splenic flexure and transverse mobilization as far as the duodenojejunal flexure is often what tension-free reach actually costs.",
      "The left ureter crosses the pelvic brim near the common iliac bifurcation, medial to the gonadal vessels, and is at greatest risk during sigmoid and mesenteric mobilization and during stump identification. Identify it before dividing the mesentery, not after.",
      "Find the Hartmann stump transanally with a dilator, a stapler sizer, a sigmoidoscope light, or a bougie rather than searching for it blindly from above.",
      "Below the peritoneal reflection lie the hypogastric nerves, and anteriorly the bladder, vagina, prostate and seminal vesicles.",
    ],
  }, SOURCE),

  sourced({
    id: "block-takedown-wall",
    type: "bullets",
    heading: "↳ The abdominal wall at the stoma, which is the repair field",
    items: [
      "Superficial to deep: skin, subcutaneous fat, anterior rectus sheath, rectus abdominis, posterior rectus sheath, transversalis fascia, peritoneum.",
      "The retromuscular plane between the rectus muscle and the posterior sheath is the key plane for a sublay mesh, and it extends laterally by a transversus abdominis release.",
      "When mobilizing the stoma, stay immediately on the bowel serosa circumferentially and divide the subcutaneous and fascial attachments right on the wall — this is what keeps you out of adjacent loops sitting in the hernia sac.",
      "At the splenic flexure, stay in the avascular fusion plane and keep gentle downward and medial traction off the spleen to avoid a capsular avulsion.",
      "In the pelvis, stay on the rectal wall and above the peritoneal reflection unless the stump has to be shortened.",
      "In the retromuscular dissection, stay between rectus muscle anteriorly and posterior sheath posteriorly. The neurovascular bundles perforating the posterior sheath laterally mark the safe limit before a release.",
    ],
  }, SOURCE),

  sourced({
    id: "block-takedown-flow",
    type: "flow",
    heading: "Operative flow",
    nodes: [
      { id: "isolate", label: "Isolate and mobilize the stoma off the wall", tone: "default" },
      { id: "resect", label: "Resect the stoma segment, place the anvil", tone: "default" },
      { id: "enter", label: "Enter the abdomen, adhesiolysis, reduce the sac", tone: "default" },
      { id: "mobilize", label: "Mobilize left colon and splenic flexure", tone: "default" },
      { id: "reach", label: "Tension-free reach with a perfused conduit?", tone: "default" },
      { id: "salvage", label: "Deloyers rotation or transmesenteric transverse colon", tone: "caution" },
      { id: "stump", label: "Identify and prepare the rectal stump", tone: "default" },
      { id: "anast", label: "Colorectal anastomosis and air-leak test", tone: "default" },
      { id: "leak", label: "Anastomosis safe on testing?", tone: "default" },
      { id: "divert", label: "Revise, or divert and defer reversal", tone: "caution" },
      { id: "mesh", label: "Close the trephine and reinforce with mesh", tone: "default" },
      { id: "close", label: "Layered fascia, purse-string skin closure", tone: "good" },
    ],
    edges: [
      { from: "isolate", to: "resect" },
      { from: "resect", to: "enter" },
      { from: "enter", to: "mobilize" },
      { from: "mobilize", to: "reach" },
      { from: "reach", to: "stump", label: "Yes" },
      { from: "reach", to: "salvage", label: "No" },
      { from: "salvage", to: "stump" },
      { from: "stump", to: "anast" },
      { from: "anast", to: "leak" },
      { from: "leak", to: "mesh", label: "Yes" },
      { from: "leak", to: "divert", label: "No" },
      { from: "divert", to: "close" },
      { from: "mesh", to: "close" },
    ],
  }, SOURCE),

  sourced({
    id: "block-takedown-technique",
    type: "sequence",
    heading: "Step by step",
    steps: [
      { title: "Isolate and mobilize the stoma", detail: "Circumstomal incision, dissecting the colon free through subcutaneous tissue and fascia down to the peritoneal cavity, staying directly on the bowel serosa. The fascial trephine and the neck of the hernia sac are met at the anterior sheath. The pitfall is an enterotomy — either of the stoma limb itself or of a loop lying within the sac — which sharp serosa-hugging dissection is the only reliable protection against." },
      { title: "Resect the segment and prepare the proximal colon", detail: "Resect the old stoma along with any diverticular or ischaemic distal descending colon, then place the anvil of a 28 to 31 mm circular stapler in healthy proximal colon, or close the colon for later intracorporeal anvil placement. Confirm proximal perfusion by the marginal artery and a bleeding cut edge. Where diverticulosis is present, a side-to-end anastomosis keeps the diverticula out of the staple line. The pitfall is anastomosing into diverticular or poorly perfused colon, which leaks." },
      { title: "Enter the abdomen and lyse adhesions", detail: "For a minimally invasive case, place a hand-access port through the trephine, insufflate, run the adhesiolysis, then dock or place trocars away from the stoma site; otherwise a midline laparotomy. Reduce all hernia sac contents and take down adhesions until the small bowel and left colon are defined. The pitfall is an enterotomy during lysis of dense reoperative adhesions, which is the dominant source of morbidity and of conversion in this operation." },
      { title: "Mobilize the left colon and splenic flexure", detail: "Mobilize descending colon and splenic flexure, extending onto the transverse colon toward the duodenojejunal flexure if reach demands it, with a high inferior mesenteric or left colic ligation if length requires it. Preserve the marginal artery and protect the spleen and duodenum. The pitfall is devascularizing the conduit by dividing the marginal artery in pursuit of length, or tearing the splenic capsule with impatient traction." },
      { title: "Identify and prepare the rectal stump", detail: "Locate the stump with a transanal bougie, stapler sizer or scope, mobilize it, and transect back to healthy well-vascularized tissue if a fibrotic stapled end has to be shortened. Identify the left ureter first and stay on the rectal wall above the reflection. The pitfall is ureteric or hypogastric nerve injury in a difficult pelvic dissection, or incorporating vagina or bladder into the staple line." },
      { title: "Anastomosis and leak test", detail: "A double-stapled or side-to-end circular colorectal anastomosis, hand-sewn where indicated, then an air-leak or methylene blue test every time. Confirm two intact stapler doughnuts, no tension, and good perfusion. The pitfall is a positive leak test, tension, or poor perfusion that is noticed and not acted on." },
      { title: "Repair the trephine", detail: "Close the fascial defect and reinforce it with mesh in what is now a clean field, placing it sublay in the retromuscular plane or preperitoneally. A retromuscular sublay with a transversus abdominis release handles a concomitant midline incisional hernia in the same plane. The pitfall is bridging a large defect under tension, laying uncoated mesh intraperitoneally against bowel, or putting permanent synthetic mesh into a contaminated field." },
      { title: "Close", detail: "Layered fascial closure with a slowly absorbable or non-absorbable suture. Close the old stoma skin wound as a purse-string rather than a linear primary closure — the gunsight variant distributes tension and preserves a central drainage aperture. The pitfall is a watertight primary skin closure over a contaminated stoma wound." },
    ],
  }, SOURCE),

  sourced({
    id: "block-takedown-mesh-necessity",
    type: "prose",
    heading: "Why the trephine gets mesh and not just sutures",
    text: "Suture-only repair of the residual trephine carries recurrence around 69 per cent, which is why reinforcement is the default rather than the exception. In a high-volume series of takedowns performed during parastomal hernia repair, roughly 46 per cent had the fascial closure reinforced with biologic mesh. Purse-string closure of the stoma skin wound is a separate and unusually strong recommendation: surgical site infection of 3.1 against 20.2 per cent compared with linear closure, with better cosmesis and equivalent hernia and length-of-stay outcomes.",
  }, ASCRS),

  sourced({
    id: "block-takedown-variants",
    type: "table",
    heading: "Variant approaches and mesh configurations",
    columns: ["Technique", "Key steps", "Indications", "Cautions", "Advantages"],
    rows: [
      ["Open reversal", "Midline laparotomy with a stapled or hand-sewn colorectal join", "Hostile abdomen, multiple prior laparotomies, short stump, cardiopulmonary limits", "Wound morbidity", "Tactile adhesiolysis, and an open retromuscular wall repair in the same exposure"],
      ["Laparoscopic reversal", "Hand-access port through the trephine, adhesiolysis, mobilization, circular stapled join", "A favourable adhesion burden with an experienced surgeon", "Dense adhesions or unstable physiology", "Lower morbidity, fewer leaks and shorter stay in observational data, with selection bias acknowledged"],
      ["Robotic reversal", "As laparoscopic, with better pelvic visualization and suturing", "A confined pelvis or complex adhesiolysis", "Cost and learning curve", "Lower complications than open, though higher than laparoscopic in a registry subgroup"],
      ["Transanal-assisted reversal", "Abdominal and transanal teams meeting, with the fibrotic stump resected from below", "A very short or inaccessible rectal stump", "Needs two coordinated teams", "Safe stump identification without blind pelvic dissection"],
      ["Deloyers or transmesenteric route", "Right colon rotated down, or transverse colon brought through the mesentery", "A short or devascularized left colon", "Reserved for salvage", "Recovers reach when the left colon simply will not do it"],
      ["Keyhole mesh", "Slit or centrally fenestrated mesh around the bowel, intraperitoneal", "Only where the stoma is retained", "Recurrence of 24 to 36 per cent", "Technically the simplest of the configurations"],
      ["Sugarbaker mesh", "Flat mesh lateralizing the bowel with no fenestration", "Where the stoma is retained", "Intraperitoneal mesh in contact with bowel", "Recurrence around 9 to 12 per cent in meta-analyses"],
      ["Sandwich technique", "Two intraperitoneal meshes combining both configurations", "A lateral fascial defect needing lateralization as well", "Technically complex and longer", "Recurrence reported as low as 2 to 13.5 per cent"],
      ["Retromuscular repair with release", "Retrorectus dissection and transversus abdominis release with extraperitoneal mesh", "A large defect, a concomitant midline incisional hernia, or re-siting", "Learning curve", "Keeps mesh away from bowel entirely"],
      ["Three-dimensional funnel mesh", "Funnel mesh conforming to the course of the stoma", "Complex or large hernias", "Limited long-term data", "Low recurrence and wound-event rates in registry data"],
    ],
  }, SOURCE),

  sourced({
    id: "block-takedown-conflicts",
    type: "warning",
    heading: "Evidence conflicts not to harmonize",
    tone: "pearl",
    text: "Mesh configuration: retrospective data and meta-analyses favour Sugarbaker over keyhole at roughly 9 to 12 against 24 to 28 per cent recurrence, but the Maskal randomized trial found no significant difference for a retromuscular Sugarbaker against keyhole, 17 against 24 per cent. Mesh material: there is no randomized comparison of synthetic against biologic, biologic is not superior for an elective repair, and it is nonetheless what gets used in contaminated and re-siting fields. Minimally invasive against open reversal: observational data favour the minimally invasive approach, and selection bias precludes any causal claim from them.",
  }, SOURCE),

  sourced({
    id: "block-takedown-scenarios",
    type: "bullets",
    heading: "Special scenarios",
    items: [
      "Hostile or frozen abdomen: default to open, place ureteric stents, and consider a staged or deliberately subtotal adhesiolysis. Reversal may be abandoned for malignant adhesions, and abandoning it is a decision, not a failure.",
      "Short or buried rectal stump: a transanal-assisted rendezvous to identify and safely transect the stump.",
      "Inadequate colonic length or perfusion: a Deloyers rotation of the right colon, or the transverse colon brought transmesenterically. Where pelvic conditions are unfavourable, a straight coloanal reconstruction protected by a temporary loop ileostomy.",
      "Concomitant midline incisional hernia: a retromuscular reconstruction with transversus abdominis release addresses both defects in one anatomic plane.",
      "Contaminated field or emergency strangulation: avoid permanent synthetic mesh, and use a primary repair or biologic reinforcement.",
      "Parastomal hernia at an ileal conduit: the short fixed mesentery limits lateralization, which makes a retromuscular keyhole more prudent than a Sugarbaker to avoid devascularizing the conduit or injuring a ureter.",
      "Bailout: if the anastomosis is unsafe on tension, perfusion or leak testing, do not force the reversal — re-establish proximal diversion and defer.",
    ],
  }, SOURCE),

  sourced({
    id: "block-takedown-protection",
    type: "table",
    heading: "Critical structure protection",
    columns: ["Structure", "Landmark and course", "Injury and deficit", "Prevention pearl"],
    rows: [
      ["Left ureter", "Crosses the pelvic brim at the common iliac bifurcation, medial to the gonadal vessels", "Urinoma, stricture, loss of the kidney", "Identify it before dividing the mesentery, and stent when the dissection is expected to be hard"],
      ["Marginal artery of Drummond", "Along the mesenteric border, with the arc of Riolan as collateral", "Conduit ischaemia leading to anastomotic leak", "Preserve it when ligating the inferior mesenteric vessels high, and confirm perfusion before joining"],
      ["Spleen", "Splenocolic ligament at the flexure", "Capsular tear, haemorrhage, splenectomy", "Gentle inferomedial traction with sharp release of the attachments"],
      ["Duodenum", "Deep to the transverse mesocolon at the duodenojejunal flexure", "Duodenal injury or fistula", "Stay in the avascular plane during transverse mobilization"],
      ["Hypogastric nerves", "Over the sacral promontory, presacral", "Retrograde ejaculation and bladder dysfunction", "Stay on the rectal wall above the peritoneal reflection"],
      ["Small bowel", "Adherent within the hernia sac and in reoperative adhesions", "Enterotomy, missed injury, leak", "Serosa-hugging sharp adhesiolysis, then run the whole bowel at the end"],
      ["Bladder, vagina and prostate", "Anterior to the rectal stump", "Fistula, or incorporation into the staple line", "Identify the planes before firing, and communicate across teams in a transanal-assisted case"],
    ],
  }, SOURCE),

  sourced({
    id: "block-takedown-pitfalls",
    type: "bullets",
    heading: "Intraoperative pitfalls and their management",
    items: [
      "Enterotomy during adhesiolysis or stoma mobilization: repair it primarily at once, then reassess whether a clean anastomosis is still feasible and whether the mesh should be deferred.",
      "Ureteric injury: intraoperative urology consultation with a stented primary repair or reimplantation.",
      "Splenic injury: topical haemostatics and packing, with splenectomy only if it cannot be controlled.",
      "Positive air-leak test or tension: revise or reinforce the anastomosis and add proximal diversion. Do not proceed to a definitive abdominal wall closure over a failing anastomosis.",
    ],
  }, SOURCE),

  sourced({
    id: "block-takedown-complications",
    type: "bullets",
    heading: "Postoperative complications",
    items: [
      "Anastomotic leak in roughly 2.6 per cent after a minimally invasive reversal and 4.6 per cent after an open one, with colorectal-service performance lowering the risk.",
      "Stoma-wound surgical site infection has historically run anywhere from 2 to 41 per cent, and purse-string closure markedly reduces it.",
      "Ileus, small bowel obstruction and readmission are lower after a minimally invasive reversal in observational data.",
      "Trephine or parastomal hernia recurrence reaches 40 to 45 per cent long-term even with mesh — counsel for that number rather than the trial's two-year figure.",
      "Mesh infection runs about 1.7 to 3 per cent with synthetic mesh in an elective repair.",
    ],
  }, SOURCE),

  sourced({
    id: "block-takedown-emergencies",
    type: "bullets",
    heading: "↳ Emergencies: bedside action, then definitive care",
    items: [
      "Leak or peritonitis presenting with tachycardia, fever and peritonism around the third to seventh postoperative day: nil by mouth, resuscitate, broad-spectrum antibiotics, and urgent CT with rectal contrast. Source control is the immediate goal — percutaneous drainage for a contained leak, reoperation with washout and proximal diversion or takedown for a free leak with sepsis.",
      "Postoperative haemorrhage with instability: resuscitate, correct coagulopathy, type and cross, then CT angiography or a return to theatre.",
      "Incarcerated or strangulated recurrence with obstruction: resuscitate and decompress with a nasogastric tube, then operate emergently — and avoid permanent synthetic mesh in that contaminated field.",
    ],
  }, SOURCE),

  references("block-takedown-references", [SOURCE, ASCRS, ERAS]),
];

export const colostomyTakedownWithParastomalHerniaRepairPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000009",
  slug: "colostomy-takedown-with-parastomal-hernia-repair",
  title: "Colostomy Takedown with Parastomal Hernia Repair",
  aliases: ["Hartmann reversal", "Colostomy reversal", "Parastomal hernia repair", "Stoma takedown", "Hartmann takedown"],
  procedureId: "colostomy_takedown_parastomal_hernia_repair",
  approach: "open",
  specialty: "Colorectal",
  tags: ["colorectal", "hernia", "stoma", "abdominal wall", "anastomosis"],
  sourceId: SOURCE,
  additionalSourceIds: [ASCRS, ERAS],
  relatedTopicSlugs: ["ventral-and-incisional-hernia", "abdominal-wall-reconstruction"],
  blocks,
  reviewedAt: "2026-09-13T00:00:00.000Z",
});
