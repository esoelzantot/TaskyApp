import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/src/theme";

/** Placeholder — replace with the real Calendar screen once that feature is built. */
export default function CalendarScreen() {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text
        style={[theme.typography.heading2, { color: theme.colors.textPrimary }]}
      >
        CALENDAR SCREEN
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
