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
];
