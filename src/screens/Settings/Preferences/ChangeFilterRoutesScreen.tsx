import React, { useState, useEffect, Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/native";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { selectRoutes, getRoutes } from "../../../store/features/nextbus";
import {
  selectFilterRouteIds,
  filterRouteIds as setFilterRouteIds,
  selectShowRouteIdForDisplay
} from "../../../store/features/settings";
import { Loader, Icon, SafeArea, SelectItem, ErrorInfo } from "../../../components";
import { SaveButton } from "../settingStyles";
import { normalizeRouteName, useToggle } from "../../../utils";
import { space } from "../../../styles";
import { SettingsStackParamList, RootStackParamList } from "../../../../types";

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
  const showRouteIdForDisplay = useSelector(selectShowRouteIdForDisplay);
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
    return () => {
      ChangeFilterRoutesScreen.setRouteIds = null;
    };
  }, [dispatch]);

  if (routes.error) {
    return <ErrorInfo message={routes.error.message} onRetry={handleRetry} />;
  }

  if (routes.loading) {
    return <Loader />;
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
      <SaveButton onPress={handleSave} />
    </SafeArea>
  );
};
// todo: set params on navigation object instead of static variables
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
        name={toggled ? "checkbox-multiple-blank-circle" : "checkbox-multiple-blank-circle-outline"}
        color="text"
        size={25}
      />
    </HighlightButton>
  );
} as React.FC;

const HighlightButton = styled.TouchableHighlight.attrs({ underlayColor: "background" })`
  margin-right: ${space.md};
`;

export default ChangeFilterRoutesScreen;
