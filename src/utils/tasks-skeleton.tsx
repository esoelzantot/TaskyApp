import { StyleSheet, View } from "react-native";

import { useTheme } from "@/src/theme";
import { ShimmerBar, withAlpha } from "@/src/utils/shimmer-bar";

const PLACEHOLDER_COUNT = 5;

/** One placeholder row — mirrors TaskCard's checkbox + title/date + status pill layout. */
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
      <View style={styles.row}>
        <ShimmerBar
          width={26}
          height={26}
          radius={radii.full}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />

        <View style={[styles.content, { marginLeft: spacing[12] }]}>
          <ShimmerBar
            width="35%"
            height={10}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
          <View style={{ height: spacing[8] }} />
          <ShimmerBar
            width="65%"
            height={18}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
          <View style={{ height: spacing[8] }} />
          <ShimmerBar
            width={90}
            height={12}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </View>

        <ShimmerBar
          width={64}
          height={22}
          radius={radii.full}
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
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    flex: 1,
  },
});
