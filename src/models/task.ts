import type { Category } from "./category";

/** The only three priority levels the Add/Edit Task screens allow. */
export type Priority = "Low" | "Medium" | "High";

export const PRIORITIES: readonly Priority[] = ["Low", "Medium", "High"];

/** Task status shown on the Edit Task screen's Status dropdown. */
export type TaskStatus = "Active" | "Completed";

export const TASK_STATUSES: readonly TaskStatus[] = ["Active", "Completed"];

export interface AddTaskFormValues {
  categoryId: Category["id"];
  categoryName: string;
  projectName: string;
  description: string;
  dueDate: Date;
  priority: Priority;
}

export interface EditTaskFormValues {
  taskId: string | number;
  categoryId: Category["id"];
  categoryName: string;
  projectName: string;
  description: string;
  dueDate: Date;
  priority: Priority;
  status: TaskStatus;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  priority: Priority;
  completed: boolean;
  category_id: number;
  category_name: string;
}

export interface GetTasksParams {
  priority?: Priority;
  category_id?: number;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  due_date: string;
  priority: Priority;
  category_id: number;
}

export interface UpdateTaskRequest {
  id: Task["id"];
  title: string;
  description: string;
  due_date: string;
  priority: Priority;
  completed: boolean;
  category_id: number;
}

/** Formats a `Date` as the "YYYY-MM-DD" string the API expects, in local time. */
export function formatDueDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Maps the Add Task screen's form values to the `POST /tasks/` request body. */
export function toCreateTaskRequest(
  values: AddTaskFormValues,
): CreateTaskRequest {
  return {
    title: values.projectName,
    description: values.description,
    due_date: formatDueDate(values.dueDate),
    priority: values.priority,
    category_id: Number(values.categoryId),
  };
}

/** Maps the Edit Task screen's form values to the `PUT /tasks/{task_id}` request body. */
export function toUpdateTaskRequest(
  values: EditTaskFormValues,
): UpdateTaskRequest {
  return {
    id: Number(values.taskId),
    title: values.projectName,
    description: values.description,
    due_date: formatDueDate(values.dueDate),
    priority: values.priority,
    completed: values.status === "Completed",
    category_id: Number(values.categoryId),
  };
}
