import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";

import {
  setRouteNameOption,
  selectRouteNameOption,
  RouteNameOption
} from "../../../store/features/settings";
import { SelectItem, SaveButton } from "../../../components/organisms/Settings";
import SafeArea from "../../../layouts/SafeArea";
import { NavigationProps } from "../../../../types";

export default function({ navigation }: NavigationProps) {
  const dispatch = useDispatch();
  const routeNameOption = useSelector(selectRouteNameOption);
  const [selectedRouteNameOption, setSelectedRouteNameOption] = useState(routeNameOption);
  const handleSave = _event => {
    dispatch(setRouteNameOption(selectedRouteNameOption));
    navigation.goBack();
  };

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
      <SaveButton onSave={handleSave} />
    </SafeArea>
  );
}
