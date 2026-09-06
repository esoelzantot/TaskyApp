import { useTheme } from "@/src/theme";
import { Pressable, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import styles from "./home-progress-card-styles";

const RING_SIZE = 100;
const RING_WIDTH = 10;

export interface HomeProgressCardProps {
  percentage: number;
  title?: string;
  onViewTasksPress?: () => void;
  onMenuPress?: () => void;
}

export function HomeProgressCard({
  percentage,
  title = "Your Today is\nAlmost Done!",
  onViewTasksPress,
  onMenuPress,
}: HomeProgressCardProps) {
  const theme = useTheme();
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.primary,
          borderRadius: theme.radii.banner,
          padding: theme.spacing[24],
          ...theme.elevation.level2,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.left}>
          <Text
            style={[
              theme.typography.heading2,
              { color: theme.colors.onPrimary },
            ]}
          >
            {title}
          </Text>

          <Pressable
            onPress={onViewTasksPress}
            style={[
              styles.viewTasksButton,
              {
                backgroundColor: theme.colors.primarySurface,
                borderRadius: theme.radii.full,
                paddingVertical: theme.spacing[12],
                paddingHorizontal: theme.spacing[24],
                marginTop: theme.spacing[20],
              },
            ]}
          >
            <Text
              style={[
                theme.typography.bodyBold,
                { color: theme.colors.primary },
              ]}
            >
              View Tasks
            </Text>
          </Pressable>
        </View>

        <AnimatedCircularProgress
          size={RING_SIZE}
          width={RING_WIDTH}
          fill={clampedPercentage}
          rotation={0}
          lineCap="round"
          tintColor={theme.colors.onPrimary}
          backgroundColor={theme.colors.primaryLight}
        >
          {() => (
            <Text
              style={[
                theme.typography.subtitle,
                { color: theme.colors.onPrimary },
              ]}
            >
              {`${Math.round(clampedPercentage)}%`}
            </Text>
          )}
        </AnimatedCircularProgress>
      </View>
    </View>
  );
}
