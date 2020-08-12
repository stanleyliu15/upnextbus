import React from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";

import Item, { ItemProps } from "./Item";

const Switch = styled.Switch`
  transform: scale(${Platform.OS === "ios" ? 0.7 : 1});
`;

type Props = {
  enabled: boolean;
  onSwitch: (value: boolean) => void;
};
type SelectItemProps = ItemProps & Props;

const SwitchItem: React.FC<SelectItemProps> = ({ enabled, onSwitch, ...itemProps }) => (
  <Item {...itemProps} valueItem={<Switch value={enabled} onValueChange={onSwitch} />} />
);

export default SwitchItem;
