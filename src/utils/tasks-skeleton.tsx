import { StyleSheet, View } from "react-native";

import { useTheme } from "@/src/theme";
import { ShimmerBar, withAlpha } from "@/src/utils/shimmer-bar";

const PLACEHOLDER_COUNT = 4;

/** One placeholder card — mirrors TaskCard's header/meta/buttons layout. */
function TaskCardSkeleton() {
  const { colors, spacing, radii, elevation } = useTheme();

  const baseColor = withAlpha(colors.border, 0.14);
  const highlightColor = withAlpha(colors.border, 0.34);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderRadius: radii.card,
          padding: spacing[16],
        },
        elevation.level1,
      ]}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <ShimmerBar
            width="40%"
            height={10}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
          <View style={{ height: spacing[8] }} />
          <ShimmerBar
            width="70%"
            height={18}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </View>
        <ShimmerBar
          width={44}
          height={44}
          radius={radii.md}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </View>

      <View style={[styles.metaRow, { marginTop: spacing[16] }]}>
        <ShimmerBar
          width={110}
          height={28}
          radius={radii.full}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <ShimmerBar
          width={70}
          height={24}
          radius={radii.full}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </View>

      <View style={[styles.buttonRow, { marginTop: spacing[16] }]}>
        <ShimmerBar
          width="47%"
          height={44}
          radius={radii.button}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <ShimmerBar
          width="47%"
          height={44}
          radius={radii.button}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </View>
    </View>
  );
}

/** Skeleton placeholder shown in place of the tasks list while it's loading. */
export function TasksSkeleton() {
  const { spacing } = useTheme();

  return (
    <View style={{ padding: spacing[16], gap: spacing[16] }}>
      {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
        <TaskCardSkeleton key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerText: {
    flex: 1,
    paddingRight: 12,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
