import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";
import { range } from "lodash";

import { SafeArea, SelectItem } from "../../../components";
import { selectDistanceLimit, setMaxStopDistance } from "../../../store/features/settings";
import { SaveButton } from "../settingStyles";
import { NavigationProps } from "../../../../types";

const DISTANCE_RANGE = range(0.5, 5.5, 0.5);

const ChangeDistanceLimitScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const distanceLimit = useSelector(selectDistanceLimit);
  const [selectedDistanceLimit, setSelectedDistanceLimit] = useState(distanceLimit);
  const handleSave = _event => {
    dispatch(setMaxStopDistance(selectedDistanceLimit));
    navigation.goBack();
  };

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
