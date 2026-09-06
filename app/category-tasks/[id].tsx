import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";

import type { TaskCardData } from "@/src/components/tasks/task-card";
import { CategoryTasksScreen } from "@/src/screens/tasks/category-tasks-screen";

interface CategoryTasksParams {
  id: string;
  name: string;
}

export default function CategoryTasksRoute() {
  const params = useLocalSearchParams() as Partial<CategoryTasksParams>;

  // TODO: replace with real data from a `getTasksByCategory(id)` query once
  const tasks: TaskCardData[] = [];

  const handleEditTask = (taskId: TaskCardData["id"]) => {
    router.push({
      pathname: "/edit-task/[id]",
      params: { id: String(taskId) },
    });
  };

  const handleDeleteTask = (taskId: TaskCardData["id"]) => {
    // TODO: wire to a `deleteTask` mutation once the endpoint is confirmed.
    console.log("Delete task:", taskId);
  };

  const handleAddTask = () => {
    router.push("/add-task");
  };

  return (
    <>
      <Stack.Screen
        options={{ title: params.name ?? "Tasks", headerBackTitle: "Back" }}
      />
      <CategoryTasksScreen
        name={params.name ?? "Tasks"}
        tasks={tasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onAddTask={handleAddTask}
      />
    </>
  );
}
