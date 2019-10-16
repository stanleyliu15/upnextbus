import p from "./parser";

const commandParser = {
  agencyList: (agencies: NextBusAPI.Agency[]): NextBus.Agency[] =>
    agencies.map(agency => p.parseAgency(agency)),
  routeConfig: (routes: NextBusAPI.Route[]): NextBus.Route[] =>
    routes.map(route => p.parseRoute(route)),
  routeList: (routeInfos: NextBusAPI.RouteInfo[]): NextBus.RouteInfo[] =>
    routeInfos.map(routeInfo => p.parseRouteInfo(routeInfo)),
  predictions: (
    predictions: NextBusAPI.Predictions,
    parseOptions: NextBus.PredictionsParseOptions
  ): NextBus.Predictions => p.parsePredictions(predictions, parseOptions),
  predictionsForMultiStops: (
    predictionsList: NextBusAPI.Predictions[],
    parseOptions: NextBus.PredictionsListParseOptions
  ): NextBus.Predictions[] =>
    predictionsList.map(predictions => p.parsePredictions(predictions, parseOptions)),
  vehicleLocations: (vehiclesConfig: NextBusAPI.VehiclesConfig): NextBus.VehiclesConfig =>
    p.parseVehiclesConfig(vehiclesConfig)
};

/**
 * Parsers the data of the response based on the command
 */
export default (
  command: NextBusAPI.Command,
  responseData: any,
  parseOptions: NextBus.ParseOptions
): any => {
  return commandParser[command](responseData, parseOptions);
};
