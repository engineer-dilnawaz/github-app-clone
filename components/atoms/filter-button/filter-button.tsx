import { useAppTheme } from "@/hooks/theme-hooks/useAppTheme";
import { HPX } from "@/utils";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import type { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type FilterButtonProps = {
  icon?: IconSource;
  onPress?: () => void;
  label: string;
};

const FilterButton: FC<FilterButtonProps> = ({ icon, onPress, label }) => {
  const theme = useAppTheme();
  const styles = useStyles();
  return (
    <Button
      mode="contained"
      icon={icon}
      buttonColor={theme.colors.onSurfaceDisabled}
      compact
      // container
      textColor={theme.colors.onBackground}
      style={styles.style}
      contentStyle={styles.contentStyle}
      labelStyle={!!icon && styles.labelStyle}
      onPress={onPress}
    >
      <Text variant="bodyMedium">{label}</Text>
    </Button>
  );
};

export { FilterButton };

const useStyles = () => {
  const theme = useAppTheme();

  return StyleSheet.create({
    style: {},
    contentStyle: {
      flexDirection: "row-reverse",
      height: 35,
    },
    labelStyle: {
      marginRight: 0,
      marginLeft: HPX(10),
    },
  });
};
