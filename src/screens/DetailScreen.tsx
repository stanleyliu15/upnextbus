import React, { useState, useEffect, useContext, Fragment, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Callout } from "react-native-maps";
import styled, { ThemeContext } from "styled-components/native";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { getStatusBarHeight } from "react-native-safe-area-view";

import { withNavigationFocus } from "react-navigation";
import { selectSelectedAgencyId } from "../store/features/nextbus";
import {
  selectThemeColor,
  selectPredictionListLimit,
  selectDistanceLimit
} from "../store/features/settings";
import { ThemeColor, space, border } from "../styles";
import { DARK_MAP_STYLE } from "../config/mapStyle";
import { Text, Loader, Strong } from "../components/atoms";
import { getDistanceBetween } from "../utils/geolocation";
import NextBusAPI from "../api/NextBus/api";
import { ErrorInfo, CircularIconButton } from "../components/molecules";
import { DetailItem, Row, Between } from "../components/organisms/Nearby";
import { getNearestStop } from "../services/nextbus-service";
import { SelectItem } from "../components/organisms/Settings";
import { PanelContainer, BackButton, BackTitle } from "../components/organisms/Nearby/itemStyles";
import { StartPointSvg, EndPointSvg, PointSvg, BusSvg } from "../components/organisms/Detail/svgs";
import { useInterval } from "../utils";

const LAT_DELTA = 0.05;
const LON_DELTA = 0.05;

const AUTO_REFRESH_DATA_TIME = 10000;

const PANELS = {
  info: "info",
  changeDirection: "changeDirection",
  changeStop: "changeStop"
};

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

  const agencyId = useSelector(selectSelectedAgencyId);
  const predictionsListLimit = useSelector(selectPredictionListLimit);
  const distanceLimit = useSelector(selectDistanceLimit);

  const [predictions, setPredictions] = useState(predictionsParam);
  const [route, setRoute] = useState(routeParam);
  const [directions, setDirections] = useState(directionsParam);
  const [direction, setDirection] = useState(directionParam);
  const [stop, setStop] = useState(stopParam);

  const [vehiclesConfig, setVehiclesConfig] = useState({ vehicles: [], lastTime: -1 });

  const firstUpdate = useRef(true);

  const [panel, setPanel] = useState(PANELS.info);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const handleBackPress = event => {
    setPanel(PANELS.info);
  };

  const closeModal = () => {
    setAutoRefresh(false);
    navigation.goBack();
  };

  const handleChangeDirectionPress = () => {
    setAutoRefresh(false);
    if (directions.length > 1) {
      setPanel(PANELS.changeDirection);
    }
  };

  const handleChangeStopPress = () => {
    setAutoRefresh(false);
    if (direction.stops.length > 1) {
      setPanel(PANELS.changeStop);
    }
  };

  const handleDirectionChange = direction => event => {
    const stop = getNearestStop(direction.stops, location, distanceLimit);
    setDistance(getDistanceBetween(location, stop.location));

    setDirection(direction);
    setStop(stop);
  };

  const handleStopPress = stop => event => {
    setStop(stop);
    setDistance(getDistanceBetween(location, stop.location));
    setPanel(PANELS.info);
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
          routeId: route.id,
          stopId: stop.id
        },
        { listLimit: predictionsListLimit }
      );

      const _vehiclesConfig = await NextBusAPI.getVehiclesConfig({
        agencyId,
        routeId: route.id,
        lastTime: vehiclesConfig.lastTime
      });

      if (isFocused) {
        setPredictions(_predictions);

        if (vehiclesConfig.lastTime === -1) {
          setVehiclesConfig(_vehiclesConfig);
        } else if (_vehiclesConfig.vehicles.length > 0) {
          const _updateVehicles = vehiclesConfig.vehicles.map(vehicle => {
            const index = _vehiclesConfig.vehicles.findIndex(
              _vehicle => _vehicle.id === vehicle.id
            );
            if (index === -1) {
              return vehicle;
            } else {
              return _vehiclesConfig.vehicles[index];
            }
          });
          setVehiclesConfig({ vehicles: _updateVehicles, lastTime: _vehiclesConfig.lastTime });
        }

        setLoading(false);
      }

      return () => {
        setAutoRefresh(false);
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
    setAutoRefresh(false);
    fetchData().then(() => setAutoRefresh(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.id, direction.id, stop.id]);

  useEffect(() => {
    if (!isFocused) setAutoRefresh(false);
  }, [isFocused]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      setPanel(PANELS.info);
      setVehiclesConfig({ vehicles: [], lastTime: -1 });
      setRoute(routeParam);
      setStop(stopParam);
      setDirection(directionParam);
      setDirections(directionsParam);
      setPredictions(predictionsParam);

      mapRef.current.animateToRegion({
        latitude: stopParam.location.lat,
        longitude: stopParam.location.lon,
        latitudeDelta: LAT_DELTA,
        longitudeDelta: LON_DELTA
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    directionParam,
    directionsParam,
    routeParam,
    stopParam,
    predictionsParam.routeId,
    predictionsParam.stopId
  ]);

  useEffect(() => {
    async function watchPosition() {
      await Location.watchPositionAsync(
        {
          distanceInterval: 20
        },
        newLocation => {
          const location = {
            lat: newLocation.coords.latitude,
            lon: newLocation.coords.longitude
          };

          setLocation(location);
          setDistance(getDistanceBetween(location, stop.location));
        }
      );
    }

    watchPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderMarkers() {
    return direction.stops.map((stop, index) => {
      const coordinate = {
        latitude: stop.location.lat,
        longitude: stop.location.lon
      };

      function getMarkerComponent() {
        if (index === 0) return <StartPointSvg />;
        if (index === direction.stops.length - 1) return <EndPointSvg />;
        return <PointSvg fill={route.color} />;
      }

      return (
        <Marker coordinate={coordinate} onPress={handleStopPress(stop)}>
          {getMarkerComponent()}
          <Callout tooltip>
            <CalloutStop>
              <Strong>{stop.name}</Strong>
              {distance && <Text>{`${distance.toFixed(2)} miles`}</Text>}
            </CalloutStop>
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

    return <Polyline coordinates={coordinates} strokeColor={route.color} strokeWidth={3} />;
  }

  function renderBusMarkers() {
    return vehiclesConfig.vehicles.map(vehicle => {
      const coordinate = {
        latitude: vehicle.location.lat,
        longitude: vehicle.location.lon
      };

      return (
        <Marker coordinate={coordinate}>
          <BusSvg fill={themeColor === ThemeColor.LIGHT ? theme.black : theme.white} />
        </Marker>
      );
    });
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
    if (panel === PANELS.info) {
      return (
        <PanelContainer>
          <DetailItem
            predictions={predictions}
            onDirectionPress={handleChangeDirectionPress}
            onStopPress={handleChangeStopPress}
            canRefresh={!loading}
            onRefreshPress={handleRefreshPress}
          />
        </PanelContainer>
      );
    }

    if (panel === PANELS.changeDirection) {
      return (
        <PanelContainer>
          <Row>
            <BackButton onPress={handleBackPress} />
            <BackTitle>Change Direction</BackTitle>
          </Row>
          {directions.map((directionToSelect, index) => {
            let directionName;
            if (predictionsParam.directionIds.includes(directionToSelect.id)) {
              // eslint-disable-next-line prefer-destructuring
              directionName = predictionsParam.directionName;
            } else {
              directionName = directionToSelect.name;
            }

            return (
              <SelectItem
                key={directionToSelect.id}
                name={directionName}
                selected={directionToSelect.id === direction.id}
                onSelect={handleDirectionChange(directionToSelect)}
                fixedHeight={false}
                lastItem={index === directions.length - 1}
              />
            );
          })}
        </PanelContainer>
      );
    }

    return (
      <PanelContainer limitSpace>
        <Row>
          <BackButton onPress={handleBackPress} />
          <BackTitle>Change Stop</BackTitle>
        </Row>
        <ScrollView>
          {direction.stops.map((stopToSelect, index) => {
            return (
              <SelectItem
                key={stopToSelect.id}
                name={stopToSelect.name}
                selected={stopToSelect.id === stop.id}
                onSelect={handleStopPress(stopToSelect)}
                fixedHeight={false}
                lastItem={index === direction.stops.length - 1}
              />
            );
          })}
        </ScrollView>
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
        customMapStyle={themeColor === ThemeColor.DARK && DARK_MAP_STYLE}
      >
        <Fragment>
          {renderWalkPolyline()}
          {renderRoutePolyline()}
          {renderMarkers()}
          {renderBusMarkers()}
        </Fragment>
      </Map>
      {loading && (
        <LoaderWrapper>
          <MyLoader />
        </LoaderWrapper>
      )}
      <UtilityButtons>
        <CloseButton onPress={closeModal} />
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

  bottom: 0;
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
  iconSize: 20,
  children: <MaterialCommunityIcons name="close" size={20} color={props.theme.text} />
}))`
  position: absolute;
  top: ${getStatusBarHeight()};
  right: 10;

  background-color: ${({ theme }) => theme.backgroundLight};
`;

const MyLocationButton = styled(CircularIconButton).attrs(props => ({
  underlayColor: props.theme.background,
  iconSize: 20,
  children: <MaterialCommunityIcons name="near-me" size={20} color={props.theme.primary} />
}))`
  position: absolute;
  top: ${getStatusBarHeight() + 60};
  right: 10;

  background-color: ${({ theme }) => theme.backgroundLight};
`;

const CalloutStop = styled.View`
  margin-bottom: ${space.large};

  width: 160px;

  padding: ${space.xLarge};
  border-radius: ${border.round};
  background-color: ${({ theme }) => theme.backgroundLight};
`;

export default withNavigationFocus(DetailScreen);
