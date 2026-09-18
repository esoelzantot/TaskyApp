import { Tabs } from "expo-router";

import {
  BottomTabBar,
  BottomTabBarWithFabProps,
} from "@/src/components/bottom-tab-bar/bottom-tab-bar";
import {
  AddButtonProvider,
  useAddButtonTrigger,
} from "@/src/navigation/add-button-context";

const HIDDEN_ADD_BUTTON_ROUTES = ["planner", "completed", "pomodoro"];

function TabBar(
  props: Parameters<
    NonNullable<React.ComponentProps<typeof Tabs>["tabBar"]>
  >[0],
) {
  const triggerAdd = useAddButtonTrigger();

  const currentRoute = props.state.routes[props.state.index]?.name;

  const showAddButton = !HIDDEN_ADD_BUTTON_ROUTES.includes(currentRoute);

  return (
    <BottomTabBar
      {...(props as unknown as BottomTabBarWithFabProps)}
      onAddPress={triggerAdd}
      showAddButton={showAddButton}
    />
  );
}

export default function TabLayout() {
  return (
    <AddButtonProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="planner" />
        <Tabs.Screen name="completed" />
        <Tabs.Screen name="pomodoro" />

        {/* ===== HIDDEN SCREENS ===== */}

        <Tabs.Screen
          name="category-tasks/[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </AddButtonProvider>
  );
}
