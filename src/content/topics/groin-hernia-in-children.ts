import { buildTopic, references, sourced } from "@/content/authoring";
import { HERNIA_SOURCE as SOURCE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-gc-summary",
    type: "summary",
    heading: "At a glance",
    text: "A groin hernia in a child is a patency problem, not a strength problem. The processus vaginalis failed to obliterate, so the operation is high ligation of the sac at the internal ring and nothing more — no floor repair, no mesh. The judgment calls are all around the operation rather than in it: when to reduce an incarcerated hernia rather than operate on it, whether to look at the other side, and which infants need an overnight bed for apnea.",
  }, SOURCE),
  sourced({
    id: "block-gc-epidemiology",
    type: "bullets",
    heading: "Epidemiology and embryology",
    items: [
      "More than nine in ten pediatric groin hernias are indirect, arising from a processus vaginalis that never closed.",
      "The testis descends behind the processus, which is why the sac lies anteromedial to the cord and must be separated from it.",
      "Boys are affected several times more often than girls, and about three in five hernias are on the right, mirroring the later descent of the right testis.",
      "Prematurity raises both the incidence and the risk of incarceration, and the risk of incarceration is highest in the first year of life.",
      "A patent processus is not the same thing as a hernia — many are patent at birth and never produce one, which is the argument against treating patency found incidentally as a diagnosis.",
      "Repair is elective but not deferred, because the younger the infant the greater the chance of incarceration while waiting.",
    ],
  }, SOURCE),
  sourced({
    id: "block-gc-operation",
    type: "sequence",
    heading: "High ligation of the sac",
    steps: [
      { title: "Positioning", detail: "Supine under general anesthesia, with a caudal or local block placed to reduce opioid requirement and postoperative apnea." },
      { title: "Incision", detail: "Short transverse incision in the lowest inguinal skin crease, over the internal ring rather than over the bulge." },
      { title: "External oblique", detail: "Open the aponeurosis in the line of its fibers, protecting the ilioinguinal nerve lying immediately beneath it." },
      { title: "Delivering the cord", detail: "Lift the cord structures out of the canal and identify the sac on their anteromedial aspect." },
      { title: "Separating the sac", detail: "Dissect the sac free of the vas deferens and the testicular vessels, handling the vas only with the surrounding tissue." },
      { title: "High ligation", detail: "Twist, suture-ligate, and divide the sac flush at the level of the internal ring, where preperitoneal fat marks the peritoneum." },
      { title: "Closure", detail: "Close the external oblique and the skin, and confirm the testis is seated in the scrotum before the drapes come off." },
    ],
  }, SOURCE),
  sourced({
    id: "block-gc-incarceration",
    type: "flow",
    heading: "The incarcerated infant hernia",
    nodes: [
      { id: "irreducible", label: "Irreducible groin swelling in an infant" },
      { id: "toxic", label: "Peritonitis, obstruction, or discoloration of the overlying skin", tone: "caution" },
      { id: "taxis", label: "Sedation, Trendelenburg positioning, and gentle sustained pressure" },
      { id: "reduced", label: "Reduction succeeds", tone: "good" },
      { id: "failed", label: "Reduction fails", tone: "caution" },
      { id: "sameadmission", label: "Admit and repair on the same admission once edema settles", tone: "good" },
      { id: "emergent", label: "Emergent operation through the groin, with bowel inspected before it is returned", tone: "caution" },
    ],
    edges: [
      { from: "irreducible", to: "toxic", label: "strangulation suspected" },
      { from: "irreducible", to: "taxis", label: "no peritonitis and the child is stable" },
      { from: "toxic", to: "emergent" },
      { from: "taxis", to: "reduced" },
      { from: "taxis", to: "failed" },
      { from: "reduced", to: "sameadmission" },
      { from: "failed", to: "emergent" },
    ],
  }, SOURCE),
  sourced({
    id: "block-gc-contralateral",
    type: "prose",
    heading: "Board answer versus current practice",
    text: "The classic teaching explores the opposite groin routinely in infants under a year, in girls, and when the presenting hernia is on the left, on the reasoning that a contralateral patent processus is common and a second anesthetic is worse than a second incision. Current practice has narrowed that considerably. Most contralateral patent processes never become hernias, the metachronous rate is only a few percent, and an open contralateral exploration is a real operation on the vas and the testicular vessels for a mostly theoretical benefit. Where the question is asked, the modern compromise is laparoscopic inspection of the contralateral ring through the hernia sac at the time of repair, which costs nothing extra in dissection. Answer the exam with the classic indications and counsel the family with the current data.",
  }, SOURCE),
  sourced({
    id: "block-gc-perioperative",
    type: "bullets",
    heading: "Perioperative pearls",
    items: [
      "An infant under 60 weeks post-conceptual age is admitted for overnight apnea monitoring after a general anesthetic, and a history of prematurity or anemia lowers that threshold further.",
      "In a girl, the content of an incarcerated sac is often ovary, which slides in the wall of the sac and must never be forced back.",
      "An ovary trapped in the sac can torse, so an irreducible ovary is an indication to operate rather than to wait.",
      "A fluid-filled swelling that transilluminates and does not extend to the internal ring is a hydrocele; in a girl the equivalent is a hydrocele of the canal of Nuck.",
      "A communicating hydrocele is a hernia by another name and is repaired the same way, by high ligation.",
      "No mesh and no floor reconstruction belong in a routine pediatric repair — the floor is normal.",
    ],
  }, SOURCE),
  sourced({
    id: "block-gc-warning",
    type: "warning",
    heading: "Force is never part of reduction",
    text: "Gentle sustained pressure with sedation and Trendelenburg positioning reduces most incarcerated infant hernias; force does not, and it risks reducing ischemic bowel or a torsed ovary out of sight into the abdomen. Stop at any sign of peritonitis, obstruction, or skin change and go to the operating room instead. After a successful reduction the child stays in hospital, because the reason to reduce was to operate on a decompressed field the next day rather than to send anyone home.",
  }, SOURCE),
  references("block-gc-references", [SOURCE]),
];

export const groinHerniaInChildrenTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000000503",
  versionId: "00000000-0000-4000-8000-000000000513",
  slug: "groin-hernia-in-children",
  title: "Groin Hernia in Children",
  aliases: ["pediatric inguinal hernia", "pediatric hernia", "high ligation", "patent processus vaginalis", "PPV", "communicating hydrocele", "canal of Nuck", "contralateral exploration", "apnea", "post-conceptual age"],
  scoreNodeId: "hernia-conditions",
  scoreCategory: "SCORE · Hernia · Diseases & Conditions",
  tags: ["hernia", "pediatric-surgery", "groin", "absite", "score"],
  sourceId: SOURCE,
  blocks,
  reviewedAt: "2026-08-14T00:00:00.000Z",
});
