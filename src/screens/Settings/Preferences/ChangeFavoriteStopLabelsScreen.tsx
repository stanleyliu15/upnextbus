import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { isEqual } from "lodash";

import { SettingsStackParamList, RootStackParamList } from "../../../../types";
import {
  selectFavoriteStopLabels,
  setFavoriteStopLabels,
  selectShowRouteIdForDisplay
} from "../../../store/features/settings";
import { SafeArea, SelectItem, CenterColumn, Text } from "../../../components";
import { selectRoutes } from "../../../store/features/nextbus";
import { normalizeRouteName, findBusInfo, equalContains } from "../../../utils";
import { SaveButton } from "../settingStyles";
import { useDispatch } from "../../../store";

type ChangeFavoriteStopLabelsScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<SettingsStackParamList, "ChangeAgencyScreen">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<SettingsStackParamList, "ChangeAgencyScreen">;
};

const ChangeFavoriteStopLabelsScreen: React.FC<ChangeFavoriteStopLabelsScreenProps> = ({
  navigation
}) => {
  const dispatch = useDispatch();
  const routes = useSelector(selectRoutes);
  const showRouteIdForDisplay = useSelector(selectShowRouteIdForDisplay);
  const favoriteStopLabels = useSelector(selectFavoriteStopLabels);
  const [stopLabels, setStopLabels] = useState(favoriteStopLabels);
  const handleSave = useCallback(() => {
    dispatch(setFavoriteStopLabels(stopLabels));
    navigation.goBack();
  }, [dispatch, navigation, stopLabels]);

  return (
    <SafeArea>
      {favoriteStopLabels.length === 0 ? (
        <CenterColumn>
          <Text>You currently have 0 favorites.</Text>
        </CenterColumn>
      ) : (
        <>
          <FlatList
            data={favoriteStopLabels}
            keyExtractor={item => `${item.routeId}-${item.stopId}`}
            renderItem={({ item: stopLabel, index }) => {
              const { route, direction, stop } = findBusInfo(stopLabel, routes.data);
              const selected = stopLabels.some(sl => isEqual(sl, stopLabel));

              return (
                <SelectItem
                  title={normalizeRouteName(showRouteIdForDisplay ? route.id : route.name)}
                  description={`${direction.name}\n${stop.name}`}
                  selected={selected}
                  onPress={() => {
                    if (selected) {
                      setStopLabels(stopLabels.filter(sl => !isEqual(sl, stopLabel)));
                    } else {
                      setStopLabels(stopLabels.concat(stopLabel));
                    }
                  }}
                  showBottomBorder={index !== favoriteStopLabels.length - 1}
                />
              );
            }}
          />
          <SaveButton
            onPress={handleSave}
            disabled={equalContains(favoriteStopLabels, stopLabels)}
          />
        </>
      )}
    </SafeArea>
  );
};

export default ChangeFavoriteStopLabelsScreen;
