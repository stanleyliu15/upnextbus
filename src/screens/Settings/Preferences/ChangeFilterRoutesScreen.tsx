import React, { useState, useEffect, Dispatch, SetStateAction, useCallback } from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/native";

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
import { NavigationProps, NextBus } from "../../../../types";

const ChangeFilterRoutesScreen: React.FC<NavigationProps> & {
  setRouteIds: Dispatch<SetStateAction<string[]>>;
  HeaderRight: React.FC;
} = ({ navigation }) => {
  const dispatch = useDispatch();
  const routes = useSelector(selectRoutes);
  const filterRouteIds = useSelector(selectFilterRouteIds);
  const [routeIds, setRouteIds] = useState(filterRouteIds);
  const handleRetry = _event => dispatch(getRoutes());
  const handleSave = _event => {
    dispatch(setFilterRouteIds(routeIds));
    navigation.goBack();
  };

  useEffect(() => {
    ChangeFilterRoutesScreen.setRouteIds = setRouteIds;
    return () => {
      ChangeFilterRoutesScreen.setRouteIds = null;
    };
  }, []);

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
  const routeIds = routes.data.map(route => route.id);
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
