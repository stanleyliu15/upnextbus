import React from "react";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

import { ThemeColor, space, border } from "../../../styles";
import { Property, SETTING_HEIGHT } from "./settingsStyles";
import { selectThemeColor, setThemeColor } from "../../../store/features/settings";

export function ThemeItem() {
  const dispatch = useDispatch();
  const themeColor = useSelector(selectThemeColor);
  const isLightThemeColor = themeColor === ThemeColor.LIGHT;
  const handlePress = (color: ThemeColor) => () => dispatch(setThemeColor(color));

  return (
    <Container>
      <ThemeButtonWrapper>
        <HighlightButton onPress={handlePress(ThemeColor.LIGHT)} underlayColor="orange">
          <LightButtonContent active={isLightThemeColor}>
            <FontAwesome5 name="sun" size={25} color="#f45905" />
            <LightProperty iconSpace>Light</LightProperty>
          </LightButtonContent>
        </HighlightButton>
      </ThemeButtonWrapper>
      <ThemeButtonWrapper marginless>
        <HighlightButton onPress={handlePress(ThemeColor.DARK)} underlayColor="mediumpurple">
          <DarkButtonContent active={!isLightThemeColor}>
            <FontAwesome5 name="moon" size={25} color="rebeccapurple" />
            <DarkProperty iconSpace>Dark</DarkProperty>
          </DarkButtonContent>
        </HighlightButton>
      </ThemeButtonWrapper>
    </Container>
  );
}

type ThemeButtonProps = {
  active: boolean;
};

const Container = styled.View`
  display: flex;
  flex-direction: row;

  height: ${SETTING_HEIGHT};
`;

const HighlightButton = styled.TouchableHighlight`
  border-radius: ${border.round};
`;

const ThemeButtonWrapper = styled.View`
  flex: 1;

  margin-right: ${({ marginless }) => (marginless ? 0 : space.large)};
`;

const ButtonContent = styled.View`
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-width: 1.5px;
  border-style: solid;

  border-radius: ${border.round};
`;

const LightButtonContent = styled(ButtonContent)`
  border-color: orange;
  background-color: ${({ active }) => (active ? "orange" : "transparent")};
`;

const LightProperty = styled(Property)`
  color: #f45905;
`;

const DarkButtonContent = styled(ButtonContent)`
  border-color: mediumpurple;
  background-color: ${({ active }) => (active ? "mediumpurple" : "transparent")};
`;

const DarkProperty = styled(Property)`
  color: rebeccapurple;
`;
