import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenHeader } from "@/src/components/screen-header/screen-header";
import { SearchBar } from "@/src/components/search-bar";
import { TaskCard, TaskCardStatus } from "@/src/components/tasks/task-card";
import { useAddButtonHandler } from "@/src/navigation/add-button-context";
import { useGetTasksQuery } from "@/src/rtk/tasks-api-slice";
import { useTheme } from "@/src/theme";
import { TasksSkeleton } from "@/src/utils/tasks-skeleton";

type FilterValue = "All" | TaskCardStatus;

const FILTER_TABS: { label: string; value: FilterValue }[] = [
  { label: "All", value: "All" },
  { label: "To do", value: "To-do" },
  { label: "Completed", value: "Done" },
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
      const matchesStatus =
        filter === "All" || (task.completed ? "Done" : "To-do") === filter;
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [tasks, filter, search]);

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenHeader title={name} />

      <View style={{ paddingHorizontal: spacing[16], paddingTop: spacing[12] }}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search tasks"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScroll}
        contentContainerStyle={[
          styles.tabsRow,
          { paddingHorizontal: spacing[16], paddingVertical: spacing[12] },
        ]}
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
                  { color: isActive ? colors.onPrimary : colors.primary },
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {isLoading ? (
        <TasksSkeleton />
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
              style={index > 0 ? { marginTop: spacing[16] } : undefined}
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
  tabsScroll: {
    flexGrow: 0,
    flexShrink: 0,
  },
  listScroll: {
    flex: 1,
  },
  tabsRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
});
