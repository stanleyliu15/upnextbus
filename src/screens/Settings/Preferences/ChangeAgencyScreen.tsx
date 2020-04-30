import React, { useState, useEffect, useCallback } from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import {
  selectAgencies,
  selectAgencyId,
  selectSelectedAgencyId,
  getRoutes,
  getAgencies
} from "../../../store/features/nextbus";
import { Loader, SafeArea, ErrorInfo, SelectItem } from "../../../components";
import { SaveButton } from "../settingStyles";
import { NextBus, SettingsStackParamList, RootStackParamList } from "../../../../types";

type ChangeAgencyScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<SettingsStackParamList, "ChangeAgencyScreen">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<SettingsStackParamList, "ChangeAgencyScreen">;
};

const ChangeAgencyScreen: React.FC<ChangeAgencyScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const agencies = useSelector(selectAgencies);
  const selectedAgencyId = useSelector(selectSelectedAgencyId);
  const [agencyId, setAgencyId] = useState(selectedAgencyId);
  const handleSave = useCallback(
    _event => {
      dispatch(selectAgencyId(agencyId));
      dispatch(getRoutes());
      navigation.goBack();
    },
    [agencyId, dispatch, navigation]
  );

  useEffect(() => {
    dispatch(getAgencies());
  }, [dispatch]);

  if (agencies.loading) {
    return <Loader />;
  }

  if (agencies.error) {
    return <ErrorInfo message={agencies.error.message} />;
  }

  return (
    <SafeArea>
      <FlatList
        data={agencies.data}
        keyExtractor={(item: NextBus.Agency) => item.id}
        renderItem={({ item, index }) => (
          <SelectItem
            name={item.name}
            description={item.region}
            selected={item.id === agencyId}
            onSelect={() => setAgencyId(item.id)}
            lastItem={index === agencies.data.length - 1}
          />
        )}
        extraData={agencyId}
      />
      <SaveButton onPress={handleSave} />
    </SafeArea>
  );
};

export default ChangeAgencyScreen;
