import React, { useContext } from "react";
import { GestureResponderEvent, View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { NextBus } from "../../../../types";
import { normalizeRouteName } from "../../../utils";
import { selectRouteNameOption } from "../../../store/features/settings";
import { RouteName, PredictionTime, PredictionMinute, Unit } from "./itemStyles";
import { space, fontFamily } from "../../../styles";
import { LinkItem } from "../Settings";
import { CircularIconButton } from "../../molecules";
import { selectFavorites, favorite, unfavorite } from "../../../store/features/nextbus";
import { Strong } from "../../atoms";

type Props = {
  predictions: NextBus.Predictions;
  onDirectionPress?: (event: GestureResponderEvent) => void;
  onStopPress?: (event: GestureResponderEvent) => void;
  onRefreshPress: (event: GestureResponderEvent) => void;
  onServiceAlertsPress?: (event: GestureResponderEvent) => void;
  canRefresh: boolean;
};

export function DetailItem({
  predictions,
  canRefresh,
  onDirectionPress = undefined,
  onStopPress = undefined,
  onRefreshPress,
  onServiceAlertsPress = undefined
}: Props) {
  const theme = useContext(ThemeContext);
  const { directionName, stopName, predictionList, stopId, routeId } = predictions;
  const dispatch = useDispatch();
  const predictionMinutes = predictionList.map(prediction => prediction.minutes).join(", ");
  const routeNameOption = useSelector(selectRouteNameOption);
  const favorites = useSelector(selectFavorites);
  const favorited = favorites.some(
    favorite => favorite.routeId === routeId && favorite.stopId === stopId
  );
  const handleFavorite = () => {
    if (favorited) {
      dispatch(unfavorite(routeId, stopId));
    } else {
      dispatch(favorite(routeId, stopId));
    }
  };

  return (
    <>
      <Between>
        <MyRouteName>{normalizeRouteName(predictions[routeNameOption])}</MyRouteName>
        <FavoriteButton favorited={favorited} onPress={handleFavorite} />
      </Between>
      <MyLinkItem
        as={onDirectionPress ? undefined : View}
        title={directionName}
        onPress={onDirectionPress}
        prioritizePropertySpace
        externalLink
      />
      <MyLinkItem
        as={onStopPress ? undefined : View}
        title={stopName}
        onPress={onStopPress}
        prioritizePropertySpace
        externalLink
      />
      {onServiceAlertsPress && (
        <MyLinkItem
          icon={<Ionicons name="ios-warning" size={25} color={theme.warning} />}
          title="Service Alerts"
          onPress={onServiceAlertsPress}
          prioritizePropertySpace
          externalLink
        />
      )}
      <RefreshAndTimes>
        <Refresh onPress={canRefresh && onRefreshPress} />
        <PredictionTime>
          {predictionList.length > 0 ? (
            <>
              <PredictionMinute>{predictionMinutes}</PredictionMinute>
              <Unit>min</Unit>
            </>
          ) : (
            <Strong center>--</Strong>
          )}
        </PredictionTime>
      </RefreshAndTimes>
    </>
  );
}

const MyRouteName = styled(RouteName)`
  flex-shrink: 1;
  padding: ${space.small} ${space.medium} ${space.small} ${space.xLarge};
`;

export const MyLinkItem = styled(LinkItem).attrs(props => ({
  ...props,
  titleStyle: { fontFamily: fontFamily.normal }
}))`
  height: auto;

  padding-top: ${space.xLarge};
  padding-bottom: ${space.xLarge};
`;

export const Between = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RefreshAndTimes = styled(Between)`
  margin-top: ${space.large};
`;

const Refresh = styled(CircularIconButton).attrs(props => ({
  iconSize: 25,
  children: <MaterialIcons name="refresh" size={33} color={props.theme.primary} />
}))``;

export const FavoriteButton = styled(CircularIconButton).attrs(props => ({
  underlayColor: props.theme.backgroundDark,
  iconSize: 25,
  children: (
    <FontAwesome
      name={`heart${props.favorited ? "" : "-o"}`}
      size={25}
      color={props.favorited ? props.theme.primary : props.theme.primary}
    />
  )
}))`
  align-self: flex-start;
`;
