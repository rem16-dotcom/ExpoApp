import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

// Same palettes as Hunnypie.
export type Palette = {
  bg: string;
  surface: string;
  surface2: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  onAccent: string;
  navBg: string;
  placeholder: string;
  danger: string;
  dangerBg: string;
  overlay: string;
};

const DARK: Palette = {
  bg: "#000000",
  surface: "#1F1F21",
  surface2: "#2E2E31",
  border: "#3A3A3D",
  text: "#FFFFFF",
  muted: "#A3A3A8",
  accent: "#F45B91",
  onAccent: "#FFFFFF",
  navBg: "#262628",
  placeholder: "#707076",
  danger: "#FF7B7B",
  dangerBg: "#3A1D20",
  overlay: "rgba(0,0,0,0.65)",
};

const LIGHT: Palette = {
  bg: "#FFFFFF",
  surface: "#FFF0F5",
  surface2: "#FFDFEA",
  border: "#F5CCDA",
  text: "#262126",
  muted: "#8C8188",
  accent: "#F45B91",
  onAccent: "#FFFFFF",
  navBg: "#F6EEF1",
  placeholder: "#B9AEB4",
  danger: "#DC2626",
  dangerBg: "#FEF2F2",
  overlay: "rgba(0,0,0,0.4)",
};

type ThemeValue = { dark: boolean; c: Palette; toggle: () => void };

const ThemeContext = createContext<ThemeValue>({ dark: true, c: DARK, toggle: () => {} });

/** Dark by default (like Hunnypie). Kept in memory only, so no extra package is needed. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(true);
  const toggle = useCallback(() => setDark((d) => !d), []);
  const value = useMemo<ThemeValue>(() => ({ dark, c: dark ? DARK : LIGHT, toggle }), [dark, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
