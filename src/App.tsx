import { registerRootComponent } from "expo";
import React from "react";
import { View, Text } from "react-native";

export function App(): JSX.Element {
  return (
    <View>
      <Text>App</Text>
    </View>
  );
}

export default registerRootComponent(App);
