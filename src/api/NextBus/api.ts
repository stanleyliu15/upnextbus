import request from "./request";
import { NextBus } from "../../../types";
import {
  NextBusSourceMaximumRouteError,
  NextBusUnavaliableRouteError,
  NextBusNoNearbyError
} from "../../errors";

const NextBusAPI = {
  getAgencies: () => request("agencyList") as Promise<NextBus.Agency[]>,
  getRoutes: async (queryOptions: NextBus.RoutesQueryOptions) => {
    try {
      const routes = (await request("routeConfig", queryOptions)) as NextBus.Route[];
      return routes;
    } catch (error) {
      if (error instanceof NextBusSourceMaximumRouteError) {
        const routeInfos = (await request("routeList", queryOptions)) as NextBus.RouteInfo[];
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
  ) => request("predictions", queryOptions, parseOptions) as Promise<NextBus.Predictions>,
  getPredictionsList: async (
    queryOptions: NextBus.PredictionsListQueryOptions,
    parseOptions: NextBus.PredictionsListParseOptions
  ): Promise<NextBus.Predictions[]> => {
    let { stopLabels } = queryOptions;

    while (true) {
      if (stopLabels.length === 0) {
        throw new NextBusNoNearbyError();
      }

      try {
        // eslint-disable-next-line no-await-in-loop
        const predictionsList = (await request(
          "predictionsForMultiStops",
          { ...queryOptions, stopLabels },
          parseOptions
        )) as NextBus.Predictions[];

        return predictionsList;
      } catch (error) {
        if (error instanceof NextBusUnavaliableRouteError) {
          stopLabels = stopLabels.filter(stopLabel => stopLabel.routeId !== error.routeId);
          // eslint-disable-next-line no-continue
          continue;
        }

        throw error;
      }
    }
  },
  getVehicles: (queryOptions: NextBus.VehiclesQueryOptions) =>
    request("vehicleLocations", queryOptions) as Promise<NextBus.Vehicle[]>
};

export default NextBusAPI;
