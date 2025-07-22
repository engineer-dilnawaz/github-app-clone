import { DESIGN } from "@/constants";
import { useAppTheme } from "@/hooks/theme-hooks/useAppTheme";
import { HPX, WPX } from "@/utils";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Icon } from "../icon";

type ClearFilterButtonProps = {
  counter: number;
  onPress?: () => void;
};

const ClearFilterButton: FC<ClearFilterButtonProps> = ({
  counter,
  onPress,
}) => {
  const theme = useAppTheme();
  const styles = useStyles();
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Icon
        type="Ionicons"
        name="filter"
        size={HPX(20)}
        color={theme.colors.onSurface}
      />
      {counter ? (
        <View style={styles.counterContainer}>
          <Text variant="labelMedium" style={styles.label}>
            {counter}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
};

export { ClearFilterButton };

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
      gap: 5,
    },
    counterContainer: {
      borderRadius: DESIGN.BORDER_RADIUS.CORNER_RADIUS_100,
      backgroundColor: theme.colors.onSurface,
      height: HPX(15),
      width: WPX(15),
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      lineHeight: 14,
      color: theme.colors.onPrimary,
    },
  });
};
