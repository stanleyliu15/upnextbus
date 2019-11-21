import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableOpacityProps,
  TouchableNativeFeedbackProps
} from "react-native";
import styled from "styled-components/native";

import { space, border } from "../../../styles";

const Component = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

export type ButtonProps =
  | Pick<TouchableOpacityProps, keyof TouchableOpacityProps>
  | Pick<TouchableNativeFeedbackProps, keyof TouchableNativeFeedbackProps>;

export const Button = styled(Component)<ButtonProps>`
  padding: ${space.xLarge} ${space.massive};
  border-radius: ${border.round};
  background-color: ${({ theme }) => theme.primary};
`;
