import { buildTopic, references, sourced } from "@/content/authoring";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
  "id": "block-breast-abscess-and-mastitis-1",
  "type": "summary",
  "heading": "Inflammation, infection, or a collection?",
  "text": "**Mastitis** is breast inflammation with or without infection. Distinguish inflammatory lactational mastitis from bacterial cellulitis, **phlegmon without a drainable pocket**, and a formed **abscess requiring source control**. Nonlactational subareolar recurrence suggests **PDM-SMOLD**; persistent inflammation or a mass requires cancer exclusion. Continue physiologic breastfeeding while treating ordinary mastitis or an abscess."
}, "00000000-0000-4000-8000-000000007501"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-2",
  "type": "table",
  "heading": "Recognize the pattern",
  "columns": [
    "Condition",
    "Clue",
    "Management principle"
  ],
  "rows": [
    [
      "Inflammatory lactational mastitis",
      "Ductal narrowing/congestion, painful wedge of edema/erythema; fever may reflect inflammation alone",
      "Ice, NSAIDs and physiologic feeding; antibiotics are selective"
    ],
    [
      "Bacterial mastitis",
      "Well-demarcated cellulitis or worsening/persistent symptoms; S. aureus most common, including MRSA",
      "Antibiotics, culture if nonresponse, image a mass"
    ],
    [
      "Phlegmon",
      "Ill-defined inflammatory complex area with no drainable cavity",
      "Antibiotics and interval examination/US; can coalesce into abscess"
    ],
    [
      "Abscess",
      "Tender focal mass; fluctuation may be absent in dense lactating tissue",
      "Ultrasound, drainage and pus culture"
    ],
    [
      "PDM-SMOLD (Zuska disease)",
      "Smoker with periareolar abscess, nipple inversion/cleft and areolar-edge fistula",
      "Keratin-obstructed ruptured terminal ducts; treat infection then recurrent/fistulous duct disease"
    ],
    [
      "Granulomatous mastitis",
      "Peripheral irregular mass, multiple collections/sinuses; parous reproductive-age patient; may mimic cancer",
      "Core biopsy and cultures before immunosuppression"
    ],
    [
      "Mondor disease",
      "Tender subcutaneous cord after trauma, surgery or exercise",
      "Thrombosis of superficial breast veins; supportive treatment, assess cancer concern"
    ]
  ]
}, "00000000-0000-4000-8000-000000007501"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-3",
  "type": "bullets",
  "heading": "History, examination, and microbiology",
  "items": [
    "Ask about postpartum timing, lactation volume and pumping, latch/nipple trauma, prior infection or MRSA, procedures/piercing, smoking, diabetes, immune status, and cancer risk. Lactational mastitis often occurs in the first 3 months; overpumping and deep massage can perpetuate hyperlactation, dysbiosis and injury.",
    "Examine both breasts, nipple-areolar complex, skin and axillary nodes. Document mass, distribution of erythema, fluctuance, drainage, nipple changes and peau d’orange. Bilateral cellulitic disease can suggest streptococci; do not assume every febrile breast is bacterial.",
    "S. aureus dominates lactational infection. Recurrent nonlactational abscesses more often contain mixed aerobic/anaerobic flora, including Proteus. Cystic neutrophilic granulomatous mastitis (CNGM) is linked to Corynebacterium. Culture drained pus; consider milk culture for recurrence, severe disease or treatment failure."
  ]
}, "00000000-0000-4000-8000-000000007501"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-4",
  "type": "bullets",
  "heading": "Imaging and tissue diagnosis",
  "items": [
    "Typical uncomplicated mastitis is a clinical diagnosis; routine CBC/CRP cannot distinguish sterile inflammation from infection. **Ultrasound** is first line for a mass, suspected abscess, worsening/nonresponse, recurrence or immunocompromise. SMOLD and suspected granulomatous disease merit initial US.",
    "Abscess is a complex hypoechoic collection with debris/septations, peripheral hyperemia and no central flow; phlegmon has ill-defined inflammatory tissue without a drainable pocket. Follow symptoms and repeat imaging until a residual collection or inflammatory mass resolves.",
    "Diagnostic mammography is safe during lactation and is indicated for suspicious or refractory disease; feed or pump a usual volume before imaging. Do not delay evaluation of a suspicious mass because of pregnancy or lactation; avoid gadolinium MRI during pregnancy.",
    "Persistent solid mass or atypical/nonresolving inflammation needs core biopsy; persistent peau d’orange may require skin punch biopsy. Do not keep repeating antibiotics when cancer is plausible."
  ]
}, "00000000-0000-4000-8000-000000007501"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-5",
  "type": "sequence",
  "heading": "Initial lactational management",
  "steps": [
    {
      "title": "Treat inflammation and avoid oversupply",
      "detail": "Use ice, NSAIDs/acetaminophen when appropriate, supportive care and lactation assessment. Feed on demand or pump usual infant-required volumes if separated. Avoid deep massage, heat as a routine treatment, excessive pumping and attempts to empty the breast."
    },
    {
      "title": "Add antibiotics for bacterial disease",
      "detail": "Frank cellulitis or severe infection warrants prompt treatment. For mild noninfectious-appearing inflammation, reassess in 24–48 hours and start antibiotics if worsening or not improving. Persistent systemic illness deserves assessment rather than an automatic extra pumping session."
    },
    {
      "title": "Look for a source when response fails",
      "detail": "After about 48 hours of appropriate antibiotics without improvement, obtain milk culture, reassess MRSA coverage and perform ultrasound as indicated. Rapid progression, hemodynamic instability or inability to take oral therapy requires admission, IV therapy and urgent source control."
    }
  ]
}, "00000000-0000-4000-8000-000000007501"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-6",
  "type": "table",
  "heading": "Antibiotics: adult examples",
  "columns": [
    "Situation",
    "Choice and course",
    "Important limit"
  ],
  "rows": [
    [
      "Bacterial lactational mastitis",
      "Dicloxacillin or cephalexin 500 mg orally four times daily",
      "ASBrS uses 10 days; ABM commonly 10–14 days; adjust to response and culture"
    ],
    [
      "MRSA concern or relevant beta-lactam allergy",
      "Clindamycin 300 mg orally four times daily or TMP-SMX DS twice daily",
      "Local susceptibility matters; clindamycin carries C. difficile risk"
    ],
    [
      "TMP-SMX while nursing",
      "Check the infant’s age and health",
      "Avoid with infant G6PD deficiency; caution with prematurity or hyperbilirubinemia, particularly <30 days"
    ],
    [
      "Severe infection/sepsis",
      "IV vancomycin with monitoring; broaden if clinical setting requires",
      "Admit, culture and drain; drug selection does not replace source control"
    ],
    [
      "Recurrent SMOLD",
      "MRSA-active therapy such as TMP-SMX; add metronidazole or clindamycin for anaerobic risk",
      "Culture aerobic and anaerobic organisms; other nonlactational infections may need a different regimen"
    ],
    [
      "CNGM",
      "Doxycycline directed at Corynebacterium",
      "Confirm pathology and infection workup; nursing/prolonged-course safety needs specialist review"
    ]
  ]
}, "00000000-0000-4000-8000-000000007501"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-7",
  "type": "prose",
  "heading": "The phlegmon and drainage checkpoints",
  "text": "ASBrS/SBI/CAP recommends **at least 10 days** of antibiotics for lactational phlegmon and **core biopsy if unresolved after a month**. Its lactational collection pathway allows aspiration below **3 cm**, but favors a **stab incision plus gravity drain above 3 cm or after failed initial aspiration**, with drain removal after **3–5 days** and no packing. Exactly 3 cm requires judgment. Highly loculated/solidified collections or inability to tolerate office drainage can require the operating room."
}, "00000000-0000-4000-8000-000000007502"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-8",
  "type": "table",
  "heading": "Aspiration versus drain: preserve the disagreement",
  "columns": [
    "Source or situation",
    "Recommended approach"
  ],
  "rows": [
    [
      "Supplied SCORE breast module",
      "Serial ultrasound-guided 18-gauge aspiration for intact skin; reassess every 48–72 hours"
    ],
    [
      "ABM protocol",
      "Aspiration with culture is often first line; consider an index gravity drain to avoid repeated procedures"
    ],
    [
      "ASBrS/SBI/CAP lactational guidance",
      "Viscous contents often drain poorly by needle; no routine serial aspiration; small incision plus drain for larger/failed collections"
    ],
    [
      "Thin/ischemic skin, imminent rupture or persistent collection",
      "Small incision drainage with complete evacuation; avoid unnecessary large incisions or packing"
    ],
    [
      "Nonlactational subareolar abscess",
      "Aspiration with aerobic/anaerobic cultures is reasonable; recurrent fistulous disease needs a duct-focused plan"
    ]
  ]
}, "00000000-0000-4000-8000-000000007501"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-9",
  "type": "bullets",
  "heading": "After drainage: preserve lactation",
  "items": [
    "Keep the puncture/drain away from the nipple-areolar complex when feasible. Continue physiologic feeding or pumping; avoid a flange that traumatizes the drain site. Do not squeeze the drainage site or try to express milk through it.",
    "Transient milk leakage often closes over days to a week; persistent milk fistula is uncommon, reported below 2% with appropriate management. Reassess oversupply, wound and residual collection rather than automatically stopping breastfeeding.",
    "A galactocele is a milk-retention collection, often painless and sterile. Observe uncomplicated lesions; symptomatic or infected collections need drainage, and infection also needs antibiotics. Repeated aspiration commonly reaccumulates, so a drain may be preferable."
  ]
}, "00000000-0000-4000-8000-000000007501"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-10",
  "type": "bullets",
  "heading": "SMOLD and mammary duct fistula",
  "items": [
    "Squamous metaplasia causes keratin obstruction, duct rupture, subareolar inflammation and an areolar-edge sinus. It overlaps clinically with duct ectasia/plasma-cell mastitis but is distinct. Smoking, nipple piercing, obesity and diabetes are associated.",
    "Drain/culture acute infection; remove nipple jewelry and encourage smoking cessation, without denying needed care to active smokers. If no improvement after 1–2 weeks, repeat US; ASBrS adds diagnostic mammography in patients ≥30 with discordant US or nonresponse. Atypical findings warrant core biopsy.",
    "Persistent fistula or recurrent episodes require excision of diseased nipple/central ducts and the connected sinus/scar/fistula **when quiescent**, often through a radial approach. Hadfield total duct excision is one named operation; correct an inverted/cleft nipple as appropriate. Repeated drainage alone leaves the obstructed duct.",
    "After multiple failed operations and deformity, specialist reconstruction may be needed. Duct irrigation is not a first-line remedy. Once disease fully resolves, resume normal screening; recurrent symptoms prompt renewed review."
  ]
}, "00000000-0000-4000-8000-000000007501"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-11",
  "type": "bullets",
  "heading": "Granulomatous mastitis: diagnose before steroids",
  "items": [
    "Obtain core biopsy, often of cavity wall, with aspiration when fluid is present. Lobulocentric noncaseating granulomas/giant cells support GM; CNGM has neutrophil-rimmed lipid spaces. Request aerobic/anaerobic cultures, Corynebacterium testing, AFB/mycobacterial and fungal testing. Negative stains alone do not exclude infection; stains do not diagnose sarcoidosis.",
    "Exclude cancer and specific infection before immunosuppression. Corynebacterium-associated CNGM may receive doxycycline; idiopathic GM without a detected organism or CNGM pattern does not need empiric antibiotics.",
    "Start symptom care, nonadherent dressings and specialist follow-up. Worsening disease can receive aspiration followed by intralesional triamcinolone; do not use serial aspiration alone as definitive GM therapy. Extensive, multifocal or refractory disease may need an oral steroid taper, then methotrexate/azathioprine with specialist oversight.",
    "Avoid routine I&D or wide excision, which can worsen fistulae, wounds and deformity; surgery is an exceptional last resort. Resolution may take up to 18 months and relapses are common. Selected reports describe surgical recurrence up to 50% and methotrexate remission up to 75%, with substantial selection and regimen differences. Erythema nodosum or arthritis can accompany GM."
  ]
}, "00000000-0000-4000-8000-000000007501"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-12",
  "type": "warning",
  "heading": "An inflammatory breast needs a cancer exit route",
  "tone": "danger",
  "text": "Rapid erythema/edema or peau d’orange involving **at least one-third of the breast**, developing within **6 months**, plus invasive carcinoma on biopsy supports **inflammatory breast cancer (T4d)**. A mass is not required. Older supplied criteria used <3 months; the consensus window is ≤6 months. Diagnostic imaging and core biopsy establish malignancy; skin punch can show dermal lymphatic involvement, but a benign punch does **not** exclude IBC. Suspicion should accelerate workup even before every formal criterion is met."
}, "00000000-0000-4000-8000-000000007507"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-13",
  "type": "prose",
  "heading": "Persistent inflammation and IBC treatment",
  "text": "The supplied NCCN-based review uses an unresolved **7–10-day** antibiotic trial as a trigger for diagnostic mammography/US and tissue evaluation; concerning findings should not wait out a trial. For nonmetastatic IBC, the board treatment sequence is systemic neoadjuvant therapy, modified radical mastectomy with axillary dissection, then chest-wall/regional-node radiation; add biomarker-directed therapy as indicated. Sentinel-node surgery and immediate reconstruction are not routine IBC pathways."
}, "00000000-0000-4000-8000-000000007501"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-14",
  "type": "prose",
  "heading": "Mondor disease",
  "text": "A superficial thrombosed lateral thoracic/thoracoepigastric/superior epigastric vein produces a tender cord, sometimes accentuated by arm elevation. History and examination usually diagnose it; duplex US can confirm uncertainty. Assess malignancy concern and appropriate breast imaging. NSAIDs and supportive care usually suffice over roughly **4–8 weeks**; routine anticoagulation, antibiotics and surgery are not standard. A persistent or atypical cord deserves reassessment."
}, "00000000-0000-4000-8000-000000007501"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-15",
  "type": "table",
  "heading": "Board answer versus current practice",
  "columns": [
    "Question",
    "Older supplied teaching",
    "Current qualification"
  ],
  "rows": [
    [
      "Antibiotics and duration",
      "Fiser: antibiotics for all mastitis for 2 weeks; SCORE pregnancy 7–14 days",
      "Inflammation alone may need none; bacterial courses differ by guideline and response"
    ],
    [
      "Pumping",
      "SCORE: avoid machine pumping; older teaching: empty frequently",
      "Physiologic pumping is allowed; oversupply and forced emptying are the problem"
    ],
    [
      "Nonlactational abscess",
      "Fiser: cancer until proven otherwise, I&D with skin/cavity biopsies and cytology",
      "Retain the cancer vigilance; selected intact-skin abscesses can be aspirated, with biopsy for suspicious/persistent findings"
    ],
    [
      "Milk fistula",
      "Pregnancy/lactation SCORE: stop breastfeeding",
      "ABM/current guidance often permits continued physiologic feeding while leakage closes"
    ],
    [
      "Drug safety in lactation",
      "SCORE blanket tetracycline/fluoroquinolone avoidance",
      "Agent, duration and infant-specific assessment; no class-wide ban substituted for a medication review"
    ],
    [
      "Granulomatous mastitis",
      "Older wide excision or repeated drainage",
      "Pathology/culture first, then targeted infection treatment or steroid-based management"
    ]
  ]
}, "00000000-0000-4000-8000-000000007501"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-16",
  "type": "bullets",
  "heading": "Follow to resolution",
  "items": [
    "Monitor cellulitis, residual mass, wound/drain closure and breastfeeding function. Reimage/re-culture persistent collections; failed drainage requires another source-control plan and tissue assessment when indicated.",
    "Complications include sepsis, early weaning, milk fistula, recurrent mammary duct fistula, cosmetic damage and delayed cancer diagnosis. Nonlactational recurrence is particularly common in smokers; distinguish recurrence of infection from an uncorrected duct lesion or GM.",
    "After complete resolution, resume age-appropriate screening and return promptly for a new mass, recurrent skin change, fever or worsening pain."
  ]
}, "00000000-0000-4000-8000-000000007501"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-17",
  "type": "table",
  "heading": "Risk and outcome estimates: population-specific",
  "columns": [
    "Measure",
    "Supplied estimate",
    "Use cautiously"
  ],
  "rows": [
    [
      "Lactational burden",
      "~10% mastitis incidence; ~3–11% progress to abscess",
      "Estimates vary; early recognition and reassessment matter more than an exact percentage"
    ],
    [
      "Lactational risk",
      "Nipple injury, latch difficulty, oversupply, pump/shield use, prior mastitis; abscess associations include age >30, first pregnancy and gestation ≥41 weeks",
      "Associations do not prohibit appropriate pumping or feeding"
    ],
    [
      "Nonlactational abscess",
      "70–86% of primary abscesses in selected surgical series",
      "Referral cohorts do not describe all community breast inflammation"
    ],
    [
      "Smoking and piercing",
      "Smoking OR 6.15 for primary and 11.49 for subareolar abscess; piercing OR 20.26 for subareolar abscess in one study",
      "Smoking/piercing counseling is relevant; effect estimates are not universal"
    ],
    [
      "Recurrence",
      "One cohort: 57% nonlactational versus 0% lactational recurrence",
      "Selected series; older age, smoking and prior surgery contribute"
    ],
    [
      "MRSA prevalence",
      "One center: 30.8% of S. aureus overall, 37% in abscesses; other series 35–45%",
      "Local antibiogram and cultures guide therapy, not imported prevalence"
    ],
    [
      "Granulomatous mastitis",
      "~2.4/100,000 in one estimate; typically ages 20–40, often parous and several years after pregnancy",
      "Reported ethnicity patterns and incidence vary; do not use demographics to exclude it"
    ],
    [
      "Cancer association",
      "Nonlactational mastitis linked to later breast cancer, adjusted HR 1.94 in one cohort",
      "Association is not proof of causation; persistent disease requires diagnostic evaluation"
    ],
    [
      "Abscess imaging",
      "US sensitivity/specificity 92.3%/89.1% in the cited review",
      "A persistent suspicious mass still needs tissue diagnosis"
    ],
    [
      "Aspiration versus I&D",
      "Meta-analysis: similar cure/recurrence; ~11 days faster healing, fistula RR 0.21, interrupted breastfeeding RR 0.28 with aspiration",
      "Most trials were lactational; technique, contents and skin condition limit extrapolation"
    ]
  ]
}, "00000000-0000-4000-8000-000000007501"),
  sourced({
  "id": "block-breast-abscess-and-mastitis-18",
  "type": "bullets",
  "heading": "Additional distinctions that change management",
  "items": [
    "Bacterial mastitis can show spreading induration/erythema and systemic symptoms beyond 24 hours; inflammatory disease can also produce fever. In one phlegmon series, 2 of 10 became drainable within a week, so persistent symptoms require repeat assessment.",
    "The supplied drainage reviews use different size thresholds: discuss a catheter above 3 cm, older guidance considers I&D above 5 cm or with multiloculation, and some series successfully aspirated larger collections. There is **no universal 3- or 5-cm rule** across all abscess types. Resistant organisms and incomplete evacuation increase failure risk; multidrug resistance roughly doubled surgical-drainage risk in one series.",
    "Routine galactocele aspiration can introduce infection or reaccumulate. Noninfectious ductal narrowing is not a large discrete milk plug to squeeze out. Persistent low-grade/subacute symptoms need individualized evaluation rather than automatic prolonged antibiotics.",
    "Probiotic and lecithin evidence is limited; these are optional adjuncts. Hyperlactation may warrant supervised block feeding and lactation-specialist input. Screen for perinatal mood/anxiety problems and support continued feeding when desired.",
    "Granulomatous causes include TB, fungi, sarcoidosis and granulomatosis with polyangiitis; no stain by itself excludes all of these. Systemic manifestations, exposure history and biopsy/culture findings direct additional workup.",
    "Some Mondor reports use prophylactic anticoagulation, but that is not routine practice for an isolated breast cord. Both local SCORE and Fiser discuss Mondor, contrary to the saved packet’s statement that Fiser omits it."
  ]
}, "00000000-0000-4000-8000-000000007501"),
  references("block-breast-abscess-and-mastitis-references", ["00000000-0000-4000-8000-000000007500", "00000000-0000-4000-8000-000000007501", "00000000-0000-4000-8000-000000007502", "00000000-0000-4000-8000-000000007503", "00000000-0000-4000-8000-000000007504", "00000000-0000-4000-8000-000000007505", "00000000-0000-4000-8000-000000007506", "00000000-0000-4000-8000-000000007507"], "References"),
];

export const breastAbscessAndMastitisTopic = buildTopic({
  "id": "00000000-0000-4000-8000-000000007520",
  "versionId": "00000000-0000-4000-8000-000000007521",
  "slug": "breast-abscess-and-mastitis",
  "title": "Breast Abscess and Mastitis",
  "aliases": ["mastitis", "lactational mastitis", "breast abscess", "subareolar abscess", "periductal mastitis", "SMOLD", "PDM-SMOLD", "Zuska disease", "granulomatous mastitis", "CNGM", "Mondor disease", "mammary duct fistula"],
  "scoreNodeId": "breast-benign",
  "scoreCategory": "SCORE · Breast · Benign Breast Disease",
  "tags": ["breast", "infection", "mastitis", "lactation", "absite"],
  "sourceId": "00000000-0000-4000-8000-000000007500",
  "additionalSourceIds": ["00000000-0000-4000-8000-000000007501", "00000000-0000-4000-8000-000000007502", "00000000-0000-4000-8000-000000007503", "00000000-0000-4000-8000-000000007504", "00000000-0000-4000-8000-000000007505", "00000000-0000-4000-8000-000000007506", "00000000-0000-4000-8000-000000007507"],
  blocks,
  reviewedAt: "2026-11-08T00:00:00.000Z",
});
