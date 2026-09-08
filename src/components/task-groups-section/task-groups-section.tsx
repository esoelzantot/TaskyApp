import type { ThemeColors } from "@/src/theme";
import { useTheme } from "@/src/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import styles from "./task-groups-section-styles";

export interface TaskGroup {
  id: string;
  name: string;
  taskCount: number;
}

export interface TaskGroupsSectionProps {
  groups: TaskGroup[];
  count?: number;
  onGroupPress?: (groupId: string) => void;
}

type GroupIconName = "work" | "person" | "menu-book";

interface GroupIconStyle {
  icon: GroupIconName;
  backgroundColor: string;
  iconColor: string;
}

/**
 * The only three icon+color combos used here — cycled by index, never
 * chosen per-group-name. Add a fourth combo here (not a per-name
 * lookup) if a 4th visual variant is ever needed.
 */
function getGroupIconStyle(colors: ThemeColors, index: number): GroupIconStyle {
  const combos: GroupIconStyle[] = [
    {
      icon: "work",
      backgroundColor: colors.accentPinkLight,
      iconColor: colors.accentPink,
    },
    {
      icon: "person",
      backgroundColor: colors.primarySurface,
      iconColor: colors.primary,
    },
    {
      icon: "menu-book",
      backgroundColor: colors.accentOrangeLight,
      iconColor: colors.accentOrange,
    },
  ];
  return combos[index % combos.length];
}

export function TaskGroupsSection({
  groups,
  count,
  onGroupPress,
}: TaskGroupsSectionProps) {
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
          Task Groups
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
            {count ?? groups.length}
          </Text>
        </View>
      </View>

      <FlatList
        data={groups}
        keyExtractor={(group) => group.id}
        scrollEnabled={false}
        contentContainerStyle={{
          gap: theme.spacing[16],
          paddingTop: theme.spacing[16],
        }}
        renderItem={({ item, index }) => {
          const iconStyle = getGroupIconStyle(theme.colors, index);

          return (
            <Pressable
              onPress={() =>
                // router.push({
                //   pathname: "/category-tasks/[id]",
                //   params: { id: String(42), name: "GIG Program" },
                // })

                router.push({
                  pathname: "/task/[id]" as any,
                  params: {
                    id: "2",
                    categoryId: "42",
                    projectName: "Ticket Creation",
                    description:
                      "Open the Order List section of the DR sheet, add the remaining waybills next to the Waybills column, filter for duplicates, and delete them.",
                    dueDate: "01/01/2024",
                    priority: "High",
                    status: "Completed",
                  },
                })
              }
              style={[
                styles.card,
                {
                  backgroundColor: theme.colors.surface,
                  borderRadius: theme.radii.card,
                  padding: theme.spacing[16],
                  gap: theme.spacing[16],
                  ...theme.elevation.level1,
                },
              ]}
            >
              <View
                style={[
                  styles.iconBadge,
                  {
                    backgroundColor: iconStyle.backgroundColor,
                    borderRadius: theme.radii.md,
                  },
                ]}
              >
                <MaterialIcons
                  name={iconStyle.icon}
                  size={24}
                  color={iconStyle.iconColor}
                />
              </View>

              <View>
                <Text
                  style={[
                    theme.typography.title,
                    { color: theme.colors.textPrimary },
                  ]}
                >
                  {item.name}
                </Text>
                <Text
                  style={[
                    theme.typography.body,
                    {
                      color: theme.colors.textSecondary,
                      marginTop: theme.spacing[4],
                    },
                  ]}
                >
                  {item.taskCount} Tasks
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
