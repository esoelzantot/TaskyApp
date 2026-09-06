import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { DateField } from "@/src/components/add-task/date-field";
import {
  DropdownField,
  DropdownFieldOption,
} from "@/src/components/add-task/dropdown-field";
import { PrimaryButton } from "@/src/components/add-task/primary-button";
import { TextField } from "@/src/components/add-task/text-field";
import { ScreenHeader } from "@/src/components/screen-header/screen-header";
import type { Category } from "@/src/models/category";
import { AddTaskFormValues, PRIORITIES, Priority } from "@/src/models/task";
import { useGetCategoriesQuery } from "@/src/rtk/categories-api-slice";
import { useTheme } from "@/src/theme";

const PRIORITY_OPTIONS: DropdownFieldOption<Priority>[] = PRIORITIES.map(
  (priority) => ({
    label: priority,
    value: priority,
  }),
);

interface AddTaskScreenProps {
  onSubmit: (values: AddTaskFormValues) => void;
  submitting?: boolean;
}

export function AddTaskScreen({
  onSubmit,
  submitting = false,
}: AddTaskScreenProps) {
  const { colors, spacing } = useTheme();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const [categoryId, setCategoryId] = useState<Category["id"] | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<Priority | null>(null);

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
    !!priority;

  const handleSubmit = () => {
    if (
      !canSubmit ||
      categoryId === null ||
      !categoryName ||
      !dueDate ||
      !priority
    )
      return;

    onSubmit({
      categoryId,
      categoryName,
      projectName: projectName.trim(),
      description: description.trim(),
      dueDate,
      priority,
    });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScreenHeader title="Add Project" />
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

        <DateField
          label="Due Date"
          value={dueDate}
          onChange={setDueDate}
          minimumDate={new Date()}
        />
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
        <View style={{ height: spacing[24] }} />

        <PrimaryButton
          label="Add Project"
          onPress={handleSubmit}
          loading={submitting}
          disabled={!canSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    paddingHorizontal: 12,
  },
});
