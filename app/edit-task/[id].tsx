import { router, Stack, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

import {
  toUpdateTaskRequest,
  type EditTaskFormValues,
  type Priority,
  type TaskStatus,
} from "@/src/models/task";
import { useGetCategoriesQuery } from "@/src/rtk/categories-api-slice";
import { useUpdateTaskMutation } from "@/src/rtk/tasks-api-slice";
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

  const [updateTask] = useUpdateTaskMutation();

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

  const handleSubmit = async (values: EditTaskFormValues) => {
    await updateTask(toUpdateTaskRequest(values)).unwrap();
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
