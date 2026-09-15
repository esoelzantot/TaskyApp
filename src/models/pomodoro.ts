

export type PomodoroSessionType = "work" | "short" | "long";

export const POMODORO_SESSION_LABELS: Record<PomodoroSessionType, string> = {
  work: "Work",
  short: "Short Break",
  long: "Long Break",
};

export interface PomodoroDurations {
  work: number;
  short: number;
  long: number;
}

export interface PomodoroDailyStats {
  work: number;
  short: number;
  long: number;
}

export const EMPTY_POMODORO_DAILY_STATS: PomodoroDailyStats = {
  work: 0,
  short: 0,
  long: 0,
};

export const DEFAULT_POMODORO_DURATIONS: PomodoroDurations = {
  work: 25,
  short: 5,
  long: 15,
};
