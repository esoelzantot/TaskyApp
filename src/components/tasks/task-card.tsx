import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { FieldCard } from "@/src/components/tasks/field-card";
import { formatDate } from "@/src/helpers/format-date";
import type { Task } from "@/src/models/task";
import { useUpdateTaskMutation } from "@/src/rtk/tasks-api-slice";
import { useTheme } from "@/src/theme";

export type TaskCardStatus = "To-do" | "Done";

export type TaskCardData = Task;

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { colors, typography, spacing, radii } = useTheme();
  const [updateTask, { isLoading: isToggling }] = useUpdateTaskMutation();

  const status: TaskCardStatus = task.completed ? "Done" : "To-do";
  const statusColors: Record<TaskCardStatus, { bg: string; text: string }> = {
    Done: { bg: colors.success, text: colors.onSuccess },
    "To-do": { bg: colors.infoSurface, text: colors.info },
  };
  const statusStyle = statusColors[status];

  const handlePress = () => {
    router.push({
      pathname: "/task/[id]",
      params: { id: String(task.id) },
    });
  };

  const handleToggleComplete = () => {
    updateTask({
      id: task.id,
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      priority: task.priority,
      category_id: task.category_id,
      completed: !task.completed,
    })
      .unwrap()
      .catch(() => {
        Alert.alert(
          "Something went wrong",
          "Couldn't update this task. Please try again.",
        );
      });
  };

  return (
    <Pressable onPress={handlePress}>
      <FieldCard>
        <View style={styles.row}>
          <Pressable
            onPress={handleToggleComplete}
            disabled={isToggling}
            hitSlop={8}
            style={[
              styles.checkbox,
              {
                borderRadius: radii.full,
                borderWidth: task.completed ? 0 : 2,
                borderColor: colors.primary,
                backgroundColor: task.completed
                  ? colors.primary
                  : "transparent",
                opacity: isToggling ? 0.6 : 1,
              },
            ]}
          >
            {task.completed && (
              <Ionicons name="checkmark" size={16} color={colors.onPrimary} />
            )}
          </Pressable>

          <View style={[styles.content, { marginLeft: spacing[12] }]}>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              {task.category_name}
            </Text>
            <Text
              style={[
                typography.heading2,
                {
                  color: task.completed
                    ? colors.textSecondary
                    : colors.textPrimary,
                  marginTop: spacing[2],
                  textDecorationLine: task.completed ? "line-through" : "none",
                },
              ]}
            >
              {task.title}
            </Text>

            {/* NOTE: the reference design shows a time ("04:00 PM") alongside
                the date, but the API's `due_date` is a date-only string with
                no time component — showing the date only until/unless a time
                field exists. */}
            <View style={[styles.timeRow, { marginTop: spacing[6] }]}>
              <Ionicons name="time-outline" size={14} color={colors.primary} />
              <Text
                style={[
                  typography.body,
                  { color: colors.primary, marginLeft: spacing[4] },
                ]}
              >
                {formatDate(new Date(task.due_date))}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.statusPill,
              {
                backgroundColor: statusStyle.bg,
                borderRadius: radii.full,
                paddingHorizontal: spacing[12],
                paddingVertical: spacing[4],
              },
            ]}
          >
            <Text style={[typography.bodyBold, { color: statusStyle.text }]}>
              {status === "To-do" ? "To Do" : status}
            </Text>
          </View>
        </View>
      </FieldCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkbox: {
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusPill: {
    alignSelf: "flex-start",
  },
});
