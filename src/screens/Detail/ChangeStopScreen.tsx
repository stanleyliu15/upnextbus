import React from "react";
import { ScrollView } from "react-native";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { SafeArea, SelectItem } from "../../components";
import { DetailStackParamList, RootStackParamList } from "../../../types";

type ChangeStopScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<DetailStackParamList, "ChangeStopScreen">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<DetailStackParamList, "ChangeStopScreen">;
};

const ChangeStopScreen: React.FC<ChangeStopScreenProps> = ({ navigation, route }) => {
  const { stop, stops } = route.params;

  return (
    <SafeArea>
      <ScrollView>
        {stops.map((stopToSelect, index) => {
          return (
            <SelectItem
              key={stopToSelect.id}
              name={stopToSelect.name}
              selected={stopToSelect.id === stop.id}
              onSelect={_event => {
                navigation.navigate("DetailScreen", { stop: stopToSelect });
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
