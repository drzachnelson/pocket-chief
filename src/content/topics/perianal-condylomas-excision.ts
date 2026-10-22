import { buildTopic, references, sourced } from "@/content/authoring";
import { ANORECTAL_PACKET_SOURCE as PACKET, CDC_STI_2021_SOURCE as CDC, FISER_BENIGN_ANORECTAL_SOURCE as FISER, SCORE_ANAL_DYSPLASIA_STDS_SOURCE as SCORE_DYSPLASIA, SCORE_PERIANAL_CONDYLOMAS_SOURCE as SCORE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-condyl-summary",
    type: "summary",
    heading: "At a glance",
    text: "Treat the visible lesions and spare everything around them. **Excision and fulguration** clear bulky condylomata acuminata quickly, but they do not eradicate HPV, and recurrence is common. The two operative errors are **destroying a suspicious lesion before tissue is taken** and creating a **circumferential wound that heals as anal stenosis**. HPV risk, screening, and the infectious differential are in **[[Anal Dysplasia and STDs]]**.",
  }, PACKET),
  sourced({
    id: "block-condyl-selection",
    type: "table",
    heading: "Who needs an operation",
    columns: ["Finding", "Decision"],
    rows: [
      ["**Small, limited external lesions**", "Observation or topical and office treatment first"],
      ["**Multiple lesions** or any **over 1 cm**", "SCORE suggests considering surgery — a cue, not a mandatory threshold"],
      ["**Extensive disease** or poor office tolerance", "Operating room, with anesthesia and exposure to match"],
      ["**Near-circumferential involvement**", "**Staged** clearance with healing between stages, preserving skin bridges"],
      ["**Induration, ulceration, bleeding, fixation**, or a lesion that does not behave like a wart", "**Biopsy first** and manage the pathology it shows"],
    ],
  }, SCORE),
  sourced({
    id: "block-condyl-biopsy",
    type: "bullets",
    heading: "When the wart needs a biopsy",
    items: [
      "The diagnosis is uncertain.",
      "Lesions do not respond to standard therapy or worsen during it.",
      "The patient is **immunocompromised**, including with HIV.",
      "Lesions are **pigmented, indurated, fixed, bleeding, or ulcerated**.",
    ],
  }, CDC),
  sourced({
    id: "block-condyl-anatomy",
    type: "bullets",
    heading: "Anatomy that limits depth",
    items: [
      "Map lesions across the **anal canal**, the **dentate line**, and the **perianal skin** before choosing treatment; internal lesions are common and are found only on anoscopy.",
      "Columnar mucosa above passes through a **transitional zone** to nonkeratinized anoderm and then keratinized perianal skin at the verge — a gradient, not a sharp line.",
      "Condylomata are **epithelial** lesions. Treatment stays within the epidermis and dermis; going deeper reaches sphincter without treating the virus.",
      "Preserve the skin between lesions rather than chasing an oncologic margin around an ordinary wart.",
    ],
  }, PACKET),
  sourced({
    id: "block-condyl-prep",
    type: "bullets",
    heading: "Counseling and preparation",
    items: [
      "**Clearance is not cure**: visible lesions can be cleared in **89% to 100%** while HPV persists, and recurrence runs up to about **one third**.",
      "Warn about pain for roughly **4 weeks**, bleeding, scarring, pigment change, and **stenosis** after excessive circumferential treatment.",
      "Examine the perianal field and perform **anoscopy** for internal lesions; examine adjacent genital skin as appropriate.",
      "**Lithotomy** or **prone jackknife**, pressure points padded; local anesthesia with a perianal block, or general anesthesia for extensive disease.",
      "**Smoke evacuation**, protective eyewear, and respiratory protection belong in the setup — electrosurgical plume from HPV lesions is an occupational exposure.",
    ],
  }, SCORE),
  sourced({
    id: "block-condyl-steps",
    type: "sequence",
    heading: "Key steps — excision and fulguration",
    steps: [
      { title: "Expose and map", detail: "After positioning and anesthesia, inspect perianal skin, anal canal, and adjacent sites, and record the distribution in anatomic terms." },
      { title: "Take tissue first", detail: "Send any uncertain or atypical lesion for histology **before** fulgurating — cautery destroys the only material that can make the diagnosis." },
      { title: "Excise the bulky lesions", detail: "Scissor or shave excision of raised lesions at the dermal level, protecting the sphincter beneath. Excision and fulguration may be combined." },
      { title: "Fulgurate the small ones", detail: "Ablate flat or small lesions with **controlled depth**, avoiding confluent deep burns, with smoke evacuation running throughout." },
      { title: "Preserve the bridges", detail: "In extensive disease leave intact **skin bridges**, anteriorly and posteriorly as SCORE describes, and **stage** the rest rather than leaving a circumferential raw surface." },
      { title: "Finish deliberately", detail: "Secure hemostasis, record what was deliberately left for a later stage, and plan pathology review of anything sampled." },
    ],
  }, SCORE),
  sourced({
    id: "block-condyl-ring",
    type: "warning",
    tone: "danger",
    heading: "A ring burn heals as a stricture",
    text: "Circumferential excision or fulguration of the anoderm heals by contraction into **anal stenosis**. The prevention is in the first operation: **preserve skin bridges and stage** extensive disease. Repairing an established stenosis is a separate operation outside this module.",
  }, SCORE),
  sourced({
    id: "block-condyl-buschke",
    type: "warning",
    tone: "pearl",
    heading: "A giant wart is a cancer until proven otherwise",
    text: "The **Buschke-Lowenstein tumor** — giant condyloma, or verrucous carcinoma — is a locally invasive, slow-growing lesion that can erode into the sphincter and perirectal tissue. It does not belong in the fulguration pathway: biopsy it, image the extent, and treat with **wide local excision**.",
  }, PACKET),
  sourced({
    id: "block-condyl-complications",
    type: "table",
    heading: "Complications",
    columns: ["Problem", "Response"],
    rows: [
      ["**Expected pain** and a superficial treatment wound", "Counsel that healing takes weeks; reassess rather than promise early comfort"],
      ["**Superficial burn**", "Routine cleansing and a topical moisturizing ointment"],
      ["**Significant bleeding**", "Evaluate as for any perianal procedure bleed"],
      ["**Scarring or pigment change**", "Review depth of treatment before any further ablation"],
      ["**Anal stenosis**", "Prevented by skin bridges and staging; established stenosis needs formal assessment"],
      ["**Recurrent lesions**", "Re-examine and retreat; biopsy again if a lesion turns atypical"],
    ],
  }, SCORE),
  sourced({
    id: "block-condyl-followup",
    type: "bullets",
    heading: "Follow-up and pathology",
    items: [
      "Review at about **2 weeks** to check clearance, then serial examinations with repeat anoscopy as needed.",
      "Read the pathology on everything sampled and separate residual condyloma from **dysplasia** or invasion.",
      "A staged procedure needs an explicit return plan once the treated field heals.",
      "Biopsy showing **HSIL** moves the patient into HSIL treatment and anoscopic follow-up, which is a different endpoint from wart clearance.",
    ],
  }, SCORE),
  sourced({
    id: "block-condyl-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "**Preserve skin bridges** — circumferential treatment causes anal stenosis.",
      "**Superficial disease, superficial treatment**: no deep excision, no wide margins for ordinary condylomata.",
      "**A suspicious wart needs tissue** before cautery erases the diagnosis.",
      "**Clearance does not eradicate HPV** — expect recurrence and re-examine.",
      "**Smoke evacuation** is part of the setup for fulguration.",
      "**Giant condyloma is Buschke-Lowenstein** — wide local excision.",
      "**Condyloma lata is syphilis**, not HPV — test before you burn.",
    ],
  }, PACKET),
  references("block-condyl-references", [PACKET, SCORE, SCORE_DYSPLASIA, CDC, FISER]),
];

export const perianalCondylomasExcisionTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000004670",
  versionId: "00000000-0000-4000-8000-000000004671",
  slug: "perianal-condylomas-excision",
  title: "Perianal Condylomas Excision",
  aliases: ["condyloma excision", "condylomata acuminata excision", "perianal condyloma", "perianal warts surgery", "anal wart excision", "excision and fulguration", "fulguration of condylomata", "surgical smoke evacuation", "Buschke-Lowenstein tumor", "Buschke-Löwenstein tumor", "giant condyloma", "verrucous carcinoma"],
  scoreNodeId: "anorectal-procedures",
  scoreCategory: "SCORE · Anorectal · Operations & Procedures",
  tags: ["anorectal", "hpv", "condyloma", "colorectal", "operative-technique", "absite", "score"],
  sourceId: PACKET,
  additionalSourceIds: [SCORE, SCORE_DYSPLASIA, CDC, FISER],
  blocks,
  reviewedAt: "2026-10-22T00:00:00.000Z",
});
