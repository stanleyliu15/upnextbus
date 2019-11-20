import { NextBus, NextBusSource } from "../../../../types";

const buildQueryOptionsForPredictionsList: NextBus.QueryOptionsBuilder = (
  command: NextBusSource.Command,
  queryOptions: NextBus.PredictionsListQueryOptions
): NextBusSource.PredictionsListQueryOptions => ({
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
