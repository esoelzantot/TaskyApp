import { View } from "react-native";

import { useTheme } from "@/src/theme";
import { ShimmerBar, withAlpha } from "@/src/utils/shimmer-bar";

import styles from "@/src/components/task-groups-section/task-groups-section-styles";

const PLACEHOLDER_COUNT = 4;

/** One placeholder card — mirrors CategoryCard's icon-badge + title + subtitle layout. */
function CategoryCardSkeleton() {
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
          gap: spacing[16],
        },
        elevation.level1,
      ]}
    >
      <View
        style={[
          styles.iconBadge,
          { borderRadius: radii.md, overflow: "hidden" },
        ]}
      >
        <ShimmerBar
          width="100%"
          height="100%"
          radius={0}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </View>

      <View style={{ flex: 1 }}>
        <ShimmerBar
          width="55%"
          height={16}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <View style={{ height: spacing[8] }} />
        <ShimmerBar
          width="35%"
          height={12}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
      </View>
    </View>
  );
}

/** Skeleton placeholder shown in place of the Task Groups list while categories are loading. */
export function CategoriesSkeleton() {
  const { spacing } = useTheme();

  return (
    <View style={{ gap: spacing[16], paddingTop: spacing[16] }}>
      {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </View>
  );
}
