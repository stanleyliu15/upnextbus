import React from "react";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { range } from "lodash";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { SafeArea, SelectItem } from "../../../components";
import { selectDistanceLimit, setMaxStopDistance } from "../../../store/features/settings";
import { SettingsStackParamList, RootStackParamList } from "../../../../types";
import { useDispatch } from "../../../store";

const DISTANCE_RANGE = range(0.5, 5.5, 0.5);

type ChangeDistanceLimitScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<SettingsStackParamList, "ChangeDistanceLimitScreen">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<SettingsStackParamList, "ChangeDistanceLimitScreen">;
};

const ChangeDistanceLimitScreen: React.FC<ChangeDistanceLimitScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const distanceLimit = useSelector(selectDistanceLimit);

  return (
    <SafeArea>
      <ScrollView>
        {DISTANCE_RANGE.map((limit, index) => (
          <SelectItem
            key={limit}
            title={`${limit} miles`}
            selected={limit === distanceLimit}
            onPress={() => {
              dispatch(setMaxStopDistance(limit));
              navigation.goBack();
            }}
            showBottomBorder={index !== DISTANCE_RANGE.length - 1}
          />
        ))}
      </ScrollView>
    </SafeArea>
  );
};

export default ChangeDistanceLimitScreen;
