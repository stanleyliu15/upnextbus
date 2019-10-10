import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import { Text } from "../../atoms";
import { space } from "../../../styles";
import { Description } from "./settingsStyles";

type SelectItemProps = {
  name: string;
  description?: string;
  selected: boolean;
  onSelect: VoidFunction;
  fixedHeight?: boolean;
};

export const SelectItem = function({
  name,
  description,
  selected,
  onSelect,
  fixedHeight = true
}: SelectItemProps) {
  const theme = useContext(ThemeContext);

  return (
    <HighlightButton
      onPress={onSelect}
      underlayColor={theme.backgroundLight}
      fixedHeight={fixedHeight}
    >
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

const HighlightButton = styled.TouchableHighlight`
  padding: ${space.xxxLarge};
  height: ${({ fixedHeight }) => (fixedHeight ? SELECT_ITEM_HEIGHT : "auto")};

  border-bottom-width: 0.25px;
  border-bottom-color: ${({ theme }) => theme.lighter};
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
