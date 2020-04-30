import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";
import { range } from "lodash";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { SafeArea, SelectItem } from "../../../components";
import { selectDistanceLimit, setMaxStopDistance } from "../../../store/features/settings";
import { SaveButton } from "../settingStyles";
import { SettingsStackParamList, RootStackParamList } from "../../../../types";

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
  const [selectedDistanceLimit, setSelectedDistanceLimit] = useState(distanceLimit);
  const handleSave = useCallback(
    _event => {
      dispatch(setMaxStopDistance(selectedDistanceLimit));
      navigation.goBack();
    },
    [dispatch, navigation, selectedDistanceLimit]
  );

  return (
    <SafeArea>
      <ScrollView>
        {DISTANCE_RANGE.map((limit, index) => (
          <SelectItem
            key={limit}
            name={`${limit} miles`}
            selected={limit === selectedDistanceLimit}
            onSelect={() => setSelectedDistanceLimit(limit)}
            lastItem={index === DISTANCE_RANGE.length - 1}
          />
        ))}
      </ScrollView>
      <SaveButton onPress={handleSave} />
    </SafeArea>
  );
};

export default ChangeDistanceLimitScreen;
