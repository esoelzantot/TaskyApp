import React from "react";
import { Text, TextInput, TextInputProps } from "react-native";

import { useTheme } from "@/src/theme";

import { FieldCard } from "./field-card";

interface TextFieldProps extends Omit<TextInputProps, "style"> {
  label: string;
  multiline?: boolean;
}

export function TextField({ label, multiline = false, ...inputProps }: TextFieldProps) {
  const { colors, typography, spacing } = useTheme();

  return (
    <FieldCard>
      <Text style={[typography.caption, { color: colors.textSecondary, marginBottom: spacing[4] }]}>
        {label}
      </Text>
      <TextInput
        style={[
          typography.subtitle,
          {
            color: colors.textPrimary,
            padding: 0,
            textAlignVertical: multiline ? "top" : "center",
            minHeight: multiline ? 72 : undefined,
          },
        ]}
        placeholderTextColor={colors.textDisabled}
        multiline={multiline}
        {...inputProps}
      />
    </FieldCard>
  );
}
