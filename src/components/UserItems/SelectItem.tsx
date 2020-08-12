import React from "react";
import { StyleSheet } from "react-native";

import Icon from "../Icon";
import Item, { ItemProps } from "./Item";

const styles = StyleSheet.create({
  item: { borderRadius: 0 },
  propertyItem: { flex: 0 }
});

type Props = {
  selected: boolean;
};

type SelectItemProps = ItemProps & Props;

const SelectItem: React.FC<SelectItemProps> = ({ selected, ...itemProps }) => (
  <Item
    icon={
      <Icon
        icon="MaterialCommunityIcons"
        name={selected ? "checkbox-blank-circle" : "checkbox-blank-circle-outline"}
        color={selected ? "primary" : "gray"}
        size="xs"
      />
    }
    style={styles.item}
    propertyItemStyle={styles.propertyItem}
    {...itemProps}
  />
);

export default SelectItem;
