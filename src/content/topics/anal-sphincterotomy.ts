import { buildTopic, references, sourced } from "@/content/authoring";
import { ANORECTAL_PACKET_SOURCE as PACKET, ASCRS_ANAL_FISSURE_SOURCE as ASCRS, FISER_BENIGN_ANORECTAL_SOURCE as FISER, SCORE_ANAL_SPHINCTEROTOMY_SOURCE as SCORE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-lis-summary",
    type: "summary",
    heading: "At a glance",
    text: "**Lateral internal sphincterotomy** (LIS) gives the most reliable healing of a chronic typical **[[anal fissure]]** by dividing part of the internal anal sphincter. The price is possible incontinence of gas or stool. The decisions that matter come **before the blade**: confirm the fissure is idiopathic, document baseline continence and prior sphincter injury, go **lateral**, and stop at the **fissure apex**. Open and closed techniques give the same results when done properly.",
  }, PACKET),
  sourced({
    id: "block-lis-selection",
    type: "table",
    heading: "Who gets a sphincterotomy",
    columns: ["Situation", "Decision"],
    rows: [
      ["**Acute typical fissure**", "No operation — sitz baths and fiber; most heal"],
      ["**Chronic typical fissure**, failed medical therapy", "LIS is recommended once topical agents and botulinum toxin have failed"],
      ["**Chronic fissure, continent, prefers surgery**", "ASCRS 2023 allows **primary LIS** after counseling, without a drug trial first"],
      ["**Baseline leakage**, obstetric injury, prior anorectal surgery, or known sphincter damage", "Reconsider division; an **advancement flap** preserves the sphincter"],
      ["**Atypical fissure** — Crohn disease, infection, malignancy", "Contraindicated; treat the underlying disease"],
      ["**Incontinence after botulinum toxin**", "A warning against sphincterotomy, not a reason to escalate to one"],
    ],
  }, PACKET),
  sourced({
    id: "block-lis-anatomy",
    type: "bullets",
    heading: "Protective anatomy",
    items: [
      "**Target:** the **internal sphincter** — the smooth muscle the topical agents and botulinum toxin were relaxing.",
      "**Preserve:** the **external sphincter**. Find the **intersphincteric groove** between the two muscles before dividing anything.",
      "**Why lateral:** a **posterior** sphincterotomy through the fissure bed leaves a **keyhole deformity** that causes soiling.",
      "**How far:** a **tailored** division ends at the **fissure apex** rather than routinely at the dentate line — less muscle divided, healing preserved.",
      "How tight the anus feels does not set the extent of the cut; the plane and the proximal endpoint are separate decisions.",
    ],
  }, SCORE),
  sourced({
    id: "block-lis-counseling",
    type: "bullets",
    heading: "Counseling and preparation",
    items: [
      "Record existing loss of flatus, seepage, liquid stool, and solid stool control, and any obstetric or prior anorectal injury.",
      "Offer the alternatives: continued bowel measures and topicals, botulinum toxin, and a flap where continence risk is high.",
      "Healing runs **88% to 100%**. Reported incontinence ranges from **4% to 30%**, and some historical series quote higher; most of it is **transient flatus loss or seepage** in the first month.",
      "Persistent **solid-stool incontinence** is uncommon but is the outcome that wrecks quality of life — do not promise every continence change will resolve.",
      "Anesthesia can be general, spinal, monitored, or often **local alone**; position is **lithotomy** or **prone jackknife**.",
    ],
  }, SCORE),
  sourced({
    id: "block-lis-steps",
    type: "sequence",
    heading: "Key steps",
    steps: [
      { title: "Position and find the apex", detail: "Lithotomy or prone jackknife. Identify the fissure and its **proximal apex**, which is where the division will stop." },
      { title: "Expose without stretching", detail: "Place an anoscope or **Pratt speculum** gently; tension on the internal sphincter makes the **lateral intersphincteric groove** palpable. This is exposure, not therapeutic dilation." },
      { title: "Choose open or closed", detail: "Both are accepted and neither has better healing or continence. The choice never justifies a longer cut." },
      { title: "Open technique", detail: "Radial skin incision **distal to the dentate line** over the groove; identify and elevate the internal sphincter, divide the selected length, and **close the wound primarily**." },
      { title: "Closed technique", detail: "Enter the lateral groove with the blade and turn **medially** to divide internal sphincter fibers — only once the plane is clearly identified." },
      { title: "Stop at the apex", detail: "Confirm the division reaches the fissure apex and no further, and that the external sphincter is intact." },
    ],
  }, SCORE),
  sourced({
    id: "block-lis-uncertain",
    type: "warning",
    tone: "danger",
    heading: "If the plane is not clear, stop cutting",
    text: "The closed technique depends on accurate identification of the **intersphincteric groove**. If the plane cannot be identified with confidence, stop the division, re-establish the anatomy with better exposure or supervision, or convert to the open approach. A blind extension of the cut is how an internal sphincterotomy becomes an external one.",
  }, PACKET),
  sourced({
    id: "block-lis-complications",
    type: "table",
    heading: "Complications and failure",
    columns: ["Problem", "What to do"],
    rows: [
      ["**Continence change**", "Ask separately about gas, seepage, liquid, and solid stool, compare with baseline, and follow the course — most early leakage improves"],
      ["**Nonhealing fissure**", "Re-examine; persistent hard stool, Crohn disease, infection, or tumor may explain it. A longer cut is not the default answer"],
      ["**Recurrent fissure**", "Reassess continence and the secondary differential; repeat LIS or botulinum toxin on limited evidence"],
      ["**Continence at risk for any further division**", "**Anocutaneous advancement flap** — avoiding LIS does not mean no operation"],
    ],
  }, PACKET),
  sourced({
    id: "block-lis-split",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Extent of division", "To the **dentate line**, as Fiser's technique caption draws it", "**To the fissure apex** — ASCRS 2023 recommends tailoring"],
      ["When LIS is indicated", "After failed topicals **and** botulinum toxin", "Primary LIS is acceptable in a counseled, continent patient"],
      ["Flap as the alternative", "Lower continence risk but **worse healing**", "Healing **comparable** to LIS on weaker evidence"],
    ],
  }, PACKET),
  sourced({
    id: "block-lis-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "**LIS is the best-healing operation** for a chronic typical fissure in a continent patient.",
      "**Incontinence is the tradeoff** — ask about leakage and obstetric injury before booking the case.",
      "**Open and closed are equivalent**; knowing the plane and the endpoint matters in both.",
      "**Tailored means the fissure apex**, not obligatorily the dentate line.",
      "**Posterior sphincterotomy causes a keyhole deformity**; go lateral.",
      "**Atypical fissure → find the cause; baseline incontinence → flap.**",
    ],
  }, PACKET),
  references("block-lis-references", [PACKET, SCORE, ASCRS, FISER]),
];

export const analSphincterotomyTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000004630",
  versionId: "00000000-0000-4000-8000-000000004631",
  slug: "anal-sphincterotomy",
  title: "Anal Sphincterotomy",
  aliases: ["lateral internal sphincterotomy", "LIS", "internal sphincterotomy", "tailored sphincterotomy", "open sphincterotomy", "closed sphincterotomy", "subcutaneous sphincterotomy", "intersphincteric groove", "keyhole deformity", "posterior sphincterotomy", "Pratt speculum"],
  scoreNodeId: "anorectal-procedures",
  scoreCategory: "SCORE · Anorectal · Operations & Procedures",
  tags: ["anorectal", "fissure", "colorectal", "operative-technique", "absite", "score"],
  sourceId: PACKET,
  additionalSourceIds: [SCORE, ASCRS, FISER],
  blocks,
  reviewedAt: "2026-10-22T00:00:00.000Z",
});
