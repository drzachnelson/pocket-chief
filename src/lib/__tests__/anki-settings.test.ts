import { describe, expect, it, vi } from "vitest";
import { defaultAnkiSettings, loadAnkiSettings, saveAnkiSettings } from "@/lib/anki-settings";

describe("Anki settings", () => {
  it("round-trips owner preferences", () => {
    const values = new Map<string, string>();
    vi.stubGlobal("localStorage", { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) });
    const settings = { ...defaultAnkiSettings, deck: "ABSITE", tagPrefix: "surgery::" };
    saveAnkiSettings(settings);
    expect(loadAnkiSettings()).toEqual(settings);
  });
});
