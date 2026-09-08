import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenHeader } from "@/src/components/screen-header/screen-header";
import {
  TaskCard,
  TaskCardData,
  TaskCardStatus,
} from "@/src/components/tasks/task-card";
import { useAddButtonHandler } from "@/src/navigation/add-button-context";
import { useTheme } from "@/src/theme";

type FilterValue = "All" | TaskCardStatus;

const FILTER_TABS: { label: string; value: FilterValue }[] = [
  { label: "All", value: "All" },
  { label: "To do", value: "To-do" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Done" },
];

interface CategoryTasksScreenProps {
  categoryId: string;
  name: string;
}

export function CategoryTasksScreen({
  categoryId,
  name,
}: CategoryTasksScreenProps) {
  const { colors, typography, spacing, radii } = useTheme();
  const router = useRouter();
  const [filter, setFilter] = useState<FilterValue>("All");

  // TODO: replace with the real tasks-api-slice hook once confirmed —
  const tasks: TaskCardData[] = [];

  const filteredTasks = useMemo(
    () =>
      filter === "All" ? tasks : tasks.filter((task) => task.status === filter),
    [tasks, filter],
  );

  useAddButtonHandler(() => {
    router.push({
      pathname: "/add-task",
      params: { categoryId },
    });
  });

  const handleEditTask = (taskId: TaskCardData["id"]) => {
    // TODO: fill in the rest of EditTaskParams from the real task
    // object once TaskCardData's shape is confirmed.
    router.push({
      pathname: "/edit-task/[id]",
      params: { id: String(taskId), categoryId },
    });
  };

  const handleDeleteTask = (taskId: TaskCardData["id"]) => {
    // TODO: call the real delete mutation (e.g. useDeleteTaskMutation)
    // once tasks-api-slice.ts is confirmed.
    console.log("delete task", taskId);
  };

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
              onEdit={() => handleEditTask(task.id)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          </View>
        ))}
      </ScrollView>
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
});
