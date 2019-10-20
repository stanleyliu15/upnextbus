import styled from "styled-components/native";

import { fontFamily, fontSize, space } from "../../../styles";

type TextProps = {
  iconSpace?: boolean;
  hasIconRight?: boolean;
  right?: boolean;
  center?: boolean;
};

export const Text = styled.Text<TextProps>`
  color: ${({ theme }) => theme.text};
  font-family: ${fontFamily.normal};
  font-size: ${fontSize.primary};
  ${({ iconSpace, hasIconRight }) => {
    if (iconSpace) {
      if (hasIconRight) {
        return `margin-right: ${space.large}`;
      } else {
        return `margin-left: ${space.large}`;
      }
    }
  }};
  text-align: ${props => {
    if (props.right) return "right";
    if (props.center) return "center";
    return "left";
  }};
`;
