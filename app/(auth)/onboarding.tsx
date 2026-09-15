import { Button } from "@/src/components/Button";
import { onboardingStorage } from "@/src/storage/onboarding";
import { useTheme } from "@/src/theme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const { colors, typography, spacing } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.surface }]}
    >
      <View style={styles.container}>
        <View style={{ height: spacing[12] }}></View>

        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/onboarding-illustration.jpg")}
            style={styles.image}
            contentFit="fill"
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              typography.heading1,
              styles.title,
              { color: colors.textPrimary },
            ]}
          >
            Task Management &{"\n"}To-Do List
          </Text>
          <Text
            style={[
              typography.body,
              styles.subtitle,
              { color: colors.textSecondary },
            ]}
          >
            This productive tool is designed to help{"\n"}you better manage your
            task{"\n"}project-wise conveniently!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Let's Start"
            onPress={async () => {
              await onboardingStorage.setHasCompleted(true);
              router.replace("/(auth)/login");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 16,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 32,
  },
  image: {
    width: width * 1.0,
    height: width * 1.0,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    textAlign: "center",
    lineHeight: 22,
  },
  buttonContainer: {
    marginBottom: 32,
  },
});
