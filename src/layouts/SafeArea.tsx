import styled from "styled-components/native";

export default styled.SafeAreaView<{ inverse?: boolean }>`
  flex: 1;
  background-color: ${({ theme, inverse }) => (inverse ? theme.background : theme.backgroundLight)};
`;
