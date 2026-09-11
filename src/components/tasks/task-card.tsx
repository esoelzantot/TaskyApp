import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { DangerButton } from "@/src/components/tasks/danger-button";
import { FieldCard } from "@/src/components/tasks/field-card";
import { IconBubble } from "@/src/components/tasks/icon-bubble";
import { PrimaryButton } from "@/src/components/tasks/primary-button";
import { formatDate } from "@/src/helpers/format-date";
import type { Task } from "@/src/models/task";
import { useDeleteTaskMutation } from "@/src/rtk/tasks-api-slice";
import { useTheme } from "@/src/theme";

export type TaskCardStatus = "To-do" | "Done";

export type TaskCardData = Task;

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { colors, typography, spacing, radii } = useTheme();
  const [deleteTask] = useDeleteTaskMutation();

  const status: TaskCardStatus = task.completed ? "Done" : "To-do";
  const statusColors: Record<TaskCardStatus, { bg: string; text: string }> = {
    Done: { bg: colors.success, text: colors.onSuccess },
    "To-do": { bg: colors.infoSurface, text: colors.info },
  };
  const statusStyle = statusColors[status];

  const handleEdit = () => {
    router.push({
      pathname: "/edit-task/[id]",
      params: {
        id: String(task.id),
        categoryId: String(task.category_id),
        projectName: task.title,
        description: task.description,
        dueDate: task.due_date,
        priority: task.priority,
        status: task.completed ? "Completed" : "Active",
      },
    });
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Task",
      `Delete "${task.title}"? This can't be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteTask(task.id)
              .unwrap()
              .catch(() => {
                Alert.alert(
                  "Something went wrong",
                  "Couldn't delete this task. Please try again.",
                );
              });
          },
        },
      ],
    );
  };

  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/task/[id]",
          params: { id: String(task.id) },
        });
      }}
    >
      <FieldCard>
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              {task.category_name}
            </Text>
            <Text
              style={[
                typography.heading2,
                { color: colors.textPrimary, marginTop: spacing[2] },
              ]}
            >
              {task.title}
            </Text>
          </View>
        </View>

        <View style={[styles.metaRow, { marginTop: spacing[16] }]}>
          <View style={styles.timeGroup}>
            <IconBubble backgroundColor={colors.primarySurface} size={28}>
              <Ionicons name="time-outline" size={14} color={colors.primary} />
            </IconBubble>
            <Text
              style={[
                typography.bodyBold,
                { color: colors.primary, marginLeft: spacing[8] },
              ]}
            >
              {formatDate(new Date(task.due_date))}
            </Text>
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
              {status}
            </Text>
          </View>
        </View>

        <View style={[styles.buttonRow, { marginTop: spacing[16] }]}>
          <View style={[styles.buttonSlot, { marginRight: spacing[8] }]}>
            <PrimaryButton label="Edit" onPress={handleEdit} />
          </View>
          <View style={[styles.buttonSlot, { marginLeft: spacing[8] }]}>
            <DangerButton label="Delete" onPress={handleDelete} />
          </View>
        </View>
      </FieldCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerText: {
    flex: 1,
    paddingRight: 12,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusPill: {},
  buttonRow: {
    flexDirection: "row",
  },
  buttonSlot: {
    flex: 1,
  },
});
