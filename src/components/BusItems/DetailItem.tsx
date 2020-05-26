import React, { useCallback, useMemo } from "react";
import styled, { useTheme } from "styled-components/native";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";
import { transparentize } from "polished";

import Icon from "../Icon";
import { Strong } from "../Typography";
import { CircleIconButton } from "../Buttons";

import { NextBus, OnPressHandler } from "../../../types";
import { normalizeRouteName } from "../../utils";
import {
  selectShowRouteIdForDisplay,
  selectFavoriteStopLabels,
  favoriteStopLabel,
  unfavoriteStopLabel
} from "../../store/features/settings";
import { RouteName, PredictionTime, PredictionMinute, PredictionUnit } from "./itemStyles";
import { space, fontFamily, borderRadius } from "../../styles";
import { LinkItem } from "../UserItems";
import { useDispatch } from "../../store";

const Container = styled.View`
  background-color: ${({ theme }) => theme.backgroundLight};
  border-radius: ${borderRadius.round};
  padding: ${space.md} ${space.xxs} ${space.xxs};
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
  onDirectionPress = null,
  onStopPress = null,
  onServiceAlertsPress = null
}) => {
  const { directionName, stopName, predictionList, stopLabel: predictionsStopLabel } = predictions;
  const dispatch = useDispatch();
  const theme = useTheme();
  const showRouteIdForDisplay = useSelector(selectShowRouteIdForDisplay);
  const favoriteStopLabels = useSelector(selectFavoriteStopLabels);
  const routeName = useMemo(
    () => normalizeRouteName(showRouteIdForDisplay ? predictions.routeId : predictions.routeName),
    [predictions.routeId, predictions.routeName, showRouteIdForDisplay]
  );
  const predictionMinutes = useMemo(
    () => predictionList.map(prediction => prediction.minutes).join(", "),
    [predictionList]
  );
  const favorited = useMemo(
    () => favoriteStopLabels.some(stopLabel => isEqual(stopLabel, predictionsStopLabel)),
    [favoriteStopLabels, predictionsStopLabel]
  );
  const handleFavorite = useCallback(
    () =>
      dispatch(
        favorited
          ? unfavoriteStopLabel(predictionsStopLabel)
          : favoriteStopLabel(predictionsStopLabel)
      ),
    [dispatch, favorited, predictionsStopLabel]
  );

  return (
    <Container>
      <RowBetween>
        <DetailRouteName>{routeName}</DetailRouteName>
        <FavoriteButton onPress={handleFavorite}>
          <Icon icon="FontAwesome" name={`heart${favorited ? "" : "-o"}`} size={25} color="red" />
        </FavoriteButton>
      </RowBetween>
      <LinkItem
        title={directionName}
        onPress={onDirectionPress}
        titleStyle={{ fontFamily: fontFamily.normal }}
        prioritizePropertySpace
        externalLink
        showBottomBorder={false}
      />
      <LinkItem
        title={stopName}
        onPress={onStopPress}
        titleStyle={{ fontFamily: fontFamily.normal }}
        prioritizePropertySpace
        externalLink
        value={stopDistance && `${stopDistance.toFixed(2)} miles`}
        showBottomBorder={false}
      />
      {onServiceAlertsPress && (
        <LinkItem
          icon={<Icon icon="Ionicons" name="ios-warning" size={20} color="yellow" />}
          title="Service Alerts"
          onPress={onServiceAlertsPress}
          titleStyle={{ fontFamily: fontFamily.normal }}
          prioritizePropertySpace
          externalLink
          linkIconColor="yellow"
          highlightColor={transparentize(0.4, theme.yellow)}
          showBottomBorder={false}
        />
      )}
      <RowBetween>
        <RefreshButton onPress={canRefresh ? onRefreshPress : undefined}>
          <Icon icon="MaterialIcons" name="refresh" size={30} color="primary" />
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
