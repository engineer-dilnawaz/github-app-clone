import { notification } from "@/assets";
import {
  AppBottomSheet,
  ClearFilterButton,
  FilterButton,
  Icon,
  SpaceV,
  Svg,
} from "@/components";
import { DESIGN } from "@/constants";

import { useAppTheme } from "@/hooks/theme-hooks/useAppTheme";
import { HPX, WPX } from "@/utils";
import { Fragment, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Menu, Text, TouchableRipple } from "react-native-paper";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, { Easing, SlideInRight } from "react-native-reanimated";

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

const notificationFilter = [
  {
    id: 1,
    label: "Inbox",
  },
  {
    id: 2,
    label: "Saved",
  },
  {
    id: 3,
    label: "Done",
  },
];

const notificationType = [
  {
    id: 1,
    label: "Assigned",
    icon: "🎯",
  },
  {
    id: 2,
    label: "Participating",
    icon: "💬",
  },
  {
    id: 3,
    label: "Mentioned",
    icon: "✋",
  },
  {
    id: 4,
    label: "Team mentioned",
    icon: "🙌",
  },
  {
    id: 5,
    label: "Review requested",
    icon: "👀",
  },
];

const Notifications = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = useAppTheme();
  const styles = useStyles();
  const [activeFilters, setActiverFilters] = useState<number[]>([]);
  const [clearFiltersMenu, setClearFiltersMenu] = useState(false);
  const [activeNotificationFilter, setActiveNotificationFilter] = useState(-1);
  const [activeNotificationType, setActiveNotificationType] = useState(-1);

  const toggleFilter = (id: number) => {
    setActiverFilters((prev) => {
      return prev.includes(id)
        ? prev.filter((preId) => preId !== id)
        : [...prev, id];
    });
  };

  const handleSheetOpen = () => {
    console.log("first");
    bottomSheetRef.current?.snapToIndex(0);
  };

  return (
    <Fragment>
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

            {filters.map((filter, index) => (
              <Animated.View
                key={filter.id}
                entering={SlideInRight.delay(index * 60)
                  .easing(Easing.out(Easing.cubic))
                  .withInitialValues({
                    transform: [{ translateX: 10 }],
                    opacity: 0,
                  })}
              >
                <FilterButton
                  onPress={() =>
                    filter.showIcon
                      ? handleSheetOpen()
                      : toggleFilter(filter.id)
                  }
                  isFilterSelected={activeFilters.includes(filter.id)}
                  label={filter.label}
                  showIcon={filter.showIcon}
                />
              </Animated.View>
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
      <AppBottomSheet
        ref={bottomSheetRef}
        style={{ flex: 1 }}
        backgroundStyle={{ backgroundColor: theme.colors.background }}
        handleStyle={{ backgroundColor: theme.colors.backdrop }}
        snapPoints={["75%", "85%"]}
      >
        <BottomSheetView
          style={{
            flex: 1,
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: HPX(10),
                paddingHorizontal: theme.spacing.lg,
                backgroundColor: theme.colors.backdrop,
              }}
            >
              <Icon
                type="MaterialCommunityIcons"
                name="close"
                size={HPX(20)}
                color={theme.colors.onBackground}
              />
              <Text variant="titleMedium">Filter notification by</Text>
            </View>
            <View
              style={{
                paddingTop: DESIGN.SPACE.VERTICAL.DEFAULT_20,
                paddingHorizontal: theme.spacing.lg,
                backgroundColor: theme.colors.backdrop,
              }}
            >
              {notificationFilter.map((filter, index) => (
                <TouchableRipple
                  key={filter.id}
                  rippleColor={"rgba(255, 255, 255, .4)"}
                  centered
                  onPress={() => setActiveNotificationFilter(filter.id)}
                  borderless
                  style={{
                    padding: DESIGN.SPACE.VERTICAL.SPACING_10,
                    borderRadius: DESIGN.BORDER_RADIUS.CORNER_RADIUS_10,
                    marginBottom:
                      index + 1 === notificationFilter.length
                        ? DESIGN.SPACE.VERTICAL.SPACING_10
                        : DESIGN.SPACE.VERTICAL.SPACING_20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text variant="titleMedium">{filter.label}</Text>
                    {activeNotificationFilter === filter.id && (
                      <Icon
                        type="MaterialCommunityIcons"
                        name="check"
                        size={HPX(20)}
                        color={theme.colors.primary}
                      />
                    )}
                  </View>
                </TouchableRipple>
              ))}
            </View>
            <SpaceV space={"SPACING_20"} />
            <View
              style={{
                paddingTop: DESIGN.SPACE.VERTICAL.DEFAULT,
                paddingHorizontal: theme.spacing.lg,
                backgroundColor: theme.colors.backdrop,
              }}
            >
              {notificationType.map((type, index) => (
                <TouchableRipple
                  key={type.id}
                  rippleColor={"rgba(255, 255, 255, .4)"}
                  onPress={() => setActiveNotificationType(type.id)}
                  centered
                  borderless
                  style={{
                    padding: DESIGN.SPACE.VERTICAL.SPACING_10,
                    borderRadius: DESIGN.BORDER_RADIUS.CORNER_RADIUS_10,
                    marginBottom:
                      index + 1 === notificationFilter.length
                        ? DESIGN.SPACE.VERTICAL.SPACING_10
                        : DESIGN.SPACE.VERTICAL.SPACING_20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: HPX(10),
                      // marginBottom:
                      //   index + 1 === notificationType.length
                      //     ? DESIGN.SPACE.VERTICAL.SPACING_20
                      //     : DESIGN.SPACE.VERTICAL.SPACING_30,
                    }}
                  >
                    <Text variant="titleMedium">{type.icon}</Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text variant="titleMedium">{type.label}</Text>
                      {activeNotificationType === type.id && (
                        <Icon
                          type="MaterialCommunityIcons"
                          name="check"
                          size={HPX(20)}
                          color={theme.colors.primary}
                        />
                      )}
                    </View>
                  </View>
                </TouchableRipple>
              ))}
            </View>
          </View>
        </BottomSheetView>
      </AppBottomSheet>
    </Fragment>
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
