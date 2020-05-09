import React from "react";
import { Svg, Path, SvgProps } from "react-native-svg";
import { useTheme } from "styled-components/native";

const PointSvg: React.FC<SvgProps> = props => {
  const theme = useTheme();

  return (
    <Svg width={8} height={8} fill="none" {...props}>
      <Path d="M4 8a4 4 0 100-8 4 4 0 000 8z" />
      <Path d="M4 6.75a2.75 2.75 0 100-5.5 2.75 2.75 0 000 5.5z" fill={theme.white} />
    </Svg>
  );
};

export default PointSvg;
