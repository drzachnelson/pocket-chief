import { buildTopic, references, sourced } from "@/content/authoring";
import { HERNIA_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-vh-summary",
    type: "summary",
    heading: "At a glance",
    text: "An **incisional hernia** is a complication of a closure, which means most of what matters happened at the first operation rather than the second. The closure technique that prevents it is settled — many **small bites** of aponeurosis with slowly absorbable monofilament — and the repair that follows is decided by the field it is done in and by whether the midline can be brought together. A **parastomal hernia** is the same problem placed next to a stoma, and it is common enough that prophylaxis at stoma creation has become a live question.",
  }, SOURCE),
  sourced({
    id: "block-vh-risk",
    type: "bullets",
    heading: "Who herniates, and why",
    items: [
      "Incisional hernia follows roughly **one in ten to one in five** midline laparotomies on long-term follow-up, and approaches a third in high-risk groups such as repair of abdominal aortic aneurysm, emergency laparotomy, and obesity.",
      "**Surgical site infection** is the strongest technical risk factor, because fascia that heals through infection never regains its tensile strength.",
      "Smoking, obesity, diabetes, malnutrition, and chronic corticosteroid use all impair **collagen crosslinking** in the healing fascia.",
      "**Connective tissue disorders** and a shifted ratio of type I to type III collagen account for the patients who herniate despite a technically sound closure.",
      "A **midline incision** carries a higher hernia rate than a transverse one, which is worth weighing whenever the operation permits a choice.",
      "Most incisional hernias are present **within the first year**, though they continue to appear for a decade, so short follow-up understates the true rate.",
    ],
  }, SOURCE),
  sourced({
    id: "block-vh-closure",
    type: "table",
    heading: "How to close a midline so it holds",
    columns: ["Principle", "What it specifies", "Where it comes from"],
    rows: [
      ["Suture to wound length ratio", "At least **four to one**, achieved by taking many small bites rather than by pulling a longer stitch", "**Israelsson's** work on midline closure, which tied a ratio below four to one to higher hernia and infection rates"],
      ["Small bites", "**Five millimeters** of fascia taken at five millimeter intervals, in a continuous running line", "The **STITCH trial**, which reported incisional hernia in about 13 percent of small-bite closures against 21 percent of large-bite closures at one year"],
      ["Suture material", "Slowly absorbable **monofilament** such as polydioxanone", "Rapidly absorbed suture loses strength before the fascia has healed, and **permanent braided suture** raises the rate of sinus and infection"],
      ["What the bite includes", "**Aponeurosis alone**, since including muscle and fat adds tension without adding strength", "**Wide bites** strangle the tissue they enclose, which is the failure mechanism the small-bite technique is designed to avoid"],
    ],
  }, SOURCE),
  sourced({
    id: "block-vh-parastomal",
    type: "table",
    heading: "Parastomal hernia",
    columns: ["Technique", "How the mesh sits", "Trade-off"],
    rows: [
      ["Keyhole", "A slit and central **aperture** in the mesh encircle the limb of bowel", "Simple to construct, but the aperture stretches with time and **recurrence** through it is the common failure"],
      ["Sugarbaker", "The bowel is **lateralized** against the abdominal wall and a single sheet covers both the defect and the limb", "**Lower recurrence**, at the cost of a flap valve that obstructs if the lateralized segment is kinked"],
      ["Prophylactic mesh at stoma creation", "Mesh placed in the **retromuscular plane** when the stoma is first matured", "Reduces herniation substantially, which is why the decision now belongs to the **index operation** rather than to a later one"],
    ],
  }, SOURCE),
  sourced({
    id: "block-vh-domain",
    type: "bullets",
    heading: "Loss of domain",
    items: [
      "Loss of domain describes a hernia holding so much of the viscera that simply returning them would not fit, conventionally when the sac holds more than about **a fifth** of the total peritoneal volume.",
      "Forcing the midline closed in that setting produces **[[abdominal compartment syndrome]]**, so the abdomen must be enlarged before it is closed rather than after.",
      "Preoperative **botulinum toxin** injected into the lateral abdominal wall paralyzes the oblique muscles, lengthening them and releasing their lateral pull on the midline.",
      "**Progressive preoperative pneumoperitoneum** insufflates the abdomen over days to weeks, stretching the wall and letting the diaphragm acclimatize before the operation.",
      "Both are adjuncts to **[[component separation]]** rather than substitutes for it, and both have to be planned weeks ahead of the operating date.",
    ],
  }, SOURCE),
  sourced({
    id: "block-vh-vhwg",
    type: "table",
    heading: "The field decides the mesh",
    columns: ["Grade", "Patient and field", "Mesh choice"],
    rows: [
      ["Grade 1", "Low risk, **clean field**, no history of wound infection", "**Synthetic mesh**"],
      ["Grade 2", "**Comorbid** — smoker, obese, diabetic, immunosuppressed, or with chronic lung disease", "Synthetic mesh, with the **modifiable risks** corrected before the operation"],
      ["Grade 3", "**Potentially contaminated**, including a stoma, an enterotomy, or a previously infected wound", "Historically biologic; increasingly a **lightweight macroporous synthetic** placed retromuscularly"],
      ["Grade 4", "**Infected field**, with infected mesh or septic dehiscence", "**No permanent prosthetic** — debride, control sepsis, and stage the reconstruction"],
    ],
  }, SOURCE),
  sourced({
    id: "block-vh-bridge",
    type: "warning",
    heading: "A bridged repair is a delayed failure",
    text: "Laying mesh across a defect whose fascial edges are never brought together leaves the prosthesis carrying the entire load of the abdominal wall **in tension**. Recurrence rates for **bridged repair** are the worst of any configuration, and the eventration that follows is harder to fix than the hernia was. If the midline will not come together, the answer is a **[[component separation]]** to make it reach, not a larger sheet of mesh to span the gap.",
  }, SOURCE),
  references("block-vh-references", [SOURCE]),
];

export const ventralAndIncisionalHerniaTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000000505",
  versionId: "00000000-0000-4000-8000-000000000515",
  slug: "ventral-and-incisional-hernia",
  title: "Ventral & Incisional Hernia",
  aliases: ["incisional hernia", "ventral hernia", "parastomal hernia", "Sugarbaker", "keyhole mesh", "STITCH trial", "small bites", "Israelsson", "loss of domain", "botulinum toxin", "progressive pneumoperitoneum", "VHWG"],
  scoreNodeId: "hernia-conditions",
  scoreCategory: "SCORE · Hernia · Diseases & Conditions",
  tags: ["hernia", "abdominal-wall", "stoma", "absite", "score"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-14T00:00:00.000Z",
});
