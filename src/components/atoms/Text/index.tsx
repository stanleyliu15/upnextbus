import styled from "styled-components/native";

import { fontFamily, fontSize, space } from "../../../styles";

type TextProps = {
  iconSpace?: boolean;
  right?: boolean;
  center?: boolean;
};

export const Text = styled.Text<TextProps>`
  color: ${({ theme }) => theme.text};
  font-family: ${fontFamily.normal};
  font-size: ${fontSize.primary};
  margin-left: ${({ iconSpace }) => (iconSpace ? space.large : 0)};
  text-align: ${props => {
    if (props.right) return "right";
    if (props.center) return "center";
    return "left";
  }};
`;
