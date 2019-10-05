import React, { useState } from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import {
  selectAgencies,
  selectAgencyId,
  selectSelectedAgencyId,
  getRoutes
} from "../../../store/features/nextbus";
import { Loader } from "../../../components/atoms";
import { ErrorInfo } from "../../../components/molecules";
import { SelectItem, SaveButton } from "../../../components/organisms/Settings";
import SafeArea from "../../../layouts/SafeArea";
import { NavigationProps } from "../../../../types";

function ChangeAgencyScreen({ navigation }: NavigationProps) {
  const dispatch = useDispatch();
  const agencies = useSelector(selectAgencies);
  const selectedAgencyId = useSelector(selectSelectedAgencyId);
  const [agencyId, setAgencyId] = useState(selectedAgencyId);
  const handleSave = () => {
    dispatch(selectAgencyId(agencyId));
    dispatch(getRoutes());
    navigation.goBack();
  };

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
        renderItem={({ item }) => (
          <SelectItem
            name={item.name}
            selected={item.id === agencyId}
            onSelect={() => setAgencyId(item.id)}
          />
        )}
        extraData={agencyId}
      />
      <SaveButton onSave={handleSave} />
    </SafeArea>
  );
}

export default ChangeAgencyScreen;
