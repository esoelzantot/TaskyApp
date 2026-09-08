import React from "react";
import { FlatList, Text, View } from "react-native";

import { useGetCategoriesQuery } from "@/src/rtk/categories-api-slice";
import { useTheme } from "@/src/theme";

import { CategoryCard } from "./category-card";
import styles from "./task-groups-section-styles";

export interface TaskGroup {
  id: string;
  name: string;
}

export function TaskGroupsSection() {
  const theme = useTheme();
  const { data: categories, isLoading } = useGetCategoriesQuery();

  const groups: TaskGroup[] = (categories ?? []).map((category) => ({
    id: String(category.id),
    name: category.name,
  }));

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

      <FlatList
        data={isLoading ? [] : groups}
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
    </View>
  );
}
