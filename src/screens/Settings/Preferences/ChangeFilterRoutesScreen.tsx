import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import { RouteProp, CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { isEqual } from "lodash";

import { selectRoutes, getRoutes } from "../../../store/features/nextbus";
import {
  selectFilterRouteIds,
  filterRouteIds as setFilterRouteIds,
  selectShowRouteIdForDisplay
} from "../../../store/features/settings";
import {
  Loader,
  Icon,
  SafeArea,
  SelectItem,
  ErrorInfo,
  HighlightButton
} from "../../../components";
import { SaveButton } from "../settingStyles";
import { normalizeRouteName, useToggle } from "../../../utils";
import { space } from "../../../styles";
import { SettingsStackParamList, RootStackParamList } from "../../../../types";
import { useDispatch } from "../../../store";

type ChangeFilterRoutesScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<SettingsStackParamList, "ChangeFilterRoutesScreen">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<SettingsStackParamList, "ChangeFilterRoutesScreen">;
};

const ChangeFilterRoutesScreen: React.FC<ChangeFilterRoutesScreenProps> = ({
  navigation,
  route
}) => {
  const dispatch = useDispatch();
  const routes = useSelector(selectRoutes);
  const filterRouteIds = useSelector(selectFilterRouteIds);
  const showRouteIdForDisplay = useSelector(selectShowRouteIdForDisplay);
  const [routeIds, setRouteIds] = useState(filterRouteIds);
  const fetchRoutes = useCallback(() => dispatch(getRoutes()), [dispatch]);
  const handleSave = useCallback(() => {
    dispatch(setFilterRouteIds(routeIds));
    navigation.goBack();
  }, [dispatch, navigation, routeIds]);

  useEffect(() => {
    if (route.params?.routeIds) {
      setRouteIds(route.params.routeIds);
    }
  }, [route.params?.routeIds]);

  if (routes.loading) {
    return <Loader />;
  }

  if (routes.error) {
    return <ErrorInfo message={routes.error.message} onRetry={fetchRoutes} />;
  }

  return (
    <SafeArea>
      <FlatList
        data={routes.data}
        keyExtractor={item => item.id}
        renderItem={({ item: route, index }) => {
          const selected = routeIds.includes(route.id);

          return (
            <SelectItem
              title={normalizeRouteName(showRouteIdForDisplay ? route.id : route.name)}
              selected={selected}
              onPress={() => {
                if (selected) {
                  setRouteIds(routeIds.filter(routeId => routeId !== route.id));
                } else {
                  setRouteIds(routeIds.concat(route.id));
                }
              }}
              showBottomBorder={index !== routes.data.length - 1}
            />
          );
        }}
        extraData={routeIds}
      />
      <SaveButton onPress={handleSave} disabled={isEqual(filterRouteIds, routeIds)} />
    </SafeArea>
  );
};

export const ChangeFilterRoutesHeaderRight: React.FC = () => {
  const navigation = useNavigation();
  const routes = useSelector(selectRoutes);
  const routeIds = useMemo(() => routes.data.map(route => route.id), [routes.data]);
  const [toggled, toggle] = useToggle(false);
  const filterAll = useCallback(() => {
    navigation.setParams({ routeIds: [] });
    toggle();
  }, [navigation, toggle]);
  const filterNone = useCallback(() => {
    navigation.setParams({ routeIds });
    toggle();
  }, [navigation, routeIds, toggle]);

  if (routes.loading || routes.error) {
    return null;
  }

  return (
    <CheckboxButton onPress={toggled ? filterNone : filterAll} highlightColor="background">
      <Icon
        icon="MaterialCommunityIcons"
        name={toggled ? "checkbox-multiple-blank-circle" : "checkbox-multiple-blank-circle-outline"}
        color="text"
        size={25}
      />
    </CheckboxButton>
  );
};

const CheckboxButton = styled(HighlightButton)`
  margin-right: ${space.md};
`;

export default ChangeFilterRoutesScreen;
