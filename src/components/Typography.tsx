import styled from "styled-components/native";

import { fontFamily, fontSize, space, colors, Theme } from "../styles";

type TextProps = {
  color?: keyof Theme | string;
  iconSpace?: boolean;
  hasIconRight?: boolean;
  align?: "right" | "center" | "left";
};

export const Text = styled.Text<TextProps>`
  color: ${({ theme, color }) => theme[color] || colors[color] || color || theme.text};
  font-family: ${fontFamily.normal};
  font-size: ${fontSize.md};
  margin-right: ${({ iconSpace, hasIconRight }) => (iconSpace && hasIconRight ? space.sm : 0)};
  margin-left: ${({ iconSpace, hasIconRight }) => (iconSpace && !hasIconRight ? space.sm : 0)};
  text-align: ${props => props.align || "left"};
`;

export const Strong = styled(Text)`
  font-family: ${fontFamily.semiBold};
`;

export const Title = styled(Text)`
  font-family: ${fontFamily.bold};
  font-size: ${fontSize.xlg};
`;
