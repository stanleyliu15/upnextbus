import React from "react";
import { Switch } from "react-native";

import Item, { ItemProps } from "./item";

type Props = {
  enabled: boolean;
  onSwitch: (value: boolean) => void;
};
type SelectItemProps = ItemProps & Props;

const SwitchItem: React.FC<SelectItemProps> = ({ enabled, onSwitch, ...itemProps }) => (
  <Item {...itemProps} valueItem={<Switch value={enabled} onValueChange={onSwitch} />} />
);

export default SwitchItem;
