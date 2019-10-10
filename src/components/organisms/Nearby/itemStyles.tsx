import styled from "styled-components/native";

import { Text } from "../../atoms";
import { space, border, fontFamily, fontSize } from "../../../styles";

export const Wrapper = styled.View`
  padding: ${space.medium};
`;

export const Container = styled.TouchableHighlight`
  background-color: ${({ theme }) => theme.backgroundLight};
  border-radius: ${border.round};
  border: 0.33px solid ${({ theme }) => theme.lighter};
`;

export const Main = styled.View`
  display: flex;
  flex-direction: row;
`;

export const GeneralSection = styled.View`
  flex: 8.4;
  padding: ${space.xLarge} ${space.large} ${space.xxLarge} ${space.xxxLarge};
`;

export const VerticalSeperator = styled.View`
  flex: 0.2;
  border-color: ${({ theme }) => theme.lighter};
  border-left-width: 0.25px;
  margin-top: ${space.xxLarge};
  margin-bottom: ${space.xxLarge};
`;

export const RouteName = styled(Text)`
  font-size: ${fontSize.large};
  font-family: ${fontFamily.bold};
`;

export const DirectionName = styled(Text)`
  font-size: ${fontSize.primary};
  color: ${({ theme }) => theme.textLighter};
  margin-top: ${space.xLarge};
`;

export const StopName = styled(Text)`
  margin-top: ${space.large};
  font-size: ${fontSize.primary};
  color: ${({ theme }) => theme.textLighter};
`;

export const DashDash = styled(Text)`
  font-family: ${fontFamily.light};
  font-size: ${fontSize.large};
  text-align: center;
`;

export const PredictionTimeSection = styled.View`
  flex: 1.4;
  padding: ${space.xxLarge} ${space.xLarge} ${space.xLarge} ${space.medium};
`;

export const PredictionTime = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: baseline;
  margin-bottom: ${space.medium};
`;

export const PredictionMinute = styled(Text)`
  font-size: ${fontSize.large};
`;

export const PredictionUnit = styled(Text)`
  font-size: ${fontSize.nano};
  margin-left: ${space.nano};
`;
