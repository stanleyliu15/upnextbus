import React, { useState, useEffect, useContext, useRef, useCallback, useMemo } from "react";
import { Platform } from "react-native";
import MapView, { Marker, Polyline, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import styled, { ThemeContext } from "styled-components/native";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { getStatusBarHeight, getInset } from "react-native-safe-area-view";
import {
  withNavigationFocus,
  NavigationActions,
  NavigationFocusInjectedProps
} from "react-navigation";

import { NextBus, NavigationProps } from "../../../types";
import { selectSelectedAgencyId } from "../../store/features/nextbus";
import {
  selectThemeColor,
  selectPredictionListLimit,
  selectDistanceLimit
} from "../../store/features/settings";
import { ThemeColor, space, borderRadius, fontSize } from "../../styles";
import { DARK_MAP_STYLE } from "../../config/mapStyles";
import {
  Loader,
  Icon,
  Text,
  Strong,
  ErrorInfo,
  CircleIconButton,
  DetailItem
} from "../../components";
import { getDistanceBetween } from "../../utils/geolocation";
import NextBusAPI from "../../api/NextBus/api";
import { getNearestStop } from "../../services/nextbus-service";
import { StartPointSvg, EndPointSvg, PointSvg, BusSvg } from "../../svgs";
import { useInterval, useTimer } from "../../utils";

const LAT_DELTA = 0.05;
const LON_DELTA = 0.05;
const AUTO_REFRESH_DATA_TIME = 10000;
const MAP_PROVIDER = Platform.OS === "android" ? PROVIDER_GOOGLE : null;

type DetailScreenProps = NavigationProps & NavigationFocusInjectedProps;

const DetailScreen: React.FC<DetailScreenProps> = ({ navigation, isFocused }) => {
  const predictionsParam = navigation.getParam("predictions");
  const routeParam = navigation.getParam("route");
  const directionsParam = navigation.getParam("directions");
  const directionParam = navigation.getParam("direction");
  const stopParam = navigation.getParam("stop");

  const mapRef = useRef<MapView>(null);

  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const theme = useContext(ThemeContext);
  const themeColor = useSelector(selectThemeColor);
  const isDarkMap = themeColor === ThemeColor.DARK && MAP_PROVIDER === PROVIDER_GOOGLE;

  const [distance, setDistance] = useState(null);
  const [location, setLocation] = useState(null);

  const { seconds, stopTimer, restartTimer } = useTimer();

  const agencyId = useSelector(selectSelectedAgencyId);
  const predictionsListLimit = useSelector(selectPredictionListLimit);
  const distanceLimit = useSelector(selectDistanceLimit);

  const [predictions, setPredictions] = useState(predictionsParam);
  const [direction, setDirection] = useState(directionParam);
  const [stop, setStop] = useState(stopParam);

  const [vehicles, setVehicles] = useState<NextBus.Vehicle[]>([]);

  const [autoRefresh, setAutoRefresh] = useState(false);

  const closeScreen = useCallback(() => {
    setAutoRefresh(false);
    stopTimer();
    navigation.dispatch(NavigationActions.back());
  }, [navigation, stopTimer]);

  const handleServiceAlertsPress = useCallback(
    _event => {
      navigation.navigate("ServiceAlertsScreen", { serviceAlerts: predictions.serviceAlerts });
    },
    [navigation, predictions.serviceAlerts]
  );

  const handleDirectionPress = directionToPress => _event => {
    if (direction.id !== directionToPress.id) {
      const nearestStop = getNearestStop(directionToPress.stops, location, distanceLimit);
      if (stop.id !== nearestStop.id) {
        setDistance(getDistanceBetween(location, nearestStop.location));
        setStop(nearestStop);
      }

      setDirection(directionToPress);
    }
  };

  const handleStopPress = useCallback(
    stopToPress => _event => {
      if (stop.id !== stopToPress.id) {
        setDistance(getDistanceBetween(location, stopToPress.location));
        setStop(stopToPress);
      }
    },
    [location, stop.id]
  );

  const handleChangeDirectionPress = () => {
    navigation.navigate("ChangeDirectionScreen", {
      direction,
      directions: directionsParam,
      directionIds: predictionsParam.directionIds,
      predictionsDirectionName: predictionsParam.directionName,
      onDirectionPress: handleDirectionPress
    });
  };

  const handleChangeStopPress = useCallback(() => {
    navigation.navigate("ChangeStopScreen", {
      stop,
      stops: direction.stops,
      onStopPress: handleStopPress
    });
  }, [direction.stops, stop, handleStopPress, navigation]);

  const handleLocationButtonPress = useCallback(() => {
    if (location) {
      mapRef.current.animateCamera({
        center: {
          latitude: location.lat,
          longitude: location.lon
        }
      });
    }
  }, [location]);

  const handleRefreshPress = useCallback(_event => setAutoRefresh(false), []);
  useInterval(handleRefreshPress, autoRefresh ? AUTO_REFRESH_DATA_TIME : null);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      try {
        setLoading(true);

        const newPredictions = await NextBusAPI.getPredictions(
          {
            agencyId,
            routeId: routeParam.id,
            stopId: stop.id
          },
          { listLimit: predictionsListLimit }
        );

        const newVehicles = await NextBusAPI.getVehicles({
          agencyId,
          routeId: routeParam.id,
          lastTime: "-1"
        });

        if (!didCancel) {
          setPredictions(newPredictions);
          setVehicles(newVehicles);
          setLoading(false);
          restartTimer();
          setAutoRefresh(true);
        }
      } catch (error) {
        if (!didCancel) {
          setFetchError(error);
        }
      }
    };

    if (isFocused && !autoRefresh) {
      fetchData();
    }
    return () => {
      didCancel = true;
    };
  }, [
    agencyId,
    routeParam.id,
    direction.id,
    stop.id,
    autoRefresh,
    isFocused,
    predictionsListLimit,
    restartTimer
  ]);

  useEffect(() => {
    mapRef.current.animateCamera({
      center: {
        latitude: stop.location.lat,
        longitude: stop.location.lon
      }
    });
  }, [stop.location.lat, stop.location.lon]);

  useEffect(() => {
    let watchPositionSubscription = null;

    async function watchPosition() {
      watchPositionSubscription = await Location.watchPositionAsync(
        { distanceInterval: 20 },
        loc => {
          const newLocation = {
            lat: loc.coords.latitude,
            lon: loc.coords.longitude
          };
          const newDistance = getDistanceBetween(newLocation, stop.location);

          setLocation(newLocation);
          setDistance(newDistance);
        }
      );
    }

    watchPosition();

    return () => {
      watchPositionSubscription.remove();
    };
  }, [stop.location]);

  const renderStopMarkers = useMemo(() => {
    return direction.stops.map((stop, index) => {
      const coordinate = {
        latitude: stop.location.lat,
        longitude: stop.location.lon
      };
      const isStartPoint = index === 0;
      const isEndPoint = index === direction.stops.length - 1;

      function getMarkerComponent() {
        if (isStartPoint) return <StartPointSvg />;
        if (isEndPoint) return <EndPointSvg />;
        return <PointSvg fill={routeParam.color} />;
      }

      return (
        <Marker
          key={stop.id}
          coordinate={coordinate}
          centerOffset={isStartPoint || isEndPoint ? { x: -35, y: -35 } : undefined}
          onPress={handleStopPress(stop)}
        >
          {getMarkerComponent()}
          <Callout tooltip>
            <CalloutView>
              <Strong>{stop.name}</Strong>
            </CalloutView>
          </Callout>
        </Marker>
      );
    });
  }, [direction.stops, handleStopPress, routeParam.color]);

  const renderRoutePolyline = useMemo(() => {
    const coordinates = direction.stops.reduce((coordinates, stop) => {
      return coordinates.concat({
        latitude: stop.location.lat,
        longitude: stop.location.lon
      });
    }, []);

    return <Polyline coordinates={coordinates} strokeColor={routeParam.color} strokeWidth={3} />;
  }, [direction.stops, routeParam.color]);

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
    if (location) {
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
    }
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
          latitude: stopParam.location.lat,
          longitude: stopParam.location.lon,
          latitudeDelta: LAT_DELTA,
          longitudeDelta: LON_DELTA
        }}
        showsUserLocation={true}
        customMapStyle={isDarkMap ? DARK_MAP_STYLE : undefined}
      >
        {renderWalkPolyline}
        {renderRoutePolyline}
        {renderStopMarkers}
        {vehicles.map(vehicle => renderBusMarker(vehicle))}
      </Map>
      {loading && <DataLoader />}
      <UtilityButtons>
        <CloseButton onPress={closeScreen}>
          <Icon icon="MaterialCommunityIcons" name="close" size={22.5} color="text" />
        </CloseButton>
        <LocationButton onPress={handleLocationButtonPress}>
          <Icon icon="MaterialCommunityIcons" name="near-me" size={22.5} color="primary" />
        </LocationButton>
      </UtilityButtons>
      <Panel>
        <DetailItem
          predictions={predictions}
          stopDistance={distance}
          onDirectionPress={directionsParam.length > 1 ? handleChangeDirectionPress : undefined}
          onStopPress={direction.stops.length > 1 ? handleChangeStopPress : undefined}
          canRefresh={!loading}
          onRefreshPress={handleRefreshPress}
          onServiceAlertsPress={
            predictions.serviceAlerts.length > 0 ? handleServiceAlertsPress : undefined
          }
        />
      </Panel>
    </Container>
  );
};

const DataLoader = styled(Loader)`
  position: absolute;
  top: ${getStatusBarHeight() + 5};
  left: 5;

  padding: ${space.xs}px;
  border-radius: ${borderRadius.round};
  background-color: ${({ theme }) => (Platform.OS === "ios" ? "transparent" : theme.background)};
`;

const Container = styled.View`
  flex: 1;
`;

const Panel = styled.View`
  position: absolute;
  bottom: ${getInset("bottom")};
  width: 100%;

  padding: ${space.xs}px;
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
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled(CircleIconButton).attrs({ iconSize: 20 })`
  position: absolute;
  top: ${getStatusBarHeight() + 5};
  right: 5;

  background-color: ${({ theme }) => theme.backgroundLight};
`;

const LocationButton = styled(CircleIconButton).attrs({ iconSize: 20 })`
  position: absolute;
  top: ${getStatusBarHeight() + 55};
  right: 5;

  background-color: ${({ theme }) => theme.backgroundLight};
`;

const CalloutView = styled.View`
  width: 160;
  padding: ${space.md}px;
  margin-bottom: ${space.md};

  border-radius: ${borderRadius.round};
  background-color: ${({ theme }) => theme.backgroundLight};
`;

export const Distance = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: ${space.xxxs}px ${space.xs}px;
  background-color: ${({ theme }) => theme.primaryDark};
  border-radius: ${borderRadius.full};
`;

export const DistanceValue = styled(Strong)`
  color: ${({ theme }) => theme.primaryLight};
  font-size: ${fontSize.md};
`;

export const DistanceUnit = styled(Text)`
  color: ${({ theme }) => theme.primaryLight};
  font-size: ${fontSize.xs};
  margin-left: ${space.xxxs};
`;

export default withNavigationFocus(DetailScreen);
