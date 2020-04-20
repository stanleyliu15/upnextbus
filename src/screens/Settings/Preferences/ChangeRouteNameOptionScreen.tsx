import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";

import {
  setRouteNameOption,
  selectRouteNameOption,
  RouteNameOption
} from "../../../store/features/settings";
import { SafeArea, SelectItem } from "../../../components";
import { SaveButton } from "../settingStyles";
import { NavigationProps } from "../../../../types";

const ChangeRouteNameOptionScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const routeNameOption = useSelector(selectRouteNameOption);
  const [selectedRouteNameOption, setSelectedRouteNameOption] = useState(routeNameOption);
  const handleSave = useCallback(
    _event => {
      dispatch(setRouteNameOption(selectedRouteNameOption));
      navigation.goBack();
    },
    [dispatch, navigation, selectedRouteNameOption]
  );

  const keys = Object.keys(RouteNameOption);
  return (
    <SafeArea>
      <ScrollView>
        {keys.map((option, index) => {
          return (
            <SelectItem
              key={option}
              name={option}
              selected={RouteNameOption[option] === selectedRouteNameOption}
              onSelect={() => setSelectedRouteNameOption(RouteNameOption[option])}
              lastItem={index === keys.length - 1}
            />
          );
        })}
      </ScrollView>
      <SaveButton onPress={handleSave} />
    </SafeArea>
  );
};

export default ChangeRouteNameOptionScreen;
