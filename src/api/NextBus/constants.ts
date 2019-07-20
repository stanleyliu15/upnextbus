export const API_URL = "http://webservices.nextbus.com/service/publicJSONFeed";

/**
 * List of agency tag's currently known to either:
 *  - contain no route information
 *  - contain too much route information
 *    NextBus API has a hard limit of 100 routes, if an agency exceeds that amount, it returns an Error
 *  - never seems to finish initialization
 *
 * These agencies should not be sent to the caller
 *
 * The List:
 *  bruinbus - contains no information
 *  lametro, ttc - contains too much information
 *  rutgers-newark - never seems to finish initialization
 */
export const AGENCY_ID_BLACKLIST = ["bruinbus", "rutgers-newark", "lametro", "ttc"];

/**
 * Command Content Key Map
 * to be used primary to get only the data that is needed from the response json
 * key - command used by the NextBus API
 * value - content key used to extract the underlying data
 *
 * Example: A request to NextBusAPI where command is agencyList should return
 *      { agency: [...], copyright: "..." }
 *      The underlying data is inside agency so in this case:
 *      the content key is "agency"
 */
export const COMMAND_CONTENT_KEY_MAP = {
  agencyList: "agency",
  routeConfig: "route",
  routeList: "route",
  predictions: "predictions",
  predictionsForMultiStops: "predictions"
};
