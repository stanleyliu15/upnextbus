import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";

import {
  setShowInactivePredictions,
  selectShowInactivePredictions
} from "../../../store/features/settings";
import { SafeArea, SelectItem } from "../../../components";
import { SaveButton } from "../settingStyles";
import { NavigationProps } from "../../../../types";

const OPTIONS = ["Yes", "No"];

const ChangeShowInactivePredictionsScreen: React.FC<NavigationProps> = ({ navigation }) => {
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
      <SaveButton onPress={handleSave} />
    </SafeArea>
  );
};

export default ChangeShowInactivePredictionsScreen;
