import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SettingsScreen from "../screens/Settings/SettingsScreen";
import ChangeFilterRoutesScreen from "../screens/Settings/Preferences/ChangeFilterRoutesScreen";
import ChangeAgencyScreen from "../screens/Settings/Preferences/ChangeAgencyScreen";
import ChangeDistanceLimitScreen from "../screens/Settings/Preferences/ChangeDistanceLimitScreen";
import ChangePredictionsLimitScreen from "../screens/Settings/Preferences/ChangePredictionsLimitScreen";
import ChangeThemeScreen from "../screens/Settings/Preferences/ChangeThemeScreen";
import ChangeFavoriteStopLabelsScreen from "../screens/Settings/Preferences/ChangeFavoriteStopLabelsScreen";
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
          component={ChangeFilterRoutesScreen}
          options={{
            headerTitle: "Configure Routes",
            headerRight: _props => <ChangeFilterRoutesScreen.HeaderRight />
          }}
        />
        <Stack.Screen
          name="ChangeDistanceLimitScreen"
          component={ChangeDistanceLimitScreen}
          options={{
            headerTitle: "Distance Limit"
          }}
        />
        <Stack.Screen
          name="ChangePredictionsLimitScreen"
          component={ChangePredictionsLimitScreen}
          options={{
            headerTitle: "Predictions Limit"
          }}
        />
        <Stack.Screen
          name="ChangeThemeScreen"
          component={ChangeThemeScreen}
          options={{
            headerTitle: "Theme"
          }}
        />
        <Stack.Screen
          name="ChangeFavoriteStopLabelsScreen"
          component={ChangeFavoriteStopLabelsScreen}
          options={{
            headerTitle: "Favorites"
          }}
        />
      </Stack.Navigator>
    );
  };
};

export default createSettingsNavigator;
