import { buildTopic, references, sourced } from "@/content/authoring";
import { HERNIA_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-uh-summary",
    type: "summary",
    heading: "At a glance",
    text: "The unusual hernias are tested because they are **diagnosed late**, and they are diagnosed late for the same reason in each case — the bulge is hidden under an intact layer, or there is no bulge at all. Two families are worth keeping separate: hernias named for **where they pass**, which is an anatomy question, and hernias named for **what is in the sac**, which is a management question. Almost all of them are found on **CT** rather than on examination, and almost all are repaired on diagnosis because the necks are narrow.",
  }, SOURCE),
  sourced({
    id: "block-uh-location",
    type: "table",
    heading: "Named for where they pass",
    columns: ["Hernia", "Route", "The clue"],
    rows: [
      ["Spigelian", "Through the **Spigelian aponeurosis** at the semilunar line, in a transverse belt just above the level of the anterior superior iliac spines", "**Interparietal**, spreading beneath an intact external oblique, so it is often impalpable and CT makes the diagnosis"],
      ["Obturator", "Through the **obturator canal**, alongside the obturator vessels and nerve", "A thin elderly **multiparous** woman with small bowel obstruction and medial thigh pain"],
      ["Superior lumbar", "Through the triangle of **Grynfeltt and Lesshaft**, bounded by the twelfth rib, quadratus lumborum, and internal oblique", "The more common of the two lumbar hernias, and often a consequence of **flank surgery**"],
      ["Inferior lumbar", "Through the triangle of **Petit**, bounded by the iliac crest, latissimus dorsi, and external oblique", "A **flank bulge** that appears on standing and vanishes when the patient lies down"],
      ["Sciatic", "Through the greater or lesser **sciatic foramen**", "The **rarest** of them all, presenting either as obstruction or as sciatic pain from nerve compression"],
      ["Perineal", "Through a defect in the **pelvic floor musculature**", "Nearly always follows **abdominoperineal resection**, pelvic exenteration, or radical prostatectomy"],
    ],
  }, SOURCE),
  sourced({
    id: "block-uh-obturator",
    type: "bullets",
    heading: "↳ The obturator hernia in detail",
    items: [
      "The **Howship-Romberg sign** is pain along the medial thigh and knee in the obturator nerve distribution, provoked by extension, abduction, and internal rotation of the hip, and relieved by flexion.",
      "The **Hannington-Kiff sign** is an absent adductor reflex on the affected side with the patellar reflex preserved, and it is the more specific of the two signs.",
      "**About half** present as small bowel obstruction with no palpable mass anywhere, which makes CT the effective diagnostic test.",
      "The classic patient is thin, elderly, and multiparous, because loss of preperitoneal fat opens the canal — the reason it is called the **little old lady's hernia**.",
      "Repair is **preperitoneal or transabdominal**, since the canal cannot be exposed or assessed from the thigh.",
      "Strangulation is often present by the time of diagnosis, and a **Richter pattern** is common because the canal is so narrow.",
    ],
  }, SOURCE),
  sourced({
    id: "block-uh-contents",
    type: "table",
    heading: "Named for what is in the sac",
    columns: ["Eponym", "Contents", "Why it changes management"],
    rows: [
      ["Richter", "The **antimesenteric wall** of the bowel alone, rather than a full loop", "Strangulates and perforates **without ever obstructing**, so the bowel dies while the presentation stays deceptively mild"],
      ["Littre", "A **Meckel diverticulum**", "Needs **diverticulectomy** alongside the repair, and the inflamed field argues against a prosthesis"],
      ["Amyand", "The appendix, inside an **inguinal sac**", "Whether the appendix is **inflamed** decides both appendectomy and whether mesh can safely be used"],
      ["De Garengeot", "The appendix, inside a **femoral sac**", "Almost always discovered **at operation** rather than diagnosed beforehand"],
      ["Pantaloon", "Both a **direct** and an **indirect** sac, straddling the inferior epigastric vessels", "Neither defect can be dealt with in isolation, so the **whole floor** has to be reconstructed"],
      ["Maydl", "Two loops in the sac, with a third loop lying back inside the abdomen in a **W configuration**", "The strangulated segment is the **intra-abdominal one**, so viable-looking bowel in the sac does not exclude dead bowel above it"],
    ],
  }, SOURCE),
  sourced({
    id: "block-uh-warning",
    type: "warning",
    heading: "A Spigelian hernia will not be found by palpating for it",
    tone: "pearl",
    text: "The defect lies in the transversus and internal oblique aponeuroses while the **external oblique** above it stays intact, so the sac spreads sideways between layers instead of pushing out through the skin. There is frequently **nothing to feel**, and the patient describes intermittent focal pain lateral to the rectus with no visible bulge. The neck is narrow and the **incarceration rate** is high, so the diagnosis is made on CT and repair follows the diagnosis rather than waiting for symptoms to progress.",
  }, SOURCE),
  references("block-uh-references", [SOURCE]),
];

export const unusualHerniasTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000000506",
  versionId: "00000000-0000-4000-8000-000000000516",
  slug: "unusual-hernias",
  title: "Unusual Hernias",
  aliases: ["Spigelian", "obturator hernia", "Howship-Romberg", "Hannington-Kiff", "lumbar hernia", "Grynfeltt", "Petit triangle", "sciatic hernia", "perineal hernia", "Richter", "Littre", "Amyand", "De Garengeot", "pantaloon hernia", "Maydl", "semilunar line"],
  scoreNodeId: "hernia-conditions",
  scoreCategory: "SCORE · Hernia · Diseases & Conditions",
  tags: ["hernia", "abdominal-wall", "eponyms", "absite", "score"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-14T00:00:00.000Z",
});
