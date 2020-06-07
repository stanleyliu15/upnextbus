import React from "react";
import styled from "styled-components/native";

import Icon from "../Icon";
import { Text } from "../Typography";
import { space, Theme } from "../../styles";
import Item, { ItemProps } from "./item";

type ValueItemProps = { prioritizePropertySpace?: boolean };
export const ValueItem = styled.View<ValueItemProps>`
  flex: ${({ prioritizePropertySpace }) => (prioritizePropertySpace ? "0 0 auto" : 1)};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const Value = styled(Text)`
  flex-shrink: 1;
  margin-right: ${space.xxxs};
`;

type Props = {
  value?: string;
  externalLink?: boolean;
  prioritizePropertySpace?: boolean;
  linkIconColor?: keyof Theme | string;
  hideLinkIcon?: boolean;
};
type LinkItemProps = ItemProps & Props;

const LinkItem: React.FC<LinkItemProps> = ({
  value = null,
  externalLink = false,
  prioritizePropertySpace = false,
  linkIconColor = null,
  hideLinkIcon = false,
  ...itemProps
}) => {
  const { onPress } = itemProps;

  return (
    <Item
      {...itemProps}
      valueItem={
        <ValueItem prioritizePropertySpace={prioritizePropertySpace}>
          {value && (
            <Value numberOfLines={1} color="textLighter">
              {value}
            </Value>
          )}
          {onPress && !hideLinkIcon && (
            <Icon
              icon={externalLink ? "AntDesign" : "Entypo"}
              name={externalLink ? "arrowright" : "chevron-thin-right"}
              color={linkIconColor || "gray"}
              size="sm"
            />
          )}
        </ValueItem>
      }
    />
  );
};

export default LinkItem;
