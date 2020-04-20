import styled from "styled-components";

import { space } from "../styles";
import { Icon } from "../components";

export const BackIcon = styled(Icon).attrs({
  icon: "Entypo",
  name: "chevron-thin-left",
  size: 20
})`
  margin: 0 ${space.md}px;
`;
