import { cache } from "react";
import { listTaxonomy, listTopics } from "@/lib/library";
import { taxonomySections } from "@/lib/taxonomy";

/** The categories that have topics, in SCORE outline order: what the Topics index lists and what has a page. Build-time only. */
export const listCategories = cache(() => taxonomySections(listTaxonomy(), listTopics()).filter((category) => category.topicCount > 0));
