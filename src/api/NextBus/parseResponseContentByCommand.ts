import p from "./parser";

const commandParser = {
  agencyList: (agencies: NextBusAPI.Agency[]): NextBus.Agency[] =>
    agencies.map(agency => p.parseAgency(agency)),
  routeConfig: (routes: NextBusAPI.Route[]): NextBus.Route[] =>
    routes.map(route => p.parseRoute(route)),
  routeList: (routeInfos: NextBusAPI.RouteInfo[]): NextBus.RouteInfo[] =>
    routeInfos.map(routeInfo => p.parseRouteInfo(routeInfo)),
  predictions: (predictions: NextBusAPI.Predictions): NextBus.Predictions =>
    p.parsePredictions(predictions),
  predictionsForMultiStops: (predictionsList: NextBusAPI.Predictions[]): NextBus.Predictions[] =>
    predictionsList.map(predictions => p.parsePredictions(predictions))
};

/**
 * Parsers the content of the response based on the command
 */
export default (command: NextBusAPI.Command, responseContent: any): any => {
  return commandParser[command](responseContent);
};
