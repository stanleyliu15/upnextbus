import { NextBus, NextBusSource } from "../../../../types";

const buildQueryOptionsForVehicles: NextBus.QueryOptionsBuilder = (
  command: NextBusSource.Command,
  queryOptionsParam: NextBus.VehiclesQueryOptions
): NextBusSource.VehiclesQueryOptions => ({
  command,
  a: queryOptionsParam.agencyId,
  r: queryOptionsParam.routeId,
  t: queryOptionsParam.lastTime
});

export default buildQueryOptionsForVehicles;
