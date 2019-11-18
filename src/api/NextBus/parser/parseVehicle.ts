import parseLocation from "./parseLocation";
import { NextBus, NextBusAPI } from "../../../../types";
import { parseBoolean } from "../../../utils";

const parseVehicle = (vehicle: NextBusAPI.Vehicle): NextBus.Vehicle => ({
  id: vehicle.id,
  routeId: vehicle.routeTag,
  directionId: vehicle.dirTag,
  location: parseLocation(vehicle.lat, vehicle.lon),
  secondsSinceRecord: parseInt(vehicle.secsSinceReport, 10),
  predictable: parseBoolean(vehicle.predictable),
  heading: parseInt(vehicle.heading, 10),
  speed: parseInt(vehicle.speedKmHr, 10)
});

export default parseVehicle;
