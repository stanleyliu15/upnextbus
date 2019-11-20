import { NextBus, NextBusSource } from "../../../../types";

const buildQueryOptionsForRoutes: NextBus.QueryOptionsBuilder = (
  command: NextBusSource.Command,
  queryOptionsParam: NextBus.RoutesQueryOptions
): NextBusSource.RoutesQueryOptions => ({
  command,
  a: queryOptionsParam.agencyId,
  terse: "true"
});

export default buildQueryOptionsForRoutes;
