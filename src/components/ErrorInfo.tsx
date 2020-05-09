import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";

import Icon from "./Icon";
import { Strong, Text, Title } from "./Typography";
import { Button } from "./Buttons";
import { space } from "../styles";
import { OnPressHandler } from "../../types";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Message = styled(Text)`
  margin: ${space.lg} 0 ${space.xxxlg};
  padding-horizontal: ${space.xxxlg};
  color: ${({ theme }) => theme.textLight};
`;

const RetryButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: ${({ theme }) => theme.background};
  margin-top: ${space.xxxlg};
`;

type ErrorInfoProps = {
  message: string;
  title?: string;
  onRetry?: OnPressHandler;
  onRetryTitle?: string;
  externalLink?: boolean;
};

const ErrorInfo: React.FC<ErrorInfoProps> = ({
  message,
  title = null,
  onRetry = null,
  onRetryTitle = null,
  externalLink = false
}) => (
  <Container>
    <Title color="red">{title || "Something went wrong"}</Title>
    {message && <Message>{message}</Message>}
    {onRetry && (
      <RetryButton onPress={onRetry}>
        <View>
          <Strong iconSpace={externalLink} hasIconRight>
            {onRetryTitle || "Try Again"}
          </Strong>
          {externalLink && <Icon icon="AntDesign" name="arrowright" size={15} color="white" />}
        </View>
      </RetryButton>
    )}
  </Container>
);

export default ErrorInfo;
