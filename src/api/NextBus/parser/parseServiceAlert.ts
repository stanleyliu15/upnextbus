import { removeExtraWhitespace } from "../../../utils";
import { NextBus, NextBusSource } from "../../../../types";

const parseServiceAlert = (serviceAlert: NextBusSource.ServiceAlert): NextBus.ServiceAlert => {
  const priority = serviceAlert.priority.toUpperCase() as NextBus.ServiceAlertPriority;
  return { message: removeExtraWhitespace(serviceAlert.text).trim(), priority };
};

export default parseServiceAlert;
