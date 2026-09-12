/**
 * Axios client configuration for Tasky.
 */

import {
  AxiosError,
  AxiosHeaders,
  create,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import ApiEndpoints from "./api-endpoints";

const DEFAULT_TIMEOUT_MS = 30000;

// ---------------------------------------------------------------------------
// Auth token injection point
// ---------------------------------------------------------------------------
type AuthTokenGetter = () =>
  | string
  | null
  | undefined
  | Promise<string | null | undefined>;

let getAuthToken: AuthTokenGetter = () =>
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNyIsImV4cCI6MTc4OTE5NzU0NX0.UdGPnNBX8Z9vn-eGzGGQj0RWfyzLGF0sLI9Oo7nF0YY";

export function setAuthTokenGetter(getter: AuthTokenGetter): void {
  getAuthToken = getter;
}

// ---------------------------------------------------------------------------
// 401 (unauthorized) injection point
// ---------------------------------------------------------------------------

type UnauthorizedHandler = (error: ApiError) => void;

let onUnauthorized: UnauthorizedHandler | null = null;

/** Registers a callback invoked whenever the API responds with 401. */
export function setUnauthorizedHandler(
  handler: UnauthorizedHandler | null,
): void {
  onUnauthorized = handler;
}

// ---------------------------------------------------------------------------
// Normalized error shape
// ---------------------------------------------------------------------------
export interface ApiErrorPayload {
  message: string;
  code?: string;
  [key: string]: unknown;
}

/**
 * Every rejected request from this client rejects with an `ApiError` instance.
 */
export class ApiError extends Error {
  status?: number;
  code?: string;
  data?: unknown;
  isNetworkError: boolean;

  constructor(
    message: string,
    options: Partial<Omit<ApiError, keyof Error | "message">> = {},
  ) {
    super(message);
    this.name = "ApiError";
    this.status = options.status;
    this.code = options.code;
    this.data = options.data;
    this.isNetworkError = options.isNetworkError ?? false;
  }
}

function toApiError(error: AxiosError<Partial<ApiErrorPayload>>): ApiError {
  if (!error.response) {
    // Request never got a response: offline, DNS failure, timeout, aborted, etc.
    const isTimeout = error.code === "ECONNABORTED";
    return new ApiError(
      isTimeout
        ? "Request timed out. Please try again."
        : "Network error. Please check your connection.",
      {
        isNetworkError: true,
        code: error.code,
      },
    );
  }

  const { status, data } = error.response;
  const message =
    (data &&
      typeof data === "object" &&
      typeof data.message === "string" &&
      data.message) ||
    error.message ||
    "Something went wrong. Please try again.";

  return new ApiError(message, {
    status,
    code: data && typeof data === "object" ? data.code : undefined,
    data,
    isNetworkError: false,
  });
}

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------
export const axiosClient: AxiosInstance = create({
  baseURL: ApiEndpoints.BASE_URL,
  timeout: DEFAULT_TIMEOUT_MS,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAuthToken();

    if (token) {
      const headers = AxiosHeaders.from(config.headers);
      headers.set("Authorization", `Bearer ${token}`);
      config.headers = headers;
    }

    return config;
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    console.log(response.data);
    return response;
  },
  (error: AxiosError<Partial<ApiErrorPayload>>) => {
    const apiError = toApiError(error);

    if (apiError.status === 401) {
      onUnauthorized?.(apiError);
    }

    return Promise.reject(apiError);
  },
);

/**
 * Convenience typed wrapper — unwraps `AxiosResponse`
 */
export async function request<TResponse = unknown>(
  config: AxiosRequestConfig,
): Promise<TResponse> {
  const response = await axiosClient.request<TResponse>(config);
  return response.data;
}

export default axiosClient;
