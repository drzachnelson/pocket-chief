# Thyroid and parathyroid batch review

Draft — pending Zach's clinical review. Prepared November 15, 2026.

This batch completes five disease topics and two operative playbooks from the supplied succinct guides. Keep the batch PR unmerged until Zach explicitly signs off. The content builders' `approved` fields are a static-library implementation detail; they do not record clinical approval.

## Per-entry sign-off and evidence limits

| Entry | Status | Decision-changing items for clinical review |
| --- | --- | --- |
| Thyroid Nodule | Needs sign-off | Distinct ATA versus ACR biopsy thresholds, 2023 Bethesda classification, pattern-based benign follow-up, molecular-test limitations, and older Fiser biopsy/extent rules. |
| Thyroid Cancer | Needs sign-off | 2025 ATA resection/RAI/TSH recommendations, RET/pheochromocytoma sequencing and MTC compartments, AJCC stage versus recurrence risk, and urgent ATC pathways. |
| Hyperthyroidism | Needs sign-off | Synthesis versus destructive thyrotoxicosis, antithyroid drug selection, thyroid-storm sequence/doses, preoperative preparation and 2026 pregnancy/lactation guidance. |
| Thyroiditis | Needs sign-off | Subacute versus suppurative disease, destructive versus synthesis-mediated AIT, checkpoint-inhibitor/adrenal precautions and selective surgical indications. |
| Hyperparathyroidism | Needs sign-off | 2022 Workshop surgical thresholds, FHH/CCCR overlap, normocalcemic uncertainty, renal HPT selection and carcinoma/crisis management. |
| Open Thyroid Lobectomy | Needs sign-off | Extent/consent, protective anatomy and nerve preservation, vessel/nerve sequence alternatives, loss of signal, neck-hematoma rescue and follow-up. |
| Parathyroidectomy | Needs sign-off | Focused versus bilateral exploration, ioPTH protocol distinctions, missing glands/hereditary/renal disease, carcinoma and postoperative calcium/cure assessment. |

## Source handling

- The complete supplied guides, original documents, paragraph extractions and preservation/objective maps remain local under the primary checkout's gitignored `output/study-guides/thyroid-parathyroid-succinct/`. Licensed SCORE/Fiser texts remain local in `Pocket Chief Resources/`.
- Each app block cites its registered source; mixed-source blocks use per-unit citations. Named guidelines are separate from supplied synthesis packets. Source support is an editorial check, not proof of accuracy.
- The 2025 ATA differentiated thyroid cancer citation was corrected to its actual title and final publication metadata. Initial nodule workup uses the separate 2015 ATA guideline.
- Inherited NCCN/ASCO/BTA/ETA claims, 2025–2026 cohort percentages, molecular/ablation performance promises and exact trial estimates were not treated as independently verified recommendations. Unresolved oral calcium units, calcitriol maxima, magnesium rates and fixed rescue infusions were excluded from prescriptive algorithms.
- Local question-bank search found no thyroid/parathyroid notes. No answer key was inferred and no note status changed.
- Extracted SCORE image/video placeholders were not reviewed or reproduced. Separate SCORE procedure topics, MEN syndromes, postoperative hypothyroidism and parathyroid cancer curriculum entries are not claimed complete by these seven entries.
- A visual check of the official ACR assessment chart resolved the prior TR3/TR4 extraction gap: the points and all biopsy/surveillance size thresholds match. Year-by-year ACR surveillance schedules and numerical Bethesda malignancy risks remain supplied-guide attribution; the complete underlying tables were not independently checked.
- The 2026 pregnancy narrative and lactation guidance were inspected. Its Table 5 image was not; the older TRAb timing is labeled with its 2016 source. Direct access to the ROAR full text and some ioPTH pages was challenged; primary abstract/indexed passages and the corrected protocol table support only the narrower claims recorded in source details.

## Curriculum coverage and boundaries

| Entry | SCORE text objectives covered in app blocks | Delegation / remaining gap |
| --- | --- | --- |
| Thyroid Nodule | 1.1–1.2 physiology/definition; 2.1–2.3 presentation/function/risk; 3 ultrasound; 4 cytology; 5–6 indeterminate/molecular decisions; 7.1–7.3 toxic, benign and malignant management. Blocks `block-tn-physiology`, `history`, `workup`, `ata-fna`, `acr-points`, `bethesda`, `molecular`, `toxic`, `benign-treatment`, `cancer-operation` (suffixes share `block-tn-`). | Detailed cancer stage/treatment/follow-up is in Thyroid Cancer; operative technique is in the playbooks. Media gap as above. |
| Thyroid Cancer | 1.1–1.2 types/inheritance; 2.1–2.2 anatomy/histology; 3.1–3.4 recognition/workup/tissue; 4.1–4.5 cytology/molecular and DTC/MTC/ATC stage; 5.1–5.4 preparation/extent/nodes/nerve; 6.1–6.4 surveillance/RAI/systemic/lymphoma; 7.1–7.2 DTC/MTC follow-up. See `block-tc-histology`, `tnm`, `stage`, `extent`, `nodes`, `rai-indications`, `ret`, `atc`, `response`, `mtc-followup` (suffixes share `block-tc-`). | Full initial ultrasound/Bethesda detail is in Thyroid Nodule; neck-dissection technique is outside these playbooks. Media gap as above. |
| Hyperthyroidism | 1.1–1.3 physiology/etiology; 2.1–2.2 presentation and thyroiditis distinction; 3 imaging; 4.1–4.2 treatment/preparation; 5.1–5.2 and 6 medical choices, risks and evidence. See physiology, diagnosis, definitive treatment, preoperative, storm, pregnancy and follow-up sections. | Detailed thyroid technique is in the thyroid playbooks. No blanket ATD choice after 16 weeks or universal pediatric RAI prohibition. |
| Thyroiditis | 1–2 etiologies/course/context; 3 examination, labs, antibodies, nodules and tissue; 4 cause-specific treatment; 5 selective surgery. See entity comparison, workup and Hashimoto/subacute/postpartum/suppurative/AIT/ICI/Riedel blocks. | No unverified fixed antimicrobial duration, Riedel dosing or five-year surgery outcome promise. Image-only SCORE tables remain unreviewed. |
| Hyperparathyroidism | 1 anatomy/physiology; 2.1–2.3 disease patterns; 3.1–3.3 presentation/diagnosis; 3.4 indications/localization/operation/observation; 3.5 normocalcemic/carcinoma/crisis; 4.1–4.4 and 5.1–5.2 renal secondary/tertiary disease. See biochemical sequence, exact indication table, operation selection and renal/crisis/follow-up blocks. | Technical exploration is in Parathyroidectomy. No universal normocalcemic indication, renal operative PTH cutoff or transplant timing rule. |
| Open Thyroid Lobectomy | Thyroidectomy module operative subset: 1.1–1.3 anatomy; 2.1–2.4 selection/workup; 3 extent; 4.1–4.2 sequence/tips; 5.2 autograft; 6 alternatives; 8.1–8.4 complication recognition/rescue. | 1.4 and 5.1/5.3 nodal disease delegated to the cancer topic, with no neck-dissection technical completion claim; 7 pregnancy delegated to cancer/hyperthyroidism topics. The source module covers thyroidectomy generally, not a separate lobectomy module. |
| Parathyroidectomy | 1.1–1.2 indication/contraindication; 2.1–2.2 labs/localization; 3.1–3.3 glands/nerves/vessels; 4 comprehensive exploration; 5.1–5.3 focused selection/ioPTH/missing glands; 6.1–6.3 calcium/nerve/persistence; 7 outcomes. See the focused sequence, ioPTH comparison, remnant planning and postoperative blocks. | Renal physiology/medical selection is in Hyperparathyroidism. Verified adult IV calcium rescue is separate from withheld oral/Mg/fixed-infusion regimens. |

## Verification

Typecheck and lint passed. Full unit suite: **44 files passed; 475 tests passed, 3 skipped**. Initial link-pin failure was resolved after reviewing four newly available hyperparathyroidism aliases; the thyroid and parathyroid links now point to the appropriate topic. An existing generic recurrent-nerve alias was narrowed to traumatic nerve injury so ordinary operative anatomy no longer routes to neck-trauma repair. Zuckerkandl search now legitimately includes both thyroid operations.

Static build and browser/export/offline results will be recorded before push. Structural tests do not establish clinical approval.

Baseline: scaffold `d074cf5`, on fetched `origin/main` `d5f7462`. The current primary-checkout context script confirmed matching static architecture and zero main-only commits. Its remaining failures are pre-existing context debt on that production baseline: oversized legacy `CLAUDE.md`/`MEMORY.md` and missing `docs/agents/runtime.md`; this content batch does not rewrite those files.
