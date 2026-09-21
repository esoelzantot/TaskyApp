import { authStorage } from "@/src/storage/auth";
import { onboardingStorage } from "@/src/storage/onboarding";
import { useTheme } from "@/src/theme";
import { Image } from "expo-image";
import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function SplashScreen() {
  const { colors, spacing } = useTheme();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const [opacity] = useState(() => new Animated.Value(0));

  const [nextRoute, setNextRoute] = useState<
    "tabs" | "login" | "onboarding" | null
  >(null);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const checkAuthAndNavigate = async () => {
      // Simulate splash delay
      await new Promise((resolve) => setTimeout(resolve, 2500));

      const token = await authStorage.getToken();
      const hasCompletedOnboarding = await onboardingStorage.getHasCompleted();

      if (token) {
        setNextRoute("tabs");
      } else if (hasCompletedOnboarding) {
        setNextRoute("login");
      } else {
        setNextRoute("onboarding");
      }
    };

    checkAuthAndNavigate();
  }, [opacity]);

  useEffect(() => {
    // Only navigate when both the route is determined and navigation state is ready
    if (nextRoute && rootNavigationState?.key) {
      if (nextRoute === "tabs") {
        router.replace("/(tabs)");
      } else if (nextRoute === "login") {
        router.replace("/(auth)/login");
      } else {
        router.replace("/(auth)/onboarding");
      }
    }
  }, [nextRoute, rootNavigationState?.key, router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Animated.View
        style={{ opacity, alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={require("@/assets/images/splash-logo.jpg")}
          style={styles.logo}
          contentFit="contain"
          // adding transition ensures expo-image renders local image smoothly
          transition={200}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 40,
  },
});
