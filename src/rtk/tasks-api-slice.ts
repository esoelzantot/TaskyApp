import ApiEndpoints from "@/src/apis/api-endpoints";
import type {
  CreateTaskRequest,
  GetTasksParams,
  Task,
  UpdateTaskRequest,
} from "@/src/models/task";
import { api } from "@/src/rtk/api";

export const tasksApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], GetTasksParams | void>({
      query: (params) => ({
        url: ApiEndpoints.GET_TASKS,
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((task) => ({ type: "Task" as const, id: task.id })),
              { type: "Task" as const, id: "LIST" },
            ]
          : [{ type: "Task" as const, id: "LIST" }],
    }),

    getCompletedTasks: builder.query<Task[], void>({
      query: () => ({
        url: ApiEndpoints.GET_COMPLETED_TASKS,
        method: "GET",
      }),
      providesTags: [{ type: "Task", id: "LIST" }],
    }),

    getActiveTasks: builder.query<Task[], void>({
      query: () => ({
        url: ApiEndpoints.GET_ACTIVE_TASKS,
        method: "GET",
      }),
      providesTags: [{ type: "Task", id: "LIST" }],
    }),

    getTodayTasks: builder.query<Task[], void>({
      query: () => ({
        url: ApiEndpoints.GET_TODAY_TASKS,
        method: "GET",
      }),
      providesTags: [{ type: "Task", id: "LIST" }],
    }),

    getTaskById: builder.query<Task, Task["id"]>({
      query: (taskId) => ({
        url: ApiEndpoints.GET_TASK_BY_ID(taskId),
        method: "GET",
      }),
      providesTags: (result, error, taskId) => [{ type: "Task", id: taskId }],
    }),

    createTask: builder.mutation<Task, CreateTaskRequest>({
      query: (body) => ({
        url: ApiEndpoints.CREATE_TASK,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),

    updateTask: builder.mutation<Task, UpdateTaskRequest>({
      query: ({ id, ...body }) => ({
        url: ApiEndpoints.UPDATE_TASK_BY_ID(id),
        method: "PUT",
        data: body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Task", id },
        { type: "Task", id: "LIST" },
      ],
    }),

    deleteTask: builder.mutation<string, Task["id"]>({
      query: (taskId) => ({
        url: ApiEndpoints.DELETE_TASK_BY_ID(taskId),
        method: "DELETE",
      }),
      invalidatesTags: (result, error, taskId) => [
        { type: "Task", id: taskId },
        { type: "Task", id: "LIST" },
      ],
    }),

    // No request body — the docs show only the `task_id` path param.
    completeTask: builder.mutation<Task, Task["id"]>({
      query: (taskId) => ({
        url: ApiEndpoints.COMPLETE_TASK_BY_ID(taskId),
        method: "PATCH",
      }),
      invalidatesTags: (result, error, taskId) => [
        { type: "Task", id: taskId },
        { type: "Task", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTasksQuery,
  useGetCompletedTasksQuery,
  useGetActiveTasksQuery,
  useGetTodayTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useCompleteTaskMutation,
} = tasksApiSlice;
