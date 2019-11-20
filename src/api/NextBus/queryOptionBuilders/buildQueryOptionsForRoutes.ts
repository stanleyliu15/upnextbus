import { NextBus, NextBusSource } from "../../../../types";

const buildQueryOptionsForRoutes: NextBus.QueryOptionsBuilder = (
  command: NextBusSource.Command,
  queryOptionsParam: NextBus.RoutesQueryOptions
): NextBusSource.RoutesQueryOptions => {
  const queryOptions = {};
  queryOptions.command = command;
  queryOptions.a = queryOptionsParam.agencyId;

  if (queryOptionsParam.routeId) {
    queryOptions.r = queryOptionsParam.routeId;
  }

  queryOptions.terse = "true";

  return queryOptions;
};

export default buildQueryOptionsForRoutes;
