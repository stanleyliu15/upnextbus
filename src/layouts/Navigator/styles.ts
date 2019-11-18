import styled from "styled-components";
import Entypo from "react-native-vector-icons/Entypo";

import { space } from "../../styles";

export const BackIcon = styled(Entypo).attrs(props => ({
  name: "chevron-thin-left",
  size: 20,
  color: props.theme.text,
  ...props
}))`
  margin: 0 ${space.large};
`;
