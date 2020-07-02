import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";

import Icon from "../Icon";
import { Strong } from "../Typography";
import { HighlightButton } from "../Buttons";
import { NextBus, OnPressHandler } from "../../../types";
import { normalizeRouteName } from "../../utils";
import { selectShowRouteIdForDisplay } from "../../store/features/settings";
import {
  RouteName,
  DirectionName,
  StopName,
  PredictionTime,
  PredictionMinute,
  PredictionUnit
} from "./itemStyles";
import { space, border } from "../../styles";

type PredictionsItemProps = {
  predictions: NextBus.Predictions;
  onPredictionsPress?: OnPressHandler;
  favorited: boolean;
};

const ItemButton = styled(HighlightButton)`
  ${border({ direction: "bottom" })}
`;

const Container = styled.View`
  display: flex;
  flex-direction: row;
`;

const Block = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: ${space.md};
`;

const GeneralSection = styled.View`
  flex: 8.4;
  padding: ${space.md};
`;

const VerticalSeperator = styled.View`
  flex: 0.2;
  ${border({ direction: "left" })};
  margin-vertical: ${space.md};
`;

export const PredictionTimeSection = styled.View`
  flex: 1.4;
  padding: ${space.md} ${space.md} ${space.xs};
`;

const PredictionsItem: React.FC<PredictionsItemProps> = ({
  predictions,
  onPredictionsPress = null,
  favorited
}) => {
  const { directionName, stopName, predictionList } = predictions;
  const showRouteIdForDisplay = useSelector(selectShowRouteIdForDisplay);
  const routeName = useMemo(
    () => normalizeRouteName(showRouteIdForDisplay ? predictions.routeId : predictions.routeName),
    [predictions.routeId, predictions.routeName, showRouteIdForDisplay]
  );

  return (
    <ItemButton onPress={onPredictionsPress}>
      <Container>
        <GeneralSection>
          <RouteName>{routeName}</RouteName>
          <DirectionName color="textLighter">{directionName}</DirectionName>
          <Block>
            {favorited && <Icon icon="FontAwesome" name="heart" size="xs" color="red" />}
            <StopName iconSpace={favorited} color="textLighter">
              {stopName}
            </StopName>
          </Block>
        </GeneralSection>
        <VerticalSeperator />
        <PredictionTimeSection>
          {predictionList.length ? (
            predictionList.map((prediction, index) => (
              <PredictionTime key={`${prediction.epochTime + index}`}>
                <PredictionMinute>{prediction.minutes}</PredictionMinute>
                <PredictionUnit>min</PredictionUnit>
              </PredictionTime>
            ))
          ) : (
            <Strong center>- -</Strong>
          )}
        </PredictionTimeSection>
      </Container>
    </ItemButton>
  );
};

export default PredictionsItem;
