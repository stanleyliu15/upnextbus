import React, { useState, useContext } from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled, { ThemeContext } from "styled-components/native";
import SafeArea from "../../../layouts/SafeArea";
import {
  selectFilterRouteIds,
  filterRouteIds as setFilterRouteIds,
  selectRoutes,
  getRoutes
} from "../../../store/features/nextbus";
import { SelectItem, SaveButton } from "../../../components/organisms/Settings";
import { Loader } from "../../../components/atoms";
import { ErrorInfo } from "../../../components/molecules";
import { normalizeRouteName, useToggle } from "../../../utils";
import { space } from "../../../styles";
import { NavigationProps } from "../../../../types";

// eslint-disable-next-line no-underscore-dangle
let _setRouteIds;

function FilterRoutesScreen({ navigation }: NavigationProps) {
  const dispatch = useDispatch();
  const routes = useSelector(selectRoutes);
  const handleRetry = () => dispatch(getRoutes());

  const filterRouteIds = useSelector(selectFilterRouteIds);
  const [routeIds, setRouteIds] = useState(filterRouteIds);
  _setRouteIds = setRouteIds;

  const handleSave = () => {
    dispatch(setFilterRouteIds(routeIds));
    navigation.goBack();
  };

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
      <SaveButton onSave={handleSave} />
    </SafeArea>
  );
}

const HeaderRight = function() {
  const theme = useContext(ThemeContext);
  const routes = useSelector(selectRoutes);
  const [toggled, toggle] = useToggle(true);

  if (routes.loading || routes.error) return null;

  const allRouteIds = routes.data.map(route => route.id);

  const filterAll = () => {
    _setRouteIds([]);
    toggle();
  };

  const filterNone = () => {
    _setRouteIds(allRouteIds);
    toggle();
  };

  if (toggled) {
    return (
      <Highlight onPress={filterAll} underlayColor={theme.background}>
        <MaterialCommunityIcons
          name="checkbox-multiple-blank-circle-outline"
          color={theme.text}
          size={25}
        />
      </Highlight>
    );
  }

  return (
    <Highlight onPress={filterNone} underlayColor={theme.background}>
      <MaterialCommunityIcons
        name="checkbox-multiple-marked-circle-outline"
        color={theme.text}
        size={25}
      />
    </Highlight>
  );
};

const Highlight = styled.TouchableHighlight`
  margin-right: ${space.large};
`;

FilterRoutesScreen.navigationOptions = {
  headerRight: <HeaderRight />
};

export default FilterRoutesScreen;
