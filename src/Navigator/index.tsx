import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";

import createSettingsNavigator from "./createSettingsNavigator";
import createDetailNavigator from "./createDetailNavigator";
import NearbyScreen from "../screens/NearbyScreen";
import { BackIcon } from "./styles";
import { RootStackParamList } from "../../types";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = _props => {
  const theme = useTheme();
  const baseStackConfig = {
    screenOptions: {
      headerStyle: {
        backgroundColor: theme.background
      },
      headerTitleStyle: {
        color: theme.text
      },
      headerBackTitleVisible: false,
      headerBackImage: _props => <BackIcon color="text" />
    },
    mode: "modal" as "modal",
    headerMode: "none" as "none"
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Nearby" {...baseStackConfig}>
        <Stack.Screen name="Nearby" component={NearbyScreen} />
        <Stack.Screen name="Settings" component={createSettingsNavigator(baseStackConfig, theme)} />
        <Stack.Screen name="Detail" component={createDetailNavigator(baseStackConfig, theme)} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
