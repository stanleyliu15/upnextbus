import React from "react";
import styled from "styled-components/native";

import { border } from "../../../styles";

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const CircularIconButton = styled.TouchableHighlight.attrs(props => ({
  underlayColor: props.theme.background,
  children: <Wrapper {...props}>{props.children}</Wrapper>
}))`
  justify-content: center;
  align-items: center;

  /** to get circle 2x the size of the icon */
  width: ${({ iconSize }) => iconSize * 2};
  height: ${({ iconSize }) => iconSize * 2};
  border-radius: ${border.full};
`;
