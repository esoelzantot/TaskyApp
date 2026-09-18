import AppAssets from "@/src/constants/app-assets";
import { useUserName } from "@/src/rtk/use-user-name";
import { useTheme, useThemeMode } from "@/src/theme";
import { Image, Pressable, Text, View } from "react-native";

import styles from "./home-header-styles";

export interface HomeHeaderProps {
  hasUnreadNotifications?: boolean;
  onNotificationPress?: () => void;
}

export function HomeHeader({
  hasUnreadNotifications = true,
  onNotificationPress,
}: HomeHeaderProps) {
  const theme = useTheme();
  const { mode, setMode } = useThemeMode();

  const userName = useUserName();

  const handleToggleTheme = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  const themeIcon =
    mode !== "dark" ? AppAssets.MOON_LIGHT_ICON : AppAssets.SUN_DARK_ICON;

  const userInitial = userName.trim()
    ? userName.trim().charAt(0).toUpperCase()
    : "G";

  return (
    <View style={styles.row}>
      <View style={styles.userInfo}>
        <View
          style={[
            styles.avatar,
            styles.avatarFallback,
            {
              backgroundColor: theme.colors.primaryLight,
            },
          ]}
        >
          <Text
            style={[
              theme.typography.heading2,
              {
                color: theme.colors.onPrimary,
              },
            ]}
          >
            {userInitial}
          </Text>
        </View>

        <View style={{ marginLeft: theme.spacing[12] }}>
          <Text
            style={[
              theme.typography.body,
              {
                color: theme.colors.textSecondary,
                fontSize: 16,
              },
            ]}
          >
            Hello!
          </Text>

          <Text
            style={[
              theme.typography.heading1,
              styles.userName,
              {
                color: theme.colors.textPrimary,
              },
            ]}
            numberOfLines={1}
          >
            {userName.split(" ")[0] || "Guest"}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={handleToggleTheme}
          hitSlop={12}
          style={[
            styles.bellButton,
            {
              marginRight: theme.spacing[12],
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel={
            mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          <Image
            source={themeIcon}
            style={styles.bellIcon}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
}
