import React from "react";
import { Svg, Path, Rect, Text, TSpan, SvgProps } from "react-native-svg";
import { useTheme } from "styled-components/native";

import { fontSize, fontFamily } from "../styles";

type BusSvgProps = SvgProps & {
  label: string;
};

const BusSvg: React.FC<BusSvgProps> = ({ label, ...svgProps }) => {
  const theme = useTheme();

  return (
    <Svg width={36} height={38} {...svgProps}>
      <Path d="M9.563 26.266h.562v3.2h-.563A.548.548 0 019 28.933v-2.134c0-.293.252-.533.563-.533zm16.874 0h-.563v3.2h.564c.31 0 .562-.237.562-.533v-2.134c0-.293-.251-.533-.563-.533zM24.75 25.2v9.6c0 .59-.503 1.067-1.125 1.067v1.066c0 .59-.503 1.067-1.125 1.067h-1.125c-.622 0-1.125-.478-1.125-1.067v-1.066h-4.5v1.066c0 .59-.503 1.067-1.125 1.067h-1.124c-.623 0-1.125-.478-1.125-1.067v-1.066c-.622 0-1.125-.478-1.125-1.067v-9.6c-.001-1.767 1.511-3.2 3.374-3.2h6.75c1.864 0 3.375 1.433 3.375 3.2zm-9-1.066h4.5v-1.067h-4.5v1.067zm-1.125 9.6c0-.59-.503-1.067-1.124-1.067-.622 0-1.125.477-1.125 1.067 0 .283.118.554.329.754.211.2.497.312.795.312.299 0 .585-.112.796-.312.21-.2.33-.471.33-.754zm9 0c0-.59-.503-1.067-1.125-1.067-.223 0-.44.063-.625.18-.185.117-.33.284-.414.479-.085.194-.108.409-.064.616.043.207.15.397.308.546.157.15.357.25.576.292.218.041.444.02.65-.06.205-.081.38-.218.504-.394.124-.175.19-.381.19-.592zm0-8.534h-11.25v6.4h11.25v-6.4z" />
      <Rect width={36} height={16} rx={8} fill={theme.blackOff} />
      <Text
        fill={theme.white}
        fontFamily={fontFamily.bold}
        fontSize={fontSize.xxs}
        textAnchor="middle"
        x="50%"
        y="50%"
      >
        <TSpan y={11.104}>{label}</TSpan>
      </Text>
    </Svg>
  );
};

export default BusSvg;
