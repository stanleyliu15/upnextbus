import { registerRootComponent } from "expo";
import React from "react";
import { View, Text } from "react-native";

export function App() {
  return (
    <View>
      <Text>App</Text>
    </View>
  );
}

// @ts-ignore
export default registerRootComponent(App);
