import React, { useState, useEffect, useContext, Fragment, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Callout } from "react-native-maps";
import styled, { ThemeContext } from "styled-components/native";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ScrollView } from "react-native";
import { getStatusBarHeight } from "react-native-safe-area-view";

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

const LAT_DELTA = 0.05;
const LON_DELTA = 0.05;

const fixTo = (number, decimalPlaces) => parseFloat(number).toFixed(decimalPlaces);

const PANELS = {
  info: "info",
  changeDirection: "changeDirection",
  changeStop: "changeStop"
};

export default function({ navigation }) {
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

  const [panel, setPanel] = useState(PANELS.info);

  const closeModal = () => {
    navigation.goBack();
  };

  const refresh = useRef(null);

  const handleChangePress = event => setPanel(PANELS.info);
  const handleRefreshPress = event => {
    refresh.current();
  };

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    setPanel(PANELS.info);
    setStop(stopParam);
    setDirection(directionParam);
    setDirections(directionsParam);
    setRoute(routeParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [predictionsParam.routeId, predictionsParam.stopId]);

  useEffect(() => {
    let mounted = true;

    async function fetchPredictions() {
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

        if (mounted) {
          setPredictions(_predictions);
          setLoading(false);
        }

        return () => {
          mounted = false;
        };
      } catch (err) {
        if (mounted) {
          setError(err);
        }
      }
    }

    fetchPredictions();
    refresh.current = fetchPredictions;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.id, direction.id, stop.id]);

  const moveMapToMyLocation = () => {
    mapRef.current.animateToCoordinate({
      latitude: location.lat,
      longitude: location.lon
    });
  };

  const handleDirectionChange = direction => event => {
    const stop = getNearestStop(direction.stops, location, distanceLimit);
    setDistance(getDistanceBetween(location, stop.location));

    setDirection(direction);
    setStop(stop);
  };

  const handleStopChange = stop => event => {
    setStop(stop);
    setDistance(getDistanceBetween(location, stop.location));
    setPanel(PANELS.info);
  };

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

      // TODO: "point" image is too big
      function getImage() {
        if (index === 0) return require("../../assets/images/start.png");
        if (index === direction.stops.length - 1) return require("../../assets/images/end.png");
        return require("../../assets/images/point.png");
      }

      return (
        <Marker coordinate={coordinate} image={getImage()} onPress={handleStopChange(stop)}>
          <Callout tooltip>
            <CalloutStop>
              <Strong>{stop.name}</Strong>
              <Text>{`${fixTo(distance, 2)} miles`}</Text>
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

    return <Polyline coordinates={coordinates} strokeColor={theme.textLight} strokeWidth={3} />;
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
            onDirectionPress={
              directions.length > 1 ? () => setPanel(PANELS.changeDirection) : undefined
            }
            onStopPress={direction.stops.length > 1 ? () => setPanel(PANELS.changeStop) : undefined}
            onRefreshPress={handleRefreshPress}
          />
        </PanelContainer>
      );
    }

    if (panel === PANELS.changeDirection) {
      return (
        <PanelContainer>
          <Row>
            <BackButton onPress={handleChangePress} />
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
          <BackButton onPress={handleChangePress} />
          <BackTitle>Change Stop</BackTitle>
        </Row>
        <ScrollView>
          {direction.stops.map((stopToSelect, index) => {
            return (
              <SelectItem
                key={stopToSelect.id}
                name={stopToSelect.name}
                selected={stopToSelect.id === stop.id}
                onSelect={handleStopChange(stopToSelect)}
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
        region={{
          latitude: stop.location.lat,
          longitude: stop.location.lon,
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
        </Fragment>
      </Map>
      {loading && (
        <LoaderWrapper>
          <MyLoader />
        </LoaderWrapper>
      )}
      <UtilityButtons>
        <CloseButton onPress={closeModal} />
        <MyLocationButton onPress={moveMapToMyLocation} />
      </UtilityButtons>
      <BottomPanel>{renderPanel()}</BottomPanel>
    </Container>
  );
}

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

const CloseButton = styled(CircularIconButton).attrs(props => ({
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

  padding: ${space.xLarge};
  border-radius: ${border.round};
  background-color: ${({ theme }) => theme.backgroundLight};
`;
