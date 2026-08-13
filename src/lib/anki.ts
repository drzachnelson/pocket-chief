import type { AnkiSettings, ClozeDraft } from "@/lib/types";

export async function createDuplicateHash(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text.trim().toLowerCase()));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function buildAnkiMobileUrl(draft: ClozeDraft, settings: AnkiSettings): string {
  const textField = settings.fieldMap?.text || "Text";
  const extraField = settings.fieldMap?.extra || "Extra";
  const params = new URLSearchParams({
    type: settings.noteType,
    deck: settings.deck,
    [`fld${textField}`]: draft.clozeText,
    [`fld${extraField}`]: `${draft.additionalContext}<br><img src="${draft.contextImageRef}">`,
    tags: draft.tags.map((tag) => `${settings.tagPrefix}${tag}`).join(" "),
    "x-success": "pocketchief://anki-added",
  });
  return `anki://x-callback-url/addnote?${params.toString()}`;
}

export function createFallbackCloze(selection: string): string {
  const normalized = selection.trim();
  const subjectMatch = normalized.match(/^(.{3,60}?)\s+(is|are|was|were|can|may|must)\s+/i);
  if (subjectMatch) return normalized.replace(subjectMatch[1], `{{c1::${subjectMatch[1]}}}`);
  const words = normalized.split(/\s+/);
  const stopwords = new Set(["a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "in", "is", "it", "of", "on", "or", "the", "to", "with"]);
  const candidates = words.map((word, index) => ({ word, index, score: word.replace(/[^a-z0-9-]/gi, "").length })).filter(({ word, score }) => score >= 4 && !stopwords.has(word.toLowerCase().replace(/[^a-z0-9-]/g, "")));
  const selected = candidates.sort((a, b) => b.score - a.score || a.index - b.index)[0] ?? { word: words[0], index: 0 };
  return words.map((word, index) => index === selected.index ? `{{c1::${word}}}` : word).join(" ");
}

function cleanTsv(value: string) {
  return value.replace(/\t/g, " ").replace(/\r?\n/g, "<br>");
}

export function toAnkiTsv(drafts: ClozeDraft[], settings: AnkiSettings = { deck: "Pocket Chief", noteType: "Cloze", tagPrefix: "" }): string {
  const header = "#separator:tab\n#html:true\n#notetype column:1\n#deck column:2\n#tags column:5\n";
  const rows = drafts.map((draft) => [
    settings.noteType,
    settings.deck,
    cleanTsv(draft.clozeText),
    cleanTsv(`${draft.additionalContext}<br><img src="${draft.contextImageRef}">`),
    cleanTsv(draft.tags.map((tag) => `${settings.tagPrefix}${tag}`).join(" ")),
  ].join("\t"));
  return `${header}${rows.join("\n")}\n`;
}

export async function sendToAnkiConnect(draft: ClozeDraft, settings: AnkiSettings): Promise<number> {
  let contextImageRef = draft.contextImageRef;
  if (draft.contextImageRef.startsWith("data:image/")) {
    const filename = `pocket-chief-${draft.duplicateHash.slice(0, 16)}.svg`;
    const encoded = draft.contextImageRef.split(",", 2)[1] || "";
    const bytes = new TextEncoder().encode(decodeURIComponent(encoded));
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    const mediaResponse = await fetch("http://127.0.0.1:8765", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "storeMediaFile", version: 6, params: { filename, data: btoa(binary) } }),
    });
    if (!mediaResponse.ok) throw new Error("AnkiConnect is unavailable.");
    const mediaData = await mediaResponse.json() as { result?: string; error?: string };
    if (mediaData.error || !mediaData.result) throw new Error(mediaData.error || "AnkiConnect could not store the context image.");
    contextImageRef = filename;
  }
  const textField = settings.fieldMap?.text || "Text";
  const extraField = settings.fieldMap?.extra || "Extra";
  const response = await fetch("http://127.0.0.1:8765", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "addNote",
      version: 6,
      params: {
        note: {
          deckName: settings.deck,
          modelName: settings.noteType,
          fields: { [textField]: draft.clozeText, [extraField]: `${draft.additionalContext}<br><img src="${contextImageRef}">` },
          tags: draft.tags.map((tag) => `${settings.tagPrefix}${tag}`),
          options: { allowDuplicate: false },
        },
      },
    }),
  });
  if (!response.ok) throw new Error("AnkiConnect is unavailable.");
  const data = await response.json() as { result?: number; error?: string };
  if (data.error || !data.result) throw new Error(data.error || "AnkiConnect did not add the note.");
  return data.result;
}
