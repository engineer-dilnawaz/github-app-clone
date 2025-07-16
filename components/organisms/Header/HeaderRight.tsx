import { useAppTheme } from "@/hooks/theme-hooks/useAppTheme";
import { AppTheme } from "@/types";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export type HeaderRightProps = {
  tintColor?: string;
  pressColor?: string;
  pressOpacity?: number;
  canGoBack: boolean;
};

const HeaderRightComp = (props: HeaderRightProps) => {
  const theme = useAppTheme();
  const styles = useStyles(theme);
  console.log("first");
  return (
    <View style={styles.container}>
      <Text variant="bodyMedium">Heade rRight</Text>
    </View>
  );
};

export const HeaderRight = memo(HeaderRightComp);

const useStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "red",
      width: 100,
      height: 20,
    },
  });
};
