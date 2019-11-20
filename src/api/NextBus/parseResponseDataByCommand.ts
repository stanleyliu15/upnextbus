import p from "./parser";
import { NextBus, NextBusSource } from "../../../types";

const commandParser = {
  agencyList: (agencies: NextBusSource.Agency[]): NextBus.Agency[] =>
    agencies.map(agency => p.parseAgency(agency)),
  routeConfig: (routes: NextBusSource.Route[]): NextBus.Route[] =>
    routes.map(route => p.parseRoute(route)),
  routeList: (routeInfos: NextBusSource.RouteInfo[]): NextBus.RouteInfo[] =>
    routeInfos.map(routeInfo => p.parseRouteInfo(routeInfo)),
  predictions: (
    predictions: NextBusSource.Predictions,
    parseOptions: NextBus.PredictionsParseOptions
  ): NextBus.Predictions => p.parsePredictions(predictions, parseOptions),
  predictionsForMultiStops: (
    predictionsList: NextBusSource.Predictions[],
    parseOptions: NextBus.PredictionsListParseOptions
  ): NextBus.Predictions[] =>
    predictionsList.map(predictions => p.parsePredictions(predictions, parseOptions)),
  vehicleLocations: (vehicles: NextBusSource.Vehicle[]): NextBus.Vehicle[] =>
    vehicles.map(vehicle => p.parseVehicle(vehicle))
};

/**
 * Parsers the data of the response based on the command
 */
export default (
  command: NextBusSource.Command,
  responseData: any,
  parseOptions: NextBus.ParseOptions
): any => {
  return commandParser[command](responseData, parseOptions);
};
