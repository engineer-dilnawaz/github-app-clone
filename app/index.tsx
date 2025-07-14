import { useAuthContext } from "@/store/context";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, SafeAreaView, Text } from "react-native";

const HomeScreen = () => {
  const { isLoggedIn, login } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/(tabs)/home");
    }
  }, [isLoggedIn]);

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <Button title="Login" onPress={login} />
    </SafeAreaView>
  );
};

export default HomeScreen;
