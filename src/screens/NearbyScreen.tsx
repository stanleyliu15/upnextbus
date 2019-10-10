import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, RefreshControl, GestureResponderEvent } from "react-native";
import { ThemeContext } from "styled-components/native";

import { ErrorInfo } from "../components/molecules";
import { Loader } from "../components/atoms";
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
  const [firstRender, setFirstRender] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { data: routes } = useSelector(selectRoutes);

  useEffect(() => {
    if (firstRender) {
      dispatch(getNearbyPredictionsList()).then(() => setFirstRender(false));
    }
    if (refreshing) {
      dispatch(getNearbyPredictionsList()).then(() => setRefreshing(false));
    }
  }, [dispatch, firstRender, refreshing]);

  const handleRefresh = () => setRefreshing(true);

  if (nearby.loading && firstRender) {
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

  const data = nearby.data.filter(prediction => filterRouteIds.includes(prediction.routeId));
  return (
    <SafeArea>
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
