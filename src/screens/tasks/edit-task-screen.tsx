import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { ScreenHeader } from "@/src/components/screen-header/screen-header";
import { DangerButton } from "@/src/components/tasks/danger-button";
import { DateField } from "@/src/components/tasks/date-field";
import {
  DropdownField,
  DropdownFieldOption,
} from "@/src/components/tasks/dropdown-field";
import { PrimaryButton } from "@/src/components/tasks/primary-button";
import { TextField } from "@/src/components/tasks/text-field";
import type { Category } from "@/src/models/category";
import {
  EditTaskFormValues,
  PRIORITIES,
  Priority,
  TASK_STATUSES,
  TaskStatus,
} from "@/src/models/task";
import { useGetCategoriesQuery } from "@/src/rtk/categories-api-slice";
import { useTheme } from "@/src/theme";
import styles from "./edit-task-styles";

const PRIORITY_OPTIONS: DropdownFieldOption<Priority>[] = PRIORITIES.map(
  (priority) => ({
    label: priority,
    value: priority,
  }),
);

const STATUS_OPTIONS: DropdownFieldOption<TaskStatus>[] = TASK_STATUSES.map(
  (status) => ({
    label: status,
    value: status,
  }),
);

interface EditTaskScreenProps {
  /** The task being edited — pre-fills every field below. */
  initialValues: EditTaskFormValues;
  onSubmit: (values: EditTaskFormValues) => void;
  onCancel: () => void;
  submitting?: boolean;
}

export function EditTaskScreen({
  initialValues,
  onSubmit,
  onCancel,
  submitting = false,
}: EditTaskScreenProps) {
  const { colors, spacing } = useTheme();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const [categoryId, setCategoryId] = useState<Category["id"] | null>(
    initialValues.categoryId,
  );
  const [categoryName, setCategoryName] = useState<string | null>(
    initialValues.categoryName,
  );
  const [projectName, setProjectName] = useState(initialValues.projectName);
  const [description, setDescription] = useState(initialValues.description);
  const [dueDate, setDueDate] = useState<Date | null>(initialValues.dueDate);
  const [priority, setPriority] = useState<Priority | null>(
    initialValues.priority,
  );
  const [status, setStatus] = useState<TaskStatus | null>(initialValues.status);

  const categoryOptions = useMemo<DropdownFieldOption<Category["id"]>[]>(
    () =>
      (categories ?? []).map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categories],
  );

  const canSubmit =
    categoryId !== null &&
    !!categoryName &&
    projectName.trim().length > 0 &&
    !!dueDate &&
    !!priority &&
    !!status;

  const handleSubmit = () => {
    if (
      !canSubmit ||
      categoryId === null ||
      !categoryName ||
      !dueDate ||
      !priority ||
      !status
    )
      return;

    onSubmit({
      taskId: initialValues.taskId,
      categoryId,
      categoryName,
      projectName: projectName.trim(),
      description: description.trim(),
      dueDate,
      priority,
      status,
    });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScreenHeader title="Edit Project" />
      <ScrollView
        contentContainerStyle={{ padding: spacing[16] }}
        keyboardShouldPersistTaps="handled"
      >
        <DropdownField
          label="Task Group"
          placeholder="Select a group"
          data={categoryOptions}
          value={categoryId}
          loading={categoriesLoading}
          icon={
            <Ionicons name="pricetag" size={18} color={colors.accentPink} />
          }
          iconBackgroundColor={colors.accentPinkLight}
          onChange={(option) => {
            setCategoryId(option.value);
            setCategoryName(option.label);
          }}
        />
        <View style={{ height: spacing[16] }} />

        <TextField
          label="Project Name"
          placeholder="e.g. Grocery Shopping App"
          value={projectName}
          onChangeText={setProjectName}
        />
        <View style={{ height: spacing[16] }} />

        <TextField
          label="Description"
          placeholder="What is this project about?"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <View style={{ height: spacing[16] }} />

        <DateField label="Due Date" value={dueDate} onChange={setDueDate} />
        <View style={{ height: spacing[16] }} />

        <DropdownField
          label="Priority"
          placeholder="Select priority"
          variant="tinted"
          data={PRIORITY_OPTIONS}
          value={priority}
          icon={<Ionicons name="flag" size={18} color={colors.primary} />}
          iconBackgroundColor={colors.primaryLight}
          onChange={(option) => setPriority(option.value)}
        />
        <View style={{ height: spacing[16] }} />

        <DropdownField
          label="Status"
          placeholder="Select status"
          variant="tinted"
          data={STATUS_OPTIONS}
          value={status}
          icon={
            <Ionicons
              name="checkmark-circle-outline"
              size={18}
              color={colors.primary}
            />
          }
          iconBackgroundColor={colors.primaryLight}
          onChange={(option) => setStatus(option.value)}
        />
        <View style={{ height: spacing[24] }} />

        <View style={styles.buttonRow}>
          <View style={[styles.buttonSlot, { marginRight: spacing[8] }]}>
            <PrimaryButton
              label="Edit"
              onPress={handleSubmit}
              loading={submitting}
              disabled={!canSubmit}
            />
          </View>
          <View style={[styles.buttonSlot, { marginLeft: spacing[8] }]}>
            <DangerButton
              label="Cancel"
              onPress={onCancel}
              disabled={submitting}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
