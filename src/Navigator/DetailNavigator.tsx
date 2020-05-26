import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components";

import DetailScreen from "../screens/Detail/DetailScreen";
import ServiceAlertsScreen from "../screens/Detail/ServiceAlertsScreen";
import ChangeStopScreen from "../screens/Detail/ChangeStopScreen";
import ChangeDirectionScreen from "../screens/Detail/ChangeDirectionScreen";
import { BackIcon, getBaseStackConfig } from "./config";
import { DetailStackParamList } from "../../types";

const Stack = createStackNavigator<DetailStackParamList>();

const DetailNavigator: React.FC = () => {
  const theme = useTheme();
  const baseStackConfig = getBaseStackConfig(theme);

  return (
    <Stack.Navigator {...baseStackConfig}>
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ChangeDirectionScreen"
        component={ChangeDirectionScreen}
        options={{
          headerTitle: "Change Direction"
        }}
      />
      <Stack.Screen
        name="ChangeStopScreen"
        component={ChangeStopScreen}
        options={{
          headerTitle: "Change Stop"
        }}
      />
      <Stack.Screen
        name="ServiceAlertsScreen"
        component={ServiceAlertsScreen}
        options={{
          headerTitle: "Service Alerts",
          headerTitleStyle: {
            color: theme.black
          },
          headerStyle: {
            backgroundColor: theme.yellow
          },
          headerBackImage: () => <BackIcon color="black" />
        }}
      />
    </Stack.Navigator>
  );
};

export default DetailNavigator;
