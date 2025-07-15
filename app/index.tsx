import { useAppTheme } from "@/hooks/theme-hooks/useAppTheme";
import { useAuthContext } from "@/store/context";
import { useThemeStore } from "@/store/zustand/theme";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

const HomeScreen = () => {
  const { isLoggedIn, login } = useAuthContext();
  const { mode, toggleTheme } = useThemeStore();
  const router = useRouter();
  const theme = useAppTheme();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/(tabs)/home");
    }
  }, [isLoggedIn]);

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Text
        variant="headlineSmall"
        style={{
          color: theme.colors.onBackground,
        }}
      >
        HomeScreen {mode}
      </Text>
      <Button title="Login" onPress={login} />
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </SafeAreaView>
  );
};

export default HomeScreen;
