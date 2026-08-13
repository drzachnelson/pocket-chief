"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, DownloadSimple, PencilSimple, Plus, SignOut } from "@phosphor-icons/react";
import { clearPrivateOfflineData } from "@/lib/offline";
import { defaultAnkiSettings, loadAnkiSettings, saveAnkiSettings } from "@/lib/anki-settings";
import type { TaxonomyNode } from "@/lib/types";
import { taxonomyDescendantIds } from "@/lib/taxonomy";

export function SettingsForm({ initialTaxonomy }: { initialTaxonomy: TaxonomyNode[] }) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState(() => typeof window === "undefined" ? defaultAnkiSettings : loadAnkiSettings());
  const [taxonomy, setTaxonomy] = useState(initialTaxonomy);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [taxonomyTitle, setTaxonomyTitle] = useState("");
  const [taxonomyParent, setTaxonomyParent] = useState("");
  const [taxonomyStatus, setTaxonomyStatus] = useState("");
  function save(event: React.FormEvent) { event.preventDefault(); saveAnkiSettings(settings); setSaved(true); window.setTimeout(() => setSaved(false), 2200); }
  async function signOut() { await fetch("/auth/sign-out", { method: "POST" }); await clearPrivateOfflineData(); navigator.serviceWorker?.controller?.postMessage({ type: "CLEAR_PRIVATE_DATA" }); router.replace("/auth/sign-in"); router.refresh(); }
  function editNode(node: TaxonomyNode) { setEditingId(node.id); setTaxonomyTitle(node.title); setTaxonomyParent(node.parentId ?? ""); setTaxonomyStatus(""); }
  async function saveNode(event: React.FormEvent) {
    event.preventDefault(); setTaxonomyStatus("");
    const existing = editingId ? taxonomy.find((node) => node.id === editingId) : null;
    const response = await fetch("/api/taxonomy", { method: editingId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editingId ?? undefined, title: taxonomyTitle, parentId: taxonomyParent || null, order: existing?.order ?? taxonomy.length }) });
    const data = await response.json() as { node?: TaxonomyNode; error?: string };
    if (!response.ok || !data.node) { setTaxonomyStatus(data.error ?? "Could not save the taxonomy node."); return; }
    setTaxonomy((current) => [...current.filter((node) => node.id !== data.node!.id), data.node!].sort((a, b) => a.order - b.order));
    setEditingId(null); setTaxonomyTitle(""); setTaxonomyParent(""); setTaxonomyStatus("SCORE organization saved.");
  }
  const unavailableParents = editingId ? taxonomyDescendantIds(editingId, taxonomy) : new Set<string>();
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
      <section className="form-card taxonomy-card">
        <div className="section-heading"><h2>SCORE organization</h2><span>Owner editable</span></div>
        <div className="taxonomy-editor-list">{taxonomy.map((node) => <button type="button" key={node.id} onClick={() => editNode(node)}><span>{node.parentId ? "↳" : "•"} {node.title}</span><PencilSimple size={14} /></button>)}</div>
        <form onSubmit={saveNode} className="taxonomy-form">
          <div className="field"><label htmlFor="taxonomy-title">{editingId ? "Edit category" : "Add category"}</label><input id="taxonomy-title" required value={taxonomyTitle} onChange={(event) => setTaxonomyTitle(event.target.value)} placeholder="e.g., Vascular Surgery" /></div>
          <div className="field"><label htmlFor="taxonomy-parent">Parent category</label><select id="taxonomy-parent" value={taxonomyParent} onChange={(event) => setTaxonomyParent(event.target.value)}><option value="">Top level</option>{taxonomy.filter((node) => node.id !== editingId && !unavailableParents.has(node.id)).map((node) => <option value={node.id} key={node.id}>{node.title}</option>)}</select></div>
          {taxonomyStatus && <p className="form-message" role="status">{taxonomyStatus}</p>}
          <div className="form-footer">{editingId && <button type="button" className="button ghost" onClick={() => { setEditingId(null); setTaxonomyTitle(""); setTaxonomyParent(""); }}>Cancel</button>}<button className="button secondary" type="submit"><Plus size={15} />{editingId ? "Save category" : "Add category"}</button></div>
        </form>
      </section>
    </div>
  );
}
