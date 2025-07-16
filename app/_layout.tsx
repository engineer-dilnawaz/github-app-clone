import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import {
  configureFonts,
  DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import { interFontConfig, theme } from "@/constants";
import { AuthProvider } from "@/store/context";
import { useThemeStore } from "@/store/zustand/theme";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const systemColorScheme = useColorScheme();
  const { mode, setTheme } = useThemeStore();

  const [fontsLoaded] = useFonts({
    "Inter-Thin": require("../assets/fonts/Inter_18pt-Thin.ttf"),
    "Inter-Light": require("../assets/fonts/Inter_18pt-Light.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
  });

  // useEffect(() => {
  //   if (systemColorScheme) setTheme(systemColorScheme);
  // }, [systemColorScheme]);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const paperTheme = {
    ...DefaultTheme,
    dark: mode === "dark",
    colors: theme[mode].colors,
    fonts: configureFonts({ config: interFontConfig }),
  };

  return (
    <PaperProvider theme={paperTheme}>
      <AuthProvider>
        <Slot />
      </AuthProvider>

      <StatusBar
        barStyle={mode === "dark" ? "light-content" : "light-content"}
      />
    </PaperProvider>
  );
}
