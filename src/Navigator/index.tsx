import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";

import NearbyScreen from "../screens/NearbyScreen";
import SettingsNavigator from "./SettingsNavigator";
import DetailNavigator from "./DetailNavigator";
import { RootStackParamList } from "../../types";
import { getBaseStackConfig } from "./config";
import SetupScreen from "../screens/Setup/SetupScreen";

const Stack = createStackNavigator<RootStackParamList>();

const Navigator: React.FC = () => {
  const theme = useTheme();
  const baseStackConfig = getBaseStackConfig(theme);

  return (
    <NavigationContainer>
      <Stack.Navigator {...baseStackConfig} headerMode="none">
        <Stack.Screen name="Setup" component={SetupScreen} />
        <Stack.Screen name="Nearby" component={NearbyScreen} />
        <Stack.Screen name="Settings" component={SettingsNavigator} />
        <Stack.Screen name="Detail" component={DetailNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
