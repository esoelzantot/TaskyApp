import { View, StyleSheet, Animated } from "react-native";
import { useTheme } from "@/src/theme";
import { useEffect, useRef, useState } from "react";
import { useRouter, useRootNavigationState } from "expo-router";
import { Image } from "expo-image";
import { authStorage } from "@/src/storage/auth";
import { onboardingStorage } from "@/src/storage/onboarding";

export default function SplashScreen() {
  const { colors, spacing } = useTheme();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const opacity = useRef(new Animated.Value(0)).current;
  
  const [nextRoute, setNextRoute] = useState<"tabs" | "login" | "onboarding" | null>(null);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const checkAuthAndNavigate = async () => {
      // Simulate splash delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
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
  }, []);

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
  }, [nextRoute, rootNavigationState?.key]);

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Animated.View style={{ opacity, alignItems: "center", justifyContent: "center" }}>
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
