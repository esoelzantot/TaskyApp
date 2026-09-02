/**
 * Lexend Deca font family.
 */

import {
  LexendDeca_400Regular,
  LexendDeca_600SemiBold,
  useFonts,
} from '@expo-google-fonts/lexend-deca';

export function useAppFonts() {
  return useFonts({
    LexendDeca_400Regular,
    LexendDeca_600SemiBold,
  });
}
