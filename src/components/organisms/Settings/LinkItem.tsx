import React, { useContext } from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";
import noop from "lodash/noop";

import { TextStyle, StyleProp } from "react-native";
import {
  ItemContainer,
  LinkButton,
  PropertyAndDescription,
  PropertyColumn,
  Description,
  ValueColumn,
  Value
} from "./settingsStyles";
import { OnPressHandler } from "../../../../types";
import { Strong } from "../../atoms";

type Props = {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  description?: string;
  icon?: React.ReactNode;
  value?: string;
  onPress?: OnPressHandler;
  externalLink?: boolean;
  prioritizePropertySpace?: boolean;
  fixedHeight?: boolean;
};

export function LinkItem({
  title,
  titleStyle = null,
  description = null,
  icon = null,
  value = null,
  externalLink = false,
  onPress = noop,
  prioritizePropertySpace = false
}: Props) {
  const theme = useContext(ThemeContext);

  return (
    <LinkButton onPress={onPress} underlayColor={theme.backgroundDark}>
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
          {externalLink ? (
            <AntDesign name="arrowright" size={20} color={theme.light} />
          ) : (
            <Entypo name="chevron-thin-right" size={20} color={theme.light} />
          )}
        </ValueColumn>
      </ItemContainer>
    </LinkButton>
  );
}
