import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";

import { selectDistanceLimit, setMaxStopDistance } from "../../../store/features/settings";
import { SaveButton, SelectItem } from "../../../components/organisms/Settings";
import SafeArea from "../../../layouts/SafeArea";
import { NavigationProps } from "../../../../types";

const DISTANCE_LIMITS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export default function({ navigation }: NavigationProps) {
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
        {DISTANCE_LIMITS.map((limit, index) => (
          <SelectItem
            key={limit}
            name={`${limit} miles`}
            selected={limit === selectedDistanceLimit}
            onSelect={() => setSelectedDistanceLimit(limit)}
            lastItem={index === DISTANCE_LIMITS.length - 1}
          />
        ))}
      </ScrollView>
      <SaveButton onSave={handleSave} />
    </SafeArea>
  );
}
