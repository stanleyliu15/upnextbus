import React, { useEffect, useState, useContext, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, RefreshControl, GestureResponderEvent, Linking } from "react-native";
import { ThemeContext } from "styled-components/native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { NextBus, NavigationProps } from "../../types";
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
import {
  LocationPermissionDeniedError,
  NextBusNoNearbyError,
  NextBusNoNearbyAgencyError
} from "../errors";

function NearbyScreen({ navigation }: NavigationProps) {
  const dispatch = useDispatch();
  const nearby = useSelector(selectNearbyPredictionList);
  const theme = useContext(ThemeContext);
  const firstUpdate = useRef(true);
  const [refreshing, setRefreshing] = useState(false);
  const { data: routes } = useSelector(selectRoutes);
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    async function fetchData() {
      if (firstUpdate.current) {
        await dispatch(getNearbyPredictionsList());
        firstUpdate.current = false;
      }
      if (refreshing) {
        await dispatch(getNearbyPredictionsList());
        setRefreshing(false);
      }
    }

    fetchData();
  }, [dispatch, refreshing]);

  const handleRefresh = () => setRefreshing(true);

  const openSettings = () => navigation.navigate("SettingsScreen");

  function getMainView() {
    if (nearby.error) {
      if (nearby.error instanceof LocationPermissionDeniedError) {
        return (
          <ErrorInfo
            title="Location permissions"
            message={nearby.error.message}
            onRetry={_event => Linking.openURL("app-settings:")}
            onRetryTitle="Go to settings"
            externalLink
          />
        );
      }

      if (nearby.error instanceof NextBusNoNearbyError) {
        return (
          <ErrorInfo
            message={nearby.error.message}
            onRetry={_event => dispatch(getNearbyPredictionsList())}
          />
        );
      }

      if (nearby.error instanceof NextBusNoNearbyAgencyError) {
        return (
          <ErrorInfo
            message={nearby.error.message}
            onRetry={_event => {
              navigation.navigate("ChangeAgencyScreen");
            }}
            onRetryTitle="Set Agency"
            externalLink
          />
        );
      }

      return <ErrorInfo message={nearby.error.message} />;
    }

    if (nearby.loading && firstUpdate.current) {
      return <Loader />;
    }

    return (
      <Fragment>
        <FloatingButton onPress={handleRefresh} iconSize={28} position="bottom-left">
          <MaterialIcons name="refresh" size={35} color={theme.primary} />
        </FloatingButton>
        <FlatList
          style={{
            backgroundColor: theme.backgroundLight
          }}
          data={nearby.data}
          keyExtractor={(item: NextBus.Predictions) => `${item.routeId}-${item.stopId}`}
          renderItem={({ item }) => (
            <PredictionsItem
              favorited={favorites.some(
                favorite => favorite.routeId === item.routeId && favorite.stopId === item.stopId
              )}
              predictions={item}
              onPredictionsPress={(_event: GestureResponderEvent): void => {
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
      </Fragment>
    );
  }

  return (
    <SafeArea>
      <FloatingButton onPress={openSettings} iconSize={28} position="bottom-right">
        <Feather name="settings" size={28} color={theme.primary} />
      </FloatingButton>
      {getMainView()}
    </SafeArea>
  );
}

export default NearbyScreen;
