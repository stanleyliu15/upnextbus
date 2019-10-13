import React from "react";
import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { getInset, getStatusBarHeight } from "react-native-safe-area-view";

import { Text, Button, Strong } from "../../atoms";
import { space, border, fontFamily, fontSize } from "../../../styles";

export const Wrapper = styled.View``;

export const Container = styled.TouchableHighlight.attrs(props => ({
  ...props,
  underlayColor: props.theme.backgroundDark
}))`
  /* TODO: Use flatlis's ItemSeparatorComponent seperator component for this */
  border-bottom-color: ${({ theme }) => theme.lighter};
  border-bottom-width: 0.33px;
`;

export const Main = styled.View`
  display: flex;
  flex-direction: row;
`;

export const GeneralSection = styled.View`
  flex: 8.4;
  padding: ${space.xLarge} ${space.large} ${space.xxLarge} ${space.xxxLarge};
`;

export const VerticalSeperator = styled.View`
  flex: 0.2;
  border-color: ${({ theme }) => theme.lighter};
  border-left-width: 0.25px;
  margin-top: ${space.xxLarge};
  margin-bottom: ${space.xxLarge};

  padding-left: ${space.small};
  padding-right: ${space.small};
`;

export const RouteName = styled(Text)`
  font-size: ${fontSize.large};
  font-family: ${fontFamily.bold};
`;

export const DirectionName = styled(Text)`
  font-size: ${fontSize.primary};
  color: ${({ theme }) => theme.textLighter};
  margin-top: ${space.xLarge};
`;

export const StopName = styled(Text)`
  margin-top: ${space.large};
  font-size: ${fontSize.primary};
  color: ${({ theme }) => theme.textLighter};
`;

export const DashDash = styled(Text)`
  font-family: ${fontFamily.light};
  font-size: ${fontSize.large};
  text-align: center;
`;

export const PredictionTimeSection = styled.View`
  flex: 1.4;
  padding: ${space.xxLarge} ${space.xLarge} ${space.xLarge} ${space.medium};
`;

export const PredictionTime = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: baseline;
  margin-bottom: ${space.medium};
`;

export const PredictionMinute = styled(Text)`
  font-size: ${fontSize.large};
`;

export const PredictionUnit = styled(Text)`
  font-size: ${fontSize.nano};
  margin-left: ${space.nano};
`;

export const PanelContainer = styled(Wrapper)`
  background-color: ${({ theme }) => theme.background};
  border-radius: ${border.round};

  padding: ${space.medium};

  /*
   TODO: may need to adjust if supporting landscape mode
   TODO: test on other devices */
  max-height: ${({ limitSpace }) =>
    limitSpace
      ? Dimensions.get("screen").height -
        getStatusBarHeight() -
        getInset("top") -
        getInset("bottom")
      : "auto"};
`;

export const BackButton = styled.TouchableHighlight.attrs(props => ({
  underlayColor: props.theme.backgroundDarker,
  children: <Entypo name="chevron-thin-left" size={20} color={props.theme.text} />
}))`
  padding: ${space.large};
  border-radius: ${border.round};
`;

export const BackTitle = styled(Strong)`
  padding-left: ${space.small};
`;
