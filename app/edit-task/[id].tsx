import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";

import type {
  EditTaskFormValues,
  Priority,
  TaskStatus,
} from "@/src/models/task";
import { useGetCategoriesQuery } from "@/src/rtk/categories-api-slice";
import { EditTaskScreen } from "@/src/screens/tasks/edit-task-screen";

/** Everything the caller passes via `router.push` (see usage example below). All route params arrive as strings. */
interface EditTaskParams {
  id: string;
  categoryId: string;
  projectName: string;
  description: string;
  dueDate: string; // "YYYY-MM-DD"
  priority: Priority;
  status: TaskStatus;
}

export default function EditTaskRoute() {
  const params = useLocalSearchParams() as Partial<EditTaskParams>;

  // Loads the categories list so we can resolve `categoryId` -> the group's
  // display name (the screen's dropdown needs both).
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const categoryName = useMemo(
    () =>
      categories?.find((category) => String(category.id) === params.categoryId)
        ?.name ?? "",
    [categories, params.categoryId],
  );

  const initialValues: EditTaskFormValues = {
    taskId: params.id ?? "",
    categoryId: params.categoryId ?? "",
    categoryName,
    projectName: params.projectName ?? "",
    description: params.description ?? "",
    dueDate: params.dueDate ? new Date(params.dueDate) : new Date(),
    priority: (params.priority as Priority) ?? "Low",
    status: (params.status as TaskStatus) ?? "Active",
  };

  const handleSubmit = (values: EditTaskFormValues) => {
    // TODO: wire to an `updateTask` mutation (ApiEndpoints.UPDATE_TASK_BY_ID)
    // once the request body shape is confirmed.
    console.log("Edit Project submitted:", values);
    router.back();
  };

  // Wait for categories to load before rendering, so the Task Group
  // dropdown already shows the right selection instead of flashing empty.
  if (categoriesLoading) {
    return null;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EditTaskScreen
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
      />
    </>
  );
}
