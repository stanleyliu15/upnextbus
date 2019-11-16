import React, { useContext } from "react";
import { GestureResponderEvent } from "react-native";
import { useSelector } from "react-redux";

import { FontAwesome } from "@expo/vector-icons";
import { ThemeContext } from "styled-components";
import { NextBus } from "../../../../types";
import { normalizeRouteName } from "../../../utils";
import { selectRouteNameOption } from "../../../store/features/settings";
import {
  VerticalSeperator,
  Container,
  Main,
  GeneralSection,
  RouteName,
  DirectionName,
  Row,
  StopName,
  PredictionTimeSection,
  PredictionTime,
  PredictionMinute,
  Unit
} from "./itemStyles";
import { fontSize } from "../../../styles";
import { Strong } from "../../atoms";

type Props = {
  predictions: NextBus.Predictions;
  onPredictionsPress?: (event: GestureResponderEvent) => void;
  favorited: boolean;
};

export function PredictionsItem({ predictions, onPredictionsPress = null, favorited }: Props) {
  const { directionName, stopName, predictionList } = predictions;
  const routeNameOption = useSelector(selectRouteNameOption);
  const theme = useContext(ThemeContext);

  return (
    <Container onPress={onPredictionsPress}>
      <Main>
        <GeneralSection>
          <RouteName>{normalizeRouteName(predictions[routeNameOption])}</RouteName>
          <DirectionName>{directionName}</DirectionName>
          <Row>
            {favorited && (
              <FontAwesome name="heart" size={fontSize.primary} color={theme.primary} />
            )}
            <StopName iconSpace={favorited}>{stopName}</StopName>
          </Row>
        </GeneralSection>
        <VerticalSeperator />
        <PredictionTimeSection>
          {predictionList.length ? (
            predictionList.map((prediction, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <PredictionTime key={index}>
                <PredictionMinute>{prediction.minutes}</PredictionMinute>
                <Unit>min</Unit>
              </PredictionTime>
            ))
          ) : (
            <Strong center>--</Strong>
          )}
        </PredictionTimeSection>
      </Main>
    </Container>
  );
}
