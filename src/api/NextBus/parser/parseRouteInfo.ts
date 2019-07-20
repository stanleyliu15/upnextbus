const parseRouteInfo = (routeInfo: NextBusAPI.RouteInfo): NextBus.RouteInfo => ({
  id: routeInfo.tag,
  name: routeInfo.title,
  shortName: routeInfo.shortTitle
});

export default parseRouteInfo;
