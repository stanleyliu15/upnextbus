import React from "react";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import { SafeArea, SelectItem } from "../../components";
import { DetailStackParamList, RootStackParamList } from "../../../types";
import { selectDistanceLimit } from "../../store/features/settings";
import { getNearestStop } from "../../services/nextbus-service";

type ChangeDirectionScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<DetailStackParamList, "ChangeDirectionScreen">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<DetailStackParamList, "ChangeDirectionScreen">;
};

const ChangeDirectionScreen: React.FC<ChangeDirectionScreenProps> = ({ navigation, route }) => {
  const { direction, directions, directionIds, predictionsDirectionName, location } = route.params;
  const distanceLimit = useSelector(selectDistanceLimit);

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
          onSelect={_event => {
            if (!location) return;

            const nearestStop = getNearestStop(directionToSelect.stops, location, distanceLimit);
            navigation.navigate("DetailScreen", {
              direction: directionToSelect,
              stop: nearestStop
            });
          }}
          fixedHeight={false}
          lastItem={index === directions.length - 1}
        />
      ))}
    </SafeArea>
  );
};

export default ChangeDirectionScreen;
