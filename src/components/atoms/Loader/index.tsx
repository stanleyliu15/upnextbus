import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

export type Props = Omit<ActivityIndicatorProps, "size"> & {
  large?: boolean;
};

// TODO: custom loader

export const Loader = ({ large = true, ...props }: Props) => {
  return (
    <Wrapper>
      <ActivityIndicator size={large ? "large" : "small"} {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
