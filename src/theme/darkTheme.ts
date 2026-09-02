/**
 * Dark theme.

 */

import { buildElevation } from "./elevation";
import { iconSizes, radii, spacing, typography } from "./tokens";
import { Theme, ThemeColors } from "./types";

export const darkColors: ThemeColors = {
  // Brand
  primary: "#AB94FF",
  primaryLight: "#5F33E1",
  primarySurface: "#2A2145",
  primaryMuted: "#241C3D",
  onPrimary: "#130F26",

  // Accent
  accentPink: "#F478B8",
  accentPinkLight: "#FFE4F2",
  accentOrange: "#FF7D53",
  accentOrangeLight: "#FFE9E1",
  accentBlue: "#0087FF",
  accentBlueLight: "#E3F2FF",

  // Neutrals
  black: "#000000",
  white: "#FFFFFF",
  textPrimary: "#FFFFFF",
  textSecondary: "#A9A4BD",
  textDisabled: "#A39ABF",
  iconDark: "#FFFFFF",
  // Semantic
  success: "#7FFCAA",
  onSuccess: "#1E753B",
  warning: "#EAED2A",
  onWarning: "#24252C",
  error: "#CE2424",
  onError: "#FFFFFF",
  info: "#0087FF",
  infoSurface: "#E3F2FF",

  // Surfaces & structure
  background: "#121018",
  surface: "#1C1926",
  surfaceMuted: "#242030",
  border: "#332F45",
};

export const darkTheme: Theme = {
  mode: "dark",
  colors: darkColors,
  typography,
  spacing,
  radii,
  elevation: buildElevation(darkColors.primary),
  iconSizes,
};
