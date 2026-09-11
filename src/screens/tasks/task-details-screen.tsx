import { ScreenHeader } from "@/src/components/screen-header/screen-header";
import { DangerButton } from "@/src/components/tasks/danger-button";
import { PrimaryButton } from "@/src/components/tasks/primary-button";
import { formatDate } from "@/src/helpers/format-date";
import type { Priority, Task } from "@/src/models/task";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/src/rtk/tasks-api-slice";
import { useTheme } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./task-details-styles";

export interface TaskDetailsScreenProps {
  task: Task;
}

function getPriorityStyle(
  colors: ReturnType<typeof useTheme>["colors"],
  priority: Priority,
) {
  switch (priority.toUpperCase()) {
    case "High".toUpperCase():
      return {
        backgroundColor: colors.accentOrangeLight,
        color: colors.accentOrange,
      };
    case "Medium".toUpperCase():
      return {
        backgroundColor: colors.accentBlueLight,
        color: colors.accentBlue,
      };
    case "Low".toUpperCase():
      return { backgroundColor: colors.success, color: colors.onSuccess };
  }
}

export function TaskDetailsScreen({ task }: TaskDetailsScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [updateTask, { isLoading: isToggling }] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const priorityStyle = getPriorityStyle(theme.colors, task.priority);

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

  const handleEditPress = () => {
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

  const handleDeletePress = () => {
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
              .then(() => router.back())
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
    <View style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <ScreenHeader title="Task Details" />

      <ScrollView
        contentContainerStyle={{
          padding: theme.spacing[16],
          paddingTop: insets.top + theme.spacing[12],
          paddingBottom: theme.spacing[24],
        }}
      >
        {/* Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radii.card,
              padding: theme.spacing[16],
              ...theme.elevation.level1,
            },
          ]}
        >
          <View style={styles.topRow}>
            <View
              style={[
                styles.categoryPill,
                {
                  backgroundColor: theme.colors.primarySurface,
                  borderRadius: theme.radii.full,
                  paddingHorizontal: theme.spacing[16],
                  paddingVertical: theme.spacing[8],
                },
              ]}
            >
              <Text
                style={[
                  theme.typography.bodyBold,
                  { color: theme.colors.primary },
                ]}
              >
                {task.category_name}
              </Text>
            </View>

            <View style={styles.completedRow}>
              <Text
                style={[
                  theme.typography.body,
                  {
                    color: theme.colors.textSecondary,
                    marginRight: theme.spacing[8],
                  },
                ]}
              >
                Completed
              </Text>
              <Pressable
                onPress={handleToggleComplete}
                disabled={isToggling}
                hitSlop={8}
                style={[
                  styles.checkbox,
                  {
                    borderRadius: theme.radii.sm,
                    backgroundColor: task.completed
                      ? theme.colors.primary
                      : "transparent",
                    borderWidth: task.completed ? 0 : 2,
                    borderColor: theme.colors.border,
                    opacity: isToggling ? 0.6 : 1,
                  },
                ]}
              >
                {task.completed && (
                  <MaterialIcons
                    name="check"
                    size={18}
                    color={theme.colors.onPrimary}
                  />
                )}
              </Pressable>
            </View>
          </View>

          <View style={{ marginTop: theme.spacing[20] }}>
            <Text
              style={[
                theme.typography.body,
                { color: theme.colors.textSecondary },
              ]}
            >
              Task Title
            </Text>
            <Text
              style={[
                theme.typography.heading1,
                {
                  color: theme.colors.textPrimary,
                  marginTop: theme.spacing[4],
                },
              ]}
            >
              {task.title}
            </Text>
          </View>

          <View
            style={[
              styles.divider,
              {
                backgroundColor: theme.colors.border,
                marginVertical: theme.spacing[16],
              },
            ]}
          />

          <View>
            <Text
              style={[
                theme.typography.body,
                { color: theme.colors.textSecondary },
              ]}
            >
              Description
            </Text>
            <Text
              style={[
                theme.typography.body,
                {
                  color: theme.colors.textPrimary,
                  marginTop: theme.spacing[8],
                },
              ]}
            >
              {task.description}
            </Text>
          </View>

          <View
            style={[
              styles.divider,
              {
                backgroundColor: theme.colors.border,
                marginVertical: theme.spacing[16],
              },
            ]}
          />

          <View style={styles.metaRow}>
            <View style={styles.metaColumn}>
              <Text
                style={[
                  theme.typography.body,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Due Date
              </Text>
              <View
                style={[styles.dueDateRow, { marginTop: theme.spacing[8] }]}
              >
                <MaterialIcons
                  name="event"
                  size={18}
                  color={theme.colors.primary}
                  style={{ marginRight: theme.spacing[8] }}
                />
                <Text
                  style={[
                    theme.typography.bodyBold,
                    { color: theme.colors.textPrimary },
                  ]}
                >
                  {formatDate(new Date(task.due_date))}
                </Text>
              </View>
            </View>

            <View style={styles.metaColumn}>
              <Text
                style={[
                  theme.typography.body,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Priority
              </Text>
              <View
                style={[
                  styles.priorityPill,
                  {
                    backgroundColor: priorityStyle.backgroundColor,
                    borderRadius: theme.radii.full,
                    paddingHorizontal: theme.spacing[16],
                    paddingVertical: theme.spacing[8],
                    marginTop: theme.spacing[8],
                  },
                ]}
              >
                <Text
                  style={[
                    theme.typography.bodyBold,
                    { color: priorityStyle.color },
                  ]}
                >
                  {task.priority}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.buttonRow,
            { marginTop: theme.spacing[24], gap: theme.spacing[12] },
          ]}
        >
          <View style={styles.buttonSlot}>
            <PrimaryButton label="Edit Task" onPress={handleEditPress} />
          </View>
          <View style={styles.buttonSlot}>
            <DangerButton label="Delete" onPress={handleDeletePress} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
