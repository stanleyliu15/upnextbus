import { Platform, TouchableOpacity, TouchableNativeFeedback } from "react-native";
import styled from "styled-components/native";

import { space, border } from "../../../styles";

const Component = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

export const Button = styled(Component)`
  padding: ${space.xLarge} ${space.massive};
  border-radius: ${border.round};
  background-color: ${({ theme }) => theme.primary};
`;
