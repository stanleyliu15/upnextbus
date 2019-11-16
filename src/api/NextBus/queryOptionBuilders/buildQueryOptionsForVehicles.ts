import { NextBus, NextBusAPI } from "../../../../types";

const buildQueryOptionsForVehicles: NextBus.QueryOptionsBuilder = (
  command: NextBusAPI.Command,
  queryOptionsParam: NextBus.VehiclesQueryOptions
): NextBusAPI.VehiclesQueryOptions => ({
  command,
  a: queryOptionsParam.agencyId,
  r: queryOptionsParam.routeId,
  t: queryOptionsParam.lastTime
});

export default buildQueryOptionsForVehicles;
