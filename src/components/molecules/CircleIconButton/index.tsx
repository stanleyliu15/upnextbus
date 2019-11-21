import React from "react";
import styled from "styled-components/native";

import { border } from "../../../styles";
import { Button } from "../../atoms";

export type CircularIconButtonProps = {
  iconSize?: number;
  inverse?: boolean;
};

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const CircularIconButton = styled(Button).attrs<{ children: React.ReactNode }>(props => ({
  children: <Wrapper>{props.children}</Wrapper>,
  ...props
}))<CircularIconButtonProps>`
  padding: 0;
  border-radius: 0;
  background-color: ${({ theme, inverse }) => (inverse ? theme.backgroundLight : theme.background)};

  justify-content: center;
  align-items: center;

  /** to get circle 2x the size of the icon */
  width: ${({ iconSize }) => iconSize * 2};
  height: ${({ iconSize }) => iconSize * 2};
  border-radius: ${border.full};
`;
