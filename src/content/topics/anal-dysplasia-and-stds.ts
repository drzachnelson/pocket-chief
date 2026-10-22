import { buildTopic, references, sourced } from "@/content/authoring";
import { ANCHOR_TRIAL_SOURCE as ANCHOR, ANORECTAL_PACKET_SOURCE as PACKET, CDC_HPV_VACCINE_SOURCE as VACCINE, CDC_STI_2021_SOURCE as CDC, FISER_BENIGN_ANORECTAL_SOURCE as FISER, NIH_HIV_HPV_SOURCE as NIH, NYSDOH_ANAL_DYSPLASIA_SOURCE as NYSDOH, SCORE_ANAL_DYSPLASIA_STDS_SOURCE as SCORE } from "@/content/sources";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
    id: "block-ainstd-summary",
    type: "summary",
    heading: "At a glance",
    text: "An anal wart, an abnormal anal Pap, a painful ulcer, and proctitis each lead somewhere different. **Localize the lesion, take the right specimen, and separate visible HPV disease from biopsy-proven dysplasia or invasion.** Cytology screens; tissue diagnoses. In adults with HIV, treating biopsy-proven **HSIL** reduces progression to anal cancer, so it is no longer a lesion to watch indefinitely. The operation for bulky warts is in **[[Perianal Condylomas Excision]]**.",
  }, PACKET),
  sourced({
    id: "block-ainstd-hpv",
    type: "bullets",
    heading: "HPV risk",
    items: [
      "Most anal HPV infection is **asymptomatic**, and it does not require a history of receptive anal intercourse.",
      "**HPV 6 and 11** cause condylomata and low-grade disease; **HPV 16 and 18** drive high-grade dysplasia and squamous cell carcinoma.",
      "**HIV**, other chronic immunosuppression, and **smoking** raise the concern for persistent HPV-related disease.",
      "Take a history of immune status, tobacco, prior HPV lesions, and vaccination — not just sexual history — when deciding who needs evaluation.",
    ],
  }, SCORE),
  sourced({
    id: "block-ainstd-vaccine",
    type: "bullets",
    heading: "HPV vaccination",
    items: [
      "Routine at **11 to 12 years**, and it may start at 9.",
      "Catch-up through age **26**; shared decision-making for selected adults **27 to 45**.",
      "**Two doses** 6 to 12 months apart when started before 15; **three doses** at 0, 1 to 2, and 6 months for those starting at 15 or older and for immunocompromised people.",
      "It prevents new infection and **does not treat** existing lesions.",
    ],
  }, VACCINE),
  sourced({
    id: "block-ainstd-exam",
    type: "sequence",
    heading: "Localize the lesion",
    steps: [
      { title: "Inspect externally", detail: "Perianal skin, the verge, lesion burden, ulceration, and bleeding. Describe **anterior, posterior, right, and left** — a clock face changes meaning between prone and lithotomy." },
      { title: "Swab before lubricant", detail: "Collect cytology and rectal or lesion swabs **before** the lubricated digital examination, so plan the specimens first." },
      { title: "Digital examination and anoscopy", detail: "Record any palpable abnormality and how canal lesions relate to the dentate line. If pain prevents it, examine in a different setting." },
      { title: "Biopsy what is uncertain", detail: "Abnormal cytology directs further evaluation; **targeted biopsy** establishes dysplasia. Suspected invasion is never settled by destroying the lesion." },
    ],
  }, SCORE),
  sourced({
    id: "block-ainstd-pathway",
    type: "table",
    heading: "Choose the diagnostic pathway",
    columns: ["Presentation", "Question", "Evaluation"],
    rows: [
      ["**Exophytic, wart-like lesion**", "Benign wart, dysplasia, or invasion?", "Examine the canal; biopsy atypical or uncertain lesions"],
      ["**Abnormal anal cytology**", "Is there biopsy-proven HSIL?", "**High-resolution anoscopy** with directed biopsy"],
      ["**Painful ulcer** in an STI-risk context", "HSV, syphilis, or something else?", "HSV testing of the lesion, plus syphilis and HIV serology"],
      ["**Pain, discharge, tenesmus** — proctitis", "Gonorrhea, chlamydia or LGV, HSV, syphilis?", "Anoscopy, rectal NAAT and lesion testing, and empiric treatment when indicated"],
    ],
  }, SCORE),
  sourced({
    id: "block-ainstd-terms",
    type: "table",
    heading: "Cytology, histology, and HRA answer different questions",
    columns: ["Term", "Meaning"],
    rows: [
      ["**Anal cytology**", "A screening test for abnormal cells; its result is not a biopsy grade"],
      ["**LSIL**", "Low-grade squamous intraepithelial lesion — AIN 1 in the two-tier system"],
      ["**HSIL**", "High-grade squamous intraepithelial lesion — AIN 2 and 3, the cancer precursor"],
      ["**High-resolution anoscopy**", "Magnified examination after **acetic acid** to target biopsy; acetowhitening locates tissue but proves nothing"],
      ["**Invasive squamous cell carcinoma**", "A separate diagnosis for specialist staging and treatment, not a dysplasia pathway"],
    ],
  }, PACKET),
  sourced({
    id: "block-ainstd-screening",
    type: "bullets",
    heading: "Screening in adults with HIV",
    items: [
      "Ask every person with HIV about anal symptoms **every year**.",
      "Start screening — anal cytology with a digital anorectal examination — at **35 for men who have sex with men and transgender women** and at **45 for other people with HIV**.",
      "Symptoms at any age warrant evaluation rather than waiting for the screening age.",
      "Screening only makes sense when **high-resolution anoscopy** and treatment are available to act on an abnormal result.",
      "A normal cytology does not clear a visible or palpable lesion.",
    ],
  }, NIH),
  sourced({
    id: "block-ainstd-hsil",
    type: "prose",
    heading: "HSIL changes the goal of treatment",
    text: "The **ANCHOR** trial randomized adults with HIV aged 35 or older with biopsy-proven anal HSIL to treatment or active monitoring. **Treatment reduced progression to anal cancer by 57%.** That is a relative reduction in an HIV population, not elimination of cancer risk or an effect size proven for everyone.",
  }, ANCHOR),
  sourced({
    id: "block-ainstd-hsil-followup",
    type: "bullets",
    heading: "After HSIL treatment",
    items: [
      "**Treat biopsy-confirmed HSIL** in adults with HIV, by a clinician experienced in high-resolution anoscopy.",
      "Repeat **high-resolution anoscopy 6 months** after successful treatment, then follow by histology.",
      "Prior HSIL means **ongoing surveillance** — recurrence and persistence are common, and treating the lesion does not end follow-up.",
      "Wart removal is not a substitute for a dysplasia program.",
    ],
  }, NYSDOH),
  sourced({
    id: "block-ainstd-warts",
    type: "table",
    heading: "Condylomata: choose by site and burden",
    columns: ["Situation", "Treatment"],
    rows: [
      ["**Limited external warts**", "Observation, patient-applied **imiquimod** or **podofilox**, or provider-applied **cryotherapy** or **trichloroacetic acid**"],
      ["**Intra-anal warts**", "Provider treatment — cryotherapy, trichloroacetic or bichloroacetic acid, or surgical removal — never a self-applied external agent"],
      ["**Bulky or extensive warts**", "Excision and fulguration, often staged to preserve skin bridges"],
      ["**Suspicious lesion**", "Biopsy before any destructive treatment"],
    ],
  }, CDC),
  sourced({
    id: "block-ainstd-wart-cautions",
    type: "bullets",
    heading: "Topical agents — what changed",
    items: [
      "Treatment duration is **agent-specific**, not a uniform 16-week course.",
      "**Podophyllin resin** is no longer a recommended regimen; it is not the same drug as podofilox.",
      "**Sinecatechins** is not recommended in HIV or other immunocompromise.",
      "In **pregnancy**, avoid podofilox, podophyllin, and sinecatechins, and avoid imiquimod until more data exist.",
      "Local reactions — erythema, burning, irritation, ulceration — are expected; clearing visible warts does not end infectivity.",
    ],
  }, CDC),
  sourced({
    id: "block-ainstd-proctitis",
    type: "bullets",
    heading: "Acute proctitis — the CDC regimen",
    items: [
      "Causes are **gonorrhea, chlamydia including LGV, HSV, and syphilis**; in immunosuppressed patients with proctocolitis add **CMV** and other opportunists.",
      "Do not call it inflammatory bowel disease before the infectious workup is done.",
      "Treat presumptively for anorectal exudate or inflammation on anoscopy, or a compatible syndrome when anoscopy and Gram stain are not available.",
      "**Ceftriaxone 500 mg IM once** plus **doxycycline 100 mg orally twice daily for 7 days**; ceftriaxone **1 g** at 150 kg or more.",
      "Extend doxycycline to **21 days** for a positive rectal chlamydia test with bloody discharge, ulcers, or tenesmus — presumed **LGV**.",
      "Painful perianal or mucosal ulcers also get presumptive **HSV** treatment.",
    ],
  }, CDC),
  sourced({
    id: "block-ainstd-ulcers",
    type: "table",
    heading: "Ulcerative infections",
    columns: ["Diagnosis", "Treatment"],
    rows: [
      ["**First episode of HSV**", "Confirm with lesion NAAT; **valacyclovir 1 g twice daily for 7 to 10 days**, longer if healing is incomplete"],
      ["**Primary or secondary syphilis**", "**Benzathine penicillin G 2.4 million units IM once**; neurologic, ocular, or otic signs need separate evaluation"],
      ["**Persistent or atypical ulcer**, especially with immunosuppression", "Keep malignancy and opportunistic infection in the differential and **biopsy**"],
    ],
  }, CDC),
  sourced({
    id: "block-ainstd-lata",
    type: "warning",
    tone: "pearl",
    heading: "Condyloma lata is not condyloma acuminata",
    text: "**Condylomata lata** are the moist, flat, gray plaques of **secondary syphilis**; **condylomata acuminata** are the cauliflower warts of HPV. A wart-like lesion in a sexually active patient gets syphilis serology before anyone reaches for cautery, because the treatment is penicillin, not fulguration.",
  }, PACKET),
  sourced({
    id: "block-ainstd-split",
    type: "table",
    heading: "Board answer versus current practice",
    columns: ["Question", "Board answer", "Current practice"],
    rows: [
      ["Anal HSIL in a person with HIV", "Observe, or biopsy every **4 to 6 months** (Fiser)", "**Treat** biopsy-proven HSIL — ANCHOR showed a 57% reduction in cancer — and repeat HRA at 6 months"],
      ["Topical wart treatment", "A uniform course up to **16 weeks**, with podophyllin among the options (SCORE)", "Agent-specific durations; **podophyllin is no longer recommended**"],
    ],
  }, PACKET),
  sourced({
    id: "block-ainstd-pearls",
    type: "bullets",
    heading: "Board pearls",
    items: [
      "**HPV 6 and 11 cause warts; 16 and 18 cause cancer.**",
      "**Cytology screens; biopsy grades**; high-resolution anoscopy aims the biopsy.",
      "**Treat HSIL in adults with HIV** — and keep following them.",
      "**Intra-anal warts are not treated with self-applied topicals.**",
      "**Condyloma lata is syphilis.**",
      "**Swab first, then lubricate and examine.**",
      "**Proctitis: ceftriaxone plus doxycycline**; 21 days of doxycycline if it looks like LGV.",
    ],
  }, PACKET),
  references("block-ainstd-references", [PACKET, SCORE, CDC, NIH, NYSDOH, ANCHOR, VACCINE, FISER]),
];

export const analDysplasiaAndStdsTopic = buildTopic({
  id: "00000000-0000-4000-8000-000000004680",
  versionId: "00000000-0000-4000-8000-000000004681",
  slug: "anal-dysplasia-and-stds",
  title: "Anal Dysplasia and STDs",
  aliases: ["anal dysplasia", "anal intraepithelial neoplasia", "AIN", "anal HSIL", "anal LSIL", "high-grade squamous intraepithelial lesion", "low-grade squamous intraepithelial lesion", "anal Pap", "anal cytology", "high-resolution anoscopy", "HRA", "ANCHOR trial", "anal HPV", "HPV vaccine", "condylomata acuminata", "anal warts", "anogenital warts", "condyloma lata", "infectious proctitis", "STI proctitis", "lymphogranuloma venereum", "LGV", "anal herpes", "anorectal syphilis", "imiquimod", "podofilox", "sexually transmitted infection", "STI", "STD"],
  scoreNodeId: "anorectal-conditions",
  scoreCategory: "SCORE · Anorectal · Diseases & Conditions",
  tags: ["anorectal", "hpv", "dysplasia", "sti", "hiv", "absite", "score"],
  sourceId: PACKET,
  additionalSourceIds: [SCORE, CDC, NIH, NYSDOH, ANCHOR, VACCINE, FISER],
  blocks,
  reviewedAt: "2026-10-22T00:00:00.000Z",
});
