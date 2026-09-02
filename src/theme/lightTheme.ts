/**
 * Light theme.
 */

import { buildElevation } from "./elevation";
import { iconSizes, radii, spacing, typography } from "./tokens";
import { Theme, ThemeColors } from "./types";

export const lightColors: ThemeColors = {
  // Brand
  primary: "#5F33E1",
  primaryLight: "#AB94FF",
  primarySurface: "#EDE8FF",
  primaryMuted: "#EEE9FF",
  onPrimary: "#FFFFFF",

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
  textPrimary: "#24252C",
  textSecondary: "#6E6A7C",
  textDisabled: "#A39ABF",
  iconDark: "#130F26",

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
  background: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceMuted: "#F5F3FF",
  border: "#E5E7EB",
};

export const lightTheme: Theme = {
  mode: "light",
  colors: lightColors,
  typography,
  spacing,
  radii,
  elevation: buildElevation(lightColors.primary),
  iconSizes,
};
