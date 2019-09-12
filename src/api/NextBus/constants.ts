export const API_URL = "http://webservices.nextbus.com/service/publicJSONFeed";

/**
 * List of agency tag's or id's currently known to either:
 *  - contain no route information
 *  - contain too much route information
 *    NextBus API has a hard limit of 100 routes, if an agency exceeds that amount, it returns an Error
 *  - never seems to finish initialization
 *  - expose development data
 *
 * These agencies should not be sent to the caller
 *
 * The List:
 *  bruinbus - contains no information
 *  lametro, ttc - contains too much information
 *  rutgers, rutgers-newark - never seems to finish initialization
 *  dta, configdev - expose development data
 *
 */
export const AGENCY_ID_FILTERS = [
  "bruinbus",
  "rutgers",
  "rutgers-newark",
  "lametro",
  "ttc",
  "dta",
  "configdev"
];

export const COMMANDS = {
  agencyList: "agencyList",
  routeConfig: "routeConfig",
  routeList: "routeList",
  predictions: "predictions",
  predictionsForMultiStops: "predictions"
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
  predictionsForMultiStops: "predictions"
};
