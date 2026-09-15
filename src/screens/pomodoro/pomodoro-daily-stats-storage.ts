import AsyncStorage from "@react-native-async-storage/async-storage";

import { EMPTY_POMODORO_DAILY_STATS, type PomodoroDailyStats } from "@/src/models/pomodoro";


const STORAGE_KEY_PREFIX = "pomodoro:daily-stats:";

/** Local calendar date as "YYYY-MM-DD" — matches what the user sees on their own clock, not UTC. */
export function getTodayDateKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function storageKeyFor(dateKey: string): string {
  return `${STORAGE_KEY_PREFIX}${dateKey}`;
}

export async function loadDailyStats(dateKey: string): Promise<PomodoroDailyStats> {
  try {
    const raw = await AsyncStorage.getItem(storageKeyFor(dateKey));
    if (!raw) return EMPTY_POMODORO_DAILY_STATS;

    const parsed = JSON.parse(raw);
    return {
      work: Number(parsed.work) || 0,
      short: Number(parsed.short) || 0,
      long: Number(parsed.long) || 0,
    };
  } catch {
    // Corrupted/unreadable entry shouldn't crash the timer — just start today fresh.
    return EMPTY_POMODORO_DAILY_STATS;
  }
}

export async function saveDailyStats(dateKey: string, stats: PomodoroDailyStats): Promise<void> {
  try {
    await AsyncStorage.setItem(storageKeyFor(dateKey), JSON.stringify(stats));
  } catch {
    // Best-effort — losing one write shouldn't crash the timer.
  }
}

/** Removes every stored day except today's, so this doesn't grow forever. */
export async function pruneOldDailyStats(todayDateKey: string): Promise<void> {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const staleKeys = allKeys.filter(
      (key) => key.startsWith(STORAGE_KEY_PREFIX) && key !== storageKeyFor(todayDateKey)
    );
    if (staleKeys.length > 0) {
      await AsyncStorage.multiRemove(staleKeys);
    }
  } catch {
    // Best-effort cleanup — safe to skip on failure.
  }
}