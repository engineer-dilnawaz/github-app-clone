import { StyleSheet, View } from "react-native";

import { Icon } from "@/components/atoms";
import { useAppTheme } from "@/hooks/theme-hooks/useAppTheme";
import { HPX } from "@/utils";

type HomeHeaderRightProps = {
  tintColor?: string;
  pressColor?: string;
  pressOpacity?: number;
  canGoBack: boolean;
};

export const HomeHeaderRight = (props: HomeHeaderRightProps) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Icon
        type="Octicons"
        name="search"
        size={HPX(20)}
        color={props.tintColor}
      />
      <Icon
        type="AntDesign"
        name="pluscircleo"
        size={HPX(20)}
        color={props.tintColor}
      />
      <Icon
        type="Feather"
        name="more-vertical"
        size={HPX(20)}
        color={props.tintColor}
        style={styles.lastIcon}
      />
    </View>
  );
};

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      marginRight: theme.spacing.lg,
      alignItems: "center",
      gap: theme.spacing.xl,
    },
    lastIcon: {
      marginLeft: -10,
    },
  });
};
