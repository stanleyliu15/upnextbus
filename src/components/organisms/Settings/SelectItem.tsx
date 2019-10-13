import React, { useContext } from "react";
import { GestureResponderEvent } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import { Text } from "../../atoms";
import { space } from "../../../styles";
import { Description } from "./settingsStyles";

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
    <HighlightButton onPress={onSelect} fixedHeight={fixedHeight} lastItem={lastItem}>
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
    </HighlightButton>
  );
};

const SELECT_ITEM_HEIGHT = "60px";

const HighlightButton = styled.TouchableHighlight.attrs(props => ({
  ...props,
  underlayColor: props.theme.backgroundDark
}))`
  padding: ${space.xxxLarge};
  height: ${({ fixedHeight }) => (fixedHeight ? SELECT_ITEM_HEIGHT : "auto")};

  ${({ lastItem, theme }) => {
    if (!lastItem) {
      return `border-bottom-width: 0.25px; border-bottom-color: ${theme.lighter}`;
    }
  }};
`;

const HighlightContent = styled.View`
  display: flex;
  flex-direction: row;

  align-items: center;
`;

const Item = styled.View`
  display: flex;
  justify-content: center;
`;
