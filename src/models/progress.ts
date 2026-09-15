export interface Progress {
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  completion_rate: number;
}

export const EMPTY_PROGRESS: Progress = {
  total_tasks: 0,
  completed_tasks: 0,
  pending_tasks: 0,
  completion_rate: 0,
};
