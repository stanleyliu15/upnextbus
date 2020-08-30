import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Platform } from "react-native";
import MapView, { Marker, Polyline, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import styled, { useTheme } from "styled-components/native";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { getStatusBarHeight } from "react-native-safe-area-view";
import {
  CommonActions,
  RouteProp,
  CompositeNavigationProp,
  useFocusEffect
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { DetailStackParamList, RootStackParamList, NextBus, GeoLocation } from "../../../types";
import {
  selectThemeColor,
  selectPredictionListLimit,
  selectSelectedAgencyId
} from "../../store/features/settings";
import { ThemeColor, space, borderRadius, mixins } from "../../styles";
import { DARK_MAP_STYLE } from "../../config/mapStyles";
import { Loader, Icon, Strong, ErrorInfo, IconButton, DetailItem } from "../../components";
import { getDistanceBetween } from "../../utils/geolocation";
import NextBusAPI from "../../api/NextBus/api";
import { StartPointSvg, EndPointSvg, PointSvg, BusSvg } from "../../svgs";
import { useInterval, useTimer, useToggle } from "../../utils";

const LAT_DELTA = 0.05;
const LON_DELTA = 0.05;
const AUTO_REFRESH_DATA_TIME = 10000;
const MAP_PROVIDER = Platform.OS === "android" ? PROVIDER_GOOGLE : null;

type DetailScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<DetailStackParamList, "DetailScreen">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<DetailStackParamList, "DetailScreen">;
};

const DetailScreen: React.FC<DetailScreenProps> = ({ navigation, route: navigationRoute }) => {
  const { predictions, route, direction, stop } = navigationRoute.params;
  const { directions } = route;
  const { stops } = direction;
  const mapRef = useRef<MapView>(null);
  const agencyId = useSelector(selectSelectedAgencyId);
  const predictionsListLimit = useSelector(selectPredictionListLimit);
  const [vehicles, setVehicles] = useState<NextBus.Vehicle[]>([]);
  const [distance, setDistance] = useState<number>(null);
  const [location, setLocation] = useState<GeoLocation>(null);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const { seconds, stopTimer, restartTimer } = useTimer();
  const [showVehicles, toggleShowVehicles] = useToggle(true);
  const theme = useTheme();
  const themeColor = useSelector(selectThemeColor);
  const isDarkMap = themeColor === ThemeColor.DARK && MAP_PROVIDER === PROVIDER_GOOGLE;
  const setPredictions = useCallback(predictions => navigation.setParams({ predictions }), [
    navigation
  ]);
  const setStop = useCallback(stop => navigation.setParams({ stop }), [navigation]);
  const handleRefreshPress = useCallback(() => setAutoRefresh(false), []);
  const closeScreen = useCallback(() => {
    setAutoRefresh(false);
    stopTimer();
    navigation.dispatch(CommonActions.goBack());
  }, [navigation, stopTimer]);
  const handleChangeDirectionPress = useCallback(() => {
    navigation.navigate("ChangeDirectionScreen", {
      direction,
      directions,
      directionIds: predictions.directionIds,
      predictionsDirectionName: predictions.directionName,
      location
    });
  }, [
    direction,
    directions,
    location,
    navigation,
    predictions.directionIds,
    predictions.directionName
  ]);
  const handleChangeStopPress = useCallback(() => {
    navigation.navigate("ChangeStopScreen", {
      stop,
      stops
    });
  }, [stops, navigation, stop]);

  const handleServiceAlertsPress = useCallback(() => {
    navigation.navigate("ServiceAlertsScreen", {
      serviceAlerts: predictions.serviceAlerts
    });
  }, [navigation, predictions.serviceAlerts]);

  const handleLocationButtonPress = useCallback(() => {
    if (!location) return;
    mapRef.current.animateCamera({
      center: {
        latitude: location.lat,
        longitude: location.lon
      }
    });
  }, [location]);

  const handleShowVehiclesButtonPress = useCallback(() => toggleShowVehicles(), [
    toggleShowVehicles
  ]);

  useInterval(handleRefreshPress, autoRefresh ? AUTO_REFRESH_DATA_TIME : null);

  useEffect(() => {
    if (!location) return;
    setDistance(getDistanceBetween(location, stop.location));
  }, [location, stop]);

  useFocusEffect(
    useCallback(() => {
      let watchPositionSubscription;

      async function watchPosition() {
        try {
          watchPositionSubscription = await Location.watchPositionAsync(
            { distanceInterval: 20 },
            locationData =>
              setLocation({
                lat: locationData.coords.latitude,
                lon: locationData.coords.longitude
              })
          );
        } catch (error) {
          setFetchError(error);
        }
      }

      watchPosition();

      return () => {
        watchPositionSubscription?.remove();
        watchPositionSubscription = null;
      };
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      let didCancel = false;

      const fetchData = async () => {
        try {
          setFetching(true);

          const newPredictions = await NextBusAPI.getPredictions(
            {
              agencyId,
              routeId: route.id,
              stopId: stop.id
            },
            { listLimit: predictionsListLimit }
          );

          const newVehicles = await NextBusAPI.getVehicles({
            agencyId,
            directionId: direction.id,
            routeId: route.id,
            lastTime: "-1"
          });

          if (!didCancel) {
            setPredictions(newPredictions);
            setVehicles(newVehicles);
            setFetching(false);
            restartTimer();
            setAutoRefresh(true);
          }
        } catch (error) {
          if (!didCancel) {
            setFetchError(error);
          }
        }
      };

      if (!autoRefresh) {
        fetchData();
      }

      return () => {
        didCancel = true;
      };
    }, [
      agencyId,
      autoRefresh,
      direction.id,
      predictionsListLimit,
      restartTimer,
      route.id,
      setPredictions,
      stop.id
    ])
  );

  const renderStopMarkers = useMemo(() => {
    return direction.stops.map((stop, index) => {
      const coordinate = {
        latitude: stop.location.lat,
        longitude: stop.location.lon
      };
      const isStartPoint = index === 0;
      const isEndPoint = index === direction.stops.length - 1;
      const isStartOrEndPoint = isStartPoint || isEndPoint;

      function getMarkerComponent() {
        if (isStartPoint) return <StartPointSvg />;
        if (isEndPoint) return <EndPointSvg />;
        return <PointSvg fill={route.color} />;
      }

      return (
        <Marker
          key={stop.id}
          tracksViewChanges={false}
          coordinate={coordinate}
          centerOffset={isStartOrEndPoint ? { x: -35, y: -35 } : undefined}
          onPress={() => {
            setStop(stop);
          }}
          zIndex={isStartOrEndPoint ? 1 : 0}
        >
          {getMarkerComponent()}
          <Callout tooltip>
            <CalloutView>
              <Strong align="center">{stop.name}</Strong>
            </CalloutView>
          </Callout>
        </Marker>
      );
    });
  }, [direction.stops, route.color, setStop]);

  const renderRoutePolyline = useMemo(() => {
    const coordinates = direction.stops.reduce((coordinates, stop) => {
      return coordinates.concat({
        latitude: stop.location.lat,
        longitude: stop.location.lon
      });
    }, []);

    return <Polyline coordinates={coordinates} strokeColor={route.color} strokeWidth={3} />;
  }, [direction.stops, route.color]);

  const renderBusMarker = (vehicle: NextBus.Vehicle) => {
    const coordinate = {
      latitude: vehicle.location.lat,
      longitude: vehicle.location.lon
    };

    return (
      <Marker key={vehicle.id} coordinate={coordinate}>
        <BusSvg
          fill={isDarkMap ? theme.white : theme.black}
          label={`${vehicle.secondsSinceRecord + seconds}s`}
        />
      </Marker>
    );
  };

  const renderWalkPolyline = useMemo(() => {
    if (!location) {
      return null;
    }

    return (
      <Polyline
        coordinates={[
          {
            latitude: location.lat,
            longitude: location.lon
          },
          {
            latitude: stop.location.lat,
            longitude: stop.location.lon
          }
        ]}
        strokeColor={theme.primary}
        strokeWidth={3}
        lineDashPattern={[5, 5]}
      />
    );
  }, [location, stop.location.lat, stop.location.lon, theme.primary]);

  if (fetchError) {
    return <ErrorInfo message={fetchError.message} />;
  }

  return (
    <Container>
      <Map
        ref={mapRef}
        provider={MAP_PROVIDER}
        initialRegion={{
          latitude: stop.location.lat,
          longitude: stop.location.lon,
          latitudeDelta: LAT_DELTA,
          longitudeDelta: LON_DELTA
        }}
        showsUserLocation={true}
        customMapStyle={isDarkMap ? DARK_MAP_STYLE : undefined}
      >
        {renderWalkPolyline}
        {renderRoutePolyline}
        {renderStopMarkers}
        {showVehicles && vehicles.map(vehicle => renderBusMarker(vehicle))}
      </Map>
      {fetching && <DataLoader />}
      <UtilityButtons>
        <UtilityButton onPress={closeScreen} iconSize="sm">
          <Icon icon="MaterialCommunityIcons" name="close" size="sm" color="text" />
        </UtilityButton>
        <UtilityButton onPress={handleLocationButtonPress} iconSize="sm">
          <Icon icon="MaterialCommunityIcons" name="near-me" size="sm" color="green" />
        </UtilityButton>
        <UtilityButton onPress={handleShowVehiclesButtonPress} iconSize="sm">
          {showVehicles && <Slash />}
          <Icon icon="FontAwesome5" name="bus" size="sm" color="green" />
        </UtilityButton>
        {predictions.serviceAlerts.length > 0 && (
          <UtilityButton onPress={handleServiceAlertsPress} iconSize="sm">
            <Icon icon="Ionicons" name="ios-warning" size="md" color="yellow" />
          </UtilityButton>
        )}
      </UtilityButtons>
      <DetailItem
        predictions={predictions}
        stopDistance={distance}
        canRefresh={!fetching}
        onDirectionPress={directions.length > 1 ? handleChangeDirectionPress : undefined}
        onStopPress={direction.stops.length > 1 ? handleChangeStopPress : undefined}
        onRefreshPress={handleRefreshPress}
      />
    </Container>
  );
};

const statusBarHeight = getStatusBarHeight();

const DataLoader = styled(Loader)`
  position: absolute;
  top: ${statusBarHeight + parseInt(space.xs, 10)}px;
  left: ${space.xs};

  padding: ${space.xs};
  border-radius: ${borderRadius.round};
  background-color: ${({ theme }) => (Platform.OS === "ios" ? "transparent" : theme.background)};
`;

const Container = styled.View`
  flex: 1;
`;

const Map = styled(MapView)`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const UtilityButtons = styled.View`
  position: absolute;
  top: ${statusBarHeight + parseInt(space.xs, 10)}px;
  right: ${space.xs};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const UtilityButton = styled(IconButton)`
  background-color: ${({ theme }) => theme.backgroundLight};
  margin-bottom: ${space.sm};
`;

const CalloutView = styled.View`
  width: 160px;
  padding: ${space.md};
  margin-bottom: ${space.md};
  border-radius: ${borderRadius.round};
  background-color: ${({ theme }) => theme.backgroundLight};
`;

const Slash = styled.View`
  position: absolute;
  top: 0;
  right: 50%;
  width: 1%;
  height: 100%;
  transform: rotate(45deg);

  ${mixins.border({ color: "green" })};
`;

export default DetailScreen;
