import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { selectSelectedAgencyId } from "../../store/features/settings";
import {
  getRoutes,
  selectNearestAgencyId,
  selectRoutes,
  loadSelectedAgencyId
} from "../../store/features/nextbus";
import { ErrorInfo, Loader } from "../../components";
import { useDispatch } from "../../store";
import { RootStackParamList } from "../../../types";
import { SetupAgency } from "../../components/SetupItems";

type SetupScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, "Setup">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<RootStackParamList, "Setup">;
};

const SetupScreen: React.FC<SetupScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const selectedAgencyId = useSelector(selectSelectedAgencyId);
  const nearestAgencyId = useSelector(selectNearestAgencyId);
  const routes = useSelector(selectRoutes);

  useEffect(() => {
    if (!selectedAgencyId) {
      dispatch(loadSelectedAgencyId());
      return;
    }

    if (!routes.data.length) {
      dispatch(getRoutes());
      return;
    }

    navigation.replace("Nearby");
  }, [dispatch, navigation, routes.data.length, selectedAgencyId]);

  if (nearestAgencyId.error) {
    return <SetupAgency />;
  }

  if (routes.error) {
    return <ErrorInfo message={routes.error.message} onRetry={() => dispatch(getRoutes())} />;
  }

  return <Loader />;
};

export default SetupScreen;
