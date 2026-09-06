import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/src/theme";

import { FieldCard } from "./field-card";
import { IconBubble } from "./icon-bubble";

interface DateFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  minimumDate?: Date;
  placeholder?: string;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function DateField({ label, value, onChange, minimumDate, placeholder = "Select date" }: DateFieldProps) {
  const { colors, typography, spacing } = useTheme();
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === "android") {
      setPickerOpen(false);
    }
    if (event.type === "dismissed" || !selected) return;
    onChange(selected);
    if (Platform.OS === "ios") {
      setPickerOpen(false);
    }
  };

  return (
    <FieldCard>
      <Pressable
        style={styles.row}
        onPress={() => setPickerOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <IconBubble backgroundColor={colors.primarySurface}>
          <Ionicons name="calendar-outline" size={18} color={colors.primary} />
        </IconBubble>
        <View style={[styles.content, { marginLeft: spacing[12] }]}>
          <Text style={[typography.caption, { color: colors.textSecondary, marginBottom: spacing[2] }]}>
            {label}
          </Text>
          <Text
            style={[typography.subtitle, { color: value ? colors.textPrimary : colors.textDisabled }]}
          >
            {value ? formatDate(value) : placeholder}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={16} color={colors.textPrimary} />
      </Pressable>

      {pickerOpen && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          minimumDate={minimumDate}
          onChange={handleChange}
        />
      )}
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
});
