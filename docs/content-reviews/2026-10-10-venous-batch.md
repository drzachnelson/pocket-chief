# Venous batch editorial review — October 10, 2026

Status: complete draft batch for Zach’s review. No merge or deployment approval is implied. Seed builders label compiled entries approved for the local review build; this branch must not enter the live search library until Zach approves the PR.

## Scope

Eight topics: Vena Cava Filter Insertion; Evaluation of a Swollen Leg; Thrombophlebitis; Venous Stasis and Chronic Venous Insufficiency; Varicose Veins; Superior Vena Cava Syndrome; Thoracic Outlet Syndrome (all three subtypes); Prophylaxis of Venous Thromboembolism.

Four playbooks: IVC Filter Placement and Retrieval; First Rib Resection for Venous Thoracic Outlet Syndrome; Open Venous Thrombectomy; Endovenous Ablation (thermal radiofrequency/laser focus, with alternatives).

The related DVT topic retains its identity and slug. Dedicated filter, TOS and prevention aliases now resolve to the relevant new topics. Playbooks remain outside the SCORE taxonomy and use stable procedure IDs. The VTE prevention module is placed in its supplied SCORE module category, Preoperative Evaluation and Perioperative Care, rather than inventing a venous curriculum placement. That adjunct category is outside the organ-module outline’s coverage denominator.

## Research continuity and efficiency

Reused Claude’s five authored entries and saved SCORE-notebook briefs/audits. Recovered the unfinished [IVC operative brief](https://gemini.google.com/app/c6f0d1c0545bcd30). Obtained the remaining three operative briefs in one [Rezzy notebook pass](https://gemini.google.com/app/384a26250ce23658). Used one [shared OpenEvidence Sackett audit](https://www.openevidence.com/ask/b08fd69e-0f64-4796-9c8e-493d1506dfb5) plus a focused follow-up for first-rib/open-thrombectomy safety. Existing SVC audit was reused. This avoids repeating complete background guides for every related entry.

AI agreement was not treated as independent clinical verification. Local licensed SCORE modules were read for anatomy and topic placement; guideline-dependent corrections were checked against primary sources where accessible. Source records distinguish direct checks from notebook/audit attributions. No patient data or proprietary questions are included.

## Decision-changing corrections

- CHEST general abdominal/pelvic bands: Caprini 0 versus 1–2, not 0–1 versus 2. Extended cancer-surgery prevention totals four weeks from surgery, not an extra 28 days after discharge. Neuraxial timing is not a universal 12-hour rule.
- Filters: confirmed recurrent PE after optimized anticoagulation is a selected consideration. SIR 2020 discourages routine filters for recurrent VTE; newer 2026 PE guidance is retained as a separate nuance. The 29–54-day figure is a transient-risk decision model, not a universal deadline. Device instructions control caval limits and recapture.
- Thermal ablation: ARTE/EHIT III requires therapeutic anticoagulation. Routine early duplex is not recommended for average-risk asymptomatic thermal-ablation patients; symptoms/high risk change the plan. Chronic deep disease is not a blanket ban on superficial treatment; collateral function and conduit needs matter.
- TOS: all three subtypes have separate pathways. No automatic lysis or mandatory same-admission rib resection for every arm clot. The 2026 AVF recommendation is identified separately from older ESVS guidance.
- SVC: urgency follows airway, neurologic and circulatory compromise. Stable malignancy needs tissue diagnosis. Chemosensitive malignancy is a relative stent consideration, not an absolute contraindication.
- Open venous thrombectomy: the notebook acknowledged a missing dedicated chapter and blended arterial technique. The core venous sequence instead uses an [actual surgical series](https://pmc.ncbi.nlm.nih.gov/articles/PMC7302664/). No blind distal balloon passage across valves; completion imaging and selective outflow correction are included. AV fistulas/caval protection are selective.
- Negative initial proximal leg ultrasound is not the end of evaluation when suspicion persists. Clinical compartment syndrome does not wait for pressure testing.

## Navigation corrections

Narrowed three pre-existing aliases that misdirected the new content: FAST no longer owns bare pneumothorax/hemothorax (the pleural injury topic does); sclerotherapy aliases now name the hemorrhoidal or venous context; pediatric groin hernia retains high ligation of the sac. Venous sclerotherapy and high ligation/stripping now stay in their appropriate context.

## Limits for the reviewer

Full text of AVF 2026 UEDVT and ESVS 2022 CVD was not directly retrievable; publication identity and society references were verified, while exact clinical wording came from the supplied evidence audit. Notebook book/chapter attributions were not independently opened. Open-thrombectomy evidence is limited and center-specific; its fixed PEEP, routine AV fistula and six-month regimen are not generalized. Device settings and personal attending preferences are deliberately not invented. Source details retain these limitations for clinical review.

## Verification

Production build and TypeScript pass (85 static pages); ESLint passes with zero warnings. Vitest passes all 171 tests across 30 files. Playwright passes 22 tests with four device-specific skips, including desktop/mobile navigation and visited-topic offline reading. All twelve new pages and the revised DVT page were inspected at desktop and 375px widths: source markers, table row counts and flow node counts match; no page overflow. All 142 title/alias queries across this batch and DVT rank their intended entry first. Static artifacts contain 60 topics and 15 playbooks, with new playbooks absent from the topic JSON. Anki export is absent from the current static app, so no Anki behavior is claimed or added by this batch.
