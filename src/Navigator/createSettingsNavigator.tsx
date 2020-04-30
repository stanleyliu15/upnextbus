import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SettingsScreen from "../screens/Settings/SettingsScreen";
import FilterRoutesScreen from "../screens/Settings/Preferences/ChangeFilterRoutesScreen";
import ChangeAgencyScreen from "../screens/Settings/Preferences/ChangeAgencyScreen";
import DistanceLimitScreen from "../screens/Settings/Preferences/ChangeDistanceLimitScreen";
import PredictionsLimitScreen from "../screens/Settings/Preferences/ChangePredictionsLimitScreen";
import RouteNameOptionScreen from "../screens/Settings/Preferences/ChangeRouteNameOptionScreen";
import ThemeScreen from "../screens/Settings/Preferences/ChangeThemeScreen";
import ChangeShowInactivePredictionsScreen from "../screens/Settings/Preferences/ChangeShowInactivePredictionsScreen";
import { Theme } from "../styles";
import { SettingsStackParamList } from "../../types";

const Stack = createStackNavigator<SettingsStackParamList>();

const createSettingsNavigator = (parentStackConfig, _theme: Theme) => {
  return (_props: any) => {
    return (
      <Stack.Navigator {...parentStackConfig} initialRouteName="SettingsScreen" headerMode="screen">
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ChangeAgencyScreen"
          component={ChangeAgencyScreen}
          options={{
            headerTitle: "Change Agency"
          }}
        />
        <Stack.Screen
          name="ChangeFilterRoutesScreen"
          component={FilterRoutesScreen}
          options={{
            headerTitle: "Configure Routes",
            headerRight: _props => <FilterRoutesScreen.HeaderRight />
          }}
        />
        <Stack.Screen
          name="ChangeDistanceLimitScreen"
          component={DistanceLimitScreen}
          options={{
            headerTitle: "Distance Limit"
          }}
        />
        <Stack.Screen
          name="ChangePredictionsLimitScreen"
          component={PredictionsLimitScreen}
          options={{
            headerTitle: "Predictions Limit"
          }}
        />
        <Stack.Screen
          name="ChangeRouteNameOptionScreen"
          component={RouteNameOptionScreen}
          options={{
            headerTitle: "Bus Naming"
          }}
        />
        <Stack.Screen
          name="ChangeThemeScreen"
          component={ThemeScreen}
          options={{
            headerTitle: "Theme"
          }}
        />
        <Stack.Screen
          name="ChangeShowInactivePredictionsScreen"
          component={ChangeShowInactivePredictionsScreen}
          options={{
            headerTitle: "Show Inactive Buses"
          }}
        />
      </Stack.Navigator>
    );
  };
};

export default createSettingsNavigator;
