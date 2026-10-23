# Upper GI promotion — Needs sign-off

The six upper-GI topics are promoted from the PR #38 drafts into regular library entries in the PR on `claude/promote-upper-gi-drafts`. **That PR stays unmerged until Zach signs off.** Passing the content contract, build and browser checks shows structure, citation coverage and rendering. It does not mean the content is clinically approved.

`buildTopic` has no `warnings` field, so the conversion dropped each draft's `warnings` array. Every entry is copied below verbatim, one checkbox per warning (38 in total). None was resolved or reworded in the conversion. The clinical text, tables, sequences, flows and source registrations are unchanged from PR #38.

## Flag areas from the README

The batch README named these review areas. Each one maps to the topic warnings below and to the topic's "Board answer versus current practice" table.

| Flag area | Where to review |
|---|---|
| H. pylori regimen and cure testing | Peptic Ulcer Disease: historical-management warning; "Treat H. pylori and document cure" blocks |
| Gastrin units and acid context | Peptic Ulcer Disease: needs-further-support warning; Gastroduodenal Perforation Repair: the "gastrin >1000 ng/mL" warning |
| Patch terminology | Gastroduodenal Perforation Repair: the free versus pedicled patch naming warning |
| Complex repair and rescue | Gastroduodenal Perforation Repair: the complex duodenal rescue and complex-defect reconstruction warnings |
| Adherent-clot management | Upper Gastrointestinal Bleeding: the ESGE 2026 adherent-clot current-practice addition |
| ICU prophylaxis | Stress Gastritis: ventilation-alone prophylaxis and SCCM/ASHP attribution; prophylaxis order-set gap |
| Airway and antithrombotics | Upper Gastrointestinal Bleeding: ESGE airway/lavage and ACG-CAG aspirin additions; Esophagogastroduodenoscopy: universal antiplatelet holds and drug-specific antithrombotic gaps |
| Sedation | Esophagogastroduodenoscopy: sedation/capnography, fasting/GLP-1 and the unread July 2026 ESGE sedation update |

## Per-topic warnings (verbatim)

### Decompress and resuscitate (`peptic-ulcer-disease`)

- [ ] Draft — pending Zach's clinical review
- [ ] **Clinical approval pending.** Source review does not establish clinical approval.
- [ ] **Conflicting anatomy:** S1 places ECL cells predominantly in the antrum and describes duodenal ulcers within the antral-pyloric channel. ECL location is not taught here; duodenal location follows the concordant duodenal-bulb descriptions in S3 §1 and S2 p.398.
- [ ] **Classification/physiology:** type II wording and type IV acid descriptions differ; the table preserves the paired-lesion definition and avoids an unsupported universal acid claim for type IV.
- [ ] **Historical management:** empirical clarithromycin triple therapy, fixed blood-unit thresholds, and automatic acid surgery after prior PPI use must not drive the contemporary algorithms.
- [ ] **Needs further support:** a full gastrinoma diagnostic protocol, exact ulcer-healing/endoscopic surveillance intervals, and causal claims about long-term PPI atrophy. The apparent gastrin-unit error is omitted from diagnostic teaching.
- [ ] No matching stomach/EGD question-bank entries were supplied; no bank key or tested-frequency claim is inferred. SCORE figures/videos remain unreviewed.

### Step 1 (`gastroduodenal-perforation-repair`)

- [ ] Draft — pending Zach's clinical review
- [ ] **Clinical approval pending.** Complex duodenal rescue is an operative overview, not a technical competency assessment.
- [ ] Source differences remain explicit: free versus pedicled patch naming; routine yeast coverage versus selective antifungals; routine wide drains/enteral access versus individualized use; historic mandatory acid reduction after prior PPI therapy versus selected stable cases.
- [ ] **Needs further support:** a procedure-specific postoperative leak algorithm, exact closure/suture specifications, uniform drain policy, feeding/imaging schedule, and exact complex-defect reconstruction criteria. No unsupported protocol is substituted.
- [ ] S3's “gastrin >1000 ng/mL” conflicts with Fiser's pg/mL unit; the value is not taught as a diagnostic rule. Its 30% 90-day mortality is not generalized to every emergency ulcer repair.
- [ ] Source figures/videos remain unreviewed. No matching question-bank notes were available.

### Confirm the plan and reconstruction (`vagotomy-and-drainage`)

- [ ] Draft — pending Zach's clinical review
- [ ] **Clinical approval pending.** Operative descriptions are educational overviews; no hands-on technique validation is claimed.
- [ ] **Source/OCR conflict:** Fiser esophagus p.364 says Grassi left “divided” causes acid persistence; Fiser stomach p.394 and SCORE specify **undivided**. Teaching follows the concordant mechanism.
- [ ] Absolute absence of delayed emptying after highly selective vagotomy and source-specific recurrence percentages are qualified. Exact dose regimens for octreotide, prokinetics and diarrhea rescue are not supplied here.
- [ ] **Needs further support:** technical completeness testing, a full highly selective dissection atlas, chylous-leak escalation, and contemporary conduit-drainage selection evidence.
- [ ] Source figures/videos remain unreviewed; no matching question-bank notes were available.
- [ ] This sequence explains the operative decisions. Exact dissection lengths, intraoperative completeness testing, and a full technical atlas are not supplied; they remain outside the claimed coverage.

### Step 1 (`upper-gastrointestinal-bleeding`)

- [ ] Draft — pending Zach's clinical review
- [ ] **Clinical approval pending.** Exact rebleeding rates and source blood-unit thresholds are not used as universal triggers.
- [ ] **Current-practice additions:** ACG 2021 risk/transfusion/PPI pathway; ESGE 2026 adherent-clot, airway/lavage and rescue nuances; ACG-CAG aspirin guidance. These are separately attributed additions, not supplied question-bank keys.
- [ ] **Source correction:** bilious NG output cannot establish absence of an upper lesion; routine lavage is not recommended. CTA and tagged-RBC detection thresholds were conflated in S5 and are not repeated.
- [ ] **Needs further support:** full Baveno VIII recommendations, detailed gastric-varix/early-TIPS selection, local massive-transfusion and anticoagulant-reversal protocols, iron-replacement regimen, and any implementation of a complete risk-score calculator. The primary 2026 variceal full text was inaccessible.
- [ ] No matching stomach/bleeding question-bank notes were available; source figures remain unreviewed.

### Stress Gastritis (`stress-gastritis`)

- [ ] Draft — pending Zach's clinical review
- [ ] **Clinical approval pending.** No current-practice addition is represented as a supplied bank key.
- [ ] Source timing differs: early mucosal lesions in SCORE versus a later clinical window in Fiser. These are presented as different observed endpoints rather than one invented timing rule.
- [ ] Ventilation-alone prophylaxis, universal biopsy during active erosive bleeding, and historical incidence/cutoffs are qualified. Modern prophylaxis is separately attributed to SCCM/ASHP.
- [ ] **Needs further support:** a drug/renal-function-specific prophylaxis order set, a complete diffuse-hemorrhagic-gastritis surgical rescue strategy, and an indication-specific repeat-EGD protocol.
- [ ] SCORE media and the embedded Johnson figure were not reviewed. No matching stomach question-bank notes were available.

### Position and monitor (`esophagogastroduodenoscopy`)

- [ ] Draft — pending Zach's clinical review
- [ ] **Clinical approval pending.** Neither procedural competency nor sedation/device competence was assessed.
- [ ] Source anatomy is qualified: gastric clock-face orientation changes; duodenal folds are not a stand-alone bulb identifier; Z-line, GE junction and diaphragm can diverge.
- [ ] The source's broad asymptomatic reflux/sleeve screening, blanket coagulopathy contraindication, “Whipple disease” operation wording, EUS-cyst/ascites/graft-related antibiotic advice and universal antiplatelet holds require context or further source-specific review.
- [ ] **Needs further support:** current detailed sedation/capnography and discharge criteria, ASA/agent-specific fasting/GLP-1 implementation, drug-specific antithrombotic holds, lesion-specific foreign-body/dilation/oncologic therapy and full iatrogenic-perforation protocols. The July 2026 ESGE sedation update was identified on the society index but not reviewed in full.
- [ ] No generic 0.1% perforation estimate is adopted for every diagnostic and therapeutic EGD. Source images/videos remain unreviewed; no matching endoscopy question-bank notes were supplied.
