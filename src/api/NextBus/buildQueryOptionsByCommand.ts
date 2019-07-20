import b from "./queryOptionBuilders";

const commandQueryOptionsBuilder = {
  agencyList: b.buildQueryOptionsForAgencies,
  routeConfig: b.buildQueryOptionsForRoutes,
  routeList: b.buildQueryOptionsForRouteInfos,
  predictions: b.buildQueryOptionsForPredictions,
  predictionsForMultiStops: b.buildQueryOptionsForPredictionsList
};

/**
 * Builds the query options used by this api to Nextbus API based on the command
 */
export default (
  command: NextBusAPI.Command,
  queryOptionsParam: NextBus.QueryOptions
): NextBusAPI.QueryOptions => {
  return commandQueryOptionsBuilder[command](command, queryOptionsParam);
};
