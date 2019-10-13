import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator, createTabNavigator } from "react-navigation-tabs";
import {
  BottomTabBarOptions,
  TabBarIconProps
} from "react-navigation-tabs/lib/typescript/src/types";
import { createStackNavigator } from "react-navigation-stack";

import { Theme, space } from "../../styles";
import NearbyScreen from "../../screens/NearbyScreen";
import DetailScreen from "../../screens/DetailScreen";
import SettingsNavigator from "./SettingsNavigator";

// TODO: clean things up moving to one screen

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
        if (routeName === "NearbyScreen") {
          return <MaterialCommunityIcons name="near-me" size={25} color={tintColor} />;
        }

        if (routeName === "SettingsScreen") {
          return <Entypo name="cog" size={25} color={tintColor} />;
        }

        return null;
      }
    };
  };

  return {
    initialRouteName: "NearbyScreen",
    tabBarOptions,
    defaultNavigationOptions,
    mode: "modal",
    headerMode: "none"
  };
}

const BackIcon = styled(Entypo)`
  margin: 0 ${space.large};
`;

function TabNavigationBar() {
  const theme: Theme = useContext(ThemeContext);
  const defaultNavigationOptions = {
    headerStyle: {
      backgroundColor: theme.backgroundLight,
      bottomBorderWidth: 0,
      borderBottomWidth: 0
    },
    headerTitleStyle: {
      color: theme.text
    },
    headerBackTitle: null,
    headerBackImage: <BackIcon name="chevron-thin-left" size={25} color={theme.light} />
  };

  const routeConfigs = {
    NearbyScreen,
    DetailScreen,
    SettingsScreen: SettingsNavigator(defaultNavigationOptions)
  };
  const TabNavigator = createBottomTabNavigator(
    routeConfigs,
    configureBottomNavigatorConfigs(theme)
  );
  const AppContainer = createAppContainer(TabNavigator);

  return <AppContainer />;
}

export default TabNavigationBar;
