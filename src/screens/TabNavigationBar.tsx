import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { FontAwesome5 } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import {
  BottomTabBarOptions,
  TabBarIconProps
} from "react-navigation-tabs/lib/typescript/src/types";
import { Theme } from "../styles/types";

import NearbyScreen from "./NearbyScreen";

const routeConfigs = {
  NearbyScreen
};

const IconMap = {
  NearbyScreen: "location-arrow"
};

function createBottomNavigatorConfigs(theme: Theme) {
  const tabBarOptions: BottomTabBarOptions = {
    showLabel: false,
    activeBackgroundColor: theme.palette.primaryLight,
    inactiveBackgroundColor: theme.palette.white,
    activeTintColor: theme.palette.primaryDark,
    inactiveTintColor: theme.palette.disabled
  };

  const defaultNavigationOptions = ({ navigation }) => {
    return {
      tabBarIcon: ({ tintColor }: TabBarIconProps) => {
        const { routeName } = navigation.state;
        const iconName = IconMap[routeName];

        return <FontAwesome5 name={iconName} size={25} color={tintColor} />;
      }
    };
  };

  return {
    defaultNavigationOptions,
    tabBarOptions,
    initialRouteName: "NearbyScreen"
  };
}

function TabNavigationBar() {
  const theme: Theme = useContext(ThemeContext);
  const TabNavigator = createBottomTabNavigator(routeConfigs, createBottomNavigatorConfigs(theme));
  const AppContainer = createAppContainer(TabNavigator);

  return <AppContainer />;
}

export default TabNavigationBar;
