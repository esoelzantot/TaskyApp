import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { useTheme } from "@/src/theme";

import { FieldCard } from "./field-card";
import { IconBubble } from "./icon-bubble";

export interface DropdownFieldOption<T extends string | number> {
  label: string;
  value: T;
}

interface DropdownFieldProps<T extends string | number> {
  label: string;
  placeholder?: string;
  data: DropdownFieldOption<T>[];
  /** The selected option's `value` (e.g. a category id), or null when nothing is chosen yet. */
  value: T | null;
  onChange: (option: DropdownFieldOption<T>) => void;
  icon: React.ReactNode;
  iconBackgroundColor: string;
  /** "surface" = white card (Task Group). "tinted" = light-purple card (Priority). */
  variant?: "surface" | "tinted";
  loading?: boolean;
  disabled?: boolean;
  testID?: string;
}

export function DropdownField<T extends string | number>({
  label,
  placeholder = "Select",
  data,
  value,
  onChange,
  icon,
  iconBackgroundColor,
  variant = "surface",
  loading = false,
  disabled = false,
  testID,
}: DropdownFieldProps<T>) {
  const { colors, typography, spacing, radii } = useTheme();

  return (
    <FieldCard variant={variant} testID={testID}>
      <View style={styles.row}>
        <IconBubble backgroundColor={iconBackgroundColor}>{icon}</IconBubble>
        <View style={[styles.content, { marginLeft: spacing[12] }]}>
          <Text style={[typography.caption, { color: colors.textSecondary, marginBottom: spacing[2] }]}>
            {label}
          </Text>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Dropdown<any>
            data={data}
            labelField="label"
            valueField="value"
            value={value}
            placeholder={loading ? "Loading..." : placeholder}
            disable={disabled || loading}
            onChange={(item) => onChange(item as DropdownFieldOption<T>)}
            style={styles.dropdown}
            containerStyle={[
              styles.dropdownContainer,
              { backgroundColor: colors.surface, borderRadius: radii.md },
            ]}
            itemContainerStyle={{ borderRadius: radii.sm }}
            activeColor={colors.primarySurface}
            selectedTextStyle={[typography.subtitle, { color: colors.textPrimary }]}
            placeholderStyle={[typography.subtitle, { color: colors.textDisabled }]}
            itemTextStyle={[typography.body, { color: colors.textPrimary }]}
            renderRightIcon={() => (
              <Ionicons name="chevron-down" size={16} color={colors.textPrimary} />
            )}
          />
        </View>
      </View>
    </FieldCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  dropdown: {
    height: 24,
    paddingHorizontal: 0,
  },
  dropdownContainer: {
    borderWidth: 0,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});
