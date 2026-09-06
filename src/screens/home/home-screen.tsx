import { HomeHeader } from "@/src/components/home-header/home-header";
import { HomeProgressCard } from "@/src/components/home-progress-card/home-progress-card";
import { useTheme } from "@/src/theme";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./home-screen-styles";

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={{
          paddingTop: insets.top + theme.spacing[16],
          paddingHorizontal: theme.spacing[24],
        }}
      >
        {/* TODO: replace with the signed-in user's real name/avatar once auth exists. */}
        <HomeHeader userName="User" />
      </View>

      <View style={{ marginTop: theme.spacing[24] }}>
        {/* TODO: replace with the real "completed today / total today" ratio once tasks exist. */}
        <HomeProgressCard percentage={85} />
      </View>

      <View style={styles.body}>
        <Text
          style={[
            styles.title,
            theme.typography.heading1,
            { color: theme.colors.textPrimary },
          ]}
        >
          HOME SCREEN
        </Text>
      </View>
    </View>
  );
}
