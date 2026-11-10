"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { applyTheme, currentTheme, subscribeTheme } from "@/lib/theme";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, () => "light" as const);
  return <button type="button" className={compact ? "icon-link" : "side-nav-link theme-button"} onClick={() => applyTheme(theme === "dark" ? "light" : "dark")} aria-label={`Use ${theme === "dark" ? "light" : "dark"} theme`}>{theme === "dark" ? <Sun size={compact ? 21 : 18} /> : <Moon size={compact ? 21 : 18} />} {!compact && <span>{theme === "dark" ? "Light" : "Dark"} theme</span>}</button>;
}
