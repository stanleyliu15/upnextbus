import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";
import { capitalize } from "lodash";

import { selectThemeColor, setThemeColor } from "../../../store/features/settings";
import { SafeArea, SelectItem } from "../../../components";
import { SaveButton } from "../settingStyles";
import { ThemeColor } from "../../../styles";

const ChangeThemeScreen: React.FC = _props => {
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
