import { useEffect, useRef } from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";

import { useTheme } from "@/src/theme";
import { isSameDay } from "@/src/utils/date";

const CARD_WIDTH = 68;
const CARD_GAP = 12;

export interface DaySelectorProps {
  /** Every day of the currently selected month, in order. */
  days: Date[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const MONTH_ABBREVIATIONS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const WEEKDAY_ABBREVIATIONS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function DaySelector({
  days,
  selectedDate,
  onSelectDate,
}: DaySelectorProps) {
  const theme = useTheme();
  const listRef = useRef<FlatList<Date>>(null);

  const selectedIndex = days.findIndex((day) => isSameDay(day, selectedDate));

  // Keeps the selected day in view whenever the month (and therefore
  // the whole `days` list) changes, without relying on scrollToIndex's
  // usual "item not measured yet" failure mode — getItemLayout below
  // gives FlatList exact positions up front, so this is safe.
  useEffect(() => {
    if (selectedIndex < 0) return;
    listRef.current?.scrollToIndex({
      index: selectedIndex,
      animated: true,
      viewPosition: 0.5,
    });
  }, [selectedIndex]);

  return (
    <FlatList
      ref={listRef}
      data={days}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(day) => day.toISOString()}
      contentContainerStyle={{
        paddingHorizontal: theme.spacing[24],
        gap: CARD_GAP,
      }}
      getItemLayout={(_, index) => ({
        length: CARD_WIDTH,
        offset: (CARD_WIDTH + CARD_GAP) * index,
        index,
      })}
      onScrollToIndexFailed={() => {
        /* getItemLayout makes this a no-op in practice; kept as a safe fallback. */
      }}
      renderItem={({ item: day }) => {
        const isSelected = isSameDay(day, selectedDate);

        return (
          <Pressable
            onPress={() => onSelectDate(day)}
            style={[
              styles.card,
              {
                width: CARD_WIDTH,
                borderRadius: theme.radii.banner,
                paddingVertical: theme.spacing[16],
                backgroundColor: isSelected
                  ? theme.colors.primary
                  : theme.colors.surface,
                ...(isSelected
                  ? theme.elevation.level2
                  : theme.elevation.level1),
              },
            ]}
          >
            <Text
              style={[
                theme.typography.caption,
                {
                  color: isSelected
                    ? theme.colors.onPrimary
                    : theme.colors.textSecondary,
                },
              ]}
            >
              {MONTH_ABBREVIATIONS[day.getMonth()]}
            </Text>
            <Text
              style={[
                theme.typography.heading1,
                {
                  color: isSelected
                    ? theme.colors.onPrimary
                    : theme.colors.textPrimary,
                  marginTop: theme.spacing[4],
                },
              ]}
            >
              {day.getDate()}
            </Text>
            <Text
              style={[
                theme.typography.body,
                {
                  color: isSelected
                    ? theme.colors.onPrimary
                    : theme.colors.textSecondary,
                  marginTop: theme.spacing[4],
                },
              ]}
            >
              {WEEKDAY_ABBREVIATIONS[day.getDay()]}
            </Text>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
  },
});
