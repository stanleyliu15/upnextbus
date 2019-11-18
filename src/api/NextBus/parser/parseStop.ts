import { titleCase } from "../../../utils";
import { NextBus, NextBusAPI } from "../../../../types";

import parseLocation from "./parseLocation";

const parseStop = (stop: NextBusAPI.Stop): NextBus.Stop => ({
  id: stop.tag,
  name: titleCase(stop.title),
  shortName: titleCase(stop.shortTitle),
  lookupId: parseInt(stop.stopId, 10),
  location: parseLocation(stop.lat, stop.lon)
});

export default parseStop;
