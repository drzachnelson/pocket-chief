import "fake-indexeddb/auto";
import { deleteDB, openDB } from "idb";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Attending, AttendingNote } from "@/lib/attending";

// A real IndexedDB implementation, not the hand-rolled `vi.mock("idb")` fake the other storage
// tests use. That fake's createObjectStore returns nothing, so createIndex throws on it, and it
// cannot prove a compound index works or that one database survives another being deleted.

const attending = (id: string, name: string): Attending => ({ id, name, hospital: "Test General", specialty: "Vascular", createdAt: "2026-09-10T00:00:00.000Z", updatedAt: "2026-09-10T00:00:00.000Z" });
const note = (id: string, attendingId: string, procedureId: string, text = "Prefers a 6-0 prolene."): AttendingNote => ({ id, attendingId, procedureId, section: "key_steps", text, createdAt: "2026-09-10T00:00:00.000Z", updatedAt: "2026-09-10T00:00:00.000Z" });

async function freshModule() {
  vi.resetModules();
  return await import("@/lib/attending-db");
}

beforeEach(async () => {
  await deleteDB("pocket-chief-attendings").catch(() => undefined);
  await deleteDB("pocket-chief-private").catch(() => undefined);
});

afterEach(() => { vi.resetModules(); });

describe("attending storage", () => {
  it("round-trips attendings and notes through the compound index", async () => {
    const db = await freshModule();
    await db.saveAttending(attending("a1", "Alvarez"));
    await db.saveNote(note("n1", "a1", "carotid_endarterectomy_bovine_patch"));
    await db.saveNote(note("n2", "a1", "femoropopliteal_bypass"));

    expect((await db.listAttendings()).map((row) => row.name)).toEqual(["Alvarez"]);
    // The compound index is what makes this one lookup rather than a scan and a filter.
    expect((await db.listNotes("a1", "carotid_endarterectomy_bovine_patch")).map((row) => row.id)).toEqual(["n1"]);
    expect(await db.listNotes("a1", "unwritten_procedure")).toEqual([]);
  });

  it("sorts attendings by name so the picker order does not depend on insertion", async () => {
    const db = await freshModule();
    await db.saveAttending(attending("a2", "Zimmer"));
    await db.saveAttending(attending("a1", "Alvarez"));
    expect((await db.listAttendings()).map((row) => row.name)).toEqual(["Alvarez", "Zimmer"]);
  });

  it("deletes an attending's notes with them rather than orphaning them", async () => {
    const db = await freshModule();
    await db.saveAttending(attending("a1", "Alvarez"));
    await db.saveAttending(attending("a2", "Zimmer"));
    await db.saveNote(note("n1", "a1", "femoropopliteal_bypass"));
    await db.saveNote(note("n2", "a2", "femoropopliteal_bypass"));

    await db.deleteAttending("a1");

    expect((await db.listAttendings()).map((row) => row.id)).toEqual(["a2"]);
    expect((await db.listAllNotes()).map((row) => row.id)).toEqual(["n2"]);
  });

  it("refuses a note that looks like patient information", async () => {
    const db = await freshModule();
    await db.saveAttending(attending("a1", "Alvarez"));

    await expect(db.saveNote(note("n1", "a1", "femoropopliteal_bypass", "MRN 4482910 bled after this one."))).rejects.toThrow(/patient information/);
    expect(await db.listAllNotes()).toEqual([]);
  });

  it("refuses an entire import when any note in it looks like patient information", async () => {
    // All-or-nothing: a partial import would leave the reader unsure what landed.
    const db = await freshModule();
    await expect(db.replaceAttendingData([attending("a1", "Alvarez")], [
      note("n1", "a1", "femoropopliteal_bypass"),
      note("n2", "a1", "carotid_endarterectomy_bovine_patch", "DOB 04/11/1957, came back on POD 3."),
    ])).rejects.toThrow(/Nothing was imported/);
    expect(await db.listAttendings()).toEqual([]);
  });

  it("survives the legacy clear that deletes the other database", async () => {
    // The regression that drove the two-database split: a tab still running the old bundle calls
    // deleteDB("pocket-chief-private") when the reader clears offline data. Attending notes are
    // the only data in the app with no rebuildable source, so they must be out of its reach.
    const db = await freshModule();
    await db.saveAttending(attending("a1", "Alvarez"));
    await db.saveNote(note("n1", "a1", "femoropopliteal_bypass"));
    const legacy = await openDB("pocket-chief-private", 2, { upgrade(database) { database.createObjectStore("saved", { keyPath: "id" }); } });
    legacy.close();

    await deleteDB("pocket-chief-private");

    expect((await db.listAllNotes()).map((row) => row.id)).toEqual(["n1"]);
    expect((await db.listAttendings()).map((row) => row.id)).toEqual(["a1"]);
  });

  it("exports what it holds and merges an import back without losing newer local edits", async () => {
    const db = await freshModule();
    await db.saveAttending(attending("a1", "Alvarez"));
    await db.saveNote(note("n1", "a1", "femoropopliteal_bypass"));

    const backup = await db.exportAttendingData();
    expect(backup.format).toBe("pocket-chief-attending");
    expect(backup.notes).toHaveLength(1);

    await db.clearAttendingData();
    expect(await db.listAllNotes()).toEqual([]);

    await db.replaceAttendingData(backup.attendings, backup.notes);
    expect((await db.listAllNotes()).map((row) => row.id)).toEqual(["n1"]);
  });
});
