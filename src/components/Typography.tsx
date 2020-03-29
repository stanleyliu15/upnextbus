import styled from "styled-components/native";

import { fontFamily, fontSize, space } from "../styles";

type TextProps = {
  color?: string;
  iconSpace?: boolean;
  hasIconRight?: boolean;
  right?: boolean;
  center?: boolean;
};

export const Text = styled.Text<TextProps>`
  color: ${({ theme, color }) => theme[color] || color || theme.text};
  font-family: ${fontFamily.normal};
  font-size: ${fontSize.md};
  margin-right: ${({ iconSpace, hasIconRight }) => (iconSpace && hasIconRight ? space.md : 0)};
  margin-left: ${({ iconSpace, hasIconRight }) => (iconSpace && !hasIconRight ? space.md : 0)};
  text-align: ${props => {
    if (props.right) return "right";
    if (props.center) return "center";
    return "left";
  }};
`;

export const Strong = styled(Text)`
  font-family: ${fontFamily.semiBold};
`;

export const Title = styled(Text)`
  font-family: ${fontFamily.bold};
  font-size: ${fontSize.xlg};
`;
