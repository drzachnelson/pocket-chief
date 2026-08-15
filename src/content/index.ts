import { abdominalAndAortoiliacAneurysmRepairTopic } from "@/content/topics/abdominal-and-aortoiliac-aneurysm-repair";
import { abdominalExplorationTopic } from "@/content/topics/abdominal-exploration";
import { abdominalPainTopic } from "@/content/topics/abdominal-pain";
import { abdominalWallReconstructionTopic } from "@/content/topics/abdominal-wall-reconstruction";
import { choledocholithiasisTopic } from "@/content/topics/choledocholithiasis";
import { desmoidTopic } from "@/content/topics/desmoid-tumors-and-fibromatoses";
import { femoralHerniaTopic } from "@/content/topics/femoral-hernia";
import { fibroadenomaPhyllodesTopic } from "@/content/topics/fibroadenoma-vs-phyllodes-tumor";
import { groinHerniaInChildrenTopic } from "@/content/topics/groin-hernia-in-children";
import { groinHerniaRepairTopic } from "@/content/topics/groin-hernia-repair";
import { inguinalHerniaTopic } from "@/content/topics/inguinal-hernia";
import { peritonealDialysisCatheterTopic } from "@/content/topics/peritoneal-dialysis-catheter";
import { peritonealNeoplasmsTopic } from "@/content/topics/peritoneal-neoplasms";
import { rectusSheathHematomaTopic } from "@/content/topics/rectus-sheath-hematoma";
import { umbilicalAndEpigastricHerniaTopic } from "@/content/topics/umbilical-and-epigastric-hernia";
import { unusualHerniasTopic } from "@/content/topics/unusual-hernias";
import { ventralAndIncisionalHerniaTopic } from "@/content/topics/ventral-and-incisional-hernia";
import type { Topic } from "@/lib/types";

export { choledoBlocks, choledocholithiasisTopic } from "@/content/topics/choledocholithiasis";
export { fibroadenomaPhyllodesTopic } from "@/content/topics/fibroadenoma-vs-phyllodes-tumor";
export { suppliedSources } from "@/content/sources";
export { taxonomy } from "@/content/taxonomy";

export const demoTopics: Topic[] = [
  choledocholithiasisTopic,
  fibroadenomaPhyllodesTopic,
  abdominalPainTopic,
  rectusSheathHematomaTopic,
  desmoidTopic,
  peritonealNeoplasmsTopic,
  abdominalExplorationTopic,
  peritonealDialysisCatheterTopic,
  inguinalHerniaTopic,
  femoralHerniaTopic,
  groinHerniaInChildrenTopic,
  umbilicalAndEpigastricHerniaTopic,
  ventralAndIncisionalHerniaTopic,
  unusualHerniasTopic,
  groinHerniaRepairTopic,
  abdominalWallReconstructionTopic,
  abdominalAndAortoiliacAneurysmRepairTopic,
];
