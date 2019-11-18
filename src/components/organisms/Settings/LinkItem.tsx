import React, { useContext } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

import styled, { ThemeContext } from "styled-components/native";
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
import { Strong, Loader } from "../../atoms";

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
  loading?: boolean;
};

export function LinkItem({
  title,
  titleStyle = null,
  description = null,
  icon = null,
  value = null,
  loading = false,
  externalLink = false,
  onPress = noop,
  prioritizePropertySpace = false
}: Props) {
  const theme = useContext(ThemeContext);

  const MyLoader = styled(Loader)`
    background-color: transparent;
    flex-direction: row;
    justify-content: flex-end;
  `;

  function getValueComponent() {
    if (loading) {
      return <MyLoader />;
    }

    if (externalLink) {
      return <AntDesign name="arrowright" size={20} color={theme.light} />;
    }

    return <Entypo name="chevron-thin-right" size={20} color={theme.light} />;
  }

  return (
    <LinkButton onPress={loading ? noop : onPress} underlayColor={theme.backgroundDark}>
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
          {getValueComponent()}
        </ValueColumn>
      </ItemContainer>
    </LinkButton>
  );
}
