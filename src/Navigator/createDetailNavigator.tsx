import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DetailScreen from "../screens/Detail/DetailScreen";
import ServiceAlertsScreen from "../screens/Detail/ServiceAlertsScreen";
import ChangeStopScreen from "../screens/Detail/ChangeStopScreen";
import ChangeDirectionScreen from "../screens/Detail/ChangeDirectionScreen";
import { BackIcon } from "./styles";
import { Theme } from "../styles";
import { DetailStackParamList } from "../../types";

const Stack = createStackNavigator<DetailStackParamList>();

const createDetailNavigator = (parentStackConfig, theme: Theme) => {
  return (_props: any) => {
    return (
      <Stack.Navigator {...parentStackConfig} initialRouteName="DetailScreen" headerMode="screen">
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
              ...parentStackConfig.screenOptions.headerTitleStyle,
              color: theme.black
            },
            headerStyle: {
              ...parentStackConfig.screenOptions.headerStyle,
              backgroundColor: theme.yellow
            },
            headerBackImage: _props => <BackIcon color="black" />
          }}
        />
      </Stack.Navigator>
    );
  };
};
export default createDetailNavigator;
