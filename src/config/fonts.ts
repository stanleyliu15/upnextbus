import {
  FontAwesome5,
  Entypo,
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

// Icon Library
// https://oblador.github.io/react-native-vector-icons/

export default [
  FontAwesome5.font,
  Entypo.font,
  AntDesign.font,
  Feather.font,
  MaterialCommunityIcons.font,
  Ionicons.font,
  {
    "open-sans-light": require("../../assets/fonts/OpenSans-Light.ttf"),
    "open-sans-regular": require("../../assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-semi-bold": require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    "open-sans-bold": require("../../assets/fonts/OpenSans-Bold.ttf")
  }
];
