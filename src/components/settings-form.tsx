"use client";

import { useState } from "react";
import { Trash } from "@phosphor-icons/react";
import { clearPrivateOfflineData } from "@/lib/offline";
import { AttendingBackup } from "@/components/attending-backup";

export function SettingsForm() {
  const [status, setStatus] = useState("");
  async function clearOfflineData() {
    setStatus("");
    try {
      await clearPrivateOfflineData();
      navigator.serviceWorker?.controller?.postMessage({ type: "CLEAR_PRIVATE_DATA" });
      setStatus("Cleared. Reload to restore the atlas from the app bundle.");
    } catch { setStatus("Could not clear offline storage. Close other Pocket Chief tabs and try again."); }
  }
  return (
    <div className="settings-grid">
      <section className="form-card">
        <div className="section-heading"><h2>Offline storage</h2><span>This device</span></div>
        {/* Says plainly what this does and does not touch. Attending preferences live in a
            separate database precisely so this control cannot reach them. */}
        <p className="settings-copy">Pocket Chief keeps the atlas, your bookmarks, and your reading history in this browser. Clearing removes all three; the atlas comes back on the next load, your bookmarks do not. Attending preferences are stored separately and are not affected.</p>
        <div className="settings-actions"><button type="button" className="button ghost danger" onClick={clearOfflineData}><Trash size={15} />Clear offline data</button></div>
        {status && <p className="form-message" role="status">{status}</p>}
      </section>
      <AttendingBackup />
      <section className="form-card">
        <div className="section-heading"><h2>The library</h2><span>Read only</span></div>
        <p className="settings-copy">Topics and playbooks are authored as files in <code>src/content/</code> and ship with the app. Adding or revising one is a commit to the repository, not an edit here. Attending preferences are the exception: those you write in the app, and they never leave this device.</p>
      </section>
    </div>
  );
}
