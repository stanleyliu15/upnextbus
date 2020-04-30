import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import {
  setShowInactivePredictions,
  selectShowInactivePredictions
} from "../../../store/features/settings";
import { SafeArea, SelectItem } from "../../../components";
import { SaveButton } from "../settingStyles";
import { SettingsStackParamList, RootStackParamList } from "../../../../types";

const OPTIONS = ["Yes", "No"];

type ChangeShowInactivePredictionsScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<SettingsStackParamList, "ChangeShowInactivePredictionsScreen">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<SettingsStackParamList, "ChangeShowInactivePredictionsScreen">;
};

const ChangeShowInactivePredictionsScreen: React.FC<ChangeShowInactivePredictionsScreenProps> = ({
  navigation
}) => {
  const dispatch = useDispatch();
  const showInactivePredictions = useSelector(selectShowInactivePredictions);
  const [selectedOption, setSelectedOption] = useState(showInactivePredictions ? "Yes" : "No");
  const handleSave = useCallback(
    _event => {
      dispatch(setShowInactivePredictions(selectedOption === "Yes"));
      navigation.goBack();
    },
    [dispatch, navigation, selectedOption]
  );

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
