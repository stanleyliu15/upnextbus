import { Dimensions, Platform, PixelRatio } from "react-native";

const WINDOW_WIDTH = Dimensions.get("window").width;
const STANDARD_WIDTH = 368;

const scale = (size: number) => {
  const newSize = size * (WINDOW_WIDTH / STANDARD_WIDTH);

  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export default scale;
