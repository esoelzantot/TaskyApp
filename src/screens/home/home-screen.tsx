import { CreateCategoryDialog } from "@/src/components/dialogs/create-category-dialog";
import { HomeHeader } from "@/src/components/home-header/home-header";
import { HomeProgressCard } from "@/src/components/home-progress-card/home-progress-card";
import { InProgressSection } from "@/src/components/in-progress-section/in-progress-section";
import { TaskGroupsSection } from "@/src/components/task-groups-section/task-groups-section";

import { useAddButtonHandler } from "@/src/navigation/add-button-context";
import { useTheme } from "@/src/theme";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [isCreateCategoryVisible, setCreateCategoryVisible] = useState(false);

  useAddButtonHandler(() => {
    setCreateCategoryVisible(true);
  });

  const handleCreateCategory = (name: string) => {
    // TODO: call the real create-category mutation once it exists on
    console.log("create category:", name);
    setCreateCategoryVisible(false);
  };

  // TODO: replace with real data from the tasks API once it exists.
  const PLACEHOLDER_IN_PROGRESS_TASKS = [
    {
      id: "1",
      category: "Office Project",
      title: "Grocery shopping app design",
    },
    {
      id: "2",
      category: "Personal Project",
      title: "Uber Eats redesign challenge",
    },
    { id: "3", category: "Office Project", title: "Onboarding flow revamp" },
  ];

  // TODO: replace with real data from the categories API once it exists.
  const PLACEHOLDER_TASK_GROUPS = [
    { id: "1", name: "Office Project", taskCount: 23 },
    { id: "2", name: "Personal Project", taskCount: 30 },
    { id: "3", name: "Daily Study", taskCount: 30 },
  ];

  return (
    <>
      <ScrollView
        style={[{ backgroundColor: theme.colors.background }]}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing[24],
          paddingTop: insets.top + theme.spacing[16],
          paddingBottom: theme.spacing[24],
        }}
      >
        <View>
          {/* TODO: replace with the signed-in user's real name/avatar once auth exists. */}
          <HomeHeader userName="User" />
        </View>

        <View style={{ marginTop: theme.spacing[24] }}>
          {/* TODO: replace with the real "completed today / total today" ratio once tasks exist. */}
          <HomeProgressCard percentage={85} />
        </View>

        <View style={{ marginTop: theme.spacing[24] }}>
          <InProgressSection tasks={PLACEHOLDER_IN_PROGRESS_TASKS} />
        </View>

        <View style={{ marginTop: theme.spacing[24] }}>
          <TaskGroupsSection groups={PLACEHOLDER_TASK_GROUPS} />
        </View>
      </ScrollView>

      <CreateCategoryDialog
        visible={isCreateCategoryVisible}
        onClose={() => setCreateCategoryVisible(false)}
        onSubmit={handleCreateCategory}
      />
    </>
  );
}
