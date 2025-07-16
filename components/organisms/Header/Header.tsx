import { useAppTheme } from "@/hooks/theme-hooks/useAppTheme";
import { AppTheme } from "@/types";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { getHeaderTitle } from "@react-navigation/elements";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HeaderComp = (props: BottomTabHeaderProps) => {
  const theme = useAppTheme();
  const styles = useStyles(theme);
  const title = getHeaderTitle(props.options, props.route.name);

  return (
    <View style={[styles.container]}>
      <Text variant="headlineSmall" style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

export const Header = memo(HeaderComp);

const useStyles = (theme: AppTheme) => {
  const safeInsets = useSafeAreaInsets();
  return StyleSheet.create({
    container: {
      paddingTop: safeInsets.top,
      // height: HEADER_HEIGHT + safeInsets.top,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: theme.spacing.md,
    },
    title: {
      fontWeight: theme.fonts.headlineLarge.fontWeight,
    },
  });
};
