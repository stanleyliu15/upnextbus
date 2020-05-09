import React from "react";
import { useTheme } from "styled-components/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import { Theme } from "../styles";

const icons = {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons
};

type IconProps = {
  icon: keyof typeof icons;
  name: string;
  size: number;
  color: keyof Theme | string;
};

const Icon: React.FC<IconProps> = ({ icon, color, ...props }) => {
  const theme = useTheme();
  const IconComponent = icons[icon];

  return <IconComponent {...props} color={theme[color] || color} />;
};

export default Icon;
