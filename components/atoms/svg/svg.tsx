import { FC } from "react";
import { ColorValue } from "react-native";
import { NumberProp, SvgXml } from "react-native-svg";

type SvgProps = {
  svg: string;
  width: NumberProp;
  height: NumberProp;
  color: ColorValue;
};

export const Svg: FC<SvgProps> = ({ svg, width, height, color }) => {
  return <SvgXml xml={svg} width={width} height={height} color={color} />;
};
