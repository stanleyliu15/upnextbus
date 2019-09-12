import request from "./request";

const NextBusAPI = {
  getAgencies: (): Promise<NextBus.Agency[]> => request("agencyList"),
  getRoutes: (queryOptions: NextBus.RoutesQueryOptions): Promise<NextBus.Route[]> =>
    request("routeConfig", queryOptions),
  getPredictions: (
    queryOptions: NextBus.PredictionsQueryOptions,
    parseOptions: NextBus.PredictionsParseOptions
  ): Promise<NextBus.Predictions> => request("predictions", queryOptions, parseOptions),
  getPredictionsList: (
    queryOptions: NextBus.PredictionsListQueryOptions,
    parseOptions: NextBus.PredictionsListParseOptions
  ): Promise<NextBus.Predictions[]> =>
    request("predictionsForMultiStops", queryOptions, parseOptions)
};

export default NextBusAPI;
