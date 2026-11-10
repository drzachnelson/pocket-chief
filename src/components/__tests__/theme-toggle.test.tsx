import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "@/components/theme-toggle";
import { THEME_KEY, themeInitScript } from "@/lib/theme";

// Node 26 ships a localStorage global that jsdom does not replace, so the tests bring their own.
const data = new Map<string, string>();
const storage = { getItem: vi.fn((key: string) => data.get(key) ?? null), setItem: vi.fn((key: string, value: string) => { data.set(key, value); }), removeItem: vi.fn((key: string) => { data.delete(key); }) };
let deviceDark = false;
let changeDevice: (() => void)[] = [];

beforeEach(() => {
  deviceDark = false;
  changeDevice = [];
  window.matchMedia = vi.fn(() => ({
    get matches() { return deviceDark; },
    addEventListener: (_: string, listener: () => void) => changeDevice.push(listener),
    removeEventListener: (_: string, listener: () => void) => { changeDevice = changeDevice.filter((item) => item !== listener); },
  })) as unknown as typeof window.matchMedia;
  data.clear();
  vi.stubGlobal("localStorage", storage);
  delete document.documentElement.dataset.theme;
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

const theme = () => document.documentElement.dataset.theme;

describe("ThemeToggle", () => {
  it("follows the device with no attribute and no stored value until the reader overrides it", () => {
    deviceDark = true;
    render(<ThemeToggle />);
    expect(theme()).toBeUndefined();
    expect(screen.getByRole("button", { name: "Use light theme" })).toBeInTheDocument();
  });

  it("stores an override that differs from the device", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Use dark theme" }));
    expect(theme()).toBe("dark");
    expect(localStorage.getItem(THEME_KEY)).toBe("dark");
  });

  it("clears the override when the chosen theme matches the device, so the app follows the device again", () => {
    deviceDark = true;
    document.documentElement.dataset.theme = "light";
    localStorage.setItem(THEME_KEY, "light");
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Use dark theme" }));
    expect(theme()).toBeUndefined();
    expect(localStorage.getItem(THEME_KEY)).toBeNull();
    expect(screen.getByRole("button", { name: "Use light theme" })).toBeInTheDocument();
  });

  it("keeps every mounted toggle in step", () => {
    render(<><ThemeToggle compact /><ThemeToggle /></>);
    fireEvent.click(screen.getAllByRole("button")[0]);
    for (const button of screen.getAllByRole("button")) expect(button).toHaveAccessibleName("Use light theme");
  });

  it("tracks a change of the device theme while no override is set", () => {
    render(<ThemeToggle />);
    deviceDark = true;
    act(() => changeDevice.forEach((listener) => listener()));
    expect(screen.getByRole("button", { name: "Use light theme" })).toBeInTheDocument();
  });

  it("still switches for this page load when storage is blocked", () => {
    storage.setItem.mockImplementationOnce(() => { throw new Error("blocked"); });
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Use dark theme" }));
    expect(theme()).toBe("dark");
    expect(screen.getByRole("button", { name: "Use light theme" })).toBeInTheDocument();
  });
});

describe("themeInitScript", () => {
  const run = () => new Function(themeInitScript)();

  it("applies a stored override before first paint", () => {
    localStorage.setItem(THEME_KEY, "dark");
    run();
    expect(theme()).toBe("dark");
  });

  it("ignores anything but light or dark, and survives blocked storage", () => {
    localStorage.setItem(THEME_KEY, "sepia");
    run();
    expect(theme()).toBeUndefined();
    storage.getItem.mockImplementationOnce(() => { throw new Error("blocked"); });
    expect(run).not.toThrow();
  });
});
