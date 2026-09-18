import { useGetDailyTasksQuery } from "@/src/apis/planner-api-slice";
import { DaySelector } from "@/src/components/planner/day-selector";
import { MonthDropdown } from "@/src/components/planner/month-dropdown";
import { TaskCard } from "@/src/components/tasks/task-card";
import { IconSymbol } from "@/src/components/ui/icon-symbol";
import { useTheme } from "@/src/theme";
import {
  clampDateToMonth,
  formatApiDate,
  getDatesInMonth,
} from "@/src/utils/date";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ScreenHeader } from "@/src/components/screen-header/screen-header";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./planner-styles";

function ErrorState({
  error,
  onRetry,
}: {
  error: unknown;
  onRetry: () => void;
}) {
  const theme = useTheme();
  let message = "An unexpected error occurred.";
  if (error && typeof error === "object") {
    if ("message" in error) message = String(error.message);
    if (
      "data" in error &&
      error.data &&
      typeof error.data === "object" &&
      "detail" in error.data
    ) {
      message = String((error.data as any).detail);
    }
  }

  return (
    <View style={styles.centerContainer}>
      <Text
        style={[
          theme.typography.body,
          { color: theme.colors.error, textAlign: "center" },
        ]}
      >
        {message}
      </Text>
      <TouchableOpacity
        style={[
          styles.retryButton,
          {
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radii.button,
          },
        ]}
        onPress={onRetry}
      >
        <Text
          style={[theme.typography.subtitle, { color: theme.colors.onPrimary }]}
        >
          Retry
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function EmptyState({ message }: { message: string }) {
  const theme = useTheme();
  return (
    <View style={styles.centerContainer}>
      <IconSymbol name="calendar" size={48} color={theme.colors.border} />
      <Text
        style={[
          theme.typography.body,
          { color: theme.colors.textSecondary, marginTop: 16 },
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

function DailyView({ date }: { date: Date }) {
  const {
    data: tasks,
    isLoading,
    error,
    refetch,
  } = useGetDailyTasksQuery(formatApiDate(date));
  const theme = useTheme();

  if (isLoading)
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  if (!tasks || tasks.length === 0) {
    return (
      <EmptyState message="No tasks for this day. Enjoy your free time!" />
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TaskCard task={item} />}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default function PlannerScreen() {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();

  const daysInSelectedMonth = useMemo(
    () => getDatesInMonth(selectedYear, selectedMonth),
    [selectedYear, selectedMonth],
  );

  const handleSelectMonth = (month: number) => {
    setSelectedDate((prev) => clampDateToMonth(prev, selectedYear, month));
  };

  return (
    <>
      <ScreenHeader title="Planner" />
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.header}>
          <MonthDropdown value={selectedMonth} onChange={handleSelectMonth} />
        </View>

        <View style={styles.daySelectorContainer}>
          <DaySelector
            days={daysInSelectedMonth}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </View>

        <View style={styles.content}>
          <DailyView date={selectedDate} />
        </View>
      </SafeAreaView>
    </>
  );
}
