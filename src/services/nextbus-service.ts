import { getLocationAsync } from "./location-service";
import NextBusAPI from "../api/NextBus/api";
import { NextBusNoNearbyError } from "../errors";
import { GeoLocation } from "../../types";
import * as Geolocation from "../utils/geolocation";

const createStopLabel = (routeId, stopId) => ({ routeId, stopId });

export const getNearestStop = (
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
    } else {
      return nearestStop;
    }
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
          const stopLabel = createStopLabel(route.id, nearestStop.id);
          stopLabels.push(stopLabel);
        }
      }
    }
  }

  return stopLabels;
};

export interface NearbyPredictionListConfig {
  agencyId: string;
  routes?: NextBus.Route[];
  maxStopDistance?: number;
  favorites: NextBus.StopLabel[];
  routeIdFilters: string[];
}

export const getNearbyPredictionsList = async (
  {
    agencyId,
    routes = [],
    maxStopDistance = 1,
    favorites = [],
    routeIdFilters = []
  }: NearbyPredictionListConfig,
  parseOptions: NextBus.PredictionsListParseOptions
): Promise<NextBus.Predictions[]> => {
  try {
    const location = await getLocationAsync();
    const routesFiltered =
      routeIdFilters.length > 0
        ? routes.filter(route => routeIdFilters.includes(route.id))
        : routes;

    const favoriteStopLabels = favorites.map(favorite =>
      createStopLabel(favorite.routeId, favorite.stopId)
    );

    console.log("TEST", agencyId, routesFiltered, location, maxStopDistance);
    const nearbyStopLabels = getNearestStopLabels(routesFiltered, location, maxStopDistance);

    const allStopLabels = favoriteStopLabels.concat(nearbyStopLabels);

    if (allStopLabels.length === 0) throw new NextBusNoNearbyError();
    const queryOptions = {
      agencyId,
      stopLabels: allStopLabels
    };

    const predictionsList = await NextBusAPI.getPredictionsList(queryOptions, parseOptions);

    return predictionsList.reduce((list, item) => {
      const isFavorite = favorites.some(
        favorite => item.routeId === favorite.routeId && item.stopId === favorite.stopId
      );
      if (isFavorite) {
        return [item, ...list];
      } else {
        return [...list, item];
      }
    }, []);
  } catch (error) {
    throw error;
  }
};
