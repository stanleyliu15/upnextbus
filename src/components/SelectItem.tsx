import React from "react";
import styled from "styled-components/native";

import Icon from "./Icon";
import { Text } from "./Typography";
import { LinkButton } from "./Buttons";

import { OnPressHandler } from "../../types";
import { fontSize } from "../styles";

const SelectLinkButton = styled(LinkButton)`
  border-radius: 0;
`;

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

export const Description = styled(Text)`
  color: ${({ theme }) => theme.textLight};
  font-size: ${fontSize.sm};
`;

type SelectItemProps = {
  name: string;
  description?: string;
  selected: boolean;
  onSelect: OnPressHandler;
  fixedHeight?: boolean;
  lastItem?: boolean;
};

const SelectItem: React.FC<SelectItemProps> = ({
  name,
  description,
  selected,
  onSelect,
  fixedHeight = true,
  lastItem = true
}) => (
  <SelectLinkButton onPress={onSelect} includeBottomBorder={!lastItem}>
    <HighlightContent>
      <Icon
        icon="Feather"
        name={selected ? "check-circle" : "circle"}
        color={selected ? "primary" : "light"}
        size={20}
      />
      <Item>
        <Text iconSpace numberOfLines={fixedHeight ? 1 : 0}>
          {name}
        </Text>
        {description && <Description iconSpace>{description}</Description>}
      </Item>
    </HighlightContent>
  </SelectLinkButton>
);

export default SelectItem;
