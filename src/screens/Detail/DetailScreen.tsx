import React, { useState, useEffect, useContext, Fragment, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Callout } from "react-native-maps";
import styled, { ThemeContext } from "styled-components/native";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getStatusBarHeight, getInset } from "react-native-safe-area-view";

import { withNavigationFocus, NavigationActions } from "react-navigation";
import { selectSelectedAgencyId } from "../../store/features/nextbus";
import {
  selectThemeColor,
  selectPredictionListLimit,
  selectDistanceLimit
} from "../../store/features/settings";
import { ThemeColor, space, border } from "../../styles";
import { DARK_MAP_STYLE } from "../../config/mapStyle";
import { Loader, Strong } from "../../components/atoms";
import { getDistanceBetween, getMiddleLocation } from "../../utils/geolocation";
import NextBusAPI from "../../api/NextBus/api";
import { ErrorInfo, CircularIconButton } from "../../components/molecules";
import { DetailItem, Between } from "../../components/organisms/Nearby";
import { getNearestStop } from "../../services/nextbus-service";
import { PanelContainer, Unit, PredictionTime } from "../../components/organisms/Nearby/itemStyles";
import {
  StartPointSvg,
  EndPointSvg,
  PointSvg,
  BusSvg
} from "../../components/organisms/Detail/svgs";
import { useInterval, useTimer } from "../../utils";

const LAT_DELTA = 0.05;
const LON_DELTA = 0.05;

const AUTO_REFRESH_DATA_TIME = 10000;

const DetailScreen = function({ navigation, isFocused }) {
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

  const [vehicles, setVehicles] = useState([]);

  const [autoRefresh, setAutoRefresh] = useState(false);
  const isDarkThemeColor = themeColor === ThemeColor.DARK;

  const closeScreen = () => {
    setAutoRefresh(false);
    stopTimer();
    navigation.dispatch(NavigationActions.back());
  };

  const handleServiceAlertsPress = event => {
    navigation.navigate("ServiceAlertsScreen", { serviceAlerts: predictions.serviceAlerts });
  };

  const handleDirectionPress = directionToPress => event => {
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

  const handleStopPress = stopToPress => event => {
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

  const handleLocationButtonPress = () => {
    mapRef.current.animateToCoordinate({
      latitude: location.lat,
      longitude: location.lon
    });
  };

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
        lastTime: -1
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
    } catch (err) {
      if (isFocused) {
        setError(err);
      }
    }
  };

  const handleRefreshPress = event => {
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
      mapRef.current.animateToCoordinate({
        latitude: stop.location.lat,
        longitude: stop.location.lon
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

  function renderStopMarkers() {
    return direction.stops.map((s, index) => {
      const coordinate = {
        latitude: s.location.lat,
        longitude: s.location.lon
      };

      function getMarkerComponent() {
        if (index === 0) return <StartPointSvg />;
        if (index === direction.stops.length - 1) return <EndPointSvg />;
        return <PointSvg fill={routeParam.color} />;
      }

      return (
        <Marker coordinate={coordinate} onPress={handleStopPress(s)}>
          {getMarkerComponent()}
          <Callout tooltip>
            <CalloutView>
              <Strong>{s.name}</Strong>
            </CalloutView>
          </Callout>
        </Marker>
      );
    });
  }

  function renderRoutePolyline() {
    const coordinates = direction.stops.reduce((coordinates, stop) => {
      return coordinates.concat({
        latitude: stop.location.lat,
        longitude: stop.location.lon
      });
    }, []);

    return <Polyline coordinates={coordinates} strokeColor={routeParam.color} strokeWidth={3} />;
  }

  function renderBusMarkers() {
    return vehicles.map((vehicle: NextBus.Vehicle) => {
      const coordinate = {
        latitude: vehicle.location.lat,
        longitude: vehicle.location.lon
      };

      return (
        <Marker coordinate={coordinate}>
          <BusSvg
            fill={isDarkThemeColor ? theme.white : theme.black}
            label={`${vehicle.secondsSinceRecord + seconds}s`}
          />
        </Marker>
      );
    });
  }

  function renderDistance() {
    return (
      walkMiddlePoint &&
      location && (
        <Marker
          coordinate={{
            latitude: walkMiddlePoint.lat,
            longitude: walkMiddlePoint.lon
          }}
          anchor={{ x: 0.00000001, y: 0 }}
        >
          {distance && (
            <>
              <PredictionTime>
                <Strong>{distance.toFixed(2)}</Strong>
                <Unit>miles</Unit>
              </PredictionTime>
            </>
          )}
        </Marker>
      )
    );
  }

  function renderWalkPolyline() {
    return (
      location && (
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
      )
    );
  }

  function renderPanel() {
    return (
      <PanelContainer>
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
      </PanelContainer>
    );
  }

  if (error) {
    return <ErrorInfo message={error.message} />;
  }

  return (
    <Container>
      <Map
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: stopParam.location.lat,
          longitude: stopParam.location.lon,
          latitudeDelta: LAT_DELTA,
          longitudeDelta: LON_DELTA
        }}
        showsUserLocation={true}
        customMapStyle={isDarkThemeColor && DARK_MAP_STYLE}
      >
        <Fragment>
          {renderWalkPolyline()}
          {renderDistance()}
          {renderRoutePolyline()}
          {renderStopMarkers()}
          {renderBusMarkers()}
        </Fragment>
      </Map>
      {loading && (
        <LoaderWrapper>
          <MyLoader />
        </LoaderWrapper>
      )}
      <UtilityButtons>
        <CloseButton onPress={closeScreen} />
        <MyLocationButton onPress={handleLocationButtonPress} />
      </UtilityButtons>
      <BottomPanel>{renderPanel()}</BottomPanel>
    </Container>
  );
};

const LoaderWrapper = styled.View`
  position: relative;
`;

const MyLoader = styled(Loader)`
  position: absolute;
  top: 20;
  left: 20;

  background-color: transparent;
`;

const Container = styled.View`
  flex: 1;
`;

const BottomPanel = styled.View`
  position: absolute;

  bottom: ${getInset("bottom")};
  width: 100%;

  padding: ${space.medium};
`;

const Map = styled(MapView)`
  flex: 1;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const UtilityButtons = styled(Between)`
  position: relative;
`;

export const CloseButton = styled(CircularIconButton).attrs(props => ({
  underlayColor: props.theme.background,
  iconSize: 22.5,
  children: <MaterialCommunityIcons name="close" size={22.5} color={props.theme.text} />
}))`
  position: absolute;
  top: ${getStatusBarHeight()};
  right: 10;

  background-color: ${({ theme }) => theme.backgroundLight};
`;

const MyLocationButton = styled(CircularIconButton).attrs(props => ({
  underlayColor: props.theme.background,
  iconSize: 22.5,
  children: <MaterialCommunityIcons name="near-me" size={22.5} color={props.theme.primary} />
}))`
  position: absolute;
  top: ${getStatusBarHeight() + 60};
  right: 10;

  background-color: ${({ theme }) => theme.backgroundLight};
`;

const CalloutView = styled.View`
  margin-bottom: ${space.large};

  width: 160px;

  padding: ${space.xLarge};
  border-radius: ${border.round};
  background-color: ${({ theme }) => theme.backgroundLight};
`;

export default withNavigationFocus(DetailScreen);
