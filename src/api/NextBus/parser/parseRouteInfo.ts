import { NextBus, NextBusSource } from "../../../../types";

const parseRouteInfo = (routeInfo: NextBusSource.RouteInfo): NextBus.RouteInfo => ({
  id: routeInfo.tag,
  name: routeInfo.title,
  shortName: routeInfo.shortTitle
});

export default parseRouteInfo;
