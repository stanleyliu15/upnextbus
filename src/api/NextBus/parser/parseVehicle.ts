import parseLocation from "./parseLocation";

const parseVehicle = (vehicle: NextBusAPI.Vehicle): NextBus.Vehicle => ({
  id: vehicle.id,
  routeId: vehicle.routeId,
  directionId: vehicle.dirTag,
  location: parseLocation(vehicle.lat, vehicle.lon),
  secondsSinceRecord: parseInt(vehicle.secsSinceReport, 10),
  predictable: vehicle.predictable,
  heading: vehicle.heading,
  speed: vehicle.speedKmHr
});

export default parseVehicle;
