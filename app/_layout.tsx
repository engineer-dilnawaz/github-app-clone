import { AuthProvider } from "@/store/context";
import { Slot } from "expo-router";

const AppLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default AppLayout;
