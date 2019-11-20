import { arrayify } from "../../../utils";
import parseLocation from "./parseLocation";
import { NextBus, NextBusSource } from "../../../../types";

const parsePath = (path: NextBusSource.Path): NextBus.Path => ({
  locations: arrayify(path.point).map(point => parseLocation(point.lat, point.lon))
});

export default parsePath;
