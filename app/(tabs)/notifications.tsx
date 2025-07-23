import { notification } from "@/assets";
import { ClearFilterButton, FilterButton, Icon, Svg } from "@/components";
import { DESIGN } from "@/constants";

import { useAppTheme } from "@/hooks/theme-hooks/useAppTheme";
import { HPX, WPX } from "@/utils";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Menu, Text } from "react-native-paper";

const filters = [
  {
    id: 1,
    label: "Inbox",
    showIcon: true,
  },
  {
    id: 2,
    label: "Focused",
    showIcon: false,
  },
  {
    id: 3,
    label: "Unread",
    showIcon: false,
  },
  {
    id: 4,
    label: "Repository",
    showIcon: true,
  },
];

const Notifications = () => {
  const theme = useAppTheme();
  const styles = useStyles();
  const [activeFilters, setActiverFilters] = useState<number[]>([]);
  const [clearFiltersMenu, setClearFiltersMenu] = useState(false);

  const toggleFilter = (id: number) => {
    setActiverFilters((prev) => {
      return prev.includes(id)
        ? prev.filter((preId) => preId !== id)
        : [...prev, id];
    });
  };

  const handleSheetOpen = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: HPX(5) }}
        >
          {activeFilters.length ? (
            <Menu
              visible={clearFiltersMenu}
              onDismiss={() => setClearFiltersMenu(false)}
              anchor={
                <ClearFilterButton
                  counter={activeFilters.length}
                  onPress={() => setClearFiltersMenu(true)}
                />
              }
              anchorPosition="bottom"
              mode="elevated"
              style={{ marginTop: 3 }}
              contentStyle={{
                borderRadius: DESIGN.BORDER_RADIUS.CORNER_RADIUS_5,
              }}
            >
              <Menu.Item
                dense
                leadingIcon={({ color }) => (
                  <Icon
                    type="MaterialCommunityIcons"
                    name="filter-remove-outline"
                    size={HPX(18)}
                    color={color}
                    style={{ marginTop: 3 }}
                  />
                )}
                onPress={() => {
                  setClearFiltersMenu(false);
                  setActiverFilters([]);
                }}
                title="Clear all filters"
                contentStyle={{ marginLeft: 0 }}
              />
            </Menu>
          ) : null}

          {filters.map((filter) => (
            <FilterButton
              onPress={() =>
                filter.showIcon ? handleSheetOpen() : toggleFilter(filter.id)
              }
              key={filter.id}
              isFilterSelected={activeFilters.includes(filter.id)}
              label={filter.label}
              showIcon={filter.showIcon}
            />
          ))}
        </ScrollView>
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
      flex: 0.7,

      justifyContent: "center",
      alignItems: "center",
      gap: theme.spacing.lg,
    },
  });
};
