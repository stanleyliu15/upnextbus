import { AGENCY_ID_BLACKLIST, COMMAND_CONTENT_KEY_MAP } from "./constants";

/**
 * Filters out unnessary data from the json response based on the command
 * @param command - the command used in the response
 * @param responseJson
 */
export default (command: NextBusAPI.Command, responseJson: any): any => {
  const responseContent = responseJson[COMMAND_CONTENT_KEY_MAP[command]];

  if (command === "agencyList") {
    // the api can return agencies with no data or too much data
    return responseContent.filter((agency: NextBusAPI.Agency) => {
      const { tag: agencyId } = agency;
      if (AGENCY_ID_BLACKLIST.includes(agencyId)) {
        return false;
      }
      return true;
    });
  }

  return responseContent;
};
