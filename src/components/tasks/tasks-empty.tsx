import { Image, StyleSheet, Text, View } from "react-native";

import AppAssets from "@/src/constants/app-assets";
import { useTheme, useThemeMode } from "@/src/theme";

interface TasksEmptyProps {
  title?: string;
  description?: string;
}

const GRAPHIC_SIZE = 220;

/** Empty state shown when a task list has no items — illustration + title + description, no button. */
export function TasksEmpty({
  title = "No tasks yet",
  description = "Create your first task and start making progress on this project.",
}: TasksEmptyProps) {
  const { colors, typography, spacing } = useTheme();
  const { mode } = useThemeMode();

  const graphic =
    mode === "dark"
      ? AppAssets.EMPTY_TASKS_DARK_GRAPHIC
      : AppAssets.EMPTY_TASKS_LIGHT_GRAPHIC;

  return (
    <View style={styles.container}>
      <Image source={graphic} style={styles.graphic} resizeMode="contain" />

      <Text
        style={[
          typography.heading1,
          { color: colors.textPrimary, marginTop: spacing[24] },
          styles.centerText,
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          typography.body,
          { color: colors.textSecondary, marginTop: spacing[8] },
          styles.centerText,
          styles.description,
        ]}
      >
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  graphic: {
    width: GRAPHIC_SIZE,
    height: GRAPHIC_SIZE,
  },
  centerText: {
    textAlign: "center",
  },
  description: {
    maxWidth: 280,
  },
});
