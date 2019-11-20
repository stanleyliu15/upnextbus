import { NextBus, NextBusSource } from "../../../../types";

const buildQueryOptionsForPredictions: NextBus.QueryOptionsBuilder = (
  command: NextBusSource.Command,
  queryOptionsParam: NextBus.PredictionsQueryOptions
): NextBusSource.PredictionsQueryOptions => ({
  command,
  a: queryOptionsParam.agencyId,
  r: queryOptionsParam.routeId,
  s: queryOptionsParam.stopId,
  useShortTitles: "true"
});

export default buildQueryOptionsForPredictions;
