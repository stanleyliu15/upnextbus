import { arrayify } from "../../../utils";
import parseStop from "./parseStop";
import parseDirection from "./parseDirection";
import parsePath from "./parsePath";

const parseRoute = (route: NextBusAPI.Route): NextBus.Route => ({
  id: route.tag,
  name: route.title,
  shortName: route.shortTitle,
  color: `#${route.color}`,
  oppositeColor: `#${route.oppositeColor}`,
  boundingBox: {
    latMin: parseFloat(route.latMin),
    latMax: parseFloat(route.latMax),
    lonMin: parseFloat(route.lonMin),
    lonMax: parseFloat(route.lonMax)
  },
  stops: arrayify(route.stop).map(stop => parseStop(stop)),
  directions: arrayify(route.direction).map(direction => parseDirection(direction)),
  paths: route.path && arrayify(route.path).map(path => parsePath(path))
});

export default parseRoute;
