const buildQueryOptionsForPredictions: NextBus.QueryOptionsBuilder = (
  command: NextBusAPI.Command,
  queryOptionsParam: NextBus.PredictionsQueryOptions
): NextBusAPI.PredictionsQueryOptions => ({
  command,
  a: queryOptionsParam.agencyId,
  r: queryOptionsParam.routeId,
  s: queryOptionsParam.stopId,
  useShortTitles: "true"
});

export default buildQueryOptionsForPredictions;
