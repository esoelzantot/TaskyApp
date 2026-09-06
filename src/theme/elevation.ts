/**
 * Elevation.
 */

import { ThemeElevation } from "./types";

export function buildElevation(primaryColor: string): ThemeElevation {
  return {
    level1: {
      shadowColor: "#cccccc",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.04,
      shadowRadius: 24,
      elevation: 2,
    },
    level2: {
      shadowColor: primaryColor,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 6,
      elevation: 4,
    },
    level3: {
      shadowColor: primaryColor,
      shadowOffset: { width: 2, height: 10 },
      shadowOpacity: 0.49,
      shadowRadius: 18,
      elevation: 6,
    },
  };
}
