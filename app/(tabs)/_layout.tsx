import { Tabs } from "expo-router";

import { BottomTabBar } from "@/src/components/bottom-tab-bar/bottom-tab-bar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => (
        <BottomTabBar
          {...props}
          onAddPress={() => {
            // TODO: wire up once an "add task" screen/flow exists.
          }}
        />
      )}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="calendar" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
