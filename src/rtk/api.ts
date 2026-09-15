/**
 * Base RTK Query API slice — deliberately has zero endpoints. Feature
 * modules (e.g. a future `src/apis/tasks-api-slice.ts`) call
 * `api.injectEndpoints({ endpoints: (builder) => ({ ... }) })` to add
 * their own queries/mutations onto this single instance, instead of
 * each feature creating its own `createApi(...)`.
 *
 * Why one instance instead of one per feature: `store.ts` only has to
 * wire up one reducer, one middleware, and one persistence config
 * (`api.reducerPath`) — no matter how many feature slices exist later.
 */

import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "./axios-base-query";

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  refetchOnReconnect: true,
  refetchOnFocus: true,
  tagTypes: ["Category", "Task"],
  endpoints: () => ({}),
});
