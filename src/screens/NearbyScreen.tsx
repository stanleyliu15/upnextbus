import React, { useEffect, useState, useContext, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, RefreshControl, Linking } from "react-native";
import { ThemeContext } from "styled-components/native";

import { NextBus, NavigationProps, OnPressHandler } from "../../types";
import {
  AppLoader,
  Icon,
  SafeArea,
  ErrorInfo,
  FloatingButton,
  PredictionsItem
} from "../components";
import {
  getNearbyPredictionsList,
  selectNearbyPredictionList,
  selectRoutes,
  selectFavorites
} from "../store/features/nextbus";
import {
  LocationPermissionDeniedError,
  NextBusNoNearbyError,
  NextBusNoNearbyAgencyError
} from "../errors";

const NearbyScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const nearby = useSelector(selectNearbyPredictionList);
  const theme = useContext(ThemeContext);
  const firstUpdate = useRef(true);
  const [refreshing, setRefreshing] = useState(false);
  const { data: routes } = useSelector(selectRoutes);
  const favorites = useSelector(selectFavorites);
  const handleRefresh = useCallback(() => setRefreshing(true), []);
  const openSettings = useCallback(() => navigation.navigate("SettingsScreen"), [navigation]);
  const getErrorComponent = error => {
    if (error instanceof LocationPermissionDeniedError) {
      return (
        <ErrorInfo
          title="Location permissions"
          message={error.message}
          onRetry={_event => Linking.openURL("app-settings:")}
          onRetryTitle="Go to settings"
          externalLink
        />
      );
    }

    if (error instanceof NextBusNoNearbyError) {
      return (
        <ErrorInfo
          message={error.message}
          onRetry={_event => dispatch(getNearbyPredictionsList())}
        />
      );
    }

    if (error instanceof NextBusNoNearbyAgencyError) {
      return (
        <ErrorInfo
          message={error.message}
          onRetry={_event => navigation.navigate("ChangeAgencyScreen")}
          onRetryTitle="Set Agency"
          externalLink
        />
      );
    }

    return <ErrorInfo message={error.message} />;
  };

  useEffect(() => {
    async function fetchData() {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        await dispatch(getNearbyPredictionsList());
      }
      if (refreshing) {
        await dispatch(getNearbyPredictionsList());
        setRefreshing(false);
      }
    }

    fetchData();
  }, [dispatch, refreshing]);

  if (nearby.loading && firstUpdate.current) {
    return <AppLoader />;
  }

  return (
    <SafeArea>
      <FloatingButton onPress={openSettings} iconSize={25} position="bottom-right">
        <Icon icon="Feather" name="settings" size={28} color="primary" />
      </FloatingButton>
      {nearby.error ? (
        getErrorComponent(nearby.error)
      ) : (
        <>
          <FloatingButton onPress={handleRefresh} iconSize={25} position="bottom-left">
            <Icon icon="MaterialIcons" name="refresh" size={35} color="primary" />
          </FloatingButton>
          <FlatList
            style={{ backgroundColor: theme.backgroundLight }}
            data={nearby.data}
            keyExtractor={(item: NextBus.Predictions) => `${item.routeId}-${item.stopId}`}
            renderItem={({ item }) => {
              const favorited = favorites.some(
                favorite => favorite.routeId === item.routeId && favorite.stopId === item.stopId
              );
              const handlePredictionsPress: OnPressHandler = _event => {
                const route = routes.find(route => route.id === item.routeId);
                const { directions } = route;
                const direction = directions.find(direction =>
                  direction.stops.some(stop => stop.id === item.stopId)
                );
                const stop = direction.stops.find(stop => stop.id === item.stopId);
                navigation.navigate("DetailScreen", {
                  predictions: item,
                  route,
                  directions,
                  direction,
                  stop
                });
              };

              return (
                <PredictionsItem
                  favorited={favorited}
                  predictions={item}
                  onPredictionsPress={handlePredictionsPress}
                />
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={theme.secondaryLight}
              />
            }
          />
        </>
      )}
    </SafeArea>
  );
};

export default NearbyScreen;
