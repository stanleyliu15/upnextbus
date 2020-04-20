import React from "react";
import styled from "styled-components/native";

import { Text, Button } from "../../components";
import { fontFamily, fontSize, borderRadius, space } from "../../styles";

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: ${space.sm}px;
`;

export const Section = styled.View`
  padding: ${space.sm}px;
`;

export const GroupTitle = styled(Text)`
  margin: 0 0 ${space.xs}px ${space.xxs}px;
  font-family: ${fontFamily.bold};
`;

export const SectionContent = styled.View`
  background-color: ${({ theme }) => theme.backgroundLight};
  border-radius: ${borderRadius.round};
  padding: ${space.xxs}px;
`;

export const ProSectionContent = styled(SectionContent)`
  background-color: ${({ theme }) => theme.primaryDark};
  padding: ${space.xlg}px;
`;

export const Version = styled(Text)`
  margin-top: ${space.xxs};
  color: ${({ theme }) => theme.gray};
  font-size: ${fontSize.sm};
`;

export const SaveButton = styled(Button).attrs({
  children: (
    <Text center color="white">
      Save Changes
    </Text>
  )
})`
  margin: ${space.xlg}px;
`;
