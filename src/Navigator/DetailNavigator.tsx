import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import DetailScreen from "../screens/Detail/DetailScreen";
import ServiceAlertsScreen from "../screens/Detail/ServiceAlertsScreen";
import ChangeStopScreen from "../screens/Detail/ChangeStopScreen";
import ChangeDirectionScreen from "../screens/Detail/ChangeDirectionScreen";
import { BackIcon } from "./styles";
import { Theme } from "../styles";

const DetailNavigator = (parentStackConfig, theme: Theme) => {
  const routeConfigs = {
    DetailScreen: {
      screen: DetailScreen,
      navigationOptions: {
        header: null
      }
    },
    ChangeDirectionScreen: {
      screen: ChangeDirectionScreen,
      navigationOptions: {
        headerTitle: "Change Direction"
      }
    },
    ChangeStopScreen: {
      screen: ChangeStopScreen,
      navigationOptions: {
        headerTitle: "Change Stop"
      }
    },
    ServiceAlertsScreen: {
      screen: ServiceAlertsScreen,
      navigationOptions: {
        headerTitle: "Service Alerts",
        headerTitleStyle: {
          ...parentStackConfig.defaultNavigationOptions.headerTitleStyle,
          color: theme.black
        },
        headerStyle: {
          ...parentStackConfig.defaultNavigationOptions.headerStyle,
          backgroundColor: theme.yellow
        },
        headerBackImage: _props => <BackIcon color={theme.black} />
      }
    }
  };

  const stackConfig = {
    ...parentStackConfig,
    initialRouteName: "DetailScreen",
    headerMode: "screen"
  };

  return createStackNavigator(routeConfigs, stackConfig);
};

export default DetailNavigator;
