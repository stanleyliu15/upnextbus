import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Image } from "react-native";
import { useScreens } from "react-native-screens";
import { Asset } from "expo-asset";
import * as Font from "expo-font";

import configureStore from "./src/store";
import RootScreen from "./src/screens/RootScreen";
import fonts from "./src/config/fonts";
import images from "./src/config/images";
import { AppLoader } from "./src/components";

useScreens();

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

function App() {
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

export default App;
