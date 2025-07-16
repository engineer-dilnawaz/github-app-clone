import { theme as appTheme } from "@/constants";
import { AppTheme } from "@/types";
import { useTheme as usePaperTheme } from "react-native-paper";

export const useAppTheme = (): AppTheme => {
  const paperTheme = usePaperTheme();
  return {
    ...paperTheme,
    spacing: appTheme.spacing,
    radius: appTheme.radius,
  };
};
