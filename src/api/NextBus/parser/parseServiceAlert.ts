import { removeExtraWhitespace } from "../../../utils";

const parseServiceAlert = (serviceAlert: NextBusAPI.ServiceAlert): NextBus.ServiceAlert => {
  const priority = serviceAlert.priority.toUpperCase() as NextBus.ServiceAlertPriority;
  return { message: removeExtraWhitespace(serviceAlert.text).trim(), priority };
};

export default parseServiceAlert;
