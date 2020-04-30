import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";

import Icon from "../Icon";
import { Strong } from "../Typography";
import { NextBus, OnPressHandler } from "../../../types";
import { normalizeRouteName } from "../../utils";
import { selectRouteNameOption } from "../../store/features/settings";
import {
  RouteName,
  DirectionName,
  StopName,
  PredictionTime,
  PredictionMinute,
  PredictionUnit
} from "./itemStyles";
import { space, borderSize } from "../../styles";

type PredictionsItemProps = {
  predictions: NextBus.Predictions;
  onPredictionsPress?: OnPressHandler;
  favorited: boolean;
};

const ItemButton = styled.TouchableHighlight.attrs(({ theme }) => ({
  underlayColor: theme.backgroundDark
}))`
  border-bottom-color: ${({ theme }) => theme.grayLight};
  border-bottom-width: ${borderSize.xs};
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
  border-color: ${({ theme }) => theme.grayLight};
  border-left-width: ${borderSize.xs};
  margin: ${space.md} ${space.xxs} ${space.xxs} ${space.md};
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
  const routeNameOption = useSelector(selectRouteNameOption);

  return (
    <ItemButton onPress={onPredictionsPress}>
      <Container>
        <GeneralSection>
          <RouteName>{normalizeRouteName(predictions[routeNameOption])}</RouteName>
          <DirectionName>{directionName}</DirectionName>
          <Block>
            {favorited && <Icon icon="FontAwesome" name="heart" size={15} color="primary" />}
            <StopName iconSpace={favorited}>{stopName}</StopName>
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
            <Strong center>--</Strong>
          )}
        </PredictionTimeSection>
      </Container>
    </ItemButton>
  );
};

export default PredictionsItem;
