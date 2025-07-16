import { useAuthContext } from "@/store/context";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

const Home = () => {
  const { isLoggedIn, logout } = useAuthContext();

  const segments = useSegments();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    const isAuthGroup = segments[0] !== "(tabs)";

    if (!isLoggedIn && !isAuthGroup) {
      router.replace("/");
    }
  }, [isLoggedIn, segments]);

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Text style={{ color: theme.colors.primaryContainer }}>
        Home {isLoggedIn ? "Logged In" : "Logged Out"}
      </Text>
      <Button title="Logout" onPress={logout} />
      <Button
        title="Outside (tabs) Details"
        onPress={() => router.push("/details")}
      />
    </View>
  );
};

export default Home;
