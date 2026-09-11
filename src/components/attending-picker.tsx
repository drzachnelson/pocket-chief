"use client";

import { useState } from "react";
import { Plus, UserFocus } from "@phosphor-icons/react";
import { newId, type Attending } from "@/lib/attending";

const STORAGE_KEY = "pocket-chief-attending-selected";

/** Same try/catch shape as the sidebar preference: private browsing throws on access, not on read. */
export function readSelectedAttending(): string {
  try { return window.localStorage.getItem(STORAGE_KEY) ?? ""; } catch { return ""; }
}

function writeSelectedAttending(id: string) {
  try { window.localStorage.setItem(STORAGE_KEY, id); } catch { /* private browsing; the choice just will not persist */ }
}

/**
 * Sits in the playbook header rather than the tabs: choosing an attending re-colours the whole
 * guide, so it has to be reachable before the reader starts reading, not after.
 */
export function AttendingPicker({ attendings, selectedId, onSelect, onCreate }: {
  attendings: Attending[];
  selectedId: string;
  onSelect: (id: string) => void;
  onCreate: (attending: Attending) => Promise<void>;
}) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [hospital, setHospital] = useState("");
  const [error, setError] = useState("");

  async function create(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) { setError("Give the attending a name."); return; }
    const now = new Date().toISOString();
    const attending: Attending = { id: newId(), name: name.trim(), hospital: hospital.trim(), specialty: "", createdAt: now, updatedAt: now };
    try {
      await onCreate(attending);
      select(attending.id);
      setName(""); setHospital(""); setAdding(false); setError("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save on this device.");
    }
  }

  function select(id: string) {
    writeSelectedAttending(id);
    onSelect(id);
  }

  if (adding || attendings.length === 0) {
    return (
      <form className="attending-picker" onSubmit={create}>
        {/* The first-run state of the whole feature. An empty <select> would be a dead end. */}
        <p className="eyebrow">Whose preferences?</p>
        <div className="field">
          <label htmlFor="attending-name">Attending</label>
          <input id="attending-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Alvarez" autoComplete="off" />
        </div>
        <div className="field">
          <label htmlFor="attending-hospital">Hospital</label>
          <input id="attending-hospital" value={hospital} onChange={(event) => setHospital(event.target.value)} placeholder="Where you scrub with them" autoComplete="off" />
        </div>
        {error && <p className="form-message" role="alert">{error}</p>}
        <div className="settings-actions">
          <button className="button small" type="submit">Add attending</button>
          {attendings.length > 0 && <button className="button secondary small" type="button" onClick={() => { setAdding(false); setError(""); }}>Cancel</button>}
        </div>
      </form>
    );
  }

  return (
    <div className="attending-picker">
      <label className="eyebrow" htmlFor="attending-select">Whose preferences?</label>
      <div className="attending-picker-row">
        <span className="callout-icon"><UserFocus size={16} weight="fill" /></span>
        <select id="attending-select" value={selectedId} onChange={(event) => select(event.target.value)}>
          <option value="">Standard technique</option>
          {attendings.map((attending) => <option key={attending.id} value={attending.id}>{attending.name}{attending.hospital ? ` · ${attending.hospital}` : ""}</option>)}
        </select>
        <button className="button secondary small" type="button" onClick={() => setAdding(true)}><Plus size={13} />New</button>
      </div>
    </div>
  );
}
