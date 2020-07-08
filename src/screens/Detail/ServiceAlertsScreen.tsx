import React from "react";
import styled from "styled-components/native";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { SafeArea, Text, Icon } from "../../components";
import { space, borderRadius, mixins } from "../../styles";
import { DetailStackParamList, RootStackParamList } from "../../../types";

type ServiceAlertsScreenProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<DetailStackParamList, "ServiceAlertsScreen">,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<DetailStackParamList, "ServiceAlertsScreen">;
};

const ServiceAlertsScreen: React.FC<ServiceAlertsScreenProps> = ({ route }) => {
  const { serviceAlerts } = route.params;

  return (
    <SafeArea>
      {serviceAlerts.map(serviceAlert => (
        <AlertItem key={serviceAlert.message}>
          <Icon icon="AntDesign" name="warning" size="sm" color="yellow" />
          <VerticalSeperator />
          <Message>{`${serviceAlert.message}`}</Message>
        </AlertItem>
      ))}
    </SafeArea>
  );
};

const AlertItem = styled.View`
  display: flex;
  flex-direction: row;

  margin: ${space.lg} ${space.sm} 0;
  padding: ${space.md};
  ${mixins.border({ color: "yellow" })};
  border-radius: ${borderRadius.round};
`;

const Message = styled(Text)`
  flex: 1;
`;

const VerticalSeperator = styled.View`
  ${mixins.border({ direction: "left", color: "yellow" })};
  margin-horizontal: ${space.md};
`;

export default ServiceAlertsScreen;
