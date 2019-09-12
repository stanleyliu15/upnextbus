import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import { NextBusAPI } from "../api";
import { LocationPermissionDeniedError, NextBusNoNearbyError } from "../errors";
import { GeoLocation } from "../../types";
import * as Geolocation from "../utils/geolocation";

const getNearestStop = (
  stops: NextBus.Stop[],
  location: GeoLocation,
  maxStopDistance: number
): NextBus.Stop | null => {
  let nearestStopDistance = maxStopDistance;

  return stops.reduce((nearestStop, stop) => {
    const stopDistance = Geolocation.getDistanceBetween(location, stop.location);

    if (stopDistance < nearestStopDistance) {
      nearestStopDistance = stopDistance;
      return stop;
    }

    return nearestStop;
  }, null);
};

const getNearestStopLabels = (
  routes: NextBus.Route[],
  location: GeoLocation,
  maxStopDistance: number
): NextBus.StopLabel[] => {
  const boundingBox = Geolocation.getBoundingBox(location, maxStopDistance);
  const stopLabels: NextBus.StopLabel[] = [];

  for (let i = 0; i < routes.length; i += 1) {
    const route = routes[i];
    const intersects = Geolocation.boundingBoxesIntersects(boundingBox, route.boundingBox);

    if (intersects) {
      for (let j = 0; j < route.directions.length; j += 1) {
        const direction = route.directions[j];
        const nearestStop = getNearestStop(direction.stops, location, maxStopDistance);

        if (nearestStop) {
          const stopLabel = {
            routeId: route.id,
            directionId: direction.id,
            stopId: nearestStop.id
          };
          stopLabels.push(stopLabel);
        }
      }
    }
  }

  return stopLabels;
};

const getLocationAsync = async (): Promise<GeoLocation> => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status === "granted") {
    const { coords } = await Location.getCurrentPositionAsync({});

    return {
      lat: coords.latitude,
      lon: coords.longitude
    };
  }

  throw new LocationPermissionDeniedError();
};

export interface NearbyPredictionListConfig {
  agencyId: string;
  routes?: NextBus.Route[];
  maxStopDistance?: number;
}

const getNearbyPredictionsList = async (
  { agencyId, routes = [], maxStopDistance = 5 }: NearbyPredictionListConfig,
  parseOptions: NextBus.PredictionsListParseOptions
): Promise<NextBus.Predictions[]> => {
  try {
    const location = await getLocationAsync();
    const stopLabels = getNearestStopLabels(routes, location, maxStopDistance);
    if (stopLabels.length === 0) throw new NextBusNoNearbyError();
    const queryOptions = {
      agencyId,
      stopLabels
    };
    return await NextBusAPI.getPredictionsList(queryOptions, parseOptions);
  } catch (error) {
    throw error;
  }
};

export default getNearbyPredictionsList;
