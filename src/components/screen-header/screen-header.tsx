import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppAssets from "@/src/constants/app-assets";
import { useTheme, useThemeMode } from "@/src/theme";

import styles from "./screen-header-styles";

export interface ScreenHeaderProps {
  title: string;
}

export function ScreenHeader({ title }: ScreenHeaderProps) {
  const theme = useTheme();
  const { mode, setMode } = useThemeMode();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const arrowIcon =
    mode !== "dark" ? AppAssets.ARROW_LIGHT_ICON : AppAssets.ARROW_DARK_ICON;

  const themeIcon =
    mode !== "dark" ? AppAssets.MOON_LIGHT_ICON : AppAssets.SUN_DARK_ICON;

  const handleToggleTheme = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

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
      {/* Back Button */}
      <Pressable
        onPress={() => router.back()}
        hitSlop={12}
        style={styles.sideSlot}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Image
          source={arrowIcon}
          style={styles.arrowIcon}
          resizeMode="contain"
        />
      </Pressable>

      {/* Title */}
      <View style={styles.titleSlot}>
        <Text
          style={[
            theme.typography.heading1,
            {
              color: theme.colors.textPrimary,
            },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      {/* Theme Toggle */}
      <Pressable
        onPress={handleToggleTheme}
        hitSlop={12}
        style={styles.bellSlot}
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
  );
}
