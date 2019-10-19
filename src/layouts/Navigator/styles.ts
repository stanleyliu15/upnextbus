import styled from "styled-components";
import { Entypo } from "@expo/vector-icons";

import { space } from "../../styles";

export const BackIcon = styled(Entypo).attrs(props => ({
  name: "chevron-thin-left",
  size: 25,
  color: props.theme.text,
  ...props
}))`
  margin: 0 ${space.large};
`;
