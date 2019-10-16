const buildQueryOptionsForVehicles: NextBus.QueryOptionsBuilder = (
  command: NextBusAPI.Command,
  queryOptionsParam: NextBus.VehicleQueryOptions
): NextBusAPI.RoutesQueryOptions => ({
  command,
  a: queryOptionsParam.agencyId,
  r: queryOptionsParam.routeId,
  t: queryOptionsParam.lastTime
});

export default buildQueryOptionsForVehicles;
