import AppAssets from "@/src/constants/app-assets";
import { useTheme, useThemeMode } from "@/src/theme";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./home-header-styles";

export interface HomeHeaderProps {
  userName: string;
  avatarUri?: string;
  hasUnreadNotifications?: boolean;
  onNotificationPress?: () => void;
}

export function HomeHeader({
  userName,
  avatarUri,
  hasUnreadNotifications = true,
  onNotificationPress,
}: HomeHeaderProps) {
  const theme = useTheme();
  const { mode, setMode } = useThemeMode();

  const handleToggleTheme = () => setMode(mode === "dark" ? "light" : "dark");

  const notificationIcon =
    mode !== "dark"
      ? AppAssets.NOTIFICATION_LIGHT_ICON
      : AppAssets.NOTIFICATION_DARK_ICON;

  const themeIcon =
    mode !== "dark" ? AppAssets.MOON_LIGHT_ICON : AppAssets.SUN_DARK_ICON;

  return (
    <View style={styles.row}>
      <View style={styles.userInfo}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <View
            style={[
              styles.avatar,
              styles.avatarFallback,
              { backgroundColor: theme.colors.primaryLight },
            ]}
          >
            <Text
              style={[
                theme.typography.heading2,
                { color: theme.colors.onPrimary },
              ]}
            >
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <View style={{ marginLeft: theme.spacing[12] }}>
          <Text
            style={[
              theme.typography.body,
              { color: theme.colors.textSecondary, fontSize: 16 },
            ]}
          >
            Hello!
          </Text>
          <Text
            style={[
              theme.typography.heading1,
              styles.userName,
              { color: theme.colors.textPrimary },
            ]}
          >
            {userName}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          onPress={handleToggleTheme}
          hitSlop={12}
          style={[styles.bellButton, { marginRight: theme.spacing[12] }]}
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

        <Pressable
          onPress={onNotificationPress}
          hitSlop={12}
          style={styles.bellButton}
        >
          <Image
            source={notificationIcon}
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
    </View>
  );
}
