import { Header, HeaderRight, HeaderRightProps } from "@/components";
import { useAppTheme } from "@/hooks/theme-hooks/useAppTheme";
import { AppTheme } from "@/types";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function TabsLayout() {
  const theme = useAppTheme();
  const styles = useStyles(theme);

  const memoizedStyles = useMemo(() => {
    return {
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.secondary,
      tabBarStyle: styles.tabBarStyle,
      tabBarLabelStyle: styles.tabBarLabelStyle,
    };
  }, [theme]);

  const header = useCallback(
    (props: BottomTabHeaderProps) => <Header {...props} />,
    []
  );

  const headerRight = useCallback(
    (props: HeaderRightProps) => <HeaderRight {...props} />,
    []
  );

  return (
    <Tabs
      screenOptions={{
        ...memoizedStyles,
        header,
        headerRight,
        headerTitleAlign: "left",
        headerLeft: () => <Text>lop</Text>,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerRight,
        }}
      />
      <Tabs.Screen name="notifications" />
      <Tabs.Screen name="explore" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const useStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    headerStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTitleStyle: {
      color: theme.colors.onSurface,
    },
    tabBarStyle: {
      backgroundColor: theme.colors.background,
      borderTopColor: theme.colors.outline,
    },
    tabBarLabelStyle: {},
  });
};
