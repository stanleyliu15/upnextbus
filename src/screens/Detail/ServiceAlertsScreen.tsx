import React from "react";
import styled from "styled-components/native";
import AntDesign from "react-native-vector-icons/AntDesign";

import SafeArea from "../../layouts/SafeArea";
import { Text } from "../../components/atoms";
import { VerticalSeperator } from "../../components/organisms/Nearby/itemStyles";
import { space, border } from "../../styles";
import { NavigationProps } from "../../../types";

function ServiceAlertsScreen({ navigation }: NavigationProps) {
  const serviceAlerts = navigation.getParam("serviceAlerts");

  return (
    <SafeArea>
      {serviceAlerts.map(serviceAlert => (
        <>
          <Container>
            <Alert>
              <AlertIcon />
              <MyVerticalSeperator />
              <AlertMessage>{`${serviceAlert.message}LScrollView will load items (data in it for scrolling) immediately after component loading. So all data will mount into RAM and you can't use hundred or thousand items in it (because of low performance).`}</AlertMessage>
            </Alert>
            <Alert>
              <AlertIcon />
              <MyVerticalSeperator />
              <AlertMessage>{`${serviceAlert.message}L`}</AlertMessage>
            </Alert>
            <Alert>
              <AlertIcon />
              <MyVerticalSeperator />
              <AlertMessage>{`${serviceAlert.message}LScrollView wiof low performance).`}</AlertMessage>
            </Alert>
            <Alert>
              <AlertIcon />
              <MyVerticalSeperator />
              <AlertMessage>{`${serviceAlert.message}L`}</AlertMessage>
            </Alert>
          </Container>
        </>
      ))}
    </SafeArea>
  );
}

const AlertIcon = styled.View.attrs(props => ({
  ...props,
  children: <AntDesign name="warning" size={20} color={props.theme.warning} />
}))`
  padding-left: ${space.large};
  padding-right: ${space.large};
`;

const MyVerticalSeperator = styled(VerticalSeperator)`
  border-width: 1px;
  border-color: ${({ theme }) => theme.warning};
  margin-top: ${space.zero};
  margin-bottom: ${space.zero};
  flex: 0;
`;

const AlertMessage = styled(Text)`
  flex: 1;
  padding-left: ${space.large};
  padding-right: ${space.large};
`;

const Alert = styled.View`
  display: flex;
  flex-direction: row;

  border-radius: ${border.round};
  margin: ${space.zero} ${space.large} ${space.large};
  padding: ${space.large};

  border-color: ${({ theme }) => theme.warning};
  border-width: 0.66px;
`;

const Container = styled.View`
  margin-top: ${space.large};
`;

export default ServiceAlertsScreen;
