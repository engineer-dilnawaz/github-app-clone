import { useAppTheme } from "@/hooks/theme-hooks/useAppTheme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const animationDuration = 250;

export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const theme = useAppTheme();
  const styles = useStyles();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          bottom: insets.bottom + theme.spacing.sm,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        const slideY = useSharedValue(isFocused ? -5 : 10); // icon starts below
        const labelOpacity = useSharedValue(isFocused ? 1 : 0);
        const scale = useSharedValue(isFocused ? 1.15 : 1);

        useEffect(() => {
          const easing = Easing.out(Easing.ease);

          if (isFocused) {
            // Slide icon up (negative translateY)
            slideY.value = withTiming(
              -5,
              { duration: animationDuration, easing },
              () => {
                // Then scale in
                scale.value = withTiming(1.15, { duration: 200, easing });
              }
            );
            labelOpacity.value = withTiming(1, {
              duration: animationDuration,
              easing,
            });
          } else {
            // Reset icon position to center (0)
            labelOpacity.value = withTiming(0, { duration: 150, easing });
            scale.value = withTiming(1, { duration: 150, easing });
            slideY.value = withTiming(10, { duration: 150, easing });
          }
        }, [isFocused]);

        const animatedLabelStyle = useAnimatedStyle(() => ({
          opacity: labelOpacity.value,
          transform: [{ translateY: slideY.value }],
        }));

        const animatedIconStyle = useAnimatedStyle(() => ({
          transform: [{ translateY: slideY.value }, { scale: scale.value }],
        }));

        const iconColor = isFocused
          ? theme.colors.primary
          : theme.colors.onSurfaceDisabled;

        const IconComponent = options.tabBarIcon;

        const labelRaw = options.tabBarLabel ?? options.title ?? route.name;

        const label =
          typeof labelRaw === "function"
            ? labelRaw({
                focused: isFocused,
                color: iconColor,
                position: "below-icon",
                children: typeof labelRaw === "string" ? labelRaw : route.name, // pass string here
              })
            : labelRaw;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.8}
          >
            <Animated.View style={animatedIconStyle}>
              {IconComponent?.({
                focused: isFocused,
                color: iconColor,
                size: 24,
              })}
            </Animated.View>

            <Animated.View style={[animatedLabelStyle, styles.labelWrapper]}>
              {isFocused && (
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontSize: 12,
                    fontFamily: "Inter-Medium",
                  }}
                >
                  {label}
                </Text>
              )}
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      borderRadius: 100,
      marginHorizontal: 20,
      height: 64,
      justifyContent: "space-around",
      alignItems: "center",
      position: "absolute",
      left: 0,
      right: 0,
      shadowColor: theme.colors.secondary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,

      borderWidth: 1,
      borderColor: theme.colors.backdrop,
    },
    tab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    labelWrapper: {
      marginTop: 4,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
