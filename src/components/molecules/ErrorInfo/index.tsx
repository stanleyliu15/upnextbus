import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import noop from "lodash/noop";

import { AntDesign } from "@expo/vector-icons";
import { Text, Button, Strong } from "../../atoms";
import { fontFamily, fontSize, space } from "../../../styles";
import { OnPressHandler } from "../../../../types";

type ErrorInfoProps = {
  message: string;
  title?: string;
  onRetry?: OnPressHandler;
  onRetryTitle?: string;
  externalLink?: boolean;
};

export const ErrorInfo = ({
  message,
  title = null,
  onRetry = noop,
  onRetryTitle = null,
  externalLink = false
}: ErrorInfoProps) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <Title>{title || "Something went wrong"}</Title>
      {message && <Message>{message}</Message>}
      {onRetry && (
        <RetryButton onPress={onRetry}>
          <RetryText iconSpace={externalLink} hasIconRight>
            {onRetryTitle || "Try Again"}
          </RetryText>
          {externalLink && (
            <AntDesign name="arrowright" size={fontSize.primary} color={theme.white} />
          )}
        </RetryButton>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Text)`
  color: ${({ theme }) => theme.error};
  font-family: ${fontFamily.bold};
  font-size: ${fontSize.medium};
`;

const Message = styled(Text)`
  margin-top: ${space.xxxLarge};
  padding-horizontal: ${space.massive};
  color: ${({ theme }) => theme.textLight};
`;

const RetryButton = styled(Button)`
  background-color: ${({ theme }) => theme.error};
  margin-top: ${space.massive};

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RetryText = styled(Strong)`
  color: ${({ theme }) => theme.white};
`;
