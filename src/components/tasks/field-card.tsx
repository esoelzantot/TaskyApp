import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { useTheme } from "@/src/theme";

interface FieldCardProps {
  /** "surface" = white card with a soft shadow. "tinted" = flat primary-tinted card (e.g. Priority). */
  variant?: "surface" | "tinted";
  style?: ViewStyle;
  children: React.ReactNode;
  testID?: string;
}

export function FieldCard({ variant = "surface", style, children, testID }: FieldCardProps) {
  const { colors, radii, spacing, elevation } = useTheme();

  return (
    <View
      testID={testID}
      style={[
        styles.base,
        {
          backgroundColor: variant === "tinted" ? colors.primarySurface : colors.surface,
          borderRadius: radii.card,
          padding: spacing[16],
        },
        variant === "surface" ? elevation.level1 : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
  },
});
