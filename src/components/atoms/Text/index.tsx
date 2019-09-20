import styled from "styled-components/native";

import { fontFamily, fontSize } from "../../../styles";

export const Text = styled.Text`
  color: ${({ theme }) => theme.text};
  font-family: ${fontFamily.normal};
  font-size: ${fontSize.small};
`;
