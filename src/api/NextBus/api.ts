import request from "./request";
import { NextBus } from "../../../types";
import { NextBusSourceMaximumRouteError, NextBusUnavaliableRouteError } from "../../errors";

const NextBusAPI = {
  getAgencies: (): Promise<NextBus.Agency[]> => request("agencyList"),
  getRoutes: async (queryOptions: NextBus.RoutesQueryOptions): Promise<NextBus.Route[]> => {
    try {
      const routes = await request("routeConfig", queryOptions);
      return routes;
    } catch (error) {
      if (error instanceof NextBusSourceMaximumRouteError) {
        const routeInfos: NextBus.RouteInfo[] = await request("routeList", queryOptions);
        const routePromises: Promise<NextBus.Route>[] = routeInfos.map(async routeInfo => {
          const routeConfig = await request("routeConfig", {
            ...queryOptions,
            routeId: routeInfo.id
          });

          return routeConfig[0];
        });

        return Promise.all(routePromises);
      }

      throw error;
    }
  },
  getPredictions: (
    queryOptions: NextBus.PredictionsQueryOptions,
    parseOptions: NextBus.PredictionsParseOptions
  ): Promise<NextBus.Predictions> => request("predictions", queryOptions, parseOptions),
  getPredictionsList: async (
    queryOptions: NextBus.PredictionsListQueryOptions,
    parseOptions: NextBus.PredictionsListParseOptions
  ): Promise<NextBus.Predictions[]> => {
    try {
      const predictionsList = await request("predictionsForMultiStops", queryOptions, parseOptions);
      return predictionsList;
    } catch (error) {
      if (error instanceof NextBusUnavaliableRouteError) {
        const stopLabels = queryOptions.stopLabels.filter(
          stopLabel => stopLabel.routeId !== error.routeId
        );

        const predictionsList = await request(
          "predictionsForMultiStops",
          { ...queryOptions, stopLabels },
          parseOptions
        );

        return predictionsList;
      }

      throw error;
    }
  },
  getVehicles: (queryOptions: NextBus.VehiclesQueryOptions): Promise<NextBus.Vehicle[]> =>
    request("vehicleLocations", queryOptions)
};

export default NextBusAPI;
