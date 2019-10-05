import React from "react";
import styled from "styled-components/native";
import noop from "lodash/noop";

import { Text, Button } from "../../atoms";
import { fontFamily, fontSize, space } from "../../../styles";
import { OnPressHandler } from "../../../../types";

type ErrorInfoProps = {
  message: string;
  onRetry?: OnPressHandler;
};

export const ErrorInfo = ({ message, onRetry = noop }: ErrorInfoProps) => {
  return (
    <Container>
      <Title>Something went wrong</Title>
      {message && <Message>{message}</Message>}
      {onRetry && (
        <RetryButton onPress={onRetry}>
          <Text>Try Again</Text>
        </RetryButton>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.background};
`;

const Title = styled(Text)`
  font-family: ${fontFamily.bold};
  font-size: ${fontSize.medium};
`;

const Message = styled(Text)`
  margin-top: ${space.xxxLarge};
  padding-horizontal: ${space.massive};
  color: ${({ theme }) => theme.textLight};
`;

const RetryButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.light};
  margin-top: ${space.massive};
`;
