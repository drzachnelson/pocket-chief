import type { AnkiSettings } from "@/lib/types";

const STORAGE_KEY = "pocket-chief-anki-settings";

export const defaultAnkiSettings: Required<AnkiSettings> = {
  deck: "Pocket Chief",
  noteType: "Cloze",
  tagPrefix: "pc::",
  fieldMap: { text: "Text", extra: "Extra" },
};

export function loadAnkiSettings(): Required<AnkiSettings> {
  if (typeof window === "undefined") return defaultAnkiSettings;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultAnkiSettings;
    const value = JSON.parse(stored) as Partial<Required<AnkiSettings>>;
    return {
      deck: value.deck?.trim() || defaultAnkiSettings.deck,
      noteType: value.noteType?.trim() || defaultAnkiSettings.noteType,
      tagPrefix: value.tagPrefix ?? defaultAnkiSettings.tagPrefix,
      fieldMap: {
        text: value.fieldMap?.text?.trim() || defaultAnkiSettings.fieldMap.text,
        extra: value.fieldMap?.extra?.trim() || defaultAnkiSettings.fieldMap.extra,
      },
    };
  } catch {
    return defaultAnkiSettings;
  }
}

export function saveAnkiSettings(settings: Required<AnkiSettings>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
