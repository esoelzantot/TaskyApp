import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenHeader } from "@/src/components/screen-header/screen-header";
import {
  TaskCard,
  TaskCardData,
  TaskCardStatus,
} from "@/src/components/tasks/task-card";
import { useTheme } from "@/src/theme";

type FilterValue = "All" | TaskCardStatus;

const FILTER_TABS: { label: string; value: FilterValue }[] = [
  { label: "All", value: "All" },
  { label: "To do", value: "To-do" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Done" },
];

interface CategoryTasksScreenProps {
  name: string;
  tasks: TaskCardData[];
  onEditTask: (taskId: TaskCardData["id"]) => void;
  onDeleteTask: (taskId: TaskCardData["id"]) => void;
  onAddTask: () => void;
}

export function CategoryTasksScreen({
  name,
  tasks,
  onEditTask,
  onDeleteTask,
  onAddTask,
}: CategoryTasksScreenProps) {
  const { colors, typography, spacing, radii, elevation } = useTheme();
  const [filter, setFilter] = useState<FilterValue>("All");

  const filteredTasks = useMemo(
    () =>
      filter === "All" ? tasks : tasks.filter((task) => task.status === filter),
    [tasks, filter],
  );

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenHeader title={name} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScroll}
        contentContainerStyle={[
          styles.tabsRow,
          { paddingHorizontal: spacing[16], paddingVertical: spacing[12] },
        ]}
      >
        {FILTER_TABS.map((tab) => {
          const isActive = tab.value === filter;
          return (
            <Pressable
              key={tab.value}
              onPress={() => setFilter(tab.value)}
              style={[
                styles.tab,
                {
                  backgroundColor: isActive
                    ? colors.primary
                    : colors.primarySurface,
                  borderRadius: radii.full,
                  paddingHorizontal: spacing[16],
                  paddingVertical: spacing[10],
                  marginRight: spacing[8],
                },
              ]}
            >
              <Text
                style={[
                  typography.bodyBold,
                  { color: isActive ? colors.onPrimary : colors.primary },
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView
        style={styles.listScroll}
        contentContainerStyle={{
          padding: spacing[16],
          paddingBottom: spacing[24] * 3,
        }}
        showsVerticalScrollIndicator={false}
      >
        {filteredTasks.map((task, index) => (
          <View
            key={task.id}
            style={index > 0 ? { marginTop: spacing[16] } : undefined}
          >
            <TaskCard
              {...task}
              onEdit={() => onEditTask(task.id)}
              onDelete={() => onDeleteTask(task.id)}
            />
          </View>
        ))}
      </ScrollView>

      <Pressable
        onPress={onAddTask}
        style={[
          styles.fab,
          {
            backgroundColor: colors.primary,
            borderRadius: radii.full,
            bottom: spacing[24],
          },
          elevation.level2,
        ]}
      >
        <Ionicons name="add" size={28} color={colors.onPrimary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  tabsScroll: {
    flexGrow: 0,
    flexShrink: 0,
  },
  listScroll: {
    flex: 1,
  },
  tabsRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    alignSelf: "center",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
});
