import {
  FontAwesome5,
  Entypo,
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  SimpleLineIcons
} from "@expo/vector-icons";

// Icon Library
// https://oblador.github.io/react-native-vector-icons/

// TODO: optimize fonts/icons

export default [
  FontAwesome5.font,
  Entypo.font,
  AntDesign.font,
  Feather.font,
  MaterialIcons.font,
  MaterialCommunityIcons.font,
  Ionicons.font,
  SimpleLineIcons.font,
  {
    "open-sans-light": require("../../assets/fonts/OpenSans-Light.ttf"),
    "open-sans-regular": require("../../assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-semi-bold": require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    "open-sans-bold": require("../../assets/fonts/OpenSans-Bold.ttf")
  }
];
