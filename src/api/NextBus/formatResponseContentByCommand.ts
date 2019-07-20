/**
 * Formats the content of the response based on the command
 * @param command - the command used in the response
 * @param responseContent - the content of the response
 */
export default (command: NextBusAPI.Command, responseContent: any): any => {
  // the api returns data as a single element or array of elements for the same field
  // depending on the avaliability of data at the time the call was given
  // this does not apply to certain commands such as predictions which is always its own element
  if (command === "predictions" || Array.isArray(responseContent)) {
    return responseContent;
  }

  return [responseContent];
};
