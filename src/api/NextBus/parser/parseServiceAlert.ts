const parseServiceAlert = (serviceAlert: NextBusAPI.ServiceAlert): NextBus.ServiceAlert => {
  const priority = serviceAlert.priority.toUpperCase() as NextBus.ServiceAlertPriority;
  return { message: serviceAlert.text, priority };
};

export default parseServiceAlert;
