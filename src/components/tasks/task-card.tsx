import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { DangerButton } from "@/src/components/tasks/danger-button";
import { FieldCard } from "@/src/components/tasks/field-card";
import { IconBubble } from "@/src/components/tasks/icon-bubble";
import { PrimaryButton } from "@/src/components/tasks/primary-button";
import { useTheme } from "@/src/theme";

/** The three states a task can be in on the tasks list/board. */
export type TaskCardStatus = "To-do" | "In Progress" | "Done";

export interface TaskCardData {
  id: string | number;
  eyebrow: string;
  title: string;
  time: string;
  status: TaskCardStatus;
  icon: React.ReactNode;
  iconBackgroundColor: string;
}

interface TaskCardProps extends TaskCardData {
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({
  eyebrow,
  title,
  time,
  status,
  icon,
  iconBackgroundColor,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const { colors, typography, spacing, radii } = useTheme();

  const statusColors: Record<TaskCardStatus, { bg: string; text: string }> = {
    Done: { bg: colors.success, text: colors.onSuccess },
    "In Progress": { bg: colors.accentOrangeLight, text: colors.accentOrange },
    "To-do": { bg: colors.infoSurface, text: colors.info },
  };
  const statusStyle = statusColors[status];

  return (
    <FieldCard>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            {eyebrow}
          </Text>
          <Text
            style={[
              typography.heading2,
              { color: colors.textPrimary, marginTop: spacing[2] },
            ]}
          >
            {title}
          </Text>
        </View>
        <IconBubble backgroundColor={iconBackgroundColor} size={44}>
          {icon}
        </IconBubble>
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
            {time}
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
          <PrimaryButton label="Edit" onPress={onEdit} />
        </View>
        <View style={[styles.buttonSlot, { marginLeft: spacing[8] }]}>
          <DangerButton label="Delete" onPress={onDelete} />
        </View>
      </View>
    </FieldCard>
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
