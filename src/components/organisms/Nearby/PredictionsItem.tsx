import React from "react";
import { GestureResponderEvent } from "react-native";
import { useSelector } from "react-redux";

import { normalizeRouteName } from "../../../utils";
import { selectRouteNameOption } from "../../../store/features/settings";
import {
  VerticalSeperator,
  Wrapper,
  Container,
  Main,
  GeneralSection,
  RouteName,
  DirectionName,
  StopName,
  PredictionTimeSection,
  PredictionTime,
  PredictionMinute,
  PredictionUnit,
  DashDash
} from "./itemStyles";

type Props = {
  predictions: NextBus.Predictions;
  onPredictionsPress?: (event: GestureResponderEvent) => void;
};

export function PredictionsItem({ predictions, onPredictionsPress = null }: Props) {
  const { directionName, stopName, predictionList } = predictions;
  const routeNameOption = useSelector(selectRouteNameOption);

  return (
    <Wrapper>
      <Container onPress={onPredictionsPress}>
        <Main>
          <GeneralSection>
            <RouteName>{normalizeRouteName(predictions[routeNameOption])}</RouteName>
            <DirectionName>{directionName}</DirectionName>
            <StopName>{stopName}</StopName>
          </GeneralSection>
          <VerticalSeperator />
          <PredictionTimeSection>
            {predictionList.length ? (
              predictionList.map((prediction, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <PredictionTime key={index}>
                  <PredictionMinute>{prediction.minutes}</PredictionMinute>
                  <PredictionUnit>min</PredictionUnit>
                </PredictionTime>
              ))
            ) : (
              <DashDash>--</DashDash>
            )}
          </PredictionTimeSection>
        </Main>
      </Container>
    </Wrapper>
  );
}
