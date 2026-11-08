import { buildTopic, references, sourced } from "@/content/authoring";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-1",
  "type": "summary",
  "heading": "Act on suspicion",
  "text": "**Necrotizing soft-tissue infection (NSTI)** destroys skin, subcutaneous tissue, fascia, and sometimes muscle through spreading infection and microvascular thrombosis. **Pain out of proportion or beyond visible erythema** can precede skin changes and shock. Resuscitation, broad IV antibiotics, and operative exploration proceed together; antibiotics alone cannot penetrate and sterilize necrotic tissue."
}, "00000000-0000-4000-8000-000000007301"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-2",
  "type": "bullets",
  "heading": "Recognize the deceptively normal skin",
  "items": [
    "Progression despite antibiotics, wooden induration, tenderness beyond erythema, rapidly increasing edema, confusion, hypotension, or hypothermia raise concern. Bullae, ecchymoses, skin anesthesia, crepitus, and necrosis are late; absent fever or gas does not exclude disease.",
    "Risk rises with diabetes, obesity, vascular disease, cirrhosis, alcohol use, immunosuppression, malignancy, injection drug use, surgery, childbirth, or trauma. GAS can affect healthy people after blunt muscle injury with no skin break. Neuropathy, analgesia, and attribution to routine postoperative pain mask it.",
    "Cellulitis is superficial; necrotizing cellulitis affects skin/subcutis, fasciitis the fascia, and myonecrosis muscle. Pyomyositis is a muscle infection, often staphylococcal, and is not automatically an NSTI."
  ]
}, "00000000-0000-4000-8000-000000007301"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-3",
  "type": "table",
  "heading": "Microbiology and exposure clues",
  "columns": [
    "Pattern",
    "Think of",
    "Directed treatment after cultures"
  ],
  "rows": [
    [
      "Type I: mixed aerobes and anaerobes (reported 55–90%)",
      "Older/comorbid host, perineal or postoperative source; gram-positive cocci, gram-negative rods, anaerobes",
      "Narrow broad coverage to deep-tissue cultures"
    ],
    [
      "Type II: GAS, sometimes S. aureus (reported 10–15%)",
      "Healthy host possible; cryptogenic crescendo limb pain, toxic shock",
      "GAS: penicillin plus clindamycin; MSSA: cefazolin; MRSA: an active MRSA agent"
    ],
    [
      "Clostridial myonecrosis (type II or III by source)",
      "C. perfringens after contaminated injury or injection; large gram-positive rods, gas and few leukocytes",
      "Penicillin plus clindamycin and immediate excision"
    ],
    [
      "Spontaneous C. septicum",
      "Atraumatic myonecrosis, neutropenia, occult colonic malignancy",
      "Debridement and directed therapy, then colon evaluation"
    ],
    [
      "Water-associated infection (type II or III by source)",
      "Vibrio: warm salt/brackish water or oysters, especially cirrhosis/iron overload; Aeromonas: freshwater or leeches",
      "Vibrio: doxycycline plus third-generation cephalosporin; Aeromonas: doxycycline plus ciprofloxacin or ceftriaxone"
    ],
    [
      "Type IV: rare fungal infection",
      "Major trauma or profound immunocompromise; consider Mucorales or Candida",
      "Urgent debridement and organism-specific antifungal therapy"
    ]
  ]
}, "00000000-0000-4000-8000-000000007301"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-4",
  "type": "prose",
  "heading": "Toxins and the board mechanism",
  "text": "**M protein is antiphagocytic**, not the GAS superantigen. Secreted SpeA/SpeC superantigens cross-link MHC II and the T-cell receptor, driving cytokine release and streptococcal toxic shock; **SpeB is a cysteine protease**. M1/M3 strains are associated with invasive disease; adherence to injury-exposed vimentin helps explain deep infection after blunt trauma. Streptolysins, capsule, DNases, and streptokinase aid injury and spread. C. perfringens alpha toxin is a phospholipase causing myonecrosis. Protein-synthesis inhibition suppresses toxin production and avoids relying solely on beta-lactams during high-inoculum, stationary-phase infection, the Eagle effect."
}, "00000000-0000-4000-8000-000000007301"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-5",
  "type": "bullets",
  "heading": "Workup must not delay exploration",
  "items": [
    "Get CBC, electrolytes, creatinine, glucose, CRP, lactate, and CK; hyponatremia, leukocytosis, hypocalcemia, rising lactate, or CK support concern, but no lab result excludes NSTI. Lactate tracks severity; elevated CK suggests myonecrosis. Obtain blood cultures promptly and deep operative tissue for Gram stain/culture; superficial swabs can mislead.",
    "Exploration is the diagnostic standard: gray fascia, thin brown dishwater fluid, easy blunt separation, thrombosed nonbleeding tissue, and noncontractile muscle. A limited incision/finger test can resolve uncertainty but is not an extra step required before an already indicated operation.",
    "CT can map gas, fascial fluid, or a perineal/abdominal source in a stable, uncertain case only if it causes no delay. Pooled CT sensitivity is about 89%; a negative scan cannot overrule strong suspicion. Plain films miss many cases; MRI is often too slow."
  ]
}, "00000000-0000-4000-8000-000000007301"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-6",
  "type": "table",
  "heading": "LRINEC: remember the components, not a rule-out",
  "columns": [
    "Variable",
    "Points"
  ],
  "rows": [
    [
      "CRP ≥150 mg/L",
      "4"
    ],
    [
      "WBC 15–25 / >25 ×10³/µL",
      "1 / 2"
    ],
    [
      "Hemoglobin 11–13.5 / <11 g/dL",
      "1 / 2"
    ],
    [
      "Sodium <135 mmol/L",
      "2"
    ],
    [
      "Creatinine >1.6 mg/dL",
      "2"
    ],
    [
      "Glucose >180 mg/dL",
      "1"
    ]
  ]
}, "00000000-0000-4000-8000-000000007301"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-7",
  "type": "warning",
  "heading": "Low LRINEC does not reassure",
  "tone": "danger",
  "text": "Original bands are **≤5, 6–7, and ≥8**; the saved packet incorrectly leaves score 5 unclassified. Pooled sensitivity is only about 68% at ≥6 and 41% at ≥8, worse in some prospective and injection-drug-use cohorts. LRINEC neither excludes NSTI nor replaces exploration. NECROSIS and Wall criteria are adjuncts, not permission to wait. Fiser WBC >20,000 and SCORE >15,000 are teaching descriptions, not diagnostic thresholds."
}, "00000000-0000-4000-8000-000000007301"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-8",
  "type": "sequence",
  "heading": "Resuscitate and control the source",
  "steps": [
    {
      "title": "Mobilize the operating room immediately",
      "detail": "Give fluids, organ support and antibiotics in parallel; correct coagulopathy during source control rather than postponing it. Hemodynamic instability strengthens the indication. Discuss goals of care when life-saving resection would be extensive."
    },
    {
      "title": "Expose every involved compartment",
      "detail": "Excise necrotic skin, subcutis, fascia, and nonviable muscle to viable tissue; assess bleeding and muscle contraction, including electrical stimulation when helpful. Leave open and send deep cultures. Amputation may be necessary for an unsalvageable limb or life-threatening myonecrosis."
    },
    {
      "title": "Plan ongoing source control",
      "detail": "Reassess frequently and replace substantial wound fluid losses. Negative-pressure therapy is for the stable wound after removal of infected necrosis, followed by graft/flap coverage, early enteral nutrition when feasible, glucose control, rehabilitation, and psychological support."
    }
  ]
}, "00000000-0000-4000-8000-000000007301"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-9",
  "type": "warning",
  "heading": "The first and next operation have clocks",
  "tone": "danger",
  "text": "WSES pathways target source control **as soon as possible, within 6 hours after admission**, with repeat exploration **every 12–24 hours**, sooner for deterioration. Continue until little or no necrosis needs removal. These limits are not waiting periods; transfer or imaging must not defer an available life-saving debridement."
}, "00000000-0000-4000-8000-000000007303"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-10",
  "type": "prose",
  "heading": "A separate society timing target",
  "text": "EAST recommends initial debridement **within 12 hours of suspected diagnosis**. Its clock starts at suspected diagnosis, whereas the WSES target is tied to admission; neither supports avoidable delay."
}, "00000000-0000-4000-8000-000000007305"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-11",
  "type": "bullets",
  "heading": "Antibiotics accompany surgery",
  "items": [
    "Empiric treatment: **vancomycin plus piperacillin-tazobactam plus clindamycin** is the familiar board regimen. A carbapenem, or ceftriaxone plus metronidazole, supplies alternative broad coverage. **Linezolid** can provide MRSA activity and toxin suppression together; do not automatically add both vancomycin and clindamycin to it.",
    "Documented GAS or clostridial disease: **penicillin plus clindamycin**. Common adult antitoxin doses are clindamycin 600–900 mg IV every 8 hours or linezolid 600 mg every 12 hours. Adjust all regimens for organ function, allergy and susceptibility with infectious-disease/pharmacy input.",
    "Use AUC-guided vancomycin; vancomycin/piperacillin-tazobactam has an AKI signal in observational data. Monitor renal function, C. difficile risk with clindamycin, and linezolid interactions and cytopenias. Aminoglycosides are not a universal extra drug.",
    "Narrow to cultures. Newer short-course studies are encouraging, but persistent bacteremia, another focus, or incomplete source control changes duration; a fixed 14–21 days is not obligatory."
  ]
}, "00000000-0000-4000-8000-000000007301"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-12",
  "type": "prose",
  "heading": "IDSA duration and adjunct limits",
  "text": "IDSA continues antibiotics until no further debridement is needed, clinical improvement is evident, and the patient has been afebrile **48–72 hours**. It describes relook at **24–36 hours, then daily**, distinct from SCORE’s 24–48 hours and the earlier WSES schedule. Hyperbaric oxygen is not recommended for clostridial myonecrosis and must never delay surgery. Routine IVIG is unproven; refractory GAS toxic shock merits an individualized specialist discussion."
}, "00000000-0000-4000-8000-000000007302"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-13",
  "type": "warning",
  "heading": "Vibrio: a corrected drug and duration rule",
  "tone": "pearl",
  "text": "CDC recommends a third-generation cephalosporin, such as ceftazidime, plus doxycycline for **7–14 days**, individualized to severity and response; fluoroquinolone-based alternatives exist. **Children may receive doxycycline or a fluoroquinolone** under appropriate specialist care. The supplied SCORE blanket pediatric prohibition and Word “at least 2 weeks” are not the CDC rule. Debridement remains urgent."
}, "00000000-0000-4000-8000-000000007304"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-14",
  "type": "bullets",
  "heading": "Fournier gangrene",
  "items": [
    "Look for anorectal, genitourinary, or cutaneous source; most cases are not idiopathic. Examine the entire perineum and extend exposure as needed, often in lithotomy. CT may map a hidden source without delaying surgery.",
    "Scrotal skin necrosis does not imply testicular death: gonadal arterial supply is separate from perineal skin circulation. Inspect cord/testis viability; deep testicular involvement suggests a deeper source. Cover exposed viable testes with moist dressings and plan reconstruction; thigh burial is an option in older SCORE teaching, not a routine requirement."
  ]
}, "00000000-0000-4000-8000-000000007301"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-15",
  "type": "prose",
  "heading": "Preserve organs; individualize diversion",
  "text": "WSES-AAST reserves orchiectomy for strict necessity, preferably with urology input. Fecal diversion is selective for sphincter injury, incontinence, or persistent contamination; urinary diversion may be needed for urethral injury. Routine orchiectomy or colostomy is not the default, and apparently spared sphincters still require assessment."
}, "00000000-0000-4000-8000-000000007306"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-16",
  "type": "bullets",
  "heading": "Follow-up and enduring risks",
  "items": [
    "Trend examination, lactate, WBC and CK alongside organ function; worsening physiology demands renewed source assessment. Complications include shock, toxic shock syndrome, AKI, limb loss and major soft-tissue defects; mortality remains roughly one in five, varying greatly by host and pathogen.",
    "Plan long-term wound coverage, function and mental-health recovery. Aggressively reassess future perineal infection."
  ]
}, "00000000-0000-4000-8000-000000007301"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-17",
  "type": "warning",
  "heading": "Biopsy a chronic unstable scar",
  "tone": "pearl",
  "text": "Repeated wound breakdown or a rolled-edge chronic ulcer after NSTI reconstruction warrants consideration of biopsy for squamous carcinoma."
}, "00000000-0000-4000-8000-000000007309"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-18",
  "type": "table",
  "heading": "Diagnostic and prognostic numbers: context matters",
  "columns": [
    "Measure",
    "Supplied evidence",
    "Interpretation"
  ],
  "rows": [
    [
      "Epidemiology",
      "Necrotizing fasciitis incidence ~0.63/100,000/year; Fournier ~1.6/100,000 men/year",
      "Estimates vary by definition and population; rare disease with high stakes"
    ],
    [
      "Clinical burden",
      "Initial misdiagnosis ~50%; extremities ~73%, trunk 13%, perineum 12.6%",
      "Do not restrict suspicion to the perineum or a comorbid host"
    ],
    [
      "Typical findings in one review",
      "Edema 75%, erythema 72%, severe pain 72%, tenderness 68%, fever 60%, bullae/necrosis 38%",
      "Descriptive frequencies differ from pooled diagnostic sensitivity"
    ],
    [
      "Pooled clinical red flags",
      "Fever sensitivity/specificity 46%/77%; hemorrhagic bullae 25.2%/95.8%; hypotension 21%/97.7%",
      "Specific when present, insensitive when absent"
    ],
    [
      "Imaging performance",
      "Radiograph sensitivity/specificity 48.9%/94%; CT 88.5%/93.3%",
      "Negative imaging does not exclude NSTI"
    ],
    [
      "LRINEC performance",
      "≥6 sensitivity/specificity 68.2%/84.8%; ≥8 40.8%/94.9%",
      "Original ≥6 PPV 92%/NPV 96% did not generalize"
    ],
    [
      "Prospective LRINEC validation",
      "≥6 sensitivity 43%, PPV 25%, AUC 0.696; mortality prediction AUC ~0.56 in another cohort",
      "Not a diagnostic or prognostic gate; a recent cohort still had 13.9% of confirmed cases <6"
    ],
    [
      "Timing associations",
      "Within versus after 6 hours: mortality 19% versus 32%; within versus after 12 hours: 14% versus 26%",
      "Observational comparisons support urgency, not a guaranteed individual effect"
    ],
    [
      "Repeat surgery",
      "Typical 3–4 debridements; 24- versus 48-hour relook in one observational study: mortality 7% versus 33%, AKI 9% versus 33%",
      "Book the next look and return sooner for deterioration"
    ],
    [
      "Mortality and disability",
      "~22% 30-day mortality overall; Fournier ~20–40%; Vibrio with versus without liver disease 53.9% versus 16.1%",
      "Host and disease severity dominate; contemporary series differ"
    ],
    [
      "Reconstruction burden",
      "One limb series: 87% salvage, mean 7 operations",
      "Survival and limb preservation still require prolonged reconstruction/rehabilitation"
    ]
  ]
}, "00000000-0000-4000-8000-000000007301"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-19",
  "type": "bullets",
  "heading": "Other scores and surveillance",
  "items": [
    "NECROSIS uses systolic BP ≤120 mm Hg, violaceous skin and WBC >15,000/µL; all three had 100% specificity/PPV in its reported derivation/validation cohorts, not proven universal accuracy. Wall criteria use WBC >15,400/µL or sodium <135 mmol/L. Neither replaces exploration.",
    "FGSI grades Fournier severity; a simplified variant uses potassium, creatinine and hematocrit. Mark skin borders and perform serial exams; procalcitonin can track complications but is not a standalone operative trigger.",
    "Immediate postoperative clinical review is important; the supplied orthopedic standards describe review within 6 hours. Do not wait for the scheduled relook if pain, physiology or laboratory markers worsen."
  ]
}, "00000000-0000-4000-8000-000000007301"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-20",
  "type": "table",
  "heading": "Dose and regimen nuances",
  "columns": [
    "Drug or issue",
    "Supplied adult guidance",
    "Safety or evidence limit"
  ],
  "rows": [
    [
      "Penicillin G for clostridia",
      "2–4 million units IV every 4–6 hours; SIS describes 24 million units/day",
      "Combine with toxin suppression; reported clindamycin resistance in C. perfringens ~5%"
    ],
    [
      "Piperacillin-tazobactam",
      "Older IDSA 3.375 g every 6–8 hours; shock regimens commonly 4.5 g every 6–8 hours",
      "Extended infusion and renal adjustment follow local protocols; schedules differ by source"
    ],
    [
      "Meropenem",
      "1–2 g IV every 8 hours in supplied review",
      "Consider resistant gram-negative/ESBL risk; adjust for renal function and severity"
    ],
    [
      "Vancomycin",
      "Current AUC target 400–600; critically ill load often 20–35 mg/kg, maximum 3 g",
      "Older 30 mg/kg/day divided dosing is not a substitute for monitored dosing"
    ],
    [
      "Clindamycin",
      "600–900 mg IV every 8 hours",
      "C. difficile warning; never rapid IV bolus; do not confuse label maximum with a target dose"
    ],
    [
      "Linezolid",
      "600 mg IV/orally every 12 hours",
      "Review serotonergic/MAOI interactions and thrombocytopenia risk"
    ],
    [
      "Vancomycin/piperacillin-tazobactam AKI signal",
      "Meta-analysis 22.2% versus 12.9%, NNH ~11; network analysis OR ~2.55 versus vancomycin/cefepime and ~2.26 versus vancomycin/meropenem",
      "Observational signal; no demonstrated dialysis/mortality difference; cefepime needs added anaerobic coverage"
    ],
    [
      "Vibrio regimen",
      "CDC doxycycline 100 mg twice daily plus ceftazidime 1–2 g every 8 hours",
      "7–14 days per CDC; severe infection may need individualized duration and surgery"
    ]
  ]
}, "00000000-0000-4000-8000-000000007301"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-21",
  "type": "bullets",
  "heading": "Antitoxin and adjunct evidence",
  "items": [
    "The supplied linezolid target-trial emulation included 1,095 patients at 195 US hospitals and found noninferiority to clindamycin in beta-lactam-treated invasive GAS infection; patients received at least 3 days of beta-lactam therapy, limiting inference about the earliest empiric phase. Vancomycin or daptomycin alone should not be assumed to suppress toxins.",
    "An antitoxin plus beta-lactam is often used during the first 48–72 hours. Studies of ≤7-day courses or stopping about 48 hours after final source control suggest shorter treatment can be safe in selected cases; they do not override unresolved infection or another infectious indication.",
    "Routine IVIG is unsupported: the 100-patient INSTINCT trial, with only 18% GAS, did not improve its main outcomes; a separate STSS meta-analysis suggested mortality 33.7% to 15.7% with IVIG. The populations and evidence differ, explaining selective rather than universal use.",
    "Microbiologic type III is not defined consistently across sources; organism and exposure determine therapy, not the type number alone. Reltecimod remains investigational; supplied trial summaries do not establish it as standard therapy. Hyperbaric oxygen never replaces debridement or justifies delaying it."
  ]
}, "00000000-0000-4000-8000-000000007301"),
  sourced({
  "id": "block-necrotizing-soft-tissue-infections-22",
  "type": "bullets",
  "heading": "Organism and Fournier refinements",
  "items": [
    "Clostridial disease can start with pain within 24 hours, then pale-to-bronze/purple skin, tense edema, reddish-blue bullae, gas and shock. Gram stain may show GAS cocci in chains with few PMNs, or clostridial rods with few leukocytes. C. perfringens accounts for most traumatic clostridial infections (reported 70–80%); C. sordellii and injection-associated infections also occur. Spontaneous C. septicum requires malignancy/neutropenia evaluation after stabilization.",
    "Staphylococcal toxic shock produces a diffuse sunburn-like rash and later palm/sole desquamation through TSST-1/enterotoxin activity; distinguish its toxin syndrome from the local source-control requirement.",
    "Vibrio causes wound infection after coastal-water exposure or septicemia after oysters; hemorrhagic bullae and shock with cirrhosis, alcohol use, hemochromatosis or other iron excess are classic. Other reported risks include diabetes, immunosuppression and acid suppression. The review reports liver disease in ≥80% of cases, survival 90–100% with combination therapy versus 20–50% with cephalosporin alone, and near-100% fatality after ≥72-hour delay in cited series. These selected-series estimates are not universal probabilities or safe waiting thresholds.",
    "Fournier crepitus appears in only about 19–64% of reported series. Scrotal US may detect gas or show preserved intratesticular flow; inspect viable tunica/cord rather than assuming scrotal necrosis requires orchiectomy. The glans, bladder and rectum are also often spared, but direct viability assessment remains essential. Exposed testes can receive delayed grafting/scrotoplasty; thigh burial has thermoregulation and psychological drawbacks.",
    "Diversion-timing studies conflict and are confounded by severity. Selected patients can defer a stoma decision about 48 hours while edema settles or use a fecal management system, but sphincter injury, ongoing contamination and clinical deterioration require immediate reassessment."
  ]
}, "00000000-0000-4000-8000-000000007301"),
  references("block-necrotizing-soft-tissue-infections-references", ["00000000-0000-4000-8000-000000007300", "00000000-0000-4000-8000-000000007301", "00000000-0000-4000-8000-000000007302", "00000000-0000-4000-8000-000000007303", "00000000-0000-4000-8000-000000007304", "00000000-0000-4000-8000-000000007305", "00000000-0000-4000-8000-000000007306", "00000000-0000-4000-8000-000000007307", "00000000-0000-4000-8000-000000007309", "00000000-0000-4000-8000-000000007308"], "References"),
];

export const necrotizingSoftTissueInfectionsTopic = buildTopic({
  "id": "00000000-0000-4000-8000-000000007320",
  "versionId": "00000000-0000-4000-8000-000000007321",
  "slug": "necrotizing-soft-tissue-infections",
  "title": "Necrotizing Soft-Tissue Infections",
  "aliases": ["necrotizing fasciitis", "NSTI", "Fournier gangrene", "gas gangrene", "clostridial myonecrosis", "LRINEC", "streptococcal toxic shock syndrome"],
  "scoreNodeId": "skin-soft-tissue-conditions",
  "scoreCategory": "SCORE · Skin and Soft Tissue · Diseases & Conditions",
  "tags": ["infection", "skin-soft-tissue", "emergency", "absite"],
  "sourceId": "00000000-0000-4000-8000-000000007300",
  "additionalSourceIds": ["00000000-0000-4000-8000-000000007301", "00000000-0000-4000-8000-000000007302", "00000000-0000-4000-8000-000000007303", "00000000-0000-4000-8000-000000007304", "00000000-0000-4000-8000-000000007305", "00000000-0000-4000-8000-000000007306", "00000000-0000-4000-8000-000000007307", "00000000-0000-4000-8000-000000007309", "00000000-0000-4000-8000-000000007308"],
  blocks,
  reviewedAt: "2026-11-08T00:00:00.000Z",
});
