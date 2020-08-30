import styled from "styled-components/native";

import { Platform } from "react-native";
import { Text } from "../Typography";
import { space, fontFamily, fontSize } from "../../styles";

export const RouteName = styled(Text)`
  font-size: ${fontSize.xlg};
  font-family: ${fontFamily.bold};
`;

export const DirectionName = styled(Text)`
  margin-top: ${space.md};
`;

export const StopName = styled(Text)``;

export const PredictionTime = styled[Platform.OS === "ios" ? "View" : "Text"]`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: baseline;
  align-self: flex-end;
  margin-bottom: ${space.xs};
`;

export const PredictionMinute = styled(Text)`
  font-size: ${fontSize.xlg};
`;

export const PredictionUnit = styled(Text)`
  font-size: ${fontSize.xs};
`;
