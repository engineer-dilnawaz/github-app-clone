import { theme as appTheme } from "@/constants";
import { MD3Theme } from "react-native-paper";

export interface AppTheme extends MD3Theme {
  spacing: typeof appTheme.spacing;
  radius: typeof appTheme.radius;
}
