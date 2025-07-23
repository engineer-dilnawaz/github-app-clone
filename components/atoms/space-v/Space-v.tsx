import { DESIGN } from "@/constants";
import { View } from "react-native";

type SpaceVProps = {
  space: keyof typeof DESIGN.SPACE.VERTICAL;
};

export const SpaceV = ({ space }: SpaceVProps) => {
  return <View style={{ height: DESIGN.SPACE.VERTICAL[space] }} />;
};
