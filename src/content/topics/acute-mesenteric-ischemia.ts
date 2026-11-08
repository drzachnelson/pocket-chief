import { buildTopic, references, sourced, sourcedUnits } from "@/content/authoring";
import type { TopicBlock } from "@/lib/types";

// Clinical draft: regular library entry held in an unmerged batch PR pending Zach's sign-off.
const PACKET = "00000000-0000-4000-8000-000000007100";
const OE = "00000000-0000-4000-8000-000000007101";
const GUIDELINE = "00000000-0000-4000-8000-000000007102";
const ESVS = "00000000-0000-4000-8000-000000007103";

const blocks: TopicBlock[] = [
  sourced({
  "id": "acute-mesenteric-ischemia-1",
  "type": "summary",
  "heading": "Recognize and act",
  "text": "Acute mesenteric ischemia (AMI) is abrupt intestinal hypoperfusion from arterial embolism, arterial thrombosis, mesenteric venous thrombosis (MVT), or nonocclusive mesenteric ischemia (NOMI). **Pain out of proportion to examination warrants immediate CTA and resuscitation.** Peritonitis or suspected infarction requires urgent exploration; stable arterial occlusion can undergo endovascular revascularization. Restore flow, remove frankly necrotic bowel, and preserve uncertain bowel for reassessment."
}, OE),
  sourced({
  "id": "acute-mesenteric-ischemia-2",
  "type": "table",
  "heading": "Mechanism, clues, and definitive treatment",
  "columns": [
    "Type",
    "Presentation and anatomy",
    "Treatment"
  ],
  "rows": [
    [
      "Arterial embolus",
      "Abrupt pain without chronic symptoms; AF, recent MI, LV dysfunction/aneurysm/thrombus, valvular disease, endocarditis, cardioversion or prior embolism. The clot usually lodges 3–10 cm beyond the SMA origin, sparing proximal jejunum and often transverse colon. Other-organ emboli occur in >20%; inspect kidneys, spleen and limbs.",
      "Immediate UFH plus aspiration thrombectomy or open Fogarty embolectomy; distal branch lysis or bypass if necessary."
    ],
    [
      "Arterial thrombosis",
      "Calcified ostial SMA disease, often acute-on-chronic postprandial pain, food fear and weight loss; smoking, CAD/PAD, occasionally dissection, vasculitis or infection. The whole SMA territory is threatened; existing collaterals can delay symptoms.",
      "UFH plus recanalization/stenting, retrograde open mesenteric stenting (ROMS), or bypass; embolectomy alone does not correct the underlying stenosis."
    ],
    [
      "MVT",
      "SMV ± portal/splenic vein clot causes edema, submucosal hemorrhage and slower, segmental infarction; three-fourths have pain >2 days. Consider Virchow triad, factor V Leiden, prothrombin mutation, protein C/S or antithrombin deficiency, antiphospholipid syndrome, JAK2-positive disease, cirrhosis, malignancy, pregnancy/OCPs or inflammation such as pancreatitis. SCORE calls 90% secondary.",
      "Continuous therapeutic UFH is first-line without peritonitis. Persistent deterioration may justify expert endovascular thrombectomy/thrombolysis ± TIPS; necrosis requires resection. Infarction can occur despite anticoagulation (up to 35% in the supplied review)."
    ],
    [
      "NOMI",
      "Shock, sepsis, heart failure, dialysis, cardiac surgery/bypass, vasopressors, digoxin or cocaine produce patchy ischemia despite patent vessels. Sedated patients may have only distension, feeding intolerance, bleeding or unexplained deterioration. SCORE suggests high suspicion with 3 of 4: ileus/pain, catecholamine need, hypotension, rising transaminases.",
      "Correct low flow and optimize cardiac output; reduce vasoconstrictors as feasible. SMA papaverine or prostaglandin E1 can treat vasospasm; SCORE also lists nitroglycerin. Peritonitis, perforation or worsening mandates surgery."
    ]
  ]
}, OE),
  sourced({
  "id": "acute-mesenteric-ischemia-3",
  "type": "bullets",
  "heading": "Anatomy and watershed traps",
  "items": [
    "The SMA arises 1–2 cm below the celiac artery and supplies small bowel, right colon and proximal two-thirds of transverse colon; the IMA arises at L3, 3–4 cm above the aortic bifurcation, and supplies distal transverse colon through upper rectum. The marginal artery of Drummond and central arc of Riolan (meandering artery of Moskowitz) connect their territories.",
    "Griffiths point is the splenic flexure; Sudeck point is the rectosigmoid/last sigmoid–rectal junction. These colon watersheds are vulnerable to low flow and IMA loss after aortic surgery, whereas the rectum usually retains pelvic collateral flow. They do not identify the usual site of SMA embolic injury.",
    "Pneumatosis means bowel-wall gas (often jejunal in the SCORE discussion), rather than gas merely in the lumen. With an acute abdomen, suspect ischemia, but pneumatosis also has benign causes; neither its presence nor a normal plain film decides bowel viability."
  ]
}, PACKET),
  sourced({
  "id": "acute-mesenteric-ischemia-4",
  "type": "bullets",
  "heading": "Presentation and diagnostic pitfalls",
  "items": [
    "Ischemia starts in mucosa and reaches serosa last: early bowel can look pink and peristaltic, including at laparoscopy. Necrosis precedes peritonitis; guarding, rebound, hematochezia, shock and refractory acidosis are late danger signs.",
    "The supplied review calls pain with a benign examination, vomiting/diarrhea and an embolic source the Bergen triad (40–80%); SCORE instead describes older age, AF and disproportionate pain in about 50% of embolic cases. Neither triad is required.",
    "Leukocytosis occurs in >90%, acidosis/elevated lactate in 88%, and elevated amylase in about half: do not mistake ischemia for pancreatitis. Lactate can be normal early; the review quotes sensitivity 91% and specificity 42%. Lactate >2 mmol/L correlates with irreversible injury (HR 4.1), but cannot establish it alone.",
    "D-dimer >0.9 mg/L had sensitivity 60%, specificity 82% and accuracy 79% in a cited study; normal results did not exclude AMI reliably across populations. I-FABP, citrulline and D-lactate are not sufficiently accurate for routine diagnosis.",
    "Isolated right-colon ischemia warrants SMA evaluation; the supplied review reports approximately twice the mortality and five times the morbidity of left-sided disease. In-hospital onset is common, so unexplained ICU acidosis or feeding intolerance merits the same suspicion."
  ]
}, OE),
  sourced({
  "id": "acute-mesenteric-ischemia-5",
  "type": "bullets",
  "heading": "CTA now",
  "items": [
    "Order **arterial and portal venous phase CTA without oral contrast**, with multiplanar/MIP reconstructions and explicit notice of suspected AMI. An optional noncontrast phase shows calcium, hyperdense clot or mural hemorrhage. Do not postpone for creatinine, hydration or AKI, including severe renal impairment; missed ischemia is more dangerous.",
    "CTA sensitivity/specificity vary by protocol: SCORE quotes 94%/96%; the supplied 2025 meta-analysis quotes 92.0%/98.8%, versus 75.8%/90.5% for other CT protocols. WSES cites mortality doubling with each 6-hour diagnostic/CTA delay; this is a warning against delay, not a safe observation interval.",
    "Look for distal SMA cutoff (embolus), calcified ostial occlusion (thrombosis), SMV thrombus with peripheral contrast around central clot (venous target sign), or patent vessels with narrowed/spastic branches (NOMI). Wall thickening/target enhancement suggests venous or reperfused injury; reduced enhancement, dilation, edema and ascites support ischemia.",
    "Reduced/absent mural enhancement is the best individual nonvascular sign in the supplied meta-analysis (57.9% sensitivity, 90.1% specificity). A paper-thin wall, pneumatosis with portal venous gas, or free air raises concern for advanced infarction; pneumatosis alone was benign in 60% of one multicenter series.",
    "CTA replaces diagnostic catheter angiography; catheter angiography now principally enables thrombectomy, lysis, stenting or NOMI vasodilators. Plain films are nonspecific. Severe contrast anaphylaxis needs an urgent institutional alternative/premedication pathway; noncontrast CT may reveal injury but cannot adequately map vascular occlusion.",
    "Classify etiology, acute versus acute-on-chronic disease, and potentially reversible injury versus transmural necrosis. The supplied four-phase CT framework progresses from occlusion alone to early, late, then transmural injury; no universal grade replaces physiology, peritonitis and bowel findings."
  ]
}, OE),
  sourced({
  "id": "acute-mesenteric-ischemia-6",
  "type": "bullets",
  "heading": "Resuscitation and heparin",
  "items": [
    "Begin crystalloid/blood as indicated, correct arrhythmia, hypovolemia, electrolytes and acidosis, keep NPO, decompress with an NG tube and give early broad-spectrum antibiotics (for example, a third-generation cephalosporin plus metronidazole). Optimize perfusion while avoiding excessive crystalloid and unnecessary vasoconstriction; necessary shock support cannot simply be withheld.",
    "Use prompt therapeutic UFH for arterial AMI and MVT unless contraindicated; impending surgery alone is not a contraindication. Its short half-life, reversibility and titratability help during operations and renal failure. Anticoagulation prevents propagation but does not replace arterial revascularization.",
    "The supplied review gives a VTE-extrapolated example of 80 units/kg IV then 18 units/kg/h, or 5,000 units followed by 20,000–40,000 units/day, titrated to aPTT (label example 1.5–2 times control). Its suggested 10,000-unit bolus ceiling is not an AMI guideline standard; use the institutional protocol.",
    "The supplied operative regimens vary from 75–100 units/kg before clamping, targeting ACT around 200–250 seconds (one center >250); these are practice examples, not universal targets. Monitor platelets and bleeding. Active uncontrolled bleeding, HIT or heparin hypersensitivity preclude UFH; HIT requires a nonheparin agent such as argatroban/bivalirudin. Recent intracranial bleeding/neurosurgery or severe thrombocytopenia requires individualized assessment.",
    "The supplied 370-patient ICU cohort associated early full-dose anticoagulation with 30-day survival of 53.5% versus 41.7% (reported NNT 8), persisting at 90 days without more hemorrhagic complications; observational confounding prevents a causal conclusion."
  ]
}, OE),
  sourced({
  "id": "acute-mesenteric-ischemia-7",
  "type": "flow",
  "heading": "Choose source control and reperfusion",
  "nodes": [
    {
      "id": "start",
      "label": "Suspected AMI prompts immediate CTA, resuscitation, antibiotics and mechanism-appropriate anticoagulation."
    },
    {
      "id": "open",
      "label": "Peritonitis, instability/septic shock, necrosis/perforation, refractory acidosis, worsening examination, obstruction or abdominal compartment syndrome requires urgent open/hybrid exploration.",
      "tone": "caution"
    },
    {
      "id": "arterial",
      "label": "Stable arterial occlusion without peritonitis or CT necrosis favors endovascular treatment where expertise is available."
    },
    {
      "id": "venous",
      "label": "Stable MVT without peritonitis receives UFH and close reassessment; deterioration prompts intervention or exploration."
    },
    {
      "id": "nomi",
      "label": "NOMI requires correction of its precipitant, possible catheter vasodilators, and exploration for worsening or infarction."
    },
    {
      "id": "relook",
      "label": "After reperfusion, remove definite necrosis; uncertain viability or deranged physiology requires temporary closure and second look in 24–48 hours.",
      "tone": "caution"
    }
  ],
  "edges": [
    {
      "from": "start",
      "to": "open"
    },
    {
      "from": "start",
      "to": "arterial"
    },
    {
      "from": "start",
      "to": "venous"
    },
    {
      "from": "start",
      "to": "nomi"
    },
    {
      "from": "open",
      "to": "relook"
    },
    {
      "from": "arterial",
      "to": "relook"
    }
  ]
}, OE),
  sourcedUnits({
  "id": "acute-mesenteric-ischemia-8",
  "type": "sequence",
  "heading": "Open SMA embolectomy and bowel preservation",
  "steps": [
    {
      "title": "Inspect and expose",
      "detail": "Perform midline laparotomy and inspect the entire bowel. Lift transverse colon and retract small bowel to expose the SMA at the mesenteric root below the pancreas; the SMA lies left of the SMV. Dividing Treitz and mobilizing the fourth duodenum is an alternative exposure."
    },
    {
      "title": "Control and open",
      "detail": "Systemically heparinize, obtain proximal/distal and branch control, and use transverse arteriotomy for embolus in an adequate soft vessel. Diseased arteries may need longitudinal arteriotomy with patch, stent or bypass."
    },
    {
      "title": "Remove clot and restore flow",
      "detail": "Pass a small Fogarty proximally and distally (SCORE starts at 2–3 Fr; other series use 3–4 Fr). Confirm pulsatile inflow and backbleeding, flush gently rather than forcing clot into the aorta, and close primarily or with patch. Palpable SMA pulse plus mesenteric Doppler or completion imaging confirms flow; poor inflow needs bypass/ROMS, whereas persistent distal clot may need intra-arterial lysis."
    },
    {
      "title": "Reperfuse before deciding",
      "detail": "When feasible, restore flow before resection, warm the bowel, then reassess color, peristalsis, temperature, mesenteric pulse and cut-edge bleeding. Resect frank transmural necrosis; retain questionable segments for reassessment."
    },
    {
      "title": "Damage control and second look",
      "detail": "With unstable physiology, edema or uncertain viability, staple ends in discontinuity, place temporary abdominal closure and resuscitate in ICU. Return in 24–48 hours for additional resection, anastomosis or stoma; extensive involvement requires a planned relook. Deterioration demands earlier on-demand exploration. Limited resection in a stable patient may permit primary anastomosis; hand sewing edematous bowel is sometimes favored on low-level evidence."
    }
  ]
}, [[PACKET, OE], [PACKET, OE], [PACKET, OE], [PACKET, OE], [PACKET, OE, GUIDELINE]]),
  sourced({
  "id": "acute-mesenteric-ischemia-9",
  "type": "bullets",
  "heading": "Revascularization options and limitations",
  "items": [
    "For ostial disease, bypass can use supraceliac aortic antegrade inflow or iliac/infrarenal retrograde inflow; favor autologous saphenous vein when bowel is ischemic/necrotic or the field contaminated. Avoid prosthetic conduit with necrotic bowel. Long occlusions and heavy calcification can limit endovascular success.",
    "ROMS punctures the SMA during laparotomy and stents retrograde, shortening operating time versus bypass; reported patency is 76–88%. It may reduce repeat exploration in selected patients but never eliminates a second look when bowel viability remains uncertain.",
    "No randomized open-versus-endovascular trial establishes superiority. Meta-analyses favor endovascular outcomes, but open groups contain sicker/peritonitic patients. The supplied 20,991-patient review reports 30-day mortality ranges of 0–53.8% endovascular versus 21–81% open; another series spared laparotomy in about 31%.",
    "In a supplied 48-patient embolic endovascular series, technical success was 98%, 15 required laparotomy, 21% required bowel resection, complications occurred in 15% (mainly SMA dissection), and 30-day mortality was 44%. Delayed reperfusion >48 hours in a 92-patient series correlated with mortality 39% versus 14% and short bowel 39% versus 12%; there is no validated safe delay.",
    "Clinical viability assessment is imperfect. Doppler, fluorescein/Wood lamp and ICG fluorescence are adjuncts; none reliably replaces reassessment. A supplied 196-patient ICG review found disagreement with visual assessment in 35%, with more conservative resection suggested in 75% of those, but no proven reduction in morbidity, mortality or relook rates.",
    "Massive irreversible small-bowel gangrene warrants a goals-of-care discussion, especially with frailty or inability to tolerate long-term parenteral nutrition; AMESI reported primary palliation in 11%. Intestinal failure risk depends on remaining anatomy and colon continuity; cited length thresholds range from <80–200 cm, rather than a universal cutoff."
  ]
}, OE),
  sourcedUnits({
  "id": "acute-mesenteric-ischemia-10",
  "type": "table",
  "heading": "Board answer versus current practice",
  "columns": [
    "Question",
    "Board or supplied teaching",
    "Current interpretation"
  ],
  "rows": [
    [
      "Cause distribution",
      "Fiser: embolus 50%, thrombosis 25%, NOMI 15%, MVT 5%; SCORE: 40–50%, 20–30%, 5–15%, 5–15%.",
      "The supplied meta-analysis groups arterial disease at 68.6% with embolism/thrombosis similar. AMESI reports embolus 14.6%, thrombosis 24.9%, MVT 17.5%, NOMI 13.2%, unclassified 11.5%; do not force unlike denominators to sum. Embolus remains the classic keyed most-common cause."
    ],
    [
      "Embolus location",
      "Fiser transcription reads “a to 4 cm,” interpreted by the saved packet as 3–4 cm, plus angiographic meniscus sign.",
      "SCORE emphasizes location beyond middle colic/proximal jejunal branches; the supplied clinical review gives 3–10 cm. Branch distribution and CTA matter more than a single distance."
    ],
    [
      "Heparin in NOMI",
      "SCORE explicitly excludes routine heparin in NOMI; the supplied clinical review says immediate full-dose heparin for every type and describes older 48-hour delays.",
      "WSES makes correction of low flow primary; systemic heparin may be added for NOMI and full-dose anticoagulation is advised before AMI surgery unless contraindicated. Neither categorical NOMI prohibition nor universal NOMI mandate is justified."
    ],
    [
      "Watershed attribution",
      "SCORE describes terminal branches with no collaterals and Fiser maps NOMI to watershed injury.",
      "Collateral completeness varies; Griffiths and Sudeck are vulnerable zones, not proven cause-specific maps. Sudeck definitions differ (last sigmoid/rectal versus IMA–internal iliac junction)."
    ],
    [
      "Viability and second look",
      "Classic fluorescein and routine 24–48-hour relook follow SMA revascularization; SCORE cites resection at second versus first operation in 53% versus 31%.",
      "ICG is emerging without proven superiority. Plan 24–48-hour relook for uncertain/extensive injury or damage control; reoperate earlier if worsening. AMESI planned 52.5%, performed 38.4%, and found additional resection in 17.8% of operated patients; other series report further resection up to 57%, about 40% among relook patients."
    ],
    [
      "Antithrombotic duration",
      "WSES describes 6 months anticoagulation, longer/lifelong with hypercoagulability, and clopidogrel 6 months after SMA stent plus lifelong aspirin.",
      "ESVS 2025 permits 3–6 months for MVT, indefinite for idiopathic/persistent-risk disease; after atherosclerotic mesenteric stenting a short DAPT course (minimum 1 month) may be considered. Poststent durations are extrapolated and individualized to bleeding risk and concurrent anticoagulation."
    ]
  ]
}, [[PACKET], [PACKET], [GUIDELINE], [OE], [OE], [GUIDELINE, ESVS]]),
  sourced({
  "id": "acute-mesenteric-ischemia-11",
  "type": "table",
  "heading": "Outcome ranges depend on the population",
  "columns": [
    "Population",
    "Supplied mortality estimate"
  ],
  "rows": [
    [
      "Fiser and SCORE",
      "Fiser overall 60%; SCORE perioperative 30–60%, operative AMI 27.6%, and up to 80% with delayed management. Classic texts quote 60–80%."
    ],
    [
      "Meta-analysis",
      "Overall short-term 59.6% (68.7% before 2000; 55.0% thereafter); revascularized arterial 33.9%; MVT 24.6%; NOMI 58.4%."
    ],
    [
      "AMESI prospective cohort",
      "In-hospital 49%, 90-day 53.3%; MVT 13.7%, NOMI 72.7%. A selected intestinal-stroke-unit referral population had 7.7% in-hospital mortality."
    ],
    [
      "Open and NOMI series",
      "Open-revascularization short-term mortality 26–65%; WSES quotes 50–85% for critically ill peritonitic NOMI. NOMI generally fares worst and MVT best; case mix prevents direct comparisons."
    ]
  ]
}, OE),
  sourced({
  "id": "acute-mesenteric-ischemia-12",
  "type": "bullets",
  "heading": "Complications, surveillance, and cause-directed prevention",
  "items": [
    "Watch for reperfusion injury, hyperkalemia/acidosis, hypothermia/coagulopathy, abdominal compartment syndrome, anastomotic leak in edematous bowel, sepsis, renal/respiratory failure and anticoagulant bleeding/HIT. Limit excess crystalloid, follow lactate clearance and consider viscoelastic-guided blood products.",
    "AMESI reported ICU care in 66%, ventilation in 40% and renal replacement in 19%; among survivors, 14.6% required parenteral nutrition at discharge and 27.2% had a stoma. Refer intestinal failure early to rehabilitation/nutrition services.",
    "Endovascular risks include dissection, access bleeding and pseudoaneurysm. A supplied series associated thrombotic rather than embolic AMI with more recurrence (HR 5.97) and reintervention (HR 8.02), without different long-term mortality; recurrent AMI accounts for 6–8% of late deaths after revascularization.",
    "Obtain CTA/duplex within 6 months; the SVS schedule cited by WSES is duplex at 1, 6 and 12 months, then annually. Continue clinical follow-up and manage atherosclerotic risk with antiplatelet therapy/statin and risk-factor control; SCORE notes that its open-repair imaging schedule lacks consensus.",
    "After embolism obtain ECG and echocardiography to find AF/cardiac thrombus, with further aortic-source imaging when indicated. After MVT investigate inflammatory disease, malignancy, liver disease and thrombophilia (antithrombin, protein C/S, factor V Leiden, prothrombin mutation and antiphospholipid antibodies; JAK2 when myeloproliferative disease is suspected). Persistent thrombophilia or ongoing AF usually requires long-term anticoagulation.",
    "The supplied NOMI vasodilator cohort associated papaverine/PGE1 with an 11.6% absolute mortality reduction in selected mild cases; this observational result does not justify delaying surgery for infarction. Incidence estimates also vary: 6.2/100,000 person-years, 5.0/10,000 hospital admissions and AMESI 0.038% of adult acute-care admissions. Risk rises markedly after 75; AMESI found 31% began during another hospitalization, with median onset-to-admission 24 hours and admission-to-diagnosis 6 hours."
  ]
}, OE),
  references("acute-mesenteric-ischemia-references", [PACKET, OE, GUIDELINE, ESVS], "References"),
];

export const acuteMesentericIschemiaTopic = buildTopic({
  "id": "00000000-0000-4000-8000-000000007120",
  "versionId": "00000000-0000-4000-8000-000000007121",
  "slug": "acute-mesenteric-ischemia",
  "title": "Acute Mesenteric Ischemia",
  "aliases": [
    "mesenteric ischemia",
    "SMA embolus",
    "SMA thrombosis",
    "mesenteric venous thrombosis",
    "MVT",
    "NOMI",
    "nonocclusive mesenteric ischemia",
    "bowel ischemia",
    "pneumatosis intestinalis",
    "ROMS"
  ],
  "scoreNodeId": "small-intestine-conditions",
  "scoreCategory": "SCORE · Small Intestine · Diseases & Conditions",
  "tags": [
    "mesenteric-ischemia",
    "sma-embolus",
    "sma-thrombosis",
    "venous-thrombosis",
    "nomi",
    "second-look",
    "pneumatosis",
    "general-surgery-call",
    "absite",
    "score"
  ],
  sourceId: PACKET,
  additionalSourceIds: [OE, GUIDELINE, ESVS],
  blocks,
  reviewedAt: "2026-11-08T00:00:00.000Z",
});
