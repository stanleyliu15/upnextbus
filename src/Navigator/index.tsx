import React, { useContext } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { ThemeContext } from "styled-components/native";

import SettingsNavigator from "./SettingsNavigator";
import DetailNavigator from "./DetailNavigator";
import NearbyScreen from "../screens/NearbyScreen";
import { BackIcon } from "./styles";

const Navigator: React.FC = _props => {
  const theme = useContext(ThemeContext);

  const baseStackConfig = {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.background
      },
      headerTitleStyle: {
        color: theme.text
      },
      headerBackTitle: null,
      headerBackImage: _props => <BackIcon color="text" />
    },
    mode: "modal" as "modal",
    headerMode: "none" as "none"
  };

  const routeConfigs = {
    NearbyScreen: {
      screen: NearbyScreen
    },
    Detail: DetailNavigator(baseStackConfig, theme),
    SettingsScreen: SettingsNavigator(baseStackConfig, theme)
  };

  const stackConfig = {
    ...baseStackConfig,
    initialRouteName: "NearbyScreen"
  };

  const AppNavigator = createStackNavigator(routeConfigs, stackConfig);
  const AppContainer = createAppContainer(AppNavigator);

  return <AppContainer />;
};

export default Navigator;
