import { buildPlaybook, references, sourced } from "@/content/authoring";
import { CLAUS_2020_TEN_RULES_SOURCE as TEN_RULES, HERNIASURGE_2018_SOURCE as HERNIASURGE, RTAPP_INGUINAL_PLAYBOOK_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-rtapp-summary",
    type: "summary",
    heading: "At a glance",
    text: "Robotic transabdominal preperitoneal repair reproduces laparoscopic TAPP exactly — same plane, same dissection targets, same mesh goal. The platform changes ergonomics and suturing, not anatomy. The operation is won by covering the whole myopectineal orifice with a large flat mesh after a complete dissection, and lost by an undersized mesh, a missed femoral or cord lipoma, or a tack placed where a nerve or vessel lives.",
  }, SOURCE),

  sourced({
    id: "block-rtapp-fixation-warning",
    type: "warning",
    heading: "Never fixate into Doom or Pain",
    tone: "danger",
    text: "No penetrating fixation below the iliopubic tract, lateral to the anterior superior iliac spine, or within the triangle of Doom. This is the leading iatrogenic cause of vascular injury and chronic neuralgia in this operation, and it is entirely avoidable — the safe zones are Cooper's ligament, medial to the inferior epigastric vessels, and above the iliopubic tract.",
  }, SOURCE),

  sourced({
    id: "block-rtapp-indications",
    type: "bullets",
    heading: "Indications",
    items: [
      "Symptomatic primary or recurrent inguinal hernia; a single setup treats both sides in bilateral disease.",
      "Femoral hernia, because covering the myopectineal orifice addresses every groin defect at once.",
      "Complex or hostile fields where wristed instruments earn their cost: recurrence after prior anterior or minimally invasive repair, obesity, large hernias, and hernia after prostatectomy.",
      "Watchful waiting stays reasonable for the asymptomatic or minimally symptomatic hernia, with counselling on incarceration, obstruction and strangulation.",
      "A minimally invasive repair benefits a unilateral primary hernia only when the surgeon has the experience for it — complication parity with open repair historically took on the order of 250 cases.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rtapp-cautions",
    type: "bullets",
    heading: "Relative contraindications and technique-specific cautions",
    items: [
      "Emergent, strangulated or incarcerated hernia.",
      "Large inguinoscrotal hernia.",
      "Prior preperitoneal mesh at the planned site — the plane is no longer virgin.",
      "Prior radical prostatectomy or pelvic radiotherapy, which obliterates the space of Retzius and makes medial dissection high risk.",
      "Body mass index above 40, bleeding diathesis, or any general contraindication to pneumoperitoneum.",
      "Prior lower midline or pelvic surgery complicates the preperitoneal plane — consider modifying the approach.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rtapp-evidence",
    type: "prose",
    heading: "What the comparative evidence actually shows",
    text: "Meta-analysis favours robotic over laparoscopic repair on recurrence — odds ratio 0.54 — but at roughly 33 minutes more operative time and a higher 30-day reoperation rate, with no difference in overall complications, surgical site infection, or haematoma and seroma. The two findings are not in conflict: reoperation at 30 days captures early complications while recurrence is a long-term endpoint. The RIVAL randomized trial and pooled data show equivalent pain, recovery, recurrence and satisfaction for uncomplicated unilateral hernias, with the robot costing more time and money. Together these support selective, complexity-driven use rather than universal adoption.",
  }, SOURCE),

  sourced({
    id: "block-rtapp-setup",
    type: "bullets",
    heading: "Anaesthesia and setup",
    items: [
      "General endotracheal anaesthesia with full neuromuscular blockade — both pneumoperitoneum and the preperitoneal working space depend on it. Sugammadex allows deep block to be maintained until closure.",
      "Supine, arms tucked, secured to the table, with 7 to 20 degrees of Trendelenburg to shift bowel cephalad and open the pelvis.",
      "Empty the bladder before suprapubic dissection. Many surgeons omit the catheter entirely and rely on preoperative voiding, because intraoperative catheterization roughly doubled the odds of postoperative urinary retention in the RETAINER I data.",
      "Prep widely from xiphoid to pubis and out to both flanks, and include the genitalia in the field for scrotal reduction or traction.",
      "Limit intravenous fluids — more than 500 mL is associated with retention — treat constipation, and review anticholinergics. Prophylactic tamsulosin has given mixed results and is not established.",
      "Risk-stratify for venous thromboembolism, use mechanical prophylaxis routinely, and add pharmacologic prophylaxis for elevated risk.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rtapp-antibiotics",
    type: "prose",
    heading: "↳ Antibiotic prophylaxis",
    text: "Laparo-endoscopic repair itself drops the wound infection rate to roughly 0.2 per cent, and large registries and the HerniaSurge guideline do not support routine prophylaxis for it. Reserve antibiotics for patients at increased risk; cefazolin is the agent when a prosthetic clean case warrants a dose.",
  }, HERNIASURGE),

  sourced({
    id: "block-rtapp-anatomy",
    type: "bullets",
    heading: "Anatomy: the inverted Y and five triangles",
    items: [
      "The posterior myopectineal orifice is read as an inverted Y formed by three structures.",
      "- Inferior epigastric vessels run vertically and form the stem.",
      "- The vas deferens runs medially.",
      "- The gonadal vessels run laterally.",
      "The iliopubic tract crosses horizontally through the deep ring and divides the field into five triangles: direct, indirect, femoral, Doom and Pain.",
      "The triangle of Doom holds the external iliac vessels; the triangle of Pain holds the nerves below and lateral to the iliopubic tract. Neither is ever fixated.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rtapp-critical-view",
    type: "bullets",
    heading: "↳ The critical view of the myopectineal orifice",
    items: [
      "Pubic symphysis and Cooper's ligament exposed medially.",
      "Rectus muscle and the space of Retzius opened medial to the epigastric vessels.",
      "Deep inguinal ring with the cord structures clearly seen.",
      "Psoas muscle exposed laterally.",
      "The iliopubic tract visible as the horizontal reference for the danger zones.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rtapp-borders",
    type: "bullets",
    heading: "↳ Safe dissection borders",
    items: [
      "Stay in the avascular areolar plane between peritoneum and transversalis fascia, separating peritoneum cleanly off both the fascia and the cord.",
      "Medially, cross at least 2 cm over the midline into the space of Retzius, between Cooper's ligament and the bladder, so the mesh has somewhere to sit.",
      "Laterally, carry the dissection toward the psoas and the anterior superior iliac spine, parietalizing the cord by sweeping peritoneum off the vas and gonadal vessels to the mid-psoas.",
      "Inferiorly, expose Cooper's ligament and the deep ring, but do not dig below Cooper's into the obturator space where the corona mortis lives.",
      "Stay on the transversalis fascia and Cooper's ligament, keeping the epigastric vessels up on the abdominal wall.",
      "Stay off the external iliac vessels and off the nerves below and lateral to the iliopubic tract.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rtapp-zones",
    type: "bullets",
    heading: "↳ Three zones of dissection",
    items: [
      "Zone 1 is the lateral area, lateral to the deep ring and the spermatic vessels, and the nerves lie here.",
      "Zone 2 is medial to the inferior epigastric vessels and the vas deferens, and it is where direct hernias sit.",
      "Zone 3 is the central zone and the one that demands the most attention. It takes in the inferior epigastric vessels and deep ring superiorly, plus the spermatic cord elements and the external iliac vessels.",
      "Start in Zone 1 or Zone 2 by preference and leave Zone 3 for last. The medial zone has the most constant anatomy, and finding the pubis orients the surgeon.",
      "Zone 3 is the hardest step and has the most variable anatomy. Injury to the vas or the vessels, and tears in the peritoneum, can occur here.",
    ],
  }, TEN_RULES),

  sourced({
    id: "block-rtapp-flow",
    type: "flow",
    heading: "Operative flow",
    nodes: [
      { id: "access", label: "Access, pneumoperitoneum, three ports", tone: "default" },
      { id: "dock", label: "Dock and survey both groins", tone: "default" },
      { id: "flap", label: "Incise peritoneum high, raise the flap", tone: "default" },
      { id: "reduce", label: "Reduce the sac, parietalize the cord", tone: "default" },
      { id: "lipoma", label: "Cord lipoma or occult defect present?", tone: "default" },
      { id: "excise", label: "Reduce or excise it before proceeding", tone: "caution" },
      { id: "view", label: "Critical view of the myopectineal orifice", tone: "default" },
      { id: "mesh", label: "Large mesh over the entire orifice", tone: "default" },
      { id: "m3", label: "Large medial defect?", tone: "default" },
      { id: "fixate", label: "Fixate in safe zones only", tone: "caution" },
      { id: "close", label: "Close the peritoneal flap over the mesh", tone: "good" },
    ],
    edges: [
      { from: "access", to: "dock" },
      { from: "dock", to: "flap" },
      { from: "flap", to: "reduce" },
      { from: "reduce", to: "lipoma" },
      { from: "lipoma", to: "excise", label: "Yes" },
      { from: "lipoma", to: "view", label: "No" },
      { from: "excise", to: "view" },
      { from: "view", to: "mesh" },
      { from: "mesh", to: "m3" },
      { from: "m3", to: "fixate", label: "Yes" },
      { from: "m3", to: "close", label: "No" },
      { from: "fixate", to: "close" },
    ],
  }, SOURCE),

  sourced({
    id: "block-rtapp-technique",
    type: "sequence",
    heading: "Step by step",
    steps: [
      { title: "Access and ports", detail: "Establish pneumoperitoneum by Veress in the left upper quadrant or optical entry about 5 cm cephalad to the umbilicus. Place the camera port, then two 8 mm robotic trocars 8 to 10 cm lateral to the midline at or just above the umbilical level, and dock. Ports more than 5 cm from the midline and cranial to the anterior superior iliac spine are the safe zone away from the epigastrics and the pelvic neurovasculature. The pitfall is placing ports too low, which crowds the pelvic workspace and limits flap creation." },
      { title: "Diagnostic survey", detail: "Inspect both groins for direct, indirect, femoral and occult contralateral defects before committing to a side. The pitfall is missing a concurrent femoral or contralateral hernia, which is a preventable cause of what later gets called recurrence." },
      { title: "Peritoneal incision and flap", detail: "Begin the incision 5 to 8 cm cephalad to the defect, starting at the median umbilical fold and extending laterally toward the anterior superior iliac spine, then develop the flap inferiorly off the transversalis fascia. A high, generous flap buys room for full exposure and for a tension-free closure at the end. The pitfall is starting too low: the flap tears easily and will not reach over the mesh." },
      { title: "Reduce the hernia and parietalize the cord", detail: "Reduce direct sacs by traction and dissect indirect sacs off the cord. A large indirect sac may be transected and left in situ distally with the proximal end closed, which avoids cord and testicular injury. Sweep the vas and gonadal vessels back to the mid-psoas. Reduce or excise any cord lipoma — it is a common cause of a persistent bulge that reads as failure. The pitfall is aggressive distal sac dissection, which risks cord ischaemia and haematoma." },
      { title: "Complete the dissection", detail: "Expose the pubic symphysis, Cooper's ligament, the direct and femoral spaces, the deep ring, and laterally to the psoas, and confirm all five triangles. The pitfall is the corona mortis — an aberrant communication between the obturator and external iliac systems behind the superior pubic ramus, present in roughly half of hemipelves — which bleeds briskly and is hard to control once opened." },
      { title: "Place the mesh", detail: "Introduce a large mesh, either 3D-contoured or flat around 10 by 15 cm, to cover the entire myopectineal orifice with wide overlap. Confirm it lies flat, reaches into Retzius medially, and does not buckle. The pitfall is an undersized mesh or inadequate medial and lateral overlap, which is the dominant modifiable driver of recurrence." },
      { title: "Fixate selectively", detail: "Many repairs use no fixation or non-penetrating fixation, which reduces early postoperative pain. Where fixation is warranted — guidelines single out large medial defects — place it only on Cooper's ligament, medial to the epigastric vessels, and above the iliopubic tract. The pitfall is any penetrating fixation in the triangle of Pain or the triangle of Doom." },
      { title: "Close the peritoneum and exit", detail: "Close the flap fully over the mesh with a running absorbable barbed suture so no mesh sees bowel, leaving no gaps or buttonholes that could trap a loop. The pitfall is deep bites near the ring, which can catch the ilioinguinal or iliohypogastric nerve running superficial to the internal ring — take shallow bites." },
    ],
  }, SOURCE),

  sourced({
    id: "block-rtapp-ten-rules",
    type: "prose",
    heading: "Ten rules for a safe minimally invasive repair",
    text: "The ten rules come from a 2020 editorial that pairs the critical view of the myopectineal orifice with the inverted Y and five triangles, and it covers TAPP, TEP, extended TEP and robotic TAPP alike. It is an editorial, so the thresholds are the authors' recommendations rather than trial results.",
  }, TEN_RULES),

  sourced({
    id: "block-rtapp-ten-rules-table",
    type: "table",
    heading: "↳ Rule by rule",
    columns: ["Rule", "What to do", "Why it matters"],
    rows: [
      ["1. Open high", "Incise the peritoneum at least 4 cm above the deep ring border, from the anterior superior iliac spine to the medial umbilical fold, which is the obliterated umbilical artery.", "A high flap leaves room for a large mesh in the preperitoneal space."],
      ["2. Follow the peritoneal plane", "Keep the preperitoneal fat on the inguinal floor, not on the peritoneum, and stay out of the plane that exposes muscle. Do not dissect or identify the nerves routinely.", "The muscle plane puts the inferior epigastric vessels at risk in Zone 3 and the nerves at risk in Zone 1. Leaving the nerves covered may spare them the foreign-body reaction to the mesh and lower the chance of chronic pain."],
      ["3. Dissect Zone 2 fully", "Dissect to at least the pubic symphysis and at least 2 cm below the pubis. Reduce a direct hernia, leave the attenuated transversalis fascia distal, and stay in the correct plane in case the bladder is part of the hernia. Empty the bladder before the operation.", "The mesh needs room to overlap the direct and femoral triangles by 3 to 4 cm without a distending bladder lifting it. A full bladder shrinks the field and can fold the lower mesh edge as the gas is released, a potential cause of recurrence."],
      ["4. See the external iliac vein", "Visualize the external iliac vein in Zone 3 and inspect the femoral canal. Tell lymph nodes along the vein apart from preperitoneal fat protruding into the canal.", "A femoral hernia is missed if the vein is not seen."],
      ["5. Parietalize far enough", "Dissect the peritoneum down to at least where the vas deferens crosses the external iliac vein in Zone 3, and until the iliopsoas is seen posteriorly in Zone 1. Mobilize the peritoneum medially and laterally off an indirect sac to find the vas and spermatic vessels. In women, transect the round ligament at least 1 cm proximal to the deep ring.", "Indirect sac dissection is the most demanding step, and the external iliac vessels lie just deep to the cord in the triangle of Doom. Transecting the round ligament proximal to the ring protects the genital branch of the genitofemoral nerve."],
      ["6. Transect a large sac", "In a large or inguinoscrotal hernia, transect the sac and abandon the distal part in the scrotum, but only after the cord elements are identified.", "It avoids excess cord dissection. A pseudohydrocele is easier to manage than a scrotal hematoma, ischemic orchitis or cord injury."],
      ["7. Look for a cord lipoma", "Explore the deep ring during Zone 3 dissection. Dissect any lipoma off the cord and reduce it from the canal. It need not be removed and can lie on top of the mesh.", "An untreated lipoma is a major cause of recurrence after laparoscopic repair, and a lipoma placed on top of the mesh helps stop it rolling upward. A visible iliopubic tract with only cord elements in the deep ring means no lipoma is left."],
      ["8. Cover the whole orifice", "Use a mesh of usually at least 10 cm craniocaudal by 15 cm mediolateral. Lay it flat, do not split it, and leave no peritoneum behind it.", "The mesh must overlap the indirect, direct and femoral triangles by at least 3 to 4 cm. Wrinkles, folds or a split mesh risk chronic pain or recurrence, and peritoneum left behind it lets it fold or roll up as the gas leaves or the flap closes."],
      ["9. Fix only when needed", "Most repairs need no fixation. Fixation is recommended in large hernias, especially a large direct hernia, EHS M3.", "Tacks, sutures, glue or a self-fixing mesh do not correct improper dissection or a malpositioned mesh."],
      ["10. Close under vision", "Close the peritoneal flap with suture, not tacks, and make sure the closure neither lifts the mesh nor folds its lower edge. Close any gap, hole or tear in the peritoneum.", "Tacking the peritoneum may raise the risk of nerve injury. Peritoneal gaps risk early bowel obstruction or mesh exposure."],
    ],
  }, TEN_RULES),

  sourced({
    id: "block-rtapp-mesh-limits",
    type: "bullets",
    heading: "↳ Where the mesh should reach",
    items: [
      "Medially, to the pubic symphysis, lying between the pubic bone and the bladder in the space of Retzius.",
      "In a direct hernia, 1 to 2 cm of the mesh crosses to the other side, which gives at least 3 cm of medial overlap from the defect.",
      "Laterally, to the iliopsoas muscle and the anterior superior iliac spine.",
      "Inferiorly, 1 to 2 cm below the pubis.",
      "Superiorly, 3 to 4 cm over the anterior abdominal wall above the deep ring.",
    ],
  }, TEN_RULES),

  sourced({
    id: "block-rtapp-fixation-details",
    type: "bullets",
    heading: "↳ If you fixate",
    items: [
      "Tack above the pubic bone, into Cooper's ligament, and never into bone, to avoid chronic osteitis.",
      "Avoid the inferior epigastric vessels.",
      "Place nothing below the iliopubic tract. To stay clear of the triangles of Pain and Doom, keep fixation 2 cm above the tract.",
      "Five or six fixation points are enough, and higher tack numbers are linked to more chronic pain.",
      "Palpate the abdominal wall from outside while placing penetrating fixation, so an anchor does not go below the iliopubic tract or in too deep.",
    ],
  }, TEN_RULES),

  sourced({
    id: "block-rtapp-fascia-closure",
    type: "prose",
    heading: "↳ Unsettled: closing the transversalis fascia",
    text: "As of the 2020 editorial, there is no consensus on suturing or plicating the transversalis fascia over a direct defect. Some feel it may reduce seroma, while others doubt it is needed and link it to possible nerve injury. The practice has become more common since robotic repair arrived, and its outcomes still need evaluation.",
  }, TEN_RULES),

  sourced({
    id: "block-rtapp-mesh-weight",
    type: "warning",
    heading: "Board answer versus current practice: mesh weight",
    tone: "pearl",
    text: "The keyed answer from HerniaSurge is lightweight, large-pore mesh, adopted to reduce chronic discomfort — and that remains right for open anterior repair. For laparo-endoscopic repair the position has moved: network meta-analysis now favours heavier-weight mesh, which lowers recurrence without the increase in chronic pain the lightweight preference was meant to prevent. Answer lightweight for an open Lichtenstein question; place a heavier mesh in the preperitoneal space.",
  }, SOURCE),

  sourced({
    id: "block-rtapp-variants",
    type: "table",
    heading: "Variant approaches",
    columns: ["Approach", "Key steps", "Best for", "Cautions", "Advantages"],
    rows: [
      ["Robotic TAPP", "Transperitoneal access, peritoneal flap, preperitoneal mesh, flap closure", "Complex, recurrent, obese, post-prostatectomy, bilateral", "Hostile pelvis or prior preperitoneal mesh", "Wristed suturing and a larger working space"],
      ["Robotic TEP", "Preperitoneal space entered without breaching peritoneum, balloon dissection", "Selected primary hernias where staying out of the abdomen matters", "Steeper learning curve; a scarred space is unforgiving", "Avoids intraperitoneal entry entirely"],
      ["Laparoscopic TAPP", "Same plane and same mesh, non-wristed instruments", "Standard uncomplicated repair where cost matters", "Needs genuine minimally invasive experience", "Shorter operative time and lower cost"],
      ["Laparoscopic TEP", "Preperitoneal dissection with no peritoneal incision", "Uncomplicated primary hernias", "Steepest learning curve of the four", "No peritoneal closure required"],
      ["Open Lichtenstein", "Anterior mesh laid on the canal floor through a groin incision", "Comorbid patients, hostile abdomen, repair under local anaesthesia", "Anterior plane is spent for any future recurrence", "Reproducible, with a short learning curve"],
    ],
  }, SOURCE),

  sourced({
    id: "block-rtapp-protection",
    type: "table",
    heading: "Critical structure protection",
    columns: ["Structure", "Landmark", "Complication if injured", "How to protect it"],
    rows: [
      ["External iliac artery and vein", "Triangle of Doom", "Catastrophic haemorrhage", "Never dissect or fixate within Doom"],
      ["Nerves of the Pain triangle", "Below and lateral to the iliopubic tract", "Chronic neuralgia and numbness", "No fixation below the tract or lateral to the anterior superior iliac spine"],
      ["Corona mortis", "Behind the superior pubic ramus", "Brisk retropubic bleeding", "Dissect Cooper's ligament deliberately and place no blind tacks"],
      ["Inferior epigastric vessels", "Vertical stem of the inverted Y", "Bleeding and abdominal wall haematoma", "Keep them up on the abdominal wall throughout"],
      ["Vas deferens", "Medial limb of the inverted Y", "Infertility and chronic pain", "Parietalize by sweeping, never by grasping it"],
      ["Bladder", "Medial space of Retzius", "Cystotomy", "Empty it before dissecting and stay on Cooper's ligament"],
    ],
  }, SOURCE),

  sourced({
    id: "block-rtapp-scenarios",
    type: "bullets",
    heading: "Special scenarios",
    items: [
      "Recurrence after a prior open anterior repair: the posterior plane is virgin, which is the strongest single indication for this operation.",
      "Recurrence after prior minimally invasive or preperitoneal mesh: the plane is hostile — consider an open anterior repair, or an expert robotic attempt with meticulous plane identification.",
      "After radical prostatectomy: the space of Retzius is obliterated and medial dissection is high risk. Prospective series exclude these patients for that reason.",
      "Large inguinoscrotal or indirect sac: transect the sac, leave the distal portion in situ, and close the proximal peritoneum to protect the cord.",
      "Incarceration: reduce gently and inspect viability. Strangulation is an exclusion for an elective robotic repair, not a challenge to be met.",
      "Bailout for bleeding from the corona mortis or the epigastrics: direct pressure first, then clips or energy sealing. For an external iliac injury, convert without delay for vascular control.",
    ],
  }, SOURCE),

  sourced({
    id: "block-rtapp-complications",
    type: "bullets",
    heading: "Complications and emergency response",
    items: [
      "Expanding postoperative haematoma: resuscitate, follow serial haemoglobin, and image with CT angiography — return to theatre or embolize if unstable or expanding.",
      "Severe pain with peritonitis, meaning a missed enterotomy or bowel trapped in a flap defect: keep nil by mouth, image, and reoperate.",
      "Postoperative urinary retention, reported anywhere from about 1 to 22 per cent after minimally invasive repair and the leading cause of unplanned admission after an ambulatory case: bladder scan, catheterize, then address the reversible factors.",
      "Early testicular pain and swelling suggesting ischaemic orchitis: examine, add Doppler if uncertain, and support.",
      "Chronic inguinal pain: work stepwise through reassurance, neuropathic agents and an image-guided nerve block, reserving triple neurectomy for refractory neuropathic pain. Consider a mesh or fixation cause if fixation was used.",
      "Recurrence: confirm clinically or by imaging, then repair through a plane that has not been dissected before.",
    ],
  }, SOURCE),

  references("block-rtapp-references", [SOURCE, HERNIASURGE, TEN_RULES]),
];

export const roboticTappInguinalHerniaRepairPlaybook = buildPlaybook({
  id: "00000000-0000-4000-9000-000000000004",
  slug: "robotic-tapp-inguinal-hernia-repair",
  title: "Robotic TAPP Inguinal Hernia Repair",
  aliases: ["rTAPP", "TAPP", "Robotic inguinal hernia repair", "Transabdominal preperitoneal repair", "Robotic groin hernia repair", "Ten golden rules"],
  procedureId: "robotic_tapp_inguinal_hernia_repair",
  approach: "robotic",
  specialty: "Hernia",
  tags: ["hernia", "inguinal", "robotic", "minimally invasive", "mesh"],
  sourceId: SOURCE,
  additionalSourceIds: [HERNIASURGE, TEN_RULES],
  relatedTopicSlugs: ["inguinal-hernia", "groin-hernia-repair", "femoral-hernia"],
  blocks,
  reviewedAt: "2026-11-13T00:00:00.000Z",
});
