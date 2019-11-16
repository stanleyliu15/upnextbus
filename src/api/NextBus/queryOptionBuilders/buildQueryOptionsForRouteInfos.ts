import { NextBus, NextBusAPI } from "../../../../types";

const buildQueryOptionsForRouteInfos: NextBus.QueryOptionsBuilder = (
  command: NextBusAPI.Command,
  queryOptionsParam: NextBus.RouteInfosQueryOptions
): NextBusAPI.RouteInfosQueryOptions => ({
  command,
  a: queryOptionsParam.agencyId
});

export default buildQueryOptionsForRouteInfos;
