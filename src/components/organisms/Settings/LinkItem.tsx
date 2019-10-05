import React, { useContext } from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";
import noop from "lodash/noop";

import {
  ItemContainer,
  LinkButton,
  PropertyAndDescription,
  PropertyColumn,
  Property,
  Description,
  ValueColumn,
  Value
} from "./settingsStyles";
import { OnPressHandler } from "../../../../types";

type Props = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  value?: string;
  onPress?: OnPressHandler;
  externalLink?: boolean;
};

export function LinkItem({
  title,
  description = null,
  icon = null,
  value = null,
  externalLink = false,
  onPress = noop
}: Props) {
  const theme = useContext(ThemeContext);

  return (
    <LinkButton onPress={onPress} underlayColor={theme.background}>
      <ItemContainer>
        <PropertyColumn>
          {icon}
          <PropertyAndDescription iconSpace={!!icon}>
            <Property>{title}</Property>
            {description && <Description numberOfLines={1}>{description}</Description>}
          </PropertyAndDescription>
        </PropertyColumn>
        <ValueColumn>
          {value && <Value numberOfLines={1}>{value}</Value>}
          {externalLink ? (
            <AntDesign name="arrowright" size={25} color={theme.light} />
          ) : (
            <Entypo name="chevron-thin-right" size={25} color={theme.light} />
          )}
        </ValueColumn>
      </ItemContainer>
    </LinkButton>
  );
}
