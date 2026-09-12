import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { ScreenHeader } from "@/src/components/screen-header/screen-header";
import { SearchBar } from "@/src/components/search-bar";
import {
  CategoryFilterDropdown,
  CategoryFilterValue,
} from "@/src/components/tasks/category-filter-dropdown";
import { TaskCard } from "@/src/components/tasks/task-card";
import { useGetCompletedTasksQuery } from "@/src/rtk/tasks-api-slice";
import { useTheme } from "@/src/theme";
import { TasksSkeleton } from "@/src/utils/tasks-skeleton";

function CompletedTasksScreen() {
  const { colors, spacing } = useTheme();
  const { data: tasks = [], isLoading } = useGetCompletedTasksQuery();
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<CategoryFilterValue>("all");

  console.log("DATA", tasks);
  

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesCategory =
        categoryId === "all" || task.category_id === categoryId;
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [tasks, search, categoryId]);

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Completed Tasks" />

      <View style={{ paddingHorizontal: spacing[16], paddingTop: spacing[12] }}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search completed tasks"
        />
      </View>

      <View style={{ paddingHorizontal: spacing[16], paddingTop: spacing[12] }}>
        <CategoryFilterDropdown value={categoryId} onChange={setCategoryId} />
      </View>

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

export default CompletedTasksScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  listScroll: {
    flex: 1,
  },
});
