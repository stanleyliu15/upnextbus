import parseVehicle from "./parseVehicle";

const parseVehiclesConfig = (vehiclesConfig: NextBusAPI.VehiclesConfig): NextBus.VehiclesConfig => {
  return {
    vehicles: vehiclesConfig.vehicles.map(vehicle => parseVehicle(vehicle)),
    lastTime: vehiclesConfig.lastTime.time
  };
};

export default parseVehiclesConfig;
