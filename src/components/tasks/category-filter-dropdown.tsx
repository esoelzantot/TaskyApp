import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { useGetCategoriesQuery } from "@/src/rtk/categories-api-slice";
import { useTheme } from "@/src/theme";
import { useMemo } from "react";

export type CategoryFilterValue = number | "all";

interface CategoryFilterOption {
  label: string;
  value: CategoryFilterValue;
}

interface CategoryFilterDropdownProps {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}

/** A pill-shaped dropdown for filtering a task list by category — "All Categories" plus every real category. */
export function CategoryFilterDropdown({
  value,
  onChange,
}: CategoryFilterDropdownProps) {
  const { colors, typography, spacing, radii } = useTheme();
  const { data: categories, isLoading } = useGetCategoriesQuery();

  const options = useMemo<CategoryFilterOption[]>(
    () => [
      { label: "All Categories", value: "all" },
      ...(categories ?? []).map((category) => ({
        label: category.name,
        value: Number(category.id),
      })),
    ],
    [categories],
  );

  return (
    <Dropdown
      data={options}
      labelField="label"
      valueField="value"
      value={value}
      placeholder={isLoading ? "Loading..." : "All Categories"}
      disable={isLoading}
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
      placeholderStyle={[typography.bodyBold, { color: colors.primary }]}
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
    alignSelf: "flex-start",
    minWidth: 170,
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
