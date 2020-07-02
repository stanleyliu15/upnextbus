import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { FlatList, RefreshControl, Linking } from "react-native";
import { useTheme } from "styled-components/native";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { isEqual } from "lodash";

import { Icon, SafeArea, ErrorInfo, FloatIconButton, PredictionsItem } from "../components";
import {
  getNearbyPredictionsList,
  selectNearbyPredictionList,
  selectRoutes
} from "../store/features/nextbus";
import { LocationPermissionDeniedError, UnableFindNearbyBusesError, NextBusError } from "../errors";
import { RootStackParamList } from "../../types";
import { selectFavoriteStopLabels } from "../store/features/settings";
import { findBusInfo } from "../utils";
import { useDispatch } from "../store";

type NearbyScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, "Nearby">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<RootStackParamList, "Nearby">;
};

const NearbyScreen: React.FC<NearbyScreenProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const nearby = useSelector(selectNearbyPredictionList);
  const routes = useSelector(selectRoutes);
  const theme = useTheme();
  const favoriteStopLabels = useSelector(selectFavoriteStopLabels);
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
          onRetry={() => Linking.openURL("app-settings:")}
          onRetryTitle="Go to settings"
          externalLink
        />
      );
    }

    if (nearby.error instanceof UnableFindNearbyBusesError) {
      return (
        <ErrorInfo
          message={nearby.error.message}
          onRetry={fetchData}
          retryLoading={nearby.loading}
        />
      );
    }

    if (nearby.error instanceof NextBusError) {
      return (
        <ErrorInfo
          message={nearby.error.message}
          onRetry={nearby.error.retriable ? fetchData : undefined}
        />
      );
    }

    return <ErrorInfo message={nearby.error.message} />;
  }, [fetchData, nearby.error, nearby.loading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let didCancel = false;

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

  return (
    <SafeArea>
      <FloatIconButton onPress={openSettings} position="right" iconSize="md">
        <Icon icon="Feather" name="settings" size="md" color="primary" />
      </FloatIconButton>
      {nearby.error ? (
        renderNearbyError
      ) : (
        <>
          <FloatIconButton onPress={fetchData} position="left" iconSize="md">
            <Icon icon="MaterialIcons" name="refresh" size="lg" color="primary" />
          </FloatIconButton>
          <FlatList
            style={{ backgroundColor: theme.backgroundLight }}
            data={nearby.data}
            keyExtractor={predictions => `${predictions.routeId}-${predictions.stopId}`}
            renderItem={({ item: predictions }) => {
              const favorited = favoriteStopLabels.some(stopLabel =>
                isEqual(stopLabel, predictions.stopLabel)
              );
              const handlePredictionsPress = () => {
                navigation.navigate("Detail", {
                  screen: "DetailScreen",
                  params: {
                    predictions,
                    ...findBusInfo(predictions.stopLabel, routes.data)
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
