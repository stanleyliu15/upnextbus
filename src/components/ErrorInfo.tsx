import React from "react";
import styled from "styled-components/native";

import Icon from "./Icon";
import { Strong, Text } from "./Typography";
import { Button } from "./Buttons";

import { fontFamily, fontSize, space } from "../styles";
import { OnPressHandler } from "../../types";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Text)`
  color: ${({ theme }) => theme.text};
  font-family: ${fontFamily.bold};
  font-size: ${fontSize.lg};
`;

const Message = styled(Text)`
  margin-top: ${space.xlg};
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
    <Title>{title || "Something went wrong"}</Title>
    {message && <Message>{message}</Message>}
    {onRetry && (
      <RetryButton onPress={onRetry}>
        <Strong iconSpace={externalLink} hasIconRight color="text">
          {onRetryTitle || "Try Again"}
        </Strong>
        {externalLink && (
          <Icon icon="AntDesign" name="arrowright" size={fontSize.md} color="white" />
        )}
      </RetryButton>
    )}
  </Container>
);

export default ErrorInfo;
