import { createStackNavigator } from "react-navigation-stack";

import SettingsScreen from "../../screens/Settings/SettingsScreen";
import FilterRoutesScreen from "../../screens/Settings/Preferences/ChangeFilterRoutesScreen";
import ChangeAgencyScreen from "../../screens/Settings/Preferences/ChangeAgencyScreen";
import DistanceLimitScreen from "../../screens/Settings/Preferences/ChangeDistanceLimitScreen";
import PredictionsLimitScreen from "../../screens/Settings/Preferences/ChangePredictionsLimitScreen";
import RouteNameOptionScreen from "../../screens/Settings/Preferences/ChangeRouteNameOptionScreen";
import ThemeScreen from "../../screens/Settings/Preferences/ChangeThemeScreen";
import ChangeShowInactivePredictionsScreen from "../../screens/Settings/Preferences/ChangeShowInactivePredictionsScreen";

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
    ChangeFilterRoutesScreen: {
      screen: FilterRoutesScreen,
      navigationOptions: {
        headerTitle: "Configure Routes"
      }
    },
    ChangeDistanceLimitScreen: {
      screen: DistanceLimitScreen,
      navigationOptions: {
        headerTitle: "Distance Limit"
      }
    },
    ChangePredictionsLimitScreen: {
      screen: PredictionsLimitScreen,
      navigationOptions: {
        headerTitle: "Predictions Limit"
      }
    },
    ChangeRouteNameOptionScreen: {
      screen: RouteNameOptionScreen,
      navigationOptions: {
        headerTitle: "Bus Naming"
      }
    },
    ChangeThemeScreen: {
      screen: ThemeScreen,
      navigationOptions: {
        headerTitle: "Theme"
      }
    },
    ChangeShowInactivePredictionsScreen: {
      screen: ChangeShowInactivePredictionsScreen,
      navigationOptions: {
        headerTitle: "Show Inactive Buses"
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
