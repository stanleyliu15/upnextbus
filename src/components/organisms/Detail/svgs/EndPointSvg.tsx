import React from "react";
import { Svg, Path } from "react-native-svg";

export const EndPointSvg = props => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      d="M13.289 22.158h8.8v1.99h-8.8v-1.99zm-.178-14.305h8.978v1.99h-8.978v-1.99z"
      fill="#fff"
    />
    <Path d="M10.622 7.853h2.867v16.295h-2.867V7.853z" fill="#fff" />
    <Path d="M13.289 15.005h8.8v1.99h-8.8v-1.99z" fill="#fff" />
  </Svg>
);
