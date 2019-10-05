import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";

import {
  selectPredictionListLimit,
  setPredictionListLimit
} from "../../../store/features/settings";
import { SelectItem, SaveButton } from "../../../components/organisms/Settings";
import SafeArea from "../../../layouts/SafeArea";
import { NavigationProps } from "../../../../types";

const PREDICTION_LIST_LIMITS = [1, 2, 3, 4, 5];

export default function({ navigation }: NavigationProps) {
  const dispatch = useDispatch();
  const predictionListLimit = useSelector(selectPredictionListLimit);
  const [selectedListLimit, setSelectedListLimit] = useState(predictionListLimit);
  const handleSave = () => {
    dispatch(setPredictionListLimit(selectedListLimit));
    navigation.goBack();
  };

  return (
    <SafeArea>
      <ScrollView>
        {PREDICTION_LIST_LIMITS.map(limit => (
          <SelectItem
            key={limit}
            name={limit}
            selected={limit === selectedListLimit}
            onSelect={() => setSelectedListLimit(limit)}
          />
        ))}
      </ScrollView>
      <SaveButton onSave={handleSave} />
    </SafeArea>
  );
}
