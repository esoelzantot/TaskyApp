import { ScrollView, View } from "react-native";

import { ScreenHeader } from "@/src/components/screen-header/screen-header";
import { useTheme } from "@/src/theme";
import { PomodoroSettingsForm } from "./pomodoro-settings-form";
import { PomodoroTimerView } from "./pomodoro-timer-view";
import { usePomodoroTimer } from "./use-pomodoro-timer";

function PomodoroScreen() {
  const theme = useTheme();
  const pomodoro = usePomodoroTimer();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScreenHeader title="Pomodoro" />

      <ScrollView contentContainerStyle={{ padding: theme.spacing[24] }}>
        {!pomodoro.isConfigured || !pomodoro.durations ? (
          <PomodoroSettingsForm onSubmit={pomodoro.configure} />
        ) : (
          <PomodoroTimerView
            activeSession={pomodoro.activeSession}
            remainingSeconds={pomodoro.remainingSeconds}
            totalSeconds={pomodoro.totalSeconds}
            isRunning={pomodoro.isRunning}
            isComplete={pomodoro.isComplete}
            dailyStats={pomodoro.dailyStats}
            onSelectSession={pomodoro.selectSession}
            onStart={pomodoro.start}
            onPause={pomodoro.pause}
            onReset={pomodoro.reset}
            onOpenSettings={pomodoro.openSettings}
          />
        )}
      </ScrollView>
    </View>
  );
}

export default PomodoroScreen;
