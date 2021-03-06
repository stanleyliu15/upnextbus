import React from "react";
import { StyleProp, TextStyle, View, StyleSheet, ViewStyle, ViewProps } from "react-native";
import styled from "styled-components/native";
import { noop } from "lodash";

import Loader from "../Loader";
import { fontSize, space, borderRadius, mixins } from "../../styles";
import { Text, Strong } from "../Typography";
import { HighlightButton, HighlightButtonProps } from "../Buttons";
import { OnPressHandler } from "../../../types";

const I = styled.View`
  display: flex;
  justify-content: space-between;

  ${mixins.border({ direction: "bottom" })};
  border-radius: ${borderRadius.round};
  padding: ${space.lg} ${space.xs} ${space.lg} ${space.md};
`;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PropertyItem = styled.View`
  ${mixins.flexRowCenter};
  flex: 1;
  margin-right: ${space.xxs};
`;

const TitleAndDescription = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Description = styled(Text)`
  font-size: ${fontSize.sm};
`;

const ValueLoader = styled(Loader)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  background-color: transparent;
`;

type Props = {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  description?: string;
  descriptionStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  truncateTitle?: boolean;
  truncateDescription?: boolean;
  valueItem?: React.ReactNode;
  onPress?: OnPressHandler;
  loading?: boolean;
  showBottomBorder?: boolean;
  propertyItemStyle?: StyleProp<ViewStyle>;
};

export type ItemProps = (ViewProps | HighlightButtonProps) & Props;

const Item: React.FC<ItemProps> = ({
  title,
  titleStyle = null,
  description = null,
  descriptionStyle = null,
  truncateTitle = true,
  truncateDescription = false,
  icon = null,
  valueItem = null,
  onPress = null,
  loading = false,
  showBottomBorder = true,
  propertyItemStyle = null,
  style,
  ...rest
}) => {
  const iconSpace = !!icon;
  const pressable = !!onPress;
  const itemComponent = pressable ? HighlightButton : View;
  const itemProps = pressable ? { onPress: loading ? noop : onPress } : {};
  const itemStyle = StyleSheet.flatten([
    { flexDirection: pressable ? "column" : "row" },
    !showBottomBorder && { borderBottomWidth: 0 },
    style
  ]);
  const ItemContainer = pressable ? Container : React.Fragment;

  return (
    <I as={itemComponent} style={itemStyle} {...itemProps} {...rest}>
      <ItemContainer>
        <PropertyItem style={propertyItemStyle}>
          {icon}
          <TitleAndDescription>
            <Strong iconSpace={iconSpace} numberOfLines={truncateTitle ? 1 : 0} style={titleStyle}>
              {title}
            </Strong>
            {description && (
              <Description
                iconSpace={iconSpace}
                numberOfLines={truncateDescription ? 1 : 0}
                color="textLight"
                style={descriptionStyle}
              >
                {description}
              </Description>
            )}
          </TitleAndDescription>
        </PropertyItem>
        {loading ? <ValueLoader size="xs" /> : valueItem}
      </ItemContainer>
    </I>
  );
};

export default Item;
