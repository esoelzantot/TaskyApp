import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Image, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./bottom-tab-bar-styles";

import AppAssets from "@/src/constants/app-assets";
import { useTheme } from "@/src/theme";
import { router } from "expo-router";

/** Route name → its icon. Add an entry here for every tab this bar renders. */
const ICON_BY_ROUTE_NAME: Record<string, number> = {
  index: AppAssets.HOME_ICON,
  calendar: AppAssets.CALENDAR_ICON,
  history: AppAssets.HISTORY_ICON,
  profile: AppAssets.PROFILE_ICON,
};

const FAB_SIZE = 64;

export interface BottomTabBarWithFabProps extends BottomTabBarProps {
  onAddPress?: () => void;
}

export function BottomTabBar({
  state,
  navigation,
  onAddPress,
}: BottomTabBarWithFabProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const renderTabIcon = (
    route: (typeof state.routes)[number],
    index: number,
  ) => {
    const icon = ICON_BY_ROUTE_NAME[route.name];
    if (!icon) return null;

    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    return (
      <Pressable
        key={route.key}
        onPress={onPress}
        hitSlop={12}
        style={styles.tabButton}
      >
        <View
          style={[
            styles.tabIconHighlight,
            {
              backgroundColor: isFocused
                ? theme.colors.primarySurface
                : "transparent",
              borderRadius: theme.radii.full,
            },
          ]}
        >
          <Image source={icon} style={styles.tabIcon} resizeMode="contain" />
        </View>
      </Pressable>
    );
  };

  const leftRoutes = state.routes.slice(0, 2);
  const rightRoutes = state.routes.slice(2, 4);

  return (
    <View
      style={[
        styles.wrapper,
        { paddingBottom: insets.bottom || theme.spacing[16] },
      ]}
      pointerEvents="box-none"
    >
      <View
        style={[
          styles.bar,
          {
            backgroundColor: theme.colors.primaryMuted,
            borderRadius: theme.radii.banner,
            marginHorizontal: theme.spacing[16],
          },
        ]}
      >
        <View style={styles.tabGroup}>
          {leftRoutes.map((route, index) => renderTabIcon(route, index))}
        </View>
        <View style={{ width: FAB_SIZE + theme.spacing[16] }} />
        <View style={styles.tabGroup}>
          {rightRoutes.map((route, index) => renderTabIcon(route, index + 2))}
        </View>
      </View>

      <Pressable
        onPress={() => router.push("/add-task")}
        style={[
          styles.fab,
          {
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radii.full,
            ...theme.elevation.level2,
          },
        ]}
      >
        <Image
          source={AppAssets.ADD_ICON}
          style={[styles.fabIcon, { tintColor: theme.colors.onPrimary }]}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
}
