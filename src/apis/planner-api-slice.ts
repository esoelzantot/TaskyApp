import { api } from "../rtk/api";
import ApiEndpoints from "./api-endpoints";
import { Task } from "../models/task";

export const plannerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDailyTasks: builder.query<Task[], string>({
      query: (date) => ({
        url: ApiEndpoints.GET_DAILY_PLANNER,
        method: "GET",
        params: { date },
      }),
      providesTags: (result, error, date) => [{ type: "Planner", id: `Daily-${date}` }],
    }),
    getWeeklyTasks: builder.query<Record<string, Task[]> | Task[], string>({
      query: (startDate) => ({
        url: ApiEndpoints.GET_WEEKLY_PLANNER,
        method: "GET",
        params: { start_date: startDate },
      }),
      transformResponse: (response: unknown) => {
        // Swagger says it's a string, so it might be a JSON-encoded string.
        let parsed = response;
        if (typeof response === "string") {
          try {
            parsed = JSON.parse(response);
          } catch (e) {
            console.error("Failed to parse weekly planner response string:", e);
            return []; // Fallback
          }
        }
        
        // Return as is (either array or object)
        return parsed as Record<string, Task[]> | Task[];
      },
      providesTags: (result, error, startDate) => [{ type: "Planner", id: `Weekly-${startDate}` }],
    }),
  }),
});

export const { useGetDailyTasksQuery, useGetWeeklyTasksQuery } = plannerApi;
