import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { useTheme } from "@/src/theme";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function PrimaryButton({ label, onPress, loading = false, disabled = false }: PrimaryButtonProps) {
  const { colors, typography, radii, spacing, elevation } = useTheme();
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: colors.primary,
          borderRadius: radii.button,
          paddingVertical: spacing[16],
          opacity: isDisabled ? 0.6 : pressed ? 0.9 : 1,
        },
        elevation.level2,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.onPrimary} />
      ) : (
        <Text style={[typography.subtitle, { color: colors.onPrimary }]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
