import { NextBus, NextBusSource } from "../../../../types";

const buildQueryOptionsForAgencies: NextBus.QueryOptionsBuilder = (
  command: NextBusSource.Command
): NextBusSource.AgenciesQueryOptions => ({
  command
});

export default buildQueryOptionsForAgencies;
