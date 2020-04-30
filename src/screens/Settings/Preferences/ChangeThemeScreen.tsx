import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";
import { capitalize } from "lodash";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { selectThemeColor, setThemeColor } from "../../../store/features/settings";
import { SafeArea, SelectItem } from "../../../components";
import { SaveButton } from "../settingStyles";
import { ThemeColor } from "../../../styles";
import { SettingsStackParamList, RootStackParamList } from "../../../../types";

type ChangeThemeScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<SettingsStackParamList, "ChangeThemeScreen">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<SettingsStackParamList, "ChangeThemeScreen">;
};

const ChangeThemeScreen: React.FC<ChangeThemeScreenProps> = _props => {
  const dispatch = useDispatch();
  const themeColor = useSelector(selectThemeColor);
  const [selectedThemeColor, setSelectedThemeColor] = useState(themeColor);
  const handleSave = useCallback(_event => dispatch(setThemeColor(selectedThemeColor)), [
    dispatch,
    selectedThemeColor
  ]);
  const themeColors = Object.values(ThemeColor);

  return (
    <SafeArea>
      <ScrollView>
        {themeColors.map((themeColor, index) => (
          <SelectItem
            key={themeColor}
            name={capitalize(themeColor)}
            selected={themeColor === selectedThemeColor}
            onSelect={() => setSelectedThemeColor(themeColor)}
            lastItem={index === themeColors.length - 1}
          />
        ))}
      </ScrollView>
      <SaveButton onPress={handleSave} />
    </SafeArea>
  );
};

export default ChangeThemeScreen;
