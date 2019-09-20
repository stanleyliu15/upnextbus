import React from "react";
import styled from "styled-components/native";
import noop from "lodash/noop";

import { Text, Button } from "../../atoms";
import { fontFamily, fontSize, space } from "../../../styles";

type ErrorInfoProps = {
  message: string;
  onRetry?: VoidFunction;
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
  margin-top: ${space.massive};
`;
