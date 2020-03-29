import React from "react";
import { ScrollView } from "react-native";

import { SafeArea, SelectItem } from "../../components";
import { NavigationProps } from "../../../types";

const ChangeStopScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const stop = navigation.getParam("stop");
  const stops = navigation.getParam("stops");
  const onStopPress = navigation.getParam("onStopPress");

  return (
    <SafeArea>
      <ScrollView>
        {stops.map((stopToSelect, index) => {
          return (
            <SelectItem
              key={stopToSelect.id}
              name={stopToSelect.name}
              selected={stopToSelect.id === stop.id}
              onSelect={event => {
                onStopPress(stopToSelect)(event);
                navigation.goBack();
              }}
              fixedHeight={false}
              lastItem={index === stops.length - 1}
            />
          );
        })}
      </ScrollView>
    </SafeArea>
  );
};

export default ChangeStopScreen;
