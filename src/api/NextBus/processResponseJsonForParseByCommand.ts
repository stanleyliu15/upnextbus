import flow from "lodash/flow";

import { AGENCY_ID_FILTERS, COMMAND_PATH_MAP, COMMANDS } from "./config";
import { arrayify } from "../../utils";
import { NextBusAPIError } from "../../errors";
import parseError from "./parser/parseError";
import { NextBusSource } from "../../../types";

const checkResponseJsonForError = (responseJson: NextBusSource.ResponseJson) => {
  if (responseJson.Error) {
    const error = parseError(responseJson.Error);
    throw new NextBusAPIError(error.message, error.retriable);
  }

  return responseJson;
};

const extractResponseData = (
  command: NextBusSource.Command,
  responseJson: NextBusSource.ResponseJson
): any => {
  if (command === COMMANDS.vehicleLocations) {
    return responseJson;
  }

  const path = COMMAND_PATH_MAP[command];
  return responseJson[path];
};

const uniformalizeResponseData = (command: NextBusSource.Command, responseData: any): any => {
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

const cleanseResponseData = (command: NextBusSource.Command, responseData: any): any => {
  if (command === COMMANDS.agencyList) {
    const agencies = responseData as NextBusSource.Agency[];
    return agencies.filter(
      (agency: NextBusSource.Agency) => !AGENCY_ID_FILTERS.includes(agency.tag)
    );
  }

  return responseData;
};

export default (command: NextBusSource.Command, responseJson: NextBusSource.ResponseJson) => {
  return flow(
    checkResponseJsonForError,
    extractResponseData.bind(this, command),
    uniformalizeResponseData.bind(this, command),
    cleanseResponseData.bind(this, command)
  )(responseJson);
};
