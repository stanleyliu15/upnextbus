import request from "./request";

const NextBusAPI = {
  getAgencies: (): Promise<NextBus.Agency[]> => request("agencyList", {}),
  getRoutes: (options: NextBus.RoutesQueryOptions): Promise<NextBus.Route[]> =>
    request("routeConfig", options),
  getPredictions: (options: NextBus.PredictionsQueryOptions): Promise<NextBus.Predictions> =>
    request("predictions", options),
  getPredictionsList: (
    options: NextBus.PredictionsListQueryOptions
  ): Promise<NextBus.Predictions[]> => request("predictionsForMultiStops", options)
};

export default NextBusAPI;
