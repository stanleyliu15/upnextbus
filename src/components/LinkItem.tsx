import React from "react";
import { TextStyle, StyleProp, TouchableHighlightProps } from "react-native";
import styled from "styled-components/native";
import { noop } from "lodash";

import Icon from "./Icon";
import { Strong, Text } from "./Typography";
import { Loader } from "./Loaders";
import { LinkButton } from "./Buttons";

import { OnPressHandler } from "../../types";
import { fontSize, space, Theme } from "../styles";

const LinkLoader = styled(Loader)`
  flex-direction: row;
  justify-content: flex-end;

  background-color: transparent;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PropertyColumn = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;

  margin-right: ${space.xxs};
`;

type PropertyAndDescriptionProps = { iconSpace?: boolean };
export const PropertyAndDescription = styled.View<PropertyAndDescriptionProps>`
  flex: 1;
  margin-left: ${({ iconSpace }) => (iconSpace ? space.md : 0)};
`;

export const Description = styled(Text)`
  color: ${({ theme }) => theme.textLight};
  font-size: ${fontSize.sm};
`;

type ValueColumnProps = { prioritizePropertySpace?: boolean };
export const ValueColumn = styled.View<ValueColumnProps>`
  flex: ${({ prioritizePropertySpace }) => (prioritizePropertySpace ? "0 0 auto" : 1)};

  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const Value = styled(Text)`
  flex-shrink: 1;

  color: ${({ theme }) => theme.textLighter};
  margin-right: ${space.xxxs};
`;

type LinkItemProps = {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  description?: string;
  icon?: React.ReactNode;
  value?: string;
  onPress?: OnPressHandler;
  externalLink?: boolean;
  loading?: boolean;
  includeBottomBorder?: boolean;
  prioritizePropertySpace?: boolean;
  linkIconColor?: keyof Theme | string;
} & TouchableHighlightProps;

const LinkItem: React.FC<LinkItemProps> = ({
  title,
  titleStyle = null,
  linkIconColor = null,
  description = null,
  icon = null,
  value = null,
  loading = false,
  externalLink = false,
  onPress = null,
  prioritizePropertySpace = false,
  includeBottomBorder = false,
  ...rest
}) => (
  <LinkButton
    onPress={loading ? noop : onPress}
    disabled={!onPress}
    includeBottomBorder={includeBottomBorder}
    {...rest}
  >
    <ItemContainer>
      <PropertyColumn>
        {icon}
        <PropertyAndDescription iconSpace={!!icon}>
          <Strong style={titleStyle}>{title}</Strong>
          {description && <Description numberOfLines={1}>{description}</Description>}
        </PropertyAndDescription>
      </PropertyColumn>
      <ValueColumn prioritizePropertySpace={prioritizePropertySpace}>
        {value && <Value numberOfLines={1}>{value}</Value>}
        {loading ? (
          <LinkLoader />
        ) : (
          onPress && (
            <Icon
              icon={externalLink ? "AntDesign" : "Entypo"}
              name={externalLink ? "arrowright" : "chevron-thin-right"}
              size={20}
              color={linkIconColor || "gray"}
            />
          )
        )}
      </ValueColumn>
    </ItemContainer>
  </LinkButton>
);

export default LinkItem;
