import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import { Text } from "../../atoms";
import { space } from "../../../styles";

type SelectItemProps = {
  name: string;
  selected: boolean;
  onSelect: VoidFunction;
};

export const SelectItem = function({ name, selected, onSelect }: SelectItemProps) {
  const theme = useContext(ThemeContext);

  return (
    <HighlightButton onPress={onSelect} underlayColor={theme.backgroundLight}>
      <HighlightContent>
        {selected ? (
          <Feather name="check-circle" size={20} color={theme.primary} />
        ) : (
          <Feather name="circle" size={20} color={theme.light} />
        )}
        <Text iconSpace>{name}</Text>
      </HighlightContent>
    </HighlightButton>
  );
};

const SELECT_ITEM_HEIGHT = "60px";

const HighlightButton = styled.TouchableHighlight`
  padding: ${space.xxxLarge};
  height: ${SELECT_ITEM_HEIGHT};

  border-bottom-width: 0.25px;
  border-bottom-color: ${({ theme }) => theme.lighter};
`;

const HighlightContent = styled.View`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
`;
