import React from "react";
import styled from "styled-components/native";

import Icon from "./Icon";
import { Strong, Text, Title } from "./Typography";
import { Button } from "./Buttons";
import { space } from "../styles";
import { OnPressHandler } from "../../types";

const Container = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled(Text)`
  margin: ${space.lg} 0 ${space.xxxlg};
  padding-horizontal: ${space.xxxlg};
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
  <Container>
    <Title color="primary">{title || "Something went wrong"}</Title>
    {message && <Message color="textLight">{message}</Message>}
    {onRetry && (
      <RetryButton onPress={onRetry} loading={retryLoading}>
        <Strong iconSpace={externalLink} hasIconRight color="white">
          {onRetryTitle || "Try Again"}
        </Strong>
        {externalLink && <Icon icon="AntDesign" name="arrowright" size={15} color="text" />}
      </RetryButton>
    )}
  </Container>
);

export default ErrorInfo;
