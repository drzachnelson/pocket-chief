"use client";

import { useSyncExternalStore } from "react";
import { setThemeChoice, subscribeTheme, themeChoice, type ThemeChoice } from "@/lib/theme";

const CHOICES: { value: ThemeChoice; label: string }[] = [{ value: "system", label: "System" }, { value: "light", label: "Light" }, { value: "dark", label: "Dark" }];

/** Native radios, so arrow keys and the group name come from the browser. System is the default and means no stored override. */
export function ThemeSetting({ labelledBy }: { labelledBy: string }) {
  const choice = useSyncExternalStore(subscribeTheme, themeChoice, () => "system" as const);
  return <div role="radiogroup" aria-labelledby={labelledBy} className="theme-choice">
    {CHOICES.map(({ value, label }) => <label key={value}><input type="radio" name="theme" value={value} checked={choice === value} onChange={() => setThemeChoice(value)} />{label}</label>)}
  </div>;
}
