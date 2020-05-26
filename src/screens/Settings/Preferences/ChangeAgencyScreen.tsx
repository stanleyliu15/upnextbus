import React, { useEffect, useCallback } from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { selectAgencies, getRoutes, getAgencies } from "../../../store/features/nextbus";
import { Loader, SafeArea, ErrorInfo, SelectItem } from "../../../components";
import { SettingsStackParamList, RootStackParamList } from "../../../../types";
import { selectSelectedAgencyId, selectAgencyId } from "../../../store/features/settings";
import { useDispatch } from "../../../store";

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
  const fetchAgencies = useCallback(() => dispatch(getAgencies()), [dispatch]);

  useEffect(() => {
    fetchAgencies();
  }, [dispatch, fetchAgencies]);

  if (agencies.loading) {
    return <Loader />;
  }

  if (agencies.error) {
    return <ErrorInfo message={agencies.error.message} onRetry={fetchAgencies} />;
  }

  return (
    <SafeArea>
      <FlatList
        data={agencies.data}
        keyExtractor={item => item.id}
        renderItem={({ item: agency, index }) => (
          <SelectItem
            title={agency.name}
            description={agency.region}
            selected={agency.id === selectedAgencyId}
            onPress={() => {
              dispatch(selectAgencyId(agency.id));
              dispatch(getRoutes());
              navigation.goBack();
            }}
            showBottomBorder={index !== agencies.data.length - 1}
          />
        )}
      />
    </SafeArea>
  );
};

export default ChangeAgencyScreen;
