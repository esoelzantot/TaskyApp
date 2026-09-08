import { categoriesApiSlice } from "@/src/rtk/categories-api-slice";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Provider as ReduxProvider } from "react-redux";

import { setupRtkQueryListeners } from "@/src/rtk/setup-listeners";
import { persistor, store } from "@/src/rtk/store";
import {
  ThemeProvider,
  useAppFonts,
  useColors,
  useThemeMode,
} from "@/src/theme";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootNavigator() {
  const { mode } = useThemeMode();
  const colors = useColors();

  const navigationTheme = {
    ...(mode === "dark" ? NavigationDarkTheme : NavigationDefaultTheme),
    colors: {
      ...(mode === "dark"
        ? NavigationDarkTheme.colors
        : NavigationDefaultTheme.colors),
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.textPrimary,
      border: colors.border,
      notification: colors.error,
    },
  };

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="add-task" options={{ headerShown: false }} />
        <Stack.Screen name="edit-task/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="task/[id]" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={mode === "dark" ? "light" : "dark"} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useAppFonts();

  // `persistor`'s cache rehydration from AsyncStorage is async — this
  // tracks when it's done, so the offline-first cached data is already
  // in the store the moment the first screen renders (no blank/empty
  // flash before cached data appears).
  const [persistReady, setPersistReady] = useState(
    () => persistor.getState().bootstrapped,
  );

  useEffect(() => {
    if (persistReady) return;
    return persistor.subscribe(() => {
      if (persistor.getState().bootstrapped) {
        setPersistReady(true);
      }
    });
  }, [persistReady]);

  useEffect(() => setupRtkQueryListeners(store), []);

  useEffect(() => {
    store.dispatch(categoriesApiSlice.endpoints.getCategories.initiate());
  }, []);

  const appReady = fontsLoaded && persistReady;

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootNavigator />
        </GestureHandlerRootView>
      </ThemeProvider>
    </ReduxProvider>
  );
}
