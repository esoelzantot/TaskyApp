import { Tabs } from "expo-router";

import { BottomTabBar } from "@/src/components/bottom-tab-bar/bottom-tab-bar";
import {
  AddButtonProvider,
  useAddButtonTrigger,
} from "@/src/navigation/add-button-context";

function TabBar(props: React.ComponentProps<typeof BottomTabBar>) {
  const triggerAdd = useAddButtonTrigger();
  return <BottomTabBar {...props} onAddPress={triggerAdd} />;
}

export default function TabLayout() {
  return (
    <AddButtonProvider>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="calendar" />
        <Tabs.Screen name="history" />
        <Tabs.Screen name="profile" />
        {/* ===== HIDDEN SCREENS ===== */}
        <Tabs.Screen name="category-tasks/[id]" options={{ href: null }} />
      </Tabs>
    </AddButtonProvider>
  );
}
