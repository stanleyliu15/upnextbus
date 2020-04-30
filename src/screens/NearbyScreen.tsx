import React, { useEffect, useState, useContext, useRef, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, RefreshControl, Linking } from "react-native";
import { ThemeContext } from "styled-components/native";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

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
  NextBusNoNearbyAgencyError,
  NextBusAPIError
} from "../errors";
import { RootStackParamList } from "../../types";

type NearbyScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, "Nearby">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<RootStackParamList, "Nearby">;
};

const NearbyScreen: React.FC<NearbyScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const nearby = useSelector(selectNearbyPredictionList);
  const theme = useContext(ThemeContext);
  const firstUpdate = useRef(true);
  const [refreshing, setRefreshing] = useState(false);
  const { data: routes } = useSelector(selectRoutes);
  const favorites = useSelector(selectFavorites);
  const handleRefresh = useCallback(() => setRefreshing(true), []);
  const fetchData = useCallback(() => dispatch(getNearbyPredictionsList()), [dispatch]);
  const openSettings = useCallback(() => navigation.navigate("Settings"), [navigation]);
  const renderNearbyError = useMemo(() => {
    if (!nearby.error) {
      return null;
    }

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
      return <ErrorInfo message={nearby.error.message} onRetry={fetchData} />;
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

    if (nearby.error instanceof NextBusAPIError) {
      return (
        <ErrorInfo
          message={nearby.error.message}
          onRetry={nearby.error.retriable ? fetchData : undefined}
        />
      );
    }

    return <ErrorInfo message={nearby.error.message} />;
  }, [fetchData, navigation, nearby.error]);

  useEffect(() => {
    let didCancel = false;

    if (firstUpdate.current) {
      firstUpdate.current = false;
      fetchData();
    }
    if (refreshing) {
      fetchData();
      if (!didCancel) {
        setRefreshing(false);
      }
    }
    return () => {
      didCancel = true;
    };
  }, [fetchData, refreshing]);

  if (nearby.loading && (firstUpdate.current || nearby.data.length === 0)) {
    return <AppLoader />;
  }

  return (
    <SafeArea>
      <FloatingButton onPress={openSettings} iconSize={25} position="bottom-right">
        <Icon icon="Feather" name="settings" size={25} color="primary" />
      </FloatingButton>
      {nearby.error ? (
        renderNearbyError
      ) : (
        <>
          <FloatingButton onPress={fetchData} iconSize={25} position="bottom-left">
            <Icon icon="MaterialIcons" name="refresh" size={30} color="primary" />
          </FloatingButton>
          <FlatList
            style={{ backgroundColor: theme.backgroundLight }}
            data={nearby.data}
            keyExtractor={predictions => `${predictions.routeId}-${predictions.stopId}`}
            renderItem={({ item: predictions }) => {
              const favorited = favorites.some(
                favorite =>
                  favorite.routeId === predictions.routeId && favorite.stopId === predictions.stopId
              );
              const handlePredictionsPress = _event => {
                const route = routes.find(route => route.id === predictions.routeId);
                const { directions } = route;
                const direction = directions.find(direction =>
                  direction.stops.some(stop => stop.id === predictions.stopId)
                );
                const stop = direction.stops.find(stop => stop.id === predictions.stopId);
                navigation.navigate("Detail", {
                  screen: "DetailScreen",
                  params: {
                    predictions,
                    route,
                    directions,
                    direction,
                    stop
                  }
                });
              };

              return (
                <PredictionsItem
                  favorited={favorited}
                  predictions={predictions}
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
