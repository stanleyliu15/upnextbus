import { NextBus, NextBusAPI } from "../../../../types";

const buildQueryOptionsForAgencies: NextBus.QueryOptionsBuilder = (
  command: NextBusAPI.Command
): NextBusAPI.AgenciesQueryOptions => ({
  command
});

export default buildQueryOptionsForAgencies;
