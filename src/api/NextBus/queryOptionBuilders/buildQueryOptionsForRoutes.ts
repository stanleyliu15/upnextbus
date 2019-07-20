const buildQueryOptionsForRoutes: NextBus.QueryOptionsBuilder = (
  command: NextBusAPI.Command,
  queryOptionsParam: NextBus.RoutesQueryOptions
): NextBusAPI.RoutesQueryOptions => ({
  command,
  a: queryOptionsParam.agencyId,
  terse: "true"
});

export default buildQueryOptionsForRoutes;
