import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme, useThemeMode } from "@/src/theme";

const PULSE_TRANSITION = {
  type: "timing",
  duration: 800,
} as const;

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
  const { mode } = useThemeMode();

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
          <Skeleton colorMode={mode} radius="round" height={40} width={40} />
        )}
        <View
          style={[
            styles.content,
            withIcon ? { marginLeft: spacing[12] } : null,
          ]}
        >
          {/* label line */}
          <Skeleton colorMode={mode} height={11} width="35%" />
          <View style={{ height: spacing[8] }} />
          {/* value line(s) */}
          <Skeleton colorMode={mode} height={16} width="70%" />
          {Array.from({ length: extraLines }).map((_, i) => (
            <View key={i}>
              <View style={{ height: spacing[8] }} />
              <Skeleton
                colorMode={mode}
                height={16}
                width={i === extraLines - 1 ? "45%" : "92%"}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

/** Skeleton placeholder shown while the Add/Edit Task form's categories are loading. */
export function FormSkeleton() {
  const { spacing } = useTheme();
  const { mode } = useThemeMode();

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "timing", duration: 200 }}
      style={{ padding: spacing[16] }}
    >
      <Skeleton.Group show>
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
      </Skeleton.Group>
    </MotiView>
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
