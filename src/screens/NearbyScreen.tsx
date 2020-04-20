import React, { useEffect, useState, useContext, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, RefreshControl, Linking } from "react-native";
import { ThemeContext } from "styled-components/native";

import { NavigationProps } from "../../types";
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
  selectFavorites,
  getRoutes
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
  const renderNearbyError = useCallback(() => {
    if (nearby.error instanceof LocationPermissionDeniedError) {
      return (
        <ErrorInfo
          message={nearby.error.message}
          title="Location permissions"
          onRetry={_event => Linking.openURL("app-settings:")}
          onRetryTitle="Go to settings"
          externalLink={true}
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
          onRetry={_event => navigation.navigate("ChangeAgencyScreen")}
          onRetryTitle="Set Agency"
          externalLink={true}
        />
      );
    }

    return <ErrorInfo message={nearby.error.message} />;
  }, [dispatch, navigation, nearby.error]);

  useEffect(() => {
    let didCancel = false;
    function fetchData() {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        dispatch(getRoutes());
        dispatch(getNearbyPredictionsList());
      }
      if (refreshing) {
        dispatch(getNearbyPredictionsList());
        if (!didCancel) {
          setRefreshing(false);
        }
      }
      return () => {
        didCancel = true;
      };
    }

    fetchData();
  }, [dispatch, refreshing]);

  if ((nearby.loading && firstUpdate.current) || (nearby.loading && nearby.data.length === 0)) {
    return <AppLoader />;
  }

  return (
    <SafeArea>
      <FloatingButton onPress={openSettings} iconSize={25} position="bottom-right">
        <Icon icon="Feather" name="settings" size={28} color="primary" />
      </FloatingButton>
      {nearby.error ? (
        renderNearbyError()
      ) : (
        <>
          <FloatingButton onPress={handleRefresh} iconSize={25} position="bottom-left">
            <Icon icon="MaterialIcons" name="refresh" size={35} color="primary" />
          </FloatingButton>
          <FlatList
            style={{ backgroundColor: theme.backgroundLight }}
            data={nearby.data}
            keyExtractor={item => `${item.routeId}-${item.stopId}`}
            renderItem={({ item }) => {
              const favorited = favorites.some(
                favorite => favorite.routeId === item.routeId && favorite.stopId === item.stopId
              );
              const handlePredictionsPress = _event => {
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
