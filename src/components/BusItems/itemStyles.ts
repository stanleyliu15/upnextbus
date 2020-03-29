import styled from "styled-components/native";

import { Text } from "../Typography";
import { space, fontFamily, fontSize } from "../../styles";

export const DirectionName = styled(Text)`
  color: ${({ theme }) => theme.textLighter};
  margin-top: ${space.md};
`;

export const StopName = styled(Text)`
  color: ${({ theme }) => theme.textLighter};
`;

export const RouteName = styled(Text)`
  font-size: ${fontSize.xlg};
  font-family: ${fontFamily.bold};
`;

export const PredictionTime = styled.View`
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
  margin-left: ${space.xxxs};
`;
