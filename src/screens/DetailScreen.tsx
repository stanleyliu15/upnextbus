import React, { useState, useEffect, useContext, Fragment, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import styled, { ThemeContext } from "styled-components/native";
import { useSelector } from "react-redux";
import * as Location from "expo-location";

import { selectSelectedAgencyId } from "../store/features/nextbus";
import {
  selectThemeColor,
  selectPredictionListLimit,
  selectDistanceLimit
} from "../store/features/settings";
import { ThemeColor } from "../styles";
import { DARK_MAP_STYLE } from "../config/mapStyle";
import { Text, Loader } from "../components/atoms";
import { getDistanceBetween } from "../utils/geolocation";
import NextBusAPI from "../api/NextBus/api";
import { ErrorInfo } from "../components/molecules";
import { PredictionsItem } from "../components/organisms/Nearby";
import { getNearestStop } from "../services/nextbus-service";

const LAT_DELTA = 0.05;
const LON_DELTA = 0.05;

export default function({ navigation }) {
  const predictionsParam = navigation.getParam("predictions");
  const routeParam = navigation.getParam("route");
  const directionsParam = navigation.getParam("directions");
  const directionParam = navigation.getParam("direction");
  const stopParam = navigation.getParam("stop");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const theme = useContext(ThemeContext);
  const themeColor = useSelector(selectThemeColor);

  const agencyId = useSelector(selectSelectedAgencyId);
  const predictionsListLimit = useSelector(selectPredictionListLimit);
  const distanceLimit = useSelector(selectDistanceLimit);

  const [predictions, setPredictions] = useState(predictionsParam);
  const [route, setRoute] = useState(routeParam);
  const [directions, setDirections] = useState(directionsParam);
  const [direction, setDirection] = useState(directionParam);
  const [stop, setStop] = useState(stopParam);

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    setStop(stopParam);
    setDirection(directionParam);
    setDirections(directionsParam);
    setRoute(routeParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [predictionsParam.routeId]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.id, direction.id, stop.id]);

  const [distance, setDistance] = useState(null);
  const [location, setLocation] = useState(null);

  const handleDirectionChange = direction => event => {
    const stop = getNearestStop(direction.stops, location, distanceLimit);
    setDistance(getDistanceBetween(location, stop.location));

    setDirection(direction);
    setStop(stop);
  };

  const handleStopChange = stop => event => {
    setStop(stop);
    setDistance(getDistanceBetween(location, stop.location));
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

      function getImage() {
        if (index === 0) return require("../../assets/images/start.png");
        if (index === direction.stops.length - 1) return require("../../assets/images/end.png");
        return require("../../assets/images/point.png");
      }

      return <Marker coordinate={coordinate} image={getImage()} onPress={handleStopChange(stop)} />;
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

  if (error) {
    return <ErrorInfo message={error.message} />;
  }

  return (
    <Container>
      <Map
        provider={PROVIDER_GOOGLE}
        initialRegion={{
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
      <BottomPanel>
        <MyPredictionsItem predictions={predictions} />
      </BottomPanel>
    </Container>
  );
}

const LoaderWrapper = styled.View`
  position: relative;
`;

const MyLoader = styled(Loader)`
  position: absolute;
  top: 20;
  right: 20;

  background-color: transparent;
`;

const MyPredictionsItem = styled(PredictionsItem)`
  padding: 0;
  border: none;
`;

const Container = styled.View`
  flex: 1;
`;

const BottomPanel = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Map = styled(MapView)`
  flex: 1;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
