/* eslint-disable global-require */
import { FontAwesome5 } from "@expo/vector-icons";

export default [
  FontAwesome5.font,
  {
    "open-sans-light": require("../../assets/fonts/OpenSans-Light.ttf"),
    "open-sans-regular": require("../../assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-semi-bold": require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    "open-sans-bold": require("../../assets/fonts/OpenSans-Bold.ttf")
  }
];
