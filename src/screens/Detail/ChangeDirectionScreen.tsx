import React from "react";

import { SafeArea, SelectItem } from "../../components";
import { NavigationProps } from "../../../types";

const ChangeDirectionScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const direction = navigation.getParam("direction");
  const directions = navigation.getParam("directions");
  const directionIds = navigation.getParam("directionIds");
  const predictionsDirectionName = navigation.getParam("predictionsDirectionName");
  const onDirectionPress = navigation.getParam("onDirectionPress");

  return (
    <SafeArea>
      {directions.map((directionToSelect, index) => (
        <SelectItem
          key={directionToSelect.id}
          name={
            directionIds.includes(directionToSelect.id)
              ? predictionsDirectionName
              : directionToSelect.name
          }
          selected={directionToSelect.id === direction.id}
          onSelect={event => {
            onDirectionPress(directionToSelect)(event);
            navigation.goBack();
          }}
          fixedHeight={false}
          lastItem={index === directions.length - 1}
        />
      ))}
    </SafeArea>
  );
};

export default ChangeDirectionScreen;
