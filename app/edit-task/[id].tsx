import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";

import type {
  EditTaskFormValues,
  Priority,
  TaskStatus,
} from "@/src/models/task";
import { useGetCategoriesQuery } from "@/src/rtk/categories-api-slice";
import { EditTaskScreen } from "@/src/screens/tasks/edit-task-screen";

interface EditTaskParams {
  id: string;
  categoryId: string;
  projectName: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
}

export default function EditTaskRoute() {
  const params = useLocalSearchParams() as unknown as EditTaskParams;

  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  // Resolve the ONE matching category object once, and reuse its real
  // `id` (whatever type it actually is) instead of the raw route-param
  // string — so this always matches the same-typed `value` used to
  // build `categoryOptions` inside EditTaskScreen.
  const matchedCategory = useMemo(
    () =>
      categories?.find((category) => String(category.id) === params.categoryId),
    [categories, params.categoryId],
  );

  const initialValues: EditTaskFormValues = {
    taskId: params.id ?? "",
    categoryId: matchedCategory?.id ?? params.categoryId ?? "",
    categoryName: matchedCategory?.name ?? "",
    projectName: params.projectName ?? "",
    description: params.description ?? "",
    dueDate: params.dueDate ? new Date(params.dueDate) : new Date(),
    priority: (params.priority as Priority) ?? "Low",
    status: (params.status as TaskStatus) ?? "Active",
  };

  const handleSubmit = (values: EditTaskFormValues) => {
    console.log("Edit Project submitted:", values);
    router.back();
  };

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
