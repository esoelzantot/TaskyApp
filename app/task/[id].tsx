import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";

import type {
  EditTaskFormValues,
  Priority,
  TaskStatus,
} from "@/src/models/task";
import { useGetCategoriesQuery } from "@/src/rtk/categories-api-slice";
import { TaskDetailsScreen } from "@/src/screens/tasks/task-details-screen";

interface TaskDetailsParams {
  id: string;
  categoryId: string;
  projectName: string;
  description: string;
  dueDate: string; // "YYYY-MM-DD"
  priority: Priority;
  status: TaskStatus;
}

export default function TaskDetailsRoute() {
  const params = useLocalSearchParams() as Partial<TaskDetailsParams>;

  const { data: categories } = useGetCategoriesQuery();

  const categoryName = useMemo(
    () =>
      categories?.find((category) => String(category.id) === params.categoryId)
        ?.name ?? "",
    [categories, params.categoryId],
  );

  const task: EditTaskFormValues = {
    taskId: params.id ?? "",
    categoryId: params.categoryId ?? "",
    categoryName,
    projectName: params.projectName ?? "",
    description: params.description ?? "",
    dueDate: params.dueDate ? new Date(params.dueDate) : new Date(),
    priority: (params.priority as Priority) ?? "Low",
    status: (params.status as TaskStatus) ?? "Active",
  };

  const handleToggleComplete = () => {
    // TODO: wire to a `completeTask`/`undoTask` mutation
    console.log(
      "Toggle complete for task:",
      task.taskId,
      "currently:",
      task.status,
    );
  };

  const handleEditPress = () => {
    router.push({
      pathname: "/edit-task/[id]",
      params: {
        id: String(task.taskId),
        categoryId: String(task.categoryId),
        projectName: task.projectName,
        description: task.description,
        dueDate: params.dueDate ?? "",
        priority: task.priority,
        status: task.status,
      },
    });
  };

  const handleDeletePress = () => {
    // TODO: wire to a `deleteTask` mutation once the endpoint is confirmed.
    console.log("Delete task:", task.taskId);
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TaskDetailsScreen
        task={task}
        onToggleComplete={handleToggleComplete}
        onEditPress={handleEditPress}
        onDeletePress={handleDeletePress}
      />
    </>
  );
}
