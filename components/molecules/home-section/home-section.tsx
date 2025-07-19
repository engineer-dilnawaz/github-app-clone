import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { useAppTheme } from "@/hooks/theme-hooks/useAppTheme";
import { AppTheme } from "@/types";
import { FC, JSX, PropsWithChildren } from "react";

type HomeSectionProps = PropsWithChildren & {
  title: string;
  right?: JSX.Element;
};

export const HomeSection: FC<HomeSectionProps> = ({
  title,
  right,
  children,
}: HomeSectionProps) => {
  const theme = useAppTheme();
  const styles = useStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text variant="titleMedium">{title}</Text>
        {right ? right : null}
      </View>
      {children}
    </View>
  );
};

const useStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      marginTop: theme.spacing.lg,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing.lg,
    },
  });
};
