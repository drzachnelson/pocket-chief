import type { SuppliedSource } from "@/lib/types";

export const CHOLEDOCHOLITHIASIS_SOURCE = "00000000-0000-4000-8000-000000000102";
export const BREAST_FIBROEPITHELIAL_SOURCE = "00000000-0000-4000-8000-000000000202";
export const GENERAL_ABDOMEN_SOURCE = "00000000-0000-4000-8000-000000000302";
export const HERNIA_SOURCE = "00000000-0000-4000-8000-000000000500";
export const SCORE_ARTERIAL_SOURCE = "00000000-0000-4000-8000-000000000600";
export const FISER_VASCULAR_SOURCE = "00000000-0000-4000-8000-000000000601";
export const USPSTF_AAA_SOURCE = "00000000-0000-4000-8000-000000000602";
export const ACUTE_LIVER_FAILURE_SOURCE = "00000000-0000-4000-8000-000000000700";
export const CARDIAC_PACING_SOURCE = "00000000-0000-4000-8000-000000000800";
export const PARAESOPHAGEAL_HERNIA_SOURCE = "00000000-0000-4000-8000-000000000900";
export const RENAL_ARTERY_DISEASE_SOURCE = "00000000-0000-4000-8000-000000001000";
export const SCORE_MALROTATION_SOURCE = "00000000-0000-4000-8000-000000001100";
export const SCORE_MALROTATION_OPERATION_SOURCE = "00000000-0000-4000-8000-000000001101";
export const FISER_PEDIATRIC_SOURCE = "00000000-0000-4000-8000-000000001102";
export const MALROTATION_PACKET_SOURCE = "00000000-0000-4000-8000-000000001103";
export const TRAUMA_FAST_PACKET_SOURCE = "00000000-0000-4000-8000-000000001200";
export const TRAUMA_SPLENIC_PACKET_SOURCE = "00000000-0000-4000-8000-000000001201";
export const TRAUMA_HEPATIC_PACKET_SOURCE = "00000000-0000-4000-8000-000000001202";
export const TRAUMA_GI_PACKET_SOURCE = "00000000-0000-4000-8000-000000001203";
export const TRAUMA_FASCIOTOMY_PACKET_SOURCE = "00000000-0000-4000-8000-000000001204";
export const TRAUMA_ESCHAROTOMY_PACKET_SOURCE = "00000000-0000-4000-8000-000000001205";
export const TRAUMA_NECK_PACKET_SOURCE = "00000000-0000-4000-8000-000000001206";
export const TRAUMA_CHEST_WALL_PLEURA_DIAPHRAGM_PACKET_SOURCE = "00000000-0000-4000-8000-000000001207";
export const TRAUMA_VASCULAR_THORACIC_PACKET_SOURCE = "00000000-0000-4000-8000-000000001230";
export const TRAUMA_TRACHEOBRONCHIAL_LUNG_PACKET_SOURCE = "00000000-0000-4000-8000-000000001231";
export const TRAUMA_CARDIAC_INJURY_PACKET_SOURCE = "00000000-0000-4000-8000-000000001232";
export const CROHN_DISEASE_PACKET_SOURCE = "00000000-0000-4000-8000-000000001300";
export const ULCERATIVE_COLITIS_PACKET_SOURCE = "00000000-0000-4000-8000-000000001301";
export const ACUTE_LIMB_ISCHEMIA_PACKET_SOURCE = "00000000-0000-4000-8000-000000001400";
export const VASCULAR_EXPOSURE_PRINCIPLES_PACKET_SOURCE = "00000000-0000-4000-8000-000000001401";
export const CRITICAL_CARE_AIRWAY_PACKET_SOURCE = "00000000-0000-4000-8000-000000002000";
export const CRITICAL_CARE_ARRHYTHMIAS_PACKET_SOURCE = "00000000-0000-4000-8000-000000001500";
export const CRITICAL_CARE_FLUID_ACID_BASE_PACKET_SOURCE = "00000000-0000-4000-8000-000000001600";
export const CRITICAL_CARE_HYPOVOLEMIC_SHOCK_PACKET_SOURCE = "00000000-0000-4000-8000-000000001700";
export const CRITICAL_CARE_RESPIRATORY_FAILURE_PACKET_SOURCE = "00000000-0000-4000-8000-000000001800";
export const CRITICAL_CARE_CARDIOGENIC_SHOCK_PACKET_SOURCE = "00000000-0000-4000-8000-000000001900";
export const HEMORRHOIDS_PACKET_SOURCE = "00000000-0000-4000-8000-000000002100";
export const SCORE_HEMORRHOIDS_SOURCE = "00000000-0000-4000-8000-000000002101";
export const ASCRS_HEMORRHOIDS_SOURCE = "00000000-0000-4000-8000-000000002102";
export const FISER_ANORECTAL_SOURCE = "00000000-0000-4000-8000-000000002103";
export const BREAST_BIOPSY_PACKET_SOURCE = "00000000-0000-4000-8000-000000002200";
export const SCORE_PERCUTANEOUS_BREAST_BIOPSY_SOURCE = "00000000-0000-4000-8000-000000002201";
export const FISER_BREAST_SOURCE = "00000000-0000-4000-8000-000000002202";
export const ACR_BIRADS_SOURCE = "00000000-0000-4000-8000-000000002203";
// Pancreas. One block for the Pancreaticoduodenectomy topic and the open Whipple playbook, because
// both pages are written from the same two owner-supplied guides and splitting their sources across
// the topic and playbook ranges would imply a provenance split that does not exist.
export const PANCREATICODUODENECTOMY_PACKET_SOURCE = "00000000-0000-4000-8000-000000002300";
export const WHIPPLE_OPERATIVE_PACKET_SOURCE = "00000000-0000-4000-8000-000000002301";
export const SCORE_PANCREATICODUODENECTOMY_SOURCE = "00000000-0000-4000-8000-000000002302";
export const FISER_PANCREAS_SOURCE = "00000000-0000-4000-8000-000000002303";
export const NCCN_PANCREATIC_V4_2026_SOURCE = "00000000-0000-4000-8000-000000002304";
export const ISGPS_POPF_2016_SOURCE = "00000000-0000-4000-8000-000000002305";
export const PRODIGE24_SOURCE = "00000000-0000-4000-8000-000000002306";
export const PRESTON_PPH_2024_SOURCE = "00000000-0000-4000-8000-000000002307";
export const PREOPANC1_SOURCE = "00000000-0000-4000-8000-000000002308";
export const NORPACT1_SOURCE = "00000000-0000-4000-8000-000000002309";
export const ALLIANCE_A021501_SOURCE = "00000000-0000-4000-8000-000000002310";
export const COCHRANE_ANTECOLIC_2022_SOURCE = "00000000-0000-4000-8000-000000002311";
export const LEOPARD2_SOURCE = "00000000-0000-4000-8000-000000002312";
export const HEMODIALYSIS_CATHETER_PACKET_SOURCE = "00000000-0000-4000-8000-000000002400";
export const SCORE_VASCULAR_ACCESS_DIALYSIS_SOURCE = "00000000-0000-4000-8000-000000002401";
export const KDOQI_VASCULAR_ACCESS_2019_SOURCE = "00000000-0000-4000-8000-000000002402";
export const HAKIM_RULE_OF_SIXES_2022_SOURCE = "00000000-0000-4000-8000-000000002403";
export const DVT_PACKET_SOURCE = "00000000-0000-4000-8000-000000002500";
export const SCORE_VENOUS_THROMBOEMBOLISM_SOURCE = "00000000-0000-4000-8000-000000002501";
export const SCORE_VENA_CAVA_FILTER_SOURCE = "00000000-0000-4000-8000-000000002502";
export const FISER_HEMATOLOGY_SOURCE = "00000000-0000-4000-8000-000000002503";
export const COBRRA_SOURCE = "00000000-0000-4000-8000-000000002504";
export const SIR_ILIOFEMORAL_DVT_2023_SOURCE = "00000000-0000-4000-8000-000000002505";
export const SVS_AVF_EARLY_THROMBUS_REMOVAL_2012_SOURCE = "00000000-0000-4000-8000-000000002506";
// Venous cluster (October 2026): eight topics share the four hundreds blocks left below 03000, one 50-id half each.
export const VENA_CAVA_FILTER_PACKET_SOURCE = "00000000-0000-4000-8000-000000002600";
export const ACR_SIR_SPR_IVC_FILTER_2021_SOURCE = "00000000-0000-4000-8000-000000002601";
export const SIR_IVC_FILTER_GUIDELINE_JAMA_2021_SOURCE = "00000000-0000-4000-8000-000000002602";
export const AHA_ACC_PE_GUIDELINE_2026_SOURCE = "00000000-0000-4000-8000-000000002603";
export const SWOLLEN_LEG_PACKET_SOURCE = "00000000-0000-4000-8000-000000002650";
export const SCORE_SWOLLEN_LEG_SOURCE = "00000000-0000-4000-8000-000000002651";
export const THROMBOPHLEBITIS_PACKET_SOURCE = "00000000-0000-4000-8000-000000002700";
export const SCORE_THROMBOPHLEBITIS_SOURCE = "00000000-0000-4000-8000-000000002701";
export const CALISTO_SOURCE = "00000000-0000-4000-8000-000000002702";
export const SVS_AVF_AVLS_VARICOSE_2023_SOURCE = "00000000-0000-4000-8000-000000002703";
export const CVI_PACKET_SOURCE = "00000000-0000-4000-8000-000000002750";
export const SCORE_CVI_SOURCE = "00000000-0000-4000-8000-000000002751";
export const EVRA_SOURCE = "00000000-0000-4000-8000-000000002752";
export const VARICOSE_PACKET_SOURCE = "00000000-0000-4000-8000-000000002800";
export const SCORE_VARICOSE_SOURCE = "00000000-0000-4000-8000-000000002801";
export const AVF_SVS_EHIT_2021_SOURCE = "00000000-0000-4000-8000-000000002802";

// Playbooks. Operative guides, numbered from 3000 so they never collide with topic sources.
export const TEMPORAL_ARTERY_BIOPSY_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003000";
export const CEA_BOVINE_PATCH_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003001";
export const SVS_CAROTID_2022_SOURCE = "00000000-0000-4000-8000-000000003002";
export const FEMPOP_BYPASS_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003003";
export const ACC_AHA_PAD_2024_SOURCE = "00000000-0000-4000-8000-000000003004";
export const ESC_ESVS_PAD_2024_SOURCE = "00000000-0000-4000-8000-000000003005";
export const RTAPP_INGUINAL_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003006";
export const HERNIASURGE_2018_SOURCE = "00000000-0000-4000-8000-000000003007";
export const TOTAL_THYROIDECTOMY_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003008";
export const ATA_THYROID_2025_SOURCE = "00000000-0000-4000-8000-000000003009";
export const MASTECTOMY_SLNB_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003010";
export const NCCN_BREAST_V6_2026_SOURCE = "00000000-0000-4000-8000-000000003011";
export const ASCO_ASTRO_AXILLA_2025_SOURCE = "00000000-0000-4000-8000-000000003012";
export const ROBOTIC_CHOLECYSTECTOMY_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003013";
export const SAGES_SAFE_CHOLECYSTECTOMY_SOURCE = "00000000-0000-4000-8000-000000003014";
export const WSES_ACUTE_CALCULOUS_CHOLECYSTITIS_2020_SOURCE = "00000000-0000-4000-8000-000000003015";
export const RIGHT_HEMICOLECTOMY_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003016";
export const ASCRS_SAGES_ERAS_2023_SOURCE = "00000000-0000-4000-8000-000000003017";
export const COLOSTOMY_TAKEDOWN_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003018";
export const ASCRS_OSTOMY_2022_SOURCE = "00000000-0000-4000-8000-000000003019";
export const ROBOTIC_VENTRAL_HERNIA_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003020";
export const EHS_AHS_UMBILICAL_2020_SOURCE = "00000000-0000-4000-8000-000000003021";
export const SAGES_HERNIA_PROPHYLAXIS_2016_SOURCE = "00000000-0000-4000-8000-000000003022";
export const WSES_EMERGENCY_HERNIA_SOURCE = "00000000-0000-4000-8000-000000003023";

export const SCORE_SVC_SOURCE = "00000000-0000-4000-8000-000000002850";
export const SVC_PACKET_SOURCE = "00000000-0000-4000-8000-000000002851";
export const CIRSE_SVC_SOURCE = "00000000-0000-4000-8000-000000002852";
export const SCORE_TOS_SOURCE = "00000000-0000-4000-8000-000000002900";
export const TOS_PACKET_SOURCE = "00000000-0000-4000-8000-000000002901";
export const ESVS_VTE_2021_SOURCE = "00000000-0000-4000-8000-000000002902";
export const AVF_UEDVT_2026_SOURCE = "00000000-0000-4000-8000-000000002903";
export const SCORE_VTE_PROPHYLAXIS_SOURCE = "00000000-0000-4000-8000-000000002950";
export const VTE_PROPHYLAXIS_PACKET_SOURCE = "00000000-0000-4000-8000-000000002951";
export const CHEST_SURGICAL_PROPHYLAXIS_2012_SOURCE = "00000000-0000-4000-8000-000000002952";
export const ASH_SURGICAL_PROPHYLAXIS_2019_SOURCE = "00000000-0000-4000-8000-000000002953";
export const IVC_FILTER_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003024";
export const FIRST_RIB_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003025";
export const OPEN_VENOUS_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003026";
export const ENDOVENOUS_ABLATION_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003027";
export const OPEN_VENOUS_THROMBECTOMY_STUDY_SOURCE = "00000000-0000-4000-8000-000000003028";
export const SIR_IVC_FILTER_2020_SOURCE = "00000000-0000-4000-8000-000000003029";
export const ESVS_CVD_2022_SOURCE = "00000000-0000-4000-8000-000000003030";
export const IVC_FILTER_DECISION_ANALYSIS_SOURCE = "00000000-0000-4000-8000-000000003031";

// Carotid (October 2026): every hundreds block below 03000 is taken, so topics continue at 04000. One block serves
// both carotid topics and the TCAR playbook, because all three are written from the same modules and trials (the pancreas reasoning).
export const SCORE_CAROTID_DISEASE_SOURCE = "00000000-0000-4000-8000-000000004000";
export const SCORE_CAROTID_PROCEDURES_SOURCE = "00000000-0000-4000-8000-000000004001";
export const ESVS_CAROTID_2023_SOURCE = "00000000-0000-4000-8000-000000004002";
export const CREST2_SOURCE = "00000000-0000-4000-8000-000000004003";
export const NASCET_SOURCE = "00000000-0000-4000-8000-000000004004";
export const ACAS_SOURCE = "00000000-0000-4000-8000-000000004005";
export const CREST_SOURCE = "00000000-0000-4000-8000-000000004006";
export const CMS_CAROTID_STENTING_2023_SOURCE = "00000000-0000-4000-8000-000000004007";
export const ROADSTER_SOURCE = "00000000-0000-4000-8000-000000004008";
export const ROADSTER2_SOURCE = "00000000-0000-4000-8000-000000004009";
export const VQI_TCAR_VS_TFCAS_2019_SOURCE = "00000000-0000-4000-8000-000000004010";
export const ENROUTE_LABELING_SOURCE = "00000000-0000-4000-8000-000000004011";
export const TCAR_TECHNIQUE_2017_SOURCE = "00000000-0000-4000-8000-000000004012";
export const DE_BORST_TCAR_2023_SOURCE = "00000000-0000-4000-8000-000000004013";
export const TCAR_HEMODYNAMICS_2018_SOURCE = "00000000-0000-4000-8000-000000004014";
export const TCAR_ANESTHESIA_2020_SOURCE = "00000000-0000-4000-8000-000000004015";
export const CAROTID_DISEASE_OE_SOURCE = "00000000-0000-4000-8000-000000004016";
export const CAROTID_PROCEDURES_OE_SOURCE = "00000000-0000-4000-8000-000000004017";
export const TCAR_PLAYBOOK_OE_SOURCE = "00000000-0000-4000-8000-000000004018";
export const TCAR_VS_CEA_STANDARD_RISK_2023_SOURCE = "00000000-0000-4000-8000-000000004019";
// 04020/04021 are the Carotid Artery Disease topic's ids, so the block resumes at 04030.
export const VQI_TCAR_CEA_TFCAS_2022_SOURCE = "00000000-0000-4000-8000-000000004030";

// Vascular access batch (October 2026): sources 04100-04119, topics 04120/04121 through 04170/04171.
export const SCORE_VASCULAR_ACCESS_SOURCE = "00000000-0000-4000-8000-000000004100";
export const SCORE_US_VASCULAR_ACCESS_SOURCE = "00000000-0000-4000-8000-000000004101";
export const SCORE_AV_GRAFT_FISTULA_SOURCE = "00000000-0000-4000-8000-000000004102";
export const SCORE_VENOUS_ACCESS_DEVICES_SOURCE = "00000000-0000-4000-8000-000000004103";
export const SCORE_RENAL_FAILURE_SOURCE = "00000000-0000-4000-8000-000000004104";
export const FISER_CRITICAL_CARE_SOURCE = "00000000-0000-4000-8000-000000004105";
export const FISER_FLUIDS_ELECTROLYTES_SOURCE = "00000000-0000-4000-8000-000000004106";
export const RENAL_FAILURE_OE_SOURCE = "00000000-0000-4000-8000-000000004107";
export const DIALYSIS_ACCESS_OE_SOURCE = "00000000-0000-4000-8000-000000004108";
export const AV_ACCESS_OE_SOURCE = "00000000-0000-4000-8000-000000004109";
export const VASCULAR_ACCESS_OE_SOURCE = "00000000-0000-4000-8000-000000004110";
export const US_VASCULAR_ACCESS_OE_SOURCE = "00000000-0000-4000-8000-000000004111";
export const VENOUS_ACCESS_DEVICES_OE_SOURCE = "00000000-0000-4000-8000-000000004112";
export const STARRT_AKI_2020_SOURCE = "00000000-0000-4000-8000-000000004113";
export const SHEA_CLABSI_2022_SOURCE = "00000000-0000-4000-8000-000000004114";
export const MAGIC_2015_SOURCE = "00000000-0000-4000-8000-000000004115";
export const ASA_CENTRAL_VENOUS_ACCESS_2020_SOURCE = "00000000-0000-4000-8000-000000004116";

// Liver batches (October 2026): sources 04200-04219. Batch 1 topics 04220/04221 through 04250/04251;
// batch 2 topics 04300/04301 through 04330/04331. Batch 2 reuses the Fiser and TrueLearn entries.
export const SCORE_HEPATIC_ABSCESS_SOURCE = "00000000-0000-4000-8000-000000004200";
export const SCORE_HEPATIC_ABSCESS_DRAINAGE_SOURCE = "00000000-0000-4000-8000-000000004201";
export const SCORE_PRIMARY_HEPATIC_NEOPLASMS_SOURCE = "00000000-0000-4000-8000-000000004202";
export const SCORE_METASTATIC_HEPATIC_NEOPLASMS_SOURCE = "00000000-0000-4000-8000-000000004203";
export const FISER_LIVER_SOURCE = "00000000-0000-4000-8000-000000004204";
export const HEPATIC_ABSCESS_OE_SOURCE = "00000000-0000-4000-8000-000000004205";
export const HEPATIC_ABSCESS_DRAINAGE_OE_SOURCE = "00000000-0000-4000-8000-000000004206";
export const PRIMARY_HEPATIC_NEOPLASMS_OE_SOURCE = "00000000-0000-4000-8000-000000004207";
export const METASTATIC_HEPATIC_NEOPLASMS_OE_SOURCE = "00000000-0000-4000-8000-000000004208";
export const TRUELEARN_LIVER_SOURCE = "00000000-0000-4000-8000-000000004209";
export const SCORE_INTRAOPERATIVE_HEPATIC_ULTRASOUND_SOURCE = "00000000-0000-4000-8000-000000004210";
export const SCORE_HEPATIC_BIOPSY_SOURCE = "00000000-0000-4000-8000-000000004211";
export const SCORE_CHRONIC_LIVER_DISEASE_SOURCE = "00000000-0000-4000-8000-000000004212";
export const HEPATIC_RESECTION_OE_SOURCE = "00000000-0000-4000-8000-000000004213";
export const INTRAOPERATIVE_HEPATIC_ULTRASOUND_OE_SOURCE = "00000000-0000-4000-8000-000000004214";
export const LIVER_BIOPSY_OE_SOURCE = "00000000-0000-4000-8000-000000004215";
export const CIRRHOSIS_PORTAL_HYPERTENSION_OE_SOURCE = "00000000-0000-4000-8000-000000004216";
export const HIATT_HEPATIC_ARTERIES_1994_SOURCE = "00000000-0000-4000-8000-000000004217";
export const AASLD_PORTAL_HYPERTENSION_2024_SOURCE = "00000000-0000-4000-8000-000000004218";
export const AASLD_ASCITES_2021_SOURCE = "00000000-0000-4000-8000-000000004219";
export const BOWEL_BOARDS_PACKET_SOURCE = "00000000-0000-4000-8000-000000004500";
export const SCORE_CROHN_SOURCE = "00000000-0000-4000-8000-000000004501";
export const SCORE_ULCERATIVE_COLITIS_SOURCE = "00000000-0000-4000-8000-000000004502";
export const SCORE_TOTAL_SUBTOTAL_COLECTOMY_SOURCE = "00000000-0000-4000-8000-000000004503";
export const SCORE_ILEOSTOMY_SOURCE = "00000000-0000-4000-8000-000000004504";
export const SCORE_COLOSTOMY_SOURCE = "00000000-0000-4000-8000-000000004505";
export const SCORE_C_DIFFICILE_SOURCE = "00000000-0000-4000-8000-000000004506";
export const SCORE_ENTEROCUTANEOUS_FISTULA_SOURCE = "00000000-0000-4000-8000-000000004507";
export const SCORE_SMALL_INTESTINAL_RESECTION_SOURCE = "00000000-0000-4000-8000-000000004508";
export const SCORE_NUTRITIONAL_SUPPORT_SOURCE = "00000000-0000-4000-8000-000000004509";
export const FISER_SMALL_BOWEL_SOURCE = "00000000-0000-4000-8000-000000004510";
export const FISER_COLORECTAL_SOURCE = "00000000-0000-4000-8000-000000004511";
export const ASCRS_CROHN_2020_SOURCE = "00000000-0000-4000-8000-000000004512";
export const ECCO_CROHN_SURGERY_2024_SOURCE = "00000000-0000-4000-8000-000000004513";
export const ASCRS_ULCERATIVE_COLITIS_2026_SOURCE = "00000000-0000-4000-8000-000000004514";
export const ECCO_ULCERATIVE_COLITIS_SURGERY_2026_SOURCE = "00000000-0000-4000-8000-000000004515";
export const EHS_PARASTOMAL_HERNIA_2023_SOURCE = "00000000-0000-4000-8000-000000004517";
export const IDSA_SHEA_CDI_2017_SOURCE = "00000000-0000-4000-8000-000000004518";
export const IDSA_SHEA_CDI_2021_SOURCE = "00000000-0000-4000-8000-000000004519";
export const ESPEN_INTESTINAL_FAILURE_2023_SOURCE = "00000000-0000-4000-8000-000000004520";
export const DIAPHRAGMATIC_HERNIA_PACKET_SOURCE = "00000000-0000-4000-8000-000000004400";
export const HIATAL_HERNIA_PACKET_SOURCE = "00000000-0000-4000-8000-000000004401";
export const GERD_BARRETT_PACKET_SOURCE = "00000000-0000-4000-8000-000000004402";
export const ANTIREFLUX_PROCEDURES_PACKET_SOURCE = "00000000-0000-4000-8000-000000004403";
export const LYON_CONSENSUS_2_SOURCE = "00000000-0000-4000-8000-000000004404";
export const ACG_BARRETT_2022_SOURCE = "00000000-0000-4000-8000-000000004405";
export const ACG_GERD_2022_SOURCE = "00000000-0000-4000-8000-000000004406";
export const SAGES_GERD_2021_SOURCE = "00000000-0000-4000-8000-000000004407";
export const STYLOPOULOS_PEH_2002_SOURCE = "00000000-0000-4000-8000-000000004408";
export const CDH_EURO_2015_SOURCE = "00000000-0000-4000-8000-000000004409";
export const SCORE_BENIGN_BILIARY_OBSTRUCTION_SOURCE = "00000000-0000-4000-8000-000000003100";
export const SCORE_BILE_DUCT_INJURY_SOURCE = "00000000-0000-4000-8000-000000003101";
export const SCORE_BILE_DUCT_INJURY_REPAIR_SOURCE = "00000000-0000-4000-8000-000000003102";
export const SCORE_CHOLEDOCHOENTERIC_ANASTOMOSIS_SOURCE = "00000000-0000-4000-8000-000000003103";
export const SCORE_CHOLEDOCHAL_CYST_SOURCE = "00000000-0000-4000-8000-000000003104";
export const SCORE_CHOLEDOCHAL_CYST_PEDIATRIC_SOURCE = "00000000-0000-4000-8000-000000003105";
export const SCORE_PSC_SOURCE = "00000000-0000-4000-8000-000000003106";
export const FISER_BILIARY_SOURCE = "00000000-0000-4000-8000-000000003107";
export const FISER_CHOLEDOCHAL_CYST_SOURCE = "00000000-0000-4000-8000-000000003108";
export const TOKYO_2018_CHOLANGITIS_SOURCE = "00000000-0000-4000-8000-000000003109";
export const ASGE_CHOLEDOCHOLITHIASIS_SOURCE = "00000000-0000-4000-8000-000000003110";
export const AASLD_PSC_SOURCE = "00000000-0000-4000-8000-000000003111";
export const STRASBERG_CLASSIFICATION_SOURCE = "00000000-0000-4000-8000-000000003112";
export const BILE_DUCT_REPAIR_TIMING_SOURCE = "00000000-0000-4000-8000-000000003114";
// Anorectal batch: fissure, sphincterotomy, abscess and fistula disease, drainage, fistula repair,
// condyloma excision, and anal dysplasia with STDs, written from one seven-guide owner packet.
export const ANORECTAL_PACKET_SOURCE = "00000000-0000-4000-8000-000000004600";
export const SCORE_ANAL_FISSURE_SOURCE = "00000000-0000-4000-8000-000000004601";
export const SCORE_ANAL_SPHINCTEROTOMY_SOURCE = "00000000-0000-4000-8000-000000004602";
export const SCORE_ANORECTAL_ABSCESS_FISTULAE_SOURCE = "00000000-0000-4000-8000-000000004603";
export const SCORE_ANORECTAL_ABSCESS_DRAINAGE_SOURCE = "00000000-0000-4000-8000-000000004604";
export const SCORE_ANORECTAL_FISTULA_REPAIR_SOURCE = "00000000-0000-4000-8000-000000004605";
export const SCORE_PERIANAL_CONDYLOMAS_SOURCE = "00000000-0000-4000-8000-000000004606";
export const SCORE_ANAL_DYSPLASIA_STDS_SOURCE = "00000000-0000-4000-8000-000000004607";
export const FISER_BENIGN_ANORECTAL_SOURCE = "00000000-0000-4000-8000-000000004608";
export const ASCRS_ANAL_FISSURE_SOURCE = "00000000-0000-4000-8000-000000004609";
export const ASCRS_ABSCESS_FISTULA_SOURCE = "00000000-0000-4000-8000-000000004610";
export const CDC_STI_2021_SOURCE = "00000000-0000-4000-8000-000000004611";
export const NIH_HIV_HPV_SOURCE = "00000000-0000-4000-8000-000000004612";
export const NYSDOH_ANAL_DYSPLASIA_SOURCE = "00000000-0000-4000-8000-000000004613";
export const ANCHOR_TRIAL_SOURCE = "00000000-0000-4000-8000-000000004614";
export const CDC_HPV_VACCINE_SOURCE = "00000000-0000-4000-8000-000000004615";

// Upper GI study-guide batch (source IDs 4700–4718; existing pancreas source reused).
export const SCORE_PEPTIC_ULCER_SOURCE = "00000000-0000-4000-8000-000000004700";
export const FISER_STOMACH_SOURCE = "00000000-0000-4000-8000-000000004701";
export const SCORE_GASTRODUODENAL_PERFORATION_SOURCE = "00000000-0000-4000-8000-000000004702";
export const SCORE_VAGOTOMY_SOURCE = "00000000-0000-4000-8000-000000004703";
export const SCORE_UPPER_GI_BLEEDING_SOURCE = "00000000-0000-4000-8000-000000004704";
export const SCORE_STRESS_GASTRITIS_SOURCE = "00000000-0000-4000-8000-000000004705";
export const SCORE_EGD_SOURCE = "00000000-0000-4000-8000-000000004706";
export const ACG_H_PYLORI_2024_SOURCE = "00000000-0000-4000-8000-000000004707";
export const ESGE_ULCER_BLEEDING_2026_SOURCE = "00000000-0000-4000-8000-000000004708";
export const WSES_PEPTIC_ULCER_2020_SOURCE = "00000000-0000-4000-8000-000000004709";
export const SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE = "00000000-0000-4000-8000-000000004710";
export const ACG_UGIB_2021_SOURCE = "00000000-0000-4000-8000-000000004711";
export const ACG_CAG_ANTITHROMBOTICS_2022_SOURCE = "00000000-0000-4000-8000-000000004712";
export const MULTISOCIETY_GLP1_2024_SOURCE = "00000000-0000-4000-8000-000000004713";
export const FISER_ESOPHAGUS_SOURCE = "00000000-0000-4000-8000-000000004715";
export const FISER_GI_HORMONES_SOURCE = "00000000-0000-4000-8000-000000004716";
export const BAVENO_VARICEAL_CONSENSUS_SOURCE = "00000000-0000-4000-8000-000000004717";
export const NASOGASTRIC_ASPIRATE_2004_SOURCE = "00000000-0000-4000-8000-000000004718";

// High-Frequency Call Problems I, Run 2 (October 2026): one hundreds block per topic, sources from the block start
// and new topics at +20/+21. Acute Pancreatitis 05600, Colonic Volvulus and Obstruction 05700, Lower GI Bleeding
// 05800, and 05900 for the in-place revision of Choledocholithiasis (which keeps its original ids 00101/00103).
// Reused: Fiser chapters 33 (02303), 36 (04511) and 32 (03107), SCORE Benign Biliary Obstruction (03100), TG18
// cholangitis (03109), ASGE 2019 (03110) and the original choledocholithiasis packet (00102).
export const SCORE_ACUTE_PANCREATITIS_SOURCE = "00000000-0000-4000-8000-000000005600";
export const ACUTE_PANCREATITIS_OE_SOURCE = "00000000-0000-4000-8000-000000005601";
export const SCORE_COLONIC_VOLVULUS_SOURCE = "00000000-0000-4000-8000-000000005700";
export const COLONIC_VOLVULUS_OE_SOURCE = "00000000-0000-4000-8000-000000005701";
export const SCORE_LOWER_GI_BLEEDING_SOURCE = "00000000-0000-4000-8000-000000005800";
export const LOWER_GI_BLEEDING_OE_SOURCE = "00000000-0000-4000-8000-000000005801";
export const SCORE_CBD_EXPLORATION_SOURCE = "00000000-0000-4000-8000-000000005900";
export const CHOLEDOCHOLITHIASIS_CHOLANGITIS_OE_SOURCE = "00000000-0000-4000-8000-000000005901";

// Aortic aneurysm cluster (October 2026): one hundreds block per topic, sources from the block start and the topic
// at +20/+21. Aortic Aneurysms 04800, Acute Aortic Dissection 04900, Arterial Peripheral Aneurysms 05000,
// Peripheral Aneurysms Repair 05100. The repair topic reuses 05000 and 05002, and both aortic topics reuse 04803.
// The existing SCORE repair module (00600), Fiser chapter 27 (00601) and USPSTF (00602) entries are reused.
export const SCORE_AAA_DISEASE_SOURCE = "00000000-0000-4000-8000-000000004800";
export const AORTIC_ANEURYSMS_OE_SOURCE = "00000000-0000-4000-8000-000000004801";
export const SVS_AAA_2018_SOURCE = "00000000-0000-4000-8000-000000004802";
export const ACC_AHA_AORTIC_2022_SOURCE = "00000000-0000-4000-8000-000000004803";
export const SCORE_AORTIC_DISSECTION_SOURCE = "00000000-0000-4000-8000-000000004900";
export const AORTIC_DISSECTION_OE_SOURCE = "00000000-0000-4000-8000-000000004901";
export const SCORE_PERIPHERAL_ARTERIAL_ANEURYSMS_SOURCE = "00000000-0000-4000-8000-000000005000";
export const PERIPHERAL_ARTERIAL_ANEURYSMS_OE_SOURCE = "00000000-0000-4000-8000-000000005001";
export const SVS_POPLITEAL_ANEURYSM_2022_SOURCE = "00000000-0000-4000-8000-000000005002";
export const SCORE_PERIPHERAL_ANEURYSMS_REPAIR_SOURCE = "00000000-0000-4000-8000-000000005100";
export const PERIPHERAL_ANEURYSMS_REPAIR_OE_SOURCE = "00000000-0000-4000-8000-000000005101";
// The cluster's two playbooks take the next single ids in the 03000 playbook block.
export const OPEN_PAA_REPAIR_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003032";
export const SAPHENOUS_VEIN_HARVEST_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003033";

export const suppliedSources: SuppliedSource[] = [
  {
    id: SCORE_SVC_SOURCE,
    title: "SCORE: Superior Vena Cava Syndrome",
    kind: "website",
    citation: "Randhawa S, Erkmen CP. Superior Vena Cava Syndrome. SCORE, December 5, 2023; local module retrieved August 12, 2026.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=166342",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Licensed module read locally; no question stems reproduced. Histology, corticosteroid and fibrosing-mediastinitis claims were not copied uncritically.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: SVC_PACKET_SOURCE,
    title: "SVC syndrome study brief and evidence audit",
    kind: "user_notes",
    citation: "Owner-requested Gemini SCORE-notebook brief and OpenEvidence Sackett audit, October 10, 2026.",
    url: "https://www.openevidence.com/ask/861ca9b8-5023-4efd-a85d-2ede18514164",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. The audit overstates chemosensitive malignancy as an absolute contraindication to stenting; CIRSE calls it relative. Avoided unsupported percentages and automatic device extraction or anticoagulation for nonthrombotic obstruction.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: CIRSE_SVC_SOURCE,
    title: "CIRSE quality assurance guideline: SVC stenting",
    kind: "article",
    citation: "Uberoi R. CIRSE Quality Assurance Guidelines for Superior Vena Cava Stenting in Malignant Disease, revised 2016.",
    url: "https://eu-csite-storage-prod.s3.amazonaws.com/www-cirse-org/files/files/CIRSE_QA_Guidelines_for_SVC_Stenting_in_Malignant_Disease_Revision_Uberoi_2016.pdf",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Primary guideline opened directly: emergency indications, symptomatic intervention, relative contraindications and rapid relief. Not a claim that every SVC obstruction requires urgent stenting.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: SCORE_TOS_SOURCE,
    title: "SCORE: Thoracic Outlet Syndrome",
    kind: "website",
    citation: "Clemens MS, Propper BW, Freischlag JA. Thoracic Outlet Syndrome. SCORE, March 22, 2023; local module retrieved August 12, 2026.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=165804",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Local module supplies three-subtype anatomy, presentation, evaluation, PT and operative risks.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: TOS_PACKET_SOURCE,
    title: "Thoracic outlet syndrome brief and focused evidence audit",
    kind: "user_notes",
    citation: "Owner-requested Gemini SCORE-notebook brief; focused OpenEvidence Sackett venous-batch audit, October 10, 2026.",
    url: "https://www.openevidence.com/ask/b08fd69e-0f64-4796-9c8e-493d1506dfb5",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Shared audit verifies current guidance without rewriting correct background. Saved earlier Gemini brief was reused. Acute primary UEDVT and neurogenic/arterial TOS remain distinct pathways.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: ESVS_VTE_2021_SOURCE,
    title: "ESVS 2021 venous thrombosis guideline",
    kind: "article",
    citation: "Kakkos SK, et al. ESVS 2021 Clinical Practice Guidelines on the Management of Venous Thrombosis. Eur J Vasc Endovasc Surg. 2021;61:9–82. doi:10.1016/j.ejvs.2020.09.023.",
    url: "https://angiolsurgery.org/society/organisations/esvs/guidelines/ESVS-Guidelines-Venous-Thrombosis-2021.pdf",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Primary recommendations 53–56: three-month anticoagulation, selective early thrombus removal, and first rib resection for clear venous TOS. Timing lacks randomized evidence; compare the newer AVF recommendation rather than flattening them.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: AVF_UEDVT_2026_SOURCE,
    title: "AVF 2026 upper extremity DVT guideline",
    kind: "article",
    citation: "Malgor RD, Etkin Y, Mouawad NJ, et al. The American Venous Forum clinical practice guideline on the care of patients with upper extremity deep venous thrombosis. J Vasc Surg Venous Lymphat Disord. 2026;14(4):102461. doi:10.1016/j.jvsv.2026.102461.",
    url: "https://pubmed.ncbi.nlm.nih.gov/41780672/",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Publication verified directly at PubMed; guideline 6.4 wording on first rib resection was supplied by the OpenEvidence audit. Full text retrieval was blocked; exact recommendation strength is not asserted in the reader-facing content.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: SCORE_VTE_PROPHYLAXIS_SOURCE,
    title: "SCORE: Prophylaxis of Venous Thromboembolism",
    kind: "website",
    citation: "Hatchimonji J, Martin N. Prophylaxis of Venous Thromboembolism. SCORE, August 21, 2024; local module retrieved August 12, 2026.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=155978",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Placed under the module’s actual SCORE category: Preoperative Evaluation and Perioperative Care. The module’s blanket 28-day discharge statement is narrowed to supported populations.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: VTE_PROPHYLAXIS_PACKET_SOURCE,
    title: "VTE prophylaxis study brief and focused evidence audit",
    kind: "user_notes",
    citation: "Owner-requested Gemini SCORE-notebook brief; OpenEvidence Sackett shared venous-batch audit, October 10, 2026.",
    url: "https://www.openevidence.com/ask/b08fd69e-0f64-4796-9c8e-493d1506dfb5",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Preserves general-surgery context. Orthopedic aspirin evidence is not generalized. Neuraxial timing is agent-, dose-, renal- and catheter-dependent; no universal 12-hour rule.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: CHEST_SURGICAL_PROPHYLAXIS_2012_SOURCE,
    title: "CHEST: VTE prevention in nonorthopedic surgical patients",
    kind: "article",
    citation: "Gould MK, et al. Prevention of VTE in Nonorthopedic Surgical Patients. CHEST. 2012;141(2 Suppl):e227S–e277S. doi:10.1378/chest.11-2297.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3278061/",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Primary sections 3.6.1–3.6.9 read directly. Corrected Caprini 0 versus 1–2 and four weeks from surgery, not an extra 28 days after discharge, in the related DVT topic.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: ASH_SURGICAL_PROPHYLAXIS_2019_SOURCE,
    title: "ASH 2019 surgical VTE prevention guideline",
    kind: "article",
    citation: "Anderson DR, et al. ASH 2019 guidelines for management of VTE: prevention in surgical hospitalized patients. Blood Adv. 2019;3:3898–3944. doi:10.1182/bloodadvances.2019000975.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6963238/",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Major general surgery favors LMWH or UFH; bleeding risk and procedure-specific exceptions matter. Extended prophylaxis recommendations are conditional; not a universal mandate for every high Caprini score.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: IVC_FILTER_PLAYBOOK_SOURCE,
    title: "IVC filter operative brief from the Rezzy notebook",
    kind: "user_notes",
    citation: "Owner-requested Gemini Rezzy-notebook operative brief, IVC Filter Operative Playbook, October 10, 2026.",
    url: "https://gemini.google.com/app/c6f0d1c0545bcd30",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Notebook excerpts attributed to Operative Dictations in General and Vascular Surgery and vascular review sources. Corrected fixed wire sizes/caval limits, automatic recapture, universal lifelong thrombophilia anticoagulation and 25–54-day claim. Advanced retrieval is referral-level, not a blind-force maneuver.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: FIRST_RIB_PLAYBOOK_SOURCE,
    title: "First rib resection operative brief from the Rezzy notebook",
    kind: "user_notes",
    citation: "Gemini Rezzy notebook, Pocket Chief Operative Briefs, October 10, 2026; first-rib section.",
    url: "https://gemini.google.com/app/384a26250ce23658",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Notebook attributes exposure to Operative Dictations in General and Vascular Surgery (2017), chapters 271–272, with anatomic material from Fiser and BTK. Actual book chapter was not independently opened. Procedural narrative paraphrased; current selection separately cited. No mandatory same-admission timing or trapdoor sternotomy rule. A subsequent OpenEvidence operative audit in the shared audit conversation checked anatomy, approach selection and the need for a defined postoperative imaging plan.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: OPEN_VENOUS_PLAYBOOK_SOURCE,
    title: "Open venous thrombectomy research brief and source-gap audit",
    kind: "user_notes",
    citation: "Gemini Rezzy notebook, Pocket Chief Operative Briefs, October 10, 2026; open-thrombectomy section.",
    url: "https://gemini.google.com/app/384a26250ce23658",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Gemini explicitly lacked a dedicated open venous chapter and mixed arterial embolectomy with venous exposure. That synthesis is not used as the authority for venous catheter passage. Added an actual primary venous surgical series for the core technique; no routine distal balloon passage across valves, prophylactic filter or obligatory AV fistula. A subsequent OpenEvidence operative audit in the shared audit conversation checked these distinctions and completion imaging.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: ENDOVENOUS_ABLATION_PLAYBOOK_SOURCE,
    title: "Endovenous ablation operative brief from the Rezzy notebook",
    kind: "user_notes",
    citation: "Gemini Rezzy notebook, Pocket Chief Operative Briefs, October 10, 2026; thermal-ablation section.",
    url: "https://gemini.google.com/app/384a26250ce23658",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Notebook attributes technique to Operative Dictations (chapter 247), Skandalakis Surgical Anatomy and Technique (2021), and Zollinger’s Atlas. Book excerpts were retrieved through notebook synthesis. Fixed laser settings and mandatory routine surveillance replaced by device-specific instructions and primary society guidance.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: OPEN_VENOUS_THROMBECTOMY_STUDY_SOURCE,
    title: "Primary surgical iliofemoral venous thrombectomy series",
    kind: "article",
    citation: "Surgical thrombectomy for iliofemoral deep vein thrombosis: Patient outcomes at 8.5 years. PLoS One. 2020. PMCID: PMC7302664.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7302664/",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Methods read directly: common femoral venotomy, proximal fluoroscopic thrombectomy, distal manual compression, completion phlebography and selective outflow treatment. Single-center series, not proof of superiority over anticoagulation or a universal protocol. Its fixed PEEP, routine AV fistula and six-month regimen are not generalized.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: SIR_IVC_FILTER_2020_SOURCE,
    title: "SIR 2020 multisociety IVC filter guideline",
    kind: "article",
    citation: "Kaufman JA, et al. Society of Interventional Radiology Clinical Practice Guideline for Inferior Vena Cava Filters in the Treatment of Patients with Venous Thromboembolic Disease. JVIR. 2020;31:1529–1544.",
    url: "https://www.moffitt.org/contentassets/5f017dd2859540f0a96a78dbc407cdca/ivc-filter-placement-consensus-guidlines-sir-2020.pdf",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Primary guideline read directly: recurrent VTE on anticoagulation generally does not warrant a filter, with limited exceptions after addressing failure; structured follow-up and removal when protection is no longer needed. Newer 2026 PE guidance is retained as a distinct selected recurrent-PE consideration.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: ESVS_CVD_2022_SOURCE,
    title: "ESVS 2022 chronic venous disease guideline",
    kind: "article",
    citation: "De Maeseneer MG, et al. ESVS 2022 Clinical Practice Guidelines on the Management of Chronic Venous Disease of the Lower Limbs. Eur J Vasc Endovasc Surg. 2022;63:184–267. doi:10.1016/j.ejvs.2021.12.024.",
    url: "https://doi.org/10.1016/j.ejvs.2021.12.024",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Primary guideline indexed recommendations and society listing verified; full PDF requires login. The shared evidence audit supplies the collateral/outflow distinction. Deep reflux and obstruction are different; neither mandates a blanket superficial-first strategy.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: IVC_FILTER_DECISION_ANALYSIS_SOURCE,
    title: "IVC filter retrieval decision analysis",
    kind: "article",
    citation: "Morales JP, Li X, Irony TZ, et al. Decision analysis of retrievable inferior vena cava filters in patients without pulmonary embolism. J Vasc Surg Venous Lymphat Disord. 2013;1:376–384. doi:10.1016/j.jvsv.2013.04.005.",
    url: "https://doi.org/10.1016/j.jvsv.2013.04.005",
    details: "Added during the October 10, 2026 venous-batch review; paraphrased educational draft pending Zach approval. Primary model read directly. The 29–54-day estimate assumes transient PE risk has passed and is not a universal retrieval deadline or an endorsement of prophylactic filters.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: CHOLEDOCHOLITHIASIS_SOURCE,
    title: "User-supplied choledocholithiasis study packet",
    kind: "user_notes",
    citation: "Personal study notes supplied to Pocket Chief, August 12, 2026.",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    details: "A synthesis the owner identified as referencing SCORE, Fiser, and Sabiston. No edition or page details were supplied.",
  },
  {
    id: BREAST_FIBROEPITHELIAL_SOURCE,
    title: "User-supplied fibroadenoma and phyllodes study packet",
    kind: "user_notes",
    citation: "Personal study notes supplied to Pocket Chief, August 13, 2026.",
    suppliedAt: "2026-08-13T00:00:00.000Z",
    details: "A synthesis the owner identified as referencing the SCORE curriculum, Fiser ABSITE Review (8th edition), and Sabiston Textbook of Surgery. No page details were supplied.",
  },
  {
    id: GENERAL_ABDOMEN_SOURCE,
    title: "User-supplied general abdomen study packet",
    kind: "user_notes",
    citation: "Personal study notes supplied to Pocket Chief, August 13, 2026.",
    suppliedAt: "2026-08-13T00:00:00.000Z",
    details: "A six-topic SCORE General Abdomen synthesis the owner identified as referencing the SCORE curriculum, Fiser ABSITE Review (8th edition), and Sabiston Textbook of Surgery. No page details were supplied. Retroperitoneal hematoma zones, abdominal compartment syndrome, Berchtold typing, and the current-practice notes on desmoid therapy were added during review and are pending the owner's sign-off.",
  },
  {
    id: HERNIA_SOURCE,
    title: "User-supplied hernia and abdominal wall study packet",
    kind: "user_notes",
    citation: "Personal study notes supplied to Pocket Chief, August 14, 2026.",
    suppliedAt: "2026-08-14T00:00:00.000Z",
    details: [
      "A model-generated SCORE board review of hernias and abdominal wall defects supplied by the owner. No editions, chapters, or page details were supplied, and no primary sources were named in the packet.",
      "Corrected during review, against the packet as supplied: the cremasteric reflex was credited to the ilioinguinal nerve and belongs to the genital branch of the genitofemoral; the triangle of pain borders were transposed and contradicted the triangle of doom entry; the tack rule was written as \"never lateral to the vas deferens\", which forbids legitimate Cooper's ligament fixation; the conjoint tendon was called the whole inguinal floor; diastasis recti was described as thinning rather than widening of the linea alba; the 4:1 suture ratio was attributed to STITCH rather than to Israelsson; \"absorbable\" suture was specified where slowly absorbable monofilament is meant; mesh explantation was stated as mandatory in one section and correctly described as often avoidable in another; Howship-Romberg omitted internal rotation; the packet's incisional hernia rate of 30 percent and its claim that mesh reduces umbilical recurrence by 60 percent were both restated against reported trial figures.",
      "Added beyond the packet during review and pending the owner's sign-off: femoral hernia in full, including the femoral canal boundaries and De Garengeot hernia; the four walls of the inguinal canal; the contents of the canal in women and the canal of Nuck; the spermatic cord contents; the iliohypogastric nerve; the iliopubic tract; the myopectineal orifice of Fruchaud; the Nyhus and EHS classifications; the Littre, Amyand, Pantaloon, and Maydl hernias; reduction en masse; watchful waiting and its crossover rate; the laparoscopic versus open comparison; the recurrent hernia approach rule; ischemic orchitis; chronic postoperative inguinal pain; mesh material taxonomy; component separation advancement figures; the Rives-Stoppa eponym; loss of domain with botulinum toxin and progressive pneumoperitoneum; Ventral Hernia Working Group grading; MELD and Child-Pugh class in cirrhosis; and parastomal hernia incidence with prophylactic mesh.",
    ].join(" "),
  },
  {
    id: SCORE_ARTERIAL_SOURCE,
    title: "SCORE module: Abdominal and Aortoiliac Aneurysm Repair",
    kind: "website",
    citation: "Germano E, Rossi MJ. Abdominal and Aortoiliac Aneurysm Repair. SCORE Curriculum, Arterial Disease module, Surgical Council on Resident Education, December 4, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=1000548",
    suppliedAt: "2026-08-14T00:00:00.000Z",
    details: [
      "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/`. Structural facts, indications, anatomic criteria, operative sequences, endoleak taxonomy, complications, and follow-up intervals come from this module.",
      "The companion SCORE module Abdominal Aortic Aneurysms (Olmstead A, Rossi MJ, id=149875) supplied the surveillance intervals, rupture risk by diameter, and the Society for Vascular Surgery screening recommendation.",
      "Added during review and pending the owner's sign-off: the note that the type IIIc endoleak is device-specific and now largely historical, since the implicated endograft was withdrawn from the market.",
    ].join(" "),
  },
  {
    id: FISER_VASCULAR_SOURCE,
    title: "Fiser ABSITE Review, 8th edition — Vascular",
    kind: "book",
    citation: "Fiser SM. The ABSITE Review. 8th ed. Chapter 27, Vascular, pages 331-360.",
    suppliedAt: "2026-08-14T00:00:00.000Z",
    details: [
      "Page-level markdown of the chapter, held in `Pocket Chief Resources/absite-8e/ch27_vascular.md`. Supplies the classic keyed numbers: myocardial infarction as the leading early cause of death and renal failure as the leading late cause, graft infection organisms and rates, the inferior mesenteric artery stump pressure threshold, rupture location, supraceliac control through the gastrohepatic ligament, chylous ascites, and the inflammatory and mycotic aneurysm profiles.",
      "Corrected during review, against the chapter as scanned: its surveillance table gives yearly imaging for 3.0 to 3.9 cm, six-month imaging for 4.0 to 4.5 cm, and a three-year interval for aneurysms over 5.0 cm. The last is not survivable advice and reads as a transposition of the three-year interval that belongs to the 3.0 to 3.9 cm band. The topic follows the Society for Vascular Surgery intervals and carries a block explaining the discrepancy.",
      "Several sentences in the scanned chapter are garbled by optical character recognition, including the passages on aortoiliac impotence and straight tube grafts. They were reconstructed from the surrounding sense rather than quoted.",
      "The dialysis access section (page 357) also supplies the hemodialysis catheter topic's board answers: nontunneled internal jugular and subclavian catheters for 3 weeks and femoral for 5 days, a tunneled catheter for 1 year, the right internal jugular as the usual best site, never the side of a planned fistula or graft, the Rule of 6s, a 6-week wait for a graft, and stenting for central venous stenosis. Each that current practice has moved is a board-versus-current row there.",
      "The venous sections supply the deep venous thrombosis topic's board answers: Paget-Schroetter effort thrombosis treated with catheter-directed thrombolysis then first rib resection at the same admission (page 352); and DVT most common in the calf, the left leg involved twice as often as the right, swelling by level, heparin then warfarin as treatment, phlegmasia cerulea dolens treated with catheter-directed thrombolysis or emergent thrombectomy, and an unneeded central line pulled before heparin (pages 358-359).",
      "The cerebrovascular section (pages 334-335) supplies the two carotid topics' board answers: the duplex velocity criteria, internal versus external carotid waveforms and first branches, embolism from the internal carotid as the usual cause of a cerebral event, territory symptoms, the repair thresholds, emergent endarterectomy for crescendo TIA or stroke in evolution, 10 to 14 days after an ischemic and 6 to 8 weeks after a hemorrhagic stroke, the tightest or dominant side first, shunting for a back pressure under 50 mm Hg or a tight contralateral side, no repair of an occluded internal carotid, the cranial nerve deficits with vagus as the most common, post-endarterectomy hypertension in 20% treated with nitroprusside, myocardial infarction as the leading non-stroke cause of death, 15% restenosis, stenting for high-risk patients, and TCAR's flow reversal. The top of page 335 is cut off in the scan, mid-way through the clamping order; that line was not quoted.",
      "The aortic dissection section (pages 338-339), the AAA section (pages 340-341) and the visceral and peripheral aneurysm section (page 355) supply the October 2026 aortic cluster's board answers: Stanford and DeBakey classes, tearing pain, unequal arm pressures, 95% severe hypertension, a usually normal chest film, chest CT as the test, the medial plane, 70% aortic insufficiency, esmolol with nitroprusside, operating on every ascending dissection and on descending dissections only for ischemia or contained rupture, lifetime MRI with 30% later aneurysm; permissive hypotension at a systolic of 80 to 100; rupture above the inguinal ligament against embolism below it; femoral repair over 3.5 cm; popliteal repair for symptoms, over 2 cm or infection by vein exclusion bypass, half bilateral, half with another aneurysm, 25% amputation-level complications untreated, and no covered stent unless open surgery is impossible; and ultrasound-guided compression with thrombin injection for pseudoaneurysm. The acute arterial thrombosis rule on page 350 (a threatened limb goes to the operating room for thrombectomy after heparin, a non-threatened limb to angiography for thrombolysis) is the one the repair packet applies to the thrombosed popliteal aneurysm.",
    ].join(" "),
  },
  {
    id: USPSTF_AAA_SOURCE,
    title: "USPSTF recommendation: screening for abdominal aortic aneurysm",
    kind: "article",
    citation: "US Preventive Services Task Force. Screening for Abdominal Aortic Aneurysm: US Preventive Services Task Force Recommendation Statement. JAMA. 2019;322(22):2211-2218. https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/abdominal-aortic-aneurysm-screening",
    suppliedAt: "2026-08-14T00:00:00.000Z",
    details: "Added beyond the two study sources during review and pending the owner's sign-off. Neither the SCORE module nor Fiser carries the Task Force grades, and they diverge from the Society for Vascular Surgery recommendation specifically for women, which is the part most likely to be tested. Verified against the Task Force's published recommendation on August 14, 2026.",
  },
  {
    id: ACUTE_LIVER_FAILURE_SOURCE,
    title: "User-supplied acute liver failure study packet",
    kind: "user_notes",
    citation: "Personal study notes supplied to Pocket Chief, August 16, 2026.",
    suppliedAt: "2026-08-16T00:00:00.000Z",
    details: "A comprehensive study guide on Acute Liver Failure (ALF) covering pathophysiology, acute vs chronic differentiation, etiologies and subtype timing, core diagnostic triad, etiology-directed workup panel, AFLP vs HELLP histology, West Haven encephalopathy staging, King's College transplant criteria, neurocritical care and ICP protocol, and outcomes/prognostic factors.",
  },
  {
    id: CARDIAC_PACING_SOURCE,
    title: "User-supplied cardiac pacing study packet & SCORE module",
    kind: "user_notes",
    citation: "Personal study notes supplied to Pocket Chief, August 16, 2026; and Kennedy R. Cardiac Pacing. SCORE Curriculum, Surgical Critical Care module, Surgical Council on Resident Education, April 15, 2024. https://www.surgicalcore.org/modulecontent.aspx?id=1000533",
    suppliedAt: "2026-08-16T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=1000533",
    details: "A comprehensive study guide and SCORE module on Temporary Cardiac Pacing covering indications and relative/absolute contraindications, transcutaneous pad placement vectors, transvenous RIJ/subclavian/femoral access and lead positioning, epicardial wire placement, preoperative preparation and electrolyte optimization, NASPE/NBG pacing nomenclature and common modes (VVI, AAI, DDD, VOO/DOO), pacer malfunction troubleshooting (undersensing, oversensing, failure to capture, failure to fire), and critical complication management (tamponade, perforation, R-on-T lethal arrhythmias).",
  },
  {
    id: PARAESOPHAGEAL_HERNIA_SOURCE,
    title: "User-supplied paraesophageal hernia study packet & SCORE module",
    kind: "user_notes",
    citation: "Personal study notes supplied to Pocket Chief, August 16, 2026; and Zarour L, Hunter JG. Paraesophageal Hernia Repair. SCORE Curriculum, Esophagus module, Surgical Council on Resident Education, November 2, 2023. https://www.surgicalcore.org/modulecontent.aspx?id=1000574",
    suppliedAt: "2026-08-16T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=1000574",
    details: "A comprehensive study guide and SCORE module on Paraesophageal Hernia (PEH) Repair covering hiatal hernia classification (Types I–IV), elective and emergent surgical indications, Borchardt triad, emergent diagnostic workup pathway, elective preoperative diagnostic evaluation, LES physiology and reflux barrier dynamics, key operative anatomy and vagal nerve relationships, step-by-step laparoscopic and open operative technique, indications for gastrostomy/gastropexy, acute and chronic postoperative complications, SAGES guidelines, and revisional surgery metrics.",
  },
  {
    id: RENAL_ARTERY_DISEASE_SOURCE,
    title: "User-supplied renal artery disease study packet & SCORE module",
    kind: "user_notes",
    citation: "Personal study notes supplied to Pocket Chief, August 16, 2026; and Costanza MJ. Renal Artery Disease. SCORE Curriculum, Arterial Disease module, Surgical Council on Resident Education, August 13, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=165638",
    suppliedAt: "2026-08-16T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=165638",
    details: "A comprehensive study guide and SCORE module on Renal Artery Disease & Renovascular Hypertension covering atherosclerotic RAS vs fibromuscular dysplasia (FMD) differentiation, RAAS axis pathophysiology and biochemical cascade, unilateral vs bilateral/solitary hemodynamics and volume status, high-risk screening criteria, noninvasive and invasive diagnostic modalities (duplex ultrasound, CTA, MRA, DSA), medical, endovascular (angioplasty with stenting vs PTA alone), and open surgical revascularization strategies (aortorenal, thromboendarterectomy, hepatorenal, splenorenal bypass), non-viable kidney thresholds and nephrectomy indications, clinical outcomes and complication metrics, postoperative duplex surveillance protocols, and high-yield ABSITE/SCORE board review essentials.",
  },
  {
    id: SCORE_MALROTATION_SOURCE,
    title: "SCORE module: Malrotation",
    kind: "website",
    citation: "Malrotation. SCORE Curriculum, Pediatric module, Surgical Council on Resident Education, October 14, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=139197",
    suppliedAt: "2026-08-17T00:00:00.000Z",
    details: "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/`. Supplies the embryology of normal rotation and fixation, the epidemiology and associated anomalies, the presentation, the split diagnostic pathway for the stable and the critically ill infant, and the outcome figures.",
  },
  {
    id: SCORE_MALROTATION_OPERATION_SOURCE,
    title: "SCORE module: Malrotation Operation",
    kind: "website",
    citation: "Kang HS, Sulkowski J. Malrotation Operation. SCORE Curriculum, Pediatric module, Surgical Council on Resident Education, October 22, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=151137",
    suppliedAt: "2026-08-17T00:00:00.000Z",
    details: "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/`. Supplies the distinction between a rotational anomaly and volvulus, the counselling position on an incidentally discovered anomaly, the operative objectives and the steps of the Ladd procedure, the intraoperative viability and second-look decision, and the complication and mortality figures.",
  },
  {
    id: FISER_PEDIATRIC_SOURCE,
    title: "Fiser ABSITE Review, 8th edition — Pediatric Surgery",
    kind: "book",
    citation: "Fiser SM. The ABSITE Review. 8th ed. Chapter 43, Pediatric Surgery, page 662.",
    suppliedAt: "2026-08-17T00:00:00.000Z",
    details: [
      "Page-level markdown of the chapter, held in `Pocket Chief Resources/absite-8e/ch43_pediatric-surgery.md`. Supplies the keyed board answers: malrotation as the leading cause of duodenal obstruction beyond the first week of life, Ladd bands arising from the right retroperitoneum, and the reflex that bilious vomiting in a child demands an emergent study.",
      "Two disagreements with the SCORE modules are carried in the topics rather than silently resolved. Fiser gives age at presentation as 75 percent in the first month and 90 percent by one year, where SCORE gives roughly 30 percent by one month, 60 percent by one year, and 75 percent by five years; the topic prints the SCORE figures and explains the split. Fiser also writes the cecum being placed in the left lower quadrant as a cecopexy, which the contemporary literature does not support as a routine step; the operation topic keeps the keyed answer and explains why routine fixation is now avoided.",
      "The chapter is optical character recognition of scanned pages and several lines are garbled, including the malrotation treatment line, where `cecopexy` and `vomiting` are both misrendered. Sentences were reconstructed from sense rather than quoted.",
    ].join(" "),
  },
  {
    id: MALROTATION_PACKET_SOURCE,
    title: "Owner-supplied malrotation and Ladd procedure packets",
    kind: "user_notes",
    citation: "Two personal study documents supplied to Pocket Chief, August 17, 2026: a malrotation and midgut volvulus summary, and a Ladd procedure operative playbook carrying 22 primary references.",
    suppliedAt: "2026-08-17T00:00:00.000Z",
    details: [
      "The operative playbook cites its literature in full, and the contemporary figures in these topics are drawn from it rather than from the SCORE modules: the ultrasound accuracy data (Nguyen et al., AJR 2022 and 2025; McCurdie et al., Pediatric Radiology 2024), the laparoscopic versus open comparisons (Isani et al., J Surg Res 2018; Zhang et al., JLAST 2022; Johnston et al., J Pediatr Surg 2024), the appendectomy survey (Al Smady et al., Pediatr Surg Int 2023), the recurrence risk factors (Duy et al., J Pediatr Surg 2025), the bowel-viability and second-look guidance (Bala et al., WSES, World J Emerg Surg 2022), and the heterotaxy outcomes (Huerta et al., J Pediatr Surg 2023; Landisch et al. and Salavitabar et al., J Pediatr Surg 2015). The papers themselves were not retrieved; the playbook is the proximate source.",
      "Corrected during review, against the packets as supplied: the malrotation summary carried markdown links to an external rare-disease site on gastroschisis, omphalocele, congenital diaphragmatic hernia, and prune belly syndrome, which were stripped as artifacts of whatever tool produced it; its adhesive obstruction figure of 4 to 10 percent conflated the SCORE overall rate of 4 to 5 percent with the open-repair arm of a comparative series and is now reported as two separate figures with their sources; a stray sentence attaching a historical 28 percent mortality of acute midgut volvulus to the adhesive obstruction bullet was moved to the outcome discussion where it belongs; and its statement that added cecopexy may reduce recurrence contradicted the operative playbook's instruction not to fix the bowel routinely, which is now written as the genuine split it is rather than as two confident opposite claims.",
      "Added beyond both packets during review and pending the owner's sign-off: reverse rotation as a fourth rotational variant, since the packet's classification listed only three and stopped short of the one that obstructs the colon; the explicit note that a Ladd procedure deliberately leaves the bowel in nonrotation, which is the same anatomy as the lowest-risk congenital variant; and the observation that the operative playbook and Fiser disagree on whether the cecum ends in the left upper or left lower quadrant, where the testable fact is simply that the colon goes left.",
    ].join(" "),
  },
  {
    id: TRAUMA_FAST_PACKET_SOURCE,
    title: "Owner-supplied FAST and E-FAST study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 18, 2026: \"FAST / E-FAST — Pocket Chief\", carrying 15 numbered primary references.",
    suppliedAt: "2026-08-18T00:00:00.000Z",
    details: [
      "The packet cites its literature in full and the numeric performance figures in this topic are drawn from it rather than reconstructed: the Cochrane reviews of chest ultrasonography for pneumothorax (Chan et al., 2020, CD013031) and of ultrasound-based algorithms in blunt abdominal trauma (Stengel et al., 2015, CD004446), the WSES-AAST thoracic trauma guidelines (Coccolini et al., World J Emerg Surg 2025), the prehospital FAST individual-participant meta-analysis (Gamberini et al., Injury 2023), the lung ultrasound meta-analysis (Sheng et al., Respiration 2025), the ACR Appropriateness Criteria for major blunt trauma (Shyu et al., JACR 2020), the post-thoracotomy FAST performance series (Ghafil et al., World J Surg 2022), and King's review of initial care of the severely injured patient (NEJM 2019). The papers themselves were not retrieved; the packet is the proximate source.",
      "Corrected during review, against the packet as supplied: inline numeric citation chips of the form [1] through [15] were stripped from every block, since the app has no route for them and they render as dead text.",
    ].join(" "),
  },
  {
    id: TRAUMA_SPLENIC_PACKET_SOURCE,
    title: "Owner-supplied splenic trauma, splenectomy, and splenorrhaphy study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 18, 2026: \"Traumatic Splenic Injury, Splenectomy & Splenorrhaphy\", carrying 20 numbered primary references.",
    suppliedAt: "2026-08-18T00:00:00.000Z",
    details: [
      "The packet cites its literature in full: the WSES splenic trauma classification and guidelines (Coccolini et al., World J Emerg Surg 2017), the WSES 2022 consensus on follow-up after nonoperative management (Podda et al.), the EAST practice management guideline on selective nonoperative management (Stassen et al., J Trauma Acute Care Surg 2012), the 2018 AAST-OIS revision and its radiologic validation (Dixe de Oliveira Santo et al., RadioGraphics 2023; Morell-Hofert et al., Eur Radiol 2020), the targeted-embolization series (Marsh et al., J Trauma Acute Care Surg 2025), the contemporary management review (Werner and Zarzaur, J Trauma Acute Care Surg 2025), the TQIP-era outcome analyses (Huang et al., JAMA Netw Open 2025; Gerard et al., J Surg Res 2026), the SIR position statement on endovascular intervention for trauma (Padia et al., JVIR 2020), and the asplenia and post-splenectomy infection literature (Di Sabatino et al., Lancet 2011; Rubin and Schaffner, NEJM 2014; Casciani et al., JAMA Surg 2020). The papers themselves were not retrieved; the packet is the proximate source.",
      "Split during review: the packet covers both the injury and its operations, and the SCORE curriculum outline lists \"Splenic Injury\" under Diseases and Conditions and \"Splenectomy and Splenorrhaphy\" under Operations and Procedures as separate entries. It is therefore authored as two topics — the disease is tested on grading and nonoperative selection, the operation on mobilization and hilar control — rather than one topic burying the operation inside the disease.",
      "Carried as a genuine guideline split rather than resolved: WSES suggests routine follow-up imaging at 48 to 72 hours for grade III and above managed nonoperatively, while EAST holds that repeat imaging should be clinically driven. Both positions are stated in the topic.",
    ].join(" "),
  },
  {
    id: TRAUMA_HEPATIC_PACKET_SOURCE,
    title: "Owner-supplied traumatic hepatic injury study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 18, 2026: \"Traumatic Hepatic Injury (Packing, Repair, Resection) — Pocket Chief\".",
    suppliedAt: "2026-08-18T00:00:00.000Z",
    details: [
      "A synthesis the owner identified as SCORE and board-review material covering the 2018 AAST liver injury scale, nonoperative management, and the operative repertoire from packing through resectional debridement. Unlike the FAST, splenic, gastrointestinal, and fasciotomy packets, this document carries no reference list of its own, so it is registered as owner study notes rather than as a literature synthesis.",
      "Carried as a board-answer versus current-practice split rather than resolved: the Schrock atriocaval shunt remains a keyed examination answer for juxtahepatic venous injury while damage-control packing is the contemporary standard, and the topic prints both.",
      "Corrected during review, against the packet as supplied: the damage-control line reads \"Triggers (lethal triad): hypothermia 4), coagulopathy\" in the source document, where the second element and its threshold are lost to a defect in the file itself rather than to conversion. The topic restores **acidosis** as the triad's named third element, which is standard keyed knowledge, and deliberately omits the mangled numeric threshold rather than guessing at it. This is content added beyond the packet and is pending the owner's sign-off.",
      "Added beyond both packets during review and pending the owner's sign-off: a short block reconciling this packet's claim that the liver is the most commonly injured abdominal solid organ in both blunt and penetrating trauma with the splenic packet's claim that the spleen is the most commonly injured solid organ in blunt abdominal trauma. Neither was altered; the topic explains that the two are counting different denominators and says which answer a question about blunt, penetrating, or all mechanisms is asking for.",
    ].join(" "),
  },
  {
    id: TRAUMA_GI_PACKET_SOURCE,
    title: "Owner-supplied gastrointestinal tract injury repair study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 18, 2026: \"GI Tract Injury from Trauma – Repair Study Guide\", carrying 24 numbered primary references.",
    suppliedAt: "2026-08-18T00:00:00.000Z",
    details: [
      "The packet cites its literature in full: the WSES guidelines on blunt and penetrating bowel injury (Smyth et al., World J Emerg Surg 2022), the WSES-AAST duodeno-pancreatic and extrahepatic biliary guidelines (Coccolini et al., 2019), the AAST/ACS-COT damage-control resuscitation protocol (LaGrone et al., J Trauma Acute Care Surg 2024), the appropriateness study on indications for damage control (Roberts et al., Ann Surg 2016), the EAST multicenter trials on primary repair versus resection for low-grade colon injury (Fitzgerald et al., 2024 and 2025), the destructive colon injury series (Mitchao et al., J Trauma Acute Care Surg 2022; Nekooei et al., Am J Surg 2026), the AAST multi-institutional and EAST guidelines on rectal injury (Brown et al., 2018; Bosarge et al., 2016), the stapled versus hand-sewn meta-analyses and AAST prospective study (Naumann et al., Surgery 2015; Bruns et al., 2017; Le et al., ANZ J Surg 2024), and the Surgical Infection Society intra-abdominal infection guidelines with the STOP-IT trial (Huston et al., Surg Infect 2024; Sawyer et al., NEJM 2015). The papers themselves were not retrieved; the packet is the proximate source.",
      "Scoped during review: the packet opens with two sections on trauma laparotomy priorities and retroperitoneal exposure maneuvers that the existing Abdominal Exploration topic already covers in the same detail. The topic keeps only the damage-control decision that actually governs a bowel repair — staple and leave versus definitive anastomosis — and spends its length on the segment-by-segment repair the existing topic does not carry.",
    ].join(" "),
  },
  {
    id: TRAUMA_FASCIOTOMY_PACKET_SOURCE,
    title: "Owner-supplied fasciotomy and compartment syndrome study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 18, 2026: \"Fasciotomy — Pocket Chief Study Guide\", carrying 21 numbered primary references.",
    suppliedAt: "2026-08-18T00:00:00.000Z",
    details: [
      "The packet cites its literature in full: the Lancet seminar on acute extremity compartment syndrome (von Keudell et al., 2015), the JAMA Surgery systematic review of diagnostic modalities (Mortensen et al., 2019), Matsen's original pressure-measurement work (J Bone Joint Surg Am 1980), the delayed-fasciotomy amputation analysis (Rothenberg et al., Ann Vasc Surg 2019), the vascular-trauma fasciotomy predictors (Kluckner et al., Injury 2021), the 2024 ACC/AHA multisociety lower-extremity peripheral artery disease guideline (Gornik et al., J Am Coll Cardiol), the incision-placement and forearm technique papers (Pallister et al., Injury 2016; Masquelet, OTSR 2010; Turkula and Fuller, J Orthop Trauma 2017), the shoelace plus negative-pressure closure series (Eceviz and Cevik, Adv Skin Wound Care 2020), and the rhabdomyolysis literature including the AAST critical care consensus document (Kodadek et al., Trauma Surg Acute Care Open 2022; Bosch et al., NEJM 2009; Zeng et al., Cochrane 2014). The papers themselves were not retrieved; the packet is the proximate source.",
      "Carried as a genuine split rather than resolved: a delta pressure under 30 mmHg is the widely taught operative threshold, while the contemporary diagnostic literature holds that no pressure measurement is sensitive or specific enough to overrule serial clinical examination in an awake patient. Both are stated.",
    ].join(" "),
  },
  {
    id: TRAUMA_ESCHAROTOMY_PACKET_SOURCE,
    title: "Owner-supplied escharotomy study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 18, 2026: \"Escharotomy — SCORE / General Surgery Board Study Guide\".",
    suppliedAt: "2026-08-18T00:00:00.000Z",
    details: [
      "A synthesis the owner identified as SCORE and board-review material covering burn-induced compartment syndrome, incision anatomy, and release endpoints. Like the hepatic packet and unlike the FAST, splenic, gastrointestinal, and fasciotomy packets, it carries no reference list of its own, so it is registered as owner study notes rather than as a literature synthesis.",
      "Carried as a board-answer versus current-practice split rather than resolved: a compartment pressure above 30 mmHg is the textbook trigger, while measured pressures are unreliable in the edematous burn and examination drives the decision. Enzymatic debridement with bromelain is noted as an evolving alternative that surgical escharotomy still outperforms in large or critical burns.",
    ].join(" "),
  },
  {
    id: TRAUMA_NECK_PACKET_SOURCE,
    title: "Owner-supplied traumatic neck injury study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 19, 2026: \"Traumatic Neck Injury Pocket Chief\", carrying 20 numbered primary references.",
    suppliedAt: "2026-08-19T00:00:00.000Z",
    details: [
      "The packet cites its literature in full: the no-zone systematic review (Ibraheem et al., J Trauma Acute Care Surg 2020), the diagnostic approach review (Siletz and Inaba, J Trauma Acute Care Surg 2024), the ACR Appropriateness Criteria for penetrating neck injury (Schroeder et al., J Am Coll Radiol 2017), Feliciano's penetrating cervical trauma review (World J Surg 2015), the operative airway and aerodigestive technique paper (Wall and Mattox, J Trauma Acute Care Surg 2025), the Western Trauma Association critical decisions algorithm (Sperry et al., J Trauma Acute Care Surg 2013), the selective nonoperative pharyngoesophageal series (Madsen et al., J Trauma Acute Care Surg 2018), the penetrating carotid outcomes analysis (Tanamal et al., J Vasc Surg 2026), and the blunt cerebrovascular injury literature including the argument against routine confirmatory angiography (Dyer et al., J Vasc Surg 2025). The papers themselves were not retrieved; the packet is the proximate source.",
      "Corrected during review and pending the owner's sign-off: the blunt cerebrovascular injury screening line has lost its comparison operators in the supplied file, reading \"DAI with GCS 6\" and \"cervical bruit/thrill 50 yr\". Both are restored from the Denver criteria they are quoting — diffuse axonal injury with a Glasgow Coma Scale score below 6, and a cervical bruit or thrill in a patient under 50 years, where the age cutoff exists because a bruit in a younger patient is far more likely to mean injury than atherosclerosis. Only the operators were supplied; both numbers are the packet's own. This is the same class of defect as the hepatic packet's lethal-triad line, and the two documents appear to share whatever produced it.",
      "An earlier export of this document, supplied August 18, 2026, was defective: it ended mid-sentence partway through its second section, holding only the zones table and the hard-versus-soft-signs list. No topic was authored from it. The complete export supplied August 19 carries all eight sections and the reference list, and is the version these topics are written from.",
      "Three classic-versus-current splits are carried rather than resolved, because the packet flags each one explicitly and both sides remain examinable: mandatory Zone II exploration versus no-zone selective management driven by examination and computed tomography angiography; heparin infusion versus aspirin as the antithrombotic for blunt cerebrovascular injury; and temporary intraluminal shunting for carotid damage control, which board teaching favors and which a recent systematic review associates with a stroke-or-death rate approaching 100 percent.",
    ].join(" "),
  },
  {
    id: CROHN_DISEASE_PACKET_SOURCE,
    title: "Owner-supplied Crohn disease study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 20, 2026: \"Crohn Disease — Pocket Chief Study Guide\", carrying 19 numbered primary references.",
    suppliedAt: "2026-08-20T00:00:00.000Z",
    details: [
      "The packet cites its literature in full across 19 numbered references: the Lancet Crohn's disease seminar (Dolinger et al., 2024), both the 2018 and 2025 ACG clinical guidelines on the management of Crohn's disease in adults (Lichtenstein et al.), the ASCRS clinical practice guidelines for the surgical management of Crohn's disease (Lightner et al., Dis Colon Rectum 2020), the ten-year retrospective follow-up of the LIR!C trial (Oldenburg et al., Lancet Gastroenterol Hepatol 2026), the postoperative recurrence literature (Bertin et al., J Clin Med 2025; Allez et al., Clin Gastroenterol Hepatol 2026; Shehab et al., Inflamm Bowel Dis 2025), the AGA practice update on therapeutic endoscopy in inflammatory bowel disease (Kochhar et al., 2026), the stricturing-disease review (Fousekis et al., J Clin Med 2022), the AGA guideline on moderate-to-severe luminal and perianal fistulizing disease (Feuerstein et al., Gastroenterology 2021), the 2025 AGA evidence synthesis on advanced therapies (Singh et al., Gastroenterology 2025), the positioning review (Fudman et al., Clin Gastroenterol Hepatol 2025), the penetrating ileocolic abscess series (Ward et al., Inflamm Bowel Dis 2026), and the colorectal cancer surveillance literature (Shah and Itzkowitz, Gastroenterology 2022; NCCN Colorectal Cancer Screening, 2026). The papers themselves were not retrieved; the packet is the proximate source.",
      "Corrected during review and pending the owner's sign-off: the supplied document has lost every \"less than\" comparison operator, and with each one the text that followed it up to the next \"greater than\" sign. This is the same defect that affected the traumatic neck injury packet, and the two documents appear to share whatever produced it. Restored from the guidelines each line is quoting: the ASCRS 2020 stricturoplasty lengths, which arrived as \"Heineke-Mikulicz ~25 cm\" and are restored to Heineke-Mikulicz under 10 cm, Finney 10 to 25 cm, and Michelassi side-to-side isoperistaltic above 25 cm, since as supplied the line recommends a Heineke-Mikulicz for a 25 cm stricture; the CDAI remission threshold, supplied as \"remission moderate-severe 220\" and restored to remission below 150; the upper gastrointestinal distribution figure, restored to under 5 percent; and the endoscopic balloon dilation stricture length, restored to under 4 to 5 centimetres. The numbers themselves are the packet's own throughout; only the operators and the swallowed spans were reconstructed.",
      "Added beyond the packet during review and pending the owner's sign-off: the full Rutgeerts score definitions, which the packet references by grade without defining; the Crohn versus ulcerative colitis comparison rows for smoking, serology, rectal involvement, and whether proctocolectomy is curative, which the packet states elsewhere in prose but omits from its own comparison table; and the CDAI mild band of 150 to 219.",
      "Foreign syntax stripped during review: the packet's extraintestinal manifestation line carried a markdown hyperlink to an external site route for primary sclerosing cholangitis. The app has no such route and it would render as a dead link.",
      "Three classic-versus-current splits are carried rather than resolved, because the packet flags each one and both sides remain examinable: sequential step-up therapy versus early top-down biologics after PROFILE; surgery as a last resort versus early laparoscopic ileocecal resection as a first-line alternative to infliximab after LIR!C; and the older 5 / 5 to 10 / above 10 centimetre stricturoplasty scheme versus the ASCRS lengths.",
    ].join(" "),
  },
  {
    id: ULCERATIVE_COLITIS_PACKET_SOURCE,
    title: "Owner-supplied ulcerative colitis study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 20, 2026: \"Ulcerative Colitis — Pocket Chief Study Guide\", carrying 21 numbered primary references.",
    suppliedAt: "2026-08-20T00:00:00.000Z",
    details: [
      "The packet cites its literature in full across 21 numbered references: the Lancet ulcerative colitis seminars (Le Berre et al., 2023; Ungaro et al., 2017; Ordas et al., 2012), the JAMA reviews (Gros and Kaplan, 2023; Loeb et al., 2026), the ACG clinical guideline update on ulcerative colitis in adults (Rubin et al., Am J Gastroenterol 2025), the ASCRS clinical practice guidelines for the surgical management of ulcerative colitis (Holubar et al., Dis Colon Rectum 2021), the AGA guideline on moderate to severe disease (Feuerstein et al., Gastroenterology 2020), the acute severe colitis meta-analysis (Vuyyuru et al., Clin Gastroenterol Hepatol 2025), the surgical management review (Nguyen and Parra, Surg Clin North Am 2025), the pouch surgery state of the art (Maspero and Hull, Dis Colon Rectum 2024), the modified two-stage versus three-stage cohort (Moojen et al., J Crohns Colitis 2025), the AGA pouchitis guideline (Barnes et al., Gastroenterology 2024), the EARNEST vedolizumab trial (Travis et al., N Engl J Med 2023), the ileoanal pouch review (Ng et al., World J Gastroenterol 2019), the inpatient complications review (Kaur et al., Clin Gastroenterol Hepatol 2020), the colorectal neoplasia surveillance literature (Rex et al., Am J Gastroenterol 2024; Axelrad and Rubin, 2024; Shah and Itzkowitz, Gastroenterology 2022; NCCN Colorectal Cancer Screening, 2026), and the ACS Gastrointestinal Surgical Emergencies textbook (2021). The papers themselves were not retrieved; the packet is the proximate source.",
      "Corrected during review and pending the owner's sign-off: the supplied document has lost every \"less than\" comparison operator, the same defect carried by the Crohn disease packet supplied with it and by the earlier traumatic neck injury packet. Restored from the criteria each line is quoting: the Truelove and Witts severe colitis criteria, supplied as \"temperature above 37.8 degrees, heart rate above 90, hemoglobin ESR above 30\" and restored to include a hemoglobin below 10.5 grams per decilitre; the colorectal cancer risk factor of a first-degree relative with colorectal cancer, restored to a first-degree relative under 50 years; the young-age predictor of an aggressive course, which arrived as \"(30 y)\" and is carried without a number because the ACG threshold it quotes is 40 years and the supplied figure cannot be reconciled with it; and major pouch incontinence, restored to under 5 percent. The numbers are the packet's own except where noted; only the operators were reconstructed.",
      "Repaired during review: the surveillance interval line arrived with unbalanced parentheses that ran the risk-stratification list and the guideline discrepancy together into one sentence. The two are separated here without changing either claim.",
      "Two genuine splits are carried rather than resolved, because both sides are defensible and the packet flags each: the maximum surveillance interval, where ACG caps it at three years while AGA, BSG, and ECCO allow five in low-risk patients; and the modified two-stage approach, which the ASCRS review found no worse than the traditional two-stage for leak and pelvic sepsis while a 2025 European cohort reported a higher leak rate against the three-stage approach. A third, stapled versus hand-sewn ileal pouch-anal anastomosis, is carried as a board-answer versus current-practice block.",
    ].join(" "),
  },
  {
    id: TRAUMA_CHEST_WALL_PLEURA_DIAPHRAGM_PACKET_SOURCE,
    title: "Owner-supplied chest wall, pleura, and diaphragm injury study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 21, 2026: \"Chest Wall, Pleura, and Diaphragmatic Injuries Pocket Chief\".",
    suppliedAt: "2026-08-21T00:00:00.000Z",
    details: [
      "The packet is a bracket-numbered board study guide (numbers up to [33]) but was not supplied with a consolidated bibliography, so most bracket numbers cannot be resolved to a full citation; the packet itself is the proximate source for those. Where the packet names a study inline it is registered with its real citation: the WSES-AAST guideline on hemothorax and pneumothorax management (Coccolini et al., 2025); the TQIP analysis of early VATS timing for retained hemothorax (Zambetti et al., Surgery 2022) [17]; the ERS/ESTS early-VATS outcomes data (2023) [18]; the TQIP delay analysis finding no VATS-failure penalty for later evacuation (Ouwerkerk et al., J Surg Res 2024) [20]; the WSES/CWIS flail chest and SSRF position paper (2024) [1]; the TQIP-derived SSRF timing analyses (Kwon 2025; Simmonds 2023); the multicenter SOFRIB randomized trial of surgical stabilization of rib fractures beyond flail chest (Ang et al., Ann Surg 2026) [4]; and the high-sensitivity troponin recalibration for blunt cardiac injury (Becker 2024) [28].",
      "Two of the packet's most consequential claims — both flagged as evolving evidence rather than settled teaching — were independently verified by web search during review rather than taken on faith: the SOFRIB trial (Ang et al., Ann Surg, published March 2026) randomized 236 patients across nine ACS-verified trauma centers and found routine SSRF outside classic flail chest did not reduce ICU length of stay (mean difference 1.8 days, P = 0.17), while increasing hospital length of stay (+3.3 days, P = 0.01) and pneumonia, with the packet's own figures matching the trial report; and the high-sensitivity troponin optimal cutoff for clinically significant blunt cardiac injury (Youden index 0.50 at 40 ng/L, versus a prior 76 ng/L threshold) matches the Journal of Surgical Research 2024 re-evaluation the packet is citing as reference [28].",
      "The packet's own table of emergent pleural-space presentations (tension pneumothorax, open chest wound, massive hemothorax, retained hemothorax) is carried as the topic's board-pearls table with its clues and triggers unchanged.",
      "Three classic-versus-current splits are carried rather than resolved, because the packet flags each one explicitly and both sides remain examinable: routine SSRF beyond flail chest (strong evidence for flail chest itself; SOFRIB argues against extending it to non-flail displaced fractures) [1][3][4]; the mandatory 24- to 48-hour telemetry and echocardiography reflex for any abnormal ECG or troponin after isolated sternal fracture, which recent series increasingly challenge as overtesting for a complication under 2 percent [28][30][31][32][33]; and small hemothorax under 300 mL in a stable patient, where WSES-AAST now permits observation against the board-classic reflex to drain every hemothorax [8].",
    ].join(" "),
  },
  {
    id: TRAUMA_VASCULAR_THORACIC_PACKET_SOURCE,
    title: "Owner-supplied vascular thoracic injury study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 21, 2026: \"Vascular Thoracic Injury — Pocket Chief\".",
    suppliedAt: "2026-08-21T00:00:00.000Z",
    details: [
      "The packet is bracket-numbered (up to [35]) but was not supplied with a consolidated bibliography; the bracket numbers are unresolved and the packet itself is the proximate source for the claims they tag. It names guideline bodies rather than individual authors throughout: the Society for Vascular Surgery (SVS) blunt thoracic aortic injury (BTAI) grading and management guideline, the EACTS/STS 2024 joint guideline, the ESC 2024 guideline, WSES and JOMI on massive-hemothorax thresholds, and the EAST/WTA and WTA (Burlew) resuscitative thoracotomy criteria.",
      "The packet's two most consequential claims, both explicitly flagged as overturning board-classic teaching, were independently verified by web search during review: a systematic review and meta-analysis found early (under 24 hours) TEVAR for BTAI carried higher mortality than delayed repair (RR 2.04, 95% CI 1.45 to 2.86), matching the packet's figure exactly and specifically confirmed for grade 3 injury; and the widened-mediastinum teaching point is directionally correct but its precision could not be independently pinned to the packet's exact 28 percent figure — published series instead report CXR mediastinal-abnormality sensitivity in confirmed BTAI ranging from roughly 41 percent down to near-zero specificity for a positive predictive value, which supports the packet's broader claim that CXR is an unreliable screening tool without confirming the single number. The number is carried as supplied since the qualitative point it supports is well established.",
      "The packet's own SVS grading table (grade, lesion, default management) is carried as the topic's staging table unchanged, and its incision-selection-by-target list is carried as the operative approach table.",
      "Two classic-versus-current splits are carried rather than resolved, because the packet flags each explicitly and both sides remain examinable: immediate repair of BTAI versus delayed repair after competing-injury stabilization, where recent evidence favors delay for grade 3 outside very early TEVAR in concurrent TBI; and CXR's classic mediastinal signs versus their demonstrated unreliability as a screening tool, where CTA has replaced angiography as the criterion standard.",
    ].join(" "),
  },
  {
    id: TRAUMA_TRACHEOBRONCHIAL_LUNG_PACKET_SOURCE,
    title: "Owner-supplied tracheobronchial and lung injury study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 21, 2026: \"Tracheobronchial and Lung Injury Pocket Chief\".",
    suppliedAt: "2026-08-21T00:00:00.000Z",
    details: [
      "The packet cites its literature by name throughout rather than relying only on bracket numbers, and each named study is registered with its real citation: the EAST fluid-management position on pulmonary contusion (Simon et al., J Trauma Acute Care Surg, 2012); the post-intubation tracheal injury review (Boutros et al., Eur Respir Rev, 2022); the pulmonary contusion epidemiology and overtreatment-risk series (Požgain et al., Eur J Trauma Emerg Surg, 2018); the tracheobronchial injury and prehospital mortality review (Aliev et al., J Thorac Dis, 2024); the bronchoscopy-as-gold-standard and airway-repair technique paper (Wall and Mattox, J Trauma Acute Care Surg, 2025); the conservative-management outcomes series for small tracheobronchial tears (Carretta et al., World J Surg, 2011); the endobronchial stenting series (Grewal et al., Chest, 2019); the cervical-access case series (Evermann et al., Ann Thorac Surg, 2022); the original pulmonary tractotomy description (Wall et al., Am J Surg, 1994); and the early-VATS retained-hemothorax outcomes data (Bedawi et al., ERS/ESTS, 2023). The papers themselves were not retrieved; the packet is the proximate source.",
      "The packet's own minor-versus-major tracheobronchial injury feature table (circumference, margins, ventilation, air leak, associated injury) is carried as the topic's operative-versus-conservative table unchanged.",
      "The packet explicitly flags a discrepancy between board-classic and its own source on the distance of blunt airway disruptions from the carina — board teaching states within roughly 2.5 cm (1 inch), while the packet's underlying module states within 1 cm — and both figures are carried rather than one being discarded, since the packet itself names this as worth knowing both ways.",
      "Three classic-versus-current splits are carried rather than resolved, because the packet flags each explicitly and both sides remain examinable: chest-tube volume triggers for thoracotomy as absolute numbers (1500 mL or 200 mL/h) versus current guidance (WSES-AAST, Western Trauma) weighting physiology and hemodynamics over the raw threshold; tracheobronchial injury as automatically operative versus the expanding evidence for conservative management of small, well-opposed, adequately ventilated tears and for endobronchial stenting; and CT-detected pulmonary contusion's classic diagnostic-sensitivity framing versus evidence that CT-only contusions may be clinically minor and risk overtreatment.",
    ].join(" "),
  },
  {
    id: TRAUMA_CARDIAC_INJURY_PACKET_SOURCE,
    title: "Owner-supplied cardiac trauma and injury study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 21, 2026: \"Cardiac Trauma & Injury — Pocket Chief Study Guide\".",
    suppliedAt: "2026-08-21T00:00:00.000Z",
    details: [
      "The packet cites its literature by name throughout and each named study is registered with its real citation: the blunt cardiac injury mechanism review (Patel et al., J Cardiothorac Vasc Anesth, 2022); the ACC pericarditis expert consensus (JACC, 2025); the penetrating cardiac injury survival review (Parreira and Coimbra, J Trauma Acute Care Surg, 2025); the chamber-injury-pattern and stab-versus-gunshot survival series (McNicoll et al., Injury, 2023); the ACS Best Practices in Imaging guidance on the cardiac box (2018); the FAST-as-screening-standard position (King, N Engl J Med, 2019); the pooled point-of-care ultrasound accuracy meta-analysis (Zaki et al., J Clin Ultrasound, 2026); the EAST blunt cardiac injury screening guideline (Clancy et al./EAST, 2012; Salim et al.); the ACR Appropriateness Criteria for suspected cardiac trauma (2020); the high-sensitivity troponin recalibration for blunt cardiac injury (Becker et al., J Surg Res, 2024) — the same recalibration cited in the chest wall, pleura, and diaphragm injury packet; the AAST Cardiac Organ Injury Scale outcomes series (Asensio et al., J Am Coll Surg, 1998); the Western Trauma Association resuscitative thoracotomy criteria and outcomes (Burlew et al./WTA, 2012; Dewey et al., 2025); the prehospital resuscitative thoracotomy outcomes series (Perkins et al., JAMA Surg, 2025); the operative penetrating cardiac injury outcomes series (Nguyen et al., 2025); and the randomized trial of drainage versus sternotomy for stable hemopericardium (Nicol and Navsaria, Ann Surg, 2014).",
      "The Nicol and Navsaria randomized trial — the packet's central practice-changing citation — was independently verified by web search during review: 55 patients were randomized to sternotomy and 56 to subxiphoid pericardial window and drainage alone, 93 percent of the sternotomy group had no cardiac injury or a sealed tangential wound, and the drainage group had a shorter ICU and total hospital stay with no increase in mortality, matching the packet's figures exactly.",
      "The packet's own incision-selection table (left anterolateral thoracotomy versus median sternotomy, by exposure and use) is carried as the topic's operative-approach table unchanged.",
      "Three classic-versus-current splits are carried rather than resolved, because the packet names each explicitly as a flag: mandatory sternotomy for any hemopericardium versus drainage alone in a stable patient with a sealed injury at subxiphoid window (Nicol and Navsaria); the diagnostic subxiphoid pericardial window as the traditional screening step versus FAST having supplanted it as the standard first-line test; and high-sensitivity troponin cutoffs for blunt cardiac injury, which remain unstandardized even as a single-center series favors a lower threshold than conventional assays use.",
    ].join(" "),
  },
  {
    id: ACUTE_LIMB_ISCHEMIA_PACKET_SOURCE,
    title: "Owner-supplied acute limb ischemia study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 25, 2026: \"Acute Limb Ischemia Pocket Chief — SCORE / General Surgery Board Study Guide.\"",
    suppliedAt: "2026-08-25T00:00:00.000Z",
    details: [
      "The packet names its literature inline rather than in a consolidated bibliography, and each named study is registered with its real citation: the 2024 ACC/AHA multisociety lower-extremity peripheral artery disease guideline; the 2024 ESC guideline on peripheral arterial and aortic disease; Creager et al., NEJM, 2012; Bonaca et al., JACC, 2024; the Rochester, STILE, and TOPAS randomized trials with the Cochrane review of thrombolysis versus surgery for acute limb ischemia (Darwood et al., Cochrane, 2018); Jarosinski et al., J Vasc Surg, 2025; Kusumowardani et al., J Endovasc Ther, 2026; Herzig et al., JACC Cardiovascular Interventions, 2024; Natour et al., Annals of Vascular Surgery, 2023; and TASC II. The papers themselves were not retrieved; the packet is the proximate source.",
      "Scoped during review against the existing Fasciotomy topic, which already carries the two-incision four-compartment lower-leg technique, its nerve pearls, and the delta-pressure-versus-absolute-pressure discrepancy in full: this topic keeps compartment syndrome and fasciotomy content limited to the acute-limb-ischemia-specific angle — timing relative to reperfusion, the class-specific indications, and the TASC II 20 mmHg threshold against the 30 mmHg/delta-P-under-30 threshold this packet supplies — rather than repeating the operative anatomy. The now-redundant \"acute limb ischemia\" alias was removed from the Fasciotomy topic accordingly, since a dedicated topic now owns that title.",
      "Carried as a genuine cross-packet discrepancy rather than resolved: this packet frames warm limb ischemia's irreversible threshold as a 4-to-6-hour window narrowing the board-classic 6-hour rule, while the vascular exposure principles packet supplied alongside it states the threshold as a flat ~6 hours. Both figures are printed, here and in the Vascular Exposure Principles topic.",
      "Three classic-versus-current splits are carried rather than resolved, because the packet flags each explicitly and both sides remain examinable: catheter-directed thrombolysis approximating open surgery in limb salvage, drawn from older high-dose-urokinase trials, versus contemporary low-dose pharmacomechanical technique that bleeds less; an endovascular-first trend on mortality grounds versus open embolectomy remaining preferred for clear embolic occlusion; and the fasciotomy pressure threshold, where an absolute pressure above 30 mmHg or a delta pressure under 30 mmHg (Creager, NEJM) sits against TASC II's lower 20 mmHg threshold.",
    ].join(" "),
  },
  {
    id: VASCULAR_EXPOSURE_PRINCIPLES_PACKET_SOURCE,
    title: "Owner-supplied vascular exposure principles study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 25, 2026: \"Vascular Exposure Principles Pocket Chief — SCORE / general surgery board-focused study guide.\"",
    suppliedAt: "2026-08-25T00:00:00.000Z",
    details: [
      "The packet is bracket-numbered but was not supplied with a consolidated bibliography beyond two named foundational reviews cited inline — Hoyt et al., Surgical Clinics of North America, 2001, and Fletcher, Annals of the Academy of Medicine Singapore, 1992, both registered here — plus the CREST trial, the EVAR-1/DREAM/OVER trials, a 2025 reconstructed individual-patient-data meta-analysis of EVAR versus open repair, the 2022 ACC/AHA aortic disease guideline, and Vascular Study Group of New England registry data on cranial nerve injury after carotid endarterectomy. The bracket numbers themselves are unresolved and the packet is the proximate source for the claims they tag; its own anatomy and complications tables are carried into the topic largely unchanged, with the citation-chip brackets stripped since the app has no route for them.",
      "Carried as a genuine cross-packet discrepancy rather than resolved: this packet states warm limb ischemia's irreversible threshold as a flat ~6 hours, while the acute limb ischemia packet supplied alongside it narrows that to a 4-to-6-hour window. Both figures are printed, here and in the Acute Limb Ischemia topic.",
      "Two classic-versus-current splits are carried rather than resolved, because the packet flags each explicitly: the most commonly injured cranial nerve in carotid exposure, where board teaching and the Society for Vascular Surgery guideline name the hypoglossal but the largest pooled meta-analysis (20,860 carotid endarterectomies) found the vagus injured more often; and EVAR's long-term durability against open repair, where boards teach equivalent long-term survival but a 2025 reconstructed-IPD meta-analysis found open repair holds a late survival advantage after roughly 11 months.",
    ].join(" "),
  },
  {
    id: CRITICAL_CARE_AIRWAY_PACKET_SOURCE,
    title: "Owner-supplied airway access, intubation, and surgical airways study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 25, 2026: \"Airway Access, Intubation, and Surgical Airways — Pocket Chief\".",
    suppliedAt: "2026-08-25T00:00:00.000Z",
    details: [
      "The packet names its literature inline for most high-yield points rather than relying only on its bracket numbers (which run to [62] without a supplied bibliography, so the packet is the proximate source for those): the ASA 2022 difficult-airway guideline's capnography sensitivity/specificity data; the Canadian Airway Focused Group (CAFG) 2021 first-pass-success data for video laryngoscopy; the 2025 Difficult Airway Society (DAS) guideline's emphasis on the physiologically difficult airway and continuous preoxygenation; the DAS/CAFG consensus naming scalpel-bougie-tube as the adult front-of-neck-access technique of choice; the TracMan trial (JAMA, 2013) on early-versus-late tracheostomy timing; and a 2015 Cochrane meta-analysis reaching the opposite mortality conclusion on the same question.",
      "Independently checked during review: the pediatric front-of-neck-access age cutoff is less settled than the packet's single \"<8 years scalpel-bougie tracheostomy, ≥8 years cricothyroidotomy\" rule suggests. Current DAS pediatric guidance keeps needle cricothyroidotomy first-line under 8 years, with a scalpel technique reserved for needle failure, while separate otolaryngology-oriented reviews instead favor primary surgical tracheotomy under 8 when an otolaryngologist is immediately available — two different current answers, both correcting the same older \"no surgical cric under 10–12\" teaching. The topic below is written to reflect that the pediatric algorithm varies by guideline rather than presenting one clean age rule.",
    ].join(" "),
  },
  {
    id: CRITICAL_CARE_ARRHYTHMIAS_PACKET_SOURCE,
    title: "Owner-supplied common cardiac arrhythmias study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 25, 2026: \"Common Cardiac Arrhythmias — Pocket Chief\".",
    suppliedAt: "2026-08-25T00:00:00.000Z",
    details: [
      "The packet names its literature throughout: the ACC (Kumbhani et al., 2026) and PACE (Ma et al., 2024) postoperative atrial fibrillation (POAF) incidence data; the AHA (Wigginton et al., 2025) caution on confirming an arrhythmia is the cause rather than the consequence of instability before cardioverting; the AHA (Panchal et al., 2020) and ACC/AHA/HRS (Page et al., 2015) narrow-complex-tachycardia termination data; the RACE II trial and the 2023 ACC/AHA/ACCP/HRS atrial fibrillation guideline supporting lenient rate control; the 2024 ESC CHA₂DS₂-VA scheme; the 2024 perioperative guideline and the 2023 ACC/AHA atrial fibrillation guideline on postoperative anticoagulation; the PROCAMIO trial on procainamide for stable monomorphic VT; the 2018 AHA advanced-cardiac-life-support update restoring lidocaine as a co-equal option for shock-refractory VF/pulseless VT; and the 2018 ACC/AHA/HRS bradyarrhythmia pacing guideline.",
      "Independently verified during review: Landiolol (Rapiblyk) is a real, FDA-approved ultra-short-acting IV beta-blocker carrying the indication the packet describes, but the approval date is November 2024, not 2025 as supplied — corrected in the topic text below.",
    ].join(" "),
  },
  {
    id: CRITICAL_CARE_FLUID_ACID_BASE_PACKET_SOURCE,
    title: "Owner-supplied fluid and acid-base disorders study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 25, 2026: \"Fluid and Acid-Base Disorders — Pocket Chief\".",
    suppliedAt: "2026-08-25T00:00:00.000Z",
    details: [
      "The packet names its literature throughout: Lorente et al. (Frontiers in Medicine, 2025) on postoperative dextrose-containing maintenance fluid; the SMART trial (Semler et al., NEJM, 2018) and the 2026 Surviving Sepsis Campaign favoring balanced crystalloids over normal saline; the BaSICS trial and Zampieri et al. (JAMA, 2021) on the traumatic-brain-injury and hyponatremia/alkalosis exceptions; Adrogué et al. (JAMA, 2022) on hypertonic saline dosing for severe symptomatic hyponatremia; Miller et al. (American Family Physician, 2023) on sodium correction-rate limits; Geldermann et al. (European Medical Journal, 2026) on potassium-binder preference over Kayexalate; a Cochrane review (Batterink et al., 2015) on IV calcium for hyperkalemia; the Endocrine Society (2023) and Guise and Wysolmerski (NEJM, 2022) hypercalcemia treatment sequence; the 2020 ASPEN refeeding-syndrome consensus and Schuetz et al. (Lancet, 2021) on prophylactic electrolyte dosing; and the PROPPR trial (Holcomb et al., JAMA, 2015) and a 2024 AAST/ACS damage-control-resuscitation protocol for transfusion ratios and tranexamic acid dosing.",
      "Independently verified during review: a January 2025 JAMA Internal Medicine meta-analysis of 16 cohort studies (11,811 patients with severe hyponatremia) does show slower correction associated with higher mortality while osmotic demyelination syndrome stays rare (well under 1%) even with rapid correction, matching the packet's qualitative claim. The exact odds ratios the packet attributes to \"Ayus et al., 2025\" could not be independently confirmed against the source available during review and are carried as supplied rather than re-derived.",
    ].join(" "),
  },
  {
    id: CRITICAL_CARE_HYPOVOLEMIC_SHOCK_PACKET_SOURCE,
    title: "Owner-supplied hypovolemic (hemorrhagic) shock study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 25, 2026: \"Hypovolemic (Hemorrhagic) Shock — Pocket Chief\".",
    suppliedAt: "2026-08-25T00:00:00.000Z",
    details: [
      "The packet names its literature throughout rather than relying on bracket numbers: the PROPPR trial (Holcomb et al., JAMA, 2015) on 1:1:1 transfusion ratios; the CRASH-2 trial and the PATCH-Trauma trial on tranexamic acid timing and functional outcome; AORTA registry data and the UK-REBOA randomized trial on resuscitative endovascular balloon occlusion of the aorta; and the SAFE trial on albumin in traumatic brain injury. The UK-REBOA stopped-for-harm finding and the PATCH-Trauma functional-outcome result were checked against training-era knowledge of both trials during review and are consistent with the packet's framing.",
    ].join(" "),
  },
  {
    id: CRITICAL_CARE_RESPIRATORY_FAILURE_PACKET_SOURCE,
    title: "Owner-supplied respiratory failure, ARDS, PE, and pneumonia study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 25, 2026: \"Respiratory Failure, ARDS, PE, and Pneumonia — Pocket Chief\".",
    suppliedAt: "2026-08-25T00:00:00.000Z",
    details: [
      "The packet names its literature throughout: the Berlin ARDS definition (ARDS Definition Task Force, JAMA, 2012) and its validated severity strata (Fan et al., JAMA, 2018); a 2024 \"New Global Definition\" of ARDS (Matthay et al., AJRCCM, 2024); the ARDSNet/ARMA trial and the 2024 ATS (Qadir et al.) and 2023 ESICM lung-protective-ventilation guidelines; Amato et al. (NEJM, 2015) on driving pressure; the PROSEVA trial (Guérin et al., NEJM, 2013) on prone positioning; the 2026 Surviving Sepsis Campaign on neuromuscular-blockade dosing strategy; the 2024 SCCM focused corticosteroid update (Chaudhuri et al.) and the DEXA-ARDS trial (Villar, cited via Gorman et al., Lancet, 2022); the 2019 ESC pulmonary-embolism risk-stratification scheme and the 2026 AHA/ACC pulmonary-embolism guideline (Creager et al.); the PEITHO trial on submassive PE thrombolysis; and the 2016 IDSA/ATS hospital- and ventilator-associated pneumonia guideline (Kalil et al.).",
      "Independently verified during review: the 2024 ATS and 2023 ESICM lung-protective-ventilation guidelines do state the tidal-volume target as 4–8 mL/kg predicted body weight rather than a fixed 6 mL/kg, matching the packet; the 2024 SCCM focused update did remove the PaO₂/FiO₂ <200 qualifier from its ARDS corticosteroid recommendation, also matching the packet; and the 2026 AHA/ACC pulmonary embolism guideline's five-category (A–E) clinical severity scheme is a real, newly published framework (Circulation/JACC, February 2026) replacing the traditional low/intermediate/high-risk model, confirming the packet's description of it.",
    ].join(" "),
  },
  {
    id: CRITICAL_CARE_CARDIOGENIC_SHOCK_PACKET_SOURCE,
    title: "Owner-supplied cardiac failure and cardiogenic shock study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 25, 2026: \"Cardiac Failure and Cardiogenic Shock — Pocket Chief\".",
    suppliedAt: "2026-08-25T00:00:00.000Z",
    details: [
      "The packet names its literature throughout: Lüsebrink et al. (Lancet, 2024) and Samsky et al. (JAMA, 2021) on cardiogenic shock definition and its self-perpetuating spiral; van Diepen et al. (AHA, 2017) on expanded shock phenotypes beyond classic \"cold and wet\"; Thompson et al. (ACC/AHA, 2024) on perioperative heart-failure risk; the 2022 SCAI SHOCK staging update; the SHOCK and CULPRIT-SHOCK trials on revascularization strategy; the SOAP II and OPTIMA-CC trials on vasopressor choice; the DOREMI trial comparing milrinone and dobutamine; the IABP-SHOCK II, ECLS-SHOCK, ECMO-CS, and DanGer Shock trials on mechanical circulatory support; and the 2024 AHA/ACC perioperative guideline (drawing on the POISE and POISE-3 trials) on perioperative heart-failure medication management.",
      "These trial results were checked against training-era knowledge during review — SHOCK, CULPRIT-SHOCK, IABP-SHOCK II, ECLS-SHOCK, DanGer Shock, and SOAP II are established landmark trials — and nothing in the packet's framing of them was inconsistent with the published trial reports.",
    ].join(" "),
  },
  {
    id: HEMORRHOIDS_PACKET_SOURCE,
    title: "Owner-supplied hemorrhoids study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 25, 2026: \"Hemorrhoids Pocket Chief\".",
    suppliedAt: "2026-08-25T00:00:00.000Z",
    details: [
      "The packet names its literature in the body rather than in a reference list: the ASCRS clinical practice guideline for hemorrhoids, the ACG clinical guideline on benign anorectal disorders, and the Cochrane review of fiber for symptomatic hemorrhoids (7 RCTs, n=378).",
      "Verified during review: the ASCRS guideline the packet cites is the May 2024 Clinical Practice Guidelines for the Management of Hemorrhoids in Diseases of the Colon & Rectum (PMID 38294832), and its positions on office procedures, periprocedural anticoagulation, and stapled hemorrhoidopexy match the packet's framing.",
      "Repeat-banding rate reconciled during review: the packet gives 15%-32% and the SCORE module gives 18% to 32%. The wider bound is carried here as \"roughly a fifth to a third\" rather than pinning a low end the two sources do not agree on.",
      "Beyond the packet, pending owner sign-off: Fiser's primary/secondary/tertiary/quaternary nomenclature for internal hemorrhoids is carried alongside grades I-IV, because older question stems key on those words.",
    ].join(" "),
  },
  {
    id: SCORE_HEMORRHOIDS_SOURCE,
    title: "SCORE curriculum module: Hemorrhoids",
    kind: "website",
    citation: "Mack J, Trimble L, Greenwald A. \"Hemorrhoids.\" Surgical Council on Resident Education (SCORE) Portal, Anorectal module, April 27, 2026. Based on modules by Marecik S, Singh J, Dinallo AM, and Paul Olson TJ.",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=130010",
    details: "Retrieved August 12, 2026. SCORE's outline splits \"Hemorrhoids\" and \"Procedures for Hemorrhoids\" into separate curriculum entries, but ships one combined module text covering both; that module backs both Pocket Chief topics.",
  },
  {
    id: ASCRS_HEMORRHOIDS_SOURCE,
    title: "ASCRS clinical practice guidelines for the management of hemorrhoids",
    kind: "article",
    citation: "The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for the Management of Hemorrhoids. Diseases of the Colon & Rectum, May 2024. PMID 38294832.",
    suppliedAt: "2026-08-25T00:00:00.000Z",
    url: "https://pubmed.ncbi.nlm.nih.gov/38294832/",
    details: "Registered during review of the owner's packet, which cites \"ASCRS\" throughout without a year. Confirmed as the 2024 revision, and used for the recommendations the packet attributes to ASCRS: office procedures preferred over surgery for grade I-II and select grade III, caution with periprocedural anticoagulation, excisional hemorrhoidectomy as the durable option for grade III-IV, and stapled hemorrhoidopexy not routinely recommended first-line.",
  },
  {
    id: FISER_ANORECTAL_SOURCE,
    title: "Fiser ABSITE Review, 8th edition — anal and rectal chapter",
    kind: "book",
    citation: "Fiser SM. The ABSITE Review, 8th edition. Chapter 37, Anal and Rectal, pages 550-552.",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    details: "Owner-supplied chapter text. Used for the board-keyed answers the packet flags as classic: the primary through quaternary nomenclature, elliptical excision rather than lancing inside 72 hours, do not band an external hemorrhoid, and three-quadrant resection for tertiary and quaternary disease.",
  },
  {
    id: BREAST_BIOPSY_PACKET_SOURCE,
    title: "Owner-supplied percutaneous breast biopsy and cyst aspiration study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, August 25, 2026: \"Percutaneous Breast Biopsy and Cyst Aspiration Pocket Chief\".",
    suppliedAt: "2026-08-25T00:00:00.000Z",
    details: [
      "The packet names its literature in the body: ACR BI-RADS and the SSO primer on core needle biopsy, an AHRQ/Annals systematic review on stereotactic and ultrasound-guided accuracy, a RadioGraphics 2025 review on complicated versus complex cysts, NCCN 2026 on high-risk lesion excision, and a 60-study meta-analysis of vacuum-assisted versus core needle biopsy.",
      "Verified during review: the vacuum-assisted biopsy meta-analysis is the European Radiology systematic review and meta-analysis of 60 studies, and its ADH underestimation risk ratio of 0.63 (95% CI 0.55-0.72) and DCIS risk ratio of 0.47 match the packet.",
      "Corrected during review: the packet attributes selective observation of focal ADH to a \"2026 ASBrS/SBI/CAP guideline\" with five numbered criteria. A guideline under that name and year could not be confirmed - what exists is the ASBrS high-risk-lesions resource guide and the ASBrS/SBI 2025 fibroepithelial-lesion guidelines, with unified high-risk-lesion guidance still in development. The clinical substance is well supported and is carried here, but attributed to current ASBrS guidance and the supporting literature rather than to that named guideline, and the five criteria are presented as the conditions the literature applies rather than as a numbered guideline list. Pending owner sign-off.",
    ].join(" "),
  },
  {
    id: SCORE_PERCUTANEOUS_BREAST_BIOPSY_SOURCE,
    title: "SCORE curriculum module: Percutaneous Breast Biopsy and Cyst Aspiration",
    kind: "website",
    citation: "Nash A, Rosenberger L. \"Percutaneous Breast Biopsy and Cyst Aspiration.\" Surgical Council on Resident Education (SCORE) Portal, Breast module, March 12, 2025.",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=1000456",
    details: "Retrieved August 12, 2026. Supplies the keyed procedural steps for ultrasound-guided cyst aspiration and stereotactic core needle biopsy, the aspirate-management branches, and the complication list.",
  },
  {
    id: FISER_BREAST_SOURCE,
    title: "Fiser ABSITE Review, 8th edition — breast chapter",
    kind: "book",
    citation: "Fiser SM. The ABSITE Review, 8th edition. Chapter 24, Breast, pages 292-294.",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    details: "Owner-supplied chapter text. Used for the board-keyed answers that diverge from current guidance: the age-40 threshold for adding mammography to a palpable mass workup, ADH upgrade quoted as 15% to DCIS and 3% to invasive disease, and the table of lesions requiring excisional biopsy after core biopsy.",
  },
  {
    id: ACR_BIRADS_SOURCE,
    title: "ACR BI-RADS Atlas, 5th edition",
    kind: "book",
    citation: "American College of Radiology. ACR BI-RADS Atlas: Breast Imaging Reporting and Data System, 5th edition. Reston, VA: American College of Radiology.",
    suppliedAt: "2026-08-25T00:00:00.000Z",
    details: "Registered during review as the authority behind the assessment categories the packet tabulates. Where the packet and the SCORE module state the category 4 and 5 boundary differently - the packet uses the atlas convention of greater than 2% to less than 95% for category 4 and 95% or greater for category 5, while SCORE writes 2% to 94% and more than 94% - the atlas convention is carried.",
  },
  {
    id: PANCREATICODUODENECTOMY_PACKET_SOURCE,
    title: "Owner-supplied Whipple procedure study guide (board and evidence emphasis)",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, October 4, 2026: \"Whipple Procedure (Pancreaticoduodenectomy) — Pocket Chief\", the high-yield SCORE and board study guide.",
    suppliedAt: "2026-10-04T00:00:00.000Z",
    details: [
      "The first of two Whipple guides supplied together; the second, with operative-step emphasis, is registered separately. Inline author-year attributions, no bibliography.",
      "Named among them: NCCN Pancreatic Adenocarcinoma v4.2026 (registered separately), Park (JAMA 2021) on volume and vessel-contact terminology, Wu (Cochrane 2025) on morbidity, Al-Hawary (Radiology 2014) for the SAR/APA reporting template, Strobel (Nature Reviews Clinical Oncology 2019) and Stoop (Lancet 2025) on CA 19-9, Hüttner (Cochrane 2016) on pylorus preservation, Hackert (Annals of Surgery 2018) for the PROPP trial, Bassi (Surgery 2017) for the ISGPS fistula definition (registered separately), Zhang (2020) and Pacella (2026) on interventional management of hemorrhage, Preston (JAMA Surgery 2024, registered separately), the ACG biliary stricture guideline (2023) and Scheufele (Surgery 2017) on preoperative drainage, the ASGE/ACG ERCP quality indicators (2026), ASCO (2019), and Conroy (NEJM 2018, JAMA Oncology 2022) for PRODIGE-24 (registered separately).",
      "The drainage randomized trial the packet summarizes through ACG and Scheufele is van der Gaag (NEJM 2010); its 74% versus 39% serious-complication figures and the 14.6 mg/dL bilirubin exclusion match that trial.",
      "Corrected during review and pending owner sign-off: the packet attributes its fistula risk factors to a \"Schuh/PARIS trial, 2026\". The PARIS study (Schuh, Heidelberg) is real — a prospective validation of the ISGPS gland-texture and duct-size classification, protocol in BMJ Open 2022 — but a 2026 results publication could not be confirmed, so the factors are written as the four Fistula Risk Score variables, which is how the second guide states them.",
      "The packet calls pancreatic-protocol CT \"triphasic\" while describing pancreatic and portal-venous phases; the SCORE module lists noncontrast, arterial, and venous phases. Written as multiphase rather than choosing a phase count. The packet's surgeon-volume threshold of more than 20 resections a year is not carried, because it could not be traced; the center threshold of 15 to 20 is.",
      "Softened during review: the packet lists octreotide to reduce fistula output as management. That matches the SCORE module, but somatostatin analogs have not been shown to speed closure of an established fistula, and the text says so.",
      "The packet's framing of routine preoperative biliary drainage as a board-versus-current split is not carried as a split, because Fiser already keys the current answer (drainage raises wound infection without improving survival).",
    ].join(" "),
  },
  {
    id: WHIPPLE_OPERATIVE_PACKET_SOURCE,
    title: "Owner-supplied Whipple procedure study guide (operative-step emphasis)",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, October 4, 2026: \"Whipple Procedure (Pancreaticoduodenectomy) Pocket Chief\", the study guide with emphasis on operative steps, pitfalls, and per-step watch-outs.",
    suppliedAt: "2026-10-04T00:00:00.000Z",
    details: [
      "The second of two Whipple guides supplied together, and the backbone of the open pancreaticoduodenectomy playbook's twelve steps. No bibliography and almost no attributions; it names the QUANUPAD and MAPLE-PD trials and the ISGPS venous-resection classification (Bockhorn, Surgery 2014).",
      "Verified during review: QUANUPAD is Busquets (Langenbecks Archives of Surgery 2022), which found delayed gastric emptying in 50% after classic Whipple and 62% after pylorus preservation, not significant (p = 0.26). MAPLE-PD is the Japanese randomized trial of the mesenteric (artery-first) against the conventional approach, 354 patients, with no overall-survival difference (hazard ratio 1.02).",
      "Corrected during review and pending owner sign-off: the guide states an antecolic gastro- or duodenojejunostomy reduces delayed gastric emptying. Meta-analyses of randomized trials, including the 2022 Cochrane review (registered separately), find no clear difference; the playbook writes route as surgeon preference and the topic carries it as a board-versus-current row.",
      "The guide calls the GDA stump the classic cause of both early and late post-pancreatectomy hemorrhage; the first guide and the SCORE module assign it to late hemorrhage, and that is what is written. The two guides also disagree on overall morbidity (30% to 50% here, 30% to 60% in the first) and on the hepaticojejunostomy distance from the pancreaticojejunostomy (7 to 10 cm here, 5 to 10 cm in the first); the first guide's figures are carried. This guide gives the pylorus-preserving duodenal division as 2 to 3 cm in one section and 2 to 4 cm in another; 2 to 3 cm is written.",
      "Its margin statement — R0 classically at least 1 mm, NCCN historically more than 0 mm — is written as two coexisting definitions rather than an old one and a new one. Its rule to re-excise for at least 5 mm of clearance when frozen section shows tumor within 5 mm could not be traced to a guideline and is not carried.",
    ].join(" "),
  },
  {
    id: SCORE_PANCREATICODUODENECTOMY_SOURCE,
    title: "SCORE curriculum module: Pancreaticoduodenectomy",
    kind: "website",
    citation: "Abdel-Misih SR. \"Pancreaticoduodenectomy.\" Surgical Council on Resident Education (SCORE) Portal, Pancreas module, August 2, 2023.",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=145049",
    details: "Retrieved August 12, 2026. Supplies the keyed outline of operative steps, the intraoperative decisions on pylorus preservation and venous resection, preoperative preparation including the bilirubin threshold for chemotherapy and nutritional assessment, and the extraluminal-versus-intraluminal framing of post-pancreatectomy hemorrhage. Its resectability definitions match NCCN's.",
  },
  {
    id: FISER_PANCREAS_SOURCE,
    title: "Fiser ABSITE Review, 8th edition — pancreas chapter",
    kind: "book",
    citation: "Fiser SM. The ABSITE Review, 8th edition. Chapter 33, Pancreas, pages 461-485.",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    details: "Owner-supplied chapter text. Used for the board-keyed answers on pancreatic adenocarcinoma (pages 480-481): delayed gastric emptying as the most common complication treated with metoclopramide, marginal ulcer treated with a proton pump inhibitor, biopsy only for a suspicious node outside the field, and two answers that current evidence has moved — neoadjuvant chemotherapy plus radiation for borderline disease, and 20% five-year survival after resection — both written as board-versus-current rows.",
  },
  {
    id: NCCN_PANCREATIC_V4_2026_SOURCE,
    title: "NCCN clinical practice guidelines in oncology, pancreatic adenocarcinoma",
    kind: "article",
    citation: "National Comprehensive Cancer Network. NCCN clinical practice guidelines in oncology: pancreatic adenocarcinoma, version 4.2026.",
    suppliedAt: "2026-10-04T00:00:00.000Z",
    details: "Registered during review as the authority behind the resectability definitions, the adjuvant regimens, and the surveillance schedule the supplied guide quotes by name and version. Identified from that guide rather than supplied directly. The neoadjuvant indications — borderline disease, and resectable disease with high-risk features — were added during review at the owner's request, beyond both supplied guides, and are pending sign-off.",
  },
  {
    id: ISGPS_POPF_2016_SOURCE,
    title: "ISGPS 2016 definition and grading of postoperative pancreatic fistula",
    kind: "article",
    citation: "Bassi C, Marchegiani G, Dervenis C, et al. The 2016 update of the International Study Group (ISGPS) definition and grading of postoperative pancreatic fistula: 11 years after. Surgery, 2017;161(3):584-591.",
    suppliedAt: "2026-10-04T00:00:00.000Z",
    details: "Registered during review as the authority behind the fistula definition and grades both supplied guides restate. Identified from the first guide rather than supplied directly.",
  },
  {
    id: PRODIGE24_SOURCE,
    title: "PRODIGE-24/CCTG PA.6: adjuvant modified FOLFIRINOX versus gemcitabine",
    kind: "article",
    citation: "Conroy T, Hammel P, Hebbar M, et al. FOLFIRINOX or gemcitabine as adjuvant therapy for pancreatic cancer. New England Journal of Medicine, 2018;379(25):2395-2406; five-year outcomes in Conroy T, et al. JAMA Oncology, 2022;8(11):1571-1578.",
    suppliedAt: "2026-10-04T00:00:00.000Z",
    details: "Registered during review as the landmark trial behind the preferred adjuvant regimen. Identified from the first guide, which quotes the five-year update's figures: median overall survival 53.5 against 35.5 months and five-year survival 43.2% against 31.4%.",
  },
  {
    id: PRESTON_PPH_2024_SOURCE,
    title: "Hemorrhage sites and mitigation strategies after pancreaticoduodenectomy",
    kind: "article",
    citation: "Preston et al. Hemorrhage sites and mitigation strategies after pancreaticoduodenectomy. JAMA Surgery, 2024.",
    suppliedAt: "2026-10-04T00:00:00.000Z",
    details: "Registered during review as the authority behind the first guide's classic-versus-current flag on the GDA stump. Verified during review: a retrospective cohort of more than 3,000 pancreaticoduodenectomies at Memorial Sloan Kettering and Thomas Jefferson, 2011 to 2021, with a 3% hemorrhage rate, in which the GDA was the source in 16.7%; empiric GDA embolization or stenting without a visible source was associated with significant morbidity and rebleeding.",
  },
  {
    id: PREOPANC1_SOURCE,
    title: "PREOPANC: neoadjuvant chemoradiotherapy versus upfront surgery, long-term results",
    kind: "article",
    citation: "Versteijne E, van Dam JL, Suker M, et al. Neoadjuvant chemoradiotherapy versus upfront surgery for resectable and borderline resectable pancreatic cancer: long-term results of the Dutch randomized PREOPANC trial. Journal of Clinical Oncology, 2022;40(11):1220-1230.",
    suppliedAt: "2026-10-04T00:00:00.000Z",
    details: "Added during review at the owner's request, beyond both supplied guides; pending sign-off. Five-year overall survival 20.5% against 6.5%, hazard ratio 0.73, in 246 resectable and borderline patients.",
  },
  {
    id: NORPACT1_SOURCE,
    title: "NORPACT-1: neoadjuvant FOLFIRINOX versus upfront surgery for resectable pancreatic head cancer",
    kind: "article",
    citation: "Labori KJ, Bratlie SO, Andersson B, et al. Neoadjuvant FOLFIRINOX versus upfront surgery for resectable pancreatic head cancer (NORPACT-1): a multicentre, randomised, phase 2 trial. Lancet Gastroenterology and Hepatology, 2024;9(3):205-217.",
    suppliedAt: "2026-10-04T00:00:00.000Z",
    details: "Added during review at the owner's request, beyond both supplied guides; pending sign-off. Median overall survival 25.1 months with neoadjuvant FOLFIRINOX against 38.5 months with upfront surgery and adjuvant chemotherapy.",
  },
  {
    id: ALLIANCE_A021501_SOURCE,
    title: "Alliance A021501: preoperative mFOLFIRINOX with or without hypofractionated radiotherapy",
    kind: "article",
    citation: "Katz MHG, Shi Q, Meyers J, et al. Efficacy of preoperative mFOLFIRINOX vs mFOLFIRINOX plus hypofractionated radiotherapy for borderline resectable adenocarcinoma of the pancreas: the A021501 phase 2 randomized clinical trial. JAMA Oncology, 2022;8(9):1263-1270.",
    suppliedAt: "2026-10-04T00:00:00.000Z",
    details: "Added during review at the owner's request, beyond both supplied guides; pending sign-off. Chemotherapy alone produced favorable survival against the historical benchmark; the arm adding stereotactic or hypofractionated radiation did not.",
  },
  {
    id: COCHRANE_ANTECOLIC_2022_SOURCE,
    title: "Cochrane review: antecolic versus retrocolic reconstruction after pancreaticoduodenectomy",
    kind: "article",
    citation: "Hüttner FJ, Klotz R, Ulrich A, Büchler MW, Probst P, Diener MK. Antecolic versus retrocolic reconstruction after partial pancreaticoduodenectomy. Cochrane Database of Systematic Reviews, 2022, Issue 1, CD011862.",
    suppliedAt: "2026-10-04T00:00:00.000Z",
    details: "Registered during review to correct the second guide, which states that an antecolic route reduces delayed gastric emptying. Eight randomized trials and 818 participants, with no clear difference in delayed gastric emptying by route. Pending owner sign-off.",
  },
  {
    id: LEOPARD2_SOURCE,
    title: "LEOPARD-2: laparoscopic versus open pancreatoduodenectomy",
    kind: "article",
    citation: "van Hilst J, de Rooij T, Bosscha K, et al. Laparoscopic versus open pancreatoduodenectomy for pancreatic or periampullary tumours (LEOPARD-2): a multicentre, patient-blinded, randomised controlled phase 2/3 trial. Lancet Gastroenterology and Hepatology, 2019;4(3):199-207.",
    suppliedAt: "2026-10-04T00:00:00.000Z",
    details: "Added during review beyond both supplied guides, which mention minimally invasive pancreatoduodenectomy only in general terms; pending sign-off. Stopped early for safety after complication-related 90-day mortality of 10% laparoscopic against 2% open.",
  },
  {
    id: HEMODIALYSIS_CATHETER_PACKET_SOURCE,
    title: "Owner-requested hemodialysis access catheter study guide (OpenEvidence, from the SCORE notebook)",
    kind: "user_notes",
    citation: "Study document generated for Pocket Chief, October 10, 2026: \"Hemodialysis Access Catheter — Pocket Chief\", an OpenEvidence (Sackett) synthesis of a Gemini study guide drawn from the owner's SCORE notebook sources.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: [
      "Inline author-year attributions, with the 19-reference list carried in the accompanying answer: Lok (KDOQI vascular access 2019 update, AJKD 2020, registered separately); Aitken (UK Kidney Association vascular access guideline, BMC Nephrology 2025); KDIGO acute kidney injury guideline (2012); ACR Appropriateness Criteria, dialysis fistula malfunction (JACR 2023); Borgquist (CITES protocol, Trials 2023); Boulet (3SITES target-trial emulation, Critical Care 2025); O'Grady (NEJM 2023) on central-line infection prevention; Hakim (J Vasc Surg 2022, registered separately); the ACR-AIUM-SRU practice parameter for postoperative dialysis access ultrasound (2024); Flythe and Watnick (JAMA 2024); Ge (Frontiers in Cellular and Infection Microbiology 2026) on catheter bloodstream infection; Almeida (Cochrane 2022); the FDA Orange Book entry for taurolidine-heparin; Raskin (International Journal of Cardiovascular Imaging 2025) and Herscu (Annals of Vascular Surgery 2013) on translumbar and transhepatic catheters; Romagnani (Nature Reviews Disease Primers 2017); Agarwal (Seminars in Dialysis 2019); Orso (European Journal of Trauma and Emergency Surgery 2026); and Wang (Journal of International Medical Research 2022) on fibrin sheath and stenosis pathology.",
      "Verified during review: KDOQI 2019 limits nontunneled internal jugular catheters to under 2 weeks or facility policy, as expert opinion. Taurolidine-heparin lock (DefenCath) was FDA-approved on November 15, 2023, not 2024 as the packet dates its label.",
      "Not carried, because they could not be verified during review: the packet's 5-year survival of 42.9% on a catheter against 50.0% on a fistula and its 69% patency and 130% severe-infection figures, attributed to Arhuidese through the ACR criteria; only the 51% mortality increase (adjusted hazard ratio 1.51) for starting on a catheter is written. Its claim that about 11% of mature fistulas meet all three Rule-of-6 criteria is also dropped, and the Hakim finding is written qualitatively.",
      "The packet's AV graft timing (place 3 to 6 weeks before use, needs 2 to 3 weeks to incorporate) is written from the SCORE module, which gives 3 to 6 weeks before dialysis and cannulation as early as 2 weeks.",
    ].join(" "),
  },
  {
    id: SCORE_VASCULAR_ACCESS_DIALYSIS_SOURCE,
    title: "SCORE curriculum module: Vascular Access for Dialysis",
    kind: "website",
    citation: "Macsata RA. \"Vascular Access for Dialysis.\" Surgical Council on Resident Education (SCORE) Portal, Vascular Access module, March 12, 2025.",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=133775",
    details: "Retrieved August 12, 2026. Supplies the keyed temporary-catheter site choice (internal jugular recommended; femoral limits ambulation and raises infection; subclavian stenosis from intimal hyperplasia as soon as 6 weeks), short-term against long-term catheter types, permanent access at a creatinine clearance under 25 mL/min, prosthetic access 3 to 6 weeks before dialysis, and maturation by 12 weeks for autogenous and as early as 2 weeks for prosthetic access. The module's AV configurations, steal, and high-output failure are outside this catheter topic.",
  },
  {
    id: KDOQI_VASCULAR_ACCESS_2019_SOURCE,
    title: "KDOQI clinical practice guideline for vascular access: 2019 update",
    kind: "article",
    citation: "Lok CE, Huber TS, Lee T, et al. KDOQI clinical practice guideline for vascular access: 2019 update. American Journal of Kidney Diseases, 2020;75(4 Suppl 2):S1-S164.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: "Registered during review as the authority behind the dwell-time row the packet flags as board-classic versus current. Identified from the packet's reference list rather than supplied directly. The limit of nontunneled internal jugular catheters to under 2 weeks, or per facility policy, is expert opinion in the guideline.",
  },
  {
    id: HAKIM_RULE_OF_SIXES_2022_SOURCE,
    title: "Rules of 6 criteria predict dialysis fistula maturation but not all rules are equal",
    kind: "article",
    citation: "Hakim AJ, Brooke BS, Beckstrom JL, Sarfati MR, Kraiss LW. Rules of 6 criteria predict dialysis fistula maturation but not all rules are equal. Journal of Vascular Surgery, 2022.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: "Registered during review as the source the packet cites for retiring the rigid Rule of 6s. Identified from the packet's reference list rather than supplied directly. Carried qualitatively: flow volume and depth predict maturation as well as all three rules together, and vein diameter is the weakest predictor. The packet's figure of about 11% of mature fistulas meeting all three criteria could not be confirmed and is not written.",
  },
  {
    id: DVT_PACKET_SOURCE,
    title: "Owner-requested deep venous thrombosis study guide (OpenEvidence, from the SCORE notebook)",
    kind: "user_notes",
    citation: "Study document generated for Pocket Chief, October 10, 2026: \"Deep Venous Thrombosis — Pocket Chief\", an OpenEvidence (Sackett) synthesis of a Gemini study guide drawn from the owner's SCORE notebook sources, requested to cover upper and lower extremity DVT, how anatomic location changes management, and options when anticoagulation is contraindicated.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: [
      "The document carries no inline reference markers; its 26-reference list came with the accompanying answer: Kumbhani (2026 ACC scientific statement on direct oral anticoagulants, JACC 2026); Khan (Lancet 2021); Chopard (JAMA 2020); Jackson (JAMA 2022); Zuin (JACC 2024); Creager (2026 AHA/ACC multisociety acute pulmonary embolism guideline, Circulation and JACC 2026); the ACR-SIR-SPR IVC filter practice parameter (2021); Vedantham (SIR iliofemoral DVT position statement, JVIR 2023, registered separately); Meissner (SVS/AVF early thrombus removal guideline, J Vasc Surg 2012, registered separately); Goldhaber (Vascular Medicine 2021); Li (AHA open-vein scientific statement, Circulation 2025); Gauer (American Family Physician 2022); NCCN cancer-associated venous thromboembolic disease (2026); Arachchillage (British Society for Haematology HIT guideline, third edition, 2024); Shen (JAMA 2018); Ageno (Lancet Haematology 2024); the Anticoagulation Forum on cancer-associated VTE (2026); Lyon (2022 ESC cardio-oncology guideline); Palareti (WHITE study, 2022); Fontyn (Scientific Reports 2024); Renner (JACC 2020); Talasaz (JACC 2026); Streiff (Journal of Thrombosis and Thrombolysis 2016); Barnett (Vascular Medicine 2023); and Wang (Cochrane 2023).",
      "Corrected during review: the packet's location table says serial duplex surveillance of an isolated calf DVT suits a patient with mild symptoms and low bleeding risk, while its own follow-up section says high bleeding risk. The topic follows the follow-up section and CHEST, which favor surveillance when bleeding risk is high.",
      "The packet attributes the apixaban preference to the 2026 ACC DOAC statement. The statement's existence was confirmed during review but its exact apixaban wording was not, so the preference is cited to COBRRA, registered separately. The ATTRACT and SOX trial results are carried as the packet and guidelines state them; neither trial was returned as a discrete source.",
      "Added during review beyond the packet, pending sign-off: anticoagulation for at least 3 months for upper extremity DVT, and for as long as a catheter stays in place for catheter-related clot (CHEST); elevation and repeat imaging for an arm clot when anticoagulation is contraindicated; and the statement that an IVC filter cannot protect against arm clot, which follows from Fiser's teaching that PE with a filter in place arises from the SVC.",
      "The packet's megacava threshold (over 30 mm) was not carried; the topic follows the SCORE filter module, in which most filters fit a cava under 30 mm and a Bird's Nest filter or bilateral iliac filters handle a larger one.",
    ].join(" "),
  },
  {
    id: SCORE_VENOUS_THROMBOEMBOLISM_SOURCE,
    title: "SCORE curriculum module: Venous Thromboembolism",
    kind: "website",
    citation: "Costanza MJ. \"Venous Thromboembolism.\" Surgical Council on Resident Education (SCORE) Portal, Vascular Venous module, March 20, 2026.",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=133538",
    details: "Retrieved August 12, 2026. Supplies VTE epidemiology (provoked, cancer-associated, and unprovoked shares; the 7-fold cancer risk), Caprini prophylaxis tiers, the ACCP diagnostic sequence, duplex accuracy, HIT, phlegmasia and open venous thrombectomy technique, percutaneous mechanical thrombectomy from popliteal access, and follow-up figures for recurrence, residual occlusion, post-thrombotic syndrome, and the 4 mm recurrence criterion. Its anticoagulant ranking still keys LMWH for cancer-associated VTE, which the topic writes as a board-versus-current row.",
  },
  {
    id: SCORE_VENA_CAVA_FILTER_SOURCE,
    title: "SCORE curriculum module: Vena Cava Filter Insertion",
    kind: "website",
    citation: "Liao JL, Reynolds KB. \"Vena Cava Filter Insertion.\" Surgical Council on Resident Education (SCORE) Portal, Vascular Venous module, March 26, 2024.",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=134647",
    details: "Retrieved August 12, 2026. Supplies filter indications and relative indications, caval anatomy and its variants with their frequencies, suprarenal placement, femoral and jugular access, sizing, retrieval, and complications.",
  },
  {
    id: FISER_HEMATOLOGY_SOURCE,
    title: "Fiser ABSITE Review, 8th edition — Hematology",
    kind: "book",
    citation: "Fiser SM. The ABSITE Review. 8th ed. Chapter 2, Hematology, pages 16-19.",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    details: "Page-level markdown held in `Pocket Chief Resources/absite-8e/ch02_hematology.md`. Supplies the board answers on HIT (antibody, ELISA then serotonin release assay, argatroban, no platelets), the hypercoagulable states (factor V Leiden as the most common congenital, tobacco as the most common acquired, antithrombin III deficiency and heparin resistance), anticoagulation duration including lifetime therapy for unprovoked proximal DVT, IVC filter indications and infrarenal placement, and the sources of PE with a filter in place.",
  },
  {
    id: COBRRA_SOURCE,
    title: "COBRRA: bleeding risk with apixaban versus rivaroxaban in acute venous thromboembolism",
    kind: "article",
    citation: "Castellucci LA, et al. Bleeding risk with apixaban vs. rivaroxaban in acute venous thromboembolism. New England Journal of Medicine, 2026;394(11):1051-1060. doi:10.1056/NEJMoa2510703.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: "Registered during review as the trial behind the packet's apixaban preference; named in the packet and confirmed against ACC and trial-group reports. 2,760 patients with acute proximal DVT or PE randomized to 3 months of apixaban or rivaroxaban: clinically relevant bleeding 3.3% against 7.1%, with no significant difference in recurrence.",
  },
  {
    id: SIR_ILIOFEMORAL_DVT_2023_SOURCE,
    title: "Society of Interventional Radiology position statement on the endovascular management of acute iliofemoral DVT",
    kind: "article",
    citation: "Vedantham S, Desai KR, Weinberg I, et al. Society of Interventional Radiology position statement on the endovascular management of acute iliofemoral deep vein thrombosis. Journal of Vascular and Interventional Radiology, 2023.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: "Registered during review as the authority for the packet's thrombus-removal block, identified from its reference list rather than supplied directly. Carries the ATTRACT reading — no reduction in overall post-thrombotic syndrome, more bleeding, less moderate to severe disease — and the selection criteria for catheter-directed therapy.",
  },
  {
    id: SVS_AVF_EARLY_THROMBUS_REMOVAL_2012_SOURCE,
    title: "Early thrombus removal strategies for acute DVT: SVS and AVF clinical practice guidelines",
    kind: "article",
    citation: "Meissner MH, Gloviczki P, Comerota AJ, et al. Early thrombus removal strategies for acute deep venous thrombosis: clinical practice guidelines of the Society for Vascular Surgery and the American Venous Forum. Journal of Vascular Surgery, 2012.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: "Registered during review, identified from the packet's reference list rather than supplied directly. Cited for urgent thrombus removal in phlegmasia cerulea dolens, which the packet gives as a Grade 1A recommendation.",
  },
  {
    id: VENA_CAVA_FILTER_PACKET_SOURCE,
    title: "Owner-requested vena cava filter insertion study guide (OpenEvidence, from the SCORE notebook)",
    kind: "user_notes",
    citation: "Study document generated for Pocket Chief, October 10, 2026: \"Vena Cava Filter Insertion — Pocket Chief\", an OpenEvidence (Sackett) synthesis of a Gemini study guide drawn from the owner's SCORE notebook sources, requested as part of the venous-cluster batch.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: [
      "The document cites inline by author and year; its 19-reference list came with the accompanying answer: Creager (2026 AHA/ACC multisociety acute PE guideline, Circulation and JACC 2026, registered separately); Ahmed, Cifu and Paul (JAMA 2021 synopsis of the SIR filter guideline, registered separately); Zuin (JACC 2024); Konstantinides (2019 ESC PE guideline); the ACR-SIR-SPR IVC filter practice parameter (2021, registered separately); Weinberg, Kaufman and Jaff (JACC Cardiovascular Interventions 2013); Minocha (ACR Appropriateness Criteria, JACR 2019); Shin (Abdominal Radiology 2019); Spentzouris (Clinical Anatomy 2014); Ozgul (Abdominal Radiology 2021); Karaosmanoglu (2021); Alkhouli (JACC Cardiovascular Interventions 2016); Li (duplicated IVC case series, 2022); Ferro (SAFE-IVC, JAMA 2024); Warren (JAMA Internal Medicine 2023); Goswamy (JAMA Internal Medicine 2017); Kapur and Goyal (2023); and Nicholson (Archives of Internal Medicine 2010).",
      "The trial figures (PREPIC and PREPIC2; PE reduced about 50%, DVT increased about 70%, no mortality difference) and the FDA 29-to-54-day retrieval window are carried as the packet attributes them to the 2026 AHA/ACC guideline; neither the trials nor the FDA communication were opened directly.",
      "Not carried: the packet's \"PGG\" mnemonic for suprarenal placement, which is its own invention, and its 28-to-31 mm device range. The topic follows the SCORE module's under-30 mm figure; the Bird's Nest 40 mm limit was confirmed against Cook's instructions for use during review.",
    ].join(" "),
  },
  {
    id: ACR_SIR_SPR_IVC_FILTER_2021_SOURCE,
    title: "ACR-SIR-SPR practice parameter for IVC filter placement",
    kind: "article",
    citation: "American College of Radiology, Society of Interventional Radiology, Society for Pediatric Radiology. ACR-SIR-SPR Practice Parameter for the Performance of Inferior Vena Cava (IVC) Filter Placement for the Prevention of Pulmonary Embolism. Revised 2021.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: "Registered during review as the authority the packet leans on for indications, the infrarenal landing zone, pre-procedure caval assessment, and suprarenal indications; identified from the packet's reference list rather than supplied directly.",
  },
  {
    id: SIR_IVC_FILTER_GUIDELINE_JAMA_2021_SOURCE,
    title: "Inferior vena cava filters for venous thromboembolic disease (JAMA synopsis of the SIR guideline)",
    kind: "article",
    citation: "Ahmed O, Cifu AS, Paul J. Inferior vena cava filters for the treatment of patients with venous thromboembolic disease. JAMA, 2021.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: "Registered during review, identified from the packet's reference list. Summarizes the 2020 Society of Interventional Radiology clinical practice guideline: no routine filter in patients who can be anticoagulated, and no routine prophylactic filter in trauma or before major surgery.",
  },
  {
    id: AHA_ACC_PE_GUIDELINE_2026_SOURCE,
    title: "2026 AHA/ACC multisociety guideline for acute pulmonary embolism",
    kind: "article",
    citation: "Creager MA, Barnes GD, Giri J, et al. 2026 AHA/ACC/ACCP/ACEP/CHEST/SCAI/SHM/SIR/SVM/SVN Guideline for the Evaluation and Management of Acute Pulmonary Embolism in Adults. Circulation and Journal of the American College of Cardiology, 2026.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: "Registered during review, identified from the vena cava filter packet's reference list. Cited for the filter trade-off (fewer PE, more DVT, no mortality benefit, after PREPIC and PREPIC2), the preference for retrievable devices, and timely retrieval. Its exact wording was not opened directly.",
  },
  {
    id: SWOLLEN_LEG_PACKET_SOURCE,
    title: "Owner-requested swollen leg study brief and evidence audit (Gemini and OpenEvidence, from the SCORE notebook)",
    kind: "user_notes",
    citation: "Study materials generated for Pocket Chief, October 10, 2026: a Gemini study guide on the evaluation of a swollen leg drawn from the owner's SCORE notebook sources, and an OpenEvidence (Sackett) focused audit of that guide correcting decision-changing errors.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: [
      "The audit's 23 references: Stevens (CHEST VTE guideline, second update, 2021); Piazza (JAMA 2025 superficial vein thrombosis review); Gloviczki (SVS/AVF/AVLS varicose vein guideline part II, 2024); Decousus (CALISTO, NEJM 2010); Gohel (EVRA, NEJM 2018, HTA 2019, JAMA Surgery 2020); Cai (Cochrane 2023); von Keudell (Lancet 2015); the AAOS acute compartment syndrome guideline (2025); Mortensen (JAMA Surgery 2019); Davis (ACS orthopaedic trauma best practices, 2015); Broadhurst (Muscle and Nerve 2020); Wang (Cochrane 2023); Le Gal (JAMA 2026, age-adjusted D-dimer); Jackson (JAMA 2022); Chopard (JAMA 2020); Zuin (JACC 2024); Stevens and Bryant (NEJM 2017, necrotizing soft tissue infection); Chambliss (American Family Physician 2026); Li (AHA open-vein statement, 2025); Vedantham (SIR iliofemoral DVT statement, 2023); and Comerota (Circulation 2019).",
      "Corrections taken from the audit: the brief sent every swollen leg straight to duplex, and the topic risk-stratifies first; the brief keyed an absolute compartment pressure over 30 mmHg, and the topic follows delta P as the Fasciotomy topic already does; a low LRINEC score does not exclude necrotizing infection.",
      "Dropped: the brief's claim that open reconstruction of the left common iliac vein requires dividing the right common iliac artery, which the audit could not support. Superficial thrombophlebitis treatment and early ablation for venous ulcers belong to their own topics in this batch.",
    ].join(" "),
  },
  {
    id: SCORE_SWOLLEN_LEG_SOURCE,
    title: "SCORE curriculum module: Evaluation of the Swollen Leg",
    kind: "website",
    citation: "Mouawad N, Lohr J. \"Evaluation of the Swollen Leg.\" Surgical Council on Resident Education (SCORE) Portal, Vascular Venous module, March 20, 2023.",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=1000531",
    details: "Retrieved August 12, 2026. Supplies the acute (under 72 hours) versus chronic split, unilateral and bilateral causes, venous versus lymphatic examination findings, primary lymphedema by age of onset, the systemic edema laboratory panel, imaging choices, phlebolymphedema, and pitting edema grades.",
  },
  {
    id: THROMBOPHLEBITIS_PACKET_SOURCE,
    title: "Owner-requested thrombophlebitis study brief and evidence audit (Gemini and OpenEvidence, from the SCORE notebook)",
    kind: "user_notes",
    citation: "Study materials generated for Pocket Chief, October 10, 2026: a Gemini brief on thrombophlebitis drawn from the owner's SCORE notebook sources, and an OpenEvidence (Sackett) focused audit of that brief.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: [
      "The audit's references: Piazza (superficial vein thrombosis review, JAMA 2025); Stevens (CHEST VTE guideline, second update, 2021); Gloviczki (SVS/AVF/AVLS varicose vein guideline part II, 2024, registered separately); NCCN cancer-associated VTE (2026); Riat (British Society for Haematology DOAC addendum, 2022); Bontinis (network meta-analysis, Thrombosis Research 2024); Rashedi (HI-PRO post hoc, JAMA Cardiology 2026); Rouzaud (2016); Decousus (CALISTO, NEJM 2010, registered separately); Beyer-Westendorf (SURPRISE, Lancet Haematology 2017); Bauman (Surgical Infections 2019); Carrier (SOME, NEJM 2015).",
      "Corrections taken from the audit: the brief treated 5 cm and 3 cm as ablation-catheter geometry rather than thrombosis treatment thresholds, called NSAIDs first-line for saphenous clot, and gave no anticoagulant regimen. The audit gives about 25% for concomitant DVT; the 6% to 53% range from the SCORE module reflects older, heterogeneous series.",
      "Carried as a genuine disagreement: therapeutic anticoagulation for clot within 3 cm of the saphenofemoral junction runs at least 6 weeks per SVS 2023 and at least 3 months per NCCN.",
      "Not confirmed during review and therefore not written as a recommendation: the audit's statement that SVS 2023 recommends against LMWH and NSAIDs for saphenous trunk thrombosis. The topic says only that NSAIDs relieve symptoms without preventing VTE.",
      "Added during review beyond the packet, pending sign-off: the CDC guidance that adult peripheral catheters need not be replaced more often than every 72 to 96 hours, set against the SCORE module's every-3-days rule.",
    ].join(" "),
  },
  {
    id: SCORE_THROMBOPHLEBITIS_SOURCE,
    title: "SCORE curriculum module: Thrombophlebitis",
    kind: "website",
    citation: "Aziz F. \"Thrombophlebitis.\" Surgical Council on Resident Education (SCORE) Portal, Vascular Venous module, March 18, 2023.",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=143442",
    details: "Retrieved August 12, 2026. Supplies the risk factors, the 6% to 53% concomitant-DVT range, suppurative organisms and treatment, Mondor and Trousseau, no routine thrombophilia testing, high saphenous ligation near the junction, SURPRISE, and IV-site prevention. Its SURPRISE summary names enoxaparin as the comparator in one sentence and fondaparinux in the one before; the trial compared rivaroxaban with fondaparinux, and the topic writes it that way.",
  },
  {
    id: CALISTO_SOURCE,
    title: "CALISTO: fondaparinux for superficial-vein thrombosis in the legs",
    kind: "article",
    citation: "Decousus H, Prandoni P, Mismetti P, et al. Fondaparinux for the treatment of superficial-vein thrombosis in the legs. New England Journal of Medicine, 2010;363:1222-1232.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: "Registered during review, named in the thrombophlebitis audit. Patients with superficial thrombosis at least 5 cm long, excluding clot within 3 cm of the saphenofemoral junction, randomized to fondaparinux 2.5 mg daily or placebo for 45 days: symptomatic VTE, extension to the junction, or recurrence in 0.9% against 5.9%.",
  },
  {
    id: SVS_AVF_AVLS_VARICOSE_2023_SOURCE,
    title: "2023 SVS/AVF/AVLS clinical practice guidelines for varicose veins of the lower extremities",
    kind: "article",
    citation: "Gloviczki P, Lawrence PF, Wasan SM, et al. The 2023 Society for Vascular Surgery, American Venous Forum, and American Vein and Lymphatic Society clinical practice guidelines for the management of varicose veins of the lower extremities. Part I (duplex scanning and treatment of superficial truncal reflux), J Vasc Surg Venous Lymphat Disord 2023; Part II, J Vasc Surg Venous Lymphat Disord 2024.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: "Registered during review from the batch's OpenEvidence audits, which cite it by section. Thrombophlebitis uses Part II section 12.1 (anticoagulation by clot length and distance from the junction). Primary Part II sections 11–12 opened directly during batch completion; updated ARTE treatment and surveillance rules are reflected in the drafts.",
  },
  {
    id: CVI_PACKET_SOURCE,
    title: "Owner-requested venous stasis and chronic venous insufficiency study brief and evidence audit (Gemini and OpenEvidence, from the SCORE notebook)",
    kind: "user_notes",
    citation: "Study materials generated for Pocket Chief, October 10, 2026: a Gemini brief on venous stasis and chronic venous insufficiency drawn from the owner's SCORE notebook sources, and an OpenEvidence (Sackett) focused audit of that brief.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: [
      "The audit's 16 references: Goodman (JAMA 2025 guideline synopsis); Fukaya and Kolluri (NEJM 2024); Gloviczki (SVS/AVF/AVLS varicose vein guideline parts I and II, 2023 and 2024, registered separately); Cai (Cochrane 2023); Kabnick (AVF/SVS EHIT guideline, 2021); Kahn (AHA post-thrombotic syndrome statement, 2014); Khan (Lancet 2021); Meng (Thrombosis Research 2023); Duan (Frontiers in Medicine 2026); Whing (Cochrane 2021); Singer, Tassiopoulos and Kirsner (NEJM 2017); Bontinis (Journal of Endovascular Therapy 2025); Chi and Raffetto (Vascular Medicine 2015); Liu (Scientific Reports 2019); Appelen (Cochrane 2017).",
      "Corrections taken from the audit: no compression trial is required before ablating symptomatic axial reflux; early ablation with compression heals ulcers faster (EVRA, registered separately); 30 to 40 mmHg is the ulcer-healing pressure, 20 to 30 mmHg is for symptoms; ablation and stripping show no significant difference in 5-year recurrence, so the brief's 14.3% against 20.9% was not carried.",
      "Carried as contested rather than settled: whether stockings prevent post-thrombotic syndrome, with SOX negative and later meta-analyses showing a modest reduction in mild disease. The audit could not corroborate Fiser's 90% Unna boot healing figure, so the topic labels it as the board number.",
    ].join(" "),
  },
  {
    id: SCORE_CVI_SOURCE,
    title: "SCORE curriculum module: Venous Stasis and Chronic Venous Insufficiency",
    kind: "website",
    citation: "Raffetto JD. \"Venous Stasis and Chronic Venous Insufficiency.\" Surgical Council on Resident Education (SCORE) Portal, Vascular Venous module, November 2, 2023.",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=143500",
    details: "Retrieved August 12, 2026. Supplies valve closure times (500 ms superficial, profunda, tibial and perforator; 1000 ms femoral and popliteal), acute versus chronic DVT on duplex, recanalization in about half by 6 to 9 months, CEAP and VCSS, treating superficial disease first in multilevel disease, iliac stenting under IVUS for outflow obstruction, and compression as the mainstay for ulcers.",
  },
  {
    id: EVRA_SOURCE,
    title: "EVRA: early versus deferred endovenous ablation for venous ulceration",
    kind: "article",
    citation: "Gohel MS, Heatley F, Liu X, et al. A randomized trial of early endovenous ablation in venous ulceration. New England Journal of Medicine, 2018;378:2105-2114.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: "Registered during review, named in the audit. 450 patients with venous leg ulcers and superficial reflux: ablation within 2 weeks plus compression healed ulcers faster than compression with ablation deferred until healing, with a median of 56 against 82 days.",
  },
  {
    id: VARICOSE_PACKET_SOURCE,
    title: "Owner-requested varicose veins study brief and evidence audit (Gemini and OpenEvidence, from the SCORE notebook)",
    kind: "user_notes",
    citation: "Study materials generated for Pocket Chief, October 10, 2026: a Gemini brief on varicose veins drawn from the owner's SCORE notebook sources, and an OpenEvidence (Sackett) focused audit of that brief.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: [
      "The audit's 17 references: Goodman (JAMA 2025); Gloviczki (SVS/AVF/AVLS varicose vein guideline parts I and II, registered separately); Kabnick (AVF/SVS EHIT guideline, 2021, registered separately); Cai (Cochrane 2023); Gohel (EVRA, HTA 2019 and JAMA Surgery 2020); Sayarer (Scientific Reports 2026); Tort and Cosmi (Cochrane Clinical Answers 2021); Whing (Cochrane 2021); Fukaya and Kolluri (NEJM 2024); Huang (Lasers in Medical Science 2023); Bellmunt-Montoya (Cochrane 2021, CHIVA); Paravastu (Cochrane 2016); Appelen (Cochrane 2017); Ginsberg (Archives of Internal Medicine 2001).",
      "Corrections taken from the audit: no compression trial before ablating symptomatic axial reflux; EHIT management by class rather than anticoagulation for any extension; and the recurrence figures. The SCORE module's 14.3% after ablation and 20.9% after stripping is kept as the board number, set against pooled trials showing no clear difference and a single 10-year series favoring surgery at the groin.",
      "The audit's class III EHIT entry reads antiplatelet or anticoagulation; the topic writes it that way without choosing, pending sign-off.",
    ].join(" "),
  },
  {
    id: SCORE_VARICOSE_SOURCE,
    title: "SCORE curriculum module: Varicose Veins",
    kind: "website",
    citation: "Gasparis AP, Kokkosis AA. \"Varicose Veins.\" Surgical Council on Resident Education (SCORE) Portal, Vascular Venous module, March 20, 2023.",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=143575",
    details: "Retrieved August 12, 2026. Supplies superficial, perforating and deep anatomy and variants, the three mechanisms of venous disease, the history and examination, CEAP, compression types, treatment by vein type, complications of stripping, ablation, phlebectomy and sclerotherapy, and the 20.9% against 14.3% recurrence comparison. Its line that valvular insufficiency accounts for 85% of \"cardiovascular disease\" means chronic venous disease.",
  },
  {
    id: AVF_SVS_EHIT_2021_SOURCE,
    title: "Classification and treatment of endothermal heat-induced thrombosis (AVF and SVS)",
    kind: "article",
    citation: "Kabnick LS, Sadek M, Bjarnason H, et al. Classification and treatment of endothermal heat-induced thrombosis: recommendations from the American Venous Forum and the Society for Vascular Surgery. Journal of Vascular Surgery: Venous and Lymphatic Disorders and Phlebology, 2021.",
    suppliedAt: "2026-10-10T00:00:00.000Z",
    details: "Registered during review from the batch's OpenEvidence audits, which cite it for the four EHIT classes and their class-dependent treatment. Older EHIT tier definitions were checked against the newer Part II recommendations; class III requires therapeutic anticoagulation.",
  },
  {
    id: TEMPORAL_ARTERY_BIOPSY_PLAYBOOK_SOURCE,
    title: "User-supplied temporal artery biopsy attending playbook",
    kind: "user_notes",
    citation: "Attending procedure playbook supplied to Pocket Chief, September 10, 2026.",
    suppliedAt: "2026-09-10T00:00:00.000Z",
    details: "The document names the 2021 ACR/Vasculitis Foundation guideline, the EULAR recommendations, the 2022 ACR/EULAR classification criteria and the GAME study, but supplies no bibliography — its tables cite bracketed numbers with no key. The bracket numbers are dropped here rather than reproduced without a reference list, and the whole guide is cited to the supplied document rather than to works the owner did not supply.",
  },
  {
    id: CEA_BOVINE_PATCH_PLAYBOOK_SOURCE,
    title: "User-supplied carotid endarterectomy procedure guide",
    kind: "user_notes",
    citation: "Procedure guide for carotid endarterectomy with bovine pericardial patch angioplasty, supplied to Pocket Chief, September 10, 2026.",
    suppliedAt: "2026-09-10T00:00:00.000Z",
    details: "Carries inline author-year attributions rather than a numbered bibliography. The named societies are registered separately where a block leans on one of them specifically; everything else is cited to this document.",
  },
  {
    id: SVS_CAROTID_2022_SOURCE,
    title: "Society for Vascular Surgery carotid disease guideline and implementation document",
    kind: "article",
    citation: "AbuRahma AF, Avgerinos ED, Chang RW, et al. Society for Vascular Surgery clinical practice guidelines for management of extracranial cerebrovascular disease, and the accompanying implementation document. Journal of Vascular Surgery, 2022;75(1S):4S-22S and 26S-98S.",
    suppliedAt: "2026-09-10T00:00:00.000Z",
    details: "Registered during review as the authority the supplied guide attributes its selection thresholds, timing windows and cranial-nerve figures to. Identified from that document rather than supplied directly, so page-level detail was not available. The full author and journal citation was added on October 11, 2026, when the carotid topics began citing it for CEA as first-line treatment and for TCAR over transfemoral stenting in high-surgical-risk patients; both positions were confirmed from secondary summaries of the guideline, not its full text.",
  },
  {
    id: FEMPOP_BYPASS_PLAYBOOK_SOURCE,
    title: "User-supplied femoropopliteal bypass attending playbook",
    kind: "user_notes",
    citation: "Attending-level procedure playbook for open femoropopliteal bypass, supplied to Pocket Chief, September 10, 2026.",
    suppliedAt: "2026-09-10T00:00:00.000Z",
    details: "The most fully referenced of the three supplied guides, with a closing source list. The two society guidelines it leans on hardest are registered separately; trial-level claims such as BEST-CLI and BASIL-2 are cited to this document, which is what was supplied.",
  },
  {
    id: ACC_AHA_PAD_2024_SOURCE,
    title: "ACC/AHA lower extremity peripheral artery disease guideline",
    kind: "article",
    citation: "Gornik HL, et al. 2024 ACC/AHA guideline for the management of lower extremity peripheral artery disease. Journal of the American College of Cardiology, 2024.",
    suppliedAt: "2026-09-10T00:00:00.000Z",
    details: "Registered during review as the authority behind the conduit and revascularization class recommendations the supplied playbook quotes. Identified from that playbook rather than supplied directly.",
  },
  {
    id: ESC_ESVS_PAD_2024_SOURCE,
    title: "ESC/ESVS peripheral arterial and aortic disease guideline",
    kind: "article",
    citation: "Mazzolai L, et al. 2024 ESC guidelines for the management of peripheral arterial and aortic diseases. European Heart Journal, 2024.",
    suppliedAt: "2026-09-10T00:00:00.000Z",
    details: "Registered during review as the European counterpart the supplied playbook cites where it differs from ACC/AHA — notably the endovascular-first position for shorter femoropopliteal occlusions. Identified from that playbook rather than supplied directly.",
  },
  {
    id: RTAPP_INGUINAL_PLAYBOOK_SOURCE,
    title: "User-supplied robotic TAPP inguinal hernia attending playbook",
    kind: "user_notes",
    citation: "Attending procedure playbook for robotic transabdominal preperitoneal inguinal hernia repair, supplied to Pocket Chief, September 11, 2026.",
    suppliedAt: "2026-09-11T00:00:00.000Z",
    details: "Carries inline author-year attributions throughout rather than a numbered bibliography. Named among them: Rosenberg (Nature Reviews Disease Primers 2025), the RIVAL randomized trial by way of Rodriguez Valladares (Hernia 2025), de'Angelis (Surgical Endoscopy 2024), Claus (Surgical Endoscopy 2020) for the inverted-Y and five-triangles scheme, Gantner (Surgical Endoscopy 2024), Kudsi (Hernia 2022), Mikhail (Hernia 2024), Croghan (JAMA Surgery 2023) for the RETAINER I retention data, and Montgomery (JAMA 2018). HerniaSurge is registered separately as the guideline several blocks lean on directly; everything else is cited to this document. Added during review and pending sign-off: the mesh-weight block states the divergence between HerniaSurge's lightweight-mesh position for open anterior repair and the newer network-meta position favouring heavier mesh in laparo-endoscopic repair, which the supplied document flattened into a single recommendation.",
  },
  {
    id: HERNIASURGE_2018_SOURCE,
    title: "HerniaSurge international guidelines for groin hernia management",
    kind: "article",
    citation: "HerniaSurge Group. International guidelines for groin hernia management. Hernia, 2018;22(1):1-165.",
    suppliedAt: "2026-09-11T00:00:00.000Z",
    details: "Registered during review as the authority the supplied playbook attributes its antibiotic-prophylaxis and mesh positions to. Identified from that playbook rather than supplied directly, so recommendation-level numbering was not available.",
  },
  {
    id: TOTAL_THYROIDECTOMY_PLAYBOOK_SOURCE,
    title: "User-supplied total thyroidectomy attending playbook",
    kind: "user_notes",
    citation: "Attending procedure playbook for total thyroidectomy, supplied to Pocket Chief, September 11, 2026.",
    suppliedAt: "2026-09-11T00:00:00.000Z",
    details: "Inline author-year attributions, no bibliography. Named among them: Monfared (Laryngoscope 2002) for the cricothyroid-joint landmark, Fundakowski (AHNS 2018) for the recurrent laryngeal nerve statement, Cernea's external-branch classification by way of Zhang (Surgical Endoscopy 2021), Siu (JAMA Surgery 2019) for energy devices, Cirocchi (Cochrane 2019) and Abdelhamid (British Journal of Surgery 2021) for the neuromonitoring split, Medas (Otolaryngology Head and Neck Surgery 2021) and Squires (Journal of Surgical Research 2024) on prophylaxis, Dixon (World Journal of Surgery 2014) and Shaha (Journal of Surgical Oncology 1994) on bedside hematoma decompression, and an ATA ambulatory-surgery statement dated 2026. The 2025 ATA guideline is registered separately. Everything else is cited to this document.",
  },
  {
    id: ATA_THYROID_2025_SOURCE,
    title: "American Thyroid Association guideline on differentiated thyroid cancer",
    kind: "article",
    citation: "Ringel MD, et al. 2025 American Thyroid Association management guidelines for adult patients with thyroid nodules and differentiated thyroid cancer. Thyroid, 2025.",
    suppliedAt: "2026-09-11T00:00:00.000Z",
    details: "Registered during review as the authority behind the extent-of-resection thresholds, the parathyroid-preservation recommendation and the loss-of-signal staging position the supplied playbook quotes by recommendation number. Identified from that playbook rather than supplied directly.",
  },
  {
    id: MASTECTOMY_SLNB_PLAYBOOK_SOURCE,
    title: "User-supplied simple mastectomy with sentinel node biopsy attending playbook",
    kind: "user_notes",
    citation: "Attending procedure playbook for total (simple) mastectomy with sentinel lymph node biopsy, supplied to Pocket Chief, September 11, 2026.",
    suppliedAt: "2026-09-11T00:00:00.000Z",
    details: "Inline author-year attributions, no bibliography. Named among them: Boyle (Society of Surgical Oncology 2025), Jatoi (Lancet Oncology 2016) for the mapping-agent meta-analysis, Stradling (Archives of Surgery 2001) on flap thickness, Cirocchi (World Journal of Surgery Oncology 2024) and Cui (Scientific Reports 2018) on the intercostobrachial nerve, Che Bakri (Annals of Surgery 2023) on lymphedema, and the SOUND and INSEMA trials by way of Gentilini (JAMA Oncology 2023) and Reimer (New England Journal of Medicine 2025). NCCN Breast Cancer v6.2026 and the ASCO/ASTRO axillary guideline are registered separately. Corrected during review and pending sign-off: the document cited Jatoi both for dual tracer lowering the false-negative rate against single agents and for that meta-analysis finding no difference between isotope alone and isotope plus dye. The reconcilable reading — dye alone is inferior, dual against isotope alone is a wash — is what is written, with the disagreement kept in its own block. The document also states it found no breast-specific antibiotic-prophylaxis guideline; that admission is preserved rather than papered over.",
  },
  {
    id: NCCN_BREAST_V6_2026_SOURCE,
    title: "NCCN clinical practice guidelines in oncology, breast cancer",
    kind: "article",
    citation: "National Comprehensive Cancer Network. NCCN clinical practice guidelines in oncology: breast cancer, version 6.2026.",
    suppliedAt: "2026-09-11T00:00:00.000Z",
    details: "Registered during review as the authority behind the staging, axillary-management and clipped-node recommendations the supplied playbook quotes by name. Identified from that playbook rather than supplied directly.",
  },
  {
    id: ASCO_ASTRO_AXILLA_2025_SOURCE,
    title: "ASCO/ASTRO guideline on axillary management in early-stage breast cancer",
    kind: "article",
    citation: "Park HS, et al. Management of the axilla in early-stage breast cancer: ASCO/ASTRO guideline update, 2025.",
    suppliedAt: "2026-09-11T00:00:00.000Z",
    details: "Registered during review as the authority behind the sentinel-node indications, the special-circumstance list and the three-or-more-positive-nodes position the supplied playbook quotes. Identified from that playbook rather than supplied directly.",
  },
  {
    id: ROBOTIC_CHOLECYSTECTOMY_PLAYBOOK_SOURCE,
    title: "User-supplied robotic cholecystectomy attending playbook",
    kind: "user_notes",
    citation: "Attending procedure playbook for multiport and single-port robotic cholecystectomy, supplied to Pocket Chief, September 11, 2026.",
    suppliedAt: "2026-09-11T00:00:00.000Z",
    details: "Inline author-year attributions, no bibliography. The document opens by declaring the bile-duct-injury evidence contested and refusing to resolve it; that framing is preserved. Named among them: Kalata (JAMA Surgery 2023) and Mullens (JAMA Surgery 2026) on the higher-injury signal, Kandil (Journal of the American College of Surgeons 2026) and Abou Assali (Surgical Endoscopy 2025) on the equivalent-or-lower signal, Tang (Medicine 2025), Iskandar (Surgical Endoscopy 2021) on the node of Lund, Villani (JAMA Surgery 2026) on B-SAFE, Papagoras (Surgical Endoscopy 2025) on variant anatomy, and Choi and Celotto (both Surgical Endoscopy 2026) on the single-port platform. The SAGES safe-cholecystectomy statement and the WSES 2020 guideline are registered separately. Corrected during review and pending sign-off: the document lists B-SAFE as four landmarks, collapsing the hepatic artery and the umbilical fissure into one item — all five are written out here. Its acute-cholecystitis timing sentence also mixed two clocks; the WSES formulation is written instead.",
  },
  {
    id: SAGES_SAFE_CHOLECYSTECTOMY_SOURCE,
    title: "SAGES safe cholecystectomy program and multi-society consensus",
    kind: "article",
    citation: "Porter KK, et al. Multi-society consensus and the SAGES safe cholecystectomy framework for the prevention of bile duct injury. Surgical Endoscopy, 2026.",
    suppliedAt: "2026-09-11T00:00:00.000Z",
    details: "Registered during review as the authority behind the critical view of safety criteria and the six-step safety framework the supplied playbook quotes and returns to throughout. Identified from that playbook rather than supplied directly.",
  },
  {
    id: WSES_ACUTE_CALCULOUS_CHOLECYSTITIS_2020_SOURCE,
    title: "WSES guidelines on acute calculous cholecystitis",
    kind: "article",
    citation: "Pisano M, de'Angelis N, et al. 2020 World Society of Emergency Surgery updated guidelines for the diagnosis and treatment of acute calculous cholecystitis. World Journal of Emergency Surgery, 2021;16:1.",
    suppliedAt: "2026-09-11T00:00:00.000Z",
    details: "Registered during review as the authority behind the graded timing, bailout and at-risk-condition statements the supplied playbook quotes with GRADE levels. Identified from that playbook rather than supplied directly.",
  },
  {
    id: RIGHT_HEMICOLECTOMY_PLAYBOOK_SOURCE,
    title: "User-supplied right hemicolectomy attending playbook",
    kind: "user_notes",
    citation: "Attending operative playbook for right hemicolectomy, supplied to Pocket Chief, September 11, 2026.",
    suppliedAt: "2026-09-11T00:00:00.000Z",
    details: "Inline author-year attributions, no bibliography. Named among them: Sagorin (Surgical Endoscopy 2026), Strey (Surgical Endoscopy 2018) for the duodenum-from-below critical view, Negoi (Scientific Reports 2018) on the gastrocolic trunk, Al-Taher (Surgical Endoscopy 2022) on approach preference, the RELARC trial and Benz (British Journal of Surgery 2022) against Diaz-Vico (Annals of Surgical Oncology 2021) on central radicality, the Allaix (Annals of Surgery 2019), Bollo (British Journal of Surgery 2020) and Dohrn (Annals of Surgery 2022) trials on anastomotic route, the ICG-COLORAL trial by way of Rinne (JAMA Surgery 2025), and NCCN appendiceal and neuroendocrine guidelines. The ASCRS/SAGES enhanced-recovery guideline is registered separately. Its major-step flow diagram was drawn as ASCII art and flattened to a single line by the extractor; it is rebuilt here as a flow block.",
  },
  {
    id: ASCRS_SAGES_ERAS_2023_SOURCE,
    title: "ASCRS/SAGES enhanced recovery after colorectal surgery guideline",
    kind: "article",
    citation: "Irani JL, et al. Clinical practice guidelines for enhanced recovery after colon and rectal surgery from the American Society of Colon and Rectal Surgeons and the Society of American Gastrointestinal and Endoscopic Surgeons. Surgical Endoscopy, 2023.",
    suppliedAt: "2026-09-11T00:00:00.000Z",
    details: "Registered during review as the authority behind the bowel-preparation and prophylaxis recommendations the supplied playbooks quote with strength and quality ratings. Identified from those playbooks rather than supplied directly.",
  },
  {
    id: COLOSTOMY_TAKEDOWN_PLAYBOOK_SOURCE,
    title: "User-supplied colostomy takedown with parastomal hernia repair attending playbook",
    kind: "user_notes",
    citation: "Attending operative playbook for colostomy takedown with parastomal hernia repair, supplied to Pocket Chief, September 11, 2026.",
    suppliedAt: "2026-09-11T00:00:00.000Z",
    details: "Inline author-year attributions, no bibliography, and a closing section headed as evidence conflicts not to harmonize — that instruction is honoured. Named among them: Chereau (Langenbecks Archives of Surgery 2018), Trepanier (Surgical Endoscopy 2017) on the transanal-assisted rendezvous, Hansson (Annals of Surgery 2012) and Kritharides (2023) on mesh configuration, the Maskal randomized trial (JAMA Surgery 2024), Tabibian (PLoS One 2025), Yalkin (BioMed Research International 2022), Holland (Surgical Endoscopy 2025), and the AGA clinical practice update on ostomies (2023). The ASCRS ostomy guideline is registered separately. Corrected during review and pending sign-off: the eponym is Deloyers, spelled without the final s in the document, and the Toupet attribution on the transmesenteric route is demoted to a parenthetical because it is thinly attached.",
  },
  {
    id: ROBOTIC_VENTRAL_HERNIA_PLAYBOOK_SOURCE,
    title: "User-supplied robotic ventral and umbilical hernia repair attending playbook",
    kind: "user_notes",
    citation: "Attending procedure playbook for robotic ventral, umbilical, epigastric and incisional hernia repair with mesh, covering the rIPOM+, rTAPP and retromuscular variants, supplied to Pocket Chief, September 13, 2026.",
    suppliedAt: "2026-09-13T00:00:00.000Z",
    details: "Inline author-year attributions throughout, no numbered bibliography. Named among them: Albutt and Fagenholz and Clement and Altom (both JOMI 2023) and Liu (JOMI eTEP video 2024) for the operative narrative, Petro (JAMA Surgery 2021) for PROVE-IT, Dhanani (Annals of Surgery 2023), Almiron da R Soares (Journal of the American College of Surgeons 2025) for the 34-trial network meta-analysis, Dhal (Hernia 2026) for the no-single-superior-technique conclusion, de'Angelis (Surgical Endoscopy 2024), Morrell (Hernia 2021) and Pacheco (Hernia 2024) on crossover, Ramana, Arora and Belyansky (Hernia 2021) for the lamppost sign, Gokcal (Surgical Endoscopy 2020) and Grossi (Hernia 2021) on transversus abdominis release, Christoffersen (Surgical Endoscopy 2023), da Silveira (Hernia 2026), Al-Salemi (Hernia 2025), Mikhail (Hernia 2024) on overlap, Love (Surgical Endoscopy 2026) and Zaman (Hernia 2023) on eTEP, Fortelny by way of the International Endohernia Society guidelines (Surgical Endoscopy 2019) on fixation, Arias-Espinosa (Surgical Endoscopy 2024) on robotic endoscopic onlay, Bronswijk (Hernia 2022) on cirrhosis, Ayuso (Langenbecks Archives of Surgery 2023) on imaging, Warren (American Journal of Surgery 2020) and Kao (Plastic and Reconstructive Surgery 2018) on mesh salvage, Woo (Surgical Endoscopy 2025) on venous thromboembolism after component separation, and Al-Mansour, Holland and Rosenberg on preoperative optimization. The EHS/Americas Hernia Society umbilical guideline, the SAGES prophylaxis guideline and the WSES emergency-hernia guidelines are registered separately. Corrected during review and pending sign-off: the document attributes the EHS/Americas Hernia Society umbilical and epigastric guideline to Köckerling (Hernia 2021); the guideline itself is Henriksen (British Journal of Surgery 2020), and it is cited that way here. Its mesh-overlap recommendation was also flattened to a single 3 cm figure, where the guideline suggests 2 cm for the smallest defects and 3 cm for medium ones. The evidence block states the Dhanani two-year recurrence figures, 4 per cent robotic against 13 per cent laparoscopic, which the document reduced to no clear advantage without giving the numbers or the fact that the comparison was underpowered. The mesh-salvage figures are written as the source reports them — 65 per cent overall and 72 per cent for extraperitoneal macroporous polypropylene, against no salvage at all for composite and PTFE — rather than as the single blended range the document gave.",
  },
  {
    id: EHS_AHS_UMBILICAL_2020_SOURCE,
    title: "European Hernia Society and Americas Hernia Society guidelines for umbilical and epigastric hernias",
    kind: "article",
    citation: "Henriksen NA, et al. Guidelines for treatment of umbilical and epigastric hernias from the European Hernia Society and Americas Hernia Society. British Journal of Surgery, 2020;107(3):171-190.",
    suppliedAt: "2026-09-13T00:00:00.000Z",
    details: "Registered during review as the authority behind the mesh-for-all position, the defect-size framework and the preperitoneal flat-mesh recommendation the supplied playbook quotes. Identified from that playbook rather than supplied directly, and re-attributed: the playbook credits Köckerling (Hernia 2021) for this guideline.",
  },
  {
    id: SAGES_HERNIA_PROPHYLAXIS_2016_SOURCE,
    title: "SAGES guidelines for laparoscopic ventral hernia repair",
    kind: "article",
    citation: "Earle D, et al. SAGES guidelines for laparoscopic ventral hernia repair. Surgical Endoscopy, 2016;30(8):3163-3183.",
    suppliedAt: "2026-09-13T00:00:00.000Z",
    details: "Registered during review as the authority behind the antibiotic-prophylaxis recommendation and the enterotomy-management position the supplied playbook attributes to it. Identified from that playbook rather than supplied directly. The playbook notes that this evidence base derives from open repair, which is preserved.",
  },
  {
    id: WSES_EMERGENCY_HERNIA_SOURCE,
    title: "WSES guidelines on emergency repair of complicated abdominal wall hernias",
    kind: "article",
    citation: "De Simone B, et al. Emergency repair of complicated abdominal wall hernias: WSES guidelines. Hernia, 2020;24(2):359-368; updated as Sermonesi G, et al. Cesena guidelines, World Journal of Emergency Surgery, 2023.",
    suppliedAt: "2026-09-13T00:00:00.000Z",
    details: "Registered during review as the authority behind the strangulation-prediction markers and the contaminated-field and incarceration positions the supplied playbook quotes. Identified from that playbook rather than supplied directly; the playbook cites the 2020 guideline and its 2023 Cesena update together, and both are folded into this entry.",
  },
  {
    id: ASCRS_OSTOMY_2022_SOURCE,
    title: "ASCRS clinical practice guideline for ostomy surgery",
    kind: "article",
    citation: "American Society of Colon and Rectal Surgeons clinical practice guidelines for ostomy surgery. Diseases of the Colon and Rectum, 2022.",
    suppliedAt: "2026-09-11T00:00:00.000Z",
    details: "Registered during review as the authority behind the purse-string closure recommendation, the suture-only recurrence figure, the reversal leak rates and the mesh-infection rates the supplied playbook quotes with strength and quality ratings. Identified from that playbook rather than supplied directly. Also cited by the bowel ostomy topics (October 21, 2026) for loop ileostomy and loop colostomy both being effective diversion, no routine support rods in nonobese loop ileostomy, mesh for parastomal hernia repair and against routine prophylactic mesh, selective omission of contrast enema before closure, and early closure in selected patients (Davis BR et al., Dis Colon Rectum 2022;65(10):1173–1190, recommendations 5, 7, 8, 11, 12, 16).",
  },
  {
    id: SCORE_CAROTID_DISEASE_SOURCE,
    title: "SCORE module: Carotid Artery Disease",
    kind: "website",
    citation: "Healy L, Amankwah KS. Carotid Artery Disease. SCORE Curriculum, Arterial Disease module, Surgical Council on Resident Education, April 25, 2024. https://www.surgicalcore.org/modulecontent.aspx?id=149545",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=149545",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: [
      "The full module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/`. Supplies the pathophysiology, risk factors, presentation, the imaging sequence, the symptomatic and asymptomatic stroke figures, the revascularization thresholds, preoperative workup, best medical therapy and surveillance.",
      "Read against current guidance during review: the module asks a life expectancy over 5 years of symptomatic patients and only over 2 years of asymptomatic ones, which inverts the logic of the trials, since the asymptomatic benefit accrues slowly. The topic carries both figures in its board-versus-current table and follows ESVS 2023 for asymptomatic disease. Its statement that stroke is the third leading cause of US death is out of date and was not carried; Fiser's fifth is used. Its surveillance schedule (every 6 months for 2 years) differs from the companion procedures module, and the procedures topic says so.",
      "Its stroke-type section is empty in the retrieved text.",
    ].join(" "),
  },
  {
    id: SCORE_CAROTID_PROCEDURES_SOURCE,
    title: "SCORE module: Procedures for Carotid Artery Stenosis",
    kind: "website",
    citation: "Healy L, Amankwah KS. Procedures for Carotid Artery Stenosis. SCORE Curriculum, Arterial Disease module, Surgical Council on Resident Education, September 14, 2023. https://www.surgicalcore.org/modulecontent.aspx?id=150413",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=150413",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: [
      "The full module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/`. Supplies the indications, preoperative management, operative anatomy and high exposure, cerebral monitoring and shunt triggers, heparin dosing, the ICE clamp order, patch and eversion technique, completion assessment, one-line descriptions of transfemoral stenting and TCAR, the complications and their management, and the surveillance schedule with restenosis timing.",
      "Corrected during review: the module lists prior endarterectomy, radical neck dissection or irradiation, tracheostomy, a high or inaccessible lesion, contralateral vocal cord paralysis and high surgical risk under the words \"CEA should be considered\". Every one of them is a reason to favor stenting over endarterectomy, as Fiser, the SVS guideline and the module's own TF-CAS and TCAR sentence imply, so the topic writes them as indications for stenting.",
    ].join(" "),
  },
  {
    id: ESVS_CAROTID_2023_SOURCE,
    title: "ESVS 2023 guideline: atherosclerotic carotid and vertebral artery disease",
    kind: "article",
    citation: "Naylor R, Rantner B, Ancetti S, et al. European Society for Vascular Surgery (ESVS) 2023 Clinical Practice Guidelines on the Management of Atherosclerotic Carotid and Vertebral Artery Disease. European Journal of Vascular and Endovascular Surgery, 2023;65(1):7-111.",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: "Registered during review, from web research on October 11, 2026, as the authority for the 14-day target after a neurologic event and for selective intervention in asymptomatic 60 to 99% stenosis with one or more higher-risk features, a life expectancy over 5 years and a 30-day stroke or death risk of 3% or less. The full text was not retrieved; these positions and the examples of higher-risk features (silent infarction, progression, intraplaque hemorrhage, impaired cerebrovascular reserve, spontaneous embolization on transcranial Doppler, contralateral TIA or stroke) come from published summaries and a 2022 multispecialty statement, pending the owner's sign-off.",
  },
  {
    id: CREST2_SOURCE,
    title: "CREST-2 trial",
    kind: "article",
    citation: "Brott TG, Howard G, Lal BK, et al.; CREST-2 Investigators. Medical management and revascularization for asymptomatic carotid stenosis. New England Journal of Medicine, 2026;394(3):219-231 (published online November 21, 2025). doi:10.1056/NEJMoa2508800",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: "Registered during review from web research on October 11, 2026. Two parallel trials in asymptomatic stenosis of 70% or more. Primary outcome: any stroke or death to 44 days, or ipsilateral ischemic stroke to 4 years. Stenting plus intensive medical management 2.8% against 6.0% for intensive medical management alone (P=0.02); endarterectomy 3.7% against 5.3% (P=0.24). Figures confirmed against trial reports, not the full paper.",
  },
  {
    id: NASCET_SOURCE,
    title: "NASCET",
    kind: "article",
    citation: "North American Symptomatic Carotid Endarterectomy Trial Collaborators. Beneficial effect of carotid endarterectomy in symptomatic patients with high-grade carotid stenosis. New England Journal of Medicine, 1991;325:445-453; and Barnett HJM, et al. Benefit of carotid endarterectomy in patients with symptomatic moderate or severe stenosis. New England Journal of Medicine, 1998;339:1415-1425.",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: "Registered during review as the trial the SCORE procedures module names for the symptomatic threshold. The figures are the published ones: 2-year ipsilateral stroke 26% medical against 9% surgical for 70 to 99% stenosis, and 5-year 22.2% against 15.7% for 50 to 69%.",
  },
  {
    id: ACAS_SOURCE,
    title: "ACAS",
    kind: "article",
    citation: "Executive Committee for the Asymptomatic Carotid Atherosclerosis Study. Endarterectomy for asymptomatic carotid artery stenosis. JAMA, 1995;273(18):1421-1428.",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: "Registered during review as the trial the SCORE procedures module names for the asymptomatic threshold. Projected 5-year ipsilateral stroke or any perioperative stroke or death: 5.1% surgical against 11.0% medical, in stenosis of 60% or more.",
  },
  {
    id: CREST_SOURCE,
    title: "CREST",
    kind: "article",
    citation: "Brott TG, Hobson RW 2nd, Howard G, et al. Stenting versus endarterectomy for treatment of carotid-artery stenosis. New England Journal of Medicine, 2010;363(1):11-23.",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: "Registered during review. Composite of periprocedural stroke, myocardial infarction or death and later ipsilateral stroke: 7.2% stenting against 6.8% endarterectomy, not significantly different; periprocedural stroke 4.1% against 2.3%, myocardial infarction 1.1% against 2.3%; outcomes favored stenting below roughly age 70 and endarterectomy above it.",
  },
  {
    id: CMS_CAROTID_STENTING_2023_SOURCE,
    title: "CMS national coverage decision on carotid artery stenting, 2023",
    kind: "website",
    citation: "Centers for Medicare & Medicaid Services. Final decision memo, National Coverage Determination 20.7: percutaneous transluminal angioplasty of the carotid artery concurrent with stenting, October 11, 2023.",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: "Registered during review from web research on October 11, 2026. Coverage of carotid stenting for symptomatic stenosis of 50% or more and asymptomatic stenosis of 70% or more, extended to standard-surgical-risk patients, facility certification removed, and formal shared decision-making required before the procedure. Confirmed from society and trade-press summaries of the memo rather than the memo text itself.",
  },
  {
    id: ROADSTER_SOURCE,
    title: "ROADSTER trial",
    kind: "article",
    citation: "Kwolek CJ, Jaff MR, Leal JI, et al. Results of the ROADSTER multicenter trial of transcarotid stenting with dynamic flow reversal. Journal of Vascular Surgery, 2015;62(5):1227-1234.",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: "Registered during review. The pivotal single-arm trial of the ENROUTE system in high-surgical-risk patients; 30-day stroke 1.4% in the intention-to-treat population and 0.7% per protocol, as reported in trial summaries.",
  },
  {
    id: ROADSTER2_SOURCE,
    title: "ROADSTER 2 study",
    kind: "article",
    citation: "Kashyap VS, Schneider PA, Foteh M, et al. Early outcomes in the ROADSTER 2 study of transcarotid artery revascularization in patients with significant carotid artery disease. Stroke, 2020;51(9):2620-2629.",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: "Registered during review; figures taken from the published abstract. 692 high-risk patients (intention to treat) at 43 sites, 632 per protocol, 81.2% of operators new to TCAR. Intention to treat: stroke 1.9%, death 0.4%, myocardial infarction 0.9%, stroke or death 2.3%, stroke, death or myocardial infarction 3.2%. Per protocol: stroke 0.6%, stroke or death 0.8%, stroke, death or myocardial infarction 1.7%. The authors credit protocol adherence and periprocedural antiplatelet therapy for the better per-protocol results.",
  },
  {
    id: VQI_TCAR_VS_TFCAS_2019_SOURCE,
    title: "TCAR versus transfemoral stenting in the Vascular Quality Initiative",
    kind: "article",
    citation: "Schermerhorn ML, Liang P, Eldrup-Jorgensen J, et al. Association of transcarotid artery revascularization vs transfemoral carotid artery stenting with stroke or death among patients with carotid artery stenosis. JAMA, 2019;322(23):2313-2322.",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: "Registered during review. Propensity-matched registry analysis, 3,286 pairs: in-hospital stroke or death 1.6% with TCAR against 3.1% with transfemoral stenting, stroke 1.3% against 2.4%, death 0.4% against 1.0%. Exploratory and observational; the lead author disclosed consulting for the device maker.",
  },
  {
    id: ENROUTE_LABELING_SOURCE,
    title: "ENROUTE transcarotid neuroprotection and stent system labeling",
    kind: "website",
    citation: "Silk Road Medical / Boston Scientific. ENROUTE Transcarotid Neuroprotection System and ENROUTE Transcarotid Stent System: indications, contraindications, warnings and precautions (FDA 510(k) K143072 and successors). https://www.bostonscientific.com/en-US/medical-specialties/vascular-surgery/enroute-transcarotid-neuroprotection-system/indications-enroute-transcarotid-neuroprotection-system.html",
    url: "https://www.bostonscientific.com/en-US/medical-specialties/vascular-surgery/enroute-transcarotid-neuroprotection-system/indications-enroute-transcarotid-neuroprotection-system.html",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: "Registered during review from the manufacturer's published indications page and 510(k) summaries, not the full instructions for use. Anatomic criteria: common carotid reference diameter of at least 6 mm, bifurcation at least 5 cm above the clavicle, adequate femoral venous access, vessels compatible with 8F sheaths; stent reference diameter 4 to 9 mm. Contraindications: antiplatelet or anticoagulant therapy contraindicated, unresolved bleeding disorder, and (in the NPS PLUS labeling) severe ipsilateral common carotid disease. Precaution: severe contralateral or ipsilateral posterior disease may limit cerebral flow during reversal. Device labeling changes; check the current instructions for use.",
  },
  {
    id: TCAR_TECHNIQUE_2017_SOURCE,
    title: "Technical aspects of TCAR with the ENROUTE system",
    kind: "article",
    citation: "Malas MB, Leal J, Kashyap V, Cambria RP, Kwolek CJ, Criado E. Technical aspects of transcarotid artery revascularization using the ENROUTE transcarotid neuroprotection and stent system. Journal of Vascular Surgery, 2017;65(3):916-920.",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: "Registered during review as the technique reference for the TCAR playbook. The publisher blocked full-text retrieval; the abstract was read directly and the step details used (positioning as for endarterectomy, C-arm at the head of the bed for oblique views, radial arterial line, umbilical-tape traction for the puncture, micropuncture wire 2 to 3 cm and sheath 1.5 to 2 cm, the wire kept short of the lesion, the arterial sheath to its 2.5 cm stopper with the tip confirmed in two projections, and aggressive predilation under reversal) were confirmed from a search summary of the article. Pending the owner's sign-off.",
  },
  {
    id: DE_BORST_TCAR_2023_SOURCE,
    title: "Transcarotid artery revascularization: an evidence appraisal",
    kind: "article",
    citation: "de Borst GJ, et al. Transcarotid artery revascularization. British Journal of Surgery, 2023;110:127 (published online 2022). PMC10364484.",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: "Registered during review; the full text was read. Supplies FDA approval in 2015 with mandatory registry entry, the 2022 label expansion to standard-risk patients, the absence of any randomized comparison with endarterectomy or transfemoral stenting, registry in-hospital endpoints understating 30-day risk by 20 to 25%, up to a third of patients being anatomically unsuitable, a 2.8-fold odds of in-hospital stroke or death after a recent stroke in the TCAR Surveillance Project, and the guideline position that endarterectomy remains first choice after recent symptoms.",
  },
  {
    id: TCAR_HEMODYNAMICS_2018_SOURCE,
    title: "Periprocedural hemodynamic management for TCAR",
    kind: "article",
    citation: "Jaff MR, Kokkosis AA, Leal JI, Macdonald S. Periprocedural hemodynamic management for transcarotid artery revascularization. Endovascular Today, August 2018 supplement (sponsored by Silk Road Medical).",
    url: "https://evtoday.com/articles/2018-aug-supplement/periprocedural-hemodynamic-management-for-transcarotid-artery-revascularization",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: "Registered during review; the article was read directly. Supplies the systolic target of 140 to 160 mm Hg during flow reversal, the reasoning that reversal depends on the carotid-to-femoral-vein pressure difference and collateral inflow, hemodynamic instability in up to 55% after endarterectomy and bradycardia or hypotension in up to 76% after stenting lasting 12 to 24 hours, and prophylactic atropine 0.5 mg before balloon inflation. Industry-sponsored; the authors disclose consulting for the device maker.",
  },
  {
    id: TCAR_ANESTHESIA_2020_SOURCE,
    title: "Anesthetic considerations for TCAR",
    kind: "article",
    citation: "Ankam A, Kinthala S, Madabhushi P, et al. Anesthetic considerations for transcarotid artery revascularization: experience and review of forty cases from a single medical center. Cureus, 2020;12(12):e12250.",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: "Registered during review; the full text was read. Supplies the description of the flow-reversal circuit (a short common carotid sheath kept proximal to the bifurcation, a filtered shunt to a femoral vein sheath, and clamping of the common carotid proximal to the sheath), the choice of general, regional or monitored anesthesia, and the need to watch the neck and groin for hematoma in a heparinized patient on dual antiplatelet therapy.",
  },
  {
    id: CAROTID_DISEASE_OE_SOURCE,
    title: "Owner-supplied carotid artery disease study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 11, 2026: \"Carotid Artery Disease — Pocket Chief\", an OpenEvidence synthesis provided as a Word document to check the first draft of this topic.",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions and no numbered reference list. Works it cites: Mac Grory (Circulation Research 2022); AbuRahma (SVS guideline and implementation document 2022, and Journal of Vascular Surgery 2024); Brott (2011 multisociety guideline); Kawahara (Journal of Vascular Surgery 2026, the 2023 IAC duplex criteria); the 2024 ESC guideline; Zierler (Vascular Medicine 2026); Rothwell's pooled NASCET/ECST analysis; Kleindorfer (2021 AHA/ASA secondary prevention guideline); Cui (Stroke 2022); White (JACC 2022); Otite (JAMA Neurology 2018); Furie and Kelly (NEJM 2026); Malas (Journal of Vascular Surgery 2026); Straus (2024); Liang (JAMA Neurology 2023, registered separately); Kamel and Josephson (JAMA Neurology 2026); and, for its trauma section, Saitta, Shields, Wagner and the ACR Appropriateness Criteria.",
      "Corrected during review: the document says CREST-2 results are awaited; they were published in November 2025 and are carried from the trial paper. Its NASCET figure of 24% against 7% was not used; the topic keeps the trial's published 26% against 9%, which the companion procedures document also gives.",
      "Not carried: the blunt cerebrovascular injury section, which belongs to the neck trauma topics that already hold Biffl grading; the internal carotid ligation stroke figure the document itself flags as uncorroborated; prevalence by age and sex; and a symptomatic stenting meta-analysis that could not be checked.",
      "Its share of ischemic strokes from carotid disease (about 10%) differs from the SCORE module's 20% and is written as a board-versus-current row. Additions from this document are pending the owner's sign-off.",
    ].join(" "),
  },
  {
    id: CAROTID_PROCEDURES_OE_SOURCE,
    title: "Owner-supplied carotid procedures study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 11, 2026: \"Procedures for Carotid Artery Stenosis — Pocket Chief\", an OpenEvidence synthesis provided as a Word document to check the first draft of this topic.",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: [
      "Carries MLA-style in-text attributions and no numbered reference list. Works it cites: AbuRahma (SVS guideline and implementation document 2022); Mac Grory (Circulation Research 2022); Brott (JACC 2011 and NEJM 2026); Cui (Stroke 2022); Zierler (Vascular Medicine 2026); Mazzolai (2024 ESC guideline); Bonati (Lancet Neurology 2022); Furie and Kelly (NEJM 2026); Chaer (SVS perioperative care guide 2023); Rerkasem (Cochrane 2020); Fereydooni (JAMA Surgery 2019); Diener and Hankey (JACC 2020); Prakash (Interventional Cardiology 2022); Al-Bayati (Neurology 2021); Orrapin (Cochrane 2022); AbuRahma and Darling (2021); Chuatrakoon (Cochrane 2022); Calligaro and Dougherty (2005); Chia (Annals of Vascular Surgery 2020); Müller (Cochrane 2020); Mead (International Journal of Stroke 2023); Schermerhorn (JAMA 2019); Columbo (JAHA 2022) and Liang (JAMA Neurology 2023), both registered separately; Caron (Journal of Vascular Surgery 2026); Kakisis (EJVES 2017); Leary and Varade (2020).",
      "Corrected during review: the document says CREST-2 enrolled asymptomatic 50 to 99% stenosis; the trial abstract confirms 70% or greater. Its LDL target of \"under 70 mg/dL (1.4 mmol/L or less)\" mixes two targets, since 70 mg/dL is 1.8 mmol/L and 1.4 mmol/L is the ESC target; only 70 mg/dL is carried. The 1-year stroke-or-death figures it attributes to Columbo 2022 (6.4%, 9.7%, 5.2%) are not in that paper's abstract, which reports perioperative 2.0% for TCAR, 1.7% for endarterectomy and 3.7% for transfemoral stenting with no 1-year difference between TCAR and endarterectomy; the abstract's figures are used. Liang 2023's noninferiority is carried together with the 1-year ipsilateral stroke excess (1.6% against 1.1%) the document leaves out.",
      "Not carried because they could not be traced: CREST patching figures (1.2% against 4% stroke, 3.1% against 10.7% restenosis), a 13-trial meta-analysis's relative risks, and a 20% early recurrence within 72 hours. This document gives hyperperfusion mortality once it bleeds as about 38% and the TCAR playbook document as over 50%; the topic carries the range. Additions are pending the owner's sign-off.",
    ].join(" "),
  },
  {
    id: TCAR_PLAYBOOK_OE_SOURCE,
    title: "Owner-supplied TCAR operative guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Operative guide supplied to Pocket Chief, October 11, 2026: \"Transcarotid Artery Revascularization (TCAR) — Pocket Chief Playbook\", an OpenEvidence synthesis provided as a Word document to check the first draft of this playbook.",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: [
      "Carries in-text attributions and no numbered reference list. Works it cites: Malas (Journal of Vascular Surgery 2017, registered separately); AbuRahma (SVS guideline and implementation document 2022); Jim (Annals of Neurology 2026, ROADSTER 3); Liang (JAMA Neurology 2023, registered separately); Kashyap (Stroke 2020); Straus (Annals of Surgery 2024 and Journal of Vascular Surgery 2024); Hamouda (Journal of Vascular Surgery 2025); Paraskevas (Angiology 2025; Progress in Cardiovascular Diseases 2022); Rerkasem (Cochrane 2020); Sanchez-Calderin (Journal of Vascular Surgery 2026); Wu (Journal of Vascular Surgery 2019, 2023 and 2026); Loufopoulos (Angiology 2025); Prakash (2022); Brott (NEJM 2026; JACC 2011); Al-Bayati (Neurology 2021); Bonati (Lancet Neurology 2022); the 2007 ACCF carotid stenting consensus; Pérez-Sánchez (Journal of Endovascular Therapy 2024); Roosendaal (Journal of Endovascular Therapy 2025); Teter (Annals of Vascular Surgery 2022); Kenny (Journal of Vascular Surgery 2025); Hsu (Annals of Vascular Surgery 2023); Leary (2020); Caron (Journal of Vascular Surgery 2026); Columbo (JAHA 2022); Baghbani (Journal of Vascular Surgery 2026).",
      "Reconciled during review: Malas 2017 keeps the wire short of the lesion and predilates aggressively under reversal; this document prefers engaging the external carotid when it is open, because stopping short roughly doubles common carotid dissection (Wu 2026), and predilates selectively. The playbook follows this document. The device stopper sets 2.5 cm of sheath insertion; the document places the tip 1.5 to 2 cm below the bifurcation; both are kept.",
      "Carried as attributed in the document and not checked against primary sources, pending the owner's sign-off: the ROADSTER 3 details, the common carotid dissection rate of about 1.2%, the 1-in-8 conversion to general anesthesia, the SVS depth-to-landing-zone ratio, the 3-to-14-day window, the protamine guidance, the high-risk physiologic criteria and the hyperperfusion risk factors. Not carried: the template operative note, and the CREST-2 clopidogrel dose, which reads as 75 mg twice daily and could not be confirmed.",
    ].join(" "),
  },
  {
    id: TCAR_VS_CEA_STANDARD_RISK_2023_SOURCE,
    title: "TCAR versus endarterectomy in standard-risk patients",
    kind: "article",
    citation: "Liang P, Cronenwett JL, Secemsky EA, et al. Risk of stroke, death, and myocardial infarction following transcarotid artery revascularization vs carotid endarterectomy in patients with standard surgical risk. JAMA Neurology, 2023;80:437-444.",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: "Registered during review after the OpenEvidence documents cited it; the abstract was read. Vascular Quality Initiative, 2,962 TCAR patients matched 1:3 with 8,886 endarterectomies: 30-day stroke, death or myocardial infarction or 1-year ipsilateral stroke 3.0% against 2.6% (not significant); 1-year ipsilateral stroke 1.6% against 1.1% (P = .02); no difference in 1-year mortality.",
  },
  {
    id: VQI_TCAR_CEA_TFCAS_2022_SOURCE,
    title: "TCAR, endarterectomy and transfemoral stenting compared in the Vascular Quality Initiative",
    kind: "article",
    citation: "Columbo JA, Martinez-Camblor P, Stone DH, Goodney PP, O'Malley AJ. Procedural safety comparison between transcarotid artery revascularization, carotid endarterectomy, and carotid stenting: perioperative and 1-year rates of stroke or death. Journal of the American Heart Association, 2022;11:e024964.",
    suppliedAt: "2026-10-11T00:00:00.000Z",
    details: "Registered during review after the OpenEvidence documents cited it; the abstract was read. 21,234 TCAR, 82,737 endarterectomy and 14,595 transfemoral stenting patients: perioperative stroke or death 2.0%, 1.7% and 3.7%. At 1 year, instrumental-variable analysis found no difference between TCAR and endarterectomy (HR 0.97) and more stroke or death after transfemoral stenting (HR 1.45); symptomatic patients did best with TCAR.",
  },
  {
    id: SCORE_VASCULAR_ACCESS_SOURCE,
    title: "SCORE curriculum module: Vascular Access",
    kind: "website",
    citation: "Noorbakhsh MR, Cragun BN. \"Vascular Access.\" Surgical Council on Resident Education (SCORE) Portal, Surgical Critical Care module, March 12, 2025.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=1000512",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: "Local module retrieved August 12, 2026. Supplies CVC and arterial-line indications, the keyed site rules (subclavian for cervical collar, tracheostomy or prolonged dwell; internal jugular when the clavicle is fractured), ScvO2 under 65% as malperfusion, the Allen test, and PA catheter waveforms. Three statements are carried as source errors in the topic's split block rather than as fact: IVC collapse over 50% \"with ventilated respirations\" (collapsibility applies to spontaneous breathing), a pulse pressure variation \"normal range\" of 65 to 70% (the SvO2 range, apparently misplaced under PPV), and iatrogenic pneumothorax managed with tube thoracostomy and arterial cannulation corrected by catheter removal with direct pressure, both stated without the size and bore qualifications current practice applies.",
  },
  {
    id: SCORE_US_VASCULAR_ACCESS_SOURCE,
    title: "SCORE curriculum module: Ultrasound Use for Intravascular Access",
    kind: "website",
    citation: "Rinderknecht T, Salcedo E. \"Ultrasound Use for Intravascular Access.\" Surgical Council on Resident Education (SCORE) Portal, Surgical Critical Care module, March 12, 2025.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=163873",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: "Local module retrieved August 12, 2026. Supplies the benefits and limits of ultrasound guidance, pre-scan preparation, Trendelenburg to distend the vein, and troubleshooting. Most of the topic's numbers come from the OpenEvidence document.",
  },
  {
    id: SCORE_AV_GRAFT_FISTULA_SOURCE,
    title: "SCORE curriculum module: Arteriovenous Graft and Fistula",
    kind: "website",
    citation: "Silva M, Soden P. \"Arteriovenous Graft and Fistula.\" Surgical Council on Resident Education (SCORE) Portal, Vascular Access module, December 10, 2025. Based on a previous module by Tanya R. Flohr.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=133899",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: "Local module retrieved August 12, 2026. Supplies the keyed numbers: fistula 6 months and graft 3 to 6 weeks before dialysis, vein over 2.5 mm and artery over 2 mm, depth within 6 mm, fistula ready at 6 to 12 weeks and graft at 2 to 3 weeks, the rule of sixes, saphenous vein over 3 mm, Dacron not suggested because ePTFE tolerates repeated puncture better, and the two steal strategies (flow reduction by banding or RUDI, digital flow augmentation by DRIL or proximalization of arterial inflow).",
  },
  {
    id: SCORE_VENOUS_ACCESS_DEVICES_SOURCE,
    title: "SCORE curriculum module: Venous Access Devices Insertion",
    kind: "website",
    citation: "Schmidt L, Karhadkar SS. \"Venous Access Devices Insertion.\" Surgical Council on Resident Education (SCORE) Portal, Vascular Access module, March 12, 2025.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=163653",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: "Local module retrieved August 12, 2026. Supplies the keyed intraoperative rules: a wire that tracks up the internal jugular, ultrasound or the ipsilateral internal jugular after a failed subclavian pass, and a chest radiograph before any contralateral attempt. Its statement that chemotherapy ports most commonly go in the subclavian vein is carried as the board answer in the split block; current series favor the internal jugular.",
  },
  {
    id: SCORE_RENAL_FAILURE_SOURCE,
    title: "SCORE curriculum module: Renal Failure",
    kind: "website",
    citation: "Chandhrasekhar D, Kanneganti S. \"Renal Failure.\" Surgical Council on Resident Education (SCORE) Portal, Surgical Critical Care module, July 7, 2026. Based on a previous module by Glen A. Franklin and Nicholas A. Nash.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=140716",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: "Local module retrieved August 12, 2026. Supplies nephron physiology, GFR, creatinine clearance and cystatin C, prerenal, intrinsic and postrenal AKI, history and examination, urine studies (FENa under 1% or FEUrea under 35% prerenal; FENa over 2% or FEUrea over 50% intrinsic), imaging, supportive care, AEIOU, HD against CRRT, contrast risk by eGFR, and mortality (2.5 to 64% overall, up to 50% with dialysis, 26% non-oliguric against 50% oliguric, RIFLE relative risks 2.4, 4.15 and 6.37). The module's KDIGO and RIFLE tables did not survive the local scrape; the topic's staging tables follow KDIGO 2012 and the original RIFLE criteria, added from general knowledge and pending Zach's sign-off. The module cites a March 2026 KDIGO update; as of October 2026 that is a public-review draft, and the 2012 staging stands. Its line \"for hypovolemia, replace losses with hypotonic fluids\" is carried as a source error in the split block; KDIGO recommends isotonic crystalloid. The split block also sets the module's protein advice (1 to 2 g/kg/day, unrestricted) beside the KDIGO 2012 tiers (0.8 to 1.0 g/kg/day without dialysis, 1.0 to 1.5 on intermittent dialysis, up to 1.7 on CRRT or when hypercatabolic), added from general knowledge and pending Zach's sign-off.",
  },
  {
    id: FISER_CRITICAL_CARE_SOURCE,
    title: "Fiser ABSITE Review, 8th edition — Critical Care",
    kind: "book",
    citation: "Fiser SM. The ABSITE Review. 8th ed. Chapter 16, Critical Care, pages 188-207.",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: "Page-level markdown of the chapter, held in `Pocket Chief Resources/absite-8e/ch16_critical-care.md`. Supplies the keyed numbers: SvO2 75 ± 5%, wedge 11 ± 4 mm Hg, zone III placement, wedge readings at end-expiration, catheter distances to wedge (right subclavian 45 cm, right internal jugular 50 cm, left subclavian 55 cm, left internal jugular 60 cm), hemoptysis after flushing treated with more PEEP, a chest radiograph for desaturation after a central line, and air embolism treated head down and rolled to the left with aspiration through the line.",
  },
  {
    id: FISER_FLUIDS_ELECTROLYTES_SOURCE,
    title: "Fiser ABSITE Review, 8th edition — Fluids and Electrolytes",
    kind: "book",
    citation: "Fiser SM. The ABSITE Review. 8th ed. Chapter 9, Fluids and Electrolytes, pages 77-95.",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: "Page-level markdown of the chapter, held in `Pocket Chief Resources/absite-8e/ch09_fluids-and-electrolytes.md`. Supplies the acute renal failure keys: FENa as the best test for azotemia, prerenal FENa under 1%, urine sodium under 20, BUN to creatinine over 20 and urine osmolality over 500, 70% of renal mass lost before creatinine and BUN rise, and the older contrast and myoglobin advice (bicarbonate and N-acetylcysteine; alkalinize the urine), which the topic carries as board answers overtaken by trial evidence.",
  },
  {
    id: RENAL_FAILURE_OE_SOURCE,
    title: "Owner-supplied renal failure study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 12, 2026: \"Renal Failure Pocket Chief\", an OpenEvidence correction of a SCORE notebook draft provided as a Word document.",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions and no numbered reference list. Works it cites include Ostermann (Lancet 2025), Hoste (Nature Reviews Nephrology 2018), Singri (JAMA 2003), Miller (Annals of Internal Medicine 1978), Abdelhafez (CJASN 2022), Renaghan and Rosner (2022), the ACR Manual on Contrast Media (2025), Mehran (NEJM 2019), PRESERVE, Kellum (Nature Reviews Disease Primers 2021), Jentzer (JACC 2020), the STARRT-AKI, AKIKI, AKIKI-2, IDEAL-ICU and ELAIN trials, Gaudry and Palevsky (NEJM 2022), and Wald (Intensive Care Medicine 2023).",
      "Not carried: about half the document covers trauma and burn material owned by other topics — the lethal triad, burn resuscitation formulas, abdominal compartment syndrome grading and management, neurogenic shock, rhabdomyolysis urine targets, and succinylcholine timing. The topic links to those topics instead. The SCORE Renal Failure module covers none of it.",
    ].join(" "),
  },
  {
    id: DIALYSIS_ACCESS_OE_SOURCE,
    title: "Owner-supplied vascular access for dialysis study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 12, 2026: \"Vascular Access for Dialysis Pocket Chief\", an OpenEvidence correction of a SCORE notebook draft provided as a Word document.",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions and no numbered reference list. Works it cites include the 2019 KDOQI update, Sidawy (SVS guideline, Journal of Vascular Surgery 2008), Lok (JAMA 2024), Hurwitz (JAMA Surgery 2026), Aitken (UK guideline, BMC Nephrology 2025), Flythe and Watnick (JAMA 2024), Ravani (JASN 2013), Allon (CJASN 2026), Leake (Journal of Vascular Surgery 2015), Basile and Lomonte (Seminars in Dialysis 2018), Arhuidese (Journal of Vascular Surgery 2018), the ACR-AIUM-SRU vessel-mapping parameter (2021), and the Haskal stent-graft trial.",
      "Corrected during review: the document expands RUDI as \"revascularization using distal inflow\"; it is revision using distal inflow (Minion 2005, and the SCORE module).",
    ].join(" "),
  },
  {
    id: AV_ACCESS_OE_SOURCE,
    title: "Owner-supplied AV graft and fistula study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 12, 2026: \"AV Graft and Fistula Pocket Chief\", an OpenEvidence correction of a SCORE notebook draft provided as a Word document.",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions and no numbered reference list. Works it cites include the 2019 KDOQI update, Lok (JAMA 2024), Smith (Vascular Medicine 2026), the UK Kidney Association guideline (2025), Hakim (Journal of Vascular Surgery 2022), Leake (Journal of Vascular Surgery 2015), Hurwitz (JAMA Surgery 2026), Pflederer (2008), Kakisis (Journal of Vascular Surgery 2017), Al Shakarchi (EJVES 2015), Kim (Journal of Vascular Surgery 2025), and Mehta (Annals of Vascular Surgery 2026).",
      "Two documents disagree on fistula timing: this one gives mean maturation of 3 to 4 months for forearm and 4 to 6 weeks for upper-arm fistulas and defines non-maturation at 6 months despite intervention, while the companion dialysis document gives 3 to 6 months overall and assesses failure to mature at about 3 months. The topics carry both as ranges rather than pick one.",
      "Its claim that Dacron is not singled out in current literature is softened: the SCORE module does say Dacron is not suggested because ePTFE tolerates repeated puncture better. The topics say ePTFE is the prosthetic of choice and Dacron is not used, without calling it absolutely contraindicated.",
    ].join(" "),
  },
  {
    id: VASCULAR_ACCESS_OE_SOURCE,
    title: "Owner-supplied vascular access and hemodynamic monitoring study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 12, 2026: \"Vascular Access & Hemodynamic Monitoring — Pocket Chief\", an OpenEvidence correction of a SCORE notebook draft provided as a Word document.",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions and no numbered reference list. Works it cites include Buetti (SHEA/IDSA 2022), O'Grady (NEJM 2023 and CDC 2011), Boulet (3SITES target-trial emulation, Critical Care 2025), Teja (JAMA Internal Medicine 2024), Mason (AHA transradial statement 2018), Saugel (Critical Care 2020), Chaves (Critical Care 2024), Marik (Critical Care Medicine 2009), Martin (AAST 2019), Monnet (Intensive Care Medicine 2016), Meco (Anesthesia & Analgesia 2026), the PRISM meta-analysis (NEJM 2017), Rajaram (Cochrane 2013), Kadosh (JACC Heart Failure 2023), Rooke (ACC/AHA 2013), Kearney and Shabot (Chest 1995), and Kalra (Catheterization and Cardiovascular Interventions 2013).",
      "Not verified during review: the document says the 2025 AHA guidelines and the Undersea and Hyperbaric Medical Society no longer recommend head-down positioning for venous air embolism (citing Cao, AHA 2025). A search found no AHA document saying so. The topic writes the positioning debate without that attribution: left lateral decubitus relocates air on echocardiography but has not been shown to improve hemodynamics, and head-down positioning may worsen cerebral edema in arterial gas embolism.",
      "Its femoral pseudoaneurysm thresholds and thrombin injection detail were not carried; the topic keeps only the access-related part.",
    ].join(" "),
  },
  {
    id: US_VASCULAR_ACCESS_OE_SOURCE,
    title: "Owner-supplied ultrasound for vascular access study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 12, 2026: \"Ultrasound for Vascular Access — Pocket Chief\", an OpenEvidence correction of a SCORE notebook draft provided as a Word document.",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions and no numbered reference list. Works it cites include the ASE guidelines (2011 and 2025), SCCM (2015), SHM (2019), ASA (2020), Brass (Cochrane 2015), Zawadka (Critical Care Medicine 2023), Teja (JAMA Internal Medicine 2024), d'Entremont (Circulation Cardiovascular Interventions 2024), FAUST (Seto, JACC Cardiovascular Interventions 2010), UNIVERSAL (Jolly, JAMA Cardiology 2022), Strauss (Cochrane 2025), Boulet (Critical Care 2024 and 2025), and Beshara (Critical Care 2024).",
      "The document could not verify the American College of Surgeons recommendation the draft credited, and neither could this review; the topic cites ASA, SCCM, SHM and ASE instead.",
    ].join(" "),
  },
  {
    id: VENOUS_ACCESS_DEVICES_OE_SOURCE,
    title: "Owner-supplied venous access devices study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 12, 2026: \"Venous Access Devices — Pocket Chief\", an OpenEvidence correction of a SCORE notebook draft provided as a Word document.",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: "Ends in a 26-entry MLA reference list, folded in here rather than registered one by one: O'Grady (NEJM 2023; CDC 2011), Buetti (SHEA/IDSA 2022), Teja (JAMA Internal Medicine 2024), Cosme (Intensive Care Medicine 2024), Boulet (Critical Care 2025), Arvaniti (Critical Care Medicine 2017), NCCN cancer-associated VTE v1.2026, Malgor (American Venous Forum upper-extremity DVT guideline 2026), King (Journal of Thrombosis and Thrombolysis 2025), Böll (Annals of Hematology 2021), Lok (KDOQI 2020; JAMA 2024), Tong (JAMA 2025), Norris (IDSA OPAT 2019), Chopra (MAGIC 2015; JAMA 2025), Baskin (Lancet 2009), Rashedi (JACC 2025), Mirza (American Surgeon 2004), Verhage (Seminars in Dialysis 2008), Bartolini and Burger (Neurology 2015), Worthington (ASPEN 2017), Nguyen (Journal of Intensive Care Medicine 2025), Mo (World Journal of Surgery 2020), and Vegas (ASE 2025).",
  },
  {
    id: STARRT_AKI_2020_SOURCE,
    title: "STARRT-AKI: timing of renal-replacement therapy in acute kidney injury",
    kind: "article",
    citation: "STARRT-AKI Investigators. Timing of initiation of renal-replacement therapy in acute kidney injury. New England Journal of Medicine, 2020;383:240-251.",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: "Registered during review as the authority behind the RRT-timing row, identified from the OpenEvidence document rather than supplied directly. 3,019 critically ill patients with severe AKI: 90-day mortality 43.9% accelerated against 43.7% standard; 38% of the standard arm never received RRT; more 90-day RRT dependence after accelerated initiation (10.4% against 6.0%).",
  },
  {
    id: SHEA_CLABSI_2022_SOURCE,
    title: "SHEA/IDSA/APIC strategies to prevent CLABSI: 2022 update",
    kind: "article",
    citation: "Buetti N, Marschall J, Drees M, et al. Strategies to prevent central line-associated bloodstream infections in acute-care hospitals: 2022 Update. Infection Control & Hospital Epidemiology, 2022;43:553-569.",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: "Registered during review as the authority behind the insertion bundle and the chlorhexidine row, identified from the OpenEvidence documents rather than supplied directly. Essential practices: hand hygiene, maximal sterile barriers, alcoholic chlorhexidine skin antisepsis (over 0.5% in the CDC 2011 guideline; the OpenEvidence documents give at least 2% in alcohol, the usual commercial preparation), avoiding the femoral site in adults when insertion is planned, ultrasound guidance, and no routine replacement on a schedule.",
  },
  {
    id: MAGIC_2015_SOURCE,
    title: "Michigan Appropriateness Guide for Intravenous Catheters (MAGIC)",
    kind: "article",
    citation: "Chopra V, Flanders SA, Saint S, et al. The Michigan Appropriateness Guide for Intravenous Catheters (MAGIC): results from a multispecialty panel using the RAND/UCLA appropriateness method. Annals of Internal Medicine, 2015;163(6 Suppl):S1-S40.",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: "Registered during review as the authority behind the kidney-disease PICC rule, identified from the OpenEvidence document rather than supplied directly. Rates PICCs inappropriate in chronic kidney disease stage 3b or worse (eGFR under 45 mL/min); a small-bore tunneled jugular catheter is the preferred alternative when central access is needed.",
  },
  {
    id: ASA_CENTRAL_VENOUS_ACCESS_2020_SOURCE,
    title: "ASA practice guidelines for central venous access 2020",
    kind: "article",
    citation: "American Society of Anesthesiologists Task Force on Central Venous Access. Practice guidelines for central venous access 2020. Anesthesiology, 2020;132:8-43.",
    suppliedAt: "2026-10-12T00:00:00.000Z",
    details: "Registered during review as the authority behind the guideline row on ultrasound by site, identified from the OpenEvidence document rather than supplied directly: real-time ultrasound recommended for internal jugular access and suggested when feasible for subclavian and femoral access, static ultrasound for pre-puncture localization, and confirmation of venous placement before dilation.",
  },
  {
    id: SCORE_HEPATIC_ABSCESS_SOURCE,
    title: "SCORE curriculum module: Hepatic Abscess",
    kind: "website",
    citation: "Ayala CI, Brubaker A, Dua M. \"Hepatic Abscess.\" Surgical Council on Resident Education (SCORE) Portal, Liver module, March 19, 2026.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=135320",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: "Local module retrieved August 12, 2026. Supplies the five bacterial routes (biliary, portal, arterial, traumatic or procedural, adjacent extension) plus cryptogenic, the comorbidities that raise risk, monomicrobial organisms (E. coli, K. pneumoniae, S. anginosus), blood cultures positive in about 50%, ultrasound as screen and contrast CT as gold standard, gas in about 20%, multiple bacterial or fungal lesions against a single subdiaphragmatic amebic one, antibiotic choices and the 2 to 6 week course, antibiotics alone under 3 cm, aspiration under 5 cm with about 50% re-aspiration, metronidazole or tinidazole then a luminal agent, fungal superinfection of pyogenic abscess, albendazole alone for a simple cyst under 5 cm, periprocedural albendazole from 4 hours before PAIR to at least 28 days after, and pyogenic mortality of 2 to 12%.",
  },
  {
    id: SCORE_HEPATIC_ABSCESS_DRAINAGE_SOURCE,
    title: "SCORE curriculum module: Hepatic Abscess Drainage",
    kind: "website",
    citation: "Cho EE, Jeyarajah R. \"Hepatic Abscess Drainage.\" Surgical Council on Resident Education (SCORE) Portal, Liver module, October 30, 2023.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=144743",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: "Local module retrieved August 12, 2026. Supplies indications and contraindications for percutaneous drainage (ascites, proximity to the diaphragm, viscous pus and thick loculations), catheter over needle as first line with aspiration reserved for simple unilocular abscesses under 5 cm, primary and secondary indications for surgical drainage, laparoscopic port placement and open incisions, preprocedure preparation, the 8 to 14 Fr pigtail technique, the maneuvers that cause bacteremia, amebic aspiration indications (secondary infection in about 15%) and the advantage of catheter drainage over 10 cm, catheter blockage and migration as the commonest complications, and repeat imaging at 1 to 2 weeks.",
  },
  {
    id: SCORE_PRIMARY_HEPATIC_NEOPLASMS_SOURCE,
    title: "SCORE curriculum module: Primary Hepatic Neoplasms",
    kind: "website",
    citation: "Ngongoni RF, Ayala CI, Dua MM. \"Primary Hepatic Neoplasms.\" Surgical Council on Resident Education (SCORE) Portal, Liver module, February 10, 2026.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=1000493",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: "Local module retrieved August 12, 2026. Supplies the benign lesion epidemiology and imaging (hemangioma peripheral nodular then centripetal; FNH homogeneous arterial with a central scar; adenoma early arterial enhancement then isoattenuation in portal and delayed phases; cystadenoma), adenoma management (stop hormones, resect when symptomatic, over 5 cm, in men, or in pregnancy), HCC as 75% of primary malignancy, risk factors, AASLD surveillance with ultrasound and AFP every 6 months and multiphase imaging for nodules of 1 cm or more, biopsy reserved for equivocal imaging, Milan criteria, portal vein embolization at 4 to 6 weeks, ablation under 3 cm, TACE and Y-90, BILCAP capecitabine, and outcomes. Its line that sorafenib is first-line for advanced HCC is carried as a board answer overtaken by IMbrave150.",
  },
  {
    id: SCORE_METASTATIC_HEPATIC_NEOPLASMS_SOURCE,
    title: "SCORE curriculum module: Metastatic Hepatic Neoplasms",
    kind: "website",
    citation: "Murickan T, Singla S. \"Metastatic Hepatic Neoplasms.\" Surgical Council on Resident Education (SCORE) Portal, Liver module, June 16, 2023.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=144441",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: "Local module retrieved August 12, 2026. Supplies Cantlie's line as the right-left division, 75% portal and 25% arterial inflow, caudate drainage straight into the IVC, the three metastasis groups, metachronous disease as less aggressive, FLR thresholds (over 20 to 25% chemotherapy-naive, 30 to 35% after chemotherapy, over 40% cirrhotic), colorectal epidemiology (synchronous 15 to 25%, only 5 to 10% resectable upfront and up to 20% after chemotherapy, about 75% recurrence), NET epidemiology, imaging, biopsy only when the primary is unknown, the named resections, synchronous sequencing, HAI rationale, outcomes (about 50% alive at 3 years, 20% at 10 years, about 33% at 5 years with four or more metastases), and the adverse prognostic factors. Its NET metastatic range of 40 to 95% is set beside the OpenEvidence guide's ASCO figure of 40 to 45%.",
  },
  {
    id: FISER_LIVER_SOURCE,
    title: "Fiser ABSITE Review, 8th edition — Liver",
    kind: "book",
    citation: "Fiser SM. The ABSITE Review. 8th ed. Chapter 31, Liver, pages 414-437.",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: "Page-level markdown of the chapter, held in `Pocket Chief Resources/absite-8e/ch31_liver.md`. Supplies the board keys for this batch: pyogenic abscess as 80% of liver abscesses with E. coli first and Klebsiella tied to colorectal cancer, colonoscopy for an occult abscess, amebic serology and the sterile center, the hydatid rules (do not aspirate, preoperative ERCP when the biliary tree may communicate, two weeks of albendazole), benign tumor management, HCC risk factors and resectability, FLR of 25% without cirrhosis and 40% with Child A, a 30% five-year survival after HCC resection and 35% after colorectal metastasectomy, and ablation under 5 cm against TACE over 5 cm for palliation. Two keys conflict with the SCORE module and are written as splits: hepatic adenoma described as arterial enhancement with rapid washout, and adenoma resection from 4 cm.",
  },
  {
    id: HEPATIC_ABSCESS_OE_SOURCE,
    title: "Owner-supplied hepatic abscess study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 19, 2026: \"Hepatic Abscess Pocket Chief\", an OpenEvidence correction of a SCORE notebook draft provided as a Word document.",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions and no numbered reference list. Works it cites include Durand and Chapman (NEJM 2026), the ACG clinical guideline on focal liver lesions (Frenette et al., 2024), the IDSA/ASM microbiology utilization guideline (2024), Zhang (BMC Infect Dis 2026), Qian (Sci Rep 2016), Srivastava (Abdom Radiol 2026), the ACS Gastrointestinal Surgical Emergencies text (2021), the PCD against needle aspiration meta-analyses (Lin, BMJ Open 2023; Li and Pan, Medicine 2025; Xu and Zeng, Eur J Gastroenterol Hepatol 2026) and the opposing cohort (Zhang, PLoS One 2024), the FDA metronidazole label (2024), Stanley (Lancet 2003), Das (Abdom Radiol 2025), Kuehn (Cochrane 2024), and the colorectal cancer after cryptogenic abscess literature (Mohan 2019; Suzuki, JAMA Netw Open 2023; Liao 2026).",
      "Its amebic drainage trigger of no response at 48 to 72 hours conflicts with the drainage guide, which corrects it to 5 to 7 days; the topic writes the later figure and records the earlier one in the split block. Not carried: a Pringle maneuver pearl that belongs to the trauma and resection topics.",
    ].join(" "),
  },
  {
    id: HEPATIC_ABSCESS_DRAINAGE_OE_SOURCE,
    title: "Owner-supplied hepatic abscess drainage study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 19, 2026: \"Hepatic Abscess Drainage Pocket Chief\", an OpenEvidence correction of a SCORE notebook draft provided as a Word document.",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions and no numbered reference list. Works it cites include Srivastava (Abdom Radiol 2026), Kumar (World J Hepatol 2024), Priya (Sci Rep 2024), Khot (Abdom Radiol 2025), the ACR Appropriateness Criteria (Weiss 2020), the ACS Gastrointestinal Surgical Emergencies text (2021), Chavez-Tapia (Cochrane 2009), Chapman (NEJM 2026), Le Goff (Crit Care 2025), the PCD against needle aspiration meta-analyses, Zhang (PLoS One 2024), Heller (Liver Ultrasound 2023), STOP-IT (Sawyer, NEJM 2015), the Surgical Infection Society guidelines (Mazuski 2017; Huston 2024), Wendt (Sci Rep 2024), Haque (NEJM 2003), Akhan (Curr Opin Infect Dis 2023), Das (Abdom Radiol 2025), the ACG focal liver lesion guideline (2024), the WSES liver trauma guidelines (Coccolini 2020), and Schellenberg (J Trauma Acute Care Surg 2022).",
      "Not carried: damage-control triggers, the Pringle maneuver and FAST limitations, which belong to the trauma topics. Its claim that Klebsiella pneumoniae has replaced E. coli as the commonest organism worldwide is set beside Fiser's and TrueLearn's E. coli in the split block, since the two are counting different populations.",
    ].join(" "),
  },
  {
    id: PRIMARY_HEPATIC_NEOPLASMS_OE_SOURCE,
    title: "Owner-supplied primary hepatic neoplasms study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 19, 2026: \"Primary Hepatic Neoplasms — Pocket Chief\", an OpenEvidence correction of a SCORE notebook draft provided as a Word document.",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions and no numbered reference list. Works it cites include NCCN Hepatocellular Carcinoma (v2.2026) and Biliary Tract Cancers (v2.2026), the ACG focal liver lesion guideline (Frenette 2024), AASLD (2023), the AGA HCC surveillance update (Rich 2026), Park (JAMA 2024), Singal (Gastroenterology 2025), Reig (BCLC 2025 update, J Hepatol), IMbrave150, HIMALAYA, CheckMate-9DW, BILCAP, TOPAZ-1, KEYNOTE-966, Nault (Nat Rev Gastroenterol Hepatol 2022), Bowlus (AASLD 2023), Brindley (Nat Rev Dis Primers 2021), Llovet (Cell 2026), Tse (Radiographics 2023), and Pio (Nat Rev Dis Primers 2025).",
      "The guide notes that its source draft was almost entirely hepatic trauma material and was rewritten; none of that trauma content was carried.",
    ].join(" "),
  },
  {
    id: METASTATIC_HEPATIC_NEOPLASMS_OE_SOURCE,
    title: "Owner-supplied metastatic hepatic neoplasms study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 19, 2026: \"Metastatic Hepatic Neoplasms Pocket Chief\", an OpenEvidence correction of a SCORE notebook draft provided as a Word document.",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: [
      "Carries a 30-item reference list. The works blocks lean on are NCCN Colon, Rectal, and Neuroendocrine and Adrenal Tumors (v1 to v2.2026), the ASCO GEP-NET guideline (Perez 2026), the SSO/AHPBA/SSAT selection consensus (Adams 2013), Chun (Lancet Oncol 2009) on chemotherapy-associated liver injury, Newhook and Vauthey (2022), the parenchymal-sparing meta-analysis (Wang 2023), Hounschell (Cancers 2026) on R1 vascular margins, Kataoka (JAMA Surg 2025) and Papakonstantinou (2025) on disappearing metastases, JCOG0603 long-term results (Kanemitsu, JCO 2026), Ecker (Lancet Oncol 2022), Liu (Ann Surg Oncol 2026), Gudmundsdottir (Ann Surg Oncol 2023), the HAI landmark series (Outmani 2025), Folkerts (Cancer 2025), and Saadat (Ann Surg 2025).",
      "Its surgical anatomy section (Couinaud, Cantlie's line, Pringle maneuver) is left to the Hepatic Resection topic.",
    ].join(" "),
  },
  {
    id: TRUELEARN_LIVER_SOURCE,
    title: "TrueLearn question review: Liver",
    kind: "user_notes",
    citation: "TrueLearn SCORE/ABSITE question bank, Liver questions and explanations reviewed by the owner on October 19, 2026. Paraphrased; no question stems or explanation text reproduced.",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: [
      "Ten keyed questions logged in the owner's local question-bank notes (LIV-01 to LIV-10). Batch 1 carries the six on abscess and tumors: the fungal abscess treated with catheter drainage plus an echinocandin, hydatid life cycle, sites and cyst wall, the biliary route behind an E. coli abscess with a table of pyogenic causes, amebic serology with drainage over 10 cm or after 5 to 7 days, biliary disease as the strongest risk factor even with Klebsiella bacteremia and diabetes, the multiphase imaging of HCC against adenoma, cholangiocarcinoma, metastasis and hemangioma, and resection of a solitary colorectal metastasis beside the right hepatic vein with a table of non-resection options.",
      "The bank's explanations cite Greenfield's Surgery 6th edition chapter 57 (Shulick and Nydam) and Roediger R, Lisker-Melman M, Pyogenic and amebic infections of the liver, Gastroenterol Clin North Am 2020;49(2):361-377. Where the bank is the only source for a statement, the topic cites it alone; where it disagrees with the SCORE module or a current guideline, the topic writes a split.",
      "Batch 2 carries the four on anatomy into Hepatic Resection: pulsatile bleeding in the pars flaccida as a replaced left hepatic artery off the left gastric (bank frequency 4 to 10%, against 10 to 20% for a replaced right hepatic artery off the SMA, written as a split against Fiser's 20% each), the normal course of the common hepatic artery, segments II and III as the left lateral section with VI and VII right posterior, Cantlie's line rather than the falciform as the right-left division with the falciform only subdividing the left liver, the right hepatic vein splitting anterior from posterior sectors, segments built on artery, portal vein, hepatic vein and bile duct, and the solitary colorectal metastasis cross-linked from Metastatic Hepatic Neoplasms. A paraesophageal hernia repair bullet carries the pars flaccida trap as well.",
    ].join(" "),
  },
  {
    id: SCORE_INTRAOPERATIVE_HEPATIC_ULTRASOUND_SOURCE,
    title: "SCORE curriculum module: Intraoperative Hepatic Ultrasound",
    kind: "website",
    citation: "Mitsakos A, House MG, Parikh AA. \"Intraoperative Hepatic Ultrasound.\" Surgical Council on Resident Education (SCORE) Portal, Liver module, April 3, 2026.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=144703",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: "Local module retrieved August 12, 2026. Supplies the probe types (T-shaped linear or curvilinear, flexible laparoscopic with two- to four-way angulation), the 5 to 14 MHz range with low frequency for depth and high for resolution, B-mode and color Doppler, the four roles (lesions and resectability, margins and needle guidance, occult lesions that change the plan, anatomic variants), scanning early in the case after taking down the falciform, inspection and palpation first, contact against stand-off scanning, microbubble contrast, the cranial-to-caudal sequence from the hepatic vein confluence along the middle hepatic vein to the portal bifurcation and then the whole parenchyma, marking margins, and hepatopetal portal and arterial flow against hepatofugal hepatic venous flow.",
  },
  {
    id: SCORE_HEPATIC_BIOPSY_SOURCE,
    title: "SCORE curriculum module: Hepatic Biopsy",
    kind: "website",
    citation: "Grova M, Kim HJ, Meyers M. \"Hepatic Biopsy.\" Surgical Council on Resident Education (SCORE) Portal, Liver module, March 17, 2023.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=127428",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: "Local module retrieved August 12, 2026. Supplies the anterior and posterior surface segments, the falciform dividing the left hemiliver and the middle hepatic vein (Cantlie's line) dividing right from left, the risks of percutaneous (pain, bleeding, bile leak more common with extrahepatic obstruction, transient bacteremia, pneumothorax as the commonest organ injury), laparoscopic (including inaccessible dome, caudate and perivascular lesions) and open biopsy, the percutaneous, laparoscopic and open techniques, which lesions found at a GI cancer operation to biopsy, hemorrhage control from cautery to packing with a Pringle maneuver through a Rummel tourniquet, and the signs and management of postoperative bleeding and bile leak.",
  },
  {
    id: SCORE_CHRONIC_LIVER_DISEASE_SOURCE,
    title: "SCORE curriculum module: Chronic Liver Disease",
    kind: "website",
    citation: "Bethel F, Huckeby R, Douglas M, Colosimo C. \"Chronic Liver Disease.\" Surgical Council on Resident Education (SCORE) Portal, Liver module, February 10, 2026.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=144569",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: "Local module retrieved August 12, 2026, and used for the outline entry Cirrhosis and Portal Hypertension. Supplies the causes, HVPG over 5, 10 and 16 mm Hg, noninvasive surrogates including elastography over 21 kPa, CTP classes and elective surgery, MELD and its rationale, ascites mechanism, SAAG and ascitic protein, albumin 6 to 8 g/L with paracentesis, chylous ascites, SBP (500 leukocytes or 250 neutrophils, cefotaxime, 48-hour failure prompting a search for a source, prophylaxis criteria and outcomes), encephalopathy grades and treatment, varices sites, beta-blockers and banding, surgical shunts and devascularization limited to CTP A and B, the bleeding protocol with Sengstaken-Blakemore and Minnesota tube technique, BRTO, vasoactive drugs for 2 to 5 days, ceftriaxone, PPI for 10 days, TIPS, and hepatorenal syndrome. Two statements are set beside current guidance as splits: MELD-Na as the current UNOS score (MELD 3.0 replaced it in 2023) and a transfusion target of 7 to 9 g/dL.",
  },
  {
    id: HEPATIC_RESECTION_OE_SOURCE,
    title: "Owner-supplied hepatic resection study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 19, 2026: \"Hepatic Resection Pocket Chief\", an OpenEvidence correction of a SCORE notebook draft provided as a Word document.",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: [
      "Carries a 36-item reference list. The works blocks lean on are NCCN Hepatocellular Carcinoma (v2.2026) and Colon Cancer (2026), the AASLD HCC guidance (Singal 2023), Hiatt (Ann Surg 1994) and Mathew and Venkatesh (Abdom Radiol 2018) on arterial variants, Entezari (RadioGraphics 2022), Narula and Aloia (2017), Steinharter (J Am Coll Surg 2026) and Reese (EJSO 2024) on remnant volume, Bozkurt (HPB 2024), Eshmuminov (Br J Surg 2016) and Fotiadou (HPB 2026) on PVE, LVD and ALPPS, Huang (Surgery 2022), Huntington (2014) and Luo (2026) on the Pringle maneuver, the PRESSURE trial (Teoule, Ann Surg 2025) and Deng (2026) on low CVP, Patel (2024) on infrahepatic IVC clamping, Nishio (2023) and Calthorpe (Ann Surg 2023) on liver failure, Vienet (2025) and Sliwinski (2023) on bile leak, Sadot (Ann Surg 2015), Margonis (Ann Surg 2018), Perrin (Ann Surg 2026) and Ferrari (2026) on margins, Kawaguchi (JNCCN 2020) on surveillance, and the ACR Appropriateness Criteria (2025).",
      "Its board-classic flags (adenoma over 4 cm, a 1 cm margin, low CVP in minimally invasive resection, FLR thresholds) are written as splits. Its portal vein share of oxygen corrects the draft and is set beside Fiser's two thirds of flow. There is no SCORE module for Hepatic Resection on disk, so this guide and Fiser carry the topic.",
    ].join(" "),
  },
  {
    id: INTRAOPERATIVE_HEPATIC_ULTRASOUND_OE_SOURCE,
    title: "Owner-supplied intraoperative hepatic ultrasound study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 19, 2026: \"Intraoperative Hepatic Ultrasound — Pocket Chief\", an OpenEvidence correction of a SCORE notebook draft provided as a Word document.",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions and a selected source list. Works it cites include the SSAT/SSO/AHPBA consensus (Adams 2013), Bitterer (Ultraschall Med 2025), Stavrou (J Gastrointest Surg 2021), the ACR Appropriateness Criteria (Kaur 2017), Liu (Ann Surg Oncol 2021), Leen (Ann Surg 2006), Arita (Ann Surg 2015), Fang (World J Surg 2012), Mathew and Venkatesh (Abdom Radiol 2018), Sureka (Br J Radiol 2019), Loi (Med Oncol 2020) on heat sink, Margonis (2018), Sadot (2015) and Dhir (2011) on margins, Chandra (Ann Surg Oncol 2026), Nicolescu (Cancers 2026), Narula (SAGES, Surg Endosc 2020), Pisano (WSES 2020), Russolillo (Surg Endosc 2021), Goldhawk-White (Surgery 2026) on ICG, and Filoni (Oncol Rev 2023).",
      "Its heat-sink line describes a large vessel over 3 cm within 1 cm; that reads as a slip for 3 mm and only the 3 mm vessel threshold is carried. Not carried: FAST, Parkland and burn pearls the guide itself removed as off-topic.",
    ].join(" "),
  },
  {
    id: LIVER_BIOPSY_OE_SOURCE,
    title: "Owner-supplied liver biopsy study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 19, 2026: \"Liver Biopsy Pocket Chief\", an OpenEvidence correction of a SCORE notebook draft provided as a Word document.",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: "Carries inline author-year attributions and no numbered reference list. Works it cites include the AASLD liver biopsy guideline (Rockey 2009) and its 2026 update (AASLD EXPO, Hepatology), Huttman (Cochrane 2024), McAfee (Hepatology 1992) on transjugular biopsy, NCCN Hepatocellular Carcinoma (2026), the ACG/AGA acute liver failure guideline (Shingina 2023), the AGA (O'Shea 2021) and AASLD (Northup 2021) coagulation guidance, Rautou (Clin Gastroenterol Hepatol 2023) on society thresholds, the SIR quality standards (Sheth 2020), Govindarajan (Yamada's Textbook 2022), Al Knawy and Shiffman (Liver Int 2007), Giri (2023) and Zeydanli (2026) on tract embolization, Lee (JAMA 2021), Kaplan (AASLD portal hypertension 2024), Singal (AASLD HCC 2023), Thomaides-Brears (Dig Dis Sci 2022), Bravo (NEJM 2001), Colapietro (Liver Int 2025), Lester (Br J Haematol 2024), Nie (Am J Gastroenterol 2025) and Schaffler-Schaden (2020) on seeding, and Kitchin (Abdom Radiol 2018).",
  },
  {
    id: CIRRHOSIS_PORTAL_HYPERTENSION_OE_SOURCE,
    title: "Owner-supplied cirrhosis and portal hypertension study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 19, 2026: \"Cirrhosis and Portal Hypertension Pocket Chief\", an OpenEvidence correction of a SCORE notebook draft provided as a Word document.",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions and no numbered reference list. Works it cites include the AASLD portal hypertension (Kaplan 2024), ascites (Biggins 2021), TIPS (2024), ACLF (2024) and HCC (Singal 2023) guidance, Baveno VII, the AGA ascites (2025), gastric varices (Henry 2021) and vasoactive and albumin (2024) updates, the AASLD/AST transplant candidate guideline (2026), the ACG hepatic encephalopathy guideline (2026), Kim (Gastroenterology 2021) and Kwong (Hepatology 2023) on MELD 3.0, Mazumder and Fontana (Annu Rev Med 2024), Tapper and Parikh (JAMA 2023), Jachs (Clin Gastroenterol Hepatol 2023), Costa (Nat Rev Gastroenterol Hepatol 2025), Vranic (Cochrane 2026), Reiberger and Simbrunner (2025), Tripathi (CALIBRE, 2025), Nicoara-Farcau (Hepatology 2024), Nadim and Garcia-Tsao (NEJM 2023), Rockey (Liver Int 2025), Pose (Gastroenterology 2024), King (Clin Gastroenterol Hepatol 2026), Silic (2025), Velez (JASN 2026), and the rifaximin label.",
      "Its classic-against-current flags (MASLD as the leading cause, CTP against MELD for surgical risk, carvedilol first, early TIPS survival, the albumin dose, HRS nomenclature, terlipressin) are written as splits beside Fiser's and SCORE's keys.",
    ].join(" "),
  },
  {
    id: HIATT_HEPATIC_ARTERIES_1994_SOURCE,
    title: "Hiatt, Surgical anatomy of the hepatic arteries in 1000 cases (1994)",
    kind: "article",
    citation: "Hiatt JR, Gabbay J, Busuttil RW. Surgical anatomy of the hepatic arteries in 1000 cases. Ann Surg. 1994;220(1):50-52.",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: "Registered during review as the authority behind the variant-frequency split, identified from the hepatic resection guide's reference list rather than supplied directly. Donor and recipient series: a replaced or accessory left hepatic artery from the left gastric in about 10% and a replaced or accessory right hepatic artery from the SMA in about 11%. Pending Zach's sign-off.",
  },
  {
    id: AASLD_PORTAL_HYPERTENSION_2024_SOURCE,
    title: "AASLD practice guidance on portal hypertension (2024)",
    kind: "article",
    citation: "Kaplan DE, Ripoll C, Thiele M, et al. AASLD Practice Guidance on risk stratification and management of portal hypertension and varices in cirrhosis. Hepatology. 2024;79(5):1180-1211.",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: "Registered during review as the authority behind the HVPG thresholds, carvedilol as the preferred beta-blocker, the restrictive transfusion target and the early TIPS criteria, identified from the cirrhosis guide and the SCORE module rather than supplied directly. Pending Zach's sign-off.",
  },
  {
    id: AASLD_ASCITES_2021_SOURCE,
    title: "AASLD practice guidance on ascites, SBP and hepatorenal syndrome (2021)",
    kind: "article",
    citation: "Biggins SW, Angeli P, Garcia-Tsao G, et al. Diagnosis, evaluation, and management of ascites, spontaneous bacterial peritonitis and hepatorenal syndrome: 2021 practice guidance by the American Association for the Study of Liver Diseases. Hepatology. 2021;74(2):1014-1048.",
    suppliedAt: "2026-10-19T00:00:00.000Z",
    details: "Registered during review as the authority behind sodium restriction, the diuretic ratio, albumin with large-volume paracentesis, SBP diagnosis and treatment, and HRS-AKI, identified from the cirrhosis guide and the SCORE module rather than supplied directly. Pending Zach's sign-off.",
  },
  {
    id: BOWEL_BOARDS_PACKET_SOURCE,
    title: "Owner-supplied bowel boards study guides",
    kind: "user_notes",
    citation: "Personal study guides supplied to Pocket Chief, October 21, 2026: seven source-linked drafts under `output/study-guides/bowel-boards/` — Procedures for Crohn Disease, Procedures for Ulcerative Colitis, Ileostomy and Ileostomy Closure, Total and Subtotal Colectomy, Colostomy and Colostomy Closure, C. difficile Colitis, and Enterocutaneous Fistula.",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    details: [
      "Each guide cites section-level locators into the supplied SCORE modules and Fiser chapters 35 and 36, and checks consequential points against current primary guidance (ASCRS Crohn 2020, ECCO Crohn surgery 2024, ASCRS UC 2026, ECCO UC surgery 2026, ASCRS ostomy 2022, EHS parastomal hernia prevention 2023, IDSA/SHEA CDI 2017 and its 2021 focused update, CDC C. difficile clinical and testing guidance, FDA labeling for Rebyota and Vowst, SCORE Nutritional Requirements for refeeding, and ESPEN chronic intestinal failure 2023). The authorities that blocks lean on are registered as their own sources; this entry is cited where a block synthesizes across them.",
      "Corrections the guides carry, kept in the topics: SCORE C. difficile lists nonsevere disease as WBC greater than 15,000/µL, duplicating its severe criterion — the 2021 IDSA/SHEA table reads WBC ≤15,000/µL and creatinine <1.5 mg/dL; SCORE UC perioperative stress-dose hydrocortisone schedules are superseded by ASCRS 2026, which finds no support for routine stress dosing; emergency UC colectomy is not automatically open under ASCRS 2026; SCORE Total and Subtotal Colectomy gives two different post-IPAA stool frequencies (8–10 and 6–8 daily) and neither is quoted; Fiser p.519 labels the sigmoid retroperitoneal and SCORE correctly calls it intraperitoneal.",
      "Independently checked during authoring (October 21, 2026): the ASCRS UC 2026 guideline (Lightner et al., DCR 2026;69(8):2012–2039, PubMed 42165399) and the ECCO UC surgical guideline 2026 (Adamina et al., JCC 2026;20(6):jjag072) both exist as cited; the EHS 2023 rapid guideline makes a conditional recommendation for prophylactic mesh with an end colostomy and fair life expectancy, and a strong one for patients at high risk of parastomal hernia; randomized data on Kono-S and extended mesenteric excision (SPICY, KoCoRICCO, North American interim data) mostly show no benefit on endoscopic recurrence, consistent with the guides calling neither an established requirement.",
      "Added beyond the packet during authoring, pending owner sign-off: the Finney and isoperistaltic stricturoplasty construction descriptions; Fiser's stricturoplasty biopsy requirement and ~10% leak, abscess, or fistula rate (p.508, which the packet did not carry); the closed-loop cecal-perforation rationale for an ileostomy behind a competent ileocecal valve; uric acid stone mechanism wording; convex pouching for retraction; the arc of Riolan description and the Griffith and Sudeck watershed definitions; the reading of why ASCRS and EHS diverge on prophylactic mesh; soap-and-water handwashing because spores resist alcohol; oral metronidazole 500 mg three times daily and extended-pulsed fidaxomicin from IDSA/SHEA 2021; the vancomycin-then-rifaximin recurrence option; octreotide not increasing ECF closure; the FRIENDSS action column; the rationale that a hostile early peritoneum is why ECF reconstruction waits 6 to 12 months; and abdominal-wall closure as part of ECF reconstruction.",
      "Gaps the guides name and the topics leave open, pending owner review: no bowel-specific question-bank notes existed (only liver.md); SCORE and Fiser polyposis surveillance intervals and Fiser's prophylactic-age rule were not verified against current polyposis guidance and are not quoted; no high-output ileostomy drug doses, oral rehydration formula, or octreotide regimen is given; operative videos and source figures were not reviewed.",
    ].join(" "),
  },
  {
    id: SCORE_CROHN_SOURCE,
    title: "SCORE module: Crohn Disease",
    kind: "website",
    citation: "Sandilos G, Giugliano DN. Crohn Disease. SCORE Curriculum, Surgical Council on Resident Education, October 10, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=1000524",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=1000524",
    details: "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/SCORE_Crohn_Disease_24e82b11ec.md`. No separate Procedures for Crohn Disease module exists; this disease module carries the operative objectives — indications, stricturing and penetrating disease, abscess timing, segmental resection margins, colonic and perianal surgery, and follow-up.",
  },
  {
    id: SCORE_ULCERATIVE_COLITIS_SOURCE,
    title: "SCORE module: Ulcerative Colitis",
    kind: "website",
    citation: "Shaw RD, Goldwag JL, Ivatury SJ. Ulcerative Colitis. SCORE Curriculum, Surgical Council on Resident Education, October 10, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=129440",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=129440",
    details: "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/SCORE_Ulcerative_Colitis_f95ff806d0.md`. Supplies the operative objectives: indications and severity, preparation, the urgent colectomy sequence and its protective anatomy, staging, stapled versus handsewn IPAA, stump complications, and IPAA candidacy. Its perioperative stress-dose steroid schedules are not reproduced, because ASCRS 2026 supersedes them.",
  },
  {
    id: SCORE_TOTAL_SUBTOTAL_COLECTOMY_SOURCE,
    title: "SCORE module: Total and Subtotal Colectomy",
    kind: "website",
    citation: "Lyu HGH, Irani JL. Total and Subtotal Colectomy. SCORE Curriculum, Surgical Council on Resident Education, March 12, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=1000583",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=1000583",
    details: "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/SCORE_Total_and_Subtotal_Colectomy_4b9d74d5a8.md`. Supplies the operative extents, indications for TAC/IRA and TPC, operative anatomy, preparation, pouch reach, complications, and follow-up. Its two post-IPAA stool-frequency ranges conflict, its prednisone threshold prints uncertainly, and its calendar-based postoperative-obstruction rule is not adopted.",
  },
  {
    id: SCORE_ILEOSTOMY_SOURCE,
    title: "SCORE module: Ileostomy and Ileostomy Closure",
    kind: "website",
    citation: "Wright JP. Ileostomy and Ileostomy Closure. SCORE Curriculum, Surgical Council on Resident Education, August 10, 2026. https://www.surgicalcore.org/modulecontent.aspx?id=1000526",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=1000526",
    details: "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/SCORE_Ileostomy_and_Ileostomy_Closure_47e6ca83e4.md`. Supplies loop versus end configuration, site marking, Brooke construction, necrosis and retraction depth, prolapse and hernia, output and hypotonic-fluid teaching, and loop and end closure.",
  },
  {
    id: SCORE_COLOSTOMY_SOURCE,
    title: "SCORE module: Colostomy and Colostomy Closure",
    kind: "website",
    citation: "Thornton LB, Hunter JD. Colostomy and Colostomy Closure. SCORE Curriculum, Surgical Council on Resident Education, March 12, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=1000457",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=1000457",
    details: "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/SCORE_Colostomy_and_Colostomy_Closure_6325fe87bc.md`. Supplies diversion purposes, end, loop and end-loop anatomy, blood supply and watersheds, structures at risk, construction, complications, Hartmann reversal and lengthening maneuvers. Its absolute claim about diversion and leak frequency, historical supply costs, and blanket exercise restrictions are not reproduced.",
  },
  {
    id: SCORE_C_DIFFICILE_SOURCE,
    title: "SCORE module: C. difficile Colitis",
    kind: "website",
    citation: "Faber DA, Hechenbleikner EM. C. difficile Colitis. SCORE Curriculum, Surgical Council on Resident Education, March 19, 2026. https://www.surgicalcore.org/modulecontent.aspx?id=136870",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=136870",
    details: "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/SCORE_C_difficile_Colitis_f57207e8d4.md`. Supplies transmission, risk factors, presentation, testing and test-of-cure teaching, imaging thresholds, operative indications, total abdominal colectomy and loop ileostomy with lavage, and outcomes. Its nonsevere definition prints WBC greater than 15,000/µL, an inequality error corrected from the 2021 IDSA/SHEA table.",
  },
  {
    id: SCORE_ENTEROCUTANEOUS_FISTULA_SOURCE,
    title: "SCORE module: Enterocutaneous Fistula",
    kind: "website",
    citation: "Turgeon M, Haack C. Enterocutaneous Fistula. SCORE Curriculum, Surgical Council on Resident Education, February 10, 2026. https://www.surgicalcore.org/modulecontent.aspx?id=167674",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=167674",
    details: "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/SCORE_Enterocutaneous_Fistula_cf3c960e7f.md`. Supplies etiology, output classification, favorable closure features, imaging, the nonoperative bundle, and the 6-to-8-week operative-consideration point.",
  },
  {
    id: SCORE_SMALL_INTESTINAL_RESECTION_SOURCE,
    title: "SCORE module: Small Intestinal Resection",
    kind: "website",
    citation: "Ewing J, Schlegel CE. Small Intestinal Resection. SCORE Curriculum, Surgical Council on Resident Education, May 19, 2026. https://www.surgicalcore.org/modulecontent.aspx?id=128394",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=128394",
    details: "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/SCORE_Small_Intestinal_Resection_a67ae24bb9.md`. Supplementary source for planning, optimization, stoma counseling, safe entry, anastomotic principles, and early leak, ileus, and obstruction.",
  },
  {
    id: SCORE_NUTRITIONAL_SUPPORT_SOURCE,
    title: "SCORE module: Nutritional Support",
    kind: "website",
    citation: "Busch RA. Nutritional Support. SCORE Curriculum, Surgical Council on Resident Education, undated in the supplied text. https://www.surgicalcore.org/modulecontent.aspx?id=168169",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=168169",
    details: "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/SCORE_Nutritional_Support_4b95dee175.md`. Supplementary source for PN indications, enteral routes distal or proximal to a fistula, timing by nutritional risk, and PN complications. Its glucose-administration units are suspect OCR and are not used.",
  },
  {
    id: FISER_SMALL_BOWEL_SOURCE,
    title: "Fiser ABSITE Review, 8th edition — Small Bowel",
    kind: "book",
    citation: "Fiser SM. The ABSITE Review. 8th ed. Chapter 35, Small Bowel, pages 499–513.",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    details: "Page-level OCR markdown held in `Pocket Chief Resources/absite-8e/ch35_small-bowel.md`. Supplies the board answers used here: FRIENDSS and nonhealing-fistula management (p.502), Crohn disease, stricturoplasty under 10 cm and the 2-cm gross margin (pp.507–508), terminal-ileal resection consequences (pp.499, 508), short gut (p.500), and stoma complications and diversion colitis (p.513).",
  },
  {
    id: FISER_COLORECTAL_SOURCE,
    title: "Fiser ABSITE Review, 8th edition — Colorectal",
    kind: "book",
    citation: "Fiser SM. The ABSITE Review. 8th ed. Chapter 36, Colorectal, pages 519–546.",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    details: "Page-level OCR markdown held in `Pocket Chief Resources/absite-8e/ch36_colorectal.md`. Supplies colonic vascular anatomy (pp.519–521), UC and toxic megacolon indications and IPAA complications (pp.533–534), and C. difficile (p.546). Its p.519 label of the sigmoid as retroperitoneal is an error SCORE corrects, and its FAP prophylactic-age rule is not quoted.",
  },
  {
    id: ASCRS_CROHN_2020_SOURCE,
    title: "ASCRS Clinical Practice Guidelines for the Surgical Management of Crohn's Disease (2020)",
    kind: "article",
    citation: "Lightner AL, Vogel JD, Carmichael JC, et al. The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for the Surgical Management of Crohn's Disease. Dis Colon Rectum. 2020;63(8):1028–1052.",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://pubmed.ncbi.nlm.nih.gov/32692069/",
    details: "Cited for the stricture recommendations: balloon dilation for strictures under 5 cm without abscess or fistula, stricturoplasty contraindications, and the Heineke-Mikulicz, Finney, and isoperistaltic length framework.",
  },
  {
    id: ECCO_CROHN_SURGERY_2024_SOURCE,
    title: "ECCO Guidelines on Therapeutics in Crohn's Disease: Surgical Treatment (2024)",
    kind: "article",
    citation: "Adamina M, Minozzi S, Warusavitarne J, et al. ECCO Guidelines on Therapeutics in Crohn's Disease: Surgical Treatment. J Crohns Colitis. 2024;18(10):1556–1582. doi:10.1093/ecco-jcc/jjae089",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://doi.org/10.1093/ecco-jcc/jjae089",
    details: "Cited for statements 4.5 and 4.9–4.10 (abscess interval, no routine biologic washout), 4.14–4.15 (Kono-S and mesenteric excision not established), and 4.22–4.23 (endoscopy within 6–12 months, prophylaxis for high-risk patients).",
  },
  {
    id: ASCRS_ULCERATIVE_COLITIS_2026_SOURCE,
    title: "ASCRS Clinical Practice Guideline for the Surgical Management of Ulcerative Colitis (2026)",
    kind: "article",
    citation: "Lightner AL, et al. Clinical Practice Guideline for the Surgical Management of Ulcerative Colitis. Dis Colon Rectum. 2026;69(8):2012–2039. doi:10.1097/DCR.0000000000004290",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://doi.org/10.1097/DCR.0000000000004290",
    details: "Updates the 2021 ASCRS guideline. Cited for emergent colectomy indications, minimally invasive surgery when safe, no routine stress-dose steroids, no washout delay for biologics, and endoscopic management of resectable visible dysplasia. Existence and publication details confirmed against PubMed 42165399 on October 21, 2026.",
  },
  {
    id: ECCO_ULCERATIVE_COLITIS_SURGERY_2026_SOURCE,
    title: "ECCO Guidelines on Therapeutics in Ulcerative Colitis: Surgical Treatment (2026)",
    kind: "article",
    citation: "Adamina M, et al. ECCO Guidelines on Therapeutics in Ulcerative Colitis: Surgical Treatment. J Crohns Colitis. 2026;20(6):jjag072. doi:10.1093/ecco-jcc/jjag072",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://doi.org/10.1093/ecco-jcc/jjag072",
    details: "Cited for the Figure 1 staging definitions (one-stage, conventional and modified two-stage, three-stage), the absence of a universally superior staging strategy, and the J-pouch and cuff dimensions.",
  },

  {
    id: EHS_PARASTOMAL_HERNIA_2023_SOURCE,
    title: "EHS Rapid Guideline on Parastomal Hernia Prevention (2023)",
    kind: "article",
    citation: "Stabilini C, et al. EHS Rapid Guideline: Evidence-Informed European Recommendations on Parastomal Hernia Prevention—With ESCP and EAES Participation. J Abdom Wall Surg. 2023;2:11549. doi:10.3389/jaws.2023.11549",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10831651/",
    details: "Cited for the conditional recommendation for prophylactic permanent synthetic mesh with an end colostomy and fair life expectancy, and the strong recommendation in patients at high risk of parastomal hernia — the genuine disagreement with ASCRS 2022.",
  },
  {
    id: IDSA_SHEA_CDI_2017_SOURCE,
    title: "IDSA/SHEA Clinical Practice Guidelines for Clostridium difficile Infection (2017 update)",
    kind: "article",
    citation: "McDonald LC, Gerding DN, Johnson S, et al. Clinical Practice Guidelines for Clostridium difficile Infection in Adults and Children: 2017 Update by the IDSA and SHEA. Clin Infect Dis. 2018;66(7):e1–e48.",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://www.idsociety.org/practice-guideline/clostridium-difficile/",
    details: "Cited for the three-unformed-stools testing population and the fulminant pathway not replaced in 2021: vancomycin 500 mg enterally four times daily, IV metronidazole, rectal vancomycin with ileus, colectomy preserving the rectum, loop ileostomy with lavage as an alternative, and WBC near 25,000/µL or lactate near 5 mmol/L as markers favoring earlier surgery.",
  },
  {
    id: IDSA_SHEA_CDI_2021_SOURCE,
    title: "IDSA/SHEA Focused Update on Clostridioides difficile Infection (2021)",
    kind: "article",
    citation: "Johnson S, Lavergne V, Skinner AM, et al. Clinical Practice Guideline by IDSA and SHEA: 2021 Focused Update Guidelines on Management of Clostridioides difficile Infection in Adults. Clin Infect Dis. 2021;73(5):e1029–e1044.",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://www.idsociety.org/practice-guideline/clostridioides-difficile-2021-focused-update/",
    details: "Cited for fidaxomicin preferred over vancomycin for initial and recurrent nonfulminant episodes, and the Table 1 severity definitions, including nonsevere as WBC ≤15,000/µL and creatinine <1.5 mg/dL.",
  },
  {
    id: ESPEN_INTESTINAL_FAILURE_2023_SOURCE,
    title: "ESPEN Guideline on Chronic Intestinal Failure in Adults — Update 2023",
    kind: "article",
    citation: "Pironi L, Cuerda C, Jeppesen PB, et al. ESPEN guideline on chronic intestinal failure in adults — Update 2023. Clin Nutr. 2023;42(10):1940–2021.",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    url: "https://www.espen.org/files/ESPEN-Guidelines/ESPEN_guideline_on_chronic_intestinal_failure_in_adults.pdf",
    details: "Cited from chapter 8, recommendations 98–102 and commentary (pp.1983–1984): reconstruction in specialist units after inflammation resolves and nutrition improves, often six to twelve months; no closure benefit from withholding enteral nutrition.",
  },
  {
    id: DIAPHRAGMATIC_HERNIA_PACKET_SOURCE,
    title: "Owner-supplied diaphragmatic hernia repair study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, October 21, 2026: \"Diaphragmatic Hernia Repair Pocket Chief\" (SCORE / General Surgery Board Review Study Guide).",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    details: [
      "A SCORE-notebook draft corrected against current literature, citing inline: Chen et al. (JAMA, 2024) on CDH incidence, Bochdalek and Morgagni shares and mortality; Larson et al. (NeoReviews, 2026) and Abman et al. (AHA/ATS pediatric pulmonary hypertension guideline, 2015) on stabilization and repair timing; Lin et al. (Pediatric Surgery International, 2025) on early repair on ECMO; Wild et al. (J Intensive Care Medicine, 2024) on ECMO indications and contraindications; Coccolini et al. (WSES-AAST thoracic trauma guidelines, 2025) on traumatic repair, mesh, chest tube and outcomes; Reitano et al. (Injury, 2022) on CT accuracy; Bergin et al. (AJR, 2001) on the dependent viscera sign; Elbanna et al. (Abdominal Radiology, 2018) on chronic traumatic hernia; Meyer et al. (JLAST, 2023) on mesh thresholds; Safari et al. (JLAST, 2025) on laparoscopic Morgagni repair; Laghi et al. (BMC Pulm Med, 2021), Heng et al. (J Pediatr Surg, 2025) and Beshay et al. (J Clin Med, 2023) on eventration and plication; Kirby and Keijzer (Pediatr Surg Int, 2020) on CDH follow-up.",
      "Review changes, pending Zach's sign-off: the packet equated the foramen of Morgagni with the space of Larrey; both are parts of the sternocostal trigone, Morgagni on the right and Larrey on the left, and the topic says so. The packet's ECMO criterion of post-ductal PaO2 above 30 mmHg was replaced with the CDH EURO criterion of post-ductal saturation above 70% (registered separately). The packet's correction note giving blunt left-sided predominance as about 65 to 75% conflicts with the trauma topic's roughly 80%; both are recorded in a split block. The packet's CT sensitivity of about 0.80 for blunt injury conflicts with the trauma packet's statement that CT misses nearly half of blunt injuries; also recorded in a split block. The AAST grade thresholds, and the explanation of what the two packets were probably counting, were added by the reviewer from training-era knowledge.",
    ].join(" "),
  },
  {
    id: HIATAL_HERNIA_PACKET_SOURCE,
    title: "Owner-supplied hiatal hernia study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, October 21, 2026: \"Hiatal Hernia Pocket Chief\" (SCORE / ABSITE Study Guide — Hiatal Hernia and Paraesophageal Hernia Repair).",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    details: [
      "A SCORE-notebook draft corrected against current literature, citing inline: Aaron et al. (ACS Gastrointestinal Surgical Emergencies, 2021) and Siegal et al. (Langenbecks Arch Surg, 2017) on definition, mechanism and classification; Giuffrida et al. (WSES, 2023); D'Urbano et al. (JLAST, 2023) on giant hernia definitions; Ghassemi and Jensen (Yamada's, 2022) on Cameron lesions; Gonda and Krikhely (Yamada's, 2022) and Bonney et al. (Abdom Radiol, 2021) on gastric volvulus; Katz et al. (ACG GERD guideline, 2022) on manometry; Stylopoulos et al. (Ann Surg, 2002) and DeMeester et al. (Ann Surg, 2024) Markov analyses; the EAES rapid guideline (Surg Endosc, 2023) and SAGES hiatal hernia guideline (Daly et al., Surg Endosc, 2024); Wong et al. (Ann Thorac Surg, 2023, STS database) and Crnkovic et al. (JACS, 2026) on elective versus emergency mortality; Angeramo and Schlottmann (Ann Surg, 2022), Kitsou et al. (JGS, 2026), Temperley et al. (Dis Esophagus, 2023), Rajkomar et al. (Hernia, 2023), Salehi et al. (Surg Endosc, 2024) and Schlottmann et al. (JAMA Surg, 2025) on mesh; Salvador et al. (Padova HRM consensus, Ann Surg, 2025) and Addo et al. (Surg Endosc, 2021) on wrap tailoring; Montcusi et al. (JACS, 2023) and Trinh et al. (J Clin Med, 2026) on Collis gastroplasty; Amundson et al. (Surg Endosc, 2023) on recurrence.",
      "Review notes, pending Zach's sign-off: the crural closure instruction and the dysphagia timeline in this packet conflict with the existing Paraesophageal Hernia Repair topic (1.5 cm crural space, dilation after one week); both are recorded in that topic's split block.",
    ].join(" "),
  },
  {
    id: GERD_BARRETT_PACKET_SOURCE,
    title: "Owner-supplied GERD and Barrett esophagus study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, October 21, 2026: \"GERD and Barrett Esophagus — Pocket Chief\".",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    details: [
      "A SCORE-notebook draft corrected against current literature, citing inline: Sharma (JAMA, 2022) and Fitzgerald (NEJM, 2026) on Barrett definition and the failure of antireflux surgery to prevent cancer; Shaheen et al. (ACG Barrett guideline, 2022) on prevalence, progression, screening and surveillance; Gyawali et al. (Lyon Consensus 2.0, Gut, 2024) and Amundson et al. (Surg Endosc, 2023) on pH thresholds; Slater et al. (SAGES GERD guideline) on surgical indications; Analatos et al. (JAMA Surg, 2022), McKinley et al. (Surg Endosc, 2021) and Varin et al. (Arch Surg, 2009) on Nissen versus Toupet; Memon et al. (Surg Endosc, 2024), Wunker et al. (Surg Endosc, 2025) and Ayazi et al. (Ann Surg, 2026) on GERD with obesity; Kolb and Wani (Dig Dis Sci, 2022), Ge and Muthusamy (JLAST, 2017) and Nguyen et al. (Surg Endosc, 2024) on dysplasia management and post-ablation surveillance.",
      "Review changes, pending Zach's sign-off: the packet's screening rule of chronic GERD plus two or more risk factors was corrected to three or more, per the 2022 ACG guideline (registered separately). The packet's surveillance interval for low-grade dysplasia (6 to 12 months) is kept as written; the guideline's primary recommendation of eradication over surveillance was confirmed.",
    ].join(" "),
  },
  {
    id: ANTIREFLUX_PROCEDURES_PACKET_SOURCE,
    title: "Owner-supplied antireflux procedures study packet",
    kind: "user_notes",
    citation: "Personal study document supplied to Pocket Chief, October 21, 2026: \"Antireflux Procedures Pocket Chief\" (SCORE / General Surgery Board Review Study Guide).",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    details: [
      "A SCORE-notebook draft corrected against current literature, citing inline: Katz et al. (ACG GERD guideline, 2022) on indications, MSA, TIF and Stretta; Fass (NEJM, 2022) on preoperative workup; Gyawali et al. (Lyon Consensus 2.0, Gut, 2024) and Krause and Yadlapati (Aliment Pharmacol Ther, 2024) on pH metrics; Yadlapati et al. (Aliment Pharmacol Ther, 2022) on wireless monitoring; Thrumurthy et al. (JAMA, 2026) on contraindications, recurrence and gas-bloat; DeMeester and DeMeester (The Esophagus, 2021) on wrap types; Gyawali et al. (Neurogastroenterol Motil, 2019), Addo et al. (Surg Endosc, 2021), Wong et al. (JGS, 2022), Kamboj et al. (Neurogastroenterol Motil, 2024) and Du et al. (BMC Gastroenterol, 2016) on wraps in ineffective motility; Furay et al. and Patel and Gyawali (Dis Esophagus, 2023) on MSA candidacy; Slater et al. (SAGES GERD guideline) and Lee et al. (Surg Endosc, 2023) on partial versus complete wraps; Baiu and Lau (JAMA, 2019), Angeramo and Schlottmann (Ann Surg, 2022), Schlottmann et al. (JAMA Surg, 2025) and Delcarro et al. (JLAST, 2026) on paraesophageal repair and mesh.",
      "Review changes, pending Zach's sign-off: the packet stated the SAGES guideline suggests partial over complete fundoplication for most patients; the guideline in fact leaves partial or complete wrap to shared decision-making, and the topic says so (registered separately). The packet's figure that only about 21% of PPI-refractory heartburn is reflux-related, its 0.05% surgical-utilization figure, and its pyloric stenosis pearl were left out as unverified or off-topic. The packet's crural closure target of about 5 mm beside the esophagus was rendered as admitting a 5-mm instrument beside the bougie-filled esophagus.",
    ].join(" "),
  },
  {
    id: LYON_CONSENSUS_2_SOURCE,
    title: "Lyon Consensus 2.0 on the modern diagnosis of GERD",
    kind: "article",
    citation: "Gyawali CP, Yadlapati R, Fass R, et al. Updates to the modern diagnosis of GERD: Lyon consensus 2.0. Gut. 2024;73(2):361-371.",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    details: "Registered during review as the authority behind the acid exposure time cutoffs and LA grade B as conclusive GERD, named in the GERD and antireflux packets rather than supplied directly. Pending Zach's sign-off.",
  },
  {
    id: ACG_BARRETT_2022_SOURCE,
    title: "ACG clinical guideline: Barrett esophagus (2022)",
    kind: "article",
    citation: "Shaheen NJ, Falk GW, Iyer PG, et al. Diagnosis and Management of Barrett's Esophagus: An Updated ACG Guideline. Am J Gastroenterol. 2022;117(4):559-587.",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    details: "Registered during review as the authority behind Barrett screening (chronic GERD plus three or more risk factors, which corrects the packet's two or more), surveillance intervals, dysplasia confirmation and post-eradication surveillance. Named in the GERD packet rather than supplied directly. Pending Zach's sign-off.",
  },
  {
    id: ACG_GERD_2022_SOURCE,
    title: "ACG clinical guideline: gastroesophageal reflux disease (2022)",
    kind: "article",
    citation: "Katz PO, Dunbar KB, Schnoll-Sussman FH, et al. ACG Clinical Guideline for the Diagnosis and Management of Gastroesophageal Reflux Disease. Am J Gastroenterol. 2022;117(1):27-56.",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    details: "Registered during review as the authority behind magnetic sphincter augmentation candidacy, the 1.5 T MRI limit, device erosion and off-PPI rates, TIF selection and the recommendation against Stretta. Named in the antireflux and hiatal hernia packets rather than supplied directly. Pending Zach's sign-off.",
  },
  {
    id: SAGES_GERD_2021_SOURCE,
    title: "SAGES guideline: surgical treatment of GERD (2021)",
    kind: "article",
    citation: "Slater BJ, Dirks RC, McKinley SK, et al. SAGES guidelines for the surgical treatment of gastroesophageal reflux (GERD). Surg Endosc. 2021;35(9):4903-4917.",
    url: "https://www.sages.org/publications/guidelines/guidelines-for-the-surgical-treatment-of-gastroesophageal-reflux-gerd/",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    details: "Registered during review to correct the antireflux packet: the guideline suggests surgery over medical management for chronic or refractory GERD, and leaves partial versus complete fundoplication, and division of the short gastrics, to shared decision-making rather than favoring partial wraps. The packets cite it as Slater et al. 2023. Pending Zach's sign-off.",
  },
  {
    id: STYLOPOULOS_PEH_2002_SOURCE,
    title: "Stylopoulos et al.: paraesophageal hernias, operation or observation (2002)",
    kind: "article",
    citation: "Stylopoulos N, Gazelle GS, Rattner DW. Paraesophageal hernias: operation or observation? Ann Surg. 2002;236(4):492-500.",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    details: "Registered during review as the Markov analysis behind the board-classic watchful-waiting answer for asymptomatic paraesophageal hernia, named in the hiatal hernia packet. Pending Zach's sign-off.",
  },
  {
    id: CDH_EURO_2015_SOURCE,
    title: "CDH EURO Consortium consensus, 2015 update",
    kind: "article",
    citation: "Snoek KG, Reiss IK, Greenough A, et al. Standardized Postnatal Management of Infants with Congenital Diaphragmatic Hernia in Europe: The CDH EURO Consortium Consensus — 2015 Update. Neonatology. 2016;110(1):66-74.",
    suppliedAt: "2026-10-21T00:00:00.000Z",
    details: "Registered during review to correct the diaphragmatic hernia packet's ECMO criteria: inability to keep preductal saturation above 85% or postductal saturation above 70%, oxygenation index of 40 or more for at least 3 hours, and pH below 7.15 with rising PaCO2 despite optimal ventilation. Not supplied directly. Pending Zach's sign-off.",
  },
  {
    id: SCORE_BENIGN_BILIARY_OBSTRUCTION_SOURCE,
    title: "SCORE module: Benign Biliary Obstruction",
    kind: "website",
    citation: "Baird E, Peterson W. Benign Biliary Obstruction. SCORE Curriculum, Biliary module, Surgical Council on Resident Education, May 22, 2024. https://www.surgicalcore.org/modulecontent.aspx?id=1000519",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/`. Supplies the biliary anatomy and blood supply, the causes of benign obstruction and cholangitis, presentation, laboratory and imaging workup, the medical and drainage pathway for cholangitis, the indications and steps of choledochoduodenostomy, and the evidence on cholecystectomy timing after cholangitis.",
      "Corrected during review: the module lists increased triglyceride intake, sedentary lifestyle, obesity, and rapid weight loss as the most common risk factors under cholangitis pathophysiology; those are cholesterol gallstone risk factors and were not carried into the topic as cholangitis risk factors. The Tokyo diagnostic and severity tables exist in the module only as images and are cited to the Tokyo Guidelines source instead.",
      "Added beyond the module during review and pending the owner's sign-off: sump syndrome after side-to-side choledochoduodenostomy, carried in the choledochoduodenostomy indications block.",
    ].join(" "),
  },
  {
    id: SCORE_BILE_DUCT_INJURY_SOURCE,
    title: "SCORE module: Iatrogenic Bile Duct Injury",
    kind: "website",
    citation: "James A, Klingensmith ME. Iatrogenic Bile Duct Injury. SCORE Curriculum, Biliary module, Surgical Council on Resident Education, March 4, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=127142",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/`. Supplies the critical view of safety, the injury physiology, incidence and risk factors, prevention adjuncts, technical pitfalls, presentation by timing, imaging, repair techniques, nonoperative management, and outcomes.",
      "Not carried into the topic: the module defines Calot's triangle as the cystic duct, cystic artery, and edge of segment V, which matches neither the original Calot description nor the hepatocystic triangle; the companion repair module's definitions are used instead. The Bismuth-Strasberg classification appears in the module only as an image and is cited to Strasberg's paper.",
    ].join(" "),
  },
  {
    id: SCORE_BILE_DUCT_INJURY_REPAIR_SOURCE,
    title: "SCORE module: Iatrogenic Bile Duct Injury Repair",
    kind: "website",
    citation: "He J, Choti MA. Iatrogenic Bile Duct Injury Repair. SCORE Curriculum, Biliary module, Surgical Council on Resident Education, June 16, 2023. https://www.surgicalcore.org/modulecontent.aspx?id=161417",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/`. Supplies the repair algorithm for injuries recognized at the index operation and later, management by Strasberg class, the critical view of safety and both definitions of the triangle, the intraoperative cholangiogram technique, the hepaticojejunostomy steps, the workup of a postoperative leak, outcomes, and follow-up. Its incidence and intraoperative-recognition figures differ from the companion injury module, and the topics say so rather than choosing one.",
  },
  {
    id: SCORE_CHOLEDOCHOENTERIC_ANASTOMOSIS_SOURCE,
    title: "SCORE module: Choledochoenteric Anastomosis",
    kind: "website",
    citation: "Stahl CC, Minter RM. Choledochoenteric Anastomosis. SCORE Curriculum, Biliary module, Surgical Council on Resident Education, October 16, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=144249",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/`. Supplies the indications, the referral outcomes, biliary variants and blood supply, preoperative preparation after delayed recognition, the choice among primary repair, duct-to-duct repair, choledochoduodenostomy, and Roux-en-Y reconstruction, the hepaticojejunostomy steps including the Hepp-Couinaud extension, complication rates for ERCP, PTC, and the anastomosis, and outcomes.",
      "Not carried into the topic pending the owner's decision: the module gives a 30 percent risk of long-term stricture after hepaticojejunostomy in the same section that reports more than 90 percent of patients free of jaundice and cholangitis. The two are hard to reconcile without knowing the population behind the 30 percent figure.",
    ].join(" "),
  },
  {
    id: SCORE_CHOLEDOCHAL_CYST_SOURCE,
    title: "SCORE module: Choledochal Cyst",
    kind: "website",
    citation: "Bonds M, Rocha FG. Choledochal Cyst. SCORE Curriculum, Biliary module, Surgical Council on Resident Education, October 16, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=143945",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/`. The adult-oriented module: Todani types, the anomalous pancreaticobiliary junction, malignancy as a field defect, adult presentation, the imaging algorithm, treatment by type, timing, and long-term complications.",
  },
  {
    id: SCORE_CHOLEDOCHAL_CYST_PEDIATRIC_SOURCE,
    title: "SCORE module: Choledochal Cysts (Pediatric)",
    kind: "website",
    citation: "Grubbs H, McGaha P. Choledochal Cysts (Pediatric). SCORE Curriculum, Pediatric module, Surgical Council on Resident Education, August 19, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=162963",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/`. Supplies the Todani subtypes, pancreaticobiliary maljunction, epidemiology, prenatal diagnosis and its differential, the distinction from cystic biliary atresia, treatment by type, the hepaticoduodenostomy versus Roux-en-Y comparison, the mucosectomy fallback when the cyst is adherent to the portal vein, and surveillance after excision. Its 90 to 95 percent share for type I differs from Fiser's 85 percent; the topic prints both.",
  },
  {
    id: SCORE_PSC_SOURCE,
    title: "SCORE module: Primary Sclerosing Cholangitis",
    kind: "website",
    citation: "Butler JR, Zyromski NJ. Primary Sclerosing Cholangitis. SCORE Curriculum, Biliary module, Surgical Council on Resident Education, March 23, 2023. https://www.surgicalcore.org/modulecontent.aspx?id=263722",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: "The full SCORE module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/`. Supplies epidemiology, presentation, diagnostic modalities, endoscopic, reconstructive, and transplant options with their outcome figures, medical therapy, post-transplant outcomes, and surveillance. Its statements that ERCP is the test of choice and that ursodeoxycholic acid is not recommended predate the 2022 AASLD guidance, and the topic writes both splits.",
  },
  {
    id: FISER_BILIARY_SOURCE,
    title: "Fiser ABSITE Review, 8th edition — Biliary System",
    kind: "book",
    citation: "Fiser SM. The ABSITE Review. 8th ed. Chapter 32, Biliary System, pages 438–460.",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "Page-level markdown of the chapter, held in `Pocket Chief Resources/absite-8e/ch32_biliary-system.md`. Supplies the keyed board answers on duct size, sphincter pharmacology, choledocholithiasis laboratory tests, primary and secondary duct stones, preoperative ERCP thresholds, the bile duct injury pathway and repair timing, strictures, Mirizzi syndrome, cholangitis, choledochal cysts, and primary sclerosing cholangitis.",
      "The chapter is optical character recognition of scanned pages. Reconstructed from sense rather than quoted: the early-repair window printed as `57 days`, read as seven days or fewer; and the threshold for cholangiovenous reflux printed as `>200 mm Hg`, which is physiologically implausible and is read as roughly 20 to 25 cm H2O, the classically taught figure.",
      "Added beyond the chapter during review and pending the owner's sign-off: the Csendes classification of Mirizzi syndrome and its stage-based management, carried in the Mirizzi block.",
      "One disagreement with the SCORE modules is carried in the topics rather than silently resolved: Fiser says a duct injured at cholecystectomy should not be attached to the duodenum because it will not reach, where SCORE allows choledochoduodenostomy for distal injuries when a Kocher maneuver gives a tension-free repair.",
    ].join(" "),
  },
  {
    id: FISER_CHOLEDOCHAL_CYST_SOURCE,
    title: "Fiser ABSITE Review, 8th edition — Pediatric Surgery, choledochal cyst",
    kind: "book",
    citation: "Fiser SM. The ABSITE Review. 8th ed. Chapter 43, Pediatric Surgery, page 643.",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "Page-level markdown held in `Pocket Chief Resources/absite-8e/ch43_pediatric-surgery.md`. Supplies the keyed Todani frequencies and treatments, the reasons excision is mandatory, the low malignant risk of type III, and the association of Caroli disease with congenital hepatic fibrosis and medullary sponge kidney.",
      "Added beyond the page during review and pending the owner's sign-off: the explicit statement that internal drainage of a cyst without excision is obsolete because it leaves the epithelium in place, carried in the excision warning.",
    ].join(" "),
  },
  {
    id: TOKYO_2018_CHOLANGITIS_SOURCE,
    title: "Tokyo Guidelines 2018: acute cholangitis",
    kind: "article",
    citation: "Kiriyama S, Kozaka K, Takada T, et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholangitis (with videos). J Hepatobiliary Pancreat Sci. 2018;25(1):17-30. Miura F, Okamoto K, Takada T, et al. Tokyo Guidelines 2018: initial management of acute biliary infection and flowchart for acute cholangitis. J Hepatobiliary Pancreat Sci. 2018;25(1):31-40.",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: "Both papers are named by the SCORE Benign Biliary Obstruction module as the source of its diagnostic and severity tables, which reach the module only as images. Registered so the criteria can be cited to their authority. The criteria and grading thresholds were written from the published guideline during review and are pending the owner's sign-off; the recommendation for early drainage in grade II and its observational basis were confirmed against the guideline on October 22, 2026.",
  },
  {
    id: ASGE_CHOLEDOCHOLITHIASIS_SOURCE,
    title: "ASGE guideline: endoscopy in choledocholithiasis",
    kind: "article",
    citation: "Buxbaum JL, Abbas Fehmi SM, Sultan S, et al. ASGE guideline on the role of endoscopy in the evaluation and management of choledocholithiasis. Gastrointest Endosc. 2019;89(6):1075-1105.",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: "Added beyond the supplied sources during review and pending the owner's sign-off. Neither SCORE nor Fiser carries the current risk stratification for suspected duct stones, and Fiser's preoperative ERCP thresholds predate it.",
  },
  {
    id: AASLD_PSC_SOURCE,
    title: "AASLD practice guidance: primary sclerosing cholangitis and cholangiocarcinoma",
    kind: "article",
    citation: "Bowlus CL, Arrivé L, Bergquist A, et al. AASLD practice guidance on primary sclerosing cholangitis and cholangiocarcinoma. Hepatology. 2023;77(2):659-702. doi:10.1002/hep.32771",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "Added beyond the supplied sources during review and pending the owner's sign-off, because the SCORE module predates it on ursodeoxycholic acid and diagnostic imaging.",
      "Confirmed against the guidance on October 22, 2026: ursodeoxycholic acid at 13 to 23 mg/kg/day may be considered, continued only with a meaningful fall in alkaline phosphatase or symptom relief at 12 months, and high-dose ursodeoxycholic acid at 28 to 30 mg/kg/day should not be prescribed; and surveillance colonoscopy in PSC with IBD every 1 to 2 years.",
      "Written from training knowledge and not re-verified during review: MRCP as the first diagnostic test, serum IgG4 at diagnosis to exclude IgG4-related cholangitis, imaging surveillance for cholangiocarcinoma every 6 to 12 months, and cholecystectomy for gallbladder polyps of 8 mm or more.",
    ].join(" "),
  },
  {
    id: STRASBERG_CLASSIFICATION_SOURCE,
    title: "Strasberg classification of bile duct injury",
    kind: "article",
    citation: "Strasberg SM, Hertl M, Soper NJ. An analysis of the problem of biliary injury during laparoscopic cholecystectomy. J Am Coll Surg. 1995;180(1):101-125.",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: "Both SCORE bile duct injury modules use this classification but carry it only as an image. Registered so the class definitions can be cited to their authority; the definitions were written from the published classification during review and are pending the owner's sign-off.",
  },
  {
    id: BILE_DUCT_REPAIR_TIMING_SOURCE,
    title: "Meta-analysis: timing of bile duct injury repair",
    kind: "article",
    citation: "Manivasagam SS, Chandra JN, Khera D, Aradhya PS, Hiremath AM. Optimal timing of surgical repair after bile duct injury: a systematic review and meta-analysis. Cureus. 2024;16(2):e53507. doi:10.7759/cureus.53507",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: "Added beyond the supplied sources during review and pending the owner's sign-off, to set the board teaching on repair timing against the current evidence. Twenty observational studies and 3,421 patients; early repair under 14 days and delayed repair after 6 weeks both had lower morbidity than repair between 2 and 6 weeks, delayed repair had the lowest stricture rate, and timing was not associated with mortality. Observational, and a 2022 analysis of about 3,800 patients found early and delayed repair comparable.",
  },
  {
    id: ANORECTAL_PACKET_SOURCE,
    title: "Owner-supplied anorectal study guides",
    kind: "user_notes",
    citation: "Personal study guides supplied to Pocket Chief, October 22, 2026: \"Pocket Chief — remaining anorectal topics\", seven guides (Anal Fissure, Anal Sphincterotomy, Anorectal Abscess and Fistulae, Anorectal Abscess Drainage, Anorectal Fistula Repair, Perianal Condylomas Excision, Anal Dysplasia and STDs) with a validation report.",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "Each guide is written from its own SCORE module read in full, cross-checked against Fiser chapter 37 pages 554-562, and updated against the ASCRS anal fissure guideline (2023), the ASCRS abscess and fistula guideline (2022), the CDC 2021 STI treatment guidelines, NIH and NYSDOH guidance on anal dysplasia in adults with HIV, and the ANCHOR trial.",
      "The guides also cite the ASCRS anal squamous cell cancer guideline (revised 2018) for LSIL/HSIL nomenclature and anal transition-zone anatomy, and the ASCRS patient page \"Anal Fissure Expanded Information\" for reassessment of a nonhealing fissure; neither is registered separately because no block leans on it as the authority.",
      "Source disagreements the guides located and the topics carry as split blocks: posterior fissure frequency (about 90% in SCORE and Fiser, 73% in ASCRS); SCORE's mandatory medical-then-botulinum-then-LIS ladder against ASCRS permitting selected primary LIS; flap healing inferior in SCORE and Fiser but comparable in ASCRS; Fiser's lower-quarter fistulotomy threshold against SCORE's one-third and ASCRS's under 30%; Fiser's external drainage of intersphincteric abscesses and universal transanal supralevator drainage against origin-dependent drainage; and SCORE fistula repair's blanket Crohn contraindication to fistulotomy against its own section 5.3 and ASCRS recommendation 22.",
      "Deliberately left out pending verification, as the guides flag: the condyloma perianal block landmarks (SCORE alternates between ischial spine and tuberosity), cardiac prophylaxis indications, topical and botulinum dosing, and any persistent-incontinence rescue algorithm.",
      "Beyond the packet, pending owner sign-off: the Buschke-Lowenstein tumor (giant condyloma, verrucous carcinoma) as a board item treated by wide local excision; condylomata lata described as the flat moist plaques of secondary syphilis; HPV plume as an occupational exposure; anterior fissures being relatively more common in women; the bedside signs of Fournier gangrene (crepitus, dusky or necrotic skin, pain beyond the visible margin) and diabetes blunting them; diverticulitis, appendicitis, and Crohn disease as the pelvic sources of a descending supralevator abscess; intersphincteric as the most common Parks type; mushroom or Malecot catheters as the named drainage catheters; simultaneous fistulotomy of a simple tract lowering recurrence; the Hanley incision placed between coccyx and anus; endorectal flap composition (mucosa, submucosa, and some internal sphincter) with excision of the flap tip; a definition of marsupialization; and converting a closed sphincterotomy to open when the plane cannot be identified.",
    ].join(" "),
  },
  {
    id: SCORE_ANAL_FISSURE_SOURCE,
    title: "SCORE module: Anal Fissure",
    kind: "website",
    citation: "Grossman R, Bayasi M. Anal Fissure. SCORE Curriculum, Anorectal module, Surgical Council on Resident Education, March 12, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=130103",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=130103",
    details: "Retrieved August 12, 2026. Seven numbered learning objectives, read in full by the owner's guide; the chemodenervation video and images were not reviewed.",
  },
  {
    id: SCORE_ANAL_SPHINCTEROTOMY_SOURCE,
    title: "SCORE module: Anal Sphincterotomy",
    kind: "website",
    citation: "Grossman R, Bayasi M. Anal Sphincterotomy. SCORE Curriculum, Anorectal module, Surgical Council on Resident Education, March 12, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=130512",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=130512",
    details: "Retrieved August 12, 2026. Five numbered objectives with subobjectives 1.1 and 1.2. The module quotes incontinence after LIS as 8% to 30% over follow-up to six years and some historical series at 30% to 40%; the disease module quotes 4% to 30%. The topic distinguishes transient flatus and seepage from persistent solid-stool incontinence rather than quoting one rate.",
  },
  {
    id: SCORE_ANORECTAL_ABSCESS_FISTULAE_SOURCE,
    title: "SCORE module: Anorectal Abscess and Fistulae",
    kind: "website",
    citation: "Wilson S, Phatak U. Anorectal Abscess and Fistulae. SCORE Curriculum, Anorectal module, Surgical Council on Resident Education, March 12, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=130173",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=130173",
    details: "Retrieved August 12, 2026. Twelve objectives and twelve subobjectives. Not carried: the 8% to 50% incontinence range, which covers all anorectal surgery rather than simple drainage; the \"up to 80%\" Crohn abscess figure; and the blanket preincision cardiac prophylaxis statement, which was not verified against current indications. Its Goodsall accuracy claim (better for posterior openings) conflicts with ASCRS 2022 (better for anterior), so no accuracy figure is taught.",
  },
  {
    id: SCORE_ANORECTAL_ABSCESS_DRAINAGE_SOURCE,
    title: "SCORE module: Anorectal Abscess Drainage",
    kind: "website",
    citation: "Jeganathan NA, Scow JS. Anorectal Abscess Drainage. SCORE Curriculum, Anorectal module, Surgical Council on Resident Education, March 12, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=130568",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=130568",
    details: "Retrieved August 12, 2026. Seven numbered objectives. Recurrence is quoted as up to 40% within a year in preparation and 4% to 31% under complications; ASCRS cites up to 44%. The ranges reflect different cohorts and are not combined.",
  },
  {
    id: SCORE_ANORECTAL_FISTULA_REPAIR_SOURCE,
    title: "SCORE module: Anorectal Fistulae Repair",
    kind: "website",
    citation: "Nweze N, DeLeon M. Anorectal Fistulae Repair. SCORE Curriculum, Anorectal module, Surgical Council on Resident Education, March 12, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=130637",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=130637",
    details: "Retrieved August 12, 2026. The SCORE outline names this entry \"Anorectal Fistula Repair\"; the module itself is titled \"Anorectal Fistulae Repair\". Its section 2 describes the suprasphincteric tract descending through the external sphincter; the topic uses the ASCRS 2022 Table 1 anatomy instead, descending through the levator after passing over puborectalis.",
  },
  {
    id: SCORE_PERIANAL_CONDYLOMAS_SOURCE,
    title: "SCORE module: Perianal Condylomas Excision",
    kind: "website",
    citation: "Lu P, Henry AJ, Irani JL. Perianal Condylomas Excision. SCORE Curriculum, Anorectal module, Surgical Council on Resident Education, March 12, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=167855",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=167855",
    details: "Retrieved August 12, 2026. Clearance of 89% to 100%, recurrence up to about one third, roughly four weeks of pain, and the two-week review visit are the module's own estimates. Its perianal block description is not carried, because it alternates between ischial spine and ischial tuberosity landmarks.",
  },
  {
    id: SCORE_ANAL_DYSPLASIA_STDS_SOURCE,
    title: "SCORE module: Anal Dysplasia and STDs",
    kind: "website",
    citation: "Choi S, Lipman J. Anal Dysplasia and STDs. SCORE Curriculum, Anorectal module, Surgical Council on Resident Education, April 13, 2021. https://www.surgicalcore.org/modulecontent.aspx?id=1000459",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=1000459",
    details: "Retrieved August 12, 2026. The module predates the ANCHOR trial and current HIV anal screening guidance; its uniform 16-week topical course and podophyllin recommendation are superseded by the CDC 2021 STI guidelines.",
  },
  {
    id: FISER_BENIGN_ANORECTAL_SOURCE,
    title: "Fiser ABSITE Review, 8th edition — anal and rectal chapter, benign anorectal disease",
    kind: "book",
    citation: "Fiser SM. The ABSITE Review, 8th edition. Chapter 37, Anal and Rectal, pages 554-562: condylomata acuminata, anal fissure and lateral internal sphincterotomy technique, anorectal abscess, fistula-in-ano, and anorectal HIV disease.",
    suppliedAt: "2026-08-12T00:00:00.000Z",
    details: "Owner-supplied chapter text, an OCR extraction. Malformed strings on page 555 (\"stool baths\", \"5/5—headaches\") and page 554 (\"Nlx: laser surgery\") are not used as facts. Carried as the board answer where it differs from current guidance: drainage routes on page 556, the lower-quarter fistulotomy threshold and avoiding plugs and glue on page 557, and division to the dentate line in the page 555 sphincterotomy caption.",
  },
  {
    id: ASCRS_ANAL_FISSURE_SOURCE,
    title: "ASCRS clinical practice guideline for the management of anal fissures",
    kind: "article",
    citation: "Davids JS, Hawkins AT, Bhama AR, et al. The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for the Management of Anal Fissures. Dis Colon Rectum. 2023;66(2):190-199. doi:10.1097/DCR.0000000000002664",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    url: "https://doi.org/10.1097/DCR.0000000000002664",
    details: "Read in full by the owner's guide through recommendations 1 to 11, October 21, 2026, and confirmed as the current listed fissure guideline on the ASCRS index. Used for selected primary LIS without prior pharmacologic therapy (recommendation 5), tailored division to the fissure apex (8), limited evidence for repeat LIS (9), and the advancement flap as comparable with weaker evidence (10).",
  },
  {
    id: ASCRS_ABSCESS_FISTULA_SOURCE,
    title: "ASCRS clinical practice guideline for anorectal abscess, fistula-in-ano, and rectovaginal fistula",
    kind: "article",
    citation: "Gaertner WB, Burgess PL, Davids JS, et al. The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for the Management of Anorectal Abscess, Fistula-in-Ano, and Rectovaginal Fistula. Dis Colon Rectum. 2022;65(8):964-985. doi:10.1097/DCR.0000000000002473",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    url: "https://doi.org/10.1097/DCR.0000000000002473",
    details: "Read by the owner's guide October 21, 2026; still the listed guideline on the ASCRS index October 22, 2026. Used for selective imaging (recommendation 2), origin-dependent drainage and the modified Hanley approach (3), simultaneous fistulotomy only for simple fistulas (4), selective antibiotics for cellulitis, systemic infection, or immunosuppression (5), LIFT and flap technique (7 and 8), and selected fistulotomy for simple low Crohn fistulas (22). Its literature search closed November 5, 2021.",
  },
  {
    id: CDC_STI_2021_SOURCE,
    title: "CDC Sexually Transmitted Infections Treatment Guidelines, 2021",
    kind: "website",
    citation: "Workowski KA, Bachmann LH, Chan PA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187. Chapters used: Anogenital Warts; Proctitis, Proctocolitis, and Enteritis; Genital Herpes; Primary and Secondary Syphilis. https://www.cdc.gov/std/treatment-guidelines/",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    url: "https://www.cdc.gov/std/treatment-guidelines/",
    details: "Chapters checked by the owner's guide October 21, 2026. Adult regimens carried exactly as displayed: ceftriaxone 500 mg IM once (1 g at 150 kg or more) plus doxycycline 100 mg twice daily for 7 days for acute proctitis, extended to 21 days for suspected LGV; valacyclovir 1 g twice daily for 7 to 10 days for a first HSV episode; benzathine penicillin G 2.4 million units IM once for primary and secondary syphilis. Also used for biopsy indications in anogenital warts, intra-anal wart treatment, and the pregnancy and immunocompromise restrictions on wart agents.",
  },
  {
    id: NIH_HIV_HPV_SOURCE,
    title: "NIH adult and adolescent opportunistic infection guidelines: human papillomavirus disease",
    kind: "website",
    citation: "Panel on Guidelines for the Prevention and Treatment of Opportunistic Infections in Adults and Adolescents With HIV. Human Papillomavirus Disease. Updated July 9, 2024; reviewed March 16, 2026. https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/human",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    url: "https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/human",
    details: "Accessed October 21, 2026. Used for anal cancer screening in people with HIV: annual symptom review, screening from age 35 in men who have sex with men and transgender women and from 45 in other people with HIV, and linking cytology to available high-resolution anoscopy.",
  },
  {
    id: NYSDOH_ANAL_DYSPLASIA_SOURCE,
    title: "NYSDOH AIDS Institute guideline: screening for anal dysplasia and cancer in adults with HIV",
    kind: "website",
    citation: "New York State Department of Health AIDS Institute. Screening for Anal Dysplasia and Cancer in Adults With HIV. Web publication February 25, 2025. https://www.hivguidelines.org/guideline/hiv-anal-cancer/",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    url: "https://www.hivguidelines.org/guideline/hiv-anal-cancer/",
    details: "Checked October 21, 2026. Used for treatment of biopsy-confirmed HSIL in adults with HIV and repeat high-resolution anoscopy six months after successful treatment, with ongoing surveillance thereafter.",
  },
  {
    id: ANCHOR_TRIAL_SOURCE,
    title: "ANCHOR trial: treating anal HSIL to prevent anal cancer",
    kind: "article",
    citation: "Palefsky JM, Lee JY, Jay N, et al. Treatment of Anal High-Grade Squamous Intraepithelial Lesions to Prevent Anal Cancer. N Engl J Med. 2022;386(24):2273-2282. doi:10.1056/NEJMoa2201048",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    url: "https://doi.org/10.1056/NEJMoa2201048",
    details: "Result verified by the owner's guide through the indexed abstract and the NCI report of June 15, 2022; the full article returned 403. Adults with HIV aged 35 or older with biopsy-proven HSIL; treatment reduced progression to anal cancer by 57% against active monitoring.",
  },
  {
    id: CDC_HPV_VACCINE_SOURCE,
    title: "CDC HPV vaccine recommendations",
    kind: "website",
    citation: "Centers for Disease Control and Prevention. HPV Vaccine Recommendations. July 9, 2024. https://www.cdc.gov/hpv/hcp/vaccination-considerations/index.html",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    url: "https://www.cdc.gov/hpv/hcp/vaccination-considerations/index.html",
    details: "Checked October 21, 2026. Routine vaccination at 11 to 12 (from 9), catch-up through 26, shared decision-making at 27 to 45; two doses 6 to 12 months apart when started before 15, three doses for those starting at 15 or older and for immunocompromised people.",
  },

  {
        "id": SCORE_PEPTIC_ULCER_SOURCE,
        "title": "SCORE | Peptic Ulcer Disease",
        "kind": "website",
        "citation": "SCORE | Peptic Ulcer Disease. September 18, 2025. Learning Objectives §§1–8; numbered §5.1–5.2 and §6.1–6.2; source conflicts retained in review flags.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "Learning Objectives §§1–8; numbered §5.1–5.2 and §6.1–6.2; source conflicts retained in review flags. Complete extracted Markdown read; source images/videos not inspected. Private supplied corpus: Pocket Chief Resources/score-modules/SCORE_Peptic_Ulcer_Disease_b4ec1a7ca2.md. Source text and media are not redistributed. Module date: September 18, 2025. Retrieved: 2026-08-12T16:29:44.661142+00:00. Pending Zach's clinical review. Supplied-source teaching is paraphrased; source disagreements and OCR problems remain in the review notes.",
        "url": "https://www.surgicalcore.org/modulecontent.aspx?id=1000204"
    },
  {
        "id": FISER_STOMACH_SOURCE,
        "title": "Fiser, The ABSITE Review, 8th edition — Chapter 30 — Stomach",
        "kind": "book",
        "citation": "Fiser, The ABSITE Review, 8th edition — Chapter 30 — Stomach. Not supplied in extracted chapter; edition identified as 8th.. pp.391–392 anatomy/physiology; 394–395 vagotomy/pyloroplasty; 396–397 UGIB; 398–400 duodenal ulcers; 401 gastric ulcers; 402 stress gastritis; 412–413 postgastrectomy complications.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "pp.391–392 anatomy/physiology; 394–395 vagotomy/pyloroplasty; 396–397 UGIB; 398–400 duodenal ulcers; 401 gastric ulcers; 402 stress gastritis; 412–413 postgastrectomy complications. Relevant textual sections read; page markers refer to book pages. OCR and image descriptions require restraint; original scans not inspected. Private supplied corpus: Pocket Chief Resources/absite-8e/ch30_stomach.md. Source text and media are not redistributed. Pending Zach's clinical review. Supplied-source teaching is paraphrased; source disagreements and OCR problems remain in the review notes."
    },
  {
        "id": SCORE_GASTRODUODENAL_PERFORATION_SOURCE,
        "title": "SCORE | Gastroduodenal Perforation Repair",
        "kind": "website",
        "citation": "SCORE | Gastroduodenal Perforation Repair. June 27, 2025. Learning Objectives §§1–8: anatomy, etiology, presentation, nonoperative selection, gastric and duodenal operations, postoperative care, complications.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "Learning Objectives §§1–8: anatomy, etiology, presentation, nonoperative selection, gastric and duodenal operations, postoperative care, complications. Complete extracted Markdown read; source images/videos not inspected. Private supplied corpus: Pocket Chief Resources/score-modules/SCORE_Gastroduodenal_Perforation_Repair_dfeaa79343.md. Source text and media are not redistributed. Module date: June 27, 2025. Retrieved: 2026-08-12T16:46:02.692613+00:00. Pending Zach's clinical review. Supplied-source teaching is paraphrased; source disagreements and OCR problems remain in the review notes.",
        "url": "https://www.surgicalcore.org/modulecontent.aspx?id=146350"
    },
  {
        "id": SCORE_VAGOTOMY_SOURCE,
        "title": "SCORE | Vagotomy and Drainage",
        "kind": "website",
        "citation": "SCORE | Vagotomy and Drainage. August 21, 2025. Learning Objectives §§1–5; §2.1 physiology, §2.2 anatomy; §3.1 considerations, §3.2 vagotomy, §3.3 drainage; §4.1 injuries/rescue, §4.2 postoperative syndromes.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "Learning Objectives §§1–5; §2.1 physiology, §2.2 anatomy; §3.1 considerations, §3.2 vagotomy, §3.3 drainage; §4.1 injuries/rescue, §4.2 postoperative syndromes. Complete extracted Markdown read; source images/videos not inspected. Private supplied corpus: Pocket Chief Resources/score-modules/SCORE_Vagotomy_and_Drainage_d5dfc8cf69.md. Source text and media are not redistributed. Module date: August 21, 2025. Retrieved: 2026-08-12T16:46:08.766093+00:00. Pending Zach's clinical review. Supplied-source teaching is paraphrased; source disagreements and OCR problems remain in the review notes.",
        "url": "https://www.surgicalcore.org/modulecontent.aspx?id=146408"
    },
  {
        "id": SCORE_UPPER_GI_BLEEDING_SOURCE,
        "title": "SCORE | Upper Gastrointestinal Bleeding",
        "kind": "website",
        "citation": "SCORE | Upper Gastrointestinal Bleeding. September 19, 2025. Learning Objectives §§1–7; §4.1 history, §4.2 imaging; §5.1 appearance, §5.2 Forrest; §7.1 procedural, §7.2 pharmacologic treatment.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "Learning Objectives §§1–7; §4.1 history, §4.2 imaging; §5.1 appearance, §5.2 Forrest; §7.1 procedural, §7.2 pharmacologic treatment. Complete extracted Markdown read; source images/videos not inspected. Private supplied corpus: Pocket Chief Resources/score-modules/SCORE_Upper_Gastrointestinal_Bleeding_367bdff096.md. Source text and media are not redistributed. Module date: September 19, 2025. Retrieved: 2026-08-12T16:31:46.587696+00:00. Pending Zach's clinical review. Supplied-source teaching is paraphrased; source disagreements and OCR problems remain in the review notes.",
        "url": "https://www.surgicalcore.org/modulecontent.aspx?id=1000490"
    },
  {
        "id": SCORE_STRESS_GASTRITIS_SOURCE,
        "title": "SCORE | Stress Gastritis",
        "kind": "website",
        "citation": "SCORE | Stress Gastritis. April 24, 2026. Learning Objectives §§1–6; §1.1 general risks, §1.2 clinical risks; §3.1 symptoms, §3.2 endoscopy, §3.3 biopsy.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "Learning Objectives §§1–6; §1.1 general risks, §1.2 clinical risks; §3.1 symptoms, §3.2 endoscopy, §3.3 biopsy. Complete extracted Markdown read; source images/videos not inspected. Private supplied corpus: Pocket Chief Resources/score-modules/SCORE_Stress_Gastritis_0cc3baf409.md. Source text and media are not redistributed. Module date: April 24, 2026. Retrieved: 2026-08-12T16:42:26.091186+00:00. Pending Zach's clinical review. Supplied-source teaching is paraphrased; source disagreements and OCR problems remain in the review notes.",
        "url": "https://www.surgicalcore.org/modulecontent.aspx?id=136471"
    },
  {
        "id": SCORE_EGD_SOURCE,
        "title": "SCORE | Esophagogastroduodenoscopy",
        "kind": "website",
        "citation": "SCORE | Esophagogastroduodenoscopy. February 10, 2026. Learning Objectives §§1–7: overview, indications/contraindications, anatomy, preparation, steps, intraoperative decisions, complications.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "Learning Objectives §§1–7: overview, indications/contraindications, anatomy, preparation, steps, intraoperative decisions, complications. Complete extracted Markdown read; source images/videos not inspected. Private supplied corpus: Pocket Chief Resources/score-modules/SCORE_Esophagogastroduodenoscopy_88428dc12e.md. Source text and media are not redistributed. Module date: February 10, 2026. Retrieved: 2026-08-12T16:40:47.359243+00:00. Pending Zach's clinical review. Supplied-source teaching is paraphrased; source disagreements and OCR problems remain in the review notes.",
        "url": "https://www.surgicalcore.org/modulecontent.aspx?id=130707"
    },
  {
        "id": ACG_H_PYLORI_2024_SOURCE,
        "title": "Chey et al. ACG Clinical Guideline: Treatment of Helicobacter pylori Infection (2024), author-reviewed ACG Guideline Highlights",
        "kind": "article",
        "citation": "Chey et al. ACG Clinical Guideline: Treatment of Helicobacter pylori Infection (2024), author-reviewed ACG Guideline Highlights. Guideline September 2024; highlights hosted January 2025. Single-page highlights: When to Test, Regimens, Treatment Pearls. Duration corroborated by guideline abstract, PMID 39626064. DOI 10.14309/ajg.0000000000002968.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "Single-page highlights: When to Test, Regimens, Treatment Pearls. Duration corroborated by guideline abstract, PMID 39626064. DOI 10.14309/ajg.0000000000002968. Official one-page highlights read, including regimen doses/test-of-cure; 14-day preference verified in original guideline abstract. Publisher full-text route failed; no full-guideline review claimed. Additional primary access: https://pubmed.ncbi.nlm.nih.gov/39626064/ Pending Zach's clinical review. Primary guidance/study added beyond the supplied SCORE/Fiser texts during guide preparation; pending owner sign-off.",
        "url": "https://gi.org/wp-content/uploads/2025/01/ACG-Hpylori-Guidelines-Highlights-2024-FINAL.pdf.pdf"
    },
  {
        "id": ESGE_ULCER_BLEEDING_2026_SOURCE,
        "title": "Gralnek et al. ESGE Guideline — Endoscopic diagnosis and management of peptic ulcer bleeding, Update 2026",
        "kind": "article",
        "citation": "Gralnek et al. ESGE Guideline — Endoscopic diagnosis and management of peptic ulcer bleeding, Update 2026. Published online May 13, 2026; Endoscopy 58:899–924. Table 1 pp.902–909; airway/NG p.904, timing/clot p.905, low-risk stigmata/OTS p.906, topical/rescue p.907; full discussion pp.913–918. DOI 10.1055/a-2863-8314.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "Table 1 pp.902–909; airway/NG p.904, timing/clot p.905, low-risk stigmata/OTS p.906, topical/rescue p.907; full discussion pp.913–918. DOI 10.1055/a-2863-8314. Official PDF accessed; relevant recommendations read through extracted text. File includes supplement (140 PDF pages); book-style printed page numbers are used here. Pending Zach's clinical review. Primary guidance/study added beyond the supplied SCORE/Fiser texts during guide preparation; pending owner sign-off.",
        "url": "https://www.esge.com/assets/downloads/pdfs/guidelines/2026_a-2863-8314.pdf"
    },
  {
        "id": WSES_PEPTIC_ULCER_2020_SOURCE,
        "title": "Tarasconi et al. Perforated and bleeding peptic ulcer: WSES guidelines",
        "kind": "article",
        "citation": "Tarasconi et al. Perforated and bleeding peptic ulcer: WSES guidelines. January 7, 2020. Perforated peptic ulcer: Diagnosis, Non-operative management, Surgical treatment (small/large perforations, damage control), Antimicrobial therapy. DOI 10.1186/s13017-019-0283-9.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "Perforated peptic ulcer: Diagnosis, Non-operative management, Surgical treatment (small/large perforations, damage control), Antimicrobial therapy. DOI 10.1186/s13017-019-0283-9. Publisher article and primary PDF/indexed passages accessed for the indicated recommendations. A newer ulcer-endoscopy guideline is separately cited; WSES is not labeled a 2026 publication. Pending Zach's clinical review. Primary guidance/study added beyond the supplied SCORE/Fiser texts during guide preparation; pending owner sign-off.",
        "url": "https://link.springer.com/article/10.1186/s13017-019-0283-9"
    },
  {
        "id": SCCM_ASHP_STRESS_PROPHYLAXIS_2024_SOURCE,
        "title": "MacLaren et al. SCCM/ASHP Guideline for Prevention of Stress-Related Gastrointestinal Bleeding in Critically Ill Adults",
        "kind": "article",
        "citation": "MacLaren et al. SCCM/ASHP Guideline for Prevention of Stress-Related Gastrointestinal Bleeding in Critically Ill Adults. July 15, 2024; Crit Care Med 52:e421–e430. Society recommendations: risk factors, neurocritical care, enteral nutrition, first-line agents, route, dosing, cessation. DOI 10.1097/CCM.0000000000006330.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "Society recommendations: risk factors, neurocritical care, enteral nutrition, first-line agents, route, dosing, cessation. DOI 10.1097/CCM.0000000000006330. Official SCCM recommendation page read, including low-dose and cessation details; full publisher article not claimed as completely reviewed. Pending Zach's clinical review. Primary guidance/study added beyond the supplied SCORE/Fiser texts during guide preparation; pending owner sign-off.",
        "url": "https://sccm.org/clinical-resources/guidelines/guidelines/sccm-ashp-guideline-prevention-of-ugib"
    },
  {
        "id": ACG_UGIB_2021_SOURCE,
        "title": "Laine et al. ACG Clinical Guideline: Upper Gastrointestinal and Ulcer Bleeding",
        "kind": "article",
        "citation": "Laine et al. ACG Clinical Guideline: Upper Gastrointestinal and Ulcer Bleeding. May 2021; Am J Gastroenterol 116:899–917. Risk assessment; transfusion; pre-endoscopic erythromycin; timing; ulcer hemostasis/adherent clot; modalities; postendoscopic PPI; recurrent/failed endoscopic hemostasis. DOI 10.14309/ajg.0000000000001245.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "Risk assessment; transfusion; pre-endoscopic erythromycin; timing; ulcer hemostasis/adherent clot; modalities; postendoscopic PPI; recurrent/failed endoscopic hemostasis. DOI 10.14309/ajg.0000000000001245. Original abstract and indexed primary guideline/recommendation-table passages reviewed; publisher open failed. Not a claim of unrestricted full-text access. ESGE 2026 updates explicitly distinguished. Additional primary access: https://doi.org/10.14309/ajg.0000000000001245 Pending Zach's clinical review. Primary guidance/study added beyond the supplied SCORE/Fiser texts during guide preparation; pending owner sign-off.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33929377/"
    },
  {
        "id": ACG_CAG_ANTITHROMBOTICS_2022_SOURCE,
        "title": "Abraham et al. ACG-CAG Clinical Practice Guideline: Anticoagulants and Antiplatelets During Acute GI Bleeding and the Periendoscopic Period",
        "kind": "article",
        "citation": "Abraham et al. ACG-CAG Clinical Practice Guideline: Anticoagulants and Antiplatelets During Acute GI Bleeding and the Periendoscopic Period. March/April 2022. Table 1 acute GI bleeding; Table 2 elective endoscopy (recommendations 11–18); aspirin secondary prevention and uncertain resumption timing.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "Table 1 acute GI bleeding; Table 2 elective endoscopy (recommendations 11–18); aspirin secondary prevention and uncertain resumption timing. Official ACG PDF accessed and relevant recommendation tables read; no universal reversal or medication-hold protocol inferred. Pending Zach's clinical review. Primary guidance/study added beyond the supplied SCORE/Fiser texts during guide preparation; pending owner sign-off.",
        "url": "https://gi.org/wp-content/uploads/2022/03/ACG-CAG-Guideline.pdf"
    },
  {
        "id": MULTISOCIETY_GLP1_2024_SOURCE,
        "title": "AGA/ASA/ASMBS/ISPCOP/SAGES multisociety GLP-1 perioperative guidance — official society summary",
        "kind": "article",
        "citation": "AGA/ASA/ASMBS/ISPCOP/SAGES multisociety GLP-1 perioperative guidance — official society summary. October 30, 2024. Society summary: continued treatment for most elective procedures; higher-risk GI/emptying cases, 24-hour liquid diet and adjusted anesthesia assessment.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "Society summary: continued treatment for most elective procedures; higher-risk GI/emptying cases, 24-hour liquid diet and adjusted anesthesia assessment. Primary participating-society release reviewed via indexed passage; full implementation protocol not reviewed or reproduced. Pending Zach's clinical review. Primary guidance/study added beyond the supplied SCORE/Fiser texts during guide preparation; pending owner sign-off.",
        "url": "https://gastro.org/press-releases/most-patients-can-continue-glp-1-anti-obesity-drugs-before-surgery-2/"
    },
  {
        "id": FISER_ESOPHAGUS_SOURCE,
        "title": "Fiser, The ABSITE Review, 8th edition — Chapter 29 — Esophagus",
        "kind": "book",
        "citation": "Fiser, The ABSITE Review, 8th edition — Chapter 29 — Esophagus. Not supplied in extracted chapter; edition identified as 8th.. pp.364–367 anatomy, vagus, narrowing sites and endoscopic distances; p.388 Mallory–Weiss; p.389 iatrogenic perforation. p.364 Grassi wording conflicts with p.394 stomach chapter and is flagged.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "pp.364–367 anatomy, vagus, narrowing sites and endoscopic distances; p.388 Mallory–Weiss; p.389 iatrogenic perforation. p.364 Grassi wording conflicts with p.394 stomach chapter and is flagged. Relevant textual sections read; page markers refer to book pages. OCR and image descriptions require restraint; original scans not inspected. Private supplied corpus: Pocket Chief Resources/absite-8e/ch29_esophagus.md. Source text and media are not redistributed. Pending Zach's clinical review. Supplied-source teaching is paraphrased; source disagreements and OCR problems remain in the review notes."
    },
  {
        "id": FISER_GI_HORMONES_SOURCE,
        "title": "Fiser, The ABSITE Review, 8th edition — Chapter 28 — Gastrointestinal Hormones",
        "kind": "book",
        "citation": "Fiser, The ABSITE Review, 8th edition — Chapter 28 — Gastrointestinal Hormones. Not supplied in extracted chapter; edition identified as 8th.. p.361 gastrin, somatostatin and parietal acid inhibition; hormone arrows/symbols in OCR not used to invent quantities.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "p.361 gastrin, somatostatin and parietal acid inhibition; hormone arrows/symbols in OCR not used to invent quantities. Relevant textual sections read; page markers refer to book pages. OCR and image descriptions require restraint; original scans not inspected. Private supplied corpus: Pocket Chief Resources/absite-8e/ch28_gastrointestinal-hormones.md. Source text and media are not redistributed. Pending Zach's clinical review. Supplied-source teaching is paraphrased; source disagreements and OCR problems remain in the review notes."
    },
  {
        "id": BAVENO_VARICEAL_CONSENSUS_SOURCE,
        "title": "de Franchis et al. Baveno VII — Renewing consensus in portal hypertension; checked against indexed Baveno VIII 2026 update",
        "kind": "article",
        "citation": "de Franchis et al. Baveno VII — Renewing consensus in portal hypertension; checked against indexed Baveno VIII 2026 update. Baveno VII 2022; Baveno VIII 2026. Baveno VII §6 Acute variceal bleeding (vasoactive treatment, antibiotics, timing, endoscopic/TIPS principles). Baveno VIII indexed acute-variceal paragraphs only.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "Baveno VII §6 Acute variceal bleeding (vasoactive treatment, antibiotics, timing, endoscopic/TIPS principles). Baveno VIII indexed acute-variceal paragraphs only. Baveno VII primary passages and Baveno VIII indexed primary recommendations reviewed. Baveno VIII full-text open failed; detailed updated TIPS/gastric-varix criteria not inferred. Additional primary access: https://www.journal-of-hepatology.eu/article/S0168-8278%2826%2902778-9/fulltext Pending Zach's clinical review. Primary guidance/study added beyond the supplied SCORE/Fiser texts during guide preparation; pending owner sign-off.",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/11090185/"
    },
  {
        "id": NASOGASTRIC_ASPIRATE_2004_SOURCE,
        "title": "Aljebreen et al. Nasogastric aspirate predicts high-risk endoscopic lesions in patients with acute upper-GI bleeding",
        "kind": "article",
        "citation": "Aljebreen et al. Nasogastric aspirate predicts high-risk endoscopic lesions in patients with acute upper-GI bleeding. 2004. Results: imperfect negative predictive value of aspirate for high-risk lesions; clear/bile-stained subgroup also described in the ACG original guideline discussion.",
        "suppliedAt": "2026-10-22T00:00:00.000Z",
        "details": "Results: imperfect negative predictive value of aspirate for high-risk lesions; clear/bile-stained subgroup also described in the ACG original guideline discussion. Original-study abstract and ACG primary discussion indexed passages reviewed. Used only to reject a negative-aspirate exclusion rule, not to recommend routine lavage. Additional primary access: https://gi.org/guideline/management-of-patients-with-ulcer-bleeding/ Pending Zach's clinical review. Primary guidance/study added beyond the supplied SCORE/Fiser texts during guide preparation; pending owner sign-off.",
        "url": "https://pubmed.ncbi.nlm.nih.gov/14745388/"
    },
  {
    id: SCORE_AAA_DISEASE_SOURCE,
    title: "SCORE module: Abdominal Aortic Aneurysms",
    kind: "website",
    citation: "Olmstead A, Rossi MJ. Abdominal Aortic Aneurysms. SCORE Curriculum, Arterial Disease module, Surgical Council on Resident Education, December 8, 2025. https://www.surgicalcore.org/modulecontent.aspx?id=149875",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=149875",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "The full module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/`. Source S1 of the aortic aneurysm packet (October 22, 2026): definitions, etiology, risk factors, associated aneurysms, rupture risk by diameter, physical examination sensitivity, imaging, the Society for Vascular Surgery screening recommendation and surveillance intervals, and the indications for intervention.",
      "Read against the packet during review: every S1 statement was found in the module. The module's statement that patients with a popliteal aneurysm have a 62% chance of an associated AAA disagrees with Fiser (half have another aneurysm somewhere) and the 2022 SVS popliteal guideline meta-analysis (about one-third); the peripheral aneurysm topic carries the disagreement.",
    ].join(" "),
  },
  {
    id: AORTIC_ANEURYSMS_OE_SOURCE,
    title: "Owner-supplied abdominal aortic aneurysm study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 22, 2026: \"Abdominal Aortic Aneurysm — Board Review Study Guide\", an OpenEvidence synthesis (https://www.openevidence.com/ask/8fa88083-6963-464a-9882-1e7154ae5343) provided as a Word document and Markdown copy to check the packet for this topic.",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions and a short reference table. Works it cites: Isselbacher (2022 ACC/AHA aortic disease guideline, registered separately); Chaikof (2018 SVS AAA guideline, registered separately); Mazzolai (2024 ESC peripheral arterial and aortic guideline); Hensley and Upchurch (JACC 2022); Sakalihasan (Nature Reviews Disease Primers 2018); Wengerter (2018) and Abdul Jabbar (2020) on EVAR neck anatomy; Czerny (2024 EACTS/STS) and Wilson (2016 AHA) on infected aneurysms.",
      "Used during review for the board-versus-current table: the ACC/AHA surveillance intervals that differ for women, the SVS permissive hypotension target of 70 to 90 mm Hg, the earlier convergence of EVAR and open survival, diabetes as an inverse association, and the trials showing no benefit from early repair of 4.0 to 5.4 cm aneurysms. Each is added beyond the packet's SCORE and Fiser sources and is pending Zach's sign-off.",
      "Not carried: EVAR neck and access minimums that duplicate or refine the repair topic's SCORE table, the endoleak table (the repair topic holds it), and the special scenarios already in the repair topic.",
    ].join(" "),
  },
  {
    id: SCORE_ACUTE_PANCREATITIS_SOURCE,
    title: "SCORE: Acute Pancreatitis",
    kind: "website",
    citation: "Merani S. Acute Pancreatitis. SCORE, February 10, 2026; local module retrieved August 12, 2026.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=1000913",
    suppliedAt: "2026-10-23T00:00:00.000Z",
    details: "Added for the October 23, 2026 Call Problems I batch from the packet's S1 (etiology, Atlanta severity, Ranson and APACHE II, collections and necrosis, antibiotics, ERCP, step-up approach, gallstone pancreatitis, pseudocysts); paraphrased educational draft pending Zach's approval. Licensed module read locally; no question stems reproduced.",
  },
  {
    id: ACUTE_PANCREATITIS_OE_SOURCE,
    title: "Owner-supplied acute pancreatitis study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 22, 2026: \"Acute Pancreatitis: Board-Review Study Guide\", an OpenEvidence synthesis (https://www.openevidence.com/ask/b25b34df-48fa-41b5-9922-8eef14049899) provided as a Word document and Markdown copy to check the packet for this topic.",
    suppliedAt: "2026-10-23T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions. Works it cites: Tenner (2024 ACG acute pancreatitis guideline); Crockett (2018 AGA guideline); Baron (2020 AGA necrosis update); McDermott (JAMA Surgery 2024); Gardner (NEJM 2022, WATERFALL); Boxhoorn (Lancet 2020); Schepers (APEC trial); Zhu (PLoS One 2023); Song and Lee (Journal of Clinical Medicine 2024); and Abu-Elfatth (Scientific Reports 2026) for BISAP.",
      "Used for the board-versus-current table: BISAP (BUN over 25, impaired mental status, SIRS, age over 60, pleural effusion; 3 or more predicts severe disease), which neither SCORE nor Fiser presents; goal-directed moderate fluids at 5 to 10 mL/kg/h (WATERFALL); early oral or enteral feeding; contrast CT at 72 to 96 hours rather than for diagnosis; no routine early ERCP in predicted-severe biliary pancreatitis without cholangitis (APEC); and delayed cholecystectomy in necrotizing disease. Each is added beyond the packet's SCORE and Fiser sources, carried as the document attributes it without the primary source being opened, and pending Zach's sign-off.",
      "Not carried: the recurrence-without-cholecystectomy figures beyond SCORE's 25% at 3 months, and the pancreatic enzyme and imaging test characteristics.",
    ].join(" "),
  },
  {
    id: SCORE_COLONIC_VOLVULUS_SOURCE,
    title: "SCORE: Colonic Volvulus and Obstruction",
    kind: "website",
    citation: "Rosen DR, Wise PE, Kin C. Colonic Volvulus and Obstruction. SCORE, March 12, 2025; local module retrieved August 12, 2026.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=1000567",
    suppliedAt: "2026-10-23T00:00:00.000Z",
    details: "Added for the October 23, 2026 Call Problems I batch from the packet's S1 (blood supply, law of Laplace and the ileocecal valve, causes of large bowel obstruction, imaging, endoscopic decompression and same-admission resection, cecal volvulus, surgical options); paraphrased educational draft pending Zach's approval. Licensed module read locally; no question stems reproduced.",
  },
  {
    id: COLONIC_VOLVULUS_OE_SOURCE,
    title: "Owner-supplied colonic volvulus and large bowel obstruction study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 22, 2026: \"Colonic Volvulus & Large Bowel Obstruction: Board Review Study Guide\", an OpenEvidence synthesis (https://www.openevidence.com/ask/02ff017c-dbcf-4023-b49d-a771cee2d555) provided as a Word document and Markdown copy to check the packet for this topic.",
    suppliedAt: "2026-10-23T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions. Works it cites: the 2021 ASCRS large bowel obstruction and volvulus guideline; the 2020 ASGE guideline on acute colonic pseudo-obstruction and volvulus; the ACS textbook (2021); and expert commentary (2026) on Hartmann reversal rates.",
      "Used for the board-versus-current table: CT before contrast enema; decompression success of 60% to 95% (ASCRS) and recurrence of 43% to 75% without resection; resection preferred over cecopexy even with viable cecum; a mechanical-obstruction cecal perforation threshold of over 9 cm (ACS), kept separate from the 12 cm pseudo-obstruction threshold as the packet requires; neostigmine after 48 to 72 hours of failed supportive care; and individualized one-stage options for a left-sided obstructing cancer. Each is added beyond the packet's SCORE and Fiser sources, carried as the document attributes it without the primary source being opened, and pending Zach's sign-off.",
      "Not carried: oncologic margin and node-count rules and the Ogilvie risk-factor list.",
    ].join(" "),
  },
  {
    id: SCORE_LOWER_GI_BLEEDING_SOURCE,
    title: "SCORE: Lower Gastrointestinal Bleeding",
    kind: "website",
    citation: "Vasquez CR, Pascual JL. Lower Gastrointestinal Bleeding. SCORE, March 12, 2025; local module retrieved August 12, 2026.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=128753",
    suppliedAt: "2026-10-23T00:00:00.000Z",
    details: "Added for the October 23, 2026 Call Problems I batch from the packet's S1 (definition, diverticular and angiodysplasia bleeding, resuscitation, excluding upper and anorectal sources, colonoscopy, CT angiography, scintigraphy, angiography, operation and intraoperative localization, rebleeding); paraphrased educational draft pending Zach's approval. Licensed module read locally; no question stems reproduced.",
  },
  {
    id: LOWER_GI_BLEEDING_OE_SOURCE,
    title: "Owner-supplied lower gastrointestinal bleeding study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 22, 2026: \"Lower Gastrointestinal Bleeding — Board Review Study Guide\", an OpenEvidence synthesis (https://www.openevidence.com/ask/11ab4807-9012-4893-977c-eab81533d91b) provided as a Word document and Markdown copy to check the packet for this topic.",
    suppliedAt: "2026-10-23T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions. Works it cites: Sengupta (2023 ACG lower GI bleeding guideline); Imran (JAMA 2024) on the Oakland score; Alali (Alimentary Pharmacology and Therapeutics 2024); and Gong (BMC Gastroenterology) on nasogastric lavage.",
      "Used for the board-versus-current table: the Oakland score (8 or less and stable identifies a candidate for discharge with outpatient colonoscopy), which neither SCORE nor Fiser teaches; no routine nasogastric lavage; urgent colonoscopy within 24 hours not improving outcomes over 24 to 96 hours; CT angiography largely supplanting tagged red cell scintigraphy; segmental over subtotal colectomy once localized; and the ACG definition restricting lower GI bleeding to a colorectal source. Each is added beyond the packet's SCORE and Fiser sources, carried as the document attributes it without the primary source being opened, and pending Zach's sign-off.",
      "Not carried: the shock-index triage pathway and the endoscopic clip-versus-coagulation details.",
    ].join(" "),
  },
  {
    id: SCORE_CBD_EXPLORATION_SOURCE,
    title: "SCORE: Common Bile Duct Exploration and Choledochoscopy",
    kind: "website",
    citation: "Biesboer EA, Murphy P. Common Bile Duct Exploration and Choledochoscopy. SCORE, June 30, 2025; local module retrieved August 12, 2026.",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=1000522",
    suppliedAt: "2026-10-23T00:00:00.000Z",
    details: "Added for the October 23, 2026 Call Problems I batch from the packet's S2 (ASGE-SAGES risk stratification, preoperative versus intraoperative clearance, transcystic and transcholedochal exploration, T-tube and completion cholangiography, retained stones); paraphrased educational draft pending Zach's approval. Licensed module read locally; no question stems reproduced.",
  },
  {
    id: CHOLEDOCHOLITHIASIS_CHOLANGITIS_OE_SOURCE,
    title: "Owner-supplied choledocholithiasis and cholangitis study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 22, 2026: \"Choledocholithiasis & Acute Cholangitis — Board Review Study Guide\", an OpenEvidence synthesis (https://www.openevidence.com/ask/37546f1f-c110-4fa1-8f7f-917152ecc41d) provided as a Word document and Markdown copy to check the packet for this topic.",
    suppliedAt: "2026-10-23T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions. Works it cites: Miura (Tokyo Guidelines 2018, acute cholangitis); Markotic (Cochrane 2020); Martinez Marquez (Abdominal Radiology 2026); Buxbaum (2019 ASGE choledocholithiasis guideline, registered separately); Mohamed (Digestive Diseases and Sciences 2023); Buckman and Mazuski (2019); Lai (Surgery 2025); and Volkovetskii (2025).",
      "Supplies the TG18 grade-to-drainage rules (grade III urgent drainage after resuscitation, grade II early drainage, grade I antibiotics with drainage if no improvement in 24 hours), which match the TG18 tables already in the Benign Biliary Obstruction topic. Also used for the board-versus-current table: the Charcot triad in only 15% to 70%, the ASGE 2019 bilirubin over 4 mg/dL with a dilated duct against the older 1.7 mg/dL risk factor, single-stage cholecystectomy with duct exploration as at least equivalent to ERCP then cholecystectomy, short antibiotic courses after drainage, and EUS-guided drainage as third line. Each is added beyond the packet's SCORE and Fiser sources, carried as the document attributes it without the primary source being opened, and pending Zach's sign-off.",
      "Not carried: the TG18 antibiotic regimens by grade and the transaminase-spike pearl.",
    ].join(" "),
  },
  {
    id: SVS_AAA_2018_SOURCE,
    title: "SVS practice guidelines on the care of patients with an abdominal aortic aneurysm (2018)",
    kind: "article",
    citation: "Chaikof EL, Dalman RL, Eskandari MK, et al. The Society for Vascular Surgery practice guidelines on the care of patients with an abdominal aortic aneurysm. J Vasc Surg. 2018;67(1):2-77.e2.",
    url: "https://pubmed.ncbi.nlm.nih.gov/29268916/",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: "Registered during the October 22, 2026 aortic cluster review from the OpenEvidence document, which attributes the permissive hypotension target of a systolic pressure of 70 to 90 mm Hg in a conscious patient to it. The publication was identified at PubMed; the full text was not opened, so the exact recommendation wording and grade are carried as the OpenEvidence document gives them. Added beyond the packet; pending Zach's sign-off.",
  },
  {
    id: ACC_AHA_AORTIC_2022_SOURCE,
    title: "2022 ACC/AHA guideline for the diagnosis and management of aortic disease",
    kind: "article",
    citation: "Isselbacher EM, Preventza O, Hamilton Black J 3rd, et al. 2022 ACC/AHA Guideline for the Diagnosis and Management of Aortic Disease. Circulation. 2022;146(24):e334-e482; J Am Coll Cardiol. 2022;80(24):e223-e393.",
    url: "https://www.acc.org/latest-in-cardiology/ten-points-to-remember/2022/11/01/12/21/2022-guideline-on-aortic-disease-2-gl-ad",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: "Registered during the October 22, 2026 aortic cluster review. Checked directly against the ACC's published key-perspectives summary: medical therapy for acute aortic syndromes targets a systolic pressure under 120 mm Hg (or the lowest that maintains end-organ perfusion) and a heart rate of 60 to 80, with intravenous beta-blockade first and vasodilators added only if pressure stays high; medical therapy is the initial management of uncomplicated type B dissection and endovascular repair is preferred over open repair for rupture with suitable anatomy; AAA repair at 5.5 cm in men and 5.0 cm in women; surveillance every 3 years at 3.0 to 3.9 cm, annually at 4.0 to 4.9 cm in men or 4.0 to 4.4 cm in women, and every 6 months at 5.0 cm or more in men or 4.5 cm or more in women. Added beyond the packets; pending Zach's sign-off.",
  },
  {
    id: SCORE_AORTIC_DISSECTION_SOURCE,
    title: "SCORE module: Acute Aortic Dissection",
    kind: "website",
    citation: "Clark RM, Curci JA. Acute Aortic Dissection. SCORE Curriculum, Arterial Disease module, Surgical Council on Resident Education, March 18, 2023. https://www.surgicalcore.org/modulecontent.aspx?id=1000130",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=1000130",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "The full module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/`. Source S1 of the acute aortic dissection packet: physiology, risk factors, presentation and complications, CT angiography and true- versus false-lumen anatomy, the DeBakey and Stanford systems, impulse control, malperfusion monitoring, operative indications, and follow-up imaging.",
      "The module's impulse-control target is a systolic pressure of 100 to 120 mm Hg and a heart rate near 60; it lists diltiazem alongside nicardipine and nitroprusside as afterload agents. The packet frames diltiazem as the rate-control substitute when beta-blockers are contraindicated, which the module's learning objective asks for and the ACC/AHA guideline supports.",
    ].join(" "),
  },
  {
    id: AORTIC_DISSECTION_OE_SOURCE,
    title: "Owner-supplied acute aortic dissection study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 22, 2026: \"Acute Aortic Dissection: Board Review Study Guide\", an OpenEvidence synthesis (https://www.openevidence.com/ask/86b623e6-327b-4ea7-bbc5-d2305df15c64) provided as a Word document and Markdown copy to check the packet for this topic.",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions. Works it cites: Isselbacher (2022 ACC/AHA, registered separately); MacGillivray (2022 STS/AATS); Czerny (2024 EACTS/STS); Mazzolai (2024 ESC); Hameed (JAMA 2023); Nienaber (Nature Reviews Disease Primers 2016); Vilacosta (JACC 2021); Kulkarni (Journal of Human Hypertension 2023); Mussa and Kougias (NEJM 2025); Hiratzka (2010 guideline); and the INSTEAD and INSTEAD-XL trials.",
      "Supports the statements the packet flagged as beyond its sources: the acute, subacute and chronic timing categories (EACTS/STS 2024), analgesia as part of impulse control, hypotension signalling tamponade or rupture, and pre-emptive subacute TEVAR for selected high-risk uncomplicated type B dissections. Each is pending Zach's sign-off.",
      "Not carried: the zone-based SVS/STS classification, non-A-non-B dissection, the Aortic Dissection Detection Risk Score, the TEVAR-versus-open meta-analysis figures, and the pericardiocentesis caution, which go beyond the topic's SCORE scope; they remain available for a later revision.",
    ].join(" "),
  },
  {
    id: SCORE_PERIPHERAL_ARTERIAL_ANEURYSMS_SOURCE,
    title: "SCORE module: Peripheral Arterial Aneurysms",
    kind: "website",
    citation: "Costanza M. Peripheral Arterial Aneurysms. SCORE Curriculum, Arterial Disease module, Surgical Council on Resident Education, October 3, 2023. https://www.surgicalcore.org/modulecontent.aspx?id=149943",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=149943",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "The full module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/`. Source S1 of the arterial peripheral aneurysms packet and S2 of the peripheral aneurysms repair packet: histology, pathophysiology and sites, the AAA association, presentation, imaging and mimics, observation thresholds, pseudoaneurysm treatment, operative concepts, and follow-up.",
      "Read against the packets during review: every statement attributed to the module was found in it. The module's observation thresholds (under 2.5 cm femoral, under 2.0 cm popliteal) and its description of thrombin injection without compression disagree with Fiser; both topics carry the disagreement.",
    ].join(" "),
  },
  {
    id: PERIPHERAL_ARTERIAL_ANEURYSMS_OE_SOURCE,
    title: "Owner-supplied peripheral arterial aneurysms study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 22, 2026: \"Peripheral Arterial Aneurysms: Board-Review Study Guide\", an OpenEvidence synthesis (https://www.openevidence.com/ask/35db7a7f-5500-4551-b8ff-d55801e6cd84) provided as a Word document and Markdown copy to check the packet for this topic.",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "Built around the 2022 SVS popliteal aneurysm guideline (registered separately) and marks classic-versus-current splits itself. Other works it cites: Gujja (Interventional Cardiology 2022); Kim and Bellomo (Vascular Medicine 2024); Lawrence (Journal of Vascular Surgery 2014, femoral aneurysm natural history); Phair (Journal of Vascular Surgery 2016, posterior approach meta-analysis); Ahmed (Cochrane 2014); Hellwig (2020) and Spinella (2019, 2026) on stent-graft anatomy; the 2024 ACC/AHA multisociety PAD guideline and the 2024 ESC guideline.",
      "Supplies the 1.5-times-adjacent-diameter definition the packet flagged as beyond its sources, the association figures, the SVS repair thresholds and annual surveillance, the Lawrence femoral threshold, and the Rutherford-based approach to a thrombosed popliteal aneurysm. Each is pending Zach's sign-off.",
      "Not carried: visceral aneurysms (a separate SCORE topic not yet in the library), upper-extremity aneurysms, and the Cutler-Darling classification, which neither SCORE nor Fiser names.",
    ].join(" "),
  },
  {
    id: SVS_POPLITEAL_ANEURYSM_2022_SOURCE,
    title: "SVS clinical practice guidelines on popliteal artery aneurysms (2022)",
    kind: "article",
    citation: "Farber A, Angle N, Avgerinos E, et al. The Society for Vascular Surgery clinical practice guidelines on popliteal artery aneurysms. J Vasc Surg. 2022;75(1S):109S-120S. doi:10.1016/j.jvs.2021.04.040",
    url: "https://profiles.wustl.edu/en/publications/the-society-for-vascular-surgery-clinical-practice-guidelines-on-/",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: "Registered during the October 22, 2026 aortic cluster review from the two peripheral aneurysm OpenEvidence documents, which both cite it as the main guideline. The citation was verified against the publication record (PMID 34023430). The full text was not opened: the recommendation wording and grades carried here (screening every 5 years, repair at 20 mm or more, deferral to 30 mm in selected high-risk patients without thrombus, repair under 20 mm with thrombus or poor runoff, open repair with vein for life expectancy of 5 years or more, Rutherford-based management of the thrombosed aneurysm, and post-repair surveillance at 3, 6 and 12 months) are as the two documents give them, and they agree. Added beyond the packets; pending Zach's sign-off.",
  },
  {
    id: SCORE_PERIPHERAL_ANEURYSMS_REPAIR_SOURCE,
    title: "SCORE module: Peripheral Aneurysms Repair",
    kind: "website",
    citation: "Alfawaz A, Akbari C. Peripheral Aneurysms Repair. SCORE Curriculum, Arterial Disease module, Surgical Council on Resident Education, October 3, 2023. https://www.surgicalcore.org/modulecontent.aspx?id=1000538",
    url: "https://www.surgicalcore.org/modulecontent.aspx?id=1000538",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "The full module text, retrieved August 12, 2026 and held in `Pocket Chief Resources/score-modules/`. Source S1 of the peripheral aneurysms repair packet: indications, femoral triangle and popliteal fossa anatomy, preoperative preparation, the key steps of femoral, popliteal and pseudoaneurysm repair, intraoperative decisions, and complications.",
      "The module states that the posterior approach is limited to aneurysms confined to the popliteal fossa with compressive symptoms; contemporary observational data in the OpenEvidence document favor it more broadly for exclusion and patency, and the topic carries both.",
    ].join(" "),
  },
  {
    id: PERIPHERAL_ANEURYSMS_REPAIR_OE_SOURCE,
    title: "Owner-supplied peripheral aneurysm repair study guide (OpenEvidence)",
    kind: "user_notes",
    citation: "Study document supplied to Pocket Chief, October 22, 2026: \"Peripheral Aneurysm Repair: Board Review Study Guide\", an OpenEvidence synthesis (https://www.openevidence.com/ask/7e80b5fe-46de-41c4-a804-d637f042a36e) provided as a Word document and Markdown copy to check the packet for this topic.",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "Corroborated against the 2022 SVS popliteal aneurysm guideline (registered separately). Other works it cites: Bellomo (Vascular Medicine 2024); Rahgozar (Journal of Vascular Surgery 2026, VQI vein-first data); Naazie (Journal of Surgical Research 2023); Troisi and Baccellieri (Journal of Vascular Surgery 2025, 2022, posterior approach conduits); Phair (2016) and Mazzaccaro (2015) on the posterior approach; Lu (Annals of Vascular Surgery 2021) on sac expansion; Spinella, Zaghloul, Ning and van Walraven on stent-graft anatomy and outcomes; Dragas (EJVES 2020) on adjunctive lysis; Lawrence (2014) on femoral aneurysms; and the STILE and TOPAS trials.",
      "Supplies the Rutherford-based branches added to the thrombosed popliteal aneurysm pathway, the sac-expansion risk after medial ligation, the posterior-approach comparison, the conduit evidence, and post-repair surveillance at 3, 6 and 12 months. Each is added beyond the packet and pending Zach's sign-off.",
      "Not carried: medial and posterior exposure detail and positioning, which belong to the Open Popliteal Artery Aneurysm Repair playbook rather than the SCORE topic.",
    ].join(" "),
  },
  {
    id: OPEN_PAA_REPAIR_PLAYBOOK_SOURCE,
    title: "User-supplied open popliteal artery aneurysm repair (acute limb ischemia) attending playbook",
    kind: "user_notes",
    citation: "Attending quick-reference for open repair of a thrombosed popliteal artery aneurysm presenting with acute limb ischemia (medial approach, reversed great saphenous vein bypass with proximal and distal ligation; posterior approach as a variant), supplied to Pocket Chief as a Word document, October 22, 2026.",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions and no numbered list. Works it cites: the 2022 SVS popliteal aneurysm guideline (registered separately); the 2024 ACC/AHA PAD guideline and the 2024 ESC peripheral arterial and aortic guideline (both registered separately); Gujja (Interventional Cardiology 2022); Beuschel (Journal of Vascular Surgery 2022); Jungi (EJVES 2019); Cook (Journal of Vascular Surgery 2026); Chen (Annals of Vascular Surgery 2025); de Donato (Annals of Vascular Surgery 2023); Ahmed (Cochrane 2014); Joshi (Cochrane 2019); Lu (Annals of Vascular Surgery 2021); Rahgozar (Journal of Vascular Surgery 2026, VQI); Al-Falahi (EJVES 2026); Costa (Annals of Vascular Surgery 2026); Bellomo (Surgery 2026); Bérczi (PLoS One 2022); Roosendaal (Journal of Endovascular Therapy 2025); Bratzler (Surgical Infections 2013); the 2016 AHA vascular graft infection statement; Shafique (Journal of Surgical Research 2025); Correia (Cochrane 2025); the heparin sodium label; the 2012 ACCP antithrombotic guideline; Natour (Annals of Vascular Surgery 2023); the 2025 AAOS compartment syndrome guideline; Bonaca (JACC 2024); Weissler (JACC Cardiovascular Interventions 2021, paraphrasing ESC/ESVS 2017); Kumbhani (JACC 2026); and Behind the Knife popliteal and fasciotomy chapters.",
      "Its evidence conflicts are kept rather than harmonized: vein against prosthetic and endovascular conduit (registry and meta-analytic data favor vein; a 2026 single-center series found limb events comparable), and medial against posterior approach (sac perfusion after medial ligation against fewer reported posterior cases).",
      "Carried as the document attributes them and not checked against primary sources, pending Zach's sign-off: the 15% untreated amputation rate (the topics carry Fiser's 25%), the 4 to 6 hour ischemic tolerance, the 3 to 4 French Fogarty size for popliteal and tibial vessels (the Acute Limb Ischemia topic gives 4 French popliteal and 2 to 3 French tibial), the ACT-guided heparin regimen, the 20% six-month graft thrombosis figure, and the VOYAGER PAD regimen.",
      "Not carried: the heparin label's weight-based ranges beyond the common bolus and ACT regimen, and the femoral-vein lactate correlation with fasciotomy.",
    ].join(" "),
  },
  {
    id: SAPHENOUS_VEIN_HARVEST_PLAYBOOK_SOURCE,
    title: "User-supplied great saphenous vein harvest attending playbook",
    kind: "user_notes",
    citation: "Attending quick-reference for great saphenous vein harvest (open conventional default, with no-touch and endoscopic variants; CABG as the primary use, leg bypass where the evidence diverges), supplied to Pocket Chief as a Word document, October 22, 2026.",
    suppliedAt: "2026-10-22T00:00:00.000Z",
    details: [
      "Carries inline author-year attributions and no numbered list. Works it cites: Verma and Mazer (NEJM 2019); Sohn (PLoS One 2024); Maris (Journal of Vascular Surgery 2026); Lawton (2021 ACC/AHA/SCAI coronary revascularization guideline); Dalén (JAMA Cardiology 2026); Caliskan (Nature Reviews Cardiology 2020); Georgoff (Behind the Knife, saphenous vein harvest); Hakim and Narouze (Pain Practice 2015); Beerkens (Nature Reviews Cardiology 2022); Zenati (NEJM 2019, REGROUP); Lazar (2016 AATS sternal wound infection guideline); Engelman (JAMA Surgery 2019, ERAS Cardiac); Seidelman (JAMA 2023); Wang (Vascular Medicine 2015); Gloviczki (2011 SVS/AVF venous guideline); Caggiati (American Venous Forum 2024); Prabhu (F1000Research 2026); Wilmot and Evans (Clinical Anatomy 2013); Kopjar and Dashwood (Angiology 2016); Rajakumar (Journal of Cardiac Surgery 2026); Yan (Cardiovascular Drugs and Therapy 2026); Harskamp (JAMA Surgery 2014, PREVENT IV storage); Toto (Journal of Clinical Medicine 2022); Lian (Scientific Reports 2024); Teixeira (Journal of Vascular Surgery 2015); Zhang (BMC Cardiovascular Disorders 2020); Lopes (NEJM 2009, PREVENT IV); Chahrour (Journal of Vascular Surgery 2025); Kronick (Journal of Vascular Surgery 2019); Vuong (Coronary Artery Disease 2022); Morrison and Dalsing (Journal of Vascular Surgery 2003); De Laurentis (Journal of Thrombosis and Thrombolysis 2026).",
      "Its evidence conflicts are kept rather than harmonized: storage solution (saline, heparinized blood, buffered saline, DuraGraft), and open against endoscopic harvest, which splits by operation (no MACE difference in CABG with expert harvesters but better patency after open harvest in PREVENT IV and VEST III; fewer wound complications but lower primary patency with endoscopic harvest for leg bypass).",
      "Pending Zach's sign-off: the document places systemic heparin before dividing the vein in the open sequence, which is a common vascular-surgery order but not routine in CABG, where heparin usually follows harvest; the playbook keeps the document's order. Instruments and suture sizes without a guideline, trial or label behind them are common practice or preference, as the document itself says. Carried as attributed and not checked against primary sources: the saphenous nerve anatomy percentages, the 15% chronic neuralgia rate and the vein-graft patency ranges.",
    ].join(" "),
  },
];
