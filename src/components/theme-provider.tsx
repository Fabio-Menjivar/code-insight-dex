import { createContext, useEffect, type ReactNode } from "react";

/** Fraktur uses a fixed high-contrast dark theme only (projector-friendly). */
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  }, []);

  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
}

const ThemeContext = createContext<Record<string, never>>({});

export function useTheme() {
  return { theme: "dark" as const, toggle: () => {}, setTheme: () => {} };
}
