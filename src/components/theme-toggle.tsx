"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

type Theme = "light" | "dark";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<Theme | null>(null);
  useEffect(() => {
    const stored = typeof localStorage?.getItem === "function" ? localStorage.getItem("pocket-chief-theme") as Theme | null : null;
    const prefersDark = typeof matchMedia === "function" && matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    document.documentElement.dataset.theme = initial;
    const frame = requestAnimationFrame(() => setTheme(initial));
    return () => cancelAnimationFrame(frame);
  }, []);
  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    if (typeof localStorage?.setItem === "function") localStorage.setItem("pocket-chief-theme", next);
    setTheme(next);
  }
  return <button type="button" className={compact ? "icon-link" : "side-nav-link theme-button"} onClick={toggle} aria-label={`Use ${theme === "dark" ? "light" : "dark"} theme`}>{theme === "dark" ? <Sun size={compact ? 21 : 18} /> : <Moon size={compact ? 21 : 18} />} {!compact && <span>{theme === "dark" ? "Light" : "Dark"} theme</span>}</button>;
}
