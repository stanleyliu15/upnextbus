import styled from "styled-components/native";

import { fontFamily, fontSize } from "../../../styles";

export const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  font-family: ${fontFamily.bold};
  font-size: ${fontSize.large};
`;
