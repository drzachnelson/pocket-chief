import { buildTopic, references, sourced } from "@/content/authoring";
import type { TopicBlock } from "@/lib/types";

const blocks: TopicBlock[] = [
  sourced({
  "id": "block-pilonidal-disease-1",
  "type": "summary",
  "heading": "At a glance",
  "text": "**Pilonidal disease** is an acquired hair foreign-body reaction in the sacrococcygeal natal cleft, recognized by **midline pits** and hair-containing tracts. The abscess cavity is granulation tissue, not a true epithelial-lined cyst. **Drain an acute abscess; observe asymptomatic pits; select chronic treatment by extent and prior failure.** Definitive procedure technique is the separate SCORE scope, Procedures for Pilonidal Disease."
}, "00000000-0000-4000-8000-000000007400"),
  sourced({
  "id": "block-pilonidal-disease-2",
  "type": "bullets",
  "heading": "Mechanism and risk",
  "items": [
    "Loose hair penetrates vulnerable cleft skin; friction, follicular plugging and suction perpetuate a foreign-body cavity and secondary infection. The Karydakis triad is hair, mechanical force, and skin vulnerability. Secondary tracts usually run cranially or laterally; caudal tracts can mimic anal fistula.",
    "Typical patients are young adults, more often men; hirsutism, obesity, family history, sedentary work, cleft anatomy and local friction are associated. Smoking and higher BMI worsen postoperative outcomes. Congenital dermal sinus in an infant is a different diagnosis.",
    "Clean, dry wound care is sensible, but poor hygiene is not an established sole cause. The supplied >6-hour sitting cutoff is one observational association, not a validated treatment or screening threshold."
  ]
}, "00000000-0000-4000-8000-000000007401"),
  sourced({
  "id": "block-pilonidal-disease-3",
  "type": "table",
  "heading": "Presentation and initial decision",
  "columns": [
    "State",
    "Findings",
    "Next step"
  ],
  "rows": [
    [
      "Asymptomatic",
      "Incidental midline pits without pain, abscess or drainage",
      "Observation and counseling; no prophylactic excision"
    ],
    [
      "Acute abscess",
      "Painful tender fluctuant swelling, often lateral to midline pits; possible cellulitis",
      "Prompt incision and drainage, whether first or recurrent"
    ],
    [
      "Limited chronic disease",
      "Few pits, intermittent drainage, no active abscess or extensive tracts",
      "Discuss local tissue-sparing treatment and recurrence tradeoff"
    ],
    [
      "Extensive/recurrent disease",
      "Multiple lateral tracts, repeated flares, failed excisions or unhealed midline wound",
      "Refer for experienced off-midline reconstruction after sepsis settles"
    ]
  ]
}, "00000000-0000-4000-8000-000000007401"),
  sourced({
  "id": "block-pilonidal-disease-4",
  "type": "bullets",
  "heading": "Clinical diagnosis; investigate the exception",
  "items": [
    "Examine the entire cleft and perform an anorectal assessment when disease approaches the anus. No routine laboratory testing, imaging, or abscess culture is needed in straightforward disease.",
    "Absent midline pits, lateral lesions, or perianal openings suggest hidradenitis, furuncle, fistula-in-ano, Crohn disease, or unusual infection. MRI/ultrasound can map atypical or recurrent tracts, suspected anal communication, or possible sacral osteomyelitis.",
    "Biopsy a longstanding ulcer, fungating/indurated tissue or an atypical nonhealing wound, especially with immunosuppression: squamous carcinoma is rare but important. Sepsis or suspected necrotizing infection requires emergency escalation."
  ]
}, "00000000-0000-4000-8000-000000007401"),
  sourced({
  "id": "block-pilonidal-disease-5",
  "type": "bullets",
  "heading": "Acute abscess",
  "items": [
    "Drain over the area of maximal fluctuance, generally through a lateral opening that allows continued drainage; clear hair and debris, with curettage or unroofing as appropriate. Antibiotics do not replace drainage.",
    "Add antibiotics for cellulitis, systemic illness or immunocompromise; evidence for routine perioperative prophylaxis is uncertain. Routine definitive wide excision during an acute abscess is not preferred, and an unexpected abscess at elective excision should not be closed over.",
    "After first drainage, about 60% heal without an additional procedure; recurrence after simple drainage is reported at 15–40%. Review healing and offer definitive treatment for persistent or recurrent symptomatic disease after inflammation resolves. In one comparison, closure 3 weeks after drainage had 14% recurrence versus 0% after open excision; no single interval guarantees a better result."
  ]
}, "00000000-0000-4000-8000-000000007401"),
  sourced({
  "id": "block-pilonidal-disease-6",
  "type": "table",
  "heading": "Chronic treatment: tradeoffs",
  "columns": [
    "Option",
    "Role and limitation"
  ],
  "rows": [
    [
      "Unroofing/curettage ± marsupialization",
      "Open tracts, remove hair/granulation, heal from the base; tissue-sparing but requires wound care"
    ],
    [
      "Pit picking/trephination (Gips), limited sinusectomy",
      "Small primary disease; rapid recovery but recurrence can exceed that of flap excision"
    ],
    [
      "Endoscopic treatment (EPSiT) or laser tract ablation (SiLaC)",
      "Selected limited disease; specialized equipment and limited durable comparative evidence"
    ],
    [
      "Phenol",
      "Selected chronic disease without abscess; often repeated applications; reported success 60–95% does not establish long-term cure"
    ],
    [
      "Fibrin glue",
      "Possible primary/adjunct option without abscess; evidence of benefit remains uncertain despite supplied 74% success series"
    ],
    [
      "Excision with open healing",
      "Avoids primary midline closure but slower healing, dressing burden and meaningful recurrence"
    ],
    [
      "Off-midline flap",
      "Extensive/recurrent disease; Karydakis advancement, Bascom cleft lift or modified Limberg transposition flatten the cleft and move the scar laterally"
    ]
  ]
}, "00000000-0000-4000-8000-000000007401"),
  sourced({
  "id": "block-pilonidal-disease-7",
  "type": "warning",
  "heading": "Closure is a major decision",
  "tone": "pearl",
  "text": "The German guideline recommends **no primary midline closure**, minimal necessary excision, and off-midline procedures when limited approaches are unsuitable. Small primary disease can use minimally invasive techniques. Karydakis and Limberg have broadly similar outcomes; a cleft lift is useful for recurrent disease or an unhealed midline wound. There is no universally accepted US staging system; treatment follows acute versus chronic disease, extent and prior failures rather than a universally best flap."
}, "00000000-0000-4000-8000-000000007403"),
  sourced({
  "id": "block-pilonidal-disease-8",
  "type": "bullets",
  "heading": "Hair control and recurrence prevention",
  "items": [
    "Keep loose hair out of the cleft and wound; address friction, smoking and weight as feasible. Hair control supports treatment but does not replace abscess drainage.",
    "ASCRS describes shaving or laser hair removal without an abscess, often at least weekly shaving; optimal frequency is unknown. Immediate postoperative patient razor shaving can increase recurrence; lifelong weekly shaving is not a settled requirement. Clips/depilation should avoid traumatizing healing skin.",
    "Laser choice should match skin type; Nd:YAG is often used for darker skin. Laser epilation removes hair and is different from laser ablation of the sinus tract."
  ]
}, "00000000-0000-4000-8000-000000007401"),
  sourced({
  "id": "block-pilonidal-disease-9",
  "type": "prose",
  "heading": "Laser trial: useful but bounded",
  "text": "In a randomized trial of adolescents and young adults, adjunctive laser epilation reduced **1-year recurrence to 10.4% versus 33.6%** with standard care. The supplied review rounds this to 10.5%; the primary result is 10 of 96. This supports an adjunct, not universal cure or lifelong durability."
}, "00000000-0000-4000-8000-000000007404"),
  sourced({
  "id": "block-pilonidal-disease-10",
  "type": "table",
  "heading": "Board answer versus current practice",
  "columns": [
    "Question",
    "Supplied board teaching",
    "Clinical interpretation"
  ],
  "rows": [
    [
      "Cause",
      "Congenital cyst; hygiene or prolonged sitting",
      "Acquired hair reaction; hygiene and sitting associations do not establish causation or a fixed cutoff"
    ],
    [
      "Drainage location",
      "1–2 cm off midline in SCORE",
      "Lateral drainage is reasonable; the exact distance is convention, not a validated guideline cutoff"
    ],
    [
      "Definitive operation",
      "Fiser: drain/pack, later excise skin pores and follicle-bearing tissue",
      "Individualize limited treatment versus off-midline flap; wide excision to fascia is not necessary for every sinus"
    ],
    [
      "Recurrence estimate",
      "Disease SCORE 10–15%; procedure SCORE 12–30%, about 12% open/23% closed",
      "Different techniques, populations and follow-up; do not combine into one expected rate"
    ],
    [
      "Flap figures",
      "SCORE: Karydakis <2%, Limberg ≤6%, cleft lift 12% in cited reports",
      "Series are not head-to-head guarantees; recurrence accumulates for years"
    ],
    [
      "Nonoperative success",
      "Phenol 60–95%, glue 74%, video series 1 recurrence in 27 at 12 months",
      "Selected small/short studies; preserve uncertainty and compare long-term outcomes"
    ]
  ]
}, "00000000-0000-4000-8000-000000007400"),
  sourced({
  "id": "block-pilonidal-disease-11",
  "type": "bullets",
  "heading": "Follow-up and complications",
  "items": [
    "Review for wound infection (SCORE reports ~8–10%), dehiscence, seroma, retained hair, missed pits and persistent lateral tracts. Small breakdown often heals with local dressings; large defects or chronically unhealed midline wounds may need off-midline reconstruction by an experienced surgeon.",
    "Recurrence is time-dependent: many occur in the first 2 years, but short follow-up underestimates later failure. Compare studies with similar disease burden and preferably ≥5-year follow-up; extreme long-term midline-closure rates must not be compared with short minimally invasive series.",
    "Persistent symptoms deserve re-examination for anal fistula/Crohn disease or malignancy before another pilonidal operation. Return sooner for spreading redness, fever or increasing pain."
  ]
}, "00000000-0000-4000-8000-000000007401"),
  sourced({
  "id": "block-pilonidal-disease-12",
  "type": "table",
  "heading": "Outcome ranges are not interchangeable",
  "columns": [
    "Approach",
    "Supplied recurrence",
    "Recovery or complication context"
  ],
  "rows": [
    [
      "Unroofing/curettage",
      "~4.5% in a cited meta-analysis",
      "Complications ~1.4%; wound care remains necessary"
    ],
    [
      "Marsupialization",
      "~1.5–6% in cited comparisons",
      "May shorten healing versus wide open excision; exact benefit depends on comparator"
    ],
    [
      "Wide excision/open healing",
      "2–42%",
      "Healing 21–92 days; complications 3.3–36%; prolonged care"
    ],
    [
      "Primary midline closure",
      "4–45%; pooled long-term estimate 67.9% at 20 years",
      "Wound complications 14–74%; avoid routine midline closure"
    ],
    [
      "Karydakis",
      "0–6% across series",
      "Wound complications 7–35.1%; some comparisons show more seroma/infection than Limberg, but faster return and better cosmesis"
    ],
    [
      "Bascom cleft lift",
      "0–11.3% across series",
      "Wound complications 10.9–40%; minor separation ~20–25% in expert series"
    ],
    [
      "Limberg",
      "0–23.3% across series",
      "Wound complications 0–26.5%; commonly studied flap"
    ],
    [
      "Pit picking/trephination",
      "0–33%; original Gips series 6.5% at 1 year, 13.2% at 5 years",
      "Other cohorts report 33–45%; return to activity 2–16 days"
    ],
    [
      "EPSiT",
      "0–10% across series",
      "Complications 0–11.5%; activity often 1.6–3.5 days"
    ],
    [
      "Phenol",
      "19% versus 13% in one comparison with excision; long-term ~40% at 5 years in pooled data",
      "Often 1–4 applications; 80% liquid/crystallized protocols vary"
    ],
    [
      "Fibrin glue",
      "5.6–29% across series",
      "Healing often 2–6 weeks, but systematic-review certainty is low"
    ]
  ]
}, "00000000-0000-4000-8000-000000007401"),
  sourced({
  "id": "block-pilonidal-disease-13",
  "type": "bullets",
  "heading": "Comparative evidence and long follow-up",
  "items": [
    "Off-midline versus conventional midline closure in the supplied Cochrane review: recurrence RR 0.22 and wound infection RR 0.32. Karydakis versus Limberg recurrence RR 1.14 had a wide confidence interval and low-certainty evidence; no flap wins reliably across every setting.",
    "One drainage/curettage trial reported healing at 10 weeks of 96% versus 79% with drainage alone and recurrence 10% versus 54% at longer follow-up. This supports clearing hair/granulation without making acute wide excision routine.",
    "Pooled Karydakis/Bascom recurrence rose from 0.2% at 1 year to 1.9% at 5 years and 2.7% at 10 years. A separate ≥5-year cohort reported 7.9% overall recurrence, with smoking HR 1.98 and BMI HR 1.05 per kg/m²; these are cohort associations, not individualized predictions.",
    "Pediatric/adolescent pooled data in the supplied review reported recurrence about 10.2% off-midline, 17.5% midline, 20.1% open and 11.4% pediatric endoscopic treatment; heterogeneous selection and follow-up prevent ranking these as randomized comparisons.",
    "Negative-pressure therapy can assist selected large wounds but did not accelerate healing in a small trial. Drain use after flap repair is individualized; wide ranges in infection, seroma and recurrence require realistic counseling."
  ]
}, "00000000-0000-4000-8000-000000007401"),
  sourced({
  "id": "block-pilonidal-disease-14",
  "type": "prose",
  "heading": "Risk counseling without rigid cutoffs",
  "text": "Incidence estimates range from roughly 26–100 per 100,000; the classic SCORE estimate is about 25 per 100,000. Women often present younger than men (reported mean ~19 versus 21 years); presentation after 40 is less typical. Consider an increased hair burden, including hyperandrogenism, when relevant. Family history, hair fragments from elsewhere on the body and cleft geometry support an acquired mechanical process; conflicting cleft-depth and hygiene data caution against blaming one behavior. Atypical late-onset or longstanding disease merits a lower biopsy threshold. Laser epilation parameters depend on skin type, often Nd:YAG 1064 nm for darker skin and alexandrite/diode devices for lighter skin."
}, "00000000-0000-4000-8000-000000007401"),
  references("block-pilonidal-disease-references", ["00000000-0000-4000-8000-000000007400", "00000000-0000-4000-8000-000000007401", "00000000-0000-4000-8000-000000007402", "00000000-0000-4000-8000-000000007403", "00000000-0000-4000-8000-000000007404", "00000000-0000-4000-8000-000000007405", "00000000-0000-4000-8000-000000007406", "00000000-0000-4000-8000-000000007407"], "References"),
];

export const pilonidalDiseaseTopic = buildTopic({
  "id": "00000000-0000-4000-8000-000000007420",
  "versionId": "00000000-0000-4000-8000-000000007421",
  "slug": "pilonidal-disease",
  "title": "Pilonidal Disease",
  "aliases": ["pilonidal cyst", "pilonidal abscess", "pilonidal sinus", "jeep disease", "pilonidal midline pits", "pilonidal hair control"],
  "scoreNodeId": "skin-soft-tissue-conditions",
  "scoreCategory": "SCORE · Skin and Soft Tissue · Diseases & Conditions",
  "tags": ["pilonidal", "skin-soft-tissue", "absite"],
  "sourceId": "00000000-0000-4000-8000-000000007400",
  "additionalSourceIds": ["00000000-0000-4000-8000-000000007401", "00000000-0000-4000-8000-000000007402", "00000000-0000-4000-8000-000000007403", "00000000-0000-4000-8000-000000007404", "00000000-0000-4000-8000-000000007405", "00000000-0000-4000-8000-000000007406", "00000000-0000-4000-8000-000000007407"],
  blocks,
  reviewedAt: "2026-11-08T00:00:00.000Z",
});
