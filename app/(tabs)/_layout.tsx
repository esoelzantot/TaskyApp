import { Tabs } from "expo-router";

import {
  BottomTabBar,
  BottomTabBarWithFabProps,
} from "@/src/components/bottom-tab-bar/bottom-tab-bar";
import {
  AddButtonProvider,
  useAddButtonTrigger,
} from "@/src/navigation/add-button-context";

function TabBar(
  props: Parameters<
    NonNullable<React.ComponentProps<typeof Tabs>["tabBar"]>
  >[0],
) {
  const triggerAdd = useAddButtonTrigger();
  return (
    <BottomTabBar
      {...(props as unknown as BottomTabBarWithFabProps)}
      onAddPress={triggerAdd}
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surfaceMuted,
          borderTopColor: colors.border,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="planner"
        options={{
          title: 'Planner',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
        }}
      />
    </Tabs>
  );
}
