import b from "./queryOptionBuilders";
import { NextBus, NextBusSource } from "../../../types";

const commandQueryOptionsBuilder = {
  agencyList: b.buildQueryOptionsForAgencies,
  routeConfig: b.buildQueryOptionsForRoutes,
  routeList: b.buildQueryOptionsForRouteInfos,
  predictions: b.buildQueryOptionsForPredictions,
  predictionsForMultiStops: b.buildQueryOptionsForPredictionsList,
  vehicleLocations: b.buildQueryOptionsForVehicles
};

/**
 * Builds the query options used by this api to Nextbus API based on the command
 */
export default (
  command: NextBusSource.Command,
  queryOptionsParam: NextBus.QueryOptions
): NextBusSource.QueryOptions => {
  return commandQueryOptionsBuilder[command](command, queryOptionsParam);
};
