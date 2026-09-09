import type { Metadata } from "next";
import { SettingsForm } from "@/components/settings-form";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return <><div className="page-heading"><div><p className="eyebrow">Preferences</p><h1 className="page-title">Settings</h1><p className="page-lede">Manage what Pocket Chief stores on this device.</p></div></div><SettingsForm /></>;
}
