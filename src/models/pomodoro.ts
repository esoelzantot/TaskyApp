export type PomodoroSessionType = "work" | "short" | "long";

export const POMODORO_SESSION_LABELS: Record<PomodoroSessionType, string> = {
  work: "Work",
  short: "Short Break",
  long: "Long Break",
};

export const DEFAULT_POMODORO_DURATIONS: PomodoroDurations = {
  work: 25,
  short: 5,
  long: 15,
};

export interface PomodoroDurations {
  work: number;
  short: number;
  long: number;
}
