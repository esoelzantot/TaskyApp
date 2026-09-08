import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import type { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/src/rtk/categories-api-slice";

import type { ThemeColors } from "@/src/theme";
import { useTheme } from "@/src/theme";

import { CategoryDialog } from "@/src/components/dialogs/category-dialog";
import type { TaskGroup } from "./task-groups-section";
import styles from "./task-groups-section-styles";

type GroupIconName = "work" | "person" | "menu-book";

interface GroupIconStyle {
  icon: GroupIconName;
  backgroundColor: string;
  iconColor: string;
}

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

export interface CategoryCardProps {
  group: TaskGroup;
  index: number;
}

export function CategoryCard({ group, index }: CategoryCardProps) {
  const theme = useTheme();
  const swipeableRef = useRef<SwipeableMethods>(null);
  const iconStyle = getGroupIconStyle(theme.colors, index);
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isUpdateCategoryVisible, setUpdateCategoryVisible] = useState(false);

  const handlePress = () => {
    router.push({
      pathname: "/category-tasks/[id]",
      params: { id: group.id, name: group.name },
    });
  };

  const handleEdit = async (name: string) => {
    swipeableRef.current?.close();
    await updateCategory({ id: group.id, name: name }).unwrap();
    console.log("update category:", name);
    setUpdateCategoryVisible(false);
  };

  const handleDelete = () => {
    swipeableRef.current?.close();
    Alert.alert(
      "Delete Task Group",
      `Delete "${group.name}"? This can't be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteCategory(group.id)
              .unwrap()
              .catch(() => {
                Alert.alert(
                  "Something went wrong",
                  "Couldn't delete this group. Please try again.",
                );
              });
          },
        },
      ],
    );
  };

  return (
    <>
      <ReanimatedSwipeable
        ref={swipeableRef}
        friction={2}
        rightThreshold={32}
        overshootRight={false}
        renderRightActions={() => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: theme.spacing[12],
            }}
          >
            <Pressable
              onPress={() => setUpdateCategoryVisible(true)}
              style={{
                backgroundColor: theme.colors.primary,
                width: 56,
                height: "100%",
                borderRadius: theme.radii.card,
                alignItems: "center",
                justifyContent: "center",
                marginRight: theme.spacing[8],
              }}
            >
              <MaterialIcons
                name="edit"
                size={22}
                color={theme.colors.onPrimary}
              />
            </Pressable>
            <Pressable
              onPress={handleDelete}
              style={{
                backgroundColor: theme.colors.error,
                width: 56,
                height: "100%",
                borderRadius: theme.radii.card,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialIcons
                name="delete"
                size={22}
                color={theme.colors.onError}
              />
            </Pressable>
          </View>
        )}
      >
        <Pressable
          onPress={handlePress}
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
              {group.name}
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
              Open View Tasks
            </Text>
          </View>
        </Pressable>
      </ReanimatedSwipeable>

      <CategoryDialog
        title="Add a Category"
        visible={isUpdateCategoryVisible}
        onClose={() => setUpdateCategoryVisible(false)}
        onSubmit={handleEdit}
      />
    </>
  );
}
