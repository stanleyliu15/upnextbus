import flow from "lodash/flow";

import { COMMAND_PATH_MAP, COMMANDS } from "./config";
import { arrayify } from "../../utils";
import { NextBusAPIError, NextBusSourceMaximumRouteError } from "../../errors";
import parseError from "./parser/parseError";
import { NextBusSource } from "../../../types";

const MAXIMUM_ROUTES_ERROR_MESSAGE =
  'Command would return more routes than the maximum: 100.\n Try specifying batches of routes from "routeList".';

const checkResponseJsonForError = (responseJson: NextBusSource.ResponseJson) => {
  if (responseJson.Error) {
    const error = parseError(responseJson.Error);

    if (error.message === MAXIMUM_ROUTES_ERROR_MESSAGE) {
      throw new NextBusSourceMaximumRouteError(error.message);
    }

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

export default (command: NextBusSource.Command, responseJson: NextBusSource.ResponseJson) => {
  return flow(
    checkResponseJsonForError,
    extractResponseData.bind(this, command),
    uniformalizeResponseData.bind(this, command)
  )(responseJson);
};
