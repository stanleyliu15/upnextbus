import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import {
  BottomTabBarOptions,
  TabBarIconProps
} from "react-navigation-tabs/lib/typescript/src/types";

import { Theme, space } from "../../styles";
import NearbyScreen from "../../screens/NearbyScreen";
import SettingsNavigator from "./SettingsNavigator";

function configureBottomNavigatorConfigs(theme: Theme) {
  const tabBarOptions: BottomTabBarOptions = {
    showLabel: false,
    activeBackgroundColor: theme.background,
    inactiveBackgroundColor: theme.background,
    activeTintColor: theme.primary,
    inactiveTintColor: theme.disabled
  };

  const defaultNavigationOptions = ({ navigation }) => {
    return {
      tabBarIcon: ({ tintColor }: TabBarIconProps) => {
        const { routeName } = navigation.state;
        if (routeName === "Nearby") {
          return <MaterialCommunityIcons name="near-me" size={25} color={tintColor} />;
        }

        if (routeName === "Settings") {
          return <Entypo name="cog" size={25} color={tintColor} />;
        }

        return null;
      }
    };
  };

  return {
    initialRouteName: "Settings",
    tabBarOptions,
    defaultNavigationOptions
  };
}

const BackIcon = styled(Entypo)`
  margin: 0 ${space.large};
`;

function TabNavigationBar() {
  const theme: Theme = useContext(ThemeContext);
  const defaultNavigationOptions = {
    headerStyle: {
      backgroundColor: theme.background,
      bottomBorderWidth: 0
    },
    headerTitleStyle: {
      color: theme.text
    },
    headerBackTitle: null,
    headerBackImage: <BackIcon name="chevron-thin-left" size={25} color={theme.light} />
  };

  const routeConfigs = {
    Nearby: NearbyScreen,
    Settings: SettingsNavigator(defaultNavigationOptions)
  };
  const TabNavigator = createBottomTabNavigator(
    routeConfigs,
    configureBottomNavigatorConfigs(theme)
  );
  const AppContainer = createAppContainer(TabNavigator);

  return <AppContainer />;
}

export default TabNavigationBar;
