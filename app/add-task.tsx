import { router, Stack } from "expo-router";
import React from "react";

import type { AddTaskFormValues } from "@/src/models/task";
import { AddTaskScreen } from "@/src/screens/tasks/add-task-screen";

export default function AddTaskRoute() {
  const handleSubmit = (values: AddTaskFormValues) => {
    console.log("Add Project submitted:", values);
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{ title: "Add Project", headerBackTitle: "Back" }}
      />
      <AddTaskScreen onSubmit={handleSubmit} />
    </>
  );
}
