import NextBusAPI from "../api/NextBus/api";
import { GeoLocation, NextBus } from "../../types";
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
  location: GeoLocation;
  favorites: NextBus.StopLabel[];
  routeIdFilters: string[];
  filterInactivePredictions: boolean;
}

// todo: if route is currently unavaliable but favorited
// we still want the user to see it in the nearby list UI,
// also see showInactiveBus's setting
export const getNearbyPredictionsList = async (
  {
    agencyId,
    routes,
    location,
    maxStopDistance,
    favorites,
    routeIdFilters,
    filterInactivePredictions
  }: NearbyPredictionListConfig,
  parseOptions: NextBus.PredictionsListParseOptions
): Promise<NextBus.Predictions[]> => {
  try {
    const routesFiltered =
      routeIdFilters.length > 0
        ? routes.filter(route => routeIdFilters.includes(route.id))
        : routes;
    const nearbyStopLabels = getNearestStopLabels(routesFiltered, location, maxStopDistance);
    const favoriteStopLabels = favorites.map(favorite =>
      createStopLabel(favorite.routeId, favorite.stopId)
    );
    const allStopLabels = favoriteStopLabels.concat(nearbyStopLabels);

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
      }
      if (filterInactivePredictions && item.predictionList.length === 0) {
        return list;
      }
      return [...list, item];
    }, []);
  } catch (error) {
    throw error;
  }
};
