"use client";

import { useEffect, useRef, useState } from "react";
import { Trash } from "@phosphor-icons/react";
import { clearPrivateOfflineData } from "@/lib/offline";

export function SettingsForm() {
  const [status, setStatus] = useState("");
  const [confirming, setConfirming] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  const opened = useRef(false);
  // Swapping the button for the confirm unmounts the control that has focus; put it on the safe choice, and hand it back afterwards.
  useEffect(() => { if (confirming) { opened.current = true; cancel.current?.focus(); } else if (opened.current) trigger.current?.focus(); }, [confirming]);
  async function clearOfflineData() {
    setConfirming(false);
    setStatus("");
    try {
      await clearPrivateOfflineData();
      navigator.serviceWorker?.controller?.postMessage({ type: "CLEAR_PRIVATE_DATA" });
      setStatus("Cleared. Reload to restore topics and playbooks.");
    } catch { setStatus("Could not clear offline storage. Close other Pocket Chief tabs and try again."); }
  }
  return (
    <div className="settings-grid">
      <section className="form-card">
        <div className="section-heading"><h2>Offline storage</h2><span>This device</span></div>
        <p className="settings-copy">Pocket Chief keeps topics and playbooks, your Saved topics and your reading history in this browser. Clearing removes all three; topics and playbooks come back on the next load, your Saved topics do not.</p>
        {confirming
          ? <div className="settings-confirm" role="group" aria-label="Confirm clearing offline data"><p className="settings-copy">This removes your Saved topics and reading history from this device. There is no server copy to restore them from.</p><div className="settings-actions"><button type="button" className="button secondary danger" onClick={clearOfflineData}>Clear Saved topics and history</button><button type="button" className="button ghost" ref={cancel} onClick={() => setConfirming(false)}>Cancel</button></div></div>
          : <div className="settings-actions"><button type="button" className="button ghost danger" ref={trigger} onClick={() => setConfirming(true)}><Trash size={15} />Clear offline data</button></div>}
        {status && <p className="form-message" role="status">{status}</p>}
      </section>
    </div>
  );
}
