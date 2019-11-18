import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";

import {
  setShowInactivePredictions,
  selectShowInactivePredictions
} from "../../../store/features/settings";
import { SelectItem, SaveButton } from "../../../components/organisms/Settings";
import SafeArea from "../../../layouts/SafeArea";

const OPTIONS = ["Yes", "No"];

export default function({ navigation }) {
  const dispatch = useDispatch();
  const showInactivePredictions = useSelector(selectShowInactivePredictions);

  const [selectedOption, setSelectedOption] = useState(showInactivePredictions ? "Yes" : "No");
  const handleSave = _event => {
    dispatch(setShowInactivePredictions(selectedOption === "Yes"));
    navigation.goBack();
  };

  return (
    <SafeArea>
      <ScrollView>
        {OPTIONS.map((option, index) => (
          <SelectItem
            key={option}
            name={option}
            selected={option === selectedOption}
            onSelect={() => setSelectedOption(option)}
            lastItem={index === OPTIONS.length - 1}
          />
        ))}
      </ScrollView>
      <SaveButton onSave={handleSave} />
    </SafeArea>
  );
}
