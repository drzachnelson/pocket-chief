import type { Metadata } from "next";
import { SettingsForm } from "@/components/settings-form";
import { getRepository } from "@/lib/repository";

export const metadata: Metadata = { title: "Settings" };

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const taxonomy = await (await getRepository()).listTaxonomy();
  return <><div className="page-heading"><div><p className="eyebrow">Owner controls</p><h1 className="page-title">Settings</h1><p className="page-lede">Configure Anki, edit SCORE organization, export your library, and manage private offline data.</p></div></div><SettingsForm initialTaxonomy={taxonomy} /></>;
}
