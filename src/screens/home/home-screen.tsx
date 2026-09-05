import { useTheme } from "@/src/theme";
import { Text, View } from "react-native";
import styles from "./home-styles";

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          padding: theme.spacing[24],
        },
      ]}
    >
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
  );
}
