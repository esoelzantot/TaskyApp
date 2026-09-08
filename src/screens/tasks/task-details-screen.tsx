import { ScreenHeader } from "@/src/components/screen-header/screen-header";
import { DangerButton } from "@/src/components/tasks/danger-button";
import { PrimaryButton } from "@/src/components/tasks/primary-button";
import type {
  EditTaskFormValues,
  Priority,
  TaskStatus,
} from "@/src/models/task";
import { useTheme, useThemeMode } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./task-details-styles";

export interface TaskDetailsScreenProps {
  task: EditTaskFormValues;
  /** Remote profile picture URL — falls back to an initial-letter avatar when omitted. */
  userAvatarUri?: string;
  onToggleComplete: () => void;
  onEditPress: () => void;
  onDeletePress: () => void;
}

/**
 * Not a distinct swatch in the Figma Design System — only "High"
 * (Accent Orange) is shown in the reference. Medium/Low reuse the
 * other existing semantic tokens (info blue / success green) rather
 * than inventing new colors.
 */
function getPriorityStyle(
  colors: ReturnType<typeof useTheme>["colors"],
  priority: Priority,
) {
  switch (priority) {
    case "High":
      return {
        backgroundColor: colors.accentOrangeLight,
        color: colors.accentOrange,
      };
    case "Medium":
      return {
        backgroundColor: colors.accentBlueLight,
        color: colors.accentBlue,
      };
    case "Low":
      return { backgroundColor: colors.success, color: colors.onSuccess };
  }
}

export function TaskDetailsScreen({
  task,
  userAvatarUri,
  onToggleComplete,
  onEditPress,
  onDeletePress,
}: TaskDetailsScreenProps) {
  const theme = useTheme();
  const { mode } = useThemeMode();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const isCompleted: boolean =
    task.status === ("Completed" satisfies TaskStatus);
  const priorityStyle = getPriorityStyle(theme.colors, task.priority);

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
                {task.categoryName}
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
                onPress={onToggleComplete}
                hitSlop={8}
                style={[
                  styles.checkbox,
                  {
                    borderRadius: theme.radii.sm,
                    backgroundColor: isCompleted
                      ? theme.colors.primary
                      : "transparent",
                    borderWidth: isCompleted ? 0 : 2,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                {isCompleted && (
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
              {task.projectName}
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
                  {String(task.dueDate)}
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
            <PrimaryButton label="Edit Task" onPress={onEditPress} />
          </View>
          <View style={styles.buttonSlot}>
            <DangerButton label="Delete" onPress={onDeletePress} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
