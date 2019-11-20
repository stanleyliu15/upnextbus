import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Image } from "react-native";
import { useScreens } from "react-native-screens";
import { Asset } from "expo-asset";
import * as Font from "expo-font";

import styled from "styled-components/native";
import configureStore from "./src/store";
import RootScreen from "./src/screens/RootScreen";
import fonts from "./src/config/fonts";
import images from "./src/config/images";
import { lightColors } from "./src/styles/palette";

useScreens();

export const AppLoader = styled.ActivityIndicator.attrs(props => ({
  color: "#fff",
  ...props
}))`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${lightColors.primary};
`;

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

export default function App() {
  const { store, persistor } = configureStore();
  const [ready, setReady] = useState(false);
  const handleFinish = () => setReady(true);

  useEffect(() => {
    async function prepareApp() {
      const imageAssets = cacheImages(images);
      const fontAssets = cacheFonts(fonts);

      await Promise.all([...fontAssets, ...imageAssets]);

      handleFinish();
    }

    prepareApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (ready) {
    return (
      <Provider store={store}>
        <PersistGate loading={<AppLoader />} persistor={persistor}>
          <RootScreen />
        </PersistGate>
      </Provider>
    );
  }

  return <AppLoader />;
}
