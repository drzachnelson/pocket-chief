import { openDB, type IDBPDatabase } from "idb";
import { buildAttendingBackup, type Attending, type AttendingBackup, type AttendingNote } from "@/lib/attending";
import { detectLikelyPHI } from "@/lib/safety";

/**
 * A second database, separate from `pocket-chief-private`, and that separation is the point.
 *
 * The deployed v2 bundle calls `deleteDB("pocket-chief-private")` unconditionally when the
 * reader clears offline data. A tab opened before a later deploy keeps running that code, so
 * anything living in that database can be destroyed by a version of the app we can no longer
 * change. Everything else in there is rebuildable from the shipped bundle; attending notes are
 * not. Old code has never heard of this name and cannot reach it.
 *
 * It also means an upgrade here can never block the library load, and vice versa.
 */
const DB_NAME = "pocket-chief-attendings";
const OPEN_TIMEOUT_MS = 3000;
export const ATTENDING_STORAGE_BUSY = "Attending notes are busy in another Pocket Chief tab. Close the others and reload.";

let databasePromise: Promise<IDBPDatabase> | undefined;

async function openAttendingDatabase(): Promise<IDBPDatabase> {
  let handle: IDBPDatabase | undefined;
  let abandoned = false;
  const opening = openDB(DB_NAME, 1, {
    upgrade(database) {
      if (!database.objectStoreNames.contains("attendings")) database.createObjectStore("attendings", { keyPath: "id" });
      if (!database.objectStoreNames.contains("notes")) {
        const notes = database.createObjectStore("notes", { keyPath: "id" });
        // The dominant query is "this attending, on this procedure". Two single-field indexes
        // would each answer half of it and still need a scan.
        notes.createIndex("byAttendingProcedure", ["attendingId", "procedureId"]);
        notes.createIndex("byAttending", "attendingId");
      }
    },
    blocking() { handle?.close(); handle = undefined; databasePromise = undefined; },
  });
  void opening.then((database) => { if (abandoned) database.close(); else handle = database; }, () => undefined);
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    // A blocked open never settles. Failing is recoverable; hanging every read is not.
    return await Promise.race([opening, new Promise<never>((_, reject) => {
      timer = setTimeout(() => { abandoned = true; reject(new Error(ATTENDING_STORAGE_BUSY)); }, OPEN_TIMEOUT_MS);
    })]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function db() {
  databasePromise ??= openAttendingDatabase().catch((error) => { databasePromise = undefined; throw error; });
  return databasePromise;
}

export async function listAttendings(): Promise<Attending[]> {
  const all = await (await db()).getAll("attendings") as Attending[];
  return all.sort((a, b) => a.name.localeCompare(b.name));
}

export async function saveAttending(attending: Attending): Promise<void> {
  await (await db()).put("attendings", attending);
}

/** Deletes the attending and every note that belonged to them — never leaves orphans behind. */
export async function deleteAttending(id: string): Promise<void> {
  const database = await db();
  const tx = database.transaction(["attendings", "notes"], "readwrite");
  const orphaned = await tx.objectStore("notes").index("byAttending").getAllKeys(id);
  await Promise.all([
    tx.objectStore("attendings").delete(id),
    ...orphaned.map((key) => tx.objectStore("notes").delete(key)),
    tx.done,
  ]);
}

export async function listNotes(attendingId: string, procedureId: string): Promise<AttendingNote[]> {
  const database = await db();
  return await database.getAllFromIndex("notes", "byAttendingProcedure", [attendingId, procedureId]) as AttendingNote[];
}

export async function listAllNotes(): Promise<AttendingNote[]> {
  return await (await db()).getAll("notes") as AttendingNote[];
}

/**
 * Screens before it writes. A refused note is reported with its reason and left in the editor
 * for the author to fix — never silently altered, and never quietly dropped.
 */
export async function saveNote(note: AttendingNote): Promise<void> {
  const assessment = detectLikelyPHI(note.text);
  if (assessment.blocked) throw new Error(`This note looks like it contains patient information (${assessment.reasons.join(", ")}). Pocket Chief does not store that. Rewrite it as a preference rather than a case.`);
  await (await db()).put("notes", note);
}

export async function deleteNote(id: string): Promise<void> {
  await (await db()).delete("notes", id);
}

export async function exportAttendingData(): Promise<AttendingBackup> {
  const [attendings, notes] = await Promise.all([listAttendings(), listAllNotes()]);
  return buildAttendingBackup(attendings, notes);
}

/** Applied in one transaction: a partial import would leave notes pointing at nothing. */
export async function replaceAttendingData(attendings: Attending[], notes: AttendingNote[]): Promise<void> {
  for (const note of notes) {
    const assessment = detectLikelyPHI(note.text);
    if (assessment.blocked) throw new Error(`A note in this backup looks like it contains patient information (${assessment.reasons.join(", ")}). Nothing was imported.`);
  }
  const database = await db();
  const tx = database.transaction(["attendings", "notes"], "readwrite");
  await Promise.all([
    ...attendings.map((attending) => tx.objectStore("attendings").put(attending)),
    ...notes.map((note) => tx.objectStore("notes").put(note)),
    tx.done,
  ]);
}

/** The destructive path, reached only through the export-first flow in Settings. */
export async function clearAttendingData(): Promise<void> {
  const database = await db();
  const tx = database.transaction(["attendings", "notes"], "readwrite");
  await Promise.all([tx.objectStore("attendings").clear(), tx.objectStore("notes").clear(), tx.done]);
}
