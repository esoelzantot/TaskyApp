import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import styles from "./edit-task-styles";

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
import { FormSkeleton } from "@/src/utils/form-skeleton";

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

  // ---------------------------------------------------------------------------
  // Form state
  // ---------------------------------------------------------------------------

  const [categoryId, setCategoryId] = useState<Category["id"] | null>(
    initialValues.categoryId ?? null,
  );

  const [projectName, setProjectName] = useState(
    initialValues.projectName ?? "",
  );

  const [description, setDescription] = useState(
    initialValues.description ?? "",
  );

  const [dueDate, setDueDate] = useState<Date | null>(
    initialValues.dueDate ?? null,
  );

  const [priority, setPriority] = useState<Priority | null>(
    initialValues.priority ?? null,
  );

  const [status, setStatus] = useState<TaskStatus | null>(
    initialValues.status ?? null,
  );

  // ---------------------------------------------------------------------------
  // Category options
  // ---------------------------------------------------------------------------

  const categoryOptions = useMemo<DropdownFieldOption<Category["id"]>[]>(() => {
    return (categories ?? []).map((category) => ({
      label: category.name,
      value: category.id,
    }));
  }, [categories]);

  // ---------------------------------------------------------------------------
  // Resolve category name from the currently selected category
  // ---------------------------------------------------------------------------

  const categoryName = useMemo(() => {
    if (categoryId === null) {
      return null;
    }

    const selectedCategory = categoryOptions.find(
      (category) => String(category.value) === String(categoryId),
    );

    return selectedCategory?.label ?? initialValues.categoryName ?? null;
  }, [categoryId, categoryOptions, initialValues.categoryName]);

  // ---------------------------------------------------------------------------
  // Normalize priority
  //
  // Ensures that the value passed to DropdownField exactly matches
  // one of PRIORITY_OPTIONS.
  // ---------------------------------------------------------------------------

  const selectedPriority = useMemo<Priority | null>(() => {
    if (!initialValues.priority && !priority) {
      return null;
    }

    const currentPriority = priority ?? initialValues.priority;

    if (!currentPriority) {
      return null;
    }

    const normalizedPriority = PRIORITIES.find(
      (item) => item.toLowerCase() === String(currentPriority).toLowerCase(),
    );

    return normalizedPriority ?? null;
  }, [priority, initialValues.priority]);

  // ---------------------------------------------------------------------------
  // Normalize status
  // ---------------------------------------------------------------------------

  const selectedStatus = useMemo<TaskStatus | null>(() => {
    if (!status && !initialValues.status) {
      return null;
    }

    const currentStatus = status ?? initialValues.status;

    if (!currentStatus) {
      return null;
    }

    const normalizedStatus = TASK_STATUSES.find(
      (item) => item.toLowerCase() === String(currentStatus).toLowerCase(),
    );

    return normalizedStatus ?? null;
  }, [status, initialValues.status]);

  // ---------------------------------------------------------------------------
  // Submit validation
  // ---------------------------------------------------------------------------

  const canSubmit =
    categoryId !== null &&
    !!categoryName &&
    projectName.trim().length > 0 &&
    !!dueDate &&
    !!selectedPriority &&
    !!selectedStatus;

  // ---------------------------------------------------------------------------
  // Submit
  // ---------------------------------------------------------------------------

  const handleSubmit = () => {
    if (
      !canSubmit ||
      categoryId === null ||
      !categoryName ||
      !dueDate ||
      !selectedPriority ||
      !selectedStatus
    ) {
      return;
    }

    onSubmit({
      taskId: initialValues.taskId,
      categoryId,
      categoryName,
      projectName: projectName.trim(),
      description: description.trim(),
      dueDate,
      priority: selectedPriority,
      status: selectedStatus,
    });
  };

  // ---------------------------------------------------------------------------
  // Loading state
  // ---------------------------------------------------------------------------

  if (categoriesLoading) {
    return (
      <View
        style={[
          styles.flex,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <ScreenHeader title="Edit Project" />
        <FormSkeleton />
      </View>
    );
  }

  // ---------------------------------------------------------------------------
  // Screen
  // ---------------------------------------------------------------------------

  return (
    <KeyboardAvoidingView
      style={[
        styles.flex,
        {
          backgroundColor: colors.background,
        },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScreenHeader title="Edit Project" />

      <ScrollView
        contentContainerStyle={{
          padding: spacing[16],
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* ----------------------------------------------------------------- */}
        {/* Category */}
        {/* ----------------------------------------------------------------- */}

        <DropdownField
          label="Task Group"
          placeholder="Select a group"
          data={categoryOptions}
          value={categoryId}
          icon={
            <Ionicons name="pricetag" size={18} color={colors.accentPink} />
          }
          iconBackgroundColor={colors.accentPinkLight}
          onChange={(option) => {
            setCategoryId(option.value);
          }}
        />

        <View style={{ height: spacing[16] }} />

        {/* ----------------------------------------------------------------- */}
        {/* Project Name */}
        {/* ----------------------------------------------------------------- */}

        <TextField
          label="Project Name"
          placeholder="e.g. Grocery Shopping App"
          value={projectName}
          onChangeText={setProjectName}
        />

        <View style={{ height: spacing[16] }} />

        {/* ----------------------------------------------------------------- */}
        {/* Description */}
        {/* ----------------------------------------------------------------- */}

        <TextField
          label="Description"
          placeholder="What is this project about?"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View style={{ height: spacing[16] }} />

        {/* ----------------------------------------------------------------- */}
        {/* Due Date */}
        {/* ----------------------------------------------------------------- */}

        <DateField label="Due Date" value={dueDate} onChange={setDueDate} />

        <View style={{ height: spacing[16] }} />

        {/* ----------------------------------------------------------------- */}
        {/* Priority */}
        {/* ----------------------------------------------------------------- */}

        <DropdownField
          label="Priority"
          placeholder="Select priority"
          variant="tinted"
          data={PRIORITY_OPTIONS}
          value={selectedPriority}
          icon={<Ionicons name="flag" size={18} color={colors.primary} />}
          iconBackgroundColor={colors.primaryLight}
          onChange={(option) => {
            setPriority(option.value);
          }}
        />

        <View style={{ height: spacing[16] }} />

        {/* ----------------------------------------------------------------- */}
        {/* Status */}
        {/* ----------------------------------------------------------------- */}

        <DropdownField
          label="Status"
          placeholder="Select status"
          variant="tinted"
          data={STATUS_OPTIONS}
          value={selectedStatus}
          icon={
            <Ionicons
              name="checkmark-circle-outline"
              size={18}
              color={colors.primary}
            />
          }
          iconBackgroundColor={colors.primaryLight}
          onChange={(option) => {
            setStatus(option.value);
          }}
        />

        <View style={{ height: spacing[24] }} />

        {/* ----------------------------------------------------------------- */}
        {/* Actions */}
        {/* ----------------------------------------------------------------- */}

        <View style={styles.buttonRow}>
          <View
            style={[
              styles.buttonSlot,
              {
                marginRight: spacing[8],
              },
            ]}
          >
            <PrimaryButton
              label="Edit"
              onPress={handleSubmit}
              loading={submitting}
              disabled={!canSubmit}
            />
          </View>

          <View
            style={[
              styles.buttonSlot,
              {
                marginLeft: spacing[8],
              },
            ]}
          >
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
