abstract class ApiEndpoints {
  static readonly BASE_URL = "https://web-production-2f6b.up.railway.app";

  // Auth
  static readonly LOGIN = "/auth/login";
  static readonly REGISTER = "/auth/register";
  static readonly GET_CURRENT_USER = "/auth/me";

  // Tasks
  static readonly CREATE_TASK = "/tasks/";
  static readonly GET_TASKS = "/tasks/";
  static readonly GET_COMPLETED_TASKS = "/tasks/completed/";
  static readonly GET_ACTIVE_TASKS = "/tasks/active/";
  static readonly GET_TODAY_TASKS = "/tasks/today/";
  static readonly GET_TASK_BY_ID = (taskId: string | number) =>
    `/tasks/${taskId}`;
  static readonly UPDATE_TASK_BY_ID = (taskId: string | number) =>
    `/tasks/${taskId}`;
  static readonly DELETE_TASK_BY_ID = (taskId: string | number) =>
    `/tasks/${taskId}`;
  static readonly COMPLETE_TASK_BY_ID = (taskId: string | number) =>
    `/tasks/${taskId}/complete`;
  static readonly UNDO_TASK_BY_ID = (taskId: string | number) =>
    `/tasks/${taskId}/undo`;

  // Categories
  static readonly GET_CATEGORIES = "/categories/";
  static readonly CREATE_CATEGORY = "/categories/";
  static readonly UPDATE_CATEGORY_BY_ID = (categoryId: string | number) =>
    `/categories/${categoryId}`;
  static readonly DELETE_CATEGORY_BY_ID = (categoryId: string | number) =>
    `/categories/${categoryId}`;

  // Planner
  static readonly GET_DAILY_PLANNER = "/planner/daily";
  static readonly GET_WEEKLY_PLANNER = "/planner/weekly";

  // Progress
  static readonly GET_PROGRESS = "/progress/progress";
}

export default ApiEndpoints;

