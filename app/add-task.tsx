import { router, Stack } from "expo-router";

import { toCreateTaskRequest, type AddTaskFormValues } from "@/src/models/task";
import { useCreateTaskMutation } from "@/src/rtk/tasks-api-slice";
import { AddTaskScreen } from "@/src/screens/tasks/add-task-screen";

export default function AddTaskRoute() {
  const [createTask] = useCreateTaskMutation();

  const handleSubmit = async (values: AddTaskFormValues) => {
    await createTask(toCreateTaskRequest(values)).unwrap();
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
