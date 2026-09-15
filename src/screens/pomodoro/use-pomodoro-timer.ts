import { useCallback, useEffect, useRef, useState } from "react";

import type {
  PomodoroDailyStats,
  PomodoroDurations,
  PomodoroSessionType,
} from "@/src/models/pomodoro";
import { EMPTY_POMODORO_DAILY_STATS } from "@/src/models/pomodoro";
import {
  getTodayDateKey,
  loadDailyStats,
  pruneOldDailyStats,
  saveDailyStats,
} from "./pomodoro-daily-stats-storage";

function minutesToSeconds(minutes: number): number {
  return Math.max(0, Math.round(minutes)) * 60;
}

/**
 * All Pomodoro timer state and behavior, ported from the reference
 * web app's `SettingContext` + `CountdownCircleTimer` combination:
 *
 *   - `durations === null` means "not configured yet" — the caller
 *     should show the settings form (matches `pomodoro === 0` in the
 *     reference's `App.jsx`).
 *   - Selecting a session resets the countdown to that session's full
 *     duration (matches `setCurrentTimer`).
 *   - Reaching zero auto-pauses rather than advancing to the next
 *     session — the reference never auto-transitions either
 *     (`onComplete={stopAnimate}` just stops it).
 *   - `openSettings` fully clears the configured durations, returning
 *     to the setup form (matches the reference's `settingBtn`).
 *
 * `dailyStats` is persisted to AsyncStorage (see
 * `pomodoro-daily-stats-storage.ts`) so today's totals survive
 * closing the app, and roll over to a fresh empty day automatically.
 */
export function usePomodoroTimer() {
  const [durations, setDurations] = useState<PomodoroDurations | null>(null);
  const [activeSession, setActiveSession] =
    useState<PomodoroSessionType>("work");
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [dailyStats, setDailyStats] = useState<PomodoroDailyStats>(
    EMPTY_POMODORO_DAILY_STATS,
  );

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dateKeyRef = useRef(getTodayDateKey());
  // Guards against the "persist on change" effect firing with the
  // initial zeroed state before the "load on mount" effect below has
  // actually finished reading from storage — without this, that
  // first render would immediately overwrite today's real saved stats.
  const hasLoadedStatsRef = useRef(false);

  // Load today's persisted stats once on mount, and clean up any
  // previous days' entries so storage doesn't grow forever.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const todayKey = getTodayDateKey();
      dateKeyRef.current = todayKey;
      const stored = await loadDailyStats(todayKey);
      if (!cancelled) {
        setDailyStats(stored);
        hasLoadedStatsRef.current = true;
      }
      pruneOldDailyStats(todayKey);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Persist on every change — the guard above keeps this from firing
  // before the initial load has completed.
  useEffect(() => {
    if (!hasLoadedStatsRef.current) return;
    saveDailyStats(dateKeyRef.current, dailyStats);
  }, [dailyStats]);

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

      // If the app is left open across midnight, start a fresh day's
      // totals instead of folding this tick into yesterday's.
      const todayKey = getTodayDateKey();
      if (todayKey !== dateKeyRef.current) {
        dateKeyRef.current = todayKey;
        setDailyStats({ ...EMPTY_POMODORO_DAILY_STATS, [activeSession]: 1 });
        return;
      }

      // Every tick that actually runs counts toward today's total for
      // whichever session type is active — a paused/never-started
      // timer contributes nothing, matching "time actually spent".
      setDailyStats((prev) => ({
        ...prev,
        [activeSession]: prev[activeSession] + 1,
      }));
    }, 1000);

    return clearTick;
  }, [isRunning, activeSession, clearTick]);

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
    dailyStats,
    configure,
    selectSession,
    start,
    pause,
    reset,
    openSettings,
  };
}
