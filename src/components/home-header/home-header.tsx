import AppAssets from "@/src/constants/app-assets";
import { useTheme } from "@/src/theme";
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

      <Pressable
        onPress={onNotificationPress}
        hitSlop={12}
        style={styles.bellButton}
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
