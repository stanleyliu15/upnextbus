import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import Icon from "./Icon";
import { Strong, Text, Title } from "./Typography";
import { Button } from "./Buttons";
import { space } from "../styles";
import { OnPressHandler } from "../../types";
import { CenterColumn } from "./Center";

const Message = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin: ${space.lg} 0 80px;
`;

const RetryButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: ${space.md};
`;

type ErrorInfoProps = {
  message?: string;
  title?: string;
  retryLoading?: boolean;
  onRetry?: OnPressHandler;
  onRetryTitle?: string;
  externalLink?: boolean;
};

const ErrorInfo: React.FC<ErrorInfoProps> = ({
  message,
  title = null,
  retryLoading = false,
  onRetry = null,
  onRetryTitle = null,
  externalLink = false
}) => (
  <CenterColumn>
    <View>
      <Title center color="primary">
        {title || "Something went wrong"}
      </Title>
      {message && (
        <Message>
          <Icon icon="Ionicons" name="ios-warning" size="md" color="text" />
          <Text color="textLight" iconSpace>
            {message}
          </Text>
        </Message>
      )}
    </View>
    {onRetry && (
      <RetryButton onPress={onRetry} loading={retryLoading}>
        <Strong iconSpace={externalLink} hasIconRight color="white">
          {onRetryTitle || "Try Again"}
        </Strong>
        {externalLink && <Icon icon="AntDesign" name="arrowright" size="xs" color="white" />}
      </RetryButton>
    )}
  </CenterColumn>
);

export default ErrorInfo;
