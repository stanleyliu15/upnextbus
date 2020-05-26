import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";

import SettingsScreen from "../screens/Settings/SettingsScreen";
import ChangeFilterRoutesScreen, {
  ChangeFilterRoutesHeaderRight
} from "../screens/Settings/Preferences/ChangeFilterRoutesScreen";
import ChangeAgencyScreen from "../screens/Settings/Preferences/ChangeAgencyScreen";
import ChangeDistanceLimitScreen from "../screens/Settings/Preferences/ChangeDistanceLimitScreen";
import ChangePredictionsLimitScreen from "../screens/Settings/Preferences/ChangePredictionsLimitScreen";
import ChangeThemeScreen from "../screens/Settings/Preferences/ChangeThemeScreen";
import ChangeFavoriteStopLabelsScreen from "../screens/Settings/Preferences/ChangeFavoriteStopLabelsScreen";
import { SettingsStackParamList } from "../../types";
import { getBaseStackConfig } from "./config";

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsNavigator: React.FC = () => {
  const theme = useTheme();
  const baseStackConfig = getBaseStackConfig(theme);

  return (
    <Stack.Navigator {...baseStackConfig}>
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
          headerRight: () => <ChangeFilterRoutesHeaderRight />
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

export default SettingsNavigator;
