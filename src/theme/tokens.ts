/**
 * Mode-independent design tokens
 */

import {
  ThemeIconSizes,
  ThemeRadii,
  ThemeSpacing,
  ThemeTypography,
} from "./types";

/**
 * Typography scale
 */
export const typography: ThemeTypography = {
  display: {
    fontFamily: "LexendDeca_600SemiBold",
    fontSize: 32,
    fontWeight: "600",
    lineHeight: 42,
  },
  heading1: {
    fontFamily: "LexendDeca_600SemiBold",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 31,
  },
  heading2: {
    fontFamily: "LexendDeca_600SemiBold",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 26,
  },
  title: {
    fontFamily: "LexendDeca_600SemiBold",
    fontSize: 19,
    fontWeight: "600",
    lineHeight: 25,
  },
  subtitle: {
    fontFamily: "LexendDeca_600SemiBold",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 21,
  },
  body: {
    fontFamily: "LexendDeca_400Regular",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18,
  },
  bodyBold: {
    fontFamily: "LexendDeca_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
  },
  caption: {
    fontFamily: "LexendDeca_400Regular",
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 14,
  },
  label: {
    fontFamily: "LexendDeca_600SemiBold",
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 13,
  },
  small: {
    fontFamily: "LexendDeca_400Regular",
    fontSize: 9,
    fontWeight: "400",
    lineHeight: 12,
  },
};

/** Raw dp scale */
export const spacing: ThemeSpacing = {
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
};

/** Corner radii */
export const radii: ThemeRadii = {
  sm: 8, // Small
  md: 10, // Medium
  tabs: 12, // Tabs
  button: 14, // Buttons
  card: 16, // Cards
  banner: 24, // Banners
  full: 9999,
};

/** Icon sizes . */
export const iconSizes: ThemeIconSizes = {
  small: 14,
  medium: 20,
  standard: 24,
  large: 28,
};
