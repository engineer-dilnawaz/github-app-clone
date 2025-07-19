import { HomeSection, Icon, IconType } from "@/components";
import { ITEMS, SHORT_CUTS } from "@/constants";
import { useAppTheme } from "@/hooks/theme-hooks/useAppTheme";
import { HPX, WPX } from "@/utils";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";

const Home = () => {
  const styles = useStyles();
  const theme = useAppTheme();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <HomeSection
          title="My Work"
          right={
            <Icon
              type="Ionicons"
              name="ellipsis-horizontal"
              size={HPX(22)}
              color={theme.colors.outline}
            />
          }
        >
          {ITEMS.map((item) => (
            <View key={item.name} style={styles.itemContainer}>
              <View
                style={[styles.iconContainer, { backgroundColor: item.color }]}
              >
                <Icon
                  type={item.icon.type as IconType}
                  name={item.icon.name}
                  size={HPX(16)}
                  color={"#fff"}
                />
              </View>
              <Text variant="titleMedium">{item.name}</Text>
            </View>
          ))}
        </HomeSection>

        <Divider
          style={{
            marginTop: theme.spacing.lg,
          }}
        />
        <HomeSection title="Favourite">
          <View style={styles.noFavContainer}>
            <Text variant="bodyMedium" style={styles.noFavTitle}>
              Add Favorite repositories for quick access at any time, without
              having to search
            </Text>
            <Pressable style={styles.addFavBtn}>
              <Text variant="bodyMedium" style={styles.addFavBtnText}>
                Add Favorites
              </Text>
            </Pressable>
          </View>
        </HomeSection>

        <Divider />
        <HomeSection title="Shortcuts">
          <View style={styles.contentContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: theme.spacing.xs,
              }}
            >
              {SHORT_CUTS.map((shortcut) => (
                <View
                  key={shortcut.id}
                  style={{
                    height: HPX(35),
                    width: WPX(35),
                    borderRadius: HPX(35),
                    backgroundColor: shortcut.color,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    type={shortcut.icon.type as IconType}
                    name={shortcut.icon.name}
                    color={shortcut.icon.color}
                    size={HPX(22)}
                  />
                </View>
              ))}
            </View>
            <Text variant="titleMedium" style={styles.title}>
              The things you need, one tap away
            </Text>
            <Text variant="labelMedium" style={styles.description}>
              Fast access your lists of issues, Pull Requests, or Discussions
            </Text>
            <Pressable style={styles.addFavBtn}>
              <Text variant="bodyMedium" style={styles.addFavBtnText}>
                Get Started
              </Text>
            </Pressable>
          </View>
        </HomeSection>
      </View>
    </ScrollView>
  );
};

export default Home;

const useStyles = () => {
  const theme = useAppTheme();
  return StyleSheet.create({
    container: {
      // marginTop: theme.spacing.md,
      paddingBottom: HPX(150),
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing.lg,
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: theme.spacing.md,
      gap: theme.spacing.lg,
    },
    iconContainer: {
      height: HPX(30),
      width: WPX(30),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: theme.radius.sm,
    },

    noFavContainer: {
      // marginTop: theme.spacing["2xl"],
    },
    noFavTitle: {
      textAlign: "center",
    },
    addFavBtn: {
      marginTop: theme.spacing.lg,
      backgroundColor: theme.colors.inverseSurface,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: theme.spacing.sm,
      borderWidth: 0.9,
      borderColor: theme.colors.surfaceVariant,
      borderRadius: theme.radius.sm,
      marginBottom: theme.spacing.xl,
    },
    addFavBtnText: {
      color: theme.colors.inversePrimary,
      textTransform: "uppercase",
    },
    contentContainer: {
      gap: theme.spacing.md,
    },
    title: {
      textAlign: "center",
      color: theme.colors.onBackground,
    },
    description: {
      textAlign: "center",
      color: theme.colors.onSurfaceVariant,
    },
  });
};
