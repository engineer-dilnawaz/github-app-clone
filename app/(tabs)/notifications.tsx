import { notification } from "@/assets";
import { FilterButton, Svg } from "@/components";

import { useAppTheme } from "@/hooks/theme-hooks/useAppTheme";
import { HPX, WPX } from "@/utils";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const Notifications = () => {
  const theme = useAppTheme();
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <FilterButton label="Inbox" icon="chevron-down" />
        <FilterButton label="Focused" />
        <FilterButton label="Unread" />
        <FilterButton label="Repository" icon="chevron-down" />
      </View>
      <View style={styles.noDataContainer}>
        <Svg
          svg={notification}
          width={WPX(250)}
          height={HPX(250)}
          color={theme.colors.primary}
        />
        <Text variant="titleLarge">All caught up!</Text>
        <Text variant="labelMedium">
          Take a break, write some code, and do what you do best.
        </Text>
      </View>
    </View>
  );
};

export default Notifications;

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    filterContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.sm,
    },
    button: {
      alignItems: "center",

      flexDirection: "row",
      justifyContent: "space-between",
    },
    noDataContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: theme.spacing.lg,
    },
  });
};
