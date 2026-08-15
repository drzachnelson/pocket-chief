import { buildTopic, references, sourced } from "@/content/authoring";
import { HERNIA_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-awr-summary",
    type: "summary",
    heading: "At a glance",
    text: "Abdominal wall reconstruction is the operation for a defect that will not simply close, and its two decisions are where to put the mesh and how to make the midline reach. The retromuscular plane wins on physiology, because intra-abdominal pressure holds mesh against the wall rather than pushing it away. Component separation is what buys the reach, and the posterior release has largely displaced the anterior one because it delivers comparable advancement without cutting skin perforators. The complication that ends the operation badly is closing a wall the abdomen no longer fits inside.",
  }, SOURCE),
  sourced({
    id: "block-awr-arcuate",
    type: "table",
    heading: "The arcuate line, from the mesh surgeon's side",
    columns: ["Level", "Posterior rectus sheath", "Consequence for a retromuscular repair"],
    rows: [
      ["Above the arcuate line", "Present, formed by the posterior leaf of the internal oblique aponeurosis together with the transversus abdominis aponeurosis", "A retromuscular space already exists, and mesh rests on an intact posterior layer"],
      ["Below the arcuate line", "Absent, since all three aponeuroses pass in front of the rectus muscle", "Only transversalis fascia and peritoneum lie behind the muscle, so the plane has to be created and the peritoneum kept whole"],
      ["Through the transition", "The aponeuroses turn forward over a few variable centimeters rather than at one sharp line", "The posterior layer thins before it disappears, and that is exactly where it tears during dissection"],
    ],
  }, SOURCE),
  sourced({
    id: "block-awr-position",
    type: "table",
    heading: "Where the mesh goes",
    columns: ["Position", "Plane", "Assessment"],
    rows: [
      ["Onlay", "On top of the anterior rectus sheath, beneath the subcutaneous flaps", "Quick to perform, but it demands wide skin flaps and carries the highest rates of seroma and wound infection"],
      ["Inlay", "Bridging between fascial edges that are never brought together", "The worst configuration, because the prosthesis carries the whole load in tension and recurrence is correspondingly high"],
      ["Sublay", "Retromuscular, behind the rectus and in front of the posterior sheath — the Rives-Stoppa plane", "The preferred position, since intra-abdominal pressure presses the mesh into the wall instead of away from it"],
      ["Underlay", "Intraperitoneal, applied against the undersurface of the abdominal wall", "The laparoscopic default, and it requires a barrier-coated prosthesis because bare polypropylene on bowel erodes and fistulizes"],
    ],
  }, SOURCE),
  sourced({
    id: "block-awr-materials",
    type: "table",
    heading: "Mesh materials",
    columns: ["Material", "Structure", "Behavior"],
    rows: [
      ["Macroporous polypropylene", "Pores wide enough to admit macrophages and permit fibrous ingrowth", "Permanent and well incorporated, and an infection can often be cleared without taking it out"],
      ["Microporous expanded PTFE", "Pores too small for a macrophage to enter but ample for bacteria", "Resists adhesion to bowel, but once infected it is effectively never salvageable and has to be excised"],
      ["Biologic", "Acellular dermal or intestinal submucosal matrix, remodeled over time by host tissue", "Tolerates a contaminated field, but it stretches as it remodels and late eventration is common"],
      ["Biosynthetic", "A slowly resorbing synthetic polymer scaffold", "Occupies the ground between the other two, giving durable early support in a field where permanent synthetic is unwise"],
    ],
  }, SOURCE),
  sourced({
    id: "block-awr-tar",
    type: "sequence",
    heading: "Posterior component separation with transversus abdominis release",
    steps: [
      { title: "Entering the retrorectus space", detail: "Incise the posterior rectus sheath a few millimeters lateral to the linea alba and develop the plane between the rectus muscle and its posterior sheath." },
      { title: "Protecting the nerves", detail: "Stop the lateral dissection at the segmental neurovascular bundles entering the posterior surface of the rectus, since dividing them denervates the muscle." },
      { title: "Incising the posterior lamella", detail: "Divide the posterior lamella of the internal oblique aponeurosis just medial to those bundles to expose the transversus abdominis beneath." },
      { title: "Dividing transversus abdominis", detail: "Divide the muscle from within, working from the costal margin downward, which releases the posterior layer without touching the external oblique." },
      { title: "Developing the preperitoneal plane", detail: "Continue laterally between the transversalis fascia and the peritoneum toward the psoas, and inferiorly into the space of Retzius." },
      { title: "Closing the posterior layer", detail: "Approximate the posterior sheaths in the midline to separate the mesh from the viscera, patching with omentum or absorbable mesh where the layer will not meet." },
      { title: "Placing the mesh", detail: "Lay a wide sheet of macroporous mesh across the entire dissected plane, well beyond the edges of the defect, with minimal or no fixation." },
      { title: "Closing the midline", detail: "Approximate the anterior fascia over the mesh with a small-bite continuous closure, monitoring airway pressures as the abdomen is closed." },
    ],
  }, SOURCE),
  sourced({
    id: "block-awr-separation",
    type: "table",
    heading: "Anterior versus posterior release",
    columns: ["Feature", "Anterior component separation", "Posterior release with transversus abdominis release"],
    rows: [
      ["Plane of release", "External oblique aponeurosis incised just lateral to the semilunar line", "Posterior rectus sheath opened medially, then transversus abdominis divided from inside"],
      ["Advancement at the epigastrium", "Roughly 3 to 5 cm per side", "Comparable or greater once the release is carried to the costal margin"],
      ["Advancement at the waist", "Roughly 7 to 10 cm per side", "Similar medial travel, with a far larger plane available for mesh"],
      ["Advancement suprapubically", "Roughly 1 to 3 cm per side", "Greater, because the dissection continues into the space of Retzius"],
      ["Skin flaps", "Requires wide lipocutaneous flaps, dividing the periumbilical perforators", "Avoids skin flaps altogether and preserves the perforators"],
      ["Wound morbidity", "Higher, driven by devascularized flaps", "Lower, which is the main reason it has displaced the anterior release for large defects"],
    ],
  }, SOURCE),
  sourced({
    id: "block-awr-infection",
    type: "flow",
    heading: "Infected mesh: salvage or explant",
    nodes: [
      { id: "infected", label: "Mesh infection after abdominal wall repair" },
      { id: "porous", label: "Macroporous synthetic or biologic mesh, with no established sinus" },
      { id: "nonporous", label: "Microporous expanded PTFE, or any mesh with a chronic sinus or enterocutaneous fistula", tone: "caution" },
      { id: "salvage", label: "Attempt salvage with culture-directed antibiotics, drainage, and negative pressure wound therapy", tone: "good" },
      { id: "incorporated", label: "Infection clears and the mesh stays incorporated", tone: "good" },
      { id: "explant", label: "Excise the mesh", tone: "caution" },
      { id: "staged", label: "Stage the reconstruction once sepsis is controlled and the wound is clean", tone: "caution" },
    ],
    edges: [
      { from: "infected", to: "porous", label: "prosthesis is incorporable" },
      { from: "infected", to: "nonporous", label: "prosthesis cannot incorporate" },
      { from: "porous", to: "salvage" },
      { from: "salvage", to: "incorporated", label: "wound closes over the mesh" },
      { from: "salvage", to: "explant", label: "salvage fails or sepsis persists" },
      { from: "nonporous", to: "explant" },
      { from: "explant", to: "staged" },
    ],
  }, SOURCE),
  sourced({
    id: "block-awr-ssi",
    type: "bullets",
    heading: "Reducing surgical site infection",
    items: [
      "Stop smoking at least four weeks before an elective reconstruction, since nicotine impairs the microcirculation the healing wound depends on.",
      "Weight loss before repair lowers both wound complications and recurrence, and a very high body mass index is a legitimate reason to defer an elective operation.",
      "Glycemic control matters twice over — hemoglobin A1c before the operation and glucose in the perioperative window.",
      "Give weight-based antibiotic prophylaxis within an hour of incision, redosed for a long operation or significant blood loss.",
      "Normothermia, adequate oxygenation, and avoidance of hypovolemia each independently reduce surgical site infection in abdominal surgery.",
      "Wound infection after a mesh repair is the event most likely to end in recurrence, so prevention here returns more than any refinement of technique.",
    ],
  }, SOURCE),
  sourced({
    id: "block-awr-acs",
    type: "warning",
    heading: "Abdominal compartment syndrome after closure under tension",
    text: "Abdominal compartment syndrome is a sustained intra-abdominal pressure above 20 mmHg accompanied by new organ dysfunction, and closing a wall the viscera no longer fit behind is a direct way to produce it. Watch for rising peak airway pressures, oliguria, and a falling cardiac output as venous return is throttled. Measure the pressure through the bladder rather than estimating it from the look of the abdomen. Medical measures come first — sedation, neuromuscular blockade, nasogastric and rectal decompression, and drainage of any free fluid — but if organ dysfunction persists the answer is decompressive laparotomy, and the decision to reopen should not wait for the creatinine to confirm what the airway pressures already said.",
  }, SOURCE),
  references("block-awr-references", [SOURCE]),
];

export const abdominalWallReconstructionTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000000508",
  versionId: "00000000-0000-4000-8000-000000000518",
  slug: "abdominal-wall-reconstruction",
  title: "Abdominal Wall Reconstruction",
  aliases: ["component separation", "TAR", "transversus abdominis release", "Rives-Stoppa", "retrorectus", "sublay mesh", "IPOM", "onlay", "arcuate line", "mesh infection", "abdominal compartment syndrome", "ACS", "Ramirez"],
  scoreNodeId: "hernia-procedures",
  scoreCategory: "SCORE · Hernia · Operations & Procedures",
  tags: ["hernia", "abdominal-wall", "operative-technique", "reconstruction", "absite", "score"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-14T00:00:00.000Z",
});
