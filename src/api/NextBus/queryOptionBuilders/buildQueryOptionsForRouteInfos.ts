import { NextBus, NextBusSource } from "../../../../types";

const buildQueryOptionsForRouteInfos: NextBus.QueryOptionsBuilder = (
  command: NextBusSource.Command,
  queryOptionsParam: NextBus.RouteInfosQueryOptions
): NextBusSource.RouteInfosQueryOptions => ({
  command,
  a: queryOptionsParam.agencyId
});

export default buildQueryOptionsForRouteInfos;
