import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components/native";

import Navigator from "./Navigator";
import { selectThemeColor } from "./store/features/settings";
import { fromThemeColor } from "./styles";

// todo: use memoized selectors https://react-redux.js.org/api/hooks#using-memoizing-selectors
// todo: consistent sizing of all elements based on screenW/screenH

const Root: React.FC = () => {
  const themeColor = useSelector(selectThemeColor);

  return (
    <ThemeProvider theme={fromThemeColor(themeColor)}>
      <Navigator />
    </ThemeProvider>
  );
};

export default Root;
