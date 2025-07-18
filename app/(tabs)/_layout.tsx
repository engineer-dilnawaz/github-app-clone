import {
  CustomTabBar,
  Header,
  HeaderRight,
  HeaderRightProps,
  Icon,
} from "@/components";
import { useAppTheme } from "@/hooks/theme-hooks/useAppTheme";
import { AppTheme } from "@/types";
import { HPX } from "@/utils";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const theme = useAppTheme();
  const styles = useStyles(theme);

  // if (__DEV__) {
  //   const whyDidYouRender = require("@welldone-software/why-did-you-render");
  //   whyDidYouRender(React, {
  //     trackAllPureComponents: true,
  //   });
  // }

  const memoizedStyles = useMemo(() => {
    return {
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
      tabBarStyle: styles.tabBarStyle,
      tabBarLabelStyle: styles.tabBarLabelStyle,
      tabBarItemStyle: styles.tabBarItemStyle,
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
        // header,
        // headerRight,
        headerTitleAlign: "left",
        // headerLeft: () => <Text>lop</Text>,
        headerShadowVisible: true,

        // tabBarVisibilityAnimationConfig: {
        //   show: {
        //     animation: "spring",
        //     config: {},
        //   },
        //   hide: {
        //     animation: "timing",
        //     config: {
        //       duration: 200,
        //     },
        //   },
        // },
        sceneStyle: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          // headerRight,
          headerTintColor: theme.colors.onSurface,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },

          headerSearchBarOptions: {
            placeholder: "Search something...",
            autoCapitalize: "none",
            autoFocus: false,
            // obscureBackground:true,

            // hideWhenScrolling: false,
            // barTintColor: theme.colors.elevation.level2, // Background of search bar
            // tintColor: theme.colors.onSurface,           //
          },

          tabBarIcon: (props) => (
            <Icon
              type="Foundation"
              name="home"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notification",
          tabBarLabel: "Notification",
          tabBarIcon: (props) => (
            <Icon
              type="MaterialIcons"
              name="notifications-none"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarLabel: "Explore",
          tabBarIcon: (props) => (
            <Icon
              type="Octicons"
              name="telescope"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: (props) => (
            <Icon
              type="AntDesign"
              name="user"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const useStyles = (theme: AppTheme) => {
  const safeAreaInsets = useSafeAreaInsets();
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
      height: HPX(70),
      marginHorizontal: theme.spacing.lg,
      position: "absolute",
      bottom: safeAreaInsets.bottom + theme.spacing.sm,
      zIndex: 999,
      borderRadius: theme.radius.full,
    },
    tabBarLabelStyle: {},
    tabBarItemStyle: {
      paddingTop: 10,
    },
  });
};
