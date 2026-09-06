import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "./screen-header-styles";

import AppAssets from "@/src/constants/app-assets";
import { useTheme, useThemeMode } from "@/src/theme";

export interface ScreenHeaderProps {
  title: string;
  hasUnreadNotifications?: boolean;
  onNotificationPress?: () => void;
}

export function ScreenHeader({
  title,
  hasUnreadNotifications = false,
  onNotificationPress,
}: ScreenHeaderProps) {
  const theme = useTheme();
  const { mode } = useThemeMode();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const arrowIcon =
    mode !== "dark" ? AppAssets.ARROW_LIGHT_ICON : AppAssets.ARROW_DARK_ICON;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          paddingTop: insets.top + theme.spacing[12],
          paddingHorizontal: theme.spacing[24],
          paddingBottom: theme.spacing[12],
        },
      ]}
    >
      <Pressable
        onPress={() => router.back()}
        hitSlop={12}
        style={styles.sideSlot}
      >
        <Image
          source={arrowIcon}
          style={styles.arrowIcon}
          resizeMode="contain"
        />
      </Pressable>

      <View style={styles.titleSlot}>
        <Text
          style={[
            theme.typography.heading1,
            { color: theme.colors.textPrimary },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      <Pressable
        onPress={onNotificationPress}
        hitSlop={12}
        style={[styles.sideSlot, styles.bellSlot]}
      >
        <Image
          source={AppAssets.NOTIFICATION_ICON}
          style={styles.bellIcon}
          resizeMode="contain"
        />
        {hasUnreadNotifications && (
          <View
            style={[
              styles.badge,
              {
                backgroundColor: theme.colors.primary,
                borderColor: theme.colors.background,
              },
            ]}
          />
        )}
      </Pressable>
    </View>
  );
}
