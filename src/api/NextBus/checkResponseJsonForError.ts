import parseError from "./parser/parseError";
import { NextBusAPIError } from "../../errors";

/**
 * Checks if the json response contains any error
 */
export default (responseJson: any) => {
  if (responseJson.Error) {
    const error = parseError(responseJson.Error);
    throw new NextBusAPIError(error.message, error.retriable);
  }
};
