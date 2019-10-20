import styled from "styled-components/native";

export type Props = Omit<ActivityIndicatorProps, "size"> & {
  large?: boolean;
};

// TODO: custom loader

export const Loader = styled.ActivityIndicator.attrs(props => ({
  color: props.color || props.theme.primary,
  size: props.size || "small"
}))`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.background};
`;
