import React, { useEffect, useState, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, RefreshControl, GestureResponderEvent } from "react-native";
import { ThemeContext } from "styled-components/native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

import { Loader } from "../components/atoms";
import { ErrorInfo, FloatingButton } from "../components/molecules";
import {
  getNearbyPredictionsList,
  selectNearbyPredictionList,
  selectRoutes,
  selectFavorites
} from "../store/features/nextbus";
import { PredictionsItem } from "../components/organisms/Nearby";
import SafeArea from "../layouts/SafeArea";

function NearbyScreen({ navigation }) {
  const dispatch = useDispatch();
  const nearby = useSelector(selectNearbyPredictionList);
  const theme = useContext(ThemeContext);
  const firstUpdate = useRef(true);
  const [refreshing, setRefreshing] = useState(false);
  const { data: routes } = useSelector(selectRoutes);
  const favorites = useSelector(selectFavorites);

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

  const openSettings = () => navigation.navigate("SettingsScreen");

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

  return (
    <SafeArea>
      <FloatingButton onPress={handleRefresh} iconSize={28} position="bottom-left">
        <MaterialIcons name="refresh" size={35} color={theme.primary} />
      </FloatingButton>
      <FloatingButton onPress={openSettings} iconSize={28} position="bottom-right">
        <Feather name="settings" size={28} color={theme.primary} />
      </FloatingButton>
      <FlatList
        data={nearby.data}
        keyExtractor={(item: NextBus.Predictions) => `${item.routeId}-${item.stopId}`}
        renderItem={({ item }) => (
          <PredictionsItem
            favorited={favorites.some(
              favorite => favorite.routeId === item.routeId && favorite.stopId === item.stopId
            )}
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
