import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { useTheme } from "@/src/theme";

interface DangerButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

/** Same shape as PrimaryButton, styled with the error color for destructive actions (e.g. Cancel). */
export function DangerButton({
  label,
  onPress,
  loading = false,
  disabled = false,
}: DangerButtonProps) {
  const { colors, typography, radii, spacing, elevation } = useTheme();
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: colors.error,
          borderRadius: radii.button,
          paddingVertical: spacing[16],
          opacity: isDisabled ? 0.6 : pressed ? 0.9 : 1,
        },
        elevation.level1,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.onError} />
      ) : (
        <Text style={[typography.subtitle, { color: colors.onError }]}>
          {label}
        </Text>
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
