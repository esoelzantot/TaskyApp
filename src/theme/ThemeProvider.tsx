import React, { createContext, useContext, useMemo, useState } from "react";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { darkTheme } from "./darkTheme";
import { lightTheme } from "./lightTheme";
import { Theme, ThemeColors, ThemeMode } from "./types";

interface ThemeContextValue {
  theme: Theme;
  /** Overrides the OS color scheme when set (e.g. an in-app theme toggle). */
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [override, setOverride] = useState<ThemeMode | null>(null);

  const mode: ThemeMode =
    override ?? (systemScheme === "light" ? "light" : "dark");
  const theme = mode === "dark" ? darkTheme : lightTheme;

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, mode, setMode: setOverride }),
    [theme, mode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/** Full theme object: colors, typography, spacing, radii, elevation. */
export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx.theme;
}

/** Shorthand for just the active color palette. */
export function useColors(): ThemeColors {
  return useTheme().colors;
}

/** Lets a screen read/override the active mode (e.g. a settings toggle). */
export function useThemeMode(): {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
} {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return { mode: ctx.mode, setMode: ctx.setMode };
}
