"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, DownloadSimple, SignOut } from "@phosphor-icons/react";
import { clearPrivateOfflineData } from "@/lib/offline";
import { defaultAnkiSettings, loadAnkiSettings, saveAnkiSettings } from "@/lib/anki-settings";

export function SettingsForm() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState(() => typeof window === "undefined" ? defaultAnkiSettings : loadAnkiSettings());
  function save(event: React.FormEvent) { event.preventDefault(); saveAnkiSettings(settings); setSaved(true); window.setTimeout(() => setSaved(false), 2200); }
  async function signOut() { await fetch("/auth/sign-out", { method: "POST" }); await clearPrivateOfflineData(); navigator.serviceWorker?.controller?.postMessage({ type: "CLEAR_PRIVATE_DATA" }); router.replace("/auth/sign-in"); router.refresh(); }
  return (
    <div className="settings-grid">
      <form className="form-card" onSubmit={save}>
        <div className="section-heading"><h2>Anki export</h2><span>Owner preferences</span></div>
        <div className="field"><label htmlFor="deck">Deck</label><input id="deck" value={settings.deck} onChange={(event) => setSettings({ ...settings, deck: event.target.value })} /></div>
        <div className="field"><label htmlFor="note-type">Cloze note type</label><input id="note-type" value={settings.noteType} onChange={(event) => setSettings({ ...settings, noteType: event.target.value })} /></div>
        <div className="field"><label htmlFor="tag-prefix">Tag prefix</label><input id="tag-prefix" value={settings.tagPrefix} onChange={(event) => setSettings({ ...settings, tagPrefix: event.target.value })} /></div>
        <div className="field"><label htmlFor="text-field">Field mapping</label><div className="field-pair"><input id="text-field" aria-label="Text field" value={settings.fieldMap.text} onChange={(event) => setSettings({ ...settings, fieldMap: { ...settings.fieldMap, text: event.target.value } })} /><input aria-label="Extra field" value={settings.fieldMap.extra} onChange={(event) => setSettings({ ...settings, fieldMap: { ...settings.fieldMap, extra: event.target.value } })} /></div></div>
        <div className="form-footer"><button className="button" type="submit">{saved ? <><Check size={15} />Saved</> : "Save Anki settings"}</button></div>
      </form>
      <section className="form-card">
        <div className="section-heading"><h2>Privacy & portability</h2><span>Private device data</span></div>
        <p className="settings-copy">Download a complete ZIP with approved topic Markdown and JSON, sources, tags, Anki drafts, media manifest, and export manifest.</p>
        <div className="settings-actions"><a href="/api/backup" className="button secondary"><DownloadSimple size={15} />Download backup</a><button className="button ghost danger" onClick={signOut}><SignOut size={15} />Sign out & clear offline data</button></div>
      </section>
    </div>
  );
}
