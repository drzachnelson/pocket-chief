import type { TopicBlock } from "@/lib/types";

/**
 * Attending preferences: how a named surgeon differs from the standard operation.
 *
 * Deliberately NOT in `src/lib/types.ts`. That module is the contract for content that gets
 * published to GitHub Pages, which serves the build regardless of repository visibility. These
 * types describe data that must never enter it, and keeping the boundary in a separate module
 * is what makes `content-privacy.test.ts` able to assert it mechanically.
 *
 * Everything here is pure. The IndexedDB side lives in `attending-db.ts`, against its own
 * database, so unit tests need no storage shim.
 */

/** Ported verbatim from the OR Playbook vault's Attending Preference JSON shape. */
export const ATTENDING_SECTIONS = [
  { id: "preference_snapshot", label: "Preference snapshot" },
  { id: "setup_positioning", label: "Setup and positioning" },
  { id: "incision_access", label: "Incision and access" },
  { id: "dissection_style", label: "Dissection style" },
  { id: "key_steps", label: "Key steps they care about" },
  { id: "equipment_preferences", label: "Equipment, mesh and suture" },
  { id: "pitfalls", label: "Pitfalls and do not miss" },
  { id: "my_notes", label: "My notes from prior cases" },
] as const;

export type AttendingSectionId = (typeof ATTENDING_SECTIONS)[number]["id"];

const SECTION_IDS = new Set<string>(ATTENDING_SECTIONS.map((section) => section.id));

export interface Attending {
  id: string;
  name: string;
  hospital: string;
  specialty: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * `anchor` is what puts a note beside the step it modifies rather than in a list at the end.
 *
 * A sequence block's steps carry no ids, so the anchor names the step by title — which the
 * content contract already guarantees is unique within its block. An anchor that no longer
 * resolves is surfaced as unlinked, never silently dropped.
 */
export interface AttendingNote {
  id: string;
  attendingId: string;
  /** Joins to `Playbook.procedureId`, never to a slug, so renaming a guide orphans nothing. */
  procedureId: string;
  section: AttendingSectionId;
  anchor?: { blockId: string; stepTitle?: string };
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendingBackup {
  format: "pocket-chief-attending";
  version: 1;
  exportedAt: string;
  attendings: Attending[];
  notes: AttendingNote[];
}

export const BACKUP_FORMAT = "pocket-chief-attending";
export const BACKUP_VERSION = 1;

export function newId(): string {
  // Private browsing and older WebViews have both been seen without randomUUID.
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

const isIsoDate = (value: unknown): value is string => typeof value === "string" && !Number.isNaN(Date.parse(value));
const isNonEmpty = (value: unknown): value is string => typeof value === "string" && value.trim().length > 0;

function parseAttending(raw: unknown, index: number): Attending {
  if (typeof raw !== "object" || raw === null) throw new Error(`Attending ${index + 1} is not an object.`);
  const value = raw as Record<string, unknown>;
  if (!isNonEmpty(value.id) || !isNonEmpty(value.name)) throw new Error(`Attending ${index + 1} is missing an id or a name.`);
  if (!isIsoDate(value.createdAt) || !isIsoDate(value.updatedAt)) throw new Error(`Attending "${value.name}" has an unreadable date.`);
  return {
    id: value.id,
    name: value.name,
    hospital: typeof value.hospital === "string" ? value.hospital : "",
    specialty: typeof value.specialty === "string" ? value.specialty : "",
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
  };
}

function parseNote(raw: unknown, index: number): AttendingNote {
  if (typeof raw !== "object" || raw === null) throw new Error(`Note ${index + 1} is not an object.`);
  const value = raw as Record<string, unknown>;
  if (!isNonEmpty(value.id) || !isNonEmpty(value.attendingId) || !isNonEmpty(value.procedureId)) throw new Error(`Note ${index + 1} is missing an id, an attending or a procedure.`);
  if (!isNonEmpty(value.section) || !SECTION_IDS.has(value.section)) throw new Error(`Note ${index + 1} has an unknown section "${String(value.section)}".`);
  if (!isIsoDate(value.createdAt) || !isIsoDate(value.updatedAt)) throw new Error(`Note ${index + 1} has an unreadable date.`);
  const anchor = value.anchor as Record<string, unknown> | undefined;
  return {
    id: value.id,
    attendingId: value.attendingId,
    procedureId: value.procedureId,
    section: value.section as AttendingSectionId,
    ...(anchor && isNonEmpty(anchor.blockId) ? { anchor: { blockId: anchor.blockId, ...(isNonEmpty(anchor.stepTitle) ? { stepTitle: anchor.stepTitle } : {}) } } : {}),
    text: typeof value.text === "string" ? value.text : "",
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
  };
}

/** Strict on purpose: a malformed backup should be refused, not half-imported. */
export function parseAttendingBackup(raw: unknown): AttendingBackup {
  if (typeof raw !== "object" || raw === null) throw new Error("That file is not a Pocket Chief attending backup.");
  const value = raw as Record<string, unknown>;
  if (value.format !== BACKUP_FORMAT) throw new Error("That file is not a Pocket Chief attending backup.");
  if (value.version !== BACKUP_VERSION) throw new Error(`This backup is version ${String(value.version)}; this app reads version ${BACKUP_VERSION}.`);
  if (!Array.isArray(value.attendings) || !Array.isArray(value.notes)) throw new Error("The backup is missing its attendings or notes list.");
  const attendings = value.attendings.map(parseAttending);
  const notes = value.notes.map(parseNote);
  const known = new Set(attendings.map((attending) => attending.id));
  const orphans = notes.filter((note) => !known.has(note.attendingId));
  if (orphans.length > 0) throw new Error(`${orphans.length} note${orphans.length === 1 ? "" : "s"} in the backup belong to an attending it does not contain.`);
  return { format: BACKUP_FORMAT, version: BACKUP_VERSION, exportedAt: isIsoDate(value.exportedAt) ? value.exportedAt : new Date().toISOString(), attendings, notes };
}

const newest = <T extends { id: string; updatedAt: string }>(current: T[], incoming: T[]): T[] => {
  const merged = new Map(current.map((item) => [item.id, item]));
  for (const item of incoming) {
    const existing = merged.get(item.id);
    // Last write wins, and a tie keeps what is already on the device — importing the same
    // backup twice must not churn the store.
    if (!existing || item.updatedAt > existing.updatedAt) merged.set(item.id, item);
  }
  return [...merged.values()];
};

/**
 * Non-destructive by design. An import adds and updates; it never deletes, because a backup is
 * a snapshot of one moment and cannot know what was deliberately removed since.
 */
export function mergeAttendingBackup(
  current: { attendings: Attending[]; notes: AttendingNote[] },
  incoming: AttendingBackup,
): { attendings: Attending[]; notes: AttendingNote[] } {
  return { attendings: newest(current.attendings, incoming.attendings), notes: newest(current.notes, incoming.notes) };
}

export function buildAttendingBackup(attendings: Attending[], notes: AttendingNote[]): AttendingBackup {
  return { format: BACKUP_FORMAT, version: BACKUP_VERSION, exportedAt: new Date().toISOString(), attendings, notes };
}

/** Every anchor a playbook's blocks can satisfy. Anything else is an unlinked note. */
export function anchorTargets(blocks: TopicBlock[]): Array<{ blockId: string; stepTitle?: string }> {
  return blocks.flatMap((block) => [
    { blockId: block.id },
    ...(block.type === "sequence" ? block.steps.map((step) => ({ blockId: block.id, stepTitle: step.title })) : []),
  ]);
}

const sameAnchor = (a: AttendingNote["anchor"], blockId: string, stepTitle?: string) =>
  a?.blockId === blockId && (a.stepTitle ?? undefined) === stepTitle;

export function notesForAnchor(notes: AttendingNote[], blockId: string, stepTitle?: string): AttendingNote[] {
  return notes.filter((note) => sameAnchor(note.anchor, blockId, stepTitle));
}

/**
 * Notes whose anchor no longer resolves against the current blocks, plus notes that never had
 * one. Both belong in the card view; the first kind also needs re-anchoring.
 */
export function unlinkedNotes(notes: AttendingNote[], blocks: TopicBlock[]): AttendingNote[] {
  const targets = anchorTargets(blocks);
  return notes.filter((note) => !note.anchor || !targets.some((target) => sameAnchor(note.anchor, target.blockId, target.stepTitle)));
}

export function notesBySection(notes: AttendingNote[]): Map<AttendingSectionId, AttendingNote[]> {
  const grouped = new Map<AttendingSectionId, AttendingNote[]>();
  for (const section of ATTENDING_SECTIONS) grouped.set(section.id, []);
  for (const note of notes) grouped.set(note.section, [...grouped.get(note.section) ?? [], note]);
  return grouped;
}
