import React from "react";
import styled from "styled-components/native";

import { Text, Button } from "../../components";
import { fontFamily, fontSize, borderRadius, space } from "../../styles";

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: ${space.sm};
`;

export const Section = styled.View`
  padding: ${space.sm};
`;

export const GroupTitle = styled(Text)`
  margin: 0 0 ${space.xs} ${space.xxs};
  font-family: ${fontFamily.bold};
`;

export const SectionContent = styled.View`
  background-color: ${({ theme }) => theme.backgroundLight};
  border-radius: ${borderRadius.round};
  padding: ${space.xxs};
`;

export const Version = styled(Text)`
  margin-top: ${space.xxs};
  font-size: ${fontSize.sm};
`;

export const SaveButton = styled(Button).attrs({
  children: (
    <Text align="center" color="white">
      Save Changes
    </Text>
  )
})`
  margin: ${space.xlg};
`;
