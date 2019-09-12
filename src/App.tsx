import React, { useState } from "react";
import { Image } from "react-native";
import { AppLoading, registerRootComponent } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";

import RootScreen from "./screens/RootScreen";
import fonts from "./config/fonts";
import images from "./config/images";

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

export function App() {
  const [ready, setReady] = useState(false);
  const handleFinish = () => setReady(true);

  async function prepareApp() {
    const imageAssets = cacheImages(images);
    const fontAssets = cacheFonts(fonts);

    await Promise.all([...fontAssets, ...imageAssets]);
  }

  if (ready) {
    return <RootScreen />;
  }

  return <AppLoading startAsync={prepareApp} onFinish={handleFinish} onError={console.error} />;
}

// @ts-ignore
export default registerRootComponent(App);
