import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

import { TaskDetailsSkeleton } from "@/src/utils/task-details-skeleton";
import { useGetTaskByIdQuery } from "@/src/rtk/tasks-api-slice";
import { TaskDetailsScreen } from "@/src/screens/tasks/task-details-screen";

export default function TaskDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: task, isLoading } = useGetTaskByIdQuery(Number(id));

  if (isLoading || !task) {
    return <TaskDetailsSkeleton />;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TaskDetailsScreen task={task} />
    </>
  );
}
