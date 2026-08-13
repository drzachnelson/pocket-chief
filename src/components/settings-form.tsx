"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, DownloadSimple, SignOut } from "@phosphor-icons/react";
import { clearPrivateOfflineData } from "@/lib/offline";

export function SettingsForm() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  function save(event: React.FormEvent) { event.preventDefault(); setSaved(true); window.setTimeout(() => setSaved(false), 2200); }
  async function signOut() { await fetch("/auth/sign-out", { method: "POST" }); await clearPrivateOfflineData(); navigator.serviceWorker?.controller?.postMessage({ type: "CLEAR_PRIVATE_DATA" }); router.replace("/auth/sign-in"); router.refresh(); }
  return (
    <div className="settings-grid">
      <form className="form-card" onSubmit={save}>
        <div className="section-heading"><h2>Anki export</h2><span>Owner preferences</span></div>
        <div className="field"><label htmlFor="deck">Deck</label><input id="deck" defaultValue="Pocket Chief" /></div>
        <div className="field"><label htmlFor="note-type">Cloze note type</label><input id="note-type" defaultValue="Cloze" /></div>
        <div className="field"><label htmlFor="tag-prefix">Tag prefix</label><input id="tag-prefix" defaultValue="pc::" /></div>
        <div className="field"><label htmlFor="text-field">Field mapping</label><div className="field-pair"><input id="text-field" aria-label="Text field" defaultValue="Text" /><input aria-label="Extra field" defaultValue="Extra" /></div></div>
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
