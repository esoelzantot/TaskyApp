import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { useTheme } from "@/src/theme";
import { MONTH_NAMES } from "@/src/utils/date";

interface MonthOption {
  label: string;
  value: number;
}

const MONTH_OPTIONS: MonthOption[] = MONTH_NAMES.map((name, index) => ({
  label: name,
  value: index,
}));

interface MonthDropdownProps {
  /** 0-indexed, matching `Date`'s own convention. */
  value: number;
  onChange: (month: number) => void;
}

/** Same visual pattern as CategoryFilterDropdown (pill, react-native-element-dropdown) — deliberately not a new dropdown style. */
export function MonthDropdown({ value, onChange }: MonthDropdownProps) {
  const { colors, typography, spacing, radii } = useTheme();

  return (
    <Dropdown
      data={MONTH_OPTIONS}
      labelField="label"
      valueField="value"
      value={value}
      onChange={(item) => onChange(item.value)}
      style={[
        styles.dropdown,
        {
          backgroundColor: colors.primarySurface,
          borderRadius: radii.full,
          paddingHorizontal: spacing[16],
        },
      ]}
      containerStyle={[
        styles.dropdownContainer,
        { backgroundColor: colors.surface, borderRadius: radii.md },
      ]}
      itemContainerStyle={{ borderRadius: radii.sm }}
      activeColor={colors.primarySurface}
      selectedTextStyle={[typography.bodyBold, { color: colors.primary }]}
      itemTextStyle={[typography.body, { color: colors.textPrimary }]}
      renderRightIcon={() => (
        <Ionicons name="chevron-down" size={16} color={colors.primary} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 44,
    width: "100%",
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
