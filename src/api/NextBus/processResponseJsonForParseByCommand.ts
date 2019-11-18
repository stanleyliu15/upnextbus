import flow from "lodash/flow";

import { AGENCY_ID_FILTERS, COMMAND_PATH_MAP, COMMANDS } from "./config";
import { arrayify } from "../../utils";
import { NextBusAPIError } from "../../errors";
import parseError from "./parser/parseError";
import { NextBusAPI } from "../../../types";

const checkResponseJsonForError = (responseJson: NextBusAPI.ResponseJson) => {
  if (responseJson.Error) {
    const error = parseError(responseJson.Error);
    throw new NextBusAPIError(error.message, error.retriable);
  }

  return responseJson;
};

const extractResponseData = (
  command: NextBusAPI.Command,
  responseJson: NextBusAPI.ResponseJson
): any => {
  if (command === COMMANDS.vehicleLocations) {
    return responseJson;
  }

  const path = COMMAND_PATH_MAP[command];
  return responseJson[path];
};

const uniformalizeResponseData = (command: NextBusAPI.Command, responseData: any): any => {
  if (command === COMMANDS.predictions) {
    return responseData;
  }

  if (command === COMMANDS.vehicleLocations) {
    // eslint-disable-next-line no-prototype-builtins
    return responseData.hasOwnProperty(COMMAND_PATH_MAP[command])
      ? arrayify(responseData[COMMAND_PATH_MAP[command]])
      : [];
  }

  return arrayify(responseData);
};

const cleanseResponseData = (command: NextBusAPI.Command, responseData: any): any => {
  if (command === COMMANDS.agencyList) {
    const agencies = responseData as NextBusAPI.Agency[];
    return agencies.filter((agency: NextBusAPI.Agency) => !AGENCY_ID_FILTERS.includes(agency.tag));
  }

  return responseData;
};

export default (command: NextBusAPI.Command, responseJson: NextBusAPI.ResponseJson) => {
  return flow(
    checkResponseJsonForError,
    extractResponseData.bind(this, command),
    uniformalizeResponseData.bind(this, command),
    cleanseResponseData.bind(this, command)
  )(responseJson);
};
