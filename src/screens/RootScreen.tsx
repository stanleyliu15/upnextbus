import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

import TabNavigationBar from "./TabNavigationBar";
import { themeColorSelector } from "../store/features/settings";
import { fromThemeColor } from "../styles";

function RootScreen() {
  const themeColor = useSelector(themeColorSelector);

  return (
    <ThemeProvider theme={fromThemeColor(themeColor)}>
      <TabNavigationBar />
    </ThemeProvider>
  );
}

export default RootScreen;
