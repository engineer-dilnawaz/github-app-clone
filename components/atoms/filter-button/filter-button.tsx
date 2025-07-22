import { FC, useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { DESIGN } from "@/constants";
import { useAppTheme } from "@/hooks/theme-hooks/useAppTheme";
import { HPX } from "@/utils";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Icon } from "../icon";

type FilterButtonProps = {
  showIcon?: boolean;
  onPress?: () => void;
  label: string;
  isFilterSelected: boolean;
};

const FilterButton: FC<FilterButtonProps> = ({
  isFilterSelected,
  showIcon,
  onPress,
  label,
}) => {
  const theme = useAppTheme();
  const styles = useStyles();

  const animation = useSharedValue(isFilterSelected ? 1 : 0);

  useEffect(() => {
    animation.value = withTiming(isFilterSelected ? 1 : 0, { duration: 250 });
  }, [isFilterSelected]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animation.value,
      [0, 1],
      [theme.colors.surfaceDisabled, theme.colors.primary]
    ),
  }));

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <Text
          variant="labelMedium"
          style={[styles.label, isFilterSelected && styles.activeFilterColor]}
        >
          {label}
        </Text>
        {showIcon ? (
          <Icon
            type="MaterialCommunityIcons"
            name="chevron-down"
            color={theme.colors.onBackground}
            size={HPX(18)}
          />
        ) : null}
      </Animated.View>
    </Pressable>
  );
};

export { FilterButton };

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      paddingHorizontal: DESIGN.SPACE.HORIZONTAL.SPACING_10,
      backgroundColor: theme.colors.surfaceDisabled,
      borderRadius: DESIGN.BORDER_RADIUS.CORNER_RADIUS_100,
      height: HPX(30),
      flexDirection: "row",
      alignItems: "center",
    },
    activeFilterBg: {
      backgroundColor: theme.colors.primary,
    },
    label: {
      lineHeight: 14,
      color: theme.colors.onSurface,
    },
    activeFilterColor: {
      color: theme.colors.onPrimary,
    },
  });
};
