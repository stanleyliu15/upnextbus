import styled from "styled-components/native";

import { Text } from "../../atoms";
import { space, fontFamily, fontSize, border } from "../../../styles";

export const SETTING_HEIGHT = "50px";

export const LinkButton = styled.TouchableHighlight`
  height: ${SETTING_HEIGHT};

  display: flex;
  justify-content: center;

  border-radius: ${border.round};
  padding-right: ${space.medium};
  padding-left: ${space.xLarge};
`;

export const Section = styled.View`
  padding: ${space.large};
`;

export const GroupTitle = styled(Text)`
  margin-bottom: ${space.medium};
  /* font-size: ${fontSize.small}; */
  font-family: ${fontFamily.bold};
`;

export const SectionContent = styled.View`
  background-color: ${({ theme }) => theme.backgroundLight};
  border-radius: ${border.round};
  padding: ${space.small};
`;

export const ProSectionContent = styled(SectionContent)`
  background-color: ${({ theme }) => theme.primaryDark};
  padding: ${space.xxxLarge};
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PropertyColumn = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;

  margin-right: ${space.small};
`;

export const PropertyAndDescription = styled.View`
  flex: 1;
  margin-left: ${({ iconSpace }) => (iconSpace ? space.large : 0)};
`;

export const Description = styled(Text)`
  /* flex-shrink: 1; */
  color: ${({ theme }) => theme.textLight};
  font-size: ${fontSize.small};
`;

export const ValueColumn = styled.View`
  flex: ${({ prioritizePropertySpace }) => (prioritizePropertySpace ? "0 0 auto" : 1)}

  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const Value = styled(Text)`
  color: ${({ theme }) => theme.light};
  margin-right: ${space.nano};
  flex-shrink: 1;
`;

export const Version = styled(Text)`
  margin-top: ${space.small};
  color: ${({ theme }) => theme.light};
`;
