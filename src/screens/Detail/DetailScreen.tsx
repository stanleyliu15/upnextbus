import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { Platform } from "react-native";
import MapView, { Marker, Polyline, Callout } from "react-native-maps";
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
import { getDistanceBetween, getMiddleLocation } from "../../utils/geolocation";
import NextBusAPI from "../../api/NextBus/api";

import { getNearestStop } from "../../services/nextbus-service";
import { StartPointSvg, EndPointSvg, PointSvg, BusSvg } from "../../svgs";
import { useInterval, useTimer } from "../../utils";

export const Distance = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DistanceValue = styled(Strong)`
  color: ${({ theme }) => theme.primaryDark};
  font-size: ${fontSize.md};
`;

export const DistanceUnit = styled(Text)`
  color: ${({ theme }) => theme.primaryDark};
  font-size: ${fontSize.xs};
  margin-left: ${space.xxxs};
`;

const LAT_DELTA = 0.05;
const LON_DELTA = 0.05;

const AUTO_REFRESH_DATA_TIME = 10000;

const MAP_PROVIDER = null;

type DetailScreenProps = NavigationProps & NavigationFocusInjectedProps;

const DetailScreen: React.FC<DetailScreenProps> = ({ navigation, isFocused }) => {
  const predictionsParam = navigation.getParam("predictions");
  const routeParam = navigation.getParam("route");
  const directionsParam = navigation.getParam("directions");
  const directionParam = navigation.getParam("direction");
  const stopParam = navigation.getParam("stop");

  const mapRef = useRef<MapView>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const theme = useContext(ThemeContext);
  const themeColor = useSelector(selectThemeColor);
  const isDarkMap = themeColor === ThemeColor.DARK && MAP_PROVIDER === "google";

  const [distance, setDistance] = useState(null);
  const [location, setLocation] = useState(null);

  const { seconds, stopTimer, restartTimer } = useTimer();
  const [walkMiddlePoint, setWalkMiddlePoint] = useState(null);

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

  const handleServiceAlertsPress = _event => {
    navigation.navigate("ServiceAlertsScreen", { serviceAlerts: predictions.serviceAlerts });
  };

  const handleDirectionPress = directionToPress => _event => {
    if (direction.id !== directionToPress.id) {
      const nearestStop = getNearestStop(directionToPress.stops, location, distanceLimit);
      if (stop.id !== nearestStop.id) {
        setDistance(getDistanceBetween(location, nearestStop.location));
        setWalkMiddlePoint(getMiddleLocation(location, nearestStop.location));
        setStop(nearestStop);
      }

      setDirection(directionToPress);
    }
  };

  const handleStopPress = stopToPress => _event => {
    if (stop.id !== stopToPress.id) {
      setDistance(getDistanceBetween(location, stopToPress.location));
      setWalkMiddlePoint(getMiddleLocation(location, stopToPress.location));
      setStop(stopToPress);
    }
  };

  const handleChangeDirectionPress = () => {
    navigation.navigate("ChangeDirectionScreen", {
      direction,
      directions: directionsParam,
      directionIds: predictionsParam.directionIds,
      predictionsDirectionName: predictionsParam.directionName,
      onDirectionPress: handleDirectionPress
    });
  };

  const handleChangeStopPress = () => {
    navigation.navigate("ChangeStopScreen", {
      stop,
      stops: direction.stops,
      onStopPress: handleStopPress
    });
  };

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

  const fetchData = async () => {
    try {
      setLoading(true);

      const _predictions = await NextBusAPI.getPredictions(
        {
          agencyId,
          routeId: routeParam.id,
          stopId: stop.id
        },
        { listLimit: predictionsListLimit }
      );

      const _vehicles = await NextBusAPI.getVehicles({
        agencyId,
        routeId: routeParam.id,
        lastTime: "-1"
      });

      if (isFocused) {
        setPredictions(_predictions);
        setVehicles(_vehicles);
        setLoading(false);

        restartTimer();
      }

      return () => {
        setAutoRefresh(false);
        stopTimer();
      };
    } catch (_error) {
      if (isFocused) {
        setError(_error);
      }
    }
  };

  const handleRefreshPress = _event => {
    fetchData();
  };

  useInterval(fetchData, autoRefresh ? AUTO_REFRESH_DATA_TIME : null);

  useEffect(() => {
    if (isFocused) {
      fetchData().then(() => setAutoRefresh(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeParam.id, direction.id, stop.id, isFocused]);

  useEffect(() => {
    if (!isFocused) {
      setAutoRefresh(false);
    } else {
      mapRef.current.animateCamera({
        center: {
          latitude: stop.location.lat,
          longitude: stop.location.lon
        }
      });
    }
  }, [isFocused, stop.location.lat, stop.location.lon]);

  useEffect(() => {
    async function watchPosition() {
      await Location.watchPositionAsync(
        {
          distanceInterval: 20
        },
        loc => {
          const newLocation = {
            lat: loc.coords.latitude,
            lon: loc.coords.longitude
          };

          const newDistance = getDistanceBetween(newLocation, stop.location);

          const newMiddlePoint = getMiddleLocation(newLocation, stop.location);
          setWalkMiddlePoint(newMiddlePoint);
          setLocation(newLocation);
          setDistance(newDistance);
        }
      );
    }

    watchPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderStopMarkers = () => {
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
  };

  const renderRoutePolyline = () => {
    const coordinates = direction.stops.reduce((coordinates, stop) => {
      return coordinates.concat({
        latitude: stop.location.lat,
        longitude: stop.location.lon
      });
    }, []);

    return <Polyline coordinates={coordinates} strokeColor={routeParam.color} strokeWidth={3} />;
  };

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

  const renderDistance = () => {
    return (
      <Marker
        coordinate={{
          latitude: walkMiddlePoint.lat,
          longitude: walkMiddlePoint.lon
        }}
        centerOffset={{ x: -15, y: -15 }}
      >
        {distance && (
          <>
            <Distance>
              <DistanceValue>{distance.toFixed(2)}</DistanceValue>
              <DistanceUnit>miles</DistanceUnit>
            </Distance>
          </>
        )}
      </Marker>
    );
  };

  const renderWalkPolyline = () => {
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
        lineDashPattern={[30, 30]}
      />
    );
  };

  if (error) {
    return <ErrorInfo message={error.message} />;
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
        {location && renderWalkPolyline()}
        {walkMiddlePoint && location && renderDistance()}
        {renderRoutePolyline()}
        {renderStopMarkers()}
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
  top: 20;
  left: 20;

  padding: ${space.xs};
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

  padding: ${space.xs};
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

export const CloseButton = styled(CircleIconButton).attrs(({ theme }) => ({
  underlayColor: theme.background,
  iconSize: 20
}))`
  position: absolute;
  top: ${getStatusBarHeight() + 5};
  right: 10;

  background-color: ${({ theme }) => theme.backgroundLight};
`;

const LocationButton = styled(CircleIconButton).attrs(({ theme }) => ({
  underlayColor: theme.background,
  iconSize: 20
}))`
  position: absolute;
  top: ${getStatusBarHeight() + 55};
  right: 10;

  background-color: ${({ theme }) => theme.backgroundLight};
`;

const CalloutView = styled.View`
  width: 160px;
  padding: ${space.md};
  margin-bottom: ${space.md};

  border-radius: ${borderRadius.round};
  background-color: ${({ theme }) => theme.backgroundLight};
`;

export default withNavigationFocus(DetailScreen);
