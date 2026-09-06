import type { ThemeColors } from "@/src/theme";
import { useTheme } from "@/src/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FlatList, Pressable, Text, View } from "react-native";
import styles from "./in-progress-section-styles";

export interface InProgressTask {
  id: string;
  category: string;
  title: string;
}

export interface InProgressSectionProps {
  tasks: InProgressTask[];
  count?: number;
  onTaskPress?: (taskId: string) => void;
}

/** The only two card colors used here — alternated by index, never chosen per-category. */
function getCardColor(colors: ThemeColors, index: number): string {
  return index % 2 === 0 ? colors.accentBlueLight : colors.accentOrangeLight;
}

export function InProgressSection({
  tasks,
  count,
  onTaskPress,
}: InProgressSectionProps) {
  const theme = useTheme();

  return (
    <View>
      <View style={styles.header}>
        <Text
          style={[
            theme.typography.heading1,
            { color: theme.colors.textPrimary },
          ]}
        >
          In Progress
        </Text>
        <View
          style={[
            styles.countBadge,
            {
              backgroundColor: theme.colors.primarySurface,
              borderRadius: theme.radii.full,
            },
          ]}
        >
          <Text
            style={[theme.typography.bodyBold, { color: theme.colors.primary }]}
          >
            {count ?? tasks.length}
          </Text>
        </View>
      </View>

      <FlatList
        horizontal
        data={tasks}
        keyExtractor={(task) => task.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: theme.spacing[16],
          paddingTop: theme.spacing[16],
        }}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => onTaskPress?.(item.id)}
            style={[
              styles.card,
              {
                backgroundColor: getCardColor(theme.colors, index),
                borderRadius: theme.radii.card,
                padding: theme.spacing[16],
              },
            ]}
          >
            {/* Row 1: category name + the fixed icon */}
            <View style={styles.topRow}>
              <Text
                style={[
                  theme.typography.body,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {item.category}
              </Text>

              <View
                style={[
                  styles.iconBadge,
                  {
                    backgroundColor: theme.colors.accentPinkLight,
                    borderRadius: theme.radii.md,
                  },
                ]}
              >
                <MaterialIcons
                  name="work"
                  size={18}
                  color={theme.colors.accentPink}
                />
              </View>
            </View>

            {/* Row 2: task title */}
            <Text
              style={[
                theme.typography.subtitle,
                {
                  marginTop: theme.spacing[10],
                },
              ]}
              numberOfLines={2}
            >
              {item.title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
