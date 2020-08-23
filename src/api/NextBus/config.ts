export const API_URL = "http://webservices.nextbus.com/service/publicJSONFeed";

export const COMMANDS = {
  agencyList: "agencyList",
  routeConfig: "routeConfig",
  routeList: "routeList",
  predictions: "predictions",
  predictionsForMultiStops: "predictionsForMultiStops",
  vehicleLocations: "vehicleLocations"
};

/**
 * Command Path Map
 * A Map of the command with the path to the property containing the data
 * key: string - command used by the NextBus API
 * value: string - path used to extract the underlying data
 *
 * Example: A request to NextBusAPI where command is agencyList should return
 *  { agency: [...], copyright: "..." }
 *  The underlying data is inside agency so in this case:
 *  the data path is "agency"
 */
export const COMMAND_PATH_MAP = {
  agencyList: "agency",
  routeConfig: "route",
  routeList: "route",
  predictions: "predictions",
  predictionsForMultiStops: "predictions",
  vehicleLocations: "vehicle"
};
