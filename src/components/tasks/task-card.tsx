import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { FieldCard } from "@/src/components/tasks/field-card";
import { formatDate } from "@/src/helpers/format-date";
import type { Priority, Task } from "@/src/models/task";
import { useUpdateTaskMutation } from "@/src/rtk/tasks-api-slice";
import type { ThemeColors } from "@/src/theme";
import { useTheme } from "@/src/theme";
import { withAlpha } from "@/src/utils/shimmer-bar";

export type TaskCardData = Task;

interface TaskCardProps {
  task: Task;
}

function normalizePriority(priority: string): Priority {
  const value = priority?.trim().toLowerCase();
  if (value === "high") return "High";
  if (value === "medium") return "Medium";
  return "Low";
}

function getPriorityStyle(colors: ThemeColors, priority: Priority) {
  switch (priority) {
    case "High":
      return { bg: withAlpha(colors.error, 0.15), text: colors.error };
    case "Medium":
      return { bg: colors.accentOrangeLight, text: colors.accentOrange };
    case "Low":
      return { bg: colors.success, text: colors.onSuccess };
    default:
      return { bg: colors.accentBlueLight, text: colors.accentBlue };
  }
}

export function TaskCard({ task }: TaskCardProps) {
  const { colors, typography, spacing, radii } = useTheme();
  const [updateTask, { isLoading: isToggling }] = useUpdateTaskMutation();

  const priority = normalizePriority(task.priority);
  const priorityStyle = getPriorityStyle(colors, priority);

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
      priority,
      category_id: Number(task.category_id),
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
              styles.priorityPill,
              {
                backgroundColor: priorityStyle.bg,
                borderRadius: radii.sm,
                paddingHorizontal: spacing[12],
                paddingVertical: spacing[6],
              },
            ]}
          >
            <Text style={[typography.body, { color: priorityStyle.text }]}>
              {priority}
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
  priorityPill: {
    alignSelf: "flex-start",
  },
});
