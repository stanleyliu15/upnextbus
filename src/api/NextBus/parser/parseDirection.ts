import { NextBus, NextBusSource } from "../../../../types";
import { parseBoolean, arrayify } from "../../../utils";

const parseDirection = (direction: NextBusSource.Direction): NextBus.Direction => ({
  id: direction.tag,
  name: direction.title,
  shortName: direction.name === "" ? null : direction.name,
  useForUI: parseBoolean(direction.useForUI),
  stopIds: arrayify(direction.stop).map((tagObject: NextBusSource.TagObject) => tagObject.tag),
  // parseRoute handles setting the stops
  stops: []
});

export default parseDirection;
