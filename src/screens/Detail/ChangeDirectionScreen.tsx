import React from "react";
import SafeArea from "../../layouts/SafeArea";
import { SelectItem } from "../../components/organisms/Settings";

const ChangeDirectionScreen = ({ navigation }) => {
  const direction = navigation.getParam("direction");
  const directions = navigation.getParam("directions");
  const directionIds = navigation.getParam("directionIds");
  const predictionsDirectionName = navigation.getParam("predictionsDirectionName");
  const onDirectionPress = navigation.getParam("onDirectionPress");

  return (
    <SafeArea>
      {directions.map((directionToSelect, index) => {
        let directionName;
        if (directionIds.includes(directionToSelect.id)) {
          // eslint-disable-next-line prefer-destructuring
          directionName = predictionsDirectionName;
        } else {
          directionName = directionToSelect.name;
        }

        return (
          <SelectItem
            key={directionToSelect.id}
            name={directionName}
            selected={directionToSelect.id === direction.id}
            onSelect={event => {
              onDirectionPress(directionToSelect)(event);
              navigation.goBack();
            }}
            fixedHeight={false}
            lastItem={index === directions.length - 1}
          />
        );
      })}
    </SafeArea>
  );
};

export default ChangeDirectionScreen;
