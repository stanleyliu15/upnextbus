import React from "react";
import styled from "styled-components/native";

import { Text } from "../../atoms";
import { normalizeRouteName } from "../../../utils";
import { space, border, fontFamily, fontSize } from "../../../styles";

interface Props {
  predictions: NextBus.Predictions;
}

export function PredictionsItem({ predictions }: Props) {
  const { routeId, directionNames, stopName, predictionList } = predictions;

  return (
    <Wrapper>
      <Container>
        <GeneralSection>
          <RouteName>{normalizeRouteName(routeId)}</RouteName>
          <DirectionContainer>
            {directionNames.map(directionName => (
              <DirectionName key={directionName}>{directionName}</DirectionName>
            ))}
          </DirectionContainer>
          <StopName>{stopName}</StopName>
        </GeneralSection>
        <VerticalSeperator />
        <PredictionTimeSection>
          {predictionList.length ? (
            predictionList.map(prediction => (
              <PredictionTime key={prediction.tripId}>
                <PredictionMinute>{prediction.minutes}</PredictionMinute>
                <PredictionUnit>min</PredictionUnit>
              </PredictionTime>
            ))
          ) : (
            <DashDash>--</DashDash>
          )}
        </PredictionTimeSection>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.backgroundLight};
  padding: ${space.medium};
`;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  border-radius: ${border.round};
  border: 0.33px solid ${({ theme }) => theme.lighter};
`;

const GeneralSection = styled.View`
  flex: 8.4;
  padding: ${space.xLarge} ${space.large} ${space.xxLarge} ${space.xxxLarge};
`;

const VerticalSeperator = styled.View`
  flex: 0.2;
  border-color: ${({ theme }) => theme.lighter};
  border-left-width: 0.25px;
  margin-top: ${space.xxLarge};
  margin-bottom: ${space.xxLarge};
`;

const RouteName = styled(Text)`
  font-size: ${fontSize.xxLarge};
  font-family: ${fontFamily.bold};
`;

const DirectionContainer = styled.View`
  margin-top: ${space.xLarge};
`;

const DirectionName = styled(Text)`
  font-size: ${fontSize.primary};
  color: ${({ theme }) => theme.shadow};
`;

const StopName = styled(Text)`
  margin-top: ${space.large};
  font-size: ${fontSize.primary};
  color: ${({ theme }) => theme.shadow};
`;

const DashDash = styled(Text)`
  font-family: ${fontFamily.light};
  font-size: ${fontSize.large};
  text-align: center;
`;

const PredictionTimeSection = styled.View`
  flex: 1.4;
  padding: ${space.xxLarge} ${space.xLarge} ${space.xLarge} ${space.medium};
`;

const PredictionTime = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: baseline;
  margin-bottom: ${space.medium};
`;

const PredictionMinute = styled(Text)`
  font-size: ${fontSize.large};
`;

const PredictionUnit = styled(Text)`
  font-size: ${fontSize.nano};
  margin-left: ${space.nano};
`;
