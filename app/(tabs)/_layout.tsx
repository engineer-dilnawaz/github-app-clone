import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
