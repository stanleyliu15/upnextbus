import { createStackNavigator } from "react-navigation-stack";

import SettingsScreen from "../../screens/Settings/SettingsScreen";
import FilterRoutesScreen from "../../screens/Settings/Preferences/FilterRoutesScreen";
import ChangeAgencyScreen from "../../screens/Settings/Preferences/ChangeAgencyScreen";
import DistanceLimitScreen from "../../screens/Settings/Preferences/DistanceLimitScreen";
import PredictionsLimitScreen from "../../screens/Settings/Preferences/PredictionsLimitScreen";
import RouteNameOptionScreen from "../../screens/Settings/Preferences/RouteNameOptionScreen";
import ThemeScreen from "../../screens/Settings/Theme/ThemeScreen";

export default (parentStackConfig, theme) => {
  const routeConfigs = {
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        header: null
      }
    },
    ChangeAgencyScreen: {
      screen: ChangeAgencyScreen,
      navigationOptions: {
        headerTitle: "Change Agency"
      }
    },
    FilterRoutesScreen: {
      screen: FilterRoutesScreen,
      navigationOptions: {
        headerTitle: "Configure Routes"
      }
    },
    DistanceLimitScreen: {
      screen: DistanceLimitScreen,
      navigationOptions: {
        headerTitle: "Distance Limit"
      }
    },
    PredictionsLimitScreen: {
      screen: PredictionsLimitScreen,
      navigationOptions: {
        headerTitle: "Predictions Limit"
      }
    },
    RouteNameOptionScreen: {
      screen: RouteNameOptionScreen,
      navigationOptions: {
        headerTitle: "Route Name Option"
      }
    },
    ThemeScreen: {
      screen: ThemeScreen,
      navigationOptions: {
        headerTitle: "Theme"
      }
    }
  };

  const stackConfig = {
    ...parentStackConfig,
    initialRouteName: "SettingsScreen",
    headerMode: "screen"
  };

  return createStackNavigator(routeConfigs, stackConfig);
};
