import React, { useState, useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components/native";

import { selectAgencies, getAgencies } from "../../store/features/nextbus";
import { Button, Text, Loader, ErrorInfo, SelectItem, SafeArea } from "..";
import { space } from "../../styles";
import { selectAgencyId } from "../../store/features/settings";
import { useDispatch } from "../../store";

const SetupAgency: React.FC = () => {
  const dispatch = useDispatch();
  const agencies = useSelector(selectAgencies);
  const [agencyId, setAgencyId] = useState(null);
  const fetchAgencies = useCallback(() => dispatch(getAgencies()), [dispatch]);
  const handleSetup = useCallback(() => {
    dispatch(selectAgencyId(agencyId));
  }, [agencyId, dispatch]);

  useEffect(() => {
    fetchAgencies();
  }, [fetchAgencies]);

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
            selected={agency.id === agencyId}
            onPress={() => setAgencyId(agency.id)}
            showBottomBorder={index !== agencies.data.length - 1}
          />
        )}
        extraData={agencyId}
      />
      {agencyId && (
        <SetButton onPress={handleSetup}>
          <Text center color="white">
            Done
          </Text>
        </SetButton>
      )}
    </SafeArea>
  );
};

const SetButton = styled(Button)`
  margin: ${space.xlg};
`;

export default SetupAgency;
