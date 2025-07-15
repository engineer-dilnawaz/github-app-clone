import { theme as appTheme } from "@/constants";
import { MD3Theme, useTheme as usePaperTheme } from "react-native-paper";

interface CustomTheme extends MD3Theme {
  spacing: typeof appTheme.spacing;
  radius: typeof appTheme.radius;
}

export const useAppTheme = (): CustomTheme => {
  const paperTheme = usePaperTheme();
  return {
    ...paperTheme,
    spacing: appTheme.spacing,
    radius: appTheme.radius,
  };
};
