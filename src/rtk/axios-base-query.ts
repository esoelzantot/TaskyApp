/**
 * Lets RTK Query use `axiosClient` (src/apis/axios-client.ts) for
 * transport instead of its default `fetchBaseQuery`.
 */

import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig } from "axios";

import { ApiError, request } from "@/src/apis/axios-client";

export interface AxiosBaseQueryError {
  status?: number;
  data?: unknown;
  message: string;
  isNetworkError: boolean;
}

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosRequestConfig, unknown, AxiosBaseQueryError> =>
  async (config) => {
    try {
      const data = await request(config);
      return { data };
    } catch (err) {
      const error = err as ApiError;

      return {
        error: {
          status: error.status,
          data: error.data,
          message: error.message,
          isNetworkError: error.isNetworkError,
        },
      };
    }
  };
