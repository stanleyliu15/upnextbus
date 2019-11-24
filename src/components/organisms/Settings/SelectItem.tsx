import React, { useContext } from "react";
import { GestureResponderEvent } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import Feather from "react-native-vector-icons/Feather";

import { Text } from "../../atoms";
import { space } from "../../../styles";
import { Description, LinkButton } from "./settingsStyles";

type SelectItemProps = {
  name: string;
  description?: string;
  selected: boolean;
  onSelect: (event: GestureResponderEvent) => void;
  fixedHeight?: boolean;
  lastItem?: boolean;
};

export const SelectItem = function({
  name,
  description,
  selected,
  onSelect,
  fixedHeight = true,
  lastItem = true
}: SelectItemProps) {
  const theme = useContext(ThemeContext);

  return (
    <LinkButton onPress={onSelect} includeBottomBorder={!lastItem}>
      <HighlightContent>
        {selected ? (
          <Feather name="check-circle" size={20} color={theme.primary} />
        ) : (
          <Feather name="circle" size={20} color={theme.light} />
        )}
        <Item>
          <Text iconSpace numberOfLines={fixedHeight ? 1 : 0}>
            {name}
          </Text>
          {description && <Description iconSpace>{description}</Description>}
        </Item>
      </HighlightContent>
    </LinkButton>
  );
};

const HighlightContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Item = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
`;
