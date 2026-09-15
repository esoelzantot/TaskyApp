import { useGetActiveTasksQuery } from "@/src/rtk/tasks-api-slice";
import type { ThemeColors } from "@/src/theme";
import { useTheme } from "@/src/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import styles from "./in-progress-section-styles";

/** The only two card colors used here — alternated by index. */
function getCardColor(colors: ThemeColors, index: number): string {
  return index % 2 === 0 ? colors.accentBlueLight : colors.accentOrangeLight;
}

export function InProgressSection() {
  const theme = useTheme();

  const {
    data: tasks = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetActiveTasksQuery();

  const handlePress = (id: number | string) => {
    router.push({
      pathname: "/task/[id]",
      params: { id: String(id) },
    });
  };

  return (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[
            theme.typography.heading1,
            {
              color: theme.colors.textPrimary,
            },
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
            style={[
              theme.typography.bodyBold,
              {
                color: theme.colors.primary,
              },
            ]}
          >
            {tasks.length}
          </Text>
        </View>
      </View>

      {/* Loading */}
      {isLoading ? (
        <View
          style={{
            paddingTop: theme.spacing[16],
          }}
        >
          <Text
            style={[
              theme.typography.body,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            Loading tasks...
          </Text>
        </View>
      ) : isError ? (
        /* Error */
        <View
          style={{
            paddingTop: theme.spacing[16],
          }}
        >
          <Text
            style={[
              theme.typography.body,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            Failed to load tasks.
          </Text>

          <Pressable
            onPress={refetch}
            style={{
              marginTop: theme.spacing[8],
            }}
          >
            <Text
              style={[
                theme.typography.bodyBold,
                {
                  color: theme.colors.primary,
                },
              ]}
            >
              Try Again
            </Text>
          </Pressable>
        </View>
      ) : tasks.length === 0 ? (
        /* Empty State */
        <View
          style={{
            paddingTop: theme.spacing[16],
          }}
        >
          <Text
            style={[
              theme.typography.body,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            No tasks in progress.
          </Text>
        </View>
      ) : (
        /* Tasks */
        <FlatList
          horizontal
          data={tasks}
          keyExtractor={(task) => String(task.id)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: theme.spacing[16],
            paddingTop: theme.spacing[16],
          }}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => handlePress(item.id)}
              style={[
                styles.card,
                {
                  backgroundColor: getCardColor(theme.colors, index),
                  borderRadius: theme.radii.card,
                  padding: theme.spacing[16],
                },
              ]}
            >
              {/* Category + Icon */}
              <View style={styles.topRow}>
                <Text
                  style={[
                    theme.typography.body,
                    {
                      color: theme.colors.textSecondary,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {item.category_name}
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

              {/* Task Title */}
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
      )}

      {/* Background Refetch Indicator */}
      {isFetching && !isLoading && (
        <View
          style={{
            paddingTop: theme.spacing[8],
          }}
        >
          <Text
            style={[
              theme.typography.body,
              {
                color: theme.colors.textSecondary,
              },
            ]}
          >
            Updating...
          </Text>
        </View>
      )}
    </View>
  );
}
