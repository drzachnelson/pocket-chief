import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeSetting } from "@/components/theme-setting";
import { THEME_KEY, themeInitScript } from "@/lib/theme";

// Node 26 ships a localStorage global that jsdom does not replace, so the tests bring their own.
const data = new Map<string, string>();
const storage = { getItem: vi.fn((key: string) => data.get(key) ?? null), setItem: vi.fn((key: string, value: string) => { data.set(key, value); }), removeItem: vi.fn((key: string) => { data.delete(key); }) };

beforeEach(() => {
  data.clear();
  vi.stubGlobal("localStorage", storage);
  delete document.documentElement.dataset.theme;
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

const theme = () => document.documentElement.dataset.theme;
const renderSetting = () => render(<><h2 id="theme-heading">Theme</h2><ThemeSetting labelledBy="theme-heading" /></>);
const radio = (name: string) => screen.getByRole("radio", { name });

describe("ThemeSetting", () => {
  it("offers System, Light and Dark as one group named Theme, with System chosen by default", () => {
    renderSetting();
    expect(screen.getByRole("radiogroup", { name: "Theme" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio").map((item) => item.closest("label")?.textContent)).toEqual(["System", "Light", "Dark"]);
    expect(radio("System")).toBeChecked();
    expect(theme()).toBeUndefined();
    expect(localStorage.getItem(THEME_KEY)).toBeNull();
  });

  it("stores Dark and Light as overrides, even when the device already has that theme", () => {
    renderSetting();
    fireEvent.click(radio("Dark"));
    expect(theme()).toBe("dark");
    expect(localStorage.getItem(THEME_KEY)).toBe("dark");
    expect(radio("Dark")).toBeChecked();
    fireEvent.click(radio("Light"));
    expect(theme()).toBe("light");
    expect(localStorage.getItem(THEME_KEY)).toBe("light");
    expect(radio("Light")).toBeChecked();
  });

  it("clears the stored override on System, so the app follows the device again", () => {
    document.documentElement.dataset.theme = "dark";
    localStorage.setItem(THEME_KEY, "dark");
    renderSetting();
    expect(radio("Dark")).toBeChecked();
    fireEvent.click(radio("System"));
    expect(theme()).toBeUndefined();
    expect(localStorage.getItem(THEME_KEY)).toBeNull();
    expect(radio("System")).toBeChecked();
  });

  it("shows the override that the head script put on <html> before hydration", () => {
    localStorage.setItem(THEME_KEY, "light");
    new Function(themeInitScript)();
    renderSetting();
    expect(radio("Light")).toBeChecked();
  });

  it("still switches for this page load when storage is blocked", () => {
    storage.setItem.mockImplementationOnce(() => { throw new Error("blocked"); });
    renderSetting();
    fireEvent.click(radio("Dark"));
    expect(theme()).toBe("dark");
    expect(radio("Dark")).toBeChecked();
    storage.removeItem.mockImplementationOnce(() => { throw new Error("blocked"); });
    fireEvent.click(radio("System"));
    expect(theme()).toBeUndefined();
  });
});

describe("themeInitScript", () => {
  const run = () => new Function(themeInitScript)();

  it("applies a stored override before first paint", () => {
    localStorage.setItem(THEME_KEY, "dark");
    run();
    expect(theme()).toBe("dark");
  });

  it("leaves the device in charge when nothing is stored", () => {
    run();
    expect(theme()).toBeUndefined();
  });

  it("ignores anything but light or dark, and survives blocked storage", () => {
    localStorage.setItem(THEME_KEY, "sepia");
    run();
    expect(theme()).toBeUndefined();
    storage.getItem.mockImplementationOnce(() => { throw new Error("blocked"); });
    expect(run).not.toThrow();
  });
});
