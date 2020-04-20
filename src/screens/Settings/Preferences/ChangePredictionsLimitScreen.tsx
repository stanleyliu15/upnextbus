import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native";
import { range } from "lodash";

import {
  selectPredictionListLimit,
  setPredictionListLimit
} from "../../../store/features/settings";
import { SafeArea, SelectItem } from "../../../components";
import { SaveButton } from "../settingStyles";
import { NavigationProps } from "../../../../types";

const PREDICTION_LIST_LIMIT_RANGE = range(1, 6);

const ChangePredictionsLimitScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const predictionListLimit = useSelector(selectPredictionListLimit);
  const [selectedListLimit, setSelectedListLimit] = useState(predictionListLimit);
  const handleSave = useCallback(
    _event => {
      dispatch(setPredictionListLimit(selectedListLimit));
      navigation.goBack();
    },
    [dispatch, navigation, selectedListLimit]
  );

  return (
    <SafeArea>
      <ScrollView>
        {PREDICTION_LIST_LIMIT_RANGE.map((limit, index) => (
          <SelectItem
            key={limit}
            name={limit.toString()}
            selected={limit === selectedListLimit}
            onSelect={() => setSelectedListLimit(limit)}
            lastItem={index === PREDICTION_LIST_LIMIT_RANGE.length - 1}
          />
        ))}
      </ScrollView>
      <SaveButton onPress={handleSave} />
    </SafeArea>
  );
};

export default ChangePredictionsLimitScreen;
