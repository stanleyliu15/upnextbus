import React from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";
import { range } from "lodash";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import {
  selectPredictionListLimit,
  setPredictionListLimit
} from "../../../store/features/settings";
import { SafeArea, SelectItem } from "../../../components";
import { SettingsStackParamList, RootStackParamList } from "../../../../types";
import { useDispatch } from "../../../store";

const PREDICTION_LIST_LIMIT_RANGE = range(1, 6);

type ChangePredictionsLimitScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<SettingsStackParamList, "ChangePredictionsLimitScreen">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<SettingsStackParamList, "ChangePredictionsLimitScreen">;
};

const ChangePredictionsLimitScreen: React.FC<ChangePredictionsLimitScreenProps> = ({
  navigation
}) => {
  const dispatch = useDispatch();
  const predictionListLimit = useSelector(selectPredictionListLimit);

  return (
    <SafeArea>
      <ScrollView>
        {PREDICTION_LIST_LIMIT_RANGE.map((limit, index) => (
          <SelectItem
            key={limit}
            title={limit.toString()}
            selected={limit === predictionListLimit}
            onPress={() => {
              dispatch(setPredictionListLimit(limit));
              navigation.goBack();
            }}
            showBottomBorder={index !== PREDICTION_LIST_LIMIT_RANGE.length - 1}
          />
        ))}
      </ScrollView>
    </SafeArea>
  );
};

export default ChangePredictionsLimitScreen;
