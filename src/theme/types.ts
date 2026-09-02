/**
 * Type definitions for the Tasky theme system.
 */

export interface ThemeColors {
  // Brand
  primary: string; // Primary
  primaryLight: string; // Primary Light
  primarySurface: string; // Primary Surface
  primaryMuted: string; // Primary Muted
  onPrimary: string; // Text/icon color on top of `primary` (white on every button in Figma)

  // Accent
  accentPink: string; // Accent Pink
  accentPinkLight: string; // Accent Pink Light
  accentOrange: string; // Accent Orange
  accentOrangeLight: string; // Accent Orange Light
  accentBlue: string; // Accent Blue
  accentBlueLight: string; // Accent Blue Light

  // Neutrals
  black: string; // Black
  white: string; // White
  textPrimary: string; // Text Primary
  textSecondary: string; // Text Secondary
  textDisabled: string; // Text Disabled
  iconDark: string; // Icon Dark

  // Semantic
  success: string; // Success (badge fill)
  onSuccess: string; // Text on `success` (observed on the "Done" badge)
  warning: string; // Warning
  onWarning: string; // Not defined in Figma — derived (= textPrimary) for contrast on a bright yellow fill
  error: string; // Error/Destructive
  onError: string; // Text/icon on `error` (white on the Delete button)
  info: string; // Info (same value as Accent Blue in Figma)
  infoSurface: string; // Light info background (= Accent Blue Light, used behind info text/badges)

  // Surfaces & structure
  background: string; // Screen background
  surface: string; // Cards / sheets
  surfaceMuted: string; // Bottom navigation bar background
  border: string; // Divider / hairline
}

export interface TypographyStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  lineHeight: number;
  letterSpacing?: number;
}

/** Names match the "Typography" section's row labels exactly. */
export interface ThemeTypography {
  display: TypographyStyle; // Lexend Deca · SemiBold · 32px
  heading1: TypographyStyle; // Lexend Deca · SemiBold · 24px
  heading2: TypographyStyle; // Lexend Deca · SemiBold · 20px
  title: TypographyStyle; // Lexend Deca · SemiBold · 19px
  subtitle: TypographyStyle; // Lexend Deca · SemiBold · 16px
  body: TypographyStyle; // Lexend Deca · Regular · 14px
  bodyBold: TypographyStyle; // Lexend Deca · SemiBold · 14px
  caption: TypographyStyle; // Lexend Deca · Regular · 11px
  label: TypographyStyle; // Lexend Deca · SemiBold · 10px
  small: TypographyStyle; // Lexend Deca · Regular · 9px
}

/**
 * Raw dp scale, keyed by its own value — exactly the "Spacing Scale"
 * section (dp-2 … dp-24). Figma defines the scale itself, not semantic
 * names, so we expose it as-is rather than inventing names like
 * "marginPage" that aren't in the source.
 */
export interface ThemeSpacing {
  2: number;
  4: number;
  6: number;
  8: number;
  10: number;
  12: number;
  16: number;
  20: number;
  24: number;
}

/** Names match the "Border Radius" section's row labels. */
export interface ThemeRadii {
  sm: number; // 8px (Small)
  md: number; // 10px (Medium)
  tabs: number; // 12px (Tabs)
  button: number; // 14px (Buttons)
  card: number; // 16px (Cards)
  banner: number; // 24px (Banners)
  /** Not a distinct row in Figma — conventional value for fully-circular elements (FAB, avatars). */
  full: number;
}

export interface ThemeShadow {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  /** Android-only approximation — RN's Android shadow has no color/blur control. Not a Figma value. */
  elevation: number;
}

/** Matches the "Elevation" section's three named levels. */
export interface ThemeElevation {
  level1: ThemeShadow; // Card Shadow — black @ 4%, y4 blur32
  level2: ThemeShadow; // Purple Glow — primary @ 35%, y6 blur6
  level3: ThemeShadow; // Elevated Purple — primary @ 49%, x2 y10 blur18
}

/** Matches the "Icon Sizes" section. */
export interface ThemeIconSizes {
  small: number; // 14 — meta / badges
  medium: number; // 20 — inputs / buttons
  standard: number; // 24 — navbars / lists
  large: number; // 28 — headers / main actions
}

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  radii: ThemeRadii;
  elevation: ThemeElevation;
  iconSizes: ThemeIconSizes;
}
