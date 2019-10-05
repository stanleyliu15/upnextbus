import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, RefreshControl } from "react-native";
import { ThemeContext } from "styled-components/native";

import { ErrorInfo } from "../components/molecules";
import { Loader } from "../components/atoms";
import { getNearbyPredictionsList, selectNearbyPredictionList } from "../store/features/nextbus";
import { PredictionsItem } from "../components/organisms/Nearby";
import SafeArea from "../layouts/SafeArea";

function NearbyScreen(props) {
  const dispatch = useDispatch();
  const nearby = useSelector(selectNearbyPredictionList);
  const theme = useContext(ThemeContext);
  const [firstRender, setFirstRender] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  return (
    <SafeArea>
      <FlatList
        data={nearby.data}
        keyExtractor={(item: NextBus.Predictions) => `${item.routeId}-${item.stopId}`}
        renderItem={({ item }) => <PredictionsItem predictions={item} />}
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
