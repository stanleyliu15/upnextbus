import React from "react";
import { Svg, Path } from "react-native-svg";
import { View } from "react-native";

export const PointSvg = props => {
  return (
    <Svg width={8} height={8} fill="none" {...props}>
      <Path d="M4 8a4 4 0 100-8 4 4 0 000 8z" />
      <Path d="M4 6.75a2.75 2.75 0 100-5.5 2.75 2.75 0 000 5.5z" fill="#fff" />
    </Svg>
  );
};

export default PointSvg;
