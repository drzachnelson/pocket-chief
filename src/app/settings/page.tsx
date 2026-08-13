import type { Metadata } from "next";
import { SettingsForm } from "@/components/settings-form";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return <><div className="page-heading"><div><p className="eyebrow">Owner controls</p><h1 className="page-title">Settings</h1><p className="page-lede">Configure Anki, export your library, and manage private offline data.</p></div></div><SettingsForm /></>;
}
