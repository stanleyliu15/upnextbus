import React, { useCallback, useMemo, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";
import { transparentize } from "polished";
import { getInset } from "react-native-safe-area-view";
import GestureRecognizer from "react-native-swipe-gestures";

import Icon from "../Icon";
import { Strong } from "../Typography";
import { IconButton } from "../Buttons";
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

const bottomInset = getInset("bottom");

const Panel = styled.View`
  position: absolute;
  bottom: ${bottomInset}px;
  width: 100%;

  padding: ${space.xs};
`;

const RouteInfo = styled.View`
  padding: ${space.xs};
`;

const Route = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DetailRouteName = styled(RouteName)`
  flex-shrink: 1;
  align-self: center;
  margin-left: ${space.md};
`;

const Prediction = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: ${space.sm};
  border-radius: ${borderRadius.round};
  background-color: ${({ theme }) => theme.backgroundLight};
  padding: ${space.xs} ${space.sm} ${space.xs} ${space.xxxs};
`;

const DetailPredictionTime = styled(PredictionTime)`
  align-self: center;
`;

const Slider = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;

  background-color: ${({ theme }) => theme.background};
  border-top-left-radius: ${borderRadius.round};
  border-top-right-radius: ${borderRadius.round};
`;

const RefreshButton = styled(IconButton)`
  background-color: transparent;
`;

export const FavoriteButton = styled(IconButton)`
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
  const [showExtraData, setShowExtraData] = useState(true);
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
    <Panel>
      <GestureRecognizer
        style={{
          backgroundColor: theme.backgroundLight,
          borderRadius: parseInt(borderRadius.round, 10)
        }}
        onSwipeUp={() => setShowExtraData(true)}
        onSwipeDown={() => setShowExtraData(false)}
      >
        <Slider>
          <Icon icon="MaterialIcons" name="drag-handle" size="md" color="grey" />
        </Slider>
        <RouteInfo>
          <Route>
            <DetailRouteName>{routeName}</DetailRouteName>
            <FavoriteButton onPress={handleFavorite} iconSize="md">
              <Icon
                icon="FontAwesome"
                name={`heart${favorited ? "" : "-o"}`}
                size="md"
                color="red"
              />
            </FavoriteButton>
          </Route>
          {showExtraData && (
            <>
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
                  icon={<Icon icon="Ionicons" name="ios-warning" size="md" color="yellow" />}
                  title="Service Alerts"
                  onPress={onServiceAlertsPress}
                  titleStyle={{ fontFamily: fontFamily.normal }}
                  prioritizePropertySpace
                  externalLink
                  linkIconColor="yellow"
                  highlightColor={transparentize(0.6, theme.yellow)}
                  showBottomBorder={false}
                />
              )}
            </>
          )}
        </RouteInfo>
      </GestureRecognizer>
      <Prediction>
        <RefreshButton onPress={canRefresh ? onRefreshPress : undefined} iconSize="sm">
          <Icon icon="MaterialIcons" name="refresh" size="lg" color="primary" />
        </RefreshButton>
        <DetailPredictionTime>
          {predictionList.length > 0 ? (
            <>
              <PredictionMinute>{predictionMinutes}</PredictionMinute>
              <PredictionUnit>min</PredictionUnit>
            </>
          ) : (
            <Strong center>- -</Strong>
          )}
        </DetailPredictionTime>
      </Prediction>
    </Panel>
  );
};

export default DetailItem;
