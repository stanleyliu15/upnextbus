import React from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";
import { capitalize } from "lodash";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { selectThemeColor, setThemeColor } from "../../../store/features/settings";
import { SafeArea, SelectItem } from "../../../components";
import { ThemeColor } from "../../../styles";
import { SettingsStackParamList, RootStackParamList } from "../../../../types";
import { useDispatch } from "../../../store";

type ChangeThemeScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<SettingsStackParamList, "ChangeThemeScreen">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<SettingsStackParamList, "ChangeThemeScreen">;
};

const ChangeThemeScreen: React.FC<ChangeThemeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const themeColor = useSelector(selectThemeColor);
  const themeColors = Object.values(ThemeColor);

  return (
    <SafeArea>
      <ScrollView>
        {themeColors.map((tColor, index) => (
          <SelectItem
            key={tColor}
            title={capitalize(tColor)}
            selected={tColor === themeColor}
            onPress={() => {
              dispatch(setThemeColor(tColor));
              navigation.goBack();
            }}
            showBottomBorder={index !== themeColors.length - 1}
          />
        ))}
      </ScrollView>
    </SafeArea>
  );
};

export default ChangeThemeScreen;
