import { arrayify } from "../../../utils";
import parseStop from "./parseStop";
import parseDirection from "./parseDirection";
import parsePath from "./parsePath";
import { NextBus, NextBusSource } from "../../../../types";

const parseRoute = (routeParam: NextBusSource.Route): NextBus.Route => {
  const route = {} as NextBus.Route;

  route.id = routeParam.tag;
  route.name = routeParam.title;
  route.shortName = routeParam.shortTitle;
  route.color = `#${routeParam.color}`;
  route.oppositeColor = `#${routeParam.oppositeColor}`;
  route.boundingBox = {
    latMin: parseFloat(routeParam.latMin),
    latMax: parseFloat(routeParam.latMax),
    lonMin: parseFloat(routeParam.lonMin),
    lonMax: parseFloat(routeParam.lonMax)
  };
  route.paths = routeParam.path && arrayify(routeParam.path).map(path => parsePath(path));

  const stops = arrayify(routeParam.stop).map(stop => parseStop(stop));
  const directions = arrayify(routeParam.direction).map(directionParam => {
    const direction = parseDirection(directionParam);
    return {
      ...direction,
      stops: direction.stopIds.map(stopId => stops.find(stop => stop.id === stopId))
    };
  });

  route.directions = directions;
  return route;
};

export default parseRoute;
