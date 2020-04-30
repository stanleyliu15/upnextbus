import React, { useState, useEffect, Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/native";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import {
  selectFilterRouteIds,
  filterRouteIds as setFilterRouteIds,
  selectRoutes,
  getRoutes
} from "../../../store/features/nextbus";
import { Loader, Icon, SafeArea, SelectItem, ErrorInfo } from "../../../components";
import { SaveButton } from "../settingStyles";
import { normalizeRouteName, useToggle } from "../../../utils";
import { space } from "../../../styles";
import { SettingsStackParamList, RootStackParamList, NextBus } from "../../../../types";

type ChangeFilterRoutesScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<SettingsStackParamList, "ChangeFilterRoutesScreen">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<SettingsStackParamList, "ChangeFilterRoutesScreen">;
};

const ChangeFilterRoutesScreen: React.FC<ChangeFilterRoutesScreenProps> & {
  setRouteIds: Dispatch<SetStateAction<string[]>>;
  HeaderRight: React.FC;
} = ({ navigation }) => {
  const dispatch = useDispatch();
  const routes = useSelector(selectRoutes);
  const filterRouteIds = useSelector(selectFilterRouteIds);
  const [routeIds, setRouteIds] = useState(filterRouteIds);
  const handleRetry = useCallback(_event => dispatch(getRoutes()), [dispatch]);
  const handleSave = useCallback(
    _event => {
      dispatch(setFilterRouteIds(routeIds));
      navigation.goBack();
    },
    [dispatch, navigation, routeIds]
  );

  useEffect(() => {
    ChangeFilterRoutesScreen.setRouteIds = setRouteIds;
    // todo: put update routes as a setting
    dispatch(getRoutes());
    return () => {
      ChangeFilterRoutesScreen.setRouteIds = null;
    };
  }, [dispatch]);

  if (routes.loading) {
    return <Loader />;
  }

  if (routes.error) {
    return <ErrorInfo message={routes.error.message} onRetry={handleRetry} />;
  }

  return (
    <SafeArea>
      <FlatList
        data={routes.data}
        keyExtractor={(item: NextBus.Route) => item.id}
        renderItem={({ item, index }) => (
          <SelectItem
            name={normalizeRouteName(item.name)}
            selected={routeIds.includes(item.id)}
            onSelect={() => {
              if (routeIds.includes(item.id)) {
                setRouteIds(routeIds.filter(routeId => routeId !== item.id));
              } else {
                setRouteIds(routeIds.concat(item.id));
              }
            }}
            lastItem={index === routes.data.length - 1}
          />
        )}
        extraData={routeIds}
      />
      <SaveButton onPress={handleSave} />
    </SafeArea>
  );
};
ChangeFilterRoutesScreen.setRouteIds = null;
ChangeFilterRoutesScreen.HeaderRight = function(_props) {
  const routes = useSelector(selectRoutes);
  const routeIds = useMemo(() => routes.data.map(route => route.id), [routes.data]);
  const [toggled, toggle] = useToggle(false);
  const filterAll = useCallback(() => {
    ChangeFilterRoutesScreen.setRouteIds([]);
    toggle();
  }, [toggle]);
  const filterNone = useCallback(() => {
    ChangeFilterRoutesScreen.setRouteIds(routeIds);
    toggle();
  }, [routeIds, toggle]);

  if (routes.loading || routes.error) {
    return null;
  }

  return (
    <HighlightButton onPress={toggled ? filterNone : filterAll}>
      <Icon
        icon="MaterialCommunityIcons"
        name={`checkbox-multiple-${toggled ? "marked" : "blank"}-circle-outline`}
        color="text"
        size={25}
      />
    </HighlightButton>
  );
} as React.FC;

const HighlightButton = styled.TouchableHighlight.attrs(({ theme }) => ({
  underlayColor: theme.background
}))`
  margin-right: ${space.md};
`;

export default ChangeFilterRoutesScreen;
