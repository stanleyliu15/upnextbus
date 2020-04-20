import React from "react";
import styled from "styled-components/native";

import { SafeArea, Text, Icon } from "../../components";
import { space, borderRadius } from "../../styles";
import { NavigationProps } from "../../../types";

const ServiceAlertsScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const serviceAlerts = navigation.getParam("serviceAlerts");

  return (
    <SafeArea>
      {serviceAlerts.map(serviceAlert => (
        <AlertItem key={serviceAlert.message}>
          <Icon icon="AntDesign" name="warning" size={20} color="yellow" />
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

  margin: ${space.lg}px ${space.sm}px 0;
  padding: ${space.md}px;
  border: 1px solid ${({ theme }) => theme.yellow};
  border-radius: ${borderRadius.round};
`;

const Message = styled(Text)`
  flex: 1;
`;

const VerticalSeperator = styled.View`
  border: 0.5px solid ${({ theme }) => theme.yellow};
  margin-horizontal: ${space.md};
`;

export default ServiceAlertsScreen;
