import { Pressable, StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import {
  POMODORO_SESSION_LABELS,
  type PomodoroDailyStats,
  type PomodoroSessionType,
} from "@/src/models/pomodoro";
import { useTheme } from "@/src/theme";
import type { ThemeColors } from "@/src/theme";

const RING_SIZE = 240;
const RING_WIDTH = 14;

const SESSION_TYPES: PomodoroSessionType[] = ["work", "short", "long"];

/** Each session type gets its own ring/tab color — reusing existing tokens, nothing new invented. */
function getSessionColor(colors: ThemeColors, session: PomodoroSessionType): string {
  switch (session) {
    case "work":
      return colors.primary;
    case "short":
      return colors.accentBlue;
    case "long":
      return colors.accentOrange;
  }
}

function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/** e.g. 125 minutes -> "2h 5m", 40 minutes -> "40m". */
function formatDuration(totalSeconds: number): string {
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export interface PomodoroTimerViewProps {
  activeSession: PomodoroSessionType;
  remainingSeconds: number;
  totalSeconds: number;
  isRunning: boolean;
  isComplete: boolean;
  dailyStats: PomodoroDailyStats;
  onSelectSession: (session: PomodoroSessionType) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onOpenSettings: () => void;
}

export function PomodoroTimerView({
  activeSession,
  remainingSeconds,
  totalSeconds,
  isRunning,
  isComplete,
  dailyStats,
  onSelectSession,
  onStart,
  onPause,
  onReset,
  onOpenSettings,
}: PomodoroTimerViewProps) {
  const theme = useTheme();
  const sessionColor = getSessionColor(theme.colors, activeSession);
  // Ring depletes as time passes (starts full at 100%), matching the
  // reference's CountdownCircleTimer visual behavior.
  const fillPercent = totalSeconds > 0 ? (remainingSeconds / totalSeconds) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={[styles.tabsRow, { marginTop: theme.spacing[16], gap: theme.spacing[8] }]}>
        {SESSION_TYPES.map((session) => {
          const isActive = session === activeSession;
          return (
            <Pressable
              key={session}
              onPress={() => onSelectSession(session)}
              style={[
                styles.tab,
                {
                  backgroundColor: isActive ? theme.colors.primary : theme.colors.primarySurface,
                  borderRadius: theme.radii.full,
                  paddingHorizontal: theme.spacing[16],
                  paddingVertical: theme.spacing[10],
                },
              ]}
            >
              <Text
                style={[
                  theme.typography.bodyBold,
                  { color: isActive ? theme.colors.onPrimary : theme.colors.primary },
                ]}
              >
                {POMODORO_SESSION_LABELS[session]}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable onPress={onOpenSettings} style={{ marginTop: theme.spacing[12] }} hitSlop={8}>
        <Text style={[theme.typography.body, { color: theme.colors.textSecondary }]}>
          Settings
        </Text>
      </Pressable>

      <View style={{ marginTop: theme.spacing[24] }}>
        <AnimatedCircularProgress
          size={RING_SIZE}
          width={RING_WIDTH}
          fill={fillPercent}
          rotation={0}
          lineCap="round"
          tintColor={sessionColor}
          backgroundColor={theme.colors.primaryMuted}
        >
          {() => (
            <View style={styles.ringContent}>
              <Text style={[theme.typography.display, { color: theme.colors.textPrimary }]}>
                {formatClock(remainingSeconds)}
              </Text>
              {isComplete && (
                <Text
                  style={[
                    theme.typography.bodyBold,
                    { color: sessionColor, marginTop: theme.spacing[4] },
                  ]}
                >
                  Session complete
                </Text>
              )}
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      <View style={[styles.controlsRow, { marginTop: theme.spacing[24], gap: theme.spacing[16] }]}>
        <Pressable
          onPress={onReset}
          style={[
            styles.controlButton,
            { backgroundColor: theme.colors.primarySurface, borderRadius: theme.radii.full },
          ]}
        >
          <Text style={[theme.typography.bodyBold, { color: theme.colors.primary }]}>Reset</Text>
        </Pressable>

        <Pressable
          onPress={isRunning ? onPause : onStart}
          style={[
            styles.mainControlButton,
            { backgroundColor: theme.colors.primary, borderRadius: theme.radii.full, ...theme.elevation.level2 },
          ]}
        >
          <Text style={[theme.typography.bodyBold, { color: theme.colors.onPrimary }]}>
            {isRunning ? "Pause" : "Start"}
          </Text>
        </Pressable>
      </View>

      {/* Today's totals — accumulates while a session is actually
          running, reset only when the app restarts (see the note on
          PomodoroDailyStats). */}
      <View
        style={[
          styles.statsRow,
          {
            marginTop: theme.spacing[24],
            gap: theme.spacing[12],
            width: "100%",
          },
        ]}
      >
        {SESSION_TYPES.map((session) => (
          <View
            key={session}
            style={[
              styles.statCard,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radii.card,
                padding: theme.spacing[12],
              },
            ]}
          >
            <View
              style={[
                styles.statDot,
                { backgroundColor: getSessionColor(theme.colors, session) },
              ]}
            />
            <Text
              style={[
                theme.typography.bodyBold,
                { color: theme.colors.textPrimary, marginTop: theme.spacing[8] },
              ]}
            >
              {formatDuration(dailyStats[session])}
            </Text>
            <Text
              style={[
                theme.typography.caption,
                { color: theme.colors.textSecondary, marginTop: theme.spacing[2] },
              ]}
            >
              {POMODORO_SESSION_LABELS[session]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  tabsRow: {
    flexDirection: "row",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  ringContent: {
    alignItems: "center",
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  mainControlButton: {
    paddingHorizontal: 40,
    paddingVertical: 16,
  },
  statsRow: {
    flexDirection: "row",
  },
  statCard: {
    flex: 1,
    alignItems: "center",
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});