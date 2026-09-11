import { useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";

import { SearchBar } from "@/src/components/search-bar";
import { useGetCategoriesQuery } from "@/src/rtk/categories-api-slice";
import { useTheme } from "@/src/theme";

import { CategoriesSkeleton } from "@/src/utils/categories-skeleton";
import { CategoryCard } from "./category-card";
import styles from "./task-groups-section-styles";

export interface TaskGroup {
  id: string;
  name: string;
  /** Not returned by GET /categories/ yet — omitted until a "tasks per category" count exists. */
  taskCount?: number;
}

export function TaskGroupsSection() {
  const theme = useTheme();
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [search, setSearch] = useState("");

  const groups: TaskGroup[] = (categories ?? []).map((category) => ({
    id: String(category.id),
    name: category.name,
  }));

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return groups;
    return groups.filter((group) => group.name.toLowerCase().includes(query));
  }, [groups, search]);

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
            {isLoading ? "-" : groups.length}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: theme.spacing[16] }}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search task groups"
        />
      </View>

      {isLoading ? (
        <CategoriesSkeleton />
      ) : (
        <FlatList
          data={filteredGroups}
          keyExtractor={(group) => group.id}
          scrollEnabled={false}
          contentContainerStyle={{
            gap: theme.spacing[16],
            paddingTop: theme.spacing[16],
          }}
          renderItem={({ item, index }) => (
            <CategoryCard group={item} index={index} />
          )}
        />
      )}
    </View>
  );
}
