import { useCallback, useEffect, useRef, useState } from "react";

import type {
  PomodoroDurations,
  PomodoroSessionType,
} from "@/src/models/pomodoro";

function minutesToSeconds(minutes: number): number {
  return Math.max(0, Math.round(minutes)) * 60;
}

export function usePomodoroTimer() {
  const [durations, setDurations] = useState<PomodoroDurations | null>(null);
  const [activeSession, setActiveSession] =
    useState<PomodoroSessionType>("work");
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTick = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isRunning) {
      clearTick();
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTick;
  }, [isRunning, clearTick]);

  const configure = useCallback((newDurations: PomodoroDurations) => {
    setDurations(newDurations);
    setActiveSession("work");
    setRemainingSeconds(minutesToSeconds(newDurations.work));
    setIsRunning(false);
  }, []);

  const selectSession = useCallback(
    (session: PomodoroSessionType) => {
      if (!durations) return;
      setActiveSession(session);
      setRemainingSeconds(minutesToSeconds(durations[session]));
      setIsRunning(false);
    },
    [durations],
  );

  const start = useCallback(() => {
    setRemainingSeconds((prev) => {
      if (prev <= 0) return prev;
      setIsRunning(true);
      return prev;
    });
  }, []);

  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback(() => {
    if (!durations) return;
    setIsRunning(false);
    setRemainingSeconds(minutesToSeconds(durations[activeSession]));
  }, [durations, activeSession]);

  /** Returns to the setup form — clears the configured durations entirely. */
  const openSettings = useCallback(() => {
    clearTick();
    setIsRunning(false);
    setDurations(null);
  }, [clearTick]);

  const totalSeconds = durations
    ? minutesToSeconds(durations[activeSession])
    : 0;

  return {
    isConfigured: durations !== null,
    durations,
    activeSession,
    remainingSeconds,
    totalSeconds,
    isRunning,
    isComplete: durations !== null && remainingSeconds === 0,
    configure,
    selectSession,
    start,
    pause,
    reset,
    openSettings,
  };
}
