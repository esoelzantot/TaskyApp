import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/src/theme";

/** Placeholder — replace with the real History screen once that feature is built. */
export default function HistoryScreen() {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text
        style={[theme.typography.heading2, { color: theme.colors.textPrimary }]}
      >
        HISTORY SCREEN
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
