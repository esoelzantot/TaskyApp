import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ScreenHeader } from "@/src/components/screen-header/screen-header";
import { ShimmerBar, withAlpha } from "@/src/utils/shimmer-bar";
import { useTheme } from "@/src/theme";

/** Skeleton placeholder shown while a task's details are loading (app/task/[id].tsx). */
export function TaskDetailsSkeleton() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const baseColor = withAlpha(theme.colors.border, 0.14);
  const highlightColor = withAlpha(theme.colors.border, 0.34);

  return (
    <View style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <ScreenHeader title="Task Details" />

      <View
        style={{
          padding: theme.spacing[16],
          paddingTop: insets.top + theme.spacing[12],
        }}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radii.card,
              padding: theme.spacing[16],
            },
            theme.elevation.level1,
          ]}
        >
          <View style={styles.topRow}>
            <ShimmerBar
              width={110}
              height={36}
              radius={theme.radii.full}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            <View style={styles.completedRow}>
              <ShimmerBar
                width={70}
                height={14}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
              <View style={{ width: theme.spacing[8] }} />
              <ShimmerBar
                width={24}
                height={24}
                radius={theme.radii.sm}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
            </View>
          </View>

          <View style={{ marginTop: theme.spacing[20] }}>
            <ShimmerBar
              width="30%"
              height={12}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            <View style={{ height: theme.spacing[8] }} />
            <ShimmerBar
              width="70%"
              height={22}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          </View>

          <View
            style={[
              styles.divider,
              {
                backgroundColor: theme.colors.border,
                marginVertical: theme.spacing[16],
              },
            ]}
          />

          <View>
            <ShimmerBar
              width="30%"
              height={12}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            <View style={{ height: theme.spacing[8] }} />
            <ShimmerBar
              width="95%"
              height={14}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            <View style={{ height: theme.spacing[8] }} />
            <ShimmerBar
              width="80%"
              height={14}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          </View>

          <View
            style={[
              styles.divider,
              {
                backgroundColor: theme.colors.border,
                marginVertical: theme.spacing[16],
              },
            ]}
          />

          <View style={styles.metaRow}>
            <View style={styles.metaColumn}>
              <ShimmerBar
                width="50%"
                height={12}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
              <View style={{ height: theme.spacing[8] }} />
              <ShimmerBar
                width={90}
                height={18}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
            </View>
            <View style={styles.metaColumn}>
              <ShimmerBar
                width="50%"
                height={12}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
              <View style={{ height: theme.spacing[8] }} />
              <ShimmerBar
                width={80}
                height={32}
                radius={theme.radii.full}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
            </View>
          </View>
        </View>

        <View
          style={[
            styles.buttonRow,
            { marginTop: theme.spacing[24], gap: theme.spacing[12] },
          ]}
        >
          <ShimmerBar
            width="47%"
            height={48}
            radius={theme.radii.button}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
          <ShimmerBar
            width="47%"
            height={48}
            radius={theme.radii.button}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  card: {
    width: "100%",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    height: 1,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaColumn: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
  },
});
