import { API_URL } from "./constants";
import buildQueryOptionsByCommand from "./buildQueryOptionsByCommand";
import checkResponseJsonForError from "./checkResponseJsonForError";
import formatResponseContentByCommand from "./formatResponseContentByCommand";
import filterResponseJsonByCommand from "./filterResponseJsonByCommand";
import parseResponseContentByCommand from "./parseResponseContentByCommand";
import { objectToQueryParameters } from "../../utils/utils";

const request = async (
  command: NextBusAPI.Command,
  queryOptionsParam: NextBus.QueryOptions
): Promise<any> => {
  const queryOptions = buildQueryOptionsByCommand(command, queryOptionsParam);
  const queryParameters = objectToQueryParameters(queryOptions);
  const url = `${API_URL}?${queryParameters}`;

  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    checkResponseJsonForError(responseJson);
    const responseContent = filterResponseJsonByCommand(command, responseJson);
    const formattedResponseContent = formatResponseContentByCommand(command, responseContent);
    const parsedResponseContent = parseResponseContentByCommand(command, formattedResponseContent);

    return parsedResponseContent;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    throw error;
  }
};

export default request;
