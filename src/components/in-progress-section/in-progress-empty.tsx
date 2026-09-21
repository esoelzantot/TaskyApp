import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/src/theme";

/**
 * Compact empty state for the "In Progress" horizontal section — a single
 * inline card rather than a full-screen illustration, since this section
 * sits inline on the home screen, not on its own screen.
 */
export function InProgressEmpty() {
  const { colors, typography, spacing, radii, elevation } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderRadius: radii.card,
          padding: spacing[20],
          marginTop: spacing[16],
        },
        elevation.level1,
      ]}
    >
      <View
        style={[
          styles.iconBubble,
          { backgroundColor: colors.primarySurface, borderRadius: radii.full },
        ]}
      >
        <Ionicons
          name="checkmark-circle-outline"
          size={26}
          color={colors.primary}
        />
      </View>

      <Text
        style={[
          typography.bodyBold,
          { color: colors.textPrimary, marginTop: spacing[12] },
        ]}
      >
        All caught up!
      </Text>
      <Text
        style={[
          typography.body,
          {
            color: colors.textSecondary,
            marginTop: spacing[4],
            textAlign: "center",
          },
        ]}
      >
        No tasks in progress right now.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconBubble: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
