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

export default function({ navigation }: NavigationProps) {
  const dispatch = useDispatch();
  const routeNameOption = useSelector(selectRouteNameOption);
  const [selectedRouteNameOption, setSelectedRouteNameOption] = useState(routeNameOption);
  const handleSave = () => {
    dispatch(setRouteNameOption(selectedRouteNameOption));
    navigation.goBack();
  };

  return (
    <SafeArea>
      <ScrollView>
        {Object.keys(RouteNameOption).map(option => {
          return (
            <SelectItem
              key={option}
              name={option}
              selected={RouteNameOption[option] === selectedRouteNameOption}
              onSelect={() => setSelectedRouteNameOption(RouteNameOption[option])}
            />
          );
        })}
      </ScrollView>
      <SaveButton onSave={handleSave} />
    </SafeArea>
  );
}
