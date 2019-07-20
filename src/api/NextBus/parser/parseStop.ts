import parseLocation from "./parseLocation";

const parseStop = (stop: NextBusAPI.Stop): NextBus.Stop => ({
  id: stop.tag,
  name: stop.title,
  shortName: stop.shortTitle,
  lookupId: parseInt(stop.stopId, 10),
  location: parseLocation(stop.lat, stop.lon)
});

export default parseStop;
