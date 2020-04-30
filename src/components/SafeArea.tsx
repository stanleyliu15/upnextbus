// todo: look into react-native-safe-area-context

import styled from "styled-components/native";

type SafeAreaProps = {
  inverse?: boolean;
};

const SafeArea = styled.SafeAreaView<SafeAreaProps>`
  flex: 1;
  background-color: ${({ theme, inverse }) => (inverse ? theme.background : theme.backgroundLight)};
`;

export default SafeArea;
