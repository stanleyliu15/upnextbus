import * as nextBusActions from "./features/nextbus/actions";
import * as settingsActions from "./features/settings/actions";

const rootAction = {
  nextBus: nextBusActions,
  settings: settingsActions
};

export default rootAction;
