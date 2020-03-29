import React from "react";
import styled from "styled-components/native";

import { SafeArea, Text, Icon } from "../../components";
import { space, borderRadius } from "../../styles";
import { NavigationProps } from "../../../types";

const Alert = styled.View`
  display: flex;
  flex-direction: row;

  margin: ${space.md};
  padding: ${space.md};
  border: 1px solid ${({ theme }) => theme.yellow};
  border-radius: ${borderRadius.round};
`;

const AlertMessage = styled(Text)`
  flex: 1;
`;

const VerticalSeperator = styled.View`
  border: 1px solid ${({ theme }) => theme.yellow};
  margin-horizontal: ${space.md};
`;

const ServiceAlertsScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const serviceAlerts = navigation.getParam("serviceAlerts");

  return (
    <SafeArea>
      {serviceAlerts.map(serviceAlert => (
        <Alert key={serviceAlert.message}>
          <Icon icon="AntDesign" name="warning" size={20} color="yellow" />
          <VerticalSeperator />
          <AlertMessage>{`${serviceAlert.message}`}</AlertMessage>
        </Alert>
      ))}
    </SafeArea>
  );
};

export default ServiceAlertsScreen;
