import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";
import capitalize from "lodash/capitalize";

import { selectThemeColor, setThemeColor } from "../../../store/features/settings";
import { SelectItem, SaveButton } from "../../../components/organisms/Settings";
import { ThemeColor } from "../../../styles";
import SafeArea from "../../../layouts/SafeArea";

export default function() {
  const dispatch = useDispatch();
  const themeColor = useSelector(selectThemeColor);
  const [selectedThemeColor, setSelectedThemeColor] = useState(themeColor);
  const handleSave = _event => dispatch(setThemeColor(selectedThemeColor));
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
      <SaveButton onSave={handleSave} />
    </SafeArea>
  );
}
