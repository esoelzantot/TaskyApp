import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export function withAlpha(hex: string, alpha: number): string {
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

export interface ShimmerBarProps {
  width: `${number}%` | number;
  height: `${number}%` | number;
  radius?: number;
  baseColor: string;
  highlightColor: string;
}

export function ShimmerBar({
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
