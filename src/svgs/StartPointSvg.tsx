import React from "react";
import { Svg, Path, SvgProps } from "react-native-svg";
import { useTheme } from "styled-components/native";

const StartPointSvg: React.FC<SvgProps> = props => {
  const theme = useTheme();

  return (
    <Svg width={32} height={32} style={{ backgroundColor: theme.blue }} {...props}>
      <Path
        d="M12.761 22.158h6.121v1.99h-6.121v-1.99zm-.267-14.305h7.2v1.99h-7.2v-1.99z"
        fill={theme.white}
      />
      <Path
        d="M10.262 7.853h2.867v7.642h-2.867V7.853zm8.6 7.152h2.867v9.142h-2.867v-9.142z"
        fill={theme.white}
      />
      <Path
        d="M10.272 15.005h11.467v1.99H10.272v-1.99zm9.116-7.152h2.34v3.2h-2.34v-3.2zm-9.126 13.095h2.827v3.2h-2.827v-3.2z"
        fill={theme.white}
      />
    </Svg>
  );
};

export default StartPointSvg;
