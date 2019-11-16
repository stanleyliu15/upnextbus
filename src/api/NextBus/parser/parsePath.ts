import { arrayify } from "../../../utils";
import parseLocation from "./parseLocation";
import { NextBus, NextBusAPI } from "../../../../types";

const parsePath = (path: NextBusAPI.Path): NextBus.Path => ({
  locations: arrayify(path.point).map(point => parseLocation(point.lat, point.lon))
});

export default parsePath;
