import { StyleSheet, View } from "react-native";

import { useTheme } from "@/src/theme";
import { ShimmerBar, withAlpha } from "@/src/utils/shimmer-bar";

interface SkeletonFieldProps {
  /** Shows a round icon-bubble placeholder to the left, like Task Group/Due Date/Priority. */
  withIcon?: boolean;
  /** Extra value lines below the first — used for the taller Description field. */
  extraLines?: number;
}

function SkeletonField({
  withIcon = false,
  extraLines = 0,
}: SkeletonFieldProps) {
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
        {withIcon && (
          <ShimmerBar
            radius={20}
            width={40}
            height={40}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        )}
        <View
          style={[
            styles.content,
            withIcon ? { marginLeft: spacing[12] } : null,
          ]}
        >
          {/* label line */}
          <ShimmerBar
            width="35%"
            height={10}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
          <View style={{ height: spacing[8] }} />
          {/* value line(s) */}
          <ShimmerBar
            width="65%"
            height={14}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
          {Array.from({ length: extraLines }).map((_, i) => (
            <View key={i}>
              <View style={{ height: spacing[8] }} />
              <ShimmerBar
                width={i === extraLines - 1 ? "45%" : "88%"}
                height={14}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

/**
 * Skeleton placeholder shown while the Add/Edit Task form's categories are
 * loading.
 */
export function FormSkeleton() {
  const { spacing } = useTheme();

  return (
    <View style={{ padding: spacing[16] }}>
      {/* Task Group */}
      <SkeletonField withIcon />
      <View style={{ height: spacing[16] }} />
      {/* Project Name */}
      <SkeletonField />
      <View style={{ height: spacing[16] }} />
      {/* Description */}
      <SkeletonField extraLines={2} />
      <View style={{ height: spacing[16] }} />
      {/* Due Date */}
      <SkeletonField withIcon />
      <View style={{ height: spacing[16] }} />
      {/* Priority */}
      <SkeletonField withIcon />
      <View style={{ height: spacing[16] }} />
      {/* Status */}
      <SkeletonField withIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
});

export default FormSkeleton;
