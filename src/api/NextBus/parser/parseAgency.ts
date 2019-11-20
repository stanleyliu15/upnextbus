import { NextBus, NextBusSource } from "../../../../types";

const parseAgency = (agency: NextBusSource.Agency): NextBus.Agency => ({
  id: agency.tag,
  name: agency.title,
  region: agency.regionTitle,
  shortName: agency.shortTitle
});

export default parseAgency;
