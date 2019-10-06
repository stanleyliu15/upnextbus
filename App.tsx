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
import { getAgencies, getNearestAgencyIdByLocation } from "./src/store/features/nextbus";

useScreens();

const AppLoader = styled.ActivityIndicator``;

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

export default function() {
  const { store, persistor } = configureStore();
  const [ready, setReady] = useState(false);
  const handleFinish = () => setReady(true);

  useEffect(() => {
    async function prepareApp() {
      const imageAssets = cacheImages(images);
      const fontAssets = cacheFonts(fonts);

      await Promise.all([
        ...fontAssets,
        ...imageAssets,
        store.dispatch(getAgencies()),
        store.dispatch(getNearestAgencyIdByLocation())
      ]);

      handleFinish();
    }

    prepareApp();
  }, [store]);

  if (ready) {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RootScreen />
        </PersistGate>
      </Provider>
    );
  }

  return <AppLoader />;
}
