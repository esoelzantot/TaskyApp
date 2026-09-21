import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { ScreenHeader } from "@/src/components/screen-header/screen-header";
import { SearchBar } from "@/src/components/search-bar";
import { TaskCard } from "@/src/components/tasks/task-card";
import { TasksEmpty } from "@/src/components/tasks/tasks-empty";
import { useAddButtonHandler } from "@/src/navigation/add-button-context";
import { useGetTasksQuery } from "@/src/rtk/tasks-api-slice";
import { useTheme } from "@/src/theme";
import { TasksSkeleton } from "@/src/utils/tasks-skeleton";

type FilterValue = "All" | "To-do" | "Done";

type PriorityValue = "All" | "Low" | "Medium" | "High";

const FILTER_TABS: {
  label: string;
  value: FilterValue;
}[] = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "To do",
    value: "To-do",
  },
  {
    label: "Done",
    value: "Done",
  },
];

const PRIORITY_OPTIONS: {
  label: string;
  value: PriorityValue;
}[] = [
  {
    label: "Priority",
    value: "All",
  },
  {
    label: "Low",
    value: "Low",
  },
  {
    label: "Medium",
    value: "Medium",
  },
  {
    label: "High",
    value: "High",
  },
];

interface CategoryTasksScreenProps {
  categoryId: string;
  name: string;
}

export function CategoryTasksScreen({
  categoryId,
  name,
}: CategoryTasksScreenProps) {
  const { colors, typography, spacing, radii } = useTheme();
  const router = useRouter();

  const [filter, setFilter] = useState<FilterValue>("All");
  const [priority, setPriority] = useState<PriorityValue>("All");
  const [search, setSearch] = useState("");

  const { data: tasks = [], isLoading } = useGetTasksQuery({
    category_id: Number(categoryId),
  });

  useAddButtonHandler(
    useCallback(() => {
      router.push({
        pathname: "/add-task",
        params: { categoryId },
      });
    }, [router, categoryId]),
  );

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      // Status filter
      const matchesStatus =
        filter === "All" || (task.completed ? "Done" : "To-do") === filter;

      // Priority filter
      const matchesPriority = priority === "All" || task.priority === priority;

      // Search filter
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);

      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [tasks, filter, priority, search]);

  return (
    <View
      style={[
        styles.flex,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <ScreenHeader title={name} />

      {/* Search */}
      <View
        style={{
          paddingHorizontal: spacing[16],
          paddingTop: spacing[12],
        }}
      >
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search tasks"
        />
      </View>

      {/* Filters Row */}
      <View
        style={[
          styles.filtersContainer,
          {
            paddingHorizontal: spacing[16],
            paddingVertical: spacing[12],
          },
        ]}
      >
        {/* Status Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsScroll}
          contentContainerStyle={styles.tabsRow}
        >
          {FILTER_TABS.map((tab) => {
            const isActive = tab.value === filter;

            return (
              <Pressable
                key={tab.value}
                onPress={() => setFilter(tab.value)}
                style={[
                  styles.tab,
                  {
                    backgroundColor: isActive
                      ? colors.primary
                      : colors.primarySurface,
                    borderRadius: radii.full,
                    paddingHorizontal: spacing[16],
                    paddingVertical: spacing[10],
                    marginRight: spacing[8],
                  },
                ]}
              >
                <Text
                  style={[
                    typography.bodyBold,
                    {
                      color: isActive ? colors.onPrimary : colors.primary,
                    },
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Priority Dropdown */}
        <Dropdown
          data={PRIORITY_OPTIONS}
          labelField="label"
          valueField="value"
          value={priority}
          onChange={(item) => setPriority(item.value as PriorityValue)}
          style={[
            styles.priorityDropdown,
            {
              backgroundColor: colors.primarySurface,
              borderRadius: radii.full,
            },
          ]}
          containerStyle={[
            styles.priorityDropdownContainer,
            {
              backgroundColor: colors.surface,
              borderRadius: radii.md,
            },
          ]}
          itemContainerStyle={{
            borderRadius: radii.sm,
          }}
          activeColor={colors.primarySurface}
          selectedTextStyle={[
            typography.bodyBold,
            {
              color: colors.primary,
            },
          ]}
          placeholderStyle={[
            typography.bodyBold,
            {
              color: colors.primary,
            },
          ]}
          itemTextStyle={[
            typography.body,
            {
              color: colors.textPrimary,
            },
          ]}
          renderRightIcon={() => (
            <Ionicons name="chevron-down" size={16} color={colors.primary} />
          )}
        />
      </View>

      {/* Tasks */}
      {isLoading ? (
        <TasksSkeleton />
      ) : filteredTasks.length === 0 ? (
        <TasksEmpty />
      ) : (
        <ScrollView
          style={styles.listScroll}
          contentContainerStyle={{
            padding: spacing[16],
            paddingBottom: spacing[24] * 3,
          }}
          showsVerticalScrollIndicator={false}
        >
          {filteredTasks.map((task, index) => (
            <View
              key={task.id}
              style={
                index > 0
                  ? {
                      marginTop: spacing[16],
                    }
                  : undefined
              }
            >
              <TaskCard task={task} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  tabsScroll: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },

  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  tab: {
    alignItems: "center",
    justifyContent: "center",
  },

  priorityDropdown: {
    width: 128,
    height: 40,
    paddingHorizontal: 12,
    marginLeft: 8,
  },

  priorityDropdownContainer: {
    borderWidth: 0,
    marginTop: 8,
    paddingVertical: 4,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  listScroll: {
    flex: 1,
  },
});
