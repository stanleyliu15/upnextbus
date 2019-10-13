import React, { useContext } from "react";
import { GestureResponderEvent, View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome, Feather } from "@expo/vector-icons";

import { normalizeRouteName } from "../../../utils";
import { selectRouteNameOption } from "../../../store/features/settings";
import {
  RouteName,
  PredictionTime,
  PredictionMinute,
  PredictionUnit,
  DashDash
} from "./itemStyles";
import { space, border, fontFamily } from "../../../styles";
import { LinkItem } from "../Settings";
import { CircularIconButton } from "../../molecules";
import { selectFavorites, favorite, unfavorite } from "../../../store/features/nextbus";

type Props = {
  predictions: NextBus.Predictions;
  onDirectionPress?: (event: GestureResponderEvent) => void;
  onStopPress?: (event: GestureResponderEvent) => void;
  onRefreshPress: (event: GestureResponderEvent) => void;
};

export function DetailItem({
  predictions,
  onDirectionPress = undefined,
  onStopPress = undefined,
  onRefreshPress
}: Props) {
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
      />
      <MyLinkItem
        as={onStopPress ? undefined : View}
        title={stopName}
        onPress={onStopPress}
        prioritizePropertySpace
      />
      <RefreshAndTimes>
        <Refresh onPress={onRefreshPress} />
        <PredictionTime>
          {predictionList.length > 0 ? (
            <>
              <PredictionMinute>{predictionMinutes}</PredictionMinute>
              <PredictionUnit>min</PredictionUnit>
            </>
          ) : (
            <DashDash>--</DashDash>
          )}
        </PredictionTime>
      </RefreshAndTimes>
    </>
  );
}

const MyRouteName = styled(RouteName)`
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

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: ${space.medium};
  background: ${({ theme }) => theme.backgroundDark};
  border-radius: ${border.round};
`;

const Refresh = styled(CircularIconButton).attrs(props => ({
  underlayColor: props.theme.backgroundDark,
  iconSize: 20,
  children: <Feather name="refresh-cw" size={20} color={props.theme.primary} />
}))`
  padding: ${space.large};
  border: 2px solid ${({ theme }) => theme.primary};
`;

const FavoriteButton = styled(CircularIconButton).attrs(props => ({
  underlayColor: props.theme.backgroundDark,
  iconSize: 25,
  children: (
    <FontAwesome
      name={`heart${props.favorited ? "" : "-o"}`}
      size={25}
      color={props.favorited ? props.theme.primary : props.theme.primary}
    />
  )
}))``;
