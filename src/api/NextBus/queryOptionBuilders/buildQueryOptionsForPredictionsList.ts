import { NextBus, NextBusAPI } from "../../../../types";

const buildQueryOptionsForPredictionsList: NextBus.QueryOptionsBuilder = (
  command: NextBusAPI.Command,
  queryOptions: NextBus.PredictionsListQueryOptions
): NextBusAPI.PredictionsListQueryOptions => ({
  command,
  a: queryOptions.agencyId,
  stopLabels: queryOptions.stopLabels.reduce(
    (stopLabelsString: string, stopLabel: NextBus.StopLabel) =>
      `${stopLabelsString}&stops=${stopLabel.routeId}|${stopLabel.stopId}`,
    ""
  ),
  useShortTitles: "true"
});

export default buildQueryOptionsForPredictionsList;
