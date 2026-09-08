import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "@/src/theme";

function withAlpha(hex: string, alpha: number): string {
  const match = /^#?([a-f\d]{3}|[a-f\d]{6})$/i.exec(hex.trim());
  if (!match) return hex; // not a plain hex color — use as-is
  let value = match[1];
  if (value.length === 3) {
    value = value
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const SWEEP_WIDTH = 120; // px width of the moving highlight band

interface ShimmerBarProps {
  width: `${number}%` | number;
  height: number;
  radius?: number;
  baseColor: string;
  highlightColor: string;
}

/** One shimmering bar/circle — a light band sweeps across it on a loop. */
function ShimmerBar({
  width,
  height,
  radius = 4,
  baseColor,
  highlightColor,
}: ShimmerBarProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1100, easing: Easing.linear }),
      -1,
      false,
    );
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const distance = containerWidth + SWEEP_WIDTH;
    return {
      transform: [{ translateX: -SWEEP_WIDTH + progress.value * distance }],
    };
  });

  return (
    <View
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      style={{
        width,
        height,
        borderRadius: radius,
        overflow: "hidden",
        backgroundColor: baseColor,
      }}
    >
      {containerWidth > 0 && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            animatedStyle,
            { width: SWEEP_WIDTH },
          ]}
        >
          <LinearGradient
            colors={["transparent", highlightColor, "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      )}
    </View>
  );
}

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
            width={40}
            height={40}
            radius={20}
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
