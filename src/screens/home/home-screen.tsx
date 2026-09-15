import { CategoryDialog } from "@/src/components/dialogs/category-dialog";
import { HomeHeader } from "@/src/components/home-header/home-header";
import { HomeProgressCard } from "@/src/components/home-progress-card/home-progress-card";
import { InProgressSection } from "@/src/components/in-progress-section/in-progress-section";
import { TaskGroupsSection } from "@/src/components/task-groups-section/task-groups-section";

import { useAddButtonHandler } from "@/src/navigation/add-button-context";
import { useCreateCategoryMutation } from "@/src/rtk/categories-api-slice";
import { useTheme } from "@/src/theme";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [createCategory] = useCreateCategoryMutation();

  const [isCreateCategoryVisible, setCreateCategoryVisible] = useState(false);

  useAddButtonHandler(() => {
    setCreateCategoryVisible(true);
  });

  const handleCreateCategory = async (name: string) => {
    // TODO: call the real create-category mutation once it exists on
    await createCategory({ name: name }).unwrap();
    console.log("create category:", name);
    setCreateCategoryVisible(false);
  };

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
          <HomeProgressCard />
        </View>

        <View style={{ marginTop: theme.spacing[24] }}>
          <InProgressSection />
        </View>

        <View style={{ marginTop: theme.spacing[24] }}>
          <TaskGroupsSection />
        </View>
      </ScrollView>

      <CategoryDialog
        title="Add a Category"
        visible={isCreateCategoryVisible}
        onClose={() => setCreateCategoryVisible(false)}
        onSubmit={handleCreateCategory}
      />
    </>
  );
}
