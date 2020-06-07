import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components/native";

import Navigator from "./Navigator";
import { selectThemeColor } from "./store/features/settings";
import { fromThemeColor } from "./styles";

const Root: React.FC = () => {
  const themeColor = useSelector(selectThemeColor);

  return (
    <ThemeProvider theme={fromThemeColor(themeColor)}>
      <Navigator />
    </ThemeProvider>
  );
};

export default Root;
