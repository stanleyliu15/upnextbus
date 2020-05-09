import React from "react";
import { Svg, Path, SvgProps } from "react-native-svg";
import { useTheme } from "styled-components/native";

const EndPointSvg: React.FC<SvgProps> = props => {
  const theme = useTheme();

  return (
    <Svg width={32} height={32} style={{ backgroundColor: theme.blue }} {...props}>
      <Path
        d="M13.289 22.158h8.8v1.99h-8.8v-1.99zm-.178-14.305h8.978v1.99h-8.978v-1.99z"
        fill={theme.white}
      />
      <Path d="M10.622 7.853h2.867v16.295h-2.867V7.853z" fill={theme.white} />
      <Path d="M13.289 15.005h8.8v1.99h-8.8v-1.99z" fill={theme.white} />
    </Svg>
  );
};

export default EndPointSvg;
