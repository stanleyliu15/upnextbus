import React, { useCallback, useMemo } from "react";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";

import Icon from "../Icon";
import LinkItem from "../LinkItem";
import { Strong } from "../Typography";
import { CircleIconButton } from "../Buttons";

import { NextBus, OnPressHandler } from "../../../types";
import { normalizeRouteName } from "../../utils";
import { selectRouteNameOption } from "../../store/features/settings";
import { RouteName, PredictionTime, PredictionMinute, PredictionUnit } from "./itemStyles";
import { space, fontFamily, borderRadius } from "../../styles";
import { selectFavorites, favorite, unfavorite } from "../../store/features/nextbus";

const Container = styled.View`
  background-color: ${({ theme }) => theme.backgroundLight};
  border-radius: ${borderRadius.round};
  padding: ${space.md}px ${space.xxs}px ${space.xxs}px;
`;

const DetailRouteName = styled(RouteName)`
  flex-shrink: 1;
  align-self: center;
  margin-left: ${space.md};
`;

const RowBetween = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RefreshButton = styled(CircleIconButton).attrs({ iconSize: 20 })`
  background-color: transparent;
`;

export const FavoriteButton = styled(CircleIconButton).attrs({ iconSize: 20 })`
  align-self: flex-start;
  background-color: ${({ theme }) => theme.backgroundLight};
`;

type DetailItemProps = {
  predictions: NextBus.Predictions;
  stopDistance: number;
  canRefresh: boolean;
  onRefreshPress: OnPressHandler;
  onDirectionPress?: OnPressHandler;
  onStopPress?: OnPressHandler;
  onServiceAlertsPress?: OnPressHandler;
};

const DetailItem: React.FC<DetailItemProps> = ({
  predictions,
  stopDistance,
  canRefresh,
  onRefreshPress,
  onDirectionPress = undefined,
  onStopPress = undefined,
  onServiceAlertsPress = undefined
}) => {
  const { directionName, stopName, predictionList, stopId, routeId } = predictions;
  const dispatch = useDispatch();
  const predictionMinutes = predictionList.map(prediction => prediction.minutes).join(", ");
  const routeNameOption = useSelector(selectRouteNameOption);
  const favorites = useSelector(selectFavorites);
  const favorited = useMemo(
    () => favorites.some(favorite => favorite.routeId === routeId && favorite.stopId === stopId),
    [favorites, routeId, stopId]
  );
  const handleFavorite = useCallback(
    () => dispatch(favorited ? unfavorite(routeId, stopId) : favorite(routeId, stopId)),
    [dispatch, favorited, routeId, stopId]
  );

  return (
    <Container>
      <RowBetween>
        <DetailRouteName>{normalizeRouteName(predictions[routeNameOption])}</DetailRouteName>
        <FavoriteButton onPress={handleFavorite}>
          <Icon
            icon="FontAwesome"
            name={`heart${favorited ? "" : "-o"}`}
            size={25}
            color="primary"
          />
        </FavoriteButton>
      </RowBetween>
      <LinkItem
        title={directionName}
        onPress={onDirectionPress}
        titleStyle={{ fontFamily: fontFamily.normal }}
        prioritizePropertySpace
        externalLink
      />
      <LinkItem
        title={stopName}
        onPress={onStopPress}
        titleStyle={{ fontFamily: fontFamily.normal }}
        prioritizePropertySpace
        externalLink
        value={stopDistance && `${stopDistance.toFixed(2)} miles`}
      />
      {onServiceAlertsPress && (
        <LinkItem
          icon={<Icon icon="Ionicons" name="ios-warning" size={25} color="yellow" />}
          title="Service Alerts"
          onPress={onServiceAlertsPress}
          titleStyle={{ fontFamily: fontFamily.normal }}
          prioritizePropertySpace
          externalLink
          linkIconColor="yellow"
        />
      )}
      <RowBetween>
        <RefreshButton onPress={canRefresh ? onRefreshPress : undefined}>
          <Icon icon="MaterialIcons" name="refresh" size={33} color="primary" />
        </RefreshButton>
        <PredictionTime>
          {predictionList.length > 0 ? (
            <>
              <PredictionMinute>{predictionMinutes}</PredictionMinute>
              <PredictionUnit>min</PredictionUnit>
            </>
          ) : (
            <Strong center>--</Strong>
          )}
        </PredictionTime>
      </RowBetween>
    </Container>
  );
};

export default DetailItem;
