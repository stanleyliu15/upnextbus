import { parseBoolean } from "../../../utils/utils";

const parseError = (errorParam: NextBusAPI.Error | NextBusAPI.Error[]): NextBus.Error => {
  // api returns duplicate errors as array on certain inputs
  if (Array.isArray(errorParam)) {
    return {
      message: errorParam[0].content,
      retriable: parseBoolean(errorParam[0].shouldRetry)
    };
  }

  return {
    message: errorParam.content,
    retriable: parseBoolean(errorParam.shouldRetry)
  };
};

export default parseError;
