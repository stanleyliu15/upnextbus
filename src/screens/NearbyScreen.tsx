import React, { useEffect, useState, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FlatList,
  RefreshControl,
  GestureResponderEvent,
  View,
  TouchableOpacity
} from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { Entypo, Feather } from "@expo/vector-icons";

import { Loader, Button } from "../components/atoms";
import { ErrorInfo, FloatingButton, CircularIconButton } from "../components/molecules";
import {
  getNearbyPredictionsList,
  selectNearbyPredictionList,
  selectFilterRouteIds,
  selectRoutes
} from "../store/features/nextbus";
import { PredictionsItem } from "../components/organisms/Nearby";
import SafeArea from "../layouts/SafeArea";

function NearbyScreen({ navigation }) {
  const dispatch = useDispatch();
  const nearby = useSelector(selectNearbyPredictionList);
  const filterRouteIds = useSelector(selectFilterRouteIds);
  const theme = useContext(ThemeContext);
  const firstUpdate = useRef(true);
  const [refreshing, setRefreshing] = useState(false);
  const { data: routes } = useSelector(selectRoutes);

  useEffect(() => {
    if (firstUpdate.current) {
      dispatch(getNearbyPredictionsList());
      firstUpdate.current = false;
    }
    if (refreshing) {
      dispatch(getNearbyPredictionsList()).then(() => {
        setRefreshing(false);
      });
    }
  }, [dispatch, refreshing]);

  const handleRefresh = () => setRefreshing(true);

  // const openSettings = () =>
  //   navigation.navigate({ routeName: "SettingsScreen", key: "detailsScreenKey" });

  if (nearby.loading && firstUpdate.current) {
    return <Loader />;
  }

  if (nearby.error) {
    return (
      <ErrorInfo
        message={nearby.error.message}
        onRetry={() => dispatch(getNearbyPredictionsList())}
      />
    );
  }

  const data =
    filterRouteIds.length === 0
      ? nearby.data
      : nearby.data.filter(prediction => filterRouteIds.includes(prediction.routeId));

  return (
    <SafeArea>
      <FloatingButton onPress={handleRefresh} iconSize={28} position="bottom-left">
        <Feather name="refresh-cw" size={28} color={theme.primary} />
      </FloatingButton>
      <FlatList
        data={data}
        keyExtractor={(item: NextBus.Predictions) => `${item.routeId}-${item.stopId}`}
        renderItem={({ item }) => (
          <PredictionsItem
            predictions={item}
            onPredictionsPress={(event: GestureResponderEvent): void => {
              const route = routes.find(route => route.id === item.routeId);
              const { directions } = route;
              const direction = directions.find(dir => {
                return dir.stops.some(stop => stop.id === item.stopId);
              });
              const stop = direction.stops.find(stop => {
                return stop.id === item.stopId;
              });
              navigation.navigate("DetailScreen", {
                predictions: item,
                route,
                directions,
                direction,
                stop
              });
            }}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.primary}
          />
        }
      />
    </SafeArea>
  );
}

export default NearbyScreen;
