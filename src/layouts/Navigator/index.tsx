import React, { useContext } from "react";
import { createAppContainer } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";
import { ThemeContext } from "styled-components/native";
import SettingsNavigator from "./SettingsNavigator";
import DetailNavigator from "./DetailNavigator";
import NearbyScreen from "../../screens/NearbyScreen";
import { Theme } from "../../styles";
import { BackIcon } from "./styles";

function Navigator() {
  const theme: Theme = useContext(ThemeContext);
  const baseStackConfig = {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.background
      },
      headerTitleStyle: {
        color: theme.text
      },
      headerBackTitle: null,
      headerBackImage: <BackIcon />
    },
    mode: "modal",
    headerMode: "none"
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
}

export default Navigator;
