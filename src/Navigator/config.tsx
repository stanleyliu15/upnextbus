import React from "react";
import { Platform } from "react-native";
import styled from "styled-components";
import {
  StackHeaderOptions,
  StackNavigationConfig
} from "@react-navigation/stack/lib/typescript/src/types";
import { invert } from "polished";

import { Icon } from "../components";
import { Theme, space } from "../styles";

export const BackIcon = styled(Icon).attrs({
  icon: "Entypo",
  name: "chevron-thin-left",
  size: 20
})`
  margin: 0 ${Platform.OS === "ios" ? space.sm : 0};
`;

const getBaseStackHeaderOptions = (theme: Theme): StackHeaderOptions => ({
  headerStyle: {
    backgroundColor: theme.background
  },
  headerTitleStyle: {
    color: theme.text
  },
  headerTitleAlign: "center",
  headerBackTitleVisible: false,
  headerBackImage: () => <BackIcon color={invert(theme.background)} />
});

const baseStackNavigationConfig: StackNavigationConfig = {
  mode: "modal",
  headerMode: "screen"
};

export const getBaseStackConfig = (theme: Theme) => {
  return {
    screenOptions: {
      ...getBaseStackHeaderOptions(theme)
    },
    ...baseStackNavigationConfig
  };
};