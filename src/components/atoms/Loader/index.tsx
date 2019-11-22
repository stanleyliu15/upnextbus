import styled from "styled-components/native";
import { ActivityIndicatorProps } from "react-native";
import { baseAppColors } from "../../../styles/palette";

export type Props = Omit<ActivityIndicatorProps, "size"> & {
  large?: boolean;
};

export const Loader = styled.ActivityIndicator.attrs(props => ({
  color: props.color || props.theme.primary,
  size: props.size || "small"
}))`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.background};
`;

export const AppLoader = styled(Loader).attrs(props => ({
  color: "#fff",
  ...props
}))`
  background-color: ${baseAppColors.primary};
`;
