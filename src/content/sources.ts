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

// Playbooks. Operative guides, numbered from 3000 so they never collide with topic sources.
export const TEMPORAL_ARTERY_BIOPSY_PLAYBOOK_SOURCE = "00000000-0000-4000-8000-000000003000";

export const suppliedSources: SuppliedSource[] = [
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
    id: TEMPORAL_ARTERY_BIOPSY_PLAYBOOK_SOURCE,
    title: "User-supplied temporal artery biopsy attending playbook",
    kind: "user_notes",
    citation: "Attending procedure playbook supplied to Pocket Chief, September 10, 2026.",
    suppliedAt: "2026-09-10T00:00:00.000Z",
    details: "The document names the 2021 ACR/Vasculitis Foundation guideline, the EULAR recommendations, the 2022 ACR/EULAR classification criteria and the GAME study, but supplies no bibliography — its tables cite bracketed numbers with no key. The bracket numbers are dropped here rather than reproduced without a reference list, and the whole guide is cited to the supplied document rather than to works the owner did not supply.",
  },
];
